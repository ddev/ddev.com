---
title: "DDEV July 2026: New Screencasts, Partner Perks"
pubDate: 2026-07-16
summary: "July 2026 DDEV Newsletter, DDEV v1.25.3, first DDEV Foundation Board meeting, perks for $100+ partners"
author: Randy Fay
featureImage:
  src: "/img/blog/2026/07/ddev-july-2026-featureimage.jpg"
  alt: "Nancy Lewis: Palisade Sunset, Oil painting of a dramatic sunset sky with orange-lit clouds"
categories:
  - Newsletters
---

## DDEV v1.25.3 Released

[DDEV v1.25.3](release-v1-25-3.md) is out, with:

- **New Docker Compose library** → Improved UX during `ddev start` and `ddev stop`; the separate `~/.ddev/bin/docker-compose` binary is no longer needed
- **Way Faster `ddev start`, `ddev stop`, and `ddev restart`** → See below
- **MariaDB 12.3 LTS support**
- **Podman and Docker rootless are no longer experimental** → Both are now stable and ready for general use
- **Node.js improvements** → `nodejs_version` is preserved in `.ddev/config.yaml`, and you can install several Node.js versions with `n install <version>` inside the web container

See the [release announcement](release-v1-25-3.md) and the [release notes↗](https://github.com/ddev/ddev/releases/tag/v1.25.3).

### Start-Time Improvements: Test Them Yourself

`ddev start` in v1.25.3 runs post-healthcheck tasks concurrently (thanks to [@jonesrussell](https://github.com/jonesrussell)), and a fixed bug in the web server startup script removes a ~10-second delay from `ddev stop`. In our benchmarks, `ddev start` from a stopped state is about 28% faster on macOS and 21% faster on Linux.

Don't take our word for it — a new script lets you benchmark the difference on your own machine:

```bash
bash scripts/compare-start-perf.sh v1.25.2 v1.25.3
```

See [`scripts/compare-start-perf.sh`↗](https://github.com/ddev/ddev/blob/main/scripts/compare-start-perf.sh) and the demonstration GIFs in the [release announcement](release-v1-25-3.md).

## Perks for $100+/month Partners

Organizations sponsoring at $100/month or more now receive additional partner perks. [Become a sponsor↗](/sponsor) or [contact us](/contact) to learn more.

$100/month+ Partners get

- Full unrestricted access for your whole organization to [coder.ddev.com](coder-ddev-com-announcement.md) for every member of their organization.
- One year of free [diffy.website](https://diffy.website) Visual Regression Testing.

## What's New on the Blog: TYPO3 Screencasts and coder.ddev.com

A run of short screencasts landed on the blog this month, mostly using TYPO3 as the example project:

- **[Sharing Your TYPO3 Project with `ddev share`](ddev-share-with-typo3.md)** → Exposing a local TYPO3 project on a public URL, including the `base` URL config quirk and the pre-share/post-share hooks that fix it.
- **[Using `git worktree` with TYPO3](git-worktree-with-typo3.md)** → How multiple `git worktree` checkouts interact with DDEV's per-directory naming, and how to fix TYPO3's absolute base URL so every worktree works out of the box.
- **[TYPO3 Projects on Coder.ddev.com](typo3-coder-ddev-com.md)** → Running a TYPO3 project on [coder.ddev.com](https://coder.ddev.com) using the "freeform" template, with a `trustedHostsPattern` fix and two ways to share the result.
- **[DDEV Xdebug Quickstart with PhpStorm](ddev-xdebug-quickstart-phpstorm.md)** → A less-than-5-minute screencast: set a breakpoint, enable Xdebug with `ddev xdebug on`, and step through PHP code in PhpStorm.

## New Usage Stats Page

The [Usage Stats page](/usage-stats) replaces our old static usage-stats blog post with live charts pulled directly from Amplitude at build time. It's now the up-to-date place to see DDEV adoption and usage trends.

## Community Highlights

**Knecht.works Beta Testers Wanted: Dashboard for Agencies** — The team at knecht.works is building a dashboard for agencies managing many DDEV projects. It automates tasks like security updates by booting projects with full database environments and generating pull requests with previews. They're looking for beta testers. [Read the announcement↗](https://knecht.works/updates/beta-tester/) and see the [LinkedIn post (German)↗](https://www.linkedin.com/posts/dependabot-kann-kein-cms-updaten-ein-security-update-share-7478345983739998208-tWrP/) on why Dependabot can't update a CMS.

**How a Broken Installer Reload Led to Two Patches** — Michael Staatz debugged a TYPO3 installer issue, uncovered a SQLite PRAGMA ordering quirk, and ended up submitting patches to both TYPO3 Core and DDEV. A nice story about how one bug report can improve two projects. [Read it↗](https://staatzstreich.de/blog/en/20260713-140301-how-a-broken-installer-reload-led-to-two-patches/)

## Community Tutorials from Around the Web

- **Switching from nvm to Node.js Versions in DDEV** → John Henry covers moving from host-side nvm to DDEV's built-in Node.js version management. [Read on johnhenry.ie↗](https://johnhenry.ie/blog/2026/07/switching-from-nvm-to-nodejs-version-in-ddev)
- **Setting Up DDEV for WordPress Development, Part One** → Ryan Stubbs walks through DDEV project configuration, WordPress installation with WP-CLI, Mailpit, Adminer, and using bind mounts to keep plugins and themes organized outside the main WordPress installation. [Read on ryanstubbs.co.uk↗](https://ryanstubbs.co.uk/2026/06/setting-up-ddev-for-wordpress-development-part-one/). We're holding our breath for part 2!
- **Alias Your Local DDEV Commands** → Martin Anderson-Clutz shares shell wrappers that let you type `drush`, `composer`, and friends without the `ddev` prefix — automatically detecting whether you're in a DDEV project and falling back to host execution when you're not. [Read on mandclu.com↗](https://www.mandclu.com/blog/alias-your-local-ddev-commands)
- **Porting a DDEV MySQL/MariaDB Database to PostgreSQL with pgloader** → Erik Pöhler walks through migrating a DDEV project's database to PostgreSQL 17 using pgloader, then reconfiguring the project for PostgreSQL. [Read on erikpoehler.com↗](https://erikpoehler.com/2025/08/18/porting-a-ddev-mysql-mariadb-database-to-postgresql-with-pgloader/)
- **What's New in DDEV for TYPO3 Folks, July 2026** → A TYPO3-focused wrap-up covering v1.25.3, Docker/Podman rootless stability, new diagnostic utilities, and DDEV Foundation governance milestones. [Read on news.typo3.com↗](https://news.typo3.com/article/whats-new-in-ddev-for-typo3-folks-july-2026)

---

## Governance

- The [DDEV Foundation Board](/board) is meeting quarterly, with formal governance and growing board authority as key strategies for the Foundation.

  *The board members are there to represent you and the project.* If you have insights, thoughts, or direction about where DDEV should go, please contact them. If you see possibilities for them at your community events, invite them!

- DDEV has a new [Privacy Policy](/privacy), part of the Foundation's ongoing work on formal governance.

- The next DDEV advisory group meeting, open to everybody, is **September 2, 2026 at 8:00 AM US Mountain / 10:00 AM US Eastern / 16:00 CEST**.
  [Add to Google Calendar](https://calendar.google.com/calendar/render?action=TEMPLATE&text=DDEV%20Board%20and%20Advisory%20Group%20Meeting&dates=20260902T140000Z/20260902T150000Z&details=DDEV%20Board%20and%20Advisory%20Group%20Meeting%0ALink%3A%20https%3A%2F%2Fus02web.zoom.us%2Fj%2F7315692237%3Fpwd%3DRHR6NUkwb0g5WXIzS2NOcXRucCthZz09%0AMeeting%20ID%3A%20731%20569%202237%0APasscode%3A%2012345&location=Online&trp=true) • See the [agenda](https://github.com/orgs/ddev/discussions/8546). We love to hear from our community!

---

## Sponsorship Update

Sponsorship dipped slightly this month, people on vacation! — thank you to everyone who has contributed!

**June 2026**: ~$10,075/month (84% of goal)

**July 2026**: ~$9,931/month (82.8% of goal).

If DDEV has helped your team, consider sponsoring. → [Become a sponsor↗](/sponsor)

[Contact us](/contact) to discuss sponsorship options that work for your organization.

---

## Stay in the Loop—Follow Us and Join the Conversation

- [Blog↗](https://ddev.com/blog/)
- [LinkedIn↗](https://www.linkedin.com/company/ddev-foundation)
- [Mastodon↗](https://fosstodon.org/@ddev)
- [Bluesky↗](https://bsky.app/profile/ddev.bsky.social)
- [Discord↗](/s/discord)

Compiled and edited with assistance from Claude Code.
