---
title: "Using FrankenPHP with DDEV"
pubDate: 2025-07-02
#modifiedDate: 2025-07-03
summary: Maintaining an add-on involves regularly updating it to stay compatible with new features in both the upstream ddev-addon-template and DDEV itself.
author: Stas Zhuk
featureImage:
  src: /img/blog/2025/07/frankenphp-logo.png
  alt: FrankenPHP logo
  credit: FrankenPHP logo from [GitHub](https://github.com/php/frankenphp)
categories:
  - Guides
---

## Introduction

The PHP ecosystem is changing fast, with tools like FrankenPHP [FrankenPHP](https://frankenphp.dev) improving both performance and developer experience.

This guide explains two ways to integrate FrankenPHP, based on my experience.

You can either run FrankenPHP as a separate service (lets you install extra PHP extensions) or inside DDEV's `web` container (uses a static binary without support for extra extensions).

## DDEV FrankenPHP Add-on

I created the [stasadev/ddev-frankenphp](https://github.com/stasadev/ddev-frankenphp) add-on to experiment with FrankenPHP as a separate service with some additional features:

- Ability to install PHP extensions (Redis, Xdebug, SPX, etc.)
- Better resource isolation

### ⚙️ Installation:

```bash
ddev config --webserver-type=generic
ddev add-on get stasadev/ddev-frankenphp
ddev restart
```

### ⚠️ Limitations:

- Standard Linux/DDEV tools installed in the `web` container are not available because this is a separate Docker container.
- `ddev xdebug` and `ddev launch` don't work (they target the `web` container)
- Enabling/disabling Xdebug requires container rebuild

If you want to suggest some feature or found a bug, feel free to [open an issue](https://github.com/stasadev/ddev-frankenphp/issues).

## Running FrankenPHP in the Web Container

Alternatively, FrankenPHP can be run inside the `web` container. This quickstart shows an example (for a Drupal 11 project) where FrankenPHP is added as an extra daemon.

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
RUN curl -s https://frankenphp.dev/install.sh | sh
RUN mv frankenphp /usr/local/bin/
RUN mkdir -p /usr/local/etc && ln -s /etc/php/${DDEV_PHP_VERSION}/fpm /usr/local/etc/php
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

- It's not possible to install additional PHP extensions (requires [ZTS build](https://github.com/oerdnj/deb.sury.org/issues/2208)).
- Limited debugging capabilities, `ddev xdebug` doesn't work.

## Benchmarking

Using https://github.com/stasadev/ddev-frankenphp-benchmark, I compared `nginx-fpm` with `frankenphp` in the web container (`generic-web`) and `frankenphp` in the `frankenphp` container (`generic-addon`).

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

As you can see, there's no significant difference, but:

- This was a quick DDEV benchmark, not using any production config
- Laravel Octane (FrankenPHP worker mode) wasn't used, which could improve speed
- CPU and memory usage weren't measured
- The hardware used wasn't powerful

## Resources

- [FrankenPHP documentation](https://frankenphp.dev/docs/)
- [Hola FrankenPHP! Laravel Octane Servers Comparison: Pushing the Boundaries of Performance](https://medium.com/beyn-technology/hola-frankenphp-laravel-octane-servers-comparison-pushing-the-boundaries-of-performance-d3e7ad8e652c)
- [ddev-frankenphp add-on](https://github.com/stasadev/ddev-frankenphp)

If you find DDEV (and its add-ons like FrankenPHP) useful, consider [supporting its development](/support-ddev/#sponsor-development). Thank you!
