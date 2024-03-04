---
title: "Eight (more) ways to get the most out of DDEV"
pubDate: 2018-12-06
modifiedDate: 2020-02-05
summary: A look at some useful and often-overlooked DDEV features.
author: Randy Fay
featureImage:
  src: /img/blog/2018/12/marvin-ronsdorf-196913-unsplash-e1544104467254.jpg
  alt: Top-down photo of the numbered lanes on a running track
  credit: "Photo by Marvin Ronsdorf on [Unsplash](https://unsplash.com/search/photos/eight?utm%5Fsource=unsplash&utm%5Fmedium=referral&utm%5Fcontent=creditCopyText)."
categories:
  - DevOps
---

In this post, I’m going to give you a quick overview of some tips, tricks, and a couple of cool geeky features DDEV users often overlook. From the start, we’ve had a vision of building a dev-to-deploy toolset. We started with DDEV to give you a stable, reliable, universal local development environment. To create a smooth experience, we’ve made some assumptions so you can get started quickly. DDEV also gives power users the flexibility to adapt and change the tools—even on a per-project basis—to suit their needs. So, if you’re brand new to using DDEV, there might be things you’ve missed.

[Download DDEV](https://github.com/ddev/ddev)

### Using a new `ddev` command? Check the help `<command> -h`.

If you’re using new `ddev` command, always make sure to check out the help available. Type `ddev <command> -h`. for example, `ddev describe -h`.

This will bring up help that explains what that command does, how to use it, examples, and any flags available. You might come across things that even work differently than expected.

Take, for example, the database export command, `ddev export -db`. which we highlighted [in a previous blog post on making backups in DDEV](https://ddev.com/ddev-local/save-as-you-go-and-make-backups-in-a-jiffy-with-ddev-local/). In DDEV, we set it up to export a .gzip file, because it seemed efficient for most users. However, if you were expecting it to export the same as a mysqldump command you’d be looking for a text dump.

This is exactly what happened to a DDEV user recently, who exported to a .sql file, and they couldn’t import it because it was a .gzip archive. So if we started with the help files, using:

`ddev export-db -h`

We would see the following output, explaining and showing everything you need to know about it:

```
Dump a database to stdout or to a file.
Usage:
ddev export-db [project] [flags]

Examples:
ddev export-db > ~/tmp/db.sql.gz
ddev export-db –gzip=false > ~/tmp/db.sql
ddev export-db -f ~/tmp/db.sql.gz
ddev export-db –gzip=false myproject > ~/tmp/myproject.sql
ddev export-db someproject > ~/tmp/someproject.sql

Flags:
-f, –file string Provide the path to output the dump
-z, –gzip If provided asset is an archive, provide the path to extract within the archive. (default true)
-h, –help help for export-db
-d, –target-db string If provided, target-db is alternate database to export (default “db”)

Global Flags:
-j, –json-output If true, user-oriented output will be in JSON format.
```

As you can see, you can even use a `--gzip=false` flag to change the output to an .sql file instead of a .gzip file.

Always start by checking the help files as you’re learning DDEV!

### Something everyone should know: `ddev poweroff`

I never tire of reminding DDEV users that the `ddev poweroff` and its neighbor `ddev stop` are your friends. They don’t destroy anything unless you ask them to. This is useful because if you keep a number of Docker containers running and neglect to remove them, you’ll run out of memory for Docker.

Docker can become unpredictable when you near the memory limit. To avoid causing strange behavior in Docker, I like to keep my memory usage low. By default, it’s set to a limit of 2 GB, and you can have several projects running no problem. Once I get close to that limit, I dump everything with `ddev poweroff`, secure in the knowledge that my containers are removed, not eating memory, and my data is intact.

When you run `ddev stop` from the working directory (or `ddev stop <project1> <project2>` DDEV removes the containers, but it does not remove the data. Check out the docs on [removing a project.](https://ddev.readthedocs.io/en/stable/users/cli-usage/#removing-projects-from-ddev-local)

Use the `--all` or `-a` flag to affect all running projects. For example, remove all running projects at once run this command:

`ddev stop -a`

To remove both the containers and the data run this command (Note that you can’t use `--all` or `-a` with this command because it might do too much damage):

`ddev delete` or `ddev delete <project>` or `ddev delete --omit-snapshot` or `ddev stop --remove-data` (Remember that `ddev delete -h` and `ddev stop -h` will give you full prompts on what flags you can use.)

This will help you keep Docker running smoothly.

### What’s your DDEV project up to? Check the logs.

DDEV’s logs feature is useful to show you what your project is up to. It could be useful when you’re [debugging issues with Docker and DDEV](https://ddev.com/ddev-local/debugging-docker-on-windows-mac-and-linux/), too. Check out the docs on [log access](https://ddev.readthedocs.io/en/stable/users/cli-usage/#log-access). Run `ddev logs` command to easily view logs from the web container. To follow the log in real time, use this command from within the project root folder:

`ddev logs -f`

To access full log information of the dbserver container, use the command:

`ddev logs -s db`

### Hey, why am I seeing NGINX headers when I’m using Apache?

This is something newcomers stumble over sometimes. There’s a Stack Overflow question explaining [why you’d see NGINX headers](https://stackoverflow.com/questions/52774173/why-do-i-see-nginx-headers-when-ddev-is-configured-to-use-apache/52780601#52780601), even when you’re running Apache. NGINX runs as a [reverse proxy](https://www.nginx.com/resources/glossary/reverse-proxy-server/), directing requests to the appropriate server, no matter what you’re running in your containers. Even though apache is the web server in your web container, there’s an nginx server in front of it, so you’ll normally see the nginx headers on a request. If you want to access the apache server without the nginx reverse proxy in front of it, both \`ddev start\` and \`ddev describe\` provide a direct URL like \`<http://127.0.0.1>:<port>\` that goes straight to the web container.

If you want to check to be sure, you can type `ddev ssh` and `ps -ef` to see what server is running.

### Changing PHP versions

It’s easy to change the PHP versions on a per-project basis either in the config.yaml file, or by running `ddev config` (for example, when you’re setting up and configuring a project) and setting the PHP version.

`ddev config --php-version 7.4`

Check the docs on how to [change the PHP versions](https://ddev.readthedocs.io/en/stable/users/extend/customization-extendibility/#changing-php-version).

DDEV directly supports versions from 5.6 through 7.4, and you can even go back farther into the past using the [Old PHP recipe in github.com/ddev/ddev-contrib](https://github.com/ddev/ddev-contrib/tree/master/docker-compose-services/old%5Fphp).

### Windows users: make sure to remove inactive hostnames

This is an obscure issue you can run into if you’re working on lots of projects at once on Windows and do not use the default domain (ddev.site). In Windows, there’s a limit of 10 hostnames pointing to one IP address. When you run into that problem, you’ll see that DDEV is working perfectly fine, but your project site won’t load because the next (11th) hostname won’t resolve in the web browser.

It used to be that users had to manually add hostnames to the “etc/hosts” file—and that was a bit of a pain. So in the background, DDEV takes care of this for you. However, it’s so trivial to set up projects in DDEV, each with their own hostname, that you could quickly run into this limit.

The best way to handle this is to periodically clear the out inactive hostnames. To remove inactive hostnames, run this command:

`sudo ddev hostname --remove inactive`

### Export docker-compose files from DDEV

With DDEV you can print the docker-compose configuration of the current project. If you’re into using Docker Compose, being able to export this configuration is a big advantage. You can even run a project with this output.
To do that, redirect `ddev debug compose-config`, for example:
`ddev debug compose-config >/tmp/fullconfig.yaml`

This command outputs the fully preprocessed docker-compose configuration of the current project. You can even run `docker-compose up -f ~/tmp/fullconfig.yaml` in this example to see docker-compose doing everything it does. DDEV users who understand Docker Compose and want to fiddle with those recipes find this really helpful. You can use Docker Compose to do things like [defining additional services](https://ddev.readthedocs.io/en/stable/users/extend/custom-compose-files/). So if you’ve used Docker Compose add-ons, this will include all of those and what actually gets used in your project.

### JSON output for geeks

This is a cool feature fellow geeks will appreciate. You can get JSON output from any command. We use this output from DDEV to feed data to [DDEV-UI](https://github.com/ddev/ddev-ui/releases), our GUI version of DDEV built for those whose working style is better suited to using a friendly graphical user interface.

To get the JSON output on the command line, add this global flag to any command: `-j` or `--json-output`. for example:

`ddev describe -j`

I’ve seen this used in some creative ways. In one case, I saw someone use JSON output to find the port that MySQL was using on the host. For another example, you could grab the HTTP URL and launch it automatically. If you have ideas and you’re playing with DDEV JSON output in your projects, [ping us on Twitter,](https://twitter.com/drud) we’d love to hear your ideas.

### Thanks for your feedback!

Part of building this project is working directly with our users to improve DDEV. A lot of the tips in this post are based on [community discussions](https://ddev.readthedocs.io/en/stable/users/support/) in Slack and on Stack Overflow. When you find something new, we get it into the documentation and the help files as fast as we can. It’s also a very important channel for us to find out how and where we can make improvements.

Coming soon: We’ll be rolling out opt-in data collection and error reporting to help us make DDEV even better even faster. When you opt-in, you’ll be contributing data on how you’re using our open source tool and where you’re hitting issues. This will be a big factor in guiding product decisions. The more people who opt-in, the better the tool will become. Keep an eye out on future releases!

### Want more tips? Follow us on Twitter and subscribe to the newsletter.

When I come across tips and tricks from the community, I usually tweet about them. You can follow me as [@randyfay](https://twitter.com/randyfay) and the main [@drud](https://twitter.com/drud/) account where we tweet product news, tips, and other relevant info regularly. And of course, sign up to the newsletter for product updates and announcements.
