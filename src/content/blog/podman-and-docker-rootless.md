---
title: "Podman and Docker Rootless in DDEV"
pubDate: 2025-12-01
#modifiedDate: 2025-12-01
summary: After years of development, DDEV now supports Podman and Docker Rootless for secure, rootless container development.
author: Stas Zhuk
featureImage:
  src: /img/blog/2025/12/ddev-podman-docker-rootless.png
  alt: DDEV logo with Podman and Docker logos
categories:
  - Announcements
  - Guides
---

The DDEV community has requested Podman and Docker Rootless support for years. This support is now available as an experimental feature. It allows DDEV to work in corporate environments where Docker Desktop is not allowed due to security policies or licensing restrictions.

This required major changes to how DDEV works with container runtimes. We rebuilt core infrastructure and fixed compatibility issues that existed since DDEV's start.

**Note**: Podman and Docker Rootless support is experimental. While it works for most use cases, you may encounter issues. Please report any problems on the [DDEV issue tracker](https://github.com/ddev/ddev/issues).

## Table of Contents

- [The Journey to Podman Support](#the-journey-to-podmansupport)
- [Understanding Docker and Podman](#understanding-docker-andpodman)
- [Installing Podman](#installingpodman)
- [Configuring Podman for DDEV](#configuring-podman-forddev)
  - [Podman Rootless on Linux](#podman-rootless-onlinux)
  - [Podman Rootful on Linux](#podman-rootful-onlinux)
  - [Common Podman Issues](#common-podmanissues)
  - [Podman Rootless Performance Optimization](#podman-rootless-performanceoptimization)
- [Setting Up Docker Rootless with DDEV](#setting-up-docker-rootless-withddev)
- [Running Multiple Container Runtimes](#running-multiple-containerruntimes)
- [Switching Runtimes with DDEV](#switching-runtimes-withddev)
- [Which Runtime Should You Choose?](#which-runtime-should-youchoose)
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

These changes enabled Podman and Docker Rootless support.

## Understanding Docker and Podman

### Why Choose Rootless?

Running containers without root privileges is more secure. Traditional Docker and rootful Podman need elevated privileges, which creates security risks in corporate environments where strict security policies apply.

Rootless alternatives (Podman Rootless and Docker Rootless) run containers without root access. This means:

- No root daemon running on your system
- Container processes cannot access root-owned files
- Reduced attack surface if a container is compromised

Podman is rootless by default. Docker Rootless requires special setup.

### The Socket Requirement for DDEV

DDEV needs a running Podman socket. The socket lets DDEV use the Docker API to talk to Podman, so DDEV can support both Docker and Podman with the same code.

## Installing Podman

### Podman Installation Options

Podman can be installed with or without a GUI:

**Without GUI**:

- [macOS](https://podman.io/docs/installation#macos)
- [Windows](https://podman.io/docs/installation#windows)
- [Linux](https://podman.io/docs/installation#installing-on-linux)

**With Podman Desktop GUI**:

- [macOS](https://podman-desktop.io/docs/installation/macos-install)
- [Windows](https://podman-desktop.io/docs/installation/windows-install)
- [Linux](https://podman-desktop.io/docs/installation/linux-install)

For more information, see the [Podman tutorials](https://github.com/containers/podman/tree/main/docs/tutorials#readme).

### Installing Docker CLI

DDEV requires the `docker` CLI client for `ddev utility test` (this may change in the future). If you're using Podman without Docker, install only the CLI:

**macOS**:

```bash
brew install docker
```

**Linux (Ubuntu/Debian example)**:

1. [Set up Docker's apt repository](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)
2. Install only the CLI:

   ```bash
   sudo apt-get install docker-ce-cli
   ```

   Note: You don't need to install `docker-ce` (the Docker engine).

## Configuring Podman for DDEV

After installing Podman, enable the API socket so DDEV can connect.

### Podman Rootless on Linux

This is the recommended configuration for most users.

1. Enable and start the Podman socket:

   ```bash
   systemctl --user enable --now podman.socket
   ```

2. Verify the socket is running:

   ```bash
   ls $XDG_RUNTIME_DIR/podman/podman.sock
   ```

   You should see `/run/user/1000/podman/podman.sock` (the number may vary).

   You can also check the socket path with:

   ```bash
   podman info --format '{{.Host.RemoteSocket.Path}}'
   ```

3. Configure Docker to use Podman. Choose one of these methods:

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

### Podman Rootful on Linux

Rootful Podman requires configuring user group permissions, similar to [Docker's Linux post-installation steps](https://docs.docker.com/engine/install/linux-postinstall/).

1. Create the `podman` group:

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

7. Configure Docker to use Podman. Choose one of these methods:

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

Based on testing with Arch Linux, here are solutions to common problems. These issues are documented in the [Podman rootless tutorial](https://github.com/containers/podman/blob/main/docs/tutorials/rootless_tutorial.md) and [Arch Wiki](https://wiki.archlinux.org/title/Podman).

**Issue**: UID/GID mapping errors when starting DDEV:

> unable to copy from source docker://ddev/ddev-utilities:latest: copying system image from manifest list: writing blob: adding layer with blob "sha256:43c4264...": unpacking failed (error: exit status 1; output: potentially insufficient UIDs or GIDs available in user namespace (requested 0:42 for /etc/shadow): Check /etc/subuid and /etc/subgid if configured locally and run "podman system migrate": lchown /etc/shadow: invalid argument)

**Solution**: Configure subuid and subgid mappings:

```bash
# Add subuid and subgid ranges
sudo usermod --add-subuids 100000-165535 --add-subgids 100000-165535 $(whoami)

# Migrate existing Podman data
podman system migrate
```

See the [Arch Wiki Podman page](https://wiki.archlinux.org/title/Podman#Set_subuid_and_subgid) for more details.

**Issue**: Permission denied when binding to privileged ports:

> Error response from daemon: rootlessport cannot expose privileged port 80, you can add 'net.ipv4.ip_unprivileged_port_start=80' to /etc/sysctl.conf (currently 1024), or choose a larger port number (>= 1024): listen tcp 127.0.0.1:80: bind: permission denied

**Solution**: Allow unprivileged port binding:

```bash
# Create config
echo 'net.ipv4.ip_unprivileged_port_start=0' | sudo tee -a /etc/sysctl.d/60-rootless.conf

# Apply without rebooting
sudo sysctl -p /etc/sysctl.d/60-rootless.conf
```

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
# Arch Linux
sudo pacman -S fuse-overlayfs
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

## Setting Up Docker Rootless with DDEV

Docker Rootless offers rootless security with full Docker compatibility.

### Installation

1. Follow the official [Docker Rootless installation guide](https://docs.docker.com/engine/security/rootless/).

2. For daemon configuration, see the [Docker daemon documentation](https://docs.docker.com/engine/daemon/).

3. Configure system for privileged port access:

   ```bash
   # Allow binding to ports below 1024
   echo 'net.ipv4.ip_unprivileged_port_start=0' | sudo tee -a /etc/sysctl.d/60-rootless.conf

   # Apply without rebooting
   sudo sysctl -p /etc/sysctl.d/60-rootless.conf
   ```

4. Enable and start the Docker socket:

   ```bash
   systemctl --user enable --now docker.socket
   ```

5. Verify the socket:

   ```bash
   ls $XDG_RUNTIME_DIR/docker.sock
   ```

   You should see `/run/user/1000/docker.sock` (the number may vary).

6. Configure Docker context (if needed):

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

7. Docker Rootless requires no-bind-mounts mode

   Docker Rootless has a limitation with bind mounts that affects DDEV. You must enable `no-bind-mounts` mode:

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

**Use Podman Rootless if:**

- Your organization forbids Docker
- You want rootless security by default

**Use Podman Rootful if:**

- Your organization forbids Docker
- You want traditional container permissions without user namespace mapping overhead

**Use Docker Rootless if:**

- You need full Docker compatibility
- You want rootless security without changing runtimes

**Use standard Docker if:**

- You're comfortable with the most widely used container runtime
- You don't have rootless security requirements

## Supporting DDEV Development

This Podman and Docker Rootless support was made possible by [community financial support](sustainability-for-ddev.md). The changes required hundreds of hours of development, code reviews, and testing.

DDEV relies on support from individuals and organizations who use it. With Podman rootless support, DDEV now works in corporate environments where Docker Desktop is not allowed. If you or your organization uses DDEV, please consider [sponsoring the project](https://github.com/sponsors/ddev) to help keep DDEV free and open source.

## Conclusion

DDEV now supports Podman and Docker Rootless as experimental features. This opens DDEV to corporate environments where traditional Docker is not allowed.

DDEV automatically detects your runtime and handles the complexity. Whether you choose Podman for rootless security, Docker Rootless for compatibility, or standard Docker, setup is straightforward.

---

_This article was edited and refined with assistance from Claude Code._
