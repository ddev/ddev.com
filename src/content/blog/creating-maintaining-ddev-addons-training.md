---
title: "Contributor Training: Creating and Maintaining DDEV Add-ons"
pubDate: 2026-04-28
summary: A walkthrough of how to create, test, and maintain DDEV add-ons, with Stas Zhuk.
author: Randy Fay
featureImage:
  src: /img/blog/2025/03/ddev-addon-registry.png
  alt: DDEV Add-on Registry
categories:
  - Training
  - Add-ons
---

[Stas Zhuk](https://github.com/stasadev) and I recently did a [Contributor Training](/blog/category/training) session on creating and maintaining DDEV add-ons:

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/OtmVJtwsHMg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

The [slides are available online](https://rfay.github.io/addons-creating-maintaining-presentation/) ([source](https://github.com/rfay/addons-creating-maintaining-presentation)).

## What Are DDEV Add-ons?

Add-ons extend DDEV projects with additional services, commands, and configuration. They can add databases, search engines, queue systems, custom web servers, or any other tool your project needs. Add-ons are installed with `ddev add-on get <owner>/<repo>` and their configuration lives in `.ddev/`.

## Resources

- **[DDEV Add-on Documentation](https://docs.ddev.com/en/stable/users/extend/creating-add-ons/)** — the official reference for creating and maintaining add-ons
- **[DDEV Add-on Registry](https://addons.ddev.com)** — browse the full catalog of community add-ons (see also: [registry introduction](ddev-addon-registry-introduction.md))
- **[Add-on Maintenance Guide](ddev-add-on-maintenance-guide.md)** — guidance for maintaining add-ons over time
- **[Anatomy of an Advanced DDEV Add-on](anatomy-advanced-ddev-addon.md)** — a deep dive into a complex add-on with a custom container

## Contributions Welcome!

Your suggestions to improve this blog are welcome. You can do a PR to this blog adding your techniques. Info and a training session on how to do a PR to anything in ddev.com is at [DDEV Website For Contributors](ddev-website-for-contributors.md).

Follow the [DDEV Newsletter](/newsletter) for information about upcoming user and contributor training sessions.
