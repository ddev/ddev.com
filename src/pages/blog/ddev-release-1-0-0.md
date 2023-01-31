---
title: "DDEV Release 1.0.0! FQDNs, Improved Settings Management, Multi-Project Commands"
pubDate: 2018-07-20
author: Rick Manelius
featureImage:
  src: https://ddev.com/app/uploads/2018/07/jason-leung-479251-unsplash-e1532107303829.jpg
  alt:
  caption:
  credit: "Photo by [Jason Leung](https://unsplash.com/photos/Xaanw0s0pMk?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/gift?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText)."
categories:
  - Announcements
---

We’re proud and excited to announce [DDEV 1.0.0](https://github.com/drud/ddev/releases/tag/v1.0.0). It’s been just over one year from our first public release. Releasing version 1.0.0 is a major milestone for us, as it marks a commitment from this point on to [semantic versioning](https://ddev.readthedocs.io/en/latest/#versioning). In this release, we offer you some great new features and a peek at the new DDEV UI to complement the command line interface.

### Why semantic versioning from this point on?

[DDEV](https://ddev.com/what-is-ddev/) offers a “just works” out of the box experience while allowing customization options to extend it for your own needs or even wrapping ddev as if it were a library. For that reason, semantic versioning is an ideal way to communicate and set expectations with developers regarding potentially breaking changes.

From the start, our goal has been to make DDEV a reliable foundation for everyday creative development. Breakages hurt, and that’s why people are often hesitant about upgrades. We want our users to be confident in our tools, so making upgrades smooth, easy, and even enjoyable is an important part of that developer experience.

We’ve seen the web development experience and toolset evolve in the last decade. Now your CMS is part of a complex ecosystem of libraries and tools. There’s even more pressure for developers to keep up with it all. This is what is called “dependency hell” in the [SemVer](https://semver.org/) specification.

Semantic versioning helps our users know when a minor version introduces functionality in a backward-compatible way, and when a major version introduces new capabilities which affect the underlying API.

Before version 1.0.0 we explored reaching out to new communities and CMSs. Working with Drupal, Backdrop, TYPO3 CMS, and WordPress helped us see how we could make one tool that played well with others. We learned a lot from our users, and we’re continually grateful for your feedback. Now we’re ready to move to the next phase of development.

### Feature highlights from DDEV 1.0.0

Find out the details in our [release notes](https://github.com/drud/ddev/releases/tag/v1.0.0).

**Support for fully qualified domain names (FQDNs)**

FQDNs are useful for actual domain testing, SSO requirements, branding, testing with subdomains, and so forth. For several of our partners, the requirements for authentication were a deal-breaker. With FQDNs you can also develop on applications with SSO (single sign-on) so you have the top level domain matching the one you’re testing. This is also a great feature for our WordPress users. WordPress uses absolute URLs in the database. If you want to see how your site works with the live domain as it stands, you can do that now with FQDN support. FQDNs also help with branding. Say, for example, you’re doing a client demo or recording a screencast and you want to mask the standard ddev local URL. That’s easy now.

How? Add additional project hostnames in your project’s .ddev/config.yaml. Find out how in the docs for [Additional Project Hostnames](https://ddev.readthedocs.io/en/latest/users/extend/additional-hostnames/).

**Drupal Settings.php Enhancements**

In our ongoing effort to keep developers in the flow and not fighting their stack, we’ve introduced some important user requests. The first is that we’ve removed Drupal’s default permission hardening of the sites/default and settings.php. This allows users to quickly remove or edit settings files. It also allows DDEV to append and manage a new settings.ddev.php file so that users can version control a settings.local.php file if their use case requires it. This allows DDEV to manage what it needs to while being minimally invasive or require users to modify their workflows to suit DDEV.

How? Give it a try by spinning up a vanilla Drupal 8 site with an existing settings.local.php and you will see how it auto-detects and notifies along the way!

**Multi-project commands: Stop all, remove all, start all!**

We were surprised (and encouraged) to see our users juggling as many as 20 DDEV projects. Senior developers, CTOs and team-leads oversee many projects. They might need to touch multiple client projects along with sales discovery projects over the course of several days. It makes sense to keep these quickly available. However, sometimes, you want to quickly stop all running projects, remove all projects in your ddev list, or start all the projects in your `ddev list`. Now you can, without needing to go project by project.

How? Add the `--all` flag to affect all projects in your list. For example, `ddev rm --all` will remove any projects in your list. Want to bulk manage some of your projects and not all? Just specify the name. For example:

`ddev rm project1 project2`

**Docs! Windows support across the board**

We’re excited to see Windows users are loving the Windows installer. The bulk of Windows users (80%) prefer using the Windows installer versus manually downloading the zip archive. We’ll keep maintaining that!

We’re expanded and updated the [documentation for Windows users](https://ddev.readthedocs.io/en/latest/#installation-or-upgrade-windows).

We now fully support Windows 10 Home (or other Windows version) with [Docker Toolbox](https://docs.docker.com/toolbox/). This is a big deal because we’ve met many people that wanted to use DDEV but couldn’t because of the Win 10 Pro requirement in Docker for Windows. For example, those working teams or organizations that issued locked down machines made impossible to even upgrade to Win 10 Pro. Now Docker Toolbox opens up the possibilities, particularly on mixed teams. We’re looking for more feedback on other versions, tell us if you’re trying out Docker Toolbox!

### Update DDEV

Using Homebrew on Mac? Updating is easy.

`brew upgrade ddev`

Upgrading Windows? Use the [Windows installer](https://ddev.readthedocs.io/en/latest/#installation-or-upgrade-windows).

Mac and Linux users can [upgrade the same way they installed](https://ddev.readthedocs.io/en/latest/#installationupgrade-script-linux-and-macos).

### Ohai DDEV-UI!

Ta-da! With DDEV 1.0.0 we’re also unveiling a sneak peek at the upcoming alpha release of our DDEV-UI.

![](https://ddev.com/app/uploads/2018/07/ddev-gui-1024x640.jpg)

Tools that only work with the command line exclude entire teams and individuals from collaborating, so we have always intended to provide a GUI which complemented the command-line interface we provide with DDEV.

Among members of a cross-disciplinary team, you might have project managers or designers who will never have a working familiarity with the command line. It’s not how they work, and it’s a big barrier for them. Certain communities also have a bias towards visual or graphical tools, for example in the WordPress community, a GUI is expected.

Our mission at DRUD is to create tools and services which make it easier for your teams to collaborate and be creative. That often means developing applications and websites with multiple frameworks and CMSs in the front end with multiple hosting endpoints. The last thing you want to worry about is your local development environment. DDEV is a key part of our mission. With everyone on your cross-disciplinary teams enabled with access to the same set of tools, you can ensure they deftly juggle hand-offs of multiple projects without dealing with inconsistencies and unwanted surprises.

We hope this new UI opens up collaboration across your team. Tell us what you think!

### Want to try DDEV-UI?

We’ll have the alpha release available soon. To keep up to date, [“star” the DDEV project on GitHub](https://github.com/drud/ddev) and subscribe to our newsletter.
