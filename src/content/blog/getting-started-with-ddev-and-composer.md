---
title: "Getting started with DDEV and Composer"
pubDate: 2018-11-29
summary: Using DDEV v1.4’s bundled Composer.
author: Randy Fay
featureImage:
  src: /img/blog/2018/11/marius-masalar-410695-unsplash-e1543521725507.jpg
  alt: Shallow-focus close-up photo of annotated sheet music
  credit: "Photo by [Marius Masalar](https://unsplash.com/photos/rPOmLGwai2w?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText) on [Unsplash](https://unsplash.com/?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText)."
categories:
  - Guides
---

[Composer](https://getcomposer.org) came into the PHP world to help with dependency-management—managing the growing network of external libraries that modern applications rely on. If you’re setting up a PHP development environment with Composer for TYPO3 or Drupal 8, DDEV can help make it easier. DDEV now has built-in Composer commands so you don’t have to install Composer on your host machine. You can use Composer right in the container. Overall, our goal with DDEV is to give users ultimate flexibility, yet predictability at the same time.

[Download DDEV](https://github.com/ddev/ddev)

### Composer for PHP dependency management

As web development evolved in the decade after PHP appeared, different web development communities began to share resources, libraries, and tools in true open source fashion. This made building applications faster but posed a new problem. This network of interconnected libraries meant any given web application could have a (potentially large) number of dependencies. What version of which library does this particular project need? How can we keep them updated?

Enter Composer, the dependency manager that [took its inspiration](https://getcomposer.org/doc/00-intro.md) from dependency managers like npm. Unlike some others, Composer works on a per-project basis, pulling in the correct version of the correct libraries from repositories like Packagist, [the main Composer repository](https://getcomposer.org/doc/01-basic-usage.md#packagist).

Composer is the recommended way to develop for both TYPO3 CMS and Drupal 8, but it still causes issues, particularly for Windows users. Now with DDEV’s support for Composer, you don’t even have to install Composer on your local machine. You’ll get a more predictable experience and have one less thing to worry about.

## Using Composer and DDEV together just got better

Before [the DDEV 1.4 release](https://ddev.com/ddev-local/ddev-v1-4-0-in-container-composer-commands-ssh-authentication-database-export/), our instructions were written assuming the typical user was a Mac or Linux user with Composer installed. It didn’t work well for lots of Windows users. The fundamental “gotcha” that proved most challenging for Windows users was that even if they get PHP and Composer set up properly on their Windows machine, they still ran into trouble when they ran the `composer create-project` command

We noticed more and more of our Windows users sharing workarounds [in our community](https://ddev.readthedocs.io/en/latest/#support), such as Slack and [Stack Overflow](https://stackoverflow.com/questions/tagged/ddev). We realized how we could make this a lot easier, and in DDEV 1.4, we released several improvements to make the experience better, particularly for Windows users.

The new Composer command in DDEV simplifies the use of Composer, and allows you to create and manage projects without having Composer installed on your host machine.

As a bonus, we also changed Composer cache; now it resides in a shared Docker volume, making it much faster to do in-container Composer builds.

## Built-in Composer commands in DDEV

The new `ddev composer` feature is a wrapper on Composer that does everything inside the container, eliminating the need to install Composer on the host. If you’ve used Composer before, it will seem pretty familiar, but there’s an important difference to note.

Our recommended [quickstart](https://ddev.readthedocs.io/en/latest/users/cli-usage/#quickstart-guides) techniques for both [TYPO3 CMS](https://ddev.readthedocs.io/en/latest/users/cli-usage/#typo3-quickstart) and [Drupal 8](https://ddev.readthedocs.io/en/latest/users/cli-usage/#drupal-8-quickstart) use Composer to create projects. You can also check out the docs on using the command line interface for [ddev and Composer](https://ddev.readthedocs.io/en/latest/users/developer-tools/#ddev-and-composer).

Most of the Composer features in the command line ddev app are direct analogs of Composer usage. You can prepend a Composer command with `ddev` and it works the same as the [commands in Composer](https://getcomposer.org/doc/03-cli.md). That includes

- `ddev composer require`
- `ddev composer install`
- `ddev composer update`
- And so forth!

The one thing that’s different is the command to create a project. If you’re familiar with Composer already, you know the [command to create a project](https://getcomposer.org/doc/03-cli.md#create-project) is this:

`composer create-project`

In ddev, you run this command: `ddev composer create`. For example, our [TYPO3 quickstart](https://ddev.readthedocs.io/en/latest/users/cli-usage/#typo3-quickstart) recommends you run this command:

`ddev composer create typo3/cms-base-distribution ^9`

The standard Composer command requires that you are creating a project in a completely empty directory. With ddev that’s not possible, we have a .ddev directory already, if nothing else. So what ddev does in the background is to create the project in a temporary directory, then it copies back into the project root. From the command line interface, you won’t even notice it.

In fact, if you do attempt to run `ddev composer create-project` you’ll get a friendly reminder that this command is unsupported, and ddev will tell you to use `ddev composer create` for basic project creation.

Another thing you can do is execute Composer in other directories within the container. [SSH into a container](https://ddev.readthedocs.io/en/latest/users/cli-usage/#ssh-into-containers) to open an interactive bash shell session to the container. Then you can use Composer ‘natively’ ([see the docs](https://ddev.readthedocs.io/en/latest/users/developer-tools/#ddev-and-composer)). You can end the native Composer session by typing `exit`.

As the [documentation on ddev and Composer explains](https://ddev.readthedocs.io/en/latest/users/developer-tools/#ddev-and-composer), ddev will execute the Composer command at the project root in the web container, passing all arguments and flags to Composer, as the examples here show.

`ddev composer create drupal-composer/drupal-project:8.x-dev --stability dev --no-interaction`

`ddev composer create typo3/cms-base-distribution ^9`

`ddev composer require monolog/monolog`

`ddev composer update --with-dependencies`

Each of these examples shows that the Composer commands will work, passing all options to Composer.

## Get started with DDEV and Composer

Composer is a great solution for dependency management in PHP, but it’s still not consistently applied across operating systems. Reduce friction in your development workflows by setting up consistent versions of Composer and PHP on your local development environment and your host with DDEV, our containerized Docker-based dev-to-deploy solution.

You can use DDEV with any PHP CMS or framework. We test DDEV on—and offer [Quickstart guides](https://ddev.readthedocs.io/en/latest/users/cli-usage/#quickstart-guides) for— Drupal, WordPress, TYPO3 CMS, and Backdrop CMS. Composer is the recommended way to develop with TYPO3 CMS and Drupal.

Also, check out these articles:

- How to set up a [Docker-based development environment on macOS](https://ddev.com/ddev-local/ddev-local-scratch-macos/).
- [Debugging Docker on Windows, Mac, and Linux](https://ddev.com/ddev-local/debugging-docker-on-windows-mac-and-linux/)
- [DDEV v1.4 release](https://ddev.com/ddev-local/ddev-v1-4-0-in-container-composer-commands-ssh-authentication-database-export/)
