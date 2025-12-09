---
title: "Podman and Docker Rootless in DDEV"
pubDate: 2025-12-10
#modifiedDate: 2025-12-10
summary: After years of development, DDEV now supports Podman and Docker Rootless for secure, rootless container development.
author: Stas Zhuk
featureImage:
  src: /img/blog/2025/12/ddev-podman-docker-rootless.png
  alt: DDEV logo with Podman and Docker logos
categories:
  - Announcements
  - Guides
---

The DDEV community has requested Podman and Docker Rootless support for years. This support is now available in [DDEV HEAD](https://docs.ddev.com/en/stable/developers/building-contributing/#testing-latest-commits-on-head) as an experimental feature, general availability is planned for upcoming DDEV v1.25.0.

It allows DDEV to work in corporate environments where Docker Desktop is not allowed due to security policies or licensing restrictions.

This required major changes to how DDEV works with container runtimes. We rebuilt core infrastructure and fixed compatibility issues that existed since DDEV's start.

**Note**: Podman and Docker Rootless support is experimental. While it works for most use cases, you may encounter issues. Please report any problems on the [DDEV issue tracker](https://github.com/ddev/ddev/issues).

## Table of Contents

- [The Journey to Podman Support](#the-journey-to-podmansupport)
- [Understanding Docker and Podman](#understanding-docker-andpodman)
  - [Open Source Alternatives to Docker Desktop](#open-source-alternatives-to-dockerdesktop)
  - [Why Choose Rootless?](#why-chooserootless)
  - [The Socket Requirement for DDEV](#the-socket-requirement-forddev)
- [Linux and WSL2](#linux-andwsl2)
  - [Installing Podman](#installingpodman)
  - [Installing Docker CLI](#installing-dockercli)
  - [Configuring Podman Rootless](#configuring-podmanrootless)
  - [Configuring Podman Rootful](#configuring-podmanrootful)
  - [Common Podman Issues](#common-podmanissues)
  - [Podman Rootless Performance Optimization](#podman-rootless-performanceoptimization)
  - [Setting Up Docker Rootless](#setting-up-dockerrootless)
- [macOS](#macos)
  - [Installing Podman](#installingpodman-1)
  - [Installing Docker CLI](#installing-dockercli-1)
  - [Configuring Podman](#configuringpodman)
- [Windows](#windows)
  - [Installing Podman](#installingpodman-2)
- [Running Multiple Container Runtimes](#running-multiple-containerruntimes)
- [Switching Runtimes with DDEV](#switching-runtimes-withddev)
- [Which Runtime Should You Choose?](#which-runtime-should-youchoose)
  - [Runtime Comparison](#runtimecomparison)
  - [Recommendations](#recommendations)
- [Supporting DDEV Development](#supporting-ddevdevelopment)
- [Conclusion](#conclusion)

## The Journey to Podman Support

Supporting Podman and Docker Rootless required major changes to DDEV's Docker integration:

- **Switched to official Docker client library** ([#5787](https://github.com/ddev/ddev/pull/5787)): DDEV previously used an unofficial library to communicate with the Docker API. We migrated to Docker's official client library for better compatibility and long-term support.
- **Replaced direct CLI calls with proper API usage** ([#7189](https://github.com/ddev/ddev/pull/7189)): DDEV used to call `docker context inspect` directly, which doesn't work with Podman. We switched to using the `docker/cli` library to handle context operations properly.
- **Modernized SSH authentication** ([#7511](https://github.com/ddev/ddev/pull/7511)): The `ddev auth ssh` command used to call `docker run` directly. We rewrote it to use the Docker API, making it compatible with alternative runtimes.
- **Optimized API call performance** ([#7587](https://github.com/ddev/ddev/pull/7587)): DDEV's Docker API logic was inefficient, making redundant calls without caching. We restructured the code to cache data and reduce unnecessary API requests.
- **Removed legacy docker-compose features** ([#7642](https://github.com/ddev/ddev/pull/7642)): Podman refuses to work with deprecated `links` and `external_links` directives in `docker-compose` files. We removed these legacy features and modernized DDEV's compose file generation.
- **Added Podman and Docker Rootless support** ([#7702](https://github.com/ddev/ddev/pull/7702)): DDEV now detects and supports Podman (rootful and rootless) and Docker Rootless. We added handling for Podman-specific limitations and enabled rootless environments to work without root privileges.

These changes enabled Podman and Docker Rootless support. These features were developed together because Podman's primary use case is rootless operation. Once DDEV could handle rootless runtimes, supporting both became natural. They share the same security model and similar technical constraints.

## Understanding Docker and Podman

### Open Source Alternatives to Docker Desktop

A common misconception is that Podman is the only open-source alternative to Docker Desktop. This is not true. There are several fully open-source alternatives available on every platform:

- **[Docker Engine](https://docs.docker.com/engine/)** - The original open-source Docker, free to use
- **[Rancher Desktop](https://rancherdesktop.io/)** - Open source container management with choice of dockerd or containerd
- **[Lima](https://lima-vm.io/)** - Linux virtual machines
- **[Colima](https://github.com/abiosoft/colima)** - Container runtime with minimal setup (built on Lima)
- **[Podman Desktop](https://podman-desktop.io/)** - GUI for Podman with Docker compatibility

All of these work with DDEV. The main reason to choose Podman specifically is if your organization forbids Docker entirely or if you want rootless operation by default.

### Why Choose Rootless?

Running containers without root privileges is more secure. Traditional Docker and rootful Podman need elevated privileges, which creates security risks in corporate environments where strict security policies apply.

Rootless alternatives (Podman Rootless and Docker Rootless) run containers without root access. This means:

- No root daemon on the system, only a rootless daemon in userspace
- Container processes cannot access root-owned files
- Reduced attack surface if a container is compromised

DDEV has traditionally run its containers as an unprivileged user, limiting the attack surface. However, Docker itself runs its daemon under root user by default. Rootless runtimes eliminate this requirement.

Podman is rootless by default. Docker Rootless requires special setup.

### The Socket Requirement for DDEV

There is a [Docker Engine API](https://docs.docker.com/reference/api/engine/), which serves as a layer between DDEV and Docker/Podman. To make API calls, it's required to have a running socket that listens for API requests.

Podman can work without a socket, but to have access to the Docker API, it's necessary to enable it. The socket lets DDEV use the Docker API to talk to Podman, so DDEV can support both Docker and Podman with the same code.

## Linux and WSL2

The primary focus for this article is Linux and WSL2 (we have test coverage for Linux only for now). Most features and configurations are well-tested on these platforms.

### Installing Podman

Install Podman using your distribution's package manager. See the [official Podman installation guide for Linux](https://podman.io/docs/installation#installing-on-linux).

**Note:** Some distributions may have outdated Podman versions. This is the case with Ubuntu 24.04, which has Podman 4.9.3. We recommend using Podman 5.0 or newer for the best experience, because we didn't have success with Podman 4.x in our automated tests, but you can still use Podman 4.x ignoring the warning on `ddev start`.

You can also install [Podman Desktop](https://podman-desktop.io/docs/installation/linux-install) if you prefer a GUI.

For more information, see the [Podman tutorials](https://github.com/containers/podman/tree/main/docs/tutorials#readme).

### Installing Docker CLI

Docker has two parts: the Docker engine (daemon) and the CLI client.

It's easier to install `docker` CLI to use with Podman to be able to change Docker contexts easily.

1. [Set up Docker's apt repository](https://docs.docker.com/engine/install/)
2. Install only the CLI:

   ```bash
   # Ubuntu/Debian
   sudo apt-get install docker-ce-cli
   # Fedora
   sudo dnf install docker-ce-cli
   ```

   **Note:** You don't need to install `docker-ce` (the Docker engine).

### Configuring Podman Rootless

This is the recommended configuration for most users.

1. In order for users to run rootless Podman, a `subuid` and `subgid` configuration entry must exist for each user that wants to use it. New users created using `useradd` have these entries by default:

   ```bash
   # Add subuid and subgid ranges
   sudo usermod --add-subuids 100000-165535 --add-subgids 100000-165535 $(whoami)
   # Migrate existing Podman data
   podman system migrate
   ```

   See the [Arch Wiki Podman page](https://wiki.archlinux.org/title/Podman#Set_subuid_and_subgid) for more details.

2. Configure system for privileged port access:

   ```bash
   # Allow binding to ports below 1024
   echo 'net.ipv4.ip_unprivileged_port_start=0' | sudo tee -a /etc/sysctl.d/60-rootless.conf

   # Apply without rebooting
   sudo sysctl -p /etc/sysctl.d/60-rootless.conf
   ```

3. Enable and start the Podman socket:

   ```bash
   systemctl --user enable --now podman.socket
   ```

4. Verify the socket is running:

   ```bash
   ls $XDG_RUNTIME_DIR/podman/podman.sock
   ```

   You should see `/run/user/1000/podman/podman.sock` (the number may vary).

   You can also check the socket path with:

   ```bash
   podman info --format '{{.Host.RemoteSocket.Path}}'
   ```

5. Configure Docker API to use Podman. Choose one of these methods:

   **Option A: Create Docker context** (if you have `docker` CLI installed):

   ```bash
   # View existing contexts
   docker context ls

   # Create Podman rootless context
   docker context create podman-rootless \
       --description "Podman (rootless)" \
       --docker host="unix://$XDG_RUNTIME_DIR/podman/podman.sock"

   # Switch to the new context
   docker context use podman-rootless

   # Verify it works
   docker ps
   ```

   **Option B: Set environment variable in your shell profile** (`~/.bashrc` or `~/.zshrc`):

   ```bash
   export DOCKER_HOST=unix://$XDG_RUNTIME_DIR/podman/podman.sock
   ```

For additional details, see the [Podman socket activation documentation](https://github.com/containers/podman/blob/main/docs/tutorials/socket_activation.md).

### Configuring Podman Rootful

Rootful Podman requires configuring user group permissions.

1. Create the `podman` group (alternatively, you can reuse an existing `docker` group here, if you have both Docker and Podman installed):

   ```bash
   sudo groupadd podman
   ```

2. Add your user to the group:

   ```bash
   sudo usermod -aG podman $USER
   ```

3. Log out and log back in, or activate the changes immediately:

   ```bash
   newgrp podman
   ```

   If you're in a VM, restart it for changes to take effect.

4. Configure Podman socket permissions:

   ```bash
   # Configure permissions for /run/podman
   sudo tee /etc/tmpfiles.d/podman.conf > /dev/null <<EOF
   d /run/podman 0770 root podman
   EOF

   # Configure socket to run with podman group
   sudo mkdir -p /etc/systemd/system/podman.socket.d
   sudo tee /etc/systemd/system/podman.socket.d/override.conf > /dev/null <<EOF
   [Socket]
   SocketMode=0660
   SocketUser=root
   SocketGroup=podman
   EOF

   # Apply changes
   sudo systemd-tmpfiles --create
   sudo systemctl daemon-reload
   ```

5. Enable and start the socket:

   ```bash
   sudo systemctl enable --now podman.socket
   ```

6. Verify the socket:

   ```bash
   ls /var/run/podman/podman.sock
   ```

   Or check with:

   ```bash
   sudo podman info --format '{{.Host.RemoteSocket.Path}}'
   ```

7. Configure Docker API to use Podman. Choose one of these methods:

   **Option A: Create Docker context** (if you have `docker` CLI installed):

   ```bash
   # View existing contexts
   docker context ls

   # Create Podman rootful context
   docker context create podman \
       --description "Podman (rootful)" \
       --docker host="unix:///var/run/podman/podman.sock"

   # Switch to the new context
   docker context use podman

   # Verify it works
   docker ps
   ```

   **Option B: Set environment variable in your shell profile** (`~/.bashrc` or `~/.zshrc`):

   ```bash
   export DOCKER_HOST=unix:///var/run/podman/podman.sock
   ```

### Common Podman Issues

- [Podman rootless tutorial](https://github.com/containers/podman/blob/main/docs/tutorials/rootless_tutorial.md)
- [Arch Wiki](https://wiki.archlinux.org/title/Podman)

### Podman Rootless Performance Optimization

Podman Rootless is slower than Docker. See these resources:

- [Podman run/build performance issues](https://github.com/containers/podman/issues/13226)
- [Podman Performance documentation](https://github.com/containers/podman/blob/main/docs/tutorials/performance.md)

To improve performance, install `fuse-overlayfs` and configure the overlay storage driver:

**Install fuse-overlayfs**:

```bash
# Ubuntu/Debian
sudo apt-get install fuse-overlayfs
# Fedora
sudo dnf install fuse-overlayfs
```

**Configure storage**:

```bash
cat << 'EOF' > ~/.config/containers/storage.conf
[storage]
driver = "overlay"
[storage.options.overlay]
mount_program = "/usr/bin/fuse-overlayfs"
EOF
```

**Warning**: If you already have Podman containers, images, or volumes, you'll need to reset Podman for this change to take effect:

```bash
podman system reset
```

This removes all existing containers, images, and volumes (similar to `docker system prune -a`).

### Setting Up Docker Rootless

Docker Rootless on Linux offers rootless security with full Docker compatibility.

1. Follow the official [Docker Rootless installation guide](https://docs.docker.com/engine/security/rootless/).

2. For daemon configuration, see the [Docker daemon documentation](https://docs.docker.com/engine/daemon/).

3. In order for users to run rootless Docker, a `subuid` and `subgid` configuration entry must exist for each user that wants to use it. New users created using `useradd` have these entries by default:

   ```bash
   # Add subuid and subgid ranges
   sudo usermod --add-subuids 100000-165535 --add-subgids 100000-165535 $(whoami)
   ```

4. Configure system for privileged port access:

   ```bash
   # Allow binding to ports below 1024
   echo 'net.ipv4.ip_unprivileged_port_start=0' | sudo tee -a /etc/sysctl.d/60-rootless.conf

   # Apply without rebooting
   sudo sysctl -p /etc/sysctl.d/60-rootless.conf
   ```

5. Allow [loopback connections](https://github.com/moby/moby/issues/47684#issuecomment-2166149845) (needed for working Xdebug):

   ```bash
   mkdir -p ~/.config/systemd/user/docker.service.d
   cat << 'EOF' > ~/.config/systemd/user/docker.service.d/override.conf
   [Service]
   Environment="DOCKERD_ROOTLESS_ROOTLESSKIT_DISABLE_HOST_LOOPBACK=false"
   EOF
   ```

6. Enable and start the Docker socket:

   ```bash
   systemctl --user enable --now docker.socket
   ```

7. Verify the socket:

   ```bash
   ls $XDG_RUNTIME_DIR/docker.sock
   ```

   You should see `/run/user/1000/docker.sock` (the number may vary).

8. Configure Docker context (if needed):

   ```bash
   # View existing contexts
   docker context ls

   # Create rootless context
   docker context create rootless \
       --description "Rootless runtime socket" \
       --docker host="unix://$XDG_RUNTIME_DIR/docker.sock"

   # Switch to the context
   docker context use rootless

   # Verify it works
   docker ps
   ```

9. Docker Rootless requires no-bind-mounts mode

   Docker Rootless has a limitation with bind mounts that affects DDEV. You must enable [`no-bind-mounts` mode](https://docs.ddev.com/en/stable/users/configuration/config/#no_bind_mounts):

   ```bash
   ddev config global --no-bind-mounts=true
   ```

   **Why this is needed**:

   Docker Rootless sets ownership for bind mounts to `root` inside containers. This is a known issue:
   - [Mounting a volume with rootless always assigns ownership to root](https://github.com/moby/moby/issues/45919)
   - [Add ability to mount volume as user other than root](https://github.com/moby/moby/issues/2259)

   The `root` user inside the container maps to your host user, but many services will not run as root:
   - nginx runs as root without problems
   - MySQL/MariaDB need extra configuration
   - Apache and PostgreSQL will not run as root

   Podman Rootless fixes this with the `--userns=keep-id` option, which keeps user IDs the same. Docker Rootless does not have this option.

   The `no-bind-mounts` mode fixes this by using Mutagen for the `web` container.

## macOS

macOS users can use Podman and Podman Desktop, but setup has its own challenges. Docker Rootless is not available on macOS.

### Installing Podman

Install Podman using Homebrew:

```bash
brew install podman
```

Or install [Podman Desktop](https://podman-desktop.io/docs/installation/macos-install) if you prefer a GUI.

For more information, see the [official Podman installation guide for macOS](https://podman.io/docs/installation#macos) and [Podman tutorials](https://github.com/containers/podman/tree/main/docs/tutorials#readme).

### Installing Docker CLI

```bash
brew install docker
```

### Configuring Podman

After installing Podman, initialize and start the Podman machine:

```bash
podman machine init
podman machine start
```

The Podman machine will automatically configure the socket. Verify it's running:

```bash
podman info --format '{{.Host.RemoteSocket.Path}}'
```

If you have Docker CLI installed, you can create a context for Podman:

```bash
# Create Podman context
docker context create podman-rootless \
    --description "Podman (rootless)" \
    --docker host="unix://$(podman info --format '{{.Host.RemoteSocket.Path}}')"

# Switch to the new context
docker context use podman-rootless

# Verify it works
docker ps
```

Otherwise, set the `DOCKER_HOST` environment variable in your shell profile (`~/.zshrc` or `~/.bashrc`):

```bash
export DOCKER_HOST=unix://$(podman info --format '{{.Host.RemoteSocket.Path}}')
```

Podman rootless is unable to bind to privileged ports (<1024) by default on macOS. To fix this, configure DDEV to use unprivileged ports:

```bash
ddev config global --router-http-port=8080 --router-https-port=8443
```

## Windows

Windows users can use Podman Desktop, but setup has its own challenges. Docker Rootless is not available on traditional Windows (it works in WSL2, see the [Linux and WSL2](#linux-and-wsl2) section).

### Installing Podman

Install [Podman Desktop](https://podman-desktop.io/docs/installation/windows-install), which includes Podman.

Alternatively, install Podman directly following the [official Podman installation guide for Windows](https://podman.io/docs/installation#windows).

For more information, see the [Podman tutorials](https://github.com/containers/podman/tree/main/docs/tutorials#readme).

The setup and configuration follow similar patterns to the Linux/WSL2 setup, but with Podman Desktop managing the VM for you. Follow the [Linux and WSL2](#linux-and-wsl2) instructions.

## Running Multiple Container Runtimes

You can run Docker and Podman sockets simultaneously and switch between them using Docker contexts.

For example, here's a system with four active Docker contexts:

```bash
$ docker context ls
NAME                DESCRIPTION                               DOCKER ENDPOINT
default             Current DOCKER_HOST based configuration   unix:///var/run/docker.sock
podman              Podman (rootful)                          unix:///var/run/podman/podman.sock
podman-rootless *   Podman (rootless)                         unix:///run/user/1000/podman/podman.sock
rootless            Rootless runtime socket                   unix:///run/user/1000/docker.sock
```

Switch between them with:

```bash
docker context use <context-name>
```

**Note**: Running both Docker and Podman in rootful mode at the same time may cause network conflicts. See [Podman and Docker network problem on Fedora 41](https://github.com/containers/podman/issues/24486).

## Switching Runtimes with DDEV

DDEV automatically detects your active container runtime. To switch:

1. Stop DDEV projects:

   ```bash
   ddev poweroff
   ```

2. Switch Docker context or change the `DOCKER_HOST` environment variable

3. Start your project:

   ```bash
   ddev start
   ```

## Which Runtime Should You Choose?

### Runtime Comparison

| Feature                      | Standard Docker  | Docker Rootless                                    | Podman Rootful                   | Podman Rootless                          |
| ---------------------------- | ---------------- | -------------------------------------------------- | -------------------------------- | ---------------------------------------- |
| **Platform Support**         | All              | Linux, WSL2                                        | All                              | All                                      |
| **Rootless Daemon**          | No               | Yes                                                | No                               | Yes                                      |
| **Root Daemon**              | Yes              | No                                                 | Yes                              | No                                       |
| **Bind Mounts**              | Native           | File ownership is wrong, requires `no-bind-mounts` | Native                           | Native (with `--userns=keep-id`)         |
| **Performance**              | Excellent        | Moderate (because of `no-bind-mounts`)             | Moderate                         | Moderate                                 |
| **Privileged Ports (<1024)** | Works by default | Requires `sysctl` config                           | Works by default                 | Requires `sysctl` config or may not work |
| **Setup Complexity**         | Simple           | Moderate                                           | Moderate                         | Moderate                                 |
| **Maturity**                 | Most mature      | Experimental                                       | Experimental                     | Experimental                             |
| **Recommended For**          | Most users       | Docker users needing rootless                      | Organizations that forbid Docker | Organizations that forbid Docker         |

### Recommendations

**Use [standard Docker](https://docs.ddev.com/en/stable/users/install/docker-installation/) if:**

- You're comfortable with the most widely used container runtime
- You don't have rootless security requirements
- This is the recommended option for most users

**Use Podman Rootless if:**

- Your organization forbids Docker
- You want rootless security by default

**Use Podman Rootful if:**

- Your organization forbids Docker
- You want traditional container permissions without user namespace mapping overhead

**Use Docker Rootless if:**

- You need full Docker compatibility
- You want rootless security without changing runtimes

## Supporting DDEV Development

This Podman and Docker Rootless support was made possible by [community financial support](sustainability-for-ddev.md). The changes required hundreds of hours of development, code reviews, and testing.

DDEV relies on support from individuals and organizations who use it. With Podman rootless support, DDEV now works in corporate environments where Docker Desktop is not allowed. If you or your organization uses DDEV, please consider [sponsoring the project](https://github.com/sponsors/ddev) to help keep DDEV free and open source.

## Conclusion

DDEV now supports Podman and Docker Rootless as experimental features. This opens DDEV to corporate environments where traditional Docker is not allowed.

DDEV automatically detects your runtime and handles the complexity. Whether you choose Podman for rootless security, Docker Rootless for compatibility, or standard Docker, setup is straightforward.

---

_This article was edited and refined with assistance from Claude Code._
