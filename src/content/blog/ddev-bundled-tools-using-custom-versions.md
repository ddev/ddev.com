---
title: "How to Downgrade Terminus in DDEV's Web Container and Customize Other Bundled Tools"
pubDate: 2025-06-30
summary: How to upgrade/downgrade a utility provided by DDEV in `ddev-webserver`, or add a custom utility for a given project
author: Bill Seremetis
featureImage:
  src: /img/blog/2025/06/ddev-tool-install.png
  alt: "Installing custom software packages in the containerized environment"
  shadow: true
categories:
  - Guides
  - DevOps
---

_This guest post is by DDEV community member and [Drupal](https://drupal.org)
contributor [Bill Seremetis](/blog/author/bill-seremetis/) and sponsored by
[Annertech](https://www.annertech.com)._

DDEV comes bundled with a predefined set of tools, Pantheon's `terminus` being one of them.
The latest releases of `terminus` are not compatible with older PHP versions like PHP 8.1, though,
so we needed to downgrade it inside DDEV's `ddev-webserver` Docker image.

This guide covers how to downgrade `terminus` and will also explain how to use the same technique to install
additional custom tools.

Please note there are many ways to install packages in a container. We will
cover [extra Dockerfiles](https://docs.ddev.com/en/stable/users/extend/customizing-images/#adding-extra-dockerfiles-for-webimage-and-dbimage)
here, but also [check `webimage_extra_packages` and `dbimage_extra_packages` in your
`config.yaml`for more details](https://docs.ddev.com/en/stable/users/extend/customizing-images/#adding-extra-debian-packages-with-webimage_extra_packages-and-dbimage_extra_packages)).

## Case study: Manually Downgrading Terminus

[Terminus](https://github.com/pantheon-systems/terminus/releases) dropped
support for PHP 8.1 in recent versions, but some of our
projects still use PHP 8.1. We had to downgrade the DDEV-bundled version of `terminus` for those
projects by using a custom Dockerfile:

```dockerfile
# .ddev/web-build/Dockerfile.terminus
# Terminus 4 drops support for PHP 8.1 which we still need
ARG TERMINUS_VERSION="3.6.2"
RUN curl -L --fail -o /usr/local/bin/terminus https://github.com/pantheon-systems/terminus/releases/download/${TERMINUS_VERSION}/terminus.phar && chmod +x /usr/local/bin/terminus
```

`terminus` is just an example here, it could be any command you wish,
[either because you are running an older PHP version](https://github.com/pantheon-systems/terminus/releases/tag/4.0.0)
or the bundled version [has a bug that ruins things for you](https://github.com/platformsh/cli/discussions/166).

## Installing custom tools

You can obviously use the same techniques to install a variety of custom tools:

```dockerfile
# .ddev/web-build/Dockerfile.fzf
# fooscript relies on fzf
# fooscript lists all your Pantheon projects using a fuzzy finder list
ARG FZF_VERSION="0.62.0"
RUN curl -s -L https://github.com/junegunn/fzf/releases/download/v${FZF_VERSION}/fzf-${FZF_VERSION}-linux_amd64.tar.gz | tar xvz -C /usr/local/bin/ && chmod +x /usr/local/bin/fzf
```

## Resources

- [DDEV Pantheon integration documentation](https://docs.ddev.com/en/stable/users/providers/pantheon/)
- [Adding extra Dockerfiles for `webimage` and `dbimage`](https://docs.ddev.com/en/stable/users/extend/customizing-images/#adding-extra-dockerfiles-for-webimage-and-dbimage)
- [Adding extra Debian packages in DDEV](https://docs.ddev.com/en/stable/users/extend/customizing-images/#adding-extra-debian-packages-with-webimage_extra_packages-and-dbimage_extra_packages)
- [Customizing DDEV images with a custom Dockerfile](https://ddev.com/blog/customizing-ddev-local-images-with-a-custom-dockerfile/)

## Contribute to DDEV

If you like DDEV then you are welcome to contribute! You can join the [Discord channel](/s/discord),
create a new [DDEV Add-on](https://docs.ddev.com/en/stable/users/extend/additional-services/),
or blog about how you use DDEV in your daily workflow.
We’re always happy to hear from you on any of our [support channels](https://docs.ddev.com/en/stable/users/support/).
