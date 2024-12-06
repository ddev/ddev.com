---
title: "Save-as-you-go and make backups in a jiffy with DDEV"
pubDate: 2018-11-20
modifiedDate: 2024-04-03
summary: Working fluidly with DDEV’s database snapshots and backups.
author: Randy Fay
featureImage:
  src: /img/blog/2024/03/database-backup.png
  alt: Back up DDEV databases quickly and easily on the command line.
  credit: "ideogram.ai: Back up DDEV databases quickly and easily on the command line."
categories:
  - Guides
  - Videos
---

To us, the ideal local development environment should be fast and easy to use and give you what you need to get your job done. DDEV’s `ddev snapshot` command helps you recover quickly, and the new \`export-db\` command makes you portable backups in a jiffy.

Here’s how to easily save and restore databases with DDEV, so you can recover if something goes wrong or you change your mind about the development direction you’re going.

[Install DDEV](https://ddev.readthedocs.io/en/stable/users/install/ddev-installation/)

## Using `ddev snapshot` to save-as-you-go

Software and web development is about continuously solving problems and trying new things. You want to be able to take risks, but _calculated_ risks. You can’t eliminate mistakes, but you can make it easier to recover and learn from them. Use DDEV’s snapshot command to capture where you are now with your project. You’ll have the peace of mind you need to keep going. There’s no risk of losing work, you can come back to this point at any time.

To save a version of your DDEV database use one quick command:

`ddev snapshot`

The snapshot is automatically named with the project name and timestamp. Make it even clearer by naming the snapshot so you can identify it easily:

`ddev snapshot --name=before-mucking`

Then, down the line when you’ve done something you wish you hadn’t, restore it with:

`ddev restore-snapshot before-mucking`

And you’re back to the working version of the database you had before you mucked with it.

Here’s a video showing you how to use it.

<div class="video-container">
<iframe loading="lazy" width="500" height="281" src="https://www.youtube.com/embed/Ax-HocnXNbc?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
</div>

DDEV snapshotting uses native hot backup tools for MariaDB, MySQL, and PostgreSQL inside the database container. This is super, super fast in both directions. It’s not a copy of the database directory, the state of the database is properly preserved. This means when you come back to work, everything is as you left it.

**Important:** DDEV snapshotas are per-database type and version. Snapshots from MariaDB 10.11 can't be used with MySQL 8.0 for example.

## Backing up with `ddev export-db` and with `mysqldump`

The `ddev snapshot` command is a great way to make a quick dump of your database, but it’s not as portable as a text-based database dump. The [ddev export-db](https://ddev.readthedocs.io/en/stable/users/usage/commands/#export-db) command.

Run this command to create a text-based database dump:

```
ddev export-db --file=/tmp/db.sql --gzip=false
```

Don't forget that every DDEV command has help with examples, so using `ddev help export-db` we get:

```
$ ddev help export-db
Dump a database to a file or to stdout.

Usage:
  ddev export-db [project] [flags]

Examples:
  $ ddev export-db --file=/tmp/db.sql.gz
  $ ddev export-db -f /tmp/db.sql.gz
  $ ddev export-db --gzip=false --file /tmp/db.sql
  $ ddev export-db > /tmp/db.sql.gz
  $ ddev export-db --gzip=false > /tmp/db.sql
  $ ddev export-db --database=additional_db --file=.tarballs/additional_db.sql.gz
  $ ddev export-db my-project --gzip=false --file=/tmp/my_project.sql


Flags:
      --bzip2             Use bzip2 compression
  -d, --database string   Target database to export from (default "db")
  -f, --file string       Path to a SQL dump file to export to
  -z, --gzip              Use gzip compression (default true)
  -h, --help              help for export-db
      --xz                Use xz compression

Global Flags:
  -j, --json-output   If true, user-oriented output will be in JSON format.
```

Another way you can backup your data with DDEV is by using `ddev ssh` or `ddev ssh -s db` doing a database dump using the MySQL client. Here’s an example of how you can do that:

```
ddev ssh
mkdir -p /var/www/html/.tarballs
mysqldump db | gzip >/var/www/html/.tarballs/db.YYYYMMDD.sql.gz
```

To restore an SQL dump like that on the host you would use this command:

`ddev import-db --src=.tarballs/db.YYYYMMDD.sql.gz`

A text-format database dump created with either this technique or `ddev export-db` can typically be restored on any MySQL/MariaDB server without trouble. It’s not as fast as `ddev snapshot`, and the restore is much slower. But it’s much more portable.

See the [docs](https://ddev.readthedocs.io/en/stable/users/usage/database-management/) for everything there is to know about database management.

And join us in the [issue queue](https://github.com/ddev/ddev/issues), [Discord](/s/discord), [Stack Overflow](https://stackoverflow.com/tags/ddev) with your questions, comments, and suggestions.
