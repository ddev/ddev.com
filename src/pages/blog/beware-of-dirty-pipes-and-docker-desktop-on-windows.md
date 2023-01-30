---
title: "Beware of Dirty Pipes and Docker Desktop on Windows!"
pubDate: 2022-06-04
author: Randy Fay
featuredImage: https://ddev.com/app/uploads/2022/06/plumbing-g6c1b9a8f3_1920.jpg
categories:
  - DevOps
---

**TL;DR:** _On Windows, if you use WSL2 for anything, make sure you enable “Windows Update” → “Advanced Options” → Receive updates for other Microsoft Products” so that your WSL2 kernel gets updated, whether you’re using traditional Windows or WSL2 for development._

One of the great things about DDEV is that it has huge test coverage. Every PR tests a huge set of test cases on Linux (AMD64 and ARM64, with Mutagen and without), macOS (AMD64 and new M1 ARM64, with Mutagen and with NFS), Windows (traditional, with NFS and Mutagen). It’s a lot of testing. And because it’s such a stress test, it tends to discover things that don’t show up in some other tests, even in Docker. You’ll see lots of issues in the [docker/for-mac](https://github.com/docker/for-mac/issues?q=is%3Aissue+author%3Arfay), [docker/for-win](https://github.com/docker/for-win/issues?q=is%3Aissue+author%3Arfay), and [docker-compose](https://github.com/docker/compose/issues?q=is%3Aissue+author%3Arfay) issue queues that the DDEV testbed discovered.

The other day I was deploying a brand new test runner for Windows (provided by kind community [GitHub Sponsors support](https://github.com/sponsors/rfay)!) and ended up with crazy results on one set of that did a `ddev import-db`

Instead of seeing the normal type of output, which comes from the linux command `pv` inside the db container, which should look like this:

```
59.1MiB 0:00:05 [11.5MiB/s] [================================>] 100%

```

It was spewing crazy output and a failure like this, obviously a horrible buffer overrun or something:

```
↓☺↕♠►☺☺↕
�∟☺_fini_ITM_deregisterTMCloneTable_ITM_registerTMCloneTable__cxa_finalize__deregister_frame_info__register_frame_infoxt_xlate_addputsprintfhtonsgetservbyportputch
arstrdupstrchrxtables_parse_portxt_paramsfreeoptargoptindstrcasecmpstrtoktouppertolowerlibxt_sctp_initxtables_register_matchlibxtables.so.12libc.musl-x86_64.so.1;

```

Of course I thought at first that this was a problem with the new test runner machine, and was going to sort it out and send it back. But memory tested OK, etc.

Then I proceeded down the path of contacting the maintainer of [pv](https://github.com/a-j-wood/pv) with a full bug report suggesting that it might be a buffer overflow or something. He replied that he doubted it, as the memory being shown was probably kernel memory, which would be a disastrous bug if it were being accessed by pv. But he pointed out the [Dirty Pipe Linux Vulnerability](https://dirtypipe.cm4all.com/), which existed in the Linux kernel, 5.16 less than 5.16.11, 5.15 less than 5.15.25, or 5.10 less than 5.10.102.

Sure enough, the problem was that the WSL2 Linux Kernel had not been properly updated, which can affect containers on all current versions of Docker Desktop. The WSL2 kernel version on that machine was 5.10.16.3, and updating the WSL2 kernel using Windows Update resolved the problem.

But why wasn’t the WSL2 kernel updated automatically, you might ask? I thought MS started doing that? Well, you have to enable those updates, it doesn’t happen by default. _**You have to go to “Windows Update” → “Advanced Options” -> Receive updates for other Microsoft Products” so that your WSL2 kernel gets updated.**_

Make sure you set up your Windows system to get kernel updates, whether you’re using Docker Desktop with traditional Windows or WSL2, or using WSL2 for anything else. You don’t want Dirty Pipes!

(There’s more detail about the exact situation and output in [this gist](https://gist.github.com/rfay/18ed619edc366a73b289bd23bfb70bbc).)
