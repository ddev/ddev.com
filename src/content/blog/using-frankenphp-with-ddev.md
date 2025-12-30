---
title: "Using FrankenPHP with DDEV"
pubDate: 2025-07-03
modifiedDate: 2025-12-30
modifiedComment: Update FrankenPHP add-on instructions, remove deprecated content, update benchmark results.
summary: Learn how to use FrankenPHP with DDEV through the official add-on or Debian packages. Includes installation steps, features, and performance benchmarks.
author: Stas Zhuk
featureImage:
  src: /img/blog/2025/07/frankenphp-logo.png
  alt: FrankenPHP logo
  credit: FrankenPHP logo from [GitHub](https://github.com/php/frankenphp)
categories:
  - Add-ons
  - Guides
---

## Introduction

The PHP ecosystem is changing fast, with tools like [FrankenPHP](https://frankenphp.dev) improving both performance and developer experience.

FrankenPHP is now [officially supported](https://thephp.foundation/blog/2025/05/15/frankenphp/) by The PHP Foundation.

This guide explains how FrankenPHP can be used with DDEV using [ddev/ddev-frankenphp](https://github.com/ddev/ddev-frankenphp) add-on.

### Generic web server

This blog shows examples of the recently added [DDEV's generic web server](https://docs.ddev.com/en/stable/users/extend/customization-extendibility/#using-nodejs-as-ddevs-primary-web-server), which supports flexible configurations. It allows you to use any custom web server you want, including Node.js, Python, Ruby, etc.

## DDEV FrankenPHP Add-on

The [ddev/ddev-frankenphp](https://github.com/ddev/ddev-frankenphp) add-on is now officially maintained by the DDEV team! It has matured to production-ready status with full feature support.

### ⚙️ Installation:

```bash
ddev add-on get ddev/ddev-frankenphp
ddev restart
```

Install pre-packaged extensions using the `php-zts-` prefix (see [supported extensions](https://pkg.henderkes.com/84/php-zts/packages?type=debian)):

```bash
# install mongodb and sqlsrv extensions
ddev config --webimage-extra-packages="php-zts-mongodb,php-zts-sqlsrv"
ddev restart
```

### ✨ Features:

- Supports PHP 8.2+
- Install any PHP extension (Redis, Xdebug, Memcached, etc.)
- Custom FrankenPHP options supported
- Worker mode supported for maximum performance
- Full debugging support: [`ddev blackfire`](https://docs.ddev.com/en/stable/users/usage/commands/#blackfire), [`ddev xdebug`](https://docs.ddev.com/en/stable/users/usage/commands/#xdebug), [`ddev xhprof`](https://docs.ddev.com/en/stable/users/usage/commands/#xhprof), [`ddev xhgui`](https://docs.ddev.com/en/stable/users/usage/commands/#xhgui)

If you want to suggest some feature or found a bug, feel free to [open an issue](https://github.com/ddev/ddev-frankenphp/issues).

## Resources

- [FrankenPHP documentation](https://frankenphp.dev/docs/)
- [DDEV's generic web server](https://docs.ddev.com/en/stable/users/extend/customization-extendibility/#using-nodejs-as-ddevs-primary-web-server)
- [FrankenPHP add-on](https://github.com/ddev/ddev-frankenphp)
- [FrankenPHP Static PHP Package Repository](https://debs.henderkes.com/)
- [Hola FrankenPHP! Laravel Octane Servers Comparison: Pushing the Boundaries of Performance](https://medium.com/beyn-technology/hola-frankenphp-laravel-octane-servers-comparison-pushing-the-boundaries-of-performance-d3e7ad8e652c)

## Benchmarking

Using [ddev-frankenphp-benchmark](https://github.com/stasadev/ddev-frankenphp-benchmark), I compared three setups:

- `nginx-fpm`: DDEV's `nginx-fpm` web server with `php-fpm`
- `apache-fpm`: DDEV's `apache-fpm`  web server with `php-fpm`
- `frankenphp-addon`: DDEV's `generic` web server with `frankenphp`

Summary:

- All configurations delivered comparable and adequate performance.
- FrankenPHP is a win where there is an upstream hosting environment using FrankenPHP.
- Benchmarks used default DDEV settings, not production-optimized configurations.
- Laravel Octane (FrankenPHP worker mode) was not used and could yield better results.
- CPU and memory usage were not measured.

### Benchmarking Results

<b>Software:</b><br>
DDEV: v1.24.10<br>
Mutagen: disabled<br>
PHP: v8.4<br>
Laravel: v12.44.0<br>
FrankenPHP: v1.11.1<br>
Docker Engine: v29.1.3<br>
Operating System: Manjaro Linux AMD64<br>
Kernel Version: 6.12.63-1-MANJARO

<b>Hardware:</b><br>
Intel i7 8750H (6 Core/12 Thread, 2.2 Ghz, Turbo 4.1 Ghz)<br>
32 GB DDR4 2667 Mhz<br>
Samsung 870 Evo SSD (530w/560r MB/s)

![Requests](/img/blog/2025/07/frankenphp-requests.png)

![Request Per Second](/img/blog/2025/07/frankenphp-request-per-second.png)

![Transfer Per Second](/img/blog/2025/07/frankenphp-transfer-per-second.png)

![Latency Distribution (Health Check Endpoint)](/img/blog/2025/07/frankenphp-latency-distribution-health-check.png)

![Latency Distribution (Static Endpoint)](/img/blog/2025/07/frankenphp-latency-distribution-static.png)

![Latency Distribution (HTTP Request Endpoint)](/img/blog/2025/07/frankenphp-latency-distribution-http-request.png)

If you find DDEV (and its add-ons like FrankenPHP) useful, consider [supporting its development](/support-ddev/#sponsor-development). Thank you!
