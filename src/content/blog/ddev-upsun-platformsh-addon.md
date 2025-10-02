---
title: "Upsun Support for DDEV in a New Add-on"
pubDate: 2025-10-02
#modifiedDate: 2025-04-07
summary: "New DDEV Add-on supports Upsun Flex and Upsun Fixed (Platform.sh-style configuration)"
author: Randy Fay
featureImage:
  src: /img/blog/2025/10/Upsun-formerlyPSH-horizontal-white3x_1.png
  alt: Sophisticated upsun support for DDEV
categories:
  - Announcements
  - Guides
---

## Introduction

We're proud to announce that DDEV now has an [Upsun add-on](https://github.com/ddev/ddev-upsun) with extensive support for Upsun Flex and Upsun Fixed (Platform.sh-style configuration)!

Although DDEV has had `ddev pull upsun` support for Upsun projects for a couple of years, the add-on provides a more complete integration with Upsun. It reads your Upsun configuration and automatically configures matching services in your local DDEV project, mirroring what your upstream project uses.

---

## Getting Started

Getting started is straightforward:

1. In your existing Upsun project directory, run:
   ```bash
   ddev config
   ddev add-on get ddev/ddev-upsun
   ddev start
   ```
2. The add-on will read your `.upsun/config.yaml` or `.platform.app.yaml` and configure your local environment automatically.

For more details, see the [README](https://github.com/ddev/ddev-upsun#readme).

---

## What the `ddev-upsun` Add-on Does

When you do a `ddev add-on get ddev/ddev-upsun` the add-on reads your `.upsun/config.yaml` or `.platform.app.yaml` file and configures your DDEV project to match the upstream environment. This requires careful translation between Upsun's cloud architecture and DDEV's local environment.

- Use the same PHP version and extensions.
- Use the same database type and version (supporting multiple versions of MariaDB, MySQL, and PostgreSQL).
- Detect the use of Redis, Memcache, and Opensearch and configure DDEV add-ons to mimic the Upsun configuration.

---

## Why `ddev-upsun` Matters

Although many Upsun-hosted sites are basic nginx-fpm-database sites that DDEV has easily supported for years, the more complex ones have required special handling, like having to explicitly set PHP version, database type, etc. Now the add-on can do much of that for you.

For example, if your Upsun project uses PostgreSQL 15 with Redis and a specific PHP version, previously you'd need to manually configure each in your `.ddev/config.yaml`. Now, the add-on detects and configures all of this automatically.

Upsun is a great platform for developers, and so many of you use it in the new "Flex" style and the previous "Fixed" style (Platform.sh-style). The add-on makes it easy to use both with a single add-on.

And of course Upsun is the lead sponsor of DDEV, so we always delight in making it work for you.

---

## The Future of `ddev-upsun`

A sophisticated platform like Upsun has many possibilities, and we want most things to work on most projects. The scope will be limited to PHP for now. However, we want to add:

- Versioning for add-ons (Redis version will be supported in `ddev/ddev-redis` add-on, for example).
- More service support, like Elasticsearch and Solr.
- Even more extensive automated tests. Currently we have a very extensive set of tests based on Drupal setup, but want to add tests for other frameworks and CMSes.

---

## How We Got Here (PHP Add-ons)

DDEV v1.24.8 (required) adds [support for add-ons written mostly in PHP](https://docs.ddev.com/en/stable/users/extend/creating-add-ons/#php-based-actions-new). Originally, all add-ons were written in Bash, with Go templating. It worked great for so many simple add-ons, but was way too complicated for sophisticated add-ons. PHP is a familiar and powerful language for many add-on developers, so now provides a much more expressive way to write complex add-ons.

The [ddev/platformsh](https://github.com/ddev/platformsh) add-on forced the issue on this. Every time we went back to it to maintain it we had to remember how Go templates worked and sort out complex Bash logic. Bash and Go templates are a lousy combination for maintainability. PHP should be much better. The `ddev-upsun` add-on will replace `ddev/platformsh` and supports both the Flex and Fixed Upsun configurations.

If you're currently using the `ddev/ddev-platformsh` add-on, you can migrate to `ddev-upsun` by removing the old add-on with `ddev add-on remove ddev-platformsh` and adding the new one with `ddev add-on get ddev/ddev-upsun`.

---

## What's Next

- Check out the [full documentation](https://github.com/ddev/ddev-upsun#readme) for advanced configuration options.
- We'd love feedback—open issues or contribute PRs if you encounter edge cases.
- If you like it, give us a star on [GitHub](https://github.com/ddev/ddev-upsun).

---

## Gratitude

Thanks as always to Upsun for their financial support and for the great products, and for access to testing accounts. Their continued support makes DDEV development possible.

If you're not already an Upsun user, try an [Upsun free trial](https://upsun.com/flexible-developer-experience/).

## Stay in the Loop—Follow Us and Join the Conversation

- [Blog↗](https://ddev.com/blog/)
- [LinkedIn↗](https://www.linkedin.com/company/ddev-foundation)
- [Mastodon↗](https://fosstodon.org/@ddev)
- [Bluesky↗](https://bsky.app/profile/ddev.bsky.social)
- [Discord↗](/s/discord)

Reviewed with assistance from DDEV Contributors and Claude Code.
