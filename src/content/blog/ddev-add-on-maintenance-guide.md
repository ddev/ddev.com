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

Maintaining a DDEV add-on is more than a one-time task. As DDEV evolves, so should your add-ons. This guide will help you stay in sync with recent changes and keep your add-ons up-to-date, reliable, and aligned with best practices.

## Recommendations for Add-on Maintainers

Here are some high-level practices to follow:

- Keep an eye on updates in [ddev-addon-template](https://github.com/ddev/ddev-addon-template)
- Track changes in [DDEV releases](https://github.com/ddev/ddev/releases)
- Configure your add-on [repository settings](#repository-configuration-bestpractices)
- Remember to publish a new release after any update (unless it's just a `README.md` change)
- Add the `ddev-get` [topic](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics) to your GitHub repository.
- Write a clear [description](https://github.com/orgs/community/discussions/60507) and include relevant keywords to improve discoverability in the [DDEV Add-on Registry](https://addons.ddev.com)
- Regularly update your add-on to ensure compatibility and take advantage of new features
- Take inspiration from the [official add-ons](https://addons.ddev.com/addons/ddev/) — see how they're structured and follow similar practices

## What's New in the DDEV Ecosystem

DDEV development is moving fast, and new features are introduced regularly. Here are some recent updates you should be aware of:

### `ddev get` Deprecation

The classic `ddev get` command is deprecated in DDEV v1.23.5 and replaced by `ddev add-on get`.

Huge thanks to [@GuySartorelli](https://github.com/GuySartorelli) for implementing this feature, and also for proactively updating many add-on `README.md` files. You've likely already seen a pull request for your add-on!

### Better Testing with Bats Libraries

While all add-ons use the [Bats](https://bats-core.readthedocs.io/en/stable/) framework for testing, many are still missing [Bats libraries](https://github.com/ddev/ddev-addon-template/blob/main/tests/test.bats) that simplify assertions and test writing.

Consider adopting these libraries to enhance test clarity and maintainability.

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

The old `maintained` badge required yearly updates, which became a maintenance burden—especially for contributors with many add-ons. It's now replaced by a `last commit` badge.

To improve visibility and engagement on the [DDEV Add-on Registry](https://addons.ddev.com), add the registry badge to your [README.md](https://github.com/ddev/ddev-addon-template).

### Support for Optional Compose Profiles

DDEV v1.24.4 introduced support for [optional docker-compose profiles](https://github.com/ddev/ddev/pull/7007), which can be used by add-ons to offer more flexible configuration.

## Repository Configuration Best Practices

_(Coming soon: this section will cover recommended GitHub settings for merging pull requests and default branch restrictions.)_

## Add-on Update Examples

_(Coming soon: Add PR examples demonstrating how to update your add-on.)_

## Add-on Scripts for Maintenance

_(Coming soon: Develop an add-on maintenance script in ddev-addon-template.)_

## Conclusion

Keeping your add-on current means less work for users and fewer issues for you to manage. Use this guide as your checklist and stay in sync with the DDEV ecosystem.

Have questions, suggestions, or something cool to share? Join the conversation in our [Discord](/s/discord), [open an issue](https://github.com/ddev/ddev/issues), or reach out via [email](mailto:support%40ddev.com). Your feedback helps improve the tools we all rely on.

If DDEV is helping you or your organization, please consider [supporting its ongoing financial sustainability](/support-ddev/#sponsor-development). Every bit helps keep the ecosystem growing and maintained.

Happy maintaining!
