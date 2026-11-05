---
title: "SQL Sync for DDEV: Drush-Style Database Sync for Any SSH Server"
pubDate: 2026-11-05
summary: "If you have used Drush, you know sql-sync: one command copies a production database into your local site. The ddev-sql-sync add-on brings that shape to any plain SSH-accessible server — Laravel, WordPress, Drupal, or plain PHP — with aliases, a private staging folder on the server, and sanitize on by default."
author: Ajith Thampi Joseph
featureImage:
  src: /img/blog/2026/11/sql-sync-ddev-addon.svg
  alt: "DDEV SQL Sync add-on flow: dump on the server, download, import, sanitize"
  caption: "The ddev-sql-sync add-on syncs a production MySQL database into a local DDEV project over SSH."
  credit: "Diagram by Ryan (Muse)"
categories:
  - Add-ons
  - Guides
  - TechNotes
---

Anyone who has worked with Drupal knows this command:

```bash
drush sql-sync @prod @self
```

One command, and your local site has a copy of the production database. I use Drush day to day, so that shape is second nature — but I did not have the same thing for my personal projects: Laravel, WordPress, and plain PHP sites on plain servers I reach over SSH — VPS, cPanel hosts, and shared servers alike. DDEV's pull providers are built around hosted platforms, and none of those are a platform.

So there is now an add-on in Drush's shape: [`ddev-sql-sync`](https://github.com/atj4me/ddev-sql-sync). It syncs a production MySQL database into your local DDEV project, from any SSH-accessible server.

A short note on how it was made: the add-on was designed by me and built and tested with an AI agent, Ryan (Muse), working under my direction. A little more on that at the end.

Typical uses:

- **Refreshing local data:** bring a local Laravel or WordPress site up to date with production content before working on it.
- **Debugging with real data:** reproduce a production issue locally, with user emails and passwords already scrubbed.
- **Any plain server:** a VPS, a cPanel host, a shared server — if you can SSH to it and it runs MySQL or MariaDB, it works — no platform account or API involved.

### How it Works

The configuration is one YAML file of named aliases, in the same spirit as Drush site aliases. A run of `ddev sql-sync @prod @self` then does four things:

1. **Dump** — SSH to the server and create a database dump in a private temp folder there.
2. **Download** — rsync the dump into a local folder (default `~/sql-sync`), then delete the server's temp copy.
3. **Import** — `ddev import-db` into this project. You are asked to confirm first; the current local database is replaced.
4. **Sanitize** — scrub user emails and passwords in the _local_ database. On by default.

Note the destination in the command. Every sync or copy command — `cp`, `rsync`, `scp`, Drush's own `sql-sync` — takes a source and a destination, so this one does too. `@self` is the only target it accepts; anything else is rejected. The add-on only ever _reads_ from the server, and stating the target on every run keeps that in front of you.

### Prerequisites

Before installing the add-on, check two server-side things first:

1. **You can SSH to the server non-interactively** (key-based login, no password prompt):

   ```bash
   ssh your-server-alias 'echo ok'
   ```

   If that prompts for a password, set up a key first (`ssh-copy-id`), and if you use a short alias like `myserver`, add a matching entry to your `~/.ssh/config`. This is your own machine's SSH setup — the add-on does not manage keys.

2. **The server can make a dump.** If the app has its own export tool it will be used (see _Dump strategies_ below); otherwise the server needs `mysqldump`. The preflight check described below will tell you plainly if it is missing.

You also need DDEV v1.24.10 or later.

### Installation

1. **Install the add-on:**

   ```bash
   ddev add-on get atj4me/ddev-sql-sync
   ```

2. **Restart DDEV:**

   ```bash
   ddev restart
   ```

Installing the add-on creates `.ddev/sql-sync/aliases.yml` from the shipped example if you do not have one yet. Your `aliases.yml` is never overwritten by add-on updates and never removed when the add-on is removed.

### Configuration: `.ddev/sql-sync/aliases.yml`

This file is the whole configuration:

```yaml
local:
  dir: ~/sql-sync # where downloaded dumps are kept

prod:
  host: myserver # an ~/.ssh/config alias or a hostname
  user: deploy # optional; ssh target becomes user@host
  root: /var/www/example # the app's path on the server
  tmp: /tmp # optional; temp folder on the server
```

Define as many aliases as you like (`prod`, `staging`, …) and pick one per run: `ddev sql-sync @staging @self`.

Each alias has two required keys, `host` and `root`. The optional keys:

| Key         | Purpose                                                                                                                                             |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `platform:` | `laravel`, `wordpress`, `drupal` or `php`. Usually unset — see _Platforms_ below.                                                                   |
| `options:`  | Extra SSH options, e.g. `options: -i ~/.ssh/prod_key`.                                                                                              |
| `jump:`     | A jump host (bastion) passed to SSH as `-J`. Prefer `ProxyJump` in your `~/.ssh/config` — that is the durable place; this key is for one-off syncs. |
| `dump:`     | A command on the server whose output _is_ the dump. Replaces the dump strategies below; works for any platform.                                     |
| `database:` | Explicit database credentials, for setups where the app's config cannot supply them (see below).                                                    |
| `sanitize:` | Path, relative to the project root, to your own SQL file to sanitize with after import.                                                             |

#### Where the database credentials come from

Normally you configure no credentials at all. At dump time, the add-on reads them from the app's own config **on the server**: `.env` for Laravel, `wp-config.php` for WordPress, `sites/default/settings.php` for Drupal.

For setups where that cannot work — a managed database host, split credentials — an alias can pin values explicitly:

```yaml
prod:
  # ...
  database:
    name: example_db
    username: example_user
    password: example_password
    host: 127.0.0.1 # from the app server's perspective
    port: 3306
```

Any field you leave out falls back to the app's config, field by field. You can pin just the password, or just the host and port for an RDS-style endpoint.

> **Treat a filled-in `password:` as a secret.** `aliases.yml` lives under `.ddev/`, which many projects gitignore — check yours — and `chmod 600 .ddev/sql-sync/aliases.yml` is a good idea if you use this block. The password is passed to mysqldump through the `MYSQL_PWD` environment variable only, never as a command-line argument and never printed.

### Usage

```bash
ddev sql-sync @prod @self           # source, then target — like cp / rsync / drush sql-sync
ddev sql-sync @prod @self -y        # skip the confirmation prompt
ddev sql-sync @prod @self --dry-run # preflight checks only — nothing is dumped or imported
```

| Flag                           | Meaning                                                                                                                                                                                                                          |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--sanitize` / `--no-sanitize` | Sanitize after import (default on) / skip it. Skipping prints a loud warning: the local database then holds real production emails and password hashes.                                                                          |
| `--dump-dir=<path>`            | Where the dump is downloaded to (overrides `local.dir`).                                                                                                                                                                         |
| `--no-dump`                    | Do not create a new dump; fetch the dump file an earlier `--no-sync` run left on the server. It is verified against its completion marker before anything is imported.                                                           |
| `--no-sync`                    | Only create the dump on the server and leave it there; do not download, import, or sanitize.                                                                                                                                     |
| `--dry-run`                    | Preflight only: check SSH connectivity, platform, dump strategy, credentials (the password is never shown), database size and disk space, then print the plan. Takes no dump, imports nothing, and writes nothing on the server. |
| `-y`, `--yes`                  | Do not ask for confirmation.                                                                                                                                                                                                     |
| `-h`, `--help`                 | Show help.                                                                                                                                                                                                                       |

Downloaded dumps land at `<dump-dir>/<alias>.sql` and are **kept** after import, which is handy for re-importing. They contain production data — delete them when you no longer need them: `rm ~/sql-sync/*.sql`.

### Dump Strategies and Platforms

The dump strategy per alias, in order:

1. **`dump:` override** — if the alias sets one, it always wins.
2. **The app's own export tool**, run on the server in the app root, if the platform has one and it is installed there (if it is missing, the next strategy is used instead of failing):
   - WordPress → `wp db export` (WP-CLI)
   - Drupal → `drush sql-dump`
   - Laravel → no native data export exists (`schema:dump` is structure-only), so Laravel always uses strategy 3.
3. **`mysqldump`** — with credentials resolved as described above.

The run tells you which strategy it used.

The platform is resolved per alias: the alias's `platform:` key if you set one, else this project's DDEV type from `.ddev/config.yaml` (the `laravel`, `wordpress` and `drupal` types map to themselves), else `php`. Platform notes:

- **Laravel / any `.env` app** — credentials from `<root>/.env`. Bedrock-style WordPress also fits here (set `platform: laravel`).
- **WordPress (classic)** — credentials from the `DB_*` defines in `<root>/wp-config.php` (or one level up, as WordPress allows). The table prefix is read from the config, so prefixed sites sanitize correctly.
- **PHP (generic)** — DDEV's generic `php` type, and the default when nothing else matches. No app-native export, so it always uses mysqldump; credentials come from `<root>/.env` if there is one, merged under the alias's `database:` block — for a generic app, that block is the expected primary source. No bundled sanitize: a `sanitize:` file is honoured, otherwise the run reports that no sanitize ran.
- **Drupal** — dump via Drush when available; otherwise credentials are read from the default `$databases` entry in `settings.php` (best-effort: a settings file that pulls credentials from the environment may not yield them — then use a `dump:` override or pin a `database:` block). An alias `sanitize:` file, if set, takes precedence over `drush sql-sanitize`.

### Sanitize

Sanitize runs after import, on the local database only:

- **Laravel** — bundled SQL: `users.email` becomes `user<id>@example.test`, `users.password` becomes a hash of `password`, `remember_token` becomes `NULL`.
- **WordPress** — bundled SQL on the users table (using the site's actual table prefix): email becomes `user<id>@example.test`, password becomes `MD5('password')`, which WordPress accepts at login and rehashes transparently.
- **Drupal** — `ddev drush sql-sanitize` when the local project has Drush; otherwise a `sanitize:` file from the alias; if neither exists, the run says plainly that no sanitize ran.
- **Any platform** — an explicit `sanitize:` file in the alias is honoured.

One rule applies everywhere: if sanitize is switched on but nothing could actually be applied, the run ends with "completed WITHOUT sanitize" and a non-zero exit code, instead of reporting success over a local database that still holds live production data.

### What Happens on the Server

Since this runs against production, here is the complete list of what a run does there:

- Reads the app's config file to resolve credentials.
- Creates **one dump file** in a dedicated subfolder of the alias's temp folder — `/tmp/ddev-dumps` by default. The folder is mode 700 and the dump mode 600, so on a shared server other accounts cannot read it. A partial dump left by a failed run is removed, not left behind.
- On success, writes a small completion marker next to the dump recording its exact byte size. The local side verifies that size before trusting the file — including on a later `--no-dump` run, so a truncated dump is never imported as if it were whole.
- Deletes the temp dump and marker after the download (if the import itself then fails, the server copy is kept and the run tells you how to retry with `--no-dump`).

Nothing else. No writes to the app or its database, no cache clears, no migrations, no restarts. Before dumping, every run also estimates the database size and aborts if the temp filesystem has less free space than that — a dump filling the disk is the one realistic way a sync could hurt a small server. If the size cannot be estimated, the run prints that the check was skipped rather than staying silent.

### Testing Safely

New server, or just cautious? Work up in steps:

1. **`ddev sql-sync @prod @self --dry-run`** — preflight only, as above. You get a verdict per check plus the plan, then it stops.
2. **`ddev sql-sync @prod @self --no-sync`** — a real dump, created on the server and left there; nothing downloaded or imported.
3. **`ddev sql-sync @prod @self --no-dump`** — fetch that dump, verify it against its marker, import and sanitize.
4. **`ddev sql-sync @prod @self`** — the full run.

### Troubleshooting

- **"mysqldump is not installed on this server"** — the preflight found no `mysqldump` in the SSH session's PATH and no usable app export tool. Install the MariaDB/MySQL client tools on the server, or give the alias a `dump:` command that produces the dump another way.
- **Credentials look right but authentication fails** — check for a stale `~/.my.cnf` on the server (in the sync user's home). A `[client]` password in that file silently overrides the `MYSQL_PWD` environment variable for MariaDB clients, this tool included. I hit exactly this in my own testing.
- **The run asks for an SSH password or hangs** — the add-on expects non-interactive SSH. Test with `ssh your-server-alias 'echo ok'` and fix your key setup first.
- **"unknown alias"** — the alias name after `@` must match a top-level key in `aliases.yml` exactly.

### Uninstalling the Add-on

```bash
ddev add-on remove sql-sync
```

This removes the command and the bundled files. Your `aliases.yml` and any downloaded dumps are left in place — delete them manually if you want them gone.

### How This Add-on Was Made

My first instinct is usually a workaround with the tools I already know, and Tailscale and Drush have carried me through more situations than I can count. This one started the same way: a personal project needed its production database locally, and the sync had to suit my workflow. As noted at the top, I designed the add-on and an AI agent built and tested it under my direction. Before it was released, the code also went through an independent read-only audit and an end-to-end rehearsal against a container standing in for a production server, and what those turned up was fixed. It is shared here in case it suits someone else's workflow too.

### Additional Resources

- **[ddev-sql-sync on GitHub](https://github.com/atj4me/ddev-sql-sync)**: source, issues, and the full README.
- **[Releases](https://github.com/atj4me/ddev-sql-sync/releases)**: release notes for every version.
- **[DDEV add-ons](https://docs.ddev.com/en/stable/users/extend/additional-services/)**: how add-ons work and how to write your own.
- **[Drush sql-sync](https://www.drush.org/latest/commands/sql-sync/)**: the command this add-on is modelled on.

I hope this helps anyone else who has wanted `drush sql-sync` for the sites they run outside Drupal. If you run into issues or have suggestions, feel free to open an issue on the GitHub repository.
