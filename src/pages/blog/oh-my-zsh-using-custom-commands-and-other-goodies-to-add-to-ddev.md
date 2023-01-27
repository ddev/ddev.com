---
title: "How to use DDEV custom commands and other goodies to add zsh"
pubDate: 2019-08-13
author: Randy Fay
featuredImage: https://ddevdotcom.ddev.site/app/uploads/2019/08/oh-my-zsh.png
categories:
  - DDEV
---

DDEV-Local is a powerful local development tool that many of you are fond of for its simplicity and extensibility. Recent versions of [DDEV-Local (v1.10+)](https://ddev.readthedocs.io/en/stable/) add custom commands and loads of other goodies we’d like to show you how to use. In this screencast and tutorial, we’ll show you how to make use of DDEV-Local custom commands, adding webserver packages, and adding extras in .ddev/homeadditions to support your specific project needs.

When in doubt, update DDEV-Local on your machine and run `ddev config` on a project before getting started with new features.

As an example, and since there are many folks who absolutely love [zsh](https://www.zsh.org/) and [oh-my-zsh](https://ohmyz.sh/) (an alternative Unix shell and an accompanying framework), we’ll demonstrate these features by showing you how to add zsh and oh-my-zsh to a DDEV project. We’re going to do three things to demonstrate this:

* Add the zsh Debian package into the web container with `webimage_extra_packages`
* Add a custom command that works just like `ddev ssh`, but it’s going to be `ddev zsh`
* Add all the scaffolding for oh-my-zsh in the home directory for lovers of oh-my-zsh

Watch the video below and read the detailed instructions to configure your own project:

##### How to add zsh and oh-my-zsh to DDEV-Local:

1. From the root of an existing project configured with DDEV-Local: Add the zsh package to the webserver container by adding `webimage_extra_packages: ["zsh"]` to the .ddev/config.yaml (or run `ddev config --webimage-extra-packages=zsh`, which does the exact same thing). If you only want zsh in the web container, you can `ddev restart` and you’re done!
To add a `ddev zsh` custom command to your project, place a file named “zsh’ in .ddev/commands/web/zsh with the following contents and make it executable with `chmod +x zsh`:

#!/bin/bash

## Description: ssh into web container using zsh
## Usage: zsh [flags] [args]
## Example: "ddev zsh"

zsh $@

Now you can run `ddev zsh` and be in your familiar zsh environment (if you did the `ddev restart` after adding the package in step 1) . 
2. If zsh is all you want, copy your favorite .zshrc into .ddev/homeadditions for your project and zsh will be set up with your .zshrc every time you start the project. You’re done now.
3. Now to add all the goodies that make [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh) work:  
   1. If you already have a \~/.oh-my-zsh and \~/.zshrc, you probably can just copy those into .ddev/homeadditions and they will be added on every `ddev start`.  
   2. Otherwise, create the .oh-my-zsh like this:  
   3. `cd .ddev/homeadditions`  
   4. \`curl -Lo [install.sh](http://install.sh/) [https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh\`](https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)  
   5. `ZSH=./.oh-my-zsh sh ./install.sh --unattended`  
   6. `cp ~/.zshrc .` (This copies the .zshrc that install.sh will have mistakenly put in your home directory.  
   7. Change the line near the top of the .ddev/homeadditions/.zshrc to \`export ZSH=\~/.oh-my-zsh\` instead of what the oh-my-zsh installer generated.
4. Now you can run `ddev start` and `ddev zsh` will have all the oh-my-zsh goodies.

**To review,** we used three advanced features of ddev:

   * Added an extra Debian package (zsh) with webimage\_extra\_packages ([docs](https://ddev.readthedocs.io/en/stable/users/extend/customizing-images/#adding-extra-debian-packages-with-webimage%5Fextra%5Fpackages-and-dbimage%5Fextra%5Fpackages))
   * Added a custom command (zsh) in .ddev/commands/web by adding a simple script ([docs](https://ddev.readthedocs.io/en/stable/users/extend/custom-commands/))
   * Added extra stuff (oh-my-zsh and .zshrc) into .ddev/homeadditions that will be added to the home directory in the web container on every `ddev start` ([docs](https://ddev.readthedocs.io/en/stable/users/extend/in-container-configuration/)).

Happy customizing! If you have questions, check out our [support channels](https://ddev.readthedocs.io/en/stable/#support). Otherwise, sign up for our newsletter to stay in touch:

[DDEV Newsletter Sign-up](http://eepurl.com/dlqkUD)
