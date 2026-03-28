---
title: "From a Single Chat to a Live Sponsorship Feed: DDEV's Sponsorship Data Story"
pubDate: 2026-03-27
summary: "How a request from TheDropTimes to track DDEV sponsorship data led to a web component, a public data feed, and live sponsor displays across DDEV properties."
author: Randy Fay
featureImage:
  src: /img/blog/2026/03/sponsorship-data.png
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
In January 2025, Anoop John of [TheDropTimes](https://www.thedroptimes.com/) sent a message that sparked something bigger than any of us expected:

> "Happy New Year. I was thinking we could put a live sponsorship tracker for DDEV on TDT. We should ask for people for $5 per month and we need 1000 people to hit the target right? What do you think?"

That single message set off a chain of events that ended with live, auto-updating DDEV sponsor displays on multiple web properties, a public data repository, and a reusable web component—all feeding from a single source of truth.

## The Challenge

DDEV's financial sustainability depends entirely on sponsorships (we have no other income). Communicating that need—and showing progress toward goals—requires getting accurate, up-to-date data in front of people where they already spend time. But manually updating sponsor lists across multiple sites is tedious and error-prone.

What we needed was a data feed that could be consumed anywhere, updated automatically, and displayed consistently.

## The sponsorship-data Repository

The first piece was a public repository: [ddev/sponsorship-data](https://github.com/ddev/sponsorship-data). This repository aggregates sponsorship information from GitHub Sponsors and other sources, and is updated automatically on a daily schedule. The data is available as structured JSON that any site or tool can consume.

The pull request that kicked this off: [ddev/sponsorship-data#5](https://github.com/ddev/sponsorship-data/pull/5).

## Mark Conroy's Web Component

[Mark Conroy](https://mark.ie/) stepped up with a reusable web component that reads from the sponsorship-data feed and renders a live sponsor display. The component lives at [web-components.mark.ie](https://web-components.mark.ie/) and is open source at [markconroy/web-components](https://github.com/markconroy/web-components).

The feature request that started that work: [markconroy/web-components#1](https://github.com/markconroy/web-components/issues/1).

The component makes it trivial to embed a live sponsor list on any site—no backend required, no manual updates.

## Integration into DDEV Web Properties

With the data feed and component in place, we integrated the live sponsor display into ddev.com. The work to add this is tracked in [ddev/ddev.com#339](https://github.com/ddev/ddev.com/issues/339).

Now, when sponsors join or leave, the displays update automatically. No manual edits to site content, no stale lists.

## What `ddev start` Shows

The data feed also powers what users see when they run `ddev start`. The daily update cycle means the sponsor information shown in the CLI is never more than a day old. Users see current sponsors every time they start a project.

## Why This Matters

The sponsorship situation for DDEV is real: the project needs ongoing financial support to continue development and remain free for everyone. Getting that message in front of people—accurately and consistently—helps.

The path from Anoop's January email to live sponsor feeds across multiple properties took a few months of collaboration between community members who cared. That's how open-source sustainability work actually gets done.

If you use DDEV and find it valuable, consider sponsoring at [github.com/sponsors/ddev](https://github.com/sponsors/ddev). Even $5/month adds up when enough people participate.
