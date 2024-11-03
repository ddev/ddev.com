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

![DDEV Environment Usage](/img/blog/2024/11/ddev-environment-usage.png)

<a href="https://app.amplitude.com/analytics/share/1238aca77448459aac7473f2fedbe109" target="_blank">Live values for DDEV Environment Usage</a>

## DDEV Commands

The most popular commands are probably the ones you'd expect, `ddev composer`, `ddev ssh`, `ddev php`. `ddev drush` is excluded here because it was used 515,000 times in the last 7 days. I guess some people must be using it in an automated situation. If you're using any of these in CI, please turn off reporting if it happens to be on, `ddev config global --instrumentation-opt-in=false` or `export DDEV_NO_INSTRUMENTATION=true`.

![DDEV Commands, excluding drush](/img/blog/2024/11/Commands.png)

<a href="https://app.amplitude.com/analytics/share/f4e48d8678134561ae034f9a020faab4" target="_blank">Live values for DDEV commands</a>

## CMS Project Types

Drupal, the generic "PHP" type, and TYPO3 remain the most popular, but they're the ones with the longest-term support. But look at Laravel, Craft CMS, and Laravel getting more popular all the time! 

![Most Popular CMS Project Types](/img/blog/2024/11/CMS-project-types.png)

<a href="https://app.amplitude.com/analytics/share/0619ab47f9cd433cb14bdea4b4aab3e2" target="_blank">Live version of CMS Project Types</a>

## macOS Docker Providers

People have [lots of Docker providers](https://ddev.readthedocs.io/en/stable/users/install/docker-installation/#docker-installation-macos) to choose from on macOS. My own favorite is OrbStack due to its performance and excellent maintenance, but the classic Docker Desktop still has a huge market share. Neither of those is open source, but Lima, Colima, and Rancher Desktop all are.

![macOS Docker Providers](/img/blog/2024/11/macOSDockerProvider.png)

<a href="https://app.amplitude.com/analytics/share/07d652c6e14e44c68b192625ea8ee066" target="_blank">Live results on macOS Docker Providers</a>

## WSL2 Docker Provider

On WSL2, though, the robust and stable Docker CE wins out by a little bit. Note that *all* of the Docker providers are dependent on (and bundle) the excellent Docker CE project, with is maintained by Docker, Inc. So if you use Docker in any way, thank them!

![WSL2 Docker Providers](/img/blog/2024/11/WSL2DockerProvider.png)

<a href="https://app.amplitude.com/analytics/share/dad41af1c2a44bb6af1d6ec8cad65bd7" target="_blank">Live results for WSL2 Docker Provider</a>

## macOS Architecture (Apple Silicon vs Intel)

It seems that 81.5% of you have gotten new Macs now!

![macOS System Architecture](/img/blog/2024/11/macOS_UsagebyArchitecture.png)

<a href="https://app.amplitude.com/analytics/share/5aedd7e813a642cab03306e179604836" target="_blank">Live results for macOS Architecture</a>

## Add-on Usage

As you know, the DDEV Add-on ecosystem has been a tremendous success, because people can scratch their own itch and the community can maintain add-ons that they need. Here are the most popular ones, excluding phpMyAdmin, which had by far the most usage (3 times the usage of the redis add-on).

![Add-On Usage](/img/blog/2024/11/add-ons-excluding-phpmyadmin.png)


<a href="https://app.amplitude.com/analytics/share/4e4959f0f36c49d6a24cc2726e8231e5" target="_blank">Live version of Add-on usage</a>

## Bundled `ddev pull` Usage

DDEV provides a number of bundled hosting providers, including Platform.sh, Pantheon, Acquia, Lagoon, etc. Here are the actual usages of some of these. There are loads and loads of others that you have customized and used various ways. Many people customize these with names like `prod` and `staging` for those kinds of usage too, so this is very much not complete. And DDEV can be used with so many other situations, like [rsync and any hosting provider](https://ddev.readthedocs.io/en/stable/users/providers/). Just the other day I found out that the Mittwald hosting service provides a [Mittwald add-on](https://github.com/mittwald/ddev) that provides a custom hosting provider!

![ddev pull Usage](/img/blog/2024/11/ddev-pull-commands.png)

<a href="https://app.amplitude.com/analytics/share/4837a47cab1b46eb95c8a4b73f3a5bb2" target="_blank">Live version of `ddev pull` usage</a>

## DDEV Versions

It seems that most of you keep up-to-date with recent versions, thank you! It helps loads with support when we know that you're using something recent. There are a few using versions back to v1.22.0 though, impressive that they can still do this. I imagine there are a few out there prior to that, reports here only include v1.22.0+.

![ddev versions in use](/img/blog/2024/11/ddev-versions.png)

<a href="https://app.amplitude.com/analytics/share/a0fde21314e34378831943af7f9dd022" target="_blank">Live version of versions in use</a>

## Users by Timezone

We do our best not to collect any user-identifiable information. The timezone is interesting though. So many of you in Europe!

![user time zones](/img/blog/2024/11/UsersbyTimezone.png)

<a href="https://app.amplitude.com/analytics/share/5735804e9a83429cb6d131b62aa174a6" target="_blank">Live version of Users by Timezone</a>

## Router Usage

Now that the Traefik router has been standard for two major versions, there's very little usage of the old Nginx Proxy router. We were going to remove it in the upcoming v1.24.0, but we're not having to spend any time with it, so will probably not do that. If you need it, please speak up and let us know.

![Router usage](/img/blog/2024/11/RouterUsage.png)

<a href="https://app.amplitude.com/analytics/share/b443310e41854c4a9c79ff7c5d6b399b" target="_blank">Live version of Router Usage</a>

## Explore them yourself!

You can explore these yourself, ask for permission.** If you're a known community member I'll happily add your access to Amplitude to explore. There are many more things that can be done with this. See [Amplitude Contributor Training](amplitude-ddev-analytics-contributor-training.md).

**THANKS to all of you who are supporting DDEV’s path to sustainability** and who have gotten your organizations to do so. 13,600 or so of you are using this tool and ecosystem weekly, about 55 of you are financially supporting its sustainability. Time to [step up](https://github.com/sponsors/ddev) if you're not in those 55! We need you in the same way you need us.

Want to keep up as the month goes along? Follow our [blog](https://ddev.com/blog/), [LinkedIn](https://www.linkedin.com/company/ddev-foundation), [Mastodon](https://fosstodon.org/@ddev), [X,](https://x.com/randyfay) and join us on [Discord](https://discord.gg/5wjP76mBJD).
