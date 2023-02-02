---
title: "DDEV v1.1.0 – Snapshots, hostname removal, Drush on host, Docker 18.06"
pubDate: 2018-08-15
author: Rick Manelius
featureImage:
  src: /img/blog/2018/08/nasa-63029-unsplash-e1534364618963.jpg
  alt:
  caption:
  credit: "Photo by [NASA](https://unsplash.com/photos/n463SoeSiVY?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/release?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText)"
categories:
  - Announcements
---

We’ve just released DDEV v1.1.0! With database snapshotting we’re making it easier for you to avert database deletion disasters, read on for more highlights.

- DDEV UI is coming soon. Sneak peek for our newsletter subscribers next week.
- Important upgrade notes for DDEV v1.1.0.
- Recover quickly with DDEV database snapshots.
- And more news for those who use Drush, Redis, TYPO3, and Backdrop CMS.

For full details check out the [DDEV v1.1.0 Release Notes](https://github.com/drud/ddev/releases/tag/v1.1.0).

### DDEV UI is Coming soon

We’re preparing the beta version of DDEV UI to come out with the next DDEV release in September. Don’t want to wait? We’re polishing DDEV UI and an alpha is nearly ready. Subscribe to our newsletter and we’ll notify you as soon as it’s available for testing. [Watch this video for a preview of DDEV UI](https://youtu.be/f3m%5FSQep5Aw).

As soon as the alpha is ready, we’ll invite DDEV newsletter subscribers to get a first glimpse to offer feedback on DDEV UI. We’re putting the final touches on it so you can try it out, click right from the app to give feedback, and keep pace with development thanks to auto-updating. We expect that to be early next week. Sign up and you’ll be the first to know!

### Important notes about upgrading DDEV v1.1.0

**Do you need to upgrade Docker?** Due to a serious Docker bug in 18.03, DDEV requires Docker 18.06\. So before you update DDEV, upgrade Docker if you haven’t already.

**Do you have customized docker-compose.\*.yaml files in your projects?** If so, you’ll need to manually update each to read `version: '3.6'`

We’re testing and updating any files we include within DDEV by default, but you’re likely to be adding extensions, services, and customizations. When there are new versions of Docker and Docker Compose you’ll need to update those customizations too. Because the docker-compose version has been updated to 3.6, it’s time to update.

Follow these steps for each project.

1. Temporarily remove any docker-compose.\*.yaml customizations you’ve made.
2. Run `ddev config` in your project directory to update your .ddev/config.yaml
3. After verifying correct operation, edit any docker-compose.\*.yaml to change the first line to `version: '3.6'` and reintroduce it, then `ddev start`

Check out the [DDEV v1.1.0 Release Notes](https://github.com/drud/ddev/releases/tag/v1.1.0) for more details.

**A note about database migration.** Also, you’ll notice the first time you run `ddev start` your project database will get migrated from the \~/.ddev directory into a Docker volume. The old `~/.ddev/<project>/mysql` will be renamed to `~/.ddev/<project>/mysql.bak`.

We used to move the database because when users reinstalled Docker, it could kill your data. The good news is that Docker has matured in its stability to a point where we can trust the Docker volumes, even on upgrades.

And bonus! We’re now using database snapshotting now to further protect your data. Read on!

### Did you ever want to go back in time? Database snapshotting is here!

Now you can quickly create and restore [snapshots of a project database](https://ddev.readthedocs.io/en/latest/users/cli-usage/#snapshotting-and-restoring-a-database). We want to help users avoid disasters and irreversible changes. With database snapshotting, you can quickly toggle between databases, without needing to follow many steps to export, re-import, etc. When you’re ready to try something new, save a snapshot, and keep working.

If something goes wrong, it’s a single command to revert and go back to where you were. We wanted to make it fast and easy. In the background, we’re utilizing MariaDB’s functionality directly. So we keep the integrity of that directory, and it’s fast. Quick to backup, and quick to recover when you need to.

We’ve got your back, `ddev remove --remove-data` will create a snapshot by default. Want to manually make a database backup? Type `ddev snapshot` and DDEV creates a database snapshot. The snapshot is stored in the project’s .ddev/db_snapshots directory. If and when you restore the database, use the command `ddev restore-snapshot <some name>`.

When ddev makes the snapshot, it’s automatically named with the project name and timestamp. We highly recommend you rename each snapshot directory to make them easier to identify. For example, rename it something like `working_before_migration`. Then, if you need to restore the database, use the command `ddev restore-snapshot working_before_migration`.

### Hosting integrations

In the background, we’re improving and extending hosting integration. We now support `ddev --import-files` for TYPO3 and Backdrop CMSs.

Up until now, if you’re using [DDEV with Pantheon](https://ddev.readthedocs.io/en/latest/users/providers/pantheon/) you could run a single command `ddev pull` to get your database and files and start working faster. We’re preparing to support more hosts in the same way.

With DDEV v1.1.0 we’ve added [support for DRUD hosting](https://ddev.readthedocs.io/en/latest/users/providers/drud-s3/). Once you’re set up with `ddev config drud-s3`, a simple use of `ddev pull`, will download and import the latest backup from DRUD hosting, imports the database and files into your DDEV project.

Incidentally, this uses AWS S3 Buckets. So, if you currently store the backups from your hosting provider in AWS S3, you could adapt this format to work for you. Then you can run `ddev pull` against those archives and skip the manual steps to get set up and run a single command to get to work.

Find out more about [DRUD’s hosting service](https://ddev.com/ddev-live/).

[Contact us about DRUD hosting](https://ddev.com/contact/)

### More highlights from DDEV v 1.1.0

**Better support for a favorite Drupal dev tool: Drush.** Drupal users will be glad to know Drush now works on the host for many commands. (After you’ve done a `ddev config` and `ddev start`.) Before you would have to use `ddev exec` or `ddev ssh` to run Drush in the web container. Now, if you have Drush available on the host, you can run `drush sql-cli` or `drush cr` on the _host_ to use Drush directly.

**More services!** We’ve added PHP-Redis to the web container. We heard repeatedly that not having Redis was a major hurdle for people who wanted to use DDEV. We hope this helps!

**Easier to keep your projects tidy.** On some operating systems, users can get caught out and reach a limit in the number of hostnames they can have. For example, Windows has capacity for only 10 entries. Now, by default `ddev remove --remove-data` removes the hostname(s) associated with a project. When you need to, you can also manually remove hostnames from any projects that aren’t running.

```
sudo ddev hostname --remove-inactive
```

That info is saved in the project config file, so as soon as you `ddev start`, it’s set up when you need it.

There are more bugfixes, new documentation, and improvements – so please check out the [DDEV v1.1.0 Release Notes](https://github.com/drud/ddev/releases/tag/v1.1.0) for all the details.
