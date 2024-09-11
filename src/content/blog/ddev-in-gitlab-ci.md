---
title: "Using DDEV in GitLab CI Tests"
pubDate: 2024-09-11
#modifiedDate: 2024-09-06
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

# How can I run DDEV in GitLab CI?

GitLab CI can use Docker in Docker (DinD). With DinD, Docker can run inside
the GitLab Runner using the Docker executor. With this setup, you can use DDEV in your GitLab CI setup.

**([ddev/ddev-gitlab-ci](https://github.com/ddev/ddev-gitlab-ci))** provides the needed Docker image and instructions; 
Some additional configuration may be required required.

Depending on your setup it requires different steps.

* **gitlab.com** works with no additional configuration.
* **Self-hosted GitLab** requires additional configuration for the Runner (`/etc/gitlab-runner/config.toml`).

On [ddev/ddev-gitlab-ci](https://github.com/ddev/ddev-gitlab-ci), you'll find tested configuration examples for

* [gitlab.com](https://github.com/ddev/ddev-gitlab-ci/blob/main/docs/gitlab-com.md)
* [Docker in Docker](https://github.com/ddev/ddev-gitlab-ci/blob/main/docs%2Fdocker.md)
* [Docker in Podman](https://github.com/ddev/ddev-gitlab-ci/blob/main/docs/podman.md)

Once the runner is configured correctly and you have extended the `.gitlab-ci.yml` with a dedicated
DDEV job you are good to go.

The [GitLab project template for TYPO3](https://gitlab.com/gitlab-org/project-templates/typo3-distribution/-/blob/main/.template/gitlab-ci-project-template.yml?ref_type=heads#L10-42)
is using DDEV in CI already.

**Note**: On **GitHub Actions** you can do these things using [ddev/github-action-setup-ddev](https://github.com/ddev/github-action-setup-ddev).
