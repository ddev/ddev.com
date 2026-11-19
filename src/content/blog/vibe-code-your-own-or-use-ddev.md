---
title: "Vibe-Code Your Own Local Dev Environment, or Use DDEV? What's the Difference"
pubDate: 2026-11-19
summary: Starting nginx, PHP-FPM, and a database on your computer is the easy part, and AI makes it even easier. What DDEV adds is per-project networking, the Traefik router, per-project PHP, web server, and database versions, an add-on ecosystem, support, and a nonprofit that will still be maintaining it next year.
author: Randy Fay
featureImage:
  src: /img/blog/2026/11/vibe-code-your-own-or-use-ddev.svg
  alt: Side-by-side illustration. On the left, nginx, Apache, PHP-FPM, a shared MariaDB, Redis, and Mailpit tangled together on one computer with port numbers and /etc/hosts on sticky notes. On the right, a DDEV Traefik router in front of three projects, each with its own web and db containers at different PHP and database versions.
categories:
  - DevOps
---

Every few weeks someone shows me a new local development tool. Lately many of them were written in a weekend with an AI agent, and the announcement often includes the words "ditching Docker". One I looked at this week has about 37,000 lines of Rust, a desktop app, a CLI, an MCP server, and native packages for four platforms, and the repository is five days old. It starts nginx or Apache, PHP-FPM, MariaDB, Redis, and Mailpit directly on your computer, with HTTPS and a `.test` hostname for each project.

That's impressive work, and I mean that. It's also not a new idea. MAMP, XAMPP, Laravel Valet, [Laravel Herd](https://herd.laravel.com/), and [Local](https://localwp.com/) have all been "run the web components natively" tools for years, and plenty of people are happy with them.

But I think a lot of people don't see the difference between running web components and a local development environment. Starting nginx, PHP, and a database is the easy part. AI has made it easier still. The hard parts are what happens with the second project, the tenth project, the second developer on the team, the client who needs Solr, the legacy site on PHP 7.2, and the operating system update next spring. Those are what DDEV has spent more than ten years on.

Of course, I'm biased. Here's what I think the differences are.

## Docker Networking: Every Project Gets Its Own Little Network

This is the part people miss most often, and it's the most important one.

When you `ddev start` a project, DDEV creates a set of containers for it, and they talk to each other over a Docker network. Inside the project, the database is at `db`, the web server is at `web`, and everything uses its normal port. Your Drupal `settings.php` or Laravel `.env` says `DB_HOST=db` and `DB_PORT=3306`, and that is true in every DDEV project you will ever have. Ten projects can all use `db:3306` at the same time without any conflict, because each one has its own `db`.

When you add a service, say Solr or Elasticsearch or a Node.js API, it's another container on that network, reachable by name. `http://solr:8983` from the web container just works. Nothing on your host computer has to change, and no port has to be allocated.

A native stack can't do that. There's one host and one set of ports, so the tool runs one shared MariaDB server for every project, gives each project its own database and credentials on it, and assigns each project its own port from a range (18000-18999 and 19000-19999 in the tool I looked at). Each project's configuration then has to use those particular ports. That works, but your configuration now depends on what the tool happened to assign on your machine, and it won't be the same on your colleague's machine.

Production hosting looks a lot more like the DDEV model: services find each other by hostname, and each service uses its normal port.

## The Traefik Router: Hostnames, HTTPS, and Routing

Every running DDEV project is behind a single [Traefik](https://traefik.io/) router, which listens on ports 80 and 443 and sends each request to the right project by hostname.

- Every project gets `https://<project>.ddev.site` with no configuration at all. `*.ddev.site` is a public wildcard DNS entry that resolves to `127.0.0.1`, so DDEV doesn't have to edit `/etc/hosts` for each project, and there's no sudo prompt every time you add one.
- HTTPS is trusted, using [mkcert](https://github.com/FiloSottile/mkcert). You run `mkcert -install` once.
- `additional_hostnames` and `additional_fqdns` give one project as many names as it needs, for multisite or for a project that has to answer on a real domain name.
- The router doesn't only serve PHP. Mailpit, add-on dashboards, and Node.js apps all get their own HTTPS URLs. See [Exposing a Node.js App Over HTTP/S on a Subdomain](ddev-expose-node-app-on-subdomain.md).
- `ddev share` puts a project on the internet for a client or a phone, using [ngrok, cloudflared, or a provider you write yourself](share-providers.md). The [Tailscale router add-on](tailscale-router-ddev-addon.md) shares projects with your own devices.

If you write your own router, you get to learn about port 443 already in use, VPN clients that take over DNS, corporate proxies, and [home routers that refuse to resolve DNS to 127.0.0.1](fritzbox-routers-and-ddev.md). We've learned about all of those from DDEV users over the years, and the fixes are in DDEV now.

## Multiple Web Servers, PHP Versions, and Database Versions, Side by Side

Each DDEV project chooses its own stack in `.ddev/config.yaml`:

```yaml
php_version: "7.4"
webserver_type: apache-fpm
database:
  type: mariadb
  version: "10.4"
```

Another project running at the same time can use PHP 8.5 with `nginx-fpm` and PostgreSQL 18, and a third can use `webserver_type: generic` to run [FrankenPHP](using-frankenphp-with-ddev.md) or a Node.js server. DDEV supports PHP 5.6 through 8.5, MariaDB 5.5 through 12.3, MySQL 5.5 through 9.7, and PostgreSQL 9 through 18, so you can bring an [old project with unsupported PHP and MySQL](legacy-projects-with-unsupported-php-and-mysql-using-ddev.md) back to life without touching your other projects.

The database version is the one native stacks have the most trouble with. With one shared MariaDB server, every project gets the same MariaDB version. If one client is on MariaDB 10.4 and another is moving to 11.8, you're out of luck. In DDEV each project has its own database container with its own version, and `ddev snapshot` saves and restores it in seconds.

When a project needs something unusual, like an extra PHP extension or a newer ImageMagick, you add it to `webimage_extra_packages` or put a Dockerfile in `.ddev/web-build/`. That change affects only that project, and it doesn't install anything on your computer.

## The Add-on Ecosystem

The [DDEV Add-on Registry](https://addons.ddev.com) lists 315 add-ons today. 27 of them are official add-ons maintained by the DDEV team, and the other 288 come from the community. Redis, Solr, Elasticsearch, OpenSearch, Memcached, Varnish, MongoDB, RabbitMQ, Selenium, and many more are one command away:

```bash
ddev add-on get ddev/ddev-solr
ddev restart
```

The official add-ons have automated tests that run every day against current DDEV releases, and many community add-ons use the same test setup. Anybody can write an add-on, and we've done [training on how to create and maintain add-ons](creating-maintaining-ddev-addons-training.md).

With a native stack, a new service arrives only when the tool's author adds it, and then it has to be built and packaged for every supported platform. The README of the tool I looked at says "Memcached is not implemented", which is a sentence you'll never have to read in DDEV.

## Your Configuration Lives in Your Repository

Everything about a DDEV project lives in its `.ddev` directory, and you commit that directory. A new developer on the team clones the repository, runs `ddev start`, and has the same PHP version, the same database version, the same add-ons, the same hostnames, and the same custom commands as everybody else. It works the same on macOS, Windows, WSL2, and Linux, on both AMD64 and ARM64.

Native tools usually keep project configuration in your home directory, so each developer sets up each project by hand, and the next person to join the team gets to do it again. I said in [Why use DDEV instead of rolling your own Docker-based local dev solution?](why-use-ddev-local-instead-of-rolling-your-own-docker-based-local-dev-solution.md) that the biggest benefit of DDEV may be that the team lead gets the day off. That's still true.

## Your Project Runs in Containers, Not on Your Host

DDEV's web server, PHP, Composer, Node.js, and database all run in containers. Your project's code is mounted into them, but `composer install` and `npm install` and whatever post-install scripts come with them run inside the container, not on your computer.

That matters more now than it used to, because many of us have AI agents running `composer`, `npm`, and test suites for us all day long, and a container is a good place for that. See [Giving an AI Agent Its Own Linux User](giving-an-ai-agent-its-own-linux-user.md) if you want to go further, or try [coder.ddev.com](coder-ddev-com-announcement.md), where DDEV runs in a free, experimental cloud workspace and not on your computer at all.

DDEV also respects your computer. It doesn't install a privileged helper, add PHP shims to the front of your `PATH`, or edit `/etc/hosts` every time you add a project. If you want to remove DDEV, you remove DDEV.

## The Everyday Features

Then there's the list of things people take for granted once they have them:

- [Xdebug step debugging](https://docs.ddev.com/en/stable/users/debugging-profiling/step-debugging/) with `ddev xdebug on`. With PhpStorm there's no setup at all.
- [Mutagen](supercharge-your-ddev-performance-with-mutagen.md) for fast file access on macOS and Windows, on by default.
- `ddev composer`, `ddev npm`, `ddev drush`, `ddev artisan`, and [custom commands](https://docs.ddev.com/en/stable/users/extend/custom-commands/) your team can add.
- Settings file management for Drupal, WordPress, TYPO3, Craft CMS, Magento, Shopware, Backdrop, and others, which you can [turn off](controlling-cms-settings-files-in-ddev-local.md).
- `ddev pull` and `ddev push` for [Upsun](https://docs.ddev.com/en/stable/users/providers/upsun/), [Pantheon](https://docs.ddev.com/en/stable/users/providers/pantheon/), [Acquia](https://docs.ddev.com/en/stable/users/providers/acquia/), and [Lagoon](https://docs.ddev.com/en/stable/users/providers/lagoon/), plus examples for rsync, Git, and local files that you can adapt for any host you use.
- [Database snapshots](ddev-snapshots.md), import, and export.

## Your Dev Environment Shouldn't Be a Sales Funnel

Some of the most polished local development tools are made by companies that sell something else.

[Local](https://localwp.com/) is a nice tool, but it's only for WordPress, and it belongs to WP Engine. Its Connect feature pushes and pulls sites to WP Engine and Flywheel, and for any other host the help docs suggest a migration plugin instead.

[Laravel Herd](https://herd.laravel.com/) is the slickest of the native tools, and if you're one developer doing Laravel on a Mac, you may like it a lot. It runs on macOS and Windows; the Herd site says Linux is "not… yet". The free version includes PHP, nginx, DNS, and Node.js. MySQL, PostgreSQL, Redis, mail, and Xdebug detection are in Herd Pro, a yearly subscription. And Herd can deploy straight to Laravel Cloud.

There's nothing wrong with any of that. Companies need to make money, and these are good products. But it does mean that a tool tied to one framework and one hosting company is going to work best with that framework and that hosting company, and its pricing and features are decided by that company's business plans. When you take on a Drupal client, or a Symfony API, or a Python service, or a site hosted somewhere else, you need another tool.

DDEV is different in a few ways that matter:

- DDEV is free and open-source software, Apache-2.0 licensed. There's no Pro tier.
- DDEV works with Drupal, WordPress, TYPO3, Laravel, Symfony, Craft CMS, Magento, Shopware, Backdrop, generic PHP, Node.js, Python, and whatever else you can put in a container.
- DDEV is owned by the [DDEV Foundation](/foundation), a [US 501(c)(3) nonprofit](501c3.md) with a [Board of Directors](board-of-directors-established.md). The Foundation doesn't sell hosting or anything else.

Hosting companies do [sponsor DDEV](/sponsor), and we're grateful to them. Upsun (formerly Platform.sh) was our lead sponsor for years and still sponsors DDEV today. But a sponsorship doesn't buy lock-in. Every hosting integration is a small YAML file in your project's `.ddev/providers` directory that you can read, change, or copy to support some other host.

## Maintenance in Month 5, and in Year 5

AI makes the first version of a tool cheap. It doesn't make the next five years cheap.

Somebody has to answer questions when a new macOS release changes how certificates are trusted, when a Linux distribution drops a library the bundled PHP needs, when Docker Desktop or OrbStack changes something, when a new PHP or database version comes out, and when a user in another country has a VPN that does something nobody has seen before. The first version of a local development tool is the easy part. Month 5 is when the real work starts, and in year 5 it's still going on.

DDEV has been doing that work for more than ten years. We run automated tests on every supported platform and Docker provider, and benchmark them every night. New PHP, database, and CMS versions are usually supported before their release. And you can [get support](https://docs.ddev.com/en/stable/users/support/) from the maintainers and the community in [Discord](/s/discord), the [issue queue](https://github.com/ddev/ddev/issues), and Stack Overflow, from people who have probably seen your problem before.

That work is paid for by the DDEV Foundation, which pays the maintainers, keeps public financial reports, and has a board of directors, so DDEV doesn't depend on one person's weekend or one company's priorities. I wrote more about that in [Securing DDEV's Future](sustainability-for-ddev.md).

## When a Native Stack Is Fine

There are good reasons to use a native stack. If you're one developer working on a few similar PHP projects, you don't need different database versions, you don't work with a team, and you don't want a container runtime on your computer, a native tool will probably work for you.

But "I don't want Docker" doesn't mean what it did a few years ago. You don't need Docker Desktop to use DDEV. OrbStack, Colima, Lima, Rancher Desktop, Podman, and Docker CE on Linux or in WSL2 all work, most of them are free and open-source, and our [nightly benchmarks](docker-performance.md) show that the macOS providers now perform about the same.

## The Comparison

|                                  | Native or vibe-coded stack | Herd, Local, and similar      | Your own docker-compose | DDEV                                     |
| -------------------------------- | -------------------------- | ----------------------------- | ----------------------- | ---------------------------------------- |
| Project isolation                | None, shared servers       | None, shared servers          | Yes                     | Yes, a network per project               |
| Hostnames and HTTPS              | Edits `/etc/hosts`         | Built-in                      | You build it            | `*.ddev.site`, Traefik, trusted HTTPS    |
| PHP version per project          | Usually                    | Yes                           | Yes                     | 5.6 through 8.5                          |
| Database version per project     | No, one per engine         | Varies                        | Yes                     | Yes, MariaDB, MySQL, PostgreSQL          |
| Web server per project           | Sometimes                  | Usually one                   | Yes                     | nginx, Apache, or generic                |
| Extra services                   | What the author ships      | What the vendor ships         | You build them          | 315 add-ons                              |
| Configuration in your repository | Usually not                | No                            | Yes                     | Yes, `.ddev`                             |
| Project types                    | PHP                        | One framework or CMS          | Anything                | PHP, Node.js, Python, and more           |
| Platforms                        | Varies                     | Usually macOS and Windows     | Wherever Docker runs    | macOS, Windows, WSL2, Linux, AMD64/ARM64 |
| Tied to a hosting company        | No                         | Often                         | No                      | No                                       |
| License                          | Varies                     | Proprietary, often paid tiers | Yours                   | Apache-2.0, free                         |
| Who maintains it                 | The author, for now        | A company                     | You                     | The DDEV Foundation, a nonprofit         |
| Support                          | The author                 | The vendor                    | You                     | Maintainers and a large community        |

## Go Ahead and Build One

If you enjoy building your own local development environment, go ahead. You'll learn a lot about web servers and PHP-FPM and certificates, and I'll probably enjoy reading about it. But if you want to spend your time on your projects instead of on your development environment, that's what DDEV is for.

DDEV is free, open-source, and owned by a nonprofit, and it's sustained by people and organizations who use it. If it saves you time, please consider [sponsoring DDEV](/sponsor). Sponsorships to the DDEV Foundation may be tax-deductible in the US. And come tell us what you think in [Discord](/s/discord).
