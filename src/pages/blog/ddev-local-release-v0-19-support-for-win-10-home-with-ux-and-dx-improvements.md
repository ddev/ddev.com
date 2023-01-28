---
title: "DDEV-Local Release v0.19.0 – Support for Win 10 Home with UX and DX improvements"
pubDate: 2018-05-31
author: Rick Manelius
featuredImage: https://ddev.com/app/uploads/2018/05/danilo-batista-334883-unsplash.jpg
categories:
  - DDEV
---

We’ve just released [DDEV-Local v0.19.0](https://github.com/drud/ddev/releases/tag/v0.19.0)! This release has several user experience (UX) and developer experience (DX) improvements we think you’ll enjoy.

Here are a few highlights:

- UX: [Added Support for Win 10 Home.](https://github.com/drud/ddev/issues/854)
  - This means Win 10 Home users can try DDEV now.
- DX: [Allow environment variables to propagate into the webserver container.](https://github.com/drud/ddev/pull/870)
  - This is important for CMSes like TYPO3 where the application can now use this value in order to change behavior between environments.
- DX: [“ddev describe” should show direct ephemeral port/URL via localhost](https://github.com/drud/ddev/issues/796).
  - This has been a feature request for those that wish to use DDEV-Local in a non-interactive way. Combined with the “-j” flag to return output in JSON, this is a powerful way to create scripts against the binary to perform automated tests and operations
- DX: [Fix issues with duplicated hostnames](https://github.com/drud/ddev/issues/789).
  - When we introduced the multi-hostname functionality, we were not checking for duplicate entries, which caused issues with the DDEV router. Now duplicated entries within a project are ignored.
- DX: [Add .mysql to allowable database extensions for import.](https://github.com/drud/ddev/issues/812)
  - This was necessary for Drupal users who use the backup_migrate module.

This release includes a variety of bug fixes as well. We’ve addressed regressions on Linux support, moved the Docker image definitions into the repository, and performed upgrades to our testing infrastructure. We also did a significant amount of work under the hood in preparation for the [DDEV roadmap](https://github.com/drud/ddev/wiki/Roadmap).

For full details check out the [DDEV-Local v0.19 Release Notes](https://github.com/drud/ddev/releases/tag/v0.19.0).

### Events: Meet the DDEV Team

We’ll be sponsoring, volunteering at, and speaking at events this summer across the US and Europe. [Check out the DDEV events calendar](https://ddev.com/events/), we’d love to meet you.

Photo by [Danilo Batista](https://unsplash.com/photos/GXzjWurMTgQ?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText) on [Unsplash](https://unsplash.com/?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText)
