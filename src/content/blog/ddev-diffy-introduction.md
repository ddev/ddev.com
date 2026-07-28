---
title: "Introduction: The Diffy DDEV plugin"
pubDate: 2024-08-09
modifiedDate: 2026-07-28
modifiedComment: "Verified the [ddev-diffy add-on](https://github.com/diffywebsite/ddev-diffy) and `ddev screenshot` are still active and maintained, updated the credential setup step to use `ddev dotenv set`, and noted the free Diffy Pro license included with DDEV sponsorship."
summary: Visual regression testing tool Diffy got DDEV integration!
author: Yuri Gerasymov
featureImage:
  src: /img/blog/2024/08/camera-and-laptop.jpeg
  alt: "Microsoft image creator: camera and laptop"
  credit: "Microsoft image creator: camera and laptop"
categories:
  - Announcements
---

[Diffy](https://diffy.website) is a visual regression testing tool that allows you to take screenshots of your website from different environments and compare them. For example, you can visually compare your production vs. development. Or your local environment vs development.

We help developers see how their code changes affect the site visually, quickly, and on multiple pages.

As it is essential to spot the changes as early as possible, we built an integration with DDEV so you can take screenshots from your local environment.

For that you need a few steps:

- create an account in Diffy, create a project, API key
- add a DDEV add-on `ddev add-on get diffywebsite/ddev-diffy` and run `ddev restart`
- set the API key and project ID with [`ddev dotenv set`](https://docs.ddev.com/en/stable/users/usage/commands/#dotenv): `ddev dotenv set .ddev/diffy-worker/.env --diffy-api-key=XXX --diffy-project-id=XXX`
- run screenshots from local environment with `ddev screenshot` and see them uploaded to Diffy

Once you have screenshots uploaded you can compare them to any other set of screenshots. For example with screenshots from production.

Here is a [video walkthrough](https://www.loom.com/share/a3b750e32581458f9d2271969bba1bb8) for the comparing local environment with your production with the integration.

**Sponsor perk**: DDEV sponsors at the $100/month "Featured Sponsor" level or above get a free one-year Diffy Pro plan license ($800 value) as part of their sponsorship. See the [sponsor page](/sponsor) for details.
