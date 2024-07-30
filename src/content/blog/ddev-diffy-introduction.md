---
title: "Diffy integration with DDEV"
pubDate: 2024-08-03
modifiedDate: 2024-08-03
summary: My experience building an addon for DDEV
author: Yuri Gerasymov
featureImage:
  src: /img/blog/2024/08/ddev+diffy.png
  alt: DDEV and Diffy integration
  credit: 'Ideogram.ai: the words "2024" and "DDEV" next to each other'
categories:
  - Announcements
---

[Diffy](https://diffy.websote) is a visual regression testing tool that allows you to take screenshots of your website and compare them so you know exactly what pages got changed and where. We decided to build DDEV integration so it is possible to take screenshots from the local website, upload them to Diffy, and then compare them with screenshots from other environments.

Watch [3 mins video](https://www.loom.com/share/1944eb3462934279a175e65e16e715ed) or read [documentation](https://docs.diffy.website/features/local-development-ddev).

Architecturally integration consists of:

* Docker container with preinstalled node and Chrome 111
* Nodejs app that runs Chrome
* The app itself is hosted in a separate repository as it is used in other places (like production for the main service itself).

Let’s go through the way integration is built.

## Download node app
To download the app we use `install.yaml` post_install_actions:
```
- wget https://github.com/DiffyWebsite/diffy-worker/archive/refs/heads/main.zip
- unzip main.zip
- rm -f main.zip
```

## App configuration
App requires an API key from the service and also project ID. This is a pretty interesting setup that we borrowed from the Platformsh project.
We keep the API key in the global configuration (i.e. `~/.ddev/global_config.yaml`) and project ID is in local configuration (your project’s config.yaml).

First we check if variables are set and if they are not — we request the values (`read token`) and then save them with `ddev config global —web-environment-add` in case of global variable and `ddev config —web-environment-add` in case of project based variable.

Pay attention that ‘{{ }}’ are [go templates](https://ddev.readthedocs.io/en/stable/users/extend/additional-services/#template-action-replacements-advanced) and not bash code.
But this is not the end — also, we need to copy the values of these variables into .env file for the app. So the app can access them.
This is very non-trivial task that we got help from one of the maintainers Stas Zhuk (@stasadev). It has a lot of go template code, and we run it in [post_install_action](https://github.com/DiffyWebsite/ddev-diffy/blob/main/install.yaml#L55).

## Run npm install
We want to run npm install inside of the container and not on the host. We accomplished it by adding `post-start` hook and specifying the service where to run the command.
For that we created `config.diffy.yaml` and had instructions there. Pay attention that it is specified as `project_files` in install.yaml file.

## Docker container "diffy" user
For security reasons it is important not to run all the processes in our container as root user. For that we create a user "diffy" and then run all the commands as this user. 

This is accomplished by extending main container (see ["build" section](https://github.com/DiffyWebsite/ddev-diffy/blob/main/docker-compose.diffy.yaml#L7)) and here are [commands to create the user](https://github.com/DiffyWebsite/ddev-diffy/blob/main/diffy/Dockerfile).

## Building Docker container for multiple architectures
We follow DDEV path to build the docker container for multiple architectures:
```
docker buildx build --push --platform $(BUILD_ARCHS) -t $(DOCKER_REPO):$(VERSION) --label "build-info=$(DOCKER_REPO):$(VERSION) commit=$(shell git describe --tags --always) built $$(date) by $$(id -un) on $$(hostname)" --label "maintainer=Diffy <info@diffy.website>" $(DOCKER_ARGS) .
```
See [Makefile](https://github.com/DiffyWebsite/diffy-worker/blob/main/docker/Makefile) and [Readme](https://github.com/DiffyWebsite/diffy-worker) for more details.

The biggest roadblock I had with the container is that default shell from ubuntu:22.04 is “dash”. So we had to replace it with bash to make node installed and used properly. Also pay attention that we install node with "n" so it is installed to `/usr/local/bin/node` so it is accessible for everyone.

I would like to thank Randy and Stas as lot for their constant support in this project.
