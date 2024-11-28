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

**Changes in defaults**: This is a major version of DDEV, with *some changes in defaults*: 

* PHP 8.3 becomes the default for new projects (but you can change any project to any PHP version, of course).
* Current stable Node.js 22 becomes the default for projects that don't specify another version.

**New Features and other things we're proud of**:

* `ddevcd` command can be used to switch between projects. See `ddev debug cd`. For example, if I have a project named `t3v12` I can do a `ddevcd t3v12` to switch to that directory. [Stas](https://github.com/stasadev) added this feature out of the blue and I love it. It does require a [tiny bit of one-time configuration](https://ddev.readthedocs.io/en/latest/users/usage/commands/#debug-cd).
* `drupal11` is introduced as a project type, demoting the `drupal` project type to simply an alias for "latest stable drupal version".
* The `ddev-webserver` image is at least 25% smaller. Only a few locales are included by default, and only currently-supported versions of PHP are built-in by default (but all the other versions still work). It was 480MB compressed, is now 361MB compressed.
* `ddev auth ssh` can now be used with individual key files and can follow symlinks. For example, if you only want to have a single file named `id_rsa` to be available to your projects, you can `ddev auth ssh -f ~/.ssh/id_rsa`.

**Smaller Changes**

* Added dynamic timeout handling for scripts on start based on setting of `default_container_timeout`.
* `ddev describe` changes how exposed ports are displayed for better clarity (thanks @ hanoii)
* Only a limited set of locales is now installed in ddev-webserver by default. If you need more, use `webimage_extra_packages: [locales-all]`
* Complex `ddev composer` command usage with json or args with spaces is fixed. (Bug was introduced in v1.23.5)

**Reversions and Removals**

* The `drupal` project type is no longer a generic project type, but instead is an alias to the latest stable Drupal (`drupal11` right now). A number of folks gave feedback that it caused the startup time to be longer and the process more complex. (`ddev config --update` is no longer a part of the Drupal quickstart)
* In v1.23.5 we started preferring vendor/bin/composer to the specified `composer_version` but users thought that was a mistake, so this was reverted
* The nginx-proxy router has been removed.
* The `ddev service enable` and `ddev service disable` commands were removed, as they have long been superceded by the use of `ddev add-on get` and `ddev add-on remove`
* Removed support for Python and Django4 projects. After more than a year, these did not gain traction or a community, so sadly we had to leave them behind.

Again, thanks so much to all of you for using, promoting, contributing, and supporting DDEV!



