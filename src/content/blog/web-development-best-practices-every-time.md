---
title: "Web development best practices: First time, every time."
pubDate: 2018-04-05
author: Heather McNamee
featureImage:
  src: /img/blog/2018/04/technology-3249920-1920.jpg
  alt:
  caption:
  credit: "Photo credit: Rawpixel"
categories:
  - DevOps
---

If you’re responsible for managing a web development team, you want to make it easy for your colleagues to follow best practices- from the first time to every time they set up their projects. DDEV helps reduce errors between collaborators and facilitate knowledge sharing among team members. It sets its defaults to the best practices you define, making them simply “the way you work.” The result is that building secure and reliable applications is easy and hassle-free for your team, too.

## “Everybody knows that!” … or do they?

Over the last few years co-founder of the [npm](https://www.npmjs.com) JavaScript package manager, Laurie Voss, has been [talking about the challenges new developers face,](https://youtu.be/JIJZnF%5FL5KI?t=10m18s) the “things software engineers are expected to know but are rarely told,” as he puts it. Laurie points out that in a typical conference program there are lots of talks about “the new shiny”: new tools, methods, and technologies, but hardly anything about the stuff that everybody is “supposed to know” already. And even if they’re less exciting for jaded, experienced devs, we call them “best practices” because they’ve proven themselves already, they’re valuable. He suggests some of these important techniques are related to abstracting away repetitive tasks so you can reduce errors and speed up development. “It should never take three commands run in the right order with the right argument. It should be one command that says ‘deploy the thing.’ Because you’re going to forget those arguments, you’re going to have to think about them.”

## Build and test simpler, better, faster

Getting into web development now is like jumping in the deep end. The [back-end and front-end roadmaps for web developers](https://ddev.com/ddev-live/web-development-workflows-simplified/) are increasingly interconnected and complex. Web developers need to keep on top of the CMSs, frameworks, and underlying programming and markup languages like PHP, JavaScript, CSS, and HTML. Newcomers and non-developers are at a strong disadvantage. In addition, even if they aren’t the ones to manage production servers, the entire web development team including the so-called “non-technical” team members–technical writers, designers, PMs–need to be able to build and test software locally. They have to be able to manage a reliable local development environment that mirrors the production environment so they don’t introduce unwanted surprises.

Local development environments require continual maintenance and overhaul to keep libraries and tooling up-to-date. IBM’s Java CTO John Duimovich [recently suggested there’s a lot of pressure on developers](https://www.theregister.co.uk/2018/02/22/ibm%5Fjava%5Fcto%5Fjohn%5Fduimovich%5Finterview/). “The notion that as a developer you’ll have to learn Docker, Kubernetes, and 30 other things before you can even deploy an app is something I’d like to get rid of,” he said.

Getting everyone up to speed and working together, using an agreed-to set of tools and best practices takes time. Rick Manelius, Chief Product Officer, DRUD said, “When you have tools that make the best practice way the easy way, you’re more likely to adopt and less likely to resist.”

Let’s look at how we’re tackling this with DDEV-Local, part of our mission to create a simpler, better, faster, and more reliable web development workflow.

## Get your stack up quicker with well-known recipes

You can create web development environments with DDEV-Local, and we support popular CMSs with known-recipes to make this easier. These CMSs include Drupal 6, 7, 8, TYPO3 CMS, WordPress, and Backdrop CMS. Check out our [Quickstart Guides](https://ddev.readthedocs.io/en/latest/users/cli-usage/#quickstart-guides) to set up with an existing project in DDEV-Local.

DDEV-Local comes with several [useful developer tools](https://ddev.readthedocs.io/en/latest/users/developer-tools/), including a web server, a database server, debugging tools, command line tools, and dependency managers. These tools can be accessed for single commands using `ddev exec <command>` or `ddev ssh` for an interactive bash session.

- MySQL Client (`mysql`) – Command-line interface for interacting with MySQL.
- [Composer](https://getcomposer.org/) – Dependency Manager for PHP.
- [Drush](http://www.drush.org/) – Command-line shell and Unix scripting interface for Drupal.
- [WP-CLI](http://wp-cli.org/) – Command-line tools for managing WordPress installations.
- MailHog mail catcher for email capture and review.

DDEV also makes it easier to work with your tools. For example, you can launch Sequel Pro right from the command line with `ddev sequelpro` and connect right to that project’s database. [Sequel Pro](https://www.sequelpro.com/) is a Mac database management application for working with MySQL & MariaDB databases. In a comparison of [Docker-based local Drupal development environments](https://www.drupaleasy.com/blogs/ultimike/2018/03/ddev-docksal-and-lando-comparison), Mike Anello of Drupal Easy said “I know it’s a trivial thing, but I love it so much.”

In addition, you can get consistency across your projects and collaborators with project-specific configuration. Specify the right version of PHP, dependencies, and add services appropriate to your projects. If you’re familiar with Docker and Docker Compose, you can also [define other services](https://ddev.readthedocs.io/en/latest/users/extend/custom-compose-files/) that your projects need. As an example, you can [use this recipe to add Apache Solr](https://ddev.readthedocs.io/en/latest/users/extend/additional-services/#apache-solr) to a project.

## Get started with DDEV-Local

It only takes three easy steps to make your day so much better with DDEV-Local as part of your web development workflow.

Prepare and install

1. Prepare – Make sure your computer is ready for DDEV-Local, check, [install and/orr update the system requirements](https://ddev.readthedocs.io/en/latest/#system-requirements).
2. [Install – Install DDEV-Local](https://ddev.readthedocs.io/en/latest/#installation).
3. Set up your project for the first time.
   1. Check out your existing site to a local directory. You can follow the examples for the CMS you’re working with in the [Quickstart Guides](https://ddev.readthedocs.io/en/latest/users/cli-usage/#quickstart-guides).
   2. Set up a project for the first time with `ddev config`. With this one-time configuration step you add the project name, docroot, and project type.
   3. If you’re already running a web server on port 80, you’ll get an error message. Follow steps to [resolve the port conflict](https://ddev.readthedocs.io/en/latest/users/troubleshooting/#webserver-ports-are-already-occupied-by-another-webserver).

## Using DDEV-Local everyday

From now on, when you want to start a project you can cd into your docroot and run `ddev start` or you can run `ddev start projectname` from anywhere. Likewise, with other CLI commands, you can run them directly from within the docroot, or specify the project name from anywhere.

When you’re done with your tasks you can [remove the container](https://ddev.readthedocs.io/en/latest/users/cli-usage/#removing-a-project) with `ddev remove` – while keeping your database and the state of your project intact!

Because `ddev remove` doesn’t get rid of your database, it makes starting up next time much easier. The next time you need to hop back into this project you just type `ddev start projectname`, or cd into the project directory and `ddev start`.

And if you do need to wipe out the database, you can add a flag to remove the database with `ddev remove --remove-data`.

Anytime you want to know what a command does, check the manual pages right from the terminal. `ddev -h`.

Have any questions? Ask on [Stack Overflow #DDEV.](https://stackoverflow.com/questions/tagged/ddev) That’s a great place to ask questions and collaborate on answers.
