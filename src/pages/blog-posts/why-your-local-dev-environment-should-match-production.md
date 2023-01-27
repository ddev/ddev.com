---
title: "Why your local dev environment should match production"
pubDate: 2020-11-04
author: DDEV
featuredImage: https://ddevdotcom.ddev.site/app/uploads/2020/11/Deploy-Benni-art-from-shashank-and-Becris-on-the-noun-project.jpeg
categories:
  - DDEV,
  - Workflow
---

_This is a guest post from_ [_Benni Mack_](https://twitter.com/bennimack)_, CTO of the_ [_digital agency b13_](https://b13.com/)_, located in Germany. He’s been the project lead for_ [_TYPO3_](https://typo3.org/)_, an Enterprise CMS based on PHP, for the last 6 years, steering contributors and developers around the TYPO3 Ecosystem through his passion for Open Source and PHP. This is part two of a two part series, [find part one here](https://ddev.com/ddev-local/why-developing-locally-matters/)._

### Recap: A local development environment

In my previous blog post, I mentioned my road to a proper local development environment with Git, and a deployment strategy. Read all about it [here](https://ddev.com/ddev-local/why-developing-locally-matters/) to get a grip on why you should start setting up a local development environment too.

## From local to production – an easy task?

When I started developing locally, this gradual change opened up a lot of possibilities I wasn’t aware of in the beginning:

* With Versioning through Git, I had a clear history of my modifications and could collaborate with my colleagues in a streamlined manner.
* A local environment allowed me to continue my development when I wasn’t connected to the internet, when I was traveling.
* By working locally, I did not have to debug on production to see my changes in effect but could test and bugfix faster than before.

But I also had my fair share of lessons learned while having everything locally. One of the biggest challenges I faced was the different environments: Locally, I was running PHP 7.3, but the production server only had PHP 7.2, or didn’t even have all the PHP modules installed that I had on my local machine. 

For composer-based PHP projects, we came around to the handy “platform.php” config to ensure that the dependencies match the same PHP version as on production. Still, everything else was hopefully working as expected, with many manual reminders to our team about which PHP functionality we were allowed to use.

**References:** 
[Composer Platform Config presentation](https://www.naderman.de/slippy/slides/2018-12-07-SymfonCon-Composer-Platform-Config.pdf) from Nils Adermann  
[Enforcing a PHP Version for Installed Composer Packages](https://andy-carter.com/blog/composer-php-platform) by Andy Carter   
[Composer Documentation on Platform Config](https://getcomposer.org/doc/06-config.md#platform)

Some production servers used Apache as a web server, some used Nginx, and on top of that, especially when working with multiple web projects at an agency throughout one day, it felt like we ended up with more work than before. So I asked myself: Should I switch back to developing on the live server??

## Local environment = Production environment

The solution for us was: Virtualization. We at b13 started to build custom virtual machines, or later on, containers with Docker, to match the same system settings as on the production environment.

With [DDEV-Local](https://github.com/drud/ddev), it’s just a matter of a few configuration lines to ensure that your local environment for a specific web project contains the same PHP versions and modules. And you can run multiple web projects at the same time. Configuring these settings felt like a no-brainer when starting a new project. I could even check if my application still works on a more recent PHP version and tell the IT admin on the production environment that “we’re safe for a PHP upgrade from our side.” The actual update on the production environment still might take months: Larger corporations with commercial Linux distributions usually rely on many old software packages. A lot of manual work is required to execute a system update.

## The possibilities with Cloud-based production servers

If it’s so easy with Docker and DDEV-Local to change PHP versions, upgrade the system packages, why can’t a hosting provider do the same? Docker and Kubernetes have you covered in the container department. But that indeed isn’t something for me to configure as a regular web developer – I want to focus on my web application and my customers’ needs. Instead, I suggest choosing a hosting provider that offers such flexibility for you, so you can focus only on your local development.

Going into the Cloud for hosting offers even more solutions than just quicker updates for your software packages:

* **Scalability**: If your website hits a lot of traffic, you shouldn’t wait for two months to get new hardware and migrate everything over, the host should be flexible enough to cover the peaks.
* **Failover:** If a server is down, the system should detect this and spin up a new machine without any visitor noticing anything—a self-healing process.
* **Exchangeability**: When you deploy your code changes, or even an update to your web application, your site shouldn’t be down, but instead do a [blue-green deployment](https://en.wikipedia.org/wiki/Blue-green%5Fdeployment).

Kubernetes does that in a very sophisticated way –but to be honest– I don’t want to manage this on my own, as everyone has enough on their plate already. If you only want to work with your web application but have everything covered, [DDEV-Live](https://ddev.com/ddev-live/) might be just the right hosting solution for you.

## A straightforward deployment with DDEV-Live

DDEV-Live covers all the functionality from DDEV-Local, which already has excellent support for the popular PHP content management systems. DDEV-Live hooks into your Git repository and deploys your changed code into the Cloud. Plus, a CI/CD solution, integrated backups, and their superb support should be enough to [try it out](https://docs.ddev.com).

A simple `ddev-live create site` and `ddev-live push` is all you need to [host your sites with DDEV](https://ddev.com/ddev-live/how-to-deploy-a-site-with-ddev/). They pride themselves on making tools easy first, and customizable as needed, and the hosting platform is no exception.

If you’re hooked with DDEV-Local, you should give DDEV-Live a shot.

Line art by [Shashank](https://thenounproject.com/term/container/597249 ) and [Becris](https://thenounproject.com/term/containers/1468090 ) on the noun project.
