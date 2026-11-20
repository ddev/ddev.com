---
title: "DDEV v1.25.6: PHP 8.6.0 and PHP Security Fixes"
pubDate: 2026-11-20
summary: DDEV v1.25.6 ships PHP 8.6.0 and the PHP security releases of November 19. It also adds a form for interactive `ddev config`, new tables in `ddev list` and `ddev describe`, cache volumes for each project, and nginx deny rules that match what each CMS's `.htaccess` denies on Apache.
author: Stas Zhuk
featureImage:
  src: /img/blog/2026/11/banner-ddev-v1-25-6.svg
  srcDark: /img/blog/2026/11/banner-ddev-v1-25-6-dark.svg
  alt: DDEV v1.25.6 Release Banner
categories:
  - Announcements
---

[DDEV v1.25.6](https://github.com/ddev/ddev/releases/tag/v1.25.6) comes less than a month after v1.25.5, because PHP released security fixes and PHP 8.6.0 on November 19, and we wanted `ddev-webserver` to ship them. It also brings over 100 PRs from the DDEV community: your suggestions, bug reports, code, and financial support made them possible.

## Table of Contents

## PHP Security Fixes

`ddev-webserver` now ships PHP 8.5.13, 8.4.28, 8.3.37, and 8.2.36, which fix [17 advisories](https://github.com/php/php-src/security/advisories). Projects on PHP 5.6 through 8.1 get the same fixes from deb.sury.org, with unchanged version numbers. Each project picks them up the next time it starts.

None of the advisories looks urgent for a default DDEV project. DDEV's `session.upload_progress.enabled = 0` and `zend.exception_ignore_args = On` block two of the critical ones, and the way DDEV runs PHP-FPM makes the FPM ones unreachable or harmless. A custom configuration, such as a file-based `error_log` or `fastcgi_keep_conn on`, can open some of them again. Nine others depend on your project's own code, such as session handling or SOAP endpoints, and only the PHP update fixes them.

:::tip[Getting a new PHP patch release before DDEV ships it]
New PHP patch releases, such as security fixes, reach deb.sury.org before the next DDEV release. This file upgrades the PHP packages in your project's web image when you rebuild it:

```dockerfile
# .ddev/web-build/Dockerfile.php-upgrade
# Safe to keep; you can delete it after upgrading DDEV
RUN (apt-get update || true) && apt-get install -y --only-upgrade 'php*'
```

```bash
ddev restart --no-cache
ddev php -v
```

See [`php_version`](https://docs.ddev.com/en/stable/users/configuration/config/#php_version).
:::

## PHP 8.6.0

DDEV now ships the PHP 8.6.0 release. To try it:

```bash
ddev config --php-version=8.6 && ddev restart
```

The `apcu`, `imagick`, `memcached`, `redis`, `uploadprogress`, `xdebug`, `xhprof`, `xmlrpc`, and `yaml` extensions aren't built for PHP 8.6 yet, so you can't use them there.

## A Form for `ddev config`

Interactive [`ddev config`](https://docs.ddev.com/en/stable/users/usage/commands/#config) shows what DDEV detected in a form, where you can also change the PHP version, database, and web server. <kbd>Enter</kbd> saves it as it is:

![Interactive `ddev config` in v1.25.6: changing the project type to drupal and the database to PostgreSQL before saving](/img/blog/2026/11/ddev-config-form.webp)

Choosing a project type brings its recommended PHP version, database, and web server, and choosing a database type brings its default version. <kbd>Esc</kbd> exits without writing anything.

A script that pipes answers into bare `ddev config` now needs a leading `no` line, because the first question asks whether to use the suggested configuration. Flags, as in `ddev config --project-type=drupal11 --docroot=web`, don't depend on the questions.

## New Tables in `ddev list` and `ddev describe`

[`ddev list`](https://docs.ddev.com/en/stable/users/usage/commands/#list), [`ddev describe`](https://docs.ddev.com/en/stable/users/usage/commands/#describe), and [`ddev snapshot --list`](https://docs.ddev.com/en/stable/users/usage/commands/#snapshot) now fit the terminal width and look like [`ddev tui`](https://docs.ddev.com/en/stable/users/usage/commands/#tui). Here are eight demo projects in v1.25.5 (top) and v1.25.6 (bottom):

![`ddev list` in v1.25.5 (top) and v1.25.6 (bottom)](/img/blog/2026/11/ddev-list-v1-25-5-vs-v1-25-6.png)

Project names wrap at hyphens instead of in the middle of a word, each status has a symbol, and long URLs are shortened without breaking the link. If a script reads these tables, switch it to `-j` for JSON.

## Cache Volumes for Each Project

This is the change you are most likely to notice. Until now, all projects shared their Composer, npm, and Yarn caches and shell history in the `ddev-global-cache` volume, so the Terminus cache, for example, carried one project's Pantheon login into other projects. Each project now has its own [cache volumes](https://docs.ddev.com/en/stable/users/usage/architecture/#project-cache-volumes), so after upgrading:

- Bash and MySQL history start empty.
- The first Composer or npm install in each project downloads everything again.
- Add-ons that write to `/mnt/ddev-global-cache` from `web` lose that data on restart until they mount the volume themselves, as [The `ddev-global-cache` Volume](https://docs.ddev.com/en/stable/users/usage/architecture/#the-ddev-global-cache-volume) shows.

The old caches stay in `ddev-global-cache`. To free that space, remove the volume, and DDEV creates it again on the next start:

```bash
ddev poweroff
docker volume rm ddev-global-cache
```

## Security Changes

- A crafted archive in `ddev add-on get`, `ddev import-db`, or `ddev import-files` could write outside its destination through relative symlinks. This is fixed, see [GHSA-vxj4-5gfg-97c2](https://github.com/ddev/ddev/security/advisories/GHSA-vxj4-5gfg-97c2).
- PHP files in directories that DDEV's nginx configuration denies, such as TYPO3 `vendor`, CodeIgniter `system`, and hidden directories, no longer run, thanks to [@Atesca](https://github.com/Atesca).
- nginx now denies what the CMS's `.htaccess` denies on Apache, such as Drupal's `*.yml` and `*.twig` files, Magento 1's `app/etc/local.xml` with the database credentials, and Maho's customer uploads. Apache denies dotfiles such as `.env` and `.git/`. If you removed `#ddev-generated` from [`.ddev/nginx_full/nginx-site.conf`](https://docs.ddev.com/en/stable/users/extend/customization-extendibility/#custom-nginx-configuration) or [`.ddev/apache/apache-site.conf`](https://docs.ddev.com/en/stable/users/extend/customization-extendibility/#custom-apache-configuration), merge the changes from the new template.
- The `ddev-xhgui` image had PHP and nginx from July 2025, and now gets current Alpine packages.

## Regressions, Fixed

- Usage data is sent again if you [opted in](https://docs.ddev.com/en/stable/users/usage/diagnostics/). v1.25.5 sent nothing.
- Lines you type after a command that reads the terminal, like the Craft CMS setup wizard, are no longer dropped. This broke in v1.25.3.

## Everything Else

When you run DDEV in GitHub Actions, GitLab CI, or another CI system, `ddev start` [passes its `CI` variable into the `web` container](https://docs.ddev.com/en/stable/users/configuration/environment-variables/#ci-from-the-host), so tools there skip prompts and progress bars. The [Wagtail quickstart](https://docs.ddev.com/en/stable/users/quickstart/#wagtail-python-generic) builds its virtual environment in the web image. A restarted `web` or `xhgui` container no longer takes about 60 seconds to become healthy, and [custom command](https://docs.ddev.com/en/stable/users/extend/custom-commands/) files keep their group-write bit and ACLs, thanks to [@steffenmaechtel](https://github.com/steffenmaechtel). See the [release notes](https://github.com/ddev/ddev/releases/tag/v1.25.6) for the rest.

From all of us, thanks for using, promoting, contributing, and supporting DDEV!

If you have questions, reach out in any of the [support channels](https://docs.ddev.com/en/stable/users/support/).

If you wonder how all this could be done, it's because of generous sponsors who let two of us work on this every day. If you and your team aren't already financially supporting DDEV, consider [joining our sponsors](/sponsor).

Follow our [blog](https://ddev.com/blog/), [Bluesky](https://bsky.app/profile/ddev.bsky.social), [LinkedIn](https://www.linkedin.com/company/ddev-foundation), [Mastodon](https://fosstodon.org/@ddev), and join us on [Discord](/s/discord). Sign up for the [monthly newsletter](/newsletter).

---

_This article was edited and refined with assistance from Claude Code._
