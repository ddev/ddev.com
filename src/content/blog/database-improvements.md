---
title: "DDEV's Database Support Gets an Upgrade"
pubDate: 2024-12-23
#modifiedDate: 2024-10-17
summary: DDEV gets MySQL 8.4 and many related upgrades and performance improvements
author: Randy Fay
#featureImage:
#  src: /img/blog/2024/11/windows-install-blog-logos.png
#  alt: Windows, DDEV, Ubuntu logos demonstrating setting up a Windows machine for DDEV.
categories:
  - DevOps
---

Lots of good news:

* **MySQL 8.4**: DDEV will support MySQL 8.4, the latest LTS version of MySQL, in upcoming v1.24.2. We now support **17** different database types and versions. Try doing that on your bare-metal development setup :)

* **MySQL 8.0 import performance**: DDEV HEAD (upcoming DDEV v1.24.2) import performance with MySQL 8.0 is about 30% better than current v1.24.1.

* **Retired Docker image maintenance**: We've maintained `ddev/mysql` images for years since MySQL didn't provide ARM64 images. Because Bitnami started providing ARM64 images, we have switched to [Bitnami/mysql](https://hub.docker.com/r/bitnami/mysql) as the base image for MySQL 8+ images. 

* **Simplified maintenance of XtraBackup**: We've had to maintain our own build-from-source version of [Percona XtraBackup](https://www.percona.com/mysql/software/percona-xtrabackup) for years because Percona didn't provide ARM64 versions. (DDEV uses XtraBackup under the hood for the `ddev snapshot` feature with MySQL.) We've been able to retire that build because Percona is now providing ARM64 versions of their packages.

[//]: # (We'd love to hear your own hints and tips on how you set up a Windows machine &#40;or any other computer!&#41;. You can contribute to this article with a [PR to the blog]&#40;https://github.com/ddev/ddev.com&#41; or make your suggestions on [Discord]&#40;/s/discord&#41;. We welcome guest blogs too!)

Follow our [blog](https://ddev.com/blog/), [LinkedIn](https://www.linkedin.com/company/ddev-foundation), [Mastodon](https://fosstodon.org/@ddev), and join us on [Discord](/s/discord). And we'd love to have you sign up for the [monthly newsletter](/newsletter).
