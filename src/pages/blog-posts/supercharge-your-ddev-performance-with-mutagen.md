---
title: "Supercharge your DDEV performance with Mutagen"
pubDate: 2021-07-28
author: Randy Fay
featuredImage: https://ddevdotcom.ddev.site/app/uploads/2021/07/Drupal-9-Web-Install-times-seconds-less-is-better.png
categories:
  - DDEV
---

Ddev v1.18.0-alpha1 introduces a new performance improvement based on [Mutagen.io](http://Mutagen.io). It eliminates the required wait time when a bind-mounted file is accessed inside (or outside) the container.

The improvements for general web activity are quite striking, as shown in the graphs below. On macOS, a Drupal 9 web installation can be twice as fast as with NFS, and many times faster than plain Docker. On traditional Windows, the speed improvement is off the chart (literally). I actually had to remove the plain Docker category because it took 20 minutes to install and so it swamped the chart and you couldn’t see the relationships of anything else.

![](https://ddev.com/app/uploads/2021/07/Drupal-9-Web-Install-times-seconds-less-is-better.png)

Improvements for drush activity inside the container are similarly impressive. (Drush is the Drupal command-line tool.) Once again, the traditional Windows plain Drupal drush install had to be removed because it made it so you couldn’t see anything else.

![](https://ddev.com/app/uploads/2021/07/Drupal-9-drush-install-times-seconds-less-is-better.png)

There is a cost to Mutagen – A Drupal 9 initial sync on `ddev start` and certain other activities takes a bit of time, on the order of 5-60 seconds, depending on the filesystem/operating system and depending on whether it has already been done. If you have a huge number of files (think magento2 or large Drupal or TYPO3 sites) it will be longer, but the performance result should be equivalent.

A mutagen-enabled Magento2 site with all the sample data installed took 48 seconds for the initial sync (mac M1) and 12 seconds for the follow-up sync.

![](https://ddev.com/app/uploads/2021/07/Drupal-9-Mutagen-Sync-time-seconds.png)

Note that there are also some risks/caveats, as seen in the [docs](https://ddev.readthedocs.io/en/latest/users/performance/#using-mutagen).

* This is a brand-new feature. Your mileage may vary. Please report your experience in any of the [support channels](https://ddev.readthedocs.io/en/stable/#support-and-user-contributed-documentation)!
* This is mostly for macOS users. WSL2 is already the preferred environment for Windows users, but if you’re still using traditional Windows this makes a huge difference. Turning on mutagen doesn’t make sense on Linux or WSL2.
* If your project is likely to change the same file on both the host and inside the container, you may be at risk for conflicts.
* Massive changes to either the host or the container are the most likely to introduce issues. This integration has been tested extensively with major changes introduced by `ddev composer` and `ddev composer create` but be aware of this issue. A script that deletes huge sections of the synced data is a related behavior that should raise caution. You may want to run a `ddev mutagen sync` after manually running composer inside the container.
* You can cause an explicit sync with`ddev mutagen sync` and see syncing status with `ddev mutagen status`. Note that both `ddev start` and `ddev stop` automatically force a mutagen sync.
* Keep backups. Mutagen syncing is an experimental feature.
* The mutagen integration by default does not sync VCS directories like .git into the container, but this can be changed with advanced configuration options. (This means that by default you cannot do git operations inside the container with mutagen turned on.)

Want to try it out? It’s in the new edge releases of DDEV v1.18.0, for example [v1.18.0-alpha1](https://github.com/drud/ddev/releases/tag/v1.18.0-alpha1). See the instructions on the release page; you can install it using Homebrew (macOS) or Chocolatey (Windows)

Are you interested in the original data, or comparing it to your own? See the [spreadsheet and charts](https://docs.google.com/spreadsheets/d/16WaJGYQkFiYKuvBregwM-2XF-CxF77diOEnLWZR7EIM/edit?usp=sharing).

_A huge shout-out to [Tag1 Consulting](https://tag1.com), who sponsored this (very extensive) feature. Is your company interested in sponsoring DDEV features or support? Please give us a yell in any of the [support channels](https://ddev.readthedocs.io/en/latest/#support-and-user-contributed-documentation)._

And of course another huge shout-out to [Mutagen.io](http://mutagen.io) and maintainer [Jacob Howard (@xenoscopic)](https://github.com/xenoscopic), on whose work this feature stands. Jacob spent lots of time with me to explain all the ins and outs, thanks! Once again, as throughout this project, DDEV stands on the shoulders of giants!
