---
title: "DDEV v1.4.0 – In-container composer commands, SSH authentication, database export"
pubDate: 2018-11-15
author: Randy Fay
featuredImage: https://ddev.com/app/uploads/2018/11/holly-mandarich-460180-unsplash-e1542334215692.jpg
categories:
  - Announcements
---

We’ve just released DDEV v1.4.0! [Install or upgrade now](https://github.com/drud/ddev/releases/tag/v1.4.0). Here are some highlights, and new commands:

**`ddev composer` now provides in-container composer commands** for just about everything you might want to use composer for. Many users, especially Windows users, were resorting complicated workarounds to get the composer functionality they needed. Plus, the composer cache is now in a shared Docker volume, making for much faster in-container composer builds.

**Shared SSH authentication in the web container:** You can now `ddev auth ssh` to authenticate your keys in the ddev-ssh-agent container, which shares auth information with every project’s web container. Previously, users had to use a manual workaround for mounting ssh keys. Now you can access private composer repositories and use tools like `drush rsync` that need ssh auth. [More info](https://ddev.readthedocs.io/en/latest/users/cli-usage/#ssh-into-containers).

**Configurable working and destination directories:** You can specify the container directory you land in with `ddev ssh`, `ddev exec` and exec hooks in config.yaml. This is also cool because TYPO3 users will land in the project root by default; Drupal/Backdrop users land in the project root by default.

**New command: `ddev export-db`** With this release it’s now possible to export your entire project database anytime with a short command. Previously, users needed to ssh into the database container and execute MySQL commands to get a database dump. This command increases ease of database portability for all users and pairs very well with [ddev import-db](https://ddev.readthedocs.io/en/latest/users/cli-usage/#importing-a-database).

Try out `ddev export-db --file /tmp/db.sql.gz` and find a couple more [examples of use here](https://ddev.readthedocs.io/en/latest/users/cli-usage/#exporting-a-database).

For quicker backups, see also: [ddev snapshot](https://ddev.readthedocs.io/en/latest/users/cli-usage/#snapshotting-and-restoring-a-database)

**This release also includes** `ddev debug`, `omit_containers` and improved container healthchecks. For full details check out the [DDEV v1.4.0 Release Notes](https://github.com/drud/ddev/releases/tag/v1.4.0).

### Community News

Congratulations and thank you! to [Mike Anello](https://twitter.com/ultimike) of DrupalEasy on the release of his new book, “Local Web Development With DDEV Explained” published by OSTraining. Learn how to [employ modern web development workflows using DDEV](https://www.ostraining.com/blog/news/local/).

---

Photo by [Holly Mandarich](https://unsplash.com/photos/wMuGk6dABR4?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText) on [Unsplash](https://unsplash.com/?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText)
