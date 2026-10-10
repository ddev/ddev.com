---
title: "What's New in DDEV for TYPO3 Folks: October 2026"
pubDate: 2026-10-08
summary: "An update for TYPO3 developers: seeded databases and snapshot improvements in DDEV v1.25.4, Branchery worktrees, TYPO3 Quickstarter 0.7.0, Knecht's agent sessions on GitHub issues, and why sponsorship matters."
author: Randy Fay
featureImage:
  src: /img/blog/2026/10/typo3-ddev-october-2026-roundup.png
  alt: TYPO3 and DDEV logos, October 2026
categories:
  - Announcements
  - Community
---

Here's the October TYPO3-with-DDEV news. This quarter's theme is databases: getting one into a project faster, keeping known-good copies of it, and running several of them side by side.

## Table of Contents

## Snapshots Grew Up in DDEV v1.25.4

`ddev snapshot` has been around for years. It takes a physical backup of your database (`mariadb-backup`, `xtrabackup`, or `pg_basebackup`), not a SQL dump, so creating and restoring one is much faster than `ddev export-db` and `ddev import-db`, especially on a big TYPO3 database.

[DDEV v1.25.4](https://ddev.com/blog/release-v1-25-4/) adds a set of features on top of that:

- **A `seed` snapshot.** Run `ddev snapshot --name=seed` once, and any time the project starts with no database (a new teammate's first `ddev start`, or after `ddev delete`), DDEV loads that snapshot instead of an empty `db` database. If the size is acceptable, commit it with `git add -f .ddev/db_snapshots/seed-*` and a new team member gets a working TYPO3 backend without asking anyone for a dump.
- **`--seed-snapshot=<name-or-path>`** on `ddev start` and `ddev restart` seeds a new database from any snapshot, by name or from a path anywhere on your machine. It works with MariaDB, MySQL, and PostgreSQL.
- **`--reset-database`** throws the current database away and starts over (taking a snapshot first, unless you add `-O`). Combined with a seed, `ddev restart --reset-database -Oy` returns the project to a known state, which is useful between test runs or before trying an upgrade wizard again.
- **Snapshots shared across Git worktrees.** If you use [`git worktree` with TYPO3](https://ddev.com/blog/git-worktree-with-typo3/), a snapshot taken in one worktree can be restored in another.
- **Uncompressed snapshots** (`--uncompressed`) trade disk space for a faster restore, on MariaDB and MySQL.
- **`ddev snapshot --list`** now shows size, database version, and compression for each snapshot.

A pattern for TYPO3 major upgrades might be: snapshot before each step (`ddev snapshot --name=pre-v14-wizards`), and when an upgrade wizard (`typo3 upgrade:run`) or a database schema update goes wrong, `ddev snapshot restore --latest` puts you back in seconds. A snapshot covers only the database, so roll back code and `composer.lock` with Git, and `fileadmin` changes separately.

[DDEV Snapshots: Checkpoints, Restores, and Seeded Databases](https://ddev.com/blog/ddev-snapshots/) has all of it, with a screencast. For huge databases, the [September 23 contributor training](https://youtu.be/zdprgaQi_Cc) with Moshe Weitzman covers baking a snapshot into a custom database image and distributing it through a registry, so a team can pull a multi-gigabyte database as a Docker image. The [slides and resources](https://rfay.github.io/snapshots-and-huge-databases/) and Moshe's [dbimage demo repository](https://github.com/weitzman/dbimage) go with it.

## Branchery: A Worktree, URL, PHP Version, and Database per Branch

Benjamin Kott's [ddev-branchery](https://benjaminkott.github.io/ddev-branchery/index.html) add-on gives each branch its own worktree beside the main checkout, with its own hostname such as `feature-checkout.<project>.ddev.site`, its own PHP version (8.2 or newer), and its own database, either empty or a copy of the main project's. The main project keeps running while you do this. It ships profiles for TYPO3 applications and TYPO3 Core, written to `.ddev/branchery.yaml`; without that file, a worktree gets only a checkout, a hostname, and an empty database.

```bash
ddev add-on get benjaminkott/ddev-branchery
ddev restart
ddev branchery config:example --profile=typo3-app --write
ddev branchery worktree:fork feature/checkout   # new branch
ddev branchery worktree:add 13.4                # existing branch
ddev branchery worktree:list
```

`ddev branchery launch` opens a web interface for the same operations, at `<project>.ddev.site:8041`. The Branchery container has access to the Docker socket and its API doesn't authenticate callers, so keep it on your own machine.

## TYPO3 Quickstarter 0.7.0

[TYPO3 Quickstarter](https://github.com/pagea-dev/typo3quickstarter) is a Bash script that creates disposable TYPO3 instances on DDEV with one command, picking the right PHP version and running the non-interactive TYPO3 setup for you. It's handy for comparing behavior across TYPO3 versions or reproducing a bug report, since `--release` takes a major version (9 through 14, or 15 from `dev-main`) or an exact patch release such as `--release=12.4.20`. Because the instances are throwaway, every Composer run uses `--no-security-blocking`, so don't use them for anything that will run in production.

```bash
curl -fsSL https://raw.githubusercontent.com/pagea-dev/typo3quickstarter/main/install.sh | bash
typo3quickstarter --release=13
```

[Release 0.7.0](https://github.com/pagea-dev/typo3quickstarter/releases/tag/0.7.0) adds TYPO3 9 and 10 on PHP 7.4, for working on old extensions before modernizing them, and installs the [phpMyAdmin add-on](https://github.com/ddev/ddev-phpmyadmin) in every new instance (`--no-pma` skips it).

## Knecht: Agent Sessions on GitHub Issues, with a DDEV Environment Each

In July we mentioned [Knecht](https://knecht.works/), which boots your DDEV projects on a server and runs AI-driven maintenance workflows against them, ending in a pull request with a preview link. It has shipped a lot since, all listed on its [updates page](https://knecht.works/updates):

- [GitHub sessions](https://knecht.works/updates/sessions-and-mentions): each issue or PR gets its own DDEV environment and agent conversation. The agent replies in the thread with its findings and a preview URL, and mentioning it sends it back to work in the same environment.
- [A browser terminal, SSH, and VS Code](https://knecht.works/updates/web-terminal-vscode) for each run, and [buttons for Mailpit and add-on services](https://knecht.works/updates/environment-tools) such as Adminer or Solr. Since Knecht runs DDEV without `ddev-router`, it reads each container's `HTTP_EXPOSE` and `HTTPS_EXPOSE` and forwards those ports itself.
- [Per-project agent memory](https://knecht.works/updates/agent-memory), so the agent doesn't explore the project from scratch on every run.
- [Repos without a DDEV config](https://knecht.works/updates/repos-without-ddev-config) now boot with a generated `.ddev/config.yaml`, but without a database container, so a TYPO3 project still needs its own `.ddev/config.yaml`.

On the server-side, a [July 26 update](https://knecht.works/updates/sandbox-rollback) replaced per-run Sysbox sandboxes with DDEV on the host, cutting memory per active preview from about 3 GB to about 180 MB. Knecht is [source-available under the Functional Source License](https://knecht.works/updates/license-decision): you can self-host it, including for customer work, and each version becomes Apache 2.0 two years after release. Matthias Andrasch wrote up [installing Knecht Cloud on a Hetzner VPS](https://matthias-andrasch.eu/blog/2026/exploring-knecht-cloud-for-ddev-ai-installation-part-1/) and, in part 2, [talking to the agent in GitHub issues](https://matthias-andrasch.eu/blog/2026/exploring-knecht-cloud-talking-to-an-ai-agent-in-github-issues-part-2), including mentions, follow-up prompts, and tracking what the AI costs.

## Catching Up

Since July:

- [DDEV v1.25.4](https://ddev.com/blog/release-v1-25-4/) also adds global Dockerfiles and env files in `~/.ddev/` that apply to every project, `ddev add-on update`, and MySQL 9.7 LTS.
- TYPO3 on SQLite, or with `omit_containers: [db]`, works in v1.25.4. Before, DDEV pointed `additional.php` at a `db` host that wasn't running, and switched a SQLite install back to MySQL on every `ddev restart`. Now it writes the connection only when the project has a db container and the configured driver is one that container provides ([ddev/ddev#8594](https://github.com/ddev/ddev/pull/8594), from a diagnosis by [@staatzstreich](https://github.com/staatzstreich)).
- [DDEV Xdebug Quickstart with PhpStorm](https://ddev.com/blog/ddev-xdebug-quickstart-phpstorm/) is a short screencast, and the PhpStorm plugin [moved into the DDEV organization](https://ddev.com/blog/ddev-august-2026-newsletter/).
- [Docker Provider Performance, 2026](https://ddev.com/blog/docker-performance/): DDEV now benchmarks every night across platforms and Docker providers.
- [A Love Letter to the DDEV Community](https://ddev.com/blog/love-letter-ddev-community/) is about why your questions and issues matter to us, even when AI already gave you an answer.

Coming in v1.25.5: `ddev share` prints the tunnel URL as a QR code, so you can open your TYPO3 site on a phone, and `ddev launch --qr` prints the project URL and its QR code instead of just showing a URL. This obsoletes the `ddev-qr` add-on, since the feature is built into DDEV core..

Also coming up: an [Advanced Coder.ddev.com Techniques](https://ddev.com/blog/ddev-september-2026-newsletter/#ddev-live-training) training on November 11, and the open [DDEV advisory group meeting](https://github.com/orgs/ddev/discussions/8794) on November 4. Everyone is welcome at both.

## Why Your DDEV Sponsorship Matters

DDEV is maintained by two people, Stas Zhuk and me, working on it full time, and that is only possible because of sponsorship. Everything above (142 PRs in one release, snapshot seeding, nightly performance testing, quick answers in Discord) comes from that time. DDEV and its trademark belong to the community-governed DDEV Foundation, with TYPO3's Benni Mack on its [Board of Directors](https://ddev.com/blog/board-of-directors-established/), so the money goes to the project, not to a company.

As of today, sponsorship is about $10,134/month, 84.5% of our $12,000/month goal. The gap is about $1,870 a month, so 19 agencies at the $100 Featured tier would close it.

That's our ask to TYPO3 agencies. If your team runs DDEV on every project and your company isn't a sponsor yet, please take this to whoever owns the budget. At $100/month, your logo goes in the [DDEV README](https://github.com/ddev/ddev#featured-sponsors) and on ddev.com, your whole team gets [coder.ddev.com](https://coder.ddev.com), and you get a year of [Diffy](https://diffy.website/) Pro. At $500/month, DDEV's Tip of the Day thanks you by name in thousands of terminals every day, and your bug reports get priority. Freelancers and individuals can start at $25/month.

Annual payment works too: €1,200 a year counts as the $100 tier. [Sponsor on GitHub or PayPal](https://ddev.com/sponsor), or [contact us](https://ddev.com/contact#sponsorship) to get an invoice your accounting department can pay.

## Tell Us What You're Building

If you're working on something DDEV-related in the TYPO3 world, or have hit a rough edge, find us on the [DDEV Discord](https://ddev.com/s/discord) or any of the other [support channels](https://docs.ddev.com/en/stable/users/support/). Several items in this update came from people telling us about their projects.

Thanks for nearly a decade of collaboration between DDEV and TYPO3.
