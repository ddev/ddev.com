---
title: "Getting to Your DDEV Projects Fast: Filesystem Navigation Tips"
pubDate: 2026-09-30
summary: Ways to jump to a DDEV project's directory and open it in an editor without digging through Finder, including ddevcd, autojump, code ., and the project link in ddev describe.
author: Randy Fay
featureImage:
  src: /img/blog/2026/09/navigating-ddev-projects-filesystem.jpg
  alt: REPLACE_ME Descriptive alt text
categories:
  - Guides
---

<!-- TODO: Verify every command below by running it before publishing. -->

A recent [post on Bluesky](https://bsky.app/profile/bymayo.bsky.social/post/3mwq6twgb6l2v) asked a common question: with dozens of DDEV projects, what is the fastest way to get to one? The current routine was to open Finder, dig three folders deep, drag the folder into an editor, and then run `ddev start`. Another post mentioned 52 projects and no idea which ones are running. Here are the techniques we use and that came up in the replies.

## See What Is Running: `ddev list`

`ddev list` shows every project DDEV knows about, with its status, location, URL, and type. To see only the projects that are running, use `ddev list --active-only` (or `ddev list -A`):

```text
┌──────────┬─────────┬────────────────┬─────────────────────────┬──────────┐
│ NAME     │ STATUS  │ LOCATION       │ URL                     │ TYPE     │
├──────────┼─────────┼────────────────┼─────────────────────────┼──────────┤
│ randyfay │ running │ ~/workspace/r… │ https://randyfay.ddev.… │ backdrop │
│          │ (ok)    │                │                         │          │
├──────────┼─────────┼────────────────┼─────────────────────────┼──────────┤
│ Router   │ OK      │ ~/.ddev        │ http://127.0.0.1:11999  │          │
└──────────┴─────────┴────────────────┴─────────────────────────┴──────────┘
```

`ddev poweroff` stops every running project at once.

## The DDEV Dashboard: Just Type `ddev`

Running `ddev` with no arguments opens an interactive terminal dashboard that lists all of your projects and their status. You can start, stop, and restart projects, open a project's URL or Mailpit in the browser, filter the list with `/`, and press Enter for a project's details. For someone with 52 projects, this may be the quickest way to see what is running. See the [interactive dashboard documentation](https://docs.ddev.com/en/stable/users/usage/cli/#interactive-dashboard) for the full list of keys.

![DDEV interactive dashboard listing projects with status, type, and location](/img/blog/2026/09/navigating-ddev-tui.png)

To get the classic help text instead, set `no_tui: true` in the global configuration or `DDEV_NO_TUI=true` in the environment.

## `ddevcd`: Built-In Project Jump

DDEV ships a shell function that changes to a project's root directory by name:

```bash
ddevcd some-project
```

It needs a one-time addition to your shell startup file. `ddev utility cd` (also `ddev debug cd`) prints the exact line for Bash, Zsh, or fish. See the [`utility cd` documentation](https://docs.ddev.com/en/stable/users/usage/commands/#utility-cd).

`ddevcd` works from any directory, and it has tab completion for project names like the rest of DDEV. Typing `ddevcd pr<tab>` completes to something like `ddevcd pr8859-test`.

<!-- TODO: Show the exact output of `ddev utility cd` on macOS. Mention `ddev utility cd --list`. Credit Stas (stasadev) as in the v1.24.0 release post. -->

## autojump: Jump by Partial Name

[autojump](https://github.com/wting/autojump) learns the directories you visit and lets you jump to them with `j` and part of the name. It works for any directory, not only DDEV projects.

```bash
brew install autojump
# Follow the post-install instructions to source it from your shell rc file
j myproject
ddev start
```

If you only need to start a project, you don't have to change directories at all: `ddev start <projectname>` works from anywhere.

<!-- TODO: Note that autojump only knows directories you have already visited (unlike ddevcd, which knows every project DDEV has seen). Mention the apt package for Linux/WSL2 (see windows-ddev-setup.md). Consider whether to mention zoxide as a maintained alternative. -->

## `code .`: Open the Editor From the Project Directory

Once you are in the project directory, open it in your editor from the terminal:

```bash
code .
```

<!-- TODO: VS Code's `code` command (Shell Command: Install 'code' command in PATH). Cursor has `cursor .`, PhpStorm has `phpstorm .` (created via Tools > Create Command-line Launcher), and so on. Combine: `ddevcd myproject && ddev start && code .` -->

## Click the Link in `ddev describe`

`ddev describe` has a short alias, `ddev st`, which is easy to type and worth adopting. It prints the project's details, including the project's location on disk.

The header of the output looks like this:

```text
Project: randyfay ~/workspace/randyfay.com https://randyfay.ddev.site
Docker platform: orbstack
Router: traefik
DDEV version: v1.25.4
```

The project location (`~/workspace/randyfay.com`) is a terminal hyperlink to the project directory. Click it (usually Cmd-click on macOS, Ctrl-click on Linux and Windows) and your file manager opens at the project root. `ddev list` has the same link in its LOCATION column.

DDEV turns these links on for terminals known to support them: iTerm2, Ghostty, WezTerm, Kitty, Alacritty, Windows Terminal, VS Code's integrated terminal, GNOME Terminal and other VTE-based terminals, Konsole, and a few others. If your terminal isn't detected, set `FORCE_HYPERLINK=1` to enable them, for example `FORCE_HYPERLINK=1 ddev st`.

![ddev st output with the project location underlined as a clickable link](/img/blog/2026/09/navigating-ddev-describe.png)

<!-- TODO: Replace or supplement with an iTerm2 screenshot showing the link hovered. Verify whether Apple Terminal.app supports OSC 8 links when forced. -->

## Advanced: Answer Questions With `ddev list -j` and `jq`

`ddev list -j` prints the project list as JSON, and [`jq`](https://jqlang.org/) can answer more specific questions. The project data is under `.raw`. Each entry has fields including `name`, `approot`, `status`, `type`, and `primary_url`.

Running projects and their directories:

```bash
ddev list -j | jq -r '.raw[] | select(.status=="running") | "\(.name)\t\(.approot)"'
```

Names of all Drupal 11 projects:

```bash
ddev list -j | jq -r '.raw[] | select(.type=="drupal11") | .name'
```

The directory of one project, which you can use with `cd` or `code`:

```bash
code "$(ddev list -j | jq -r '.raw[] | select(.name=="myproject") | .approot')"
```

<!-- TODO: Run the `code` example with a real project name before publishing. -->

## Screencast

<!-- TODO: Record the screencast demonstrating ddev list, ddevcd, autojump, code ., and ddev describe, upload to YouTube, and paste the embed here. -->

<iframe width="560" height="315" src="https://www.youtube.com/embed/REPLACE_ME" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Which One to Use

<!-- TODO: Two or three sentences on when each fits. Suggested: ddevcd if you want no extra tools; autojump if you want one tool for all directories; ddev describe link for a one-off visit to the folder in Finder. -->

## Contributions and Feedback

<!-- TODO: Standard closing. Link to Discord, the DDEV issue queue, and the Bluesky threads. Credit people from the replies by name once their replies are collected. -->
