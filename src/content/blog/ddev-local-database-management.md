---
title: "DDEV Database Management"
pubDate: 2020-04-03
modifiedDate: 2020-12-07
summary: A detailed look at using DDEV to work with databases.
author: Randy Fay
featureImage:
  src: /img/blog/2020/04/d8composer-phpmyadmin.png
  alt: Tightly-cropped screenshot of phpMyAdmin running on a `.ddev.site` domain in a browser window
  shadow: true
categories:
  - DevOps
---

[DDEV](http://github.com/ddev/ddev) provides lots and lots of flexibility for you in managing your databases between your local development, staging and production environments. Most people know about `ddev import-db` and `ddev export-db` but those tools now have more flexibility and there are plenty of other adaptable ways to work with your databases.

Remember, you can run `ddev [command] --help` for more info on many of the topics below.

**Many database backends**: You can use a vast array of different database types, including MariaDB from 5.5 through 10.4 and MySQL from 5.5 through 8.0 ([docs](https://ddev.readthedocs.io/en/stable/users/extend/database%5Ftypes/#database-server-types)). Note that if you want to _change_ database type, especially to downgrade, you need to export your database and then `ddev delete` the project (to kill off the existing database), make the change to a new db type, start again, and import.

**Default database**: DDEV creates a default database named “db” and default permissions for the “db” user with password “db”, and it’s on the (inside Docker) hostname “db”.

**Extra databases**: In [DDEV v1.13+](https://github.com/ddev/ddev/releases) you can easily create and populate other databases as well. For example, `ddev import-db --target-db=backend --src=backend.sql.gz` will create the database named “backend” with permissions for that same “db” user and import from the backend.sql.gz dumpfile.

**Exporting extra databases**: You can export in the same way: `ddev export-db -f mysite.sql.gz` will export your default database (“db”). `ddev export-db --target-db=backend -f backend-export.sql.gz` will dump the database named “backend”.

**Database snapshots**: With _snapshots_ you can easily save the entire status of all of your databases. It’s great for when you’re working incrementally on migrations or updates and want to save state so you can start right back where you were.

I like to name my snapshots so I can find them later, so `ddev snapshot --name=two-dbs` would make a snapshot named “two-dbs” in the `.ddev/db_snapshots` directory. It includes the entire state of the db server, so in the case of our two databases above, both databases and the system level “mysql” database will all be snapshotted. Then if you want to delete everything with `ddev delete -O` (omitting the snapshot since we have one already), and then `ddev start` again, we can `ddev restore-snapshot two-dbs` and we’ll be right back where we were.

**`ddev mysql`**: `ddev mysql` gives you direct access to the MySQL client in the db container. I like to use it for lots of things because I like the command line. I might just `ddev mysql` and give an interactive command like `DROP DATABASE backend;`. Or `SHOW TABLES;`. You can also do things like `` echo "SHOW TABLES;" | ddev mysql or `ddev mysql -uroot -proot` `` to get root privileges.

**MySQL client in containers**: Both the web and db containers have the `mysql` client all set up and configured, so you can just `ddev ssh` or `ddev ssh -s db` and then use `mysql` however you choose to.

**`mysqldump`**: The web and db containers also have `mysqldump` so you can use it any way you want inside there. I like to `ddev ssh` (into the web container) and then `mkdir /var/www/html/.tarballs` and `mysqldump db >/var/www/html/.tarballs/db.sql` or `mysqldump db | gzip >/var/www/html/.tarballs/db.sql.gz` (Because `/var/www/html` is mounted into the container from your project root, the `.tarballs` folder will also show up in the root of the project on the host.)

**Other database explorers**: There are lots of alternatives for GUI database explorers:

- macOS users love `ddev sequelpro`, which launches the free Sequelpro database browser. However, it’s gotten little love in recent years, so DDEV now supports TablePlus and SequelAce if they’re installed. `ddev tableplus` and `ddev sequelace`.
- `ddev describe` tells you the URL for the built-in phpMyAdmin database browser (Hint: It’s `http://<yourproject>.ddev.site:8036`).
- PhpStorm (and all JetBrains tools) have a nice database browser:
  - Choose a static `host_db_port` for your project. For example `host_db_port: 59002` (each project’s db port has to be different). (`ddev start` to make it take effect)
  - Use the “database” tool to create a source from “localhost”, with type “mysql” and the port you chose, credentials username: db and password: db
  - Explore away!
- There’s a sample custom command that will run the free [mysqlworkbench](https://dev.mysql.com/downloads/workbench/) GUI database explorer on macOS, Windows or Linux. You just have to:
  - `cp .ddev/commands/host/mysqlworkbench.example .ddev/commands/host/mysqlworkbench && chmod +x .ddev/commands/host/mysqlworkbench`
  - and then `ddev mysqlworkbench`

What are your favorite DDEV database tweaks, hacks, approaches, strategies? We’d love to hear about them [on Twitter](https://twitter.com/ddev) ([tag #ddev](https://twitter.com/hashtag/ddev?src=hashtag%5Fclick)) or any of our [support channels](https://ddev.readthedocs.io/en/stable/#support). Join the conversation!
