---
title: "DDEV Add-on Maintenance Guide"
pubDate: 2025-05-01
modifiedDate: 2026-04-22
modifiedComment: Added info on PHP add-ons
summary: Maintaining an add-on involves regularly updating it to stay compatible with new features in both the upstream ddev-addon-template and DDEV itself.
author: Stas Zhuk
featureImage:
  src: /img/blog/2025/04/ddev-add-on-registry.png
  alt: DDEV Add-on Registry website
categories:
  - Add-ons
  - Guides
---

## Introduction

Maintaining a DDEV add-on is more than a [one-time task](advanced-add-on-contributor-training.md). As DDEV evolves, so should your add-ons. This guide will help you stay in sync with recent changes and keep your add-ons up-to-date, reliable, and aligned with current standards.

As part of preparing this guide, I also updated all official DDEV add-ons to reflect the latest recommendations and improvements.

## Recommendations for Add-on Maintainers

Run the update checker script periodically in your add-on to verify it is up to date:

```bash
curl -fsSL https://ddev.com/s/addon-update-checker.sh | bash
```

Here are some high-level practices to follow:

- Take inspiration from the [official add-ons](https://addons.ddev.com/), see how they're structured and follow similar practices
- Keep an eye on updates in [ddev-addon-template](https://github.com/ddev/ddev-addon-template)
- Track changes in [DDEV releases](https://github.com/ddev/ddev/releases)
- Configure your add-on [repository settings](#repository-configuration-best-practices)
- Add the `ddev-get` [topic](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics) to your GitHub repository if it should be discoverable by the wider community. (If your add-on is currently just an experiment or a fork, wait until it matures to add the topic.)
- Write a clear [description](https://github.com/orgs/community/discussions/60507) and include relevant keywords to improve discoverability
- Use `#!/usr/bin/env bash` instead of `#!/bin/bash` at the top of your command scripts, it's more portable and works better across different environments.
- Ensure your add-on cleans up after itself: both `ddev add-on get` and `ddev add-on remove` should be idempotent. All files added via `project_files` and `global_files` must include a `#ddev-generated` comment. DDEV uses this marker to replace files on re-install (if unmodified) and to delete them on `ddev add-on remove`. Files without this comment are left in place and must be cleaned up via `removal_actions`.
- Remember to publish a new release after any update (unless it's just a `README.md` change)

## What's New in the DDEV Ecosystem

DDEV development is moving fast, and new features are introduced regularly. Here are some recent updates you should be aware of:

### Recommending DDEV Version Constraints

Your add-on should encourage users to keep DDEV updated. The current recommendation is to add this stanza to `install.yaml`:

```yaml
ddev_version_constraint: ">= v1.24.10"
```

This ensures compatibility and resolves known issues, such as those related to the [Mutagen Problem Report](open-source-for-the-win.md#mutagen-problemreport).

### Customizing `ddev describe` Output

DDEV add-ons can now customize the output of the `ddev describe` with `x-ddev.describe-*` extension.

[This feature](https://docs.ddev.com/en/stable/users/extend/custom-docker-services/#customizing-ddev-describe-output) is useful for showing credentials, URLs, or usage notes for custom services.

Example:

- https://github.com/ddev/ddev-redis/blob/main/docker-compose.redis.yaml

### Changing `ddev ssh` Shell

DDEV v1.24.10 introduced the ability for add-ons to specify a custom shell for the `ddev ssh -s my-service` command using the [`x-ddev.ssh-shell`](https://docs.ddev.com/en/stable/users/extend/in-container-configuration/#changing-ddev-ssh-shell) extension.

```yaml
services:
  my-service:
    x-ddev:
      ssh-shell: bash
```

Example:

- https://github.com/ddev/ddev-varnish/blob/main/docker-compose.varnish.yaml

To ensure your add-on works reliably, include a shell availability check in your Bats health checks (`tests/test.bats`):

```bash
health_checks() {
  # Verify that bash is available in the "my-service" container
  run ddev exec -s my-service command -v bash
  assert_success
  assert_output --partial "bash"
  # ... additional checks ...
}
```

### MutagenSync Annotation for Commands

Custom commands can use the [`MutagenSync`](https://docs.ddev.com/en/stable/users/extend/custom-commands/#mutagensync-annotation) annotation.

You should use this annotation if your `host` or `web` commands modify, add, or remove files in the project directory. It ensures that file sync is handled correctly when Mutagen is enabled, preventing unexpected behavior or sync delays. (It does no harm and causes no performance issues if Mutagen is not in use.)

Example:

- https://github.com/backdrop-ops/ddev-backdrop-bee/blob/main/commands/web/bee

### Support for Optional Compose Profiles

[Optional docker-compose profiles](https://docs.ddev.com/en/stable/users/extend/custom-compose-files/#optional-services) can be used by add-ons to offer more flexible configuration.

Example:

- https://github.com/ddev/ddev-mongo/blob/main/docker-compose.mongo.yaml
- https://github.com/ddev/ddev-mongo/blob/main/commands/host/mongo-express

### `ddev get` Deprecation

The classic `ddev get` command is deprecated and replaced by `ddev add-on get`.

### PHP-based Actions

DDEV now supports PHP as an alternative to Bash for add-on actions. PHP actions are a good fit for complex configuration processing — reading and writing YAML, conditional logic based on project type, or generating files that would be awkward in Bash:

```yaml
post_install_actions:
  - |
    <?php
    #ddev-description: Generate service configuration
    $projectType = $_ENV['DDEV_PROJECT_TYPE'];
    if ($projectType === 'drupal') {
        $settings = "<?php\n// DDEV-generated Redis settings\n";
        file_put_contents(
            "/var/www/html/{$_ENV['DDEV_DOCROOT']}/sites/default/settings.ddev.redis.php",
            "#ddev-generated\n" . $settings
        );
    }
```

DDEV detects PHP actions by the `<?php` opening tag. They run inside the web container with the built-in `php-yaml` extension available. See the [creating add-ons documentation](https://docs.ddev.com/en/stable/users/extend/creating-add-ons/) for a full reference.

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

### Add-on Badges

The old `maintained` badge required yearly updates, which became a maintenance burden, especially for contributors with many add-ons. It's now replaced by a `last commit` badge.

To improve visibility and engagement on the [DDEV Add-on Registry](https://addons.ddev.com), add the registry badge to your [README.md](https://github.com/ddev/ddev-addon-template).

Example:

- https://github.com/ddev/ddev-addon-template/blob/main/README.md

### Advanced Customization with Flags

You can use [`ddev dotenv set`](https://docs.ddev.com/en/stable/users/usage/commands/#dotenv-set) to manage environment variables more cleanly. This allows your add-on to read custom environment variables defined in `.ddev/.env.*` files, and use them inside your `docker-compose.*.yaml` configuration.

This feature is especially useful for advanced setups where flexibility and dynamic configuration are needed.

Example:

- https://github.com/ddev/ddev-adminer#advanced-customization
- https://github.com/ddev/ddev-adminer/blob/main/docker-compose.adminer.yaml

### Making Small Changes to Docker Images

If your add-on needs a customized Docker image, the typical approach is to create a separate `Dockerfile` and configure your add-on to use it. However, for minor tweaks, you can take advantage of the [`dockerfile_inline`](https://docs.docker.com/reference/compose-file/build/#dockerfile_inline) option in your `docker-compose.*.yaml` file.

This approach lets you define a small `Dockerfile` directly in the YAML, avoiding the overhead of maintaining a separate file.

Examples:

- https://github.com/ddev/ddev-solr/blob/main/docker-compose.solr.yaml
- https://github.com/ddev/ddev-opensearch/blob/main/docker-compose.opensearch.yaml

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

## Conclusion

Keeping your add-on current means less work for users and fewer issues for you to manage. Use this guide as your checklist and stay in sync with the DDEV ecosystem.

Have questions, suggestions, or something cool to share? Join the conversation in our [Discord](/s/discord), [open an issue](https://github.com/ddev/ddev/issues), or reach out via [email](mailto:support%40ddev.com). Your feedback helps improve the tools we all rely on.

If DDEV is helping you or your organization, please consider [supporting its ongoing financial sustainability](/support-ddev/#sponsor-development). Every bit helps keep the ecosystem growing and maintained.

Happy maintaining!
