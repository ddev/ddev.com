---
title: "DDEV v1.25.4: Database Seeding and Reset, MySQL 9.7 LTS, Global Configuration, New Project Types"
pubDate: 2026-09-02
summary: DDEV v1.25.4 can seed a project's database from a snapshot, reset it on the spot, and apply Dockerfiles and env files to every project at once. It also adds MySQL 9.7 LTS, MODX Revolution and Maho project types, and moves Linux packages to Cloudsmith.
author: Stas Zhuk
featureImage:
  src: /img/blog/2026/09/banner-ddev-v1-25-4.svg
  srcDark: /img/blog/2026/09/banner-ddev-v1-25-4-dark.svg
  alt: DDEV v1.25.4 Release Banner
categories:
  - Announcements
---

[DDEV v1.25.4](https://github.com/ddev/ddev/releases/tag/v1.25.4) is here: 142 PRs from the entire DDEV community. Your suggestions, bug reports, code, and financial support made it possible.

The theme of this release is doing less by hand. A new project can start with a "seed" database you already have, and image and environment customizations can be set globally instead of in every project.

:::note[Linux and WSL2: new package repositories]
DDEV's apt and rpm packages are now published to Cloudsmith at `packages.ddev.com`. Gemfury (`pkg.ddev.com`) keeps working, so switch over whenever it suits you by re-running the [Linux installation steps](https://docs.ddev.com/en/stable/users/install/ddev-installation/#ddev-installation-linux).

Package repository hosting is graciously provided by [Cloudsmith](https://cloudsmith.com).
:::

## Table of Contents

## Database Seeding and Reset

Until now, a fresh project always started with an empty database, and getting your data back in there meant importing a dump or snapshot every time. DDEV can now automatically use a snapshot, which is far quicker than importing a SQL file.

- [`ddev start --seed-snapshot=<name-or-path>`](https://docs.ddev.com/en/stable/users/usage/database-management/#seeding-a-fresh-database-from-a-snapshot) fills a brand-new database from a snapshot in `.ddev/db_snapshots`, or from a path to one anywhere else on your machine. It works with MariaDB, MySQL, and PostgreSQL.
- `seed` is a reserved snapshot name. Run `ddev snapshot --name=seed` once, and from then on any `ddev delete` followed by `ddev start` brings that database back, with no flag to remember. You can even check `.ddev/db_snapshots/seed*` into Git if it's not annoyingly large.
- [`ddev start --reset-database`](https://docs.ddev.com/en/stable/users/usage/database-management/#starting-over-with-a-new-database) throws the current database away and starts over, taking a snapshot first. The flags can be combined (works with both `ddev start` and `ddev restart`): `ddev start --reset-database --seed-snapshot=large-dataset --omit-snapshot`.

There's more to snapshots in this release: sizes and database versions in `ddev snapshot --list`, [snapshots shared across Git worktrees](https://docs.ddev.com/en/stable/users/usage/database-management/#sharing-snapshots-between-git-worktrees), and [uncompressed snapshots](https://docs.ddev.com/en/stable/users/usage/database-management/#uncompressed-snapshots) for faster restores. See [Snapshots](https://docs.ddev.com/en/stable/users/usage/database-management/#snapshots) for all of it.

## MySQL 9.7 LTS Support

DDEV now supports MySQL 9.7, the latest LTS release:

```bash
# New project
ddev config --database=mysql:9.7
# Existing project
ddev utility migrate-database mysql:9.7
```

MySQL 8.0 and 8.4 also switched base images, from `bitnamilegacy/mysql`, which no longer receives updates, to [Docker Hardened Images](https://hub.docker.com/hardened-images/catalog/dhi/mysql/images) (`dhi.io/mysql`).

## Global Configuration: Set It Once, for Every Project

If you've ever added the same company CA certificate, apt package, or API token to every project you work on, this release is for you.

**[Global Dockerfiles](https://docs.ddev.com/en/stable/users/extend/customizing-images/#global-dockerfiles)** in `~/.ddev/web-build/` and `~/.ddev/db-build/` apply the same image customization everywhere: system tools, extra packages, or [container-level SSL trust for `curl`, Composer, and Node.js](https://docs.ddev.com/en/stable/users/usage/networking/#container-level-ssl-trust-for-curl-composer-nodejs-etc), which used to be a per-project chore. A project overrides any of it with the same filename in its own `.ddev/web-build/`. Thanks to [@rmott-littler](https://github.com/rmott-littler).

**[Global env files](https://docs.ddev.com/en/stable/users/configuration/environment-variables/#global-env-files)** `~/.ddev/.env` and `~/.ddev/.env.<service>` set environment variables for every project. Before this, the only global option was `web_environment` in `~/.ddev/global_config.yaml`, which reaches the `web` container and nothing else. Now you can do it for `db`, or any other service:

```bash
# Set API_URL for the web service of every project
ddev dotenv global set .ddev/.env.web --api-url=https://example.com
```

[Project env files](https://docs.ddev.com/en/stable/users/configuration/environment-variables/#project-env-files) gained two pieces in their names, too. A trailing `.local`, as in `.ddev/.env.local`, tells DDEV to gitignore the file, which is where credentials belong. A label, as in `.ddev/.env.web.myaddon`, keeps files from different sources apart, so an add-on isn't editing the same file you are.

## New Project Types and Shopware 6 Without an Add-on

Two project types joined DDEV:

- [Maho](https://docs.ddev.com/en/stable/users/quickstart/#maho), thanks to [@fballiano](https://github.com/fballiano)
- [MODX Revolution](https://docs.ddev.com/en/stable/users/quickstart/#modx-revolution) 2.x and 3.x, thanks to [@casparml](https://github.com/casparml)

Shopware 6 projects now get [`shopware-cli` right in the web image](https://docs.ddev.com/en/stable/users/quickstart/#shopware-cli-and-hot-reload-watchers), along with `ddev admin-watch`, `ddev storefront-watch`, and the ports they need. The [ddev-shopware-cli](https://github.com/vanWittlaer/ddev-shopware-cli) add-on isn't needed anymore. Thanks to [@vanWittlaer](https://github.com/vanWittlaer).

## New Commands and Flags

- [`ddev add-on update`](https://docs.ddev.com/en/stable/users/usage/commands/#add-on-update) updates the installed add-ons that are behind their latest GitHub release, with `--dry-run` to preview.
- [`ddev utility download-ddev`](https://docs.ddev.com/en/stable/users/usage/commands/#utility-download-ddev) fetches the `ddev` binaries for a PR, branch, commit, or tag without touching your installed DDEV, which is handy for testing a fix before it ships.
- [`ddev utility delete-volume`](https://docs.ddev.com/en/stable/users/usage/commands/#utility-delete-volume) removes one of a project's Docker volumes, for add-ons like [ddev-solr](https://github.com/ddev/ddev-solr) that create their own.
- [`ddev launch --print-url`](https://docs.ddev.com/en/stable/users/usage/commands/#launch) prints the URL instead of opening a browser, for SSH, containers, and CI, thanks to [@steffenmaechtel](https://github.com/steffenmaechtel).
- [`ddev tablepro`](https://docs.ddev.com/en/stable/users/usage/commands/#tablepro) opens the project database in TablePro on macOS, thanks to [@datlechin](https://github.com/datlechin).

## DDEV Tells You What's Wrong

A wrong `docroot` used to produce a bare 404/403 page with no hints about why. Now `ddev-webserver` explains the 403s and 404s it generates itself, and `ddev-router` does the same for a hostname that doesn't match any project:

![The `ddev-router` 404 page, shown for a hostname with no running DDEV project](/img/blog/2026/09/ddev-router-404-no-route-found.png)

The page says where it came from, so you know it isn't your application's own 404, and it lists what to check. A 403 or 404 from your own application is passed through untouched.

It also replaces the old "docroot may be wrong" warning on `ddev start`, which you never saw in a browser and which sometimes fired when nothing was wrong.

## Regressions from v1.25.3, Fixed

[DDEV v1.25.3](release-v1-25-3.md) introduced a few problems, and the ones you're most likely to have run into are resolved here:

- Project image builds are fast again. Permissions on the Node.js directory were being changed recursively on every build, and are now set once.
- Add-ons and applications that write log files straight into `/var/log` can do that again, after the directory was locked down to root only.
- A site that generates its own `/robots.txt` works again. An Nginx rule was answering before your site could, and it's gone.

## Other Fixes Worth Knowing About

- `ddev wp` respects the path in your project's own `wp-cli.yml` again, falling back to the docroot only when that file doesn't set one. Since v1.24.5 it always added `--path=$DDEV_DOCROOT`, which broke Bedrock and any layout where WordPress isn't in the docroot.
- Running `ddev` in a subdirectory with its own `.ddev/config.yaml`, such as a Drupal contrib module or a Git submodule, keeps using the outer project and tells you which one it picked, instead of switching silently and breaking the outer project's custom commands. `ddev start` there asks first.

## Performance Is Measured Automatically Now

A nightly benchmark harness now times `ddev start`, `ddev stop`, Mutagen sync-settle, and a Drupal install across the platforms and Docker providers DDEV already tests on, and publishes the results to a [performance history](https://ddev.github.io/ddev/perf/) dashboard, so a regression shows up as a bend in a trend line instead of a bug report months later. A second dashboard tracks [CI test runtime](https://ddev.github.io/ddev/perf/ci/).

## Everything Else

This release includes many more features and bugfixes. See the [full release notes](https://github.com/ddev/ddev/releases/tag/v1.25.4) for the complete list.

From the entire team, thanks for using, promoting, contributing, and supporting DDEV!

If you have questions, reach out in any of the [support channels](https://docs.ddev.com/en/stable/users/support/).

If you're amazed by how much is in this release, we are too! If you wonder how all this could be done, it's because of generous sponsors who let two of us work on this every day. If you and your team aren't already financially supporting DDEV, consider [joining our sponsors](/sponsor).

Follow our [blog](https://ddev.com/blog/), [Bluesky](https://bsky.app/profile/ddev.bsky.social), [LinkedIn](https://www.linkedin.com/company/ddev-foundation), [Mastodon](https://fosstodon.org/@ddev), and join us on [Discord](/s/discord). Sign up for the [monthly newsletter](/newsletter).

---

_This article was edited and refined with assistance from Claude Code._
