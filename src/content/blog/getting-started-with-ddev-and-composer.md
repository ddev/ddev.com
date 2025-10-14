---
title: "Getting started with DDEV and Composer"
pubDate: 2018-11-29
modifiedDate: 2025-10-14
summary: Using DDEV's bundled Composer.
author: Randy Fay
featureImage:
  src: /img/blog/2018/11/marius-masalar-410695-unsplash-e1543521725507.jpg
  alt: Shallow-focus close-up photo of annotated sheet music
  credit: "Photo by [Marius Masalar](https://unsplash.com/photos/rPOmLGwai2w?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText) on [Unsplash](https://unsplash.com/?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText)."
categories:
  - Guides
---

[Composer](https://getcomposer.org) came into the PHP world to help with dependency-management—managing the growing network of external libraries that modern applications rely on. If you’re setting up a PHP development environment with Composer for most modern PHP environments, DDEV can help make it easier. DDEV has built-in Composer commands so you don’t have to install Composer (or PHP) on your host machine. You can use Composer right in the container. Overall, our goal with DDEV is to give users ultimate flexibility, yet predictability at the same time.

[Get Started With DDEV](/get-started)

### Composer for PHP dependency management

As web development evolved in the decade after PHP appeared, different web development communities began to share resources, libraries, and tools in true open source fashion. This made building applications faster but posed a new problem. This network of interconnected libraries meant any given web application could have a (potentially large) number of dependencies. What version of which library does this particular project need? How can we keep them updated?

Enter Composer, the dependency manager that [took its inspiration](https://getcomposer.org/doc/00-intro.md) from dependency managers like npm. Unlike some others, Composer works on a per-project basis, pulling in the correct version of the correct libraries from repositories like Packagist, [the main Composer repository](https://getcomposer.org/doc/01-basic-usage.md#packagist).

Composer is the recommended way to develop for many PHP frameworks and CMSs, but it still can cause issues, particularly for Windows users. Now with DDEV’s support for Composer, you don’t even have to install Composer on your local machine. You’ll get a more predictable experience and have one less thing to worry about.

## Built-in Composer commands in DDEV

The `ddev composer` feature is a wrapper on Composer that does everything inside the container, eliminating the need to install Composer on the host. If you’ve used Composer before, it will seem pretty familiar, but there’s an important difference to note.

Our recommended [quickstart](https://docs.ddev.com/en/stable/users/quickstart/) techniques for [TYPO3 CMS](https://docs.ddev.com/en/stable/users/quickstart/#typo3) and [Drupal](https://docs.ddev.com/en/stable/users/quickstart/#drupal) use Composer to create projects. You can also check out the docs on using the command line interface for [ddev and Composer](https://docs.ddev.com/en/stable/users/usage/developer-tools/#ddev-and-composer).

Most of the Composer features in the command line ddev app are direct analogs of Composer usage. You can prepend a Composer command with `ddev` and it works the same as the [commands in Composer](https://getcomposer.org/doc/03-cli.md). That includes

- `ddev composer require`
- `ddev composer install`
- `ddev composer update`
- `ddev composer create-project`
- And so forth!

The one thing that’s different is `ddev composer create-project`. If you’re familiar with Composer already, you know the [command to create a project](https://getcomposer.org/doc/03-cli.md#create-project) is this:

```
composer create-project <name> <directory> <version>
```

In DDEV, you use `ddev composer create-project <name>` without the additional directory component (all installs are done in the current [composer_root](https://docs.ddev.com/en/stable/users/configuration/config/#composer_root), which is the project root by default). For example, our [TYPO3 quickstart](https://docs.ddev.com/en/stable/users/quickstart/#typo3) recommends you run this command:

```bash
ddev composer create-project "typo3/cms-base-distribution"
```

The standard Composer command requires that you are creating a project in a completely empty directory. With DDEV that’s not possible, we have a `.ddev` directory already, if nothing else. So what DDEV does in the background is to create the project in a temporary directory, then it copies back into the project root. From the command line interface, you won’t even notice it.

Another thing you can do is execute Composer in other directories within the container. [SSH into a container](https://docs.ddev.com/en/stable/users/cli-usage/#ssh-into-containers) to open an interactive Bash shell session to the container. Then you can use Composer directly inside the container ([see the docs](https://docs.ddev.com/en/stable/users/usage/developer-tools/#ddev-and-composer)). You can end the Composer session by typing `exit`.

As the [documentation on ddev and Composer explains](https://docs.ddev.com/en/stable/users/usage/developer-tools/#ddev-and-composer), DDEV will execute the Composer command at the project root (the path can be changed with the [composer_root](https://docs.ddev.com/en/stable/users/configuration/config/#composer_root) option) in the web container, passing all arguments and flags to Composer, as the examples here show.

`ddev composer create-project "drupal/recommended-project:^11" --stability dev --no-interaction`

`ddev composer create-project "typo3/cms-base-distribution" . "^12"`

`ddev composer require monolog/monolog`

`ddev composer update --with-all-dependencies`

Each of these examples shows that the Composer commands will work, passing all options to Composer.

## Get started with DDEV and Composer

Composer is a great solution for dependency management in PHP, but it’s still not consistently applied across operating systems. Reduce friction in your development workflows by setting up consistent versions of Composer and PHP on your local development and deployment environments.

You can use DDEV with any PHP CMS or framework. We test DDEV on—and offer [Quickstart guides](https://docs.ddev.com/en/stable/users/quickstart/) for— Drupal, WordPress, TYPO3 CMS, Backdrop CMS and many others. Composer is the recommended way to develop with most of them, including TYPO3 CMS and Drupal.

Also, check out these articles:

- [Watch: DDEV from scratch with Windows WSL2](watch-ddev-local-from-scratch-with-windows-wsl2.md)
- [DDEV on Linux in 10 Minutes](ddev-on-linux-in-10-minutes.md)
- [Watch: DDEV From Scratch with macOS](watch-ddev-local-from-scratch-with-macos.md)
- [Debugging Docker on Windows, Mac, and Linux](debugging-docker-on-windows-mac-and-linux.md)
