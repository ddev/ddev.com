---
title: "DDEV and PhpStorm Debugging with WSL2"
pubDate: 2020-06-17
summary: Guide to PhpStorm configuration and debugging in Windows using WSL2.
author: Randy Fay
featureImage:
  src: /img/blog/2020/06/phpstorm-debugging.png
  alt: Tightly-cropped screenshot of step-debugging in progress with PhpStorm, with source code in one pane and debug variables in another
  shadow: true
categories:
  - Guides
---

WSL2 with [DDEV](https://ddev.com/ddev-local/) is a wonderful new world for Windows developers. The performance is incredible (on a par with native Linux installations) and the WSL2 command-line environment is fresh and clean.

As noted in the [WSL2 blog article](https://ddev.com/ddev-local/ddev-wsl2-getting-started/), Visual Studio Code is doing great with WSL2, but PhpStorm is lagging a bit behind. However, it is possible right now to use PhpStorm with DDEV on WSL2 in two different ways:

1. Running PhpStorm in Windows as usual, opening the project on the WSL2 filesystem at `\\wsl$\<distro>` PhpStorm is slow to index files and is slow to respond to file changes in this mode.
2. Enabling X11 on Windows and running PhpStorm inside WSL2 as a Linux app. PhpStorm works fine this way, but it’s yet another complexity to manage and requires enabling X11 (easy) on your Windows system.

We’ll walk through both of these approaches.

I tested these approaches on an 8GB Windows 10 Home VM with Docker 2.3.0.3 and DDEV v1.14.2 and the Ubuntu 20.04 distro.

## Basics

- Start with a working DDEV/WSL2 setup as described in [DDEV ❤️ WSL2: getting started](https://ddev.com/ddev-local/ddev-wsl2-getting-started/). Until that’s all working it doesn’t help to go farther.
- If you haven’t used Xdebug with DDEV and PhpStorm before, you’ll want to read the [normal instructions](https://ddev.readthedocs.io/en/stable/users/step-debugging/#step-debugging-with-ddev-and-xdebug) in the docs.
- For good performance, you want your project to be in /home inside WSL2, which is on the Linux filesystem. Although you can certainly keep your project on the Windows filesystem and access it in WSL2 via /mnt/c, the performance is no better than native Windows. It does work though.

## Windows PhpStorm

1. Your working project should be on the /home partition, so you’ll open it using Windows PhpStorm as `\\wsl$\Ubuntu\home\<username>\...\<projectdir>`.
   - On some systems and some projects it may take a very long time for PhpStorm to index the files. At one point I got frustrated and moved to a faster computer.
   - File changes are noticed only by polling, and PhpStorm will complain about this in the lower right, “External file changes sync may be slow”.
2. Turn off your Windows firewall temporarily. When you have everything working you can turn it back on again.
3. Use `ddev start` and `ddev xdebug on`
4. Click the Xdebug listen button on PhpStorm (the little phone icon) to make it start listening.
5. Set a breakpoint on or near the first line of your index.php
6. Visit the project with a web browser or curl. You should get a popup asking for mapping of the host-side files to the in-container files. You’ll want to make sure that `/home/<you>/.../<yourproject>` gets mapped to `/var/www/html`
7. Debugging should be working! You can step through your code, set breakpoints, view variables, etc.
8. (Nice to have) I set the PhpStorm terminal path (Settings→Tools→Terminal→Shell Path) to `C:\Windows\System32\wsl.exe`. That way when I use the terminal Window in WSL2 it’s using the wonderful shell in WSL2.

## Using Linux PhpStorm inside WSL2

1. On Windows, Install [X410](https://www.microsoft.com/store/productId/9NLP712ZMN9Q) from the Microsoft Store, launch it, configure in the system tray with “Windowed Apps”, “Allow public access”, “DPI Scaling”→”High quality”. Obviously you can use another X11 server, but this is the one I’ve used.
2. Temporarily disable your Windows firewall. You can re-enable it after you get everything working.
3. In the WSL2 terminal `export DISPLAY=$(awk '/^nameserver/ {print $2; exit;}' </etc/resolv.conf):0.0` (You’ll want to add this to your .profile in WSL2). This sets the X11 DISPLAY variable to point to your Windows host side. Microsoft has future plans to support this natively.
4. `sudo apt-get update && sudo apt-get install libatk1.0 libatk-bridge2.0 libxtst6 libxi6 libpangocairo-1.0 libcups2 libnss3 xdg-utils x11-apps`
5. run `xeyes` – you should see the classic X11 play app “xeyes” on the screen. <ctrl-c> to exit. This is a quick test to make sure X11 is working.
6. Download and un-tar PhpStorm for Linux from <https://www.jetbrains.com/PhpStorm/download/#section=linux> – you need the _Linux_ app.
7. Run `bin/PhpStorm.sh &`
8. In PhpStorm, under Help→ Edit Custom VM Options, add an additional line: `-Djava.net.preferIPv4Stack=true` This makes PhpStorm listen for Xdebug using IPV4; for some reason the Linux version of PhpStorm defaults to using only IPV6.
9. Restart PhpStorm (File→Exit and then `bin/PhpStorm.sh &` again.
10. Use `ddev start` and `ddev xdebug on`
11. Click the Xdebug listen button in PhpStorm (the little phone icon) to make it start listening.
12. Set a breakpoint on or near the first line of your index.php
13. Visit the project with a web browser or curl. You should get a popup asking for mapping of the host-side files to the in-container files. You’ll want to make sure that `/home/<you>/.../<yourproject>` gets mapped to `/var/www/html`
14. Debugging should be working! You can step through your code, set breakpoints, view variables, etc.

We look forward to your feedback as you start using PhpStorm with WSL2! We’re listening in [many support channels](https://ddev.readthedocs.io/en/stable/#support) and are happy to work with you and learn from you.
