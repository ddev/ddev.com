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

Stas and I recently did a [Contributor Training](/blog/category/training) session on creating and maintaining DDEV add-ons:

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/OtmVJtwsHMg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

The [slides are available online](https://rfay.github.io/addons-creating-maintaining-presentation/) ([source](https://github.com/rfay/addons-creating-maintaining-presentation)).

## What Are DDEV Add-ons?

Most people first encounter add-ons as service providers — Redis, Elasticsearch, Solr, Mailpit — but Bill Seremetis (bserem) put it well in his [DrupalDevDays Athens 2026 talk](https://bserem.github.io/presentations/DrupalDevDays%20Athens%202026%20-%20From%20Chaos%20to%20Consistency%20-%20DevOps%20Session.pdf): "an add-on is a set of files: hooks + commands + scripts + config — it's a distribution mechanism." His agency uses a single custom add-on across 100+ Drupal projects to encode institutional knowledge, enforce quality gates, and deliver the team's workflows to the terminal. One update to the add-on propagates improvements to every project. That framing opens up a lot: custom commands that automate your team's processes, DDEV hooks that fire at key checkpoints (sanitize the database on import, install git hooks on project start), and boilerplate configs or scripts distributed automatically to wherever they're needed.

The heart of every add-on is an `install.yaml`, which defines what files get placed at the project-level or globally, plus `pre_install_actions` and `post_install_actions` that can run shell or PHP scripts during install. 

Getting started with a new add-on is straightforward: use the [ddev-addon-template](https://github.com/ddev/ddev-addon-template), which wires up GitHub Actions CI and a `tests/test.bats` Bats test suite from the start. You can test locally before publishing with `ddev add-on get /path/to/your/addon`, against a branch with `--version branch-name`, or against an open PR with `--pr 54`. When ready to publish to the world (if you want to), add the `ddev-get` topic to your GitHub repository and it will appear in [addons.ddev.com](https://addons.ddev.com) within about 24 hours.

## Resources

- **[DDEV Add-on Documentation](https://docs.ddev.com/en/stable/users/extend/creating-add-ons/)** — the official reference for creating and maintaining add-ons
- **[DDEV Add-on Registry](https://addons.ddev.com)** — browse the full catalog of community add-ons (see also: [registry introduction](ddev-addon-registry-introduction.md))
- **[Add-on Maintenance Guide](ddev-add-on-maintenance-guide.md)** — guidance for maintaining add-ons over time
- **[Anatomy of an Advanced DDEV Add-on](anatomy-advanced-ddev-addon.md)** — a deep dive into a complex add-on with a custom container

## Contributions Welcome!

Your suggestions to improve this blog are welcome. You can do a PR to this blog adding your techniques. Info and a training session on how to do a PR to anything in ddev.com is at [DDEV Website For Contributors](ddev-website-for-contributors.md).

Follow the [DDEV Newsletter](/newsletter) for information about upcoming user and contributor training sessions.
