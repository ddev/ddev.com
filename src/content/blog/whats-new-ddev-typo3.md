---
title: "What's New in DDEV for TYPO3 Developers"
pubDate: 2026-04-07
summary: "A roundup of recent DDEV improvements relevant to TYPO3 developers: improved ddev share with TYPO3 hooks, a new TUI dashboard, better Windows installation, new diagnostic utilities, and rootless container support."
author: Randy Fay
featureImage:
  src: /img/blog/2026/04/ddev-dashboard-tui-typo3.png
  alt: DDEV and TYPO3 logos
categories:
  - Announcements
  - Guides
---

Lots has been going in the DDEV world for TYPO3 developers. Here's an update.

## `ddev share` Works with TYPO3

DDEV v1.25.0 redesigned `ddev share` with a modular provider system. You can now share your local project using Cloudflare Tunnel for free—no account or token required—in addition to the existing ngrok support.

For TYPO3 projects, sharing has always had a friction point: TYPO3 stores its site URL in `config/sites/*/config.yaml` as `base: <url>`, which causes it to reject requests coming from the share tunnel URL.

DDEV now supports `pre-share` and `post-share` hooks, combined with the `$DDEV_SHARE_URL` environment variable, to automate this. When you run `ddev share`, DDEV exports the tunnel URL before sharing starts. You can use that URL to temporarily patch your TYPO3 site configuration, then restore it when sharing ends.

The full documentation with more examples is in the [ddev share provider system blog post](https://ddev.com/blog/share-providers/).

## New Terminal UI Dashboard

<!-- TODO: Link to TUI/dashboard blog post when published -->

DDEV now includes an interactive terminal dashboard accessible with just `ddev`. The dashboard gives you a real-time view of running projects, service status, and quick access to common commands—without leaving the terminal.

This is particularly useful when juggling multiple TYPO3 sites locally, as you can see all running projects at a glance.

See the 2-minute demonstration [on YouTube](https://www.youtube.com/watch?v=bdfpeq74ewo).

## Improved Windows Installation

The DDEV installer for Windows has been significantly improved. Setup no longer requires elevated PowerShell scripts or manual WSL2 configuration. The GUI installer handles WSL2 setup automatically and works with Docker Desktop, Rancher Desktop, or Docker CE.

See the [10-minute from-scratch install](https://ddev.com/blog/watch-new-windows-installer/) for the short version, [extended demonstration](https://ddev.com/blog/watch-ddev-local-from-scratch-with-windows-wsl2/), and [DDEV v1.25.0 announcement with simplified installer](https://ddev.com/blog/release-v1250/).

## New Diagnostic Utilities

Two new `ddev utility` subcommands help diagnose nagging issues in some environments. Most people have no trouble with these, but when they do, these new utilitiies can help:

**`ddev utility xdebug-diagnose`** runs a series of checks on your Xdebug configuration and reports what it finds. If Xdebug isn't connecting to your IDE, this is the first thing to run. The [Xdebug troubleshooting blog post](https://ddev.com/blog/xdebug-step-debugging-understanding-and-troubleshooting/) covers the underlying concepts in detail.

**`ddev utility mutagen-diagnose`** checks Mutagen sync status and common configuration problems. If you're using Mutagen for performance (common on macOS) and seeing stale files or sync delays, start here.

Both commands output actionable information rather than raw logs, which makes them useful for helping others debug their DDEV setups.

## Podman and Docker Rootless

DDEV v1.25.0 added experimental support for Podman and Docker Rootless. For TYPO3 developers on Linux who prefer rootless containers for security reasons, this is now a supported path.

The trade-offs are important to note:

- **Podman on macOS**: Cannot use default ports 80 and 443
- **Linux Docker Rootless**: Requires full Mutagen sync (no bind mounts)
- **Podman Rootless on Linux**: Most solid option of the three

The [Podman and Docker Rootless blog post](https://ddev.com/blog/podman-and-docker-rootless/) has full setup instructions for each platform.

## DDEV v1.25 Significant Changes

In addition to the items above, [DDEV v1.25](https://ddev.com/blog/release-v1250) has some important changes that don't affect many people, but are important to note:

- PHP 8.4 is the default for new projects.
- Node.js 24 is the default Node version
- MariaDB 11.8 is the default database version for new projects.
- Debian 13 Trixie is now the base image for the key ddev/ddev-webserver Docker image. This has no impact for basic projects, but projects with extra Debian package installations (`webimage_extra_packages`) may be affected. We're happy to help.
- `ddev nvm` command was removed, but you can add it back with the [`ddev-nvm` add-on](https://github.com/ddev/ddev-nvm) if you like `nvm`.

## Thanks for your support

We've appreciated our collaboration with the TYPO3 project for nearly a decade now. Thanks for helping to maintain the TYPO3 support and for your [financial support](https://github.com/sponsors/ddev) of the DDEV project.
