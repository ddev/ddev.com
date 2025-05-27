---
title: "Using DDEV to spin up a legacy PHP application"
pubDate: 2025-05-27
modifiedDate: 2025-05-27
summary: How to use DDEV with outdated PHP and MySQL versions
author: Garvin Hicking
featureImage:
  src: /img/blog/2025/05/museums-victoria-Di7WfLcrJ_I-unsplash.jpg
  alt: Legacy computer museum
  credit: "Photo by [Museums Victoria](https://unsplash.com/@museumsvictoria?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/gray-mechanical-machine-lot-beside-wall-Di7WfLcrJ_I?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)"
categories:
  - Guides
---

_This guest post is by DDEV community member and [TYPO3](https://typo3.org) contributor [Garvin Hicking](/blog/author/garvin-hicking/)._

In my daily work I am developing [TYPO3](https://typo3.org)-based projects and also contribute to the TYPO3 CMS OpenSource project itself.

Usually this means working with actively supported and up-to-date PHP versions as well as database systems like MySQL/PostgreSQL/MariaDB.

Just recently I had to migrate a very outdated project: TYPO3 4.5, which utilized MySQL 5.5 and PHP 5.3. When that project was initially developed, it was done with XAMPP and later Vagrant-based VMs. This has been long superseded with using Docker and specifically DDEV for ease-of-use.

So naturally I wanted to be able to use DDEV for the legacy project to get it working just as it is running on the (outdated) hosting provider's shared web servers.

I quickly faced three major issues:

- No PHP 5.3 out-of-the-box support from DDEV; it starts with 5.6 as of the time of this writing
- No MySQL 5.5 support either; it starts with 5.7
- Additionally, I use an Apple MacBook Pro M1 with ARM-chipset, which has no "official" MySQL 5.5 support

Thanks to the outstanding DDEV support on Discord, I was quickly able to find a way with minimal effort, just by creating very small custom, additional docker-compose YAML files.

One advantage (of many) of using DDEV instead the underlying Docker Compose is that so many things are pre-configured and "just work". So I really did not want to migrate everything to Docker Compose on my own, do my custom routing, PHP-FPM integration and whatnot.

Just being able to "bait and switch" the PHP and DB container with a different base Docker image was all that was needed for me:

## Step 1: Base config

I created the base `~/legacyphp/.ddev/config.yaml` file manually inside my `~/legacyphp` project directory, setting `legacyphp` as the project name.

Note that I configured PHP and MySQL versions that are supported by DDEV for this first:

```
name: legacyphp
type: php
docroot: htdocs
php_version: "8.3"
webserver_type: apache-fpm
database:
    type: mysql
    version: "8.0"
```

## Step 2: Rewire DB

Next I created the very small file `~/legacyphp/.ddev/docker-compose.db.yaml` in the same directory next to `config.yaml`:

```
services:
  db:
    platform: linux/amd64
    build:
      args:
        BASE_IMAGE: ddev/ddev-dbserver-mysql-5.5:v1.24.6
```

Two things are noteworthy:

- Setting `linux/amd64` as the platform will require Rosetta to be available on the macOS ARM64 platform
- The `BASE_IMAGE` is set to a DDEV DB container of legacy ddev versions which are still available.

## Step 3: Rewire PHP

Using a different PHP work is just a few lines more work, because we are not replacing the whole `web` container oh DDEV, but instead add an additional PHP container which is executed from the web container via port 9000.

This is done via the file `~/legacyphp/.ddev/docker-compose.php.yaml`:

```
services:
  php:
    container_name: ddev-${DDEV_SITENAME}-php
    image: devilbox/php-fpm:5.3-work

    restart: "no"
    ports:
      - 9000
    labels:
      com.ddev.site-name: ${DDEV_SITENAME}
      com.ddev.approot: ${DDEV_APPROOT}
    volumes:
      - type: bind
        source: ../
        target: /var/www/html
        consistency: cached
      - ".:/mnt/ddev_config:ro"
      - ddev-global-cache:/mnt/ddev-global-cache
      - "./php:/etc/php-custom.d"
    environment:
      - DDEV_PHP_VERSION
      - IS_DDEV_PROJECT=true
  web:
    links:
    - php:php
    healthcheck:
      test: ["CMD", "true"]
```

Note here that we use `devilbox/php-fpm` with our needed version, and a bind-mount takes care the PHP container can access our main project root directory.

A special mount of `~/legacyphp/.ddev/php/` is included so that we can control the `php.ini` configuration, if needed. For example you could disable the OPCache+APC in case you're doing some legacy benchmarking that should not be falsified via caching, I created a very small file `~/legacyphp/.ddev/php/php.ini` file with the contents:

```
# This is an example.
# apc.enabled=Off
# opcache.enable=Off
```

## Step 4: Utilize the PHP container with an Apache proxy

To execute PHP with our external PHP docker image, I created the following file in `~/legacyphp/.ddev/apache/apache-site.conf`:

```
<VirtualHost *:80>
    RewriteEngine On
    RewriteCond %{HTTP:X-Forwarded-Proto} =https
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_FILENAME} -d
    RewriteRule ^(.+[^/])$ https://%{HTTP_HOST}$1/ [redirect,last]
    SetEnvIf X-Forwarded-Proto "https" HTTPS=on

    DocumentRoot /var/www/html/htdocs
    <Directory "/var/www/html/htdocs">
      AllowOverride All
      Allow from All
    </Directory>

    CustomLog /var/log/apache2/access.log combined
    ProxyFCGIBackendType GENERIC
    ProxyPassMatch ^/(.*\.php(/.*)?)$ fcgi://php:9000/var/www/html/htdocs/$1
    DirectoryIndex /index.php index.php
</VirtualHost>
```

Note that if your document root is not `htdocs` you would need to adapt this name to your liking (like `public` or `wwwroot` or anything) in all occurrences of this file.

## Step 5: Lift-Off

Now you can execute `ddev start` and then `ddev launch` to see your project up and running.

You could create a simple `~/legacyphp/htdocs/index.php` file with `<?php phpinfo(); ?>` to verify the version.

Using `ddev mysql` will connect you to the MySQL 5.5. instance:

```
~/legacyphp> ddev mysql
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 5
Server version: 5.5.62-log MySQL Community Server (GPL)
```

## Caveats

You can enter the PHP docker container with a command like `docker exec -it ddev-legacyphp-php bash` if you need/want to execute PHP commands on shell-level, because the regular `web` container will run with the more recent PHP 8.3 version.
So if you need to perform composer CLI calls, be sure to do this within the matching PHP container.

Another thing to pay attention to is that if you for example want to utilize mailpit with TYPO3's mail configuration, you can not use `localhost:1025` as an SMTP server. `localhost` in PHP's case will be that devilbox PHP container, and not the DDEV web container. Instead you need to setup `web:1025` as the hostname.

The devilbox PHP config has pretty much all available PHP extensions set up to use, but if you need specific imagemagick or other tools, you will have to either ensure these are executed on the `web` container, or make them available with customization of a different base Docker container that you can build yourself.

If you want to use xdebug with this setup, you'll need to do more internal port forwarding in the docker compose setup, which is beyond the scope of this article.

## Closing words

Having showed you what is possible, I hope you will never need to use it, and you will always use well-supported and current software. :-)

Thanks so much to the DDEV project for getting me across the finish line with just very little effort!
