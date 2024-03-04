---
title: "How to set up a Mac development environment with DDEV"
pubDate: 2018-06-14
summary: Guide to setting up DDEV for local development on a Mac.
author: Randy Fay
featureImage:
  src: /img/blog/2018/05/maxime-le-conte-des-floris-151374-unsplash-e1526982174493.jpg
  alt: Architectural photo of angular glass planes against a cloudy blue sky
  credit: "Photo by Maxime Le Conte des Floris on [Unsplash](https://unsplash.com/?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText)."
categories:
  - Guides
  - Videos
---

**This article was updated in 2020, please go to [DDEV From Scratch on macOS.](https://ddev.com/blog/watch-ddev-local-from-scratch-with-macos/)**

In this video tutorial, we’ll show you how to use DDEV to set up a PHP development environment from scratch on macOS.

Using a local development environment means you’re working on your projects without risking injury to your live projects.

Follow [instructions to install DDEV in the docs](https://ddev.readthedocs.io/en/stable/#installation) or watch this video for an overview.

<div class="video-container">
<iframe loading="lazy" title="DDEV from scratch on macOS" width="500" height="281" src="https://www.youtube.com/embed/1kG94UjS8XE?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
</div>

## How to install your Docker-based dev environment with DDEV

These are notes from the [video tutorial](https://www.youtube.com/watch?v=1kG94UjS8XE). You can also check out the detailed [install DDEV instructions in the docs.](https://ddev.readthedocs.io/en/stable/#installation)

### First: [Install Docker for Mac](https://docs.docker.com/docker-for-mac/install/)

The [minimum requirements to run DDEV ](https://ddev.readthedocs.io/en/stable/#system-requirements)are Docker and Docker Compose, which comes bundled with Docker for Mac and Windows. DDEV pretty much works anywhere Docker will run.

### Next: [Install DDEV](https://ddev.readthedocs.io/en/stable/#installation)

**Option 1: With Homebrew**

You can install DDEV with [Homebrew](https://brew.sh/), and if you’re using Mac it’s a handy way to install.

`brew tap ddev/ddev && brew install ddev`

**Option 2: Install the DDEV binary with a script**

`curl https://raw.githubusercontent.com/ddev/ddev/master/install_ddev.sh | bash`

You run the same script later to upgrade.

### Set up your first project with DDEV.

In a typical web development workflow, most of the time you’re working in a repository that includes the web root for your PHP application or website. So the first thing is to cd to change directory so you’re inside that project folder or docroot.

Then you’ll answer 3 questions about the project. DDEV will make a best-guess, and usually, you can keep the defaults.

- **Project name** – DDEV will base the name on the current directory name.
- **Docroot** – Again, DDEV will make a guess from the docroot you’re currently in.
- **Project type** – DDEV will auto-detect if you’re using a CMS, or use PHP if you’re building a custom application.

The first time you configure a project, it will download the containers you need. In the future, it will come up even faster.

When you’re done, DDEV outputs a URL with the link to quickly view your site in your browser.

### Working on a new project? Or an existing one?

If this is a first-time project based on a PHP CMS like TYPO3 CMS or Drupal, you would have to go through the installation steps to set up the site.

Otherwise, you might be loading an existing project, and you’ll want to [import an existing database](https://ddev.readthedocs.io/en/stable/users/cli-usage/#database-imports).

These are some good commands to know but check ddev -h to see the complete list.

- `ddev list` to see what projects you have running.
- `ddev describe` to get information about the project.
- `ddev ssh` to SSH into the container.
- `ddev remove` to throw away the container but not the database. Pick up your project quickly next time.

### Need some help?

We hope the video helps you set up your new Mac web development environment set up. If you get stuck, we’re happy to help.

- [Add questions tagged “ddev” to Stack Overflow](https://stackoverflow.com/questions/tagged/ddev).
- Join the #ddev channel in [Drupal Slack](https://drupal.slack.com/messages/C5TQRQZRR) and [TYPO3 Slack](https://typo3.slack.com/messages/C8TRNQ601) for community support.
- [Tweet to @drud](https://twitter.com/intent/tweet?screen%5Fname=drud&ref%5Fsrc=twsrc%5Etfw)
