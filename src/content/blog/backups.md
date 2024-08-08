---
title: "Backing Up DDEV Projects"
pubDate: 2024-08-10
#modifiedDate: 2024-04-20
summary: Backing Up DDEV Projects
author: Randy Fay
#featureImage:
#  src: /img/blog/2024/03/2024-ddev.png
#  alt: 2024 DDEV Plans
#  credit: 'Ideogram.ai: the words "2024" and "DDEV" next to each other'
categories:
  - DevOps
---

TODO: 
* add links to all the commands
* Add links to other resources like "files in .ddev"
* featureImage

People sometimes ask how they should back up local DDEV projects.

PHP web projects typically consist of three or four components:
* One or more databases
* the PHP code
* User-generated and other non-code transient files (images, etc)
* Configuration

We need a strategy for each of these. 

First, do have a trusted local backup solution. Time Machine on macOS can work wonderfully for many people, and there are lots of other solutions out there. However, databases have not traditionally been good with backups because they are often not consistent during the backup process, so we need to do something different with them.

Second, try not to rely on your local computer. Push code and config to your Git provider (GitHub, GitLab, etc.) and make sure you know how to recreate user-generated files. Make sure your database contents are accessible from upstream sources like production, or keep good snapshots or exports. 

**Databases** need an extra step for safety. In general, don't do work on a database that cannot be recreated by code (vy migrations, for example). But most of us want to have a database quickly available as a good place to start from. DDEV has two great ways to turn databases into files, `ddev snapshot` and `ddev export-db`. 

* `ddev snapshot`, optionally with a `name` argument, takes a binary copy of all of your databases (most projects have just one) and saves it into the `.ddev/db_snapshots` directory as a gzipped binary file. You can snapshot all your registered projects with `ddev snapshot -a`.

* `ddev export-db` exports a text-based dump of a single database to a named file. For example, `ddev export-db --file=.tarballs/db.sql.gz`. A text-based file can be imported into databases of related types, and not just 

* ddev snapshot, pre-stop exec-host hook?
* export -db
* stored as docker volumes

**PHP Code and Configuration** are text files that should be under control of your Git environment. The easy answer for those is to always keep them pushed up to your Git provider. Work on a branch and a new commit up to your branch regularly, so you could start afresh on any computer any time. This is a wonderful thing about source control!

**User-generated and non-code images, etc.**: In general, these should be coming from upstream hosting environments. Although it is possible to push them upstream, it's usually a bad idea, as it could overwrite a production environment. So normally if you lost these, you would just pull them again from wherever they come from.

First, where possible, don't keep important things on your local machine. 
