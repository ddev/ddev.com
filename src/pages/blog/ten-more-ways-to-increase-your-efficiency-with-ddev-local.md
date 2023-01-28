---
title: "Ten more ways to increase your efficiency with DDEV-Local"
pubDate: 2020-03-25
author: Randy Fay
featuredImage: https://ddev.com/app/uploads/2020/03/secure_cert.png
categories:
  - DevOps
---

Sometimes as the releases go by not everybody ends up noticing new features in [DDEV-Local](https://ddev.com/ddev-local/). People liked it the[ last time](https://ddev.com/ddev-local/eight-more-ways-to-get-the-most-out-of-ddev-local/) we did a “remember these simple new features” article, so here comes another one:

1. **Built-in docs**: Never forget you can just type `ddev` (which shows all available commands) and `ddev help <command>`. Those are generally faster than searching the docs any time.
2. **`ddev launch`** is pretty nifty. It works on most platforms, and opens a web browser to the current project. You can also add a URI, like `ddev launch /admin/reports/status/php`
3. **`ddev snapshot`** does a very fast save of your database. I like to use it with a name, for example `ddev snapshot --name=before_phase2_upgrade` so that I can remember what in the world it was about (and use `ddev restore-snapshot before_phase2_upgrade` to restore it). Otherwise it just gets a date/timestamp ([docs](https://ddev.readthedocs.io/en/stable/users/cli-usage/#snapshotting-and-restoring-a-database)).
4. **`ddev mysql`** launches the mysql client in the db container and lets you interact with it, so you can do anything you might usually do with mysql. And you don’t need to have the mysql client installed on your local machine. I mostly use the interactive mode, but also with `ddev mysql -uroot -proot` to use root privileges, or `echo "SHOW TABLES;" | ddev mysql`
5. **`ddev share`** is a wonderful way to show off your work to a collaborator or client. You just need[ ngrok](https://ngrok.com/) (even without a login, even without a paid account) and you can [look at your project together](https://ddev.com/ddev-local/sharing-a-ddev-local-project-with-other-collaborators/) with somebody else anywhere in the world.
6. **HTTPS**: Are you getting the most out of DDEV-Local’s HTTPS support? It was the most popular feature of 2019 in our[ recent survey](https://ddev.com/ddev-local/vote-for-your-favorite-new-ddev-local-development-environment-features/) about favorite features. Run `ddev poweroff && mkcert -install` and you’ll have trusted local https URLs in most browsers (and the HTTP urls still work fine too).
7. **NFS**: If you’re on macOS or Windows and not yet using NFS to mount files into the container, you’ll find it provides better performance by quite a bit, and also provides more consistent server-like behavior than Docker mounts do on macOS or Windows. See the [docs](https://ddev.readthedocs.io/en/stable/users/performance/).
8. **Custom Commands** are amazingly easy to create. Does your team have a workflow that isn’t built into DDEV-Local? Add a [custom command ](https://ddev.readthedocs.io/en/stable/users/extend/custom-commands/)– it’s just a simple shell script. The [ddev-contrib](https://github.com/drud/ddev-contrib) repository has a number of [custom command examples](https://github.com/drud/ddev-contrib#custom-command-examples) as well.
9. **Updating**: Are you updating DDEV-Local the easy way? Homebrew for macOS and Linux and Chocolatey for Windows make it pretty painless. `ddev poweroff && brew upgrade ddev`, `ddev poweroff && choco upgrade -y ddev` Recommended! ([docs](https://ddev.readthedocs.io/en/stable/#installation)) (Note that we also maintain the ddev-bin AUR repository for ArchLinux/Manjaro users).
10. **FAQ**: Have you glanced at the[ FAQ](https://ddev.readthedocs.io/en/stable/users/faq/) lately? We’d love to hear about new things you would like to see there or anywhere in our docs, just hit us up on[ any of our support channels](https://ddev.readthedocs.io/en/stable/#support).

Take a look at my own[ favorite commands](https://ddev.readthedocs.io/en/stable/users/cli-usage/#favorite-commands) and see if you’re using them all. Is there anything we should add there? [Give us a shout on Twitter!](http://twitter.com/drud)
