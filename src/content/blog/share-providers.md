---
title: "New `ddev share` Provider System Brings Free Sharing Options"
pubDate: 2026-01-22
summary: "DDEV v1.25.0 introduces a flexible provider system for `ddev share`, bringing free Cloudflare tunnel support, automation capabilities, and extensibility for custom sharing solutions."
author: Randy Fay
#featureImage:
#  src: /img/blog/2026/01/ddev-share-providers.png
#  alt: DDEV v1.25.0 share command with cloudflared provider support
categories:
  - Announcements
  - Training
  - DevOps
---

Sharing your local development environment with clients, colleagues, or testing services has always been a valuable DDEV feature. DDEV v1.25.0 makes this easier and more flexible than ever with a complete redesign of `ddev share`. The biggest news? You can now share your projects for free using Cloudflare Tunnel—no account signup or token setup required.

## What Changed in `ddev share`

Previous versions of DDEV relied exclusively on ngrok for sharing. While ngrok remains a solid choice with advanced features, v1.25.0 introduces a modular provider system that gives you options. DDEV now ships with two built-in providers:

- **ngrok**: The traditional option (requires account and authtoken)
- **cloudflared**: A new, cost-free option using Cloudflare Tunnel (requires no account or token)

You can select providers via command flags, project configuration, or global defaults—whichever fits your workflow. Existing projects using ngrok continue working unchanged; ngrok remains the default provider.

## Free Sharing with Cloudflare Tunnel

Cloudflare Tunnel provides production-grade infrastructure for sharing your local environments at zero cost. After [installing the client](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/create-local-tunnel/), getting started is as simple as:

```bash
ddev share -provider cloudflared
```

No account creation, no authentication setup, no subscription tiers—just immediate access to share your work. This removes barriers for individual developers and teams who need occasional sharing without the overhead of managing service accounts.

When should you use cloudflared vs ngrok? Use cloudflared for quick, free sharing during development and testing. Choose ngrok if you need stable subdomains, custom domains, or advanced features like IP allowlisting and OAuth protection.

## Configuration Flexibility

You can set your preferred provider at multiple levels:

```bash
# Use a specific provider for this session
ddev share -provider cloudflared

# Set default provider for the current project
ddev config --share-provider=cloudflared

# Set global default for all projects
ddev config global --share-provider=cloudflared
```

This flexibility lets you use different providers for different projects or standardize across your entire development setup.

## Automation with DDEV_SHARE_URL

When you run `ddev share`, DDEV now exports the tunnel URL as the `DDEV_SHARE_URL` environment variable. This enables automation through hooks, particularly useful for integration testing, webhooks, or CI workflows that need the public URL.

A practical example: sharing WordPress or TYPO3 sites used to require manual database updates to replace localhost URLs with the share URL. Now you can automate this with pre-share hooks that run before the tunnel starts:

```yaml
# .ddev/config.yaml
hooks:
  pre-share:
    - exec: |
        if [ -n "$DDEV_SHARE_URL" ]; then
          # WordPress example
          wp search-replace "https://myproject.ddev.site" "$DDEV_SHARE_URL" --quiet
        fi
```

This approach works for any CMS that stores base URLs in its configuration or database. The pre-share hook updates URLs automatically, and you can use post-share hooks to restore them when sharing ends. This eliminates the manual configuration work that sharing previously required for many CMSs.

## Extensibility: Custom Share Providers

The new provider system is script-based, allowing you to create custom providers for internal tunneling solutions or other services. Place Bash scripts in `.ddev/share-providers/` (project-level) or `~/.ddev/share-providers/` (global), and DDEV will recognize them as available providers.

For details on creating custom providers, see the [sharing documentation](https://docs.ddev.com/en/stable/users/topics/sharing/).

## Questions

<dl>
<dt>Do I need to change anything in existing projects?</dt>
<dd>No. Ngrok remains the default provider, so existing projects continue working without any changes. Your ngrok authtokens and configurations are fully compatible with v1.25.0.</dd>

<dt>When should I use cloudflared vs ngrok?</dt>
<dd>Use cloudflared for quick, free sharing during development and testing. Use ngrok if you need stable subdomains, custom domains, or advanced features like IP allowlisting and OAuth protection.</dd>

<dt>Can I create my own share provider?</dt>
<dd>Yes! Place bash scripts in `.ddev/share-providers/` (project-level) or `~/.ddev/share-providers/` (global). See the <a href="https://docs.ddev.com/en/stable/users/topics/sharing/">sharing documentation</a> for implementation details.</dd>
</dl>

## Try It Today

DDEV v1.25.0 is now available. Upgrade and try `ddev share -p cloudflared` to experience zero-friction sharing. Whether you choose free Cloudflare Tunnel for convenience or ngrok for advanced features, the new provider system gives you the flexibility to share on your terms.

For complete details on the new sharing system, see the [sharing documentation](https://docs.ddev.com/en/stable/users/topics/sharing/) and [PR #7802](https://github.com/ddev/ddev/pull/7802).

Join us on [Discord](https://discord.gg/5wjP76mBJD), follow us on [Mastodon](https://fosstodon.org/@ddev), [Bluesky](https://bsky.app/profile/ddev.com), or [LinkedIn](https://www.linkedin.com/company/ddev-foundation/), and subscribe to our [newsletter](https://ddev.com/newsletter/) for updates.

This blog was drafted and reviewed by AI including Claude Code.
