---
title: "Experimental PR, ignore this"
pubDate: 2026-09-30
modifiedDate: 2025-04-17
modifiedComment: Added a good example for an npm package that fails on arm64.
summary: Some software packages and docker images are still only available in Intel versions, but emulating AMD64 is working pretty well these days on macOS with Rosetta 2.
author: Randy Fay
featureImage:
  src: /img/blog/2025/04/apple-silicon-intel.png
  alt: Bridging Apple Silicon and Intel architectures.

categories:
  - DevOps
---

It's been almost 5 years since Apple introduced its ARM64-based Macs, and the world has loved them. But they threw a complete monkey wrench into the software works, which had expected the Intel/AMD64 architecture for many, many years. (Read more: [ARM64! Apple Silicon! M-Series! DDEV! What does it all mean?](arm64-apple-silicon-m1-ddev-local-what-does-it-all-mean.md))

Almost all systems that distributed binary artifacts had extensive troubles. That included compiled binaries, Docker images, libraries, etc. In some cases the problem was just the fundamental assumptions in the software.

Apple released [Rosetta 2](https://support.apple.com/en-us/102527) with the initial Apple Silicon macs, and it was great for simple situations, but it was initially quite unpredictable for Docker-based applications. You may know that I resisted any use of Rosetta for some years because of initial experiences of unpredictability. However, everything has gotten better around Rosetta over the years, but more than that, almost everything is available as a native app or native Docker image these days (and that has always included all DDEV apps and Docker images, from the very beginning).

But it doesn't include everything. Microsoft continues to publish AMD64-only binaries and Docker images, and Oracle is just as guilty. Surely they'll come around.

In the meantime, here are some techniques to get niche AMD64-only applications going with DDEV. I recommend these techniques only if you have no good alternative, because native performance and reliability are much higher.

- Run a service as `platform: linux/amd64` if only AMD64 Docker images are available
- Run the DDEV web container as `platform: linux/amd64` if you absolutely must install AMD64-only software in there (this happens most often with `npm` packages).
- Run your entire Docker environment as AMD64 with emulation.

## Running an External Service as `linux/amd64`

There are still a few Docker images that have not been properly updated to multi-platform builds, including [typo3solr](https://hub.docker.com/r/typo3solr/ext-solr) and [mssql/server](https://hub.docker.com/r/microsoft/mssql-server).

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

Sometimes the problem is _adding_ software that is Intel-specific to the DDEV web container. For example, the classic npm packages `node-sass` and `puppeteer` had this problem for years, and the `gifsicle` npm package still does.

On an Apple Silicon machine you might get an ugly error like this when doing `ddev npm install gifsicle`:

```
npm error OrbStack ERROR: Dynamic loader not found: /lib64/ld-linux-x86-64.so.2
npm error
npm error This usually means that you're running an x86 program on an arm64 OS without multi-arch libraries.
npm error To fix this, you can:
npm error   1. Use an Intel (amd64) container to run this program; or
npm error   2. Install multi-arch libraries in this container.
```

In this situation, if you have Rosetta enabled and a Docker provider configured to support it, you can add a `.ddev/docker-compose.amd64.yaml` like this:

```yaml
services:
  web:
    # Force the DDEV web image to run as `linux/amd64` on Apple Silicon with Rosetta
    platform: linux/amd64
```

Now on `ddev restart` you'll be running an AMD64 web container and `ddev npm install gifsicle` will work just fine. And your colleagues who are on Intel processors will have no trouble with this configuration.

Test it with `ddev exec arch`, you'll now get `x86_64`.

(If you run into issues, try `ddev debug rebuild` to clear the old Dockerfile build cache.)

## Run Your Entire Docker System as AMD64

Since those techniques work so well, it seems unlikely that you'd want to run everything as AMD64, but [DDEV on Intel... on Apple Silicon](amd64-on-apple-silicon-ddev.md) tells you how if you want to!

## Wrapping Up: Try to Use Native Software When You Can

I don't recommend using either of these techniques if you have the option of updating to native software or images, but they're pretty nice if you can't!

Do you have specific examples of Intel-focused software or images that you've had trouble with? I'd love to hear about it, and hear your solutions. I'd love to update this article with more specific examples.

I'd love to hear your experience. Join us in [Discord](/s/discord) or [open an issue](https://github.com/ddev/ddev/issues) or send [an email](/contact) if you have success (or failure 😀).

Thanks for your support and engagement with DDEV!
