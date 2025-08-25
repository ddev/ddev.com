---
title: "How to use DDEV custom commands and other goodies to add zsh"
pubDate: 2019-08-13
summary: Screencast tutorial on adding zsh and Oh My Zsh to your DDEV web containers.
author: Randy Fay
featureImage:
  src: /img/blog/2019/08/oh-my-zsh.png
  alt: Screenshot of a terminal window, with emphasis on “oh my zsh is now installed!”
categories:
  - Guides
  - Videos
---

DDEV is a powerful local development tool that many of you are fond of for its simplicity and extensibility. Recent versions of [DDEV (v1.10+)](https://docs.ddev.com/en/stable/) add custom commands and loads of other goodies we’d like to show you how to use. In this screencast and tutorial, we’ll show you how to make use of DDEV custom commands, adding web server packages, and adding extras in `.ddev/homeadditions` to support your specific project needs.

When in doubt, update DDEV on your machine and run `ddev config` on a project before getting started with new features.

As an example, and since there are many folks who absolutely love [Zsh](https://www.zsh.org/) and [Oh My Zsh](https://ohmyz.sh/) (an alternative Unix shell and an accompanying framework), we’ll demonstrate these features by showing you how to add Zsh and Oh My Zsh to a DDEV project. We’re going to do three things to demonstrate this:

- Add the `zsh` Debian package into the web container with `webimage_extra_packages`
- Add a custom command that works like `ddev ssh`, but it’s going to be `ddev zsh`
- Add all the scaffolding for Oh My Zsh in the home directory for lovers of Oh My Zsh

Watch the video below and read the detailed instructions to configure your own project:

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/eyhzszuF9Rg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## How to add Zsh and Oh My Zsh to DDEV

1. From the root of an existing project configured with DDEV: Add the `zsh` package to the web server container by adding `webimage_extra_packages: ["zsh"]` to the `.ddev/config.yaml` file (or run `ddev config --webimage-extra-packages=zsh`, which does the exact same thing). If you only want `zsh` in the web container, you can `ddev restart` and you’re done!
2. To add a `ddev zsh` custom command to your project, place a file named `zsh` in `.ddev/commands/web/zsh` with the following contents and make it executable with `chmod +x zsh`:

   ```
   #!/bin/bash

   ## Description: ssh into web container using zsh
   ## Usage: zsh [flags] [args]
   ## Example: "ddev zsh"

   zsh $@
   ```

   Now you can run `ddev zsh` and be in your familiar Zsh environment (if you did the `ddev restart` after adding the package in step 1.

3. If Zsh is all you want, copy your favorite `.zshrc` into `.ddev/homeadditions` for your project and Zsh will be set up with your `.zshrc` every time you start the project. You’re done now.
4. Now to add all the goodies that make [Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh) work:
   1. If you already have a `~/.oh-my-zsh` and `~/.zshrc`, you can probably copy those into `.ddev/homeadditions` and they will be added when you run `ddev start`.
   2. Otherwise, create the `.oh-my-zsh` like this:
   3. `cd .ddev/homeadditions`
   4. `curl -Lo install.sh https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh`
   5. `ZSH=./.oh-my-zsh sh ./install.sh --unattended`
   6. `cp ~/.zshrc .` (This copies the `.zshrc` that `install.sh` will have mistakenly put in your home directory.
   7. Change the line near the top of the `.ddev/homeadditions/.zshrc` to `export ZSH=~/.oh-my-zsh` instead of what the oh-my-zsh installer generated.
5. Now you can run `ddev start` and `ddev zsh` will have all the Oh My Zsh goodies.

**To review,** we used three advanced features of ddev:

- Added an extra Debian package (`zsh`) with [`webimage_extra_packages`](https://docs.ddev.com/en/stable/users/extend/customizing-images/#adding-extra-debian-packages-with-webimage%5Fextra%5Fpackages-and-dbimage%5Fextra%5Fpackages)
- Added a custom command (`zsh`) in `.ddev/commands/web` by adding a simple script ([docs](https://docs.ddev.com/en/stable/users/extend/custom-commands/))
- Added extra stuff (`oh-my-zsh` and `.zshrc`) into `.ddev/homeadditions` that will be added to the home directory in the web container on every `ddev start` ([docs](https://docs.ddev.com/en/stable/users/extend/in-container-configuration/)).

Happy customizing! If you have questions, check out our [support channels](https://docs.ddev.com/en/stable/users/support/).
