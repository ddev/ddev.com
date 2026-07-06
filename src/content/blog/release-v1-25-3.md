---
title: "DDEV v1.25.3: Faster Start and Stop, Built-in Docker Compose, Stable Podman, Node.js Fixes"
pubDate: 2026-07-06
summary: DDEV v1.25.3 brings faster `ddev start` and `ddev stop`, built-in Docker Compose, stable Podman and Docker rootless support, and Node.js configuration fixes.
author: Stas Zhuk
featureImage:
  src: /img/blog/2026/07/banner-ddev-v1-25-3.svg
  srcDark: /img/blog/2026/07/banner-ddev-v1-25-3-dark.svg
  alt: DDEV v1.25.3 Release Banner
categories:
  - Announcements
---

We're announcing [DDEV v1.25.3](https://github.com/ddev/ddev/releases/tag/v1.25.3): faster `ddev start` and `ddev stop`, built-in Docker Compose, stable Podman and Docker Rootless support, Node.js improvements, `XDG_CONFIG_HOME` changes, and more.

This release represents 128 PRs from the entire DDEV community: your suggestions, bug reports, code, and financial support made it possible.

## Table of Contents

## Faster `ddev start` and `ddev stop`

`ddev start` is faster in v1.25.2 (top) vs v1.25.3 (bottom), including a faster warm start:

![`ddev start` v1.25.2 (top) vs v1.25.3 (bottom)](/img/blog/2026/07/ddev-start-v1-25-2-vs-v1-25-3.gif)

`ddev stop` is significantly faster in v1.25.2 (top) vs v1.25.3 (bottom), and the same improvement also applies to `ddev poweroff` and `ddev delete`, since all three share the same code path:

![`ddev stop` v1.25.2 (top) vs v1.25.3 (bottom)](/img/blog/2026/07/ddev-stop-v1-25-2-vs-v1-25-3.gif)

`ddev restart` is significantly faster in v1.25.2 (top) vs v1.25.3 (bottom), since it stops and starts a project and benefits from both improvements:

![`ddev restart` v1.25.2 (top) vs v1.25.3 (bottom)](/img/blog/2026/07/ddev-restart-v1-25-2-vs-v1-25-3.gif)

Post-healthcheck tasks now run concurrently instead of one after another, reducing overall `ddev start` time, thanks to [@jonesrussell](https://github.com/jonesrussell).

A bug in the web server startup script also added a ~10-second delay to `ddev stop`. That delay is now gone.

We benchmarked `ddev start` from a stopped state on both macOS and Linux, and v1.25.3 is faster on both. Numbers vary by machine, but you can reproduce it with [`scripts/compare-start-perf.sh`](https://github.com/ddev/ddev/blob/main/scripts/compare-start-perf.sh):

```bash
git clone https://github.com/ddev/ddev ddev-upstream
cd ddev-upstream
bash scripts/compare-start-perf.sh v1.25.2 v1.25.3
```

On macOS, v1.25.3 is about 28% faster than v1.25.2 (benchmarked by [@rfay](https://github.com/rfay)):

```
Summary (ddev start from stopped state)
-------------------------------------------------------------------
  A (v1.25.2): median=11.03s  trimmed-mean=10.49s
  B (v1.25.3): median=7.91s   trimmed-mean=7.84s
  B is FASTER than A by 3.12s (-28.3%) on median
```

On Linux, it's about 21% faster (benchmarked by [@stasadev](https://github.com/stasadev)):

```
Summary (ddev start from stopped state)
-------------------------------------------------------------------
  A (v1.25.2): median=18.03s  trimmed-mean=18.25s
  B (v1.25.3): median=14.18s  trimmed-mean=14.96s
  B is FASTER than A by 3.85s (-21.4%) on median
```

## New Docker Compose Library

DDEV now uses the Docker Compose SDK directly instead of shelling out to a separate `docker-compose` binary. The `$HOME/.ddev/bin/docker-compose` binary DDEV used to download and manage can be removed. This switch was made possible by the Docker Compose maintainers, who exposed the SDK as a reusable library in [Compose v5.0.0](https://github.com/docker/compose/releases/tag/v5.0.0). Thank you very much!

Driving Compose through the SDK is also what gives you the cleaner output and live per-step timer in the GIFs above: DDEV now controls how progress is displayed instead of passing through whatever the external binary printed.

This is the same underlying change that added the optional `ddev config global --docker-buildx-version` setting in this release. See [Docker Buildx Requirement in DDEV](docker-buildx-requirement-v1-25-1.md) for the full background on Buildx and the Compose SDK switch.

## Podman and Docker Rootless Are No Longer Experimental

Both Podman rootless and Docker rootless are now stable. We introduced this support as experimental in v1.25.0. See [Podman and Docker Rootless in DDEV](podman-and-docker-rootless.md) for the background, trade-offs, and the work behind it. Setup instructions:

- [macOS (Podman rootless)](https://docs.ddev.com/en/stable/users/install/docker-installation/#macos-podman-rootless)
- [Linux/WSL2 (Docker rootless)](https://docs.ddev.com/en/stable/users/install/docker-installation/#linux-docker-rootless)
- [Linux/WSL2 (Podman rootless)](https://docs.ddev.com/en/stable/users/install/docker-installation/#linux-podman-rootless)

## Node.js Changes

- The correct Node.js version is now used during the build phase of `ddev start`. Previously the build phase always used DDEV's default version, which could cause problems when a project specified a different one (see [ddev-pnpm#14](https://github.com/ddev/ddev-pnpm/issues/14)).
- If you install global `npm` packages in `post-start` hooks, move them to [extra Dockerfiles](https://docs.ddev.com/en/stable/users/extend/customizing-images/#adding-extra-dockerfiles-for-webimage-and-dbimage) instead, since those now run against the correct Node.js version.
- `nodejs_version` is now preserved in `.ddev/config.yaml` even when it matches DDEV's default (previously it was removed in that case).
- Setting `nodejs_version: ""` in `.ddev/config.yaml` always uses the default Node.js version bundled with DDEV, currently Node.js 24.
- You can install additional Node.js versions with `ddev exec n install <version>` inside the web container. This used to be a reason to use `nvm`, which [was moved to the `ddev-nvm` add-on](https://github.com/ddev/ddev-nvm) in v1.25.0; with `n` built-in, you no longer need `nvm` for it.
- `N_PREFIX` moved from `/usr/local` to `/usr/local/n`.
- See the updated [`nodejs_version`](https://docs.ddev.com/en/stable/users/configuration/config/#nodejs_version) documentation for more details.

## `XDG_CONFIG_HOME` Is Replaced by `DDEV_XDG_CONFIG_HOME`

We received several reports of DDEV recreating `$HOME/.ddev` repeatedly:

> `Warning: multiple global DDEV configurations found, /home/stas/.config/ddev is used, /home/stas/.ddev is not used, delete one of them to avoid confusion`

IDEs such as PhpStorm don't always see `XDG_CONFIG_HOME` from the terminal, so DDEV fell back to and recreated `$HOME/.ddev` repeatedly. See the upstream issue [IJPL-1055](https://youtrack.jetbrains.com/projects/IJPL/issues/IJPL-1055/Load-interactive-shell-environment-variables-on-Linux) for details.

To avoid this problem, DDEV now reads its own environment variable, `DDEV_XDG_CONFIG_HOME`, and no longer respects `XDG_CONFIG_HOME`. If you were relying on `XDG_CONFIG_HOME` to point DDEV at a config location, set `DDEV_XDG_CONFIG_HOME` to that same value instead.

Support for `$HOME/.config/ddev` on Linux is unchanged.

## Everything Else

This release includes many more features and bugfixes. See the [full release notes](https://github.com/ddev/ddev/releases/tag/v1.25.3) for the complete list.

From the entire team, thanks for using, promoting, contributing, and supporting DDEV!

If you have questions, reach out in any of the [support channels](https://docs.ddev.com/en/stable/users/support/).

Follow our [blog](https://ddev.com/blog/), [Bluesky](https://bsky.app/profile/ddev.bsky.social), [LinkedIn](https://www.linkedin.com/company/ddev-foundation), [Mastodon](https://fosstodon.org/@ddev), and join us on [Discord](/s/discord). Sign up for the [monthly newsletter](/newsletter).

---

_This article was edited and refined with assistance from Claude Code._
