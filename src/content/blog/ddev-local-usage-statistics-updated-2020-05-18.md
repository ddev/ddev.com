---
title: "DDEV-Local Usage Statistics (Updated 2020-05-18)"
pubDate: 2020-05-19
summary: Usage statistics highlighting operating system, PHP version, project type, commands, web server type, NFS usage, and Docker Toolbox Windows usage.
author: Randy Fay
featureImage:
  src: /img/blog/2020/05/cms-project-types.png
  alt: Screenshot of Amplitude bar chart displaying CMS project types
  shadow: true
categories:
  - Community
---

Many of you allow [DDEV-Local](https://github.com/drud/ddev) to [use telemetry to collect statistics](https://ddev.readthedocs.io/en/stable/users/cli-usage/#opt-in-usage-information) about DDEV usage. Thanks! We last shared these stats with you way back in [March, 2019](https://ddev.com/ddev-local/ddev-local-usage-statistics-updated-2019-03-21/), so it’s time for an update. Here’s a report about usage patterns from recent months.

**Operating System Usage**: Because DDEV-Local [works the same](https://ddev.readthedocs.io/en/stable/#system-requirements) on macOS, Windows, and Linux, there’s a great spread of usage there. macOS is about 60% of the usage, Linux about 22%, and Windows about 18%.

![Local OSes pie chart: Darwin, Linux and Windows (greatest to least, no numbers specified)](/img/blog/2020/05/local-oses.jpg)

**PHP Versions:** DDEV-Local supports [PHP versions from 5.6 through 7.4](https://ddev.readthedocs.io/en/stable/users/extend/customization-extendibility/#changing-php-version) – you can change it easily with `ddev config --php-version=7.4`. PHP7.2 was the DDEV default for a long time, but PHP7.3 is now the default.

![PHP versions (relative) bar chart: 7.2 59.7%, 7.3 25.7%, 7.1 5.55%, 7.4 4.04%, 7.0 2.56%, 5.6 2.45%](/img/blog/2020/05/php-versions-relative.png)

**CMS Project Types:** TYPO3 is the most active single [project type](https://ddev.readthedocs.io/en/stable/users/cli-usage/#quickstart-guides), but if you add up Drupal8, Drupal7, Drupal6, and Drupal9, TYPO3 still comes out on top by just a bit. The “php” project type can also mask project types, as it’s the generic type that may have any number of project types running underneath it. It looks like Magento2 is making a strong showing, having just been added in DDEV v1.13.

![CMS project types bar chart: TYPO3 35.8%, Drupal 8 26.7%, PHP 25.4%, Drupal 7 7.04%, WordPress 3.51%, Magento 2 1%, Drupal 6 0.314%, Magento 0.141%](/img/blog/2020/05/cms-project-types.png)

![CMS Project Type (combined) bar chart: TYPO3, Drupal, PHP, WordPress, Magento (greatest to least, from roughly 35% down to 1%)](/img/blog/2020/05/cms-project-type-combined.png)

**Top Events**: This chart shows the commands ([exec](https://ddev.readthedocs.io/en/stable/users/cli-usage/#executing-commands-in-containers), start, stop, etc) that get used most.

![Top events bar chart: exec 164,458, start 85,281, stop 46,976, composer 30,547, restart 26,834, config, import-db, drush, describe](/img/blog/2020/05/top-events.png)

**Web server Types**: About 75% of people use nginx with php-fpm, nearly 25% use apache with fpm, and a tiny fraction use the less performant apache-cgi.

![Webserver types bar chart: nginx-fpm 70.3%, apache-fpm 27%, apache-cgi 2.73%](/img/blog/2020/05/webserver-types.png)

**NFS Mount Enabled**: For users on Windows and macOS, using [nfs_mount_enabled](https://ddev.readthedocs.io/en/stable/users/performance/#using-nfs-to-mount-the-project-into-the-web-container) enables massive web-serving performance with just a quick workstation setup. It looks like just under half of projects are using `nfs_mount_enabled: true` (which can be set globally as of DDEV-Local v1.14).

![nfs_mount_enabled bar chart: false 52.7%, true 47.3%](/img/blog/2020/05/ddevlocal-nfs-mount-enabled.png)

**Docker Toolbox Usage (Windows):** Docker Toolbox is a somewhat obsolete version of Docker that is used mostly by people with Windows 10 Home. It will be deprecated in a future version of DDEV because [Windows 10 Home and Docker Desktop (with WSL2) will shortly play well together](https://ddev.com/ddev-local/ddev-wsl2-getting-started/), with far better performance and reliability. But it seems only 3.5% of Windows users are on Docker Toolbox, whereas it seems about 80% of the OS-specific code in DDEV is devoted to Docker Toolbox differences!

![Docker Toolbox (Windows) Usage bar chart: false 96.5%, true 3.55%](/img/blog/2020/05/docker-toolbox-windows-usage.png)

Again, thanks so much for using DDEV and for your many [contributions](https://github.com/drud/ddev/blob/master/CONTRIBUTING.md) to its success, whether by sending stats, suggesting features, supporting others, or [reporting issues](https://ddev.readthedocs.io/en/stable/#support). Thank you!
