---
title: "dummy stuff, round 2 for update"
pubDate: 2026-04-01
#modifiedDate: 2025-02-06
summary: The new XHGui feature in DDEV makes profiling (studying a website's performance and bottlenecks) even easier than it was before, with a consistent web interface.
author: Randy Fay
featureImage:
  src: /img/blog/2025/04/typo3-xhgui.png
  alt: Sample XHGui screen in new XHGui feature
categories:
  - Community
  - Performance
---

## XHGui Lands in DDEV v1.24.4

Thanks to sponsorship from the [TYPO3 Community Budget Ideas](https://talk.typo3.org/c/t3a/community-budget-ideas-2025-q1/45), DDEV now includes XHGui support for its XHProf profiling. This brings a much-improved experience with a consistent, browser-based interface.

DDEV has had XHProf profiling for some time, and many in the community have loved it, but it had a few flaws; the list of profiling runs was ugly and uncoordinated, and the list was lost on `ddev restart`.

However, the longstanding [XHGui](https://github.com/perftools/xhgui) project was out there for years, and it made much more sense.

With XHGui, you can now track performance bottlenecks with a clean interface, persistent data, and detailed breakdowns of CPU and memory usage.

## How to Use XHGui for Profiling

In DDEV v1.24.4+ you can switch to the XHGui profiling mode (permanently) with

```bash
ddev config global --xhprof-mode=xhgui && ddev restart
```

Start profiling with

```bash
ddev xhgui on
```

Visit a few pages in your app to collect profiling data, then

```bash
ddev xhgui launch
```

In general, click one of the `GET` or `POST` links and follow it in to explore detailed CPU and memory usage breakdowns.

If you have questions, join us in one of the [DDEV support venues](https://docs.ddev.com/en/stable/users/support/), especially [Discord](https://ddev.com/s/discord) and we'll work it through with you.

The [DDEV Docs on XHProf](https://docs.ddev.com/en/stable/users/debugging-profiling/xhprof-profiling/) have some good starters, but your suggestions are welcome!

## XHGui Demonstration Screencast

Here's a quick demonstration of using XHGui with a TYPO3 site in DDEV.

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/dSnGkxnQPb8?si=IwwbDnoeVsmmy3ah" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Thanks to TYPO3, glensc, and tyler36

Serious thanks are due to:

- The [TYPO3 Organization](https://typo3.org/) for funding this feature integration.
- [Elan Ruusamäe (glensc)](https://github.com/glensc) for years of maintaining the XHGui project (and extreme responsiveness as we worked on this).
- DDEV community member [tyler36](https://github.com/tyler36), who created the original DDEV add-on and helped it incubate and mature over years and supported its inclusion in DDEV core.

## Support

Try it out today and let us know how it goes — your feedback helps shape the future of DDEV! Join us in the [DDEV support venues](https://docs.ddev.com/en/stable/users/support/) if you want to talk about XHGui and profiling.
