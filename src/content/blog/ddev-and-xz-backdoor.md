---
title: "Was DDEV Affected by the xz Backdoor?"
pubDate: 2024-04-03
#modifiedDate: 2024-03-03
summary: DDEV was not affected by the xz backdoor
author: Randy Fay
featureImage:
  src: /img/blog/2024/04/xz-backdoor.png
  alt: Stealthy xz backdoor attempts to infect the internet
  credit: 'Ideogram.ai: A futuristic thief named XZ, wearing a dark hoodie and armed with a sleek high-tech device. The device glows with a menacing red light, as XZ stealthily navigates the complex web of interconnected computers, searching for vulnerable targets.'
categories:
  - Community
---

## DDEV was not affected by the XZ backdoor

Some of you have been asking whether DDEV was affected by the XZ backdoor that has the internet buzzing, [CVE-2024-3094](https://nvd.nist.gov/vuln/detail/CVE-2024-3094).

When news of this originally hit I quickly investigated and found no reason to think that we're affected in any way by the XZ backdoor. Here's why:

* The XZ Backdoor only found its way into distributions like Arch and Debian Testing (and Homebrew) that have rolling releases, meaning that they take every upstream release as it comes in. DDEV images use only stable upstream distributions, including Debian 11 Bullseye, Debian 12 Bookworm, and Ubuntu 20.04, which don't receive "hot" releases like that. 
* DDEV bundles `xz` only in `ddev-dbserver`. We can see that `ddev-dbserver` has an unaffected version of xz. In any version of DDEV we can use `ddev exec -s db xz --version` to see the installed version. In various versions of the ddev-dbserver I see only versions 5.2.5 and 5.2.4, but you can check it for yourself:

    ```
    $ ddev exec -s db xz --version
    xz (XZ Utils) 5.2.5
    liblzma 5.2.5
    ```
* All distributed DDEV images were built before the episode began and were not rebuilt during the episode.
* In its Golang code, DDEV uses [ulikunitz/xz](https://github.com/ulikunitz/xz), which is quite stable and unrelated to the release in question. DDEV includes ulikunitz/xz 0.5.11, the most recent stable version, from December 2022.

## How can I find out if I have an affected `xz` version?

In general, the affected versions of `xz` were 5.6.0 and 5.6.1. 

`xz --version` will tell you about your host machine, and `ddev exec -s db xz --version` will tell you about `xz` in the DDEV database container.

## What is `xz` anyway and how does DDEV use `xz`?

`xz` is a powerful compression tool, like `gzip` but with more effective compression.

DDEV uses `xz` so that it can read or create `xz`-compressed database dumps, and so it can read `xz`-compressed files tarballs. The significant and long-term DDEV sponsor [B13](https://b13.com/) sponsored this feature [in 2022](https://github.com/ddev/ddev/pull/3721) 🙏🏼.

## How can I fix my host computer if I have an affected `xz` version?

Unless you use Homebrew, you probably don't have the affected version on your host computer, and Homebrew users are probably not affected. However, `brew upgrade` will downgrade `xz` to 5.4.6. Arch Linux and derived distros need to upgrade to get 5.6.1-2, which is built from source.

## What does this mean for small open-source projects like DDEV?

For me, the story here isn't about the vulnerability that didn't actually make it into the real world, but about the open-source story behind it. A small project with an overworked maintainer and insufficient community support got a new maintainer who spent two years gaining trust and then essentially took over the project and released code that had been carefully placed over that whole time. We all know that we depend on hundreds of these projects. 

But DDEV is one of those tiny projects that you depend on! You know that we've been working on [building our maintainer team](https://ddev.com/blog/expanding-ddev-maintainer-team) and [training contributors](https://ddev.com/blog/contributor-training/). We absolutely need to continue **building DDEV's financial stability** and **train contributors and maintainers**. Please:

* Join us in [financially supporting the project](https://github.com/sponsors/ddev). You or your company can support us directly (we invoice for support, accept funds many ways) or you can support via GitHub Sponsors.
* Join us as we restart the Contributor Training in coming months. We need lots of competent eyeballs on the project.
* Take security seriously! Pay attention. Although DDEV may seem to be too small for an attacker to take time with, it probably isn't. Imagine if someone were to be able to plant something that affected your computer or your project code. It might be worth it to attach DDEV. 

## Resources

* [Ars Technica summary](https://arstechnica.com/security/2024/04/what-we-know-about-the-xz-utils-backdoor-that-almost-infected-the-world/) has links to many important summaries.
* [Changelog news links](https://changelog.com/news/88/email)
* [Timeline and links](https://boehs.org/node/everything-i-know-about-the-xz-backdoor)
* [Arch Linux information](https://archlinux.org/news/the-xz-package-has-been-backdoored/).


Thanks to all of you for working toward realizing our goal of a sustainable project! For more information about how you can support the project, the various ways are explained in [sponsors page](https://github.com/sponsors/ddev). See more about our long-term financial goals at [Expanding the DDEV maintainer team - how we'll fund it](/blog/expanding-ddev-maintainer-team).

