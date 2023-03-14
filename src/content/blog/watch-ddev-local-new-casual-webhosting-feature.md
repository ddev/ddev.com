---
title: "Watch: DDEV New Casual Webhosting Feature"
pubDate: 2020-12-14
summary: Video overview of DDEV’s casual hosting setup.
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

[DDEV](https://github.com/ddev/ddev)‘s v1.16 release has support for “[Casual webhosting](https://ddev.readthedocs.io/en/latest/users/alternate-uses/#casual-project-webosting-on-the-internet-including-lets-encrypt) including Let’s Encrypt.” DDEV users have often requested the ability to use DDEV as a self-managed low-end web server, for things like small sites or sharing prerelease code, etc., and now it has arrived.

## Why “Casual Webhosting”?

Ever since the beginning of DDEV, folks have found its simplicity and per-project configuration to be delightful, and have wanted that for simple hosting as well. Now you can set up a site just the way you do on your local machine, with the same commands and capabilities, and set up as many projects on it as you want to.

## Caveats

We call it “casual” and “experimental” for a reason. It’s unknown how many sites or how much traffic can be handled. This is not managed hosting – if you set it up, you manage it. This is not a scalable solution (although you could always increase the size of the VM you were running it on, or move projects to a new VM). And from a security standpoint… there is no team of security experts vetting this. Some modest efforts have been undertaken to “harden” the images used here, but they may not be adequate.

I personally have three trivial sites running on this casual webhosting setup on a $5/month Linode server, and have had no problems so far. (See [randyfay.com](http://randyfay.com) for the list of sites).

Note that if you just want to show a site to your colleagues or customers, you might get by just fine with the `ddev share` command, which requires [no setup at all](https://ddev.com/ddev-local/sharing-a-ddev-local-project-with-other-collaborators/). 

[Read the Casual Webhosting docs](https://ddev.readthedocs.io/en/latest/users/alternate-uses/#casual-project-webosting-on-the-internet-including-lets-encrypt)

## Requirements

- Your server must be accessible on the internet
- You must have control of your site’s DNS

## Server setup

1. Spin up a server. I recommend using Ubuntu 20.04, which has usable Docker and Docker-compose repositories out of the box. Install DDEV with homebrew or the `install_ddev.sh` script ([read the full docs here](https://ddev.readthedocs.io/en/latest/users/alternate-uses/#casual-project-webosting-on-the-internet-including-lets-encrypt) and [watch the video](https://youtu.be/beC46R%5F61gw), too).
2. Point DNS to both the server and a test version of the site. Your server should have a name but it doesn’t completely matter. But do point a domain to your site, for example `test.<yoursite>.com` will let you verify that everything is working.
3. Set up a firewall and enable HTTP, HTTPS, and SSH traffic, `ufw allow 80 && ufw allow 443 && ufw allow 22 && ufw enable`.
4. Create your sudo-privileged user (`useradd -m <username>`; `usermod -aG sudo <username>`) and set up for SSH.

## Site Setup

1. Log in as the user you’ve created.
2. Install Docker ([docs](https://ddev.readthedocs.io/en/stable/users/docker%5Finstallation/#linux-installation-docker-and-docker-compose) : `sudo apt-get update && sudo apt-get install [docker.io](<http://docker.io>) docker-compose`). Don’t forget the post-install action required of adding your user to the Docker group, `sudo usermod -aG docker $USER`.
3. Check out the site code.
4. `cd` into your project and `ddev config`, then `ddev config --additional-fqdns=test.your.fqdn`
5. `ddev config global --router-bind-all-interfaces --omit-containers=dba,ddev-ssh-agent --use-hardened-images --use-letsencrypt [-letsencrypt-email=you@example.com](<mailto:--letsencrypt-email=you@example.com>)` will set DDEV to listen on all interfaces (not just localhost), not install phpMyAdmin or the ssh-agent, use the hardened images, and configure Let’s Encrypt.
6. `ddev start`
7. Import site user-generated files with `ddev import-files` or rsync or any other way you want to do it.
8. Import site database with `ddev import-db`
9. `ddev poweroff` and `ddev start`

## Followup

After you have the site running, you’ll want to consider a number of other actions:

- Add the real fqdn to your project, `ddev config --additional-hostnames=<your.fqdn,test.<your.fqdn>` and `ddev start` – don’t forget other hostnames that may be expected, like “www”.
- Set up DDEV to start automatically on system startup ([docs](https://ddev.readthedocs.io/en/stable/users/alternate-uses/#casual-project-webosting-on-the-internet-including-lets-encrypt)).
- Set projects/containers to auto-restart if they fail for any reason: `ddev config global --auto-restart-containers`
- Enable outgoing mail from the site (for transactional emails, for example). In general the most sustainable way to do this is to use an SMTP module for your CMS and point it at a service like [Mailgun](https://mailgun.com).
- Enable outgoing mail from the _server_ and have it forwarded to you. This lets system mail notifications be delivered.

Did you know you can now [sponsor DDEV on GitHub](https://github.com/sponsors/drud)? We’re incredibly grateful to those who have so far, and for the contributions of many users over the years. Thank you!

## Video Transcription

<!-- textlint-disable -->

0:00  
Hi, my name is Randy Fay, I am going to give you a little demo today of a new feature of data of local. And that is the casual web hosting feature. It’s cheap and easy. It’s open source. And I’m sure you’ll hear me say several times, this is not a replacement, for managed hosting, they’re different things. But this is a way to get a site up onto the internet, maybe it’s a specialized site, maybe low volume, maybe you just trying to show it off, maybe you’re just maintaining it as you’re demonstrating it to somebody, there’s a lot of good uses for it. And let’s take a look. So people have been liking D dev local for a long time they do the local development, they do a DD of config, they do a D dev start. And they say there it is, and they can change PHP versions, each project can have a different one, it’s way easier than a normal server setup. So people say Can we do this on a server, and yes, now you can put a DD project on a server, and Ddf start and everybody in the world can access it. So there’s a reason though, that it has casual and experimental all over it. So we’re going to take a look at the caveats on it. The performance characteristics and server sizing aren’t known. I’m going to demonstrate today on a linode server, Nano Server a $5 a month, one gigabyte server. And I’ve got a couple of I’ve got a couple of my trivial sites already on one of these. And I think I’ll add this one after we get done today. And of course, I could up up to the $10 a month version, and it’d be fine. But the overall performance characteristics and sizing aren’t known. And of course, there’s no automatic way to scale it up like you would expect in a managed service. This isn’t a managed service, you have to end up managing the host, on which Dev and Docker are running. And of course, from the security perspective, while the web image has been hardened, and sudo has been removed from the hardened image, there isn’t any team of security experts signing off on this new feature. And I should point out to you that you may want to try some other techniques. If you’re just trying to share your project right now, with a friend, you don’t need to do this, just use the D dev share command. And it works great, it uses ngrok very easy to use. And of course, deed of the company has another product called D dub live, which is managed hosting. And it has some really nice features, and I encourage you to check it out. Okay, here’s the requirements, you need a Linux machine, it needs to be reachable from the internet. And you need to have control of the DNS for the site. And of course, preferably for the server to so we’re going to have set up DNS and pointed for both of those. Okay, let’s go ahead and do it. What we’re going to do for the server is we’re going to spin up the server, point the server and site DNS to it. And then we’re going to set up the firewall. And then we’re going to create a user so that our user can complete the setup. We don’t want to work with root on a server. We want to stop that as soon as we can, always so Okay, let’s do it. We’re going to spin up the server. Let’s go to linode. Here, I am going to create a linode. And I’m going to use a boon to 2004 because it’s working really well with it’s working really well with data of these days. It has the Docker and Docker compose that we need in it. So you don’t have to go don’t have to work as well as hard to install it. I’m going to choose Fremont, California. And I’m going to choose the nano plan the $5 a month plan. And we’re going to call this demo the faze us.

4:33  
And I’m going to tell it to put my SSH key in there for route already. So here we go. And this will take just a couple of minutes, but I’ll pause while it’s doing it.

5:13  
Now,

5:14  
so let’s go ahead and do our do our next step here, we’ve got it spun up. And now we’re going to point the site and the server DNS to it. So we can use those easily. So here’s the IP address, I’m just going to copy that. And I’m going to go over to my DNS. And the, the project, the site that we’re going to move is PHP kgR consulting Comm. And so the first thing I’m going to do before I try to move the whole thing, I’m just going to move a test version of it. So I’m going to say that I want to move demo.pk Hr consulting. And I’m going to set it to one minute timeout. And here’s my new IP address. I’m going to use that. And now let’s make a name for the server as well. And that’s going to be demo dot the fes.us.

6:49  
What did I do wrong here?

6:53  
Oh, I didn’t delete it before. So here we go. I did a test run of this before. And I didn’t delete this one. So I set it to one minute timeout. So it’s probably okay, but we can get in there anyway. But I’m going to change it to the new IP address. And let’s just do one thing. While we’re over here. I like to not forget to set the reverse DNS, when I’m setting up one of these. So here’s the IP v v. Four address. And I’m going to edit the reverse DNS demo that that phase got us. Oh, it doesn’t have the forward entry yet. It’s, it’ll be there in a minute. I’ll come back to that after a while. So okay. Let’s take a look at where we are. We’ve we’ve pointed the DNS adequately. And now we need to log in there and set up a firewall and a user. So let’s go ahead and do that. So I can just go here, and I’ll use the IP address for now to get in there because I’m not sure that we can.

8:22  
Let’s see if we can Oh, look at that because I already named this once it I have a clash.

8:34  
And I can get rid of it. It looks like I’m already I’m already on my way. Okay, here’s my new site. This always bothers me to see localhost here. So I’m going to set the hostname

9:00  
Mo Mo dot the phase. So I’ve got the hostname set now and we are going to set up the firewall. So Ufw allow at, we’re gonna allow Port 43 HTTPS port and Port 22 for SSH. And we will say Ufw enable and we know That it’s good. So here we are. So we have Ufw status. And we have those, those things coming through. So we have our firewall set up, we certainly don’t want to install Docker with the firewall off, we only want to allow through the particular places. Okay, so now we’re going to create our sudo privileged user. So I am going to user add dash m, r Fe. And now we have the R fe user, we’re gonna put it in the pseudo group.

10:53  
I guess that’s not the right command. But I can just say, oh, it is the right command, I just didn’t say R Fe.

11:13  
So now our fe is a member of the pseudo group. So be able to use sudo. And let’s set the password for our Fe. I’ll need to use that for sudo a little later. And let’s, let’s go ahead and set up the RFA.

11:39  
SSH settings. So I’m going to I forgot one other thing I want to do. I want to set our face, shell to bash so that I can tell what I’m doing.

12:05  
There, we’ll do an SSH key, Janet creates the keys in the right directory with the right permissions and that kind of thing. And now I’m going to create the authorized keys file, so I’ll be able to go in there.

12:26  
And

12:37  
I’ll take my public key. And I will paste it in here. And my permissions a little more limited. And I should have everything I need to do is route should now be done. I’ve got the firewall set up. I’ve got my user setup. And so now we’re going to log in as that user and install Docker in detail. So I will come back out of here. And I’m just going to log in as an unprivileged user, and here I am, I’m able to go right in there. And now we’re going to install now we’re going to install Docker and details. So let’s take a look at the instructions for that. Here’s documents instructions in the detail have read the docs. So we are going to just do this command apt get update and apt get install docker.io and Docker compose.

13:54  
Did I type it right? Probably not. Got it right on the second time, though. And so yes, we do want to install those. Now, you never want to forget that on Linux, you have a couple of post install steps. So you have to add the user to the Docker group. So we’ll do that right quick.

15:02  
Now you see that our fe is in both the sudo and the Docker groups. If I do a `docker ps`, I should be able to talk to it, and I can’t. So I will log in again. And now I’m in. So I’ve got the Docker officially added to my account now. So now we’ve got Docker working, we need to do is install dedeaux. So let’s go ahead to the docs for that. Here’s the we’re going to use the script to install, you can also use homebrew. But we’re going to use the script to install it. So I’m just going to copy here. And I’m just going to paste. And this just curls the script and runs it. And we can see what’s going on now it also installed make cert for us.

16:02  
We have data one dot 16 dot one here. So we should be good. So we’ve got D Dev, and Docker. And now we’re going to check out the code and import the files in the database. So I usually put all my projects in a directory called workspace that’s a hangover from long ago using Eclipse. But that’s what I always do. And that’s where I was expect them to be. So I’m going to clone

16:44  
the code here for this. So now I’m in the directory, there’s everything I want to know. Everything I want to have. We’re going to import the files and dB, I guess we need to configure it before we can do that. So let’s do the Configure. We’ll just do it with the additional Fq DNS To start with, No we won’t, we’ll just do a D dev config. It automatically figures out the project name, the doc root, the project type. And now I can do a deep dive start. Wait a second for these. For these things to be pulled? Really we should it disabled, PHP myadmin. And we should have disabled the

17:49  
SSH agent as well. So we’ll do that in a minute. Okay, there we are, we have it running. We can’t easily hit it with a browser yet. Because we aren’t pointing the def site to it. And we haven’t, we haven’t put a database in there. So we just want to install anyway. So let’s remember though to do the deed of config global

19:09  
dash dash omit containers equals data, SSH agent. And DBA. We don’t need the the DBA which is the which is the PHP myadmin. And we probably don’t need the data of SSH agent. Usually that’s used in more of a development environment. So I’m just going to do that and we’ll get those done. And now let’s let’s get some files in a database up there. I always put files in a database in a directory called tarballs. So what I’m going to do then, is I’m going to copy from my system at home where I am here Have these files and database downloads. And I’m going to SCP Star 2021 125 star to demo dot the phased on us workspace peak, hr consulting.com dot tarballs. So there I got those up there. So I’ll just SSH in again.

20:45  
So here they are, my project is running. And I’m going to do a deed of import files, data source equals P.

21:03  
I’m going to get the files in there. And now I’m going to do a D dope import dB. And we’ll get the the DB in here. It looks like I did the wrong thing. That’s the right command. So now we have a running site, I can curl the site.

21:49  
And I should see a regular Drupal seven contents. And I do so I can hit that now. So I have a running site, and it has its files, and everything else. So we’ve checked out the code, imported the files in the database. Now, what we’re going to do is use an additional FQ dn for testing. So we decided to use demo.pk, PK hr consulting.com as our site. So let’s do that. Oh, did we already do it? No, we didn’t add any additional Fq DNS yet. Demo dot pkg are consulting.com. And now we need to do a couple of global configuration here. We need to tell DD of globally to bind all interfaces, which means listen to the outside world. In a development environment. We don’t want to be listening to the outside world. And we’re going to guess here’s the omit containers. We already did that. We’re going to do the use hardened use hardened images, use Let’s Encrypt and Let’s Encrypt email. So let’s do that.

23:49  
And what else do we have to do? We already did the omit containers on router by router bind all interfaces has to be done.

24:02  
Okay, there they all are. We have the we have everything set up here. And we can do it. We’re going to do a df power off so that the so that we start over with all the right images in the right global configuration.

24:30  
Now we’re going to do a deep dive start. Let’s just let’s just ping demo dot p hr consulting.com and see if it’s resolving and it is resolving. So that’s good. So we’ll do a deep dive start. And it has to pull the hardened image since we now change the configuration to require the hardened image

25:37  
The router is negotiating with Let’s Encrypt to get that to get that new cert. And so we should have the new cert now. And we should be able to hit HTTPS demo dot pkg consulting.com. And it could even work. And it did work. That’s amazing. There it is, if you look at the certificate, you’ll see that it was just issued, it’s it expires in February. It’s now November, this is three months from now. There it is. So we’ve got demo dot pkg, or consulting going. So that’s good, we can go around to it, we can log into it. All those things. So we’ve done our DTF start, it’s working. And there’s some things that you’d want to do after that. So the next thing that we’ll do, and we might as well do it right now is to add the real domain to the project. So what we’re going to do, we didn’t, we didn’t want to do this until we had tested the product tested the site to make sure that it was working. But what we would do is take our go back and get our IP address here and go over to our DNS management. Go to PK HR consulting, go to DNS.

27:19  
And

27:22  
now we can change the actual root of this. So we’ll change it from where it was to where it is. Now, it’s a great thing to wait to do this until you’ve already tested the site with a different sub domain. Because that way you know that it’s good. And then as DNS propagates, you can expect it maybe the land a couple of times at the old site, before it lands at the new there, we’ve got that out there. And that will be propagated within a minute or two. Because we set a very low TTL on it earlier for the for the move. But we need to now add this

28:08  
in our config dot YAML. We’re going to add Kiki hr consulting.com. And we’ll do a deep dive start again, we need to wait just a second for this start.

28:27  
Because we’re hoping that that Let’s Encrypt will pull pull up the new name. Let’s see in PHR consulting.com. And it would be nice if it knew about the new one and 192 address. That’s the one that we want. So let’s see if it did upstart we’ll get that for us.

29:07  
Let’s just go visit PK HR consulting. And it is not working yet. Most likely because we heard it too much with getting through there. Well, actually, yeah. So it’s this, this does not have a it has our our development certificate on it still. And we don’t want that we want the real thing. So let’s just do our and because we want it to renegotiate, we want the router to renegotiate that. We’ll do a deed of start again and we’ll see if see if Let’s Encrypt can find demo.pk Hr consulting now Okay, cross your fingers, hold your breath. And let’s do a reload on this. And there it is. Now we have the new one, you can tell that it’s a new cert, it’s got the February 23, we’ve got the site moved up there. Let’s just take a look at the status report. It needs to have the database update script run on it. So we got a little bit of work to do. But things are looking pretty good. We can check for updates. It’s a real live site. So there we are. Let’s take a look at what else we need to do. So follow up, we just added the real Fq dn the fully qualified domain name, PK hr consulting.com, to the live site, so it actually moved over. We we set the DNS to point to it, and then we did a restart, and I did have to do a deed of power off. And it did have start to get the router to renegotiate probably as we started to quickly after changing the domain name and DNS, the the instructions in the list, just take a look here. here’s the here’s the casual web posting section of D dub dot read the docs.io. And it tells you how to set up. So that D dub will automatically start on system setup because on systems system boot, you certainly want that. So there’s a there’s the technique for doing that. So you want that you probably want your containers to auto restart, that’s a global configuration. You want to enable outgoing mail from the site, if you have any transactional email, especially mail usually would go to you but if you have any transactional email, and you have to in enable outgoing, you probably want to enable outgoing email from the server and tell it where to go so that you get notifications. If the server has trouble, those we won’t go into those. Setting up outgoing email from the site usually means installing an SMTP module and bouncing it through one of them, you know, mailgun, or one of the email providers like that. And you probably want to configure off site backups, that’s another that’s can also be done with a modular plugin. There’s many other ways to do it, you can you can do D Dev, export dB, and save the file if you want to or D dev snapshot. And reverse DNS. I was almost going to do that at the very beginning. But I recommend that you do set up reverse DNS helps mail to work. So we got it. We got it going. Some Reese’s resources for you the casual web hosting Doc’s or indie dev dot read the read the docs.io you can just search for casual in there. The dev repository github.com, `drud/ddev` And don’t forget about ddev.com. The dev live project data has been sponsoring dev local now for four years. And you should try out DDEV-Live for real manage toasting there’s a there’s a

33:45  
great

33:47  
startup deal out there. And then I think the pricing for for a regular site is $15 a month or something like that right now. Anyway, thank you very much for joining me, and happy to see you at any of the support locations. Anytime. And I hope you’ll try this out. Thanks so much.

Transcribed by https://otter.ai

<!-- textlint-enable -->
