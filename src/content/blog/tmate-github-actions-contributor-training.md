---
title: "Contributor Training: Tmate for Debugging GitHub Actions Workflows"
pubDate: 2024-10-23
modifiedDate: 2025-02-26
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
<iframe width="560" height="315" src="https://www.youtube.com/embed/ABg6Oz4WCIM?si=NuslbR5FA9YpV0Tk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## What is Tmate?

[mxschmitt/action-tmate](https://github.com/mxschmitt/action-tmate) provides a way to ssh into actual running GitHub Actions VMs to debug your tests.

## Why do we need Tmate?

Often it's hard to understand what has happened with an test because all we see in GitHub's web UI is the output, and we can't interact with it. And trying to recreate the test environment is sometimes fine, but sometimes it's hard to recreate the test. GitHub runners have different memory configuration, disk space, and different packages installed, and they're typically running AMD64 Ubuntu, which may not be something we have easy access to.

## Alternatives to Tmate

1. We normally will try to understand a test failure by running it locally.
2. Running in a similar Linux/AMD64 system like GitHub Codespaceds is a pretty easy option.
3. [nektos/act](https://github.com/nektos/act) is another recommended competitor to Tmate. It uses Docker and a Docker image to run an action on your local machine. I haven't had luck with it when I've tried it. See Stas's experience with `act` [below](#how-to-useact).

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

Often we have a complex step and want to be able to debug it if it fails. For this we can used `if: ${{ failure() }}`, as shown in the [failure example](https://github.com/rfay/tmate-demos/blob/main/.github/workflows/on_fail.yaml). Tmate kicks in automatically if the step _before_ it fails. It would be nicer if it kicked in on any failure, but it just kicks in when the step before fails.

### Workflow Dispatch Example

The [Workflow Dispatch](https://github.com/rfay/tmate-demos/blob/main/.github/workflows/workflow_dispatch.yaml) is one of my favorite techniques, because you can easily restart the workflow as many times as you like, and choosing whether to invoke Tmate is just a click of a checkbox.

## How to Use Act

[nektos/act](https://github.com/nektos/act) offers a way to locally simulate GitHub Actions workflows.

In this example `.github/workflows/jekyll-gh-pages.yml`, we deploy Jekyll to GitHub Pages with dynamic addition of JSON data to the website. Our focus is to debug the API call to GitHub using JavaScript:

```yaml
name: Deploy Jekyll with GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Build with Jekyll
        uses: actions/jekyll-build-pages@v1
        with:
          source: ./
          destination: ./_site
      - name: Get GitHub repositories
        uses: actions/github-script@v7
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            const { data } = await github.rest.search.repos({q: 'user:stasadev'})
            console.log(data)
            const fs = require('fs');
            fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
      - name: Add JSON files to the site
        run: |
          cat data.json | sudo tee ./_site/data.json
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

1. Simplify the workflow file `.github/workflows/jekyll-gh-pages.yml` by removing unrelated code to focus on testing the API call:

   ```yaml
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Get my GitHub repositories
           uses: actions/github-script@v7
           with:
             github-token: ${{ secrets.GITHUB_TOKEN }}
             script: |
               const { data } = await github.rest.search.repos({q: 'user:stasadev'})
               console.log(data)
               const fs = require('fs');
               fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
   ```

   This workflow retrieves repositories for a specified user, writes them to `data.json`, and outputs the result with `console.log()`.

2. Run the workflow locally with `act` in your project's root directory:

   ```bash
   act -P ubuntu-latest=catthehacker/ubuntu:act-latest \
       --bind \
       --job build \
       -s GITHUB_TOKEN=my_token
   ```

   - `-P ubuntu-latest=catthehacker/ubuntu:act-latest`: Specifies the Docker image to use for the `ubuntu-latest` environment. If not specified, `act` uses the default image from its `.actrc` file (see [GitHub issue](https://github.com/nektos/act/issues/2219) for more details).
   - `--bind`: Mounts the current working directory into the container, allowing files generated in the container (like `data.json`) to be accessible in the host file system.
   - `--job build`: Tells `act` to run only the `build` job from the workflow.
   - `-s GITHUB_TOKEN=my_token`: Sets a secret (`GITHUB_TOKEN`) for the workflow, where `my_token` should be replaced with a valid GitHub token for authentication.

The primary advantage of using `act` in this context is the ability to efficiently debug API calls locally in just a few seconds, without the need to commit changes, push them to GitHub, and wait for the workflow to complete, which typically takes several minutes.

## Contributions welcome!

Your suggestions to improve this blog are welcome. You can do a PR to this blog adding your techniques. Info and a training session on how to do a PR to anything in ddev.com is at [DDEV Website For Contributors](ddev-website-for-contributors.md).

Join us for the next [DDEV Live Contributor Training](/blog/contributor-training/). Use the [contact](/contact) link to ask for a calendar invitation.
