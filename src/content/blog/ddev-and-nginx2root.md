---
title: "Is DDEV Affected by nginx2root?"
pubDate: 2026-11-18
summary: The nginx2root vulnerabilities don't put normal DDEV use at risk. Here's why, and what to check if you've customized nginx or exposed DDEV to a network.
author: Randy Fay
featureImage:
  src: /img/blog/2026/11/banner-nginx2root.svg
  srcDark: /img/blog/2026/11/banner-nginx2root-dark.svg
  alt: "nginx2root: What to Know"
categories:
  - TechNotes
---

Several of you have asked whether DDEV is affected by [nginx2root](https://nginx2root.com/), published today by Xint. The research chains five nginx memory-corruption bugs (CVE-2026-123007, CVE-2026-123634, CVE-2026-123633, CVE-2026-121810, and CVE-2026-113425) with an unpatched Linux kernel SCTP flaw. Each nginx bug gives an unauthenticated remote client code execution as the nginx worker, and the kernel bug then takes that worker to root on the host, including out of a Docker container.

The short answer is that normal DDEV use isn't at risk.

## Why DDEV isn't exposed

DDEV is normally used for local development, so it isn't reachable by an attacker of this type. If you use DDEV for internet-facing hosting, pay a little more attention, but the reasons below still apply.

The vulnerable nginx features aren't turned on by default. The five CVEs need HTTP/2 on a listener, HTTP/3/QUIC listeners, `mirror` combined with a `resolver` and a request-derived `proxy_pass`, or the `mail` proxy with `auth_http`. DDEV's nginx configurations use `listen 443 ssl` without `http2`, and use none of the others.

Traefik is in front of nginx. Your browser talks to `ddev-router`, which handles any HTTP/2 or HTTP/3 and forwards plain HTTP/1.1 to nginx in the web container. The web container's own ports are bound only to `127.0.0.1` unless you've turned on [`bind_all_interfaces`](https://docs.ddev.com/en/stable/users/configuration/config/#bind_all_interfaces).

The second stage is a kernel bug, and an attacker can only try it after getting code running inside the web container. In DDEV that container already runs your project's own code. On Linux hosts that don't need SCTP, you can block the module:

```bash
echo "install sctp /bin/false" | sudo tee /etc/modprobe.d/disable-sctp.conf
```

This doesn't unload a module that's already loaded. Reboot, or check `lsmod | grep sctp`, to be sure.

## Who should check their setup

The only setup that might be at risk is one with a custom nginx configuration in `.ddev/nginx_full/` or `.ddev/nginx/` that adds `http2`, `quic`, or `mirror`, and that also exposes the web container directly to an untrusted network. To check a project:

```bash
grep -rnE "http2|quic|http3|mirror|resolver" .ddev/nginx_full .ddev/nginx 2>/dev/null
```

If that finds `http2 on`, a `listen ... http2` or `quic` listener, or a `mirror` directive, remove it and `ddev restart`.

## What we're doing

The current `ddev-webserver` image ships Debian Trixie's nginx `1.26.3-3+deb13u10`:

```text
$ ddev exec nginx -v
nginx version: nginx/1.26.3
```

As of today the [Debian security tracker](https://security-tracker.debian.org/tracker/CVE-2026-123007) lists that version as vulnerable, with no fixed package yet. Upstream fixed the bugs in nginx 1.31.9 and 1.30.7. The next DDEV release will include a patched nginx in `ddev-webserver`, as long as Debian has released one by then.

## If you want nginx as soon as Debian updates it

You don't have to wait for a DDEV release. Add `nginx` to [`webimage_extra_packages`](https://docs.ddev.com/en/stable/users/extend/customizing-images/#adding-extra-debian-packages-with-webimage_extra_packages-and-dbimage_extra_packages) in `.ddev/config.yaml`:

```yaml
webimage_extra_packages: [nginx]
```

When DDEV builds the web image, it runs `apt-get update` and then `apt-get install nginx`, which upgrades the installed nginx to the newest version in Debian's `trixie-security` repository. It only takes effect when the image is rebuilt after Debian publishes the update, so once the fixed package is out, rebuild:

```bash
ddev utility rebuild
```

A plain `ddev restart` isn't enough, because the build step hasn't changed and Docker reuses its cached result. Rebuilding before Debian publishes the fix just reinstalls the current version; today the build reports:

```text
nginx is already the newest version (1.26.3-3+deb13u10).
```

Check which version you have with `ddev exec dpkg -l nginx`. If `apt-get update` fails during the build, for example because the network is down, the build still succeeds and keeps the old nginx, so check the version after rebuilding. Once a DDEV release ships the patched nginx, you can remove the line.

## Resources

- [nginx2root](https://nginx2root.com/)
- [Xint's technical writeup](https://xint.io/blog/nginx2root-remote-code-execution)
- [Debian security tracker for CVE-2026-123007](https://security-tracker.debian.org/tracker/CVE-2026-123007)

If you have questions, ask in [Discord](/s/discord) or open an [issue](https://github.com/ddev/ddev/issues).
