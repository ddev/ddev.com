---
title: "DDEV-Local Release v0.16.0"
pubDate: 2018-03-29
author: Rick Manelius
featureImage:
  src: /img/blog/2018/03/volcano.jpg
  alt:
  caption: “This morning at 13k feet”
  credit: S. Grandchamp
categories:
  - Announcements
---

Announcing [DDEV-Local Release v0.16.0](https://github.com/drud/ddev/releases/tag/v0.16.0)! Faster default performance and a community contribution that makes users’ first-time setup smoother.

We’re always trying to strike a balance between the amount of control we give to you, and how much we take out of your way and handle automatically so you can on with your work. We’re grateful to our users who gave us excellent feedback and ideas that have gone into this release to help keep this balance. Thank you all! We hope you’ll find your set up smoother now and your day-to-day work faster, simpler, and better with DDEV-Local.

## DDEV default performance improved by up to 6x

Users reported the TYPO3 CMS environment was slow, so we went back and looked more closely at the resources we were using in DDEV-Local. When we turned off Xdebug by default, it’s 6x faster. Since Xdebug is not used universally, the speed gain is compelling. Thanks to everyone who reported and tested the speed issues.

**What’s changed?** Depending on when you want to use Xdebug, explicitly [enable or disable Xdebug in your config.yaml](https://ddev.readthedocs.io/en/latest/users/step-debugging/#enable-or-disable-xdebug-in-your-configyaml) as a post-start step. It does mean that while you’re using Xdebug you’ll notice things slowing down.

## Smoother setup for first-time users

Users reported the first steps to getting a new site set up were not obvious. We want to make everyone’s first experience a successful one. Now, DDEV-Local creates the settings file during the configuration step and clearly communicates how we’re managing the settings files.

This change came directly from a new contributor. User Matt Glaman ([mglaman](https://github.com/mglaman)) had a great idea to make this setup step easier. He also [submitted a PR](https://github.com/drud/ddev/pull/678) to demonstrate how it could work. We’re really impressed that he’s [jumped into contributing to DDEV-Local](https://glamanate.com/blog/goland-ide-and-local-vendor-directories) to practice his Go programming skills. Thanks, Matt! Open source #ftw!

If you’d like to get involved in contributing to DDEV, check out the [Contributing guide](https://github.com/drud/ddev/blob/master/CONTRIBUTING.md) in each repository and our [Community Guide](https://github.com/drud/community) for tips on the contribution workflow.

The CMSs we support each have a local configuration or settings file for each site.

- WordPress has `wp-config.php`
- TYPO3 CMS has `AdditionalConfiguration.php`
- Backdrop has `settings.php`
- Drupal has `settings.php`

The challenge is that different CMSs and different platforms like Pantheon have their own ways of managing these settings files.

We want to be flexible in how we manage settings files, so we can play nice with all of them. We also want to account for various scenarios: starting a fresh site with no previous settings file, importing a site with an existing settings file, or starting up a site you set up with DDEV-Local before. We’re still improving this step so that we have sensible fallbacks for each CMS to make this easier whether files exist or not, and how they should be managed. Your continued feedback is helping us get this right.

**What’s changed?** Now after you run `ddev config` DDEV-Local will attempt to create the necessary settings file, checking if one already exists and how it’s managed. If DDEV-Local discovers this comment, it will know DDEV manages it.

Check out the [Getting Started](https://ddev.readthedocs.io/en/latest/users/cli-usage/#getting-started) documentation for more information about the first-time setup.

## Other changes in this release

- Documentation: We’ve been working on documentation to help you get the most out of DDEV-Local.
- Security: Permission issues between host/container UID/GID addresses file upload issues.

## Update today!

To update DDEV-Local follow the steps for [installing and updating](https://ddev.readthedocs.io/en/latest/#installation) for your operating system. We’d love to hear your feedback [in the GitHub issue queue](https://github.com/drud/ddev/issues).
