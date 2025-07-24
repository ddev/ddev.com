---
title: "Watch: DDEV from scratch with Windows WSL2"
pubDate: 2025-07-25
summary: Screencast guide to running DDEV on Windows with WSL2, starting from scratch. Learn how to set up WSL2, Docker Desktop, and DDEV and use them for development.
author: Randy Fay

featureImage:
  src: /img/blog/2025/07/ddev-from-scratch-wsl2.png
  alt: DDEV From Scratch on WSL2
  hide: false
categories:
  - Guides
  - Videos
modifiedDate: 2025-07-25
modifiedComment: "This guide was originally published in 2020, but has been completely rewritten with a new video in 2025. It now covers the new DDEV Windows installer and WSL2 setup."
---

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/1dr_4gPtFlQ?si=ZFjBU-6CcbsVI3SX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

This screencast walks you through setting up a complete DDEV development environment on Windows using WSL2, starting completely from scratch. Whether you're new to DDEV, WSL2, or local development environments in general, this step-by-step guide will get you up and running quickly.

## What You'll Learn

**DDEV Fundamentals**: Understanding what DDEV is and why it's become the go-to solution for local web development. The video explains that DDEV is a Docker-based local development environment aimed at web developers, mostly PHP and Node developers. Key benefits include:

- Developers can run websites on their local computer with almost no configuration
- Multiple projects can run simultaneously, each with different configurations
- Docker handles all the heavy lifting, so you don't even need PHP or Composer or Node on your host computer
- First-class support across macOS, Linux, Windows, and WSL2 - it works the same on every platform

**WSL2 Setup and Benefits**: WSL2 ([Windows Subsystem for Linux version 2](https://docs.microsoft.com/en-us/windows/wsl/wsl2-index)) transforms Windows development by providing a real Linux kernel running alongside Windows. The video covers the key advantages and considerations:

_Advantages:_

- Complete Linux environment on your Windows machine - fast and capable
- Amazingly fast web serving with DDEV/Docker CE
- You're working with an environment much like the one you'll deploy to

_Considerations:_

- Linux on your Windows machine means yet another system to learn and remember
- Context switches between Windows and WSL2 environments
- You must work in the WSL2 filesystem rather than Windows filesystem (optimized for web apps, not Microsoft Word)

**Complete Installation Process**: The video covers [every step](/get-started) of the installation process, including:

- Setting up WSL2 from scratch using the `wsl --install` command
- Running the new DDEV Windows installer that automatically configures your distro for Docker CE
- Understanding why you need to work in the WSL2 file system instead of the Windows NTFS filesystem for optimal performance

**Real-World Usage**: Beyond just installation, you'll see DDEV in action with:

- Creating a simple PHP project and launching it with trusted HTTPS certificates
- Installing Drupal 11 using `ddev composer create-project`
- Essential DDEV commands like `ddev describe`, `ddev snapshot`, and `ddev export-db`
- Advanced IDE integration with both PhpStorm and VS Code, including Xdebug debugging

**Professional Development Features**: The video demonstrates advanced workflows including:

- Setting up Xdebug debugging in both PhpStorm and VS Code
- Working with DDEV projects from within WSL2-integrated IDEs
- Understanding Docker Desktop vs Docker CE trade-offs for professional development
- Best practices for file system performance and cross-platform compatibility

## Why WSL2 + DDEV?

As explained in the video: _"Because Docker does the lifting you don't have to even have anything like PHP or Composer on your host computer and deal with those complexities. DDEV has been around for quite a few years now and it's had first-class Mac, Linux, Windows and WSL2 support for really quite a long time. It works the same on every platform."_

The advantages of WSL2 are compelling. _"On the advantage side it gives me Linux with all the tools and power of Linux right there available to me anytime. With DDEV it's got great performance and web serving and you're working with an environment much like where you'll deploy to."_

However, there is a learning curve: _"You've got Linux on your Windows machine. You've already had a thousand things to learn and remember and now there's a whole different context with Linux."_ And you need to work in the WSL2 filesystem: _"because the WSL2 or the Linux file system is so much better for web serving and really better for anything that is a lot of files and you really have to work in the WSL2 file system."_

This screencast follows the official DDEV [WSL2 Installation Docs](https://ddev.readthedocs.io/en/stable/#installation-or-upgrade-windows-wsl2), but provides additional context, troubleshooting tips, and real-world examples to ensure your success.

**Here's the video table of contents (opens on YouTube):**

- Introduction and What is DDEV? ([0:00](https://youtu.be/1dr_4gPtFlQ?t=0))
- What is WSL2? ([1:56](https://youtu.be/1dr_4gPtFlQ?t=116))
- WSL2 Advantages and Disadvantages ([2:50](https://youtu.be/1dr_4gPtFlQ?t=170))
- WSL2 Installation Process ([5:30](https://youtu.be/1dr_4gPtFlQ?t=330))
- DDEV Windows Installer and Docker Setup ([12:54](https://youtu.be/1dr_4gPtFlQ?t=774))
- Creating a Simple PHP Project ([16:14](https://youtu.be/1dr_4gPtFlQ?t=974))
- Creating a Drupal 11 Project with Composer ([21:27](https://youtu.be/1dr_4gPtFlQ?t=1287))
- Essential DDEV Commands ([25:25](https://youtu.be/1dr_4gPtFlQ?t=1525))
- PhpStorm Integration and Xdebug Setup ([30:38](https://youtu.be/1dr_4gPtFlQ?t=1838))
- VS Code Integration and Debugging ([39:22](https://youtu.be/1dr_4gPtFlQ?t=2362))
- Docker Desktop vs Docker CE Discussion ([46:55](https://youtu.be/1dr_4gPtFlQ?t=2815))
- What about Traditional Windows? ([49:06](https://youtu.be/1dr_4gPtFlQ?t=2946))
- Wrap-up and Community Resources ([50:12](https://youtu.be/1dr_4gPtFlQ?t=3012))

**Resources for you:**

- [Video slides and table of contents](https://docs.google.com/presentation/d/1oCn7E1Bk0J9E14jiZ7tdvD80jBlibnc3f7PPJMEtqss/edit?usp=sharing) - The slides used in the video
- [DDEV documentation](https://ddev.readthedocs.io/en/stable/).
- [WSL2 and DDEV Installation docs](https://ddev.readthedocs.io/en/stable/#installation-or-upgrade-windows-wsl2)
- [Support](https://ddev.readthedocs.io/en/stable/users/support/): Drupal slack and TYPO3 slack #ddev, gitter #ddev, Stack Overflow, and the [DDEV issue queue](https://github.com/ddev/ddev/issues).
- [DDEV Project Repository](https://github.com/ddev/ddev)
