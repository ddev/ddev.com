
---
title: "Customizing or expanding bundled DDEV tools"
pubDate: 2025-06-12
summary: How to upgrade/downgrade a utility provided by DDEV, or add a custom one for a given project
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

DDEV comes bundled with a predefined set of tools, like `composer` for managing
your PHP projects, `terminus`, `platform` and `acli` for specific hosting environments
and of course tools specific to projects, such as `wp-cli`.

Most of the time, these tools work as expected, and you have nothing to worry about.

## Manually managing versions of bundled tools

Sometimes though you might need a very specific version of a tool. Maybe you 
[are running an older PHP version](https://github.com/pantheon-systems/terminus/releases/tag/4.0.0)
or the bundled version [has a bug that ruins things for you](https://github.com/platformsh/cli/discussions/166).
Newer DDEV versions won't fix your need to run an older version, and 
sometimes it makes no sense to wait if you need a newer version.

We can specify which version to use on a given project by overriding the one
provided by DDEV easily by using a custom Dockerfile:

```dockerfile
# .ddev/web-build/Dockerfile.terminus
# Terminus 4 drops support for PHP 8.1 which we still need
ARG TERMINUS_VERSION="3.6.2"
RUN curl -L --fail -o /usr/local/bin/terminus https://github.com/pantheon-systems/terminus/releases/download/${TERMINUS_VERSION}/terminus.phar && chmod +x /usr/local/bin/terminus
```

## Installing custom tools

You can obviously use the same trick to install custom tools:

```dockerfile
# .ddev/web-build/Dockerfile.fzf
# fooscript relies on fzf
ARG FZF_VERSION="0.62.0"
RUN curl -s -L https://github.com/junegunn/fzf/releases/download/v${FZF_VERSION}/fzf-${FZF_VERSION}-linux_amd64.tar.gz | tar xvz -C /usr/local/bin/ && chmod +x /usr/local/bin/fzf
```
