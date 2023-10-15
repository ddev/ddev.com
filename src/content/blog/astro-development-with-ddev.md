---
title: "Astro development with DDEV"
pubDate: 2023-10-17
# modifiedDate: 2023-07-23
summary: How to run Astro, Vite and other npm packages with DDev
author: Bernardo Martinez
featureImage:
    src: /img/blog/2023/10/astroonddev.png
    alt: Astro image
categories:
  - Guides
  - DevOps
---

From time to time, you may need to add frontend tooling to a project or that might be the whole project.

DDev.com is an [Astro](https://astro.build/) website. Astro is fantastic tool that provides a low-entry barrier for developers looking to contribute features, issues and more. Among its benefits are its low hosting cost and ease of use for frontend devs.

That said, for a while the website did not use DDev. Adding DDev provides an example for those looking to add DDev to such projects and it makes easier for those using it to contribute.

As of this article there are two ways to setup your local development on ddev.com. With DDev and without DDev. Whichever is easier and more covinient to you.

This guide will highlight what was required to add DDev to an Astro project. 

It's worth mentioning Astro uses Vite as is bundler so this steps would be very similar for Vite and may help with rollup among others.

The instructions below assume you have ddev and Docker installed and globally avaliable.

## 1. Run `ddev config`

For the purposes of ddev.com the project name could be left as the default as that will inherit the name  of the folder ddev is in.

Astro by default saves it builds on the dist directory so our docroot location was set to dist. This will allow you to browse the build on the default https://<projectname>.ddev.site URL.

DDev currently uses the PHP project type as the custom catch it all. So for anything that does not fit inside the other CMSs PHP can be chosen.

## 1. Vite in DDev

There are a couple of ways one could run Vite in DDev.
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

3. Let DDev know which port to listen to.
    ```
    web_extra_exposed_ports:
    - name: astro-dev
      container_port: 4321
      http_port: 4322
      https_port: 4321

    ```
    The code above allows ddev to map port 4321 to the container `ddev describe` provides additional info.


## Extra info 


1. As a reminder, avoid creating conflicts on local setups without DDev. If one adds DDev to a project it should still be easy for those that don't use it to compile the project without conflicts. One way to avoid it, is to allow Astro Vite to run on its default port, Vite will use a different port if the default is busy. However if I pinned the port to 4321 that won't happen. In other words, don't pin the port. 


2. Because it can be tiresome to type `npm run dev -- --host`. I added a daemon that runs it.

    ```
    web_extra_daemons:
      - name: astro-dev-daemon
        command: "npm run dev -- --host"
        directory: /var/www/html

    ```

    The daemon allows us to reach https://<projectname>.ddev.site:4321 and have HMR(Hot module reloading) among other features. At any point in time.

3. As I was looking for ways to fix my bad gateway and 404 error messages. I remember a project that used [DDev and Storybook](https://github.com/cosmicdreams/drupal-storybook/blob/main/.ddev/config.yaml). It did not help much with my Vite issue but it inspired the Notice on the config.yml.

## In Summary:

1. Make sure Vite or any other tool is listening on all interfaces.
2. Find the default port for said tool and map it to DDev config.yml file. 
  (Astro Vite is 4231 and Vite is 3000, so it could be different for you.)
3. Use ddev logs --follow --time to debug issues.
4. Add a daemon to have a dev server on demand.
5. Look at the support queue of the tool and ddev for other tips and tricks.


## Keep in touch! 

  Join us in [Discord](https://discord.gg/hCZFfAMc5k) or [open an issue](https://github.com/ddev/ddev/issues) or send [an email](mailto:support%40ddev.com) if you have success (or failure 😀).
