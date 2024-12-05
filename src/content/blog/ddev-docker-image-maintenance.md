---
title: "Contributor Training: DDEV Docker Image Maintenance"
pubDate: 2024-07-30
# modifiedDate: 2024-07-23
summary: "Contributor Training: DDEV Docker Image Maintenance"
author: Randy Fay
featureImage:
  src: /img/blog/2024/07/image-maintenance.png
  alt: "a banner image showing a carved stone image being maintained by a number of workmen"
  credit: "ChatGPT: A banner image showing a carved stone image being maintained by a number of workmen"
categories:
  - Training
  - Guides
---

Here's our July 24, 2024 [Contributor Training](/blog/category/training) on DDEV Docker Image Maintenance:

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/HcJOm0nBU0w?si=M19qxd8ZoRjnHR9N" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

DDEV depends on a [few critical Docker images](https://github.com/ddev/ddev/tree/master/containers), including `ddev-webserver`, `ddev-dbserver`, `ddev-traefik-router`, and `ddev-ssh-agent`. Each of these is built for new releases, and if a PR changes them, then a new image tag is pushed for that PR (typically with the same tag as the PR branch name).

## Building images locally for testing your changes

As a prerequisite to building multi-architecture Docker images, do `docker buildx create --use`, which sets up `docker buildx` to do that.

After that, assuming that you are working on a branch called `YYMMDD_youruid_branch_description`, like `20240730_rfay_webserver_arch` and you need to build a new `ddev-webserver` image to support it, use

```bash
cd containers/ddev-webserver
make VERSION=20240730_rfay_webserver_arch
```

to build a local image in your matching architecture.

If you are going to push to your own Docker organization, you could consider this:

```bash
make VERSION=20240730_rfay_webserver_arch DOCKER_ORG=randyfay
```

In that situation, you would be able to push the image to `randyfay/ddev-webserver:20240730_rfay_webserver_arch`.

## Updating the DDEV binary to use the new image

To convince DDEV to use the new image, update `pkg/versionconstants/versionconstants.go` with the image tag or optionally also the DOCKER_ORG you used.

## Pushing Images to `hub.docker.com`

When it's time to push images, you can push them with `make push VERSION=<branch>` or `make push VERSION=<branch> DOCKER_ORG=<your_org>`. For example

```bash
make push VERSION=20240730_rfay_webserver_arch
# or
make push VERSION=20240730_rfay_webserver_arch DOCKER_ORG=randyfay
```

## Pushing using the GitHub Actions Workflow

Rather than tying up your computer for all the time it takes to do a push, you can use the GitHub Actions workflow. For example, with `ddev/ddev` we can go to `https://github.com/ddev/ddev/actions/workflows/push-tagged-image.yml` and choose what image to push and what branch to push it from. You can also do this from your fork if you [configure](https://ddev.readthedocs.io/en/stable/developers/release-management/#github-actions-required-secrets) the `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` secrets for your fork.

If it helps you and you are a known entity, we can also give you permissions on [ddev-test/ddev](https://github.com/ddev-test/ddev) so that you can do this, but it's probably easier to push to your own `hub.docker.com` repository.

## Manually testing image changes

When you're testing simple things, you can use a number of techniques:

- Run the image directly. For example, `docker run -it --rm ddev/ddev-webserver:20240730_rfay_webserver_arch bash` will land you inside the container where you can inspect what's going on there, run any scripts you need to, etc.
- Run it using `ddev`. For example, if you have built `ddev` with `make`, you can make sure that `<project>/.gotmp/bin/<your_arch>` is in your `PATH`, and do a `ddev start`. Then you can `ddev ssh` and see what has happened.

If you have done a `make push` or used the GitHub Actions technique, make sure you do a `docker pull <image>:tag` to update your local image copy.

## Other ways to change the build

### `.ddev/web-build/Dockerfile.*`

Actually changing the build is not necessarily the best way to introduce an image change, and it's almost certainly not the best way to experiment.

Usually the best way to get started is the `.ddev/web-build/Dockerfile.*` technique, where you just add a tiny bit to the Docker build based on your project's needs. For example, in a project you might have a trivial `.ddev/web-build/Dockerfile.experiment` like this:

```dockerfile
RUN touch /var/tmp/this-ran.txt
```

When your project starts up it will actually build this into the image. You can use this technique for texting and experimentation.

### Adding conditional layers in Golang code

DDEV's Golang code adds a few layers to the images at the first `ddev start` on a project. You can see all of these consolidated in a project in the `.ddev/.webimageBuild/Dockerfile` (which is not something you will ever change, it's a generated file). That's where things like the matching in-container Linux user and group are added, and a few other things. You can see how DDEV adds these layers in [WriteBuildDockerfile()](https://github.com/ddev/ddev/blob/c2aca52a18687e678086dd232573cf51914dba56/pkg/ddevapp/config.go#L1113). It's unusual to do things with images this way, but some problems do require logic during the Golang processes.

## Running and improving the image-based tests

Each of the Docker images has a set of tests that go with it in the `tests` directory. You can run these tests most easily using `make test` in the proper container, for example:

```bash
cd containers/ddev-webserver
make test
```

The test will build the container locally and then run a suite of `bats` tests on it. You can look at the `Makefile` to see exactly what the test does. The `ddev-webserver` test runs `tests/ddev-webserver/test.sh $(DOCKER_ORG)/ddev-webserver:$(VERSION)`, which runs the `bats` files in the `tests` directory.

[`bats`](https://github.com/bats-core/bats-core) is a `bash`-based test framework and it's used here because the tests have nothing to do with Golang, and for most people the barrier to entry for a bash test is lower. `bats` is also used by default in DDEV add-on tests, and is covered in the [Contributor Training on Add-Ons](advanced-add-on-contributor-training.md). PRs that make nontrivial changes to the Docker images should normally have test coverage at this level.

## Testing images with the Golang-based tests

There are hundreds of Golang-based tests as well, some of which do a good job exercising Docker image features. This is a fine way to do this work.

## Resources

- [Release Management and Docker Images](https://ddev.readthedocs.io/en/stable/developers/release-management/)
- [DDEV Docker Architecture](ddev-docker-architecture.md) contributor training.
- [Contributor Training on Add-Ons](advanced-add-on-contributor-training.md) (covers `bats` usage)

## Contributions welcome!

Your suggestions to improve this blog are welcome. You can do a PR to this blog adding your techniques. Info and a training session on how to do a PR to anything in ddev.com is at [DDEV Website For Contributors](ddev-website-for-contributors.md).

Join us for the next [DDEV Live Contributor Training](contributor-training.md). Sign up at [DDEV Live Events Meetup](https://www.meetup.com/ddev-events/events/).
