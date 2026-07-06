---
title: "Podman and Docker Rootless in DDEV"
pubDate: 2026-02-03
modifiedDate: 2026-07-06
modifiedComment: Move setup instructions to the official documentation.
summary: After years of development, DDEV now supports Podman and Docker Rootless for secure, rootless container development.
author: Stas Zhuk
featureImage:
  src: /img/blog/2026/02/ddev-podman-docker-rootless.png
  alt: DDEV logo with Podman and Docker logos
categories:
  - Announcements
  - Guides
---

**TL;DR**: DDEV supports Podman and Docker Rootless as of v1.25.0. Setup instructions for every platform and runtime are in the [Docker installation docs](https://docs.ddev.com/en/stable/users/install/docker-installation/). This article covers the background, the trade-offs, and the journey that made this support possible.

## Table of Contents

## Understanding Docker and Podman

### Open Source Alternatives to Docker Desktop

A common misconception is that Podman is the only open-source alternative to Docker Desktop. In fact, several fully open-source alternatives are available on every platform:

- **[Docker Engine](https://docs.docker.com/engine/)** - The original open-source Docker, free to use
- **[Rancher Desktop](https://rancherdesktop.io/)** - Open source container management with choice of dockerd or containerd
- **[Lima](https://lima-vm.io/)** - Linux virtual machines
- **[Colima](https://github.com/abiosoft/colima)** - Container runtime with minimal setup (built on Lima)
- **[Podman Desktop](https://podman-desktop.io/)** - GUI for Podman with Docker compatibility

All of these work with DDEV. The main reason to choose Podman is if your organization forbids Docker entirely or you want rootless operation by default.

### Why Choose Podman?

Podman is rootless by default, making it the simplest option for secure container environments. Traditional Docker requires root daemons, which can be a security concern in corporate environments with strict policies. (DDEV targets local development, where this attack vector poses little real risk anyway.)

Podman's rootless approach runs the daemon without elevated privileges:

- No root daemon on the system, only a rootless daemon in userspace
- Container processes cannot access root-owned files
- Reduced attack surface if a container is compromised

While DDEV already runs containers as unprivileged users, Podman eliminates the need for a root daemon entirely.

### Why Choose Docker Rootless?

Docker Rootless offers the same security benefits as Podman rootless (no root daemon, no container access to root-owned files, a smaller attack surface) while keeping full Docker compatibility. Unlike Podman, which is rootless by default, Docker Rootless requires special setup. Choose it if you want to stay with Docker but need rootless security.

## Choosing a Runtime by Platform

Setup instructions for every runtime now live in the DDEV docs: [Docker Installation](https://docs.ddev.com/en/stable/users/install/docker-installation/). The tables below cover the trade-offs to help you decide.

### Linux and WSL2

Linux and WSL2 are the primary focus for these runtimes, and most features are well-tested here, with automated test coverage for Linux.

| Runtime                | Why would you do this?                               | Key trade-offs                                    | Performance        | Setup    | Recommendation                              |
| ---------------------- | ---------------------------------------------------- | ------------------------------------------------- | ------------------ | -------- | ------------------------------------------- |
| **Traditional Docker** | Standard, widely-used option                         | None                                              | Excellent          | Simple   | **Recommended for most users**              |
| **Docker Rootless**    | Security requirement for rootless daemon             | Container runs as root (UID 0) inside; more setup | Excellent          | Moderate | If rootless security is required            |
| **Podman Rootful**     | Organization forbids Docker                          | Slower than Docker, different behavior            | Slower than Docker | Moderate | If Docker not allowed                       |
| **Podman Rootless**    | Organization forbids Docker + want rootless security | May need sysctl changes for ports <1024, slower   | Slower than Docker | Moderate | If Docker not allowed and rootless required |

**Bottom line**: Traditional Docker and Docker Rootless are both solid choices with no significant trade-offs. Pick [Docker Rootless](https://docs.ddev.com/en/stable/users/install/docker-installation/#linux-docker-rootless) if you want rootless security while keeping full Docker compatibility. Use [Podman Rootless](https://docs.ddev.com/en/stable/users/install/docker-installation/#linux-podman-rootless) if your organization forbids Docker, keeping in mind that some operations (like `ddev start`) are slower.

#### Configuring Podman Rootful on Linux (not recommended)

Rootless Podman is recommended; setup instructions are in the [docs](https://docs.ddev.com/en/stable/users/install/docker-installation/#linux-podman-rootless). Use rootful Podman only if your setup requires it. We don't have automated testing for it:

1. Create a `podman` group (`sudo groupadd podman`) and add your user to it (`sudo usermod -aG podman $USER`).
2. Configure [group permissions](https://github.com/podman-desktop/podman-desktop/issues/2861#issuecomment-1596192247) to allow non-root users to access the socket.
3. Activate the socket with `sudo systemctl enable --now podman.socket`.
4. Create a Docker context: `docker context create podman-rootful --description "Podman (root)" --docker host="unix:///var/run/podman/podman.sock"`.
5. Switch to the new context with `docker context use podman-rootful`.

**Note**: Running both Docker and Podman in rootful mode at the same time may cause network conflicts. See [Podman and Docker network problem on Fedora 41](https://github.com/containers/podman/issues/24486).

### macOS

macOS users can use Podman and Podman Desktop, but setup has its own challenges. Docker Rootless is not available on macOS.

| Runtime                | Why would you do this?                        | Key trade-offs                                                           | Performance        | Setup    | Recommendation                 |
| ---------------------- | --------------------------------------------- | ------------------------------------------------------------------------ | ------------------ | -------- | ------------------------------ |
| **Traditional Docker** | Standard, widely-used option                  | None                                                                     | Excellent          | Simple   | **Recommended for most users** |
| **Podman**             | Avoid Docker entirely (organizational policy) | Cannot use ports 80/443 (must use 8080/8443 instead), different behavior | Slower than Docker | Moderate | If Docker not allowed          |

**Bottom line**: Use traditional Docker (OrbStack, Docker Desktop, Lima, Colima, or Rancher Desktop) unless your organization forbids it. The inability to use standard ports 80/443 with Podman creates a significantly different development experience. Follow the setup for [Podman Rootless on macOS](https://docs.ddev.com/en/stable/users/install/docker-installation/#macos-podman-rootless) in the Docker installation docs.

### Windows

Windows users can use Podman Desktop or install Podman inside WSL2, following the [Linux and WSL2 setup](https://docs.ddev.com/en/stable/users/install/docker-installation/#linux-podman-rootless) in the Docker installation docs.

| Runtime                | Why would you do this?                        | Key trade-offs                             | Performance        | Setup    | Recommendation                 |
| ---------------------- | --------------------------------------------- | ------------------------------------------ | ------------------ | -------- | ------------------------------ |
| **Traditional Docker** | Standard, widely-used option                  | None                                       | Excellent          | Simple   | **Recommended for most users** |
| **Podman**             | Avoid Docker entirely (organizational policy) | Different behavior, less mature on Windows | Slower than Docker | Moderate | If Docker not allowed          |

**Bottom line**: Use traditional Docker (Docker Desktop or alternatives) unless your organization forbids it. Podman on Windows works but is less mature than on Linux.

## Which Runtime Should You Choose?

| Feature                           | Standard Docker  | Docker Rootless               | Podman Rootful                   | Podman Rootless                          |
| --------------------------------- | ---------------- | ----------------------------- | -------------------------------- | ---------------------------------------- |
| **Platform Support**              | All              | Linux, WSL2                   | All                              | All                                      |
| **Rootless Daemon**               | ❌               | ✅                            | ❌                               | ✅                                       |
| **Has automated testing in DDEV** | ✅               | ✅                            | ❌                               | ✅                                       |
| **Mutagen**                       | ✅               | ✅                            | ✅                               | ✅                                       |
| **Bind Mounts**                   | ✅               | ✅                            | ✅                               | ✅ (with `--userns=keep-id`)             |
| **Performance**                   | Excellent        | Good                          | Slow compared to Docker          | Slow compared to Docker                  |
| **Privileged Ports (<1024)**      | Works by default | Requires `sysctl` config      | Works by default                 | Requires `sysctl` config or may not work |
| **Setup Complexity**              | Simple           | Moderate                      | Moderate                         | Moderate                                 |
| **Maturity**                      | Most mature      | Supported                     | No explicit support              | Supported                                |
| **Recommended For**               | Most users       | Docker users needing rootless | Organizations that forbid Docker | Organizations that forbid Docker         |

See the platform sections above for the specific setup docs and trade-offs behind each recommendation.

## The Journey to Podman Support

Supporting Podman and Docker Rootless required major changes to DDEV's Docker integration:

- **Switched to official Docker client library** ([#5787](https://github.com/ddev/ddev/pull/5787)): DDEV previously used an unofficial library to communicate with the Docker API. We migrated to Docker's official client library for better compatibility and long-term support.
- **Replaced direct CLI calls with proper API usage** ([#7189](https://github.com/ddev/ddev/pull/7189)): DDEV used to call `docker context inspect` directly, which doesn't work with Podman. We switched to using the `docker/cli` library to handle context operations properly.
- **Modernized SSH authentication** ([#7511](https://github.com/ddev/ddev/pull/7511)): The `ddev auth ssh` command used to call `docker run` directly. We rewrote it to use the Docker API, making it compatible with alternative runtimes.
- **Optimized API call performance** ([#7587](https://github.com/ddev/ddev/pull/7587)): DDEV's Docker API logic was inefficient, making redundant calls without caching. We restructured the code to cache data and reduce unnecessary API requests.
- **Removed legacy docker-compose features** ([#7642](https://github.com/ddev/ddev/pull/7642)): Podman refuses to work with deprecated `links` and `external_links` directives in `docker-compose` files. We removed these legacy features and modernized DDEV's compose file generation.
- **Added Podman and Docker Rootless support** ([#7702](https://github.com/ddev/ddev/pull/7702)): DDEV now detects and supports Podman (rootful and rootless) and Docker Rootless. We added handling for Podman-specific limitations and enabled rootless environments to work without root privileges.
- **Added support for SELinux environments** ([#7939](https://github.com/ddev/ddev/pull/7939)): Podman has SELinux enabled by default on Fedora and some other distributions. We added support for SELinux by configuring volume mounts with the appropriate labels.
- **Removed the `no-bind-mounts` requirement for Docker Rootless** ([#8426](https://github.com/ddev/ddev/pull/8426)): Docker Rootless originally required `no-bind-mounts` mode (forcing Mutagen for the whole project). DDEV now runs the web container so that bind mounts work under Docker Rootless, so `no-bind-mounts` is no longer required.

Podman and Docker Rootless were developed together: both center on rootless operation, so once DDEV could handle one, supporting the other followed naturally. They share the same security model and similar technical constraints.

## Supporting DDEV Development

This work was made possible by [community financial support](sustainability-for-ddev.md). The changes required hundreds of hours of development, code reviews, and testing.

DDEV relies on the individuals and organizations who use it. If you or your organization does, please consider [sponsoring the project](https://github.com/sponsors/ddev) to help keep DDEV free and open source.

## Conclusion

DDEV now supports Podman and Docker Rootless. This opens DDEV to corporate environments where traditional Docker is not allowed.

DDEV automatically detects your runtime and handles the complexity. Whether you choose Podman for rootless security, Docker Rootless for compatibility, or standard Docker, setup is straightforward. See the [Docker installation docs](https://docs.ddev.com/en/stable/users/install/docker-installation/) to get started.

---

_This article was edited and refined with assistance from Claude Code._
