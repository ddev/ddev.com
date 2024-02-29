---
title: "DDEV Project 2023 Review"
pubDate: 2024-02-29
#modifiedDate: 2024-03-01
summary: Looking back at 2023 for the DDEV project
author: Randy Fay
featureImage:
  src: /img/blog/2024/02/developers-happy.png
  alt: DDEV usage as of 2024-02-29
  credit: Tip of the day from DDEV. We take this seriously!
categories:
  - Community
---

## Thanks!

* The DDEV Community is awesome, providing a great and supportive environment to work in, and contributing regularly to every facet of the project. DDEV exists and is able to help people only because of this great community.
* The DDEV Advisory Group meets bimonthly, giving direction and input to the project.
* We are incredibly thankful to [Platform.sh](https://platform.sh) for the financial support that makes it possible to support DDEV at this level. Platform’s willingness to allow Randy to set his own agenda, work schedule and vacation schedule is amazing, and ensures his happy future.
* The TYPO3, Drupal, Silverstripe, Craft CMS and other communities have been incredibly involved and supportive. And they've turned into self-support communities. Randy often wake up to find that significant issues have been solved while he was sleeping.
* DDEV is built on the shoulders of open-source giants. Of course the entire Debian project, the golang ecosystem, PHP packaging by deb.sury.org, Xdebug development and support by Derick Rethans, Mutagen, and Lima, Rancher Desktop, etc.

## Accomplishments for 2023

* 2023 DDEV Releases and features:
  * [So many releases!](https://github.com/ddev/ddev/releases)
* New features:
  * DDEV Add-ons: `ddev get --list` now shows 20 official add-ons (15 last year). And `ddev get --list --all` shows another 70 unofficial add-ons incubating or serving special interests (13 last year). Improved `ddev get --installed` and `ddev get --remove` and `ddev get --version` options.
  * Mutagen enabled by default on macOS and Windows
  * Traefik router enabled by default, with full configuration options.
  * We kept up-to-date with so many upstream changes, including PHP and database versions.
  * Platform.sh "Upsun" hosting integration
  * Acquia integration no longer requires editing the `acquia.yaml` file.
  * Amazee Lagoon hosting integration
  * DBeaver database browser support
  * `ddev_version_constraint` ability to require specific version
  * Experimental Python/Django4 support
  * Hundreds of incremental improvements, docs improvements, and bugfixes.
* All of DDEV's repositories and identity were changed to lose the "drud" name.
* The Localdev Foundation was renamed to [DDEV Foundation](https://ddev.com/foundation), with Platform.sh generously licensing the DDEV trademark.
* The DDEV Foundation applied for US 501(c)(3) nonprofit status, which means it will not have to pay taxes and that US contributions to it can be tax-deductible.
* Randy's hours tracked in recent months: 1,623 hours in the first 11 months of 2023 (December was unpaid), about 147 hours/month. My commitment to Platform.sh is about 125 hours/month.
* **Advisory Group**: The DDEV Advisory Group is performing its function as a guiding light for the project. Even though it does not have formal power, its concerns are normally implemented.
* **New explicitly-supported project types**: [Silverstripe](https://www.silverstripe.org/), Python, Django4.
* **New hosting integrations**: Amazee.io Lagoon. (Acquia and Platform.sh were also updated)
* **Project adoption**: DDEV was adopted as "official" or "preferred" local development environment by Ibexa and Drupal.
* **Python/Django4** support: Although this significant feature was added, at the request of Platform.sh, it hasn't gotten any real traction or users at this point.
* **Marketing and Communications**:
  * Matt Stein created a completely new ddev.com using Astro and even imported/converted the old WordPress content. He did astonishing work with easy animated introductions to using DDEV.
  * DDEV has a CRM with contact management (and 362 contacts).
  * We have a monthly newsletter.
  * Randy was a featured speaker at Craft CMS's Dot All conference in Barcelona.
  * Randy presented multiple BoF sessions at both Drupalcon NA (Pittsburgh) and Drupalcon EU (Lille).
  * Mike Anello interviewed Randy for [DrupalEasy Podcast S15E1 - Randy Fay - DDEV project governance and health](https://www.drupaleasy.com/podcast/2023/06/drupaleasy-podcast-s15e1-randy-fay-ddev-project-governance-and-health).

* Maintainers:
  * **[Stas Zhuk](/blog/introducing-maintainer-stas/)** became a fully-privileged maintainer (part-time, paid).
  * **Matt Stein** made incredible advances for ddev.com and for the docs while he had availability to do so, but has stepped back (mostly) into the background now. He remains a fully-privileged maintainer.
  * **Simon Gilli** stepped away from the project, and we have lost contact with him.

* DDEV's **testing infrastructure** has been improved with newer Mac ARM64 machines, and is now testing Rancher Desktop and OrbStack as well as Docker Desktop and Colima. (We test every commit on macOS with Docker Desktop, Rancher Desktop, Colima QEMU, Colima VZ, Orbstack, and WSL2 with both Docker Desktop and docker-ce. On traditional WIndows we test with Docker Desktop, on Linux with docker-ce (on both AMD64 and ARM64 architectures)).
* Randy was awarded the Drupal community's prestigious [Aaron Winborn award](https://www.drupal.org/community/cwg/blog/2023-aaron-winborn-award-winner-randy-fay).
* Randy [went biking for two months](/blog/randy-in-patagonia/) in Patagonian Chile and the project continued on as normal! Thanks to all of you!

## Statistics for the year

* DDEV: [594 PRs merged](https://github.com/ddev/ddev/pulls?q=is%3Apr+merged%3A2023-01-01..2023-12-31). Issues and PRs in many other DDEV repos not shown here.
* [Amplitude](https://app.amplitude.com/analytics/ddev/dashboard/jhv7ksg) shows about 8000 active weekly DDEV users, up at least 3000 in the last year.
* 225 [total contributors to DDEV](https://github.com/ddev/ddev/graphs/contributors)
* [261 answers](https://stackoverflow.com/users/215713/rfay?tab=answers&sort=newest) now on Stack Overflow, was 213, reputation increased to 10,910, which means it's easier to edit and support existing questions and answers as things change.
* **10,000** Weekly users:

  We gather usage information via Amplitude from people who opt in; we don't know what percentage of users opt in.

  Our current breakdown for v1.22.0+ is shown here, about 10,000 weekly users, about doubling in the past year.

  ![Amplitude Stats 2024-02-29](/img/blog/2024/02/ddev-usage-pie-chart-20240229.png)

  In addition, there are probably about 1000 users using versions prior to v1.22, based on Segment.io reports (the previous telemetry technique).

## DDEV Foundation Financial Overview

The full 2023 financial report will be in the March 6 [DDEV Advisory Group Meeting Notes](https://github.com/orgs/ddev/discussions/5757), but highlights are:

* **Total income of the DDEV Foundation: USD$47,729**
* **Total expenses: USD$45,171.** $35,236 of that was for paid maintainers, $2566 for equipment purchase, $3115 for 2022 corporate taxes, $2038 for upstream support.
* Monthly income ranges from $2000 to $6800. The higher months are often from companies catching up or making annual support payments.
* Randy receives no income from the DDEV Foundation; his salary is paid by Platform.sh (thanks!).

## Issue and Concerns

* **Loss of maintainers**: It's completely normal for maintainers to come and go, and they should be able to do so. For example, Matt Stein found that he needed additional income and had accomplished his key goals with DDEV documentation and stepped back a bit. However, we completely lost prolific long-term maintainer Simon Gilli, and we don't even know how or why. The internet can be a strange place.
* **Project governance**: The DDEV project has been very clearly a "benevolent dictatorship" but it needs a clearer path to community governance.
* **Support load**: We aim for world-class support, and many people think it's better than most commercial products. But as the community grows, we could get overwhelmed with our current approach. We have probably doubled the number of users in the last year based on usage figures below. Still, the total support load is modest most days in Discord and other places.

