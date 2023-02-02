---
title: "DDEV Adds Support for Backdrop CMS"
pubDate: 2018-02-14
author: Rick Manelius
categories:
  - Announcements
  - Guides
---

As part of our ongoing mission to make it easier for individuals and teams to adopt modern, container-based toolsets and workflows, we’re expanding the number of CMSs that we support in DDEV. Today we’re thrilled to add Backdrop CMS to the list! DDEV provides a fast yet robust way to work across multiple projects across multiple operating systems. Once you have installed DDEV, it’s possible to get a new site up and running on your local workstation in minutes as we’ll show in the quick start instructions below.

![](/img/blog/2018/02/backdrop-logo-horizontal-0.png)

## Quick Start Guide

For future updates and additional information, please check out the [DDEV project documentation](https://ddev.readthedocs.io/en/latest/). The following is the simplest, 4-step path to get a new Backdrop site up.

1. [Install DDEV](https://ddev.readthedocs.io/en/latest/#installation)
2. Download Backdrop
3. Configure
4. Start!

### 1. Install DDEV

There are a few ways to install DDEV, including [macOS homebrew](https://ddev.readthedocs.io/en/latest/#homebrew-macos) (recommended), an [install script](https://ddev.readthedocs.io/en/latest/#installation-script-linux-and-macos), or a [manual download](https://ddev.readthedocs.io/en/latest/#manual-installation-linux-and-macos) of the binary.

We keep the number of dependencies minimal by design (mostly Docker and Docker Compose), but if you’re using Windows you’ll need Windows 10 Pro in order to install Docker for Windows.

### 2. Clone Backdrop

- `git clone git@github.com:backdrop/backdrop.git`
- `cd backdrop`
- `git checkout tags/1.9.0`

### 3. Configure

There are two options here. You can either run `ddev configure` and answer questions as you are prompted, or you can specify your answers using flags. This would look like the following:

```
ddev configure –sitename backdrop-demo –apptype backdrop –docroot ./
```

### 4. Start

Run `ddev start`.

At this point, you will see containers being downloaded and spun up. Once that is complete, you should receive a message that your site is ready to go and is accessible at `http://backdrop-test.ddev.local` or `https://backdrop-test.ddev.local`, which will direct you to the install page. You can find the database credentials by running `ddev describe`.

### Putting It All Together

The following YouTube video shows how you can go through the entire process in 1-2 minutes. If you already have DDEV installed, you could script this as follows:

- `cd ~/Desktop`
- `git clone git@github.com:backdrop/backdrop.git`
- `cd backdrop`
- `git checkout tags/1.9.0`
- `ddev config –sitename backdrop-demo –apptype backdrop –docroot ./`
- `ddev start`

## Going Further

You can find all the details in our [documentation](https://ddev.readthedocs.io/) and [quickstart](/quickstart), but we think you’ll want to know these facts to make your day easier now:

- Project Info: Run `ddev describe` to access database credentials and other services.
- Developer Tools: Access MailHog, phpMyAdmin, and more right out of the gates.
- Hooks: Common tasks you need to run can be version controlled and shared.
- List: Running two or more projects? Run `ddev list` to keep on top of them all.
- Additional Services: Add new containers (e.g. Apache Solr) quickly.

Drush in the web container is not yet supported but is a high priority. See the [Backdrop quickstart](https://ddev.readthedocs.io/en/latest/users/cli-usage/#backdrop-quickstart).

## How Can We Make It Better?

We love your feedback because it helps us learn what features are making an impact and what opportunities lay ahead of us. You can find us active in our [GitHub issue queue](https://github.com/drud/ddev/issues), in the [#ddev channel](https://drupal.slack.com/messages/C5TQRQZRR) in the Drupal Community Slack, or on [Twitter](https://twitter.com/drud).

**[Get started with DDEV-Local](/get-started/)**
