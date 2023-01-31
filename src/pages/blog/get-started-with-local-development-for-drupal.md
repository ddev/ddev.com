---
title: "Get started with local development for Drupal"
pubDate: 2021-03-24
author: Elli Ludwigson
featureImage:
  src: /img/blog/2021/03/ddevmidcamp.png
  alt:
  caption:
  credit:
  shadow: true
categories:
  - Community
---

This week in the Drupalverse we are attending MidCamp! We’re in-kind sponsors offering a [series of workshops](#schedule) to help you improve your skills with local development as well as some prizes for [the raffle](https://www.midcamp.org/2021/article/register-midcamp-and-win). MidWest Drupal Camp traditionally takes place in Chicago, but in March 2020 the organizers made a rapid shift to a virtual event, for which we are very grateful.

The camp focuses on bringing everyone on board, starting with free “how to be a speaker” workshops on Wednesday, plenty of regular and unconference sessions, and local development and contribution workshops. Between the virtual platform and pay-what-you-can tickets, we hope this gives more folks an opportunity to participate, learn, and share their knowledge.

~~[Register now and hop into the gather.town virtual venue!](https://www.midcamp.org/2021/article/midcamp-starts-wednesday)~~ The camp is over, and the [sessions are available to watch on YouTube](https://www.youtube.com/playlist?list=PLmBnjy9dJJXePsqK4uRImmJ2-g8k%5FlYvg)! Thank you [Kevin Thull for making recordings happen](https://opencollective.com/drupal-recording-initiative).

## Importance of local development environment for Drupal contributions

In order to contribute to Drupal as an open source project or to work on any web development project as a contributor to the code, you’ll want to be able to run a copy of the project locally. Historically, folks used the built-in LAMP stack on Mac, or worked with MAMP, or any number of other tools. Lately, the community has been focused on Docker-based tools because of containerization and the ability to provide simple, user-friendly commands.

Some background reading and additional resources:

- [Why an easy start is important to teaching web development](https://www.ddev.cloud.fruitionqa.com/ddev-local/why-an-easy-start-is-important-to-teaching-web-development/) – by Drupal trainer Mauricio Dinarte aka dinarcon
- [Why developing locally matters](https://www.ddev.cloud.fruitionqa.com/ddev-local/why-developing-locally-matters/) – by TYPO3 CMS lead developer Benni Mack
- [Local Web Development With DDEV Explained](https://www.ostraining.com/books/local/) – by Florida Drupal Camp organizer Mike Anello
- [Drupal Easy Professional Local Development with DDEV class](https://www.drupaleasy.com/ddev) – Taught by Mike Anello

For MidCamp we’ll be using the latest release of the [Quicksprint package](https://github.com/drud/quicksprint#drupal-contribution-package), which you may download and install in advance or just download and wait for the workshop to walk through the details.

### MidCamp DDEV schedule

- [Local Development Ask Me Anything](https://www.midcamp.org/2021/topic-proposal/local-development-ama) – Bring all your questions about local development! Thursday, 1:00 pm CDT [Recording here](https://youtu.be/XSo0ARqOY60)
- [Get Started with Local Development Workshop](https://www.midcamp.org/2021/topic-proposal/get-started-local-development-workshop) – We’ll check in to understand your working environment and give guidance through the installation process for Windows (traditional or WSL2), macOS and Linux. Friday, 10:30 am CDT [Recording here](https://youtu.be/cgUMkfpmSVs)
- [Advanced Local Development with DDEV](https://www.midcamp.org/2021/topic-proposal/advanced-local-development-ddev) – got things set up? Here’s your chance to take it further, talk about integrations, customization, and more. Friday, 1:01 pm CDT [Recording here](https://youtu.be/xNOQFps8QmQ)

## The many ways to contribute to Drupal

For a [non-code contribution overview](https://www.midcamp.org/2021/topic-proposal/non-code-contributions), join AmyJune on Thursday at 11 CT. Then on Saturday, join for the [first time contributor workshop](https://www.midcamp.org/2021/contribution-day) to learn more about the Drupal issue queue and how to work with others. You’ll learn more about how marketers, project managers, organizers, designers, and writers (among many others) can bring their valuable skills to the project.

Read more about [the who, how, and why of Drupal contributions](https://www.ddev.cloud.fruitionqa.com/community/florida-drupal-camp-highlights/#DrupalContribution) as presented by AmyJune at Florida Drupal Camp 2021.

Get the full scope of [contribution opportunities at MidCamp](https://www.midcamp.org/2021/contribution-day) on Saturday. [Recording here.](https://youtu.be/RogFRnd-FfA)

# You have a local PHP development environment!

What’s next?

Now that you’re set up with DDEV-Local (and hopefully had a chance to try out those Drupal contributions), what else can you accomplish? Since you’re likely already tracking your project with Git, it’s easy enough to push the repository to GitHub or GitLab. From there, you can start collaborating with other folks, and reference that repository from other tools for testing, CI/CD, or push to a hosting provider.

DDEV offers [production hosting on DDEV-Live](https://www.ddev.cloud.fruitionqa.com/ddev-live/). You can create a new project directly in the [DDEV UI online](https://dash.ddev.cloud.fruitionqa.com/), or from the [command line](https://docs.ddev.cloud.fruitionqa.com/getting-started/), by referencing your hosted Git repository. [Read more on deploying here](https://www.ddev.cloud.fruitionqa.com/ddev-live/how-to-deploy-a-site-with-ddev/).

DDEV-Live includes the ability to [create preview sites](https://www.ddev.cloud.fruitionqa.com/ddev-preview/) on the platform, regardless of whether you use it for production hosting. That means you can call a command in a comment on a pull or merge request and instantly spin up a preview site. [Read more about DDEV Preview here](https://www.ddev.cloud.fruitionqa.com/ddev-live/five-ways-preview-sites-support-a-devops-workflow/).

All parts of the DDEV platform can be used independently of each other to piece together your preferred tools and workflow. Use Lando with Tugboat and DDEV-Live, use DDEV-Local with DDEV Preview and Pantheon. We love to hear about your unique strategy, please tag #DDEV/[@ddevHQ](https://twitter.com/ddevHQ) to share with the global community!
