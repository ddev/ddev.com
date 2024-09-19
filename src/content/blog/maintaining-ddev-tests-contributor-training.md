---
title: "Contributor Training: Maintaining DDEV Automated Tests"
pubDate: 2024-09-18
# modifiedDate: 2024-07-23
summary: Contributor training on maintaining and debugging DDEV automated tests.
author: Randy Fay
featureImage:
  src: /img/blog/2024/09/maintaining-tests.png
  alt: abstract view of DDEV automated tests
categories:
  - Training
  - Guides
---


Here's our September 18, 2024 [Contributor Training](/blog/category/training) on maintaining DDEV automated tests:

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/_0K5MiUIWZg?si=q0qwW8TmFSXIDKC3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>


## DDEV's Automated Tests

DDEV has three main types of tests:

- Go “pkg” tests, that don’t use an external ddev binary. These are mostly a "pure" form of Go test. There are both end-to-end tests and some unit tests.
- Go “cmd” tests that rely on a matching external ddev binary. These are almost scripted tests, written in Go, but calling out to execute the `ddev` binary and exercise it. 
- Container tests written using bats (bash).

Golang tests are in files named `*_test.go` and the tests themselves are functions named `Test*`.  For example the test [TestConfigFunctionality](https://github.com/ddev/ddev/blob/master/pkg/ddevapp/config_test.go#L1458) is in the file [config_test.go](https://github.com/ddev/ddev/blob/master/pkg/ddevapp/config_test.go).

## How many tests are there? How many lines of test code?

According to cloc there are currently 22,322 lines of go code: (`cloc ./pkg ./cmd --include-lang=Go --not-match-f='.*_test\.go$'`) and 14,853 lines of go test code (*_test.go): (`cloc ./pkg ./cmd --include-lang=Go --match-f='.*_test\.go$’`)

## What should a contributor work on?

### Debugging broken tests

Broken tests, of course, can be a result of broken code or broken tests. These often come up in the process of building a PR, and they need to be fixed, usually in the code, but sometimes it's the test that's at fault.

In all cases, the first thing to do is to try to execute the test manually and locally, or perhaps just try to execute what the test was trying to do. For example, if the test fails doing an `app.Start()`, just try stepping through `app.Start()` in `ddev start`. 

Demonstrations of stepping through a test in the debugger are below.

### Flaky tests

Flaky tests are the worst, because they may depend on the execution environment, or some other test may have polluted the environment, or they may happen in particular network situations. 

### Fragile or brittle tests

Fragile and brittle tests may be a result of specific expectations in the code, for example, looking for a particular string instead of a more general expectation. Sometimes these can be understood by looking through the test run. Often the test needs to be restructured, or the expectation can be turned into a regular expression instead of a specific literal expectation.

### Slow tests

The easiest place to look at slow tests is a full buildkite test run, which shows the timing for each test. 

## Possible infrastructure test improvements

## Running and debugging tests individually in Goland

## Running and debugging tests individually in Visual Studio Code (vscode)
**Flaky tests and fragile tests**.

- Try to recreate the situation locally
- Add more output to figure out what’s going on.
- Don’t run the test on a platform if it doesn’t add value. Example: [TestComposerVersionConfig](https://github.com/ddev/ddev/blob/c37da314af81d48db54fa774a975f1b68acc4409/pkg/ddevapp/config_test.go#L1119-L1122).

**Slow tests**

- Figure out why (doing too many things? Too many starts and stops? Can it do less? Is the actual test valid?) Example: [TestDdevXhprofEnabled](https://github.com/ddev/ddev/blob/7d895537ad4046a7a5159665924ed69b23288bcc/pkg/ddevapp/ddevapp_test.go#L1067) see [PR](https://github.com/ddev/ddev/pull/5378).

**Big Infra Test Improvements (and problems)**

- Could we run most tests only on Linux and macOS arm64?
- Really not all are needed, and some could be factored out/retired/consolidated
- Add Windows ARM64 testing?
- Spend more testing time on more important platforms, like macOS arm64.
- Carbon costs
- Could we run tests in parallel? What would be the implications.

**Running Individual Tests**

- export GOTEST_SHORT=true or export GOTEST_SHORT=12
- The built `ddev` binary should be in PATH if running a test in cmd
- `make testpkg TESTARGS="-count=1 -run TestDdevAllDatabases"`

**Exercises**:

- Run tests manually both on Goland and vscode
- Find a heavy test and discuss how it can be improved. For example, look at [buildkite test](https://buildkite.com/ddev/ddev-macos-amd64-mutagen/builds/5288#018ace86-3250-4f5b-a5d7-5bb9b09cd9df). or [buildkite docker-ce](https://buildkite.com/ddev/wsl2-docker-inside/builds/2443#018acec4-6d27-44fe-8573-2e0a5080dc21).
- Look at a flaky test, [TestGetLocalHTTPResponse](https://buildkite.com/ddev/wsl2-docker-desktop/builds/5077#018acfa3-f71f-4b7b-bb92-16c4b9a88de1) (not so flaky any more, but first “real” test in the series

## Resources

* [Training: Setting up a go development environment](setting-up-a-go-development-environment.md)
* [DDEV docs: Building, Testing, and Contributing](https://ddev.readthedocs.io/en/stable/developers/building-contributing/)
* The GitHub Workflow tests and Buildkite tests are shown on every PR run and every run on the default branch. If you don't have access to see them, just ask in [Discord](https://discord.com/invite/5wjP76mBJD) or the [issue queue](https://github.com/ddev/ddev/issues), and you can get it.

## Contributions welcome!

Your suggestions to improve this blog are welcome. You can do a PR to this blog adding your techniques. Info and a training session on how to do a PR to anything in ddev.com is at [DDEV Website For Contributors](/blog/ddev-website-for-contributors/).

Join us for the next [DDEV Live Contributor Training](/blog/contributor-training/). Sign up at [DDEV Live Events Meetup](https://www.meetup.com/ddev-events/events/).
