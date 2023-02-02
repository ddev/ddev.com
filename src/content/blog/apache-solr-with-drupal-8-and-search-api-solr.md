---
title: "Apache Solr with Drupal 8 and Search API Solr"
pubDate: 2019-12-17
author: Randy Fay
featureImage:
  src: /img/blog/2019/12/screenshot-2019-12-12-at-11.11.13-am-e1611331510843.png
  alt:
  caption:
  credit:
  shadow: true
categories:
  - Guides
---

[DDEV-Local’s](http://ddev.com/ddev-local) first official third-party service was Apache Solr, and lots of people have used it successfully over the years. But I never actually took the time to explore what was going on, and to support people who are having trouble it’s best if you actually understand the context 🙂 Since I had to do a deep dive into [DDEV’s Solr setup](https://ddev.readthedocs.io/en/stable/users/extend/additional-services/#apache-solr) recently, here are some of the things I learned. I was mostly focused on Drupal 8, but many of the things I learned are applicable to any DDEV (or other Docker-based) Solr environment.

This will be a Drupal 8-specific Solr setup, but the fundamentals can be applied to any CMS.

Many, many of the problems people have with Solr are a result of our highly advanced copy/paste culture 🙂 I’m going to go into minor detail about the component parts here because I think you have to understand at least a little bit about each one.

- [Apache Solr](https://lucene.apache.org/solr/) is a famous search-indexing and search platform written in Java and based on Apache Lucene. Its jobs are to 1) take content given to it and create a search index so key words and phrases can find particular content and 2) tell clients how to find something using that search index.
- [Docker Solr](https://hub.docker.com/%5F/solr/) is the official Docker Hub Solr image. It is provided in many versions. I’m only discussing v8 (current) in this article. There’s a [Docker Solr GitHub repository](https://github.com/docker-solr/docker-solr) and a super-important [README](https://github.com/docker-solr/docker-solr/blob/master/README.md). You probably can’t understand what’s going on in any docker-compose setup that uses Docker Solr if you don’t read that README.
- Drupal 8’s [Search API](https://www.drupal.org/project/search%5Fapi) module is the generic search approach used by most Drupal sites. Solr is the most popular backend for search_api module.

The big-picture job that we have to do with Solr and DDEV-Local (with _any_ CMS type) is to add a Solr server and configure its datasets. Then the CMS itself has to be configured to talk to the Solr server.

For Drupal 8, the [Search API Solr](https://www.drupal.org/project/search%5Fapi%5Fsolr) module adds the Solr piece to Search API module. It has very explicit [installation instructions](https://git.drupalcode.org/project/search%5Fapi%5Fsolr/blob/8.x-3.x/INSTALL.md) on how to set up Solr and configure it, but they assume a bare-metal Solr server, rather than docker-solr.

DDEV-Local’s strategy is to use a single-core Docker Solr in a docker-compose.solr.yaml file, so I’ll walk through what I learned there piece by piece.

Some assumptions:

- The name of the core we’ll use is “dev”. That’s referred to throughout the configuration
- There is a single core. It’s named “dev” 🙂

## DDEV-Local Solr Big Picture

- Add a `.ddev/docker-compose.solr.yaml` that sets up Docker Solr
- Add the `.ddev/solr/solr_configupdate.sh` script to cause Solr configuration to be re-read on each `ddev restart`.
- Add the Solr configuration files into `.ddev/solr/conf`

## Drupal 8 and Module Setup

In the interest of starting from scratch, I’ll start with a completely clean Drupal 8 project. I’m doing this in a project and directory called “d8solr”, so URLs will look like `https://d8solr.ddev.site.`

Based on the regular [Drupal 8 quickstart](https://ddev.readthedocs.io/en/stable/users/cli-usage/#drupal-8-quickstart), modified with instructions from `search_api_solr` concerning Symfony’s event-dispatcher that may not be required in the long run, we’ll do a:

- Composer install
- Basic quick `drush si` of Drupal 8
- Enable the `search_api_solr` module with Drush
- Add the `docker-compose.solr.yaml`
- Add `.ddev/solr/solr_configupdate.sh` to automatically update the Solr config when it changes

```bash
ddev composer create drupal/recommended-project:~8.8.0
ddev composer require symfony/event-dispatcher:\"4.3.4 as 3.4.35\" drupal/search_api_solr ddev config --project-type=drupal8 --docroot=web
ddev composer create drupal/recommended-project:~8.8.0
ddev composer require symfony/event-dispatcher:\"4.3.4 as 3.4.35\" drupal/search_api_solr
ddev config --project-type=drupal8 --docroot=web

#
# Quick-install Drupal's demo_umami profile and enable search_api_solr
ddev exec drush si demo_umami --db-url=mysqli://db:db@db/db --account-name=admin --account-pass=admin
ddev exec drush en -y search_api_solr

#
# Get the docker-compose.solr.yaml
cd .ddev && curl -O https://raw.githubusercontent.com/drud/ddev/master/pkg/servicetest/testdata/TestServices/docker-compose.solr.yaml

#
# Add the solr-configupdate.sh script
mkdir -p solr/conf
cd solr && rm -rf solr-configupdate.sh && curl -O https://raw.githubusercontent.com/drud/ddev/master/pkg/servicetest/testdata/TestServices/solr-configupdate.sh && chmod +x solr-configupdate.sh
ddev restart

```

Now I can go to the Search API configuration at `/admin/config/search/search-api` (`https://d8solr.ddev.site/admin/config/search/search-api` in my case). There I have to take these steps based on the [search_api_solr INSTALL directions:](https://git.drupalcode.org/project/search%5Fapi%5Fsolr/blob/8.x-3.x/INSTALL.md)

1. Click “Add server”
2. The server name is descriptive rather than important here. Call it `ddev_solr`
3. Use the “standard” Solr connector
4. Use the “http” protocol
5. The “solr host” should be **“solr”** NOT the default “localhost”. It’s the name of the “host” running the solr server inside Docker-land, and its hostname is “solr” with the `docker-compose.solr.yaml` we’re using
6. The “solr core” **must be named “dev”** unless you are going to customize the `docker-compose.solr.yaml`
7. Under “Advanced server configuration” set the `solr.install.dir` to `/opt/solr`
8. After you’ve clicked “Save”, download the `config.zip` provided on `/admin/config/search/search-api/server/dev` (or create it using `ddev exec drush solr-gsc ddev_solr /tmp/config.zip`)
9. Unzip the `config.zip` into `.ddev/solr/conf`. For example, `ddev ssh` and then `cd /var/www/html/ddev/solr/conf && unzip ~/Downloads/solr_8.x-config.zip`
10. `ddev restart`
11. It’s now time to create a search index. On `/admin/config/search/search-api` (my `https://d8solr.ddev.site/en/admin/config/search/search-api`), click “Add index”, give a name to the index, and check at least “Content” for indexing. Choose the `ddev_solr` server for the index. After clicking “Save” you can choose to do the indexing immediately. (`ddev exec drush sapi-i` is another way to do this.)
12. At this point, you should be able to access the dev core at `http://<project>.ddev.site:8983/solr/#/\~cores/dev` where you’ll see that numDocs is 36 (or something related to the number of nodes in your project)
13. In addition, `https://<project>.ddev.site/admin/config/search/search-api/server/ddev_solr` should show some of the same information.
14. To re-index, you can use the web UI to “delete all indexed data” and then reindex, or `ddev exec "drush sapi-sc ddev_solr && drush sapi-i"`

## Resources

- DDEV-Local’s [regular Solr documentation](https://ddev.readthedocs.io/en/latest/users/extend/additional-services/#apache-solr) has been updated to match this tutorial. It’s slightly less verbose than this blog post and tries to be a bit less Drupal-oriented.
- DDEV-Local’s suggested [starter docker-compose.solr.yaml](https://github.com/ddev/ddev/blob/master/pkg/servicetest/testdata/TestServices/docker-compose.solr.yaml) configuration file has been updated with more comments and hopefully a predictable usage.
- @mglaman’s [writeup on multiple Solr cores](https://glamanate.com/blog/using-multiple-solr-cores-ddev) explains that subject. It does require a more in-depth understanding of docker-solr.
- [Docker Solr repository](https://github.com/docker-solr/docker-solr), [Docker Hub](https://hub.docker.com/%5F/solr/), [README](https://github.com/docker-solr/docker-solr/blob/master/README.md), [solr_precreate script](https://github.com/docker-solr/docker-solr/blob/master/scripts/solr-precreate)
- For TYPO3 Solr support, an approach using TYPO3’s Solr extension is in [ddev-contrib](https://github.com/ddev/ddev-contrib), [TYPO3-specific Apache Solr Integration for DDEV-Local](https://github.com/ddev/ddev-contrib/tree/master/docker-compose-services/typo3-solr).
