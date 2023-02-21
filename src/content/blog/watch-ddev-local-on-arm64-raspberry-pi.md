---
title: "Watch: DDEV-Local on ARM64 Raspberry Pi"
pubDate: 2020-11-23
summary: Video overview of running DDEV on a Raspberry Pi.
author: Randy Fay
featureImage:
  src: /img/blog/2020/11/screen-shot-2020-11-22-at-12.38.30-pm.png
  alt: Screen grab of video’s title frame
  hide: true
categories:
  - Announcements
  - Videos
---

<div class="video-container">
<iframe loading="lazy" title="DDEV installation on ARM64 Raspberry Pi with Ubuntu 20.10" width="500" height="281" src="https://www.youtube.com/embed/w3XV64hBeFU?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
</div>

[DDEV-Local v1.16](https://github.com/ddev/ddev) now supports the ARM64 architecture on Linux and Windows WSL2. You can read all about ARM64 and what it means to the world (and to DDEV) in the previous blog on [ARM64, Apple Silicon, and Apple’s M1 chip](https://ddev.com/ddev-local/arm64-apple-silicon-m1-ddev-local-what-does-it-all-mean/). Since I don’t have a big machine to test with, I got the ARM64-based Raspberry Pi 4 instead, and it’s actually worked out far better than I expected. It was a great way to have an ARM64 machine available for testing whenever needed during the development process… but it turns out some people might want to use a Pi as their desktop web development machine. All of features of DDEV-Local work out of the box.

On this Raspberry Pi 4 I have Ubuntu 20.10, which is the first Ubuntu version to explicitly support the Raspberry Pi. I’ve previously experimented with the [64-bit Debian-10-based Raspberry Pi OS](https://www.raspberrypi.org/forums/viewtopic.php?t=275370), and it worked as expected as well, although Debian 10 doesn’t have versions of Docker and docker-compose that are as recent as I’d like.

Installing DDEV-Local is pretty easy and mostly just exactly what’s laid out in the Linux [Docker Installation Docs](https://ddev.readthedocs.io/en/stable/users/docker%5Finstallation/#linux-installation-docker-and-docker-compose) and the [DDEV installation docs](https://ddev.readthedocs.io/en/stable/#installationupgrade-script-linux-and-macos-armarm64-and-amd64-architectures).

1. Install [docker.io](http://docker.io) and docker-compose with `sudo apt-get update && sudo apt-get install -y docker.io docker-compose`
2. Add your user to the Docker group with `sudo usermod -aG docker $USER`. Note that on some machines or operating systems you may have to log out and log in again to see this take effect, but you can test it with just `id` to see if you’re in the Docker group, and if `docker ps` works without sudo, it’s working.
3. `sudo apt-get install libnss3-tools xdg-utils` : libnss3-tools helps mkcert to work with Firefox and Chromium, and xdg-utils is the secret sauce behind `ddev launch` on Linux.
4. Install DDEV [using the install script](https://ddev.readthedocs.io/en/stable/#installationupgrade-script-linux-and-macos-armarm64-and-amd64-architectures): `curl -LO https://raw.githubusercontent.com/ddev/ddev/master/scripts/install_ddev.sh && bash install_ddev.sh`
5. Use `ddev config` in a project and `ddev start` and `ddev launch`!

I found that with just standard setup, DDEV-Local on the Raspberry Pi 4 was able to do everything it’s supposed to do, and with better performance than expected. It would certainly be possible to add faster disk or an SSD to it and make things even better. So if you need a super-low-cost development environment, or just want to see what ARM64 is all about, or if you just want to do new cool things with the Pi, here’s your chance!
