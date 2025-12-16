---
title: "DDEV December 2025 Newsletter"
pubDate: 2025-12-15
summary: "Board of Directors established, Upsun sponsorship changes, v1.25 coming, new add-ons, community tutorials, and the path forward"
author: Randy Fay
featureImage:
  src: "/img/blog/2025/12/sunset-on-mt-garfield-2025-12-10.jpg"
  alt: "Sunset on Mount Garfield, 2025-12-10"
  caption: "Sunset on Mount Garfield, near Palisade, Colorado, USA, 2025-12-10"
categories:
  - Newsletters
---

As we wrap up 2025, there's much to celebrate and some important news to share. The DDEV Foundation has reached a governance milestone, and we're looking ahead to 2026 with both gratitude and a call to action.

## What's New

- **DDEV Foundation Board of Directors Established** → The DDEV Foundation now has a formal Board of Directors, including Mike Anello, Jen Lampton, Benni Mack, Andrew Berry, and Randy Fay. [Read more↗](board-of-directors-established.md)
- **Upsun Sponsorship Changes** → Upsun remains a supporter, but is lowering their sponsorship level starting in January, leaving a critical gap we need you to fill. [Read more↗](upsun-thank-you-new-sponsors-needed.md)
- **Power Through Blackouts** → Stas Zhuk shares how DDEV community support helped him continue maintaining DDEV during wartime blackouts in Ukraine. [Read more↗](power-through-blackouts-ddev-community-support.md)
- **Fritz!Box Routers and DDEV** → Solving DNS Rebinding issues with Fritz!Box routers. [Read more↗](fritzbox-routers-and-ddev.md)

## Coming Soon: v1.25.0

We're preparing for the upcoming v1.25.0 major release in January. Here are some things to know:

- **New defaults for new projects** — New projects will get updated default settings. PHP 8.4, Node.js 24, MariaDB 11.8 become defaults for new projects (existing projects are not affected).
- **Some exotic Dockerfiles may need adjustments** — If you have custom Dockerfiles with unusual configurations there may be complications because of the new base image. We'll be happy to help solve them.

Watch for announcements everywhere.

## New Add-ons

Several new official add-ons have been added to the registry:

- **[ddev-nvm](https://github.com/ddev/ddev-nvm)** — NVM (Node Version Manager) integration for DDEV (replaces the native `ddev nvm`, which has been removed from upcoming v1.25.0)
- **[ddev-frankenphp](https://github.com/ddev/ddev-frankenphp)** — FrankenPHP server for PHP built on top of Caddy
- **[ddev-redis-insight](https://github.com/ddev/ddev-redis-insight)** — Redis Insight Web UI for use with DDEV Redis service
- **[ddev-python2](https://github.com/ddev/ddev-python2)** — Python 2 for npm builds and similar that still require it

## Community Highlights

- **OpenCode DDEV Plugin**: Justin Vogt created a plugin for OpenCode AI that automatically detects DDEV and wraps commands to execute inside containers [View on GitHub↗](https://github.com/JUVOJustin/opencode-ddev-plugin)
- **ddev-deploy by Code Enigma**: New add-on for deployment workflows [View on GitLab↗](https://gitlab.com/code-enigma/ddev-deploy) • [LinkedIn post↗](https://www.linkedin.com/feed/update/urn:li:share:7401924604065296384/)
- **Setting Up WeeklyDrupal.com with DDEV**: Saroj Kunwar shares the journey of setting up a local dev environment for a Drupal 10 platform [Read on LinkedIn↗](https://www.linkedin.com/pulse/how-i-set-up-local-dev-environment-weeklydrupalcom-all-saroj-kunwar-f0mwc/)

## Community Video Tutorials

- **DrupalEasy Show & Tell: DDEV Q&A with Randy Fay**: Covers Solr integration, custom commands, ngrok/Cloudflared sharing, and more [Watch on DrupalEasy↗](https://www.drupaleasy.com/video/2025/11/drupaleasy-show-tell-ddev-qa-randy-fay)
- **DrupalEasy Show & Tell: DDEV + Ubuntu + Visual Studio Code debugging with Randy Fay**: This Show & Tell is a tour-de-force of DDEV Xdebug debugging and will likely be useful for anyone having issues getting DDEV + Xdebug + Visual Studio Code working. During the Show & Tell, Randy stressed the importance of debugging from a known, standard state. [Watch on DrupalEasy↗](https://www.drupaleasy.com/video/2025/11/drupaleasy-show-tell-ddev-ubuntu-visual-studio-code-debugging-randy-fay)
- **WebWash: Getting Started with Search API in Drupal**: Ivan Zugec covers setting up Drupal's Search API module [Watch on YouTube↗](https://www.youtube.com/watch?v=-45TDujkI2g)
- **WebWash: Getting Started with DDEV for Drupal Development**: Ivan Zugec walks through DDEV setup for Drupal projects [Watch on YouTube↗](https://www.youtube.com/watch?v=dHTuJzfpD_o)

## Help Us Out: Use HEAD

Want to help DDEV development? Consider testing with the HEAD version of DDEV. This helps us catch issues early. We think some advanced users with complex Dockerfiles may have hiccups with upcoming v1.25.0. It's easy, See [the docs↗](https://docs.ddev.com/en/stable/developers/building-contributing/#testing-latest-commits-on-head) for instructions.

## DDEV Training Continues

Join us for upcoming training sessions for contributors and users.

- **January 22, 2026 at 10:00 US ET / 16:00 CET — Mutagen, syncing, problems, upload_dirs for direct bind mounts**
  [Add to Google Calendar](https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mutagen%2C%20syncing%2C%20problems%2C%20upload_dirs%20for%20direct%20bind%20mounts&dates=20260122T150000Z/20260122T160000Z&details=Join%20the%20DDEV%20training%20session%20via%20Zoom.%0ALink%3A%20https%3A%2F%2Fus02web.zoom.us%2Fj%2F7315692237%3Fpwd%3DRHR6NUkwb0g5WXIzS2NOcXRucCthZz09%0AMeeting%20ID%3A%20731%20569%202237%0APasscode%3A%2012345&location=Online&trp=true) •
  [Download .ics](/files/ics/ddev-2026-01-22.ics)

- **February 26, 2026 at 10:00 US ET / 16:00 CET — Git bisect for fun and profit**
  [Add to Google Calendar](https://calendar.google.com/calendar/render?action=TEMPLATE&text=Git%20bisect%20for%20fun%20and%20profit&dates=20260226T150000Z/20260226T160000Z&details=Join%20the%20DDEV%20training%20session%20via%20Zoom.%0ALink%3A%20https%3A%2F%2Fus02web.zoom.us%2Fj%2F7315692237%3Fpwd%3DRHR6NUkwb0g5WXIzS2NOcXRucCthZz09%0AMeeting%20ID%3A%20731%20569%202237%0APasscode%3A%2012345&location=Online&trp=true) •
  [Download .ics](/files/ics/ddev-2026-02-26.ics)

- **March 26, 2026 at 10:00 US ET / 15:00 CET — Using `git worktree` with DDEV projects and with DDEV itself**
  [Add to Google Calendar](https://calendar.google.com/calendar/render?action=TEMPLATE&text=Using%20git%20worktree%20with%20DDEV%20projects%20and%20with%20DDEV%20itself&dates=20260326T140000Z/20260326T150000Z&details=Join%20the%20DDEV%20training%20session%20via%20Zoom.%0ALink%3A%20https%3A%2F%2Fus02web.zoom.us%2Fj%2F7315692237%3Fpwd%3DRHR6NUkwb0g5WXIzS2NOcXRucCthZz09%0AMeeting%20ID%3A%20731%20569%202237%0APasscode%3A%2012345&location=Online&trp=true) •
  [Download .ics](/files/ics/ddev-2026-03-26.ics)

- **April 23, 2026 at 10:00 US ET / 16:00 CEST — Creating, maintaining and testing add-ons**
  2026-updated version of our popular add-on training. [Previous session recording↗](https://www.youtube.com/watch?v=TmXqQe48iqE)
  [Add to Google Calendar](https://calendar.google.com/calendar/render?action=TEMPLATE&text=Creating%2C%20maintaining%20and%20testing%20add-ons&dates=20260423T140000Z/20260423T150000Z&details=Join%20the%20DDEV%20training%20session%20via%20Zoom.%0ALink%3A%20https%3A%2F%2Fus02web.zoom.us%2Fj%2F7315692237%3Fpwd%3DRHR6NUkwb0g5WXIzS2NOcXRucCthZz09%0AMeeting%20ID%3A%20731%20569%202237%0APasscode%3A%2012345&location=Online&trp=true) •
  [Download .ics](/files/ics/ddev-2026-04-23.ics)

Zoom Join Info:
Link: [Join Zoom Meeting](https://us02web.zoom.us/j/7315692237?pwd=RHR6NUkwb0g5WXIzS2NOcXRucCthZz09)
Passcode: 12345

## Governance and Planning

- **Annual Advisory Group and Board Meeting** — Join us for our annual extended advisory group and board meeting (public; all are welcome):

  **January 14, 2026 at 8:00 AM US Mountain Time / 4:00 PM CET — DDEV Extended Advisory Group and Board Meeting**
  Annual 2-hour review of 2025 and plans for 2026
  [Discussion details↗](https://github.com/orgs/ddev/discussions/7863) •
  [Add to Google Calendar](https://calendar.google.com/calendar/render?action=TEMPLATE&text=DDEV%20Extended%20Advisory%20Group%20and%20Board%20Meeting&dates=20260114T160000Z/20260114T180000Z&details=Annual%202-hour%20review%20of%202025%20and%20plans%20for%202026.%0AAgenda%3A%0A-%20DDEV%20Trademark%20transfer%20progress%0A-%202026%20goals%20for%20board%20consideration%0A-%202025%20year-end%20review%20feedback%0A-%20Financial%20summary%20and%20planning%20discussion%0A%0AMeeting%20details%3A%20https%3A%2F%2Fgithub.com%2Forgs%2Fddev%2Fdiscussions%2F7863&location=Online&trp=true) •
  [Download .ics](/files/ics/ddev-2026-01-14.ics)

---

## Sponsorship Update: Your Help is Needed

With Upsun lowering their sponsorship in January, we'll drop from 70% to about 56% of our sponsorship goal. That's a significant gap.

**Previous status**: $8,376/month (70% of goal)
**After January**: ~$6,874/month (53% of goal)

If DDEV has helped your team, now is the time to give back. Whether you're an individual developer, an agency, or an organization — your contribution makes a difference. → [Become a sponsor↗](https://github.com/sponsors/ddev)

[Contact us](/contact) to discuss sponsorship options that work for your organization.

## Stay in the Loop—Follow Us and Join the Conversation

- [Blog↗](https://ddev.com/blog/)
- [LinkedIn↗](https://www.linkedin.com/company/ddev-foundation)
- [Mastodon↗](https://fosstodon.org/@ddev)
- [Bluesky↗](https://bsky.app/profile/ddev.bsky.social)
- [Discord↗](/s/discord)

Compiled and edited with assistance from Claude Code.
