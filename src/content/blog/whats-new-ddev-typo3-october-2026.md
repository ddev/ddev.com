---
title: "What's New in DDEV for TYPO3 Folks: October 2026"
pubDate: 2026-10-08
summary: "An update for TYPO3 developers: seeded databases and snapshot improvements in DDEV v1.25.4, the yellow-twins Snapshot extension, Branchery worktrees, TYPO3 Quickstarter 0.7.0, Knecht's new architecture, and why sponsorship matters."
author: Randy Fay
featureImage:
  src: /img/blog/2026/10/typo3-ddev-october-2026-roundup.png
  alt: DDEV and TYPO3 logos
categories:
  - Announcements
  - Community
---

<!-- TODO: link the July roundup on news.typo3.com once its URL is known -->

Here's the October TYPO3-with-DDEV news. This quarter's theme is databases: getting one into a project faster, keeping known-good copies of it, and running several of them side by side.

## Table of Contents

## Snapshots Grew Up in DDEV v1.25.4

`ddev snapshot` has been around for years. It takes a physical backup of your database (`mariadb-backup`, `xtrabackup`, or `pg_basebackup`), not a SQL dump, so creating and restoring one is much faster than `ddev export-db` and `ddev import-db`, especially on a big TYPO3 database.

[DDEV v1.25.4](release-v1-25-4.md) adds a set of features on top of that:

- **A `seed` snapshot.** Run `ddev snapshot --name=seed` once, and any time the project starts with no database (a new teammate's first `ddev start`, or after `ddev delete`), DDEV loads that snapshot instead of an empty `db` database. If the size is acceptable, commit it with `git add -f .ddev/db_snapshots/seed-*` and a new team member gets a working TYPO3 backend without asking anyone for a dump.
- **`--seed-snapshot=<name-or-path>`** on `ddev start` and `ddev restart` seeds a new database from any snapshot, by name or from a path anywhere on your machine. It works with MariaDB, MySQL, and PostgreSQL.
- **`--reset-database`** throws the current database away and starts over (taking a snapshot first, unless you add `-O`). Combined with a seed, `ddev restart --reset-database -Oy` returns the project to a known state, which is useful between test runs or before trying an upgrade wizard again.
- **Snapshots shared across Git worktrees.** If you use [`git worktree` with TYPO3](git-worktree-with-typo3.md), a snapshot taken in one worktree can be restored in another.
- **Uncompressed snapshots** (`--uncompressed`) trade disk space for a faster restore, on MariaDB and MySQL.
- **`ddev snapshot --list`** now shows size, database version, and compression for each snapshot.

A pattern for TYPO3 major upgrades might be: snapshot before each step (`ddev snapshot --name=pre-v14-wizards`), and when an upgrade wizard (`typo3 upgrade:run`) or a database schema update goes wrong, `ddev snapshot restore --latest` puts you back in seconds. A snapshot covers only the database, so roll back code and `composer.lock` with Git, and `fileadmin` changes separately.

[DDEV Snapshots: Checkpoints, Restores, and Seeded Databases](ddev-snapshots.md) has all of it, with a screencast. For huge databases, the [September 23 contributor training](https://youtu.be/zdprgaQi_Cc) with Moshe Weitzman covers baking a snapshot into a custom database image and distributing it through a registry, so a team can pull a multi-gigabyte database as a Docker image. The [slides and resources](https://rfay.github.io/snapshots-and-huge-databases/) and Moshe's [dbimage demo repository](https://github.com/weitzman/dbimage) go with it.

## The Snapshot TYPO3 Extension (a Different Snapshot)

Ramon Herrmann's [Snapshot](https://github.com/yellow-twins/snapshot) extension, now in public beta at 0.9.0, solves the step before DDEV's snapshots: getting the database and `fileadmin` from your DEV, Stage, or Live environment onto your machine in the first place. Despite the shared name, it isn't related to `ddev snapshot`.

The CLI pulls the database and `fileadmin` (with `rsync`) over SSH, then anonymizes frontend and backend user data and password hashes in your local database. Anonymization is on by default and can be turned off with `--no-scrub`. There's also a backend module for admins without SSH access, which is off until you enable it with an environment variable, and requires MFA. That module anonymizes on the server, before the download. It is not a backup tool; there's no scheduler and no push back to production.

It's a Composer `require-dev` package configured with a `.snapshot.yaml` in the project root (copy the shipped `.snapshot.yaml.dist`), and it ships a DDEV add-on that wraps its commands:

```bash
ddev composer require --dev yellow-twins/snapshot
ddev add-on get yellow-twins/snapshot
ddev auth ssh
ddev snapshot-doctor --from=live
ddev snapshot-pull --from=live
```

`ddev snapshot-doctor` checks SSH and database access before you pull, and `ddev snapshot-list-envs` lists the configured environments. It requires TYPO3 13.4 or 14, PHP 8.2+, `helhum/typo3-console`, and `rsync` on the remote server.

The two fit together: pull an anonymized database with the extension, then `ddev snapshot --name=seed` (and commit the seed if it's small enough for you) to make it the team's starting point.

## Branchery: A Worktree, URL, PHP Version, and Database per Branch

Benjamin Kott's [ddev-branchery](https://benjaminkott.github.io/ddev-branchery/index.html) add-on gives each branch its own worktree beside the main checkout, each with its own hostname such as `feature-checkout.<project>.ddev.site`, its own PHP version, and its own database (empty, copied from the main project, or restored from a dump). The main project keeps running while you do this. It ships profiles for TYPO3 applications and TYPO3 Core, configured in `.ddev/branchery.yaml`:

```bash
ddev add-on get benjaminkott/ddev-branchery
ddev restart
ddev branchery worktree:add feature/checkout
ddev branchery worktree:list
```

There's a web interface for the same operations. Branchery is a prerelease (v0.2.1 as of this writing), so its interface may still change.

## TYPO3 Quickstarter 0.7.0

[TYPO3 Quickstarter](https://github.com/pagea-dev/typo3quickstarter) is a Bash script that creates disposable TYPO3 instances on DDEV with one command, picking the right PHP version and running the non-interactive TYPO3 setup for you. It's handy for comparing behavior across TYPO3 versions or reproducing a bug report.

```bash
curl -fsSL https://raw.githubusercontent.com/pagea-dev/typo3quickstarter/main/install.sh | bash
typo3quickstarter --release=13
```

[Release 0.7.0](https://github.com/pagea-dev/typo3quickstarter/releases/tag/0.7.0) adds TYPO3 9 and 10 on PHP 7.4, for working on old extensions before modernizing them, and installs the [phpMyAdmin add-on](https://github.com/ddev/ddev-phpmyadmin) in every new instance (`--no-pma` skips it).

## Knecht Rolls Back Its Sandboxes

In July we mentioned [Knecht](https://knecht.works/), the automation dashboard that runs maintenance workflows against your DDEV projects and opens a pull request with a preview link. Their [July 26 update](https://knecht.works/updates/sandbox-rollback) describes moving away from a per-run Sysbox sandbox, which had its own Docker daemon and DDEV stack, back to DDEV running directly on the host. Memory per active preview dropped from about 3 GB to about 180 MB, and waking a stopped preview went from minutes to seconds.

The run itself has no Docker access, and project commands such as `composer install` run only inside the project's web container. It's a useful read if you are thinking about running many DDEV projects on one server. Matthias Andrasch also wrote up [installing Knecht Cloud on a Hetzner VPS](https://matthias-andrasch.eu/blog/2026/exploring-knecht-cloud-for-ddev-ai-installation-part-1/).

## Catching Up

Since July:

- [DDEV v1.25.4](release-v1-25-4.md) also adds global Dockerfiles and env files in `~/.ddev/` that apply to every project, `ddev add-on update`, and MySQL 9.7 LTS.
- [DDEV Xdebug Quickstart with PhpStorm](ddev-xdebug-quickstart-phpstorm.md) is a short screencast, and the PhpStorm plugin [moved into the DDEV organization](ddev-august-2026-newsletter.md).
- [Docker Provider Performance, 2026](docker-performance.md): DDEV now benchmarks every night across platforms and Docker providers.
- [A Love Letter to the DDEV Community](love-letter-ddev-community.md) is about why your questions and issues matter to us, even when AI already gave you an answer.

Coming up: an [Advanced Coder.ddev.com Techniques](ddev-september-2026-newsletter.md#ddev-live-training) training on November 11, and the open DDEV advisory group meeting on November 4. Everyone is welcome at both.

## Why Sponsorship Matters

DDEV is maintained by two people, Stas Zhuk and me, working on it full time, and that is only possible because of sponsorship. Everything above (142 PRs in one release, snapshot seeding, nightly performance testing, quick answers in Discord) comes from that time. DDEV and its trademark belong to the community-governed DDEV Foundation, with TYPO3's Benni Mack on its [Board of Directors](board-of-directors-established.md), so the money goes to the project, not to a company.

As of September, sponsorship is about $10,099/month, 84.2% of our goal. That's steady, and we're grateful, but it isn't yet enough to plan on with confidence. Many TYPO3 agencies use DDEV for every project and every developer; if yours is one of them and isn't a sponsor yet, a monthly sponsorship from the company budget makes a bigger difference than you might expect. Organizations sponsoring at $100/month or more also get access to [coder.ddev.com](https://coder.ddev.com).

See [ddev.com/sponsor](/sponsor), or [contact us](/contact) to talk about invoicing or other arrangements that work for your organization.

## Tell Us What You're Building

If you're working on something DDEV-related in the TYPO3 world, or have hit a rough edge, find us on the [DDEV Discord](/s/discord) or any of the other [support channels](https://docs.ddev.com/en/stable/users/support/). Several items in this update came from people telling us about their projects.

Thanks for nearly a decade of collaboration between DDEV and TYPO3.
