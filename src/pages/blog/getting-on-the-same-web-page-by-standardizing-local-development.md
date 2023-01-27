---
title: "Getting On the Same (Web) Page by Standardizing Local Development"
pubDate: 2018-05-22
author: Rick Manelius
featuredImage: https://ddevdotcom.ddev.site/app/uploads/2018/05/suganth-526334-unsplash-e1526983031730.jpg
categories:
  - DDEV
---

As agency teams adopt DevOps culture and practices, their ability to achieve peak performance through continuous improvements on processes and practice becomes limited if they are unwilling to standardize tools and workflows. Having a reliable local development environment is a foundational part of that practice because it is the interface between a developer and the production system by which they are attempting to deliver value. Senior team leads see the link: as well as the time lost, effort is lost when users hit roadblocks in this process. What are the benefits and how can you decide which tool is right for your team?

## The adoption path to a standardized development workflow

When we speak with devs and teams at digital agencies, it seems they fall somewhere along an adoption path between fractured local development workflows to streamlined and standardized ones. At the fractured end of the path, each team member is using their own preferred set-up and tools. In the bring-your-own-device model, this leaves everyone happily working with the tools they most love, and it removes the need to make tough decisions or train others. Of course, this assumes site builders and designers are experienced and skilled enough to do this as well as manage their own support issues. At the other end of the scale, you have agencies employing a standardized local development environment and workflows across an organization, and even with contractors and clients.

Unlike software product companies, service-focused digital agencies are building not one product for one client, they are building often multiple projects across many clients. If each has different requirements, stacks, or hosting platforms the problems compound. If they can standardize what happens during development with each developer locally building with the same tools and testing with the same methods, they can eliminate guesswork and save time.

## The link between standardization and continuous improvement

In typical web application projects, senior team leads make architectural decisions and decide how the jobs get done. It falls on their shoulders to lead the development teams, prioritizing and delegating tasks, and helping people overcome technical blockers. These team leads also mentor junior developers, decide on best practices, and review code and methods. They run interference to protect their team from distractions. When things break, they help fix them both in the short term as well as try and prevent systemic problems from recurring. Sometimes this is specific to one project. Other times, it involves troubleshooting problems with tools and workflows to ensure developers have a productive workday.

Being a web developer means (preventing and) solving problems a myriad of problems on a day to day basis. Those that solve them the most efficiently get to spend more of their time working on productive tasks instead of thrashing while address bugs. One of the keys to efficiency is the ability to isolate the problem. Unfortunately, when you add multiple environments and workflows across team members, you create the potential for too many variables that you can’t isolate.

Having a reliable local development environment is a big help for mentoring and problem-solving. When we speak with team leads, the need to standardize their teams on one set of tools is a no-brainer. The question is, what tools and what is the right way to go about it?

While there are many tried and true virtualized approaches, containers are the current best way forward and Docker is an excellent container solution. However, we really don’t think developers need to learn to use Docker on top of the other things they already need to know [about development workflows](https://ddev.com/ddev-live/web-development-workflows-simplified/) to deliver value in their web projects. We’ve built DDEV to provide a reliable and robust, out-of-the-box, end-to-end dev-to-deploy solution—that also works with your team and the way you work.

## Benefits of standardization

Is it time to standardize your local development environment? Let’s look at the benefits of standardizing on a local development environment.

**Fast, consistent developer onboarding** – DDEV [makes it easier for new team members to get up to speed](https://ddev.com/ddev-local/reduce-time-onboard-new-developers-ddev/), offering a single, consistent set of commands when working on projects, no matter what operating system, CMS, or deployment model they’re using. You can reduce the steps to install and initialize a new or existing project.

**Knowledge sharing** – Agency developer team lead [Ryan Blyth](https://ddev.com/ddev-local/developer-happiness-the-right-tools-for-the-job/) talks about how having everyone working on the same setup means you eliminate as many “unknown variables as possible. So you can have a productive conversation, instead of a circular conversation.” Having everyone using DDEV eliminates guesswork and makes problem-solving easier.

**Make it easier to solve problems together** – Standardizing speeds up problem-solving across collaborators. If people come in with different stacks and different workflows, the potential number of answers to ‘what has gone wrong?’ could be huge. You can eliminate those unknowns by having a common workflow and common tools. Consistent development and testing save time. In DDEV-Local Release v0.18.0 we added massively simplified XDebug, [check out the XDebug tutorial and video](https://ddev.com/ddev-local/ddev-local-release-v0-18-0-easier-xdebug-windows-installer-and-more/).

**Tools that work as fast as you do** – Standardized work is the first step to continuous improvement. It makes it easier to get started each day, have a smoother daily workflow and reduce the stress and frustration of unexpected problems. DDEV helps you get your stack up quicker with known recipes and apply [best practices every time you spin up a new project](https://ddev.com/ddev-local/web-development-best-practices-every-time/).

**Reduced stress** – As CTO at the Digidrop agency, [Alex Burrows has found DDEV has reduced stress](https://ddev.com/ddev-local/ddev-it-does-what-it-says-on-the-tin/). He told us he’s got his developer team and contractors using DDEV now, “It’s in the Dev Handbook.” Not only that, he’s also convincing clients to make the switch. Having everyone on DDEV has reduced errors and where errors still pop up, they can work together to solve them more easily than ever before.

### Help your team make the move

The good thing is, DDEV works with you. You don’t need to rejig your repositories or site installations to work with DDEV-Local. When you configure your site with DDEV, all it adds are one folder and one configuration file. You can add a .gitignore directive for it, and work away as usual.

**DDEV is easy to install and update**

* Check [the requirements](https://ddev.readthedocs.io/en/latest/#system-requirements), you’ll need Docker and Docker compose.
* Installing is easy. There’s a Windows installer, and if you’re using Homebrew on Mac, it’s one command  
   * `brew tap drud/ddev && brew install ddev`
* Each time you update it, it’s as easy as it was to install. You might have already tried to build, maintain, and even ‘open source’ your own Docker-based solution. (That’s how we started DDEV actually.)

**DDEV is quick to configure**

* You configure a project once by telling DDEV the name, the docroot, and the project type.

**DDEV is easy to use every day**

* When you want to work on a project cd into a project directory and run `ddev start`.
* Run `ddev list` to see the status of projects you have running, you can run multiple at once.
* Run `ddev remove` to stop a project and remove it from the list.

[Try out DDEV](https://ddev.com/get-started/) and see how it works for you!

Photo by [Suganth](https://unsplash.com/photos/hsYSrqcZ8Ds?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText) on [Unsplash](https://unsplash.com/?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText)
