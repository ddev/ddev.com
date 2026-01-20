---
title: "Mutagen in DDEV: Functionality, Issues, and Debugging"
pubDate: 2026-01-24
summary: Understanding Mutagen's performance benefits, common issues, and how to debug sync problems in DDEV.
author: Randy Fay
#featureImage:
#  src: /img/blog/2021/07/drupal-9-web-install-times-seconds-less-is-better.png
#  alt: Chart depicting Drupal 9 install times without NFS, with NFS, and with Mutagen on macOS, Windows, and Linux
categories:
  - TechNotes
  - Performance
---

[Mutagen](https://mutagen.io) has been a part of DDEV since v1.18.0, providing dramatic performance improvements for macOS and traditional Windows users. It's enabled by default on these platforms, but understanding how it works, what can go wrong, and how to debug issues is key to getting the most out of DDEV.

## What Mutagen Does

Mutagen is an asynchronous file synchronization tool that decouples in-container reads and writes from reads and writes on the host machine. Each filesystem enjoys near-native speed because neither is stuck waiting on the other.

Traditional Docker bind-mounts check every file access against the file on the host. On macOS and Windows, Docker's implementation of these checks is not performant. Mutagen solves this by maintaining a cached copy of your project files in a Docker volume, syncing changes between host and container asynchronously.

### Performance Impact

The performance improvements are significant:

- **macOS**: Drupal 9 web installations run twice as fast as with NFS, and many times faster than plain Docker.
- **Traditional Windows**: Performance improvements are off the chart—plain Docker installations that took 20 minutes can complete in under a minute.
- **Linux/WSL2**: Mutagen works fine but isn't necessary since Docker already provides native file-access performance on these systems.

![Drupal 9 Install Times Comparison](/img/blog/2021/07/drupal-9-web-install-times-seconds-less-is-better.png)

### Filesystem Notifications

Mutagen supports filesystem notifications (`inotify`/`fsnotify`), so file-watchers on both the host and inside the container are notified when changes occur. This is a significant advantage for development tools that would otherwise need to poll for changes.

## How Mutagen Works in DDEV

When Mutagen is enabled, DDEV:

1. Mounts a fast Docker volume onto `/var/www/html` inside the web container
2. Delegates to the Mutagen daemon running on the host
3. The daemon keeps host project contents in sync with the Docker volume

### Lifecycle

- **`ddev start`**: Starts the Mutagen agent if not running, creates or resumes sync session
- **`ddev stop`**: Flushes sync session to ensure consistency, then pauses it
- **`ddev composer`**: Triggers synchronous flush after completion to sync massive filesystem changes
- **`ddev mutagen reset`**: Removes the Docker volume and recreates the sync session from scratch

### Upload Directories

DDEV automatically excludes user-generated files in `upload_dirs` from Mutagen syncing, using bind-mounts instead. For most CMS types, this is configured automatically:

- Drupal: `sites/default/files`
- WordPress: `wp-content/uploads`
- TYPO3: `fileadmin`, `uploads`

If your project has non-standard locations, override defaults by setting `upload_dirs` in `.ddev/config.yaml`.

## Common Issues and Caveats

### Initial Sync Time

The first-time Mutagen sync takes 5-60 seconds depending on project size. A Magento 2 site with sample data might take 48 seconds initially, 12 seconds on subsequent starts. If sync takes longer than a minute, you're likely syncing large files or directories unnecessarily.

### Large `node_modules` Directories

Frontend build tools create massive `node_modules` directories that slow Mutagen sync significantly. **Solution**: Add `node_modules` to `upload_dirs`:

```yaml
upload_dirs:
  - sites/default/files  # Keep existing CMS defaults
  - node_modules         # Exclude from Mutagen
```

Then run `ddev restart`. The directory remains available in the container via Docker bind-mount.

### File Changes When DDEV is Stopped

If you change files (checking out branches, running `git pull`, deleting files) while DDEV is stopped, Mutagen has no awareness of these changes. When you start again, it may restore old files from the volume.

**Solution**: Run `ddev mutagen reset` before restarting if you've made significant changes while stopped.

### Simultaneous Changes

If the same file changes on both host and container while out of sync, conflicts can occur. This is rare but possible with:

- Scripts running simultaneously on host and in container
- Massive branch changes
- Large `npm install` or `yarn install` operations

**Best practices**:
- Do Git operations on the host, not in the container
- Run `ddev mutagen sync` after major Git branch changes
- Run `ddev mutagen sync` after manual Composer operations inside the container

### Disk Space Considerations

Mutagen increases disk usage because project code exists both on your computer and inside a Docker volume. The `upload_dirs` directories are excluded to mitigate this.

Watch for volumes larger than 5GB (warning) or 10GB (critical). Use `ddev utility mutagen-diagnose --all` to check all projects.

### Windows Symlink Limitations

On macOS and Linux, Mutagen uses `posix-raw` symlink handling. Traditional Windows must use `portable` mode, restricting symlinks to relative links within the Mutagen-synced portion of the project.

## Debugging Mutagen Issues

### The New `ddev utility mutagen-diagnose` Command

DDEV now includes a comprehensive diagnostic tool that automatically checks for common issues:

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

If `ddev start` takes longer than a minute, watch what Mutagen is syncing:

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

View detailed status with labels:

```bash
ddev mutagen status -l
```

### Troubleshooting Steps

1. **Verify DDEV works without Mutagen**:
   ```bash
   ddev config --performance-mode=none && ddev restart
   ```

2. **Run diagnostics**:
   ```bash
   ddev utility mutagen-diagnose
   ```

3. **Reset to fresh configuration**:
   ```bash
   # Backup customizations first
   mv .ddev/mutagen/mutagen.yml .ddev/mutagen/mutagen.yml.bak
   ddev restart
   ```

4. **Reset Mutagen completely**:
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
   $HOME/.ddev/bin/mutagen daemon stop
   $HOME/.ddev/bin/mutagen daemon start
   ```

### Running Diagnostics Script

For comprehensive information to share with support:

```bash
curl https://raw.githubusercontent.com/ddev/ddev/main/scripts/diagnose_mutagen.sh | bash
```

## Advanced Configuration

### Excluding Directories from Sync

**Recommended approach**: Use `upload_dirs` in `.ddev/config.yaml`:

```yaml
upload_dirs:
  - sites/default/files  # CMS uploads
  - node_modules         # Build dependencies
  - vendor/bin           # Large binaries
  - .git                 # Version control (if needed in container)
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

### Sharing Projects with Non-Mutagen Users

If some team members use macOS (need Mutagen) and others use WSL2 (don't need it), don't commit `performance_mode: mutagen` to `.ddev/config.yaml`. Instead:

- Use global configuration: `ddev config global --performance-mode=mutagen`
- Or create `.ddev/config.performance.yaml` (not committed) with only:
  ```yaml
  performance_mode: mutagen
  ```

## When to Disable Mutagen

Disable Mutagen if:

- You're on Linux or WSL2 (already has native performance)
- Your project frequently changes the same file on host and container
- Filesystem consistency is more critical than performance
- You're troubleshooting other DDEV issues

Disable per-project:
```bash
ddev config --performance-mode=none && ddev restart
```

Disable globally:
```bash
ddev config global --performance-mode=none
```

## Mutagen Data and DDEV

DDEV uses its own Mutagen installation:

- **Binary location**: `$HOME/.ddev/bin/mutagen`
- **Data directory**: `$HOME/.ddev_mutagen_data_directory`
- **Independent**: Won't conflict with other Mutagen installations

Access Mutagen directly:
```bash
ddev utility mutagen sync list
ddev utility mutagen sync monitor <projectname>
```

## Summary

Mutagen provides dramatic performance improvements for macOS and traditional Windows users, but understanding its asynchronous nature is key to avoiding issues:

- Use `ddev utility mutagen-diagnose` as your first debugging step
- Configure `upload_dirs` to exclude large directories like `node_modules`
- Run `ddev mutagen reset` after file changes while DDEV is stopped
- Do Git operations on the host, not in the container
- Monitor sync activity with `ddev mutagen monitor` when troubleshooting

The benefits far outweigh the caveats for most projects, especially with the new diagnostic tools that identify and help resolve common issues automatically.

For more information, see the [DDEV Performance Documentation](https://docs.ddev.com/en/stable/users/install/performance/) and the [Mutagen documentation](https://mutagen.io/documentation/).

Copilot was used to create an initial draft for this blog, and for subsequent reviews.
