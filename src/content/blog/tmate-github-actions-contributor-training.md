---
title: "Contributor Training: Tmate for Debugging GitHub Actions Workflows"
pubDate: 2024-10-23
# modifiedDate: 2024-10-23
summary: Contributor training - Using tmate to debug and experiment with GitHub Actions.
author: Randy Fay
featureImage:
  src: /img/blog/2024/10/github-actions-tmate-debugging.png
  alt: Detective Inspector studying GitHub tests
categories:
  - Training
  - Guides
---


Here's our October 23, 2024 [Contributor Training](/blog/category/training) on using `ddev debug test` to help other users:

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/cXsCX2pBPkA?si=QgjPRkHMZUIKH2jc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## What is Tmate?

[mxschmitt/action-tmate](https://github.com/mxschmitt/action-tmate) provides a way to ssh into actual running GitHub Actions VMs to debug your tests. 

## Why do we need Tmate?

Often it's hard to understand what has happened with an test because all we see in GitHub's web UI is the output, and we can't interact with it. And trying to recreate the test environment is sometimes fine, but sometimes it's hard to recreate the test. GitHub runners have different memory configuration, disk space, and different packages installed, and they're typically running AMD64 Ubuntu, which may not be something we have easy access to.

## Alternatives to Tmate

1. We normally will try to understand a test failure by running it locally.
2. Running in a similar Linux/AMD64 system like GitPod is a pretty easy option. 
3. [nektos/act](https://github.com/nektos/act) is another recommended competitor to Tmate. It uses Docker and a Docker image to run an action on your local machine. I haven't had luck with it when I've tried it.

## Security Concerns

If your test has secrets, then anyone who can ssh into it has access to those secrets.

In addition, the owners of `ssh.tmate.io` clearly have access to the ssh session you're experimenting with, so think carefully about secrets that might be exposed. (In many tests, there are no secrets likely exposed or available. We have a couple of DDEV GitHub actions that have sensitive secrets, and a few more that have far-less sensitive secrets.)

I recommend always using `limit-access-to-actor: true` so that only the user that has launched the test can ssh into it.

## Usage Examples

These examples are all at [rfay/tmate-demos](https://github.com/rfay/tmate-demos/), which you can fork and experiment with to your heart's delight.

### Basic on-push example with tmate running after the work is done

[This on-push example](https://github.com/rfay/tmate-demos/blob/main/.github/workflows/ddev-drupal-setup-on-push.yaml) just does some work (sets up DDEV and a Drupal project) and then right after that the Tmate action starts up and starts telling you how to SSH into the test.

### Detached example, where Tmate starts at the end

In the [detached example](https://github.com/rfay/tmate-demos/blob/main/.github/workflows/detached.yaml) Tmate is set up early in the workflow, but is set to `detached: true`, so doesn't become active until everything else is done. However, if there's an error, we won't get to the Tmate step this way.

### Failure Example

Often we have a complex step and want to be able to debug it if it fails. For this we can used `if failed()`, as shown in the [failure example](https://github.com/rfay/tmate-demos/blob/main/.github/workflows/on_fail.yaml). Tmate kicks in automatically if the step *before* it fails. It would be nicer if it kicked in on any failure, but it just kicks in when the step before fails.

### Workflow Dispatch Example

The [Workflow Dispatch](https://github.com/rfay/tmate-demos/blob/main/.github/workflows/workflow_dispatch.yaml) is one of my favorite techniques, because you can easily restart the workflow as many times as you like, and choosing whether to invoke Tmate is just a click of a checkbox.

## Contributions welcome!

Your suggestions to improve this blog are welcome. You can do a PR to this blog adding your techniques. Info and a training session on how to do a PR to anything in ddev.com is at [DDEV Website For Contributors](ddev-website-for-contributors.md).

Join us for the next [DDEV Live Contributor Training](/blog/contributor-training/). Sign up at [DDEV Live Events Meetup](https://www.meetup.com/ddev-events/events/).
