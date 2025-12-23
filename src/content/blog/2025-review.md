---
title: "DDEV 2025 Year in Review"
pubDate: 2025-12-23
summary: A look back at DDEV's accomplishments, challenges, and growth in 2025
author: Randy Fay
#featureImage:
#  src: /img/blog/2025/12/ddev-2025-review.png
#  alt: DDEV 2025 Year in Review
categories:
  - Community
---

2025 has been a year of significant growth and accomplishment for DDEV. With 579 commits to the main repository and releases from v1.24.0 through v1.24.10, we've made substantial progress on features, infrastructure, and community building. Here's a look back at what we all achieved together.

## Organizational Milestones

- **Board of Directors Established**: In December 2025, we formally established a Board of Directors for the DDEV Foundation, enhancing governance and setting the stage for long-term sustainability. We're super proud of this as it's something we've been working toward for years. [Read all about it](board-of-directors-established.md).
- **Advisory Group Continues**: Our Advisory Group meetings continued throughout the year, providing valuable input and community input and oversight. It will continue just about the same even though we now have a formal Board.
- **"Almost Everybody Loves DDEV"**: The [Ironstar Developer Survey 2025](https://www.ironstar.io/devsurvey25/#almost-everybody-loves-ddev) confirmed what we suspected - DDEV has strong community support and satisfaction.

## Major Features and Improvements

### Sponsorship Communication

- Massively improved reporting, communication, and management of sponsorship information
- Public sponsorship data feed via [sponsorship-data repository](https://github.com/ddev/sponsorship-data)
- Banners on DDEV web properties and The Drop Times show current funding status
- Daily `ddev start` notifications keep users informated about sponsorship status

### Add-on Ecosystem

- **The [Add-on Registry](https://addons.ddev.com)** launched in January 2025, now displaying 175 add-ons, 28 of which are officially maintained by the DDEV team
- **PHP-based add-ons** Add-ons can now be written in PHP, as the [ddev-upsun](https://github.com/ddev/ddev-upsun) add-on shows. The PHP language is far more capable for accomplishing complex tasks than shell scripts.
- **`ddev add-on get`** now downloads add-on dependencies automatically
- **`x-ddev` extension** allows add-ons to add important information to `ddev describe` output
- Add-on monitoring continues for both official and community add-ons
- New official add-ons: FrankenPHP (June), Redis Insight (July), Upsun (August), NVM Standalone (November)
- By year's end: 28+ official add-ons and 175+ total

### Container and Infrastructure

- **Podman support in v1.25.0**: Podman rootless/rootful environments
- **Docker rootless** functionality added for Linux environments
- **Parallel Docker image pulls** for faster project starts
- **Docker Compose profiles**: Start projects with specific profiles using `ddev start --profiles=list,of,profiles`
- Base webserver image updated to **Debian 13 Trixie**
- Refactored Docker API code: no calls to `docker` binary (switched to `github.com/docker/cli`) and no fragile YAML map structures (switched to `github.com/compose-spec/compose-go/v2`)

### Developer Experience

- **New handling of privilege elevation using the `ddev-hostname` binary**, improving security, [read more](ddev-hostname-security-improvements.md)
- **Improved `ddev share` in v1.25.0**: More configurable, customizable, with `pre-share` hooks and DDEV_SHARE_URL environment variable
- **`--user`/`-u` flag** for `ddev exec` and `ddev ssh`
- **`ddev describe`** now works on stopped projects
- **`ddev utility download-images --all`** forces pulling all images in use
- **Shell completion** added and expanded thanks to community contributions
- **`ddev npx`** command support
- Improved cleanup for `ddev delete` and `ddev delete images`

### Language and Database Updates in v1.25.0

- **PHP 8.4** as default for new projects
- **PHP 8.5** support with all extensions
- **Node.js 24** as default for new projects
- **MariaDB 11.8** as default for new projects
- **PostgreSQL 18** support added
- [Node.js as primary web server](https://ddev.readthedocs.io/en/stable/users/extend/customization-extendibility/#using-nodejs-as-ddevs-primary-web-server) support

### Platform Integration

- **XHGui integration** funded by TYPO3 Association, [read more](xhgui-feature.md)
- **`ddev-upsun` add-on** provides new integration with Upsun (formerly Platform.sh) fixed and flex projects.
- [Automatic HTTP/S communication between DDEV projects](https://docs.ddev.com/en/stable/users/usage/managing-projects/#access-another-project-via-https)
- Enhanced and simpler Pantheon support

### Windows Improvements

- **New Windows GUI Installer** handling Traditional Windows, WSL2/Docker CE, and Docker/Rancher Desktop
- ARM64 Windows installer support

## Website and Documentation

- **[Downloads page](/downloads)** with improved installer access
- **Copy button** for code blocks thanks to @bmartinez287
- **Giscus** commenting system for community discussions on blog posts
- AI integration documentation
- Multiple [blog posts](/blog) published covering technical guides, platform-specific instructions, and organizational updates
- Monthly newsletters tracking progress [sign up!](/newsletter)

## IDE Integration

- **IntelliJ IDEA plugin** got regular, consistent maintenance thanks to [@AkibaAT](https://github.com/AkibaAT) and moved to the DDEV organization on GitHub
- **The VS Code DDEV Manager extension** continued to be well maintained thanks to [@biati-digital](https://www.biati.com.mx/)

## AI in DDEV Development

2025 saw significant AI integration in our development workflow:

- **Substantial features enabled by AI**: Several features that seemed too daunting to start became achievable with AI assistance
- **Increased code volume**: More code, including extensive tests (though test quality varies)
- **Tools used**: Claude Code, GitHub Copilot
- **Training**: Coursera AI for Developers course

## Removals in v1.25.0

- NFS support removed
- `ddev service` command removed
- `ddev nvm` functionality removed
- Legacy configuration syntax cleanup

## Challenges

- **`bitnami/mysql` issue**: Using `bitnami/mysql` for 8.0 and 8.4 backfired with [Bitnami ceasing its traditional support of important docker images](https://github.com/ddev/ddev/issues/7470). This raises questions about dependency management when upstream projects change direction.
- We continue to struggle with funding for DDEV and went backward this year instead of forward.
- Market conditions are affecting agency and hosting company funding

## By the Numbers

- **579 commits** to the main repository
- **100+ pull requests** merged
- **Releases v1.24.0 through v1.24.10 with v1.25.0 coming in early 2026**
- **93 repositories** in the DDEV ecosystem
- **3,400+ GitHub stars** on the core project
- **28 official add-ons**
- **175 total add-ons**

## Thank You

Thanks to our amazing community: maintainer Stas Zhuk, contributors like tyler36, GuySartorelli, Hanoii, Bernardo Martinez, Ralf Koller, and many others. Thanks to our many crucial sponsors including Tag1, Upsun, Passbolt, Agiledrop, and all individual supporters.

And thanks to all of you who use DDEV, report issues, answer questions in Discord and other venues, and spread the word. Your support makes this project possible.

## Looking Ahead

Stay tuned for our 2026 plans post where we'll outline what's next for DDEV. As always, we welcome your input through all our [support venues](https://docs.ddev.com/en/stable/users/support/).
