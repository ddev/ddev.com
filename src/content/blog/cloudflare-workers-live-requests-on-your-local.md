---
title: "Using Cloudflare Workers to tunnel matching traffic into your local"
pubDate: 2026-04-07
summary: "A Cloudflare Worker that selectively routes your production traffic to a local DDEV tunnel — so you can set breakpoints on requests you can't easily reproduce anywhere else."
author: Ariel Barreiro
featureImage:
  src: /img/blog/2026/04/cloudflare-worker-ddev-cover.png
  alt: A graphic connecting traffic handled by a Cloudflare Worker sending some traffic to your tunnel.
categories:
  - DevOps
---

## Why Would You Ever Do This?

You probably wouldn't ever. I needed it for a SAML integration I was working on. The IdP was locked to the production URL, and every small tweak meant a full deploy cycle just to see if it worked. I wanted to iterate fast — and for some edge cases with Xdebug — without touching production. So I built a small Cloudflare Worker that quietly routes my browser session to my local DDEV environment while everyone else keeps hitting the real server.

## How It Works

This only works if your domain is already **proxied through Cloudflare** (the orange cloud ☁️ in your DNS settings). When that's the case, every request passes through Cloudflare's edge before reaching your origin, which means you can intercept and reroute it with a Worker.

The Worker adds a simple opt-in toggle: you visit your production URL with `?cf_local_debug=1`, and the Worker checks that the request comes from your IP. If it does, it sets a short-lived cookie and redirects you back. From that point on, as long as that cookie is present _and_ the request comes from your IP, the Worker transparently proxies all traffic to your local DDEV tunnel instead of the normal origin. Everyone else continues hitting production as if nothing happened.

![Visiting the production URL with ?cf_local_debug=1 routes your browser to local DDEV, ?cf_local_debug=0 restores production](/img/blog/2026/04/cloudflare-worker-ddev-demo.gif)

Here's the full flow:

1. Your domain is proxied through Cloudflare and the Worker is attached to its routes (`myapp.example.com/*`).
2. You run `ddev share --provider=cloudflared` (or any other share provider) to expose your local environment via a Cloudflare Tunnel URL (e.g. `https://foo-bar.trycloudflare.com`).
3. You set that URL as the `DEBUG_ORIGIN` secret on the Worker, along with your current public IP as `DEBUG_IP`.
4. You visit `https://myapp.example.com/?cf_local_debug=1`.
5. The Worker sets the debug cookie and redirects you to the clean URL.
6. Subsequent requests from your browser go to your local DDEV — Xdebug, local database, local code and all.
7. When you're done, visit `?cf_local_debug=0` to clear the cookie, or let it expire on its own.

## Setting Up the Worker

You'll need a Cloudflare account and the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/). Create a new folder for the worker and add these three files:

**`package.json`**

```json
{
  "name": "cloudflare-worker-ddev",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "deploy": "wrangler deploy"
  },
  "devDependencies": {
    "wrangler": "^4.6.0"
  }
}
```

**`wrangler.jsonc`**

```jsonc
{
  "name": "cloudflare-worker-ddev",
  "main": "src/index.js",
  "compatibility_date": "2026-04-07",
  "workers_dev": false,
}
```

Routes are intentionally kept out of `wrangler.jsonc` to avoid hardcoding your domain in source control — you'll add those in the dashboard in a moment.

**`src/index.js`**

```js
function parseCookies(cookieHeader) {
  const cookies = {}
  if (!cookieHeader) return cookies
  for (const part of cookieHeader.split(";")) {
    const index = part.indexOf("=")
    if (index === -1) continue
    const key = part.slice(0, index).trim()
    const value = part.slice(index + 1).trim()
    cookies[key] = value
  }
  return cookies
}

function buildDebugCookie(name, value, maxAge) {
  return [
    `${name}=${value}`,
    "Path=/",
    `Max-Age=${maxAge}`,
    "HttpOnly",
    "Secure",
    "SameSite=None",
  ].join("; ")
}

function buildRedirectResponse(url, cookieName, cookieValue, maxAge) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
      "Set-Cookie": buildDebugCookie(cookieName, cookieValue, maxAge),
      "Cache-Control": "private, no-store",
    },
  })
}

function getConfig(env) {
  const debugOrigin = env.DEBUG_ORIGIN
  const debugIp = env.DEBUG_IP
  const debugCookie = env.DEBUG_COOKIE?.trim() || "cf_local_debug"
  const debugMaxAge = env.DEBUG_MAX_AGE ? Number(env.DEBUG_MAX_AGE) : 3600
  return { debugOrigin, debugIp, debugCookie, debugMaxAge }
}

export default {
  async fetch(request, env) {
    const requestUrl = new URL(request.url)

    // Images always go to the real origin — no need to proxy assets
    if (
      /\.(png|jpe?g|gif|svg|webp|ico|bmp|tiff|avif)$/i.test(requestUrl.pathname)
    ) {
      return fetch(request)
    }

    const config = getConfig(env)
    const clientIp = request.headers.get("CF-Connecting-IP") || ""
    const cookies = parseCookies(request.headers.get("Cookie"))
    const hasDebugCookie = cookies[config.debugCookie] === "1"
    const enableRequested =
      requestUrl.searchParams.get("cf_local_debug") === "1"
    const disableRequested =
      requestUrl.searchParams.get("cf_local_debug") === "0"
    const ipMatches = clientIp === config.debugIp

    if (enableRequested && ipMatches) {
      const cleanUrl = new URL(requestUrl)
      cleanUrl.searchParams.delete("cf_local_debug")
      return buildRedirectResponse(
        cleanUrl,
        config.debugCookie,
        "1",
        config.debugMaxAge
      )
    }

    if (disableRequested) {
      const cleanUrl = new URL(requestUrl)
      cleanUrl.searchParams.delete("cf_local_debug")
      return buildRedirectResponse(cleanUrl, config.debugCookie, "0", 0)
    }

    // Not in debug mode — pass through to the real origin
    if (!(hasDebugCookie && ipMatches)) return fetch(request)

    // Proxy to the local tunnel
    const debugOrigin = new URL(config.debugOrigin)
    const targetUrl = new URL(requestUrl)
    targetUrl.protocol = debugOrigin.protocol
    targetUrl.hostname = debugOrigin.hostname
    targetUrl.port = debugOrigin.port
    targetUrl.searchParams.delete("cf_local_debug")

    const headers = new Headers(request.headers)
    headers.set("Host", debugOrigin.hostname)
    headers.set("x-debug-via", "cloudflare-worker")
    headers.set("x-original-host", requestUrl.hostname)
    headers.set("x-forwarded-proto", "https")
    headers.set("x-forwarded-for", clientIp)
    // x-forwarded-host is intentionally omitted — some tunnel providers (ngrok, Cloudflare Tunnel)
    // drop connections if it doesn't match the SNI hostname

    const proxiedRequest = new Request(targetUrl.toString(), {
      method: request.method,
      headers,
      body: request.body,
      redirect: "manual",
    })

    const upstream = await fetch(proxiedRequest)
    const response = new Response(upstream.body, upstream)
    response.headers.set("Cache-Control", "private, no-store")
    return response
  },
}
```

A few design decisions worth noting:

- **Image passthrough** — image requests skip the worker entirely to avoid unnecessary tunnel traffic for static assets.
- **IP lock** — the debug cookie can only be set from `DEBUG_IP`, so no other visitor can accidentally activate it.
- **`x-forwarded-host` is omitted** — Cloudflare Tunnel (and ngrok) may drop connections when this header doesn't match the tunnel's SNI hostname.
- **`redirect: "manual"`** — redirects from the tunnel are forwarded as-is rather than followed internally, which matters for things like SAML assertion callbacks.

**Deploy**

```bash
npm install
npm run deploy
```

**Set secrets**

Secrets are set via the CLI and stored encrypted by Cloudflare — nothing sensitive ever lives in source control. The two required ones are the tunnel URL (more on that in the next step) and your public IP:

```bash
# The local tunnel URL from ddev share
npx wrangler secret put DEBUG_ORIGIN

# Pipe your current public IP directly — no copy-pasting
curl -s https://api.ipify.org | npx wrangler secret put DEBUG_IP
```

Two optional secrets have sensible defaults:

```bash
# Cookie name — defaults to cf_local_debug
npx wrangler secret put DEBUG_COOKIE

# Cookie lifetime in seconds — defaults to 3600 (1 hour)
npx wrangler secret put DEBUG_MAX_AGE
```

**Attach the route**

In the Cloudflare dashboard, go to **Workers & Pages → your Worker → Settings → Domains & Routes** and add `myapp.example.com/*`.

> **Important:** This only works if your DNS record is set to **Proxied** (orange cloud) in Cloudflare. If it's DNS-only, the Worker never sees the traffic.

## Starting the Tunnel

Each time you want to debug, start your DDEV project and expose it:

```bash
ddev start
ddev share --provider=cloudflared
```

`ddev share` will print a public URL like `https://care-assessment-divine-forestry.trycloudflare.com`. Copy it and update the Worker secret:

```bash
npx wrangler secret put DEBUG_ORIGIN
# paste the tunnel URL when prompted
```

> **Note:** The tunnel URL is ephemeral — it changes every time you run `ddev share`. Remember to update `DEBUG_ORIGIN` each session.

## Activating Debug Mode

With the Worker deployed, the route configured, and the tunnel running, visit your production URL with the toggle parameter:

```
https://myapp.example.com/?cf_local_debug=1
```

The Worker checks your IP against `DEBUG_IP`, sets the cookie, and redirects you to the clean URL. Your browser is now transparently receiving responses from your local DDEV environment.

## Debugging with Xdebug

Since traffic is now being served from your local DDEV, Xdebug works exactly as it normally would:

```bash
ddev xdebug on
```

Set a breakpoint in your IDE, trigger the request (or let the IdP do it for you), and the debugger will pause execution right where you need it — even though the URL in the browser says `myapp.example.com`.

## Wrapping Up

This setup scratches a very specific itch. No staging deploys, no IdP reconfiguration, no "works on my machine" guesswork. Just your real production URL, your local DDEV environment, and Xdebug ready to catch whatever comes in.

The code is intentionally simple and easy to adapt to different workflows, cookie strategies, or tunnel providers.

The full worker source is at [hanoii/cloudflare-worker-ddev](https://github.com/hanoii/cloudflare-worker-ddev).
