---
title: "Using FrankenPHP with DDEV"
pubDate: 2025-07-03
modifiedDate: 2025-11-27
modifiedComment: The FrankenPHP add-on is now official.
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

This guide explains two ways to integrate FrankenPHP with DDEV:

1. **Official DDEV add-on** (recommended): Run FrankenPHP as a separate service with full PHP extension support and flexibility
2. **Debian packages**: Install FrankenPHP directly in the web container (PHP 8.4 only, limited features)

### Generic web server

This blog shows examples of the recently added [DDEV's generic web server](https://docs.ddev.com/en/stable/users/extend/customization-extendibility/#using-nodejs-as-ddevs-primary-web-server), which supports flexible configurations. It allows you to use any custom web server you want, including Node.js, Python, Ruby, etc.

## DDEV FrankenPHP Add-on (Recommended)

The [ddev/ddev-frankenphp](https://github.com/ddev/ddev-frankenphp) add-on is now officially maintained by the DDEV team! It has matured to production-ready status with full feature support.

### ⚙️ Installation:

```bash
ddev add-on get ddev/ddev-frankenphp
ddev restart
```

To add PHP extensions (see supported extensions [here](https://github.com/mlocati/docker-php-extension-installer?tab=readme-ov-file#supported-php-extensions)):

```bash
ddev dotenv set .ddev/.env.web --frankenphp-custom-extensions="redis memcached"
ddev stop && ddev debug rebuild && ddev start
```

### ✨ Features:

- Supports PHP 8.2+
- Install any PHP extension (Redis, Xdebug, Memcached, etc.)
- Custom FrankenPHP options supported
- Worker mode supported for maximum performance
- Full debugging support: [`ddev xdebug`](https://docs.ddev.com/en/stable/users/usage/commands/#xdebug), [`ddev xhprof`](https://docs.ddev.com/en/stable/users/usage/commands/#xhprof), [`ddev xhgui`](https://docs.ddev.com/en/stable/users/usage/commands/#xhgui)

Note: Initial `ddev start` takes longer due to manual extension compilation.

If you want to suggest some feature or found a bug, feel free to [open an issue](https://github.com/ddev/ddev-frankenphp/issues).

## Alternative: FrankenPHP via Debian Packages

FrankenPHP can also be installed directly in the web container using Debian packages. This example from the [DDEV quickstart](https://docs.ddev.com/en/stable/users/quickstart/#generic-frankenphp) shows a setup for a Drupal 11 project where FrankenPHP runs as an extra daemon.

### ⚙️ Installation:

```bash
export FRANKENPHP_SITENAME=my-frankenphp-site
mkdir ${FRANKENPHP_SITENAME} && cd ${FRANKENPHP_SITENAME}
ddev config --project-type=drupal11 --webserver-type=generic --docroot=web --php-version=8.4
ddev start

cat <<'EOF' > .ddev/config.frankenphp.yaml
web_extra_daemons:
  - name: "frankenphp"
    command: "frankenphp php-server --listen=0.0.0.0:80 --root=\"/var/www/html/${DDEV_DOCROOT:-}\" -v -a"
    directory: /var/www/html
web_extra_exposed_ports:
  - name: "frankenphp"
    container_port: 80
    http_port: 80
    https_port: 443
EOF

cat <<'DOCKERFILEEND' >.ddev/web-build/Dockerfile.frankenphp
RUN curl -fsSL https://key.henderkes.com/static-php.gpg -o /usr/share/keyrings/static-php.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/static-php.gpg] https://deb.henderkes.com/ stable main" > /etc/apt/sources.list.d/static-php.list
# Install FrankenPHP and extensions, see https://frankenphp.dev/docs/#deb-packages for details.
# You can find the list of available extensions at https://deb.henderkes.com/pool/main/p/
RUN (apt-get update || true) && DEBIAN_FRONTEND=noninteractive apt-get install -y -o Dpkg::Options::="--force-confnew" --no-install-recommends --no-install-suggests \
    frankenphp \
    php-zts-cli \
    php-zts-gd \
    php-zts-pdo-mysql
# Make sure that 'php' command uses the ZTS version of PHP
# and that the php.ini in use by FrankenPHP is the one from DDEV.
RUN ln -sf /usr/bin/php-zts /usr/local/bin/php && \
    ln -sf /etc/php/${DDEV_PHP_VERSION}/fpm/php.ini /etc/php-zts/php.ini
DOCKERFILEEND

ddev composer create-project drupal/recommended-project
ddev composer require drush/drush
ddev restart
ddev drush site:install demo_umami --account-name=admin --account-pass=admin -y
ddev launch
# or automatically log in with
ddev launch $(ddev drush uli)
```

### ⚠️ Limitations:

- PHP 8.4 only (no version flexibility)
- Cannot customize FrankenPHP options
- Worker mode not supported
- No debugging support (`ddev xdebug`, `ddev xhprof`, `ddev xhgui` do not work)

## Resources

- [FrankenPHP documentation](https://frankenphp.dev/docs/)
- [DDEV's generic web server](https://docs.ddev.com/en/stable/users/extend/customization-extendibility/#using-nodejs-as-ddevs-primary-web-server)
- [FrankenPHP add-on](https://github.com/ddev/ddev-frankenphp)
- [FrankenPHP quickstart](https://docs.ddev.com/en/stable/users/quickstart/#generic-frankenphp)
- [Hola FrankenPHP! Laravel Octane Servers Comparison: Pushing the Boundaries of Performance](https://medium.com/beyn-technology/hola-frankenphp-laravel-octane-servers-comparison-pushing-the-boundaries-of-performance-d3e7ad8e652c)

## Benchmarking

Using [ddev-frankenphp-benchmark](https://github.com/stasadev/ddev-frankenphp-benchmark), I compared three setups:

- `nginx-fpm`: DDEV's `nginx-fpm` web server with `php-fpm`
- `generic-web`: DDEV's `generic` web server with FrankenPHP inside the `web` container (static binary)
- `generic-addon`: DDEV's `generic` web server with FrankenPHP inside the `frankenphp` container (with `pdo_mysql` extension)

Summary:

- All configurations delivered comparable and adequate performance.
- FrankenPHP is a win where there is an upstream hosting environment using FrankenPHP.
- Benchmarks used default DDEV settings, not production-optimized configurations.
- Laravel Octane (FrankenPHP worker mode) was not used and could yield better results.
- CPU and memory usage were not measured.

### Benchmarking Results

<b>Software:</b><br>
DDEV: v1.24.6<br>
Mutagen: disabled<br>
PHP: v8.4<br>
Laravel: v12.19.3<br>
FrankenPHP: v1.7.0<br>
Docker Engine: v28.3.0<br>
Operating System: Manjaro Linux AMD64<br>
Kernel Version: 6.12.35-1-MANJARO

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
