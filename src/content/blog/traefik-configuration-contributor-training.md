---
title: "Contributor Training: Traefik Configuration"
pubDate: 2024-07-08
# modifiedDate: 2024-07-23
summary: Traefik Custom Configuration for DDEV
author: Randy Fay
featureImage:
  src: /img/blog/2024/07/traefik.logo.png
  alt: Traefik Configuration for DDEV
categories:
  - Training
  - Guides
---

DDEV's **router** is the system component that accepts HTTP and HTTPS requests and gets them to the right webserver or other server component. It's the reason that all your DDEV projects can use the default ports 80 and 443, and it's also where TLS/SSL is terminated so HTTPS works so nicely with DDEV, and you can use "real" URLs like `https://example.ddev.site` without adding an ugly port for every different project, and without clicking around browser warnings about insecure sites.

Here's our June 19, 2024 [Contributor Training](/blog/category/training) on how the Traefik router works in DDEV:

<iframe width="560" height="315" src="https://www.youtube.com/embed/9f9Zbze7VP8?si=D9hywble6WqdqVa5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## What is Traefik and the `ddev-router`?

Today's `ddev-router` is based on the very popular upstream open-source [Traefik Proxy](https://traefik.io/traefik/). Only a single router runs to route to all of your DDEV projects that are running at any given time. (The older `nginx-proxy` version of `ddev-router` has been deprecated and will be removed in DDEV v1.24.)

The router's basic jobs are 
* to accept incoming HTTP and HTTPS traffic and route it to where it will be handled. (In DDEV this is done via the hostname.)
* to terminate TLS/SSL for HTTPS traffic. This is normally done via the local development `mkcert` certificate authority (CA) but DDEV also supports custom certificates and Let's Encrypt.

## Configuration Components

One of the great things about Traefik is its excellent community and [configuration documentation](https://doc.traefik.io/traefik/getting-started/configuration-overview/).

The components of the configuration are:

* **Static configuration**: This is the basic configuration that the Traefik process runs with at startup, and it can only by changed by restarting `ddev-router`, typically with a `ddev poweroff` and `ddev start`. Static configuration includes things like logging levels, plugins, and Let's Encrypt configuration. It's rarely changed by DDEV users.
* 
* , routers, middlewares, services

## "File" configuration, not "Docker" configuration

## Graphical rep

Graphical representation at http://127.0.0.1:10999


## Experimenting with configuration

Experimentation is easier to do inside the container, editing /mnt/ddev-global-cache/traefik/config

## Example: http→https redirection middleware

## Casual Hosting

- What is Let’s Encrypt?
- DNS must be pointed properly
- Provisional instructions: https://ddev--6317.org.readthedocs.build/en/6317/users/topics/hosting/
- Debugging with `docker logs -f ddev-router`
- Removing the acme.json file
- Setting caServer to Staging if rate limited

## Contributions welcome!

Your suggestions to improve this blog are welcome. You can do a PR to this blog adding your techniques. Info and a training session on how to do a PR to anything in ddev.com is at [DDEV Website For Contributors](ddev-website-for-contributors.md).

Join us for the next [DDEV Live Contributor Training](contributor-training.md). Sign up at [DDEV Live Events Meetup](https://www.meetup.com/ddev-events/events/).
