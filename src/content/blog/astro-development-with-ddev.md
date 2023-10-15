---
title: "Astro development with DDEV"
pubDate: 2023-10-15
# modifiedDate: 2023-07-23
summary: Tips and Tricks to run Astro, Vite and other npm packages with DDev
author: Bernardo Martinez
featureImage:
    src: /img/blog/2023/08/intel-on-apple.png
    alt: Intel and Apple on Apple Silicon
categories:
  - Guides
---

From time to time, you may need to add frontend tooling to a project or the frontend tooling might be the project.

DDev.com is an [Astro](https://astro.build/) site, a fantastic tool that provides a low-entry barrier for developers looking to contribute features,issues and more.

This guide will highlight what was required to add DDev to an Astro project. It's worth adding Astro uses Vite as is bundler so this steps would be very similar for Vite and may help with rollup.

The instructions below assume you have ddev and docker installed and globally avaliable.

## 1. Run `ddev config`

For the purposes of ddev.com the project name could be left as the default though it was later change to astrosite to avoid future odd issues with the folder being name ddev.com.

Astro sets builds the projects on the dist directory so docroot location was set to dist.

Ddev currently uses PHP project type as the custom catch it all. So for anything that does not fit inside the other CMS's PHP can be chosen.



## 1. Run `ddev config`




From time to time, Apple Silicon DDEV users encounter an image or a Node.js package that is not available for the Mac's native architecture (variously called ARM64 or `aarch64`). These result in errors like: "Could not open '/lib64/ld-linux-x86-64.so.2': No such file or directory".

Emulation of Docker images has been pretty scary and unreliable since the Apple Silicon macs came out, but there is some hope. 

To be clear: If you do not absolutely have to have a project that can run AMD64 Docker images or applications, don't do any of this. I always recommend running native ARM64 Docker images and applications on Apple Silicon Macs. Your life will be bettter. 

But if you have to run something like the `puppeteer` or `node-sass` Node.js packages, which are only available for AMD64, you might be able to do it. I'm going to show three ways that might work for you. You may have to try all of them, and I'll be really interested in your results.

## 1. Use [OrbStack](https://orbstack.dev) with the `DOCKER_DEFAULT_PLATFORM=linux/amd64`

OrbStack is a great new Docker provider; super lightweight and performant, and it does [nice emulation](https://docs.orbstack.dev/docker/#intel-x86-emulation) using your Mac's Rosetta system. 

```
ddev poweroff
docker rm -f $(docker ps -aq)
export DOCKER_DEFAULT_PLATFORM=linux/amd64
ddev start
```

In my case I had trouble with the traefik image and had to explicitly pull the `linux/amd64` version of it listed by `ddev version`. `docker pull --platform linux/amd64 ddev/ddev-traefik-router:20230816_traefik_image` You would pull the image shown for `router` in `ddev version`.

This was the easiest to use and most performant of the options.

## 2. Use [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/) with the `DOCKER_DEFAULT_PLATFORM=linux/amd64`

This is about the same, but you have to toggle some non-default settings. 

First, in the Docker Desktop UI under "Features in Development", enable "Use Rosetta for `x86/amd64` emulation on Apple Silicon". Obviously you have to have Rosetta enabled for this to work, and Docker Desktop may impose other requirements. This probably only works on Ventura and higher.

Then:

```
ddev poweroff
docker rm -f $(docker ps -aq)
export DOCKER_DEFAULT_PLATFORM=linux/amd64
ddev start
```

## 3. Use [Colima](https://github.com/abiosoft/colima) with an AMD64 setting

```
ddev poweroff
colima stop
colima start amd64 --arch x86_64 --cpu 4 --memory 6 --disk 100 --vm-type=qemu --mount-type=sshfs --dns=1.1.1.1
ddev start
```

This will start a new Colima profile with the AMD64 architecture. It does not affect an existing (default) Colima profile.

## Switching between Docker providers

You can actually have all these running at the same time, although it doesn't make any sense to do so. Each has a separate Docker context and you can switch between them using the `docker context` command. For example, `docker context use colima-amd64` will use the AMD64 Colima profile we created. `docker context use orbstack` will switch to OrbStack. And `docker context use desktop-linux` will switch to Docker Desktop. Use `docker context ls` to see what's set up on your system.

## Keep in touch! 

I'd love to hear your experience. Join us in [Discord](https://discord.gg/hCZFfAMc5k) or [open an issue](https://github.com/ddev/ddev/issues) or send [an email](mailto:support%40ddev.com) if you have success (or failure 😀).
