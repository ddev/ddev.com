---
title: "DDEV Automated Testing"
pubDate: 2019-04-04
modifiedDate: 2024-07-30
summary: What DDEV’s automatic tests look like behind the scenes.
author: Randy Fay
featureImage:
  src: /img/blog/2019/03/github-checks-running.png
  alt: Cropped screenshot of GitHub checks running
categories:
  - DevOps
---

We’re quite proud of the automated testing setup we use to develop [DDEV](https://github.com/ddev/ddev). Each pushed commit to the project gets a full set of tests run on macOS, Windows with Docker-for-Windows, Windows with Docker Toolbox, and Linux (Ubuntu).

Originally we tested quite nicely with [CircleCI](https://circleci.com) (on Linux), and that did pretty well at finding issues with macOS. But when we started supporting Windows and macOS Apple Silicon we found that we really needed explicit coverage on those machines because there are a _lot_ of behavior differences, so we implemented tests for each platform using [Buildkite](https://buildkite.com) and test runners that we maintain.

Even though DDEV is written in [Go](https://golang.org/), which is amazingly complete for each platform, things like filesystem case-sensitivity, slashes, and behavior of `docker-compose` cause plenty of unexpected issues. So we run more than 10 test suites on each push, building and testing the containers on Linux (with GitHub Workflows), traditional Windows, WSL2 (both Docker Desktop and Docker-ce), and macOS (Apple Silicon and Intel). And it also includes all the permutations for Apache support and the Mutagen features. It’s a lot of computing power, but it’s paid off enormously. All of this shows up very nicely on the DDEV [pull request](https://github.com/ddev/ddev/pulls) and [commits](https://github.com/ddev/ddev/commits/main) pages, so it’s easy to see at a glance what’s happened with testing.

Our test suite is large and has grown over the lifespan of DDEV, up to about 5,500 lines of test code (out of the 14,680 lines of code that make up DDEV) that get run on every push.

The biggest problems we have with this whole setup is it seems to push Docker to the limit, especially on Windows. So we see too often the Docker failures and hangs that users see only infrequently. Currently, this means a lot of random maintenance of Docker on the test machines.

One of our upcoming goals is to try to get all the macOS and Windows test runners out of Randy's house, as this is too dependent on him. Watch the [issue](https://github.com/ddev/ddev/issues/6444) to find out more. Here's a picture of what most of the macOS and Windows test runners look like today:

![Test Runners in Randy's House](/img/blog/2024/07/test-runners-randys-house.jpg)

Try out DDEV for yourself, and consider contributing to it as an open source project! We have a [contribution guide for this project](https://github.com/ddev/ddev/blob/main/CONTRIBUTING.md) as well as a [Community Guide and Code of Conduct](https://github.com/ddev/community) for all of our projects.
