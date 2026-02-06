---
title: "Podman and Docker Rootless in DDEV"
pubDate: 2026-02-03
#modifiedDate: 2026-02-03
summary: After years of development, DDEV now supports Podman and Docker Rootless for secure, rootless container development.
author: Stas Zhuk
featureImage:
  src: /img/blog/2026/02/ddev-podman-docker-rootless.png
  alt: DDEV logo with Podman and Docker logos
categories:
  - Announcements
  - Guides
---

**TL;DR**: DDEV supports Podman and Docker Rootless as of v1.25.0. Podman and Docker Rootless are a bit more trouble than the [recommended normal traditional Docker providers](https://docs.ddev.com/en/stable/users/install/docker-installation/) and have some serious trade-offs. With Podman on macOS you can't use the normal default ports 80 and 443. On Linux Docker Rootless you can't bind-mount directories, so the entire project has to be mutagen-synced. But Podman Rootless on Linux is pretty solid.

Jump to setup instructions: [Linux/WSL2](#key-aim-linux-and-wsl2-users) · [macOS](#macos) · [Windows](#windows)

**Note**: This support is experimental. Report issues on the [DDEV issue tracker](https://github.com/ddev/ddev/issues).

## Table of Contents

## Understanding Docker and Podman

### Open Source Alternatives to Docker Desktop

A common misconception is that Podman is the only open-source alternative to Docker Desktop. This is not true. There are several fully open-source alternatives available on every platform:

- **[Docker Engine](https://docs.docker.com/engine/)** - The original open-source Docker, free to use
- **[Rancher Desktop](https://rancherdesktop.io/)** - Open source container management with choice of dockerd or containerd
- **[Lima](https://lima-vm.io/)** - Linux virtual machines
- **[Colima](https://github.com/abiosoft/colima)** - Container runtime with minimal setup (built on Lima)
- **[Podman Desktop](https://podman-desktop.io/)** - GUI for Podman with Docker compatibility

All of these work with DDEV. The main reason to choose Podman specifically is if your organization forbids Docker entirely or if you want rootless operation by default.

### Why Choose Podman?

Podman is rootless by default, making it the simplest option for secure container environments. Traditional Docker requires root daemons, which can be a security concern in corporate environments with strict policies. (Note that DDEV is targeted at local development, where there are few risks of specialized attacks using this vector anyway.)

Podman's rootless approach runs the daemon without elevated privileges:

- No root daemon on the system, only a rootless daemon in userspace
- Container processes cannot access root-owned files
- Reduced attack surface if a container is compromised

While DDEV already runs containers as unprivileged users, Podman eliminates the need for a root daemon entirely.

### Why Choose Docker Rootless?

Docker Rootless provides the same security benefits as Podman Rootless while maintaining full Docker compatibility. It runs the daemon without root privileges, offering:

- No root daemon on the system
- Container processes cannot access root-owned files
- Reduced attack surface if a container is compromised

Unlike Podman which is rootless by default, Docker Rootless requires special setup to enable. Choose this option if you want to stay with Docker but need rootless security.

## Key aim: Linux and WSL2 users

The primary focus for this article is Linux and WSL2 (we have test coverage for Linux only for now). Most features and configurations are well-tested on these platforms.

### Do You Need an Alternative to Docker?

Before diving into setup, consider whether you need an alternative to traditional Docker:

| Runtime                | Why would you do this?                               | Key trade-offs                                                                   | Performance                 | Setup    | Recommendation                                   |
| ---------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------- | -------- | ------------------------------------------------ |
| **Traditional Docker** | Standard, widely-used option                         | None                                                                             | Excellent                   | Simple   | **Recommended for most users**                   |
| **Docker Rootless**    | Security requirement for rootless daemon             | Must use `--no-bind-mounts` (everything via Mutagen), can't use default workflow | Moderate (Mutagen overhead) | Moderate | Only if rootless security is required            |
| **Podman Rootful**     | Organization forbids Docker                          | Slower than Docker, different behavior                                           | Slower than Docker          | Moderate | Only if Docker not allowed                       |
| **Podman Rootless**    | Organization forbids Docker + want rootless security | May need sysctl changes for ports <1024, slower than Docker                      | Slower than Docker          | Moderate | Only if Docker not allowed and rootless required |

**Bottom line**: Stick with traditional Docker unless organizational policy or security requirements force you to use an alternative. The alternatives work, but have significant trade-offs.

### Installing Podman

Install Podman using your distribution's package manager. See the [official Podman installation guide for Linux](https://podman.io/docs/installation#installing-on-linux).

```bash
# Ubuntu/Debian
sudo apt-get update && sudo apt-get install podman
# Fedora
sudo dnf install --refresh podman
```

**Note:** Some distributions may have outdated Podman versions. This is the case with Ubuntu 24.04, which has Podman 4.9.3. We require Podman 5.0 or newer for the best experience, because we didn't have success with Podman 4.x in our automated tests, but you can still use Podman 4.x ignoring the warning on `ddev start`.

You can also install [Podman Desktop](https://podman-desktop.io/docs/installation/linux-install) if you prefer a GUI.

For more information, see the [Podman tutorials](https://github.com/containers/podman/tree/main/docs/tutorials#readme).

### Installing Docker CLI

Podman provides a Docker-compatible API, which means you can use the Docker CLI as a frontend for Podman. This approach offers several benefits:

- Use familiar `docker` commands while Podman handles the actual container operations
- Switch between different container runtimes using Docker contexts
- Maintain compatibility with scripts and tools that expect the `docker` command

1. [Set up Docker's repository](https://docs.docker.com/engine/install/)
2. Install only the CLI:

   ```bash
   # Ubuntu/Debian
   sudo apt-get update && sudo apt-get install docker-ce-cli
   # Fedora
   sudo dnf install --refresh docker-ce-cli
   ```

   **Note:** You don't need to install `docker-ce` (the Docker engine).

### Configuring Podman Rootless

This is the recommended configuration for most users.

1. Prepare the system by configuring subuid and subgid ranges and enabling userns options, see the [Arch Linux Wiki](https://wiki.archlinux.org/title/Podman#Rootless_Podman) for details:

   ```bash
   # Add subuid and subgid ranges if they don't exist for the current user
   grep "^$(id -un):\|^$(id -u):" /etc/subuid >/dev/null 2>&1 || sudo usermod --add-subuids 100000-165535 $(whoami)
   grep "^$(id -un):\|^$(id -u):" /etc/subgid >/dev/null 2>&1 || sudo usermod --add-subgids 100000-165535 $(whoami)
   # Propagate changes to subuid and subgid
   podman system migrate
   # Debian requires setting unprivileged_userns_clone
   if [ -f /proc/sys/kernel/unprivileged_userns_clone ]; then
     if [ "1" != "$(cat /proc/sys/kernel/unprivileged_userns_clone)" ]; then
       echo 'kernel.unprivileged_userns_clone=1' | sudo tee -a /etc/sysctl.d/60-rootless.conf
       sudo sysctl --system
     fi
   fi
   # Fedora requires setting max_user_namespaces
   if [ -f /proc/sys/user/max_user_namespaces ]; then
     if [ "0" = "$(cat /proc/sys/user/max_user_namespaces)" ]; then
       echo 'user.max_user_namespaces=28633' | sudo tee -a /etc/sysctl.d/60-rootless.conf
       sudo sysctl --system
     fi
   fi
   # Allow privileged port access if needed
   if [ -f /proc/sys/net/ipv4/ip_unprivileged_port_start ]; then
     if [ "1024" = "$(cat /proc/sys/net/ipv4/ip_unprivileged_port_start)" ]; then
       echo 'net.ipv4.ip_unprivileged_port_start=0' | sudo tee -a /etc/sysctl.d/60-rootless.conf
       sudo sysctl --system
     fi
   fi
   ```

2. Enable the Podman socket and verify it's running ([Podman socket activation documentation](https://github.com/containers/podman/blob/main/docs/tutorials/socket_activation.md)):

   ```bash
   systemctl --user enable --now podman.socket

   # You should see `/run/user/1000/podman/podman.sock` (the number may vary):
   ls $XDG_RUNTIME_DIR/podman/podman.sock

   # You can also check the socket path with:
   podman info --format '{{.Host.RemoteSocket.Path}}'
   ```

3. Configure Docker API to use Podman ([Podman rootless tutorial](https://github.com/containers/podman/blob/main/docs/tutorials/rootless_tutorial.md)):

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

4. Proceed with [DDEV installation](https://docs.ddev.com/en/stable/users/install/ddev-installation/#ddev-installation-linux).

### Podman Rootless Performance Optimization

Podman Rootless is significantly slower than Docker. See these resources:

- [Podman run/build performance issues](https://github.com/containers/podman/issues/13226)
- [Podman Performance documentation](https://github.com/containers/podman/blob/main/docs/tutorials/performance.md)

To improve performance, install `fuse-overlayfs` and configure the overlay storage driver:

**Install fuse-overlayfs**:

```bash
# Ubuntu/Debian
sudo apt-get update && sudo apt-get install fuse-overlayfs
# Fedora
sudo dnf install --refresh fuse-overlayfs
```

**Configure storage**:

```bash
mkdir -p ~/.config/containers
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

### Configuring Podman Rootful

Rootless Podman is recommended. Only use rootful Podman if your setup specifically requires it.

To configure rootful Podman:

1. Create a `podman` group (`sudo groupadd podman`) and add your user to it (`sudo usermod -aG podman $USER`).
2. Configure [group permissions](https://github.com/podman-desktop/podman-desktop/issues/2861#issuecomment-1596192247) to allow non-root users to access the socket
3. Activate the socket with `sudo systemctl enable --now podman.socket`
4. Create a Docker context `docker context create podman-rootful --description "Podman (root)" --docker host="unix:///var/run/podman/podman.sock"`
5. Switch to the new context with `docker context use podman-rootful`

### Setting Up Docker Rootless

Docker Rootless on Linux offers rootless security with full Docker compatibility.

1. Follow the official [Docker Rootless installation guide](https://docs.docker.com/engine/security/rootless/).

2. Configure system:

   ```bash
   # Allow privileged port access if needed
   if [ -f /proc/sys/net/ipv4/ip_unprivileged_port_start ]; then
     if [ "1024" = "$(cat /proc/sys/net/ipv4/ip_unprivileged_port_start)" ]; then
       echo 'net.ipv4.ip_unprivileged_port_start=0' | sudo tee -a /etc/sysctl.d/60-rootless.conf
       sudo sysctl --system
     fi
   fi
   # Allow loopback connections (needed for working Xdebug)
   # See https://github.com/moby/moby/issues/47684#issuecomment-2166149845
   mkdir -p ~/.config/systemd/user/docker.service.d
   cat << 'EOF' > ~/.config/systemd/user/docker.service.d/override.conf
   [Service]
   Environment="DOCKERD_ROOTLESS_ROOTLESSKIT_DISABLE_HOST_LOOPBACK=false"
   EOF
   ```

3. Enable the Docker socket, and verify it's running:

   ```bash
   systemctl --user enable --now docker.socket

   # You should see `/run/user/1000/docker.sock` (the number may vary):
   ls $XDG_RUNTIME_DIR/docker.sock
   ```

4. Configure Docker API to use Docker rootless:

   ```bash
   # View existing contexts
   docker context ls

   # Create rootless context if it doesn't exist
   docker context inspect rootless >/dev/null 2>&1 || \
       docker context create rootless \
           --description "Rootless runtime socket" \
           --docker host="unix://$XDG_RUNTIME_DIR/docker.sock"

   # Switch to the context
   docker context use rootless

   # Verify it works
   docker ps
   ```

5. Proceed with [DDEV installation](https://docs.ddev.com/en/stable/users/install/ddev-installation/#ddev-installation-linux).

6. Docker Rootless requires no-bind-mounts mode

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

### Do You Need an Alternative to Docker?

| Runtime                | Why would you do this?                        | Key trade-offs                                                           | Performance        | Setup    | Recommendation                 |
| ---------------------- | --------------------------------------------- | ------------------------------------------------------------------------ | ------------------ | -------- | ------------------------------ |
| **Traditional Docker** | Standard, widely-used option                  | None                                                                     | Excellent          | Simple   | **Recommended for most users** |
| **Podman**             | Avoid Docker entirely (organizational policy) | Cannot use ports 80/443 (must use 8080/8443 instead), different behavior | Slower than Docker | Moderate | Only if Docker not allowed     |

**Bottom line**: Use traditional Docker (OrbStack, Docker Desktop, Lima, Colima, or Rancher Desktop) unless your organization forbids it. The inability to use standard ports 80/443 with Podman creates a significantly different development experience.

### Installing Podman

Install Podman using Homebrew:

```bash
brew install podman
```

Or install [Podman Desktop](https://podman-desktop.io/docs/installation/macos-install) if you prefer a GUI.

For more information, see the [official Podman installation guide for macOS](https://podman.io/docs/installation#macos) and [Podman tutorials](https://github.com/containers/podman/tree/main/docs/tutorials#readme).

### Installing Docker CLI

Podman provides a Docker-compatible API, which means you can use the Docker CLI as a frontend for Podman. This approach offers several benefits:

- Use familiar `docker` commands while Podman handles the actual container operations
- Switch between different container runtimes using Docker contexts
- Maintain compatibility with scripts and tools that expect the `docker` command

```bash
brew install docker
```

### Configuring Podman

1. Handle privileged ports (<1024):

   **Important**: Podman on macOS cannot bind to privileged ports (80/443). You must configure DDEV to use unprivileged ports:

   ```bash
   ddev config global --router-http-port=8080 \
       --router-https-port=8443
   ```

   This means your DDEV projects will be accessible at `https://yourproject.ddev.site:8443` instead of the standard `https://yourproject.ddev.site`.

   Note: switching to rootful mode with `podman machine set --rootful --user-mode-networking=false` doesn't help with privileged ports because the `--user-mode-networking=false` flag is [not supported on macOS](https://github.com/containers/podman/issues/26780) (it's only available for WSL).

2. Initialize and start the Podman machine:

   ```bash
   # check `podman machine init -h` for more options
   podman machine init --memory 8192
   podman machine start
   ```

   Check for the Podman socket path using `podman machine inspect`:

   ```text
   ~ % podman machine inspect
   ...
      "ConnectionInfo": {
         "PodmanSocket": {
              "Path": "/var/folders/z5/lhpyjf2n7xj2djl0bw_7kb3m0000gn/T/podman/podman-machine-default-api.sock"
         },
         "PodmanPipe": null
      },
   ...
   ```

3. Configure Docker CLI to use Podman. Choose one of two approaches:

   **Option 1: Create a Docker context** (recommended, more flexible):

   ```bash
   # Create Podman context (path to socket may vary)
   # Use the socket path from `podman machine inspect` output
   docker context create podman-rootless \
       --description "Podman (rootless)" \
       --docker host="unix:///var/folders/z5/lhpyjf2n7xj2djl0bw_7kb3m0000gn/T/podman/podman-machine-default-api.sock"

   # Switch to the new context
   docker context use podman-rootless

   # Verify it works
   docker ps
   ```

   This approach uses Docker contexts to switch between different container runtimes without modifying system sockets. This is more flexible if you want to use multiple Docker providers.

   **Option 2: Use the default Docker socket** (simpler, but less flexible):

   ```bash
   # Install podman-mac-helper
   # Use the command from `podman machine start` output
   sudo /opt/homebrew/Cellar/podman/5.7.1/bin/podman-mac-helper install
   podman machine stop
   podman machine start

   # Verify it works
   docker ps
   ```

4. Proceed with [DDEV installation](https://docs.ddev.com/en/stable/users/install/ddev-installation/).

## Windows

Windows users can use Podman Desktop, but setup has its own challenges. Docker Rootless is not available on traditional Windows (it works in WSL2, see the [Linux and WSL2](#key-aim-linux-and-wsl2-users) section).

### Do You Need an Alternative to Docker?

| Runtime                | Why would you do this?                        | Key trade-offs                             | Performance        | Setup    | Recommendation                 |
| ---------------------- | --------------------------------------------- | ------------------------------------------ | ------------------ | -------- | ------------------------------ |
| **Traditional Docker** | Standard, widely-used option                  | None                                       | Excellent          | Simple   | **Recommended for most users** |
| **Podman**             | Avoid Docker entirely (organizational policy) | Different behavior, less mature on Windows | Slower than Docker | Moderate | Only if Docker not allowed     |

**Bottom line**: Use traditional Docker (Docker Desktop or alternatives) unless your organization forbids it. Podman on Windows works but is less mature than on Linux.

### Installing Podman

Install [Podman Desktop](https://podman-desktop.io/docs/installation/windows-install), which includes Podman.

Alternatively, install Podman directly following the [official Podman installation guide for Windows](https://podman.io/docs/installation#windows).

For more information, see the [Podman tutorials](https://github.com/containers/podman/tree/main/docs/tutorials#readme).

The setup and configuration follow similar patterns to the Linux/WSL2 setup, but with Podman Desktop managing the VM for you. Follow the [Linux and WSL2](#key-aim-linux-and-wsl2-users) instructions.

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
docker context use "<context-name>"
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

| Feature                           | Standard Docker  | Docker Rootless                        | Podman Rootful                   | Podman Rootless                          |
| --------------------------------- | ---------------- | -------------------------------------- | -------------------------------- | ---------------------------------------- |
| **Platform Support**              | All              | Linux, WSL2                            | All                              | All                                      |
| **Rootless Daemon**               | ❌               | ✅                                     | ❌                               | ✅                                       |
| **Has automated testing in DDEV** | ✅               | ✅                                     | ❌                               | ✅                                       |
| **Mutagen**                       | ✅               | ✅                                     | ✅                               | ✅                                       |
| **Bind Mounts**                   | ✅               | ❌, requires `no-bind-mounts`          | ✅                               | ✅ (with `--userns=keep-id`)             |
| **Performance**                   | Excellent        | Moderate (because of `no-bind-mounts`) | Slow compared to Docker          | Slow compared to Docker                  |
| **Privileged Ports (<1024)**      | Works by default | Requires `sysctl` config               | Works by default                 | Requires `sysctl` config or may not work |
| **Setup Complexity**              | Simple           | Moderate                               | Moderate                         | Moderate                                 |
| **Maturity**                      | Most mature      | Experimental                           | Experimental                     | Experimental                             |
| **Recommended For**               | Most users       | Docker users needing rootless          | Organizations that forbid Docker | Organizations that forbid Docker         |

### Recommendations

**Use of the many [standard Docker providers](https://docs.ddev.com/en/stable/users/install/docker-installation/) if:**

- You're comfortable with the most widely used container runtime
- You don't have rootless security requirements

_This is the recommended option for the vast majority of users._

**Use Podman Rootless if:**

- Your organization forbids Docker
- You want rootless security by default

**Use Podman Rootful if:**

- Your organization forbids Docker
- You want traditional container permissions without user namespace mapping overhead

**Use Docker Rootless if:**

- You need full Docker compatibility
- You want rootless security without changing runtimes

## The Journey to Podman Support

Supporting Podman and Docker Rootless required major changes to DDEV's Docker integration:

- **Switched to official Docker client library** ([#5787](https://github.com/ddev/ddev/pull/5787)): DDEV previously used an unofficial library to communicate with the Docker API. We migrated to Docker's official client library for better compatibility and long-term support.
- **Replaced direct CLI calls with proper API usage** ([#7189](https://github.com/ddev/ddev/pull/7189)): DDEV used to call `docker context inspect` directly, which doesn't work with Podman. We switched to using the `docker/cli` library to handle context operations properly.
- **Modernized SSH authentication** ([#7511](https://github.com/ddev/ddev/pull/7511)): The `ddev auth ssh` command used to call `docker run` directly. We rewrote it to use the Docker API, making it compatible with alternative runtimes.
- **Optimized API call performance** ([#7587](https://github.com/ddev/ddev/pull/7587)): DDEV's Docker API logic was inefficient, making redundant calls without caching. We restructured the code to cache data and reduce unnecessary API requests.
- **Removed legacy docker-compose features** ([#7642](https://github.com/ddev/ddev/pull/7642)): Podman refuses to work with deprecated `links` and `external_links` directives in `docker-compose` files. We removed these legacy features and modernized DDEV's compose file generation.
- **Added Podman and Docker Rootless support** ([#7702](https://github.com/ddev/ddev/pull/7702)): DDEV now detects and supports Podman (rootful and rootless) and Docker Rootless. We added handling for Podman-specific limitations and enabled rootless environments to work without root privileges.
- **Added support for SELinux environments** ([#7939](https://github.com/ddev/ddev/pull/7939)): Podman has SELinux enabled by default on Fedora and some other distributions. We added support for SELinux by configuring volume mounts with the appropriate labels.

These changes enabled Podman and Docker Rootless support. These features were developed together because Podman's primary use case is rootless operation. Once DDEV could handle rootless runtimes, supporting both became natural. They share the same security model and similar technical constraints.

## Supporting DDEV Development

This Podman and Docker Rootless support was made possible by [community financial support](sustainability-for-ddev.md). The changes required hundreds of hours of development, code reviews, and testing.

DDEV relies on support from individuals and organizations who use it. With Podman rootless support, DDEV now works in corporate environments where Docker Desktop is not allowed. If you or your organization uses DDEV, please consider [sponsoring the project](https://github.com/sponsors/ddev) to help keep DDEV free and open source.

## Conclusion

DDEV now supports Podman and Docker Rootless as experimental features. This opens DDEV to corporate environments where traditional Docker is not allowed.

DDEV automatically detects your runtime and handles the complexity. Whether you choose Podman for rootless security, Docker Rootless for compatibility, or standard Docker, setup is straightforward.

---

_This article was edited and refined with assistance from Claude Code._
