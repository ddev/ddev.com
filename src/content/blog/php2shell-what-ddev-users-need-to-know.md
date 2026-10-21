---
title: "PHP2Shell: What DDEV Users Need to Know"
pubDate: 2026-10-21
summary: PHP fixed two critical vulnerabilities on October 21, 2026. Your local DDEV projects can't be reached from the internet, but your production servers can. Here's how to get the fixed PHP into your DDEV projects now, before DDEV v1.25.5.
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

- If you use DDEV only for local development, your DDEV projects aren't affected.
- Update PHP on the servers where your sites are hosted.
- If you use DDEV for casual hosting or `ddev share`, get the fixed PHP into those projects now, as described below, or upgrade to DDEV v1.25.5, which we hope to release on October 22.

## What It Means for Your DDEV Projects

Local development isn't affected because a DDEV project listens only on your own computer, so nobody on the internet can send it a request. A project is exposed in two cases:

- [Casual hosting](https://docs.ddev.com/en/stable/users/topics/hosting/) runs a public site with DDEV. An attack would run code in the project's web container rather than on the host, but that container can still change the site's files and reach its database.
- [`ddev share`](https://docs.ddev.com/en/stable/users/usage/commands/#share) puts a project on a public URL. Don't share a project until it has the fixed PHP.

:::warning[Update PHP where your sites are hosted]
Your production servers are exposed to the internet, so update PHP there first; distributions and LTS vendors got the patches in advance. PHP 8.1 and older get no updates from the PHP project, so check with your vendor or upgrade. If you can't update right away, see [Reducing Exposure](#reducing-exposure-until-you-can-update) below.
:::

## Getting the Fixed PHP Into DDEV Before v1.25.5

DDEV gets PHP from [deb.sury.org](https://deb.sury.org/). When we checked around 16:00 UTC on October 21, it had fixed packages for PHP 5.6 through 8.5 for Intel and AMD processors (AMD64), which run the vast majority of the world's web servers, most Windows and Linux computers, and Intel Macs. The builds for ARM processors (ARM64), such as Apple Silicon Macs (M1 and later), [come later](https://codeberg.org/oerdnj/deb.sury.org/issues/145), and v1.25.5 waits for them.

On Intel and AMD computers, you don't have to wait for v1.25.5:

- **PHP 5.6 through 8.1** aren't in the `ddev-webserver` image. DDEV installs them when it builds the project's web image, so a rebuild installs the fixed packages. The version number doesn't change for these old versions, so check that `ddev php -v` shows `built: Oct 21 2026` or later:

  ```bash
  ddev restart --no-cache  # or: ddev utility rebuild
  ddev php -v
  ```

- **PHP 8.2 through 8.5** are in the image. Create this file in the project, rebuild, and check that `ddev php -v` shows 8.5.12, 8.4.27, 8.3.36, or 8.2.35:

  ```dockerfile
  # .ddev/web-build/Dockerfile.php2shell
  # Delete this file after upgrading to DDEV v1.25.5
  RUN (apt-get update || true) && apt-get install -y --only-upgrade 'php*'
  ```

  ```bash
  ddev restart --no-cache  # or: ddev utility rebuild
  ddev php -v
  ```

We tested both cases on DDEV v1.25.4 on an Intel computer, with and without `use_hardened_images`. On Apple Silicon Macs (M1 and later) and other ARM computers, wait for deb.sury.org's ARM64 builds or for v1.25.5.

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

[Ondřej Surý](https://codeberg.org/oerdnj), who maintains the PHP packages for Debian and Ubuntu that DDEV and much of the PHP world use, published fixed packages for Intel and AMD processors for every version back to PHP 5.6 on the day PHP released the fixes, with ARM builds to follow. If your work depends on those packages, consider [sponsoring him](https://github.com/sponsors/oerdnj).

We'll update this post when DDEV v1.25.5 is out. If you have questions, reach out in any of the [support channels](https://docs.ddev.com/en/stable/users/support/).

---

_This article was edited and refined with assistance from Claude Code._
