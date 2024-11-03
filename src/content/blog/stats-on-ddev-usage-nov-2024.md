---
title: "DDEV Live Usage Statistics"
pubDate: 2024-11-05
#modifiedDate: 2024-09-06
summary: DDEV Live Usage Statistics from Amplitude
author: Randy Fay
featureImage:
  src: /img/blog/2024/11/ddev-environment-usage.png
  alt: DDEV Usage of each environment
categories:
  - Community
---

Here's an updated review of some DDEV usage stats. It's always fun to see some of these. Most of these charts are number from the past 7 days. And they are LIVE stats as you view.

## DDEV Environments

DDEV Environment Usage shows macOS (darwin) as the most popular development environment, but WSL2 and Traditional Windows are almost 25%, and Linux 21%. It's amazing that DDEV can work so well for so many different people in such different environments! Note that Codespaces and GitPod don't normally report information by default, so those results are questionable.

<iframe class="frame"
src="https://app.amplitude.com/analytics/share/embed/e102e50b-33af-4aaf-b576-88dc4c0c9cfe"
frameBorder="0" width="100%" height="500">
</iframe>

## DDEV Commands

The most popular commands are probably the ones you'd expect, `ddev composer`, `ddev ssh`, `ddev php`. `ddev drush` is excluded here because it was used 515,000 times in the last 7 days. I guess some people must be using it in an automated situation. If you're using any of these in CI, please turn off reporting if it happens to be on, `ddev config global --instrumentation-opt-in=false` or `export DDEV_NO_INSTRUMENTATION=true`.

<iframe class="frame"
src="https://app.amplitude.com/analytics/share/embed/78211b11-26e6-451f-93d3-5d4a8c9df1a2"
frameBorder="0" width="100%" height="500">
</iframe>

## CMS Project Types

Drupal, the generic "PHP" type, and TYPO3 remain the most popular, but they're the ones with the longest-term support. But look at Laravel, Craft CMS, and Laravel getting more popular all the time! 

<iframe class="frame"
src="https://app.amplitude.com/analytics/share/embed/e93cdd56-32bf-4191-9349-0e623a344e64"
frameBorder="0" width="100%" height="500">
</iframe>

## macOS Docker Providers

People have [lots of Docker providers](https://ddev.readthedocs.io/en/stable/users/install/docker-installation/#docker-installation-macos) to choose from on macOS. My own favorite is OrbStack due to its performance and excellent maintenance, but the classic Docker Desktop still has a huge market share. Neither of those is open source, but Lima, Colima, and Rancher Desktop all are.

<iframe class="frame"
src="https://app.amplitude.com/analytics/share/embed/1e639c5d-fc25-42dd-830e-695b06ef95bd"
frameBorder="0" width="100%" height="500">
</iframe>

Here it is as a (static) pie chart:

![macOS Docker Providers](/img/blog/2024/11/macOSDockerProvider.png)


## WSL2 Docker Provider

On WSL2, though, the robust and stable Docker CE wins out by a little bit. Note that *all* of the Docker providers are dependent on (and bundle) the excellent Docker CE project, with is maintained by Docker, Inc. So if you use Docker in any way, thank them!

<iframe class="frame"
src="https://app.amplitude.com/analytics/share/embed/5834eb96-b918-451d-9f92-fcd3c16fc3dd"
frameBorder="0" width="100%" height="500">
</iframe>

## macOS Architecture (Apple Silicon vs Intel)

It seems that 81.5% of you have gotten new Macs now!

<iframe class="frame"
src="https://app.amplitude.com/analytics/share/embed/254efa52-a341-490b-b74a-1a9cdce4f280"
frameBorder="0" width="100%" height="500">
</iframe>

## Add-on Usage

As you know, the DDEV Add-on ecosystem has been a tremendous success, because people can scratch their own itch and the community can maintain add-ons that they need. Here are the most popular ones, excluding PhpMyAdmin, which had by far the most usage (3 times the usage of the redis add-on).

<iframe class="frame"
src="https://app.amplitude.com/analytics/share/embed/033d6df6-0665-44ed-ab87-9fa298848c58"
frameBorder="0" width="100%" height="500">
</iframe>

Here's a static version with more entries:

![Static Add-On Usage](/img/blog/2024/11/add-ons-excluding-phpmyadmin.png)


## Bundled `ddev pull` Usage

DDEV provides a number of bundled hosting providers, including Platform.sh, Pantheon, Acquia, Lagoon, etc. Here are the actual usages of some of these. There are loads and loads of others that you have customized and used various ways. Many people customize these with names like `prod` and `staging` for those kinds of usage too, so this is very much not complete. And DDEV can be used with so many other situations, like [rsync and any hosting provider](https://ddev.readthedocs.io/en/stable/users/providers/). Just the other day I found out that the Mittwald hosting service provides a [Mittwald add-on](https://github.com/mittwald/ddev) that provides a custom hosting provider!

<iframe class="frame"
src="https://app.amplitude.com/analytics/share/embed/34c2696d-2bd4-409d-baba-b51f3b264672"
frameBorder="0" width="100%" height="500">
</iframe>

## DDEV Versions

It seems that most of you keep up-to-date with recent versions, thank you! It helps loads with support when we know that you're using something recent. There are a few using versions back to v1.22.0 though, impressive that they can still do this. I imagine there are a few out there prior to that, reports here only include v1.22.0+.

<iframe class="frame"
src="https://app.amplitude.com/analytics/share/embed/d08fb4e0-c77c-4471-8887-8741e16fc63e"
frameBorder="0" width="100%" height="500">
</iframe>

## Users by Timezone

We do our best not to collect any user-identifiable information. The timezone is interesting though. So many of you in Europe!

<iframe class="frame"
src="https://app.amplitude.com/analytics/share/embed/89cc529a-308f-40dd-ba27-0732580cbe82"
frameBorder="0" width="100%" height="500">
</iframe>

## Router Usage

Now that the Traefik router has been standard for two major versions, there's very little usage of the old Nginx Proxy router. We were going to remove it in the upcoming v1.24.0, but we're not having to spend any time with it, so will probably not do that. If you need it, please speak up and let us know.

<iframe class="frame"
src="https://app.amplitude.com/analytics/share/embed/ecffbc72-a7ce-436f-8780-0cfc2fbd5794"
frameBorder="0" width="100%" height="500">
</iframe>

**You can explore these yourself, ask for permission.** If you're a known community member I'll happily add your access to Amplitude to explore. There are many more things that can be done with this. See [Amplitude Contributor Training](amplitude-ddev-analytics-contributor-training.md).

**THANKS to all of you who are supporting DDEV’s path to sustainability** and who have gotten your organizations to do so. 13,600 or so of you are using this tool and ecosystem weekly, about 55 of you are financially supporting its sustainability. Time to [step up](https://github.com/sponsors/ddev) if you're not in those 55! We need you in the same way you need us.

Want to keep up as the month goes along? Follow our [blog](https://ddev.com/blog/), [LinkedIn](https://www.linkedin.com/company/ddev-foundation), [Mastodon](https://fosstodon.org/@ddev), [X,](https://x.com/randyfay) and join us on [Discord](https://discord.gg/5wjP76mBJD).
