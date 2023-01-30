---
title: "Watch: DDEV-Local from scratch with Windows WSL2"
pubDate: 2020-08-06
author: Randy Fay
featureImage:
  src: https://ddev.com/app/uploads/2020/08/Screen-Shot-2020-08-04-at-11.30.47-AM-1.png
  alt:
  caption:
  credit:
categories:
  - Guides
---

WSL2 ([Windows Subsystem for Linux version 2](https://docs.microsoft.com/en-us/windows/wsl/wsl2-index)) is finally generally available on recent editions of Windows! Because of [Docker’s great support for WSL2](https://docs.docker.com/docker-for-windows/wsl/), it’s now the preferred way to run your [DDEV-Local development environment](https://ddev.com/ddev-local/) on Windows. DDEV-Local on WSL2 is as fast as DDEV-Local on Linux, but you have all the Windows niceties you love there.

Traditionally, web developers working on Windows have had to cobble together all the tools that Linux (and macOS) developers take for granted, as well as maintaining and managing versions. With WSL2 Windows developers now have a full Linux toolkit with anything they could ever want (bash, zsh, grep, awk, vim, composer, make, npm, yarn, and on and on), standard packaging, all readily available. With DDEV-Local in the mix they also have a super-fast local development environment that works just the same as it does on Linux, macOS, (or traditional Windows, but much, much faster). And of course the traditional Windows problems with symlinks, different line endings, file formats, shell script support, all are solved by WSL2.

In this screencast I’m just walking through the official DDEV-Local [WSL2 Installation Docs](https://ddev.readthedocs.io/en/stable/#installation-or-upgrade-windows-wsl2), but adding a little more detail. Then I show the basics of installing Chocolatey, mkcert, Docker Desktop, Homebrew, and DDEV-Local, and basic usage of DDEV-Local in action, including a [TYPO3 CMS Composer install](https://ddev.readthedocs.io/en/stable/users/cli-usage/#typo3-quickstart) and demonstrations of a few key commands.

_Note_: One of the weaknesses of WSL2 is that PhpStorm isn’t really completely ready for it yet. There are [two not-quite-satisfactory ways](https://ddev.com/ddev-local/ddev-local-and-phpstorm-debugging-with-wsl2/) to use PhpStorm though. But [VS Code](https://code.visualstudio.com/) has full and robust support for WSL2, including inside Docker containers. Our [original article on WSL2](https://ddev.com/ddev-local/ddev-wsl2-getting-started/) tells how to set up VS Code for use inside WSL2.

**Here’s the video table of contents (opens on YouTube):**

- What is DDEV-Local? ([1:02](https://youtu.be/ZMfHaUkhfc0?t=62))
- What is WSL2? ([2:52](https://youtu.be/ZMfHaUkhfc0?t=172))
- Advantages and Disadvantages of WSL2 ([3:44](https://youtu.be/ZMfHaUkhfc0?t=222))
- WSL2 Installation ([5:49](https://youtu.be/ZMfHaUkhfc0?t=349))
- Installing Docker Desktop ([13:29](https://youtu.be/ZMfHaUkhfc0?t=809))
- Installing Homebrew and DDEV-Local inside WSL2 ([15:22](https://youtu.be/SwahVCBTo3w?t=922))
- Installing and using bash-completion ([19:06](https://youtu.be/ZMfHaUkhfc0?t=1146))
- Creating a super-simple PHP project (junk project) ([20:38](https://youtu.be/ZMfHaUkhfc0?t=1234))
- Creating a TYPO3 project with `ddev composer create` ([27:57](https://youtu.be/ZMfHaUkhfc0?t=1673))
- Some most-important ddev commands ([32:11](https://youtu.be/ZMfHaUkhfc0?t=1931))
- Resources and wrap-up ([36:01](https://youtu.be/ZMfHaUkhfc0?t=2161))

**Resources for you:**

- [DDEV-Local documentation](https://ddev.readthedocs.io/en/stable/).
- [WSL2 and DDEV Installation docs](https://ddev.readthedocs.io/en/stable/#installation-or-upgrade-windows-wsl2)
- [Support](https://ddev.readthedocs.io/en/stable/#support-and-user-contributed-documentation): Drupal slack and TYPO3 slack #ddev, gitter #ddev, Stack Overflow, and the [DDEV-Local issue queue](https://github.com/drud/ddev/issues).
- [DDEV-Local Project Repository](https://github.com/drud/ddev)
- More about [PhpStorm on WSL2](https://ddev.com/ddev-local/ddev-local-and-phpstorm-debugging-with-wsl2/), with full details about how to run it.
- Using WSL2 (and **VS Code**), [DDEV ❤️ WSL2: getting started](https://ddev.com/ddev-local/ddev-wsl2-getting-started/)
- DDEV-Local’s counterpart, [DDEV-Live](https://ddev.com/ddev-live/https://ddev.com/ddev-live/): Includes a free 10-day trial for you to kick the tires on our hosting platform.
