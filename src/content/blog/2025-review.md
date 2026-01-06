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

## Community Engagement

The DDEV open-source community continues excellent engagement on several fronts.

- [addons.ddev.com](https://addons.ddev.com) now shows 149 community-contributed add-ons.
- Several key features were suggested, initiated, and developed by community members. SO MANY of these are listed below.

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
- [**`x-ddev` extension**](https://docs.ddev.com/en/stable/users/extend/custom-docker-services/#customizing-ddev-describe-output) allows add-ons to add important information to `ddev describe` output
- Add-on monitoring continues for both official and community add-ons. We monitor the nightly tests of official add-ons, and periodically check in with all the community add-ons, asking people to re-enable or fix tests.
- New official add-ons: [FrankenPHP](https://github.com/ddev/ddev-frankenphp) (June), [Redis Insight](https://github.com/ddev/ddev-redis-insight) (July), [Upsun](https://github.com/ddev/ddev-upsun) (August), [NVM Standalone](https://github.com/ddev/ddev-nvm) (November)
- By year's end: 29 official add-ons and 175+ total add-ons.
- Stas continued to document and promote best practices with add-ons, including improved testing and upgrading strategies.

### Container and Infrastructure

- **Parallel Docker image pulls** for faster project starts
- **Docker Compose profiles**: Start projects with specific profiles using `ddev start --profiles=list,of,profiles`
- Refactored Docker API code: no calls to `docker` binary (switched to `github.com/docker/cli`) and no fragile YAML map structures (switched to `github.com/compose-spec/compose-go/v2`)

Upcoming v1.25.0:

- **Podman support**: Podman rootless/rootful environments
- **Docker rootless** functionality added for Linux environments
- Base web server image updated to **Debian 13 Trixie**

### Developer Experience

- **XHGui integration** funded by TYPO3 Association, [read more](xhgui-feature.md)
- **`ddev-upsun` add-on** provides new integration with Upsun (formerly Platform.sh) fixed and flex projects.
- **New handling of privilege elevation using the `ddev-hostname` binary**, improving security, [read more](ddev-hostname-security-improvements.md)
- **`--user`/`-u` flag** for `ddev exec` and `ddev ssh`
- **`ddev describe`** now works on stopped projects
- **`ddev utility download-images --all`** forces pulling all images in use
- [**Shell completion**](https://docs.ddev.com/en/stable/users/install/shell-completion/#shell-completion-autocomplete) added and expanded thanks to community contributions
- **`ddev npx`** command support
- Improved cleanup for `ddev delete` and `ddev delete images`
- [Automatic HTTP/S communication between DDEV projects](https://docs.ddev.com/en/stable/users/usage/managing-projects/#access-another-project-via-https)
- Enhanced and simpler Pantheon support

Upcoming v1.25.0:

- **Improved `ddev share`**: More configurable, customizable, with `pre-share` hooks and `DDEV_SHARE_URL` environment variable
- **`ddev utility mutagen-diagnose`**: Automatic study of mutagen problems or misconfiguration
- **`ddev utility xdebug-diagnose`**: Automatic study of possible Xdebug configuration problems

### Language and Database Updates

- **PHP 8.5** support added with a limited set of extensions
- **MariaDB 11.8** support added
- **PostgreSQL 18** support added
- [Node.js as primary web server](https://ddev.readthedocs.io/en/stable/users/extend/customization-extendibility/#using-nodejs-as-ddevs-primary-web-server) support

Upcoming v1.25.0:

- **PHP 8.4** is the default for new projects (previously PHP 8.3)
- **PHP 8.5** support with all extensions
- **Node.js 24** as default for new projects (previously Node.js 22)
- **MariaDB 11.8** as default for new projects (previously MariaDB 10.11)

### Windows Improvements

- **New Windows GUI Installer** handling Traditional Windows, WSL2/Docker CE, and Docker/Rancher Desktop
- ARM64 Windows installer support

## `ddev.com` Website and Documentation

- **[Downloads page](/downloads)** with improved installer access
- **Copy button** for code blocks thanks to Bernardo Martinez
- **Giscus** commenting system for community discussions on blog posts
- AI integration documentation
- Multiple [blog posts](/blog) published covering technical guides, platform-specific instructions, and organizational updates
- Monthly newsletters tracking progress [sign up!](/newsletter)

## IDE Integration

- [**IntelliJ IDEA plugin**](https://github.com/ddev/ddev-intellij-plugin) got regular, consistent maintenance thanks to [@AkibaAT](https://github.com/AkibaAT) and moved to the DDEV organization on GitHub
- [**The VS Code DDEV Manager extension**](https://marketplace.visualstudio.com/items?itemName=biati.ddev-manager) continued to be well maintained thanks to [@biati-digital](https://www.biati.com.mx/)

## DDEV Developer Improvements

- The new Quickstart tests have proved to be extremely valuable, providing early warning when upstream projects change. They also are a completely new perspective into problems with DDEV.
- [AkibaAT](https://github.com/AkibaAT) reorganized our Docker image builds so that multi-architecture builds that used to take an hour now take 10 minutes or less.

## AI in DDEV Development

2025 saw significant AI integration in our development workflow:

- **Substantial features enabled by AI**: Several features that seemed too daunting to start became achievable with AI assistance
- **Increased code volume**: More code, including extensive tests (though test quality varies)
- **Tools used**: Claude Code, GitHub Copilot
- **Training**: Our use of Claude Code was significantly improved by taking a [Coursera Course](https://www.coursera.org/learn/claude-code).

## Removals in v1.25.0

- NFS support removed
- `ddev service` command removed
- `ddev nvm` functionality removed
- Legacy configuration syntax cleanup

## Challenges

- **`bitnami/mysql` issue**: Using `bitnami/mysql` for MySQL 8.0 and 8.4 backfired with [Bitnami ceasing its traditional support of important Docker images](https://github.com/ddev/ddev/issues/7470). This raises questions about dependency management when upstream projects change direction.
- We continue to struggle with funding for DDEV and went backward this year instead of forward.
- Market conditions are affecting agency and hosting company funding
- GitHub killed off the best strategy we had for keeping add-on tests running, which means that nightly tests must be manually enabled by their maintainers when they are discontinued automatically.

## By the Numbers

- **579 commits** to the main repository
- **100+ pull requests** merged
- **Releases v1.24.0 through v1.24.10 with v1.25.0 coming in early 2026**
- **93 repositories** in the DDEV ecosystem
- **3,400+ GitHub stars** on the core project
- **28 official add-ons**
- **175 total add-ons**

## Wow, Community Contributions!

As an open-source project we truly value the amazing contributions of the community. There are so many ways these contributions happen, including support requests and issues (we learn so much from those!) but also direct contributions.

### By Contributor

I know this is "Too Much Information" but here is a simple and inadequate list of the amazing contributions directly to the main project by contributors other than Randy and Stas. It inspires me so much to see this consolidated list.

**Ralf Koller** - [rpkoller](https://github.com/rpkoller) - [36 contributions](https://github.com/ddev/ddev/commits?author=rpkoller&since=2025-01-01&until=2025-12-31)
- test: add a no-interaction flag to the install command in ibexa bats file (#7479
- test: adding quickstarts for typo3 v13 and v12 plus bats tests (#7302)
- feat: add success message for xhgui on and off, fixes #7202 (#7205)
- test: make the drupal cms bats test a bit more robust and trustworthy (#7203)
- test: fix for magento2 quickstart and bats test, fixes #7191 (#7192)
- test: adjust openmage bats test assertions to the now available demo content (#7126)
- test: bats test for Statamic Composer quickstart (#7116)
- test: craftcms bats test (#7107)
- test: adding silverstripe quickstart bats test (#7112)
- test: symfony bats tests (#7102)
- _(and 26 more)_

**Andrew Berry** - [deviantintegral](https://github.com/deviantintegral) - [11 contributions](https://github.com/ddev/ddev/commits?author=deviantintegral&since=2025-01-01&until=2025-12-31)
- feat: support using zstd for snapshots, fix `postgres:9` snapshot, fixes #7844, fixes #3583 (#7845)
- fix: old postgres restores
- fix: check postgres image version for zstd compat
- fix: opt out mysql 5.6 images too
- fix: support old zstd's without multithreading
- fix: quoting
- fix: missing quotes on 'zstd -T0'
- Replace zstdmt with zstd -T0 for greater compatibility
- Add zstd to all images
- Support using zstd for snapshots
- _(and 1 more)_

**Akiba** - [AkibaAT](https://github.com/AkibaAT) - [7 contributions](https://github.com/ddev/ddev/commits?author=AkibaAT&since=2025-01-01&until=2025-12-31)
- build(image): use native arm builder for building docker images, fixes #7539 (#7553)
- feat: add `ddev add-on search` subcommand, fixes #7491 (#7554)
- fix: add missing ephemeral port handling to xhgui service, fixes #7557 (#7560)
- fix: replace broken http and https port lookup, fixes #7246 (#7259)
- feat: add new envs `DDEV_PRIMARY_URL_PORT`, `DDEV_PRIMARY_URL_WITHOUT_PORT` and `DDEV_SCHEME`, fixes #7214 (#7218)
- fix: Use fast checkpoint during postgresql backup, fixes #7098 (#7219)
- fix: disable xdebug trigger for xdebug and xhprof status checks, fixes #6191, fixes php-perfect/ddev-intellij-plugin#414 (#7216)

**Ariel Barreiro** - [hanoii](https://github.com/hanoii) - [6 contributions](https://github.com/ddev/ddev/commits?author=hanoii&since=2025-01-01&until=2025-12-31)
- docs: trailing whitespace on template (#7321)
- refactor: improve `ddev add-on get` output, add warning exit code annotation (#7263)
- fix: add BASE_IMAGE arg before everything else, for #7071 (#7258)
- feat: support prepend.Dockerfile* files for multi-stage builds (#7071)
- feat: show config.*.y*ml on ddev start (#7089)
- fix: the `#ddev-description` stanza in add-on install actions not showing if it's the first line (#7022)

**tyler36** - [tyler36](https://github.com/tyler36) - [4 contributions](https://github.com/ddev/ddev/commits?author=tyler36&since=2025-01-01&until=2025-12-31)
- fix(cakephp): do not override APP_DEFAULT_LOCALE (#7653)
- docs: update ngrok link (#7359)
- feat: Add live link to Discord (#7042)
- refactor: remove outdated `move-issue` config , fixes #6899 (#6906)

**Travis Carden** - [TravisCarden](https://github.com/TravisCarden) - [3 contributions](https://github.com/ddev/ddev/commits?author=TravisCarden&since=2025-01-01&until=2025-12-31)
- docs: fix a little custom command annotations code example (#7711)
- docs: Add missing `sequelace` command link to `database-management.md` (#7184)
- docs: Fix niggling code sample inconsistency in `troubleshooting.md` (#6984)

**Laryn** - [laryn](https://github.com/laryn) - [3 contributions](https://github.com/ddev/ddev/commits?author=laryn&since=2025-01-01&until=2025-12-31)
- feat: backdrop add bee to quickstart (#7053)
- docs: add Backdrop-specific config considerations. (#7037)
- docs: change code refs to include info about Backdrop config storage options, fixes #7013 (#7014)

**Raphael Portmann** - [raphaelportmann](https://github.com/raphaelportmann) - [2 contributions](https://github.com/ddev/ddev/commits?author=raphaelportmann&since=2025-01-01&until=2025-12-31)
- fix(heidisql): add default `--databases=db` to postgres, for #7830 (#7847)
- feat(heidisql): allow postgres connections, fixes #7675 (#7677)

**cyppe** - [cyppe](https://github.com/cyppe) - [2 contributions](https://github.com/ddev/ddev/commits?author=cyppe&since=2025-01-01&until=2025-12-31)
- feat(db): remove the hardcoded --server-id=0 parameter from MySQL startup, fixes #6768 (#7608)
- fix(laravel): don't edit database config in `.env` when there's no database (#7584)

**Peter Bowyer** - [pbowyer](https://github.com/pbowyer) - [2 contributions](https://github.com/ddev/ddev/commits?author=pbowyer&since=2025-01-01&until=2025-12-31)
- docs: clarify instructions for using PhpStorm inside WSL2 (#7333)
- docs: add MySQL 8.4 to supported databases (#6971)

**Shelane French** - [shelane](https://github.com/shelane) - [2 contributions](https://github.com/ddev/ddev/commits?author=shelane&since=2025-01-01&until=2025-12-31)
- feat: add DDEV_APPROOT variable to web container and updates documentation, fixes #7198 (#7199)
- refactor: remove solrtail from installed example commands, fixes #7139 (#7140)

**Pierre Paul Lefebvre** - [PierrePaul](https://github.com/PierrePaul) - [2 contributions](https://github.com/ddev/ddev/commits?author=PierrePaul&since=2025-01-01&until=2025-12-31)
- fix: XHGui launch command support custom ports, fixes #7181 (#7182)
- docs: Add the xhgui container to the building and contributing page. Add more description to the xhprof profiling page. (#7168)

**Sven Reichel** - [sreichel](https://github.com/sreichel) - [2 contributions](https://github.com/ddev/ddev/commits?author=sreichel&since=2025-01-01&until=2025-12-31)
- test: Add OpenMage composer quickstart and tests (#7133)
- test: add OpenMage/Magento 1 quickstart test and split it from Magento 2, for #7094 (#7091)

**lguigo22** - [lguigo22](https://github.com/lguigo22) - [1 contribution](https://github.com/ddev/ddev/commits?author=lguigo22&since=2025-01-01&until=2025-12-31)
- docs: add cloudflare warp networking instructions (#7975)

**Justin Vogt** - [JUVOJustin](https://github.com/JUVOJustin) - [1 contribution](https://github.com/ddev/ddev/commits?author=JUVOJustin&since=2025-01-01&until=2025-12-31)
- fix(router): ensure Traefik monitor port is always bound to localhost (#7942)

**grummbeer** - [grummbeer](https://github.com/grummbeer) - [1 contribution](https://github.com/ddev/ddev/commits?author=grummbeer&since=2025-01-01&until=2025-12-31)
- fix(diagnose): Remove the hard-coded IP "127.0.0.1" from the DNS check, since it may be incorrect, fixes #7871 (#7872)

**crowjake** - [crowjake](https://github.com/crowjake) - [1 contribution](https://github.com/ddev/ddev/commits?author=crowjake&since=2025-01-01&until=2025-12-31)
- fix(commands): make `HostWorkingDir` respect `WebWorkingDir` (#7907)

**Markus Sommer** - [BreathCodeFlow](https://github.com/BreathCodeFlow) - [1 contribution](https://github.com/ddev/ddev/commits?author=BreathCodeFlow&since=2025-01-01&until=2025-12-31)
- fix: db port should be integer in generated TYPO3 AdditionalConfiguration.php, fixes #7892 (#7893)

**James Sansbury** - [q0rban](https://github.com/q0rban) - [1 contribution](https://github.com/ddev/ddev/commits?author=q0rban&since=2025-01-01&until=2025-12-31)
- docs: clarify instructions for disabling mutagen on a single project (#7861)

**Moshe Weitzman** - [weitzman](https://github.com/weitzman) - [1 contribution](https://github.com/ddev/ddev/commits?author=weitzman&since=2025-01-01&until=2025-12-31)
- docs: remove community examples link in documentation (#7834)

**Yan Loetzer** - [yanniboi](https://github.com/yanniboi) - [1 contribution](https://github.com/ddev/ddev/commits?author=yanniboi&since=2025-01-01&until=2025-12-31)
- docs: add missing dot in `.ddev/.env.*` (#7828)

**Garvin Hicking** - [garvinhicking](https://github.com/garvinhicking) - [1 contribution](https://github.com/ddev/ddev/commits?author=garvinhicking&since=2025-01-01&until=2025-12-31)
- docs: add crosslink for shortened DDEV env variables to full list, fixes #7781 (#7782)

**Benny Poensgen** - [vanWittlaer](https://github.com/vanWittlaer) - [1 contribution](https://github.com/ddev/ddev/commits?author=vanWittlaer&since=2025-01-01&until=2025-12-31)
- feat: use composer_root in cakephp, craftcms, laravel, magento2, shopware6, symfony for app type detection (#7558)

**Rob Loach** - [RobLoach](https://github.com/RobLoach) - [1 contribution](https://github.com/ddev/ddev/commits?author=RobLoach&since=2025-01-01&until=2025-12-31)
- chore(provider): remove trailing whitespace in YAML files (#7770)

**JshGrn** - [JshGrn](https://github.com/JshGrn) - [1 contribution](https://github.com/ddev/ddev/commits?author=JshGrn&since=2025-01-01&until=2025-12-31)
- docs: explicitly mention setting system managed nvm version, for #6013 (#7733)

**E** - [ara303](https://github.com/ara303) - [1 contribution](https://github.com/ddev/ddev/commits?author=ara303&since=2025-01-01&until=2025-12-31)
- docs(faq): remove traefik config when changing project's name, for #7638 (#7639)

**Alan Doucette** - [dragonwize](https://github.com/dragonwize) - [1 contribution](https://github.com/ddev/ddev/commits?author=dragonwize&since=2025-01-01&until=2025-12-31)
- feat: add `ddev npx` command (#7599)

**Brooke Mahoney** - [brookemahoney](https://github.com/brookemahoney) - [1 contribution](https://github.com/ddev/ddev/commits?author=brookemahoney&since=2025-01-01&until=2025-12-31)
- docs: clarify comments in the Drupal 10 and 11 quickstarts, fixes #7619 (#7620)

**gitressa** - [gitressa](https://github.com/gitressa) - [1 contribution](https://github.com/ddev/ddev/commits?author=gitressa&since=2025-01-01&until=2025-12-31)
- docs: remove Prerequisite section (#7621)

**Eduardo Rocha** - [hockdudu](https://github.com/hockdudu) - [1 contribution](https://github.com/ddev/ddev/commits?author=hockdudu&since=2025-01-01&until=2025-12-31)
- docs: fix typo in documentation (#7618)

**Dezső BICZÓ** - [mxr576](https://github.com/mxr576) - [1 contribution](https://github.com/ddev/ddev/commits?author=mxr576&since=2025-01-01&until=2025-12-31)
- docs: Fix blog link in main nav (#7566)

**Tomas Norre Mikkelsen** - [tomasnorre](https://github.com/tomasnorre) - [1 contribution](https://github.com/ddev/ddev/commits?author=tomasnorre&since=2025-01-01&until=2025-12-31)
- feat: add ddev version to ddev describe command, fixes #7398 (#7541)

**Danny Pfeiffer** - [danny2p](https://github.com/danny2p) - [1 contribution](https://github.com/ddev/ddev/commits?author=danny2p&since=2025-01-01&until=2025-12-31)
- fix(pantheon): update Pantheon database pull to get fresh DB and file push to be CMS-agnostic, fixes #5215, fixes #4760 (#7486)

**Popus Razvan Adrian** - [punkrock34](https://github.com/punkrock34) - [1 contribution](https://github.com/ddev/ddev/commits?author=punkrock34&since=2025-01-01&until=2025-12-31)
- feat: add Linux support for heidisql command (#7399)

**Daniel Huf** - [dhuf](https://github.com/dhuf) - [1 contribution](https://github.com/ddev/ddev/commits?author=dhuf&since=2025-01-01&until=2025-12-31)
- refactor: add svg to rewrite rule for TYPO3 (#7482)

**Ayu Adiati** - [adiati98](https://github.com/adiati98) - [1 contribution](https://github.com/ddev/ddev/commits?author=adiati98&since=2025-01-01&until=2025-12-31)
- docs(wsl): add `wsl --update` command for Windows (#7476)

**Peter Philipp** - [das-peter](https://github.com/das-peter) - [1 contribution](https://github.com/ddev/ddev/commits?author=das-peter&since=2025-01-01&until=2025-12-31)
- fix: temporarily allow write to `/etc/mysql/conf.d/*` for `db` container restart, fixes #7457 (#7458)

**O'Briat** - [obriat](https://github.com/obriat) - [1 contribution](https://github.com/ddev/ddev/commits?author=obriat&since=2025-01-01&until=2025-12-31)
- docs: How to use Xdebug with Composer for plugin development (#7423)

**Andreas Hager** - [andreashager](https://github.com/andreashager) - [1 contribution](https://github.com/ddev/ddev/commits?author=andreashager&since=2025-01-01&until=2025-12-31)
- feat: return real exit code from `ddev exec` and add quiet flag to it, fixes #3518 (#7385)

**Bill Seremetis** - [bserem](https://github.com/bserem) - [1 contribution](https://github.com/ddev/ddev/commits?author=bserem&since=2025-01-01&until=2025-12-31)
- docs: add Terminus downgrade tips, fixes #7352 (#7353)

**Olivier Mengué** - [dolmen](https://github.com/dolmen) - [1 contribution](https://github.com/ddev/ddev/commits?author=dolmen&since=2025-01-01&until=2025-12-31)
- build: upgrade mapstructure to v2 (#7396)

**Rui Chen** - [chenrui333](https://github.com/chenrui333) - [1 contribution](https://github.com/ddev/ddev/commits?author=chenrui333&since=2025-01-01&until=2025-12-31)
- test: use `main` for  setup-homebrew action instead of `master` (#7395)

**michaellenahan** - [michaellenahan](https://github.com/michaellenahan) - [1 contribution](https://github.com/ddev/ddev/commits?author=michaellenahan&since=2025-01-01&until=2025-12-31)
- docs: improve xhgui documention, fixes #7376 (#7377)

**August Miller** - [AugustMiller](https://github.com/AugustMiller) - [1 contribution](https://github.com/ddev/ddev/commits?author=AugustMiller&since=2025-01-01&until=2025-12-31)
- docs: align Craft CMS quickstart with official documentation (#7323)

**Loz Calver** - [lozcalver](https://github.com/lozcalver) - [1 contribution](https://github.com/ddev/ddev/commits?author=lozcalver&since=2025-01-01&until=2025-12-31)
- feat: prune orphaned Node.js versions after install, fixes #7325 (#7326)

**Tim Kelty** - [timkelty](https://github.com/timkelty) - [1 contribution](https://github.com/ddev/ddev/commits?author=timkelty&since=2025-01-01&until=2025-12-31)
- docs: update Craft CMS quickstart, for #7236 (#7274)

**Pedro Antonio Fructuoso Merino** - [pfructuoso](https://github.com/pfructuoso) - [1 contribution](https://github.com/ddev/ddev/commits?author=pfructuoso&since=2025-01-01&until=2025-12-31)
- fix: Add path to docroot in wp parameters when not set, fixes #7241 (#7242)

**Bang Dinh** - [bangdinhnfq](https://github.com/bangdinhnfq) - [1 contribution](https://github.com/ddev/ddev/commits?author=bangdinhnfq&since=2025-01-01&until=2025-12-31)
- docs: Update Shopware quickstart with "shopware/production" instead of "shopware/production:^v6.5" (#7253)

**nmangold** - [nmangold](https://github.com/nmangold) - [1 contribution](https://github.com/ddev/ddev/commits?author=nmangold&since=2025-01-01&until=2025-12-31)
- docs: wrap quotes around commands that use the caret symbol (#7237)

**Jeremy Gonyea** - [jgonyea](https://github.com/jgonyea) - [1 contribution](https://github.com/ddev/ddev/commits?author=jgonyea&since=2025-01-01&until=2025-12-31)
- docs: fix minor typo in the Grav quickstart (#7197)

**Colan Schwartz** - [colans](https://github.com/colans) - [1 contribution](https://github.com/ddev/ddev/commits?author=colans&since=2025-01-01&until=2025-12-31)
- build: stop installing chocolatey, fixes #6636, fixes #6344 (#7049)

**Mrtn Schndlr** - [barbieswimcrew](https://github.com/barbieswimcrew) - [1 contribution](https://github.com/ddev/ddev/commits?author=barbieswimcrew&since=2025-01-01&until=2025-12-31)
- fix: nginx.conf should let index.php handle 404 errors for media files (#7050)

**Marvin Hinz** - [marvinhinz](https://github.com/marvinhinz) - [1 contribution](https://github.com/ddev/ddev/commits?author=marvinhinz&since=2025-01-01&until=2025-12-31)
- fix: add timeout for netutil::IsPortActive check for WSL2 with "mirrored networking mode" as opposed to default "NAT mode", fixes #6245 (#7166)

**RubenColpaert** - [RubenColpaert](https://github.com/RubenColpaert) - [1 contribution](https://github.com/ddev/ddev/commits?author=RubenColpaert&since=2025-01-01&until=2025-12-31)
- fix: use `charset=utf8mb4` in DATABASE_URL for Symfony environment variables, fixes #7068 (#7076)

**Alexey Murz Korepov** - [MurzNN](https://github.com/MurzNN) - [1 contribution](https://github.com/ddev/ddev/commits?author=MurzNN&since=2025-01-01&until=2025-12-31)
- docs: Add docs about configuring browser for HTTPS certificates (#7075)

**Adam** - [phenaproxima](https://github.com/phenaproxima) - [1 contribution](https://github.com/ddev/ddev/commits?author=phenaproxima&since=2025-01-01&until=2025-12-31)
- docs: Update quickstart.md to remove Drupal CMS zip file instructions (#7119)

**Nick Hope** - [Nick-Hope](https://github.com/Nick-Hope) - [1 contribution](https://github.com/ddev/ddev/commits?author=Nick-Hope&since=2025-01-01&until=2025-12-31)
- docs: update Windows installation docs to use 'Docker Engine' terminology (#7092)

**Damilola Emmanuel Olowookere** - [damms005](https://github.com/damms005) - [1 contribution](https://github.com/ddev/ddev/commits?author=damms005&since=2025-01-01&until=2025-12-31)
- docs: add DevDb tip to database management documentation (#7084)

**nickchomey** - [nickchomey](https://github.com/nickchomey) - [1 contribution](https://github.com/ddev/ddev/commits?author=nickchomey&since=2025-01-01&until=2025-12-31)
- docs: add Wordpress special handling info about wp-cli.yml (#7080)

**Andrew Gearhart** - [AndrewGearhart](https://github.com/AndrewGearhart) - [1 contribution](https://github.com/ddev/ddev/commits?author=AndrewGearhart&since=2025-01-01&until=2025-12-31)
- refactor: improve docker version checks, set minimum supported docker API to 1.44, fixes #6916 (#6946)

**Christopher Kaster** - [atomicptr](https://github.com/atomicptr) - [1 contribution](https://github.com/ddev/ddev/commits?author=atomicptr&since=2025-01-01&until=2025-12-31)
- feat: change php-fpm setting 'decorate_workers_output' to 'no' (#6964)

**Hervé Donner** - [vever001](https://github.com/vever001) - [1 contribution](https://github.com/ddev/ddev/commits?author=vever001&since=2025-01-01&until=2025-12-31)
- feat: switch apache mpm_prefork to mpm_event, fixes #6966 (#6967)

**Bernhard Baumrock** - [BernhardBaumrock](https://github.com/BernhardBaumrock) - [1 contribution](https://github.com/ddev/ddev/commits?author=BernhardBaumrock&since=2025-01-01&until=2025-12-31)
- docs: Add ProcessWire to the Quickstart List (#6879)

**Erik Peterson** - [eporama](https://github.com/eporama) - [1 contribution](https://github.com/ddev/ddev/commits?author=eporama&since=2025-01-01&until=2025-12-31)
- fix: update Drupal 7 settings.ddev.php and settings.php to match Drupal 7.103 (#6913)

**Tom Yukhayev** - [charginghawk](https://github.com/charginghawk) - [1 contribution](https://github.com/ddev/ddev/commits?author=charginghawk&since=2025-01-01&until=2025-12-31)
- fix: In acquia.yaml, specify default site source for ddev pull acquia. (#6874)

### Summary by Count

| Contributor | GitHub | Count |
|------------|--------|-------|
| Ralf Koller | [rpkoller](https://github.com/rpkoller) | [36](https://github.com/ddev/ddev/commits?author=rpkoller&since=2025-01-01&until=2025-12-31) |
| Andrew Berry | [deviantintegral](https://github.com/deviantintegral) | [11](https://github.com/ddev/ddev/commits?author=deviantintegral&since=2025-01-01&until=2025-12-31) |
| Akiba | [AkibaAT](https://github.com/AkibaAT) | [7](https://github.com/ddev/ddev/commits?author=AkibaAT&since=2025-01-01&until=2025-12-31) |
| Ariel Barreiro | [hanoii](https://github.com/hanoii) | [6](https://github.com/ddev/ddev/commits?author=hanoii&since=2025-01-01&until=2025-12-31) |
| tyler36 | [tyler36](https://github.com/tyler36) | [4](https://github.com/ddev/ddev/commits?author=tyler36&since=2025-01-01&until=2025-12-31) |
| Travis Carden | [TravisCarden](https://github.com/TravisCarden) | [3](https://github.com/ddev/ddev/commits?author=TravisCarden&since=2025-01-01&until=2025-12-31) |
| Laryn | [laryn](https://github.com/laryn) | [3](https://github.com/ddev/ddev/commits?author=laryn&since=2025-01-01&until=2025-12-31) |
| Raphael Portmann | [raphaelportmann](https://github.com/raphaelportmann) | [2](https://github.com/ddev/ddev/commits?author=raphaelportmann&since=2025-01-01&until=2025-12-31) |
| cyppe | [cyppe](https://github.com/cyppe) | [2](https://github.com/ddev/ddev/commits?author=cyppe&since=2025-01-01&until=2025-12-31) |
| Peter Bowyer | [pbowyer](https://github.com/pbowyer) | [2](https://github.com/ddev/ddev/commits?author=pbowyer&since=2025-01-01&until=2025-12-31) |
| Shelane French | [shelane](https://github.com/shelane) | [2](https://github.com/ddev/ddev/commits?author=shelane&since=2025-01-01&until=2025-12-31) |
| Pierre Paul Lefebvre | [PierrePaul](https://github.com/PierrePaul) | [2](https://github.com/ddev/ddev/commits?author=PierrePaul&since=2025-01-01&until=2025-12-31) |
| Sven Reichel | [sreichel](https://github.com/sreichel) | [2](https://github.com/ddev/ddev/commits?author=sreichel&since=2025-01-01&until=2025-12-31) |
| lguigo22 | [lguigo22](https://github.com/lguigo22) | [1](https://github.com/ddev/ddev/commits?author=lguigo22&since=2025-01-01&until=2025-12-31) |
| Justin Vogt | [JUVOJustin](https://github.com/JUVOJustin) | [1](https://github.com/ddev/ddev/commits?author=JUVOJustin&since=2025-01-01&until=2025-12-31) |
| grummbeer | [grummbeer](https://github.com/grummbeer) | [1](https://github.com/ddev/ddev/commits?author=grummbeer&since=2025-01-01&until=2025-12-31) |
| crowjake | [crowjake](https://github.com/crowjake) | [1](https://github.com/ddev/ddev/commits?author=crowjake&since=2025-01-01&until=2025-12-31) |
| Markus Sommer | [BreathCodeFlow](https://github.com/BreathCodeFlow) | [1](https://github.com/ddev/ddev/commits?author=BreathCodeFlow&since=2025-01-01&until=2025-12-31) |
| James Sansbury | [q0rban](https://github.com/q0rban) | [1](https://github.com/ddev/ddev/commits?author=q0rban&since=2025-01-01&until=2025-12-31) |
| Moshe Weitzman | [weitzman](https://github.com/weitzman) | [1](https://github.com/ddev/ddev/commits?author=weitzman&since=2025-01-01&until=2025-12-31) |
| Yan Loetzer | [yanniboi](https://github.com/yanniboi) | [1](https://github.com/ddev/ddev/commits?author=yanniboi&since=2025-01-01&until=2025-12-31) |
| Garvin Hicking | [garvinhicking](https://github.com/garvinhicking) | [1](https://github.com/ddev/ddev/commits?author=garvinhicking&since=2025-01-01&until=2025-12-31) |
| Benny Poensgen | [vanWittlaer](https://github.com/vanWittlaer) | [1](https://github.com/ddev/ddev/commits?author=vanWittlaer&since=2025-01-01&until=2025-12-31) |
| Rob Loach | [RobLoach](https://github.com/RobLoach) | [1](https://github.com/ddev/ddev/commits?author=RobLoach&since=2025-01-01&until=2025-12-31) |
| JshGrn | [JshGrn](https://github.com/JshGrn) | [1](https://github.com/ddev/ddev/commits?author=JshGrn&since=2025-01-01&until=2025-12-31) |
| E | [ara303](https://github.com/ara303) | [1](https://github.com/ddev/ddev/commits?author=ara303&since=2025-01-01&until=2025-12-31) |
| Alan Doucette | [dragonwize](https://github.com/dragonwize) | [1](https://github.com/ddev/ddev/commits?author=dragonwize&since=2025-01-01&until=2025-12-31) |
| Brooke Mahoney | [brookemahoney](https://github.com/brookemahoney) | [1](https://github.com/ddev/ddev/commits?author=brookemahoney&since=2025-01-01&until=2025-12-31) |
| gitressa | [gitressa](https://github.com/gitressa) | [1](https://github.com/ddev/ddev/commits?author=gitressa&since=2025-01-01&until=2025-12-31) |
| _...and 36 more contributors_ | | |

### Blog Guest Contributors

Guest contributions to the blog are [always welcome](https://github.com/ddev/ddev.com#blog-posts-and-guest-blog-posts) and key contributors added significant posts this year:

**Ajith Thampi Joseph** - [atj4me](https://github.com/atj4me)
- [Tailscale for DDEV: Simple and Secure Project Sharing](tailscale-router-ddev-addon)

**Bill Seremetis** - [bserem](https://github.com/bserem)
- [How to Downgrade Terminus in DDEV's Web Container and Customize Other Bundled Tools](ddev-bundled-tools-using-custom-versions)

**Garvin Hicking** - [garvinhicking](https://github.com/garvinhicking)
- [Using DDEV to spin up a legacy PHP application](legacy-projects-with-unsupported-php-and-mysql-using-ddev)

**Jeremy Gonyea** - [jgonyea](https://github.com/jgonyea)
- [Building an Off-Ramp from WordPress with DDEV](building-offramp-from-wordpress-with-ddev)

**ayalon** - [ayalon](https://github.com/ayalon)
- [Exposing a Node.js App Over HTTP / HTTPS on a Subdomain in DDEV](ddev-expose-node-app-on-subdomain) (blog author: J. Minder)

And thanks to all of you who use DDEV, report issues, answer questions in [Discord](https://ddev.com/s/discord) and other venues, and spread the word. Your support makes this project possible.


### Amazing Official Add-on Maintainers

There are so many unofficial add-ons being maintained by so many people, but here are the folks that maintained official repositories:

1. **[@tyler36](https://github.com/tyler36)** - ddev-browsersync, ddev-cron, ddev-cypress, ddev-qr, plus contributions to 20+ other add-ons
2. **[@weitzman](https://github.com/weitzman)** (Moshe Weitzman) - ddev-drupal-contrib, ddev-selenium-standalone-chrome
3. **[@cmuench](https://github.com/cmuench)** (Christian Münch) - ddev-opensearch
4. **[@julienloizelet](https://github.com/julienloizelet)** (Julien Loizelet) - ddev-mongo
5. **[@mkalkbrenner](https://github.com/mkalkbrenner)** - ddev-solr
6. **[@robertoperuzzo](https://github.com/robertoperuzzo)** - ddev-sqlsrv
7. **[@b13](https://github.com/b13)** (TYPO3 agency) - ddev-typo3-solr, ddev-rabbitmq
8. **[@jedubois](https://github.com/jedubois)** - ddev-varnish
9. **[@hussainweb](https://github.com/hussainweb)** - ddev-redis
10. **[@seebeen](https://github.com/seebeen)** - ddev-ioncube,ddev-minio
11. **[@bserem](https://github.com/bserem)** (Bill Seremetis) - ddev-adminer
12. **[@AkibaAT](https://github.com/AkibaAT)** - ddev-intellij-plugin
13. **[@biati-digital](https://github.com/biati-digital)** - vscode-ddev-manager

## Looking Ahead

Stay tuned for our 2026 plans post where we'll outline what's next for DDEV. As always, we welcome your input through all our [support venues](https://docs.ddev.com/en/stable/users/support/).
