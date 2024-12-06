---
title: "DDEV November 2024 Newsletter"
pubDate: 2024-11-01
#modifiedDate: 2024-09-06
summary: DDEV November 2024 Newsletter
author: Randy Fay
featureImage:
  src: /img/blog/2024/11/palisade-november-bookcliffs.jpg
  alt: Palisade, Colorado, USA, November 1, 2024
categories:
  - Community
---

**Happy November from DDEV**! It's a beautiful fall here, but things are cooling down. We live in an agricultural area, so the first freeze is always an event.

**It's Maintainer [Stas Zhuk](https://github.com/stasadev)'s first anniversary as a full DDEV maintainer!**. I asked him to share what he's most proud of this year. I know how amazingly grateful I am to work alongside him and to such an amazingly capable co-maintainer who has full privileges on all things DDEV.

> It's been a great year working as an official DDEV maintainer.

> One thing I'm proud of is improving the `ddev composer create` command to work just like `composer create-project`. Even though I've done a lot with Composer as PHP developer, I still learned new things while working on this.

> I'm also proud of adding support for `.ddev/.env.*` files in add-ons. It seemed simple at first, but it was connected to so many other parts of the code. It took a few months and many changes to get it right.

> Another feature I worked on is `ddev config --nodejs-version auto`. This helped me better understand how `ddev start` really works. There's so much going on behind the scenes, more than just a `docker-compose up`.

> When I started using DDEV, I already knew a bit about Docker, but I've learned a lot more by working on DDEV's Docker networks. I've made a lot of PRs to improve this.

> I also had my first experience with Docker multi-stage builds in DDEV. We use it to compile Xdebug for some PHP versions, and it was fun to learn.

> The `ddev launch :port` feature has been really useful. It's hard to imagine that DDEV didn't have it before.

> I recently added automatic timezone detection in the web container. It seems like a small thing, but it has a big impact on simplicity and is very convenient for developers.

> Finally, the upcoming `ddev cd` feature is something I’m excited about. I used to have a custom Bash script for this, but now it will be built into DDEV, with autocomplete.

**Advisory Group Meeting Wednesday**: All are invited to the DDEV Advisory Group meeting Wednesday, November 6, 9am US MT, 5PM CET. [Meetup link](https://www.meetup.com/ddev-events/events/303197392/?eventOrigin=group_events_list) or [Zoom link](https://us02web.zoom.us/j/7315692237?pwd=RHR6NUkwb0g5WXIzS2NOcXRucCthZz09&omn=89153105842), passcode "12345" if you need it.

**Contributor Trainings From October (Recordings and Blogs):**

- **[Supporting people using `ddev debug test` and other tools](ddev-debug-test-contributor-training.md)**
- **[Using Tmate to Debug GitHub Workflows](tmate-github-actions-contributor-training.md)**

**DDEV Notes from around the web:**

- **[DDEV Release v1.23.5 Announcement](release-v1.23.5-auto-port-assignment.md).** Lots of goodies in this latest release, including automatic port assignment and automatic time zone detection.
- **[Mauricio Dinarte's (@dinarcon) DrupalCon presentation on DDEV](https://www.youtube.com/watch?v=nPJC7BbiGNw&list=PLpeDXSh4nHjQOfQV-BUgoxHXlr4tHlhPO&index=16&pp=iAQB)**
- **[Open source maintainers underpaid, swamped by security, going gray](https://www.theregister.com/2024/09/18/open_source_maintainers_underpaid/)** We all need to be working on this class of problem!
- **[Sponsor MacStadium's Open-Source Spotlight on DDEV](https://www.macstadium.com/blog/mac-open-source-hosting-spotlight-ddev)**
- **[Vite in Practice (TYPO3)](https://docs.typo3.org/p/praetorius/vite-asset-collector/main/en-us/)**
- **[Working with Vite in DDEV](https://ddev.com/blog/working-with-vite-in-ddev/)** continues to be updated and maintained by the fabulous [Matthias Andrasch](https://dev.to/mandrasch).

**Upcoming Major Release v1.24.0** will change the defaults for new projects. PHP will be 8.3, Node.js will be v22. There will be a few new features, but I don't think any other major changes in behavior.

**Fully funding Maintainer Stas**: _We need your help and your organization's help! Let me know if you need help getting this into your 2025 budget!_ Our key financial goal is to [fully fund @stasadev so he can work exclusively on DDEV](lets-fund-stas-maintainer.md). We’re about 30% of the way to that goal, but apparently due to market conditions, have been going backward in recent months. We need about $3700/month in increased pledges from organizations and individuals. See [Full information about supporting DDEV](https://github.com/sponsors/ddev). We’re happy to invoice you, happy to [do a call discussing this](https://cal.com/randyfay/30min), and would love it if you’d include DDEV in your 2025 budgeting process. (Our current status: We receive about $4000-$5000/month, spend about $6000/month. Bank balance is about $9,000, down from $13,000 last month.)

**THANKS to all of you who are supporting DDEV’s path to sustainability** and who have gotten your organizations to do so.

Want to keep up as the month goes along? Follow our [blog](https://ddev.com/blog/), [LinkedIn](https://www.linkedin.com/company/ddev-foundation), [Mastodon](https://fosstodon.org/@ddev), and join us on [Discord](https://discord.gg/5wjP76mBJD).

Happy November from Randy Fay, DDEV Project Lead.
