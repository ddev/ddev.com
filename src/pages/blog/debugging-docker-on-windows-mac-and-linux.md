---
title: "Debugging Docker on Windows, Mac, and Linux"
pubDate: 2018-10-18
author: Randy Fay
featuredImage: https://ddev.com/app/uploads/2018/10/john-carlisle-539580-unsplash-e1539785420243.jpg
categories:
  - DDEV
---

We built [DDEV](https://ddev.com/what-is-ddev/) to make it easier for people to set up local development environments for PHP projects. When things aren’t working as expected, people need help, and we need to hear from them. We provide direct help to our community [through our documentation](https://ddev.readthedocs.io/en/latest/#support), in Slack in both the Drupal and TYPO3 communities, and on [Stack Overflow](https://stackoverflow.com/tags/ddev). It’s something we like doing because it gets us closer to our users, and we get direct feedback so we can improve our products.

Over the year since DDEV’s first public release, we’ve started to see patterns and common problems. One thing we noticed is a significant share of the advice we offer to users is helping them get Docker working right on their machines. Especially on Windows and Linux. Docker works for most people out of the box with no trouble, yet a few things have a tendency to trip people up.

In this article, we’re going to help you quickly resolve your Docker problems and also tell you about some troubleshooting methods you can use in DDEV.

### “Factory defaults” is your friend

It’s worth considering starting with the “reset to factory defaults” option for Docker. Taking this step can solve most problems you’ll run into on Docker for Windows and Docker for Mac. However, there’s a caveat: it will destroy your databases currently imported into your projects. So you must back them up if you need to.

To backup your databases, you can db dump, but it’s easy to take a snapshot with DDEV. Run [ddev snapshot](https://ddev.readthedocs.io/en/latest/users/cli-usage/#snapshotting-and-restoring-a-database) in each project to capture your databases before doing the factory reset.

Next, follow instructions for [resetting to factory defaults for Windows](https://docs.docker.com/docker-for-windows/#reset) and [for mac OS](https://docs.docker.com/docker-for-mac/#reset).

If that factory reset doesn’t resolve your issues, you can take the following steps to narrow down the problem.

### Check your Docker setup is working as expected

Docker needs to be able to a few things for DDEV to work:

Can Docker mount the project code directory from the host into the container? The project code directory is usually somewhere in a subdirectory of your home directory.  
Can Docker mount \~/.ddev for SSL cert cache and import-db?  
Can Docker access TCP ports on the host to serve HTTP and HTTPS? These are ports 80 and 443 by default, but they can be changed on a per-project basis.

To conduct a check to see is all working as expected, we’ve come up with a single Docker command that will typically tell if there’s a problem that will prevent DDEV from running. This command here is designed to work on all Docker installs.

Use your terminal to execute this command in your project directory. If you’re on Windows please use git-bash or Docker Quickstart Terminal (on Docker Toolbox).

`docker run --rm -t -p 80:80 -v "/$PWD:/tmp/projdir" -v "/$HOME:/tmp/homedir" busybox sh -c "echo ---- Project Directory && ls //tmp/projdir && echo ---- Home Directory && ls //tmp/homedir"`

If that fails you may get an error which you can troubleshoot. Here are some of the most common errors we see reported from users, and how to resolve them.

- “port is already allocated”: See [how to eliminate port conflicts](https://ddev.readthedocs.io/en/latest/users/troubleshooting/#webserver-ports-are-already-occupied-by-another-webserver).
- “Error response from daemon: Get https://registry-1.docker.io/v2/” – Docker may not be running so try restarting it. Or you may not have any access to the internet.
- “403 authentication required” when trying to `ddev start`: Try `docker logout` and do it again. Docker authentication is _not_ required for any normal ddev action.

### Check common errors related to shared directories

A common error is related to sharing host filesystems or directories.

We’ve heard reports on both Docker for Windows or Docker for Mac, that users don’t see shared directories show up in the web container. You can check if you type `ddev ssh` into your container, and type `ls`. If you don’t see anything listed, there’s a problem. For example on Windows, if you change your Windows password then your shared drives will not be able to mount, and you’ll need to fix sharing.

Also, you might get these following error messages.

- `invalid mount config for type "bind": bind mount source path does not exist: <some path>` means the host filesystem isn’t successfully shared into the Docker container.
- “The path … is not shared and is not known to Docker”: Visit Docker’s preferences/settings->File sharing and share the appropriate path or drive.

It’s quick to fix, just unshare and then reshare the drive. If you haven’t already, consider resetting Docker to factory defaults. This often helps in this situation because Docker goes through the whole authentication process again.

### On Linux only: Watch out for the out of date Docker Compose!

If you didn’t explicitly install [Docker Compose](https://docs.docker.com/compose/compose-file/), you’re probably not using the most up to date version. Even the standard `apt-get install docker docker-compose` will get you an incompatible version of Docker Compose.

To get it set up, you have to download Docker Compose from Github and directly install it.

You’ll find out about this right away because ddev will tell you on `ddev start` or most other ddev commands. The [Docker Installation page](https://ddev.readthedocs.io/en/latest/users/docker%5Finstallation/) has details about Linux installation.

### So how did it go? Tell us!

We hope this helped you resolve any of the issues you had getting Docker set up and running for DDEV. Still stuck? Reach out for [further help](https://ddev.readthedocs.io/en/latest/#support) if you need it.

DDEV can make your work easier and smoother, [get started today!](https://ddev.com/get-started/)

---

Photo by [John Carlisle](https://unsplash.com/photos/l090uFWoPaI?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/wires?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText)
