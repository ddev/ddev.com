---
title: "TYPO3 Projects on Coder.ddev.com"
pubDate: 2026-07-09
summary: "A short demo of running a TYPO3 project on coder.ddev.com using the 'freeform' Coder template, with stable subdomain URLs via Traefik routing."
author: Randy Fay
featureImage:
  src: /img/blog/2026/07/typo3-coder-ddev-com.png
  alt: TYPO3, DDEV, and Coder logos stacked vertically
categories:
  - Training
  - Videos
  - Guides
---

[coder.ddev.com](https://coder.ddev.com) gives you a full DDEV environment in the cloud, no local Docker required. This is a quick look at using it for a TYPO3 project with the **freeform** template, which provides stable subdomain URLs via Traefik routing instead of the port-forwarding you'd otherwise need in a cloud container.

For general background on coder.ddev.com, including access requirements and the other available templates, see [the announcement post](coder-ddev-com-announcement.md).

## Watch the Video

<!-- TODO: add video embed once the screencast is recorded -->

## What You'll See

- Creating a workspace with the **freeform** template
- Cloning a TYPO3 project and running `ddev coder-setup` + `ddev start`
- Accessing the project on its stable `*.coder.ddev.com` subdomain
- Setting TYPO3's `base` URL to match, since the subdomain doesn't change between restarts

## Steps

1. Log in to [coder.ddev.com](https://coder.ddev.com) with GitHub and create a workspace using the **freeform** template.
2. Open a terminal in the workspace (web terminal, VS Code Web, or SSH via the `coder` CLI) and clone your TYPO3 project.
3. Run `ddev coder-setup` once in the project directory, then `ddev start`.
4. Find the project's stable URL with `ddev describe` or `ddev launch` — it looks like `https://<workspace>--<workspace>--<owner>.coder.ddev.com/`.

## A Stable URL Means No `base` Workaround

TYPO3 projects that hardcode a full URL in `config/sites/*/config.yaml`'s `base` setting need special handling with `ddev share`, because each share session gets a new random tunnel URL — see [Sharing Your TYPO3 Project with `ddev share`](ddev-share-with-typo3.md) for the pre-share/post-share hook fix.

The freeform template doesn't have this problem: the `*.coder.ddev.com` subdomain for a given workspace and project stays the same across restarts. Set `base` to that URL directly, and it keeps working without any hooks.

## Learn More

- [Introducing coder.ddev.com: DDEV in the Cloud](coder-ddev-com-announcement.md)
- [github.com/ddev/coder-ddev](https://github.com/ddev/coder-ddev) — templates and source for the freeform, drupal-core, and drupal-contrib templates
- [DDEV TYPO3 quickstart](https://docs.ddev.com/en/stable/users/quickstart/#typo3)

If you have questions, reach out in any of the [support channels](https://docs.ddev.com/en/stable/users/support/).

Follow our [blog](https://ddev.com/blog/), [Bluesky](https://bsky.app/profile/ddev.bsky.social), [LinkedIn](https://www.linkedin.com/company/ddev-foundation), [Mastodon](https://fosstodon.org/@ddev), and join us on [Discord](/s/discord). Sign up for the [monthly newsletter](/newsletter).

---

_This article was edited and refined with assistance from Claude Code._
