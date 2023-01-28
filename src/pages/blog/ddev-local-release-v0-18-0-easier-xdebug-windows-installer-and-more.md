---
title: "DDEV-Local Release v0.18.0 – Easier XDebug, Windows installer and more"
pubDate: 2018-05-10
author: Rick Manelius
featuredImage: https://ddev.com/app/uploads/2018/05/woctech-chat-windows-e1525985003469.jpg
categories:
  - DDEV
---

We’re happy to announce [our latest DDEV-Local release v0.18.0.](https://github.com/drud/ddev/releases/tag/v0.18.0) This includes XDebug improvements, more robust Windows support, and smoother upgrade paths. In this post, we’ll take a closer look at what we have for you in this release.

### Massively simplified XDebug configuration

Before, in order to configure XDebug, users had to set a host IP address, change ports, etc. And these steps required a bit more command line experience. We want DDEV-Local to make local development easier so developers can ship better software faster. Tools like XDebug are an important part of that.

In the documentation, you’ll find a [tutorial on step debugging with XDebug](https://ddev.readthedocs.io/en/latest/users/step-debugging/). Randy Fay has also created a [quick screencast](https://vimeo.com/268685753?utm%5Fsource=email&utm%5Fmedium=vimeo-cliptranscode-201504&utm%5Fcampaign=28749) to show you how it works. Note that this requires Docker 18.03+

[ddev v0.18.0+ step debugging with PHPStorm](https://vimeo.com/268685753) from [Randy Fay](https://vimeo.com/user5912539) on [Vimeo](https://vimeo.com).

### Now featuring a Windows installer

In this release, we’ve focused on our continued support for Windows users as a first-class citizen in the DDEV community with a number of improvements. Most importantly, DDEV now has a Windows installer that includes [sudo](https://github.com/mattn/sudo) so you don’t have to edit the hosts file by hand anymore.

### Upgrade with confidence

We’re aiming for a “just works” user experience with DDEV because we feel that is crucial for [developer happiness](https://ddev.com/ddev-local/developer-happiness-the-right-tools-for-the-job/). As a software developer, you’ll know users avoid upgrading if it poses a risk. And this is a barrier to innovation. Since we have a fast release cycle to incorporate your feedback, upgrading DDEV must be seamless and reliable. And up until now, we weren’t happy that the upgrade process required several manual steps as noted in our [previous release notes](https://github.com/drud/ddev/releases/tag/v0.16.0). We’ve fixed that!

After this release, you’ll have no trouble upgrading your growing list of DDEV-enabled projects. In this release, DDEV will backup your current Docker compose file and create a new one. From now on, DDEV with own this file, and automatically manage the changes with each upgrade.

Need to keep certain customizations? There are several ways. First, the two files we now control have a #ddev-generated comment to indicate that DDEV-Local will autogenerate it. Remove it and the files are not touched as [explained in the documentation](https://ddev.readthedocs.io/en/latest/users/cli-usage/#getting-started). This is similar to how we handle DB settings file. Docker overrides can be managed in docker-compose.override.yaml

### Thank you to the community!

You may have noticed, we’re responding to [support questions on Stack Overflow](https://stackoverflow.com/tags/ddev). This means we have a centralized, easy to search, resource for community support to help with common situations that don’t fit into the documentation. Please tag your questions with “ddev”, and help out by answering others’ questions. There is a pretty good collection there already.

We’re one step closer to solving a problem with a trusted hosts pattern mismatch, [#608](https://github.com/drud/ddev/issues/680). Thank you to [Misterboe](https://github.com/misterboe) for [PR #808](https://github.com/drud/ddev/pull/808), and for members of the TYPO3 community providing logs and details about this issue.

This release includes a variety of bug fixes as well. Check out the [release notes](https://github.com/drud/ddev/releases/tag/v0.18.0) for details. We want to say thank you to everyone who reports bugs, and tests the releases. The gratitude we get back is much appreciated!

> The team at [@drud](https://twitter.com/drud?ref%5Fsrc=twsrc%5Etfw) is really on top of things – I opened a DDEV issue yesterday and there was a fix and commit for me to test this morning! Thanks, [@randyfay](https://twitter.com/randyfay?ref%5Fsrc=twsrc%5Etfw)!
>
> — ultimike (@ultimike) [May 9, 2018](https://twitter.com/ultimike/status/994216144046379008?ref%5Fsrc=twsrc%5Etfw)

## Update today!

To update DDEV-Local follow the steps for [installing and updating](https://ddev.readthedocs.io/en/latest/#installation) for your operating system. We’d love to hear your feedback [in the GitHub issue queue](https://github.com/drud/ddev/issues).

Sign up for the latest news and releases

Photo credit – Showing MS Windows on Surface Pro by WOCinTech Chat (CC BY 2.0)
