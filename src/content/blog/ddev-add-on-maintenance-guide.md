---
title: "DDEV Add-on Maintenance Guide"
pubDate: 2025-04-28
#modifiedDate: 2025-04-28
summary: Maintaining an add-on involves regularly updating it to stay compatible with new features in both the upstream ddev-addon-template and DDEV itself.
author: Stas Zhuk
featureImage:
  src: /img/blog/2025/04/ddev-add-on-registry.png
  alt: DDEV Add-on Registry website
categories:
  - Guides
---

## Introduction

Maintaining a DDEV add-on is more than a [one-time task](advanced-add-on-contributor-training.md). As DDEV evolves, so should your add-ons. This guide will help you stay in sync with recent changes and keep your add-ons up-to-date, reliable, and aligned with best practices.

## Recommendations for Add-on Maintainers

Here are some high-level practices to follow:

- Take inspiration from the [official add-ons](https://addons.ddev.com/), see how they're structured and follow similar practices
- Keep an eye on updates in [ddev-addon-template](https://github.com/ddev/ddev-addon-template)
- Track changes in [DDEV releases](https://github.com/ddev/ddev/releases)
- Configure your add-on [repository settings](#repository-configuration-bestpractices)
- Add the `ddev-get` [topic](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics) to your GitHub repository if it should be discoverable by the wider community. (If your add-on is currently just an experiment or a fork, wait until it matures to add the topic.)
- Write a clear [description](https://github.com/orgs/community/discussions/60507) and include relevant keywords to improve discoverability
- Use `#!/usr/bin/env bash` instead of `#!/bin/bash` at the top of your command scripts, it's more portable and works better across different environments.
- Ensure your add-on cleans up after itself: both `ddev add-on get` and `ddev add-on remove` should be idempotent. All files added via `project_files` and `global_files` must include a `#ddev-generated` stanza to support proper removal
- Remember to publish a new release after any update (unless it's just a `README.md` change)

## What's New in the DDEV Ecosystem

DDEV development is moving fast, and new features are introduced regularly. Here are some recent updates you should be aware of:

### `ddev get` Deprecation

The classic `ddev get` command is deprecated in DDEV v1.23.5 and replaced by `ddev add-on get`.

Huge thanks to [@GuySartorelli](https://github.com/GuySartorelli) for implementing this feature, and also for proactively updating many add-on `README.md` files. You've likely already seen a pull request for your add-on!

### Better Testing with Bats Libraries

While all add-ons use the [Bats](https://bats-core.readthedocs.io/en/stable/) framework for testing, many are still missing Bats libraries that simplify assertions and test writing.

Consider adopting these libraries to enhance test clarity and maintainability.

Example:

- https://github.com/ddev/ddev-addon-template/blob/main/tests/test.bats

### Issue and PR Templates

Make sure your add-on includes:

- [Issue templates](https://github.com/ddev/ddev-addon-template/tree/main/.github/ISSUE_TEMPLATE)
- [Pull request template](https://github.com/ddev/ddev-addon-template/blob/main/.github/PULL_REQUEST_TEMPLATE.md)

These improve the quality of contributions and bug reports.

### Recommending DDEV Version Constraints

Your add-on should encourage users to keep DDEV updated. The current recommendation is to add this stanza to `install.yaml`:

```yaml
ddev_version_constraint: ">= v1.24.3"
```

This ensures compatibility and resolves known issues, such as those related to the [Mutagen Problem Report](open-source-for-the-win.md#mutagen-problemreport).

### Add-on Badges

The old `maintained` badge required yearly updates, which became a maintenance burden, especially for contributors with many add-ons. It's now replaced by a `last commit` badge.

To improve visibility and engagement on the [DDEV Add-on Registry](https://addons.ddev.com), add the registry badge to your [README.md](https://github.com/ddev/ddev-addon-template).

Example:

- https://github.com/ddev/ddev-addon-template/blob/main/README.md

### Advanced Customization with Flags

Starting with DDEV v1.23.5, you can now use [`ddev dotenv set`](https://ddev.readthedocs.io/en/stable/users/usage/commands/#dotenv-set) to manage environment variables more cleanly. This allows your add-on to read custom environment variables defined in `.ddev/.env.*` files, and use them inside your `docker-compose.*.yaml` configuration.

This feature is especially useful for advanced setups where flexibility and dynamic configuration are needed.

Example:

- https://github.com/ddev/ddev-adminer#advanced-customization
- https://github.com/ddev/ddev-adminer/blob/main/docker-compose.adminer.yaml

### MutagenSync Annotation for Commands

With DDEV v1.24.4, custom commands can now use the [`MutagenSync`](https://ddev.readthedocs.io/en/stable/users/extend/custom-commands/#mutagensync-annotation) annotation.

You should use this annotation if your `host` or `web` commands modify, add, or remove files in the project directory. It ensures that file sync is handled correctly when Mutagen is enabled, preventing unexpected behavior or sync delays. (It does no harm and causes no performance issues if mutagen is not in use.)

Example:

- https://github.com/backdrop-ops/ddev-backdrop-bee/blob/main/commands/web/bee

### Support for Optional Compose Profiles

The same DDEV v1.24.4 release introduced support for [optional docker-compose profiles](https://ddev.readthedocs.io/en/stable/users/extend/custom-compose-files/#optional-services), which can be used by add-ons to offer more flexible configuration.

Example:

- https://github.com/ddev/ddev-mongo/blob/main/docker-compose.mongo.yaml
- https://github.com/ddev/ddev-mongo/blob/main/commands/host/mongo-express

## Repository Configuration Best Practices

To keep your add-on repository tidy, safe, and aligned with community standards, consider adjusting the following GitHub settings:

### General Settings

Go to **Settings → General** in your repository:

- Uncheck features you don’t use, such as **Wikis**, **Discussions**, and **Projects**
- Enable **Allow squash merging** with **Pull request title**
- Disable **Allow merge commits** and **Allow rebase merging**
- Enable **Always suggest updating pull request branches**
- Enable **Automatically delete head branches**

### Branch Protection Rules

Go to **Settings → Rules → Rulesets**:

1. Click **New ruleset → New branch ruleset**
2. Set **Ruleset name** to `main`
3. Under **Enforcement status**, select **Active**
4. Under **Targets**, click **Add target** → choose **Include default branch**
5. Under **Rules**, enable:
   - **Restrict deletions**
   - **Require a pull request before merging** (set **Allowed merge methods** to only **Squash**)
   - **Block force pushes**
6. Click **Create** to apply the ruleset

## Add-on Scripts for Maintenance

_(Coming soon: Develop an add-on maintenance script in ddev-addon-template.)_

## Conclusion

Keeping your add-on current means less work for users and fewer issues for you to manage. Use this guide as your checklist and stay in sync with the DDEV ecosystem.

Have questions, suggestions, or something cool to share? Join the conversation in our [Discord](/s/discord), [open an issue](https://github.com/ddev/ddev/issues), or reach out via [email](mailto:support%40ddev.com). Your feedback helps improve the tools we all rely on.

If DDEV is helping you or your organization, please consider [supporting its ongoing financial sustainability](/support-ddev/#sponsor-development). Every bit helps keep the ecosystem growing and maintained.

Happy maintaining!
