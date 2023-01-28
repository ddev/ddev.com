---
title: "Customizing DDEV-Local images with a custom Dockerfile"
pubDate: 2020-04-07
author: Randy Fay
featuredImage: https://ddev.com/app/uploads/2020/04/d8composer____workspace_d8composer__-______ddev_web-build_Dockerfile-2.png
categories:
  - DDEV
---

Did you know that you can customize [DDEV-Local](https://ddev.com/ddev-local/) Docker images with some very simple changes? We talked about [web container customization](https://ddev.com/ddev-local/ddev-local-web-container-customization-in-v1-8-0/) a little with the release of DDEV-Local 1.8.0, and now we’re back with more details!

There are two major ways to customize your DDEV-Local web image, but they’re _mutually incompatible_:

1. Add a Debian package into the image with `webimage_extra_packages` ([docs](https://ddev.readthedocs.io/en/stable/users/extend/customizing-images/#adding-extra-debian-packages-with-webimage%5Fextra%5Fpackages-and-dbimage%5Fextra%5Fpackages)).
2. Add an “extension” Dockerfile with free-form instructions for adding onto the container ([docs](https://ddev.readthedocs.io/en/stable/users/extend/customizing-images/#adding-extra-dockerfiles-for-webimage-and-dbimage)).

### `webimage_extra_packages` in config.yaml

The simplest thing to do is just add new Debian packages. For example, add to the .ddev/config.yaml: `webimage_extra_packages: [redis-tools, php-yaml]`, and the “redis-tools” and “php-yaml” packages will be installed in the web container. This little addition to the container happens just once, and doesn’t slow down your `ddev start` after that.

### Simple npm install with custom Dockerfile

Sometimes, though, people need to do things that are not just Debian apt package management changes. For example, you might want to override a configuration file with a replacement, or you might want to use npm to install something that is not managed with Debian’s package system.

This kind of change can be done by creating a `.ddev/web-build/Dockerfile` (start by copying `.ddev/web-build/Dockerfile.example`).

So, for example, if you have a `.ddev/web-build/Dockerfile` with these contents:

`ARG BASE_IMAGE  
FROM $BASE_IMAGE  
RUN npm install --global gulp-cli`

Then the `npm install` to install gulp-cli will be done (once) at build time.

_**Note that the default to BASE_IMAGE is overridden by ddev at image build time, so does not have to be maintained as versions of ddev-webserver change**_, so “drud/ddev-webserver:v1.13.1” is just a filler.

### Modifying configuration files

If you want to add files or override configuration files, it’s easy enough to do. For example, in this[ Stack Overflow question](https://stackoverflow.com/questions/60162842/how-can-i-add-basic-authentication-to-the-mailhog-service-in-ddev-local), a user wanted to put basic authentication in front of the MailHog configuration. The easiest way to do this is to override the /etc/supervisor/conf.d/mailhog.conf. So as that answer suggests:

- Put the new mailhog.conf and mailhog-auth.txt into the `.ddev/web-build` directory.
- Add a Dockerfile to .ddev/web-build that uses the Docker build ADD command to put them into place:  
  `ARG BASE_IMAGE  
FROM $BASE_IMAGE ADD mailhog-auth.txt /etc  
ADD mailhog.conf /etc/supervisor/conf.d`

(Caveat: This strategy only works in [DDEV-Local v1.13+](https://github.com/drud/ddev/releases))

But you could use this same technique for so many things. Do you need to completely override the /etc/php/7.3/fpm/php-fpm.conf file? Do it. Do you need to completely revamp the entire nginx configuration directory? Now you can do it. You can also add scripts into the container or even Linux binaries. And you can check the whole thing into your project so that other members of your team automatically have it.

### pip3 installs

The Python world uses [pip3](https://pip.pypa.io/en/stable/) to install packages, and you can do that too.

This [Stack Overflow answer](https://stackoverflow.com/a/60683558/215713) goes into the details, but this Dockerfile should be a start:  
`ARG BASE_IMAGE  
FROM $BASE_IMAGE  
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y -o Dpkg::Options::="--force-confnew" --no-install-recommends --no-install-suggests python3-pip python3-setuptools  
RUN pip3 install mycli`

### pecl/pear installs

Some PHP packages aren’t available as Debian packages, so this [Stack Overflow answer](https://stackoverflow.com/a/60554990/215713) shows how to install a package from the PEAR repository using a custom Dockerfile:  
`ARG BASE_IMAGE  
FROM $BASE_IMAGE  
ENV PHP_VERSION=7.3  
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y -o Dpkg::Options::="--force-confnew" --no-install-recommends --no-install-suggests gcc make autoconf libc-dev pkg-config php-pear php${PHP_VERSION}-dev libmcrypt-dev

# The "echo" below just forces accepting the "automatic" configuration, the same as hitting <RETURN>

RUN echo | sudo pecl install mcrypt

# Because php7.1-mcrypt is already installed in web container we can just copy its mcrypt.ini

RUN cp /etc/php/7.1/mods-available/mcrypt.ini /etc/php/${PHP_VERSION}/mods-available/ && phpenmod mcrypt`

## Join the conversation!

We’d love to hear about your recipes! PR them into [ddev-contrib](http://github.com/drud/ddev-contrib), or tweet, or blog about them. Give us a holler when you do with [@drud and #DDEV](http://twitter.com/drud) on Twitter. And we’re always happy to hear from you on any of our[ support channels.](https://ddev.readthedocs.io/en/stable/#support-and-user-contributed-documentation)
