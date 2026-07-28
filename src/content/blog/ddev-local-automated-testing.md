---
title: "DDEV Automated Testing"
pubDate: 2019-04-04
modifiedDate: 2026-07-28
modifiedComment: "Removed the Docker Toolbox/CircleCI references (both retired years ago; testing is all GitHub Actions now) and the stale line-count figures, which go out of date quickly. If you're looking to speed up your own project's CI with DDEV rather than DDEV's own test infrastructure, see [Using WarpBuild to speed up DDEV in CI](/blog/ddev-ci-warpbuild/)."
summary: What DDEV’s automatic tests look like behind the scenes.
author: Randy Fay
featureImage:
  src: /img/blog/2019/03/github-checks-running.png
  alt: Cropped screenshot of GitHub checks running
categories:
  - DevOps
---

We’re quite proud of the automated testing setup we use to develop [DDEV](https://github.com/ddev/ddev). Each pushed commit to the project gets a full set of tests run on macOS, Windows (including WSL2), and Linux.

Originally we tested quite nicely with CircleCI (on Linux), and that did pretty well at finding issues with macOS. But when we started supporting Windows and macOS Apple Silicon we found that we really needed explicit coverage on those machines because there are a _lot_ of behavior differences, so over time we moved everything to [GitHub Actions](https://github.com/ddev/ddev/tree/main/.github/workflows), including self-hosted runners we maintain ourselves for macOS and Windows.

Even though DDEV is written in [Go](https://golang.org/), which is amazingly complete for each platform, things like filesystem case-sensitivity, slashes, and behavior of `docker-compose` cause plenty of unexpected issues. So we run more than 10 test suites on each push, building and testing the containers on Linux, traditional Windows, WSL2 (both Docker Desktop and Docker CE), and macOS (Apple Silicon and Intel). And it also includes all the permutations for Apache support and the Mutagen features. It’s a lot of computing power, but it’s paid off enormously. All of this shows up very nicely on the DDEV [pull request](https://github.com/ddev/ddev/pulls) and [commits](https://github.com/ddev/ddev/commits/main) pages, so it’s easy to see at a glance what’s happened with testing.

Our test suite is large and has grown substantially over the lifespan of DDEV, and gets run on every push. Browse the [`.github/workflows`](https://github.com/ddev/ddev/tree/main/.github/workflows) directory and the [`cmd`](https://github.com/ddev/ddev/tree/main/cmd) and `pkg` test files for a current sense of scale.

The biggest problems we have with this whole setup is it seems to push Docker to the limit, especially on Windows. So we see too often the Docker failures and hangs that users see only infrequently. Currently, this means a lot of random maintenance of Docker on the test machines.

One of our ongoing goals is to try to get the macOS and Windows test runners out of Randy's house, as this is too dependent on him. Watch the [issue](https://github.com/ddev/ddev/issues/6444) to find out more — it's still open as of this update. Here's a picture of what most of the macOS and Windows test runners looked like when this was written:

![Test Runners in Randy's House](/img/blog/2024/07/test-runners-randys-house.jpg)

Try out DDEV for yourself, and consider contributing to it as an open source project! We have a [contribution guide for this project](https://github.com/ddev/ddev/blob/main/CONTRIBUTING.md) as well as a [Community Guide and Code of Conduct](https://github.com/ddev/.github) for all of our projects.
