---
title: "Watch: DDEV from scratch with Windows WSL2"
pubDate: 2025-07-24
summary: Screencast guide to running DDEV on Windows with WSL2, starting from scratch. Learn how to set up WSL2, Docker Desktop, and DDEV and use them for development.
author: Randy Fay

featureImage:
  src: /img/blog/2020/08/screen-shot-2020-08-04-at-11.30.47-am-1.png
  alt: Screen grab of video’s title frame
  hide: true
categories:
  - Guides
  - Videos
modifiedDate: 2025-07-24
modifiedComment: "This guide was originally published in 2020, but has been completely rewritten with a new video in 2025. It now covers the new DDEV Windows installer and WSL2 setup."
---


<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/1dr_4gPtFlQ?si=ZFjBU-6CcbsVI3SX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

This comprehensive screencast walks you through setting up a complete DDEV development environment on Windows using WSL2, starting completely from scratch. Whether you're new to DDEV, WSL2, or local development environments in general, this step-by-step guide will get you up and running quickly.

## What You'll Learn

**DDEV Fundamentals**: Understanding what DDEV is and why it's become the go-to solution for local web development. The video explains that DDEV is a Docker-based local development environment aimed at web developers, mostly PHP and Node developers. Key benefits include:
- Developers can run websites on their local computer with almost no configuration
- Multiple websites can run simultaneously, each with different configurations
- Docker handles all the heavy lifting, so you don't need PHP or Composer on your host computer
- First-class support across macOS, Linux, Windows, and WSL2 - it works the same on every platform

**WSL2 Setup and Benefits**: WSL2 ([Windows Subsystem for Linux version 2](https://docs.microsoft.com/en-us/windows/wsl/wsl2-index)) transforms Windows development by providing a real Linux kernel running alongside Windows. The video covers the key advantages and considerations:

*Advantages:*
- Complete Linux environment on your Windows machine - fast and capable
- Amazingly fast web serving with DDEV/Docker
- You're working with an environment much like where you'll deploy to

*Considerations:*
- Linux on your Windows machine means yet another system to learn and remember
- Context switches between Windows and WSL2 environments
- Must work in the WSL2 filesystem rather than Windows filesystem (optimized for web apps, not Microsoft Word)

**Complete Installation Process**: The video covers every step of the installation process, including:
- Setting up WSL2 from scratch on Windows
- Installing and configuring Docker Desktop with WSL2 integration
- Installing the new DDEV Windows installer
- Setting up Homebrew within WSL2 for package management
- Configuring bash completion for better command-line experience

**Real-World Usage**: Beyond just installation, you'll see DDEV in action with:
- Creating a simple PHP project to test your setup
- Installing TYPO3 CMS using `ddev composer create`
- Essential DDEV commands every developer should know
- Best practices for working with DDEV projects

## Why WSL2 + DDEV?

Traditionally, web developers on Windows faced significant challenges: cobbling together development tools, managing different versions, dealing with line ending issues, symlink problems, and slow file system performance. WSL2 solves these problems by providing a full Linux environment with all the tools developers expect (`bash`, `zsh`, `grep`, `awk`, `vim`, `composer`, `make`, `npm`, `yarn`, and more) while maintaining native Windows integration.

With DDEV running in WSL2, you get Linux-native performance while keeping your familiar Windows workflow. It's the best of both worlds - a development environment that's as fast and reliable as Linux, with the Windows tools and interface you know and love.

This screencast follows the official DDEV [WSL2 Installation Docs](https://ddev.readthedocs.io/en/stable/#installation-or-upgrade-windows-wsl2), but provides additional context, troubleshooting tips, and real-world examples to ensure your success.

**Here's the video table of contents (opens on YouTube):**

- Introduction and Overview ([0:00](https://youtu.be/1dr_4gPtFlQ?t=0))
- What is DDEV? ([1:02](https://youtu.be/1dr_4gPtFlQ?t=62))
- What is WSL2? ([2:52](https://youtu.be/1dr_4gPtFlQ?t=172))
- Advantages and Disadvantages of WSL2 ([3:44](https://youtu.be/1dr_4gPtFlQ?t=224))
- WSL2 Installation ([5:49](https://youtu.be/1dr_4gPtFlQ?t=349))
- Installing Docker Desktop ([13:29](https://youtu.be/1dr_4gPtFlQ?t=809))
- Installing Homebrew and DDEV inside WSL2 ([15:22](https://youtu.be/1dr_4gPtFlQ?t=922))
- Installing and using bash-completion ([19:06](https://youtu.be/1dr_4gPtFlQ?t=1146))
- Creating a super-simple PHP project (junk project) ([20:38](https://youtu.be/1dr_4gPtFlQ?t=1238))
- Creating a TYPO3 project with `ddev composer create` ([27:57](https://youtu.be/1dr_4gPtFlQ?t=1677))
- Some most-important ddev commands ([32:11](https://youtu.be/1dr_4gPtFlQ?t=1931))
- Working with DDEV projects and troubleshooting ([36:01](https://youtu.be/1dr_4gPtFlQ?t=2161))
- Advanced DDEV features and tips ([42:30](https://youtu.be/1dr_4gPtFlQ?t=2550))
- Questions and answers ([47:15](https://youtu.be/1dr_4gPtFlQ?t=2835))
- Final wrap-up and resources ([51:00](https://youtu.be/1dr_4gPtFlQ?t=3060))

**Resources for you:**

- [Video slides and table of contents](https://docs.google.com/presentation/d/1oCn7E1Bk0J9E14jiZ7tdvD80jBlibnc3f7PPJMEtqss/edit?usp=sharing) - The slides used in the video
- [DDEV documentation](https://ddev.readthedocs.io/en/stable/).
- [WSL2 and DDEV Installation docs](https://ddev.readthedocs.io/en/stable/#installation-or-upgrade-windows-wsl2)
- [Support](https://ddev.readthedocs.io/en/stable/users/support/): Drupal slack and TYPO3 slack #ddev, gitter #ddev, Stack Overflow, and the [DDEV issue queue](https://github.com/ddev/ddev/issues).
- [DDEV Project Repository](https://github.com/ddev/ddev)
- Using WSL2 (and **VS Code**), [DDEV ❤️ WSL2: getting started](https://ddev.com/ddev-local/ddev-wsl2-getting-started/)
