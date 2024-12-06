---
title: "DDEV Project 2024 Plans"
pubDate: 2024-03-03
modifiedDate: 2024-04-23
summary: Looking forward to 2024 with the DDEV Project
author: Randy Fay
featureImage:
  src: /img/blog/2024/03/2024-ddev.png
  alt: 2024 DDEV Plans
  credit: 'Ideogram.ai: the words "2024" and "DDEV" next to each other'
categories:
  - Community
---

At the DDEV Advisory Group's 2-hour [annual review/planning meeting on March 6, 2024](https://www.timeanddate.com/worldclock/fixedtime.html?msg=DDEV+Advisory+Group&iso=20240306T09&p1=75&ah=2), we'll talk about plans and priorities for 2024. These have been discussed previously in the [DDEV 2024 Priorities discussion](https://github.com/orgs/ddev/discussions/5720) but in getting ready for the meeting it seems like a good time to propose them in a more cohesive fashion. (Everyone is welcome to the meeting. The Zoom link is announced in [Discord](/s/discord) or email [support](mailto:support%40ddev.com) for a calendar invitation or the zoom link.)

## Community

- **Continue the Contributor Training initiative**. In 2023 we had weekly [contributor training sessions](contributor-training.md) and they were a great way to put into practice our priority of making DDEV support and enhancement available to all community members.
- **Continue outstanding user support** even with growth of our user base. In the past year the weekly users of DDEV about doubled, from about 5000 to 10,000 or more. This means increased support, and we want to continue our level of support in all the [support venues](https://ddev.readthedocs.io/en/stable/users/support/), but this likely means finding more community members to be first-line support instead of Randy and Stas often having to be there first (although we love helping!).
- **Improve governance strategy for DDEV Foundation**. Discuss governance with the community and consider raising the authority level of the advisory group, or create another type of board. Make sure financial controls are obvious and adequate.

## Sustainability and Finance

- **Continue consistent marketing**, including blogs, clear fundraising efforts, newsletter. In 2023 we made marketing outreach a regular goal, as it had been neglected in the past. We want everybody to know that DDEV's future sustainability depends on them, and want them to be in the loop on what's going on. As a result of this, we now have a monthly [newsletter](/newsletter) and better communication around funding and supporting the project. We still have a long ways to go on this, and as always it competes for attention and time with other priorities.
- **Recruit, train, and add a third paid co-maintainer**: Our two maintainers are 100% occupied with current priorities, and we should be able to grow funding (and maintainer capabilities) to add another co-maintainer.

## Features

- **Explicit support for [Upsun by Platform.sh](https://upsun.com/)**, which probably means creating an add-on for it, but at least supporting the documented target CMSes. (Update 2024-04-23: Upsun work will be deferred to Q4 when the Upsun usage is increased. In Q2 we'll catch up on ddev/ddev-platformsh maintenance and try to add explicit testing for Ibexa, Pimcore, Magento2ce, Shopware6)
- **Improve xhprof usage**. The [ddev-xhgui](https://github.com/tyler36/ddev-xhgui) add-on has demonstrated how much better the xhprof experience can be in DDEV. We would like to incorporate the ddev-xhgui work into DDEV core and make the great experience available to everyone without an add-on.
- **Refactor configuration code** to promote consistent handling of config (global and project) and generated docs. Currently, there is a lot of technical debt in the handling of project and global configuration, with code often repeated for each setup. This can be reworked and give consistent approach to these, while removing much code. This could include using Viper for configuration, which would allow environmental overrides, etc.
- **Node.js back-end**: DDEV already has lots of support for Node.js in many contexts, but it would be great to have the ability to replace php-fpm with a node server, and this is already not hard to do, but would be great as a DDEV feature.
- **Add-on Registry**: The available DDEV add-ons have expanded enormously since the launch of this feature. We probably need something fancier then `ddev get --list` to show and explain them. This can be API-based and should work fine.

## Architecture

- **Discuss breaking up `ddev-webserver`** into multiple images/containers
  - The base image could be smaller
  - PHP could be a separate image/container
  - Apache and Nginx versions could be separate images
- **Make web server component swapable**: Currently we have Apache and Nginx built-in, but people periodically ask for Caddy, etc.
- **Support more back-ends (like Node.js and FrankenPHP)** in addition to the current PHP-FPM and Gunicorn. Make them swappable so that future back-ends could easily be accommodated.

## Future possibilities

- **TUI or GUI** (Text User Interface or Graphical User Interface). People have often suggested that a user interface other than the command-line would make the tool more accessible to less-technical users. In the distant past we even had a [React-based GUI wrapper](https://github.com/ddev/ddev-ui), but it didn't have tests and was not really maintainable. Still, the idea of making DDEV more accessible to a different audience comes up regularly.
