---
title: "Expanding the DDEV maintainer team - how we'll fund it"
pubDate: 2023-09-28
modifiedDate: 2026-07-25
modifiedComment: "Removed the 2023 funding figures and maintainership roster, which are long out of date, and pointed to the sponsor page and current funding post instead"
summary: What do DDEV maintainers actually do, and why does the project need more than one paid full-time?
author: Randy Fay
featureImage:
  src: /img/blog/2023/08/contributors-working.png
  alt: Contributors working together on DDEV
categories:
  - Community
---

**Update (2026-07-25)**: The case for paid maintainers below still holds, and DDEV now has two working full-time. The specific 2023 dollar figures and maintainer roster that used to appear here were badly out of date, so they've been removed — see the [sponsor page](/sponsor) for the live funding total and [Let's Fully Fund Maintainer Stas](lets-fund-stas-maintainer.md) for where things stand today.

---

## Why does DDEV want to hire another full-time maintainer?

A few months ago we published [Recruiting Maintainers](recruiting-maintainers.md). But why are we wanting another full-time maintainer?

### What Do Maintainers Do?

But first, what do maintainers do? Why are they so busy? Why is it important to the DDEV community? There’s a more formal description of a maintainer’s job in [Recruiting Maintainers](recruiting-maintainers.md), but the shorter answer:

**Everything is always changing**! You live there. You know that everything is constantly in flux today’s software world. In this past week, Node.js changed its installation technique and injected a 60-second wait (and deprecation notice) on the old one. And Magento 2 obsoleted support for Elasticsearch in many configurations. And the upstream support for putting artifacts links on PRs broke (again). This is all normal. But this kind of constant rot means that if DDEV were left unmaintained for 4-6 months you wouldn’t like it any more. We wouldn’t want that!

**You always want more**! It’s a busy world, and DDEV’s many features are always inspiring people to ask for more features. We love to delegate these to multiple maintainers as the DDEV [Add-on system](https://docs.ddev.com/en/stable/users/extend/additional-services/) has done, but there are many, many cases where a wonderful feature request means changes to DDEV core.

**Quality means careful review and incubation**: You love the quality and reliability of DDEV, but that comes from maintainers and contributors carefully watching what goes in, coaching contributors, and making sure that what goes in only makes the project better. With few exceptions, every PR is carefully tested manually and is covered by automated tests as well.

**Test infrastructure has to be maintained**: You know from your own work that test infrastructure and the tests themselves require extensive maintenance. DDEV runs tests on all supported operating systems and architectures and Docker providers. That’s a _lot_ of tests, meaning hours of tests for every push, and of course there are flaky tests to improve and Windows machines to reboot when they fail.

**Onboarding and Support**: This is a wide-open Free and Open Source project. We want every contributor to have a great experience, and we want everybody to be free to contribute. But this means mentoring, and [contributor training](contributor-training.md). And support. Support all the time. It’s amazing how many people do not need support, but there is lots to be done every day in the [issue queue](https://github.com/ddev/ddev/issues), [Discord](/s/discord), Slack, and [Stack Overflow](https://stackoverflow.com/tags/ddev). It’s mostly maintainers that do this support, but it’s a great community and everybody is encouraged to help.

**Documentation**: You know how docs are always needing more help and they’re affected by all the factors above.

### Why Do We Want More Full-time Paid Maintainers?

**More Maintainers Means Better Support and Resilience**: Better support, faster responses, ability to add features. These are all things you want and we want.

**Randy is not forever**: Although I love DDEV and its community we are all finite, so the time will come that I either temporarily or permanently can’t carry on. That means we need a strong maintainer presence besides me. (In fact in the short term I plan to be bike touring in Patagonia in December 2023 and January 2024 with limited access to the internet.)

**The community and its needs are growing**: More CMSs have adopted DDEV as their go-to local development environment (Silverstripe this year, Craft CMS last year, etc.). That means we have new and different users with new and different needs. What fun! So great! But this will eventually strain our current abilities to support.

### What is DDEV’s Funding Situation and What are the Goals?

The goal is enough recurring sponsorship to pay maintainers for the work described above, rather than fitting it around client work. Because the numbers move every month, they live on the [sponsor page](/sponsor), which shows the current recurring total against the Foundation’s goal. For the story of how the funding has evolved — including [Platform.sh becoming lead sponsor](platform-sh-becomes-a-lead-sponsor-of-ddev.md), the [2025 change in that arrangement](platform-sh-ddev-funding-changes.md), and the [ongoing push to fully fund maintainer Stas Zhuk](lets-fund-stas-maintainer.md) — follow those posts.

### What is the DDEV Foundation?

**The [DDEV Foundation](/foundation)** is the “fiscal entity” that is used for DDEV funding and is used to pay contributors. It is a certified [US 501(c)(3) nonprofit](501c3.md). The DDEV Foundation owns the bank account.

(When this was written in 2023, no Foundation funding went to Randy, since Platform.sh employed him directly. That [changed in 2025](platform-sh-ddev-funding-changes.md), and the Foundation now budgets for both maintainers.)

### How can Your Agency, Hosting Company, or you as an Individual Help?

- **We can invoice you for support contracts or donations**. We can accept funds in several different ways, and generous agencies in both the US and Europe have already successfully done this. Join those incredible major supporters!
- **Smaller amounts** from individuals or agencies are easier to handle via [sponsorship](/sponsor).
- **Your contributions in all other ways are so welcome**! Financial is a topic for this blog, but the bottom line is that we’re a community working together by helping each other. Thank you!

**Do you want to talk more? Drop by [Discord](/s/discord) or send [an email](mailto:support%40ddev.com)**

**Have you [signed up for the monthly DDEV newsletter](/newsletter)?**
