---
title: "Using WarpBuild to speed up DDEV in CI"
pubDate: 2026-01-01
modifiedDate: 2026-01-03
modifiedComment: ""
summary: Use WarpBuild to speed up DDEV in CI.
author: Andrew Berry
featureImage:
  src: /img/blog/2026/01/warp-speed-ci.jpg
  srcDark: /img/blog/2026/01/warp-speed-ci.jpg
  alt: Warp Speed CI
  caption:
  credit:
categories:
  - DevOps
  - Performance
---

For most developers, DDEV solves a common challenge: making sure that each developer has a consistent, stable local environment for building their web application. We had more and more success with DDEV at Lullabot, but another related issue kept coming up: how do we grow and develop our use of continuous integration and automated testing while avoiding the same challenges DDEV solved for us?

A typical CI/CD pipeline is implemented using the tools and systems provided by the CI service itself. For example, at a basic level you can place shell commands inside configuration files to run tests and tools. Running those commands locally in DDEV is possible, but it's a painful copy/paste process. If you're a back-end or DevOps engineer, odds are high you've wasted hours trying to figure out why a test you wrote locally isn't passing in CI – or vice versa!

As a first step, we used [Task](https://taskfile.dev/) to improve our velocity. Having a unified task runner that works outside PHP lets us standardize CI tasks more easily. However, this still left a big surface area for differences between local and CI environments. For example, in GitHub, the `shivammathur/setup-php` action is used to install PHP and extensions, but the action is not identical to DDEV. Underlying system libraries and packages installed with `apt-get` could also be different, causing unexpected issues. Finally, there was often a lag in detecting when local test environments broke because those changes weren't tested in CI.

This brought us to using DDEV for CI. It's a great solution! Running all of our builds and tasks in CI solved nearly every "it works on my machine" problem we had. However, it introduced a new challenge: **CI startup performance**.

Unlike using a CI-provider's built-in tooling, DDEV is not typically cached or included in CI runners. Just running the [setup-ddev](https://github.com/ddev/github-action-setup-ddev) action can take up to a minute on a bad day. That doesn't include any additional packages or Dockerfile customizations a project may include. At Lullabot, we use [ddev-playwright](https://github.com/Lullabot/ddev-playwright) to run end-to-end tests. Browser engines and their dependencies are heavy! System dependencies can be north of 1GB of compressed packages (that then have to be installed), and browsers themselves can be several hundred MB. This was adding several minutes of setup time just to run a single test.

Luckily, based on our experience building [Tugboat](https://tugboatqa.com/), we knew that the technology to improve startup performance existed. When [WarpBuild](https://www.warpbuild.com/) was announced with Snapshot support in 2024, we immediately started testing it out. We theorized that the performance improvement of snapshots would result in significant startup time improvement. Here's how we set it up!

We had three parallel jobs that all required DDEV:

1. **Playwright Functional Tests** - these were using 8 "large" runners from GitHub to complete our test suite fast. Before WarpBuild, each runner took between 15 and 20 minutes to run tests.
2. **Static tests** running PHPStan, PHPUnit, and so on.
3. [ZAP](https://www.zaproxy.org/) for security scanning.

Note that our Playwright tests themselves run in parallel on a single worker as well, using [lullabot/playwright-drupal](https://github.com/lullabot/playwright-drupal). This allows us to optimize the additional startup time for installing Drupal itself (which can't be cached in a snapshot) across many tests.

After linking WarpBuild to our GitHub repository, we had to update our workflows. Here is an example representing the changes we made to our workflow [after enabling Snapshots](https://docs.warpbuild.com/ci/snapshot-runners) in the WarpBuild UI.

Start with a basic workflow to trigger on pull requests and on merges to `main`.

```yaml
name: "WarpBuild Snapshot Example"

on:
  push:
    branches: [main]
  pull_request:
```

Before running our real work, we need to know what snapshot we could restore from. We start by creating a hash of key files that affect what gets saved in the snapshot. For example, if Playwright (and its browser and system dependencies) are upgraded by Renovate, we want a new snapshot to be created. Extend or modify these files to match your own project setup.

```yaml
jobs:
  determine-snapshot:
    # This could be a WarpBuild runner too!
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@v6

      - name: Determine Snapshot Base
        id: snapshot-base
        run: |
          set -x
          hash=$(cat .github/workflows/test.yml test/playwright/.yarnrc.yml test/playwright/yarn.lock | md5sum | cut -c 1-8)
          echo "snapshot=$hash" >> $GITHUB_OUTPUT
        shell: bash
```

WarpBuild needs some additional configuration to tell GitHub Actions to use it as a runner. This could be as simple as `runs-on: 'warp-<runner-type>'` if you aren't using snapshots. WarpBuild has _many_ runner options available, including ARM and spot instances to reduce costs further.

The runs-on statement:

1. [Skips snapshots via commit messages](https://github.com/WarpBuilds/snapshot-save#conditional-snapshot-usage).
2. Uses a "16x" sized runner so we can run tests in parallel.
3. Creates a snapshot key with the project name, the ddev version, a manual version number, and the short hash of the files from above.

We also switch to the WarpBuild cache (so it's local to the runner) and check out the project. Update the cache paths as appropriate for your project.

```yaml
jobs:
  # other jobs...
  build-and-test:
    needs: [determine-snapshot]
    runs-on:
      "${{ contains(github.event.head_commit.message, '[warp-no-snapshot]') &&
      'warp-ubuntu-2404-x64-16x' ||
      'warp-ubuntu-2404-x64-16x;snapshot.key=my-project-ddev-1.24.10-v1-{0}', inputs.snapshot }}"

    steps:
      - uses: WarpBuilds/cache@v1
        with:
          path: |
            ${{ github.workspace }}/.ddev/.drainpipe-composer-cache
            ${{ github.workspace }}/vendor
            ${{ github.workspace }}/web/core
            ${{ github.workspace }}/web/modules/contrib
          key: ${{ runner.os }}-composer-full-${{ hashFiles('**/composer.lock') }}

      - uses: actions/checkout@v6
```

We need to add logic to either start from scratch and install everything or restore from a snapshot. Since DDEV isn't installed by default in runners, we can use its presence to easily determine if we're running from inside a snapshot or not. We save these values for later use.

```yaml
jobs:
  # other jobs...
  build-and-test:
    steps:
      # ... previous steps ...
      - name: Find ddev
        id: find-ddev
        run: |
          DDEV_PATH=$(which ddev) || DDEV_PATH=''
          echo "ddev-path=$DDEV_PATH" >> "$GITHUB_OUTPUT"
          if [ -n "$DDEV_PATH" ]; then
            echo "ddev found at: $DDEV_PATH (restored from snapshot)"
          else
            echo "ddev not found (fresh runner, will install)"
          fi
```

If ddev exists, we can skip installing it:

```yaml
jobs:
  # other jobs...
  build-and-test:
    steps:
      # ... previous steps ...
      - name: Install ddev
        uses: ddev/github-action-setup-ddev@v1
        if: ${{ steps.find-ddev.outputs.ddev-path != '/usr/bin/ddev' }}
        with:
          autostart: false
          # When updating this version, also update the snapshot key above
          version: 1.24.10
```

At this point, we've got DDEV ready to go, so we can start it and run tests or anything else.

```yaml
jobs:
  # other jobs...
  build-and-test:
    steps:
      # ... previous steps ...
      - name: Start ddev
        run: |
          # Playwright users may want to run `ddev install-playwright` here.
          ddev start
          ddev describe

      - name: Run tests
        run: |
          ddev exec echo "Running tests..."
          # Replace this with one or more test commands for your project.
          ddev task test:playwright
```

Now, tests have passed and we can create a snapshot if needed. If tests fail, we never create a snapshot so that we don't accidentally commit a broken environment.

We shut down DDEV since we're going to clean up generated files. This keeps our snapshot a bit smaller and gives us an opportunity to clean up any credentials that might be used as a part of the job. While we don't typically need a Pantheon token for tests, we do need it for some other jobs we run with DDEV.

```yaml
jobs:
  # other jobs...
  build-and-test:
    steps:
      # ... previous steps ...
      - name: Clean up for snapshot
        if: ${{ steps.find-ddev.outputs.ddev-path != '/usr/bin/ddev' }}
        run: |
          # Stop ddev to ensure clean state
          ddev poweroff
          # Remove any cached credentials or tokens
          rm -f ~/.terminus/cache/session
          # Clean git state and temporary files
          git clean -ffdx
```

Now we can actually save the snapshot. We skip this if we can since it takes a bit of time to save and upload. There's no point in rewriting our snapshot if it hasn't changed! The `wait-timeout-minutes` is set very high, but in practice this step only takes a minute or two. We just don't want this step to fail if Amazon is slow.

```yaml
jobs:
  # other jobs...
  build-and-test:
    steps:
      # ... previous steps ...
      - name: Save WarpBuild snapshot
        uses: WarpBuilds/snapshot-save@v1
        if: ${{ steps.find-ddev.outputs.ddev-path != '/usr/bin/ddev' }}
        # Using a matrix build? Avoid thrashing snapshots by only saving from one shard.
        # if: ${{ matrix.shard == 1 && steps.find-ddev.outputs.ddev-path != '/usr/bin/ddev'}}
        with:
          # Must match the snapshot.key in runs-on above
          alias: "my-project-ddev-1.24.10-v1-${{ needs.determine-snapshot.outputs.snapshot }}"
          fail-on-error: true
          wait-timeout-minutes: 30
```

To test, once you have jobs passing, you can rerun them from the GitHub Actions UI. If everything is working, you will see all steps related to installing DDEV skipped.

Note: We don't pin actions to hashes in these examples for easy copypaste, but for security we always [use Renovate to pin hashes for us](https://docs.renovatebot.com/modules/manager/github-actions/#digest-pinning-and-updating). We would also like to use [Renovate Custom Managers](https://docs.renovatebot.com/modules/manager/regex/) to automatically offer DDEV upgrades and keep the version number in sync across all files and locations.

## The Results?

- The time to start Playwright tests was reduced from **4 to 5 minutes** to **1 to 2 minutes**. Now, the longest time in the workflow is the `ddev start` command.
  - This project uses eight parallel runners, so we're saving about 24 minutes of CI costs _per commit_.
- We thought costs would go down, but we ended up writing many more tests! CI costs with WarpBuild stayed roughly similar to our previous GitHub costs but with greater test coverage and faster reports.
- While ZAP tests needed browsers like Playwright, static tests didn't. However, restoring snapshots was fast enough creating separate snapshots without browsers wasn't worth the complexity.
- Snapshot storage costs are inexpensive enough to not matter compared to the CI runner cost.

While this seems like a lot of work, it was only about half a day to set up and test – and that was when WarpBuild was in beta, had minimal documentation and some rough edges. We haven't really had to touch this code since. Setting up new projects is an hour, at most.

Do you have other optimizations for DDEV in CI to share? Post in the comments, we'd love to hear them!
