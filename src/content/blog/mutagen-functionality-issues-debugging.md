---
title: "Mutagen in DDEV: Functionality, Issues, and Debugging"
pubDate: 2026-02-01
summary: Understanding Mutagen's performance benefits, common issues, and how to debug sync problems in DDEV.
author: Randy Fay
featureImage:
  src: /img/blog/2026/01/mutagen-postal-sync.png
  alt: Friendly illustration of how Mutagen sync works between host and container filesystems
categories:
  - Training
  - TechNotes
  - Performance
---

[Mutagen](https://mutagen.io) has been a part of DDEV for years, providing dramatic performance improvements for macOS and traditional Windows users. It's enabled by default on these platforms, but understanding how it works, what can go wrong, and how to debug issues is key to getting the most out of DDEV.

## Contributor Training Video

See the January 22, 2026 Contributor Training based on this blog:

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/YbTlX63GZrk?si=hFPY_sgkganNFe5u" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

See the [slides for the training video](https://rfay.github.io/mutagen-fundamentals-and-troubleshooting-presentation/).

## What Mutagen Does

Mutagen is an asynchronous file synchronization tool that decouples in-container reads and writes from reads and writes on the host machine. Each filesystem enjoys near-native speed because neither is stuck waiting on the other.

Traditional Docker bind-mounts check every file access against the file on the host. On macOS and Windows, Docker's implementation of these checks is not performant. Mutagen solves this by maintaining a cached copy of your project files in a Docker volume, syncing changes between host and container asynchronously.

### Mostly for PHP

The primary target of Mutagen syncing is PHP files. These were the fundamental problem with Docker as the number of files in a Docker-hosted PHP website grew into the Composer generation with tens of thousands of files, so `php-fpm` had to open so very many of them all at once. Now with DDEV on macOS using Mutagen, `php-fpm` is opening files that are just on its local Linux filesystem, not opening ten thousand files that all have to be verified on the host.

### Webserving Performance Improvement

Mutagen has made many cohorts of developers very, very happy with the webserving performance. One dev said "the first time I tried it I cried."

### Filesystem Notifications

Mutagen supports filesystem notifications (`inotify`/`fsnotify`), so file-watchers on both the host and inside the container are notified when changes occur. This is a significant advantage for development tools that would otherwise need to poll for changes.

## How Mutagen Works in DDEV

When Mutagen is enabled, DDEV:

1. Mounts a Docker volume onto `/var/www` inside the web container
2. A Linux Mutagen daemon is installed inside the web container
3. A host-side Mutagen daemon is started by DDEV
4. The two daemons keep each other up-to-date with changes on either side

### Lifecycle

- **`ddev start`**: Starts the Mutagen daemon on the host if not running, creates or resumes sync session
- **`ddev stop`**: Flushes sync session to ensure consistency, then pauses it
- **`ddev composer`**: Triggers synchronous flush after completion to sync massive filesystem changes
- **`ddev mutagen reset`**: Removes the Docker volume and the sync session will then be recreated from scratch (from the host-side contents) on `ddev start`.

### Upload Directories

DDEV automatically excludes user-generated files in `upload_dirs` from Mutagen syncing, using bind-mounts instead. For most CMS types, this is configured automatically, for example:

- Drupal: `sites/default/files`
- WordPress: `wp-content/uploads`
- TYPO3: `fileadmin`, `uploads`

If your project has non-standard locations, override defaults by setting `upload_dirs` in `.ddev/config.yaml`.

We do note that `upload_dirs` is not an adequate description for this behavior. It was originally intended for user-generated files, but now is used for heavy directories like `node_modules`, etc.

## Common Issues and Caveats

### Initial Sync Time

The first-time Mutagen sync takes 5-60 seconds depending on project size. A Magento 2 site with sample data might take 48 seconds initially, 12 seconds on subsequent starts. If sync takes longer than a minute, you're likely syncing large files or directories unnecessarily.

### Large `node_modules` Directories

Frontend build tools create massive `node_modules` directories that slow Mutagen sync significantly. **Solution**: Add `node_modules` to `upload_dirs`:

```yaml
upload_dirs: #upload_dirs entries are relative to docroot
  - sites/default/files # Keep existing CMS defaults
  - ../node_modules # Exclude from Mutagen
```

Then run `ddev restart`. The directory remains available in the container via Docker bind-mount.

### File Changes When DDEV is Stopped

If you change files (checking out branches, running `git pull`, deleting files) while DDEV is stopped, Mutagen has no awareness of these changes. When you start again, it may restore old files from the volume.

**Solution**: Run `ddev mutagen reset` before restarting if you've made significant changes while stopped. That removes the volume so everything comes first from the host side in a fresh sync.

### Simultaneous Changes

If the same file changes on both host and container while out of sync, conflicts can occur. This is quite rare but possible with:

- Scripts running simultaneously on host and in container
- Massive branch changes
- Large `npm install` or `yarn install` operations

**Best practices**:

- Do Git operations on the host, not in the container
- Use `ddev composer` for most composer operations
- Run `ddev mutagen sync` after major Git branch changes
- Run `ddev mutagen sync` after manual Composer operations done inside the container

### Disk Space Considerations

Mutagen increases disk usage because project code exists both on your computer and inside a Docker volume. The `upload_dirs` directories are excluded to mitigate this.

Watch for volumes larger than 5GB (warning) or 10GB (critical). Use `ddev utility mutagen-diagnose --all` to check all projects.

## Debugging Mutagen Issues

### The New `ddev utility mutagen-diagnose` Command

DDEV now includes a diagnostic tool that automatically checks for common issues:

```bash
ddev utility mutagen-diagnose
```

This command analyzes:

- **Volume sizes**: Warns if >5GB, critical if >10GB
- **Upload directories configuration**: Checks if properly configured for your CMS
- **Sync session status**: Reports problems with the sync session
- **Large directories**: Identifies `node_modules` and other large directories being synced
- **Ignore patterns**: Validates Mutagen exclusion configuration

Use `--all` flag to analyze all Mutagen volumes system-wide:

```bash
ddev utility mutagen-diagnose --all
```

The diagnostic provides actionable recommendations like:

```
⚠ 3 node_modules directories exist but are not excluded from sync (can cause slow sync)
  → Add to .ddev/config.yaml:
    upload_dirs:
      - sites/default/files
      - web/themes/custom/mytheme/node_modules
      - web/themes/contrib/bootstrap/node_modules
      - app/node_modules
  → Then run: ddev restart
```

### Debugging Long Startup Times

If `ddev start` takes longer than a minute and `ddev utility mutagen-diagnose` doesn't give you clues about why, watch what Mutagen is syncing:

```bash
ddev mutagen reset  # Start from scratch
ddev start
```

In another terminal:

```bash
while true; do ddev mutagen st -l | grep "^Current"; sleep 1; done
```

This shows which files Mutagen is working on:

```
Current file: vendor/bin/large-binary (306 MB/5.2 GB)
Current file: vendor/bin/large-binary (687 MB/5.2 GB)
Current file: vendor/bin/large-binary (1.1 GB/5.2 GB)
```

Add problem directories to `upload_dirs` or move them to `.tarballs` (automatically excluded).

### Monitoring Sync Activity

Watch real-time sync activity:

```bash
ddev mutagen monitor
```

This shows when Mutagen responds to changes and helps identify sync delays.

### Manual Sync Control

Force an explicit sync:

```bash
ddev mutagen sync
```

Check sync status:

```bash
ddev mutagen status
```

View detailed status:

```bash
ddev mutagen status -l
```

### Troubleshooting Steps

1. **Verify that your project works without Mutagen**:

   ```bash
   ddev config --performance-mode=none && ddev restart
   ```

2. **Run diagnostics**:

   ```bash
   ddev utility mutagen-diagnose
   ```

3. **Reset to clean `.ddev/mutagen/mutagen.yml`**:

   ```bash
   # Backup customizations first
   mv .ddev/mutagen/mutagen.yml .ddev/mutagen/mutagen.yml.bak
   ddev restart
   ```

4. **Reset Mutagen volume and recreate it**:

   ```bash
   ddev mutagen reset
   ddev restart
   ```

5. **Enable debug output**:

   ```bash
   DDEV_DEBUG=true ddev start
   ```

6. **View Mutagen logs**:

   ```bash
   ddev mutagen logs
   ```

7. **Restart Mutagen daemon**:
   ```bash
   ddev utility mutagen daemon stop
   ddev utility mutagen daemon start
   ```

## Advanced Configuration

### Excluding Directories from Sync

**Recommended approach**: Use `upload_dirs` in `.ddev/config.yaml`:

```yaml
upload_dirs:
  - sites/default/files # CMS uploads
  - ../node_modules # Build dependencies
  - ../vendor/bin # Large binaries
```

**Advanced approach**: Edit `.ddev/mutagen/mutagen.yml` after removing the `#ddev-generated` line:

```yaml
ignore:
  paths:
    - "/web/themes/custom/mytheme/node_modules"
    - "/vendor/large-package"
```

Then add corresponding bind-mounts in `.ddev/docker-compose.bindmount.yaml`:

```yaml
services:
  web:
    volumes:
      - "../web/themes/custom/mytheme/node_modules:/var/www/html/web/themes/custom/mytheme/node_modules"
```

Always run `ddev mutagen reset` after changing `mutagen.yml`.

### Git Hooks for Automatic Sync

Add `.git/hooks/post-checkout` and make it executable:

```bash
#!/usr/bin/env bash
ddev mutagen sync || true
```

```bash
chmod +x .git/hooks/post-checkout
```

### Use Global Configuration for `performance_mode`

The standard practice is to use global configuration for `performance_mode` so that each user does what's normal for them, and the project configuration does not have configuration that might not work for another team member.

Most people don't have to change this anyway; macOS and traditional Windows default to `performance_mode: mutagen` and Linux/WSL default to `performance_mode: none`.

## When to Disable Mutagen

Disable Mutagen if:

- You're on Linux or WSL2 (already has native performance)
- Filesystem consistency is more critical than webserving performance
- You're troubleshooting other DDEV issues

Disable per-project:

```bash
ddev mutagen reset && ddev config --performance-mode=none && ddev restart
```

Disable globally:

```bash
ddev config global --performance-mode=none
```

## Mutagen Data and DDEV

DDEV uses its own Mutagen installation, normally in `~/.ddev`, but using $XDG_CONFIG_HOME when that is defined.

- **Binary location**: `$HOME/.ddev/bin/mutagen` or `${XDG_CONFIG_HOME}/ddev/bin/mutagen`
- **Data directory**: `$HOME/.ddev_mutagen_data_directory`

Access Mutagen directly:

```bash
ddev utility mutagen sync list
ddev utility mutagen sync monitor <projectname>
```

## Summary

Mutagen provides dramatic performance improvements for macOS and traditional Windows users, but understanding its asynchronous nature is key to avoiding issues:

- Use `ddev utility mutagen-diagnose` as your first debugging step
- Configure `upload_dirs` to exclude large directories like `node_modules` or heavy user-generated files directories
- Run `ddev mutagen reset` after file changes when DDEV is stopped
- Do Git operations on the host, not in the container
- Monitor sync activity with `ddev mutagen monitor` when troubleshooting

The benefits far outweigh the caveats for most projects, especially with the new diagnostic tools that identify and help resolve common issues automatically.

For more information, see the [DDEV Performance Documentation](https://docs.ddev.com/en/stable/users/install/performance/) and the [Mutagen documentation](https://mutagen.io/documentation/).

Copilot was used to create an initial draft for this blog, and for subsequent reviews.
