---
title: "Solving Intel-only AMD64/X64 problems on macOS with Apple Silicon"
pubDate: 2025-04-16
#modifiedDate: 2025-02-06
summary: Some software packages and docker images are still only available in Intel versions, but emulating AMD64 is working pretty well these days on macOS with Rosetta 2.
author: Randy Fay
#featureImage:
#  src: /img/blog/2025/04/randy-mentoring-drupalcon-atlanta.jpg
#  alt: Randy at table doing first-time contributor mentoring.

categories:
  - DevOps
---

It's been almost 5 years since Apple introduced its ARM64-based Macs, and the world has loved them. But they threw a complete monkey wrench into the software works, which had expected the Intel/AMD64 for many, many years. (Read more: [ARM64! Apple Silicon! M-Series! DDEV! What does it all mean?](arm64-apple-silicon-m1-ddev-local-what-does-it-all-mean.md))

Almost all systems that distributed binary artifacts had extensive troubles. That included compiled binaries, Docker images, libraries, etc. In some cases the problem was just the fundamental assumptions in the software. 

Apple released [Rosetta 2](https://support.apple.com/en-us/102527) with the initial Apple Silicon macs, and it was great for simple situations, but it was initially quite unpredictable for Docker-based applications. You may know that I resisted any use of Rosetta for some years because of initial experiences of unpredictability. However, everything has gotten better around Rosetta over the years, but more than that, almost everything is available as a native app or native Docker image these days (and that has always included all DDEV apps and Docker images, from the very beginning). 

But it doesn't include everything. Microsoft continues to publish AMD64-only binaries and Docker images, and Oracle is as guilty. Surely they'll come around.

In the meantime, here are some techniques to get niche AMD64-only applications going with DDEV. I recommend these techniques only if you have no good alternative, because native performance and reliability are much higher.

- Run a service as `platform: linux/amd64` if only AMD64 Docker images are available
- Run the DDEV web container as `platform: linux/amd64` if you absolutely must install AMD64-only software in there (this happens most often with `npm` packages).
- Run your entire Docker environment as AMD64 with emulation.

## Running an External Service as `linux/amd64`

There are still a few Docker images that have not been properly updated to multi-platform builds, including [typo3solr](https://hub.docker.com/r/typo3solr/ext-solr) and [mssql/server](mcr.microsoft.com/mssql/server)

With these, if you have a `docker-compose.*.yaml` file that names an image which is only available as AMD64, you can just add to it this line:

```yaml
  platform: linux/amd64
```

And if you're using a Docker provider like Orbstack or Docker Desktop that has robust Rosetta support (and you have Rosetta enabled) then it will "just work". It will have reduced performance, but it may work just fine for your application.

I [recently added](https://github.com/ddev/ddev-sqlsrv/blob/main/docker-compose.sqlsrv.yaml#L2-L7) this setup to the `ddev-sqlsrv` DDEV add-on, which previously was limited to Intel users only. Adding these lines to the service's `docker-compose.sqlsrv.yaml` made the add-on work fine on Apple Silicon:

```yaml
    # On macOS Apple Silicon, this only works with Rosetta enabled
    image: ${MSSQL_DOCKER_IMAGE:-mcr.microsoft.com/mssql/server:2022-CU18-ubuntu-22.04}
    platform: linux/amd64
```

## Adding AMD64-only Software to the DDEV Web Container

Sometimes the problem is *adding* software that is Intel-specific to the DDEV web container. For example, the classic npm packages `node-sass` and `puppeteer` had this problem for years. (Now both seem to build somewhat successfully on ARM64 and they also have clear "no-longer-maintained" notices sending you to other packages.)

However, as I recently experience with Oracle client-side [ddev-oci8](https://github.com/takielias/ddev-oci8) DDEV add-on, you can make the DDEV web container run as `linux/amd64` in the same exact way, and then if you need to npm-install some odd package that is Intel-only, you can do it. Add a `.ddev/docker-compose.amd64.yaml` like this:

```yaml
services:
  web:
    # Force the DDEV web image to run as `linux/amd64` on Apple Silicon with Rosetta
    platform: linux/amd64
```

## Run Your Entire Docker System as AMD64

As well as those techniques work, it seems unlikely that you'd want to run everything as AMD64, but [DDEV on Intel... on Apple Silicon](amd64-on-apple-silicon-ddev.md) tells you how!

## Wrapping Up: Try to Use Native Software When You Can

I don't recommend using either of these techniques if you have the option of updating to native software or images, but they're pretty nice if you can't!

Do you have specific examples of Intel-focused software or images that you've had trouble with? I'd love to hear about it, and hear your solutions. I'd love to update this article with more specific examples.

I'd love to hear your experience. Join us in [Discord](/s/discord) or [open an issue](https://github.com/ddev/ddev/issues) or send [an email](/contact) if you have success (or failure 😀).

Thanks for your support and engagement with DDEV!
