---
title: "Docker Desktop Alternatives Arrive for DDEV (Colima!)"
pubDate: 2022-03-25
author: Randy Fay
categories:
  - Announcements
  - Devops
---

I’m sure you already know that Docker Desktop [changed its license terms](https://www.docker.com/blog/updating-product-subscriptions/) so that larger organizations are required to pay a per-seat license fee to use it now. We all hope that Docker does well and certainly there’s nothing wrong with an organization charging for its work, but there are many organizations that are uncomfortable with this stance for various reasons, or who would prefer to use open-source solutions rather than closed-source solutions like Docker Desktop.

In v1.19, DDEV supports alternative Docker solutions for every platform, so that it’s no longer necessary to use Docker Desktop at all. And these solutions seem to be more robust and more performant.

## macOS: Colima

On macOS, DDEV now supports [Colima](https://github.com/abiosoft/colima), a young project but one that is easy to use and fully open-source. It basically makes the _Linux_ Docker daemon run in a VM on macOS, using the [Lima](https://github.com/lima-vm/lima) project and the robust open-source [Linux Docker daemon](https://github.com/moby/moby).

It’s easy to set up, and is compatible with Docker Desktop (both can be running on the same system at the same time), see [docs](https://ddev.readthedocs.io/en/stable/users/docker%5Finstallation/#macos-installation-colima).

- `brew install colima`
- `colima start --cpu=4 --disk=100 --memory=6 --dns=1.1.1.1`
- `ddev start`

**Advantages of Colima:**

- It seems to be the best-performing solution for macOS by far (with Mutagen enabled), see [performance comparison](https://ddev.com/ddev-local/docker-desktop-and-colima-benchmarking-on-macos/).
- It’s fully open-source
- No license fees
- Installation and startup can be automated.
- Full test coverage with DDEV (Docker Desktop also gets test coverage on every platform)

**Potential Disadvantages of Colima:**

- It currently doesn’t automatically start on login, so you have to use a `colima start` command after a reboot.
- It’s a young project, and while it has been predictable, things can happen. (Note that “things” happen with Docker Desktop very, very regularly, even though it’s not a young project.)

## Windows WSL2: Docker Inside WSL2 Distro

On Windows, WSL2 is by far the preferred way to run DDEV, as it’s perhaps a hundred times faster than running DDEV on traditional Windows. However, since WSL2 came out, the recommended installation procedure has used Docker Desktop (Windows), with its excellent WSL2 integration. However, it turns out that just installing the Linux version of Docker inside the WSL2 distro is at least equivalent in terms of performance, and probably more reliable.

In v1.19 the [docs provide instructions](https://ddev.readthedocs.io/en/stable/users/docker%5Finstallation/#windows-installation-wsl2-with-docker-linux-installed-inside) on the simple technique of installing inside the WSL2 distro. This will be the recommended standard technique in v1.20 and forward, and it works great now.

If you install Docker inside the WSL2 distro, you do not need Docker Desktop at all, and there are no license fees, and everything is open-source. I know of no downside to this approach.

## Linux: Just Do What You’ve Always Done

On Linux, the solution has always been open-source and there is no license fee (see [docs](https://ddev.readthedocs.io/en/stable/users/docker%5Finstallation/#linux-installation-docker)). (Note that Docker has recently introduced Docker Desktop for Linux… I’m sure this works, but it will then involve closed-source and license fees.)

## Don’t Forget Gitpod – You don’t need _anything_ installed on your computer

In the midst of all this, don’t forget that you don’t need to install Docker (or anything else) on your computer or tablet to use DDEV. You can use [Gitpod](https://www.gitpod.io) in your browser all day in many ways. There are plenty of people who are now working this way. It works great. [DDEV provides full support](https://ddev.readthedocs.io/en/stable/users/topics/gitpod/) for Gitpod.
