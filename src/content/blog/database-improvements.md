---
title: "DDEV's Database Support Gets MySQL 8.4 and Better Import Speeds"
pubDate: 2024-12-27
#modifiedDate: 2024-10-17
summary: "DDEV gets MySQL 8.4 and many related upgrades and performance improvements"
author: Randy Fay
featureImage:
  src: /public/img/blog/2024/12/MySQL8.0ImportTimeV1.24.1VSHEAD.svg
  alt: "Improved MySQL 8.0 import times in v1.24.2+"
categories:
  - DevOps
---

Lots of good news:

- **MySQL 8.4**: DDEV will support MySQL 8.4, the latest LTS version of MySQL, in upcoming v1.24.2. We now support **17** different database types and versions. Try doing that on your bare-metal development setup 😀.

- **MySQL 8.0 import performance**: DDEV HEAD (upcoming DDEV v1.24.2) import performance with MySQL 8.0 is about 30% better than current v1.24.1.

- **Retired Docker image maintenance**: We've maintained `ddev/mysql` images for years since MySQL didn't provide ARM64 images. Because Bitnami started providing ARM64 images, we have switched to [`bitnami/mysql`](https://hub.docker.com/r/bitnami/mysql) as the base image for MySQL 8+ images.

- **Simplified maintenance of XtraBackup**: We've had to maintain our own build-from-source version of [Percona XtraBackup](https://www.percona.com/mysql/software/percona-xtrabackup) for years because Percona didn't provide ARM64 versions. (DDEV uses XtraBackup under the hood for the `ddev snapshot` feature with MySQL.) We've been able to retire that build because Percona is now providing ARM64 versions of their packages.

- **Open Source For The Win!** DDEV is built on the shoulders of giants. MySQL and MariaDB generously share their decades-old products. Percona makes XtraBackup available and even improves the packages outside their comfort zone. Bitnami starts building ARM64 images for their huge catalog of Docker images. And of course Docker itself provides the engine that powers DDEV. (It doesn't matter what Docker provider you're using, Docker Desktop, OrbStack, Colima, Lima, Rancher Desktop, Docker-ce, all of them are wrappers on the fantastically maintained Docker-ce project, with maintenance led by Docker, Inc.) None of the improvements discussed in this blog post would be possible without all those wonderful upstream changes.

**Now for nerdy `ddev import-db` performance comparisons**:

The new [database-performance](https://github.com/rfay/database-performance) repository contains scripts to create large databases, links to pre-created large database dumps, and a script to easily compare `ddev import-db` performance with those dumps, varying across DDEV versions, database versions and types, and imports. With these tools you can actually sort out what Docker provider on macOS gives the best import performance, what the difference is between MariaDB 10.11 and MySQL 8.0, etc. It was important to build this set of tools so we could verify that the new Bitnami-based images didn't have a performance regression.

MySQL 8.0 import performance was studied in the issue queue: [Increase MySQL 8.0 database import speed](https://github.com/ddev/ddev/issues/6244) and [Techniques to speed up import-db](https://github.com/orgs/ddev/discussions/6591). However, it was always impossible to get or test specific cases because all the reporters were using proprietary information for their tests. With the `database-performance` tools and database dumps, we can now do properly comparable import tests.

Each of the following was tested with a Drupal 11 (Drupal CMS) database with 1M nodes and 1M users, a 3.7 GB compressed SQL file with no private data, available in [database-performance](https://github.com/rfay/database-performance).

Using OrbStack on macOS as a Docker Provider, MySQL 8.0 import time is improved by about 25% in HEAD vs v1.24.1 ([data](https://docs.google.com/spreadsheets/d/1_4VtPTi7MVt1DdppYp8sjRaHVmA-y7vaRYMlfqtpaKY/edit?usp=sharing)):

![MySQL 8.0 Import Speed, v1.24.1 vs HEAD](/public/img/blog/2024/12/MySQL8.0ImportTimeV1.24.1VSHEAD.svg)

MySQL 8.4 is a little slower on import than MySQL 8.0, as MySQL 8.0 was significantly slower than MySQL 5.7. MariaDB 10.11 and MySQL 5.5 remain the fastest ([data](https://docs.google.com/spreadsheets/d/1ha9u895o9-4c5wPncs9hpe0OHAXi8OedtwUUizKXLrE/edit?usp=sharing)):

![Database Version vs Import Speed, HEAD](/public/img/blog/2024/12/ElapsedVSDatabaseVersion.svg)

I also ran tests of Docker Provider vs MySQL 8.0 import times, and was surprised to see Lima and Colima come out as fastest ([data](https://docs.google.com/spreadsheets/d/1HRlG6m1Cl6c8H-hUiSNW63VdRrxjJ9vlcMgBIcIpLQU/edit?usp=sharing)):

![Import Times for Various Docker Providers (macOS)](/public/img/blog/2024/12/DockerProviderVSElapsed.svg)

I experimented with these scripts on Linux/AMD64 and WSL2/AMD64, but wasn't able to get predictable results, but the import times were significantly longer (20% to 100% longer), which I can only guess is probably a result of Apple Silicon's advantage over Intel processors, and the particular machines I had available to test on.

**We'd love to hear your reports about these results.** You can use or contribute to the scripts and database dumps at [rfay/database-performance](https://github.com/rfay/database-performance). It's easy to use DDEV HEAD too, see [docs](https://ddev.readthedocs.io/en/stable/developers/building-contributing/#testing-latest-commits-on-head).

Follow our [blog](https://ddev.com/blog/), [Bluesky](https://bsky.app/profile/ddev.bsky.social), [LinkedIn](https://www.linkedin.com/company/ddev-foundation), [Mastodon](https://fosstodon.org/@ddev), and join us on [Discord](/s/discord). And we'd love to have you sign up for the [monthly newsletter](/newsletter).
