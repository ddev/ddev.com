---
title: "DDEV, Docker, Chromebook!"
pubDate: 2020-05-04
summary: Lessons learned running DDEV on an inexpensive Chromebook.
modifiedDate: 2025-07-16
modifiedComment: "Significant updates five years later in 2025... it still works! Chromebook is still a little confused about what it is, but it works as a fine Linux development environment."
author: Randy Fay
featureImage:
  src: /img/blog/2020/04/chromebook-3.jpg
  alt: Photograph of Randy’s Chromebook where DDEV’s busy running a triumphant Composer install.
categories:
  - Guides
---

## Introduction

[DDEV](https://github.com/ddev/ddev) and Docker CE work fine for local development on a Chromebook!

A few years ago I wrote the first version of this article after experimenting with an 8GB [Asus C425](https://www.asus.com/us/Laptops/ASUS-Chromebook-14-C425TA/) for $329, which is a lot less than any fancy Mac. It worked great, mostly because Chromebooks can run pure Debian Linux in what they call the “Terminal”.

Fast forward to 2025 and I saw an enticing review of the very nice 16GB Lenovo Chromebook Plus, which turns out to be an [ARM64](arm64-apple-silicon-m1-ddev-local-what-does-it-all-mean.md) machine (the same architecture as Apple Silicon). It's a much beefier machine, with great build quality and a much higher finish level, but again very nice.

Installing on a Chromebook is a reminder of how versatile DDEV is. In almost any environment that has a Docker provider you get get it going with minimal effort. That includes Windows, WSL2, Mac, Linux, Chromebook, even [Raspberry Pi](watch-ddev-local-on-arm64-raspberry-pi.md).

## Basic Chromebook Setup for DDEV

Here’s the step-by-step to set up a DDEV development environment in 2025:

1. In _Settings_ → About ChromeOS → Developers → Linux Development Environment, “Set up". (For the disk size, you'll be using Docker images, so I used about 100GB, but it's what you need that matters.)
2. In Linux, create a password for the username you’ve created by running `sudo passwd $USER`.
3. Do some basic updates: 

    ```shell
    sudo apt-get update && sudo apt-get upgrade -y
    sudo apt-get install -y git vim curl wget gnupg2 lsb-release apt-transport-https ca-certificates
    ```
4. Install Docker CE as in the [Docker docs for Debian](https://docs.docker.com/install/linux/docker-ce/debian/) (See also [DDEV docs](https://ddev.readthedocs.io/en/stable/users/install/docker-installation/#docker-installation-linux).)
5. Install DDEV using the normal [Debian install instructions](https://ddev.readthedocs.io/en/stable/users/install/ddev-installation/#debianubuntu).
6. Add your user to the `docker` group by running `sudo usermod -aG docker $USER`.
7. Reboot the Debian container by running `sudo reboot`, then open “Terminal” again. You should be able to run `docker ps` successfully.
8. To access your site in a browser, you have two options. The first (preferred) is to install a browser like Chromium or Firefox and use the system's built-in graphics to run it. The second is to use the Chromebook's browser, which is far more complex. I'll add an addendum about how you can do it, but it's not easy and not recommended, but it's a fun demonstration of `dnsmasq`.
9. Install the Chromium browser with `sudo apt-get update && sudo apt-get install -y chromium`. You’ll also want to run `mkcert -install`. Then use the browser inside the Debian Linux container.
10. Create your project or check it out, `ddev config`, `ddev start`. Everything works, including `ddev launch`. Create a project the normal way and get to work! This is the simple path to a Drupal 11 Composer build, but there are lots of other DDEV [quickstart guides](https://ddev.readthedocs.io/en/stable/users/quickstart/).

    - `mkdir -p ~/workspace/d11 && cd ~/workspace/d11`
    - `ddev config --project-type=drupal11 --docroot=web`
    - `ddev composer create-project drupal/recommended-project`
    - `ddev launch` and go install it!
11. If you want to use PhpStorm or GoLand, they're easy enough to install in the Linux environment. You may need to install `snapd` first, (`sudo apt update && sudo apt install -y snapd`) and then install them with `sudo snap install phpstorm --classic` or `sudo snap install goland --classic`.

## Some comments about working with the Chromebook:

- It was a pleasant experience with a nice keyboard. Outstanding performance, but less than my MacBook Air M4. It has great battery life, even with Docker running and doing lots. It has Linux (Debian), which is lovely. And the Linux side has great graphics support (GUI Linux apps work well and display with no effort). It has two USB-C ports but also a USB-A.
- As with Windows with WSL2, having two completely different computers running on one computer adds complexity along with its power. I had to run several tools in the Linux environment (like GoLand and PhpStorm, both worked there though as snap installs.) And I ended up running 1Password *both* in the Chrome side (browser extension) and as an app on the Linux side so I could get proper SSH Agent support from it. You have a great Linux computer that works with the nice ChromeOS desktop, and the Linux is pretty much natural, standard, no hoops to jump through.
- I ran into some apps that I was unsatisfied with. Slack and [Notion.so](http://notion.so) didn’t work well as Android apps. I installed Discord as an Android app, and didn't like it much.
- Of course I didn’t have the versatility of the Mac or the predictability and wide app support of Windows, but if I were doing only web development and normal editing/daily work stuff it might work out. Mainstream environments are easier. Plain Ubuntu is easier because it's just one machine, not several.

## Adding `dnsmasq` to Use the Chromebook-side Chrome Browser

These instructions help you to use the Chromebook-side Chrome browser and access the DDEV webserver running in Debian Linux (`Crostini`, or `terminal`). It's easier just to use Chromium inside the Debian `terminal` app. 

Basically, the Chromebook-side browser doesn't innately know about the lovely Debian Linux instance that's waiting there, so it doesn't know how to connect to DDEV, which essentially appears to be on a different computer. These instructions are inspired by [How To Apply ChromeOS's Linux Container's /etc/hosts Outside of the Container in Chrome](https://chrisbeley.com/software-engineering/how-to-apply-chromeos's-linux-container's-etchosts-outside-of-the-container-in-chrome), which is a little more complex than we need for most things, but it was certainly inspiring.

These assume that you already have DDEV installed and working in the `terminal`.

1. Install the simple DNS server `dnsmasq` with `sudo apt update && sudo apt install -y dnsmasq dnsutils`.
2. Configure DDEV to allow connections from other machines with `ddev config global --router-bind-all-interfaces` and optionally `ddev config --bind-all-interfaces` for your project. (The Chromebook/Chrome side is essentially a different machine.)
3. The CA (Certificate Authority) that Chrome uses to authenticate certificates is normally installed with just `mkcert -install`, and you should already have done that, but remember that the Chromebook browser is completely separate from anything `mkcert` can access, so we'll import the CA manually into Chrome. In Chrome's Certificate Manager (`chrome://certificate-manager/`), go to "Local Certificates" and import from "Linux Files" the `rootCA.pem` in the directory shown by `mkcert -CAROOT`. (I didn't know how to navigate to the hidden directory `~/.local/share/mkcert` so I just copied `~/.local/share/mkcert/rootCA.pem` into my `Downloads` directory.)
4. Find out the IP address of the `terminal` Debian container with `dig +short penguin.lxd`. Mine was `100.115.92.204`, so I'll use that as an example.
5. Now we want to configure `dnsmasq` to act as a fairly normal DNS server, but also one that reports `*.ddev.site` as `100.115.92.204` in my case. 
  * `/etc/dnsmasq.d/ddevsite-rules` can contain `address=/ddev.site/100.115.92.204`
  * `/etc/dnsmasq.d/upstream-dns` can contain `server=1.1.1.1`, which just makes it query Cloudflare's DNS for everything it doesn't know about.
  * Restart dnsmasq with `sudo systemctl restart dnsmasq` and you should be able to look up `something.ddev.site` using `dig +short something.ddev.site` and it should report that `something.ddev.site` is `100.115.92.204` in my example. Normally we always use `localhost` or `127.0.0.1` for this, but here we're essentially setting up for access from a different computer, so we'll convince the Chromebook to use the `dnsmasq` server as its DNS server.
6. Configure `/etc/dhcp/dhclient.conf` with `echo 'prepend domain-name-servers 127.0.0.1;' | sudo tee -a /etc/dhcp/dhclient.conf > /dev/null`.
7. Convince the Chromebook to use `dnsmasq` as its DNS server with Settings (lower right) → Your WIFI/network → Network → Name Servers → Custom Name Servers
8. I wasn't able to use the standard ports 80 or 443, so I changed to `ddev config global --router-http-port=8080 --router-https-port=8443` to use ports 8080 and 8443 (followed by `ddev restart`)

## How Do You Use DDEV?

Where do _you_ run DDEV? If you have a unique setup, we'd love to have a guest blog on [ddev.com](/), or consider sharing the specs and adding a link to the [Awesome DDEV Links List](https://github.com/ddev/awesome-ddev) so others can check it out too!
