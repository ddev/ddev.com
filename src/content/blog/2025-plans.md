---
title: "DDEV 2025 Plans and 2024 Review"
pubDate: 2025-02-08
modifiedDate: 2025-03-03
summary: DDEV 2025 Plans and 2024 Review
author: Randy Fay
featureImage:
  src: /img/blog/2025/02/ddev-2025-plans.png
  alt: Futuristic view of DDEV 2025 plans
  credit: "Ideogram.ai: DDEV 2025 Plans: A futuristic cityscape with towering skyscrapers, some of which have unique and innovative designs"
categories:
  - Community
---

# 2025 Plans and Notes

Every year we try to clarify goals early, and here we go for 2025! We'd love to have your thoughts and opinions! Some of the things we [planned in 2024](2024-plans.md) aren't quite done yet, but we're working and planning and responding to your needs.

At the DDEV Advisory Group's 2-hour [annual review/planning meeting on March 4, 2025](https://www.meetup.com/ddev-events/events/303197425/?eventOrigin=group_events_list), we'll talk about plans and priorities for 2025. You are invited!

We'd love to have your input as daily users as we work through these this month.

(I expect to edit this blog post several times as people express their opinions.)

## Community

- **Continue outstanding user support** even with growth of our user base. This remains a key priority from last year, but we still need to involve the entire community (meaning you!) in all the places.
- **Begin formal governance for the DDEV Foundation**. We've been talking about this in the Advisory Group for years, but this year I'll propose a 3-person board for the DDEV Foundation, where I retain operational control, but we have at least one other board member fully enabled on financial controls and payments. Future years can bring future refinements.

## Sustainability and Finance

- **Improve our Marketing CTA and information**: The [ddev.com "Support DDEV"](https://ddev.com/support-ddev/) page says lots of things, but the financial CTA gets lost there. We need to make it completely clear that for the project to be sustainable, the community will need to support the two developers who are working full-time on it, and make clear the many ways that this can be done.
- **Continue to develop contributors and maintainers**: As the project grows, we need more skilled contributors and maintainers. (The only difference between those is that maintainers typically have a higher level of direct access to project resources, but as a wide-open source project, almost all interested contributors can accomplish almost anything without enhanced privileges.) In the last two years, we've had [quite a lot of contributor trainings](/blog/category/training), and anecdotes indicate that people are using those recordings and blogs for training, but the actual attendance at them was not impressive. I'm thinking that this year these topics should probably be addressed with screenshare recordings and updated blogs instead of calendar-scheduled events. Given the financial struggles in our contributors' world, I doubt that we'll be able to add paid maintainers in 2025, I'm most interested right now in the reasonable goal of retaining and paying the two amazing maintainers we currently have.

## Features and Initiatives

### Funded and Work-In-Progress Initiatives

- The TYPO3 Association has agreed to fund the [integration of XHGui into DDEV](https://typo3.org/article/four-ideas-to-be-funded-in-quarter-1-2025) as part of their Community Budget Ideas. Part of this work has already been done in the [ddev/ddev-xhgui](https://github.com/ddev/ddev-xhgui) project, and it must be completed by March 31, 2025.
- [Top-level Node.js support](https://ddev.readthedocs.io/en/latest/users/extend/customization-extendibility/#using-nodejs-as-ddevs-primary-web-server) as planned in 2024 has been committed to HEAD. There will be a number of follow-up opportunities, including Caddy support, etc.
- [Web-based Add-on Registry](https://github.com/ddev/ddev/issues/6383) is a work-in-progress and is expected to land soon.

<a name="proposed-features"></a>

### Proposed Features and Initiatives

1. [Implement mDNS as an alternate name resolution technique](https://github.com/ddev/ddev/issues/6663) in addition to DNS and hosts file manipulation. Our traditional use of DNS and hosts-file manipulation have been successful, but mDNS might allow avoiding hosts-file manipulation, especially with non-ddev.site URLs and when internet DNS is not available. This has been submitted for funding to the TYPO3 Community [Q2 Community Budget Ideas](https://typo3.org/article/call-for-community-budget-ideas-q2-2025)
2. [Allow Add-ons to include other add-ons](https://github.com/ddev/ddev/issues/6912): Add-ons can already require other add-ons, but they should be able to automatically result in a download.
3. [Go-based Upsun Add-on like ddev-platformsh](https://github.com/ddev/ddev/issues/6533). (This would pioneer golang-based add-ons; Go is probably a much better language for complicated add-ons of this type.)
4. Rewrite ddev-platformsh Add-on in Go: Assuming success of the Upsun add-on, it would be great to backport that work to [ddev-platformsh](https://github.com/ddev/ddev-platformsh). It's even possible that the two add-ons could be combined into one and maintained in one place.
5. Develop a replacement for "Gitpod Classic", which has EOL in April, 2025. This may not need much more than improved GitHub Codespaces support, but we have loved Gitpod and hope to have something to replace it.
6. [Improve self-diagnose capability](https://github.com/ddev/ddev/issues/6461) . We currently have ddev debug test but it would be great to implement something that was readable and actionable for ordinary mortals.
7. [DDEV's Message-of-the-day and ddev.com should show current funding status and need](https://github.com/ddev/ddev/issues/6892). We now have an automatically updated JSON feed that can make this possible.
8. DDEV Windows/WSL2 packaging and installation: The traditional Windows installer needs work, and the WSL2 install scripts are written in hard-to-maintain PowerShell. This work can be consolidated and improved, including [improving the Windows hosts-file escalation technique](https://github.com/ddev/ddev/issues/6440).
9. [Change `ddev share` to a more configurable custom-command-based option](https://github.com/ddev/ddev/issues/6441). Instead of always using `ngrok` there should be multiple ways to share.
10. [Rework configuration system using Viper](https://github.com/ddev/ddev/issues/5763).

In addition to prioritizing these initiatives, we applied to the [Google Summer of Code](https://summerofcode.withgoogle.com/), hoping to mentor contributors in that program. (Update: We did not get accepted, but will try next year.)

Do you see other important things in the [issue queue](https://github.com/ddev/ddev/issues) or elsewhere that are important to you? Are there frictions that impact your work that DDEV could fix? Please let us know.

We would dearly love to have your input on these as the planning process goes forward. You can respond so very many ways in all the [support venues](https://ddev.readthedocs.io/en/stable/users/support/).

## 2025 Planning Additional Notes

### Recognized Risks

We are a very small organization, so we try to pay careful attention to the risks as we go forward.

- Key maintainer Stas lives in a very volatile situation in Ukraine, and none of us knows how to predict the future. There are physical risks, communication risks, and financial transfer risks always possible.
- Randy is not young and can always face new risks.
- The financial outlook for discretionary funding from agencies and hosting companies is horrible right now.
- Any of our maintainers can become overworked or discouraged or burnout. We take these risks and their prevention very seriously.

### Minor Notes

- I (Randy) do expect to work less in 2025, but that hasn't worked out so far. However, I am planning a bicycle trip that will make me mostly out of touch from late May through much of June.
- Updated blogs about key DDEV ideas are needed. For example, an updated blog about how DDEV is different from roll-your-own or bare metal, especially multiple database and php versions, and team share. 
- More screenshare blogs for ordinary DDEV users are important. We have many out there, but some are seriously aged.

## 2024 DDEV Review

This section is updated for our annual review of the past year at the [DDEV Advisory Group](https://github.com/orgs/ddev/discussions/7031).

### Great Things

- Stas Zhuk as a maintainer has been a massive success in so many ways. Not only is he completely technically fluent with DDEV in every area, but he loves supporting DDEV users, and we've even been progressively successful in making sure he has adequate control of most areas of external accounts, etc.
- Outstanding contributors like tyler36, GuySartorelli, Hanoii, Bernardo Martinez, and Ralf Koller continued to improve the project.
- We worked hard at [Live Contributor Training](/blog/category/training/), and recorded blogs and training sessions, which is great. It's not clear how successful these were in enabling new contributors, but occasional reports say that the recorded sessions have been helpful.

### Less Great Things

- We didn't really make progress with marketing or promotion in 2024. In fact, hosting companies and agencies with a clear stake in DDEV's success did not step up and even started ghosting discussions about this. This is likely a result of market conditions, but it's uncomfortable for us.
- We tried to improve our marketing situation by engaging Open Strategy Partners, but didn't achieve all we had hoped, and had to end the arrangement earlier than planned because our funding was inadequate to continue it.
- [Platform.sh changed their funding](platform-sh-ddev-funding-changes.md). While their ongoing commitment remains generous, this was certainly a challenge.


Want to keep up as the month goes along? Follow us on

- [blog](https://ddev.com/blog/)
- [LinkedIn](https://www.linkedin.com/company/ddev-foundation)
- [Mastodon](https://fosstodon.org/@ddev)
- [Bluesky](https://bsky.app/profile/ddev.bsky.social)
- and join our community on [Discord](/s/discord)
