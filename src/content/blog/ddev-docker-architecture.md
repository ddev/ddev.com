---
title: "DDEV Docker Architecture"
pubDate: 2024-06-17
# modifiedDate: 2024-06-23
summary: DDEV's Docker Architecture
author: Randy Fay
featureImage:
  src: /img/blog/2024/06/container-diagram.png
  alt: DDEV Container Architecture
categories:
  - Guides
---

At the simplest level, DDEV is a wrapper on Docker and `docker-compose`. Here's our [Contributor Training](contributor-training.md) explaining how we use Docker in DDEV, including the Docker images and containers and how they're related.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ee1YFvATQKw?si=2Fovta2MheJJdG-T" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## What is a Docker Image? What is a Docker Container?

The easiest way to think about a Docker image is as a recipe for a little running computer that will be running as a "container". Many containers can be built from one image. In the object-oriented world, an image might be a "class", and a container might be an "object" created from that class.

The easiest way to think about containers is as little mostly-isolated computers that run in the Docker world of a "real" computer. The Docker world has its own isolated networking and even isolated filesystems.

## How do we build Docker Images?

Docker images are built as layers, where each layer is a command in the context of the build. A Dockerfile is a set of commands like `RUN` or `ADD` that add these all together. 

DDEV's Docker builds typically squash all the layers together after they're built up, to make each image mostly one huge layer, hopefully resulting in a faster download at upgrade time.

## What are the basic DDEV images and containers?

DDEV's images and containers are all in the [containers](https://github.com/ddev/ddev/tree/master/containers) directory:

* **[`ddev-webserver`](https://github.com/ddev/ddev/tree/master/containers/ddev-webserver)** which runs the webserver (`nginx` or `apache`), the `php-fpm`, and `mailpit`. It's also what most people customize or use when they're using `ddev exec`. As an image, `ddev-webserver` is a child of [`ddev-php-base`](https://github.com/ddev/ddev/tree/master/containers/ddev-php-base), which is not run directly as a container.
  * `ddev-webserver` is based on Debian 12 Bookworm, the current stable version of Debian. Keeping up with the latest Debian version means that we can support current technologies and packages.
  * Why is `ddev-webserver` so big? It's big! Since DDEV is a tool for local developers, the goal is always to make things work well for the developer. We always try to keep the size down, but it's a balancing act. For example, the webserver includes all locales, so that people all over the world in all locales can use it without alteration.
  * **Customization:** Each project can [customize the web image](https://ddev.readthedocs.io/en/stable/users/extend/customizing-images/) with `webimage_extra_packages` or `.ddev/web-build/Dockerfile.*`.
  * Why aren't `nginx`, `php-fpm`, `node`, and `mailpit` in separate containers? It's fairly common for each Docker container to run a single process, so it would not be unexpected for DDEV to have separate `nginx` and `php` containers (and it once did). However, it seemed better for users at one point in DDEV's history to combine them all in one container, and they're still there. We re-evaluate this from time to time.
* **[`ddev-dbserver`](https://github.com/ddev/ddev/tree/master/containers/ddev-dbserver)** runs the MySQL, MariaDB, or PostgreSQL daemons.
  * The MariaDB images are built on top of the official upstream Docker images.
  * The MySQL images have to be done quite differently, because MySQL has never provided ARM64 packages. So take a minute and [fry your brain](https://ddev.readthedocs.io/en/stable/developers/release-management/#maintaining-ddev-dbserver-mysql-57-and-80-arm64-images) with what we have to do to build MySQL 5.6 and 8.x images.
  * The PostgreSQL images are simpler.

* **[`ddev-router'](https://github.com/ddev/ddev/tree/master/containers/ddev-traefik-router)** is in charge of receiving HTTP requests and directing them to the right container in the right project. Because of the router, many projects can be running at one time and can be using the same ports, but the router will distribute requests correctly to them.
  * The current standard router is based on [Traefik Proxy](https://traefik.io/traefik/), a widely adopted, well-documented reverse proxy.
  * You can do [extensive modifications](https://ddev.readthedocs.io/en/stable/users/extend/traefik-router/#traefik-configuration) to the Traefik router.
  * For years, we used the now-deprecated `nginx-proxy` router. It is still available, but will be removed in DDEV v1.24.

- ddev-webserver
    - Based on Debian 12 Bookworm
    - Why is ddev-webserver so big?
    - Additional layers added at `ddev start` to customize for the user.
        - .ddev/web-build/Dockerfile.*
        - .ddev/web-build/pre-Dockerfile.*
        - docs link
    - Why don’t we have separate containers for nginx/php/mailpit/node.js?
- ddev-dbserver
    - Mariadb images are based on the upstream mariadb official images
    - MySQL images are sometimes based on official mysql images
        - They have no arm64
            - Use Ubuntu for mysql:8.0
            - Build xtrabackup ourselves (docs link)
            - Build our own images
        - Possible future with bitnami/mysql
    - Additional layers can be added with .ddev/db-build/Dockerfile.*
- ddev-router
    - Just traefik with an extra layer
    - Older nginx-proxy still available, but very old

## Contributions welcome!

When you try this out in your own environment, you'll certainly have suggestions to improve it. Please do a PR to this blog adding your techniques. Info and a training session on how to do a PR to anything in ddev.com is at [DDEV Website For Contributors](ddev-website-for-contributors.md).

And join us for the next [DDEV Live Contributor Training](contributor-training.md). Sign up at [DDEV Live Events Meetup](https://www.meetup.com/ddev-events/events/).
