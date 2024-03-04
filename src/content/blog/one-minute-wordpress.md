---
title: "Spin Up a New, Local WordPress or Drupal Dev Environment Within 1 Minute With DDEV!"
pubDate: 2017-05-10
summary: Getting WordPress or Drupal quickly running locally with DDEV.
author: Rick Manelius
categories:
  - Guides
  - Videos
---

_Author’s Note: DDEV was at version v0.3 as of the time of this writing. For updates on future releases and features, please visit and follow the [DDEV project GitHub page](https://github.com/ddev/ddev)._

Local development can be a frustrating experience. Rather than developers being able to focus 100% of their effort and energy on their goals (e.g. building websites and delivering value to their customers), there is a considerable amount of overhead associated with setting up and maintaining the infrastructure, tooling, and workflows necessary to quickly and easily manage multiple websites. DDEV is the first of several products that DDEV will be releasing in order to improve the overall experience from development to deployment and hosting.

In this article, we’ll show you how to quickly get DDEV installed so that you can begin spinning up new WordPress and Drupal sites within minutes. We’ve also included a video that runs through some of its additional features, including task switching between multiple sites, accessing local development tools, and importing existing assets. We’d love your feedback! And if you run into any issues or if you have any feature requests, please submit them to the [DDEV GitHub issue queue](https://github.com/ddev/ddev/issues).

### Demo Requirements

DDEV is written in [Go](https://golang.org/) and leverages [Docker](https://www.docker.com/). These two choices help keep the end user requirements down to a minimum. In short, you need the following:

- Git
- Docker
- a text editor
- a terminal app
- DDEV ([see our one-line installer](https://github.com/ddev/ddev#installation-script) and [other install instructions](https://ddev.readthedocs.io/en/stable/#installation))

As of v0.3, we currently support the latest version of macOS and several popular Linux distributions (Ubuntu, Debian, and Fedora). Support for Windows is on its way (UPDATE: [experimental support is here](https://github.com/ddev/ddev/issues/196#issuecomment-300178008)) and we will gladly respond to issues for other distributions if they are surfaced in the issue queues.

### The 1-Minute Spin-up: New WordPress Site and Environment

Creating a quick, destructible WordPress site can be handy for testing new themes and plugins. Here’s how you can get one up within one minute after you’ve properly installed DDEV.

1. `git clone git@github.com:ddev/wordpress.git` (or you can pick a vanilla WordPress repo/ZIP)
2. `cd wordpress` (or the directory of your WordPress codebase)
3. `ddev config` (this is necessary so DDEV knows the application type and webroot)
4. `ddev start` (this kicks off several things in the background: spinning up containers, mounting the codebase, etc.)
5. Wait a brief moment while your environment is provisioning and then…
6. Visit `http://wordpress.ddev.local`

You should hit the WordPress installer screen and then you’re off to the races! To get access to the database credentials to complete the installation, run `ddev describe`.

<div class="video-wrapper">
<iframe src="https://www.youtube.com/embed/b-6EX3KCbnY" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
</div>

### A Deeper Tour

Once you’re able to get up and running, you can begin to explore the [additional functionality](https://github.com/ddev/ddev#usage) including imports, local development tools, managing multiple containers, etc. Below is a quick video tour.

<div class="video-wrapper">
<iframe loading="lazy" src="https://www.youtube.com/embed/JQrjsazBzP4" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
</div>

### Future Roadmap

Coming soon on [the project roadmap](https://github.com/ddev/ddev/wiki/roadmap), we will expand support to Windows, provide the ability to add additional containers to provide additional services and open the door for integration with third-party hosting providers in order to easily sync down content and files from the cloud. Stay tuned!
