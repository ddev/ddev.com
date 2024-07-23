---
title: "Contributor Training: Advanced Add-On Techniques"
pubDate: 2024-07-23
# modifiedDate: 2024-07-23
summary: Advanced Add-On Techniques for Contributors
author: Randy Fay
#featureImage:
#  src: /img/blog/2024/07/traefik.logo.png
#  alt: Traefik Configuration for DDEV
categories:
  - Training
  - Guides
---



Here's our July 10, 2024 [Contributor Training](/blog/category/training) on Advanced DDEV Add-On Techniques:

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/DzFa6CiHxzs?si=cMMx19RcIwQm23gs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

The basics of craating a DDEV Add-on are super easy, you can click a button on the Add-on template and you're off and running. There are more details in the [Add-on Template](https://github.com/ddev/ddev-addon-template) and in the [DDEV docs](https://ddev.readthedocs.io/en/stable/users/extend/additional-services/#creating-an-additional-service-for-ddev-get).



## Adding project (or global) custom commands

And add-on can easily add a global custom command. People have made add-ons specifically to add just one global custom command. It seems like a waste, but it's not. It gives your custom command a home, and issue queue, and an upgrade path. 

An example of a project that does lots of this is `ddev-drupal-contrib`, which installs several specialized web custom commands, see [install.yaml](https://github.com/ddev/ddev-drupal-contrib/blob/b5c14f339d46cfd8f7631d3701f597bcd3eba6d9/install.yaml#L2-L11).

```yaml
project_files:
  - commands/web/eslint
  - commands/web/expand-composer-json
  - commands/web/nightwatch
  - commands/web/phpcbf
  - commands/web/phpcs
  - commands/web/phpunit
  - commands/web/poser
  - commands/web/stylelint
  - commands/web/symlink-project
```

You can just as easily add to the `global_files` section in the same way, but it usually makes more sense to add commands to the project, since the add-on's scope is project-level. [`ddev-platformsh`](https://github.com/ddev/ddev-platformsh) installs a helper command globally:

```yaml
global_files:
  - commands/web/platform
```

## Adding a `Dockerfile.<add-on-name>`

If your `install.yaml` needs to change basic `ddev-webserver` characteristics, it can add a `.ddev/web-build/Dockerfile.<add-on-name>`.

[`envsa/ddev-pnpm`](https://github.com/envsa/ddev-pnpm/blob/main/install.yaml#L11-L13) does exactly this:

```yaml
project_files:
  - commands/web/pnpm
  - web-build/Dockerfile.pnpm
```

## Altering the behavior of `ddev-webserver` with additional `config.*.yaml`

An add-on can deliver both project and global configuration, and can add to or replace almost anything. For example, the [`justafish/ddev-drupal-core-dev`](https://github.com/justafish/ddev-drupal-core-dev) add-on installs a `config.ddev-drupal-core-dev.yaml` that does a few things, including:

```yaml
webimage_extra_packages: ["chromium-driver"]
```

## Altering the behavior of `ddev-webserver` with `docker-compose.*.yaml`

Although the most common use of adding a `docker-compose.*.yaml` is to add a new service (below) it is often used to change the behavior of the web service. 

For example, [`ddev-proxysupport`](https://github.com/ddev/ddev-proxy-support/blob/7c8a91fb020bf2df62418730352d3db5a1ca76e3/docker-compose.proxy-support.yaml#L3-L10) sets arguments for the `build`stage inside the web container.

## Creating an additional service using a `docker-compose.*.yaml`

One of the most common add-on uses is to create a new service, like `mongo` or `elasticsearch` or `solr`. You can look at many of the official add-ons to see how this is done.

Examples:

* [ddev-solr](https://github.com/ddev/ddev-solr/docker-compose.solr.yaml)
* [ddev-memcached](https://github.com/ddev/ddev-memcached/blob/main/docker-compose.memcached.yaml)

See the [general docs on extra services](https://ddev.readthedocs.io/en/stable/users/extend/custom-compose-files/#third-party-services-may-need-to-trust-ddev-webserver)

## Interacting with users during `install.yaml` installs

Although unusual, it is sometimes useful to interact with the user during the `ddev get` process. For example, [`ddev-platformsh`](https://github.com/ddev/ddev-platformsh) checks to make sure that the `PLATFORMSH_CLI_TOKEN` has been properly configured, and, if not, requests it and configures it:

```yaml
    #ddev-nodisplay
    if ( {{ contains "PLATFORMSH_CLI_TOKEN" (list .DdevGlobalConfig.web_environment | toString) }} || {{ contains "PLATFORMSH_CLI_TOKEN" (list .DdevProjectConfig.web_environment | toString) }} ); then
      echo "Using existing PLATFORMSH_CLI_TOKEN."
    else
      printf "\n\nPlease enter your platform.sh token: "
    fi

  - |
    #ddev-nodisplay
    #ddev-description:Setting PLATFORMSH_CLI_TOKEN
    if !( {{ contains "PLATFORMSH_CLI_TOKEN" (list .DdevGlobalConfig.web_environment | toString) }} || {{ contains "PLATFORMSH_CLI_TOKEN" (list .DdevProjectConfig.web_environment | toString) }} ); then
      read token
      # Put the token into the global web environment
      ddev config global --web-environment-add PLATFORMSH_CLI_TOKEN=${token}
      echo "PLATFORMSH_CLI_TOKEN set globally"
    fi
```

## Checking required version of DDEV

Some add-ons may require a specific version of DDEV. In DDEV v1.23.4 it will be possible to just specify a `ddev_version_constrant` in the `install.yaml`, but for now there are two other techniques:

1. Check for the existence of a DDEV "capability" using `ddev debug capapbilities`. For example:

  ```yaml
  pre_install_actions:
    # Make sure we have a ddev version that can support what we do here
    - |
      #ddev-nodisplay
      #ddev-description:Checking DDEV version
      (ddev debug capabilities | grep multiple-upload-dirs >/dev/null) || (echo "Please upgrade DDEV to v1.22+ for appropriate capabilities" && false)
  ```

2. Add a `ddev_version_constraint` to a `config.<add-on-name>.yaml`. This will only fail at `ddev start` time, so is less pleasant. But a `config.<add-on-name>.yaml` might have:

  ```yaml
  ddev_version_constraint: ">=v1.23.0"
  ```

## Reading and using YAML files, including config.yaml (yaml_read_files)


## Tips from previous trainings

There was a [previous training in November, 2023](https://youtu.be/TmXqQe48iqE) that covered many topics on add-ons. There you can learn about creating and testing add-ons.

### Checking in add-ons

### Creating and debugging `bats` tests (see previous https://youtu.be/TmXqQe48iqE)

### Customizing and add-on without "taking it over"
* `docker-compose.<name>_extra.yaml`
* `config.name_extra.yaml` (and remember override possibility)


## Resources

- Resources:
  - [DDEV docs](https://ddev.readthedocs.io/en/stable/users/extend/additional-services/) on add-ons
  - [Previous Add-on Training](https://youtu.be/TmXqQe48iqE)
  - `docker-compose.*.yaml` [docs](https://ddev.readthedocs.io/en/stable/users/extend/custom-compose-files/)
  - ddev-addon-template [README](https://github.com/ddev/ddev-addon-template)
  - Learn by studying other add-ons. Official ones at `ddev get --list` and all at `ddev get --list --all`

## Contributions welcome!

Your suggestions to improve this blog are welcome. You can do a PR to this blog adding your techniques. Info and a training session on how to do a PR to anything in ddev.com is at [DDEV Website For Contributors](/blog/ddev-website-for-contributors/).

Join us for the next [DDEV Live Contributor Training](/blog/contributor-training/). Sign up at [DDEV Live Events Meetup](https://www.meetup.com/ddev-events/events/).
