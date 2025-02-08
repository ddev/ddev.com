---
title: "DDEV 2025 Plans"
pubDate: 2025-02-06
#modifiedDate: 2025-02-06
summary: DDEV 2025 Plans
author: Randy Fay
featureImage:
  src: /img/blog/2025/02/ddev-2025-plans.png
  alt: Futuristic view of DDEV 2025 plans
  credit: "Ideogram.ai: DDEV 2025 Plans: A futuristic cityscape with towering skyscrapers, some of which have unique and innovative designs"
categories:
  - Community
---

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
9. [Rewrite `ddev launch` in Golang instead of as script](https://github.com/ddev/ddev/issues/6394).
10. [Rework configuration system using Viper](https://github.com/ddev/ddev/issues/5763).

In addition to prioritizing these initiatives, we have applied to the [Google Summer of Code](https://summerofcode.withgoogle.com/), hoping that we can mentor contributors in that program and see work on one or more of these be successful through GSoC. We'll also be looking for community mentors (is that you?), and maybe some of you would like to sign up for being mentees via Google this summer!

Do you see other important things in the [issue queue](https://github.com/ddev/ddev/issues) or elsewhere that are important to you? Are there frictions that impact your work that DDEV could fix? Please let us know.

We would dearly love to have your input on these as the planning process goes forward. You can respond so very many ways in all of the [support venues](https://ddev.readthedocs.io/en/stable/users/support/).

Want to keep up as the month goes along? Follow us on

- [blog](https://ddev.com/blog/)
- [LinkedIn](https://www.linkedin.com/company/ddev-foundation)
- [Mastodon](https://fosstodon.org/@ddev)
- [Bluesky](https://bsky.app/profile/ddev.bsky.social)
- and join our community on [Discord](/s/discord)
