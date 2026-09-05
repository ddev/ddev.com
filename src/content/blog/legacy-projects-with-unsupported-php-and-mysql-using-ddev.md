---
title: "Using DDEV to spin up a legacy PHP application"
pubDate: 2025-05-30
modifiedDate: 2026-09-24
modifiedComment: "Updated for current DDEV: the old `db` image now follows the installed DDEV version instead of a fixed one, the entrypoint patch matches the current `docker-entrypoint.sh`, and `x-ddev` keys label the services in `ddev describe`."
summary: How to use DDEV with outdated PHP and MySQL versions
author: Garvin Hicking
featureImage:
  src: /img/blog/2025/05/museums-victoria-Di7WfLcrJ_I-unsplash.jpg
  alt: Legacy computer museum
  credit: "Photo by [Museums Victoria](https://unsplash.com/@museumsvictoria) on [Unsplash](https://unsplash.com/photos/gray-mechanical-machine-lot-beside-wall-Di7WfLcrJ_I)"
categories:
  - Guides
---

_This guest post is by DDEV community member and [TYPO3](https://typo3.org) contributor [Garvin Hicking](/blog/author/garvin-hicking/)._

In my daily work, I develop [TYPO3](https://typo3.org)-based projects and also contribute to the TYPO3 CMS OpenSource project itself.

Usually this means working with actively supported and up-to-date PHP versions as well as database systems like MySQL/PostgreSQL/MariaDB.

Just recently I had to migrate a very outdated project: TYPO3 4.5, which utilized MySQL 5.5 and PHP 5.3. When that project was initially developed, it was done with XAMPP and later Vagrant-based VMs. This has been long superseded with using Docker and specifically DDEV for ease-of-use.

So naturally I wanted to be able to use DDEV for the legacy project to get it working just as it is running on the (outdated) hosting provider's shared web servers.

I quickly faced three major issues:

- No PHP 5.3 out-of-the-box support from DDEV; it starts with 5.6 as of the time of this writing
- No MySQL 5.5 ARM64 support either; it starts with 5.7
- Additionally, I use an Apple MacBook Pro M1 with ARM-chipset, which has no "official" MySQL 5.5 support

Thanks to the outstanding DDEV support on Discord, I was quickly able to find a way with minimal effort, just by creating very small custom, additional docker-compose YAML files.

One advantage (of many) of using DDEV instead of the underlying Docker Compose is that so many things are pre-configured and "just work". So I really did not want to migrate everything to Docker Compose on my own, do my custom routing, PHP-FPM integration and whatnot.

Just being able to "bait and switch" the PHP and DB container with a different base Docker image was all that was needed for me:

## Step 1: Base config

I created the base `~/legacyphp/.ddev/config.yaml` file manually inside my `~/legacyphp` project directory, setting `legacyphp` as the project name.

MySQL 8.0 here is only a placeholder that DDEV accepts. Step 2 replaces it with MySQL 5.5. There is no `php_version`, because the PHP version in the `web` container does not matter: Step 3 adds a separate container for PHP 5.3.

```yaml
# .ddev/config.yaml
name: legacyphp
type: php
docroot: htdocs
webserver_type: apache-fpm
database:
  type: mysql
  version: "8.0"
hooks:
  pre-start:
    - exec-host: |
        DDEV_DB_LEGACY_IMAGE=$(echo "$DDEV_DBIMAGE" | sed 's/mysql-8.0/mysql-5.5/')
        ddev dotenv set .ddev/.env.db.local --ddev-db-legacy-image="$DDEV_DB_LEGACY_IMAGE" >/dev/null
```

The [`pre-start` hook](https://docs.ddev.com/en/stable/users/configuration/hooks/) keeps this setup up to date. `$DDEV_DBIMAGE` is the `db` image DDEV is about to use, for example `ddev/ddev-dbserver-mysql-8.0:v1.25.4`. Changing `mysql-8.0` to `mysql-5.5` gives the old image from the same DDEV release, so it stays in sync when you upgrade DDEV.

[`ddev dotenv set`](https://docs.ddev.com/en/stable/users/usage/commands/#dotenv-set) saves that value in `.ddev/.env.db.local`, so the compose file in Step 2 can use it as `${DDEV_DB_LEGACY_IMAGE}`.

## Step 2: Rewire DB

:::note
Only needed on ARM64.
:::

Next I created the very small file `~/legacyphp/.ddev/docker-compose.db.yaml` in the same directory next to `config.yaml`:

```yaml
# .ddev/docker-compose.db.yaml
services:
  db:
    platform: linux/amd64
    build:
      args:
        BASE_IMAGE: ${DDEV_DB_LEGACY_IMAGE}
    image: ${DDEV_DB_LEGACY_IMAGE}-${DDEV_SITENAME}-built
    entrypoint:
      - sh
      - -c
      - |
        cp /docker-entrypoint.sh ~/docker-entrypoint.sh
        # report MySQL 8.0 so the version check passes
        sed -i 's|server_db_version=.*|server_db_version=mysql_8.0|g' ~/docker-entrypoint.sh
        sed -i 's|database_db_version=.*|database_db_version=mysql_8.0|g' ~/docker-entrypoint.sh
        # but keep the real MySQL 5.5 configuration
        sed -i 's|BEST_MATCH=.*|BEST_MATCH=/etc/mysql/version-conf.d/mysql_5.5.cnf.txt|g' ~/docker-entrypoint.sh
        exec ~/docker-entrypoint.sh
    x-ddev:
      describe-info: "Using mysql:5.5"
```

A few things are noteworthy:

- Setting `linux/amd64` as the platform will require Rosetta to be available on the macOS ARM64 platform.
- `BASE_IMAGE` uses the `${DDEV_DB_LEGACY_IMAGE}` value from the hook, so the old image always matches your DDEV version.
- The `image` name stops the build from overwriting DDEV's own `ddev-dbserver-mysql-8.0` image on your machine.
- Changing the `entrypoint` stops DDEV from complaining about a version mismatch when you restart the project. The container runs MySQL 5.5, but has to look like the MySQL 8.0 set in `.ddev/config.yaml`.
- [`x-ddev`](https://docs.ddev.com/en/stable/users/extend/custom-docker-services/#customizing-ddev-describe-output) adds a note to `ddev describe`, so you can see the real version even though `.ddev/config.yaml` says 8.0.

## Step 3: Rewire PHP

Using a different PHP version is just a few lines more work, because we are not replacing the whole `web` container of DDEV. Instead, we add an additional PHP container which is executed from the web container via port 9000.

This is done via the file `~/legacyphp/.ddev/docker-compose.php.yaml`:

```yaml
# .ddev/docker-compose.php.yaml
services:
  php:
    container_name: ddev-${DDEV_SITENAME}-php
    image: devilbox/php-fpm:5.3-work
    restart: "no"
    expose:
      - 9000
    labels:
      com.ddev.site-name: ${DDEV_SITENAME}
      com.ddev.approot: ${DDEV_APPROOT}
    working_dir: /var/www/html
    volumes:
      - "../:/var/www/html"
      - ".:/mnt/ddev_config:ro"
      - ddev-global-cache:/mnt/ddev-global-cache
      - "./php:/etc/php-custom.d"
    environment:
      - NEW_UID=${DDEV_UID}
      - NEW_GID=${DDEV_GID}
      - DDEV_PHP_VERSION
      - IS_DDEV_PROJECT=true
    x-ddev:
      describe-url-port: |
        PHP 5.3 shell:
        ddev ssh -s php -u devilbox
      describe-info: "Using PHP 5.3"
      ssh-shell: bash
  web:
    x-ddev:
      describe-url-port: |
        PHP 5.3 shell:
        ddev ssh -s php -u devilbox
      describe-info: "Using PHP 5.3"
    depends_on:
      - php
```

Note here that we use `devilbox/php-fpm` with our needed version, and a bind-mount takes care the PHP container can access our main project root directory.

The `x-ddev` blocks only change what `ddev describe` shows, but they save confusion later, because otherwise nothing hints that PHP runs in another container. The longer note goes in `describe-url-port` because that column is wider than `describe-info`. `ssh-shell: bash` is useful too, because custom services use `sh` by default.

A special mount of `~/legacyphp/.ddev/php/` is included so that we can control the `php.ini` configuration, if needed. For example, you could disable OPcache and APC when doing legacy benchmarking that caching would distort. I created a very small `~/legacyphp/.ddev/php/php.ini` file with the contents:

```ini
; .ddev/php/php.ini
apc.enabled=Off
opcache.enable=Off
```

## Step 4: Utilize the PHP container with an Apache proxy

To execute PHP with our external PHP Docker image, I created the following file in `~/legacyphp/.ddev/apache/apache-site.conf`:

```apache
# .ddev/apache/apache-site.conf
<VirtualHost *:80>
    RewriteEngine On
    RewriteCond %{HTTP:X-Forwarded-Proto} =https
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_FILENAME} -d
    RewriteRule ^(.+[^/])$ https://%{HTTP_HOST}$1/ [redirect,last]
    SetEnvIf X-Forwarded-Proto "https" HTTPS=on

    Alias "/phpstatus" "/var/www/phpstatus.php"
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

Using `ddev mysql` will connect you to the MySQL 5.5 instance:

```bash
~/legacyphp> ddev mysql
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 5
Server version: 5.5.62-log MySQL Community Server (GPL)
```

`ddev describe` shows the `x-ddev` notes from Steps 2 and 3, so you can see the real PHP and MySQL versions next to the services that run them.

## Caveats

You can enter the PHP Docker container with `ddev ssh -s php -u devilbox` if you need to execute PHP commands at the shell level, because the regular `web` container runs a much more recent PHP version.
So if you need to perform composer CLI calls, be sure to do this within the matching PHP container.

Another thing to pay attention to is that if you for example want to utilize Mailpit with TYPO3's mail configuration, you can not use `localhost:1025` as an SMTP server. `localhost` in PHP's case will be that devilbox PHP container, and not the DDEV web container. Instead you need to setup `web:1025` as the hostname.

The devilbox PHP config has pretty much all available PHP extensions set up to use, but if you need specific imagemagick or other tools, you will have to either ensure these are executed on the `web` container, or make them available with customization of a different base Docker container that you can build yourself.

If you want to use Xdebug with this setup, you'll need to do more internal port forwarding in the docker-compose setup, which is beyond the scope of this article.

## Closing words

Having shown you what is possible, I hope you will never need to use it, and you will always use well-supported and current software. :-)

Thanks so much to the DDEV project for getting me across the finish line with just very little effort!
