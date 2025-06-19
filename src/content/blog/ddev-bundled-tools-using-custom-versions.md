
---
title: "How-to Downgrade Terminus in DDEV's Web Container and Customize Other Bundled Tools"
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

DDEV comes bundled with a predefined set of tools, `terminus` being one of them.
Latest releases of `terminus` are not compatible with older PHP versions, 
thus there is a need to downgrade the package inside DDEV.

This guide covers how and will also explain how to use the same technique to install
custom tools too.

## Manually downgrading Terminus

We can specify which version to use on a given project by overriding the one
provided by DDEV easily by using a custom Dockerfile:

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

You can obviously use the same trick to install custom tools:

```dockerfile
# .ddev/web-build/Dockerfile.fzf
# fooscript relies on fzf
ARG FZF_VERSION="0.62.0"
RUN curl -s -L https://github.com/junegunn/fzf/releases/download/v${FZF_VERSION}/fzf-${FZF_VERSION}-linux_amd64.tar.gz | tar xvz -C /usr/local/bin/ && chmod +x /usr/local/bin/fzf
```
