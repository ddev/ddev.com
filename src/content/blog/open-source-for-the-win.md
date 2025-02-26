---
title: "Open Source for the Win!"
pubDate: 2025-02-26
#modifiedDate: 2025-02-26
summary: Open Source for the Win! How the DDEV community reported a problem early, and open-source maintainers responded, meaning people don't have to encounter it.
author: Randy Fay
featureImage:
  src: /img/blog/2025/02/open-source-mutagen-docker-banner.jpeg
  alt: Open Source for the Win!
categories:
  - Community
---

## DDEV v1.24.3 Release

Today we released [DDEV v1.24.3](https://github.com/ddev/ddev/releases/tag/v1.24.3) ahead of schedule because of a wonderful set of open-source interactions. (There's other important stuff in the release, but I'll cover that later.)

**We would appreciate it if you could upgrade soon, especially if you're on macOS or traditional Windows, so that we don't have to answer questions about this when it starts to hit users.**

## Mutagen Problem Report

On Monday, two days ago, @LoganHornbuckle reported [a problem](https://github.com/ddev/ddev/issues/7015) (apparently with Mutagen or Docker) we had never seen before. They helped extensively with followup, and it turned out that they had done a `colima update` and as a result gotten the new Docker/Moby Engine version 28.0.0.

This was a serious fatal error, completely breaking DDEV's Mutagen support for Docker 28.

Once we understood the situation, we were able to reproduce the problem, and assumed it was a problem with Docker 28.

## The Fix to Mutagen

We contacted @xenoscopic (Jacob Howard), the maintainer of Mutagen (now with Docker), and he was able to reproduce it immediately. By the end of the day, he had diagnosed it and provided a new release! (It turned out to be a place where Mutagen had worked around a Docker Engine quirk, and the Docker quirk got fixed, breaking Mutagen.)

So here we are just two days later with a pre-emptive DDEV release v1.24.3 that should prevent most people from ever seeing the Mutagen problem.

## THANKS!

Thanks to @LoganHornbuckle and the community for keeping in touch, reporting, and helping to sort out problems. Amazing thanks to @xenoscopic for the quick diagnosis and fix. And thanks to Docker, Inc. for the wonderful open-source Docker project that underlies all of the available Docker providers, not just Docker Desktop. And of course thanks for supporting @xenoscopic's ongoing maintenance of Mutagen.

Open source software is amazing!

Want to keep up as the month goes along? Follow on

- [blog](https://ddev.com/blog/)
- [LinkedIn](https://www.linkedin.com/company/ddev-foundation)
- [Mastodon](https://fosstodon.org/@ddev)
- [Bluesky](https://bsky.app/profile/ddev.bsky.social)
- and join our community on [Discord](/s/discord)
