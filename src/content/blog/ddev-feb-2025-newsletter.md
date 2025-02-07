---
title: "DDEV February 2025 Newsletter"
pubDate: 2025-02-06
#modifiedDate: 2025-02-06
summary: DDEV February 2025 Newsletter
author: Randy Fay
featureImage:
  src: /img/blog/2025/02/nancy-lewis-winter-scene.jpg
  alt: Nancy Lewis winter scene painting
  credit: "Plein Air painting: Winter landscape by Nancy Lewis"
categories:
  - Community
---

**Happy February!**

**DDEV v1.24.2** was [released](https://github.com/ddev/ddev/releases/tag/v1.24.2) with [MySQL 8.4 support](https://ddev.com/blog/database-improvements) and improved `ddev composer create` making it nearly compatible with `composer create-project`.

**DDEV Notes and News**

- The [DDEV Advisory Group](https://github.com/orgs/ddev/discussions/6853) met January 8. The primary topic of discussion was the [change in DDEV's funding](https://ddev.com/blog/platform-sh-ddev-funding-changes) and budgeting response to it. Our decision was to continue the arrangement with Stas as-is (bill hours at $50/hour, cap $4000/month). Randy will also bill at $50/hour with cap of $4000, but limited by always trying to leave $6000 in the bank.
- **We need your input!** Please take a look at the proposed [2025 Plans for DDEV](2025-plans.md) and let us know your opinion, how these things should be ordered, and what we might have missed!
- macOS users will be interested in the (not-DDEV-focused) [Docker Performance macOS 2025](https://www.paolomainardi.com/posts/docker-performance-macos-2025/).
- [The Open Source Pledge and DDEV: A Path to Sustainability](https://ddev.com/blog/open-source-pledge).
- [MySQL 8.4 is now in DDEV v1.24.2](https://ddev.com/blog/database-improvements/).
- DDEV v1.24.2 has improved argument handling for `ddev composer create`, making it nearly compatible with `composer create-project`. Additionally, the `ddev composer create-project` alias has been added for improved usability.
- The Gitpod that we have known and loved is shutting down. This affects DDEV contributors that have used it and makes [DrupalPod as it stands obsolete](https://www.drupal.org/project/drupalpod/issues/3500792). If you're interested in DrupalPod and will be at DrupalCon Atlanta, there is a Birds-of-a-Feather session scheduled on the path forward, 04:00pm - 04:30pm Tuesday, March 25, 2025.
- The Drop Times did a nice and extensive [interview with Randy](https://www.thedroptimes.com/interview/45389/making-ddev-past-present-and-future-in-focus) and [video interview](https://www.youtube.com/watch?v=EctDtSZcBhU).
- Tag1 Consulting did a performance comparison of the new Drupal CMS vs WordPress, (using DDEV for everything). See [Drupal CMS vs WordPress Performance](https://www.tag1consulting.com/blog/drupal-cms-vs-wordpress-performance-2025).
- The latest DDEV Quickstarts in the docs are for [Drupal CMS](https://ddev.readthedocs.io/en/stable/users/quickstart/#drupal-drupal-cms) and [ProcessWire](https://ddev.readthedocs.io/en/latest/users/quickstart/#processwire)! Congratulations to the Drupal community on Drupal CMS, and welcome ProcessWire folks. Thanks to [Bernhard Baumrock](https://github.com/BernhardBaumrock) for the ProcessWire initiative!

**Ongoing DDEV Work**

- **Node.js** improved support: People have asked for some time for Node.js to be the primary web server (instead of Nginx+php-fpm, etc), and now it can be done in a number of ways. This is now in [DDEV HEAD](https://ddev.readthedocs.io/en/stable/developers/building-contributing/#testing-latest-commits-on-head) and there are Quickstarts for [Simple Node.js](https://ddev.readthedocs.io/en/latest/users/quickstart/#nodejs-nodejs-web-server) and [SvelteKit](https://ddev.readthedocs.io/en/latest/users/quickstart/#nodejs-sveltekit). Incidentally, this also provides experimental support for [FrankenPHP](https://frankenphp.dev/) and provides a [Quickstart](https://ddev.readthedocs.io/en/latest/users/quickstart/#generic-frankenphp) for it as a demonstration of the "generic" web server type.
- **Web-based Add-on Registry**: As add-ons have become so very popular it's hard to sort them out and understand which ones are meaningful for a particular need. This long-term goal is nearing completion as Stas has a proof of concept and now has to push it through to a maintained production status.
- **Automated Tests for Quickstarts**: You won't see these, but it's a big step for us. Because our [Quickstarts](https://ddev.readthedocs.io/en/stable/users/quickstart/) are so dependent on the behavior of the upstream projects, it's always been hard for us to know when the target project has had a change that invalidates them. Now we have automated tests for the quickstarts of number of project types, and will add others as maintenance is done. Thanks to [Ralf Koller](https://github.com/rpkoller) for extensive work on the Drupal, WordPress, and TYPO3 quickstarts.
- **Funding situation data feed**: Aiming for ever-increasing transparency in the DDEV funding situation, we now have an automatically-updated feed showing our [funding situation from all sources](https://github.com/ddev/sponsorship-data). You can see the [exact situation](https://github.com/ddev/sponsorship-data/blob/main/data/all-sponsorships.json) at any time. We expect to use this feed in the message-of-the-day on DDEV, as well as ddev.com and the DDEV README.
- **New contributors and maintainers**: As DDEV's community grows, we always need new contributors and maintainers. We love to get contributors trained and get privileges to maintainers as needed! We already have lots of [Contributor Training](https://ddev.com/blog/category/training/) material, and [docs on how to contribute](https://ddev.readthedocs.io/en/stable/developers/) but we'll do anything you ask for! Need help with something? Need updates? Join us in [Discord](/s/discord) or [make an appointment with me](https://cal.com/randyfay/30min).

**Funding DDEV and especially to help both maintainers go full-time on DDEV**: _We need your help and your organization's help! Let me know if you need help getting this into your 2025 budget!_ Our key financial goal is to [fully fund @stasadev so he can work exclusively on DDEV](lets-fund-stas-maintainer.md). We've slipped back in recent months. We need about $3700/month in increased pledges from organizations and individuals. See [Full information about supporting DDEV](https://github.com/sponsors/ddev). We’re happy to invoice you, happy to [do a call discussing this](https://cal.com/randyfay/30min), and would love it if you’d include DDEV in your 2025 budgeting process. (Our current status: We receive about $3000/month, have been spending about $3000-$4000/month. Bank balance is about $6,000, down from $8,600 last month.)

**THANKS to all of you who are supporting DDEV’s path to sustainability** and who have gotten your organizations to do so.

Want to keep up as the month goes along? Follow on

- [blog](https://ddev.com/blog/)
- [LinkedIn](https://www.linkedin.com/company/ddev-foundation)
- [Mastodon](https://fosstodon.org/@ddev)
- [Bluesky](https://bsky.app/profile/ddev.bsky.social)
- and join our community on [Discord](/s/discord)

Happy February from Randy Fay, DDEV Project Lead. It's a delight to collaborate with you!
