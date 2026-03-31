---
title: "DDEV March 2026: Maintainership and AI, DrupalCon, New TUI, coder.ddev.com, and 77% of Goal"
pubDate: 2026-03-27
summary: "Maintainership and AI, DrupalCon Chicago recap, new terminal dashboard, coder.ddev.com launch, sponsorship at 77% of goal, and community highlights from around the web."
author: Randy Fay
featureImage:
  src: /img/blog/2026/03/contribution-mentors-drupalcon-chicago.jpg
  alt: Mentors for contributors at DrupalCon Chicago
categories:
  - Newsletters
---

Just under the deadline for the March newsletter!

I spent the last week at DrupalCon Chicago, seeing lots of old friends and having lots of discussions about the impact of AI on open-source developers everywhere.

## Scaling Maintainership for DDEV (and everywhere)

I'm noticing that because of AI it's getting easier for our lovely community to contribute to DDEV. But I'm also seeing that our PR queue is getting longer, and Stas and I are feeling more pressure from it, because we sure don't like to frustrate contributors. In many cases, we have been getting good quality and nontrivial contributions, and contributions that have been prioritized. But they may not be exactly the things that we were hoping to put our own energy toward. And a couple of them are difficult to review because they touch low-level areas.

And I even notice that I am tempted to create too many new PRs because it's easy. On the train back from Chicago (30 hours) I couldn't help myself and did two new diagnostic commands for DDEV (using Claude Code). It's all well and good, but that's two more PRs that I have to study carefully, manually test on multiple platforms, and that Stas has to look at and test.

We'd love to have your comments and feedback about this cycle. Here are some thoughts that came up in various conversations:

- We need to keep trying to turn contributors into maintainers. AI doesn't really do that. It helps people create things, or figure out how to scratch an itch, but it doesn't typically help with overall maintenance activities. If we can get more community members to build their skills in reviewing other PRs (both looking at code and manually testing) and giving their feedback about issues and priorities, maybe that's a good path.
- We probably need to add a little more conversation to contributions _before_ people spend time on them. I opened an [issue for discussion](https://github.com/ddev/ddev/issues/8255) about changing to requiring an issue (and conversation) before PR creation. I'd love your comments.
- Guarding against burnout is critical for our project, especially for Stas and me. We want to be smart about this and properly manage all of our resources for the long term.

If you're interested in contributing more deeply and moving toward a maintainer role, the [contributor training sessions](/blog/category/training) are a good way to get started. And join us for conversations and community support in [Discord](/s/discord) and the [issue queue](https://github.com/ddev/ddev/issues).

## What's New

- **coder.ddev.com Launched** → Free, experimental cloud-based DDEV workspaces powered by Coder. Start a Drupal contribution environment in under 30 seconds with full VS Code, Xdebug, and CLI support. [Read the announcement↗](coder-ddev-com-announcement.md). Some folks used this for contributions at the DrupalCon Chicago Contribution Day. I've been using it on the train on the way home.
- **New TUI Dashboard** → DDEV now includes an interactive terminal dashboard for managing projects, checking service status, and running common commands without leaving the terminal. Watch a [Two-minute Screenshare](https://www.youtube.com/watch?v=bdfpeq74ewo). Inspired by community member [Olivier Dobberkau's](https://github.com/dkd-dobberkau) `ddev-mngr` add-on.
- **`git worktree` Contributor Training** → Our March 26 session covered using `git worktree` with DDEV to run multiple versions of the same project simultaneously. [Watch the recording and read the post↗](git-worktree-contributor-training.md)

## DrupalCon Chicago

DrupalCon Chicago was a highlight of the month. Birds-of-a-Feather (BoF) sessions are informal, attendee-organized meetups at DrupalCon where people with a common interest gather to talk — no slides required. I led several DDEV BoFs, including Git Worktrees and DDEV, DDEV Office Hours, What's New in DDEV, [New `ddev share` features](share-providers.md), Xdebug in DDEV, and [Using coder.ddev.com (DDEV in the Cloud)](coder-ddev-com-announcement.md).

<!-- TODO: Mentored Contribution -->

If you attended and have thoughts (or are just interested) join us to discuss in [Discord](/s/discord).

## Florida Drupal Camp

Florida Drupalcamp in February was also a good time — see the [`git worktree` session recording](https://www.fldrupal.camp/session/use-git-worktree-ddev-run-multiple-versions-same-site) was well-received. Thanks to everyone who came out and shared their DDEV experiences.

## Governance

The DDEV board and advisory group met on March 4, 2026. See all the [details and recording](https://github.com/orgs/ddev/discussions/8197).

The next meeting is **May 6, 2026 at 8:00 AM US Mountain / 10:00 AM US Eastern / 16:00 CEST**.
[Add to Google Calendar](https://calendar.google.com/calendar/render?action=TEMPLATE&text=DDEV%20Board%20and%20Advisory%20Group%20Meeting&dates=20260506T140000Z/20260506T150000Z&details=DDEV%20Board%20and%20Advisory%20Group%20Meeting%0ALink%3A%20https%3A%2F%2Fus02web.zoom.us%2Fj%2F7315692237%3Fpwd%3DRHR6NUkwb0g5WXIzS2NOcXRucCthZz09%0AMeeting%20ID%3A%20731%20569%202237%0APasscode%3A%2012345&location=Online&trp=true) • [Discussion and details](https://github.com/orgs/ddev/discussions/8256)

## Community Highlights

- **ddev-drupal-code-quality** → [UltraBob](https://github.com/UltraBob) published a DDEV add-on for Drupal code quality tooling. [View on GitHub↗](https://github.com/UltraBob/ddev-drupal-code-quality)
- **ddev-joomla** → René Kreijveld published a DDEV add-on for Joomla development. [View on GitHub↗](https://github.com/renekreijveld/ddev-joomla). He also has a PR going for explicit Joomla support in DDEV core.
- **ddev-drupal-contrib** → The `ddev-drupal-contrib` add-on continues to be a go-to for Drupal contrib module development. [View on GitHub↗](https://github.com/ddev/ddev-drupal-contrib)

## Interviews and Articles About Stas

Two pieces this month featuring DDEV maintainer Stas Zhuk:

- **TheDropTimes Interview** → "The Work Behind the Workflow: Stas Zhuk and the Future of DDEV" — an interview covering Stas's work on DDEV and where things are headed. [Read on TheDropTimes↗](https://www.thedroptimes.com/interview/66467/work-behind-workflow-stas-zhuk-and-future-ddev)
- **Dev.to Feature** → "The Future of DDEV: Stas Zhuk Is Pushing It in the Right Direction" — a community perspective on Stas's contributions. [Read on Dev.to↗](https://dev.to/victorstackai/the-future-of-ddev-stas-zhuk-is-pushing-it-in-the-right-direction-3472)

## Community Tutorials from Around the Web

- **Symlink Your Way to Faster Drupal Contrib Module Development** → A practical technique for speeding up module development workflows with DDEV. [Read on Medium↗](https://medium.com/@srd2725/symlink-your-way-to-faster-drupal-contrib-module-development-ad5379968f22)
- **DDEV, Laravel, and a Go API: The Sidecar Approach** → Russell Jones explains how to get DDEV, Laravel, and a Go API service talking to each other. [Read on Dev.to↗](https://dev.to/jonesrussell/how-we-got-ddev-laravel-and-a-go-api-talking-the-sidecar-approach-316j)
- **Deploy Laravel to Coolify Without the Pain** → How to use DDEV with Coolify for Laravel deployments. [Read on Medium↗](https://medium.com/@taki.elias/deploy-laravel-to-coolify-without-the-pain-introducing-ddev-coolify-b23d6f84e969)
- **Local Development with DDEV** → A tutorial covering DDEV setup and daily use. [Read more↗](https://tquinonero.github.io/tutorials/local-development-with-ddev/)
- **Getting Started with DDEV** → Peter Benoit's overview of DDEV for local development. [Read more↗](https://www.peterbenoit.com/blog/ddev)

---

## Upcoming Training

Join us for upcoming training sessions for contributors and users.

- **April 23, 2026 at 10:00 US ET / 16:00 CEST — Creating, maintaining and testing add-ons**
  2026-updated version of our popular add-on training. [Previous session recording↗](https://www.youtube.com/watch?v=TmXqQe48iqE)
  [Add to Google Calendar](https://calendar.google.com/calendar/render?action=TEMPLATE&text=Creating%2C%20maintaining%20and%20testing%20add-ons&dates=20260423T140000Z/20260423T150000Z&details=Join%20the%20DDEV%20training%20session%20via%20Zoom.%0ALink%3A%20https%3A%2F%2Fus02web.zoom.us%2Fj%2F7315692237%3Fpwd%3DRHR6NUkwb0g5WXIzS2NOcXRucCthZz09%0AMeeting%20ID%3A%20731%20569%202237%0APasscode%3A%2012345&location=Online&trp=true) •
  [Download .ics](/files/ics/ddev-2026-04-23.ics)

[Join Zoom Meeting](https://us02web.zoom.us/j/7315692237?pwd=RHR6NUkwb0g5WXIzS2NOcXRucCthZz09) — Meeting ID: 731 569 2237 — Passcode: 12345

---

## Sponsorship Update

Sponsorship is at **77% of goal** — thank you to everyone who has contributed!

**February 2026**: ~$8,422/month (70% of goal)

**March 2026**: ~$9,294/month (77% of goal) - Great progress, thank you!

If DDEV has helped your team, consider sponsoring. Whether you're an individual developer, an agency, or an organization, your contribution makes a difference. → [Become a sponsor↗](https://github.com/sponsors/ddev)

[Contact us](/contact) to discuss sponsorship options that work for your organization.

## Stay in the Loop—Follow Us and Join the Conversation

- [Blog↗](https://ddev.com/blog/)
- [LinkedIn↗](https://www.linkedin.com/company/ddev-foundation)
- [Mastodon↗](https://fosstodon.org/@ddev)
- [Bluesky↗](https://bsky.app/profile/ddev.bsky.social)
- [Discord↗](/s/discord)

Compiled and edited with assistance from Claude Code.
