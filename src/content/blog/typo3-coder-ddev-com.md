---
title: "TYPO3 Projects on Coder.ddev.com"
pubDate: 2026-07-09
summary: "A short demo of running a TYPO3 project on coder.ddev.com using the 'freeform' Coder template, including a trustedHostsPattern fix and two ways to share the result."
author: Randy Fay
featureImage:
  src: /img/blog/2026/07/typo3-coder-ddev-com.png
  alt: TYPO3, DDEV, and Coder logos stacked vertically
categories:
  - Training
  - Videos
  - Guides
---

[coder.ddev.com](https://coder.ddev.com) gives you a full DDEV environment in the cloud, no local Docker required. This is a quick look at using it for a TYPO3 project with the **freeform** template.

For general background on coder.ddev.com, including access requirements and the other available templates, see [the announcement post](coder-ddev-com-announcement.md).

## Watch the Video

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/Qg_LRV_mz2c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## What You'll See

- How to get access to coder.ddev.com
- Creating a coder.ddev.com workspace with the **freeform** template
- Cloning the [rfay/typo3demo](https://github.com/rfay/typo3demo) project and running `ddev coder-setup` + `ddev start`
- Fixing a `trustedHostsPattern` error with `ddev restart` after Composer brings in the rest of the code
- The working site and TYPO3 backend on the workspace's `*.coder.ddev.com` subdomain
- Two ways to share it: natively with other coder.ddev.com users, or publicly with `ddev share`

## Steps

1. Get access to coder.ddev.com either via your organization having "partner" status with DDEV Foundation or by [asking for access](https://github.com/coder-ddev-com/access-requests).
1. Log in to [coder.ddev.com](https://coder.ddev.com) with GitHub and create a workspace using the **freeform** template. The project name you choose matters, since coder.ddev.com uses it to set up proxying.
1. Open a terminal in the workspace (web terminal, VS Code Web, or SSH via the `coder` CLI) and clone your TYPO3 project.
1. Run `ddev coder-setup` once in the project directory, then `ddev start`. If the project has a `post-start` Composer install hook, like [rfay/typo3demo](https://github.com/rfay/typo3demo), it'll finish setting itself up automatically.
1. If `ddev launch` shows a trusted-host error, it's because Composer brought in the rest of the code after the first `ddev start` already generated `additional.php`. Run `ddev restart` to regenerate it, then reload.

## Sharing What You Built

The workspace can be shared with other coder.ddev.com users directly, without any extra setup.

It can also be shared with `ddev share`, since `rfay/typo3demo` uses a relative `base` (`/camino`) instead of a hardcoded URL. Projects that do hardcode a full URL in `base` need the pre-share/post-share hook fix described in [Sharing Your TYPO3 Project with `ddev share`](ddev-share-with-typo3.md).

## Learn More

- [Introducing coder.ddev.com: DDEV in the Cloud](coder-ddev-com-announcement.md)
- [github.com/ddev/coder-ddev](https://github.com/ddev/coder-ddev) — templates and source for the freeform, drupal-core, and drupal-contrib templates
- [DDEV TYPO3 quickstart](https://docs.ddev.com/en/stable/users/quickstart/#typo3)

If you have questions, reach out in any of the [support channels](https://docs.ddev.com/en/stable/users/support/).

Follow our [blog](https://ddev.com/blog/), [Bluesky](https://bsky.app/profile/ddev.bsky.social), [LinkedIn](https://www.linkedin.com/company/ddev-foundation), [Mastodon](https://fosstodon.org/@ddev), and join us on [Discord](/s/discord). Sign up for the [monthly newsletter](/newsletter).

---

_This article was edited and refined with assistance from Claude Code._
