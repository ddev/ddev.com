---
title: "Contributor Training: Advanced coder.ddev.com Usage"
pubDate: 2026-11-11
summary: "Contributor training on coder.ddev.com: Drupal issue workspaces, the freeform template, the Coder CLI and SSH, and running Claude Code in an isolated cloud workspace."
author: Randy Fay
featureImage:
  src: /img/blog/2026/03/start-coder-ddev-com.png
  alt: start.coder.ddev.com, the Coder Workspaces landing page showing the DDEV logo and Open in Coder button
categories:
  - Training
  - Guides
---

[coder.ddev.com](https://coder.ddev.com) gives you a DDEV environment in the cloud, with nothing installed on your own machine. Since the [announcement](coder-ddev-com-announcement.md) it has grown a Drupal issue picker, a freeform template for any DDEV project, and several ways to run Claude Code inside a workspace.

Here's our November 11, 2026 [Contributor Training](/blog/category/training) on advanced coder.ddev.com usage:

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/772ZywekMq8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

The slides are available at [rfay.github.io/advanced-coder-presentation](https://rfay.github.io/advanced-coder-presentation/), with source at [github.com/rfay/advanced-coder-presentation](https://github.com/rfay/advanced-coder-presentation).

## What coder.ddev.com Is

coder.ddev.com is a free, experimental service built on the open source [Coder](https://coder.com) project. Each workspace is an isolated Docker-in-Docker container (using Sysbox) with DDEV, Docker, Git, VS Code, and Claude Code already installed. Because it runs on someone else's machine, it doesn't depend on your laptop, your local network, or where you are, and an AI agent running there can't touch your local credentials or configuration.

It is experimental. There are no guarantees about uptime or data retention, and a workspace that sits idle for 14 days is deleted, so keep your work in Git.

## Getting Access

Sign in with GitHub at [coder.ddev.com/login](https://coder.ddev.com/login). Members of any organization that [sponsors DDEV](/sponsor) at $100/month or more can sign in directly. Everyone else can open an issue in [coder-ddev-com/access-requests](https://github.com/coder-ddev-com/access-requests) with their GitHub username and how they plan to use it. Coder gets read-only access to your email, public profile, and organization membership, not to your code.

The code is all at [github.com/ddev/coder-ddev](https://github.com/ddev/coder-ddev) and the docs are at [docs.coder.ddev.com](https://docs.coder.ddev.com/), including instructions for hosting it on your own infrastructure.

## Three Templates

- `drupal-core`: a clean Drupal core checkout for working on core issues, using [amateescu/ddev-drupal-dev](https://github.com/amateescu/ddev-drupal-dev).
- `drupal-contrib`: any contrib module or theme, using [ddev/ddev-drupal-contrib](https://github.com/ddev/ddev-drupal-contrib).
- `freeform`: your own DDEV projects (or other types of projects), one or many per workspace.

## Drupal Contribution With the Issue Picker

The [Drupal issue picker](https://start.coder.ddev.com/drupal-issue) is the replacement for the old Gitpod-based DrupalPod. Paste a drupal.org issue URL, issue number, or project name. The picker works out whether it's core or contrib and which Drupal version it needs, checks out the issue fork branch, installs Composer dependencies, and installs the site. Hand someone an issue URL at a contribution day and they get a working site with the branch ready, with no local Docker.

The first creation of a Drupal workspace takes several minutes. Watch the Logs tab, and don't click Cancel at "Confirm and Create"; if something goes wrong, start over in the picker.

Inside the workspace, core is in `~/drupal-core/` and contrib projects are in `~/<project_name>/`. The site login is `admin` / `admin`, and the usual tools are there:

```bash
ddev drush uli
ddev phpunit core/modules/node
ddev phpcs   # also phpstan, eslint
git push issue HEAD
```

To push to the issue fork, add the workspace's public key (from `coder publickey` or [your SSH keys page](https://coder.ddev.com/settings/ssh-keys)) to your drupal.org account.

## Getting Into a Workspace

The dashboard gives you VS Code for the Web, a web terminal, and app buttons for the DDEV site, Mailpit, and XHGui. VS Code for the Web is a full VS Code in a browser tab, and its terminal has `ddev`, `docker`, `git`, and `claude`.

For daily work, I usually prefer local VS Code (VS Code on my machine but using ssh to the workspace). Use the "VS Code Desktop" button, `coder open vscode my-site`, or Remote-SSH to the host `coder.my-site`. Xdebug works the same as with local DDEV. JetBrains IDEs connect through the Toolbox Coder plugin or Gateway over SSH.

### The Coder CLI

```bash
brew install coder            # or: curl -L https://coder.com/install.sh | sh
coder login https://coder.ddev.com
coder list
coder create --template freeform my-site
coder stop my-site
coder start my-site
```

On Windows, use `winget install Coder.Coder`. See the [Coder install docs](https://coder.com/docs/install) for other options.

`coder ssh` gives you a shell, runs a single command, or forwards your SSH agent with `-A`:

```bash
coder ssh my-site
coder ssh my-site -- ddev list
coder ssh -A my-site
```

`coder config-ssh` writes entries in `~/.ssh/config` so plain `ssh`, `scp`, and `rsync` work against `coder.<workspace>`. Run it again after creating a new workspace.

```bash
coder config-ssh --yes
ssh coder.my-site
rsync -av ./files/ coder.my-site:~/my-site/web/sites/default/files/
```

Importing a database is an `scp` followed by `ddev import-db`:

```bash
scp ~/Downloads/dump.sql.gz coder.my-site:~/my-site/
coder ssh my-site -- env -C /home/coder/my-site \
  ddev import-db --file=dump.sql.gz
```

And exporting is the reverse:

```bash
coder ssh my-site -- env -C /home/coder/my-site \
  ddev export-db --file=backup.sql.gz
scp coder.my-site:~/my-site/backup.sql.gz .
```

## The Freeform Template

Freeform runs any DDEV project, as many as you want. When creating the workspace, set the "DDEV project names" parameter (for example `shop,blog`). Each name must match a DDEV project name exactly, and each gets its own app button, Mailpit, and XHGui. Then, for each project, run `ddev coder-setup` once, which routes the project through `ddev-router` so it gets its own hostname without port numbers.

A minimal site, in a workspace whose project names include `hello`:

```bash
mkdir -p ~/hello/public && cd ~/hello
echo '<h1>Hello from coder.ddev.com</h1>' > public/index.html
ddev config --project-name=hello --project-type=php --docroot=public
ddev coder-setup
ddev start
```

The site is at `https://hello--hello--<username>.coder.ddev.com`; use the app button or `ddev launch`. `*.ddev.site` URLs don't work in the cloud.

Bringing your own project is the same pattern:

```bash
git clone https://github.com/your-org/my-site.git ~/my-site
cd ~/my-site
ddev config --project-name=my-site
ddev coder-setup
ddev start
```

Public sharing is off by default, so workspaces are private. If you turn it on, anyone with the link can reach the site. You can also use `ddev share`, which works through Cloudflare and shows a QR code for testing on a phone. Change parameters later in Settings → Parameters, then restart the workspace.

### Timeouts and Lifecycle

Freeform workspaces auto-stop after 24 hours of inactivity. Check or extend that with `coder schedule show my-site` and `coder schedule extend my-site 2h`, or turn auto-stop off in the workspace settings; that may change if usage grows. After 7 idle days you get a warning email, and 7 days after that the workspace is deleted.

Stopping a workspace keeps `/home/coder`, databases, Docker volumes, and Homebrew packages. It loses running processes, `/tmp`, and anything installed with `apt-get`, so install tools with `brew` or `npm -g`. DDEV projects aren't restarted automatically, but `~/.coder-startup.sh` runs on every start, so put `cd ~/my-site && ddev start` there.

## Claude Code in a Workspace

There are four ways to use Claude Code on coder.ddev.com:

- Run `claude` in a terminal. It's already installed.
- Install the "Claude Code" extension by Anthropic in VS Code.
- Enable remote control in the workspace settings, and use the session from [claude.ai/code](https://claude.ai/code) or the Claude mobile app.
- On freeform only, run a self-hosted runner so claude.ai/code sessions execute in your workspace.

Log in once with `claude`; the login persists in your home directory. You need a Pro, Max, Team, or Enterprise plan or an `ANTHROPIC_API_KEY`, and remote control needs a subscription.

Claude runs in the workspace with the workspace's Docker and DDEV, and your laptop isn't involved. Start it inside `tmux new -s claude` so the session survives a closed browser tab, or use `coder ssh my-site` and then `cd ~/my-site && claude`. A `CLAUDE.md` that tells Claude to run PHP, Composer, and Drush through `ddev` saves some back-and-forth.

For remote control, enable it in the workspace settings and restart. The first time, use the "Claude Code" app button to log in and trust the workspace. The session then shows up at claude.ai/code under the workspace name, and `claude-here` in a project directory switches it to that project. It disconnects after about 10 minutes offline and restarts when the workspace starts or when you click the app button.

The self-hosted runner can't be combined with remote control, so dedicate a freeform workspace to it. Create a self-hosted environment on claude.ai and save its secret:

```bash
mkdir -p ~/.claude-runner
cat > ~/.claude-runner/environment-secret   # paste, Enter, Ctrl-D
chmod 600 ~/.claude-runner/environment-secret
```

The runner handles one to four concurrent sessions; `claude-sessions` lists them. It rewrites `~/.gitconfig` before each session and logs to the `claude-runner` tmux session and `/tmp/claude-runner-N.log`.

If you want to limit what an agent can do, removing `sudo` in a startup script keeps it from installing system software or reversing other restrictions.

## What FreelyGive Is Doing With It

The FreelyGive team (featured sponsors of DDEV) joined the session and showed how they use coder.ddev.com for AI agent work. They have agents that browse Drupal modules, look for vulnerabilities, and file security issues with reproduction videos; about 150 of those issues have been verified so far. They also have a one-line installer that sets up DDEV and runs scripts to migrate a site into Drupal CMS, often with a Storybook design system, and they've used a workspace to benchmark Drupal on a Rust port of PHP.

The discussion raised questions we don't have settled answers to yet:

- Whether a complex AI workflow should be its own Coder template or a script run in a freeform workspace.
- Adding an app button for a service like phpMyAdmin is easy in a template, but automatic URL mapping for every DDEV service isn't there yet.
- Coder could reduce configuration drift for teams doing the same task repeatedly, such as Drupal 6 to 11 upgrades.

## Contributing to coder-ddev

If something about coder.ddev.com annoys you, [github.com/ddev/coder-ddev](https://github.com/ddev/coder-ddev) is a good place to fix it. The docs and existing code give you patterns to follow, AI tools handle the codebase well, and each PR build posts links so you can check your changes.

## Resources

- Start page: [start.coder.ddev.com](https://start.coder.ddev.com)
- Dashboard: [coder.ddev.com](https://coder.ddev.com)
- Docs: [docs.coder.ddev.com](https://docs.coder.ddev.com/)
- Code and issues: [github.com/ddev/coder-ddev](https://github.com/ddev/coder-ddev)
- Access requests: [github.com/coder-ddev-com/access-requests](https://github.com/coder-ddev-com/access-requests)
- Help: [DDEV Discord](/s/discord) and `#ddev` in Drupal Slack

## Join us for future trainings

- Sign up for the [DDEV Newsletter](/newsletter) to be informed about future trainings.
- Let us know your tips and tricks in [Discord](/s/discord) or here in the comments.

Claude Code was used to draft and review this blog.
