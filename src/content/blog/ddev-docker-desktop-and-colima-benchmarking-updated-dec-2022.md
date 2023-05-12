---
title: "DDEV macOS Docker Desktop/Colima/Mutagen Benchmarking updated Dec 2022"
pubDate: 2022-12-27
summary: "Comparison of Drupal install performance on macOS using Docker Desktop and Colima, with and without Mutagen."
author: Randy Fay
featureImage:
  src: /img/blog/2022/12/macos-m1-vs.-drupal-10-web-install.svg
  alt: Bar chart depicting Drupal 10 install time, in seconds, with various configurations on an M1 Mac
  shadow: true
categories:
  - Performance
---

I wrote about performance comparisons between [Docker Desktop](https://www.docker.com/products/docker-desktop/) and [Colima](https://github.com/abiosoft/colima) on macOS both with and without [Mutagen](https://ddev.readthedocs.io/en/latest/users/install/performance/#mutagen) in [March, 2022](https://ddev.com/ddev-local/docker-desktop-and-colima-benchmarking-on-macos/), and wanted to update the numbers. Things are looking great everywhere. There are now many more permutations, though. Colima has 9p and VirtioFS file mounting, and Docker Desktop’s VirtioFS implementation now works well (and is fast!).

(**Edited 2022-12-28**: Colima version 0.5.2 solved a couple of significant performance problems with VirtioFS mounting, so I updated the fantastic numbers and removed the caveat about `ddev import-db` being slow.)

**Methodology**: I tested each of these permutations with both a [Puppeteer script](https://github.com/ddev/ddev-puppeteer) to do a web install of Drupal 10 demo_umami and also a `drush` command-line install (`ddev mysql -e "DROP DATABASE IF EXISTS db; CREATE DATABASE db;" && ddev exec killall -USR2 php-fpm && rm -rf web/sites/default/files/* && ddev mutagen sync && time ddev drush si demo_umami -y`). I tried each 3 times to make sure that the numbers were tracking reasonably, and then took the mean. The Drupal 10 installation is a very heavy web activity that touches thousands of PHP files, and it’s a sequential operation with a fixed timeline, so it’s a tempting thing to use for benchmarking.

As usual, the command-line installs basically tracked about twice as fast as the web-based installs, which was no surprise, so I didn’t include charts for them, although they’re available in the source data.

![Bar chart: “macOS M1 vs. Drupal 10 Web Install (seconds)”](/img/blog/2022/12/macos-m1-vs.-drupal-10-web-install.svg)

_The bottom line is that any setup with Mutagen can do a D10 install in 25-40 seconds, which is astonishing (there was a time that it took 5-6 minutes on most platforms)._ And even without Mutagen, the VirtioFS mounts can do it in 60-80 seconds on both Docker Desktop and Colima.

Here are the results in tabular form:

| Drupal 9 Web Install  | Col Q 9p | Col Q 9p Mut | Col Q sshfs | Col Q sshfs Mut | Col Virt | Col Virt Mutagen | DD Virt | DD Virt Mut | DD FUSE | DD FUSE Mut |
| --------------------- | -------- | ------------ | ----------- | --------------- | -------- | ---------------- | ------- | ----------- | ------- | ----------- |
| D10 install (seconds) | 150      | 43           | 89          | 35              | 36       | 27               | 63      | 32          | 102     | 32          |

For comparison on the results between March 2022 and today:

| Drupal 10 web install time in seconds | March 2022 | Dec 2022 |
| ------------------------------------- | ---------- | -------- |
| Colima sshfs/Mutagen                  | 45         | 35       |
| Colima sshfs alone                    | 160        | 89       |
| Docker Desktop FUSE/Mutagen           | 75         | 32       |
| Docker Desktop FUSE alone             | 300        | 102      |
| Docker Desktop VirtioFS/Mutagen       | 39         | 32       |
| Docker Desktop VirtioFS alone         | 107        | 63       |
| Colima VirtioFS/Mutagen               | 27         |          |
| Colima VirtioFS alone                 | 36         |          |

For more raw numbers and the Drush install times, [here’s the spreadsheet link](https://docs.google.com/spreadsheets/d/1GG69B94ftYlkrNeoI55eUrxLVwIVYkt4mv-R2nJx6YU/edit?usp=sharing).

If you’re interested in Colima with DDEV, see the [docs](https://ddev.readthedocs.io/en/latest/users/docker%5Finstallation/#macos-installation-colima). It’s super easy to set up, and even though it’s a young project, it’s well-maintained and people have been having good experiences with it. And for those of you concerned about Docker Desktop’s new subscription license fee, it’s a great option. But as you see here, it’s a great option for other reasons.

And of course, if you haven’t tried out Mutagen with DDEV on macOS, it’s time. Run `ddev config global --mutagen-enabled` and `ddev restart` and you’re on your way, see [DDEV docs](https://ddev.readthedocs.io/en/latest/users/performance/#using-mutagen). Although we were all worried about filesystem consistency originally, the feature has turned out to be shockingly reliable, but read the docs for caveats.

Some takeaways from this round of testing:

- **Everything is faster** than it was early this year, sometimes by a _lot_.
- **Docker Desktop VirtioFS** has made incredible progress. Now with macOS Ventura 13.1, Docker Desktop 4.15.0, the promise has met reality. It’s super fast, and seems to be reliable. The problems that plagued it for most of the last year seem to be resolved, permissions, ownership, and DDEV custom commands work right. In March 2022, it wasn’t usable, but now it’s great. It’s really, really fast with Mutagen enabled, but quite usable even without.
- **Colima with 9p mounting is nearly unusable** – I wasn’t willing to wait for it to complete the install. Even though I show it in the graph as taking 150 seconds, the reality is it would have taken 600 or more, but that would have skewed the graph and I was impatient. (Note that 9p is the default mount type in Colima 0.5.1, so don’t use it right now). I recommend that you use `mountType: sshfs` to start in Colima, but experiment with `mountType: virtiofs` if you’re on macOS Ventura.
- **Mutagen remains a great default choice**, but Colima and Docker Desktop VirtioFS are probably now adequate choices if you want complete consistency. (Although they passed my casual tests of the things that used to break, I don’t have many real-world reports of what happens when people use these without Mutagen.)
- At this writing there is a bug in Colima where some upgraded instances aren’t mounting at all. Make sure in your `~/.colima/default/colima.yaml` mountType is not empty; change it to `sshfs` or consider `virtiofs` if you’re on macOS Ventura.
- For DDEV + Colima I still recommend the conservative `--mount-type=sshfs --vm-type=qemu` but the more adventurous of you will have fun with `--vm-type=vz --mount-type=virtiofs`, and it remains wonderful to work with Mutagen enabled in DDEV. I look forward to hearing your feedback.

Congratulations to the [Colima](https://github.com/abiosoft/colima), [Lima](https://github.com/lima-vm/lima), and [Docker Desktop](https://www.docker.com/products/docker-desktop/), and [Mutagen](https://mutagen.io) teams for an amazing year of progress!

Interested in engaging more with the DDEV community? Catch us in the [Discord Server](https://discord.gg/hCZFfAMc5k), on [Stack Overflow](https://stackoverflow.com/tags/ddev), and in the [Issue Queue on GitHub](https://github.com/ddev/ddev/issues). We’d love to have you. Interested in knowing more about DDEV? It’s quick and easy to start up in the [docs](https://ddev.readthedocs.io/en/latest/).
