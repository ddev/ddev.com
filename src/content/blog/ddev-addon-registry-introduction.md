---
title: "DDEV Add-on Registry Introduction"
pubDate: 2025-02-28
#modifiedDate: 2025-02-28
summary: Stas Zhuk on developing addons.ddev.com.
author: Stas Zhuk
featureImage:
  src: /img/blog/2025/02/developer-laptops.jpg
  alt: Laptops showing opened GitHub repositories
  credit: 'ChatGPT: many laptops arranged in a futuristic workspace, each showing different GitHub repositories, glowing screens displaying repository names and code'
categories:
  - Announcements
---

## Welcome to the DDEV Add-on Registry

We're excited to introduce [**addons.ddev.com**](https://addons.ddev.com), a central hub where the community can explore, contribute to, and enhance the collection of DDEV add-ons.

This registry is designed to provide seamless access to all available add-ons, making it easier for developers to browse without running into GitHub API limits.

Our goal here is simple: to provide a functional, yet evolving, platform that highlights "what it is" today while leaving space for community-driven improvements tomorrow.

## The Journey So Far

The concept for an add-on registry has been [in the works for a while](2024-plans.md). While `ddev add-on list` is a fantastic tool, it only scratches the surface when it comes to discovering and exploring add-ons.

The need for a dedicated registry became clear as we sought to streamline access to add-ons, reduce API limitations, and lessen the maintenance burden.

For inspiration, I looked to the simplicity and functionality of projects like [GTFOBins](https://gtfobins.github.io/), which is built with Jekyll.

## Used Tools

Here are the key tools used to build the DDEV Add-on Registry:

- [GitHub Pages and Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll): Jekyll powers the static site, while GitHub Pages hosts it.
- [DataTables](https://datatables.net/): For sorting and searching add-on entries.
- Golang: Used to aggregate add-on data into markdown files, which are transformed into Liquid templates for Jekyll.

## How to Set Up the Registry Locally

Getting started with the DDEV Add-on Registry locally is straightforward. Here’s how:

1. Clone the repository: <https://github.com/ddev/addon-registry>
2. Run `ddev start` to spin up the environment.
3. Then, launch it by running `ddev launch :4000`.

You’ll now be able to explore the add-ons within the registry right on your local machine.

## Key Components and Structure

Here's a breakdown of where important content and configuration files live:

- **`.bundle`**: A script for installing Jekyll dependencies.
- **`.ddev`**: The DDEV configuration directory.
- **`.github`**: The GitHub workflows that handle the deployment process.
- **`_addons`**: Custom Jekyll collection that holds all the add-ons fetched from the community.
- **`_data`**: User-defined Jekyll data types.
- **`_includes`**: HTML partials used across the site.
- **`_layouts`**: The layout templates for Jekyll pages.
- **`_pages`**: Jekyll pages overrides.
- **`assets`**: Contains styles and static assets.
- **`go`**: The Golang app that collects add-on data and populates `_addons`.
- **`Gemfile`**: The Ruby equivalent of `composer.json`, managing dependencies.
- **`_config.yml`**: The main configuration file for the Jekyll site.
- **`addons.json`**: A JSON representation of all the DDEV add-ons.
- **`index.html`**: The homepage of the registry.

## Looking Ahead: Future Development

While the DDEV Add-on Registry is functional, it remains a project ripe for growth and collaboration. It’s built simply, offering the perfect opportunity for someone in the community to step in and improve or even re-imagine the site, especially considering that [ddev.com is built with Astro](ddev-website-for-contributors.md).

Your ideas and contributions are welcome! We're tracking feedback and suggestions in [this GitHub issue](https://github.com/ddev/addon-registry/issues/9), and we'd love to hear from you.

Want to keep up as the month goes along? Follow us on

- [blog](https://ddev.com/blog/)
- [LinkedIn](https://www.linkedin.com/company/ddev-foundation)
- [Mastodon](https://fosstodon.org/@ddev)
- [Bluesky](https://bsky.app/profile/ddev.bsky.social)
- and join our community on [Discord](/s/discord)
