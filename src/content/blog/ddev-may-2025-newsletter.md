---
title: "DDEV May 2025 Newsletter"
pubDate: 2025-05-06
#modifiedDate: 2025-04-07
summary: DDEV May 2025 Newsletter
author: Randy Fay
featureImage:
  src: /img/blog/2025/05/rattlesnake-arches.jpg
  alt: One of the arches in the Rattlesnake Arches area in western Colorado, USA
  credit: "One of the arches in the Rattlesnake Arches area in western Colorado, USA"
categories:
  - Community
---

**DDEV Notes and News**

- DDEV has new documentation on how to handle **unusual networking situations like packet-inspection VPNs** and corporate proxies. These are complicated situations where Docker is involved, and these setups seem to be working for people, even using Zscaler and GlobalProtect. See [Special Network Configurations](https://ddev.readthedocs.io/en/latest/users/usage/networking/).
- **[DDEV Add-on Maintenance Guide](https://ddev.com/blog/ddev-add-on-maintenance-guide)** by [@stasadev](https://ddev.com/blog/author/stas-zhuk/) gives lots of guidance to new and experienced add-on maintainers, and highlights the many, many updates Stas undertook on all the official DDEV add-ons recently.
- **[Solving Intel-only AMD64/X64 problems on macOS with Apple Silicon](https://ddev.com/blog/amd64-with-rosetta-on-macos/)**: There are still Node.js projects and other binary problems out there in the world that are incompatible with the ARM64 Apple Silicon machines and newer Windows ARM64. But with Rosetta and recent Docker providers, support for most of them is possible even as we wait for them to be updated.
- Two great new blogs on using **DDEV with Drupal projects** (or really anywhere else, but Drupal-focused):
  - [Modern Tools for Drupal Development](https://iamdroid.net/blog/dev-tools) by [Andrey Yurtaev](https://www.linkedin.com/in/iamdroid/) takes PhpStorm love to a new level and shows a full setup using all the recommended code quality tools, with coverage of PHPStan, PHP_CodeSniffer, and more.
  - [Drupal development using Visual Studio Code connected directly to DDEV's web container](https://www.drupaleasy.com/blogs/ultimike/2025/04/drupal-development-using-visual-studio-code-connected-directly-ddevs-web) by [Michael Anello](https://www.drupaleasy.com/users/ultimike) shows his long-taught and well-developed technique of using **VS Code and operating directly inside the DDEV web container**, where you use basic commands like `composer`, `phpcs`, `phpstan` directly, without having to prefix them with `ddev`.
- [Install TYPO3 with DDEV - in 8 Simple Steps](https://t3planet.de/blog/install-typo3-with-ddev/).
- Randy spoke to the [Drupal4Gov]() folks on [Divide and Conquer: A Systematic Approach to Troubleshooting Issues](https://www.youtube.com/watch?v=zliDmAUBwrQ).
- Randy spoke to the Backdrop Live folks on migrating from Lando to DDEV (not recorded).
- [Learning how to install and set up the new Drupal CMS using DDEV](https://www.linkedin.com/pulse/learning-how-install-set-up-new-drupal-cms-using-ddev-lcvgf/).
- [TYPO3 Announcement of the DDEV XHGui Feature](https://typo3.org/article/budget-idea-report-integrate-xhgui-into-ddev-core).
- [Building an Off-Ramp from WordPress with DDEV](https://ddev.com/blog/building-offramp-from-wordpress-with-ddev/): [Jeremy Gonyea](https://ddev.com/blog/author/jeremy-gonyea) shows his experience with a great one-off DDEV project migrating content from WordPress.
- **Node.js app on a subdomain**: [Exposing a Node.js App Over HTTP / HTTPS on a Subdomain in DDEV](https://ddev.com/blog/ddev-expose-node-app-on-subdomain/) explains how you can configure DDEV to provide a _subdomain_ for your extra server in a DDEV project. This approach suggests a great new feature for DDEV.

**TYPO3 Community Budget Idea Suggestions**

The [Q3 call for TYPO3 community budget ideas](https://typo3.org/article/call-for-community-budget-ideas-q3-2025) is out, and we'd like to propose a DDEV feature that would be great for the DDEV community and perhaps TYPO3 folks in particular. The community budget idea initiative underwrote the [XHGui feature](xhgui-feature.md) in Q1, but our proposal for Q2 didn't get enough votes. We'd love to hear from you about features or other improvements you think might make a good proposal for Q3.

**Governance Ideas and Futures**

As you know, one of DDEV's goals for 2025 is formalizing and documenting its governance. A recent conversation with the founders of Backdrop CMS focused us in on the [Apache Software Foundation Project Management Committee](https://www.apache.org/foundation/governance/pmcs) technique. It's well-established, used by many projects, and fairly simple to implement. We'll be studying that more later this year. We're always interested in your feedback!

**Randy Will Be Out Bikepacking May 23-June 23**

Randy plans to be out bikepacking and mostly out of touch from about May 23 to about June 23. Stas will carry on with all the things, collaborating with our great community. There will most likely not be a June newsletter though.

**Thanks for subscribing to the newsletter! We love to have this way to keep in touch.** If you're not getting it yet by email, please sign up at [ddev.com/newsletter](/newsletter).

**Sponsorship Update** According to our [open sponsorship feed](https://github.com/ddev/sponsorship-data/blob/main/data/all-sponsorships.json) our total monthly average income went up from $7639 to $7659 since March 1, a small $20 bump, but going the right direction. It's 64% of our monthly goal (as now shown on the banner at [ddev.com](/)!) Thank you! If your organization or you aren't on the bandwagon yet, [join us to help make DDEV sustainable](https://github.com/sponsors/ddev). GitHub Sponsors is great, but we also do support contracts, invoicing, PayPal — anything that works for you! Our goal is $12,000/month, so we're more than halfway there.

**THANKS to all of you who are supporting DDEV’s path to sustainability** and who have gotten your organizations to do so.

Want to keep up as the month goes along? Follow on

- [blog](https://ddev.com/blog/)
- [LinkedIn](https://www.linkedin.com/company/ddev-foundation)
- [Mastodon](https://fosstodon.org/@ddev)
- [Bluesky](https://bsky.app/profile/ddev.bsky.social)
- and join our community on [Discord](/s/discord)

Thanks for collaborating with this wonderful community!
