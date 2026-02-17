---
title: "DDEV v1.25.0: Improved Windows Support, Faster Debugging, and Modern Defaults"
pubDate: 2026-02-03
summary: New features and changes in DDEV v1.25.0
author: Stas Zhuk
featureImage:
  src: /img/blog/2026/02/banner-ddev-v1.25.0.svg
  srcDark: /img/blog/2026/02/banner-ddev-v1.25.0-dark.svg
  alt: DDEV v1.25.0 Release Banner
categories:
  - Announcements
---

We're excited to announce [DDEV v1.25.0](https://github.com/ddev/ddev/releases/tag/v1.25.0), featuring a completely revised Windows installer, XHGui as the default profiler, and updated system defaults including a move to Debian Trixie.

This release represents contributions from the entire DDEV community, with your suggestions, bug reports, code contributions, and financial support making it possible.

## What's New and Updated

**Default versions updated**:

These updates mostly affect new projects. Existing projects typically continue to work without changes.

- **Debian Trixie** replaces Debian Bookworm as the base image for `ddev-webserver` and `ddev-ssh-agent`
- **XHGui** is now the default profiler (replacing prepend mode). See [XHGui Feature blog post](./xhgui-feature.md)
- **PHP 8.4** becomes the default for new projects, and **PHP 8.5.2** is now available with full extension support including Xdebug
- **Node.js 24** becomes the default for projects that don't specify another version
- **MariaDB 11.8** becomes the default for new projects

**Major new features**:

- **Revised Windows installer** now uses per-user installation for WSL2 or traditional Windows (no admin account required). Download from [ddev.com/download](/download/)
- **Reworked `ddev share` command** with a new cloudflared share provider for free sharing options. See [new docs](https://docs.ddev.com/en/stable/users/topics/sharing/).
- **New diagnostic commands**:
  - `ddev utility xdebug-diagnose` helps troubleshoot Xdebug issues. See [(draft) Xdebug Understanding and Troubleshooting](https://pr-520.ddev-com-fork-previews.pages.dev/blog/xdebug-step-debugging-understanding-and-troubleshooting/)
  - `ddev utility mutagen-diagnose` helps debug Mutagen issues. See [Mutagen in DDEV: Functionality, Issues, and Debugging](mutagen-functionality-issues-debugging.md)
- **Faster snapshots**: `ddev snapshot` now uses zstd instead of gzip for significantly faster exports and restores, thanks [@deviantintegral](https://github.com/deviantintegral)
- **Experimental Podman and Docker Rootless support**: See [Podman and Docker Rootless in DDEV](podman-and-docker-rootless.md)
- **FrankenPHP as an official add-on**: [`ddev-frankenphp`](https://github.com/ddev/ddev-frankenphp) with many improvements. See updated [(draft) Using FrankenPHP with DDEV](https://pr-502.ddev-com-fork-previews.pages.dev/blog/using-frankenphp-with-ddev/)
- **Traefik configuration standardization**: Project configuration now uses a single file: `.ddev/traefik/config/<projectname>.yaml` (all other files are ignored)

## What You Need to Do After Upgrading

After upgrading to v1.25.0, follow these steps:

1. **Run `ddev poweroff`** (DDEV will prompt you for this)
2. **Update your projects**: Run `ddev config --auto` on each project to update to current configuration
3. **Update installed add-ons**: Run `ddev add-on list --installed` to see your add-ons, then update them as needed
4. **Free up disk space**: Run `ddev delete images` to remove old Docker image versions
5. **Check compatibility notes** below

## Compatibility Notes and Things to Check

### 1. Debian Trixie base image

**If your project has custom Dockerfiles** or uses `webimage_extra_packages` and `ddev start` shows any problems, you may have a little work to do, but most projects are unaffected.

**What to do**: Test your project after upgrading. See [Debian Trixie release notes](https://www.debian.org/releases/trixie/release-notes/issues.html) for known issues.

**Note**: DDEV already includes the `tzdata-legacy` package to handle removed timezones in Debian Trixie, so no action is needed for timezone-related changes.

### 2. Profiler changed to XHGui

**If you use XHProf profiling**, it now defaults to XHGui mode instead of prepend mode.

**What to do**: If you prefer the previous prepend mode, run:

```bash
ddev config global --xhprof-mode=prepend
```

### 3. Nginx modules now come from Debian repository

**If you use custom nginx modules**, the package names and module loading have changed. DDEV now uses nginx bundled with Debian Trixie instead of maintaining an extra dependency on the nginx.org repository.

**What to do**: Update your nginx module configuration.

Example: Adding NJS (JavaScript) support to nginx in DDEV v1.25.0+:

```bash
ddev config --webimage-extra-packages="libnginx-mod-http-js,libnginx-mod-stream,libnginx-mod-stream-js" --ddev-version-constraint='>=v1.25.0'

cat <<'EOF' > .ddev/web-build/Dockerfile.nginx
RUN sed -i '1i load_module modules/ngx_stream_module.so;\nload_module modules/ngx_http_js_module.so;\nload_module modules/ngx_stream_js_module.so;\n' /etc/nginx/nginx.conf
EOF
```

### 4. Removed commands and features

**If you use these commands**, you'll need to switch:

- **`ddev nvm`**: Switch to [`nodejs_version`](https://docs.ddev.com/en/stable/users/configuration/config/#nodejs_version) or install the [`ddev-nvm`](https://github.com/ddev/ddev-nvm) add-on
- **`ddev service`**: Use [`ddev add-on`](https://docs.ddev.com/en/stable/users/usage/commands/#add-on) to install/remove services
- **NFS performance mode**: Switch to [Mutagen](https://docs.ddev.com/en/stable/users/install/performance/#filesystem-performance-mutagen) instead

### 5. Updated `ddev config` flags

**If you use these flags in scripts**, update them:

- `--mutagen-enabled` → `--performance-mode=mutagen`
- `--upload-dir` → `--upload-dirs`
- `--http-port` → `--router-http-port`
- `--https-port` → `--router-https-port`
- `--mailhog-port` → `--mailpit-http-port`
- `--mailhog-https-port` → `--mailpit-https-port`
- `--projectname` → `--project-name`
- `--projecttype`, `--apptype` → `--project-type`
- `--sitename` → `--project-name`
- `--image-defaults` → `--web-image-default`

### 6. Traefik configuration

**If you have custom Traefik configuration**, note that:

- Only `.ddev/traefik/config/<projectname>.yaml` is used (other files are ignored)
- Put global Traefik configuration in `$HOME/.ddev/traefik/custom-global-config/`
- Traefik v3 syntax is now required

**What to do if you have extra Traefik files**:

1. Merge all your custom configuration into `.ddev/traefik/config/<projectname>.yaml` and remove the `#ddev-generated` comment from it
2. Track [issue #8047](https://github.com/ddev/ddev/issues/8047) for potential future improvements to this workflow

**Note**: `ddev-router` no longer stops automatically when the last project stops. Use `ddev poweroff` to stop it manually.

### 7. Windows installation

**If you're on traditional Windows** (not WSL2): The installer may prompt you to uninstall the previous system-wide installation before installing the new per-user version.

## Other Improvements

This release includes many other improvements:

- New [Wagtail](https://docs.ddev.com/en/stable/users/quickstart/#wagtail-python-generic), [CodeIgniter](https://docs.ddev.com/en/stable/users/quickstart/#codeigniter), and Drupal 12 project types
- Improved [Pantheon integration](https://docs.ddev.com/en/stable/users/providers/pantheon/) with new environment variables and option to pull from [existing backups or fresh database dumps](https://docs.ddev.com/en/stable/users/providers/pantheon/#using-existing-backups-vs-fresh-database-dumps)
- Much faster `ddev add-on list` and `ddev add-on search`
- Shell autocompletion for `ddev add-on get <TAB>`
- SELinux environment detection with automatic bind mount labels
- More portable database collations for MySQL/MariaDB exports
- [SSH config support](https://docs.ddev.com/en/stable/users/extend/in-container-configuration/#ssh-configuration) in `$HOME/.ddev/homeadditions/.ssh/config.d`
- DBeaver support for traditional Windows

See the [full release notes](https://github.com/ddev/ddev/releases/tag/v1.25.0) for complete details.

From the entire team, thanks for using, promoting, contributing, and supporting DDEV!

If you have questions, reach out in any of the [support channels](https://docs.ddev.com/en/stable/users/support/).

Follow our [blog](https://ddev.com/blog/), [Bluesky](https://bsky.app/profile/ddev.bsky.social), [LinkedIn](https://www.linkedin.com/company/ddev-foundation), [Mastodon](https://fosstodon.org/@ddev), and join us on [Discord](/s/discord). Sign up for the [monthly newsletter](/newsletter).

---

_This article was edited and refined with assistance from Claude Code._
