---
title: "Docker Desktop and Colima Benchmarking on macOS"
pubDate: 2022-03-23
summary: Speed comparison of macOS Docker filesystems using Docker Desktop and Colima.
author: Randy Fay
categories:
  - Performance
---

There’s been lots of excitement about the new docker-based performance options on macOS with DDEV lately. In DDEV v1.19 [Colima](https://github.com/abiosoft/colima) is a new option, and Colima with Mutagen enabled is screaming fast. But Docker Desktop has just released an experimental VirtioFS filesystem mounting system that is much faster than previous iterations. So I was interested in seeing how all these things compare.

**Methodology**: I tested each of these permutations with both a [Puppeteer script](https://github.com/drud/ddev-puppeteer) to do a web install of Drupal 9 demo_umami and also a `drush` command-line install (`ddev mysql -e "DROP DATABASE IF EXISTS db; CREATE DATABASE db;" && ddev exec killall -USR2 php-fpm && time ddev drush si -y demo_umami --account-pass=admin`). I tried each 3 times to make sure that the numbers were tracking reasonably, and then took the mean. The Drupal 9 installation is a very heavy web activity that touches thousands of PHP files, and it’s a sequential operation with a fixed timeline, so it’s a tempting thing to use for benchmarking.

It turned out that the command-line installs basically tracked about twice as fast as the web-based installs, which was no surprise, but it probably means we don’t have to look at both of them to get a good idea of what’s going on, so I’ll show the comparison only for the command-line install, but the other graphs are in the linked spreadsheet.

![](/img/blog/2022/03/macos-m1-vs.-drupal-drush-install-seconds.png)

([SVG higher resolution available](https://www.dropbox.com/s/47dcavi8yfdmglu/macOS%20M1%20vs.%20Drupal%20drush%20install%20%28seconds%29.svg?dl=0)) The bottom line is that Colima with Mutagen can do a D9 install in 20 seconds, which is astonishing. Colima with NFS is also really fast (just 50 seconds). Docker Desktop “bare” without NFS or Mutagen is hopelessly slow, but better with NFS and pretty good with Mutagen. The “New Virtualization” option gets the timing down to nearly where Mutagen is with Docker Desktop, and VirtioFS is better, but still nowhere near as fast as Colima with Mutagen. Docker Desktop with VirtioFS + Mutagen is screaming fast (about the same as Colima with Mutagen) but it has a big asterisk – there were loads of errors output, and VirtioFS has problems with DDEV (and lots of other things).

If you’re interested in the raw numbers and other graphs, [here’s the spreadsheet link](https://docs.google.com/spreadsheets/d/1yLE5TcWyVxv5taut%5FlKl1xqYCPK0%5FajL-x8tjcCcle0/edit#gid=0).

If you’re interested in Colima with DDEV, see the [docs](https://ddev.readthedocs.io/en/latest/users/docker%5Finstallation/#macos-installation-colima). It’s super easy to set up, and even though it’s a young project, it’s well-maintained and people have been having good experiences with it. And for those of you concerned about Docker Desktop’s new subscription license fee, it’s a great option. But as you see here, it’s a great option for other reasons.

And of course, if you haven’t tried out Mutagen with DDEV on macOS, it’s time. People have had great experiences, just `ddev config global --mutagen-enabled` and `ddev restart` and you’re on your way, see [DDEV docs](https://ddev.readthedocs.io/en/latest/users/performance/#using-mutagen). A nice feature of DDEV v1.19 is that it doesn’t use nearly as much disk space as this feature did previously.

If you’re interested in the Docker Desktop VirtioFS feature and how it’s maturing, the _very extensive_ discussions are going on in [these](https://github.com/docker/for-mac/issues/1592) [issues](https://github.com/docker/roadmap/issues/7). Some people are reporting great performance gains, others are having a number of permission-related problems similar to some of the problems it has with DDEV. I _do not recommend_ enabling the experimental features in Docker Desktop for use with DDEV at this time (Docker Desktop v4.6.1).

Interested in engaging more with the DDEV community? Catch us in the [Discord Server](https://discord.gg/hCZFfAMc5k), on [Stack Overflow](https://stackoverflow.com/tags/ddev), and in the [Issue Queue on GitHub](https://github.com/drud/ddev/issues). We’d love to have you. Interested in knowing more about DDEV? It’s quick and easy to start up in the [docs](https://ddev.readthedocs.io/en/latest/).
