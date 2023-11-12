---
title: "Acquia Migrate: Accelerate (AM:A) with DDEV"
pubDate: 2023-11-09
modifiedDate: 2023-11-09
summary: Tony Groff on Acquia Accelerate Migrate (AM:A) with DDEV.
author: Tony Groff
featureImage:
  src: https://www.drupal.org/files/project-images/ama-live-updates.gif
  alt: Acquia Accelerate Migrate Dashboard
categories:
  - Guides
---


This walkthrough is based on the blog post [Acquia Migrate: Accelerate — now open source!](https://dev.acquia.com/blog/acquia-migrate-accelerate-now-open-source) by [Wim Leers'](https://dev.acquia.com/person/employee/wim-leers).

## Overview and Expectations

Drupal 9 is the only tested path at the time of this posting. The community will have to work together to make AM:A ready for a direct to Drupal 10 migration path. I've [opened an issue on drupal.org](https://www.drupal.org/project/acquia_migrate/issues/3399733) if you'd like to help. I expect this will happen in short order as [Drupal 9 is EoL as of November 1st, 2023](https://www.drupal.org/psa-2023-11-01), and [Drupal 7 will be EoL](https://www.drupal.org/psa-2023-06-07) on January 5th. 

I've performed a *learn-everything-from-scratch* manual migrate from Drupal 7 to Drupal 10, and I've migrated this same site to Drupal 9 with AM:A. My thoughts are below comparing both.

## Getting Started

Wim's [original walkthrough](https://dev.acquia.com/blog/acquia-migrate-accelerate-now-open-source) expects both D7 and the new D9 site to be on the same host. I found it simpler to keep this on a single DDEV instance.

### System Information

My system information is as follows:
- Windows 10 (22H2)
- WSL version: 1.2.5.0
- Ubuntu 22.04.3 LTS
- ddev version 1.22.4
- Docker version 24.0.7

### Creating the DDEV project

Create a new DDEV project directory on your local machine.

```
mkdir ddev-ama-project
```

Move into the `ddev-ama-project` directory and create subdirectories for both the D7 and D9 sites.

```
cd ddev-ama-project
mkdir d7 d9
```

Copy all of your Drupal 7 files to your newly created project's `d7` subdirectory so that your files are organized as:

```
cp -r ~/my-drupal7-source-files/ d7/
...snip...
    /sites/default/settings.php
    files
    modules
    private
    profiles
    scripts
    sites
    themes
...etc...
```

Create the DDEV project (*still within the newly created ddev-ama-project directory*). 
- For maximum compatibility we are using `php7.4`. You may use `php8.1`, but you will likely errors on your Drupal 7 site. We can always reconfigure DDEV later to use `php8.1` after our AM:A migration is complete.
- We are adding two hostnames; `d7ama-www` for **Drupal 7**, and `d9ama-www` for **Drupal 9**.

```
ddev config --project-type=drupal7 \
--php-version=7.4 \
--docroot="d7/" \
--additional-hostnames="d7ama-www,d9ama-www"
```

Import the D7 database to the new project. This operation adds the file `settings.ddev.php` to the d7/sites/default local DDEV project with the `db:db@db` credentials, imports the database, and starts the new DDEV project.

```
ddev import-db --file=../drupal7-www-database.sql
```

![ddev ama-project created](/img/blog/2023/11/ddev-ama-blog-1-project-created.png)

Wow! My Drupal 7 site is already working in DDEV! Open the URL and check it out!
[https://d7ama-www.ddev.site](https://d7ama-www.ddev.site)

### Install and configure the Drupal 9 site in preparation for AM:A

We will use the conveniently included version of ACLI within the DDEV `web` container to generate a new Drupal 9 site (*you can also omit all parameters and be prompted for answers instead if you prefer*). The important consideration, for DDEV, is using `php8.1` to run this `acli` command. Otherwise, the `acli` command will fail to run on the container's version of `php7.4`. 

Run the following command:

```
ddev exec php8.1 /usr/local/bin/acli \
app:new:from:drupal7 \
--drupal7-directory=/var/www/html/d7 \
--directory=/var/www/html/d9
```

![new D9 site has been scaffolded with the help of acli](/img/blog/2023/11/ddev-ama-blog-2-d9-acli-created.png)

The new Drupal 9 site scaffolding has been created with information from your Drupal 7 site!

**Important** - SSH into the DDEV container to installing the D9 site.

```
ddev ssh
```

**The command above logs you into the `/var/www/html/d7` directory, you need to change to the `/var/www/html/d9` directory.** Change directories to the new `d9` installation to accomplish the following: 

- Install the D9 site within our single DDEV project. 
- Create the D9 DDEV database named: `dbd9`.
- Configure the D9 `settings.php` with the appropriate database credentials.

```
vendor/bin/drush site-install \
    --account-name=admin \
    --account-pass=admin \
    --site-name="example.com on D9 thanks to AM:A" \
    --no-interaction \
    --db-url=mysql://root:root@db/dbd9
```

![Drupal 9 site installed and configured ](/img/blog/2023/11/ddev-ama-blog-3-site-install-complete.png)

The new D9 site has been `site-install`ed!


### Install and configure Acquia Migrate: Accelerate (AM:A)

Initiate the AM:A magic with the following commands ***(remember we are still within the `ssh` session of the DDEV project)***:

```
jq -r '.installModules[]' < acli-generated-project-metadata.json | xargs php -d memory_limit=512M vendor/bin/drush pm:install -y
```
*(the above installs all modules whose migration recommendations have been vetted, to ensure those migrations are available out of the box)*
```
vendor/bin/drush state:set --input-format=json acquia_migrate.initial_info - < acli-generated-project-metadata.json
```
*(the above provides all the metadata to the AM:A Drupal module's Module Auditor UI by storing it in Drupal's state )*

### Logout of the `ddev ssh` session, and modify the DDEV project to serve a second URL for the d9 site:

```
logout

cp .ddev/nginx_full/seconddocroot.conf.example .ddev/nginx_full/nginx-site2-d9.conf
```

Use the text editor of your choice to edit your newly created `nginx-site2-d9.conf`` file.

```
vi .ddev/nginx_full/nginx-site2-d9.conf
```

Remove line #3 from the `nginx-site2-d9.conf` file.
```
#ddev-generated
```

Change line #9 of `nginx-site2-d9.conf` to your D9 docroot:
```
root /var/www/html/d9/docroot;
```

Change line #12 of `nginx-site2-d9.conf` to your D9 site URL:
```
server_name d9ama-www.ddev.site;
```

**Save `nginx-site2-d9.conf` changes and restart DDEV**. DDEV must be restarted to serve the new D9 docroot. Until it's restarted, DDEV will continue to serve the D7 site at all configured project URLs.
```
ddev restart
```

Visit your newly created site AM:A site, and rejoice! 
[https://d9ama-www.ddev.site](https://d9ama-www.ddev.site)

## Acquia Migrate: Accelerate (AM:A) Configuration Page

Proceed with AM:A configuration, after Step 2 below you can refresh the browser page to see each item get crossed off the list as the requirements are met.

![Acquia Migrate: Accelerate (AM:A) Ready For Configuration! ](/img/blog/2023/11/ddev-ama-blog-4-ama-is-ready.png)

1. **Essential configuration**: add your **D7** site base URL (`https://d7ama-www.ddev.site`), and create a new Admin username/pass for the **D9** site. Click [Save]. 

2. **Log In.** With the credentials you created in step 1.

3. **Configure your source database.** Using the text editor of your choice, add your **D7** database information to your **D9** `settings.php`.

```
vi d9/docroot/sites/default/settings.php
```

```
$databases['migrate']['default'] = array (
  'database' => 'db',
  'username' => 'db',
  'password' => 'db',
  'prefix' => '',
  'host' => 'db',
  'port' => '',
  'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
  'driver' => 'mysql',
);
```
*(Refresh your browser, and ~~Configure your source database~~ should now be checked off with a strikethrough.)*

4. **Configure your files directory**. Add this below your recently added database information in `settings.php` to match your use case.
```
// The directory specified here must contain the directory specified in the
// "file_public_path" Drupal 7 variable. Usually: "sites/default/files".
$settings['migrate_source_base_path'] = '/var/www/html/d7';

// The directory specified here must contain the directory specified in the
// "file_private_path" Drupal 7 variable. Usually outside the web root.
//$settings['migrate_source_private_file_path'] = '/somewhere/private';
```
*(Refresh your browser, and ~~Configure your files directory~~ should now be checked off with a strikethrough.)*

5. **Create matching files directory.** My specific instance required modifying my files directory to a non-default directory, your’s may now have this requirement.
*(Refresh your browser, and ~~Create matching files directory~~ should now be checked off with a strikethrough.)*

6. **Choose which data to import from your source site.** Click the link to begin your migration journey and following the specific recommendations for your site! 

![Acquia Migrate: Accelerate (AM:A) Choose which data to import from your source site! ](/img/blog/2023/11/ddev-ama-blog-5-ama-check-and-ready.png)

## My personal experience and observations.









