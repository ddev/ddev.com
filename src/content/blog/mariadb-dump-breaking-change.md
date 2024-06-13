---
title: "MariaDB Dump (mysqldump) Breaking Change"
pubDate: 2024-06-14
#modifiedDate: 2024-04-23
summary: What is the breaking change in Mariadb-dump (mysqldump) and what does it mean for my DDEV projects?
author: Randy Fay
featureImage:
  src: /img/blog/2024/06/weeping-sea-lion.png
  alt: 2024 DDEV Plans
  credit: 'Dall-E: '
categories:
  - Community
---

## What happened with MariaDB and MysqlDump?

On May 17, 2024, MariaDB responded to a security issue by creating a new directive in the output of `mariadb-dump`/`mysqldump`. This new directive in the dump file looks like this:

`/*!999999\- enable the sandbox mode */`

This directive/content is incompatible with all versions of the `mysql` or `mariadb` database client from all vendors from before that May 17, 2024. 

Trying to import a database dump created by `mariadb-dump` (usually aliased to `mysqldump`) in one of the new versions of their product results in:

`ERROR at line 1: Unknown command '\-'`

All currently maintained MariaDB server versions got this breaking change, including 10.5.25, 10.6.18, 10.11.8, 11.0.6, 11.1.5, 11.2.4 and 11.4.2.

You can read the details in the innocently titled article [MariaDB Dump File Compatibility Change](https://mariadb.org/mariadb-dump-file-compatibility-change/)

## What does it mean To my DDEV projects?

### DDEV v1.23.1

If you are using DDEV v1.23.1, we mitigated this problem at some levels by updating the DDEV v1.23.1 `ddev-dbserver` image. This solved a number of problems related to `ddev import-db` and `ddev export-db` because the format used was the new (breaking-change) MariaDB format. If you see this on `ddev import-db` or `ddev export-db` you can update to the newer version using the appropriate command below:

```
docker pull ddev/ddev-dbserver-mariadb-10.11:v1.23.1
docker pull ddev/ddev-dbserver-mariadb-10.6:v1.23.1
docker pull ddev/ddev-dbserver-mariadb-10.5:v1.23.1
```

However, there are many uses of DDEV where the PHP code on the `ddev-webserver` uses either the `mysql`/`mariadb` client or the `mysqldump`/`mariadb-dump` clients to manipulate the database. Drupal's `drush` and Craft CMS's database dump techniques do this, along with WordPress `wp-cli` database dumps. These situation can fail in DDEV v1.23.1 because the version of the client on `ddev-webserver` is the one widely available on Debian/Ubuntu, which is an older version of the MariaDB client.

## DDEV v1.23.2

We think we have worked around the majority of these cases in DDEV v1.23.2, see below.

## What has DDEV done to mitigate the damage in v1.23.2?

In DDEV v1.23.2:

* `ddev import-db` and `ddev export-db` remove the directive to make safe imports and exports.
* If you're using database type `mariadb` (the default database) the `mariadb`/`mysql` and `mariadb-dump`/`mysqldump` clients on `ddev-webserver` are the *new* ones, that know what to do with the new directive.
* If you're using database type `mysql` (in any version) then the `mysql` and `mysqldump` are built from source and installed so that they match the server versions.
* We designed a complete build-from-source system to build the matching MySQL clients so they could be installed in `ddev-webserver`.  You can see this and contribute to it at https://github.com/ddev/mysql-client-build/.

## Links

* DDEV issue [ddev import-db fails with "Error: Unknown command '\-'" bec...](https://github.com/ddev/ddev/issues/6249)
* [MariaDB Dump File Compatibility Change](https://mariadb.org/mariadb-dump-file-compatibility-change/)
* MariaDB Issue [MariaDB 10.6.18 seems to generate invalid SQL dumps](https://jira.mariadb.org/browse/MDEV-34183)
* [DDEV's MySQL Client Builder](https://github.com/ddev/mysql-client-build/)

## Don't forget to help us maintain all this!

