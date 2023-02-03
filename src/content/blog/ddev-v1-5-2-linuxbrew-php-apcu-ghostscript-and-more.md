---
title: "DDEV v1.5.2: Linuxbrew, php-apcu, Ghostscript and more"
pubDate: 2019-01-16
summary: v1.5.2 release highlights.
author: Randy Fay
featureImage:
  src: /img/blog/2019/01/ekl-20181205-13-1.jpg
  alt: Long photo of trees working up a mountainside in varying bands of green, blue, and white
  credit: "Photo by [Elli Ludwigson](/blog/author/elli-ludwigson)."
categories:
  - Announcements
---

We’ve just released DDEV v1.5.2! This is a minor release with a couple of very useful features. [Install or upgrade now](https://github.com/drud/ddev/releases). Here are a couple highlights:

**Added Linuxbrew for DDEV installation** – [Linuxbrew](http://linuxbrew.sh/) is now our [preferred install/upgrade technique on all Linux distributions](https://ddev.readthedocs.io/en/latest/#homebrewlinuxbrew-macoslinux). This makes installation easy and upgrades even easier. We would have loved to support every Linux package manager but the more sustainable solution is this one manager-fits-all. [“Fixes issue #1”](https://github.com/drud/homebrew-ddev/pull/31)!

**Added php-apcu to the web container** – php-apcu makes Composer classloading much faster. Drupal 8 and TYPO3 will see nice performance improvements, especially on the first visit to a project after a `ddev start`. For Drupal 8 `$settings['class_loader_auto_detect'] = FALSE;` is added to the settings.ddev.php and it increases performance quite a lot with php-apcu. Thanks to Matt Glaman [@mglaman](https://github.com/mglaman) for the suggestion in [Stack Overflow.](https://stackoverflow.com/a/54049172/215713)

**Ghostscript in the web container** – [Ghostscript](https://www.ghostscript.com/) is necessary for TYPO3 CMS to run with all its features. We’ve now added it as [a standard component in DDEV](https://github.com/drud/ddev/issues/920).

**Plus**, we’ve added an upgrade to MariaDB in the database container, and PHP 7.3 now has [php-memcached in web container](https://github.com/drud/ddev/issues/1350). Thanks to Dave Long [@longwave](https://github.com/longwave) for contributing a [database import progress bar](https://github.com/drud/ddev/pull/1349) as well!

For full details check out the [DDEV v1.5.2 Release Notes](https://github.com/drud/ddev/releases/tag/v1.5.2).

[Download DDEV-Local 1.5.2](https://github.com/drud/ddev)

### Contribute back to DDEV-Local

Opt-in usage information will help us understand how you’re using DDEV-Local in the wild, so we can improve it. Please consider opting-in to [usage and error reporting](https://ddev.readthedocs.io/en/latest/users/cli-usage/#opt-in-usage-information) on your DDEV projects. It helps us see where we can help you succeed in the long-term both in your local environment and on our hosting platform.

We’d love to hear from you about new features that might be most important to you and we always want to hear about bugs. Please take a look around [the DDEV issue queue](https://github.com/drud/ddev/issues) and [Stack Overflow](https://stackoverflow.com/questions/tagged/ddev) to spur your thinking!

## Going places with #DDEV!

Coming soon to [Florida Drupal Camp](https://www.fldrupal.camp/) and [DrupalCon Seattle](https://events.drupal.org/seattle2019): us! We’re proud to be Platinum Sponsors for Florida Drupal Camp. We’ve [proposed](https://www.fldrupal.camp/sessions/beginner-track/achieve-devops-nirvana-putting-one-foot-front-other) [sessions](https://www.fldrupal.camp/sessions/development-performance/local-development-environments-panel-discussion) and plan on spending plenty of contribution time with [DDEV](https://ddev.com/ddev-local/)-Local and [Quicksprint](https://www.drupal.org/tools). Follow along on [Twitter](https://twitter.com/drud) and sign up for our newsletter for all the news on #DDEV.
