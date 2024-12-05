---
title: "Contributor Training: Advanced Add-On Techniques"
pubDate: 2024-07-23
# modifiedDate: 2024-07-23
summary: Advanced Add-On Techniques for Contributors
author: Randy Fay
featureImage:
  src: /img/blog/2024/07/add-on-puzzle-pieces.png
  alt: Add-on puzzle pieces
  credit: "Ideogram.ai: Create a banner image for a tech blog, featuring three colorful puzzle pieces labeled 'Solr', 'Memcached', and 'Elasticsearch'"
  shadow: true
  hidden: true
categories:
  - Training
  - Guides
---

Here's our July 10, 2024 [Contributor Training](/blog/category/training) on Advanced DDEV Add-On Techniques:

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/DzFa6CiHxzs?si=cMMx19RcIwQm23gs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

The basics of creating a DDEV Add-on are super easy, you can click a button on the Add-on template and you're off and running. There are more details in the [Add-on Template](https://github.com/ddev/ddev-addon-template), in the [DDEV docs](https://ddev.readthedocs.io/en/stable/users/extend/additional-services/#creating-an-additional-service-for-ddev-get), and in the [original add-on training](https://www.youtube.com/watch?v=TmXqQe48iqE).

## Adding project (or global) custom commands

An add-on can easily add one or more project custom commands. People have made add-ons specifically to add just one project custom command. It seems like a waste, but it's not. It gives your custom command(s) a home, an issue queue, and an upgrade path.

An example of a project that does lots of this is [`ddev-drupal-contrib`](https://github.com/ddev/ddev-drupal-contrib), which installs several specialized web custom commands, see [install.yaml](https://github.com/ddev/ddev-drupal-contrib/blob/b5c14f339d46cfd8f7631d3701f597bcd3eba6d9/install.yaml#L2-L11).

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

You can add to the `global_files` section in the same way, but it usually makes more sense to add commands to the project, since the add-on's scope is project-level. [`ddev-platformsh`](https://github.com/ddev/ddev-platformsh) installs a helper command globally:

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

For example, [`ddev-proxy-support`](https://github.com/ddev/ddev-proxy-support/blob/7c8a91fb020bf2df62418730352d3db5a1ca76e3/docker-compose.proxy-support.yaml#L3-L10) sets arguments for the `build` stage inside the web container.

## Creating an additional service using a `docker-compose.*.yaml`

One of the most common add-on uses is to create a new service, like `mongo` or `elasticsearch` or `solr`. You can look at many of the official add-ons to see how this is done.

Examples:

- [ddev-solr](https://github.com/ddev/ddev-solr/blob/main/docker-compose.solr.yaml)
- [ddev-memcached](https://github.com/ddev/ddev-memcached/blob/main/docker-compose.memcached.yaml)

See the [general docs on extra services](https://ddev.readthedocs.io/en/stable/users/extend/custom-compose-files/#third-party-services-may-need-to-trust-ddev-webserver).

## Interacting with users during `install.yaml` installs

Although unusual, it is sometimes useful to interact with the user during the `ddev get` process. For example, [`ddev-platformsh`](https://github.com/ddev/ddev-platformsh) checks to make sure that the `PLATFORMSH_CLI_TOKEN` has been properly configured, and, if not, requests it and configures it:

```yaml
pre_install_actions:
  # Get PLATFORMSH_CLI_TOKEN from user if we don't have it yet
  - |
    if ( {{ contains "PLATFORMSH_CLI_TOKEN" (list .DdevGlobalConfig.web_environment | toString) }} || {{ contains "PLATFORMSH_CLI_TOKEN" (list .DdevProjectConfig.web_environment | toString) }} ); then
      echo "Using existing PLATFORMSH_CLI_TOKEN."
    else
      printf "\n\nPlease enter your platform.sh token: "
    fi

  - |
    #ddev-description:Setting PLATFORMSH_CLI_TOKEN
    if !( {{ contains "PLATFORMSH_CLI_TOKEN" (list .DdevGlobalConfig.web_environment | toString) }} || {{ contains "PLATFORMSH_CLI_TOKEN" (list .DdevProjectConfig.web_environment | toString) }} ); then
      read token
      # Put the token into the global web environment
      ddev config global --web-environment-add PLATFORMSH_CLI_TOKEN=${token}
      echo "PLATFORMSH_CLI_TOKEN set globally"
    fi
```

## Checking required version of DDEV

Some add-ons may require a specific version of DDEV.

1. Add a `ddev_version_constraint` to the `install.yaml`. This [version constraint](https://github.com/Masterminds/semver#checking-version-constraints) will be validated against the running DDEV executable and prevent add-on from being installed if it doesn't validate. Available with DDEV v1.23.4+, and works only for DDEV v1.23.4+ binaries:

```yaml
ddev_version_constraint: ">= v1.23.4"
```

2. Check for the existence of a DDEV "capability" using `ddev debug capabilities`. For example:

```yaml
pre_install_actions:
  # Make sure we have a ddev version that can support what we do here
  - |
    #ddev-description:Checking DDEV version
    (ddev debug capabilities | grep multiple-upload-dirs >/dev/null) || (echo "Please upgrade DDEV to v1.22+ for appropriate capabilities" && false)
```

3. Add a `ddev_version_constraint` to a `config.<add-on-name>.yaml`. This will only fail at `ddev start` time, so is less pleasant. But a `config.<add-on-name>.yaml` might have:

```yaml
ddev_version_constraint: ">=v1.23.0"
```

## Reading and using YAML files, including config.yaml (yaml_read_files)

`ddev get` can read the contents of arbitrary YAML files, see [docs](https://ddev.readthedocs.io/en/stable/users/extend/additional-services/#template-action-replacements-advanced).

For example, in `ddev-platformsh` the `.platform.app.yaml` is read into the `platformapp` variable, and other files are read as well, see [install.yaml](https://github.com/ddev/ddev-platformsh/blob/bb7365e30ae68797602dd0f648bf16bb46cd62b3/install.yaml#L330-L333):

```yaml
yaml_read_files:
  platformapp: .platform.app.yaml
  services: .platform/services.yaml
  routes: .platform/routes.yaml
```

The `platformapp` variable is then used like this in the `install.yaml`:

```yaml
pre_install_actions:
  - |
    #ddev-description:check project type
    {{ if not (hasPrefix  "php" .platformapp.type) }}
      printf "\n\nUnsupported application type {{ .platformapp.type }}.\nOnly php applications are currently supported." >&2
      exit 5
    {{ end }}
```

In addition, the `~/.ddev/global_config.yaml` is read into the variable `DdevGlobalConfig`, and the project `.ddev/config.yaml` is loaded into the variable `DdevProjectConfig`, so any element of the global or project configuration can be used in the process of a complex `install.yaml` as well.

## Tips from previous trainings

A [previous training in November, 2023](https://youtu.be/TmXqQe48iqE) covered many add-on topics, including testing with `bats` and debugging your tests. There you can learn about creating and testing add-ons.

### Checking in add-ons

Most teams choose to check in their project `.ddev` directory, and this is recommended. All metadata and other files for an add-on are stored in the `.ddev` directory, so this works fine. When it's time to update an add-on with `ddev get some/add-on`, do that, check in the result, and create a pull request.

### Customizing an add-on without "taking it over"

There are times that you need to override the configuration provided by an add-on. Don't forget that you can do it without editing add-on files, thus making it possible to update the add-on without having to re-add your edits, etc.

You can add a `.ddev/docker-compose.<add-on-name>_extra.yaml` to add `docker-compose` capabilities, for example to change the `image` tag used by the add-on.

And of course you can add a `config.<add-on-name>_extra.yaml` to override what the `config.<add-on-name>.yaml` may have done.

## Resources

- [DDEV docs](https://ddev.readthedocs.io/en/stable/users/extend/additional-services/) on add-ons
- [Previous Add-on Training](https://www.youtube.com/watch?v=TmXqQe48iqE)
- `docker-compose.*.yaml` [docs](https://ddev.readthedocs.io/en/stable/users/extend/custom-compose-files/)
- ddev-addon-template [README](https://github.com/ddev/ddev-addon-template)
- Learn by studying other add-ons. Official ones at `ddev get --list` and all at `ddev get --list --all`

## Contributions welcome!

Your suggestions to improve this blog are welcome. You can do a PR to this blog adding your techniques. Info and a training session on how to do a PR to anything in ddev.com is at [DDEV Website For Contributors](ddev-website-for-contributors.md).

Join us for the next [DDEV Live Contributor Training](contributor-training.md). Sign up at [DDEV Live Events Meetup](https://www.meetup.com/ddev-events/events/).
