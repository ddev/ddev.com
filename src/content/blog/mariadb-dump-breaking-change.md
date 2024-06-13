---
title: "MariaDB Dump (mysqldump) Breaking Change"
pubDate: 2024-06-14
#modifiedDate: 2024-04-23
summary: What is the breaking change in Mariadb-dump (mysqldump) and what does it mean for my DDEV projects?
author: Randy Fay
featureImage:
  src: /img/blog/2024/06/weeping-sea-lion.png
  alt: "Dall-E: an image of a seal posed and crying with big tear drops, something like the MariaDB logo"
  credit: 'Dall-E: an image of a seal posed and crying with big tear drops, something like the MariaDB logo'
categories:
  - DevOps
---

## What happened with MariaDB and the `mysqldump`/`mariadb-dump` tool?

On May 17, 2024, MariaDB responded to a security issue by creating a new directive in the output of `mariadb-dump`/`mysqldump`. This new directive looks like this in the dump file:

`/*!999999\- enable the sandbox mode */`

This directive/content is incompatible with all versions of the `mysql` or `mariadb` database client from all vendors from before the May 17, 2024 date. 

Trying to import a database dump created by `mariadb-dump` (usually aliased to `mysqldump`) in one of the new versions of their product results in:

`ERROR at line 1: Unknown command '\-'`

All currently maintained MariaDB server versions contain this breaking change, including 10.5.25, 10.6.18, 10.11.8, 11.0.6, 11.1.5, 11.2.4 and 11.4.2.

You can read about the details in this innocently titled article: [MariaDB Dump File Compatibility Change](https://mariadb.org/mariadb-dump-file-compatibility-change/)

The bottom line: **After 15 years of maintaining mostly-compatible client-side tools our friends at MariaDB and MySQL have completely diverged, and we need to make sure we understand that.**

## What does it mean to my DDEV projects?

### DDEV v1.23.1

In DDEV v1.23.1 we mitigated this problem to a certain extent by updating the DDEV v1.23.1 `ddev-dbserver` image. This solved a number of problems related to `ddev import-db` and `ddev export-db` because the format used was the new (breaking-change) MariaDB format. If you see the import failure when you do `ddev import-db` or `ddev export-db` you can update to the newer version using the appropriate command below:

```
docker pull ddev/ddev-dbserver-mariadb-10.11:v1.23.1
docker pull ddev/ddev-dbserver-mariadb-10.6:v1.23.1
docker pull ddev/ddev-dbserver-mariadb-10.5:v1.23.1
```

However, there are many uses of DDEV where the PHP code on the `ddev-webserver` uses either the `mysql`/`mariadb` or the `mysqldump`/`mariadb-dump` client to manipulate the database. Drupal's `drush` and Craft CMS's database dump techniques do this, along with WordPress `wp-cli` database dumps. These situation can fail in DDEV v1.23.1 because the version of the client on `ddev-webserver` is the one widely available on Debian/Ubuntu, which is an older version of the MariaDB client.

## DDEV v1.23.2

We think we have worked around the majority of these cases in DDEV v1.23.2, see the next section.

But:

* If your server is running MySQL and your local is running MariaDB, you'll want to start using MySQL. For example, `ddev debug migrate-database mysql:5.7`.
* If your server is running MariaDB and gets updated to have the new dump format, and you do a `ddev pull` or similar download of the dump file, you'll want to make sure you're using DDEV v1.23.2 and a matching database version.
* If you *push* your database dump to a server, which is unusual, please use `ddev export-db` to obtain it. `ddev export-db` removes the offending directive from the file.

## What has DDEV done to mitigate the damage in v1.23.2?

* `ddev import-db` and `ddev export-db` remove the directive to make sure imports and exports are safe.
* If you're using the (default) database type `mariadb`, the `mariadb`/`mysql` and `mariadb-dump`/`mysqldump` clients on `ddev-webserver` are the *new* ones from MariaDB, and they know what to do with the new directive.
* If you're using any version of the `mysql` database type then `mysql` and `mysqldump` are built from MySQL source and are automatically installed so that they match the server versions.
* We've designed a complete build-from-source system to match the MySQL clients so they could be installed in `ddev-webserver`. You can take a look at [mysql-client-build](https://github.com/ddev/mysql-client-build/) and contribute to it.
* For those who end up with trouble inside the `ddev-webserver` even after all this, there is a hidden version of the pre-change `mysql` and `mysqldump` commands in `/usr/local/mariadb-old/bin`, so users of tools that use `mysql` and `mysqldump` directly could use `PATH=/usr/local/mariadb-old/bin:$PATH some-tool some-command` for example, and if the tool uses `mysqldump` it will use the old one. *We don't know of any instances where you will need to do this in v1.23.2, we just bundled these in case people still needed a workaround.*
* Some of our automated tests broke because they used the default `mariadb:10.11` locally, but they pushed to a database server running MySQL 5.7. `TestPushLagoon` and `TestPushAcquia` had to be adjusted this way. 

## Links

* DDEV issue [ddev import-db fails with "Error: Unknown command '\-'" because of new directive in mariadb-dump output](https://github.com/ddev/ddev/issues/6249)
* [MariaDB Dump File Compatibility Change](https://mariadb.org/mariadb-dump-file-compatibility-change/)
* MariaDB Issue [MariaDB 10.6.18 seems to generate invalid SQL dumps](https://jira.mariadb.org/browse/MDEV-34183)
* [DDEV's MySQL Client Builder](https://github.com/ddev/mysql-client-build/)
* [MySQL Client build tool](https://github.com/ddev/mysql-client-build/)

## Don't forget to help us maintain all this!

Do you wonder how much effort it took to mitigate all this, or wonder how you could have handled it for your projects on your own? 

It took a lot. Thanks to all of you who participated in the various issues and reviewed the PRs.

Please sign up your organization (and yourself) to [support DDEV's financial sustainability](https://ddev.com/support-ddev/#sponsor-development). We all have an obligation to support the many open-source projects that we depend on, and try to make them last.
