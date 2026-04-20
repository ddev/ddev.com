---
title: "From a Single Chat to a Live Sponsorship Feed: DDEV's Sponsorship Data Story"
pubDate: 2026-04-21
summary: "How a request from TheDropTimes to track DDEV sponsorship data led to a web component, a public data feed, and live sponsor displays across DDEV properties."
author: Randy Fay
featureImage:
  src: /img/blog/2026/04/tdt_banner.png
  alt: DDEV sponsorship data displayed across web properties
categories:
  - Community
  - Announcements
---

<!--
TODO:
* So much thanks to Anoop for the support and the inspiration
* So much thanks to The Drop Times for continuing to promote
* Banner: The Drop Times banner
-->

Over a year ago, Anoop John of [TheDropTimes](https://www.thedroptimes.com/) sent a generous and useful message that sparked something bigger than any of us expected:

> "Happy New Year. I was thinking we could put a live sponsorship tracker for DDEV on TDT. We should ask for people for $5 per month and we need 1000 people to hit the target right? What do you think?"

That single message set off a chain of events that ended with live, auto-updating DDEV sponsorship displays on multiple web properties, a public data repository, and a reusable web component—all feeding from a single source of truth.

## The Challenge

DDEV's financial sustainability depends entirely on sponsorships (we have no other income). Communicating that need—and showing progress toward goals—requires getting accurate, up-to-date data in front of people where they already spend time. But we would never consider manual updates across multiple web and CLI properties.

What we needed was a data feed that could be consumed anywhere, updated (mostly) automatically, and displayed consistently.

## The sponsorship-data Repository

Anoop's request spurred the creation of a public repository: [ddev/sponsorship-data](https://github.com/ddev/sponsorship-data), aggregates sponsorship information from GitHub Sponsors and other sources, and is updated automatically. The data is available as structured JSON that any site or tool can consume.

## Mark Conroy's Web Component

[Mark Conroy](https://mark.ie/) stepped up with a reusable web component that reads from the sponsorship-data feed and renders live sponsorship information. The component lives at [web-components.mark.ie](https://web-components.mark.ie/) and is open source at [markconroy/web-components](https://github.com/markconroy/web-components). (DDEV has forked the original in order to maintain it for our particular uses.)

The component makes it trivial to embed a live sponsor list on any site—no backend required, no manual updates.

## Integration into DDEV Web Properties

With the data feed and component in place, we integrated the live sponsor display into ddev.com. Since then it has been added to [addons.ddev.com](https://addons.ddev.com) and [docs.ddev.com](https://docs.ddev.com).

Now, when sponsors join or leave, the banner updates automatically. No manual edits, no stale lists.

## What `ddev start` Shows

But we realized that most dedicated DDEV users aren't spending time looking at the websites. They needed communication in the medium they're using, `ddev start`. `ddev start` has long provided a "message of the day", but we needed info added about the sponsorship situation. So we integrated the feed into the message of the day as well. Some people report that they love watching the changes every day as it updates incrementally, cheering for the project!

## Why This Matters

While we don't like asking for money any more than anybody else, the sponsorship situation for DDEV is real: the project needs ongoing financial support to continue development and remain free for everyone. Getting that message in front of people—accurately and consistently—helps. We're all a community working together to make this work for the long term.

The path from Anoop's January email to live sponsor feeds across multiple properties took a few months of collaboration between community members who cared. That's how open-source sustainability work actually gets done.

## Thanks to Anoop and The Drop Times

More than a year later, [The Drop Times](https://thedroptimes.com) is still featuring the DDEV sponsorship banner!

![The Drop Times Sponsorship Banner](/public/img/blog/2026/04/tdt_banner.png)

Thank you for your support, and thank you for your encouragement to go down this path, which has resulted in better communication with our stakeholders and a sense of community around DDEV's future. 

## Join in

If you use DDEV and find it valuable, consider sponsoring at [github.com/sponsors/ddev](https://github.com/sponsors/ddev). Every bit that you and your organization can contribute helps all of us. Thank you!
