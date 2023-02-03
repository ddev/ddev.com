---
title: "DDEV-Local Release v0.20.0 – sudo and a peek into the roadmap ahead"
pubDate: 2018-06-27
summary: Bugfixes and user experience enhancements.
author: Rick Manelius
featureImage:
  src: /img/blog/2018/06/daniil-silantev-367138-unsplash.jpg
  alt: Extreme close-up photo of filthy hands holding a topographic map and compass, gesturing admist discussion
  credit: "Photo by [Daniil Silantev](https://unsplash.com/photos/ioYwosPYC0U?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText) on [Unsplash](https://unsplash.com/?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText)."
categories:
  - Announcements
---

We’re delighted to share [DDEV-Local v0.20.0](https://github.com/drud/ddev/releases/tag/v0.20.0) with you.

We’ve addressed a number of bugfixes and provided a few enhancements that will improve your overall experience. Additionally, with renewed energy and ideas coming as a result of [our company onsite](https://ddev.com/devops/onsite-collaboration-and-communication/), we’ve been working away on the product vision and our [Roadmap](https://github.com/drud/ddev/wiki/Roadmap) (more to come!)

### How do you sudo?

One new feature we’ve added in v0.20.0 reflects how we’re approaching building DDEV to be something that is flexible enough to grow with you as your needs evolve. As of v.0.20.0, DDEV-Local allows a user to issue commands with `sudo` in the web container. Users often come with requests we have to weigh or consider in terms of our roadmap and how universal the feature is needed. For example, a TYPO3 user might want to install Ghostscript in the web container; or a GravCMS user might want to add SQLite to support TNTSearch. Now because you can issue privileged commands using DDEV, you can add whatever you need to make it work for you.

This reflects the overall approach we’re taking with creating a product and service that is pluggable, plays well with others, and is extensible – while still having an out of the box “just works” experience for typical cases. With Apache support and services like Memcached ahead in our [DDEV Roadmap](https://github.com/drud/ddev/wiki/Roadmap), your continued feedback helps us guide the product in the right direction.

Curious what’s in store when you upgrade to v.0.20?[ Read the full release notes for details](https://github.com/drud/ddev/releases/tag/v0.20.0).

### Upcoming release

On July 17th, we will be officially tagging a v1.0.0 release for DDEV. We’re so proud of how far the project has come and how many people are reliant upon it as their primary tool of choice. Cutting this release is a reflection of that progress. As part of this release, we will be focusing on some last refactors as well as improving our documentation on our robust Windows support (Pro, Home, and Enterprise!)

### Events and workshops!

We’re at [some great events coming soon](https://ddev.com/events/on-the-road-with-ddev/). WPCampus, Drupal Asheville, and more coming soon. Come by say hi, we love to talk to DDEV users.

Would you like to refer someone on for training? Tech trainer Mike Anello of Drupal Easy has some exciting news to share soon. [Sign up to find out as soon as we announce the DDEV online workshops](https://www.drupaleasy.com/ddev-workshop).

We were wowed to see over 80 people went to a DDEV demo and workshop at TYPO3 Dev Days last weekend! Thank you to all who attended, and a special thank you to speakers and facilitators, Michael Oehlhof and Jigal van Hemert.

> The [@drud](https://twitter.com/drud?ref%5Fsrc=twsrc%5Etfw) [#ddev](https://twitter.com/hashtag/ddev?src=hash&ref%5Fsrc=twsrc%5Etfw) talk in room [@jweilandnet](https://twitter.com/jweilandnet?ref%5Fsrc=twsrc%5Etfw) is well visited! [#t3dd18](https://twitter.com/hashtag/t3dd18?src=hash&ref%5Fsrc=twsrc%5Etfw) [pic.twitter.com/jXKms9RKui](https://t.co/jXKms9RKui)
>
> — T3DD (@t3dd) [June 23, 2018](https://twitter.com/t3dd/status/1010462199884779520?ref%5Fsrc=twsrc%5Etfw)

### Some recent posts we think you’ll like

- We had [our very first on-site last week.](https://ddev.com/devops/onsite-collaboration-and-communication/) It was great to bring the team together, and align with our objectives for the next quarter and beyond.
- Know someone considering a switch from virtual machines? Send them here: [Docker containers vs VMs for quick consistent local dev](https://ddev.com/ddev-local/docker-containers-vs-vms-for-quick-consistent-local-dev/)
- Read: [Why DevOps, Containers, and Tooling Matter in Digital Transformation.](https://ddev.com/devops/why-devops-containers-and-tooling-matter-in-digital-transformation/) We can help you set up teams, processes, and integrations to help build dev-to-deploy workflows. Reply to this email if you have any questions.

Thanks as always for your support and enthusiasm!
