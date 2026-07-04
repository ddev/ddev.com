---
title: "Using `git worktree` with TYPO3 (Video)"
pubDate: 2026-07-08
summary: "How multiple git worktree checkouts of a TYPO3 project interact with DDEV's per-directory naming, and how to fix TYPO3's absolute base URL so every worktree works out of the box."
author: Randy Fay
featureImage:
  src: /img/blog/2026/07/git-worktree-typo3.png
  alt: git worktree with TYPO3 and DDEV
  # TODO: suggested featureImage - a graphic combining a git branching/worktree diagram with the TYPO3 logo
categories:
  - Training
  - Videos
  - Guides
---

TYPO3 projects sometimes provide a special challenge for `git worktree` if they have the full URL specified in `config/sites/*/config.yaml`'s `base`, like `base: https://typo3.ddev.site/`. When you add a second `git worktree` checkout, DDEV names that project after its directory, giving it a different `*.ddev.site` hostname—but TYPO3's `base` still points at the first worktree's hostname, so the second one 404s or serves the wrong site.

This is the same underlying problem covered in [Sharing Your TYPO3 Project with `ddev share`](ddev-share-with-typo3.md), just triggered by a different hostname change. If your `base` is already a relative path like `/camino`, as in the [DDEV TYPO3 quickstart](https://docs.ddev.com/en/stable/users/quickstart/#typo3), there's nothing to fix—every worktree works out of the box.

## Watch the Video

<!-- TODO: replace VIDEO_ID with the real YouTube video ID once published -->
<!-- TODO: video contents
  - Cloning a TYPO3 project and adding a second git worktree checkout
  - Omitting `name:` so each worktree gets its own hostname automatically
  - Demonstrating the `base` URL mismatch breaking the second worktree
  - Fixing it with a `post-start` hook
-->

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## What You'll See

- Removing `name` from project `.ddev/config.yaml`
- Using `ddev config global --omit-name-by-default`
- Setting up a second `git worktree` checkout of a TYPO3 project
- Each project getting its own hostname from its directory name
- The `base` URL mismatch breaking the second worktree
- Fixing it with a `post-start` hook

## Why Worktrees Get Different Hostnames

By default, DDEV names a project after the directory it lives in. Remove the `name:` key from `.ddev/config.yaml` (or set this globally with `ddev config global --omit-project-name-by-default`) and every `git worktree` checkout gets its own project name and `*.ddev.site` hostname automatically, matching its directory.

That's exactly what you want for running several branches side by side, as covered in [Contributor Training: `git worktree` for Multiple DDEV Projects](git-worktree-contributor-training.md)—but it means a TYPO3 project with a hardcoded `base` with a URL will only work correctly in whichever single worktree happens to match that hostname.

## The Fix: a `post-start` Hook

Unlike `ddev share`, where the tunnel URL is temporary and the `pre-share`/`post-share` hooks restore the original `base` afterward, a worktree's hostname is permanent for the life of that checkout. So instead of a temporary swap, use a `post-start` hook that sets `base` to match whatever hostname the current worktree actually has, every time it starts:

```yaml
# .ddev/config.yaml
hooks:
  post-start:
    - exec: |
        for f in config/sites/*/config.yaml; do
          yq -i ".base = \"${DDEV_PRIMARY_URL}/\"" "$f"
        done
        typo3 cache:flush
```

`$DDEV_PRIMARY_URL` is DDEV's environment variable for the project's own URL, so this hook works unmodified in every worktree—each one sets `base` to its own hostname on every `ddev start`, with no manual editing and nothing to revert.

If you don't need an absolute `base` at all, the simpler fix is to make it relative—`base: /` (or `/your-path/` for a subpath)—which is hostname-independent and needs no hook. That works for `git worktree`, `ddev share`, and any other hostname change alike, as described in [New `ddev share` Provider System](share-providers.md).

## Trusted Host Patterns

DDEV already automatically adds a `trustedHostsPattern` to `additional.php` for any hostname running under DDEV, so PHP's own host validation isn't a concern here—only TYPO3's `base` setting is.

```php
  'SYS' => [
      'trustedHostsPattern' => '.*.*',
      'devIPmask' => '*',
      'displayErrors' => 1,
  ],
```

## Setting Up the Database and Files

Each worktree is a separate DDEV project, so it needs its own database and files. See [Setting Up the Database and Files](git-worktree-contributor-training.md) in the `git worktree` training post for exporting from one checkout and importing into another.

## Example project: `rfay/typo3demo`

A pre-built example project based on the TYPO3 docs and DDEV quickstart is at [rfay/typo3demo](https://github.com/rfay/typo3demo), with the `post-start` hook described here already in place.

## Learn More

For background on `git worktree` with DDEV in general, see [Contributor Training: `git worktree` for Multiple DDEV Projects](git-worktree-contributor-training.md). For more on TYPO3's `base` URL and the `ddev share` version of this problem, see [Sharing Your TYPO3 Project with `ddev share`](ddev-share-with-typo3.md) and the [docs on `ddev share`](https://docs.ddev.com/en/stable/users/topics/sharing/#using-ddev-share-easiest).

If you have questions, reach out in any of the [support channels](https://docs.ddev.com/en/stable/users/support/).

Follow our [blog](https://ddev.com/blog/), [Bluesky](https://bsky.app/profile/ddev.bsky.social), [LinkedIn](https://www.linkedin.com/company/ddev-foundation), [Mastodon](https://fosstodon.org/@ddev), and join us on [Discord](/s/discord). Sign up for the [monthly newsletter](/newsletter).

---

_This article was edited and refined with assistance from Claude Code._
