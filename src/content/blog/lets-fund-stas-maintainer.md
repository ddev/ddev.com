---
title: "Let's Fully Fund Maintainer Stas"
pubDate: 2024-08-01
modifiedDate: 2026-07-27
modifiedComment: "Updated for 2026: Stas has been full-time on DDEV since 2024, but the role is only about 80% funded and sponsorship is at 83% of the $12,000/month goal; refreshed the Upsun funding history, Stas' contribution numbers, and the maintenance examples; updated feature image with a new photo of Stas wearing DDEV swag"
summary: "Let's fully fund DDEV maintainer Stas Zhuk"
author: Randy Fay
featureImage:
  src: /img/blog/2026/07/stas-ddev-t-shirt.jpg
  alt: Stas Zhuk, DDEV Maintainer
categories:
  - Announcements
---

**Update (2026-07-25)**: You did it — mostly. Stas left client work behind and has been working on DDEV full-time since 2024, which is exactly what this post asked for. What hasn't caught up is the funding: his full-time maintainer role is only about 80% funded. Recurring sponsorship is about $9,900/month, or 83% of the DDEV Foundation's $12,000/month goal for both maintainers, leaving a gap of roughly $2,000/month. So the title still applies, just for a different reason: DDEV already depends on a full-time maintainer that the community isn't yet fully paying for. The numbers and examples below have been updated for 2026; the [sponsor page](/sponsor) always shows the current live total.

---

We all want DDEV to be fully maintained at the level you depend on. Maintainer Stas Zhuk already does that work full-time. Now is the time to fully fund it.

**DDEV's Funding**: DDEV is funded by individuals and organizations via [sponsorship](/sponsor) and invoiced support commitments. [Upsun](https://upsun.com) (formerly Platform.sh) [became lead sponsor in 2022](platform-sh-becomes-a-lead-sponsor-of-ddev.md) and remains a generous partner sponsor, though in 2025 they [changed their approach](platform-sh-ddev-funding-changes.md) from employing Randy to funding the Foundation directly, and in 2026 they [completed transfer of the DDEV trademark to the DDEV Foundation](upsun-trademark-transfer-complete.md). One consequence: the Foundation now has to budget for _both_ maintainers, which is why the funding goal covers both of us. As the pace of required maintenance and features has increased, we've explained how we intend to grow our maintainership for the long-term in a [couple](recruiting-maintainers.md) of [blog posts](expanding-ddev-maintainer-team.md), and laid out the bigger picture in [Sustainability for DDEV](sustainability-for-ddev.md). (DDEV's "fiscal entity" for funding is the US 501(c)(3) [DDEV Foundation](/foundation)).

**Stas' Role as DDEV Maintainer**: In October, 2023, we [introduced Stas to the community](introducing-maintainer-stas.md) as our second maintainer, and since 2024 he has worked on DDEV full-time. He knows how all the testing and the various infrastructures work, has mastered the Go and Docker codebase, and has contributed thousands of bugfixes, features, and documentation improvements. As of July 2026, he has contributed [600 commits](https://github.com/ddev/ddev/graphs/contributors) to the main branch of the `ddev/ddev` project alone, second only through the whole history of DDEV to yours truly — nearly triple the 211 he had when this post was first written. He maintains add-ons, supports new contributors, answers questions in Discord, Slack, and the GitHub issue queue. If you want a sense of the person behind the work, read TheDropTimes' interview, [The Work Behind the Workflow](https://www.thedroptimes.com/interview/66467/work-behind-workflow-stas-zhuk-and-future-ddev). Nearly everything you rely on in a DDEV release passes through him.

**Why is DDEV Maintenance Important?** You and DDEV are engulfed in a maelstrom of change. Upstream technologies change on you weekly. Things break from all directions. If DDEV weren't cared for daily, it would fail to serve you within a pretty short time.

- PHP 8.5 is supported, as is every version back to 5.6, so both your newest and your oldest projects keep working.
- Drupal 11 is the current stable release and DDEV already handles Drupal 12; explicit Joomla support arrived in v1.25.2.
- MariaDB 12.3 LTS, PostgreSQL 18, and MySQL 8.4 are all supported.
- The container world keeps moving underneath us. DDEV had to [require Docker Buildx](docker-buildx-requirement-v1-25-1.md) in v1.25.1, and now supports [Podman and rootless Docker](podman-and-docker-rootless.md) as well.
- Back in 2024 [MariaDB changed their `mysqldump` output file format](mariadb-dump-breaking-change.md), causing a few of you to pull your hair out, until DDEV incorporated informal and then fully-integrated workarounds, so there are some of you that don't even know this happened.

I'm just naming a tiny few of the things DDEV has had to react to.

**What is our current financial situation?** Recurring sponsorship is currently about $9,900/month against a goal of $12,000/month, which covers both maintainers. The bulk of our expenses is maintainer time. Financial reports are provided with every meeting of the [DDEV Advisory Group](https://github.com/orgs/ddev/discussions/categories/ddev-advisory-group), and since late 2025 the Foundation also has a board.

**What do we want to do? Increase income by about $2,000/month.** That's the difference between a full-time maintainer role the Foundation can commit to for the long haul and one that is renegotiated against the budget every year. This could be $1,000/month from two organizations (joining fabulous supporting agency [Tag1 Consulting](https://tag1consulting.com)), $500/month from four organizations, joining [i-gelb](https://i-gelb.net/). Or $100/month from 20 organizations, joining [so many individual and corporate sponsors](https://ddev.com/#supporters) who keep DDEV going.

**How can you or your organization support DDEV?** For agencies, hosting folks, other organizations, we're happy to bill you monthly or annually, just ask! It's easy. For individuals, the easiest way is to [become a sponsor](/sponsor). Organizations sponsoring at $100/month or more now get [partner perks](/sponsor) as well.

**Is your organization budgeting for 2027?** Please remember DDEV!

**Get in touch!** I'd be happy to talk to you or your organization. Send [an email](mailto:randy.fay%40ddev.com). Make an [appointment for a video call](https://cal.com/randyfay/30min).

We're delighted to collaborate with this amazing community on a sustainable and reliable DDEV, and we need your help! Thanks for all your contributions and for joining us in this journey!

**Have you [signed up for the monthly DDEV newsletter](/newsletter)?**
