---
title: "Contributor Training: DDEV Analytics with Amplitude"
pubDate: 2023-10-31
modifiedDate: 2024-11-03
summary: Contributor training - DDEV Analytics with Amplitude.
author: Randy Fay
#featureImage:
#  src: /img/blog/2024/10/github-actions-tmate-debugging.png
#  alt: Detective Inspector studying GitHub tests
categories:
  - Training
  - Guides
---

Here's our October 31, 2023 [Contributor Training](/blog/category/training) on exploring DDEV analytics with Amplitude:

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/vvZmHyAdcR8?si=lasOa1R9WdL1NtGG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

**Opt-in/Opt-out analytics and the required instrumentation/telemetry** have been part of DDEV for years. Before DDEV v1.22.0, they were done only via [segment.io](http://segment.io) (which was sent to Amplitude). From v1.22.0 they have been sent directly to amplitude.

**Opt-In** is done in `~/.ddev/global_config.yaml` or `ddev config --instrumentation-opt-in=true` (or false). We have no way of knowing how many people opt out. On version upgrades, those who have it turned off are asked if they would be willing to turn it on.

**Instrumentation events are cached before being sent**, so there is no internet action except after 100 actions have happened, then the events get pushed. You can see instrumentation activities with `DDEV_VERBOSE=true ddev start -y 2>&1 | grep AMPLITUDE` for example.

**Instrumentation events are sanitized** to avoid exposing private data. For example, the names of custom commands are removed, as are the names of projects, etc. Although there’s a concept of “user”, there’s no way to tie it to an actual user unless `instrumentation_user` is set in global_config.yaml.

**Amplitude Demo and Exploration**:

- Visit main [DDEV Direct Dashboard](https://app.amplitude.com/analytics/ddev/dashboard/kd4mm9ft)
- Explore the various contents there
- Study `ddev debug *` by using `command path`
- Experiment with changing queries to learn more
- Take a look at segment-based reporting (where pre-v1.22 users are) for example https://app.amplitude.com/analytics/ddev/dashboard/mr0akf9

**Resources**:

- https://academy.amplitude.com/
- https://help.amplitude.com/
- https://ddev.readthedocs.io/en/latest/developers/building-contributing/#examining-data-on-amplitudecom

## Contributions welcome!

Your suggestions to improve this blog are welcome. You can do a PR to this blog adding your techniques. Info and a training session on how to do a PR to anything in ddev.com is at [DDEV Website For Contributors](ddev-website-for-contributors.md). If you're a known community member, we're happy to give you access to Amplitude to explore these details.

Join us for the next [DDEV Live Contributor Training](/blog/contributor-training/). Sign up at [DDEV Live Events Meetup](https://www.meetup.com/ddev-events/events/).
