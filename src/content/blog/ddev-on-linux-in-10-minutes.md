---
title: "DDEV on Linux in 10 Minutes"
pubDate: 2025-10-06
#modifiedDate: 2025-06-09
summary: DDEV works great on Linux, we'll set it up from scratch in just 10 minutes..
author: Randy Fay
featureImage:
  src: /img/blog/2025/10/banner-ddev-10-minutes-linux.svg
  srcDark: /img/blog/2025/10/banner-ddev-10-minutes-linux-dark.svg
  alt: DDEV on Linux in 10 Minutes
categories:
  - DevOps
  - Videos
---

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/14JvCVbn1qs?si=uxr_xUmpi6I3u7ks" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

_This screencast walks you through setting up a complete DDEV development environment on Linux, starting completely from scratch. Whether you're new to DDEV or local development environments in general, this step-by-step guide will get you up and running quickly._

## Video Outline

**Here's the video table of contents (opens on YouTube):**

- Introduction ([0:00](https://youtu.be/14JvCVbn1qs?t=0))
- Install Docker CE ([0:30](https://youtu.be/14JvCVbn1qs?t=30))
- Docker Post-Installation ([1:47](https://youtu.be/14JvCVbn1qs?t=107))
- Install DDEV ([2:34](https://youtu.be/14JvCVbn1qs?t=154))
- Configure HTTPS Certificates ([3:20](https://youtu.be/14JvCVbn1qs?t=200))
- Create Project ([3:45](https://youtu.be/14JvCVbn1qs?t=225))
- Project Startup ([5:00](https://youtu.be/14JvCVbn1qs?t=300))
- Launch Project ([6:52](https://youtu.be/14JvCVbn1qs?t=412))
- Install PhpStorm ([8:10](https://youtu.be/14JvCVbn1qs?t=490))
- Configure Xdebug ([10:56](https://youtu.be/14JvCVbn1qs?t=656))
- Test Step Debugging ([12:14](https://youtu.be/14JvCVbn1qs?t=734))
- Recap ([13:19](https://youtu.be/14JvCVbn1qs?t=799))

## What Happens in This Screencast

Here's what happens in this screencast. You can do it yourself in just a few minutes. We're using [DDEV's get-started](/get-started), but of course there is far more detail in the [DDEV docs](https://docs.ddev.com), explaining how to use other distros or other install techniques.

1. Install Docker CE. Use the `apt` repository technique from [Docker's docs](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository).
   - Do the post-install one-time action:

   ```bash
   sudo usermod -aG docker $USER
   ```

   - We could log out and log back in, but instead for now:

   ```bash
   newgrp docker
   ```

2. Install DDEV, using the `apt` repository technique from [get-started](/get-started).
   - `ddev --version` shows us being working fine with current stable.

3. One-time `mkcert -install` helps your browser trust DDEV's HTTPS certificates.
4. Check out a project. I used [rfay/d11](https://github.com/rfay/d11), a trivial demo Drupal 11 project. (DDEV's [quickstarts show many different project types](https://docs.ddev.com/en/stable/users/quickstart/) with quick startup.)
5. `ddev config` the project. Most of the time you can take the defaults. But most of use use a non-interactive command like `ddev config --project-type=drupal11 --docroot=web`.
6. `ddev start` the project. The first time on a new system you get the downloading of the Docker images.
7. `ddev composer install` for most projects
8. `ddev launch` and install with the web UI. On another project I might have used `ddev import-db` to load a database dump instead of doing an install.
9. `sudo snap install --classic phpstorm`
10. Open the project and set a breakpoint in `web/index.php`.
11. Click the "Listen for PHP Debug Connection" button in PhpStorm.
12. `ddev xdebug on`
13. Visit the site in the browser. PhpStorm wakes up and asks us to map the code from the host/workstation side to the mount point in the container. The default usually works.
14. Debug, step over, step in, view variables, etc.

## Key Things to Know

- **Use your own IDE, including VS Code:** I used PhpStorm here, but [VS Code works great](https://docs.ddev.com/en/stable/users/debugging-profiling/step-debugging/#ide-setup).
- **This demo used Ubuntu, but people use lots of distros:** The differences for major platforms are shown in the docs, but the ideas are all the same, and people use all of them, including other Debian/Ubuntu, Fedora, and Arch Linux distros.
- **Cross-Platform Compatibility:** DDEV works the same on macOS, Linux, Traditional Windows, and WSL2, see [Getting Started](/get-started). Your whole team can work on their preferred environment without friction. See [DDEV on Windows in 10 Minutes](watch-new-windows-installer.md) and [DDEV on macOS from Scratch](watch-ddev-local-from-scratch-with-macos.md).
- **Support for almost any PHP-based project and many Node.js environments** DDEV supports development of [so many different web environments](https://docs.ddev.com/en/stable/users/quickstart/), so you're not stuck with using separate tools for different CMSs.
- **More Extensive Docs**:
  - [DDEV Docs](https://docs.ddev.com)
  - [DDEV Quickstarts](https://docs.ddev.com/en/stable/users/quickstart/)
  - [DDEV Installation](https://docs.ddev.com/en/stable/users/install/)
  - [DDEV Configuration](https://docs.ddev.com/en/stable/users/configuration/config/)
  - [Step-Debugging](https://docs.ddev.com/en/stable/users/debugging-profiling/step-debugging/)
  - [DDEV FAQ](https://docs.ddev.com/en/stable/users/faq/)

- **Support the DDEV Project:** DDEV is fully open-source and free to use, and run by the nonprofit DDEV Foundation. We ask you to help make us a sustainable project by sponsoring yourself or getting your organization to sponsor the project. [Sponsor us on GitHub](https://github.com/sponsors/ddev).

Questions? Issues? We're here to help:

- Discord is great for real-time help: [Join our Discord](/s/discord)
- 💬 [Contact us](/contact)

_Have you signed up for the monthly [DDEV Newsletter](/newsletter)? We'd love to have you._

Claude Code was used in editing this blog and in preparing video outline, etc. Canva AI helped with the banner image.
