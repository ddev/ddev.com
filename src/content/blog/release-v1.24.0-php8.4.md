---
title: "DDEV Release v1.24.0 with PHP 8.4.1 and all extensions"
pubDate: 2024-12-02
# modifiedDate: 2024-07-23
summary: New features and changes in DDEV v1.24.0
author: Randy Fay
featureImage:
  src: /img/blog/2024/12/php-logo.svg
  alt: PHP Logo for PHP 8.4
categories:
  - Announcements
---

Today we're proud to announce [DDEV v1.24.0](https://github.com/ddev/ddev/releases/tag/v1.24.0), with PHP 8.4.1 and the full complement of extensions, including Xdebug.

Congratulations to **all of you and all contributors who made this happen**. It's the DDEV community that makes DDEV successful, with your suggestions, contributions, enhancements, bug reports and financial support.

**Changes in defaults**: This is a major version of DDEV, with \*some changes in defaults:

- PHP 8.3 becomes the default for new projects (but you can change any project to any PHP version, of course).
- Current stable Node.js 22 becomes the default for projects that don't specify another version.

## New Features and other things we're proud of

- `ddevcd` command can be used to switch between projects. See `ddev debug cd`. For example, if I have a project named `t3v12` I can do a `ddevcd t3v12` to switch to that directory. [Stas](https://github.com/stasadev) added this feature out of the blue and I love it. It does require a [tiny bit of one-time configuration](https://ddev.readthedocs.io/en/stable/users/usage/commands/#debug-cd).
- `drupal11` is introduced as a project type, demoting the `drupal` project type to be a simple alias to the "latest stable Drupal version" (`drupal11` for now).
- The `ddev-webserver` image is at least 25% smaller. Only a few locales are included by default, and only currently-supported versions of PHP are built-in by default (but all the other versions still work). It was 480MB compressed, is now 361MB compressed. More details below.
- `ddev auth ssh` can now be used with individual key files and can follow symlinks. For example, if you only want to have a single file named `id_rsa` to be available to your projects, you can `ddev auth ssh -f ~/.ssh/id_rsa`.

## Smaller Changes

- Added dynamic timeout handling for scripts on start based on setting of `default_container_timeout`. This is mostly only for folks with exceptionally slow internet.
- Added explicit support for the `symfony` project type, see [docs](https://ddev.readthedocs.io/en/stable/users/quickstart/#symfony), thanks [@IndraGunawan](https://github.com/IndraGunawan).
- `ddev describe` changes how exposed ports are displayed for better clarity (thanks [@hanoii](https://github.com/hanoii))
- Only a limited set of locales is now installed in `ddev-webserver` by default. If you need more, use `webimage_extra_packages: [locales-all]`
- Complex `ddev composer` command usage with json or args with spaces is fixed. (A bug was introduced in v1.23.5.)

## Questions

<dl>
<dt>Do I have to change how I use the <code>drupal</code> project type?</dt>
<dd>If your project is actually a Drupal 11 project, there's no reason to make any changes. If your project is Drupal 8-10, you may want to change it to project type <code>drupal10</code>, for example although there's no meaningful difference in this release. </dd>
<dt>What if I want more locales than the ones provided by default?</dt>
<dd>The default locales installed in the web container for v1.24.0 are <code>en_CA.UTF-8, en_US.UTF-8, en_GB.UTF-8, de_DE.UTF-8, de_AT.UTF-8, fr_CA.UTF-8, fr_FR.UTF-8, ja_JP.UTF-8, ru_RU.UTF-8</code>. If you need other locales, all locales will be installed if you add <code>locales-all</code> to your <code>webimage_extra_packages</code> in <code>.ddev/config.yaml</code> For example, <code>webimage_extra_packages: ["locales-all"]</code>. (If you use other locales that you think should be added by default, we're happy to hear about them.)</dd>
<dt>What should I do after upgrading DDEV?</dt>
<dd>DDEV will already ask you to do a <code>ddev poweroff</code>, but consider doing a <code>ddev config --update</code> on your projects. This will auto-detect your project type and required PHP version. It may switch the <code>drupal</code> type to <code>drupal10</code> or <code>drupal11</code>.</dd>
</dl>

## Reversions and Removals

- The `drupal` project type is no longer a generic project type, but instead is an alias to the latest stable Drupal (`drupal11` right now). A number of folks gave feedback that it caused the startup time to be longer and the process more complex. (`ddev config --update` is no longer a part of the Drupal quickstart)
- In v1.23.5 we started preferring `vendor/bin/composer` to the specified `composer_version` but users thought that was a mistake, so this was reverted.
- The nginx-proxy router has been removed.
- The `ddev service enable` and `ddev service disable` commands were deprecated, as they have long been superseded by the use of `ddev add-on get` and `ddev add-on remove`. We apologize if this is an inconvenience, but we didn't see any significant usage of these commands. If you need something like that still, it's super easy to make a [custom command](https://ddev.readthedocs.io/en/stable/users/extend/custom-commands/) that would do the same thing, and consider delivering the custom command using an add-on.
- Removed support for Python and Django4 project types. After more than a year, these did not gain traction or a community, so sadly we had to leave them behind.

From the entire team, thanks for using, promoting, contributing, and supporting DDEV!

If you have more questions, please reach out to us in any of the many [support channels](https://ddev.readthedocs.io/en/stable/users/support/).

Follow our [blog](https://ddev.com/blog/), [Bluesky](https://bsky.app/profile/ddev.bsky.social), [LinkedIn](https://www.linkedin.com/company/ddev-foundation), [Mastodon](https://fosstodon.org/@ddev), and join us on [Discord](https://discord.gg/5wjP76mBJD). And we'd love to have you sign up for the [monthly newsletter](/newsletter).
