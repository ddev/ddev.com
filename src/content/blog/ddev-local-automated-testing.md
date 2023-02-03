---
title: "DDEV-Local Automated Testing"
pubDate: 2019-04-04
summary: What DDEV’s automatic tests look like behind the scenes.
author: Randy Fay
featureImage:
  src: /img/blog/2019/03/github-checks-running.png
  alt: Cropped screenshot of GitHub checks running
categories:
  - DevOps
---

We’re quite proud of the automated testing setup we use to develop [DDEV-Local](https://github.com/drud/ddev). Each pushed commit to the project gets a full set of tests run on macOS, Windows with Docker-for-Windows, Windows with Docker Toolbox, and Linux (Ubuntu).

Originally we tested quite nicely with just [CircleCI](https://circleci.com) (on Linux), and that did pretty well at finding issues with macOS. But when we started supporting Windows 10 Pro with Docker-for-Windows, and then Windows 10 Home with Docker Toolbox, we found that we really needed explicit coverage on those machines because there are a _lot_ of behavior differences, so we implemented tests for each platform using [Buildkite](https://buildkite.com) and test machines that we maintain.

Even though DDEV is written in [Go](https://golang.org/), which is amazingly complete for each platform, things like filesystem case-sensitivity, slashes, and behavior of docker-compose cause plenty of unexpected issues. So we run more than 10 test suites on each push, building and testing the containers on Windows, Linux, and macOS, then a full application test suite on macOS, Windows 10 Pro, Windows 10 Home, and Linux. And also with permutations for Apache support and the NFS mount feature. It’s a lot of computing power but it’s paid off enormously. All of this shows up very nicely on the DDEV-Local [pull request](https://github.com/drud/ddev/pulls) and [commits](https://github.com/drud/ddev/commits/master) pages, so it’s easy to see at a glance what’s happened with testing.

Our test suite is large and has grown over the lifespan of DDEV-Local, up to about 5,500 lines of test code (out of the 14,680 lines of code that make up DDEV) that get run on every push.

The biggest problems we have with this whole setup is it seems to push Docker to the limit, especially on Windows. So we see too often the Docker failures and hangs that users see only infrequently. Currently, this means a lot of random maintenance of Docker on the test machines. We recently found a way to make CircleCI’s macOS support work with Docker and that’s been a win, but it’s a bit costly and may not work out in the end. Upcoming features of [AppVeyor](https://www.appveyor.com/), for continuous integration on Windows, will allow its use with Linux containers, which should help smooth out our process even further.

Try out DDEV-Local for yourself, and consider contributing to it as an open source project! We have a [contribution guide for this project](https://github.com/drud/ddev/blob/master/CONTRIBUTING.md) as well as a [Community Guide and Code of Conduct](https://github.com/drud/community) for all of our projects.
