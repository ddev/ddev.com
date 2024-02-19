---
title: "Astro development with DDEV"
pubDate: 2023-11-30
# modifiedDate: 2023-07-23
summary: How to run ddev.com locally using DDEV, Astro and Vite
author: Bernardo Martinez
featureImage:
    src: /img/blog/2023/10/astroonddev.png
    alt: Astro image
categories:
  - Guides
  - DevOps
---

[Astro](https://astro.build/) is a powerful web framework for content-driven websites and as of 2023 powers ddev.com. Among its features are island driven development, file-based routing, and extensive Markdown support. Astro relies on Vite as its bundler so these steps would be very similar for any Vite projects.

The instructions below assume you have [DDEV and Docker installed](https://ddev.readthedocs.io/en/latest/users/install/ddev-installation/).

## 1. Adding DDEV configuration

```
ddev config --project-type=php --doctroot=dist --create-doctroot
```

## 2. Vite in DDEV

### 1. Make sure Vite is running and listening in all interfaces. 
As of today, Vite does http://localhost:4321/ in astro or http://localhost:3000/ without astro.

```
npm run dev -- --host
```

Note: Don't forget the extra `--`. Otherwise you likely reach a death end.

### 2. Add the following on the astro.config.mjs or in the vite config file. 

Inside export default defineConfig add:

```
    vite: {
      server: {
        host: true, // leave this unchanged for DDEV!
    }},
```

That exposes Vite dev server to Docker. It's the equivalent of '0.0.0.0'

### 3. Let DDEV know which port to listen to.

On your DDEV config.yml add:

```
    web_extra_exposed_ports:
    - name: astro-dev
      container_port: 4321
      http_port: 4322
      https_port: 4321
```

The snippet above allows DDEV to expose port 4321 to the host Operating System.

## Extra info

1. It can be tiresome to type `npm run dev -- --host` all the time. Hence, I added a daemon that runs it.

    ```
    web_extra_daemons:
      - name: astro-dev-daemon
        command: "npm run dev -- --host"
        directory: /var/www/html

    ```

    The daemon allows us to reach https://<projectname>.DDEV.site:4321 and have HMR (Hot module reloading) among other features.

2. As I was looking for ways to fix my bad gateway and 404 error messages. I remember a project that used [DDEV and Storybook](https://github.com/cosmicdreams/drupal-storybook/blob/main/.DDEV/config.yaml). It didn't solve my Vite issue but it inspired the notice message.

3. if you see an error like EPERM: Operation not permitted. It might be because of a file system issue. Make sure Mutagen or other alternatives are working correctly.

## In Summary:

1. Make sure Vite or any other tool is listening on all interfaces.
2. Find the default port for said tool and map it to DDEV config.yml file.
  (Astro Vite is 4231 and Vite is 3000, so it could be different for you.)
3. Use DDEV logs --follow --time to debug issues.
4. Add a daemon to have a dev server on demand.
5. Look at the support queue of the tool and DDEV for other tips and tricks.
6. Feel free to look at this [website](https://github.com/ddev/ddev.com/blob/main/.ddev/config.yaml) config first and reverse engineer your approach if that's easier.


## Keep in touch!

  Join us in [Discord](https://discord.gg/hCZFfAMc5k) or [open an issue](https://github.com/DDEV/DDEV/issues).