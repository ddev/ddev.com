---
title: "DDEV October 2026: PHP2Shell Fixed in v1.25.5, Thanks to Ondřej Surý and the PHP Foundation"
pubDate: 2026-10-27
summary: "October 2026 DDEV Newsletter: PHP2Shell and DDEV v1.25.5, the upstream people and organizations DDEV depends on and how to support them, the Hobobiker Rides Again live series migrating a Drupal 6 site with Claude, new community tools including DDrovr and an OpenLiteSpeed add-on, and talks and tutorials from around the web."
author: Randy Fay
featureImage:
  src: "/img/blog/2026/10/ddev-october-2026-featureimage.jpg"
  alt: "Nancy Lewis: Spring Along the Colorado River, watercolor painting of the river winding past green trees below red canyon cliffs"
categories:
  - Newsletters
---

## PHP2Shell, and DDEV v1.25.5

On October 21, PHP released 8.5.12, 8.4.27, 8.3.36, and 8.2.35 to fix CVE-2026-109618 and CVE-2026-109619, nicknamed "PHP2Shell". A single unauthenticated request could run code on any server running PHP. [PHP's security advisory↗](https://www.php.net/archive/2026.php#2026-10-21-5) has the details.

Local DDEV projects listen only on your own computer, so nobody on the internet could reach them. Projects exposed with `ddev share` or used for [casual hosting↗](https://docs.ddev.com/en/stable/users/topics/hosting/) were at risk, and so were your production servers. Stas wrote up the same day what DDEV users needed to do, including how to get the fixed PHP into projects before a new DDEV release: [PHP2Shell: What DDEV Users Need to Know](php2shell-what-ddev-users-need-to-know.md).

[DDEV v1.25.5](release-v1-25-5.md) shipped on October 26 with the fixed PHP in `ddev-webserver`. PHP 8.1 and older are past end of life and get no fixes from PHP, but deb.sury.org patched every version it ships, so PHP 5.6 through 8.1 in DDEV are fixed too. Upgrade, run `ddev restart`, and check `ddev php -v`. If you haven't updated PHP on the servers where your sites are hosted, do that first.

v1.25.5 also brings 142 community PRs that were waiting for the next release:

- A rebuilt `ddev tui` that fits any window and shows database addresses, snapshots, ports, and add-on updates
- `ddev config global --ssh-agent-upstream=host`, so containers use the SSH agent you already run (macOS agent, 1Password, Secretive, YubiKey)
- `ddev restart -s <service>` to recreate only the services you name
- QR codes from `ddev share` and `ddev launch --qr`, replacing the ddev-qr add-on
- zstd for `ddev import-db`, `ddev export-db`, and `ddev import-files`
- Global hooks, and `global_config.*.yaml` files merged over `global_config.yaml`
- Initial PHP 8.6 support (RC3, which doesn't have the PHP2Shell fixes yet)

The [release post](release-v1-25-5.md) covers these and the changes that might affect you.

## Standing on the Shoulders of Giants

DDEV couldn't have shipped a PHP fix this way on its own. It has always depended on two upstreams that most PHP developers rely on without thinking about them.

**Ondřej Surý** has packaged PHP for Debian since PHP 5, and maintains [deb.sury.org↗](https://deb.sury.org/), the repository that `ddev-webserver`, the `ondrej/php` PPA, and a large part of the PHP world install from. On the day of the PHP release, he published fixed AMD64 packages for every PHP version back to 5.6, including versions PHP itself no longer supports. As he writes on his site, "The PHP packaging is time consuming and I do this mostly in my free time." The BBC told his story in [How one man became the unsung hero of the internet during a cyber-security scramble↗](https://www.bbc.com/news/articles/cw30ejqljl43o). His day job is director of DNS engineering at [ISC↗](https://www.isc.org/), the nonprofit behind the BIND DNS server, and when the PHP2Shell details leaked early he had less time than planned to build the packages: "The feeling is like I am responsible for all these people and I can't fail them." Donations that week passed $10,000, which he said was "basically about a year's worth of the contributions that I got before." His message to the companies that depend on his packages: "If you just take and don't give back then it will backfire."

**The PHP Foundation** leads development and maintenance of PHP itself, including the security work behind releases like this one. The team is small for a language that runs so much of the web. "We have one full-time staff member (that's me) and 14 mostly part-time contractors," Executive Director Elizabeth Barron told [CNA↗](https://www.channelnewsasia.com/business/php-foundation-under-funded-one-full-time-staff-member-director-says-6488116) after the release, adding that "it is clear that PHP is incredibly under-funded." In 2025 its developers made 2,929 commits across 9 PHP repositories and reviewed 1,685 community PRs in php-src ([2025 impact report↗](https://thephp.foundation/blog/2026/05/27/impact-and-transparency-report-2025/)). On release day it also published [Today's PHP Security Release, and How We're Strengthening PHP Security↗](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/).

The DDEV Foundation has sponsored both for years, because DDEV is built on their work. If PHP is part of how you make a living, please support them too:

- Ondřej Surý: [GitHub Sponsors↗](https://github.com/sponsors/oerdnj) or [Open Collective↗](https://opencollective.com/debsuryorg). Companies that need a supported PHP for older versions can look at [PHP LTS from Freexian↗](https://www.freexian.com/lts/php/).
- The PHP Foundation: [Open Collective↗](https://opencollective.com/phpfoundation/contribute). Company memberships are on the [sponsor page↗](https://thephp.foundation/sponsor/).

## Community Projects

**DDrovr: a native macOS app for DDEV** — A SwiftUI desktop interface from Bison Digital for projects, logs, databases, Git, and settings, with start and stop from the menu bar. It runs the DDEV CLI and reads `.ddev/` rather than replacing anything. Version 1.0.3 needs macOS 14 and DDEV v1.24 or later. [ddrovr.com↗](https://ddrovr.com/)

**ddev-openlitespeed** — An add-on from morvy that replaces DDEV's web server with OpenLiteSpeed running lsphp, for PHP 5.6 through 8.5. It honors `.htaccess` and works with the LiteSpeed Cache WordPress plugin. Install with `ddev add-on get morvy/ddev-openlitespeed`. [GitHub↗](https://github.com/morvy/ddev-openlitespeed)

**ddev-clim** — A small terminal UI from lemachinarbo for starting and stopping DDEV projects, which can also restore your running projects at boot, with a systemd user service on Linux. Available from the AUR. [GitHub↗](https://github.com/lemachinarbo/ddev-clim)

**Mage 3.0 detects DDEV** — Sean van Zuidam's CLI for Magento 2 and Mage-OS now detects DDEV and runs its commands inside the container, so `mage cache:clean` works without `ddev exec`. [Release post↗](https://grimlink.com/blog/2026/mage-v3-released/)

## Talks and Tutorials from Around the Web

- **What's New in DDEV for TYPO3 Folks, October 2026** → Snapshots and seeded databases, Branchery, TYPO3 Quickstarter, Knecht, and PHP2Shell, for TYPO3 developers. [Read on news.typo3.com↗](https://news.typo3.com/article/whats-new-in-ddev-for-typo3-folks-october-2026)
- **René Kreijveld at Joomla World Conference** → Joomla development with DDEV. [View the slides↗](https://slides.renekreijveld.nl/jwc26/)
- **DDEV for Drupal: setup, import, and export** → Nadeem Mir of Dynamosys on setting up a Drupal 11 project, importing a site's database and files, and exporting it again, with warnings about what `ddev import-db` and `ddev import-files` overwrite. [Read on dynamosys.com↗](https://www.dynamosys.com/insights/2026/ddev-drupal-set-local-development-import-sites-and-export-projects)
- **Migrating a 13-year-old WordPress blog to Drupal CMS** → Christian López Espínola (penyaskito) moved a 722-post blog to Drupal CMS 2.2. The WordPress clone ran as its own DDEV project, and the Drupal project read its database container directly with `wordpress_migrate_sql` across 24 migrations. [Read on penyaskito.com↗](https://penyaskito.com/articles/2026/10/10/can-it-be-all-so-simple-migrating-13-year-old-wordpress-blog-drupal-cms)
- **Import a WordPress site with BackWPup** → Matthias Andrasch shows how to pull a BackWPup backup into DDEV with a custom provider and `ddev pull backup`. It's from 2023, so adjust the versions in the example config. [Read on dev.to↗](https://dev.to/mandrasch/import-wordpress-site-into-local-project-via-ddev-backwpup-18p6)

## DDEV Live Training

All sessions are open to everybody.

**Shopware with DDEV, with Benny Poensgen** — The October 21 session is recorded. [Watch the recording↗](https://youtu.be/JjcRapymIX8), browse the [slides↗](https://vanwittlaer.github.io/pt-ddev-live-training-oct-2026/), or read Benny's [Shopware on DDEV](shopware-on-ddev.md) post.

**Hobobiker Rides Again, at the Drupal AI Learners Club** — Randy, Amber Matz, and Angie Byron are migrating hobobiker.com, a Drupal 6 site from 2009, with Claude, live and in three parts. Everything runs in DDEV, and the repository, a sanitized database, and the slides are linked from the [hobobiker.com README↗](https://github.com/rfay/hobobiker.com).

- **Part 1, Road Test (October 16)** → Before migrating anything, Claude wrote a Playwright test suite against the old site. Working from the raw Drupal 6 database, it found the content types on its own, knew to use only the latest node revisions, and flagged problems nobody asked about, including database backups that anyone could download. [Watch the recording↗](https://www.youtube.com/watch?v=qd6R-e2EvOc) or read the [club's recap↗](https://www.drupal.org/docs/develop/development-tools/ai-coding-tools-for-drupal-development/drupal-ai-learners-club-sessions/2026-10-16-%E2%80%94-part-1-hobobiker-rides-again-plan-it-test-it-migrate-it-%E2%80%94-road-test-having-claude).
- **Part 2, The Last Ride (October 23)** → Claude retired the site as static HTML, following Lullabot's "Sending a Drupal Site into Retirement" and checked against the tests from Part 1. The archive is now live at [static.hobobiker.com↗](https://static.hobobiker.com). [Watch the recording↗](https://www.youtube.com/watch?v=hQR7G39FeRw) or read the [club's recap↗](https://www.drupal.org/docs/develop/development-tools/ai-coding-tools-for-drupal-development/drupal-ai-learners-club-sessions/2026-10-23-%E2%80%94-part-2-hobobiker-rides-again-plan-it-test-it-migrate-it-%E2%80%94-the-last-ride-sending-a).
- **Part 3, The Long Haul (Friday, October 30 at 10:30 AM US Mountain / 12:30 PM US Eastern / 17:30 CET)** → Drupal 6 to Drupal 11. Claude explores the source and the destination and writes a migration plan before touching any code, and the finished site has to pass the same test suite. [Register on Luma↗](https://luma.com/2g0u28yn)

The next DDEV training session:

- **November 11, 2026 at 8:00 AM US Mountain / 10:00 AM US Eastern / 16:00 CET — Advanced Coder.ddev.com Techniques**  
  Using the `coder` CLI, local and web-based VS Code, and remote-controlling Claude, including the `freeform` template.  
  [Add to Google Calendar](https://calendar.google.com/calendar/render?action=TEMPLATE&text=Advanced%20Coder.ddev.com%20Techniques&dates=20261111T150000Z/20261111T160000Z&details=Join%20the%20DDEV%20training%20session%20via%20Zoom.%0ALink%3A%20https%3A%2F%2Fus02web.zoom.us%2Fj%2F7315692237%3Fpwd%3DRHR6NUkwb0g5WXIzS2NOcXRucCthZz09%0AMeeting%20ID%3A%20731%20569%202237%0APasscode%3A%2012345&location=Online&trp=true) •
  [Download .ics](/files/ics/ddev-2026-11-11.ics)

Zoom Join Info:  
Link: [Join Zoom Meeting](https://us02web.zoom.us/j/7315692237?pwd=RHR6NUkwb0g5WXIzS2NOcXRucCthZz09)  
Passcode: 12345

---

## Governance

- The next DDEV advisory group meeting, open to everybody, is **November 4, 2026 at 8:00 AM US Mountain / 10:00 AM US Eastern / 16:00 CET**.
  [Add to Google Calendar](https://calendar.google.com/calendar/render?action=TEMPLATE&text=DDEV%20Board%20and%20Advisory%20Group%20Meeting&dates=20261104T150000Z/20261104T160000Z&details=DDEV%20Board%20and%20Advisory%20Group%20Meeting%0ALink%3A%20https%3A%2F%2Fus02web.zoom.us%2Fj%2F7315692237%3Fpwd%3DRHR6NUkwb0g5WXIzS2NOcXRucCthZz09%0AMeeting%20ID%3A%20731%20569%202237%0APasscode%3A%2012345&location=Online&trp=true) • See the [agenda](https://github.com/orgs/ddev/discussions/8794). We love to hear from our community!

---

## Sponsorship Update

We so appreciate all of you supporting the project!

**September 2026**: ~$10,099/month (84.2% of goal)

**October 2026**: ~$10,239/month (85.3% of goal)

If DDEV has helped your team, consider sponsoring. → [Become a sponsor↗](/sponsor)

[Contact us](/contact) to discuss sponsorship options that work for your organization.

---

## Stay in the Loop—Follow Us and Join the Conversation

- [Blog↗](https://ddev.com/blog/)
- [LinkedIn↗](https://www.linkedin.com/company/ddev-foundation)
- [Mastodon↗](https://fosstodon.org/@ddev)
- [Bluesky↗](https://bsky.app/profile/ddev.bsky.social)
- [Discord↗](/s/discord)

Compiled and edited with assistance from Claude Code.
