---
title: "Backing Up DDEV Projects"
pubDate: 2024-08-10
#modifiedDate: 2024-04-20
summary: Backing Up DDEV Projects
author: Randy Fay
featureImage:
  src: /img/blog/2024/08/elephant-walking-backwards.png
  alt: Elephant walking backwards, 'backing up'
  credit: 'ChatGPT: An elephant walking backward, with a sign saying "backing up"'
categories:
  - DevOps
---

People sometimes ask how they should back up local DDEV projects. We can do it easily, as most projects are just files in your project directory. Databases have just a bit more work to do.

PHP web projects typically consist of three or four components:

- One or more databases
- The PHP code
- User-generated and other non-code transient files (images, etc.)
- Configuration

We need a backup strategy for each of these.

**Choose a trusted local backup solution.** Time Machine on macOS can work wonderfully for many people, and there are lots of other solutions out there. However, databases have not traditionally been good with backups because they are often not consistent during the backup process, so we need to do something different with them.

**But try not to rely on the local computer anyway.** I try to push code and config to my Git provider (GitHub, GitLab, etc.) and make sure I know how to recreate any user-generated files. Make sure your database contents are accessible from upstream sources like production, or keep good snapshots or exports.

**Databases** need an extra step for safety. In general, avoid working on a database that cannot be recreated by code (with migrations, for example). However, most of us want to have a database quickly available as a good place to start from. Since databases are typically in a binary format that can't reliably be backed up, we need a good way to make a copy. DDEV has two great ways to turn databases into files, `ddev snapshot` and `ddev export-db`.

- **[`ddev snapshot`](https://docs.ddev.com/en/stable/users/usage/cli/#snapshotting-and-restoring-a-database)**, optionally with a `name` argument, takes a binary copy of all of your databases (most projects have just one) and saves it into the `.ddev/db_snapshots` directory as a gzipped binary file. You can snapshot all your registered projects with `ddev snapshot -a`.

- **[`ddev export-db`](https://docs.ddev.com/en/stable/users/usage/commands/#export-db)** exports a text-based dump of a single database to a named file. For example, `ddev export-db --file=.tarballs/db.sql.gz`. A text-based file can be imported into databases of related types, and not just its source type. For example, a MariaDB 10.11 database dump in this format can typically be imported into a MySQL 8.0 database.

- **Automating database backups**: Some people like to use a pre-stop hook to do a database backup, so that a database dump happens every time they do `ddev stop` or `ddev poweroff`. For example:

```yaml
hooks:
  pre-stop:
    - exec-host: "ddev snapshot"
```

If you prefer a text-based database backup, you could do this:

```yaml
hooks:
  pre-stop:
    - exec-host: 'mkdir -p .tarballs && ddev export-db --file=.tarballs/db.$(date +"%Y%m%d%H%M%S").sql.gz'
```

**PHP Code and Configuration** are text files that should be under control of your Git environment. The easy answer for those is to always keep them pushed up to your Git provider. Work on a branch and commit to it regularly, so you could start afresh on any computer any time. This is a wonderful thing about source control!

**User-generated and non-code images, etc.**: In general, these should come from upstream hosting environments. Although it is possible to push them upstream, it's usually a bad idea, as this could overwrite a production environment. So normally, if you lose these, you would just pull them again from wherever they come from.

**What are your techniques?** Do you agree or disagree? I'd love to have a [PR with your suggestions](https://github.com/ddev/ddev.com) or stop by and chat about your preferences in the [DDEV Discord](/s/discord).
