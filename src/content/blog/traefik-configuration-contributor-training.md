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

DDEV's **router** is the system component that accepts HTTP and HTTPS requests and gets them to the right web server or other server component. It's the reason that all your DDEV projects can use the default ports 80 and 443, and it's also where TLS/SSL is terminated so HTTPS works so nicely with DDEV, and you can use "real" URLs like `https://example.ddev.site` without adding an ugly port for every different project, and without clicking around browser warnings about insecure sites.

Here's our June 19, 2024 [Contributor Training](/blog/category/training) on how the Traefik router works in DDEV:

<iframe width="560" height="315" src="https://www.youtube.com/embed/9f9Zbze7VP8?si=D9hywble6WqdqVa5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## What is Traefik and the `ddev-router`?

DDEV's `ddev-router` is based on the very popular open-source [Traefik Proxy](https://traefik.io/traefik/). Only a single router runs to route to all of your DDEV projects that are running at any given time. (The older `nginx-proxy` version of `ddev-router` has been deprecated and will be removed in DDEV v1.24.)

The router's basic jobs are

* to accept incoming HTTP and HTTPS traffic and route it to where it will be handled. (In DDEV this is done via the hostname.)
* to terminate TLS/SSL for HTTPS traffic. This is normally done via the local development `mkcert` certificate authority (CA) but DDEV also supports custom certificates and Let's Encrypt.

## Configuration Components

One of the great things about Traefik is its excellent community and [configuration documentation](https://doc.traefik.io/traefik/getting-started/configuration-overview/). DDEV uses this configuration as described in the [DDEV Traefik docs](https://ddev.readthedocs.io/en/stable/users/extend/traefik-router/).

The components of DDEV's Traefik configuration are:

* **Static configuration**

    This is the basic configuration that the Traefik process runs with at startup, and it can only by changed by restarting `ddev-router`, typically with a `ddev poweroff` and `ddev start`. Static configuration includes things like logging levels, plugins, and Let's Encrypt configuration. It's rarely changed by DDEV users. Static configuration is provided in the global DDEV directory, normally `~/.ddev/traefik/static_config.yaml` (or in DDEV v1.23.4+ in `~/.ddev/traefik/.static_config.yaml`).

* **Dynamic Configuration**

    Traefik's "dynamic configuration" is configuration whose changes is reflected immediately without a restart. In DDEV, a `ddev start` or `ddev restart` is still required for it to take effect, because the dynamic configuration has to be pushed into the `ddev-router` container before the Traefik process can "see" it.

    Dynamic configuration is automatically generated by DDEV and is stored in the project's `.ddev/traefik/config/<projectname>.yaml`, and typically includes a "router" and a "service".

    This is a simplified dynamic configuration for a project called "d10":

    ```yaml
    http:
      routers:
        d10-web-80-http:
          entrypoints:
            - http-80
          rule: HostRegexp(`d10.ddev.site`)
          service: "d10-web-80"
          tls: false

        d10-web-80-https:
          entrypoints:
            - http-443
          rule: HostRegexp(`d10.ddev.site`)
          service: "d10-web-80"
          tls: true
      services:
        d10-web-80:
          loadbalancer:
            servers:
              - url: http://ddev-d10-web:80
    ```

    It defines two routers (named "d10-web-80-http" and "d10-web-80-https"). One accepts HTTP traffic (without TLS) on port 80, and the other accepts HTTPS traffic on port 443. They both capture traffic with the same hostname, "d10.ddev.site", and they both deliver their traffic to the same back-end web server service (the `ddev-webserver`) at `http://ddev-d10-web:80`.

  * **Routers**

    Routers define where HTTP/S traffic is accepted from, and the TLS termination for HTTPS traffic. Then a "rule" defines whether the router should be used. or not. For example, a typical router might look like this:

    ```yaml
    http:
      routers:
        d10-web-80-http:
          entrypoints:
            - http-80
          rule: HostRegexp(`d10.ddev.site`)
          service: "d10-web-80"
          tls: false
    ```

    This router has the name `d10-web-80-http`; this is an arbitrary name, but must be unique.

    It listens to traffic coming in on the entrypoint named `http-80` (which is also an arbitrary and unique name, but in DDEV it's just "port 80 on ddev-router").

    It checks to see if the hostname in the URL is `d10.ddev.site`. If traffic comes in on `http-80` and has the hostname "d10.ddev.site" in the URL, then this router delivers the traffic to the service named "d10-web-80", which is also an arbitrary but unique name.

  * **Middlewares**

    Middlewares are content processors that can be invoked after traffic is accepted by a router and before it's delivered to a service. Multiple middlewares can be defined and added. By default, DDEV v1.23.4+ does not inject any middlewares, but they can be added with custom configuration.

    A classic middleware to add would be the built-in [redirectScheme](https://doc.traefik.io/traefik/middlewares/http/redirectscheme/) HTTP->HTTPS redirection, for example:

    ```yaml
    http:
      middlewares:
        redirectHttps:
          redirectScheme:
            scheme: https
            permanent: true
    ```

  * **Services**:

    Services define where traffic should be sent after it is captured by a router and optionally processed by a set of middlewares. The trivial service in the DDEV-generated dynamic configuration above demonstrates it.


## "File" provider configuration, not "Docker" provider configuration

Many non-DDEV uses of Traefik use the "Docker" provider, which can automatically listen to activity inside the Docker world. That feature enables a Traefik process to automatically listen to what's going on and automatically discover Docker services with particular tags on them. However, it means that the Traefik container must have the Docker socket mounted into it, which is a massive security concern. As a result, DDEV uses the *file* provider, and pushes the needed (generated) files into the `ddev-router` container for Traefik to use.

This means that some tutorials you may find which use the "Docker" provider will be misleading.

## Traefik Dashboard

DDEV provides the Traefik dashboard graphical representation at http://127.0.0.1:10999. This link is shown at the bottom of `ddev list`.

## Experimenting with dynamic configuration

When you're trying to understand how dynamic configuration works, it's handy to make changes interactively. I sometimes use two terminal windows, one where I run `docker exec -it ddev-router bash` and `cd config` to get into the dynamic configuration directory. In the other I run `docker logs -f ddev-router` to see the various things that traefik is trying to tell me. I can edit the configuration files to my heart's delight inside the container, and see everything that's happening in the logs. And when I'm done, a simple `ddev start` will replace any of my edits with the original files from my project.

## Casual Hosting

DDEV can be configured for ["casual hosting"](https://ddev.readthedocs.io/en/stable/users/topics/hosting/), meaning live-on-the-internet hosting of websites. It works fine, and people use it for staging sites, demonstrating current status to stakeholders, and even live hosting. I have been running a few small sites on a $20 Linode server for several years without trouble. But these sites do not have specific performance requirements and don't get a lot of traffic. Although "casual hosting" works fine, DDEV and its Docker images are designed for local development use, both from a performance and a security perspective, so your mileage may vary.

"Casual hosting" even encompasses using [Let's Encrypt](https://letsencrypt.org/) to get free "real" TLS/SSL certificates.

In DDEV v1.23.4+ Casual hosting will be possible using Traefik, but until that release it requires the deprecated nginx-proxy router. The new capabilities use Traefik features, and were just [pulled into DDEV HEAD recently](https://github.com/ddev/ddev/pull/6317).

## Contributions welcome!

Your suggestions to improve this blog are welcome. You can do a PR to this blog adding your techniques. Info and a training session on how to do a PR to anything in ddev.com is at [DDEV Website For Contributors](ddev-website-for-contributors.md).

Join us for the next [DDEV Live Contributor Training](contributor-training.md). Sign up at [DDEV Live Events Meetup](https://www.meetup.com/ddev-events/events/).