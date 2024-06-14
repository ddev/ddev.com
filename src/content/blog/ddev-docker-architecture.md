---
title: "DDEV Docker Architecture"
pubDate: 2024-06-13
# modifiedDate: 2024-04-23
summary: DDEV's Docker Architure
author: Randy Fay
featureImage:
  src: /img/blog/2024/06/blue-whale-building-a-building.png
  alt: Blue whale using legos to build a building
  credit: 'ChatGPT: a banner image that shows a blue whale like the Docker whale using building blocks to build a large building.'
categories:
  - Guides
---

At the simple level, DDEV is just a wrapper on Docker and `docker-compose`. Here's our [Contributor Training](contributor-training.md) explaining how we use Docker in DDEV, including the Docker images and containers and how they're related.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ee1YFvATQKw?si=2Fovta2MheJJdG-T" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>



- What is an image? What is a container?
- Image construction, layers, and putting all in one layer again
- Use docs diagram
- Basic images
    - ddev-webserver
    - ddev-php-base
    - ddev-dbserver (so many flavors)
    - ddev-router
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
