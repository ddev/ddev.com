---
title: "DDEV Usage Statistics, November 2024"
pubDate: 2024-11-05
#modifiedDate: 2024-09-06
summary: DDEV Usage Statistics from Amplitude, November, 2024
author: Randy Fay
#featureImage:
#  src: /img/blog/2024/10/mount-garfield-palisade.jpg
#  alt: Mount Garfield above Palisade
categories:
  - Community
---

Here's an updated review of some DDEV usage stats. It's always fun to see some of these:

**DDEV Environments:** 

DDEV Environment Usage shows macOS (darwin) as the most popular development environment, but WSL2 and Traditional Windows are almost 25%, and Linux 21%. It's amazing that DDEV can work so well for so many different people in such different environments!

![DDEV Environment Usage](/img/blog/2024/11/ddev-environment-usage.png)

**Commands**

The most popular commands are probably the ones you'd expect, `ddev composer`, `ddev ssh`, `ddev php`. `ddev drush` is excluded here because it was used 515,000 times in the last 7 days. I guess some people must be using it in an automated situation. If you're using any of these in CI, please turn off reporting if it happens to be on, `ddev config global --instrumentation-opt-in=false` or `export DDEV_NO_INSTRUMENTATION=true`.

![DDEV Commands, excluding drush](/img/blog/2024/11/Commands.png)


**CMS Project Types**

Drupal, the generic "PHP" type, and TYPO3 remain the most popular, but they're the ones with the longest-term support. But look at Laravel, Craft CMS, and Laravel getting more popular all the time! 

![Most Popular CMS Project Types](/img/blog/2024/11/CMS-project-types.png)

**macOS Docker Providers**

People have [lots of Docker providers](https://ddev.readthedocs.io/en/stable/users/install/docker-installation/#docker-installation-macos) to choose from on macOS. My own favorite is OrbStack due to its performance and excellent maintenance, but the classic Docker Desktop still has a huge market share. Neither of those is open source, but Lima, Colima, and Rancher Desktop all are.

![macOS Docker Providers](/img/blog/2024/11/macOSDockerProvider.png)

**WSL2 Docker Provider**

On WSL2, though, the robust and stable Docker CE wins out by a little bit. Note that *all* of the Docker providers are dependent on (and bundle) the excellent Docker CE project, with is maintained by Docker, Inc. So if you use Docker in any way, thank them!

![WSL2 Docker Providers](/img/blog/2024/11/WSL2DockerProvider.png)

**macOS Architecture (Apple Silicon vs Intel)**

It seems that almost all of you have gotten new Macs now!

![macOS System Architecture](/img/blog/2024/11/macOS_UsagebyArchitecture.png)

**Add-on Usage**

As you know, the DDEV Add-on ecosystem has been a tremendous success, because people can scratch their own itch and the community can maintain add-ons that they need. Here are the most popular ones, excluding PhpMyAdmin, which had by far the most usage (3 times the usage of the redis add-on).

![Add-On Usage](/img/blog/2024/11/add-ons-excluding-phpmyadmin.png)


**Bundled `ddev pull` Usage**

DDEV provides a number of bundled hosting providers, including Platform.sh, Pantheon, Acquia, Lagoon, etc. Here are the actual usages of some of these. There are loads and loads of others that you have customized and used various ways. Many people customize these with names like `prod` and `staging` for those kinds of usage too, so this is very much not complete. And DDEV can be used with so many other situations, like [rsync and any hosting provider](https://ddev.readthedocs.io/en/stable/users/providers/). Just the other day I found out that the Mittwald hosting service provides a [Mittwald add-on](https://github.com/mittwald/ddev) that provides a custom hosting provider!

![ddev pull Usage](/img/blog/2024/11/ddev-pull-commands.png)

**

**You can explore these yourself, ask for permission.** If you're a known community member I'll happily add your access to Amplitude to explore. There are many more things that can be done with this. See [Amplitude Contributor Training](amplitude-ddev-analytics-contributor-training.md).

**THANKS to all of you who are supporting DDEV’s path to sustainability** and who have gotten your organizations to do so. 13,600 or so of you are using this tool and ecosystem weekly, about 55 of you are financially supporting its sustainability. Time to [step up](https://github.com/sponsors/ddev) if you're not in those 55! We need you in the same way you need us.

Want to keep up as the month goes along? Follow our [blog](https://ddev.com/blog/), [LinkedIn](https://www.linkedin.com/company/ddev-foundation), [Mastodon](https://fosstodon.org/@ddev), [X,](https://x.com/randyfay) and join us on [Discord](https://discord.gg/5wjP76mBJD).
