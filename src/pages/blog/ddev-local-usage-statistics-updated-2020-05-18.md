---
title: "DDEV-Local Usage Statistics (Updated 2020-05-18)"
pubDate: 2020-05-19
author: Randy Fay
featuredImage: https://ddev.com/app/uploads/2020/05/CMS-project-types.png
categories:
  - DDEV
---

Many of you allow [DDEV-Local](https://github.com/drud/ddev) to [use telemetry to collect statistics](https://ddev.readthedocs.io/en/stable/users/cli-usage/#opt-in-usage-information) about DDEV usage. Thanks! We last shared these stats with you way back in [March, 2019](https://ddev.com/ddev-local/ddev-local-usage-statistics-updated-2019-03-21/), so it’s time for an update. Here’s a report about usage patterns from recent months.

**Operating System Usage**: Because DDEV-Local [works the same](https://ddev.readthedocs.io/en/stable/#system-requirements) on macOS, Windows, and Linux, there’s a great spread of usage there. macOS is about 60% of the usage, Linux about 22%, and Windows about 18%.

[![](https://ddev.com/app/uploads/2020/05/Local-OSes-1024x483.jpg)](https://ddev.com/app/uploads/2020/05/Local-OSes.jpg)

**PHP Versions:** DDEV-Local supports [PHP versions from 5.6 through 7.4](https://ddev.readthedocs.io/en/stable/users/extend/customization-extendibility/#changing-php-version) – you can change it easily with `ddev config --php-version=7.4`. PHP7.2 was the DDEV default for a long time, but PHP7.3 is now the default.

![PHP versions](https://ddev.com/app/uploads/2020/05/PHP-versions-relative.png)

**CMS Project Types:** TYPO3 is the most active single [project type](https://ddev.readthedocs.io/en/stable/users/cli-usage/#quickstart-guides), but if you add up Drupal8, Drupal7, Drupal6, and Drupal9, TYPO3 still comes out on top by just a bit. The “php” project type can also mask project types, as it’s the generic type that may have any number of project types running underneath it. It looks like Magento2 is making a strong showing, having just been added in DDEV v1.13.

[![](https://ddev.com/app/uploads/2020/05/CMS-project-types.png)](https://ddev.com/app/uploads/2020/05/CMS-project-types.png)

![CMS Project Type (combined)](https://ddev.com/app/uploads/2020/05/CMS-Project-Type-combined.png)

**Top Events**: This chart shows the commands ([exec](https://ddev.readthedocs.io/en/stable/users/cli-usage/#executing-commands-in-containers), start, stop, etc) that get used most.

![Top events](https://ddev.com/app/uploads/2020/05/Top-events.png)

**Webserver Types**: About 75% of people use nginx with php-fpm, nearly 25% use apache with fpm, and a tiny fraction use the less performant apache-cgi.

![Webserver types](https://ddev.com/app/uploads/2020/05/Webserver-types.png)

**NFS Mount Enabled**: For users on Windows and macOS, using [nfs_mount_enabled](https://ddev.readthedocs.io/en/stable/users/performance/#using-nfs-to-mount-the-project-into-the-web-container) enables massive webserving performance with just a quick workstation setup. It looks like just under half of projects are using `nfs_mount_enabled: true` (which can be set globally as of DDEV-Local v1.14).

![DDEVLocal nfs_mount_enabled](https://ddev.com/app/uploads/2020/05/DDEVLocal-nfs_mount_enabled.png)

**Docker Toolbox Usage (Windows):** Docker Toolbox is a somewhat obsolete version of Docker that is used mostly by people with Windows 10 Home. It will be deprecated in a future version of DDEV because [Windows 10 Home and Docker Desktop (with WSL2) will shortly play well together](https://ddev.com/ddev-local/ddev-wsl2-getting-started/), with far better performance and reliability. But it seems only 3.5% of Windows users are on Docker Toolbox, whereas it seems about 80% of the OS-specific code in DDEV is devoted to Docker Toolbox differences!

![](https://ddev.com/app/uploads/2020/05/Docker-Toolbox-Windows-Usage.png)

Again, thanks so much for using DDEV and for your many [contributions](https://github.com/drud/ddev/blob/master/CONTRIBUTING.md) to its success, whether by sending stats, suggesting features, supporting others, or [reporting issues](https://ddev.readthedocs.io/en/stable/#support). Thank you!
