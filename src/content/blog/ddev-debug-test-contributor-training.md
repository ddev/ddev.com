---
title: "Contributor Training: Using `ddev debug test` to support others"
pubDate: 2024-10-12
# modifiedDate: 2024-10-12
summary: Contributor training - interpreting and using `ddev debug test` to support others.
author: Randy Fay
featureImage:
  src: /img/blog/2024/10/ddev-debug-test-banner.png
  alt: Using `ddev debug test` to support others
categories:
  - Training
  - Guides
---

Here's our October 9, 2024 [Contributor Training](/blog/category/training) on using `ddev debug test` to help other users:

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/cXsCX2pBPkA?si=QgjPRkHMZUIKH2jc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## What is `ddev debug test` anyway?

`ddev debug test` is really just a [shell script](https://github.com/ddev/ddev/blob/master/cmd/ddev/cmd/scripts/test_ddev.sh) embedded in the `ddev` binary that tries to answer all the questions we've learned to ask in support sessions in our [DDEV Discord channel](https://discord.com/invite/5wjP76mBJD) and the [issue queue](https://github.com/ddev/ddev/issues). There are so many different things that can affect people's DDEV experience, and asking the questions one by one is hard. So when people just run that one command and we can read through the results, it's a big win.

## What does it check?

- DDEV version, architecture
- Docker provider and configuration
- Operating system and context
- Project configuration and specialized configuration
- Network connectivity inside and outside the container, and DNS name lookup

`ddev debug test` will often suggest what's going wrong with a person's DDEV/Docker/OS setup, making sure we know what version they're using and what context they're using it in.

## How can I contribute to it?

Add to the script with a PR. Make sure you've manually tested it.

## Contributions welcome!

Your suggestions to improve this blog are welcome. You can do a PR to this blog adding your techniques. Info and a training session on how to do a PR to anything in ddev.com is at [DDEV Website For Contributors](ddev-website-for-contributors.md).

Join us for the next [DDEV Live Contributor Training](/blog/contributor-training/). Sign up at [DDEV Live Events Meetup](https://www.meetup.com/ddev-events/events/).
