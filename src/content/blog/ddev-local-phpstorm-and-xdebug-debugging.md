---
title: "Watch: DDEV, PhpStorm, and Xdebug Debugging"
pubDate: 2020-08-27
author: Randy Fay
summary: Video walkthrough of debugging with PhpStorm and Xdebug.
featureImage:
  src: /img/blog/2020/08/screen-shot-2020-08-04-at-5.27.30-pm-1.png
  alt: Still from video title matching this post, with the subtitle “No fiddling. No configuration. No php.ini”
  hide: true
categories:
  - Guides
  - Videos
---

<div class="video-container">
<iframe loading="lazy" title="DDEV, PhpStorm and Xdebug Debugging" width="500" height="281" src="https://www.youtube.com/embed/tvqwkymg6fE?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
</div>

The days of print-debugging are long behind us! [Xdebug](https://xdebug.org/) and PHP IDEs have made that approach unwieldy, but often the configuration between your IDE, PHP, web server, and Docker is challenging and fragile. Enter our open source local development environment, [DDEV](https://github.com/ddev/ddev).

The combination of [PhpStorm](https://www.jetbrains.com/phpstorm/) and [DDEV](https://ddev.com/ddev-local/)‘s plug-and-play approach to debugging makes those configuration struggles obsolete. You can easily get a working debug environment in just a few minutes! We’ll walk you through it in this screencast using macOS. It works exactly the same on Windows or Linux, and with [WSL2 as well](https://ddev.com/ddev-local/ddev-local-and-phpstorm-debugging-with-wsl2/). After all, we want you to be successful with the tools and [workflows](https://ddev.com/ddev-live/a-git-based-workflow-from-dev-to-deploy/) you know and love.

## Debugging in your local development environment

What we’re doing in this tutorial:

- [Installing DDEV](https://ddev.readthedocs.io/en/stable/#homebrewlinuxbrew-macoslinux)
- Installing PhpStorm (we use Homebrew here, but you can install it with a download)
- Setting a breakpoint
- Telling PhpStorm to listen for Xdebug
- Enabling DDEV Xdebug with `ddev xdebug on`
- Visiting a page
- Configuring the initial popup that makes a “server” or file mapping for us

**Outline:**

- Overview ([0:51](https://youtu.be/tvqwkymg6fE?t=51))
- Installing DDEV ([0:59](https://youtu.be/tvqwkymg6fE?t=59))
- Installing PhpStorm ([1:40](https://youtu.be/tvqwkymg6fE?t=100))
- Creating a PhpStorm project and setting a breakpoint ([2:24](https://youtu.be/tvqwkymg6fE?t=144))
- Configure DDEV project ([3:18](https://youtu.be/tvqwkymg6fE?t=198))
- `ddev xdebug on` ([4:12](https://youtu.be/tvqwkymg6fE?t=252))
- Creating a PhpStorm “server” or “mapping” automatically ([5:14](https://youtu.be/tvqwkymg6fE?t=314))
- First breakpoint! ([5:42](https://youtu.be/tvqwkymg6fE?t=342))
- Command-line debugging ([8:00](https://youtu.be/tvqwkymg6fE?t=480))
- Resources ([9:58](https://www.youtube.com/watch?v=tvqwkymg6fE&t=598s))

**Resources for you:**

- DDEV documentation: <https://ddev.readthedocs.io>
- [DDEV Xdebug docs](https://ddev.readthedocs.io/en/stable/users/step-debugging/) (including troubleshooting)
- [Support docs](https://ddev.readthedocs.io/en/stable/#support-and-user-contributed-documentation): Drupal Slack and TYPO3 Slack #ddev, gitter #ddev, Stack Overflow, and the [DDEV issue queue](https://github.com/ddev/ddev/issues)
- [DDEV Project Repository](https://github.com/ddev/ddev)
- More about [PhpStorm on WSL2](https://ddev.com/ddev-local/ddev-local-and-phpstorm-debugging-with-wsl2/), with full details about how to run it
