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



## What has DDEV done to mitigate the damage?

## Links
