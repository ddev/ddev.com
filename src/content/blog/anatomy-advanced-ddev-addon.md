---
title: "Diffy: Anatomy of an Advanced DDEV Add-on"
pubDate: 2024-08-13
summary: Custom container built for multiple architectures. Download the app and run "npm install" in the container.
author: Yuri Gerasymov
featureImage:
  src: /img/blog/2024/08/dismantled-camera.jpeg
  alt: "Microsoft image creator: dismantled photo camera."
  credit: "Microsoft image creator: dismantled photo camera."
categories:
  - TechNotes
---

[Diffy](https://diffy.website) is a visual regression testing tool that allows you to take screenshots of your website and compare them so you know exactly what pages got changed and where. We decided to build DDEV integration so it is possible to take screenshots from the local website, upload them to Diffy, and then compare them with screenshots from other environments.

The `ddev-diffy` add-on is at [github.com/DiffyWebsite/ddev-diffy](https://github.com/DiffyWebsite/ddev-diffy).

Add-on can be installed with a simple `ddev get DiffyWebsite/ddev-diffy`. Check the [introduction blog post](ddev-diffy-introduction.md) about the installation.

Check our [documentation](https://docs.diffy.website/features/local-development/ddev-add-on).

<div style="position: relative; padding-bottom: 64.5933014354067%; height: 0;"><iframe src="https://www.loom.com/embed/a3b750e32581458f9d2271969bba1bb8?sid=7abe431c-5d39-42c2-916a-f3669f0ea724" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Architecturally, integration consists of:

* Docker container with preinstalled node and Chrome 111
* Node.js app that runs Chrome
* The app itself is hosted in a separate repository as it is used in other places (like production for the main service itself).

Let’s go through the way integration is built.

## Download node app
To download the app we use `install.yaml` post_install_actions:
```
- rm -rf diffy-worker && mkdir diffy-worker
- docker run -it --rm -v ./diffy-worker:/diffy-worker --user $DDEV_UID:$DDEV_GID ddev/ddev-utilities bash -c "cd /diffy-worker && wget -qO- https://github.com/DiffyWebsite/diffy-worker/archive/refs/heads/main.tar.gz | tar xz --strip-components=1"
```

This is a particularly interesting approach as we use `ddev-utilities` to download the code and unpack it.

## App configuration
The app itself requires API Key and Project ID. Best practice is not to commit them so they are saved manually as `.env` file.

## Run npm install
We want to run npm install inside of the container and not on the host. We accomplished it by adding `post-start` hook and specifying the service where to run the command.
For that we created `config.diffy.yaml` and had instructions there. Pay attention that it is specified as `project_files` in `install.yaml` file.

## Docker container user
For security reasons it is important not to run all the processes in our container as root user. For that we create specify a user to run all commands in the container.

See `user: '$DDEV_UID:$DDEV_GID'` in [docker-compose.diffy.yaml](https://github.com/DiffyWebsite/ddev-diffy/blob/e49bb8c01ba6eff88d2d29496e81643f373b2c9b/docker-compose.diffy.yaml#L6) and the way we download the code above.

Another interesting trick is that if that user tries to run `npm install` system will populate `~/.cache` folder with some files. But as the user doesn't not exist we need to ensure that `/.cache` folder is available and writeable. For that we create it in the [container itself](https://github.com/DiffyWebsite/diffy-worker/blob/4f533962a574bf86ea986b1c080e4bb7e0773ed5/docker/Dockerfile#L28).

## Building Docker container for multiple architectures
We follow DDEV path to build the Docker container for multiple architectures:
```
docker buildx build --push --platform $(BUILD_ARCHS) -t $(DOCKER_REPO):$(VERSION) --label "build-info=$(DOCKER_REPO):$(VERSION) commit=$(shell git describe --tags --always) built $$(date) by $$(id -un) on $$(hostname)" --label "maintainer=Diffy <info@diffy.website>" $(DOCKER_ARGS) .
```
See [Makefile](https://github.com/DiffyWebsite/diffy-worker/blob/main/docker/Makefile) and [Readme](https://github.com/DiffyWebsite/diffy-worker) for more details.

The biggest roadblock I had with the container is that default shell from ubuntu:22.04 is “dash”. So we had to replace it with bash to make node installed and used properly. Also pay attention that we install node with "n" so it is installed to `/usr/local/bin/node` so it is accessible for everyone.

I would like to thank Randy and Stas as lot for their constant support in this project.
