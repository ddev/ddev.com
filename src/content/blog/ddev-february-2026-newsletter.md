---
title: "DDEV February 2026: v1.25.0 Ships, 72% Market Share, and New Training Posts"
pubDate: 2026-02-19
summary: "DDEV v1.25.0 released with improved Windows support and modern defaults, CraftQuest survey shows 72% market share, plus new training posts on Mutagen, Xdebug, and ddev share"
author: Randy Fay
#featureImage:
#  src: "/img/blog/2026/02/PLACEHOLDERIMAGE.jpg"
#  alt: "PLACEHOLDER ALT TEXT"
#  caption: "PLACEHOLDER CAPTION"
categories:
  - Newsletters
---

DDEV v1.25.0 is here, and the community response has been strong. This month also brought three new training blog posts and a survey result that speaks for itself.

## What's New

- **DDEV v1.25.0 Released** → Improved Windows installer (no admin required), XHGui as default profiler, updated defaults (PHP 8.4, Node.js 24, MariaDB 11.8), faster snapshots with zstd compression, and experimental rootless container support. [Read the release post↗](release-v1.25.0.md)
- **New `ddev share` Provider System** → Free Cloudflare Tunnel support, no login or token required. A modular provider system with hooks and CMS-specific configuration. [Read more↗](share-providers.md)
- **Mutagen in DDEV: Functionality, Issues, and Debugging** → Based on the January training session, this post covers how Mutagen works, common issues, and the new `ddev utility mutagen-diagnose` command. [Read more↗](mutagen-functionality-issues-debugging.md)
- **Xdebug in DDEV: Understanding and Troubleshooting Step Debugging** → How the reverse connection model works, IDE setup for PhpStorm and VS Code, common issues, and the new `ddev utility xdebug-diagnose` command. [Read more↗](xdebug-step-debugging-understanding-and-troubleshooting.md)

## CraftQuest Survey: DDEV at 72%

The [2026 CraftQuest Community Survey↗](https://craftquest.io/community-survey/2026) collected responses from 253 Craft CMS developers and found DDEV at 72% market share for local development environments. The report notes: "This near-standardization simplifies onboarding for newcomers, reduces support burden for plugin developers, and means the ecosystem can optimize tooling around a single local dev workflow."

## Community Highlights

- **ddev-mngr** → A Go-based CLI tool with an interactive terminal UI for managing multiple DDEV projects at once — start, stop, check status, and open URLs across projects. With this add-on [Olivier Dobberkau](https://github.com/dkd-dobberkau) inspired a new TUI approach for DDEV core as well! [View on GitHub↗](https://github.com/dkd-dobberkau/ddev-mngr)
- **TYPO3 DDEV Agent Skill** → Netresearch built an Agent Skill (compatible with Claude Code, Cursor, Windsurf, and GitHub Copilot) that automates DDEV environment setup for TYPO3 extension development, including multi-version testing environments for TYPO3 11.5, 12.4, and 13.4 LTS. [View on GitHub↗](https://github.com/netresearch/typo3-ddev-skill)
- **Using Laravel Boost with DDEV** → Russell Jones explains how to integrate Laravel Boost (an official MCP server) with DDEV, giving AI coding agents contextual access to routes, database schema, logs, and configuration. [Read on Dev.to↗](https://dev.to/jonesrussell/using-laravel-boost-with-ddev-1kc6)
- **Laravel VS Code Extension v1.4.2** → Now includes Docker integration support and a fix for Pint functionality within DDEV environments. [Read more↗](https://news.extly.com/more-news/2030-dev-news/24693-docker-support-in-laravel-vs-code-extension-v1-4-2.html)

## Community Tutorials from Around the World

- **Getting Started with DDEV for Drupal Development** → Ivan Zugec at WebWash published a guide covering installation, daily commands, database import/export, Xdebug setup, and add-ons. [Read on WebWash↗](https://www.webwash.net/getting-started-ddev-drupal-development/)
- **Environnement de développement WordPress avec DDEV** → Stéphane Arrami shares a practical review of adopting DDEV for WordPress development, covering client projects, personal sites, and training (in French). [Read more↗](https://stephane-arrami.com/articles/environnement-developpement-wordpress-ddev/)

## What People Are Saying

> "I was today years old when I found out that DDEV exists. Now I am busy migrating all projects to docker containers." — [Bluesky↗](https://bsky.app/profile/themuellerman.bsky.social/post/3mdq22hu3uc2c)

> "ddev is the reason I don't throw my laptop out of the window during local setup wars. one command to run the stack and forget the rest. simple as that." — [@OMascatinho on X↗](https://x.com/OMascatinho/status/2017005770944971031)

## v1.25.0 Upgrade Notes and Known Issues

Every major release brings some friction, and v1.25.0 is no exception. These will generally be solved in v1.25.1, which will be out soon. Here's what to watch for:

- **deb.sury.org certificate expiration on v1.24.x** → The GPG key for the PHP package repository expired on February 4, breaking `ddev start` for users still on v1.24.10 who needed to rebuild containers. We pushed updated images for v1.24.10, so you can either `ddev poweroff && ddev utility download-images` or just go ahead and upgrade to v1.25.0, which ships with the updated key. [Details↗](https://github.com/ddev/ddev/issues/8106)
- **MariaDB 11.8 client and SSL** → DDEV v1.25.0 ships with MariaDB 11.8 client (required for Debian Trixie), which defaults to requiring SSL. This can break `drush sql-cli` and similar tools on MariaDB versions below 10.11. Workaround: add `extra: "--skip-ssl"` to your `drush/drush.yml` under `command.sql.options`, or upgrade your database to MariaDB 10.11+. [Details↗](https://github.com/ddev/ddev/issues/8119)

[//]: # (- **Docker 29 compatibility** → Docker 29 changed the default storage driver, which can cause intermittent build failures when DDEV builds `web` and `db` images in parallel. Workarounds include pinning to Docker 28 or setting `"storage-driver": "overlay2"` in `daemon.json`. [Details↗]&#40;https://github.com/ddev/ddev/issues/8136&#41;)
- **MySQL collation issues** → Importing databases can silently change collations, leading to "Illegal mix of collations" errors when joining imported tables with newly created ones. Separately, overriding MySQL server collation via `.ddev/mysql/*.cnf` doesn't work as expected. [#8130↗](https://github.com/ddev/ddev/issues/8130) [#8129↗](https://github.com/ddev/ddev/issues/8129)
- **Inter-container HTTP(S) communication** → The ddev-router doesn't always update network aliases when projects start or stop, which can break container-to-container requests for `*.ddev.site` hostnames. [Details↗](https://github.com/ddev/ddev/issues/8110)
- **Downgrading to v1.24.10** → If you need to go back to v1.24.10, you'll need to clean up `~/.ddev/traefik/config` — leftover v1.25.0 Traefik configuration breaks the older version. [Details↗](https://github.com/ddev/ddev/issues/8120)
- **Traefik debug logging noise** → Enabling Traefik debug logging surfaces warning-level messages as "router configuration problems" during `ddev start` and `ddev list`, which looks alarming but is harmless. [Details↗](https://github.com/ddev/ddev/issues/8102)
- **`ddev npm` and `working_dir`** → `ddev npm` doesn't currently respect the `working_dir` web setting, a difference from v1.24.10. [Details↗](https://github.com/ddev/ddev/issues/8148)

As always, please [open an issue↗](https://github.com/ddev/ddev/issues/new/choose) if you run into trouble — it helps us fix things faster. You're the reason DDEV works so well!

---

## DDEV Training Continues

Join us for upcoming training sessions for contributors and users.

- **February 26, 2026 at 10:00 US ET / 16:00 CET — Git bisect for fun and profit**
  [Add to Google Calendar](https://calendar.google.com/calendar/render?action=TEMPLATE&text=Git%20bisect%20for%20fun%20and%20profit&dates=20260226T150000Z/20260226T160000Z&details=Join%20the%20DDEV%20training%20session%20via%20Zoom.%0ALink%3A%20https%3A%2F%2Fus02web.zoom.us%2Fj%2F7315692237%3Fpwd%3DRHR6NUkwb0g5WXIzS2NOcXRucCthZz09%0AMeeting%20ID%3A%20731%20569%202237%0APasscode%3A%2012345&location=Online&trp=true) •
  [Download .ics](/files/ics/ddev-2026-02-26.ics)

- **March 26, 2026 at 10:00 US ET / 15:00 CET — Using `git worktree` with DDEV projects and with DDEV itself**
  [Add to Google Calendar](https://calendar.google.com/calendar/render?action=TEMPLATE&text=Using%20git%20worktree%20with%20DDEV%20projects%20and%20with%20DDEV%20itself&dates=20260326T140000Z/20260326T150000Z&details=Join%20the%20DDEV%20training%20session%20via%20Zoom.%0ALink%3A%20https%3A%2F%2Fus02web.zoom.us%2Fj%2F7315692237%3Fpwd%3DRHR6NUkwb0g5WXIzS2NOcXRucCthZz09%0AMeeting%20ID%3A%20731%20569%202237%0APasscode%3A%2012345&location=Online&trp=true) •
  [Download .ics](/files/ics/ddev-2026-03-26.ics)

- **April 23, 2026 at 10:00 US ET / 16:00 CEST — Creating, maintaining and testing add-ons**
  2026-updated version of our popular add-on training. [Previous session recording↗](https://www.youtube.com/watch?v=TmXqQe48iqE)
  [Add to Google Calendar](https://calendar.google.com/calendar/render?action=TEMPLATE&text=Creating%2C%20maintaining%20and%20testing%20add-ons&dates=20260423T140000Z/20260423T150000Z&details=Join%20the%20DDEV%20training%20session%20via%20Zoom.%0ALink%3A%20https%3A%2F%2Fus02web.zoom.us%2Fj%2F7315692237%3Fpwd%3DRHR6NUkwb0g5WXIzS2NOcXRucCthZz09%0AMeeting%20ID%3A%20731%20569%202237%0APasscode%3A%2012345&location=Online&trp=true) •
  [Download .ics](/files/ics/ddev-2026-04-23.ics)

Zoom Info:
Link: [Join Zoom Meeting](https://us02web.zoom.us/j/7315692237?pwd=RHR6NUkwb0g5WXIzS2NOcXRucCthZz09)
Passcode: 12345

---

## Sponsorship Update

After the community rallied in January, sponsorship has held steady and ticked up slightly. Thank you!

**Previous status (January 2026)**: ~$8,208/month (68% of goal)

**February 2026**: ~$8,422/month (70% of goal)

If DDEV has helped your team, now is the time to give back. Whether you're an individual developer, an agency, or an organization — your contribution makes a difference. → [Become a sponsor↗](https://github.com/sponsors/ddev)

[Contact us](/contact) to discuss sponsorship options that work for your organization.

## Stay in the Loop—Follow Us and Join the Conversation

- [Blog↗](https://ddev.com/blog/)
- [LinkedIn↗](https://www.linkedin.com/company/ddev-foundation)
- [Mastodon↗](https://fosstodon.org/@ddev)
- [Bluesky↗](https://bsky.app/profile/ddev.bsky.social)
- [Discord↗](/s/discord)

Compiled and edited with assistance from Claude Code.
