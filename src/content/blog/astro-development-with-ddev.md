---
title: "Astro development with DDEV"
pubDate: 2023-10-17
# modifiedDate: 2023-07-23
summary: How to run Astro, Vite and other npm packages with DDEV
author: Bernardo Martinez
featureImage:
    src: /img/blog/2023/10/astroonddev.png
    alt: Astro image
categories:
  - Guides
  - DevOps
---

Some projects might require you to add front-end tooling. Or the whole project might be based around client-side frameworks. DDEV provides an npm command out of the box, simplifying Docker development. I will be using this website as an example.

DDEV.com is an [Astro](https://astro.build/) website. Astro is fantastic tool that packed with features that provide a low-entry barrier for developers looking to contribute features, issues and more. Among it's highlights are its low hosting cost, file-based routing, and extensive Markdown support.

That said, for a while this website did not use DDEV. Adding DDEV makes it easier for those with the tool to contribute PRs, but also provides an example on how other projects can take advantage of it.

As of this article, there are two ways to setup your local development on DDEV.com. With DDEV and without DDEV. Whichever is easier and more convenient for you.

This guide will highlight what was required to add DDEV to an Astro project. It's meant to provide you with some background as well as tips along the way. That said, feel free to look at this [website](https://github.com/ddev/ddev.com/blob/main/.ddev/config.yaml) config first and reverse engineer your approach if that's easier.

It's worth mentioning Astro uses Vite as its bundler so these steps would be very similar for any projects that might use Vite.

The instructions below assume you have DDEV and Docker installed and globally available.

## 1. Run `ddev config`

For the purposes of ddev.com the project name could be left as the default as that will inherit the name of the folder ddev is in.

Astro by default saves it builds on the dist directory so our docroot/web folder was set to dist. This will allow you to browse the build on the default https://<projectname>.ddev.site URL.

DDEV currently uses the PHP project type as the custom catch-it-all. So for anything that does not fit inside the other CMSs PHP can be chosen.

## 1. Vite in DDEV

There are a couple of ways one could run Vite in DDEV.
In fact, there are a couple of contributed plugins that help with this though they tend to assume you are running Vite in its stock configuration.

After looking at the Discord Support queue and testing a variety of contributed plugins I came across a few tips that could help regardless of the bundler/tool, but specific to Vite in this case.


1. Make sure Vite is running and listening in all interfaces. By default, it does http://localhost:4321/ in astro or http://localhost:3000/ if vanilla Vite is run. By running it with the `npm run dev -- --host` one can expose it to the host. Note: Don't forget the extra `--` is not a typo though it's kind of unique.

2. Additionally one has to add the following on the astro.config.mjs or in the vite config file. Inside export default defineConfig make sure to add.
    ```
    vite: {
      server: {
        host: true, // leave this unchanged for DDEV!
    }},
    
    ```
    That exposes Vite dev server to Docker. It's the equivalent of '0.0.0.0'

3. Let DDEV know which port to listen to.
    ```
    web_extra_exposed_ports:
    - name: astro-dev
      container_port: 4321
      http_port: 4322
      https_port: 4321

    ```
    The code above allows DDEV to map port 4321 to the container `DDEV describe` providing additional info.

## Extra info


1. As a reminder, avoid creating conflicts on local setups without DDEV. If one adds DDEV to a project it should still be easy for those that don't use it to compile the project without conflicts. One way to avoid it is to allow Astro Vite to run on its default port, Vite will use a different port if the default is busy. However, if I pinned the port to 4321 that won't happen. In other words, don't pin the port.


2. It can be tiresome to type `npm run dev -- --host` all the time. Hence, I added a daemon that runs it.

    ```
    web_extra_daemons:
      - name: astro-dev-daemon
        command: "npm run dev -- --host"
        directory: /var/www/html

    ```

    The daemon allows us to reach https://<projectname>.DDEV.site:4321 and have HMR (Hot module reloading) among other features.

3. As I was looking for ways to fix my bad gateway and 404 error messages. I remember a project that used [DDEV and Storybook](https://github.com/cosmicdreams/drupal-storybook/blob/main/.DDEV/config.yaml). It did not help much with my Vite issue but it inspired the Notice on the config.yml.

4. if you see an error like EPERM: Operation not permitted it might be because of a file system issue. Make sure Mutagen or other alternatives are working correctly. 

## In Summary:

1. Make sure Vite or any other tool is listening on all interfaces.
2. Find the default port for said tool and map it to DDEV config.yml file. 
  (Astro Vite is 4231 and Vite is 3000, so it could be different for you.)
3. Use DDEV logs --follow --time to debug issues.
4. Add a daemon to have a dev server on demand.
5. Look at the support queue of the tool and DDEV for other tips and tricks.
6. Feel free to look at this [website](https://github.com/ddev/ddev.com/blob/main/.ddev/config.yaml) config first and reverse engineer your approach if that's easier.


## Keep in touch!

  Join us in [Discord](https://discord.gg/hCZFfAMc5k) or [open an issue](https://github.com/DDEV/DDEV/issues) or send [an email](mailto:support%40DDEV.com) if you have success (or failure 😀).
