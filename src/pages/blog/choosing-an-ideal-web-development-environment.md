---
title: "Choosing an ideal web development environment"
pubDate: 2018-05-29
author: Mike Anello
featureImage:
  src: https://ddev.com/app/uploads/2018/05/headway-537308-unsplash-e1527604343956.jpg
  alt:
  caption:
  credit:
categories:
  - DevOps
  - Announcements
  - Community
---

_This is a guest post from web developer and trainer, Mike Anello of [DrupalEasy](https://www.drupaleasy.com/). Find out [more about Mike](https://ddev.com/author/mikeanello/)._

At DrupalEasy, I’ve delivered [Drupal training](https://www.drupaleasy.com/academy) to hundreds of learners, and I’ve produced [over 200 episodes on our Drupal podcast](https://www.drupaleasy.com/academy) about the community and best practices. As someone who has built a career out of the Drupal ecosystem, I find myself always looking for the optimal solutions. I’m also in a position where I have to stand by my recommendations. In this post, I’ll walk you through how I decided on DDEV for a local development environment.

Whether it is the information architecture for a new client project, pitching in on a project that has gone awry, or teaching a group of students a new Drupal skill, I’m constantly wondering if I’m proceeding down the absolute best path given the situation.

Over the past 2-3 years, one of the things that has been nagging at me has been my local development environment. This has especially bothered me because, as someone who instructs students in long-term engagements, I often am in the position answering the question, “what should I use on my local?” In reality, I’ve been struggling with that question as well.

### Searching for the right web development environment

In the past, MAMP Pro has been my go-to environment. It provided me with a relatively easy way to get most of what I needed: the ability to create virtual hosts and the ability to change between several versions of PHP. Along the way, I’ve used Acquia Dev Desktop for clients that hosted on Acquia Cloud (as well as the recommended local environment for our long-form training students due to its ease of use). I’ve dabbled in virtualized solutions like DrupalVM as well as other solutions like Kalabox and Docksal. But, I’ve never really been 100% satisfied with any solution I used. It was a bit of a Goldilocks situation: some were really easy to install, but not configurable enough. Some were configurable in every dimension, but the learning curve was too steep. There were also performance issues for some, and roadblocks for specific tools for others.

About a year ago, I decided I needed to update several of our workshops to a local development environment that was more representative of what professional Drupal developers were using. It was frustrating for both our students and myself to keep hitting little roadblocks depending on the codebase, operating system, or any one of a number of things that led to issues we had to overcome in our local environment, like using a (very) specific version of PHP, running a different version of Drush that is installed globally on the machine, getting a Solr server up-and-running, or configuring Drush to work fully.

I wanted to be teaching something that students would actually want to use in their day-to-day work. I wanted to teach a tool that would provide all the benefits a modern local development environment should. So, I made a list of what I felt a professional local development environment should include:

- Easy and quick installation.
- Flexible configuration per project.
- The same environment configuration for all developers on a team.
- Easy-to-learn-and-use local environment management tools.
- The ability to get up-and-running on a project quickly and easily.
- Integration with modern hosting platforms.

Combine this list with a few more items that I felt were important for teaching:

- A similar, if not identical, experience regardless of the host operating system.
- A reasonable way to manage hard drive space (as I tend to create a lot of sites on my local).

This list is more common sense than rocket science; I think it would be pretty difficult to argue against wanting any one of these requests.

I quickly started circling around Docker-based solutions. The idea of being able to define a specific set of containers for each project, and then being able to easily share that configuration among team members matched up well with a number of items on my list. But, I quickly found that I would need some type of abstraction layer to help simplify all the necessary Docker syntax and commands (I didn’t want to be teaching Docker on top of Drupal).

When I first sat down with Randy Fay of the DDEV team, I knew that I was getting close. The [DDEV command list](https://ddev.readthedocs.io/en/latest/users/cli-usage/) is concise, its architecture supports integration with modern hosting platforms, and it is pretty easy to get up-and-running. At the same time, I was doing my due diligence and testing out [other Docker-based solutions as well](https://www.drupaleasy.com/blogs/ultimike/2018/03/ddev-docksal-and-lando-comparison).

Eventually, I decided to standardize my workshops on DDEV. Over the past few months, I’ve used DDEV extensively on both Mac and Windows, helped our students (and some alumni) get up-and-running on DDEV, and written curriculum and recorded screencasts about many of the common use cases.

Along the way, I’m happy to report that I’ve only become more and more comfortable with my decision based on two main factors: the quality of DDEV’s support channels and the pace of the release schedule. I can’t think of a single instance where I had a DDEV question that did not get a response (usually a solution!) the same day. Whether it is via the [#ddev channel on the Drupal Slack](https://drupal.slack.com/messages/C5TQRQZRR), or the [DDEV issue queue on GitHub](https://github.com/drud/ddev/issues), or [DDEV questions on Stack Overflow](https://stackoverflow.com/questions/tagged/ddev), their support has always been prompt, friendly, and effective. Additionally, the release schedule is such that bugfixes and/or new features are never more than a few weeks away (often less). The frequent release schedule has provided me with an ongoing confidence that the DDEV team is committed (pun intended) to developing a professional-level tool for their users.

### Training: Upgrade your local development environment with DDEV at a DrupalCamp near you this summer!

I’m happy to share that I’ll be providing full-day workshops at [Twin Cities Drupal Camp](https://2018.tcdrupal.org/trainings/ddev) (June 7), [DrupalCamp Asheville](https://www.drupalasheville.com/2018/friday-training#drupaleasy) (July 13), and [DrupalCamp Colorado](https://2018.drupalcampcolorado.org/) (August 3) this summer! Looking to move your local development environment to a more modern solution? This workshop will introduce students to DDEV, a Docker-powered local development environment built on modern principles and designed to be flexible, customizable, and powerful.

Interested in learning about future training events? [Subscribe to the DrupalEasy Newsletter](http://eepurl.com/ukfXf) to be one of the first to know!

Photo by [Headway](https://unsplash.com/photos/5QgIuuBxKwM?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/computers?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText)
