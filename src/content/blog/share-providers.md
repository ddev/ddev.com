---
title: "New `ddev share` Provider System: Cloudflare tunnel with no login or token"
pubDate: 2026-02-12
summary: "DDEV v1.25.0 introduces a flexible provider system for `ddev share`, adding free Cloudflare tunnel support, automation capabilities, and extensibility for custom sharing solutions."
author: Randy Fay
modifiedDate: 2026-07-04
modifiedComment: "Updated the TYPO3 example to match DDEV's official host-stripping approach, and linked to a dedicated TYPO3 screencast"
featureImage:
  src: /img/blog/2026/02/ddev-share-banner.png
  alt: DDEV now supports many ways to do `ddev share` including cloudflared, ngrok, and even custom share providers
categories:
  - Announcements
  - Training
  - DevOps
---

**Update (2026-07-04)**: The TYPO3 example below has been updated to match DDEV's official host-stripping approach. See [Sharing Your TYPO3 Project with `ddev share`](ddev-share-with-typo3.md) for a screencast walkthrough.

---

Sharing your local development environment with clients, colleagues, or testing services has always been a valuable DDEV feature. DDEV v1.25.0 makes this easier and more flexible than ever with a complete redesign of `ddev share`. The biggest news is that you can now share your projects for free using Cloudflare Tunnel—no account signup or token setup required.

## What Changed in `ddev share`

Previous versions of DDEV relied exclusively on ngrok for sharing. While ngrok remains a solid choice with advanced features, v1.25.0 introduces a modular provider system allowing more options and flexibility. DDEV now ships with two built-in providers:

- **ngrok**: The traditional option (requires free account and authtoken)
- **cloudflared**: A new, cost-free option using Cloudflare Tunnel (requires no account or token)

You can select providers via command flags, project configuration, or global defaults. Existing projects using ngrok continue working unchanged, and ngrok remains the default provider.

## Free Sharing with Cloudflare Tunnel

Cloudflare Tunnel provides production-grade infrastructure for sharing your local environments at zero cost. After [installing the `cloudflared` CLI](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/), getting started is:

```bash
ddev share --provider=cloudflared
```

No account creation, no authentication setup, no subscription tiers—just immediate access to share your work. This removes barriers for individual developers and teams who need occasional sharing without the overhead of managing service accounts.

When should you use cloudflared vs ngrok? Use cloudflared for quick, free sharing during development and testing. Choose ngrok if you need stable subdomains, custom domains, or advanced features like IP allowlisting and OAuth protection. (However, if you control a domain registered at Cloudflare, you can set up a named tunnel for a stable, permanent URL—see [Setting up a Stable Cloudflared Domain](https://docs.ddev.com/en/stable/users/topics/sharing/#setting-up-a-stable-cloudflared-domain) in the docs.)

## Configuration Flexibility

You can set your preferred provider at multiple levels:

```bash
# Use a specific provider for this session
ddev share --provider=cloudflared

# Set default provider for the current project
ddev config --share-default-provider=cloudflared

# Set global default for all projects
ddev config global --share-default-provider=cloudflared
```

This flexibility lets you use different providers for different projects or standardize across your entire development setup.

**Tip**: Your CMS or framework may have "trusted host patterns" configuration that denies access to the site when hosted at an unknown URL. You'll need to configure to allow all or specific URLs. For example, in Drupal, `$settings['trusted_host_patterns'] = ['.*'];` or in TYPO3 `'trustedHostsPattern' => '.*.*'`.

## Automation for difficult CMSs using `pre-share` hooks and $DDEV_SHARE_URL

When you run `ddev share`, DDEV now exports the tunnel URL as the `DDEV_SHARE_URL` environment variable. This enables automation through hooks, particularly useful for integration testing, webhooks, or CI workflows that need the public URL.

### WordPress Example

WordPress is always difficult because it embeds the URL right in the database. For sites to use a different URL the `wp search-replace` tool is the classic way to deal with this, so the hook demonstration below can be used to make `ddev share` work even when the URL is dynamic.

```yaml
# .ddev/config.yaml
hooks:
  pre-share:
    # provide DDEV_SHARE_URL in container
    - exec-host: echo "${DDEV_SHARE_URL}" >.ddev/share_url.txt
    # Save database for restore later
    - exec-host: ddev export-db --file=/tmp/tmpdump.sql.gz
    # Change the URL in the database
    - exec: wp search-replace ${DDEV_PRIMARY_URL} $(cat /mnt/ddev_config/share_url.txt) | grep Success
    # Fix the wp-config-ddev.php to use the DDEV_SHARE_URL
    - exec: cp wp-config-ddev.php wp-config-ddev.php.bak
    - exec: sed -i.bak "s|${DDEV_PRIMARY_URL}|$(cat /mnt/ddev_config/share_url.txt)|g" wp-config-ddev.php
    - exec: wp cache flush
  post-share:
    # Put back the things we changed
    - exec: cp wp-config-ddev.php.bak wp-config-ddev.php
    - exec-host: ddev import-db --file=/tmp/tmpdump.sql.gz
```

This approach works for any CMS that stores base URLs in its configuration or database. The pre-share hook updates URLs automatically, and you can use post-share hooks to restore them when sharing ends. This eliminates the manual configuration work that sharing previously required for many CMSs.

### TYPO3 Example

TYPO3 stores each site's base URL in `config/sites/<identifier>/config.yaml` as an absolute `base:` URL, for example `base: 'https://typo3.ddev.site/'`. TYPO3 only routes requests whose Host header exactly matches `base`, so a `ddev share` tunnel hostname 404s until `base` is adjusted.

The simplest, permanent fix is to set `base: /` (or `/your-path/` for a site under a subpath) by hand, then run `ddev typo3 cache:flush` to clear the derived routing caches.

For an automatic, reversible fix that's safe for multi-site projects, use `pre-share`/`post-share` hooks that strip only the scheme and host from `base`, preserving any existing path. This matters for multi-site projects—blanking every `base` collapses all sites to the same host-less `/` route, and only one of them wins:

```yaml
hooks:
  pre-share:
    - exec: |
        for f in config/sites/*/config.yaml; do
          cp "$f" "$f.pre-share-backup"
          newbase=$(yq '.base' "$f" | sed -E 's#^https?://[^/]+##')
          [ -z "$newbase" ] && newbase="/"
          yq -i ".base = \"$newbase\"" "$f"
        done
        typo3 cache:flush
  post-share:
    - exec: |
        for f in config/sites/*/config.yaml.pre-share-backup; do
          mv "$f" "${f%.pre-share-backup}"
        done
        typo3 cache:flush
```

This doesn't handle `baseVariants` entries or per-language `base` overrides, which are more advanced, less common setups. See [Sharing Your TYPO3 Project with `ddev share`](ddev-share-with-typo3.md) for a full walkthrough and screencast, and a ready-to-clone example at [rfay/typo3demo](https://github.com/rfay/typo3demo).

### Magento 2 Example

Magento2 has pretty easy control of the URL, so the hooks are pretty simple:

```yaml
hooks:
  pre-share:
    # Switch magento to the share URL
    - exec-host: ddev magento setup:store-config:set --base-url="${DDEV_SHARE_URL}"
  post-share:
    # Switch back to the normal local URL
    - exec-host: ddev magento setup:store-config:set --base-url="${DDEV_PRIMARY_URL}"
```

## Extensibility: Custom Share Providers

The new provider system is script-based, allowing you to create custom providers for internal tunneling solutions or other services. Place Bash scripts in `.ddev/share-providers/` (project-level) or `$HOME/.ddev/share-providers/` (global), and DDEV will recognize them as available providers.

For details on creating custom providers, see the [sharing documentation](https://docs.ddev.com/en/stable/users/topics/sharing/).

An example of a share provider for `localtunnel` is provided in `.ddev/share-providers/localtunnel.sh.example` and you can experiment with it by just copying that to `.ddev/share-providers/localtunnel.sh`.

## Questions

<dl>
<dt>Do I need to change anything in existing projects?</dt>
<dd>No. Ngrok remains the default provider, so existing projects continue working without any changes. Your ngrok authtokens and configurations are fully compatible with v1.25+.</dd>

<dt>When should I use cloudflared vs ngrok?</dt>
<dd>Use cloudflared for quick, free sharing during development and testing. Use ngrok if you need stable subdomains, custom domains, or advanced features like IP allowlisting and OAuth protection.</dd>

<dt>Can I create my own share provider?</dt>
<dd>Yes! Place bash scripts in <code>.ddev/share-providers/</code> (project-level) or <code>$HOME/.ddev/share-providers/</code> (global). See the <a href="https://docs.ddev.com/en/stable/users/topics/sharing/">sharing documentation</a> for implementation details.</dd>
</dl>

## Try It Today

DDEV v1.25.0 is now available. Use the techniques above, and try out Cloudflared to see if you like it.

For complete details on the new sharing system, see the [sharing documentation](https://docs.ddev.com/en/stable/users/topics/sharing/).

Join us on [Discord](/s/discord), follow us on [Mastodon](https://fosstodon.org/@ddev), [Bluesky](https://bsky.app/profile/ddev.com), or [LinkedIn](https://www.linkedin.com/company/ddev-foundation/), and subscribe to our [newsletter](https://ddev.com/newsletter/) for updates.

This blog was drafted and reviewed by AI including Claude Code.
