---
title: "Astro development with DDEV"
pubDate: 2023-11-30
# modifiedDate: 2023-07-23
summary: How to run DDEV.com locally using DDEV, Astro and Vite
author: Bernardo Martinez
featureImage:
    src: /img/blog/2023/10/astroonddev.png
    alt: Astro image
categories:
  - Guides
  - DevOps
---

DDEV.com is an [Astro](https://astro.build/) website. Astro is fantastic static website tool that is packed with features that provides a low-entry barrier for developers looking to contribute features, issues and more. Among its highlights are its low hosting cost, file-based routing, and extensive Markdown support.

This guide will highlight what was required to add DDEV to an Astro project. Astro uses Vite as its bundler so these steps would be very similar for any Vite projects.

The instructions below assume you have DDEV and Docker installed and globally available.

## 1. Type

```
ddev config --project-type=php --doctroot=dist --create-doctroot
```

Astro by default saves it builds on the dist directory so our docroot/web folder was set to dist.

PHP is the general purpose project type.

## 2. Vite in DDEV

### 1. Make sure Vite is running and listening in all interfaces. 
By default, it does http://localhost:4321/ in astro or http://localhost:3000/ without astro.

```
npm run dev -- --host
```

Note: Don't forget the extra `--`.

### 2. Add the following on the astro.config.mjs or in the vite config file. 

Inside export default defineConfig make sure to add.

```
    vite: {
      server: {
        host: true, // leave this unchanged for DDEV!
    }},
```

That exposes Vite dev server to Docker. It's the equivalent of '0.0.0.0'

### 3. Let DDEV know which port to listen to.

```

    web_extra_exposed_ports:
    - name: astro-dev
      container_port: 4321
      http_port: 4322
      https_port: 4321
```

The code above allows DDEV to map port 4321 to the container.

## Extra info


1. Avoid creating conflicts on local setups without DDEV. If one adds DDEV to a project it should still be easy for those that don't use it to compile the project without conflicts. One way to avoid it is to allow Astro Vite to run on its default port, Vite will use a different port if the default is busy. However, if I pinned the port to 4321 that won't happen. In other words, don't pin the port.


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
