---
title: "DDEV September 2026: Hobobiker Rides Again, v1.25.4 Ships, Pressable Goes Official"
pubDate: 2026-09-22
summary: "September 2026 DDEV Newsletter: a three-part live series migrating a Drupal 6 site with Claude, DDEV v1.25.4 with database seeding and reset, a deep dive on snapshots with screencast, Pressable's official DDEV add-on, and tutorials from around the web."
author: Randy Fay
featureImage:
  src: "/img/blog/2026/09/ddev-september-2026-featureimage.jpg"
  alt: "Nancy Lewis: The Yampa River Flows Again, pastel painting of a river winding between yellow-green trees toward blue mountains under a bright sky"
categories:
  - Newsletters
---

## Hobobiker Rides Again: A Three-Part Live Series on Drupal 6 → Drupal 11 with Claude

The [Drupal AI Learners Club↗](https://www.drupal.org/about/ai/initiatives/drupal-ai-learners-club) — the initiative led by Amber Matz and Angie Byron that meets regularly for show-and-tell on AI tools and workflows — has scheduled a three-part live series with Randy Fay as guest host, migrating [hobobiker.com](https://hobobiker.com) — a Drupal 6 site with years of content — two different ways.

After Jamie Abrahams showed the club a static-site-to-Drupal migration driven by evals in [One Command, One Migration: AI Best Practices in Action↗](https://luma.com/jfy6b75b), Randy tried the approach on his own very old site. The results made one thing clear: Claude does its best work with a guided plan, a clear view of the source and destination, and success criteria it has to prove it has met. So the series takes hobobiker.com on two journeys — one ending in static HTML, the other in Drupal 11 — and checks both against the same test suite.

These are working sessions, not polished demos. Bring your questions, suggestions, and opinions; the peanut gallery is part of the show.

All three are on the club's [Luma calendar↗](https://luma.com/drupal-ai), and recaps of past sessions are collected in the [session list on drupal.org↗](https://www.drupal.org/docs/develop/development-tools/ai-coding-tools-for-drupal-development/drupal-ai-learners-club-sessions).

- **October 16 — Part 1: Road Test: Having Claude Write the Tests Before the Trip**  
  Before any migration starts, we need a way to know whether it worked. Randy works with Claude to explore the Drupal 6 site and design automated tests covering content and design: pages, paths, images, menus, and how things look. The goal is a test suite that doesn't depend on any particular destination, so the same tests can run against a static archive and a Drupal 11 rebuild. Along the way: how to push Claude past "looks good to me" toward a complete verification plan, and how a sandboxed environment like [coder.ddev.com](https://coder.ddev.com) smooths out the process.  
  [RSVP↗](https://luma.com/grosjf6h)

- **October 23 — Part 2: The Last Ride: Sending a Drupal Site into Retirement**  
  Not every old Drupal site needs an upgrade; some just need a dignified retirement. Randy has archived plenty of legacy sites as static HTML, and this time Claude does the work — given a proven strategy (Lullabot's "Sending a Drupal Site into Retirement"), clear success criteria, and the tests from Part 1. Can it turn hobobiker.com into a static site that holds up, in an hour, in a way everyone watching can follow? A practical use case for anyone with an aging site that still has content worth keeping.  
  [RSVP↗](https://luma.com/tg3gd3ej)

- **October 30 — Part 3: The Long Haul: Planning and Running a Drupal 6 to Drupal 11 Migration**  
  This is the hard one. Drupal 6 to Drupal 11 skips many major versions and hits most of the snags that come with them. Instead of turning Claude loose, we prepare it the way you'd onboard a new team member: first it explores the D6 source database and files, then it learns what the D11 destination offers, then it writes a migration plan before touching any code. Randy follows that plan live, with plenty of input from the peanut gallery, stopping at sensible checkpoints and picking up in later sessions if needed. The finish line is the same test suite from Road Test, now running against a working Drupal 11 site.  
  [RSVP↗](https://luma.com/2g0u28yn)

## DDEV v1.25.4 Is Out

[DDEV v1.25.4](release-v1-25-4.md) landed on September 2 with 142 PRs from the community. The theme is doing less by hand:

- **Database seeding** — a new project can start from a `seed` snapshot instead of an import step.
- **`ddev start --reset-database`** — throw away a project's database and start clean without `ddev delete -O`.
- **Global Dockerfiles and env files** — image and environment customizations applied to every project at once, instead of per-project.
- **MySQL 9.7 LTS**, plus **MODX Revolution** and **Maho** project types.
- **Linux packages moved to Cloudsmith** at `packages.ddev.com` (Gemfury keeps working).

Read the [full release post](release-v1-25-4.md) for details.

## Snapshots, Explained (with Screencast)

The snapshot work in v1.25.4 got its own post: [DDEV Snapshots: Checkpoints, Restores, and Seeded Databases](ddev-snapshots.md). It covers basic snapshot use, checkpointing during a migration, uncompressed snapshots, snapshots embedded in the project, and seeding a new project from a snapshot — with a [screencast↗](https://www.youtube.com/watch?v=079LW-PiLCg) walking through old and new behavior.

The older [DDEV Database Management](ddev-local-database-management.md) post has been updated to match.

## Pressable Ships an Official DDEV Add-On

[Pressable↗](https://pressable.com) released an official, open-source DDEV add-on for syncing WordPress sites between their hosting and a local DDEV environment.

- **What it does** — `ddev pull pressable` and `ddev push pressable` sync the database and uploads over SSH and WP-CLI, with no API tokens or plugins required. `--skip-db` and `--skip-files` let you move one or the other, and pushes are restricted to staging environments as a production safeguard.
- **Install** — `ddev add-on get pressable/ddev-pressable`
- Links: [changelog entry↗](https://pressable.com/changelog/feature-release-official-open-source-ddev-add-on/) • [source on GitHub↗](https://github.com/pressable/ddev-pressable)

There's also a French write-up from KingLand looking at how Pressable combines the DDEV add-on with MCP-driven AI for agency WordPress maintenance, including the case for keeping humans on the sensitive operations: [Pressable : l'hébergement WordPress dopé par DDEV et l'IA↗](https://kingland.fr/article/pressable-l-hebergement-wordpress-dope-par-ddev-et-l-ia-wjc9) (French).

## Community Projects

**ddev-branchery: a URL, PHP version, and database per branch** — Benjamin Kott's add-on gives each Git branch its own worktree beside the main checkout, with its own web address, PHP runtime, and isolated database, while the main project keeps running. [Documentation↗](https://benjaminkott.github.io/ddev-branchery/index.html)

**ddev-tailnet-proxy: DDEV projects on your tailnet** — Titouan Mathis built a proxy that discovers running DDEV projects on a remote development server, assigns them stable ports, and serves them under the server's Tailscale hostname — no per-project configuration. [Read the note↗](https://titouan.dev/notes/exposing-ddev-projects-to-a-tailnet)

**TYPO3 Quickstarter 0.7.0** — The CLI that scaffolds local TYPO3 environments on DDEV added support for legacy TYPO3 9 and 10 on PHP 7.4, so older extensions can be worked on before modernizing, plus a built-in phpMyAdmin that auto-logs in. [Release notes↗](https://github.com/pagea-dev/typo3quickstarter/releases/tag/0.7.0)

**Knecht Cloud, hands-on** — Matthias Andrasch walks through installing Knecht Cloud on a Hetzner VPS: project setup, AI-driven workflows, a browser terminal, and online previews for DDEV projects across TYPO3, Drupal, and Craft CMS. [Read part 1↗](https://matthias-andrasch.eu/blog/2026/exploring-knecht-cloud-for-ddev-ai-installation-part-1/)

## Talks and Tutorials from Around the Web

- **DDEV & shopware-cli for Shopware 6** → Benny Poensgen's slides from Shopware Open-Stage on September 17, 2026, on pairing DDEV with `shopware-cli`. [View the deck↗](https://vanwittlaer.github.io/pt-ddev-shopware-cli/) — see also his [Shopware on DDEV](shopware-on-ddev.md) post, and his October 21 training session below.
- **Mailpit with DDEV for Drupal 11 email testing** (Spanish) → Jesús Daza covers DDEV's built-in Mailpit integration and an SMTP-based setup, how to reach the UI, and how to confirm mail is being delivered during development. [Read on solucionex.com↗](https://www.solucionex.com/blog/como-configurar-mailpit-con-ddev-para-pruebas-de-email-en-drupal-11)
- **A DDEV-based local development workflow** → Michael K. Laweh on what DDEV gives a consultant working across Laravel, Yii, and WordPress projects: consistency across projects and teams, fast project setup, and framework-agnostic tooling. [Read on klytron.com↗](https://www.klytron.com/blog/ddev-local-web-development-environment-workflow)

## DDEV Live Training

Sessions are open to everybody.

- **September 23, 2026 at 8:00 AM US Mountain / 10:00 AM US Eastern / 16:00 CEST — Managing Huge Databases with DDEV, with [Moshe Weitzman](https://github.com/weitzman)**  
  Covers the embedded snapshot and uncompressed snapshot features in v1.25.4.  
  [Add to Google Calendar](https://calendar.google.com/calendar/render?action=TEMPLATE&text=Managing%20huge%20databases%20with%20DDEV%2C%20with%20Moshe%20Weitzman&dates=20260923T140000Z/20260923T150000Z&details=Join%20the%20DDEV%20training%20session%20via%20Zoom.%0ALink%3A%20https%3A%2F%2Fus02web.zoom.us%2Fj%2F7315692237%3Fpwd%3DRHR6NUkwb0g5WXIzS2NOcXRucCthZz09%0AMeeting%20ID%3A%20731%20569%202237%0APasscode%3A%2012345&location=Online&trp=true) •
  [Download .ics](/files/ics/ddev-2026-09-23.ics)

- **October 21, 2026 at 8:00 AM US Mountain / 10:00 AM US Eastern / 16:00 CEST — Shopware with DDEV, with [Benny Poensgen](https://github.com/vanWittlaer)**  
  A look at running Shopware on DDEV, from Benny's [earlier post on the blog](shopware-on-ddev.md).  
  [Add to Google Calendar](https://calendar.google.com/calendar/render?action=TEMPLATE&text=Shopware%20with%20DDEV%2C%20with%20Benny%20Poensgen&dates=20261021T140000Z/20261021T150000Z&details=Join%20the%20DDEV%20training%20session%20via%20Zoom.%0ALink%3A%20https%3A%2F%2Fus02web.zoom.us%2Fj%2F7315692237%3Fpwd%3DRHR6NUkwb0g5WXIzS2NOcXRucCthZz09%0AMeeting%20ID%3A%20731%20569%202237%0APasscode%3A%2012345&location=Online&trp=true) •
  [Download .ics](/files/ics/ddev-2026-10-21.ics)

- **November 11, 2026 at 8:00 AM US Mountain / 10:00 AM US Eastern / 16:00 CET — Advanced Coder.ddev.com Techniques**  
  Using the `coder` CLI, local and web-based VS Code, and remote-controlling Claude, including the `freeform` template.  
  [Add to Google Calendar](https://calendar.google.com/calendar/render?action=TEMPLATE&text=Advanced%20Coder.ddev.com%20Techniques&dates=20261111T150000Z/20261111T160000Z&details=Join%20the%20DDEV%20training%20session%20via%20Zoom.%0ALink%3A%20https%3A%2F%2Fus02web.zoom.us%2Fj%2F7315692237%3Fpwd%3DRHR6NUkwb0g5WXIzS2NOcXRucCthZz09%0AMeeting%20ID%3A%20731%20569%202237%0APasscode%3A%2012345&location=Online&trp=true) •
  [Download .ics](/files/ics/ddev-2026-11-11.ics)

Zoom Join Info:  
Link: [Join Zoom Meeting](https://us02web.zoom.us/j/7315692237?pwd=RHR6NUkwb0g5WXIzS2NOcXRucCthZz09)  
Passcode: 12345

---

## Governance

- The next DDEV advisory group meeting, open to everybody, is **November 4, 2026 at 8:00 AM US Mountain / 10:00 AM US Eastern / 16:00 CET**.
  [Add to Google Calendar](https://calendar.google.com/calendar/render?action=TEMPLATE&text=DDEV%20Board%20and%20Advisory%20Group%20Meeting&dates=20261104T150000Z/20261104T160000Z&details=DDEV%20Board%20and%20Advisory%20Group%20Meeting%0ALink%3A%20https%3A%2F%2Fus02web.zoom.us%2Fj%2F7315692237%3Fpwd%3DRHR6NUkwb0g5WXIzS2NOcXRucCthZz09%0AMeeting%20ID%3A%20731%20569%202237%0APasscode%3A%2012345&location=Online&trp=true) • See the [agenda](https://github.com/orgs/ddev/discussions/8794). We love to hear from our community!

---

## Sponsorship Update

REPLACE_ME one-line comment on the month.

**August 2026**: ~$10,038/month (83.7% of goal)

**September 2026**: ~$REPLACE_ME/month (REPLACE_ME% of goal)

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
