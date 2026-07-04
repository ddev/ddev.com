---
title: "Sharing Your TYPO3 Project with `ddev share` (Video)"
pubDate: 2026-07-07
summary: "How to use DDEV's `ddev share` command to expose a local TYPO3 project on a public URL, including the `base` URL config quirk and the pre-share/post-share hooks that fix it."
author: Randy Fay
featureImage:
  src: /img/blog/2026/07/ddev-share-typo3.png
  alt: DDEV share with TYPO3
  # TODO: suggested featureImage - a graphic combining the DDEV logo and TYPO3 logo,
  # or a screenshot of a shared TYPO3 site being viewed from an external device
categories:
  - Training
  - Videos
  - Guides
---

TYPO3 projects sometimes provide a special challenge for `ddev share` if they have the full URL specified in the `config/sites/*/config.yaml` `base`, like `base: https://typo3demo.ddev.site`. When you `ddev share` and get an arbitrary URL from Cloudflared or ngrok, TYPO3 refuses to show the site because it's not the specified URL.

This isn't a problem at all if the `base` element doesn't include the URL. For example, with `base: /camino` on a project like the [DDEV TYPO3 quickstart](https://docs.ddev.com/en/stable/users/quickstart/#typo3), everything works fine out of the box, there's nothing to do. The share URL with `/camino` will work fine.

But we can solve this problem with DDEV's pre-share hooks, see below

## Watch the Video

<!-- TODO: replace VIDEO_ID with the real YouTube video ID once published -->

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## What You'll See

- Basic `ddev share` without URL in `base`
- Problem `ddev share` with URL
- Fix with `pre-share` hooks

## The Fix: `pre-share` and `post-share` Hooks

DDEV exports the tunnel URL as `$DDEV_SHARE_URL` when you run `ddev share`. You can use `pre-share` and `post-share` hooks to temporarily disable the `base:` setting for the duration of the share session, and restore it afterward:

```yaml
# .ddev/config.yaml
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

This strategy checks your config.yaml, temporarily updates the `base` to use only the required `/` or other URL, and then does a `typo3 cache:flush`.

At the end of the share, the original `config.yaml` is restored by the `post-share` hook.

Of course your project should be under Git source control in case anything should go wrong, or you never exit the share, etc.

## Trusted Host Patterns

DDEV already automatically adds the `trustedHostsPattern` to the `additional.php` which is used only running with DDEV. This allows the project to work on a shared URL.

```php
  'SYS' => [
      'trustedHostsPattern' => '.*.*',
      'devIPmask' => '*',
      'displayErrors' => 1,
  ],
```

## Example project: `rfay/typo3demo`

A pre-built example project based on the TYPO3 docs and DDEV quickstart is at [rfay/typo3demo](https://github.com/rfay/typo3demo), and has `post-start` hooks for `composer: install` and `pre-share` hooks as described here.

## Learn More

For background on the `ddev share` provider system, including using either `ngrok` or the free Cloudflare Tunnel option and how `$DDEV_SHARE_URL` hooks work for other CMSs, see [the announcement blog](share-providers.md) and the [docs on `ddev share`](https://docs.ddev.com/en/stable/users/topics/sharing/#using-ddev-share-easiest).

If you have questions, reach out in any of the [support channels](https://docs.ddev.com/en/stable/users/support/).

Follow our [blog](https://ddev.com/blog/), [Bluesky](https://bsky.app/profile/ddev.bsky.social), [LinkedIn](https://www.linkedin.com/company/ddev-foundation), [Mastodon](https://fosstodon.org/@ddev), and join us on [Discord](/s/discord). Sign up for the [monthly newsletter](/newsletter).

---

_This article was edited and refined with assistance from Claude Code._
