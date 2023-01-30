---
title: "DDEV ❤️ WSL2: getting started"
pubDate: 2020-05-26
author: DDEV
featuredImage: https://ddev.com/app/uploads/2020/05/diagram.png
categories:
  - Guides
---

_This is a guest post from web developer and open source contributor_ [**Dennis Ameling**](https://github.com/dennisameling)_, owner of_ [_fits4all_](https://github.com/fits4all)_. Dennis also contributed this guide to the DDEV-Local documentation! Find out_ [_more about Dennis_](https://twitter.com/dennisameling)_._

**_Note: The current instructions for WSL2 setup are [in the DDEV docs](https://ddev.readthedocs.io/en/latest/users/install/ddev-installation/#windows-wsl2) and have been refined over the years._**

Now that WSL2 is [generally available](https://devblogs.microsoft.com/commandline/wsl2-will-be-generally-available-in-windows-10-version-2004/) as part of the Windows 10 May 2020 (2004) update, it’s time to look into running [DDEV-Local](https://ddev.com/ddev-local/) on WSL2!

Wait, what is “WSL” anyway? It stands for the “Windows Subsystem for Linux”, and in version 2 it’s a full-powered implementation of Linux inside Windows. Read more in the [WSL Documentation](https://docs.microsoft.com/en-us/windows/wsl/) and [WSL2 FAQ](https://docs.microsoft.com/en-us/windows/wsl/wsl2-faq).

**All Windows 10 editions (including Windows 10 Home) support WSL2**. Docker Toolbox support for DDEV will be deprecated, as we’ll move testing capacity towards WSL2\. If you’re already familiar with DDEV on Windows, you might have been using [NFS for better filesystem performance](https://ddev.readthedocs.io/en/stable/users/performance/#windows-nfs-setup). **You won’t need NFS anymore once you switch to WSL2**, since it provides awesome filesystem performance out of the box ?

## Outline

- [Install WSL2](#install-wsl2)
- [Install Docker](#install-docker)
- [Install DDEV](#install-ddev)
  - [Prepare SSL certificate (mkcert)](#prepare-ssl-certificate)
  - [Installing the Linux version of DDEV](#installing-the-linux-version-of-ddev)
- [Using DDEV](#using-ddev)
- [DDEV launch command (optional) ](#ddev-launch)
- [Working with IDEs (optional) ](#working-with-ides)
  - [VS Code](#vs-code)  
     \* [Xdebug in VS Code](#xdebug-in-vs-code)
  - [PhpStorm](#phpstorm)
- [Resources](#resources)

## Install WSL2

First, we’ll have to install WSL2 on our machine. You can follow Microsoft’s [official instructions](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to do this. **Don’t forget to set the default WSL version to WSL2!** `wsl --set-default-version 2`

In this example, we’ll be using Ubuntu 20.04, which you can download [from the Microsoft Store](https://www.microsoft.com/store/productId/9N6SVWS3RX71).

**Make sure to install Ubuntu (or any other distro) _before_ installing Docker, so that Ubuntu becomes the default WSL distro.**

**Double-check to make sure that you have installed using WSL version 2:** `**wsl -l -v**` **should show your distro as version 2\.**

## Install Docker

Next up is Docker Desktop, which uses the WSL2 backend by default [since version 2.3.0.2](https://docs.docker.com/docker-for-windows/release-notes/#docker-desktop-community-2302). Go ahead and [download Docker Desktop for Windows from Docker Hub](https://hub.docker.com/editions/community/docker-ce-desktop-windows/).

When you’re done, go to Docker Desktop settings > Resources > WSL integration > enable integration for your distro (now `docker` commands will be available from within your WSL2 distro):

![](https://ddev.com/app/uploads/2020/05/settings.png)

## Install DDEV

We’re ready to install DDEV! **Please note that there’s one gotcha here**: we’ll install DDEV for Linux, **not** for Windows! This is because you will get the best performance when working in the Linux filesystem. Don’t go back and forth between the regular Windows side and WSL2\. This is also [Microsoft’s recommended approach](https://docs.microsoft.com/en-us/windows/wsl/compare-versions#use-the-linux-file-system-for-faster-performance).

To make things more visual, let’s take a look at the image below. Docker + DDEV will basically be running in WSL2 and expose ports to Windows. This way, you benefit from very good (Linux-based) performance while having the convenience to access your DDEV sites from within Windows.

**Make sure you put your projects in the Linux filesystem (e.g. /home/LINUX*USERNAME), \_not* in the Windows filesystem (/mnt/c), for vastly superior performance.** You’ll be very, very disappointed if you put them on /mnt/c.

![](https://ddev.com/app/uploads/2020/05/diagram.png)

### Prepare SSL certificate (mkcert)

- Install Chocolatey on Windows: <https://chocolatey.org/install>
- Open a PowerShell windows with administrator rights and run `choco install mkcert`
- Run `mkcert -install`.
- Run `setx CAROOT "$(mkcert -CAROOT)"; If ($Env:WSLENV -notlike "*CAROOT*") { setx WSLENV "CAROOT/up:$Env:WSLENV" }` – this will set the CAROOT environment variable on the WSL2 side to point to the Windows CAROOT, so your Windows browser can trust sites running in WSL2.

### Installing the Linux version of DDEV

- Open the Ubuntu 20.04 terminal from the Windows start menu.
- Follow the [installation instructions for Linux/macOS](https://ddev.readthedocs.io/en/stable/#homebrewlinuxbrew-macoslinux) as provided in the DDEV docs.
- After installation, run `mkcert -install` in the Ubuntu terminal and you should see that mkcert will use your Windows CA certificates:
  - `Using the local CA at “/mnt/c/Users/YOUR_WINDOWS_USERNAME/AppData/Local/mkcert”`

That’s it! You have now installed DDEV on WSL2 ? Remember to run all `ddev` commands in your Ubuntu/WSL2 terminal, **not** in PowerShell/Command Prompt.

## Using DDEV

Let’s try to get a DDEV site up and running using the [WordPress Quickstart](https://ddev.readthedocs.io/en/latest/users/cli-usage/#wordpress-quickstart). The first time it might take a while for the database/web server/etc images to download, but after that you can start new instances lightning-fast. ⚡

When navigating to <https://my-wp-bedrock-site.ddev.site>, we are presented with the WordPress installation screen:

![](https://ddev.com/app/uploads/2020/05/wp_install.png)

Fantastic! Even the SSL certificate works as expected. You’re now ready to start developing with DDEV on WSL2 ?

## DDEV launch command (optional)

If you want to use the `ddev launch` command, you’ll need to install xdg-utils with `sudo apt-get update && sudo apt-get install xdg-utils`. After that, when you run `ddev launch` within a DDEV project directory, the site will launch in your default browser on Windows. Pretty awesome, right?

## Working with IDEs (optional)

### VS Code

VS Code has a special integration with WSL2 in its Remote Development extension pack. This allows you to directly work in the Linux filesystem from within your IDE.

- Install [VS Code + the Remote Development extension pack](https://code.visualstudio.com/docs/remote/wsl#%5Fgetting-started)
- Open VS Code, connect to your WSL2 distro. You can now access the file system of your Linux distro from within Windows ✨

![](https://ddev.com/app/uploads/2020/05/vs-code-wsl2-windows.jpg)

- If you open a terminal by going to Terminal in the top menu > New terminal, you are immediately in the WSL2 environment and can run commands over there, like `ddev start`.

#### Xdebug in VS Code

If you want to use Xdebug in VS Code, make sure you set the hostname to `0.0.0.0` and set the correct `pathMappings` for DDEV. This way, you can use Xdebug like you’re used to:

```json
{
  "configurations": [
    {
      "hostname": "0.0.0.0",
      "name": "Listen for Xdebug",
      "pathMappings": {
        "/var/www/html": "${workspaceRoot}"
      },
      "port": 9000,
      "request": "launch",
      "type": "php"
    },
    {
      "cwd": "${fileDirname}",
      "name": "Launch currently open script",
      "port": 9000,
      "program": "${file}",
      "request": "launch",
      "type": "php"
    }
  ],
  "version": "0.2.0"
}
```

### PhpStorm

PhpStorm supports WSL2 since [its 2019.3 release](https://blog.jetbrains.com/phpstorm/2019/11/phpstorm-2019-3-release/#wsl), but the experience is not fine-tuned yet. There are two ways to use it – you can use it as a Windows app or use the Linux version of PhpStorm inside WSL2. We’ve got it written up for you in [DDEV-Local and PhpStorm Debugging with WSL2](https://ddev.com/ddev-local/ddev-local-and-phpstorm-debugging-with-wsl2/).

## Resources

- [Docker WSL2 Best Practices](https://www.docker.com/blog/docker-desktop-wsl-2-best-practices/)
- [WSL Documentation](https://docs.microsoft.com/en-us/windows/wsl/)
- [WSL2 FAQ](https://docs.microsoft.com/en-us/windows/wsl/wsl2-faq)
