---
title: "DDEV v1.7.1: `config.*.yaml`, static bind ports, longer project names"
pubDate: 2019-04-08
summary: v1.7.1 release highlights.
author: Randy Fay
featureImage:
  src: /img/blog/2019/04/ekl-20190320-0150-e1554833038556.jpg
  alt: Photo of an arid landscape with pale earth, dark green trees, and rust-colored rock formations set against hazy blue-green mountains in the distance
  credit: "Photo courtesy [Elli Ludwigson](/blog/author/elli-ludwigson)."
categories:
  - Announcements
---

We’ve just released [DDEV v1.7.1](https://github.com/drud/ddev/releases/tag/v1.7.1)! This release includes the ability to override a committed config.yaml, static port binds and longer project names. [Install or upgrade now](https://github.com/drud/ddev/releases). Here are a couple of highlights:

**`config.*.yaml`** – If you’ve been using DDEV on a team across different operating systems you’ve experienced how wonderful it is to be able to ship your project around from Windows to Linux. But, you may have needed to override a committed config.yaml with custom configuration for your local environment. Now we have included config.\*.yaml so you can retain your custom settings while [working seamlessly on a team](https://ddev.readthedocs.io/en/latest/users/extend/customization-extendibility/#extending-configyaml-with-custom-configyaml-files).

**Optional static bind ports for db and web server containers** – Those who want the dbserver or web server bound port to be static within a project can use `host_db_port` or `host_webserver_port` to specify it. Thanks to [tmotyl](https://github.com/tmotyl) for getting the ball rolling. [More details here](https://github.com/drud/ddev/pull/1502).

**Longer project names should be possible** – Previously, a long server name would cause the ddev-router to stop working. Now you can use a very long name with no trouble. Thank you to [janhelke](https://github.com/janhelke) for [this PR](https://github.com/drud/ddev/pull/1484)!

Plus, PHP 7.2 is the [default for new projects](https://github.com/drud/ddev/pull/1497).

[Read the full release notes here.](https://github.com/drud/ddev/releases/tag/v1.7.1)

## To Download:

macOS and Linux Homebrew: `brew upgrade ddev`

Linux or macOS via script:

`curl https://raw.githubusercontent.com/drud/ddev/master/scripts/install_ddev.sh | bash`

Windows: Download the ddev_windows_installer.v1.7.1.exe above or with Chocolatey `choco install ddev` or `choco upgrade ddev` (or `choco install ddev --version=1.7.1` while it’s in the approval process.)

And anywhere, you can just download the tarball or zipball, untar or unzip it, and place the executable in your path where it belongs.

NOTE: Especially to mariadb 10.1 users: If you had to explicitly set the dbcontainer version in your .ddev/config.yaml due to the bug in v1.6.0, please remove that now.

[DDEV v1.7.1 Release](https://github.com/drud/ddev/releases/tag/v1.7.1)

## DDEV Events

We are [currently at DrupalCon Seattle](https://ddev.com/events/meet-up-with-the-ddev-team-in-early-2019/#DCSeattle) and we can’t wait to show you what we’ve been up to with our hosting platform! Sign up for the DDEV newsletter below to receive a free copy of [Mike Anello’s DDEV ebook](https://www.amazon.com/Local-Development-Explained-Step-Step/dp/1731048858/ref=tmm%5Fpap%5Fswatch%5F0) and a DDEV t-shirt from our booth in exhibit hall. Follow along during the event on [Twitter](https://twitter.com/drud) with #DDEV.

The next session of Mike Anello’s online DrupalEasy course, [Professional Local Development with DDEV](https://www.drupaleasy.com/ddev), is Wednesday, April 17th. Sign up now to beat the rush!

## Contribute back to DDEV-Local

Thank you very much to [akalata](https://github.com/akalata) on GitHub for testing this release! Many of you also filed issues and helped point out important improvements.

[DDEV is an open source project](https://github.com/drud/ddev/blob/master/CONTRIBUTING.md) and we very much appreciate the time our contributors give to improving the tool for everyone. Please continue to submit issues for new features and bugs, and take a look around [the DDEV issue queue](https://github.com/drud/ddev/issues) and [Stack Overflow](https://stackoverflow.com/questions/tagged/ddev) to spur your thinking!
