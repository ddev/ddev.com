---
title: "Using DDEV in GitLab CI"
pubDate: 2024-09-06
modifiedDate: 2024-09-06
summary: Run DDEV within your GitLab CI pipeline.
author: Jochen Roth
featureImage:
  src: /img/blog/2024/09/ddev-blog.png
  alt: DDEV running in the GitLab Pipeline
  credit: "[Milad Fakurian](https://unsplash.com/de/@fakurian) (Background)"
categories:
  - DevOps
---

Now you can use DDEV for CI on Gitlab. Spin up your entire tech stack including services (e.g. Solr, RabbitMQ)
required to run the Website within the CI. Even e2e testing is easily possible (e.g. Cypress, Playwright).

The same DDEV config can be used locally (shared across the team) and within the GitLab CI.

On GitHub Actions this is already possible though [ddev/github-action-setup-ddev](https://github.com/ddev/github-action-setup-ddev).

# How to run DDEV in GitLab CI?

Many of you might be familiar with Docker in Docker (DinD). With DinD, Docker can run inside
the GitLab Runner using the Docker executor.

To run DDEV, a Docker image with DDEV installed ([ddev/ddev-gitlab-ci](https://github.com/ddev/ddev-gitlab-ci)) 
and additional configuration is required.

Depending on your setup it requires different steps.

* gitlab.com: Just works
* Self-hosted GitLab requires additional configuration for the Runner (`/etc/gitlab-runner/config.toml`)

On GitHub, you'll find tested configuration examples for

* [gitlab.com](https://github.com/ddev/ddev-gitlab-ci/blob/main/docs/gitlab-com.md)
* [Docker in Docker](https://github.com/ddev/ddev-gitlab-ci/blob/main/docs%2Fdocker.md)
* [Docker in Podman](https://github.com/ddev/ddev-gitlab-ci/blob/main/docs/podman.md)

Once you configured the runner correctly and extended the `.gitlab-ci.yml` with a dedicated
DDEV job you are good to go.

The [GitLab project template for TYPO3](https://gitlab.com/gitlab-org/project-templates/typo3-distribution/-/blob/main/.template/gitlab-ci-project-template.yml?ref_type=heads#L10-42)
is using DDEV in CI already.
