---
title: "Watch: DDEV from scratch with Windows WSL2"
pubDate: 2020-08-06
summary: Screencast guide to running DDEV on Windows with WSL2.
author: Randy Fay
featureImage:
  src: /img/blog/2020/08/screen-shot-2020-08-04-at-11.30.47-am-1.png
  alt: Screen grab of video’s title frame
  hide: true
categories:
  - Guides
  - Videos
modifiedDate: 2025-07-21
modifiedComment: "Almost everything in this article is far easier now, we hope to update the content soon. For now, take a look at [New GUI Installer: Get DDEV Running on Windows in Just 10 Minutes (Video)](/blog/watch-new-windows-installer)."
---

<div class="video-container">
<iframe loading="lazy" title="DDEV From Scratch (Windows WSL2)" width="500" height="281" src="https://www.youtube.com/embed/ZMfHaUkhfc0?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
</div>

WSL2 ([Windows Subsystem for Linux version 2](https://docs.microsoft.com/en-us/windows/wsl/wsl2-index)) is finally generally available on recent editions of Windows! Because of [Docker’s great support for WSL2](https://docs.docker.com/docker-for-windows/wsl/), it’s now the preferred way to run your [DDEV development environment](https://github.com/ddev/ddev) on Windows. DDEV on WSL2 is as fast as DDEV on Linux, but you have all the Windows niceties you love there.

Traditionally, web developers working on Windows have had to cobble together all the tools that Linux (and macOS) developers take for granted, as well as maintaining and managing versions. With WSL2 Windows developers now have a full Linux toolkit with anything they could ever want (`bash`, `zsh`, `grep`, `awk`, `vim`, `composer`, `make`, `npm`, `yarn`, and so on), standard packaging, all readily available. With DDEV in the mix they also have a super-fast local development environment that works the same as it does on Linux, macOS, (or traditional Windows, but much, much faster). And of course the traditional Windows problems with symlinks, different line endings, file formats, shell script support, all are solved by WSL2.

In this screencast I’m walking through the official DDEV [WSL2 Installation Docs](https://ddev.readthedocs.io/en/stable/#installation-or-upgrade-windows-wsl2), but adding a little more detail. Then I show the basics of installing Chocolatey, mkcert, Docker Desktop, Homebrew, and DDEV, and basic usage of DDEV in action, including a [TYPO3 CMS Composer install](https://ddev.readthedocs.io/en/stable/users/quickstart/#typo3) and demonstrations of a few key commands.

**Here’s the video table of contents (opens on YouTube):**

- What is DDEV? ([1:02](https://youtu.be/ZMfHaUkhfc0?t=62))
- What is WSL2? ([2:52](https://youtu.be/ZMfHaUkhfc0?t=172))
- Advantages and Disadvantages of WSL2 ([3:44](https://youtu.be/ZMfHaUkhfc0?t=222))
- WSL2 Installation ([5:49](https://youtu.be/ZMfHaUkhfc0?t=349))
- Installing Docker Desktop ([13:29](https://youtu.be/ZMfHaUkhfc0?t=809))
- Installing Homebrew and DDEV inside WSL2 ([15:22](https://youtu.be/SwahVCBTo3w?t=922))
- Installing and using bash-completion ([19:06](https://youtu.be/ZMfHaUkhfc0?t=1146))
- Creating a super-simple PHP project (junk project) ([20:38](https://youtu.be/ZMfHaUkhfc0?t=1234))
- Creating a TYPO3 project with `ddev composer create` ([27:57](https://youtu.be/ZMfHaUkhfc0?t=1673))
- Some most-important ddev commands ([32:11](https://youtu.be/ZMfHaUkhfc0?t=1931))
- Resources and wrap-up ([36:01](https://youtu.be/ZMfHaUkhfc0?t=2161))

**Resources for you:**

- [DDEV documentation](https://ddev.readthedocs.io/en/stable/).
- [WSL2 and DDEV Installation docs](https://ddev.readthedocs.io/en/stable/#installation-or-upgrade-windows-wsl2)
- [Support](https://ddev.readthedocs.io/en/stable/users/support/): Drupal slack and TYPO3 slack #ddev, gitter #ddev, Stack Overflow, and the [DDEV issue queue](https://github.com/ddev/ddev/issues).
- [DDEV Project Repository](https://github.com/ddev/ddev)
- Using WSL2 (and **VS Code**), [DDEV ❤️ WSL2: getting started](https://ddev.com/ddev-local/ddev-wsl2-getting-started/)
