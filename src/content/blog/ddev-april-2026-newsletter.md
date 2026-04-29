---
title: "DDEV April 2026: Talking Drupal, Ubuntu 26.04, coder.ddev.com, Intel Macs fade away, Add-ons as delivery mechanism"
pubDate: 2026-04-30
summary: "April 2026 DDEV Newsletter, the latest from the DDEV community"
author: Randy Fay
featureImage:
  src: "/img/blog/2026/04/catching-up-with-ddev-team-talking-drupal.jpg"
  alt: "Talking Drupal: Catching Up with the DDEV Team"
categories:
  - Newsletters
---

## What's New

- **Ubuntu 26.04 and Fedora 44** were released this week. We checked, and we're proud to say that DDEV works great on both. We have [one small docs change](https://github.com/ddev/ddev/issues/8350) for the Ubuntu 26.04 native install. The Windows Installer did fail with an Ubuntu 26.04 distro because the `wslu` package has been removed, but we fixed that in [PR](https://github.com/ddev/ddev/pull/8351), and it has an easy workaround anyway.
- **coder.ddev.com Updates** → More work is ongoing with Coder.ddev.com, we're hoping to make it fulfil even more of your ambitions. Drush works again for the `main` branch, so it's working and available there again. Lots of other updates. [Visit coder.ddev.com](https://coder.ddev.com) and [start.coder.ddev.com](https://start.coder.ddev.com) for more, and we'd love to hear your suggestions and experiences at [coder-ddev repository](https://github.com/ddev/coder-ddev) or in the [DDEV Discord](/s/discord). We've deployed a staging server, and have plans for automated testing of changes so we don't just deploy and try them out.
- **Intel Macs have run their course** → We'll be retiring our three macOS AMD64 test runners. There's not much more for them to do, so we're going to turn them off. Only 7.3% of you are still using Intel Macs and it's been a very long time since we saw a regression or problem on the Intel test runners that wasn't also caught by the Apple Silicon runners. [See the stats](https://app.amplitude.com/analytics/share/5aedd7e813a642cab03306e179604836).

## Talking Drupal Podcast

Stas and Randy appeared on episode 549 of the Talking Drupal podcast. Get the inside scoop on latest DDEV updates, the [DDEV Drupal Contrib](https://github.com/ddev/ddev-drupal-contrib) add-on, `coder.ddev.com`, and more. [Listen to episode 549↗](https://talkingdrupal.com/549)

## DrupalDevDays Athens 2026

Community member [bserem](https://github.com/bserem) presented "From Chaos to Consistency" at DrupalDevDays Athens 2026, a DevOps session covering how DDEV brings order to local development environments. [View the presentation slides↗](https://bserem.github.io/presentations/DrupalDevDays%20Athens%202026%20-%20From%20Chaos%20to%20Consistency%20-%20DevOps%20Session.pdf). His correct and well-explained thesis is that DDEV add-ons are just a file/feature delivery mechanism that can be used to systematize your team's projects. Watch here for a blog from him!

## Community Highlights

**A new book on DDEV!** _Set Up Drupal in 10 Minutes: A Practical DDEV & Composer Guide for Developers_. [English on Amazon](https://www.amazon.com/dp/B0GRTL7ZRH/), [Italian on Amazon Italy](https://www.amazon.it/dp/B0GHWZS9LQ).

Who remembers Mike Anello's 2018 book [Local Web Development With DDEV Explained: Your Step-by-Step Guide to Local Web Development With DDEV](https://www.amazon.com/Local-Development-Explained-Step-Step-ebook/dp/B07KBFR5GQ/)? It says clearly "Up-to-Date: Constantly updated, the material in Local Web Development With DDEV Explained is always current". 4.6 stars! (Mike is now Treasurer and Board Member of DDEV Foundation, this is how you move up in the world!) My bet is that most of what he described there still works, although many things probably work better now.

## Contributor Training

**Add-on Creation and Maintenance** Contributor Training: [Watch it↗](creating-maintaining-ddev-addons-training.md)

## TYPO3 Update for DDEV

The TYPO3 community published a post on what's new in DDEV for TYPO3 developers. [Read on TYPO3 News↗](https://news.typo3.com/article/whats-new-in-ddev-for-typo3-developers)

## Community Tutorials from Around the Web

- **Getting Started with Search API in Drupal** → WebWash covers how to set up and use the Search API module in Drupal — useful alongside a DDEV local environment. [Read on WebWash↗](https://www.webwash.net/getting-started-with-search-api-in-drupal/)
- **DDEV AI Workspace: Full Drupal AI Development Setup** → [Read on menetray.com↗](https://menetray.com/en/blog/ddev-ai-workspace-ive-published-my-full-drupal-ai-development-setup)

---

## Governance

The next DDEV board and advisory group meeting is **May 6, 2026 at 8:00 AM US Mountain / 10:00 AM US Eastern / 16:00 CEST**.
[Add to Google Calendar](https://calendar.google.com/calendar/render?action=TEMPLATE&text=DDEV%20Board%20and%20Advisory%20Group%20Meeting&dates=20260506T140000Z/20260506T150000Z&details=DDEV%20Board%20and%20Advisory%20Group%20Meeting%0ALink%3A%20https%3A%2F%2Fus02web.zoom.us%2Fj%2F7315692237%3Fpwd%3DRHR6NUkwb0g5WXIzS2NOcXRucCthZz09%0AMeeting%20ID%3A%20731%20569%202237%0APasscode%3A%2012345&location=Online&trp=true) • See the [agenda](https://github.com/orgs/ddev/discussions/8256).

---

## Note: Randy on Vacation May 19–June 9

Randy will be away May 19 through approximately June 9, on a bike trip in Sicily. The community will carry on!

---

## Sponsorship Update

Sponsorship is at 79% of the goal — thank you to everyone who has contributed!

**March 2026**: ~$9,294/month (77% of goal)

**April 2026**: ~$9421/month (79% of goal), making progress, thanks!

If DDEV has helped your team, consider sponsoring. Whether you're an individual developer, an agency, or an organization, your contribution makes a difference. → [Become a sponsor↗](https://github.com/sponsors/ddev)

[Contact us](/contact) to discuss sponsorship options that work for your organization.

---

### Statistical Tidbits of the Month

- About [19,000](https://app.amplitude.com/analytics/share/a366cd04ea484324b7751fb87a720b55) users report using DDEV each week, [live graph](https://app.amplitude.com/analytics/share/a366cd04ea484324b7751fb87a720b55).
- SO MANY macOS Docker Providers, [live graph](https://app.amplitude.com/analytics/share/07d652c6e14e44c68b192625ea8ee066).
  ![macOS Docker Providers](/img/blog/2026/04/macOS-Docker-Providers.png)

## Stay in the Loop—Follow Us and Join the Conversation

- [Blog↗](https://ddev.com/blog/)
- [LinkedIn↗](https://www.linkedin.com/company/ddev-foundation)
- [Mastodon↗](https://fosstodon.org/@ddev)
- [Bluesky↗](https://bsky.app/profile/ddev.bsky.social)
- [Discord↗](/s/discord)

Compiled and edited with assistance from Claude Code.
