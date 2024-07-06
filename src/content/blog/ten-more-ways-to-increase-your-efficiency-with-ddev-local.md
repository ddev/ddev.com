---
title: "Ten more ways to increase your efficiency with DDEV"
pubDate: 2020-03-25
modifiedDate: 2024-07-06
summary: DDEV usage and feature highlight.
author: Randy Fay
featureImage:
  src: /img/blog/2020/03/secure-cert.png
  alt: Extreme closeup screenshot of a browser with a `.ddev.site` emphasizing “Connection is secure”
  shadow: true
categories:
  - DevOps
---

Sometimes as the releases go by not everybody ends up noticing new features in DDEV. People liked it the [last time](https://ddev.com/blog/eight-more-ways-to-get-the-most-out-of-ddev-local/) we did a “remember these simple new features” article, so here comes another one:

1. **Built-in docs**: Never forget you can type `ddev` (which shows all available commands) and `ddev help <command>`. Those are generally faster than searching the docs any time.
2. **`ddev launch`** is pretty nifty. It works on most platforms, and opens a web browser to the current project. You can also add a URI, like `ddev launch /admin/reports/status/php`
3. **`ddev snapshot`** does a very fast save of your database. I like to use it with a name, for example `ddev snapshot --name=before_phase2_upgrade` so that I can remember what in the world it was about (and use `ddev restore-snapshot before_phase2_upgrade` to restore it). Otherwise it gets a date/timestamp ([docs](https://ddev.readthedocs.io/en/stable/users/cli-usage/#snapshotting-and-restoring-a-database)).
4. **`ddev mysql`** launches the MySQL client in the db container and lets you interact with it, so you can do anything you might usually do with MySQL. And you don’t need to have the MySQL client installed on your local machine. I mostly use the interactive mode, but also with `ddev mysql -uroot -proot` to use root privileges, or `echo "SHOW TABLES;" | ddev mysql`
5. **`ddev share`** is a wonderful way to show off your work to a collaborator or client. You need [ngrok](https://ngrok.com/) (even without a login, even without a paid account) and you can [look at your project together](https://ddev.com/blog/sharing-a-ddev-local-project-with-other-collaborators/) with somebody else anywhere in the world.
6. **HTTPS**: Are you getting the most out of DDEV’s HTTPS support? It was the most popular feature of 2019 in our recent survey about favorite features. Run `ddev poweroff && mkcert -install` and you’ll have trusted local HTTPS URLs in most browsers (and the HTTP URLs still work fine too).
7. **Custom Commands** are amazingly easy to create. Does your team have a workflow that isn’t built into DDEV? Add a [custom command ](https://ddev.readthedocs.io/en/stable/users/extend/custom-commands/)– it’s a simple shell script. The [ddev-contrib](https://github.com/ddev/ddev-contrib) repository has a number of [custom command examples](https://github.com/ddev/ddev-contrib#custom-command-examples) as well.
8. **Updating**: Are you updating DDEV the easy way? See [upgrade details for every environment](https://ddev.readthedocs.io/en/stable/users/install/ddev-upgrade/).
9. **FAQ**: Have you glanced at the[ FAQ](https://ddev.readthedocs.io/en/stable/users/usage/faq/) lately? We’d love to hear about new things you would like to see there or anywhere in our docs, hit us up on [any of our support channels](https://ddev.readthedocs.io/en/stable/users/support/).

Take a look at my own[ favorite commands](https://ddev.readthedocs.io/en/stable/users/cli-usage/#favorite-commands) and see if you’re using them all. Is there anything we should add there? [Give us a shout on Twitter!](http://twitter.com/randyfay).
