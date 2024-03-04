---
title: "DDEV for Laravel Teams"
pubDate: 2020-09-24
summary: Sergey Fayngold on Laravel teams working with DDEV.
author: Sergey Fayngold
featureImage:
  src: /img/blog/2020/09/ddev-laravel.png
  alt: Illustration of intertwined DDEV and Laravel logos
categories:
  - DevOps
  - Guides
---

In terms of local development environments (LDE), Laravel does have a lot of options. We have Homestead, Valet, Laradock, etc (In general, any PHP LDE can be tweaked to support [Laravel](https://laravel.com/)). They all do the job in their scopes. Now it’s also possible to work on Laravel with [DDEV](https://ddev.com/ddev-local/), an open source, Docker-based LDE. So why consider one more option?

> “Everyone should use the tools that push their productivity the most” — This is an important point for many developers and teams. And a lot of different tools are available; users have lots of choice.

When you do set up an LDE individually, in most cases you want something that does the job with the least amount of effort to install and maintain it. As a Laravel developer, the first choice might be [Laravel Valet](https://laravel.com/docs/valet) (on Mac) or [Homestead](https://laravel.com/docs/homestead), which are official Laravel tools and are mentioned in the [Laravel documentation](https://laravel.com/docs).

But when teams come together, a debate occurs about “what/how to use local development for the particular project/s.” At this point, worlds collide. Everyone is used to their own toolchain, might have a different OS, each project might have special requirements. All of this could become a “Holy War of Local Development Environments” inside the team or lead to everyone using the tools they are familiar with.

For a long time I have had the opinion that there is no need for big holy wars (debate yes, but not wars) about which tools are better. And, people should not be forced into using certain hardware, OS, IDE, etc. If a team member is productive in VS Code, for example, why force this person to use PhpStorm?

But in terms of LDE, if a team comes together and some team members use Valet on Mac, others prefer Laradock on Linux instead, and the Windows users go with Homestead, you could end up having to learn all of them to help solve problems with other team members’ preferred tool in the context of the project. Especially if the project has additional requirements like FQDN for SSO, custom Nginx configuration, etc.

Even if everything does run smoothly for a long time, you can end up with the “it works on my machine” situation. Team member A pulls the changes and everything breaks because team member B updated their local PHP version and some Composer dependencies require a certain PHP version. That leaves a lot of room for error, lack of safety in the process, and conflict on the team.

### How does DDEV solve the problem?

As hinted above, I was dealing with a lot of different “tools of choice” across my team to help customize them to fit our projects’ requirements. We had team members who used Laradock, others (including myself) were using Valet, and some even used plain Nginx with custom configs provided by other team members. Sometimes it was hard to help everyone solve problems specific to their tool (some I described earlier).

Meanwhile, I was searching for one solution which would help to unify the experience by providing all the features they need, but still be very easy to switch to (regardless of hardware and OS) and of course easy for new team members to get up and running. And at some point I found [DDEV](https://github.com/ddev/ddev) and set myself the final goal:

> Cloning the project should be (almost) enough for getting up and running regardless of the skills of the team member.

[DDEV](https://ddev.readthedocs.io/en/stable/) combines a lot of the benefits of the other Laravel LDEs into one solution. In the context of a team, DDEV can bring additional benefits. It’s easy to learn for the members who set it up and customize it. And it’s super easy to use for the rest of the team to run multiple projects on any OS.

After initial setup and configuration of the project, you can commit the DDEV configuration in your project repository. The next team member only need clone the repository and run `ddev start`, `ddev composer install` and `ddev exec artisan` (to run migrations, etc) inside of the project (or you can define a custom command that will replace them). Every team member can override parts of the config (like enabling NFS support or Xdebug) without committing it. The time between cloning and starting work on the code is reduced to almost nothing.

In the end, the switch to DDEV did save a lot of time on the team (I have not heard about any LDE problems, since we switched 😀 ). That’s also the reason why I decided to [“officially” add Laravel to DDEV](https://ddev.readthedocs.io/en/stable/users/quickstart/#laravel) as a contribution to the open source project.

## Additional tips for Laravel + DDEV

### 1\. Add a dedicated DB connection for DDEV

Normally, you can define the values of all the `DB_*` environment variables to use DDEV’s DB container (it will even be proposed by DDEV when you start your project). But you can define a DDEV DB connection in your config/database.php to make it even easier. Here is an example:

```php
<?php

return [
    // ...
    'connections' => [
        // ...
        'ddev' => [
            'driver' => 'mysql',
            'host' => 'db',
            'port' => 3306,
            'database' => 'db',
            'username' => 'db',
            'password' => 'db',
            'unix_socket' => '',
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'strict' => true,
            'engine' => null,
        ],
    // ...
];
```

Alternatively you can (and probably should) change the DB\_\* values in the .env.example, to bring the number of changes the end user needs to do to 0.

### 2\. Add the artisan command to DDEV

Normally to execute artisan commands inside the DDEV web container you would need to use `ddev exec php artisan …`. But to make it easier for yourself and your team, you could add the following content to the `.ddev/commands/web/artisan` file:

```bash
#!/bin/bash

## #ddev-generated
## Description: Run artisan inside the web container
## Usage: artisan [flags] [args]
## Example: "ddev artisan list" or "ddev artisan cache:clear"

php artisan $@
```

This way you can now run `ddev artisan …`. It’s trifling, but pleasant.

### 3. Share It!

Many of us work on more than one project. Some projects could require similar customizations (DDEV commands, nginx customization, etc). To simplify project updates, you can:

1. Place these files in a composer package
2. Require it in all your projects
3. Commit to all projects a command that will update this package and copy the DDEV config parts to the project’s `.ddev` directory.

### 4\. Provide an example for config overrides

In Laravel we are used to having an `.env.example`. You should do the same for your colleagues in the `.ddev` file. You can commit the `.ddev/config.local.yaml.example` with some frequently used overrides. This should make it easier for everyone to override the obvious things. Here’s the contents of my `config.local.yaml.example`:

```yaml
# router_http_port: <port>  # Port to be used for http (if something else is running on default port "80")
router_http_port: "8008"

# router_https_port: <port> # Port for https (if something else is running on default port "443")
router_https_port: "4430"

# xdebug_enabled: false  # Set to true to enable xdebug and "ddev start" or "ddev restart"
# Note that for most people the commands
# "ddev exec enable_xdebug" and "ddev exec disable_xdebug" work better,
# as leaving xdebug enabled all the time is a big performance hit.
xdebug_enabled: false

# nfs_mount_enabled: false
# Great performance improvement but requires host configuration first.
# See https://ddev.readthedocs.io/en/stable/users/performance/#using-nfs-to-mount-the-project-into-the-container
nfs_mount_enabled: false
```

## Conclusion

Today, as Laravel developers, we have a lot of solutions to make our workflow more efficient and enjoyable. Now with DDEV we get one tool that helps us to push our productivity and ensures comfort by committing configuration that runs the same local development environment on every team members’ machine. Get started with your own Laravel project and DDEV using the [quickstart guide](https://ddev.readthedocs.io/en/stable/users/quickstart/#laravel)!
