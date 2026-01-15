---
title: "Planning for another great DDEV year in 2026"
pubDate: 2026-01-16
#modifiedDate: 2025-03-04
summary: DDEV 2026 Plans
author: Randy Fay
featureImage:
  src: /img/blog/2026/01/ddev-2026.png
  alt: DDEV 2026 Plans
categories:
  - Community
---

# 2026 Plans and Notes

Every year we try to lay out a bit of a plan for the coming year.

One of DDEV's primary strengths is our connection to a wonderful community, so each year turns out a bit different than expected. As we listen to people's actual experience, we try to adjust. And of course as upstream changes bring new features and bugs, we get lots of fun things to work on that we could never have anticipated. The items listed here are notes about what we think we understand at this point, but the year ahead and user experience and requests will affect what really happens.

We look forward to your input as the year goes forward.

## Community

**Community is core to our strength and growth**. We are committed to maintaining the outstanding support that we offer for free and keeping that communication line open. And we want to continue to grow the amazing corps of contributors who offer improvements to the DDEV ecosystem.

## Board of Directors

In 2025 we established [Board of Directors](board-of-directors-established.md), but now we have to learn what that means. The Board will have to establish itself, begin helping to determine priorities, and find its way to a strong oversight role. Here are a few issues to toss to the board early:

- Governance strategy and technique. Meetings? Voting?
- Overall Marketing/Fundraising strategy, including Fundraising drive
- Consider spending more on AI (Higher level of Claude Code plans)
- Discuss and create AI strategy, including policy, guidelines, tools, etc.
- How many conferences to attend (and what conferences) and spending priorities
- Should we move toward a Freemium model with "premium" features? What infrastructure and code would be required?

## Features and Initiatives

- Consider a general AI strategy for DDEV users. How can we support the community in its use of AI for web development? Many platforms ([like Laravel](https://github.com/ddev/ddev/issues/7556)) have explicit MCPs; people want to know how to use them with DDEV.
- Update macOS install blog + Xdebug usage blog (carried forward from 2025)
- AI Sandboxing as key DDEV feature (from [issue](https://github.com/orgs/ddev/discussions/7923))
- Consider MCP (for projects) as key DDEV feature
- Consider MCP for DDEV ([experimental PR](https://github.com/ddev/ddev/pull/7604))
- Integration of mkcert CA without use of external `mkcert` tool
- Start a project without `ddev config`, Consider offering `ddev config --auto` or `ddev config` when `ddev start` in a directory without config ([issue](https://github.com/ddev/ddev/issues/7976))
- Explore using real certificates instead of mkcert CA
- Subdomains for extra ports/services instead of separate ports. (Prereq for some web-based setups like coder). See the [blog](ddev-expose-node-app-on-subdomain.md) on this approach.
- Coder support for subdomains. Could codespaces use some proxy/redirect technique to route subdomains to main item, but have a header that determined how traefik would route it?
- Use a DDEV proxy on the host to allow commands like ddev list and ddev describe and ddev launch to work from inside the web container.
- Explore moving Mutagen completely into container (syncing between volume and bind-mount)
- Improved management of `.ddev/.env*` files, marking DDEV-owned lines, etc.
- More work on web-based setups like Coder and Codespaces and Dev Containers in general.
- Explore environment adjustments that might let users work "inside the web container" as if they were on a real host (use `composer` instead of `ddev composer`, etc). People can already do this with `ddev ssh`, but that isn't directly compatible with VS Code or PhpStorm.
- Serialize concurrent runs of `ddev start` and similar commands.
- Move the DDEV IntelliJ/PhpStorm plugin to the DDEV organization.

## Procedures

- Randy and Stas have always done timekeeping and timesheet reporting, but will improve their reporting a bit with categories/projects in 2026. [discussion](https://github.com/orgs/ddev/discussions/7923#discussioncomment-15172639).
- Explore additional benefits of being open source and 501(c)(3) nonprofit. We have a number of benefits already, including GitHub nonprofit status, etc. But we can probably get additional benefits from AWS, etc. (JetBrains and Docker also provide us open source benefits.)

## 2026 Planning Additional Notes

### Recognized Risks

We are a very small organization, so we try to pay careful attention to the risks as we go forward. In many ways, these are the same as the 2025 noted risks.

- Key maintainer Stas lives in a very volatile situation in Ukraine, and none of us knows how to predict the future. Physical risks, communication risks, and financial transfer risks are always possible.
- Randy is not young and can always face new risks.
- The financial outlook for discretionary funding from agencies and hosting companies (and perhaps individuals) remains horrible.
- Any of our maintainers can become overworked or discouraged or can burn out. We take the risk of burnout and overwork very seriously and are careful to talk about them and try to prevent them.
- Mutagen maintenance and future: Mutagen is a critical part of DDEV, and it's in maintenance-only mode since Jacob went to work for Docker. It's outstanding in quality, so should last, and Jacob has been responsive when there are problems. Its future is not clear.
- Scope expansion could be unsustainable. We support so many different environments, and our testing is so enormous. Without the current expertise, we couldn't maintain the existing scope.

### Minor Notes

## Past Plans and Reviews

Previous plans and reviews have obviously framed this year's plans: [2025 Plans and 2024 review](2025-plans.md), [2024 plans](2024-plans.md)

In preparing for this, we have been discussing these things in [regular advisory group meetings](https://github.com/orgs/ddev/discussions/categories/ddev-advisory-group) and a specific [brainstorming meeting](https://github.com/orgs/ddev/discussions/7923).

We always want to hear from you about your experiences with DDEV as the year goes along!

Want to keep up as the month goes along? Follow us on:

- [Monthly Newsletter](/newsletter)
- [blog](https://ddev.com/blog/)
- [LinkedIn](https://www.linkedin.com/company/ddev-foundation)
- [Mastodon](https://fosstodon.org/@ddev)
- [Bluesky](https://bsky.app/profile/ddev.bsky.social)
- and join our community on [Discord](/s/discord)
