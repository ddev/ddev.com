---
title: "DDEV-Local Web Container Customization in v1.8.0"
pubDate: 2019-06-03
author: Randy Fay
featuredImage: https://ddevdotcom.ddev.site/app/uploads/2019/05/Screen-Shot-2019-05-29-at-2.21.12-PM.png
categories:
  - DDEV
---

There’s never any end to the number of things you might need to do with the web container to make it “just right” for your project. In [DDEV-Local v1.8.0](https://github.com/drud/ddev/releases/tag/v1.8.0) you can do that much more easily than in the past. Here are a couple of examples of how you might make these modifications, and a screencast with a walkthrough:

**Simple: Add webimage\_extra\_packages to config.yaml**

If you need extra packages, just find out what they are (for Debian) and add them to your .ddev/config.yaml, like

`webimage_extra_packages: [php-yaml]`

(or use `ddev config --webimage-extra-packages=php-yaml`)

**Fancy and Unlimited: Build your own .ddev/web-build/Dockerfile**

For people with a need for more complex changes, copy the .ddev/web-build/Dockerfile.example to .ddev/web-build/Dockerfile and hack at it. Note that a Dockerfile overrides any `webimage_extra_packages` you may have added, as you’d want to take on all customization yourself. `ddev start` will remind you of this if you have both.

Thanks for your support for DDEV-Local, and we look forward to hearing what you do with these new capabilities. Please post your recipes on [Stack Overflow](https://stackoverflow.com/tags/ddev) tagged with “ddev.” Use the “question and answer” format where you answer your own question. Have fun!
