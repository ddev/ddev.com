---
title: "Using WarpBuild to speed up DDEV in CI"
pubDate: 2026-01-01
modifiedDate: 2026-01-03
modifiedComment: ""
summary: Use WarpBuild to speed up DDEV in CI.
author: Andrew Berry
featureImage:
  src: /img/blog/2026/01/warp-speed-ci.jpg
  srcDark:
  alt: Warp Speed CI
  caption:
  credit:
categories:
  - DevOps
  - Performance
  - Resources
---

For most developers, DDEV solves a common challenge: making sure that each developer as a consistent, stable local environment for building their web application. At Lullabot, as we had more and more success with DDEV, another related issue kept coming up: how do we grow and develop our use of continuous integration and automated testing while avoiding similar challenges?

A typical CI/CD pipeline is implemented using the tools and systems provided by the CI service itself. For example, at a basic level you can place shell commands inside configuration files to run tests and tools. Running those commands locally in DDEV is possible, but it's a painful copypaste process. If you're a back-end or DevOps engineer, odds are high you've wasted hours trying to figure out why a test you wrote locally isn't passing in CI – or vice versa!

As a first step, we used [Task](https://taskfile.dev/) to improve our velocity. Having a unified task runner that works outside PHP lets us standardize CI tasks more easily. However, this still left a big surface area for differences between local and CI environments. For example, in GitHub, the `shivammathur/setup-php` action is used to install PHP and extensions, but the action is not identical to DDEV. Underlying system libraries and packages installed with `apt-get` could also be different, causing unexpected issues. Finally, there was often a lag in detecting when local test environments broke because those changes weren't tested in CI.

This brought us to using DDEV for CI. It's a great solution! Running all of our builds and tasks in CI solved nearly every "it works on my machine" problem we had. However, it introduced a new challenge: **CI startup performance**.

Unlike using a CI-provider's built-in tooling, DDEV is not typically cached or included in CI runners. Just running the [setup-ddev](https://github.com/ddev/github-action-setup-ddev) action can take up to a minute on a bad day. That doesn't include any additional packages or Dockerfile customizations a project may include. At Lullabot, we use [ddev-playwright](https://github.com/Lullabot/ddev-playwright) to run end-to-end tests. Browser engines and their dependencies are heavy! System dependencies can be north of 1GB of compressed packages (that then have to be installed), and browsers themselves can be several hundred MB. This was adding several minutes of setup time just to run a single test.

Luckily, based on our experience building [Tugboat](https://tugboatqa.com/), we knew that the technology to improve startup performance existed. When [WarpBuild](https://www.warpbuild.com/) was announced with Snapshot support in 2024, we immediately started testing it out. Our theory was that Snapshots would be fast enough to create and restore that we'd see significant improvements in startup time. Let's show how we set it up!

We had three parallel jobs that all required DDEV:

1. **Playwright Functional Tests** - these were using 8 "large" runners from GitHub to complete our test suite fast. Before WarpBuild, each runner took between 15 and 20 minutes to run tests.
2. **Static tests** running PHPStan, PHPUnit, and so on.
3. [ZAP](https://www.zaproxy.org/) for security scanning.

Note that our Playwright tests themselves run in parallel on a single worker as well, using [lullabot/playwright-drupal](https://github.com/lullabot/playwright-drupal). This allows us to optimize the additional startup time for installing Drupal itself (which can't be cached in a snapshot) across many tests.

After linking WarpBuild to our GitHub repository, we had to update our workflows. Here's the changes we made [after enabling Snapshots](https://docs.warpbuild.com/ci/snapshot-runners) in the WarpBuild UI.

1. Update workflows to use the WarpBuild runner such as `warp-ubuntu-2404-x64-16x`. WarpBuild has _many_ runner options available, including ARM and spot instances to reduce costs further. We'll explain `snapshot.key` and `inputs.snapshot` below.
   ```yaml
   runs-on:
     "${{ contains(github.event.head_commit.message, '[warp-no-snapshot]') &&
     'warp-ubuntu-2404-x64-16x' ||
     format('warp-ubuntu-2404-x64-16x;snapshot.key=PROJECT-NAME-playwright-snapshot-1.24.10-v1-{0}', inputs.snapshot) }}"
   ```
2. Switch `actions/cache` to `WarpBuilds/cache`:
   ```yaml
   - uses: WarpBuilds/cache@v1
     with:
       path: |
         ${{ github.workspace }}/.ddev/.drainpipe-composer-cache
         ${{ github.workspace }}/vendor
         ${{ github.workspace }}/web/core
         ${{ github.workspace }}/web/modules/contrib
       key: ${{ runner.os }}-composer-full-${{ hashFiles('**/composer.lock') }}
   ```
3. Create a hash of key files to know when the snapshot should be rebuilt.
   ```yaml
   - name: Determine Snapshot Base
     id: snapshot-base
     run: |
       set -x
       hash=$(cat .github/actions/ddev/action.yml test/playwright/.yarnrc.yml test/playwright/yarn.lock | md5sum | cut -c 1-8)
       echo "snapshot=$hash" >> $GITHUB_OUTPUT
     shell: bash
   ```
   This hash is used as a part of the `runs-on` key above, and when saving a snapshot below. That way, if DDEV or Playwright are upgraded, the pull request will build from scratch and create a new snapshot automatically.
4. We check to see if we are running from a snapshot or not by testing for DDEV.
   ```yaml
   - name: Find ddev
     id: find-ddev
     shell: bash
     run: |
       set -x
       DDEV_PATH=$(which ddev) || DDEV_PATH=''
       echo "ddev-path=$DDEV_PATH" >> "$GITHUB_OUTPUT"
   ```
5. After installing DDEV and running `ddev install-playwright`, we run tests. If they pass, we run a `Create snapshot` step. `matrix.shard` prevents us from wasting time creating multiple snapshots on all shards (we selected shard 2 randomly).
   ```yaml
   - name: Clean up for the snapshot
     if: ${{ matrix.shard == 2 && steps.find-ddev.outputs.ddev-path != '/usr/bin/ddev'}}
     run: |
       ddev poweroff
       git clean -ffdx
   - name: Create snapshot
     uses: WarpBuilds/snapshot-save@v1
     if: ${{ matrix.shard == 2 && steps.find-ddev.outputs.ddev-path != '/usr/bin/ddev'}}
     with:
       alias: "PROJECT-NAME-playwright-snapshot-1.24.10-v1-${{ inputs.snapshot }}"
       fail-on-error: true
       wait-timeout-minutes: 60
   ```
   It was important to include the DDEV version in the snapshot name so we could clear it when updating DDEV. We also had a version number in case we messed up the cache. We recommend using Renovate Custom Managers to keep it in sync with other ddev versions in your project.

We don't pin actions to hashes in these examples for easy copypaste, but for security we always [use Renovate to pin hashes for us](https://docs.renovatebot.com/modules/manager/github-actions/#digest-pinning-and-updating).

The results?

- The time to start Playwright tests was reduced from **4 to 5 minutes** to **1 to 2 minutes**. Now, the longest time in the workflow is the `ddev start` command.
- We thought costs would go down, but we ended up writing many more tests! CI costs stayed roughly similar to our previous GitHub costs but with greater test coverage and faster reports.
- While ZAP tests needed browsers like Playwright, static tests didn't. However, restoring snapshots was fast enough creating separate snapshots without browsers wasn't worth the complexity.
- Snapshot storage costs are inexpensive enough to not matter compared to the CI runner cost.

While this seems like a lot of work, it was only about half a day to set up and test - and that was with a new, in-beta service with minimal documentation and rough edges. We haven't really had to touch this code since. Setting up new projects is an hour, at most.

Do you have other optimizations for DDEV in CI to share? Post in the comments, we'd love to hear them!
