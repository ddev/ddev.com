---
title: "DDEV Snapshots: Checkpoints, Restores, and Seeded Databases"
pubDate: 2026-09-12
summary: How DDEV database snapshots work, how to use them as checkpoints during migrations, and how to seed new projects or containers from a snapshot instead of a full import.
author: Randy Fay
categories:
  - Guides
  - Videos
---

<!-- TODO: featureImage -->

<!-- TODO: screencast — record and embed once script is final

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" title="DDEV Snapshots" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

-->

## Table of Contents

<!-- markdownlint-disable MD026 -->

## Snapshots are easy!

<!-- markdownlint-enable MD026 -->

A DDEV snapshot is a physical, "hot" backup of your database — `mariadb-backup`/`xtrabackup` for MariaDB and MySQL, or `pg_basebackup` for Postgres — not a text-based `mysqldump`. Because it copies the database's on-disk files instead of dumping SQL statements, it's much faster to create and restore, especially on large databases.

Normally snapshots live in `.ddev/db_snapshots/`, and the filename encodes the database type and version, for example `mariadb_11.8`. That's why a snapshot only restores against a matching engine and version — restoring a `mariadb_11.8` snapshot into a `mariadb_10.11` project will fail.

Snapshots are compressed with `zstd` by default. [`--uncompressed`](https://docs.ddev.com/en/stable/users/usage/database-management/#uncompressed-snapshots) skips the decompression step on restore, trading a much larger file on disk for a faster restore. Postgres doesn't support uncompressed snapshots.

## Core Commands

- `ddev snapshot --name=<name>` — create a snapshot
- `ddev snapshot restore` — opens a TUI allowing you to select snapshot to restore
- `ddev snapshot restore <name>` — restore a named snapshot
- `ddev snapshot restore --latest` — restore the most recent snapshot
- `ddev snapshot restore $HOME/tmp/mysnapshot-mariadb_11.8.zst` — restore from an arbitrary path, not from the default `.ddev/db_snapshots/`
- `ddev snapshot --list` (`-l`) — table of snapshot name, created date, size, database version, and compression; shows a Worktree column when relevant
- `ddev snapshot --cleanup` (`-C`) — delete one snapshot (`--name=<name>`) or all of them (prompts for confirmation unless `-y`)
- `ddev snapshot --all` (`-a`) — snapshot all projects (automatically starts stopped projects to accomplish this)

If your project has multiple Git worktrees, [snapshots taken from other worktrees](https://docs.ddev.com/en/stable/users/usage/database-management/#sharing-snapshots-between-git-worktrees) of the same repository are available too — by name, with `--latest`, or through the interactive list.

## Snapshots as Migration Checkpoints

Take a snapshot before each step of a migration or update: `ddev snapshot --name=pre-migration-step3`. If a step breaks something, restore the last good snapshot instead of restarting the migration from scratch. (`ddev snapshot restore --latest` can be a great technique if you do this religiously.)

`ddev snapshot --list` becomes a log of checkpoints, and `ddev snapshot restore <name>` or `restore --latest` jumps back to any of them instantly.

This builds on the workflow described in [DDEV Database Management](ddev-local-database-management.md): snapshot, `ddev restart --reset-database`, restore. It's also a natural lead-in to seeding a new database volume directly from a snapshot, covered next.

## Seeding New Projects with `--seed-snapshot`

DDEV's automatic starter database, or "seed" database, is normally built into the DB image. However, you can easily use a "seed" with more in it. For example, if you want to start a project with an alternate seed snapshot, `ddev start` and `ddev restart` accept [`--seed-snapshot=<name-or-path>`](https://docs.ddev.com/en/stable/users/usage/database-management/#seeding-a-fresh-database-from-a-snapshot), which seeds the database volume from a snapshot instead of the stock seed database. This only applies when there's no existing database — DDEV errors otherwise, telling you to add `--reset-database` or use `ddev snapshot restore`.

`<name-or-path>` can be a short name from `.ddev/db_snapshots/` or a full path:

```bash
ddev start --seed-snapshot=$HOME/tmp/mysnapshot-mariadb_11.8.zst
```

This works for every database type DDEV supports, unlike the baked-dbimage technique below, which is MariaDB/MySQL-only — it's restored the same way `ddev snapshot restore` does, just at volume-creation time.

There's a reserved snapshot name, **`seed`**: a snapshot literally named `seed` (created with `ddev snapshot --name=seed`) is picked up automatically on any brand-new volume, no flag needed. It becomes the project's default starting state.

Combine `--seed-snapshot` with `--reset-database` to reseed an _existing_ project in one step:

```bash
ddev restart --reset-database --seed-snapshot=<name> -Oy
```

`-O` skips the automatic snapshot of the database being thrown away, and `-y` skips the confirmation prompt.

This is the lightweight alternative to baking a seeded database image: no custom image or registry, just a snapshot file — good for local or small-team use where a shared registry is overkill.

If you're working on a project that can always start with a seeded database, you can actually check in the seed and it will always be used by default on an empty project.

```bash
git add -f .ddev/db_snapshots/seed-*
git commit -m "Add default seed db for clean startup"
```

## Seed Snapshots + `--reset-database`

Once you have a `seed` snapshot, [`ddev restart --reset-database`](https://docs.ddev.com/en/stable/users/usage/database-management/#starting-over-with-a-new-database) `-Oy` repeatedly returns the project to that known-good state — handy between test runs.

## Building a Seeded Database Image

You can also create a replacement database image that has an alternate seed database built into it. This is especially great for delivering huge databases, as the process can be handled by the image, or an upstream process. All the image building does is copy a `base_db.zst` or `base_db.mbstream` into the `/mysqlbase/custom` directory of the DB image.

For teams that want to share a ready-to-go database via a container registry instead of a snapshot file, [build-and-push-seeded-image.sh](https://github.com/rfay/database-performance/blob/main/scripts/build-and-push-seeded-image.sh) is an example that builds a real multi-arch (linux/AMD64, linux/ARM64) image with a snapshot baked in:

```bash
build-and-push-seeded-image.sh --snapshot=uncompressed-2g \
  --output-image=randyfay/uncompressed-2g:v1.25.4 --push \
  --base-image=ddev/ddev-dbserver-mariadb-11.8:v1.25.4
```

This technique relies on `mariadb-backup`/`xtrabackup`, so it doesn't support Postgres.

Uncompressed seeds make for a much larger image and a slower push, but a faster, decompress-free container startup. It's worth comparing the actual image sizes to see the bandwidth cost of each trade-off.

## Using a Seeded Image via `dbimage:`

Point a project at the seeded image in `.ddev/config.yaml` (or `.ddev/config.local.yaml`):

```yaml
# .ddev/config.yaml or .ddev/config.db.yaml or .ddev/config.local.yaml
dbimage: randyfay/uncompressed-2g:v1.25.4
```

Then:

```bash
ddev restart --reset-database --omit-snapshot -y
```

## Examples and resources

- Some example images with seeds built into them
  - uncompressed 2GB databases: <https://hub.docker.com/r/randyfay/uncompressed-2g/tags>
  - compressed 2GB databases: <https://hub.docker.com/r/randyfay/compressed-2g/tags>
  - MySQL 9.7 databases: <https://hub.docker.com/r/randyfay/mysql-97-tagbase/tags>
- Example image builder [build-and-push-seeded-image.sh](https://github.com/rfay/database-performance/blob/main/scripts/build-and-push-seeded-image.sh)
- Example invocation: `build-and-push-seeded-image.sh --snapshot=seed --output-image=randyfay/d11_normal:v1.25.4 --push --base-image=ddev/ddev-dbserver-mariadb-11.8:v1.25.4`
