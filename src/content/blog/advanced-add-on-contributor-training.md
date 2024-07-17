---
title: "Contributor Training: Advanced Add-On Techniques"
pubDate: 2024-07-23
# modifiedDate: 2024-07-23
summary: Advanced Add-On Techniques for Contributors
author: Randy Fay
#featureImage:
#  src: /img/blog/2024/07/traefik.logo.png
#  alt: Traefik Configuration for DDEV
categories:
  - Training
  - Guides
---



Here's our July 10, 2024 [Contributor Training](/blog/category/training) on Advanced DDEV Add-On Techniques:

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/DzFa6CiHxzs?si=cMMx19RcIwQm23gs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

Creating a DDEV Add-on is super easy, click a button on the [Add-on Template](https://github.com/ddev/ddev-addon-template) and you're off and running.

But a good add-on needs tests, and there are more sophisticated things you can do. We'll cover:


- Basics:
  - Creating an add-on
  - Altering web container behavior with a `docker-compose.*.yaml`
  - Creating a 3rd-party docker-compose service
- Customizing an add-on without "taking it over"
  - docker-compose.name_extra.yaml
  - config.name_extra.yaml
- Checking in Add-ons in .ddev
- Creating bats tests
- Debugging bats tests in GitHub Actions runs with tmate
- Interacting with users during install.yaml installs
- Checking required version of DDEV
- Yaml reading and usage (yaml_read_files)


## Resources

- Resources:
  - [DDEV docs](https://ddev.readthedocs.io/en/stable/users/extend/additional-services/) on add-ons
  - `docker-compose.*.yaml` [docs](https://ddev.readthedocs.io/en/stable/users/extend/custom-compose-files/)
  - ddev-addon-template [README](https://github.com/ddev/ddev-addon-template)
  - Learn by studying other add-ons. Official ones at `ddev get --list` and all at `ddev get --list --all`

## Contributions welcome!

Your suggestions to improve this blog are welcome. You can do a PR to this blog adding your techniques. Info and a training session on how to do a PR to anything in ddev.com is at [DDEV Website For Contributors](/blog/ddev-website-for-contributors/).

Join us for the next [DDEV Live Contributor Training](/blog/contributor-training/). Sign up at [DDEV Live Events Meetup](https://www.meetup.com/ddev-events/events/).
