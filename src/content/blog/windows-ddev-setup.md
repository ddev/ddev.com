---
title: "Setting up a Windows Machine for DDEV"
pubDate: 2024-11-04
#modifiedDate: 2024-10-17
summary: Setting up a new Windows machine for DDEV maintenance or development is pretty easy. Here are my opinionated steps.
author: Randy Fay
featureImage:
  src: /img/blog/2024/11/windows-install-blog-logos.png
  alt: Windows, DDEV, Ubuntu logos demonstrating setting up a Windows machine for DDEV.
categories:
  - DevOps
---

I've recently set up a few Windows machines for DDEV maintenance and development, and wanted to share how I do it. It's surprisingly easy. My approach here is opinionated, but it works for me. You'll do things a little differently I'm sure.

Two recent Windows machines I set up were the new ARM64/Qualcomm/CoPilot variety. They were excellent and fast and had great battery life. There's very little I had to do differently with them, but I'll mention in the steps when there was something different. (I was surprised by the lack of a fingerprint sensor on both, but the "Windows Hello" facial recognition was quite fast. There is no ARM64 Discord app, and the AMD64 one had horrific performance.)

1. Remove unwanted applications like Solitaire and MS Office. I usually start by removing a bunch of bloatware. 
2. Do all Windows updates. 
3. Turn off the `System` -> `Notifications` -> `Additional settings` that cause the “Windows experience” prompts after upgrade. 
4. Enable Windows Update->Advanced Options->Receive updates for other Microsoft Products. Amazingly, this is not on by default, and you might have an old WSL2 kernel! (See [Beware of Dirty Pipes](beware-of-dirty-pipes-and-docker-desktop-on-windows.md).)
5. Install important apps. I always start with these. Each of these except Discord had an ARM64 version. If on an ARM64 machine, make sure you get the right version!
    -  Notion
    -  Chrome
    -  1Password
    -  PhpStorm (Although there are many ways to use PhpStorm on WSL2, I just open the project in `\\wsl.localhost\Ubuntu\home\rfay\workspace\<project>` and it works great and performance is fine.)
    -  GoLand
    -  Discord
    -  Slack
    - [Perforce P4V](https://www.perforce.com/downloads/helix-visual-client-p4v) is my favorite merge conflict resolver.
6. In PowerShell, `wsl --install` and `wsl --update`
7. Windows Terminal is a fantastic terminal and is installed by default these days. I always set it up early with "Default Terminal Application: Windows Terminal" and "Interaction->Automatically Copy Selection to Clipboard", and set Ubuntu as default, and have it auto-start on login. 
8. Once Ubuntu is installed:
    -  `sudo apt update && sudo apt install -y apt-transport-https autojump build-essential ca-certificates ccache clang curl dirmngr etckeeper expect git gnupg jq libcurl4-gnutls-dev libnss3-tools lsb-release mariadb-client nagios-plugins net-tools postgresql-client unzip vim xdg-utils zip && sudo apt upgrade -y`
    -  `sudo snap install --classic go`
    -  `sudo snap install ngrok and ngrok config add-authtoken <token>`
9. In Windows Explorer, add my WSL2 home directory to favorites by copying it into the favorites area.
10. Run the [DDEV WSL2 install script](https://ddev.readthedocs.io/en/stable/users/install/ddev-installation/#wsl2-docker-ce-inside-install-script).
    * On ARM64 this will fail the Chocolatey installation because Chocolatey doesn't plan to support ARM64. But you can ignore the failure; the script continues on anyway.
    * On ARM64, `choco uninstall -y mkcert gsudo` so that the DDEV installer can get the native versions of each of these.
    * On ARM64, install the Windows-side DDEV from the installer in the [DDEV releases](https://github.com/ddev/ddev/releases). We'll probably discontinue documenting the Chocolatey install technique in the future.)
11. Install and test the fantastic [1Password ssh agent](https://developer.1password.com/docs/ssh/agent/).
12. On Windows PowerShell `ssh -T git@github.com` to verify that the 1Password SSH agent is working. If it says "PTY Allocation Failed", just hit `<RETURN>` and ignore it. You should get the confirmation message from GitHub.
13. 1Password WSL2 adaptation:
    `sudo ln -s /mnt/c/WINDOWS/System32/OpenSSH/ssh.exe /usr/local/bin/ssh && sudo ln -s /mnt/c/WINDOWS/System32/OpenSSH/ssh-add.exe /usr/local/bin/ssh-add` (Makes ssh use `ssh.exe` on Windows and the 1Password SSH and Git integrations then work great. This assumes that `/usr/local/bin` in your PATH comes before `/usr/bin`)
14. If you have a `dotfiles` repository (containing your shared `.bash_profile`, `.zshrc`, etc.) clone it in WSL2.
15. Check out DDEV's code. `mkdir -p ~/workspace && cd ~/workspace && git clone -o upstream git@github.com:ddev/ddev`
16. `echo "capath=/etc/ssl/certs/" >>~/.curlrc` to make Curl work right with `mkcert`.
17. GoLand setup:
    - Set `GOROOT` to `/snap/go`
    - For ARM64 you have to do `go install github.com/go-delve/delve/cmd/dlv@latest` and put this in IDE properties (under help) `dlv.path=//wsl.localhost/Ubuntu/home/rfay/go/bin/dlv`.
18. DDEV repository setup
    - Run `.githooks/linkallchecks.sh`
    - Install `golangci-lint` for `make staticrequired`: `go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest`

We'd love to hear your own hints and tips on how you set up a Windows machine (or any other computer!). You can contribute to this article with a [PR to the blog](https://github.com/ddev/ddev.com) or make your suggestions on [Discord](https://discord.com/invite/5wjP76mBJD). We welcome guest blogs too!

Follow our [blog](https://ddev.com/blog/), [LinkedIn](https://www.linkedin.com/company/ddev-foundation), [Mastodon](https://fosstodon.org/@ddev), and join us on [Discord](https://discord.gg/5wjP76mBJD). And we'd love to have you sign up for the [monthly newsletter](/newsletter).
