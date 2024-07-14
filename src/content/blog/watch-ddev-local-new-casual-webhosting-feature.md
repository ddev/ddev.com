---
title: "Watch: DDEV New Casual Webhosting Feature"
pubDate: 2020-12-14
modifiedDate: 2024-07-06
summary: Video overview of DDEV’s "casual hosting" setup.
author: Randy Fay
featureImage:
  src: /img/blog/2020/12/casual-diy-webhosting.png
  alt: Screen grab of video’s title frame
  hide: true
categories:
  - Guides
  - Videos
---

<div class="video-container">
<iframe loading="lazy" title="DDEV Casual Webhosting" width="500" height="281" src="https://www.youtube.com/embed/beC46R_61gw?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
</div>

[DDEV](https://github.com/ddev/ddev) supports “[Casual webhosting](https://ddev.readthedocs.io/en/stable/users/alternate-uses/#casual-project-webosting-on-the-internet-including-lets-encrypt) including Let’s Encrypt.” DDEV users have often requested the ability to use DDEV as a self-managed low-end web server, for things like small sites, demonstrating projects to stakeholders, etc.

## Why “Casual Webhosting”?

Ever since the beginning of DDEV, folks have found its simplicity and per-project configuration to be delightful, and have wanted that for simple hosting as well. Now you can set up a site the way you do on your local machine, with the same commands and capabilities, and set up as many projects on it as you want to.

## Caveats

We call it “casual” and “experimental” for a reason. It’s unknown how many sites or how much traffic can be handled. This is not managed hosting – if you set it up, you manage it. This is not a scalable solution (although you could always increase the size of the VM you were running it on, or move projects to a new VM). And from a security standpoint… there is no team of security experts vetting this. Some modest efforts have been undertaken to “harden” the images used here, but they may not be adequate.

I personally have a few trivial sites running on this casual webhosting setup on a single $20/month Linode server, and have had no problems in the four years years I've been running them. (See [randyfay.com](http://randyfay.com) for the list of sites).

If you want to show a site to your colleagues or customers, you might get by fine with the `ddev share` command, which requires [no setup at all](sharing-a-ddev-local-project-with-other-collaborators.md).

[Read the Casual Webhosting docs](https://ddev.readthedocs.io/en/stable/users/topics/hosting/)

## Requirements

- Your server must be accessible on the internet
- You must have control of your site’s DNS

## Server setup

1. Spin up a server. I used Linode, and recommend using Ubuntu 24.04.
2. Point DNS to both the server and a test version of the site. Your server should have a name but it doesn’t completely matter. But do point a domain to your site, for example `test.<yoursite>.com` will let you verify that everything is working.
3. Set up a firewall and enable HTTP, HTTPS, and SSH traffic, `ufw allow 80 && ufw allow 443 && ufw allow 22 && ufw enable`.
4. Create your sudo-privileged user (`useradd -m <username>`; `usermod -aG sudo <username>`) and set up for SSH.

## Site Setup

1. Log in as the user you’ve created.
2. Install Docker ([docs](https://ddev.readthedocs.io/en/stable/users/install/docker-installation/#linux). Don’t forget the post-install action required of adding your user to the Docker group, `sudo usermod -aG docker $USER`.
3. Check out the site code.
4. `cd` into your project and `ddev config`, then `ddev config --additional-fqdns=test.your.fqdn`
5. `ddev config global --router-bind-all-interfaces --omit-containers=ddev-ssh-agent --use-hardened-images --performance-mode=none --use-letsencrypt --letsencrypt-email=you@example.com` will set DDEV to listen on all interfaces (not only localhost), use the hardened images, and configure Let’s Encrypt.
6. `ddev start`
7. Import site user-generated files with `ddev import-files` or rsync or any other way you want to do it.
8. Import site database with `ddev import-db`
9. `ddev poweroff` and `ddev start`

## Followup

After you have the site running, you’ll want to consider a number of other actions; see the [docs](https://ddev.readthedocs.io/en/stable/users/topics/hosting/) for full current details.

- Add the real fqdn to your project, `ddev config --additional-hostnames=<your.fqdn,test.<your.fqdn>` and `ddev start` – don’t forget other hostnames that may be expected, like “www”.
- Set up DDEV to start automatically on system startup ([docs](https://ddev.readthedocs.io/en/stable/users/alternate-uses/#casual-project-webosting-on-the-internet-including-lets-encrypt)).
- Set projects/containers to auto-restart if they fail for any reason: `ddev config global --auto-restart-containers`
- Enable outgoing mail from the site (for transactional emails, for example). In general the most sustainable way to do this is to use an SMTP module for your CMS and point it at a service like [Mailgun](https://mailgun.com).
- Enable outgoing mail from the _server_ and have it forwarded to you. This lets system mail notifications be delivered.
