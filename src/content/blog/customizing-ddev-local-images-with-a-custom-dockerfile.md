---
title: "Customizing DDEV images with a custom Dockerfile"
pubDate: 2020-04-07
modifiedDate: 2023-02-21
modifiedComment: Prepended `.ddev/web-build/` to the `mailhog.conf` example, as the `ADD` directive must be project-root relative.
summary: How you can use a custom Dockerfile to tailor DDEV’s images, complete with examples.
author: Randy Fay
featureImage:
  src: /img/blog/2020/04/d8composer.png
  alt: Tightly-cropped screenshot of a Dockerfile in an IDE.
  shadow: true
categories:
  - Guides
---

Did you know that you can customize [DDEV](https://ddev.com/ddev-local/) Docker images with some very simple changes? 

There are two major ways to customize your DDEV web image:

1. Add a Debian package into the image with `webimage_extra_packages` ([docs](https://ddev.readthedocs.io/en/stable/users/extend/customizing-images/#adding-extra-debian-packages-with-webimage%5Fextra%5Fpackages-and-dbimage%5Fextra%5Fpackages)).
2. Add an “extension” Dockerfile with free-form instructions for adding onto the container ([docs](https://ddev.readthedocs.io/en/stable/users/extend/customizing-images/#adding-extra-dockerfiles-for-webimage-and-dbimage)).

You can use these together (add packages with `webimage_extra_packages` and also do more sophisticated things in a Dockerfile).

### `webimage_extra_packages` in `config.yaml`

The simplest thing to do is just add new Debian packages. For example, add to the `.ddev/config.yaml`: `webimage_extra_packages: [redis-tools, php8.1-yaml]`, and the “redis-tools” and “php8.1-yaml” packages will be installed in the web container. This little addition to the container happens just once, and doesn’t slow down your `ddev start` after that.

### Simple npm install with custom Dockerfile

Sometimes, though, people need to do things that are not just Debian apt package management changes. For example, you might want to override a configuration file with a replacement, or you might want to use npm to install something that is not managed with Debian’s package system.

This kind of change can be done by creating a `.ddev/web-build/Dockerfile` (start by copying `.ddev/web-build/Dockerfile.example`).

So, for example, if you have a `.ddev/web-build/Dockerfile` with these contents:

```docker
RUN npm install --global gulp-cli
```

Then the (global) `npm install` to install gulp-cli will be done (once) at build time.

### Modifying configuration files

If you want to add files or override configuration files, it’s easy enough to do. For example, in this[ Stack Overflow question](https://stackoverflow.com/questions/60162842/how-can-i-add-basic-authentication-to-the-mailhog-service-in-ddev-local), a user wanted to put basic authentication in front of the MailHog configuration. The easiest way to do this is to override the `/etc/supervisor/conf.d/mailhog.conf`. So as that answer suggests:

- Put the new `mailhog.conf` and `mailhog-auth.txt` into the `.ddev/web-build` directory.
- Add a Dockerfile to `.ddev/web-build` that uses the Docker build ADD command to put them into place:
  ```docker
  ADD mailhog-auth.txt /etc
  ADD .ddev/web-build/mailhog.conf /etc/supervisor/conf.d
  ```

But you could use this same technique for so many things. Do you need to completely override the /etc/php/8.1/fpm/php-fpm.conf file? Do it. Do you need to completely revamp the entire nginx configuration directory? Now you can do it. You can also add scripts into the container or even Linux binaries. And you can check the whole thing into your project so that other members of your team automatically have it.

### pip3 installs

The Python world uses [pip3](https://pip.pypa.io/en/stable/) to install packages, and you can do that too.

This [Stack Overflow answer](https://stackoverflow.com/a/60683558/215713) goes into the details, but this Dockerfile should be a start:

```docker
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y -o Dpkg::Options::="--force-confnew" --no-install-recommends --no-install-suggests python3-pip python3-setuptools
RUN pip3 install mycli
```

### pecl/pear installs

Some PHP packages aren’t available as Debian packages, so this [Stack Overflow answer](https://stackoverflow.com/a/60554990/215713) shows how to install a package from the PEAR repository using a custom Dockerfile:

```docker
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y -o Dpkg::Options::="--force-confnew" --no-install-recommends --no-install-suggests gcc make autoconf libc-dev pkg-config php-pear php${DDEV_PHP_VERSION}-dev libmcrypt-dev

# The "echo" below just forces accepting the "automatic" configuration, the same as hitting <RETURN>
RUN echo | sudo pecl install mcrypt

# Because php7.1-mcrypt is already installed in web container we can just copy its mcrypt.ini
RUN cp /etc/php/7.1/mods-available/mcrypt.ini /etc/php/${DDEV_PHP_VERSION}/mods-available/ && phpenmod mcrypt
```

## Join the conversation!

We’d love to hear about your recipes! Discuss them in our [Discord channel](https://discord.gg/hCZFfAMc5k), PR them into [ddev-contrib](http://github.com/ddev/ddev-contrib), create a new [DDEV Add-on](https://ddev.readthedocs.io/en/latest/users/extend/additional-services/), or tweet, or blog about them and give us a holler when you do. And we’re always happy to hear from you on any of our [support channels](https://ddev.readthedocs.io/en/stable/users/support/).
