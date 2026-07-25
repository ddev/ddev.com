---
title: "DDEV on ARM64 Raspberry Pi"
pubDate: 2020-11-23
summary: Running DDEV on an ARM64 Raspberry Pi.
author: Randy Fay
modifiedDate: 2026-07-25
modifiedComment: "Updated to reference Apple Silicon and the standard Linux installation procedure, added a logo feature image, and removed an outdated screencast"
featureImage:
  src: /img/blog/2020/11/ddev-raspberry-pi.png
  alt: The Raspberry Pi and DDEV logos
categories:
  - Announcements
---

DDEV supports the ARM64 architecture on Linux, macOS (Apple Silicon), and Windows WSL2. Since I don’t have a big machine to test with, I got the ARM64-based Raspberry Pi 4 instead, and it’s actually worked out far better than I expected. It was a great way to have an ARM64 machine available for testing whenever needed during the development process, but it turns out some people might want to use a Pi as their desktop web development machine. All of the features of DDEV work out of the box.

This Raspberry Pi 4 is running Ubuntu, and it's great.

Installation on the Raspberry Pi is the same standard Linux procedure as on any other machine: install Docker as described in the [Docker Installation docs](https://docs.ddev.com/en/stable/users/install/docker-installation/#docker-installation-linux), then install DDEV as described in the [DDEV Installation docs](https://docs.ddev.com/en/stable/users/install/ddev-installation/#linux). After that, use `ddev config` in a project and `ddev start` and `ddev launch`!

I found that with a standard setup, DDEV on the Raspberry Pi 4 was able to do everything it’s supposed to do, and with better performance than expected. It would certainly be possible to add faster disk or an SSD to it and make things even better. If you need a super-low-cost development environment, want to see what ARM64 is all about, or want to do new cool things with the Pi, here’s your chance!
