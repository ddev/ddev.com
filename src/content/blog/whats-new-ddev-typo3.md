---
title: "What's New in DDEV for TYPO3 Developers"
pubDate: 2026-03-27
summary: "A roundup of recent DDEV improvements relevant to TYPO3 developers: improved ddev share with TYPO3 hooks, a new TUI dashboard, better Windows installation, new diagnostic utilities, and rootless container support."
author: Randy Fay
featureImage:
  src: /img/blog/2026/03/ddev-typo3.png
  alt: DDEV and TYPO3 logos
categories:
  - Announcements
  - Guides
---

Several recent DDEV releases have brought improvements that are directly useful for TYPO3 developers. Here's a focused look at what's changed and how to take advantage of it.

## ddev share Now Works Well with TYPO3

DDEV v1.25.0 redesigned `ddev share` with a modular provider system. You can now share your local project using Cloudflare Tunnel for free—no account or token required—in addition to the existing ngrok support.

For TYPO3 projects, sharing has always had a friction point: TYPO3 stores its site URL in `config/sites/*/config.yaml` as `base: <url>`, which causes it to reject requests coming from the share tunnel URL.

DDEV now supports `pre-share` and `post-share` hooks, combined with the `$DDEV_SHARE_URL` environment variable, to automate this. When you run `ddev share`, DDEV exports the tunnel URL before sharing starts. You can use that URL to temporarily patch your TYPO3 site configuration, then restore it when sharing ends.

A working TYPO3 example using the hooks:

```yaml
# .ddev/config.yaml
hooks:
  pre-share:
    - exec-host: echo "removing 'base' from site config for sharing to ${DDEV_SHARE_URL}"
    - exec: |
        for f in /var/www/html/config/sites/*/config.yaml; do
          yq eval 'del(.base)' -i "$f"
        done
  post-share:
    - exec: git checkout config/sites/
```

The full documentation with more examples is in the [ddev share provider system blog post](share-providers.md).

## New TUI Dashboard

<!-- TODO: Link to TUI/dashboard blog post when published -->

DDEV now includes an interactive terminal dashboard accessible via `ddev dashboard` (or the configured shortcut). The dashboard gives you a real-time view of running projects, service status, and quick access to common commands—without leaving the terminal.

This is particularly useful when juggling multiple TYPO3 sites locally, as you can see all running projects at a glance.

## Improved Windows Installation

The DDEV installer for Windows has been significantly improved. Setup no longer requires elevated PowerShell scripts or manual WSL2 configuration. The GUI installer handles WSL2 setup automatically and works with Docker Desktop, Rancher Desktop, or Docker CE.

If you're helping TYPO3 developers on your team get started with DDEV on Windows, the new installer removes most of the friction. See the [Windows installer blog post](watch-new-windows-installer.md) for a step-by-step walkthrough.

## New Diagnostic Utilities

Two new `ddev utility` subcommands help diagnose common issues:

**`ddev utility xdebug-diagnose`** runs a series of checks on your Xdebug configuration and reports what it finds. If Xdebug isn't connecting to your IDE, this is the first thing to run. The [Xdebug troubleshooting blog post](xdebug-step-debugging-understanding-and-troubleshooting.md) covers the underlying concepts in detail.

**`ddev utility mutagen-diagnose`** checks Mutagen sync status and common configuration problems. If you're using Mutagen for performance (common on macOS) and seeing stale files or sync delays, start here.

Both commands output actionable information rather than raw logs, which makes them useful for helping others debug their DDEV setups.

## Podman and Docker Rootless

DDEV v1.25.0 added experimental support for Podman and Docker Rootless. For TYPO3 developers on Linux who prefer rootless containers for security reasons, this is now a supported path.

The trade-offs are real:

- **Podman on macOS**: Cannot use default ports 80 and 443
- **Linux Docker Rootless**: Requires full Mutagen sync (no bind mounts)
- **Podman Rootless on Linux**: Most solid option of the three

The [Podman and Docker Rootless blog post](podman-and-docker-rootless.md) has full setup instructions for each platform.

## Getting Started

If you're a TYPO3 developer new to DDEV, the [DDEV Quickstart for TYPO3](https://docs.ddev.com/en/stable/users/quickstart/#typo3) is the place to start. For the specific features described here, the linked blog posts and the [DDEV documentation](https://docs.ddev.com/) have the details.
