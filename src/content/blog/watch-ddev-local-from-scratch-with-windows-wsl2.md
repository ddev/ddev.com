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

> **Want just the 10-minute version of a DDEV WSL2 Install?** Check out the [New GUI Installer: Get DDEV Running on Windows in Just 10 Minutes](watch-new-windows-installer.md) for a quicker setup using the GUI installer.

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

**WSL2 Setup and Benefits**: WSL2 ([Windows Subsystem for Linux version 2](https://learn.microsoft.com/en-us/windows/wsl/)) transforms Windows development by providing a real Linux kernel running alongside Windows. The video covers the key advantages and considerations:

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

This screencast follows the official DDEV [WSL2 Installation Docs](https://docs.ddev.com/en/stable/users/install/ddev-installation/#ddev-installation-windows), but provides additional context, troubleshooting tips, and real-world examples to ensure your success.

**Here's the video table of contents (opens on YouTube):**

- Introduction and What is DDEV? ([0:00](https://youtu.be/1dr_4gPtFlQ?t=0))
- What is WSL2? ([1:56](https://youtu.be/1dr_4gPtFlQ?t=116))
- WSL2 Advantages and Disadvantages ([2:50](https://youtu.be/1dr_4gPtFlQ?t=170))
- WSL2 Installation Process ([5:30](https://youtu.be/1dr_4gPtFlQ?t=330))
- DDEV Windows Installer and Docker Setup ([12:54](https://youtu.be/1dr_4gPtFlQ?t=774))
- Creating a Simple PHP Project ([16:14](https://youtu.be/1dr_4gPtFlQ?t=974))
- Creating a Drupal 11 Project with Composer ([21:27](https://youtu.be/1dr_4gPtFlQ?t=1287))
- Essential DDEV Commands ([25:25](https://youtu.be/1dr_4gPtFlQ?t=1614))
- PhpStorm Integration and Xdebug Setup ([30:38](https://youtu.be/1dr_4gPtFlQ?t=1838))
- VS Code Integration and Debugging ([39:22](https://youtu.be/1dr_4gPtFlQ?t=2362))
- Docker Desktop vs Docker CE Discussion ([46:55](https://youtu.be/1dr_4gPtFlQ?t=2815))
- What about Traditional Windows? ([49:06](https://youtu.be/1dr_4gPtFlQ?t=2946))
- Wrap-up and Community Resources ([50:12](https://youtu.be/1dr_4gPtFlQ?t=3012))

## Additional Resources

### 📺 Video Materials

- [Video slides and table of contents](https://docs.google.com/presentation/d/1oCn7E1Bk0J9E14jiZ7tdvD80jBlibnc3f7PPJMEtqss/edit?usp=sharing) - The slides used in the video

### 📖 Documentation

- [DDEV documentation](https://docs.ddev.com/en/stable/) - Complete DDEV documentation
- [WSL2 and DDEV Installation docs](https://docs.ddev.com/en/stable/users/install/ddev-installation/#ddev-installation-windows) - Official installation guide

### 💬 Community Support

- [DDEV Discord](/s/discord) - Join the DDEV community on Discord for real-time support and discussion
- [DDEV Stack Overflow](https://stackoverflow.com/questions/tagged/ddev) - Q&A with the community
- [DDEV issue queue](https://github.com/ddev/ddev/issues) - Bug reports and feature requests
- [Drupal Slack](https://www.drupal.org/community/contributor-guide/reference-information/talk/tools/slack) - `#ddev` channel

### 🔧 Development

- [DDEV Project Repository](https://github.com/ddev/ddev) - Source code and releases
