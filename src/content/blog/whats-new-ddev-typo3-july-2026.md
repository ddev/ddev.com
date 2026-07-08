---
title: "What's New in DDEV for TYPO3 Folks: July 2026"
pubDate: 2026-07-10
summary: "An update for TYPO3 developers: git worktree support for TYPO3's base URL, TYPO3 on coder.ddev.com, a faster DDEV v1.25.3, new diagnostic utilities, TYPO3 add-ons, and DDEV Foundation governance news."
author: Randy Fay
featureImage:
  src: /img/blog/2026/07/typo3-ddev-july-2026-roundup.png
  alt: DDEV and TYPO3 logos
categories:
  - Announcements
  - Community
---

Here's our latest TYPO3-with-DDEV news wrap-up, following up [April's roundup](https://news.typo3.com/article/whats-new-in-ddev-for-typo3-developers). Here's what you need to know.

## Please, Ask Us Questions, Explain Your Problems!

I think you've all seen the change AI has brought in interaction with software. It's mighty effective in answering questions, often correctly, and it does a great job with DDEV and TYPO3 questions, because both are so widely and openly documented.

But! Interaction with maintainers is not just about you getting an answer to move forward, it's about maintainers getting the feedback they need about frictions, missing features, and inadequate documentation. When you have a question or problem with DDEV, it's OK to get an answer from AI, but please ask us and help us understand it as well. Join us in [Discord](/s/discord) or the [issue queue](https://github.com/ddev/ddev/issues). We delight to interact with you.

## TYPO3 `ddev share` is even better, with screencast

[Sharing Your TYPO3 Project with `ddev share` (Video)](ddev-share-with-typo3.md) shows how you can share your local project for review or collaboration or discussion with anybody on the internet.

## TYPO3 `git worktree` for working on multiple features (or multiple AI agents)

[Git Worktree with TYPO3 (video)](git-worktree-with-typo3) demonstrates how you can run multiple DDEV projects from the same Git repository at the same time, with separate code changes, databases and URLs. Even when projects hardcode a full URL in `config/sites/*/config.yaml`'s `base`, a simple set of `post-start` hooks can fix that. The fix there is elegant once you see it: a `pre-share` hook strips `base` down to just its path (dropping the scheme and hostname entirely), so it matches whatever hostname the request actually arrives on, and a `post-share` hook restores the original value afterward.

## TYPO3 on coder.ddev.com

[coder.ddev.com](https://coder.ddev.com) runs a full DDEV environment in the cloud, no local Docker required. [TYPO3 Projects on Coder.ddev.com](https://ddev.com/blog/typo3-coder-ddev-com/) walks through using it with the **freeform** template.

Unlike `ddev share`'s temporary tunnel, coder.ddev.com gives each workspace a stable `*.coder.ddev.com` subdomain via Traefik host-header routing, which maps that stable external hostname to the right project every time.

Access to coder.ddev.com is a perk for organizations that sponsor DDEV at $100+/month — [b13](https://b13.com/) is one partner in the TYPO3 space — but individuals can also [request access](https://github.com/coder-ddev-com/access-requests) directly.

## DDEV v1.25.3: Faster, and Docker/Podman Rootless Is Stable

[DDEV v1.25.3](https://ddev.com/blog/release-v1-25-3/) is out, with `ddev start` about 28% faster than v1.25.2, and a similar improvement to `ddev stop`, `ddev restart`, and `ddev poweroff`.

Podman and Docker Rootless, introduced as experimental in v1.25.0, are now stable. Other changes include a built-in Docker Compose SDK (no more separate `docker-compose` binary to manage), MariaDB 12.3 LTS support, and several Node.js fixes.

## New Diagnostic Utilities

A few new `ddev utility` commands help track down environment problems:

- **`ddev utility port-diagnose`** checks whether another process is already occupying a port DDEV needs (HTTP, HTTPS, Mailpit, XHGui), including separately on WSL2's Linux and Windows sides.
- **`ddev utility tls-diagnose`** checks mkcert installation, OS trust store setup, and live HTTPS connectivity — useful when a browser doesn't trust your DDEV project's certificate.
- **`ddev utility check-custom-config`** lists custom configuration files in your project, flagging ones that don't look like they came from a recognized add-on, so you know what's overriding DDEV's defaults.
- **`ddev utility addon-update-checker`**, for anyone maintaining a DDEV add-on (like the TYPO3 ones below), checks that your add-on's scripts and tooling are current with DDEV's add-on template.

## TYPO3 Add-ons

A few TYPO3-specific DDEV tools worth knowing about:

- [`ddev/ddev-typo3-solr`](https://github.com/ddev/ddev-typo3-solr) — add-on for the Apache Solr (standalone or SolrCloud) integration for the `solr` TYPO3 extension, maintained in the official `ddev` GitHub org.
- [`dkd-dobberkau/ddev-typo3-password`](https://github.com/dkd-dobberkau/ddev-typo3-password) — add-on provides a `ddev typo3-password` command for resetting an existing backend user's password without needing to use `ddev mailpit` to confirm it.
- [`b13/host_variants`](https://github.com/b13/host_variants) — TYPO3 extension to manage which hostnames TYPO3's router accepts, an alternative to editing `base` for multisites or sites with explicit URL in `base`.

## DDEV Foundation: Trademark and Governance

Two governance milestones landed recently. [Upsun completed the transfer](https://ddev.com/blog/upsun-trademark-transfer-complete/) of the DDEV trademark to the DDEV Foundation, so DDEV's name and identity are now fully owned by the community-governed foundation rather than any external entity. And the [DDEV Foundation's Board of Directors](https://ddev.com/blog/board-of-directors-established/) had its first meeting in June. The board includes Benni Mack, TYPO3 CMS Project Lead, alongside Drupal and Backdrop community members.

## From the Community

[ochorocho](https://gitlab.com/ochorocho)'s [GitLab Runner DDEV executor](https://gitlab.com/ochorocho/gitlab-runner-ddev-executor-tester) runs GitLab CI/CD jobs inside isolated, rootless-Docker DDEV environments, one unprivileged Linux user and Docker daemon per project, for running untrusted code safely on shared runner infrastructure.

[Knecht](https://knecht.works/) (in German) is a third-party automation dashboard that boots up your existing DDEV projects and runs maintenance workflows, like security updates, bugfixes, and database migrations, against a real running environment, producing a pull request with a preview link at the end. It uses the DDEV configuration already in your project, with no extra tooling required. Knecht is [looking for beta testers](https://knecht.works/updates/beta-tester/) among agencies running multiple DDEV-based projects, offering free setup and OpenCode credit in exchange for feedback.

## What Should We Cover Next?

If you're working on something DDEV-related in the TYPO3 space, or have run into a rough edge we should know about, reach out on the [DDEV Discord](/s/discord) or any of the other [support channels](https://docs.ddev.com/en/stable/users/support/) — we'd like these updates to reflect what's actually useful to you, not just what we happened to notice.

Thanks for nearly a decade of collaboration with the TYPO3 project, and for your continued support of DDEV.
