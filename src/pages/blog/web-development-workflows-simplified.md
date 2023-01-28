---
title: "Web Development Workflows Simplified"
pubDate: 2018-03-22
author: Jeffrey A. McGuire
featuredImage: https://ddev.com/app/uploads/2018/03/with_ddev.png
categories:
  - DDEV
---

It is DDEV’s mission to create a faster, better, simpler, and more reliable web development workflow.

Kamran Ahmed’s [Roadmap to becoming a web developer in 2018](https://github.com/kamranahmedse/developer-roadmap) gives a bird’s eye view of the sprawling list of technologies a web developer needs to learn and be aware of to master web development today. From scripting languages to package managers, and front-end frameworks to task runners, the back-end and front-end roadmaps for web developers are increasingly interconnected and complex. The map splits out into the specialist branches Front-end, Back-end, and DevOps.

It’s clear that no one person could get experience in tools and skills identified across the entire map. The speed at which everything changes even leaves many specialists exasperated. Frank Chimero, a web developer with 20 years experience building websites, says he[ feels as confused as a newcomer](https://frankchimero.com/writing/everything-easy-is-hard-again/). “I wonder if I have twenty years of experience making websites, or if it is really five years of experience, repeated four times.” He said, “Last month, I had to install a package manager to install a package manager.”

## Simplify Web Development and Deployment with DDEV-Local and DDEV-Live

We built DDEV-Local because we saw that local development environment complexity turns into lost productivity. When you’re spending time tweaking your \*AMP stack, configuring containers, or waiting for VMs to spin up, you have less time to spend on innovation. That problem is compounded when you have colleagues and clients on multiple operating systems, working on different CMSs, and deploying to a variety of hosting options.

One of the biggest problems with local web development environments is that they are rarely an exact match to the production server where the project will be deployed. Differences between the local and production environments introduce hard-to-find bugs and result in finger-pointing “works on my machine” arguments.

For many CMSs, there are a variety of choices of local development options. These workspaces require continual maintenance and overhaul to keep libraries and tooling up-to-date. Sometimes it’s too complicated even to bother. For example, common WordPress local development practices mean that many teams can easily expose their production environments to risk. It’s not what we’d ever recommend, [but it’s not uncommon for WordPress development](https://wpshout.com/local-wordpress-development/): “most people are most comfortable just making changes to their live site on the main server.”

Andrew Berry of Lullabot recently compared options for [local Drupal development environments](https://www.lullabot.com/articles/local-drupal-development-roundup) including MAMP, native on your workstation, VMs (Virtual Machines), and Docker-based solutions including [DDEV-Local](/quickstart). He said Docker is “the most complicated option available,” and that’s a big part of what we’re focused on fixing: we take care of the complexity for you, while giving you all the advantages of containerized development. We want DDEV to be, as Andrew suggested, “one of the most friendly Docker tools to use,” so you can get on with making your clients happy, your software awesome, and winning back some time in your day.

As of March 2018, the DDEV platform can ensure consistency from local development to production environments with full support for a number of open source CMSs: Drupal 6, 7, and 8; TYPO3 CMS; Backdrop CMS; WordPress; as well as Java applications.

### Before and After with DDEV-Local and DDEV-Live

Inspired by the Web Developer Roadmap, we surveyed clients, collaborators, and colleagues to take a snapshot of the current state of hidden complexity that developers face.

![](https://ddev.com/app/uploads/2018/03/without_ddev.png)

Our vision for the dev-to-deploy workflow, using DDEV-Local for development, QA and testing, through to hosting on DDEV-Live is all about getting the complexity of it all out of your way. We’re combining best practices with industry standard, open source tooling like Kubernetes and Docker to give you robust, reliable projects from start to finish. And you can extend or customize for your own needs–even to deploy to whatever hosting provider or deployment model makes sense for your clients. It’s open source, you can really own it.

![](https://ddev.com/app/uploads/2018/03/with_ddev.png)

After switching, you can focus your time and energy on improving your services and products, not on the complexity. As web developer Danita Bowman said recently, she saved time by leaving the configuration of her development environment up to DDEV-Local. “[I can handle a whole lot more than I used to be able to handle](https://ddev.com/ddev-local/saving-time-and-making-money-with-ddev/).” The time saved has turned into greater capacity and more clients for her business.

That is the kind of bottom-line benefit we’re excited about. Choose a tool that you can trust, which takes care of the best practices so you can innovate and get creative.
