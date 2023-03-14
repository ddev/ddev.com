---
title: "Why use DDEV instead of rolling your own Docker-based local dev solution?"
pubDate: 2022-12-22
summary: The benefits of using DDEV instead of a custom Docker setup for local development.
author: Randy Fay
featureImage:
  src: /img/blog/2020/12/ddevdocker.png
  alt: DDEV and Docker logos side by side, with the words “and/or” between them
  shadow: true
categories:
  - DevOps
---

If you know something about Docker, you know that you can throw one or two Docker images together and get yourself a working local development environment. There are plenty of nginx and PHP images out there on [hub.docker.com](https://hub.docker.com), and you can do lots and lots of things with them. So why use [DDEV](https://ddev.readthedocs.io), a tool that runs on Docker, when you could just roll your own Docker solution for local development? I’ll try to make a comparison. Of course I’m biased in favor of DDEV.

### **Custom Docker or docker-compose solution:**

- You have complete control and can customize as much as you want to.
- You do all the development and you do it your way.
- You do all the support to handle your team’s problems and needs.
- You get to determine what features you’ll work on.
- You can potentially make the configuration match your deployment environment more exactly than an off-the-shelf product like DDEV.

### **DDEV:**

- [Open-source project](https://github.com/ddev/ddev) with no vendor lock-in.
- Has already undergone more than 6 years of development, adding requested features and collaborating with community contributors. [Sponsor DDEV on GitHub!](https://github.com/sponsors/rfay)
- Explicit support for [many CMS types](https://ddev.readthedocs.io/en/stable/users/cli-usage/#quickstart-guides), including Drupal, Backdrop, TYPO3, Magento, Laravel, WordPress, Shopware and generic PHP or non-PHP projects. DDEV will set up beginning settings files for you so you’re set up in moments, but you can [turn feature that off](https://ddev.com/ddev-local/controlling-cms-settings-files-in-ddev-local/) when you don’t need it.
- Support for nearly all versions of both MySQL and MariaDB.
- Support for macOS, Windows, WSL2, Linux, both AMD64 and ARM64 architectures, great for diverse teams.
- Out-of-the-box support for both Nginx and Apache and PHP 5.6-8.2.
- Trusted HTTPS for every project.
- Import, export, and snapshot databases.
- Run or start as many projects as you want to, all at the same time, depending on the resources you have available. Each project can have different PHP version, use apache instead of nginx, etc.
- ssh integration (ssh-agent bundled so you can use your keys inside the container for accessing hosts or private composer repositories.
- Composer support built into the web container and accessed with `ddev composer`.
- [Xdebug step-debugging](https://ddev.readthedocs.io/en/stable/users/step-debugging/#step-debugging-with-ddev-and-xdebug) out of the box. Just `ddev xdebug on` and go.

[![DDEV, PhpStorm and Xdebug video and blog post](/img/blog/2020/12/screen-shot-2020-12-28-at-12.49.31-pm.png)](/blog/ddev-local-phpstorm-and-xdebug-debugging)

- Integration with [Platform.sh](https://platform.sh), [Pantheon.io](https://ddev.readthedocs.io/en/stable/users/providers/pantheon/), Acquia Cloud.
- `ddev share` lets you show work in progress to anyone anywhere in the world.
- Respect for other tools and production environments: DDEV doesn’t reconfigure your computer or require exact versions of Docker, etc.
- Extensive customization available, including [maintained add-ons with automated tests](https://ddev.readthedocs.io/en/latest/users/extend/additional-services/).
- Custom commands based on shell scripts, that can be added as team needs grow.
- Outstanding open-source community with [support in many channels](https://ddev.readthedocs.io/en/stable/#support-and-user-contributed-documentation).
- **Team lead gets the day off**! This is perhaps the biggest of the many benefits of DDEV, and perhaps the most important. When you use a standardized, supported solution, your team leads don’t spend all their time helping everybody else keep the development environment going. It’s the same on every platform, project configurations get checked in, and mostly people just work on things instead of spending their time keeping the environment going (or extending it).

There are significant benefits of building and maintaining your own Docker-based dev environment, but I think you’ll have more free time with DDEV!

Read the [DDEV documentation](https://ddev.readthedocs.io/en/stable/) to get started.
