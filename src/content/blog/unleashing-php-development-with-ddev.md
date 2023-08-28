---
title: "Unleashing PHP Development with DDEV: The Power of Upstream Support"
pubDate: 2023-08-27
summary: Discover how DDEV revolutionized local environments and enables robust remote collaboration.
author: Lasse Blomenkemper
featureImage:
   src: /img/blog/2023/08/google-deepmind-ebMFfR2uuJ0-unsplash.jpg
   alt: An artist’s illustration of artificial intelligence (AI). This illustration depicts language models which generate text.
   credit: "Photo by Google DeepMind on [Unsplash](https://unsplash.com/photos/a-couple-of-pieces-of-luggage-sitting-on-top-of-each-other-ebMFfR2uuJ0)."
categories:
  - DevOps
  - Community
---

There's a saying: "You never change things by fighting the existing reality. To change something, build a new model that makes the existing model obsolete." For us, DDEV is that new model. I've observed firsthand the transformative effect DDEV has had on our development processes; it's been a game-changer.

## The Old Way: Every Developer for Themselves
Before DDEV existed, our team—like many development teams—relied on more conventional methods for development. Every team member was responsible for setting up and maintaining their local environment. For most of our developers, this was a significant source of frustration.

The process was generally fraught with obstacles, feeling like a maze where every turn led to another complication. Here are some of the main challenges we encountered:
- Configuration inconsistencies across machines resulted in the dreaded "it works on my machine" syndrome, wasting countless hours in troubleshooting.
- Onboarding new or junior developers was time-consuming, as they often required extensive (full workdays one-on-one time) assistance to set up their environments.
- The lack of standardized environments led to unpredictable bugs and deployment issues, hampering both development speed and product quality.

## The DDEV Way: Shared and Predictable Environments
In the summer of 2018, one of our team members introduced us to DDEV as a potential solution to the challenges we were facing in local development. While the idea was exciting, it sparked debate. Some team members suggested that a graphical interface tool might better enable junior developers, while others were concerned about the learning curve for new colleagues. Undeterred, a subset of our developers took the initiative to experiment with DDEV, and the initial results were promising. A few months later, we collectively decided to transition to using DDEV across the company.

To our astonishment, the previous issues with our development environments quickly became a thing of the past. With a simple `ddev start` command, we were up and running, eliminating tedious configuration processes. This not only boosted the morale of our existing developers but also streamlined the onboarding process for new team members, sometimes reducing it to mere minutes. The oft-cited problem of "it works on my machine" disappeared, giving us the feeling that the constraints on local development had been lifted.

### Enabling Remote Collaboration
When the COVID-19 pandemic emerged in 2020, we had to reevaluate our local development practices. Traditional in-person collaboration methods, such as sharing a keyboard and screen, were no longer feasible. In response, we took the technical route, building custom Cloud Development Environments (CDEs) using DDEV and [Code-Server](https://github.com/coder/code-server), a browser-compatible fork of Visual Studio Code.

This setup allowed us to resume real-time collaboration. Additionally, it offered a development environment that not only updated uniformly for all team members but also outperformed most local machines (we reduced our build times by 65%). It's scalable, has very fast networking, and features redundancy across five different data centers. While this transition was initially prompted by external circumstances, it further reduced development overhead and increased productivity—achievements made initially possible by DDEV.

### Enabling Testing Environments
Another area where DDEV has been instrumental is in deploying testing environments. We're currently using DDEV to automatically build a testing environment for every Merge Request. This enables team members and clients to review changes in a feature-specific environment before they are merged into the main branch. Although this feature is not in production yet, we're actively working on it and excited to roll it out in the coming weeks.

This is particularly exciting because no additional configuration is needed for our developers; the DDEV configuration is already in place. This speaks to DDEV's flexibility and its capability to adapt to our changing requirements.

## Why Did We Support DDEV?
A [Tweet from Randy Fay](https://twitter.com/randyfay/status/1686789600906276872) made us reconsider the mindset with which companies like ours often use open-source software without contributing back. This is not sustainable in the long run and poses an unnecessary business risk. We decided to be part of the solution, not the problem, and so should you.

![A meme showing a bunch of Jenga blocks stacked on top of each other, with the caption "All modern digital infrastructure" above them; at the very bottom, all the blocks rest on one single block. Next to it it says "A project some random person in nebraska has been thanklessly maintaining since 2003".](https://imgs.xkcd.com/comics/dependency.png "Someday ImageMagick will finally break for good, and we'll have a long period of scrambling as we try to reassemble civilization from the rubble.")

## Join Us in Ensuring DDEV's Financial Sustainability!
If there’s one message I'd like to impart to fellow developers and executives, it's this: Supporting tools like DDEV is not merely an act of gratitude; it's an investment. An investment in smoother workflows, satisfied developers, and a more collaborative tech ecosystem. The financial details are easy, there's full information on the [GitHub Sponsors Page](https://github.com/sponsors/ddev/).

To Randy and all DDEV contributors: What you've created is nothing short of phenomenal. You've empowered companies like ours to focus on what we do best while making local environment configurations a thing of the past. Our support was not merely overdue; it was our way of betting on a brighter future.

In closing, for all PHP developers and agencies out there, I highly recommend trying DDEV if you haven’t already. It's a tool with the potential to transform your development processes and one that deserves your support.
