---
title: "DDEV on Intel... on Apple Silicon"
pubDate: 2023-08-23
modifiedDate: 2025-04-16
modifiedComment: "You can do these things without changing your whole Docker provider.<br><br>See [Solving Intel-only AMD64/X64 problems on macOS with Apple Silicon](/blog/amd64-with-rosetta-on-macos) for a more nuanced approach to solving platform problems like this."
summary: You can run your Docker system as Intel AMD64 on your Apple Silicon Mac
author: Randy Fay
featureImage:
  src: /img/blog/2023/08/intel-on-apple.png
  alt: Intel and Apple on Apple Silicon
categories:
  - Guides
---

## Introduction: Mixed Architectures with Poor Support

From time to time, Apple Silicon DDEV users encounter an image or a Node.js package that is not available for the Mac's native architecture (variously called ARM64 or `aarch64`). These result in errors like: "Could not open '/lib64/ld-linux-x86-64.so.2': No such file or directory" or "the chromium binary is not available for ARM64".

Emulation of Docker images has been pretty scary and unreliable since the Apple Silicon macs came out, but there is some hope.

To be clear: If you do not absolutely have to have a project that can run AMD64 Docker images or applications, don't do any of this. I always recommend running native ARM64 Docker images and applications on Apple Silicon Macs. Your life will be bettter.

But if you have to run something like the `puppeteer` or `node-sass` Node.js packages, which are only available for AMD64, you might be able to do it. I'm going to show three ways that might work for you. You may have to try all of them, and I'll be really interested in your results.

## Prerequisite: Enable Rosetta

To use these techniques, you _must_ enable Apple's virtualization layer, Rosetta. Their [tech article](https://support.apple.com/en-us/102527) explains how. It's easy.

## 1. Use [OrbStack](https://orbstack.dev) with the `DOCKER_DEFAULT_PLATFORM=linux/amd64`

OrbStack is a great Docker provider; super lightweight and performant, and it does [nice emulation](https://docs.orbstack.dev/docker/#intel-x86-emulation) using your Mac's Rosetta system. Enable "Use Rosetta to run Intel code" in the "system" section of OrbStack's settings.

```
ddev poweroff
docker rm -f $(docker ps -aq)
export DOCKER_DEFAULT_PLATFORM=linux/amd64
ddev start
```

In my case I had trouble with the traefik image and had to explicitly pull the `linux/amd64` version of it listed by `ddev version`. `docker pull --platform linux/amd64 ddev/ddev-traefik-router:v1.23.4` You would pull the image shown for `router` in `ddev version`.

This was the easiest to use and most performant of the options.

## 2. Use [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/) with the `DOCKER_DEFAULT_PLATFORM=linux/amd64`

This is about the same, but you have to toggle some non-default settings.

You **must** enable "Use Rosetta for `x86_64/amd64` emulation on Apple Silicon" in the "General" section of Docker Desktop's settings. This is well down the list of checkboxes, you have to scroll to get down there.

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
colima start amd64 --arch x86_64 --cpu 4 --memory 6 --disk 100 --dns=1.1.1.1
ddev start
```

This will start a new Colima profile with the AMD64 architecture. It does not affect an existing (default) Colima profile.

## Switching between Docker providers

You can actually have all these running at the same time, although it doesn't make any sense to do so. Each has a separate Docker context and you can switch between them using the `docker context` command. For example, `docker context use colima-amd64` will use the AMD64 Colima profile we created. `docker context use orbstack` will switch to OrbStack. And `docker context use desktop-linux` will switch to Docker Desktop. Use `docker context ls` to see what's set up on your system.

They won't be happy sharing ports though, so you'll want to change `router_http_port`, `router_https_port`, `mailpit_http_port`, and `mailpit_https_port` between the various providers (and between ARM64 and AMD64 instances).

## Keep in touch!

I'd love to hear your experience. Join us in [Discord](/s/discord) or [open an issue](https://github.com/ddev/ddev/issues) or send [an email](mailto:support%40ddev.com) if you have success (or failure 😀).
