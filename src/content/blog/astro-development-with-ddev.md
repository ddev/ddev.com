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

From time to time, you may need to add frontend tooling to a project or that might be the whole project.

DDev.com is an [Astro](https://astro.build/) website. Astro is fantastic tool that provides a low-entry barrier for developers looking to contribute features, issues and more. Among its benefits worth highlighting are its low hosting cost and ease of use for frontend devs.

That said, for a while the website lacked a ddev config to make it easy for those use to ddev and those looking for example to see what it would take to run such a project.

As of this article there are two ways to setup your local development. With DDev and without DDev. Whicheverone is easier and more covinient to you.

This guide will highlight what was required to add DDev to an Astro project. 

It's worth mentioning Astro uses Vite as is bundler so this steps would be very similar for Vite and may help with rollup among others.

The instructions below assume you have ddev and docker installed and globally avaliable.

## 1. Run `ddev config`

For the purposes of ddev.com the project name could be left as the default as that will inherit the name  of the folder ddev is in.

Astro by default saves it builds on the dist directory so our docroot location was set to dist. This will allow you to browse the build on the default https://<projectname>.ddev.site url.

DDev currently uses the PHP project type as the custom catch it all. So for anything that does not fit inside the other CMS's PHP can be chosen.

## 1. Vite in DDev

There are a couple of ways one could run Vite in docker.
In fact there are a couple of contributed plugins that help with this though they tend to assume you are running Vite in its stock configuration.

After looking at the Discord Support queue and testing a vareity of contributed plugins I came a cross a few tips that could help regardless of the bundler/tool but specific to Vite in this case.


1. Make sure Vite is running and listening in all interfaces. By default it does http://localhost:4321/ in astro or http://localhost:3000/ if vanilla Vite is run. By running it with the `npm run dev -- --host` one can't get it to display additional network addresses. Note: Don't forget the extra `--` is not a typo though its kind of unique.

2. Aditionally one has to add the following on the astro.config.mjs or in the vite config file. Inside export default defineConfig make sure to add.
    ```
    vite: {
      server: {
        host: true, // leave this unchanged for DDEV!
    }},
    
    ```
    That allows docker to reach into vite. It's the equivalent of '0.0.0.0'

2. Let DDev know which port to listen to.
    ```
    web_extra_exposed_ports:
    - name: astro-dev
      container_port: 4321
      http_port: 4322
      https_port: 4321

    ```
    The code above allows ddev to map port 4321 to the container `ddev describe` provides additional info.


3. Don't create conflicts npm without ddev. If one adds ddev to a project it should still be easy for those that don't have it to compile the project and compile it without it. One way to ensure this happens is to allow Astro Vite to run on its default port or swap it if is busy. I could have pinned the port to 4321 but that could generate conflicts.


4. Because it be nice to have astro dev running in the background. I added an daemon that runs `npm run dev -- --host`.

  ```
  web_extra_daemons:
    - name: astro-dev-deamon
      command: "npm run dev -- --host"
      directory: /var/www/html

  ```

  This makes it so once the container starts and all the npm packagesa are installed one can go to https://<projectname>.ddev.site:4321 and have HMR(Hot module reloading)
  among other features.



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
