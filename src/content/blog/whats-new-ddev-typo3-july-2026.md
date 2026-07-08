---
title: "What's New in DDEV for TYPO3 Developers: July 2026"
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

This is a follow-up to [April's roundup](https://news.typo3.com/article/whats-new-in-ddev-for-typo3-developers). Here's what's changed since then.

## TYPO3's `base` URL: Now Fixed for `git worktree` Too

April's update covered [`ddev share`](https://ddev.com/blog/ddev-share-with-typo3/): TYPO3 projects that hardcode a full URL in `config/sites/*/config.yaml`'s `base` setting break when shared, because the tunnel gives you a different random hostname each time. The fix there is elegant once you see it: a `pre-share` hook strips `base` down to just its path (dropping the scheme and hostname entirely), so it matches whatever hostname the request actually arrives on, and a `post-share` hook restores the original value afterward.

The same underlying issue shows up with `git worktree`: each worktree checkout gets its own DDEV project name and `*.ddev.site` hostname, but a hardcoded `base` still points at the first checkout's hostname, so every other worktree 404s. [Using `git worktree` with TYPO3](https://ddev.com/blog/git-worktree-with-typo3/) applies the same path-stripping technique, this time via a `post-start` hook, since a worktree's hostname is stable for the life of the checkout rather than a one-off tunnel session.

Both posts point at the same simplest fix, if you're setting up a new project: don't put a full URL in `base` to begin with. A relative path like `base: /` (or `/your-path/` for a subsite) is hostname-independent and needs no hook at all — it works unmodified for `ddev share`, `git worktree`, and any other hostname change.

## TYPO3 on coder.ddev.com

[coder.ddev.com](https://coder.ddev.com) runs a full DDEV environment in the cloud, no local Docker required. [TYPO3 Projects on Coder.ddev.com](https://ddev.com/blog/typo3-coder-ddev-com/) walks through using it with the **freeform** template.

Unlike `ddev share`'s temporary tunnel, coder.ddev.com gives each workspace a stable `*.coder.ddev.com` subdomain via Traefik host-header routing, which maps that stable external hostname to the right project every time. That means you can set TYPO3's `base` to the full workspace URL directly and it keeps working across restarts, no path-stripping hooks needed.

Access to coder.ddev.com is a perk for organizations that sponsor DDEV at $100+/month — [b13](https://b13.com/) is one such partner — but individuals can also [request access](https://github.com/coder-ddev-com/access-requests) directly.

## DDEV v1.25.3: Faster, and Rootless Is Stable

[DDEV v1.25.3](https://ddev.com/blog/release-v1-25-3/) is out, with `ddev start` about 28% faster on macOS and 21% faster on Linux than v1.25.2, and a similar improvement to `ddev stop`, `ddev restart`, and `ddev poweroff`. You can benchmark it yourself on your own machine and project with [`scripts/compare-start-perf.sh`](https://github.com/ddev/ddev/blob/main/scripts/compare-start-perf.sh).

Podman and Docker Rootless, introduced as experimental in v1.25.0, are now stable. Other changes include a built-in Docker Compose SDK (no more separate `docker-compose` binary to manage), MariaDB 12.3 LTS support, and several Node.js fixes.

## New Diagnostic Utilities

A few new `ddev utility` commands help track down environment problems:

- **`ddev utility port-diagnose`** checks whether another process is already occupying a port DDEV needs (HTTP, HTTPS, Mailpit, XHGui), including separately on WSL2's Linux and Windows sides.
- **`ddev utility tls-diagnose`** checks mkcert installation, OS trust store setup, and live HTTPS connectivity — useful when a browser doesn't trust your DDEV project's certificate.
- **`ddev utility check-custom-config`** lists custom configuration files in your project, flagging ones that don't look like they came from a recognized add-on, so you know what's overriding DDEV's defaults.
- **`ddev utility addon-update-checker`**, for anyone maintaining a DDEV add-on (like the TYPO3 ones below), checks that your add-on's scripts and tooling are current with DDEV's add-on template.

## TYPO3 Add-ons

A few TYPO3-specific DDEV add-ons worth knowing about:

- [`ddev/ddev-typo3-solr`](https://github.com/ddev/ddev-typo3-solr) — Apache Solr (standalone or SolrCloud) integration for the `solr` TYPO3 extension, maintained in the official `ddev` GitHub org.
- [`b13/host_variants`](https://github.com/b13/host_variants) — a more sophisticated way to manage which hostnames TYPO3's router accepts, an alternative to hand-editing `base` for multi-host setups.
- [`dkd-dobberkau/ddev-typo3-password`](https://github.com/dkd-dobberkau/ddev-typo3-password) — a `ddev typo3-password` command for resetting an existing backend user's password without needing email delivery configured.

## DDEV Foundation: Trademark and Governance

Two governance milestones landed recently. [Upsun completed the transfer](https://ddev.com/blog/upsun-trademark-transfer-complete/) of the DDEV trademark to the DDEV Foundation, so DDEV's name and identity are now fully owned by the community-governed foundation rather than any corporate sponsor. That builds on the [Foundation's Board of Directors](https://ddev.com/blog/board-of-directors-established/), which, incidentally, includes Benni Mack, TYPO3 CMS Project Lead, alongside Drupal and Backdrop community members.

## From the Community

[ochorocho](https://gitlab.com/ochorocho)'s [GitLab Runner DDEV executor](https://gitlab.com/ochorocho/gitlab-runner-ddev-executor-tester) runs GitLab CI/CD jobs inside isolated, rootless-Docker DDEV environments, one unprivileged Linux user and Docker daemon per project, for running untrusted code safely on shared runner infrastructure.

[Knecht](https://knecht.works/) is a third-party automation dashboard that boots up your existing DDEV projects and runs maintenance workflows, like security updates, bugfixes, and database migrations, against a real running environment, producing a pull request with a preview link at the end. It uses the DDEV configuration already in your project, with no extra tooling required. Knecht is [looking for beta testers](https://knecht.works/updates/beta-tester/) among agencies running multiple DDEV-based projects, including TYPO3 ones, offering free setup and OpenCode credit in exchange for feedback.

## What Should We Cover Next?

If you're working on something DDEV-related in the TYPO3 space, or have run into a rough edge we should know about, reach out on the [DDEV Discord](/s/discord) or any of the other [support channels](https://docs.ddev.com/en/stable/users/support/) — we'd like these updates to reflect what's actually useful to you, not just what we happened to notice.

Thanks for nearly a decade of collaboration with the TYPO3 project, and for your continued support of DDEV.
