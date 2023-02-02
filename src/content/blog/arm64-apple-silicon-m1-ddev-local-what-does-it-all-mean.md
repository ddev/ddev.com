---
title: "ARM64! Apple Silicon! M1! DDEV-Local! What does it all mean?"
pubDate: 2020-11-18
modifiedDate: 2020-12-16
modifiedComment: "An Apple Silicon M1 prerelease [is now available](ttps://github.com/drud/ddev/releases)! See the release notes for installation details."
author: Randy Fay
featureImage:
  src: /img/blog/2020/11/apple-ddev.jpg
  alt:
  caption:
  credit:
categories:
  - DevOps
  - Performance
---

ARM64 is the new word of the day all over the place since Apple has switched their hardware platform to “Apple Silicon,” which is on the ARM64 platform. Although the Apple news and benchmarks are exciting, ARM is not new, lots of devices already use it, and our [open source DDEV-Local development environment](https://github.com/drud/ddev/releases/tag/v1.16.0) already supports it on Linux and WSL2.

In this blog, we’ll take a look at these things:

- What is ARM64?
- What is Apple Silicon/Apple M1 Chip? What is Big Sur? What is Rosetta 2?
- DDEV-Local Already Runs On ARM64 in Linux and WSL2
- When will DDEV-Local work on Apple Silicon?

## What is ARM64?

The majority of Windows, Mac, and Linux computers to date have used the Intel CPU architecture, or AMD64\. Most software, including DDEV-Local, our [DDEV-Live hosting platform](https://ddev.com/ddev-live/), cloud VMs, the most popular Docker images, and many upstream projects have traditionally assumed AMD64 hardware, and ARM64 versions were not always available.

“ARM” stands for “Advanced RISC Machine” and “RISC” stands for “Reduced Instruction Set Computer.” The Intel architecture we’ve all used so long has been dubbed “CISC” or Complex Instruction Set Computer.” ARM seems to be the future. **ARM64** means ARM with 64-bit chips (there are also loads of ARM32 chips out there in the world). (The intel architecture is typically labeled AMD64; apparently after another manufacturer of the AMD64 chips, AMD.)

Current versions of many devices already use ARM chips, including almost all Apple devices besides the Mac, Microsoft’s Surface Pro X, the Raspberry Pi, Pinebook Pro, and many others.

## What is Apple Silicon/Apple M1 Chip? What is Big Sur? What is Rosetta 2?

Apple announced earlier this year that they were going to transition their entire Mac line from Intel processors to their own ARM64 “**Apple Silicon**” chip, dubbed the [**M1**](https://www.apple.com/mac/m1/). The [availability announcement on November 10, 2020](https://www.apple.com/apple-events/november-2020/) made incredible performance claims. At this point, third-party testers are also reporting outstanding performance, even for older AMD64 apps (like last month’s apps) that have not been rebuilt for ARM64.

Apple’s new **Big Sur** version of macOS (aka macOS version 11) has just been released, and runs on both Apple Silicon/M1/ARM64 and AMD64 computers. It’s mostly just their annual OS update, but the big news is the Apple Silicon support.

**Rosetta 2** is a feature implemented in the M1 chip and Big Sur which allows macOS to run AMD64 apps, even though they use a different architecture.

## DDEV-Local Already Runs On ARM64 in Linux and WSL2

**[DDEV-Local v1.16](https://github.com/drud/ddev/releases/tag/v1.16.0) already runs on ARM64 computers** where Docker is available. This includes Windows WSL2 on Windows ARM64 machines like the Surface Pro X, and also native Linux ARM64 machines like the Raspberry Pi (64-bit), Pinebook Pro, or Amazon EC2 ARM64 machines.

Thanks to incredible contributions by [Dennis Ameling](https://github.com/dennisameling) leading this transition, nearly all the features of DDEV-Local are available in ARM64 machines, and these features are also tested on Travis-CI, which has ARM64 testing available (testing _also_ set up by Dennis!)

Building DDEV-Local for ARM64 was a monumental task, and a huge demonstration of the beauty of open source. Dennis has a Surface Pro X (ARM64) that he loves and wanted to be able to develop on… So he took on the task. It involved:

- Reworking all the DDEV-Local Docker images (ddev-webserver, ddev-dbserver, ddev-ssh-agent, ddev-router) so they could be built for ARM64.
- Providing ARM64 builds of certain key upstream tools which were incorporated into Docker images or required alongside DDEV-Local, like mkcert, mailhog, and docker-gen.
- Reworking the image build process to use Docker’s new [multi-architecture](https://www.docker.com/blog/tag/multi-architecture/) support, which allows a single image on [hub.docker.com](http://hub.docker.com) to have both AMD64 and ARM64 versions, and to pull the correct one as needed.
- Building the DDEV-Local Go binary for AMD64.

[Get the latest DDEV-Local here](https://github.com/drud/ddev/releases)

## When will DDEV-Local Work on Apple Silicon?

People are just starting to receive the brand new macOS machines with Apple Silicon; we ordered ours and expect it to arrive in late November.

However, Docker has the same problem as everybody else with getting Docker Desktop to run on Apple Silicon (see their [announcement](https://www.docker.com/blog/apple-silicon-m1-chips-and-docker/)). As of November, 2020, Docker Desktop doesn’t run yet on Apple Silicon, but they’re promising a technical preview soon, and they’re happy with their progress on it.

Besides the dependency on Docker Desktop, the only other known issue in getting DDEV working on Apple Silicon is compiling the Go binary. The current version of Go, v1.15, does not support building Darwin/ARM64, the name of the architecture. However, the upcoming Go v1.16 ([due in February, 2021](https://github.com/golang/go/wiki/Go-Release-Cycle)) does. And it’s available a few ways right now. Experiments with building have been successful but, of course, we can’t run on real hardware until we get it.

So the answer is… DDEV-Local will hopefully run on Apple Silicon Real Soon, probably just after a workable Docker Desktop is made available.
