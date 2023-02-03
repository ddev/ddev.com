---
title: "DDEV v1.3.0 – MariaDB 10.2, Full Apache Support, Improved Logs, Pull Command Options"
pubDate: 2018-10-12
summary: Apache support for Windows, better logging, improvements to the pull command and upcoming Wordpress support.
author: Randy Fay
featureImage:
  src: /img/blog/2018/10/clarissa-bock-418873-unsplash-e1539369093961.jpg
  alt: Photograph of a jagged landscape of rocks, trees, mountains, and snow against a cloudy blue sky and mirrored in Lake Isabelle
  credit: "Photo by [Clarissa Bock](https://unsplash.com/photos/nqJwKcnfyqU?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText) on [Unsplash](https://unsplash.com/?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText)."
categories:
  - Announcements
---

We’ve just released DDEV v1.3.0! Here are some highlights, and an important caveat for this update: backup your data.

**Full Apache support for Windows.** Apache support is not experimental anymore. Now with full test coverage, Apache works well on Windows in v1.3.0\. Thank you to the community for your feedback in testing and reporting how Apache was working in the wild.

**Get started quicker with ddev pull.** With DDEV, you can ddev pull from your hosting provider with as [DDEV-Live](https://ddev.readthedocs.io/en/latest/users/providers/drud-s3/) or [Pantheon](https://ddev.readthedocs.io/en/latest/users/providers/pantheon/). Now, when you’re pulling down the latest state of production – you can choose to either skip downloading files or the data with a flag on ddev pull. See `ddev help pull`.

**Clear reporting and logs for faster debugging.** We’ve made a number of changes to improve container logs format, the information provided in the logs, as well as more detailed information in the health check. Catching broken containers or broken add-on configurations will save you time when you’re debugging. Check out the release notes for more details.

There are also a number of bugfixes, including paving the way for improvements for WordPress support.

For full details check out the [DDEV v1.3.0 Release Notes](https://github.com/drud/ddev/releases/tag/v1.3.0).

### Important notice about updating DDEV

First of all, if you’re updating from a version before DDEV v1.1.0, and you have customizations to your Docker compose files you’ll need to take these manual steps with each existing project.

1. Temporarily remove any `docker-compose.*.yaml` customizations you’ve made.
2. Run `ddev config` in your project directory to update your .ddev/config.yaml
3. After you’ve verified basic operation, add your customizations back in.

**Most importantly, with DDEV v1.3.0 – Back up your data!**

We hope by now you’re enjoying using [database snapshots](https://ddev.readthedocs.io/en/latest/users/cli-usage/#snapshotting-and-restoring-a-database) to capture and save your works in progress. If you are using them, we’re advising you to backup your data.

With this release, we upgraded Maria DB from 10.1 to 10.2 which gives you a [number of advantages](https://mariadb.com/kb/en/library/changes-improvements-in-mariadb-102/), such as flexible key length. However, it does mean mariabackup with MariaDB 10.2 is not compatible with earlier backups.

The easiest way to avoid any issues is to take care to back up your databases with a traditional sql dump. For example, you can do this in the web container, run this command

`mysqldump db | gzip >/var/www/html/sqldump.sql.gz`

You will need to do this because you will not be able to restore your snapshots after DDEV v1.3+. If you do get stuck, however, there is an easy [workaround in the documentation](https://ddev.readthedocs.io/en/latest/users/troubleshooting/#cant-restore-snapshot-created-before-ddev-v13).

This also means databases from earlier versions of DDEV before v.1.1.0 can’t be migrated to Docker volumes because the migration process uses snapshots. So migrate first to v1.2.0, then use v.1.3.0, and check out the release notes to see how to load the data from a backup.

Check the [release notes](https://github.com/drud/ddev/releases/tag/v1.3.0) for more guidance.
