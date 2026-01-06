---
title: "Setting up a Windows Machine for DDEV Development"
pubDate: 2024-11-04
modifiedDate: 2025-12-30
summary`: Setting up a new Windows machine for DDEV maintenance or development is pretty easy. Here are my opinionated steps.
author: Randy Fay
featureImage:
  src: /img/blog/2024/11/windows-install-blog-logos.png
  alt: Windows, DDEV, Ubuntu logos demonstrating setting up a Windows machine for DDEV.
categories:
  - DevOps
modifiedComment: "Ongoing updates, including claude code and better use of brew for some things now that arm64 is supported"
---

I've recently set up a few Windows machines for DDEV maintenance and development, and wanted to share how I do it. It's surprisingly easy. My approach here is opinionated, but it works for me. You'll do things a little differently I'm sure.

Two recent Windows machines I set up were the new ARM64/Qualcomm/CoPilot variety. They were excellent and fast and had great battery life. There's very little I had to do differently with them, but I'll mention in the steps when there was something different. (I was surprised by the lack of a fingerprint sensor on both, but the "Windows Hello" facial recognition was quite fast. There is no ARM64 Discord app, and the AMD64 one had horrific performance.)

1. Remove unwanted applications like Solitaire and MS Office. I usually start by removing a bunch of bloatware.
2. Do all Windows updates.
3. Turn off the `System` -> `Notifications` -> `Additional settings` that cause the “Windows experience” prompts after upgrade.
4. Enable Windows Update->Advanced Options->Receive updates for other Microsoft Products. Amazingly, this is not on by default, and you might have an old WSL2 kernel! (See [Beware of Dirty Pipes](beware-of-dirty-pipes-and-docker-desktop-on-windows.md).)
5. Install important apps. I always start with these. Each of these except Discord had an ARM64 version. If on an ARM64 machine, make sure you get the right version!
   - Notion
   - Chrome
   - 1Password
   - PhpStorm (Although there are many ways to use PhpStorm on WSL2, I just open the project in `\\wsl.localhost\Ubuntu\home\rfay\workspace\<project>` and it works great and performance is fine.)
   - GoLand
   - Discord
   - Slack
   - [Perforce P4V](https://www.perforce.com/downloads/helix-visual-client-p4v) is my favorite merge conflict resolver.
6. In PowerShell, `wsl --install` and `wsl --update`
7. Windows Terminal is a fantastic terminal and is installed by default these days. I always set it up early with "Default Terminal Application: Windows Terminal" and "Interaction->Automatically Copy Selection to Clipboard", and set Ubuntu as default, and have it auto-start on login.
8. Once Ubuntu is installed:
   - `sudo apt update && sudo apt install -y apt-transport-https autojump bats build-essential ca-certificates ccache clang curl direnv dirmngr etckeeper expect git gnupg htop inetutils-telnet jq libcurl4-gnutls-dev libnss3-tools lsb-release mariadb-client nagios-plugins net-tools nsis pipx postgresql-client unzip vim xdg-utils zip && sudo apt upgrade -y`
   - `sudo snap install --classic go`
   - `sudo snap install --classic node`
   - `sudo snap install ngrok and ngrok config add-authtoken <token>`
9. In Windows Explorer, add my WSL2 home directory to favorites by copying it into the favorites area.
10. Install DDEV using the [DDEV installation instructions](https://docs.ddev.com/en/stable/users/install/). The new GUI Windows installer makes it easy to do any kind of install, but I always recommend WSL2 with Docker-CE.
11. Install and test the [1Password SSH agent](https://developer.1password.com/docs/ssh/agent/).
12. On Windows PowerShell `ssh -T git@github.com` to verify that the 1Password SSH agent is working. If it says "PTY Allocation Failed", just hit `<RETURN>` and ignore it. You should get the confirmation message from GitHub.
13. 1Password WSL2 adaptation:
    `sudo ln -s /mnt/c/WINDOWS/System32/OpenSSH/ssh.exe /usr/local/bin/ssh && sudo ln -s /mnt/c/WINDOWS/System32/OpenSSH/ssh-add.exe /usr/local/bin/ssh-add` (Makes SSH use `ssh.exe` on Windows and the 1Password SSH and Git integrations then work great. This assumes that `/usr/local/bin` in your PATH comes before `/usr/bin`)
14. Link p4merge: `sudo ln -s "/mnt/c/Program Files/Perforce/p4merge.exe" /usr/local/bin/p4merge`.
15. If you have a `dotfiles` repository (containing your shared `.bash_profile`, `.zshrc`, etc.) clone it in WSL2.
16. Check out DDEV's code. `mkdir -p ~/workspace && cd ~/workspace && git clone -o upstream git@github.com:ddev/ddev`
17. GoLand setup:
    - Set `GOROOT` to `/snap/go` in `Linux\Ubuntu`
    - For ARM64 you have to do `go install github.com/go-delve/delve/cmd/dlv@latest` and put this in "Custom Properties" (under help) `dlv.path=//wsl.localhost/Ubuntu/home/rfay/go/bin/dlv`.
18. DDEV repository setup
    - Run `.githooks/linkallchecks.sh`
    - Run `scripts/install-dev-tools.sh`
    - Run `.ci-scripts/nsis_setup.sh /usr/share/nsis`
19. SSH configuration on Windows side: If your SSH username is different from the username automatically configured on the Windows side (or just generally different from the default you want to use) then add something like this to `.ssh/config` on the Windows side (or at `/mnt/c/Users/<username>/.ssh/config`). This will make it so your connection username does not have to be explicitly specified when you use `ssh` or `git`:
    ```text
    Host *
      User <default-user-you-want-to-use>
    ```
20. Install `prettier` and `mkdocs`

    ```bash
    sudo npm install -g prettier
    sudo PIPX_HOME=/usr/local/pipx PIPX_BIN_DIR=/usr/local/bin PIPX_MAN_DIR=/usr/local/share/man pipx install mkdocs
    ```

21. Install `git` for Windows (and `git-bash`)
22. Use [sharpkeys](https://github.com/randyrants/sharpkeys) to disable the Caps Lock key.
23. Install Homebrew for just a few uses: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
24. Install a few things with `brew tap bats-core/bats-core` and `brew install bats-core bats-assert bats-support bats-file claude go golangci-lint`
25. Install [goreleaser pro](https://goreleaser.com/install/#apt-repository)

We'd love to hear your own hints and tips on how you set up a Windows machine (or any other computer!). You can contribute to this article with a [PR to the blog](https://github.com/ddev/ddev.com) or make your suggestions on [Discord](/s/discord). We welcome guest blogs too!

Follow our [blog](https://ddev.com/blog/), [LinkedIn](https://www.linkedin.com/company/ddev-foundation), [Mastodon](https://fosstodon.org/@ddev), and join us on [Discord](/s/discord). And we'd love to have you sign up for the [monthly newsletter](/newsletter).
