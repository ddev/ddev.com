---
title: "Fritz!box Routers and DDEV"
pubDate: 2025-11-20
#modifiedDate: 2025-09-22
summary: Solving DNS Rebinding issues with Fritz!box Routers
featureImage:
  src: /img/blog/2019/05/home-umami.png
  alt: Screenshot of a browser showing a DDEV project with a secure HTTPS connection
author: Randy Fay
#  credit: ''
categories:
  - TechNotes
---

DDEV is designed so that most people never have to change the configuration of their local workstation, and that includes not having to edit their `hosts` file. All the details are in [DNS Name Resolution and Wildcards](ddev-name-resolution-wildcards.md).

However, one particular brand of router, the Fritz!Box, has a different DNS configuration than most other routers, and it restricts the obscure vulnerability called DNS Rebinding.

**TL;DR:** _If you're using a Fritz!Box router, you'll allow "ddev.site" as an exclusion to the DNS Rebinding protection in your router's settings._

Resources:
* https://www.npostnik.de/allgemein/ddev-neues-modem-fritzbox-und-dns_probe_finished_nxdomain/
* https://docs.ddev.com/en/stable/users/usage/networking/#restrictive-dns-servers-especially-fritzbox-routers

Screenshots:
Use the images in public/img/blog/2025/11 - the first one goes as the featureImage and the second one with callouts goes inline.


## Keep in touch!

I'd love to hear your experience. Join us in [Discord](/s/discord) or [open an issue](https://github.com/ddev/ddev/issues) if you have success (or failure 😀). We're always trying to make DDEV better for you.
