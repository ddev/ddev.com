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

* **[`ddev-web server`](https://github.com/ddev/ddev/tree/master/containers/ddev-webserver)** which runs the web server (`nginx` or `apache`), the `php-fpm`, and `mailpit`. It's also what most people customize or use when they're using `ddev exec`. As an image, `ddev-webserver` is a child of [`ddev-php-base`](https://github.com/ddev/ddev/tree/master/containers/ddev-php-base), which is not run directly as a container.
  * `ddev-webserver` is based on Debian 12 Bookworm, the current stable version of Debian. Keeping up with the latest Debian version means that we can support current technologies and packages.
  * Why is `ddev-webserver` so big? It's big! Since DDEV is a tool for local developers, the goal is always to make things work well for the developer. We always try to keep the size down, but it's a balancing act. For example, the web server includes all locales, so that people all over the world in all locales can use it without alteration.
  * **Customization:** Each project can [customize the web image](https://ddev.readthedocs.io/en/stable/users/extend/customizing-images/) with `webimage_extra_packages` or `.ddev/web-build/Dockerfile.*`.
  * Why aren't `nginx`, `php-fpm`, `node`, and `mailpit` in separate containers? It's fairly common for each Docker container to run a single process, so it would not be unexpected for DDEV to have separate `nginx` and `php` containers (and it once did). However, it seemed better for users at one point in DDEV's history to combine them all in one container, and they're still there. We re-evaluate this from time to time.
* **[`ddev-dbserver`](https://github.com/ddev/ddev/tree/master/containers/ddev-dbserver)** runs the MySQL, MariaDB, or PostgreSQL daemons.
  * The MariaDB images are built on top of the official upstream Docker images.
  * The MySQL images have to be done quite differently, because MySQL has never provided ARM64 packages. So take a minute and [fry your brain](https://ddev.readthedocs.io/en/stable/developers/release-management/#maintaining-ddev-dbserver-mysql-57-and-80-arm64-images) with what we have to do to build MySQL 5.6 and 8.x images. We do hope to use the `bitnami/mysql` upstream images in the future since they recently started supporting ARM64.
  * The PostgreSQL images are simpler.

* **[`ddev-router'](https://github.com/ddev/ddev/tree/master/containers/ddev-traefik-router)** is in charge of receiving HTTP requests and directing them to the right container in the right project. Because of the router, many projects can be running at one time and can be using the same ports, but the router will distribute requests correctly to them.
  * The current standard router is based on [Traefik Proxy](https://traefik.io/traefik/), a widely adopted, well-documented reverse proxy.
  * It's possible to do [extensive modifications](https://ddev.readthedocs.io/en/stable/users/extend/traefik-router/#traefik-configuration) to the Traefik router.
  * You can add environment variables or other overrides to a `~/.ddev/router-compose.*.yaml`.
  * The now-deprecated `nginx-proxy` router is still available, but will be removed in DDEV v1.24.

## Project-level customizations of the main images

Every project's `ddev-webserver` and `ddev-dbserver` get at least some customizations for the project and the user, even if you don't use `webimage_extra_packages` or a `.ddev/web-build/Dockerfile.*`. For example, a Linux user with the same name and user ID is built into the image, composer is updated, and `corepack` is enabled if configured to be enabled.

And of course additional Debian packages can be added easily with `webimage_extra_packages` and more extensive configuration can be done with `.ddev/web-build/Dockerfile.*`. You can even add [`pecl` extensions](https://ddev.readthedocs.io/en/stable/users/extend/customizing-images/#pecl-php-extensions-not-supported-by-debsuryorg) or anything else that you could add to a Debian system.

## Maintaining and updating DDEV Docker images

DDEV's images are built-in standard ways with a full `make` and Dockerfile setup. They can be built locally for experimentation, but normally we push them with a [standardized GitHub Actions workflow](https://ddev.readthedocs.io/en/stable/developers/release-management/#pushing-docker-images-with-the-github-actions-workflow)

If you build your own `ddev-webserver` for example, you can build it with local changes using `cd containers/ddev-webserver && make VERSION=someversion` and then update the [versionconstants.go webtag](https://github.com/ddev/ddev/blob/master/pkg/versionconstants/versionconstants.go#L14) to refer to `someversion`.

## Contributions welcome!

Your suggestions to improve this blog are welcome. You can do a PR to this blog adding your techniques. Info and a training session on how to do a PR to anything in ddev.com is at [DDEV Website For Contributors](ddev-website-for-contributors.md).

And join us for the next [DDEV Live Contributor Training](contributor-training.md). Sign up at [DDEV Live Events Meetup](https://www.meetup.com/ddev-events/events/).
