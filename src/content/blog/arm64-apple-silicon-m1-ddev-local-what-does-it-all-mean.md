---
title: "ARM64! Apple Silicon! M-Series! DDEV! What does it all mean?"
pubDate: 2020-11-18
summary: A look at Apple’s new chip architecture and what it means for DDEV.
modifiedDate: 2025-04-16
modifiedComment: "We’ve updated this post to reflect the continued support for Apple Silicon since it was first published."
author: Randy Fay
featureImage:
  src: /img/blog/2020/11/apple-ddev.jpg
  alt: Apple M1 logo and DDEV logo side by side
categories:
  - DevOps
  - Performance
---

ARM64 is the new word of the day all over the place since Apple has switched their hardware platform to “Apple Silicon,” which is on the ARM64 platform. Although the Apple news and benchmarks are exciting, ARM is not new, lots of devices already use it, and our [open source DDEV development environment](https://github.com/ddev/ddev/releases) has already supported it for years on macOS, Linux and WSL2.

In this blog, we’ll take a look at these things:

- What is ARM64?
- What is Apple Silicon/Apple M-series Chips? What is Rosetta 2?
- DDEV Also Runs On ARM64 in Linux and WSL2
- When will DDEV work on Apple Silicon?

## What is ARM64?

Until 2020, the majority of Windows, Mac, and Linux computers used the Intel CPU architecture, or AMD64. Most software, including DDEV, cloud VMs, the most popular Docker images, and many upstream projects traditionally assumed AMD64 hardware, and ARM64 versions were not always available. But with the advent of Apple Silicon and the mac M-series machines, and with the proliferation of ARM64 Linux machines like Raspberry Pi, it's no longer the case.

“ARM” stands for “Advanced RISC Machine” and “RISC” stands for “Reduced Instruction Set Computer.” The Intel architecture we all used so long was dubbed “CISC” or Complex Instruction Set Computer.” ARM seems to be the future. **ARM64** means ARM with 64-bit chips (there are also loads of ARM32 chips out there in the world). (The Intel architecture is typically labeled AMD64; apparently after another manufacturer of the AMD64 chips, AMD.)

Current versions of many devices were already using ARM chips, including almost all Apple devices besides the Mac, the new Windows ARM64 machines, the Raspberry Pi, Pinebook Pro, and many others. (DDEV supports all of them!)

## What is Apple Silicon/Apple M-Series Chips? What is Rosetta 2?

Apple announced in 2020 that they were going to transition their entire Mac line from Intel processors to their own ARM64 “**Apple Silicon**” chip, dubbed the [**M1**](https://www.apple.com/mac/m1/). Users since then have loved the amazing performance gains.

**Rosetta 2** is a feature implemented in Apple Silicon machines and macOS allowing emulation of AMD64 apps, even though they use a different architecture. It's very impressive, but it may mask important problems if you run AMD64 binaries (or Docker images) on the Apple Silicon, and may introduce invisible performance issues.

## DDEV Runs On ARM64 on Mac, Linux and WSL2

**[DDEV](https://github.com/ddev/ddev/) has been running natively on ARM64 computers** where Docker is available since 2020. This includes Apple Silicon, Windows WSL2 on Windows ARM64 machines like the Surface Pro X, and also native Linux ARM64 machines like the Raspberry Pi (64-bit), Pinebook Pro, or Amazon EC2 ARM64 machines.

The initial ARM64 work for DDEV was done by [Dennis Ameling](https://github.com/dennisameling) before the Mac M1 was even available. It meant that DDEV had native ARM64 Docker images when the Mac M1 was released. His energy and work on that, including automated testing, made a huge difference.

Building DDEV for ARM64 was a monumental task, and a huge demonstration of the beauty of open source. Dennis has a Surface Pro X (ARM64) that he loves and wanted to be able to develop on… So he took on the task. It involved:

- Reworking all the DDEV Docker images (ddev-webserver, ddev-dbserver, ddev-ssh-agent, ddev-router) so they could be built for ARM64.
- Providing ARM64 builds of certain key upstream tools which were incorporated into Docker images or required alongside DDEV, like mkcert, mailhog, and docker-gen.
- Reworking the image build process to use Docker’s new [multi-platform](https://docs.docker.com/build/building/multi-platform/) support, which allows a single image on [hub.docker.com](http://hub.docker.com) to have both AMD64 and ARM64 versions, and to pull the correct one as needed.
- Building the DDEV Go binary for AMD64.

That was all cutting-edge stuff at the time!

**The good news for all of us is that DDEV is incredibly performant running natively on Apple Silicon, and it works great everywhere else too.**
