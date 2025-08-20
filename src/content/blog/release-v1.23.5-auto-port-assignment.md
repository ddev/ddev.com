---
title: "Release v1.23.5: Auto Port Assignment, Auto Timezones"
pubDate: 2024-10-17
#modifiedDate: 2024-10-17
summary: DDEV's v1.23.5 release has support for automatically assigning ports when the default ports are already in use, automatically setting the timezone in the web container, and many other goodies
author: Randy Fay
featureImage:
  src: /img/blog/2024/10/DDEV-v1.23.5.png
  alt: DDEV v1.23.5 release announcement
categories:
  - Announcements
---

I'm happy to announce that [DDEV v1.23.5](https://github.com/ddev/ddev/releases/tag/v1.23.5) was released today! This has 81 pull requests incorporated into it since v1.23.4, and a number of advances. Every single advance was pushed forward to community needs and community interaction, and we're convinced that our great community is the source of DDEV's strength. Thank you!

**Automatic Port Selection**: In the past, when you started up a DDEV project and the configured ports were already in use, you got an error message. This was [easy to work around](https://ddev.readthedocs.io/en/stable/users/usage/troubleshooting/#web-server-ports-already-occupied), and easy to configure for your system, but it was an unnecessary stop on people's DDEV journey, especially for first-time users. Now, DDEV automatically selects an available port in this situation, and just continues starting your project using the available port. Have apache running? No problem. Have Lando running? No problem. You'll probably want to use the default ports 80 and 443 as you go forward, but there's no reason to stumble starting up a project for the first time. This ambitious and difficult feature was implemented by community member [Alberto Viu](https://github.com/agviu) and me and would never have happened without his initiative and expertise. Thanks!

**Automatic Time Zones**: It's been possible to specify the time zone for the web container for years, but automating it was suggested by community member [Martin Anderson-Clutz (mandclu)](https://www.drupal.org/u/mandclu) in the Drupal Slack and implemented by Stas. We think that it will "just work" for almost everybody.

**`ddev get` becomes `ddev add-on`**: Community member [Guy Sartorelli](https://github.com/GuySartorelli) took this one on and nailed it. He noticed that `ddev get` had outgrown its name and now had too many weird permutations, so now we have `ddev add-on list` and `ddev add-on remove` and things that make more sense. Don't worry, the same capabilities are still there, and `ddev get` still works the way it did, it just nags you a little bit when you use the old command.

**Windows ARM64 Support**: Those fancy new Windows ARM64 laptops are being promoted for their AI, but they're fantastic machines for performance and battery life. DDEV has full support for them, both on WSL2 and traditional Windows.

**PostgreSQL 17** came out and is now supported by DDEV.

**PHP8.4 RC1** is now included. It's still missing just a few extensions, which hopefully will be there at PHP 8.4 release in November.

**`ddev debug rebuild` is the renamed `ddev debug refresh`**. It's a great way to test and debug Dockerfile problems and `webimage_extra_packages` problems, and now has the ability to run for just one service or for all, with or without Docker cache.

You'll find loads more in the [release notes](https://github.com/ddev/ddev/releases/tag/v1.23.5), but I just wanted to stop by and say thank you to our wonderful community for continuing to shape DDEV and its future.

Our next release is planned to be a major release, v1.24.0, and will have PHP 8.4.0 and will change the default PHP version for new projects to PHP 8.3. We expect to have MySQL 8.4 in there as well.

Follow our [blog](https://ddev.com/blog/), [LinkedIn](https://www.linkedin.com/company/ddev-foundation), [Mastodon](https://fosstodon.org/@ddev), and join us on [Discord](/s/discord). And we'd love to have you sign up for the [monthly newsletter](/newsletter).
