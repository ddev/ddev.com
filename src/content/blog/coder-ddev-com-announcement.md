---
title: "Introducing coder.ddev.com: DDEV in the Cloud"
pubDate: 2026-03-10
summary: "coder.ddev.com provides free, experimental cloud-based DDEV workspaces powered by Coder. Start a Drupal contribution environment in under 30 seconds, with full VS Code, Xdebug, and CLI support."
author: Randy Fay
featureImage:
  src: /img/blog/2026/03/start-coder-ddev-com.png
  alt: start.coder.ddev.com — Coder Workspaces landing page showing the DDEV logo and Open in Coder button
categories:
  - Announcements
  - Community
---

## What is coder.ddev.com?

[coder.ddev.com](https://coder.ddev.com) is a free, experimental cloud DDEV service. You log in with GitHub, create a workspace, and get a full DDEV environment in the cloud — no local Docker, no local installation needed.

:::warning[Experimental Service]
This is an experimental service with no guarantees of data retention, uptime, or long-term availability. The future of its maintenance and sustainability is uncertain. Do not store irreplaceable work here without pushing it to Git. Treat it as a convenience, not a platform to depend on.
:::

Want a quick overview? Watch the 5-minute intro video:

<!-- TODO: embed video here -->

## Table of Contents

## How It Works

coder.ddev.com runs on [Coder](https://coder.com), an open-source platform for remote development environments. Each workspace is an isolated container (using the [Sysbox](https://github.com/nestybox/sysbox) runtime for secure Docker-in-Docker) with DDEV, Docker, Node.js, and VS Code pre-installed.

Your files persist on a remote volume across workspace restarts. When you delete a workspace, the data is gone — so push your work to Git. (But until you delete the workspace, or it's garbage-collected, your work persists. We don't have an implementation for garbage collection yet...)

The source code for the templates and Docker image is at [github.com/ddev/coder-ddev](https://github.com/ddev/coder-ddev). Other projects can use this and deploy their own fully-DDEV-capable Coder instances.

## Getting Started

### 1. Log In with GitHub

Go to [coder.ddev.com](https://coder.ddev.com) and click **Login with GitHub**. No separate account needed. `coder.ddev.com` gets only your email address.

### 2. Create a Workspace

From the dashboard, click **Create Workspace** and choose a template:

- **drupal-core** — automated Drupal core development environment
- **user-defined-web** — general-purpose DDEV for any project
- **freeform** — DDEV with Traefik routing integration for stable URLs

Give your workspace a name and click **Create Workspace**. Most workspaces start in under a minute. The drupal-core template (with seed cache) is ready in about 30 seconds.

### 3. Access Your Workspace

Once running, your workspace has several access points:

- **VS Code for Web**: Click **VS Code** under Apps in the Coder dashboard. A full IDE opens in the browser.
- **SSH**: Install the [Coder CLI](https://github.com/coder/coder/releases), then `coder login https://coder.ddev.com` and `coder ssh <workspace-name>`.
- **Desktop VS Code with Remote-SSH**: Run `coder config-ssh` after logging in, then use VS Code's Remote-SSH extension to connect to `coder.<workspace-name>`.

## Template Overview

### drupal-core

The drupal-core template sets up a complete Drupal core contribution environment automatically using [joachim-n/drupal-core-development-project](https://github.com/joachim-n/drupal-core-development-project). Drupal core is cloned, Composer dependencies are installed, and a demo site is installed — all in about 30 seconds when a seed cache is available.

Choose your Drupal version when creating the workspace:

- **main (12.x / HEAD)** — latest development (default)
- **11.x** — current stable branch
- **10.x** — previous stable branch

The template automatically selects the correct PHP version and DDEV project type for the chosen branch.

Log in to the site with `admin` / `admin`, or get a one-time login link: `ddev drush uli`.

### user-defined-web

The general-purpose template. Create a workspace, SSH in or open VS Code, clone your project, run `ddev config && ddev start`, and access it via the port forwarding links in the Coder dashboard.

```bash
# Example: a Drupal site
cd ~/projects
git clone git@github.com:your-org/your-site.git
cd your-site
ddev config --auto
ddev start
```

Your project is accessible via the **DDEV Web** app link in the Coder dashboard.

### freeform

The freeform template adds Traefik routing integration so your DDEV project and services like Mailpit get stable subdomain URLs (no port numbers). After creating a workspace, run `ddev coder-setup` once in your project directory, then `ddev start`. Routing updates automatically on every start.

## The Drupal Issue Picker

One of the most useful features for Drupal contributors is the **Drupal Issue Picker** at [start.coder.ddev.com/drupal-issue](https://start.coder.ddev.com/drupal-issue).

![Drupal Core Issue Picker — enter an issue URL or number to launch a pre-configured workspace](/img/blog/2026/03/drupal-issue-picker.png)

Paste any drupal.org issue URL (for example, `https://www.drupal.org/project/drupal/issues/3568144`) and the picker launches a drupal-core workspace with:

- The correct Drupal version (10.x, 11.x, or main) detected from the issue
- The issue fork branch already checked out
- Composer dependencies resolved

This replaces the workflow that DrupalPod (Gitpod-based) provided for contribution days. You can hand someone an issue URL, they paste it into the picker, and within 30 seconds they have a working environment with the issue branch ready.

## Development Tools

### VS Code for Web

VS Code for Web runs in the browser and supports most extensions. You can install extensions from the marketplace, configure settings, and use the integrated terminal — all without installing anything locally.

### Desktop VS Code

For a native IDE experience, install the [Coder CLI](https://github.com/coder/coder/releases) and run:

```bash
coder login https://coder.ddev.com
coder config-ssh
```

Then use VS Code's **Remote-SSH** extension to connect to `coder.<workspace-name>`. All VS Code features work, including extensions that require a desktop environment.

### Xdebug

Xdebug works in Coder workspaces the same way as local DDEV:

```bash
ddev xdebug on
```

With desktop VS Code connected via Remote-SSH, configure your `launch.json` for remote debugging as you would with any remote PHP interpreter. With VS Code for Web, use the browser debugger integration.

### Coder CLI

The Coder CLI provides SSH access, port forwarding, file transfer, and workspace management:

```bash
# Install
curl -L https://coder.com/install.sh | sh

# Login
coder login https://coder.ddev.com

# List workspaces
coder list

# SSH into workspace
coder ssh my-workspace

# Forward a port locally
coder port-forward my-workspace --tcp 8080:80

# Stop workspace (preserves data)
coder stop my-workspace
```

## Accessing Your Project

Because DDEV runs inside a cloud container, the usual `*.ddev.site` URLs don't work. Instead, access your project via the **DDEV Web** app link in the Coder dashboard, or use port forwarding.

The freeform template handles this automatically with Traefik routing — you get stable subdomain URLs like `https://<workspace>--<workspace>--<owner>.coder.ddev.com/`.

## Stopping and Deleting Workspaces

**Stop**: Stops the container and frees compute resources. All files in `/home/coder` are preserved. Use this when you are done for the day.

**Delete**: Permanently removes the workspace and all data. Always push your code to Git before deleting.

```bash
coder stop my-workspace   # Stop (data preserved)
coder delete my-workspace # Delete (data lost permanently)
```

## FAQ

* **How do I pull/push to GitHub/GitLab/Drupalcode? (or use ssh)?**

Use the `coder publickey` command to get the publickey associated with your coder.ddev.com projects (it's the same for all projects). You can then add that to GitHub/GitLab/Drupalcode/Remote SSH to allow you to access those resources.

* **How do I set this up myself for my own initiative?**

The full details are in the repo at [github.com/ddev/coder-ddev](https://github.com/ddev/coder-ddev).

* **Where is this running?**

This is running on a 64GB Hetzner bare-metal Ubuntu 24.04 machine in Helsinki, Finland. It has lots of disk and costs about $50/month.

## Thanks to Coder.com

The world of open source is amazing. Coder.com is a shockingly mature project, and so many of these things worked just great out of the box. 

## What's Next

The templates and image are open source at [github.com/ddev/coder-ddev](https://github.com/ddev/coder-ddev). Contributions, bug reports, and feature requests are welcome.

## Getting Help

- **Documentation**: [github.com/ddev/coder-ddev/docs](https://github.com/ddev/coder-ddev/tree/main/docs)
- **DDEV Discord**: [discord.gg/hCZFfAMc5k](https://discord.gg/hCZFfAMc5k) — `#coder-ddev` channel
- **Issues**: [github.com/ddev/coder-ddev/issues](https://github.com/ddev/coder-ddev/issues)
- **DDEV Docs**: [docs.ddev.com](https://docs.ddev.com)
- **Coder.com**: [coder.com] or [github.com/coder/coder](https://github.com/coder/coder)
