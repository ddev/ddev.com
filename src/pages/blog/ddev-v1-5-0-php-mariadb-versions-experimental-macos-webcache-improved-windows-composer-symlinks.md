---
title: "DDEV v1.5.0 – PHP & MariaDB Versions, Experimental macOS Webcache, Improved Windows Composer Symlinks"
pubDate: 2018-12-19
author: Randy Fay
featureImage:
  src: https://ddev.com/app/uploads/2018/12/DSC_3769-e1545284198357.jpg
  alt:
  caption:
  credit:
categories:
  - Announcements
---

We’ve just released DDEV v1.5.0! [Install or upgrade now](https://github.com/drud/ddev/releases). (Helpful hint! You can now [watch for releases on GitHub](https://help.github.com/articles/watching-and-unwatching-releases-for-a-repository/)). Here are some highlights, and a couple ways you can easily contribute:

**Support for MariaDB v10.1 & v10.2** – MariaDB 10.1 is available with “mariadb_version: 10.1” in your .ddev/config.yaml, or run:

`ddev config --mariadb-version=10.1`

This will help [TYPO3](https://typo3.org/) v8 users who can’t run MariaDB 10.2\. See [the pull request here](https://github.com/drud/ddev/pull/1318) for more info.

**Support for PHP v7.3** – PHP 7.3 was just released and is supported in this version of DDEV-Local. To specify this version of PHP (or any version) use “php_version: 7.3” in your .ddev/config.yaml or run:

`ddev config --php-version=7.3`

Please remember that there is not yet a php-memcached for PHP 7.3.

**Speed up DDEV-Local with webcaching** – For macOS users, there is now an experimental webcache strategy to help large CMS projects like Drupal8 or TYPO3 run faster. If you set “webcache_enabled: true” in the config.yaml DDEV will start a caching container so that actual webserving happens on a much faster filesystem.

As this is an experimental feature, we would really like to hear your feedback! There are some small hiccups involved; \`ddev start\` may take longer because your entire project must be pushed into the webcache container. Hint: clean up your db_snapshots before you run \`ddev start\`. After this everything will load very fast locally!

A big shout out to Drud team member [@cweagans](https://github.com/cweagans) for the original [docker-bg-sync](https://github.com/cweagans/docker-bg-sync) that we forked and used to implement this! Thank you Cameron!

We talk [more about the new webcache feature on the blog here](https://ddev.com/ddev-local/ddev-locals-new-webcache-feature/) (with screencast!) and hope to provide the same feature for Windows in a coming release. Meanwhile, please see the [details in the release notes](https://github.com/drud/ddev/releases/tag/v1.5.0).

**Symlinks fixes for Windows** – We’ve added better support for Composer on Windows! Previously the symlinks in Docker for Windows containers were in some cases simulated symlinks, which would cause issues. Now we have a cleanup step that converts those files into real symlinks. It only works on Docker for Windows, and it only works if you have “Developer mode” enabled on your Windows 10 Pro host.

[More info is in the docs](https://ddev.readthedocs.io/en/latest/users/developer-tools/#ddev-and-composer). Please note that this does not affect Windows 10 Home/Docker Toolbox users.

### Ready for the easiest way to contribute back to DDEV-Local?

We’re pretty excited about the inclusion of [opt-in instrumentation](https://ddev.readthedocs.io/en/latest/users/cli-usage/#opt-in-usage-information) in this release. If allowed, it can provide usage and error information back to the development team. When you upgrade you will be asked for permission for this reporting. Thank you very much for considering opting-in! It can really help us help you in the future.

> Sentry gets feedback from commands that people are running in DDEV-Local so we can see what’s breaking and when. This gives us a data matrix to use to fix real problems people are having but may not be reporting themselves. We’re paying close attention to configuration between our local environment and hosting to provide for more of a GitOps approach to modern frameworks.
>
> \-Kevin Bridges, CTO, DRUD Tech

For full details check out the [DDEV v1.5.0 Release Notes](https://github.com/drud/ddev/releases/tag/v1.5.0) on GitHub.

[Download DDEV-Local 1.5.0](https://github.com/drud/ddev)

### Out and About with #DDEV

Please feel free to tag us on twitter [@Drud](https://twitter.com/drud) and with [#DDEV](https://twitter.com/hashtag/DDEV?src=hash) anytime you work with our local environment or hosting platform! We’re also on [GitHub](https://github.com/drud/ddev) and the conversation continues on [Stack Overflow](https://stackoverflow.com/search?tab=newest&q=%23ddev).

> "I'm a big fan of the fact that in DDEV databases are stored as [#Docker](https://twitter.com/hashtag/Docker?src=hash&ref%5Fsrc=twsrc%5Etfw) volumes… You can completely remove your containers, and keep a snapshot of your databases."  
> Listening to [@TalkingDrupal](https://twitter.com/TalkingDrupal?ref%5Fsrc=twsrc%5Etfw) 190 – [#DDEV](https://twitter.com/hashtag/DDEV?src=hash&ref%5Fsrc=twsrc%5Etfw) with Mike Anello of [@DrupalEasy](https://twitter.com/DrupalEasy?ref%5Fsrc=twsrc%5Etfw) ? ?<https://t.co/zltZOvtUIK> [pic.twitter.com/W3aprVd7E1](https://t.co/W3aprVd7E1)
>
> — DRUD Technology (@drud) [December 19, 2018](https://twitter.com/drud/status/1075391816143392769?ref%5Fsrc=twsrc%5Etfw)

---

Photo by [Elli Ludwigson](https://ddev.com/author/elli/)
