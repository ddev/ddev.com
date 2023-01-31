---
title: "Moving CMS sites around (server-to-server, server-to-local, local-to-server)"
pubDate: 2020-12-08
author: Randy Fay
featureImage:
  src: https://ddev.com/app/uploads/2020/12/juggler-2329843_1280-e1607477143481.jpg
  alt:
  caption: Mass juggling image
  credit: "[Sarah Richter](https://pixabay.com/users/sarahrichterart-1546275/?utm%5Fsource=link-attribution&utm%5Fmedium=referral&utm%5Fcampaign=image&utm%5Fcontent=2329843) via [Pixabay](https://pixabay.com/)."
categories:
  - Guides
  - DevOps
---

Any web developer will have to move a site from one place to another periodically, so mastering the concepts and the details are important. The details are a little different from CMS to CMS, but the big picture stays mostly the same. Please note that many people have many opinions about all of this, and some people will disapprove of what I say, but it’s intended to teach you the basic process, not the exact procedure. It also will necessarily be incomplete, since there’s no way to cover every platform or CMS, or every permutation of deployment.

1. **Move the code for the website**. If the site is just an HTML/JS site, you’re done. (Typically the code is checked via Git or some other source management situation, so it can be checked out in the new location.)
2. **Move the database**, which has dynamic content in it. In many cases this is just one database, but in complex situations it could be more than one database.
3. **Move the user-generated or dynamic files**. On Drupal, for example, the sites/default/files directory typically has all these user-generated or dynamic files. (There may be more than one directory of user-generated/dynamic files. In Drupal there may be private files in a directory outside the docroot.)
4. **Move the exported configuration**. In Drupal 8+, for example, the config_sync_directory has this explicit exported configuration.
5. **Build the site in the new location**. Although older sites didn’t have a build process for deployment, almost all the newer ones do. At the very minimum, this is typically a `composer install` to populate the vendor directory, which is often not checked into code. But there may be far more sophisticated requirements to the build, like an `npm install` or a `compass compile`. The basic idea is that your site may have a deployment build process which will have to be replicated in the new location.
6. **Configure database settings files**. Normally the database credentials on one server will not be the same as on the other, so you’ll need to update the database settings as your CMS or platform requires.
7. **Transform URLs if necessary**. Some CMSs like WordPress, Magento, and Shopware, have a tendency to bury multiple references to the site URL inside the database, so a transformation has to take place after all this is done. We wish they wouldn’t do this of course, but we have to live in the world we live in. Read about [how to transform URLs](https://ddev.com/ddev-local/sharing-a-ddev-local-project-with-other-collaborators/). You’ll need to understand how to manage this in your particular CMS, as each does it differently. (Note that in Drupal, TYPO3, and Backdrop at least, incorporating a full self-referencing URL inside dynamic content is at least a party foul, probably worse, and it ruins standard deployments.)

### Simplest deployment: Drupal through Drupal 7 – code, database, user-generated files, no build process

Up through Drupal 7, all you had to do to move a site in many cases was to check out the code, load the database from a database dump, and get the files into sites/default/files where they belong. In those days (and still on WordPress) that’s mostly what you have to do. Here is the process:

**On the source server** (can be [DDEV-Local](https://ddev.readthedocs.io/en/stable/) or anywhere else):

1. Dump the database. If the source project is in DDEV-Local, this means just doing an `ddev export-db --file=/path/to/sitename.db.sql.gz` If you’re on a server or elsewhere, and assuming a single database, you can `mysqldump <databasename> | gzip >/path/to/sitename.db.sql.gz`
2. Tar up the user-generated files: `cd <docroot>/sites/default/files && tar -czf /path/to/sitename_files.tar.gz .`
3. Make sure your code has been checked in and pushed properly.

**On the target server** (which can be DDEV-Local or anything else):

1. Check out or update the code from your Git repository or wherever it’s stored.
2. Copy your database dump to the server and load it into the database server using a tool like `mysql`, for example `gzip -dc sitename.db.sql.gz | mysql <databasename>` (or on DDEV-Local `ddev import-db --src=/path/to/sitename_db.sql.gz`)
3. Copy your user-generated files tarball to the target server and untar it in the correct directory: `cd <docroot>/sites/default/files && tar -zxf /path/to/sitename_files.tar.gz`. (Or on DDEV-Local `ddev import-files --src=/path/to/sitename_files.tar.gz`)
4. Edit your `settings.php` or `settings.local.php` (preferred) to point to the database you’ve loaded.

### Drupal 8+ deployment: code, database, files, config, site build

Drupal 8+ is Drupal 7 with some extras, including copying the exported configuration and doing a `composer install`

**On the source server:**

1. Do the steps you would have done for Drupal 7
2. Determine what build processes are required for the site. compass? npm install?
3. Export your configuration, for example, `drush cex`. The result will show you where the config was exported to. (This step is only necessary if configuration changes are to be migrated to the target server.)

**On the target server:**

1. Do the steps you would have done in Drupal 7
2. `composer install` (or `ddev composer install` if the target is a DDEV-Local project.)
3. If there are other build steps discovered for the site, like an `npm install` or `compass`, add those processes.
4. Copy the exported configuration to the target server if necessary and put it in the configuration directory specified in your settings.php or settings.local.php (preferred). Then `drush cim` to import it. Best practices include checking to make sure config hasn’t been changed in the database on the target server.

### TYPO3 deployment (based on TYPO3 v10)

TYPO3 is mostly the same as Drupal 7 plus a composer build, but there are often (generated) files on the local system that need to be checked into Git.

**On the source server** (can be DDEV-Local or anywhere else):

1. Dump the database. If the source project is in DDEV-Local, this means just doing an `ddev export-db --file=/path/to/sitename.db.sql.gz` If you’re on a server or elsewhere, and assuming a single database, you can `mysqldump <databasename> | gzip >/path/to/sitename.db.sql.gz`
2. Tar up the user-generated files: `cd public/fileadmin && tar -czf /path/to/<sitename>_fileadmin.tar.gz .` (Note that the user-generated files must _not_ be checked into Git.)
3. Verify that the `/config` and (optionally) `/var/labels` directories are checked into your Git repository. These are directories which may have been created by sitebuilder actions, but they’re _code_. (Nothing else in /var should be checked in.)
4. Make sure your code has been checked in and pushed properly.

**On the target server** (which can be DDEV-Local or anything else):

1. Check out or update the code from your Git repository or wherever it’s stored.
2. Run `composer install` (on DDEV-Local, `ddev composer install`). If there are other build activities like a `yarn install`, do those.
3. Copy your database dump to the target server and load it into the database server using a tool like MySQL, for example `gzip -dc sitename.db.sql.gz | mysql <databasename>` (or on DDEV-Local, `ddev import-db --src=/path/to/sitename_db.sql.gz`)
4. Copy your user-generated files tarball to the target server and untar it in the correct directory: `cd sites/default/files && tar -zxf /path/to/sitename_files.tar.gz`. (Or on DDEV-Local, `ddev import-files --src=/path/to/sitename_files.tar.gz`.)
5. Edit your `public/typo3conf/LocalConfiguration.php` or `public/typo3conf/AdditionalConfiguration.php` (or `.env` file, preferred) to point to the database you’ve loaded. If the target is DDEV-Local, it will already take care of this for you.

### From DDEV-Live to DDEV-Local

If your site is hosted on [DDEV-Live](http://ddev.com/ddev-live), there’s a nice `ddev pull` command to get it once the connection is established. See the [docs for a quickstart](https://ddev.readthedocs.io/en/stable/users/providers/DDEV-Live/).

### From DDEV-Local to DDEV-Live

DDEV-Local does not (yet) have a “push” command, although it will in future releases. It hasn’t been included to date because it’s a dangerous operation – you could overwrite your production with an old database or something else that doesn’t belong there. In general “pushing” a database to production is never done, except perhaps that one first time. After that other techniques are called for.

1. Make sure you know your site name and org, and do the `ddev-live auth` if it hasn’t already been done. ([docs](https://docs.ddev.com/authentication/))
2. If you are creating the site for the first time, create the site and import db and files, see [Drupal docs](https://docs.ddev.com/drupal-guide/) or [TYPO3 docs](https://docs.ddev.com/typo3-guide/). In either case, you’ll want your site configured to automatically do the `composer install` build step.
3. Push files with `cd <docroot>/sites/default/files && ddev-live push files <sitename> .`
4. Dump the database from DDEV-Local with `ddev export-db --file=/path/to/<projectname>_db.sql.gz` and then push it to DDEV-Live with `ddev-live push db <projectname> /path/to/<projectname>_db.sql.gz`

### From DDEV-Local to Pantheon

If you’re deploying to [Pantheon.io](http://pantheon.io) you can use the web interface to upload the database and files under “Database / Files” → “Import”. Just use `ddev export-db --file=/path/to/<site>_db.sql.gz` for the database and `cd <docroot>/sites/default/files && tar -czf /path/to/<sitename>_files.tar.gz .` to create a files tarball and upload them. Advanced users can also use the “terminus” tool, which is bundled in the web container and already authenticated if you’ve done a `ddev auth pantheon` with [our integration](https://ddev.readthedocs.io/en/stable/users/providers/pantheon/). So `ddev ssh` and use terminus to upload.

### Complexities and Alternatives

There is no standard for deployment or moving sites, and nothing will replace your team’s knowledge of the site and the build process.

- Some teams prefer to do the build on a build machine (or in CI, or on a dev machine) and check in or push the resulting artifacts. For example, some teams will do a `composer install` and then check in the vendor directory and related artifacts.

### Resources:

- [OSTraining](https://www.ostraining.com/) has a free YouTube class on [Moving a Drupal 8+ Site](https://www.youtube.com/playlist?list=PLtaXuX0nEZk-ow4oT3yqxmjk4IRHz4jHl). Highly recommended.
- Many, many agency deployment strategies are home-grown and require custom scripts to push things back and forth. There are examples of scripts like this in [ddev-contrib](https://github.com/drud/ddev-contrib), see [Dump and deploy SQL from/to remote servers](https://github.com/drud/ddev-contrib/blob/master/custom-commands/dump-and-deploy-db) and [Fetch Production DB from remote server](https://github.com/drud/ddev-contrib/blob/master/custom-commands/fetchproductiondb).

