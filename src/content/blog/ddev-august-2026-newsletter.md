---
title: "DDEV August 2026: Star Us on GitHub, PhpStorm Plugin Comes Home"
pubDate: 2026-08-19
summary: "August 2026 DDEV Newsletter: help us grow by starring ddev/ddev on GitHub, the DDEV IntelliJ/PhpStorm plugin moves into the DDEV org, plus community highlights and tutorials from around the web."
author: Randy Fay
featureImage:
  src: "/img/blog/2026/08/ddev-august-2026-featureimage.jpg"
  alt: "Nancy Lewis: Corn Lake Park in Clifton, Colorado, watercolor painting of a river bend lined with trees and mountains in the background"
categories:
  - Newsletters
---

## Help DDEV Grow: Star Us on GitHub

If DDEV has saved you time, the easiest way to say so costs nothing: head over to [github.com/ddev/ddev↗](https://github.com/ddev/ddev) and click **Star**. It takes five seconds, and it genuinely helps — a star count is one of the first things new users, sponsors, and conference organizers check before trusting an open source tool. If you're already a star, thank you — and consider pointing a teammate at the repository too.

## DDEV IntelliJ/PhpStorm Plugin Joins the DDEV Org

The [DDEV Integration plugin for IntelliJ/PhpStorm↗](https://plugins.jetbrains.com/plugin/18813-ddev-integration), maintained by [@AkibaAT](https://github.com/AkibaAT), has been transferred into the `ddev` GitHub organization. This was on our [2026 plans](2026-plans.md) list, and it's great to see it land. AkibaAT has kept the plugin in excellent shape, and this move gives it a permanent home alongside the rest of the DDEV ecosystem.

## What's New on the Blog

- **[A Love Letter to the DDEV Community](love-letter-ddev-community.md)** → Randy on what the DDEV community — real feedback, hard questions, generous contributions, genuine collaboration — makes this project what it is.
- **[Shopware on DDEV: notes from years of client projects](shopware-on-ddev.md)** → Benny Poensgen on why DDEV and Shopware fit together, from a first onboarding to conclusions drawn over years of agency practice.
- **[Umbraco on DDEV: .NET, SQL Server, and the generic project type](umbraco-on-ddev.md)** → Lee Mills on running Umbraco CMS and .NET 10 under DDEV's `generic` project type, with a custom web image and Azure SQL Edge.

## Community Highlights

**Knecht.works Ships Sandbox Rollback** — Following up on last month's beta-tester call, the team at knecht.works has added sandbox rollback to their agency dashboard, letting each automated DDEV run boot into its own disposable environment. [Read the update↗](https://knecht.works/updates/sandbox-rollback)

**TYPO3 Snapshot: Pull and Anonymize Production Data Locally** — Ramon Herrmann released Snapshot, an open-source TYPO3 extension that pulls databases and fileadmin from live/staging into a local DDEV environment, with built-in anonymization for GDPR compliance. [Read the announcement↗](https://www.linkedin.com/posts/ramon-herrmann-b79665212_typo3-opensource-php-share-7487427301668876288-FlxY/)

**Quick DDEV Previews: A Self-Hosted Preview Service** — Matthias Andrasch built a proof-of-concept service that spins up DDEV preview environments from any branch of a connected GitHub repository, based on Samuel Reichör's technical work. Screencast: [Using it on Hetzner VPS↗](https://www.youtube.com/watch?v=FRNQ9RinErQ) • [View the repo↗](https://github.com/mandrasch/quick-ddev-previews) 

## Community Tutorials from Around the Web

- **Migrating a Local WordPress Site to DDEV on Windows/WSL2** (Spanish) → Adam Martín walks through moving a WordPress project from Local to DDEV running inside WSL2, including database import, URL fixes, SSL certificates, and troubleshooting port conflicts. [Read on dev.adammartin.es↗](https://dev.adammartin.es/migrar-local-ddev-wordpress-windows/)
- **Installing DDEV on Linux** (French) → An updated walkthrough covering Docker prerequisites and DDEV installation on Ubuntu/Debian, Fedora, and openSUSE, plus mkcert certificate setup. [Read on kgaut.net↗](https://kgaut.net/blog/2026/installer-ddev-sous-linux-ubuntu-debian-fedora-opensuse)
- **Two Global Commands for Database Dumps** (French) → `ddev db-import` and `ddev db-export`, a pair of global DDEV commands for restoring and exporting Drupal databases with `drush` cache-clear and login-link steps built-in. [Read on kgaut.net↗](https://kgaut.net/blog/2026/db-import-db-export-deux-commandes-ddev-globales-pour-gerer-ses-dumps)
- **Pulling Remote Databases into DDEV** (French) → A follow-up set of global commands (`db-prod-import`, `ssh-prod`, and their preprod equivalents) for dumping, downloading, and importing a remote database in one step, packaged as the [ddev-drupal-tools↗](https://github.com/kgaut/ddev-drupal-tools) add-on. [Read on kgaut.net↗](https://kgaut.net/blog/2026/db-prod-import-ssh-prod-encore-des-commandes-ddev-pour-rapatrier-des-db-distantes)
- **DDEV + a-blogcms as a MAMP Alternative** (Japanese) → An introduction to DDEV for a-blogcms developers used to MAMP, covering setup, useful commands, and Mailpit for email testing. [Read on kazumich.com↗](https://kazumich.com/cms/ddev-ablogcms-install.html)
- **Running Drupal's GitLab CI Checks Locally** → How Kalamuna's `ddev checks` and `ddev checks-fixes` commands mirror the Drupal.org GitLab CI template, so code that passes locally passes in CI. [Read on kalamuna.com↗](https://www.kalamuna.com/blog/run-drupal-gitlab-ci-checks-locally-ddev-and-make-it-stick)
- **Umbraco CMS on DDEV** → A clean Docker Compose setup for running Umbraco CMS on .NET with DDEV orchestrating SQL Server and the web container. [View on GitHub↗](https://github.com/millnut/umbraco-clean-ddev)

## Events & Community

**DrupalCamp Tokyo 2026** — ANNAI presented on AI-driven Drupal development and sustainable open-source CMS strategy, including using DDEV with `git worktree` to run parallel Drupal environments. [Read the report↗](https://annai.co.jp/article/drupalcamp-tokyo-2026-annai-report)

## What We're Working On

A quick check-in against our [2026 plans](2026-plans.md):

**Shipped this year so far**: the IntelliJ/PhpStorm plugin's move into the DDEV org (above), [coder.ddev.com](coder-ddev-com-announcement.md), the new TUI dashboard, the new Docker Compose library with faster `ddev start`/`ddev stop`, and stable (non-experimental) Podman and Docker rootless support.

**Still ahead**: a clearer AI/MCP strategy for DDEV users, AI sandboxing as a core feature, subdomain support for extra ports and services, and continued conversation about Mutagen's long-term future and whether a freemium model makes sense. These are exactly the kind of questions we want the [Board](/board) and [Advisory Group](https://github.com/orgs/ddev/discussions/categories/ddev-advisory-group) weighing in on.

---

## Governance

- The [DDEV Foundation Board](/board) is meeting quarterly, with formal governance and growing board authority as key strategies for the Foundation.

  _The board members are there to represent you and the project._ If you have insights, thoughts, or direction about where DDEV should go, please contact them. If you see possibilities for them at your community events, invite them!

- The next DDEV advisory group meeting, open to everybody, is **September 2, 2026 at 8:00 AM US Mountain / 10:00 AM US Eastern / 16:00 CEST**.
  [Add to Google Calendar](https://calendar.google.com/calendar/render?action=TEMPLATE&text=DDEV%20Board%20and%20Advisory%20Group%20Meeting&dates=20260902T140000Z/20260902T150000Z&details=DDEV%20Board%20and%20Advisory%20Group%20Meeting%0ALink%3A%20https%3A%2F%2Fus02web.zoom.us%2Fj%2F7315692237%3Fpwd%3DRHR6NUkwb0g5WXIzS2NOcXRucCthZz09%0AMeeting%20ID%3A%20731%20569%202237%0APasscode%3A%2012345&location=Online&trp=true) • See the [agenda](https://github.com/orgs/ddev/discussions/8546). We love to hear from our community!

---

## Sponsorship Update

A steady month — thank you to everyone who contributes!

**July 2026**: ~$9,931/month (82.8% of goal)

**August 2026**: ~$10,038/month (83.7% of goal)

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
