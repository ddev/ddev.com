---
title: "DDEV-Local NFS Mounting Setup: macOS"
pubDate: 2019-02-13
author: Randy Fay
featuredImage: https://ddevdotcom.ddev.site/app/uploads/2019/02/Drupal-8-Install_-normal-mount-NFS-and-webcache-time-in-seconds-less-is-better.png
categories:
  - DDEV
---

In [DDEV-Local v1.6.0](https://ddev.com/ddev-local/ddev-v1-6-0-nfs-mounting-and-chocolatey/) we’ve introduced NFS mounting, which really speeds things up over standard Docker mounting. We’d love to have you try it, but it does require just a little bit of configuration on the host side.

In the above chart are some quick performance comparisons. Here you see times for a Drupal 8 install with traditional Docker mounting, NFS mounting, and webcache. The bottom line is NFS mounting is about 3 times as fast as traditional Docker mounting!

OK, let’s get started. On macOS, you need to do three basic things:

1. Give “Full Disk Access” to the terminal app you’re going to use (on macOS Mojave and later). For example, if using iTerm2, you would go to Mac preferences -> Security and Privacy -> Privacy and click on “Full Disk Access” at the bottom of the list and then use the “+” to add iTerm2\. This is demonstrated in the screencast below.
2. Configure NFS on your machine. The simplest way to do this is by running the script [we provide for this purpose](https://raw.githubusercontent.com/drud/ddev/master/scripts/macos%5Fddev%5Fnfs%5Fsetup.sh). But it’s your machine, so you can configure it manually or however you like, as long as the directory where you have your projects is shared. The script adds /Users to /etc/exports and then enables and start the nfsd daemon. After it’s done, run `showmount -e` and you should see it exporting your /Users directory.
3. Test and make sure it’s all working! To do this, go to a project and just `ddev debug nfsmount` to see if it’s working or not. When it is, `ddev config --nfs-mount-enabled=true` and `ddev start` and you’re off to the races.

For more detail and for Windows and Linux setup do please [read the docs](https://ddev.readthedocs.io/en/stable/users/performance/#using-nfs-to-mount-the-project-into-the-container).

There are also a number of debugging hints in the [debugging section of the docs](https://ddev.readthedocs.io/en/stable/users/performance/#debugging-ddev-start-failures-with-nfs%5Fmount%5Fenabled-true).
