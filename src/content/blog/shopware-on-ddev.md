---
title: "Shopware on DDEV: notes from years of client projects"
pubDate: 2026-07-16
summary: Why DDEV and Shopware fit together, from a first DDEV onboarding to conclusions drawn over years of agency practice.
author: Benny Poensgen
categories:
  - Community
---

Are DDEV and Shopware a good fit? If you ask me, yes. Let me tell you why.

I first got to know DDEV a few years ago as a freelancer working on an agency Shopware project. Up until then,
every time I switched to a different agency, it was a painful process: Would the development environment
on my PC (Linux back then, macOS today) even work? What new ports and commands would I have to memorize?
Would the environments for my previous projects break?

So I braced myself for the onboarding meeting. But the preparation turned out to be minimal—I already had Docker,
and installing DDEV beforehand was just a script.
And then it was a `git clone` (okay, I knew that one well) and a `ddev start`—that was new.
And it was amazing: after what felt like five minutes (okay, let's say 20, including the database download and so on),
I had the shop up and running on my machine. Wow!

I quickly switched to DDEV for all of my client projects. It was a game-changer.
No more "port 8000 already in use" errors. A Shopware update needs a newer PHP version? A mismatched Node.js version?
Easy—just edit `.ddev/config.yaml` and run `ddev restart`. Done.

From time to time I also work on WordPress, Shopware 5, or MediaWiki projects, and DDEV is a great fit for all of
them: for me, it's one and the same setup, with the same look and feel. Even to write this blog post, I ran a
`ddev start` to bring up the Astro-based backend.

## Why I use DDEV for Shopware

Which features do I reach for again and again?

### Project isolation

DDEV projects are isolated from each other, so you can work on several at once without any conflicts. While working on
one project, another client calls in. Two clicks and the other project is up and running—and the first one stays up,
ready to be picked up again whenever you are.

### Xdebug

Xdebug used to be a pain to set up with "traditional" Docker environments. With DDEV, it's a breeze.
Just run `ddev xdebug on` and don't forget to tell your IDE to listen on the relevant port.

### Redis, RabbitMQ, and Elasticsearch at your fingertips

But back to Shopware—Shopware 6, to be precise. Since it's built on Symfony, it doesn't really need much for a local
setup: Apache or nginx with PHP-FPM and a database (MySQL or MariaDB). Once you get to real-world use, though, things
get more complex quickly. Two Redis servers (for cache and sessions), a RabbitMQ instance for the message queue,
Elasticsearch. This is where the DDEV add-ons come in. Just run `ddev add-on get ddev/ddev-redis`—and you're set. In my
experience, there's basically no system component that doesn't have an add-on.

### Hooks

Hooks exist for all kinds of things—for example, a post-import hook for the `ddev import-db` command. I use it to
make the necessary database adjustments, such as rewriting the sales channel domains or switching the mailer to Mailpit
(which is, of course, integrated into DDEV).

### Inter-project communication

Did I say DDEV projects are isolated? Well, only if you want them to be. Otherwise, your app in one DDEV project can
communicate with other projects—DDEV supports direct HTTP/S calls between projects. It's a great feature for developing
and testing a Shopware app server, for example. I've also used it to build and test the migration from Shopware 5 to
Shopware 6 across two projects.

### Mirroring the production or staging environment

A shop's media files can run to tens of gigabytes—so why copy them over at all? Most of my projects use nginx-fpm,
which makes an nginx reverse proxy the easy answer. Add a `.ddev/nginx/media.conf` file with the following contents:

```nginx
location @mediaserver {
    resolver 1.1.1.1;
    proxy_pass https://www.example.com$request_uri;
    # Uncomment if the remote environment is behind HTTP basic auth:
    # proxy_set_header Authorization "Basic <base64-of-user:password>";
}

location ^~ /media/ {
    access_log off;
    expires max;
    try_files $uri @mediaserver;
}

location ^~ /thumbnail/ {
    access_log off;
    expires max;
    try_files $uri @mediaserver;
}
```

Then run `ddev restart`. This not only mirrors (and caches) the media files from the production or staging environment,
but also lets you upload new media files to your local environment for testing.

### Shopware tooling

`shopware-cli` is increasingly being developed into a one-stop tool for development, and of course I want to use it in
my projects too. No problem—there's an add-on for that: `ddev add-on get vanwittlaer/ddev-shopware-cli`. The add-on
also lets you reach the storefront and admin watcher URLs directly and, more importantly, over HTTPS.

### Project lifecycle support

DDEV has the concept of "providers" that you can use to load any remote resource into your local environment. Many
projects have a provider that lets you download and import a sanitized production database, with a command like
`ddev pull sanitized` (this would be a customized command, so its actual name may vary). In theory, this also works in
the push direction, although I have never come across a use case for it so far.

### AI tooling

At the time of writing, I use [Claude Code](https://www.claude.com/product/claude-code) for my debugging and development
work. To keep it isolated from my local environment, I run it inside the DDEV container—yes, there's an add-on for that:
`ddev add-on get vanwittlaer/ddev-claude-code`. Pair it with Playwright (also in the DDEV container, via
`ddev add-on get codingsasi/ddev-playwright`) and watch Claude do interactive frontend development.

## How to get started

If you haven't worked with DDEV or Docker before, start with the
[DDEV installation guide](https://docs.ddev.com/en/stable/users/install/).

For your first project, you may want to follow [DDEV's quickstart guide for Shopware](https://docs.ddev.com/en/stable/users/quickstart/#shopware).

I prefer to keep the Shopware part of my projects in a subfolder, e.g. `shopware/`, separate from the infrastructure
around it, such as the `.ddev` and `.github` folders. That way any developer, even one who has never used DDEV, can tell
at a glance which parts are Shopware and which are not.

My [Less than 5 Minutes Install](https://notebook.vanwittlaer.de/ddev-for-shopware/less-than-5-minutes-install-with-ddev-and-symfony-flex/)
guide includes a script that sets this up with a `shopware/` subfolder.

If you prefer to do it manually, there are just four steps:

```bash
cd <your project directory>
ddev config --project-type=shopware6 --docroot=shopware/public --web-environment="APP_ENV=dev" \
        --web-working-dir=/var/www/html/shopware --composer-root=shopware
ddev start
ddev composer create-project shopware/production
# When it asks whether to include Docker configuration from recipes, answer `x`—
# DDEV takes care of that part.
ddev exec bin/console system:install --basic-setup --shop-locale=en-GB
```

You will end up with a working Shopware 6 installation; the admin credentials are `admin` / `shopware`.

## Conclusions—how good a fit is DDEV for Shopware?

Whether DDEV is a good fit for you depends less on Shopware itself than on the kind of Shopware work you do.

What I take from discussions with others in the Shopware community is that we bring in (at least) three perspectives:

- Shopware core development
- Store plugin development
- Client project development

Naturally, the requirements for a development environment and tooling differ for each. For a core developer, what
matters most might be running the latest versions of every dependency. For a store plugin developer, it might be testing
a plugin efficiently against every Shopware version and configuration out there. There are focused solutions for these
requirements, such as devenv, Dockware, the Shopware-provided Docker setup, or the new shopware-cli features.

Client project development, however, is where I spend most of my working time, and there the Shopware version and the
environment that mirrors the production setup are predefined and stable within a project. The day-to-day work is:

1. debugging (core, third-party plugins, custom code);
2. developing and testing new features (ERP integration, custom plugins, custom theme);
3. installing and testing third-party plugins;
4. implementing and testing Shopware and third-party plugin upgrades.

So what matters to me is an efficient setup for a given set of dependencies and versions, ease of use, integration with
testing and dev tools (Xdebug, Claude Code, Playwright, the storefront and admin watchers), reliability, support (DDEV
has a great Discord community), and—last but not least—not losing time when switching between client projects.

**tl;dr:** my answer to the question—how good a fit is DDEV for Shopware?—is a resounding yes.
