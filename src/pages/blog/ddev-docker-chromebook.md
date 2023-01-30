---
title: "DDEV, Docker, Chromebook!"
pubDate: 2020-05-04
author: Randy Fay
featureImage:
  src: https://ddev.com/app/uploads/2020/04/chromebook-3.jpg
  alt:
  caption:
  credit:
categories:
  - Guides
---

Updated 2021-01-25 with [input from](https://github.com/drud/ddev/discussions/2740)[@ops-andy](https://github.com/ops-andy) (thanks!)

[DDEV-Local](http://github.com/drud/ddev) and Docker work fine for local development on an inexpensive Chromebook!

I’d been wanting to try out a Chromebook for DDEV-Local development for a while and I confess that I did an impulse buy on Amazon and got the 8GB [Asus C425](https://www.asus.com/us/Laptops/ASUS-Chromebook-14-C425TA/) for $329, which is a lot less than the fancy loaded MacBook Pro I usually use. It works great, mostly because it runs pure Debian Linux in what it calls the “Terminal”.

Here’s the step-by-step to set up a DDEV-Local development environment:

1. In _Settings_ → _Linux (Beta)_, “Turn on” Linux.
2. In Linux, create a password for the username you’ve created by running `sudo passwd $USER`.
3. Install Docker for Linux as in the [DDEV docs](https://ddev.readthedocs.io/en/stable/users/docker%5Finstallation/#linux-installation-docker-ce). You’ll be installing the [_Debian_ version](https://docs.docker.com/install/linux/docker-ce/debian/).
4. Install Linuxbrew by running `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`.
5. Install DDEV and docker-compose by running `brew tap drud/ddev && brew install ddev docker-compose`.
6. Add your user to the “docker” group by running `sudo usermod -aG docker $USER`.
7. Reboot the Debian container by running `sudo reboot`, then open “Terminal” again. You should be able to run `docker ps` successfully.
8. Allow DDEV to bind to all interfaces by running `ddev config global --router-bind-all-interfaces`.
9. To use a browser to visit your site, you have two options. The first is to just install a browser like Firefox or Chromium inside Linux and use the built-in X11 capabilities to use that browser. The second is to use Chrome’s browser; that has some problems especially with HTTPS, as described below.
   - To install a browser, run `sudo apt-get update && sudo apt-get install -y chromium-browser`. You’ll also want to run `mkcert -install`. Then use the browser inside Linux.
   - To use the built-in Chrome browser:
     - Find out the IP address of your Debian terminal with `ip -a | grep eth0`. You’ll see something like “inet 100.105.93.95/28 brd 100.115.92.207” and the “100.115.92.195” is what you’re after.
     - Install a Chrome extension like Host Switch Plus and configure it (Edit 2020-10-14: Host Switch Plus is no longer available, but [Livehosts](https://chrome.google.com/webstore/detail/livehosts/hdpoplemgeaioijkmoebnnjcilfjnjdi) may offer the same capability). Unfortunately the Chrome browser doesn’t innately understand how to connect to the web server running in the Debian terminal system, so we’ll use Host Switch Plus to convert `*.ddev.site` to connect to 100.115.92.195 (in my case). Here’s the configuration:

![Screenshot of the "Host Switch Plus" plugin configuration panel set as described in the preceding text. Default set to "direct". Checkbox for "enable" selected. IP set to the IP you just grepped for and Domain set to *.ddev.site](https://ddev.com/app/uploads/2020/04/HostSwitchPlus.png)

Now you can create a project the normal way and get to work! This is the simple path to a Drupal 8 Composer build, but there are lots of other DDEV-Local [quickstart guides](https://ddev.readthedocs.io/en/stable/users/cli-usage/#quickstart-guides).

- `mkdir -p ~/workspace/d8composer && cd ~/workspace/d8composer`
- `ddev config --project-type=drupal8 --docroot=web --create-docroot`
- `ddev composer create drupal/recommended-project:^8`
- `ddev launch` and go install it!

Note: I haven’t figured out a way to get Host Switch Plus to work with HTTPS port 443.

Some comments about working with the Asus Chromebook:

- It was a pleasant experience with a nice keyboard (far better than the MacBook Pro). Acceptable performance for a laptop deep in the low-cost realm. It has great battery life, even with Docker running and doing lots. It has Linux (Debian Stretch), which is lovely. And it’s nicely integrated, including default X11 support (GUI Linux apps “just work” and display with no effort). It has two USB-C ports (fantastic) but also a USB-A (unlike Apple!)
- I have to confess I’d probably buy a more powerful Chromebook, with more RAM and storage, if I were going to work with this for the long term; perhaps I’d get a Pixelbook.
- Mostly there’s nothing fiddly to do. You just have a great Linux computer that works with the nice ChromeOS desktop, and the Linux is pretty much natural, standard, no hoops to jump through.
- I ran into some apps that I was unsatisfied with. Slack and [Notion.so](http://notion.so) didn’t work well as Android apps. (Too slow on this computer, which also doesn’t have a touchscreen, so not that much of a fit for Android apps.)
- There were some apps that I couldn’t use at all unless I ran them in Linux. They ran fine, but Linux GUI apps just aren’t as well-tuned as those on other platforms. I had to run PhpStorm in Linux, and Firefox or Chrome if I wanted to use HTTPS.
- Of course I didn’t have the versatility of the Mac or the predictability and wide app support of Windows. But if I were doing only web development and normal editing/daily work stuff it might just work out.
- Installing PhpStorm and other JetBrains applications on the Linux side was not very hard:
  - `sudo apt-get install libnss3`
  - Download [JetBrains Toolbox for Linux](https://www.jetbrains.com/toolbox-app/) and install and run it, then use it to fetch and install PhpStorm.

Since we’re in the era of Linux laptops with Chromebooks and WSL2, we’ll soon be doing a full writeup on how to use DDEV-Local with WSL2. It’s crazy fast.

Where do _you_ run DDEV? If you have a unique setup, consider sharing the specs and adding a link in our [community repository](https://github.com/drud/awesome-ddev) so others can check it out too!
