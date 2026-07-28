---
title: "Docker Desktop Alternatives Arrive for DDEV (Colima!)"
pubDate: 2022-03-25
modifiedDate: 2026-07-28
modifiedComment: "Added OrbStack and Rancher Desktop, which have since become the more commonly recommended alternatives to Colima, and dropped the v1.19/v1.20 version-pin framing."
summary: The pros and cons of DDEV’s Docker Desktop alternatives, including OrbStack, Rancher Desktop, and Colima.
author: Randy Fay
categories:
  - Announcements
  - DevOps
---

I’m sure you know that Docker Desktop [changed its license terms](https://www.docker.com/blog/updating-product-subscriptions/) so that larger organizations are required to pay a per-seat license fee to use it now. We all hope that Docker does well and certainly there’s nothing wrong with an organization charging for its work, but there are many organizations that are uncomfortable with this stance for various reasons, or who would prefer to use open-source solutions rather than closed-source solutions like Docker Desktop.

DDEV supports alternative Docker solutions for every platform, so that it’s no longer necessary to use Docker Desktop at all. And these solutions seem to be more robust and more performant.

## macOS: OrbStack, Rancher Desktop, Colima

On macOS, DDEV supports several alternatives to Docker Desktop, documented in detail in the [Docker installation docs](https://docs.ddev.com/en/stable/users/install/docker-installation/#macos):

- [**OrbStack**](https://docs.ddev.com/en/stable/users/install/docker-installation/#orbstack): The most popular alternative with DDEV users — fast, lightweight, and easy to install (`brew install orbstack`). It’s commercial and not free for professional use.
- [**Rancher Desktop**](https://docs.ddev.com/en/stable/users/install/docker-installation/#rancher-desktop): Free and open-source, with automated testing against DDEV. Slower startup than OrbStack.
- [**Colima**](https://docs.ddev.com/en/stable/users/install/docker-installation/#colima): Free and open-source, bundling [Lima](https://github.com/lima-vm/lima) to run the Linux Docker daemon in a VM. `brew install colima`, then `colima start --cpu=4 --disk=100 --memory=6 --dns=1.1.1.1`.

All three are compatible with Docker Desktop (only one can be active at a time, but you can switch), and all are faster with [Mutagen](https://docs.ddev.com/en/stable/users/install/performance/) enabled, which is the default.

## Windows WSL2: Docker Inside WSL2 Distro

On Windows, WSL2 is by far the preferred way to run DDEV, as it’s perhaps a hundred times faster than running DDEV on traditional Windows. Installing the Linux version of Docker directly inside the WSL2 distro is the recommended approach, and is at least equivalent in performance to Docker Desktop's WSL2 integration, and probably more reliable. See the [docs](https://docs.ddev.com/en/stable/users/install/docker-installation/#windows) for installation instructions, including Rancher Desktop as another free, open-source alternative.

If you install Docker inside the WSL2 distro, you do not need Docker Desktop at all, and there are no license fees, and everything is open-source. I know of no downside to this approach.

## Linux: Do What You’ve Always Done

On Linux, the solution has always been open-source and there is no license fee (see [docs](https://docs.ddev.com/en/stable/users/install/docker-installation/#linux)). (Note that the separate GUI product "Docker Desktop for Linux" does not work with DDEV.)
