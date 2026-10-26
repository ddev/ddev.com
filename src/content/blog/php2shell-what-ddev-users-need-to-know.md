---
title: "PHP2Shell: What DDEV Users Need to Know"
pubDate: 2026-10-21
modifiedDate: 2026-10-26
modifiedComment: "[DDEV v1.25.5](/blog/release-v1-25-5/) ships the fixed PHP, along with many other fixes and new features."
summary: PHP fixed two critical vulnerabilities on October 21, 2026. DDEV v1.25.5 ships the fixed PHP. Your local DDEV projects can't be reached from the internet, but your production servers can, so update PHP there too.
author: Stas Zhuk
featureImage:
  src: /img/blog/2026/10/banner-php2shell.svg
  srcDark: /img/blog/2026/10/banner-php2shell-dark.svg
  alt: "PHP2Shell: What to Know"
categories:
  - Community
---

PHP released 8.5.12, 8.4.27, 8.3.36, and 8.2.35 on October 21, 2026. They fix CVE-2026-109618 and CVE-2026-109619, nicknamed "PHP2Shell", two vulnerabilities that can let a single unauthenticated request run code on a server. According to PHP's [security advisory](https://www.php.net/archive/2026.php#2026-10-21-5), every PHP installation that serves web requests is at risk.

**TL;DR:**

- Upgrade to [DDEV v1.25.5](release-v1-25-5.md) now, especially if you use DDEV for casual hosting or `ddev share`. Along with the fixed PHP, it brings many other fixes and new features.
- PHP 8.6, new in v1.25.5, is still a release candidate without the fixes, so don't expose a PHP 8.6 project.
- Update PHP on the servers where your sites are hosted.
- DDEV projects used only for local development can't be reached from the internet, so they aren't at risk.

## What It Means for Your DDEV Projects

Local development isn't affected because a DDEV project listens only on your own computer, so nobody on the internet can send it a request. A project is exposed in these cases:

- [Casual hosting](https://docs.ddev.com/en/stable/users/topics/hosting/) runs a public site with DDEV. An attack would run code in the project's web container rather than on the host, but that container can still change the site's files and reach its database.
- [`ddev share`](https://docs.ddev.com/en/stable/users/usage/commands/#share) or a tunnel add-on puts a project on a public URL. Don't share a project until it has the fixed PHP.
- [`router_bind_all_interfaces`](https://docs.ddev.com/en/stable/users/configuration/config/#router_bind_all_interfaces) makes a project reachable from your local network.

DDEV serves PHP through PHP-FPM, which is affected too, even though PHP rates the risk highest for Apache's mod_php.

:::warning[Update PHP where your sites are hosted]
Your production servers are exposed to the internet, so update PHP there first; distributions and LTS vendors got the patches in advance. PHP 8.1 and older get no updates from the PHP project, so check with your vendor or upgrade. If you can't update right away, see [Reducing Exposure](#reducing-exposure-until-you-can-update) below.
:::

## Getting the Fixed PHP Without Upgrading DDEV

DDEV gets PHP from [deb.sury.org](https://deb.sury.org/), which has fixed packages for PHP 5.6 through 8.5. A project on an older DDEV version can install them:

- **PHP 5.6 through 8.1** aren't in the `ddev-webserver` image. DDEV installs them when it builds the project's web image, so a rebuild installs the fixed packages. The version number doesn't change for these old versions, so check that `ddev php -v` shows `built: Oct 21 2026` or later:

  ```bash
  ddev restart --no-cache  # or: ddev utility rebuild
  ddev php -v
  ```

- **PHP 8.2 through 8.5** are in the image. Create this file in the project, rebuild, and check that `ddev php -v` shows 8.5.12, 8.4.27, 8.3.36, or 8.2.35:

  ```dockerfile
  # .ddev/web-build/Dockerfile.php2shell
  # Safe to keep; you can delete it after upgrading to DDEV v1.25.5
  RUN (apt-get update || true) && apt-get install -y --only-upgrade 'php*'
  ```

  ```bash
  ddev restart --no-cache  # or: ddev utility rebuild
  ddev php -v
  ```

## Reducing Exposure Until You Can Update

PHP's advisory lists settings that block the attack paths it knows about. They don't make an installation safe, and a low `post_max_size` can break large uploads, so update as soon as you can. In a DDEV project, put them in a file and run `ddev restart`:

```ini
; .ddev/php/php2shell.ini
; Delete this file once PHP is updated
session.upload_progress.enabled = 0
; Use 32M if the site takes file uploads
post_max_size = 8M
upload_max_filesize = 6M
```

On PHP 8.5, also add `fatal_error_backtraces = 0`. DDEV adds `.ddev/php` files to PHP-FPM's configuration, so they apply before PHP parses a request, as the advisory requires. On other servers, the same lines go in `php.ini` or PHP's `conf.d` directory, followed by a restart of every PHP worker. The [advisory](https://www.php.net/archive/2026.php#2026-10-21-5) has the full list.

## Thanks, Ondřej

[Ondřej Surý](https://codeberg.org/oerdnj) maintains the PHP packages for Debian and Ubuntu that DDEV and much of the PHP world use, and built the fixes for every PHP version back to 5.6. If your work depends on those packages, consider [sponsoring him](https://github.com/sponsors/oerdnj).

If you have questions, reach out in any of the [support channels](https://docs.ddev.com/en/stable/users/support/).

---

_This article was edited and refined with assistance from Claude Code._
