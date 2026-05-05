---
title: "From a Single Chat to a Live Sponsorship Feed: DDEV's Sponsorship Data Story"
pubDate: 2026-05-05
summary: "How a request from TheDropTimes to track DDEV sponsorship data led to a web component, a public data feed, and live sponsor displays across DDEV properties."
author: Randy Fay
featureImage:
  src: /img/blog/2026/04/tdt_banner.png
  alt: DDEV sponsorship data displayed across web properties
categories:
  - Community
  - Announcements
---

In January 2025, Anoop John of [TheDropTimes](https://www.thedroptimes.com/) sent a LinkedIn message that set things in motion:

> "Happy New Year. I was thinking we could put a live sponsorship tracker for DDEV on TDT. We should ask for people for $5 per month and we need 1000 people to hit the target right? What do you think?"

That message led to live, auto-updating DDEV sponsorship displays on multiple web properties, a public data repository, and a reusable web component—all feeding from a single source of truth.

## The Challenge

DDEV's financial sustainability depends entirely on sponsorships (we have no other income). Communicating that need—and showing progress toward goals—requires getting accurate, up-to-date data in front of people where they already spend time. We wouldn't really expect to be successful with manual updates across multiple web and CLI properties.

What we needed was a data feed that could be consumed anywhere, updated (mostly) automatically, and displayed consistently.

## The sponsorship-data Repository

Anoop's request spurred the creation of [ddev/sponsorship-data](https://github.com/ddev/sponsorship-data), a public repository that aggregates sponsorship information from GitHub Sponsors and other sources, updated automatically. The data is published as structured JSON—for example, [all-sponsorships.json](https://ddev.github.io/sponsorship-data/data/all-sponsorships.json)—that any site or tool can consume.

## Mark Conroy's Web Component

[Mark Conroy](https://mark.ie/) stepped up with a reusable web component that reads from the sponsorship-data feed and renders live sponsorship information. The component lives at [web-components.mark.ie](https://web-components.mark.ie/) and is open source at [markconroy/web-components](https://github.com/markconroy/web-components). (DDEV has forked the original in order to maintain it for our particular uses.)

The component makes it trivial to embed a live sponsor list on any site—no backend required, no manual updates.

## Integration into DDEV Web Properties

With the data feed and component in place, we integrated the live sponsor display into ddev.com. Since then, it has been added to [addons.ddev.com](https://addons.ddev.com) and [docs.ddev.com](https://docs.ddev.com). Source for each:

- [ddev.com SponsorsBanner.astro](https://github.com/ddev/ddev.com/blob/main/src/components/SponsorsBanner.astro)
- [addons.ddev.com sponsors-banner.html](https://github.com/ddev/addon-registry/blob/main/_includes/sponsors-banner.html)
- [docs.ddev.com sponsors-banner.html](https://github.com/ddev/ddev/blob/main/docs/overrides/partials/sponsors-banner.html)

Now, when sponsors join or leave, the banner updates automatically. No manual edits, no stale lists.

## What `ddev start` Shows

Most dedicated DDEV users aren't spending time on websites—they're in the terminal. `ddev start` has long provided a tip of the day, so we integrated the sponsorship feed into that output as well:

![ddev start sponsorship status output](/img/blog/2026/04/ddev-start-sponsorship.png)

Some people report watching the numbers change day to day, cheering the project toward its goal.

## Why This Matters

The sponsorship situation for DDEV is something we take seriously and we know you do also: the project needs ongoing financial support to continue development and be maintained over the long term. Getting that message in front of people—accurately and consistently—helps. We're all a community working together to make this work.

The path from Anoop's January 2025 LinkedIn message to live sponsor feeds across multiple properties took a few months of work by community members who cared.

## Thanks to Anoop, The Drop Times, and Mark Conroy

More than a year later, [The Drop Times](https://www.thedroptimes.com/) is still featuring the DDEV sponsorship banner!

![The Drop Times Sponsorship Banner](/img/blog/2026/04/tdt_banner.png)

Thank you for your support, and thank you for your encouragement to go down this path. It has resulted in better communication with our community and a shared sense of ownership around DDEV's future.

Mark, your packaging of a nice banner made things so much easier!

## Join in

If you use DDEV and find it valuable, consider sponsoring at [github.com/sponsors/ddev](https://github.com/sponsors/ddev). Every bit that you and your organization can contribute helps all of us. Thank you!
