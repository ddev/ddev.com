---
title: "DDEV October 2024 Newsletter"
pubDate: 2024-10-01
#modifiedDate: 2024-09-06
summary: DDEV October 2024 Newsletter
author: Randy Fay
#featureImage:
#  src: /img/blog/2024/09/ddev-blog.png
#  alt: DDEV running in the GitLab Pipeline
#  credit: "[Milad Fakurian](https://unsplash.com/de/@fakurian) (Background)"
categories:
  - Community
---


**Happy October from DDEV**! I just got back from DrupalCon Barcelona and things are finally starting to cool down here in Palisade, Colorado, USA.

**Podcast**! [Chad Carlson](https://www.linkedin.com/in/chadwcarlson/) of [DDEV Lead Sponsor](https://ddev.com/blog/platform-sh-becomes-a-lead-sponsor-of-ddev/) [Platform.sh](https://Platform.sh) had me on the Change Mode podcast and we had loads of fun. Learn more about the history of DDEV (and my TRS-80 Model 1 Level 2) on the [Change Mode Podcast](https://www.podcastics.com/podcast/episode/chmod-106-code-community-and-ddev-randy-fays-journey-311577/).

**DrupalCon Barcelona**: I got to see lots of friends old and new in Barcelona. Four training session BoFs, a full-day contribution mentoring session, and loads of fun. **[Read about it on ddev.com](https://ddev.com/blog/drupalcon-barcelona-2024).**

**Join us for Contributor Training**
* October 9: **[Supporting users using `ddev debug test` and other tools](https://www.meetup.com/ddev-events/events/303503564)**
* October 23: **[Using Tmate to Debug GitHub Workflows**](https://www.meetup.com/ddev-events/events/303503674)**

**GitHub Codespaces is working well with DDEV**: We used to add a lot of caveats about Codespaces, but it was fixed with new workaround and the [DDEV docs](https://ddev.readthedocs.io/en/latest/users/install/ddev-installation/#ddev-installation-codespaces) say how to do it. Give it a try!

**DDEV Notes from around the web:**

- **[Using DDEV in GitLab CI Tests](https://ddev.com/blog/ddev-in-gitlab-ci)** - Jochen Roth sorted out the difficulty and made this available to all. (Note that lots of people use DDEV for automated tests of their websites in GitHub Workflows using the [github-action-setup-ddev action](https://github.com/ddev/github-action-setup-ddev).)
- **[Install Prestashop in DDEV](https://misterdigital.es/instalar-prestashop-en-ddev/)** (in Spanish, but Google Translate makes it very accessible)
- **[CraftCMS Launchpad](https://craftcms-launchpad.mandrasch.eu/)** by prolific contributor [@mandrasch](https://mandrasch.dev/). Interactive CraftCMS demos in your browser, powered by DDEV.
- **[DDEV Vite Sidecar add-on](https://github.com/s2b/ddev-vite-sidecar)** by @s2b. A fresh approach to Vite with DDEV. (See also the authoritative and maintained summary of Vite approaches on [ddev.com](https://ddev.com/blog/working-with-vite-in-ddev/).)
- **[WSL2 with DDEV And Drupal](https://www.drupal.org/docs/develop/local-server-setup/windows-development-environment/installing-drupal-with-ddev-in-wsl2-on-windows)** on drupal.org: This outstanding and detailed explanation is a gift to anybody using WSL2 and Drupal.
- **[How We Contributed a Quality of Life Improvement to DDEV](https://www.velir.com/ideas/2024/09/17/how-we-contributed-a-quality-of-life-improvement-to-ddev)** by [Kevin Quillen](https://kevinquillen.com/). An inspiration for anybody who wants to scratch an itch on DDEV!

**DDEV on Windows ARM64** (the [Qualcomm Snapdragon Windows Copilot](https://www.qualcomm.com/news/onq/2024/06/what-on-earth-is-a-copilot-plus-pc) machines you’ve been hearing about.) I bought a Microsoft Surface Laptop on my own dime to see how it would do with DDEV, and it’s great on WSL2, not ready for traditional Windows. The [preferred install technique](https://ddev.readthedocs.io/en/stable/users/install/ddev-installation/#windows) (docker-ce inside WSL2) works fine except that it stumbles installing `ddev.exe` on the Windows side. I hope to spend some time on the open [Windows ARM64 issue](https://github.com/ddev/ddev/issues/6344) before I need to decide whether to send it back or not. Overall, it’s a delightful machine and does great with DDEV.

**Add-On Registry funding**: We applied to the TYPO3 community’s grant process to fund the initiative to [add a web-based DDEV Add-on Registry](https://github.com/ddev/ddev/issues/6383). Thanks to those of you who voted! We came in 5th and the top 4 projects were funded. This remains a priority though, and we’d love to have your participation and your organization’s participation.

**Fully funding Maintainer Stas**: Our key financial goal is to [fully fund @stasadev so he can work exclusively on DDEV](https://ddev.com/blog/lets-fund-stas-maintainer/). We’re about 35% of the way to that goal, but have not been making progress on that in recent months. We need about $3000/month in increased pledges from organizations and individuals. See [Full information about supporting DDEV](https://github.com/sponsors/ddev). We’re happy to invoice you, happy to [do a call discussing this](https://cal.com/randyfay/30min), and would love it if you’d include DDEV in your 2025 budgeting process. (Our current status: We receive about $4000-$5000/month, spend about $6000/month. Bank balance is about $13,000, down from $15,000 last month.)

**THANKS to all of you who are supporting DDEV’s path to sustainability** and who have gotten your organizations to do so.

Want to keep up as the month goes along? Follow our [blog](https://ddev.com/blog/), [LinkedIn](https://www.linkedin.com/company/ddev-foundation), [Mastodon](https://fosstodon.org/@ddev), [X,](https://x.com/randyfay) and join us on [Discord](https://discord.gg/5wjP76mBJD). And of course email us any time, you can reply to this email. If you didn’t get this newsletter in your own inbox, you can. Sign up at https://ddev.com/newsletter.