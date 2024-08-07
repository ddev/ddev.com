---
title: "Expanding the DDEV maintainer team - how we'll fund it"
pubDate: 2023-09-28
modifiedDate: 2024-07-31
summary: Why is DDEV adding a new full-time maintainer, and how do the finances work?
author: Randy Fay
featureImage:
  src: /img/blog/2023/08/contributors-working.png
  alt: Contributors working together on DDEV
categories:
  - Community
---

## Why does DDEV want to hire another full-time maintainer?

A few months ago we published [Recruiting Maintainers](recruiting-maintainers.md). But why are we wanting another full-time maintainer?

### What Do Maintainers Do?

But first, what do maintainers do? Why are they so busy? Why is it important to the DDEV community? There’s a more formal description of a maintainer’s job in [Recruiting Maintainers](recruiting-maintainers.md), but the shorter answer:

**Everything is always changing**! You live there. You know that everything is constantly in flux today’s software world. In this past week, Node.js changed its installation technique and injected a 60-second wait (and deprecation notice) on the old one. And Magento 2 obsoleted support for Elasticsearch in many configurations. And the upstream support for putting artifacts links on PRs broke (again). This is all normal. But this kind of constant rot means that if DDEV were left unmaintained for 4-6 months you wouldn’t like it any more. We wouldn’t want that!

**You always want more**! It’s a busy world, and DDEV’s many features are always inspiring people to ask for more features. We love to delegate these to multiple maintainers as the DDEV [Add-on system](https://ddev.readthedocs.io/en/stable/users/extend/additional-services/) has done, but there are many, many cases where a wonderful feature request means changes to DDEV core.

**Quality means careful review and incubation**: You love the quality and reliability of DDEV, but that comes from maintainers and contributors carefully watching what goes in, coaching contributors, and making sure that what goes in only makes the project better. With few exceptions, every PR is carefully tested manually and is covered by automated tests as well.

**Test infrastructure has to be maintained**: You know from your own work that test infrastructure and the tests themselves require extensive maintenance. DDEV runs tests on all supported operating systems and architectures and Docker providers. That’s a *lot* of tests, meaning hours of tests for every push, and of course there are flaky tests to improve and Windows machines to reboot when they fail.

**Onboarding and Support**: This is a wide-open Free and Open Source project. We want every contributor to have a great experience, and we want everybody to be free to contribute. But this means mentoring, and [contributor training](contributor-training.md). And support. Support all the time. It’s amazing how many people do not need support, but there is lots to be done every day in the [issue queue](https://github.com/ddev/ddev/issues), [Discord](https://discord.gg/5wjP76mBJD), Slack, and [Stack Overflow](https://stackoverflow.com/tags/ddev). It’s mostly maintainers that do this support, but it’s a great community and everybody is encouraged to help.

**Documentation**: You know how docs are always needing more help and they’re affected by all the factors above.

### Why Do We Want More Full-time Paid Maintainers?

**More Maintainers Means Better Support and Resilience**: Better support, faster responses, ability to add features. These are all things you want and we want.

**Randy is not forever**: Although I love DDEV and its community we are all finite, so the time will come that I either temporarily or permanently can’t carry on. That means we need a strong maintainer presence besides me.  (In fact in the short term I plan to be bike touring in Patagonia in December 2023 and January 2024 with limited access to the internet.)

**The community and its needs are growing**: More CMSs have adopted DDEV as their go-to local development environment (Silverstripe this year, Craft CMS last year, etc.). That means we have new and different users with new and different needs. What fun! So great! But this will eventually strain our current abilities to support.

### What is DDEV’s Current Funding Situation and What are the Goals?

**Current Funding**:

- **[Platform.sh](http://Platform.sh)** pays Randy’s salary and provides benefits to him as an employee. That is an amazing benefit for this community and goes a long way! THANK YOU!
- **Major sponsors [Tag1](https://tag1.com/), and [i-gelb](https://i-gelb.net/)** together account for USD$1500/month in funding. THANK YOU!
- **Many other agencies and individuals** via GitHub Sponsors account for about USD$1500. THANK YOU!

**Funding Goal**: Our goal is salary for a full-time paid maintainer, estimated at about USD$7,000/month or USD$84,000/year. Thanks you we’re already about 50% of the way there!

### What is the Current Maintainership Situation?

Currently **[Randy Fay](https://github.com/rfay), [Simon Gilli](https://github.com/gilbertsoft) and [Stas Zhuk](https://github.com/stasadev)** have maintainer privileges. Simon has made enormous contributions over the years and knows how to handle most maintainer roles. He has been periodically paid by the DDEV Foundation for his work, but his available time is sometimes spotty. Stas is new to the role after many, many important contributions and thanks to your contributions he is already being paid for part-time work.

### What is the DDEV Foundation?

**The [DDEV Foundation](/foundation)** is the “fiscal entity” that is used for DDEV funding and is used to pay contributors. It is a certified [US 501(c)(3) nonprofit](501c3.md). The DDEV Foundation owns the bank account.

No funding to the DDEV Foundation goes to Randy.

### How can Your Agency, Hosting Company, or you as an Individual Help?

- **We can invoice you for support contracts or donations**. We can accept funds in several different ways, and generous agencies in both the US and Europe have already successfully done this. Join those incredible major supporters!
- **Smaller amounts** from individuals or agencies are easier to handle via [GitHub Sponsors](https://github.com/sponsors/ddev).
- **Your contributions in all other ways are so welcome**! Financial is a topic for this blog, but the bottom line is that we’re a community working together by helping each other. Thank you!

**Do you want to talk more? Drop by [Discord](https://discord.gg/5wjP76mBJD) or send [an email](mailto:support%40ddev.com)**

**Have you [signed up for the monthly DDEV newsletter](/newsletter)?**
