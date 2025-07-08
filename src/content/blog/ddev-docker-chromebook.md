---
title: "DDEV, Docker, Chromebook!"
pubDate: 2020-05-04
summary: Lessons learned running DDEV on an inexpensive Chromebook.
modifiedDate: 2025-07-08
modifiedComment: "Significant updates five years later in 2025... it still works! Chromebook is still a little confused about who it is, but it works as a fine Linux development environment."
author: Randy Fay
featureImage:
  src: /img/blog/2020/04/chromebook-3.jpg
  alt: Photograph of Randy’s Chromebook where DDEV’s busy running a triumphant Composer install.
categories:
  - Guides
---

TODO:
* Goland and PhpStorm work ok in strict linux (Crostini) setup
* Using the Chromebook-side browser is really complicated (install CA, Use dnsmasq, link to article)
* Addendum about using dnsmasq

[DDEV](http://github.com/ddev/ddev) and Docker CE work fine for local development on a Chromebook!

A few years ago I wrote the first version of this article after experimenting with an 8GB [Asus C425](https://www.asus.com/us/Laptops/ASUS-Chromebook-14-C425TA/) for $329, which is a lot less any fancy Mac. It worked great, mostly because it runs pure Debian Linux in what it calls the “Terminal”.

Fast forward to 2025 and I saw an enticing review of the very nice 16GB Lenovo Chromebook Plus, which turns out to be an ARM64 machine. It's a much beefier machine, with a higher finish level, but again very nice. 

Here’s the step-by-step to set up a DDEV development environment:

1. In _Settings_ → About ChromeOS → Linux Development Environment, “Turn on” Linux.
2. In Linux, create a password for the username you’ve created by running `sudo passwd $USER`.
3. Install Docker CE as in the [DDEV docs](https://ddev.readthedocs.io/en/stable/users/install/docker-installation/#docker-installation-linux). You’ll be installing the [_Debian_ version](https://docs.docker.com/install/linux/docker-ce/debian/).
4. Install DDEV using the normal [Debian install instructions](https://ddev.readthedocs.io/en/stable/users/install/ddev-installation/#debianubuntu).
5. Add your user to the `docker` group by running `sudo usermod -aG docker $USER`.
6. Reboot the Debian container by running `sudo reboot`, then open “Terminal” again. You should be able to run `docker ps` successfully.
7. Allow DDEV to bind to all interfaces by running `ddev config global --router-bind-all-interfaces`.
8. To use a browser to visit your site, you have two options. The first is to install a browser like Chromium or Firefox Linux and use the built-in X11 capabilities to use that browser. The second is to use the Chromebook's browser, which is far more complex. I'll add an addendum about how you can do it, but it's not easy and not recommended.
9. Install Chromium browser with `sudo apt-get update && sudo apt-get install -y chromium-browser`. You’ll also want to run `mkcert -install`. Then use the browser inside Linux.
10. Create your project or check it out, `ddev config`, `ddev start`. Everything works, including `ddev launch`. Create a project the normal way and get to work! This is the simple path to a Drupal 11 Composer build, but there are lots of other DDEV [quickstart guides](https://ddev.readthedocs.io/en/stable/users/quickstart/).

    - `mkdir -p ~/workspace/d11 && cd ~/workspace/d11`
    - `ddev config --project-type=drupal11 --docroot=web`
    - `ddev composer create-project drupal/recommended-project`
    - `ddev launch` and go install it!
11. If you want to use PhpStorm or GoLand, they're easy enough to install in the Linux environment. You may need to install `snapd` first, (`sudo apt update && sudo apt install -y snapd`) and then install them with `sudo snap install phpstorm --classic` or `sudo snap install goland --classic`.

Some comments about working with the Chromebook:

- It was a pleasant experience with a nice keyboard. Outstanding performance, but less than my MacBook Air M4 It has great battery life, even with Docker running and doing lots. It has Linux (Debian), which is lovely. And the Linux side has great graphics support (GUI Linux apps work well and display with no effort). It has two USB-C ports but also a USB-A.
- Like Windows with WSL2, this is a bit schizophrenic. I had to run several tools in the Linux environment (like GoLand and PhpStorm, both worked there though as snap installs.) And I ended up running 1Password *both* in the Chrome side (browser extension) and as an app on the Linux side so I could get proper SSH Agent support from it. You have a great Linux computer that works with the nice ChromeOS desktop, and the Linux is pretty much natural, standard, no hoops to jump through.
- I ran into some apps that I was unsatisfied with. Slack and [Notion.so](http://notion.so) didn’t work well as Android apps. I installed Discord as an Android app, and didn't like it much.
- There were some apps that I couldn’t use at all unless I ran them in Linux. They ran fine, but Linux GUI apps aren’t as well-tuned as those on other platforms. I had to run PhpStorm in Linux, and Firefox or Chrome if I wanted to use HTTPS.
- Of course I didn’t have the versatility of the Mac or the predictability and wide app support of Windows. But if I were doing only web development and normal editing/daily work stuff it might work out.
- Installing PhpStorm and other JetBrains applications on the Linux side was not very hard (TODO: INstall snapd, --classic)

Where do _you_ run DDEV? If you have a unique setup, consider sharing the specs and adding a link in our [community repository](https://github.com/ddev/awesome-ddev) so others can check it out too!

Addendum for using regular browser

- To use the built-in Chrome browser:
  - Find out the IP address of your Debian terminal with `ip -a | grep eth0`. You’ll see something like “inet 100.105.93.95/28 brd 100.115.92.207” and the “100.115.92.195” is what you’re after.
  - Install a Chrome extension like Host Switch Plus and configure it (Edit 2020-10-14: Host Switch Plus is no longer available, but [Livehosts](https://chrome.google.com/webstore/detail/livehosts/hdpoplemgeaioijkmoebnnjcilfjnjdi) may offer the same capability). Unfortunately the Chrome browser doesn’t innately understand how to connect to the web server running in the Debian terminal system, so we’ll use Host Switch Plus to convert `*.ddev.site` to connect to 100.115.92.195 (in my case). Here’s the configuration:
