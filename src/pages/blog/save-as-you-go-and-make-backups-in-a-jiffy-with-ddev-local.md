---
title: "Save-as-you-go and make backups in a jiffy with DDEV-Local"
pubDate: 2018-11-20
author: Randy Fay
featureImage:
  src: https://ddev.com/app/uploads/2018/11/will-echols-539053-unsplash-e1542746009659.jpg
  alt:
  caption:
  credit: "Photo by [Will Echols](https://unsplash.com/photos/%5FRFwfvznaYM?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/road-colorado?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText)."
categories:
  - Guides
---

To us, the ideal local development environment should be fast and easy to use and give you what you need to get your job done. DDEV-Local’s `ddev snapshot` command helps you recover quickly, and the new \`export-db\` command makes you portable backups in a jiffy.

Here’s how to easily save and restore databases with DDEV-Local, so you can recover if something goes wrong or you change your mind about the development direction you’re going.

[Download DDEV](https://github.com/drud/ddev/releases)

## Using `ddev snapshot` to save-as-you-go

Software and web development is about continuously solving problems and trying new things. You want to be able to take risks, but _calculated_ risks. You can’t eliminate mistakes, but you can make it easier to recover and learn from them. Use DDEV-Local’s snapshot command to capture where you are now with your project. You’ll have the peace of mind you need to keep going. There’s no risk of losing work, you can come back to this point at any time.

To save a version of your DDEV-Local database use one quick command:

`ddev snapshot`

The snapshot is automatically named with the project name and timestamp. Make it even clearer by naming the snapshot so you can identify it easily:

`ddev snapshot --name=before-mucking`

Then, down the line when you’ve done something you wish you hadn’t, just restore it with:

`ddev restore-snapshot before-mucking`

And you’re back to the working version of the database you had before you mucked with it.

Here’s a video showing you how to use it.

DDEV-Local snapshotting uses [mariabackup](https://mariadb.com/kb/en/library/mariabackup/) inside the database container. This is super, super fast in both directions. It’s not just a copy of the database directory, the state of the database is properly preserved. This means when you come back to work, everything is just as you left it.

**Important:** DDEV snapshot isn’t backward-compatible. Snapshots from previous versions of DDEV cannot be restored with v1.3 or higher because the mariabackup included with MariaDB 10.2 is not compatible with earlier backups. There’s an easy workaround to fix this [explained in the DDEV-Local documentation](https://ddev.readthedocs.io/en/latest/users/troubleshooting/#cant-restore-snapshot-created-before-ddev-v13).

## Backing up with `ddev export-db` and with `mysqldump`

The `ddev snapshot` command is a great way to make a quick dump of your database, but it’s not as portable as a text-based database dump. With the recent release of DDEV v1.4, we introduced the [ddev export-db](https://ddev.readthedocs.io/en/latest/users/cli-usage/#exporting-a-database) command.

On the command line, DDEV-Local has always had `[ddev import-db](https://ddev.readthedocs.io/en/latest/users/cli-usage/#importing-a-database)` but until now we didn’t have the correlating export option. Now you can!

Run this command to create a text-based database dump:

`ddev export-db`

[Check out the documentation](https://ddev.readthedocs.io/en/stable/users/cli-usage/#exporting-a-database) for examples of how you can use options to output to a file, for example:

`ddev export-db -f /tmp/db.sql.gz`

Another way you can backup your data with DDEV is by using `ddev ssh` or `ddev ssh -s db` doing a database dump using the MySQL client. Here’s an example of how you can do that:

```
ddev ssh
mkdir /var/www/html/.tarballs
mysqldump db | gzip >/var/www/html/.tarballs/db.YYYYMMDD.sql.gz
```

To restore an SQL dump like that on the host you would use this command:

`ddev import-db --src=.tarballs/db.YYYYMMDD.sql.gz`

A text-format database dump created with either this technique or `ddev export-db` can typically be restored on any MySQL/MariaDB server without trouble. It’s not as fast as `ddev snapshot`, and the restore is much slower. But it’s portable.

## Try out DDEV today!

Central to the best [web development workflow](https://ddev.com/ddev-live/web-development-workflows-simplified/) is the interface you touch every day: your local development environment. We think it should be reliable and “just work.” A big part of that is being able to take creative risks in a safe way and keep your data backed up. We hope this article gives you an idea of how you can make the most of DDEV-Local.

New to DDEV? Set up environments in minutes, switch contexts and projects quickly, and speed your development.

[Download DDEV](https://github.com/drud/ddev/releases)
