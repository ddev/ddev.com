---
title: "DDEV v1.6.0: NFS Mounting and Chocolatey"
pubDate: 2019-02-12
author: Randy Fay
featureImage:
  src: https://ddev.com/app/uploads/2019/02/EKL_20181203_2-e1549995318578.jpg
  alt:
  caption:
  credit: "Photo by [Elli Ludwigson](/blog/author/elli-ludwigson)."
categories:
  - Announcements
---

We’ve just released **DDEV v1.6.0**! This release includes NFS mounting and Chocolatey for Windows. [Install or upgrade now](https://github.com/drud/ddev/releases). Here are a couple of highlights:

**NFS Mounting** – DDEV now supports [NFS mounting](https://github.com/drud/ddev/pull/1396) into the container on all platforms. This provides nearly the speed increase of the[ experimental macOS webcache feature](https://ddev.com/ddev-local/ddev-locals-new-webcache-feature/), but with far greater reliability. Bonus on this one is that it also solves symlink issues on Windows. It does require some configuration on the host side, so please [read the docs, ](https://ddev.readthedocs.io/en/latest/users/performance/#using-nfs-to-mount-the-project-into-the-container) [this post for config on macOS](https://ddev.com/ddev-local/ddev-local-nfs-mounting-setup-macos/), and keep an eye out here for upcoming screencasts with more detail. And if you have any trouble setting up NFS on your composer, please [read the debugging instructions](https://ddev.readthedocs.io/en/latest/users/performance/#debugging-ddev-start-failures-with-nfs%5Fmount%5Fenabled-true).

**Chocolatey for Windows** – Now you can install DDEV via the [Chocolatey](https://chocolatey.org/) package manager on Windows. Fun fact, on our Windows testbots we use choco to install all the key items that a testbot needs with `choco install -y git mysql-cli golang make docker-desktop nssm GoogleChrome zip jq composer cmder netcat ddev` ddev is now included there in the choco command! Please note that the approval process for Chocolately takes a few days, but DDEV is already available via `choco install ddev --version=1.6.0`

**Plus**, [Xdebug](https://github.com/drud/ddev/pull/1391) works out of the box on Docker toolbox, a small fix to [webcache](https://github.com/drud/ddev/pull/1390) for non-Mac users, and [triggers](https://github.com/drud/ddev/pull/1399) now work in the ddev-dbserver container.

**Community contributions** as issues, reviews, PRs and Stack Overflow articles are all part of how this project works. Read our [contribution guidelines](https://github.com/drud/ddev/blob/master/CONTRIBUTING.md) and [reach out to us](https://ddev.readthedocs.io/en/stable/#support) anytime!

## To Install:

macOS Homebrew and Linux Linuxbrew: `brew upgrade ddev`

Linux or macOS via script:

`curl https://raw.githubusercontent.com/drud/ddev/master/scripts/install_ddev.sh | bash`

Windows: Download the ddev_windows_installer.v1.6.0.exe above or with Chocolatey `choco install ddev` or `choco upgrade ddev`.

More details in the release notes:

[DDEV v1.6.0 Release](https://github.com/drud/ddev/releases/tag/v1.6.0)

## CTO’s corner: DDEV Hosting Updates from Kevin

When creating a product on the scale of an enterprise hosting system, there are a couple of ways to expose it to the public. We’ve chosen a slow approach that is filtered by our Golden Ticket programs so that we can align our product vision with the needs of our audience. We have a respectable workload being processed by our production clusters that are delivering traffic for a number of TYPO3 and Drupal sites ranging from small to large.

In the last quarter of 2018, we brought our initial hosting APIs online and began using them. We have dedicated the first quarter of 2019 to focus on increasing functionality in the API so that self-managing organizations, teams, and developers as well as projects, environments and sites is possible. We’ve been listening to the feedback of our users as they come online and are moving steadily to incorporate the functionality our community is requesting.

Over the coming months, you will continue to hear from various Golden Ticket winners building up to an announcement of general availability for DDEV-Live.

## DDEV Community

Want to know more about DDEV-Local developer Randy Fay? The [OSTraining podcast has a fun interview](https://www.ostraining.com/blog/podcasting/randy-ddev/), covering everything from an epic self-supported bike trip to Drupal to DDEV.

Want to do a deep dive on DDEV-Local? Mike Anello runs a regular training on DrupalEasy called [Professional Local Development with DDEV](https://www.drupaleasy.com/ddev). The next session is Wednesday, February 20th, so sign up now!

## Where in the world is the #DDEV team?

Sign up for the DDEV newsletter below to receive a free copy of [Mike Anello’s DDEV ebook](https://www.amazon.com/Local-Development-Explained-Step-Step/dp/1731048858/ref=tmm%5Fpap%5Fswatch%5F0) and a DDEV t-shirt at one of our upcoming events! We’re headed to [Florida Drupal Camp](https://www.fldrupal.camp/), [Drupal Camp London](http://drupalcamp.london) and [DrupalCon Seattle](https://events.drupal.org/seattle2019). Follow along on [Twitter](https://twitter.com/drud) with #DDEV.

