---
title: "Migrating Drupal 7 to Drupal 9 with Acquia Migrate: Accelerate (AM:A)"
pubDate: 2023-11-22
modifiedDate: 2023-11-22
summary: "Tony Groff on Migrating Drupal 7 to Drupal 9 using Acquia Migrate: Accelerate (AM:A) with DDEV."
author: Tony Groff
featureImage:
  src: https://www.drupal.org/files/project-images/ama-live-updates.gif
  alt: Acquia Migrate Accelerate Dashboard
categories:
  - Guides
---


This walkthrough is based on the blog post [Acquia Migrate: Accelerate — now open source!](https://dev.acquia.com/blog/acquia-migrate-accelerate-now-open-source) by [Wim Leers](https://dev.acquia.com/person/employee/wim-leers).

## Overview
Migrating your Drupal 7 site may be easier than you expect with the help of [Acquia Migrate: Accelerate](https://www.drupal.org/project/acquia_migrate) (*AM:A as I'll refer to it from here forward*). 

From the [project page](https://www.drupal.org/project/acquia_migrate) of Acquia Migrate: Accelerate (AM:A) 
> Acquia Migrate: Accelerate aims to capture the Drupal community's expertise for Drupal 7 → 9 migrations in recommendations, makes it easy to generate a Drupal 9 project based on any existing Drupal 7 site and start migrating with a powerful UI (and equivalent CLI):

In brief, [Acquia](https://www.acquia.com/) has open sourced their [Drupal migration solution, Acauia Migrate: Accelerate (AM:A)](https://www.acquia.com/products/drupal-cloud/acquia-migrate-accelerate). The general availability of this tool encapsulates years of refined Drupal migration expertise, marking a significant advancement for the community. By making this advanced migration tool accessible to a broader audience, it strengthens the overall ecosystem, empowers developers, and bolsters Drupal's viability.

My Drupal migration odyssey began a few months ago with no Drupal 8+ knowledge whatsoever. It took me about 100 hours to migrate my slightly complex Drupal 7 website of *(12 custom content types, 200 custom fields, 2,500 images and documents, and a few hundred pages)*, to a 65% functional Drupal 10 site. Comparatively in a single afternoon I was able to get an 80% functional Drupal 9 website with AM:A. I hope this illustrates the power of AM:A. 

[A table below compares the *learn-everything-from-scratch "traditional"* migration from Drupal 7 to Drupal 10, to the same site migration with AM:A to Drupal 9](#comparing-traditional-migration-in-d10-to-amad9).

Drupal 9 is the only tested path at the time of this posting. [Drupal 9 was EoL on November 1st, 2023](https://www.drupal.org/psa-2023-11-01), and [Drupal 7 will be EoL on January 5th, 2025](https://www.drupal.org/psa-2023-06-07). The community can work together to [get AM:A working with Drupal 10](https://www.drupal.org/project/acquia_migrate/issues/3399733). Please contribute if you can help move this forward. 

## Getting Started

Wim's [original walkthrough](https://dev.acquia.com/blog/acquia-migrate-accelerate-now-open-source) expects both the D7 and the new D9 site to be on the same host. I found it simpler to keep everything on a single DDEV instance, rather than create multiple DDEV projects, because this allows `ddev snapshot` to save and restore multiple databases in this project all at once. 

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

Create the DDEV project (*still within the newly created `ddev-ama-project` directory*). 
- For maximum compatibility we are using `php7.4`. You could use `php8.1`, but you will likely encounter errors on your Drupal 7 site. We can always [reconfigure DDEV later](#additional-notes-andtips) to use `php8.1` for the migrated D9 site after our AM:A migration is complete.
- We are adding two hostnames; `d7ama-www` for **Drupal 7**, and `d9ama-www` for **Drupal 9**.

```
ddev config --project-type=drupal7 \
--php-version=7.4 \
--docroot="d7/" \
--additional-hostnames="d7ama-www,d9ama-www"
```

**Next, import the D7 database** to the new project. This operation adds the file `settings.ddev.php` to the `d7/sites/default` local DDEV project with the `db:db@db` credentials, imports the database, and starts the new DDEV project.

```
ddev import-db --file=../drupal7-www-database.sql
```

![ddev ama-project created](/img/blog/2023/11/ddev-ama-blog-1-project-created.png)

Wow! My Drupal 7 site is already working in DDEV! Open the URL and check it out - 
[https://d7ama-www.ddev.site](https://d7ama-www.ddev.site)

### Install and configure the Drupal 9 site to prepare for AM:A

We will use the conveniently included version of [ACLI](https://docs.acquia.com/acquia-cli/) within the DDEV `web` container to generate a new Drupal 9 site (*you can also omit all parameters and be prompted for answers instead if you prefer*). The important consideration, for DDEV, is explicitly using `php8.1` to run this `acli` command. Otherwise, the `acli` command will fail to run on the currently configured version of `php7.4`. 

Run the following command:

```
ddev exec php8.1 /usr/local/bin/acli \
app:new:from:drupal7 \
--drupal7-directory=/var/www/html/d7 \
--directory=/var/www/html/d9
```

![new D9 site has been scaffolded with the help of acli](/img/blog/2023/11/ddev-ama-blog-2-d9-acli-created.png)

The new Drupal 9 site scaffolding has been created with information from *your* Drupal 7 site!

<mark>**Important**</mark> - SSH into the DDEV container to install the D9 site.

```
ddev ssh
```

**The command above logs you into the <mark>`/var/www/html/d7`</mark> directory, you need to change to the <mark>`/var/www/html/d9`</mark> directory** to accomplish the following: 

- Install the D9 site within our single DDEV project. 
- Create the D9 DDEV database named: `dbd9`.
- Configure the D9 `settings.php` with the appropriate database credentials.

```
cd ../d9

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

Initiate the AM:A magic with the following commands <mark>***(remember we are still within the `ssh` session of the DDEV project)***</mark>. *(Note for clarity: we are running the **D9** included version of `vendor/bin/drush` on the **D9** site. Running `drush` otherwise or elsewhere would affect the **D7** site.)*

```
jq -r '.installModules[]' < acli-generated-project-metadata.json | xargs php -d memory_limit=512M vendor/bin/drush pm:install -y
```
*(the above installs all modules whose migration recommendations have been vetted, to ensure those migrations are available out of the box)*
```
vendor/bin/drush state:set --input-format=json acquia_migrate.initial_info - < acli-generated-project-metadata.json
```
*(the above provides all the metadata to the AM:A Drupal module's Module Auditor UI by storing it in Drupal's state )*

### <mark>Log out of the `ddev ssh` session</mark>, and modify the DDEV project to serve a second URL for the d9 site:

```
logout

cp .ddev/nginx_full/seconddocroot.conf.example .ddev/nginx_full/nginx-site2-d9.conf
```

Use the text editor of your choice to edit your newly created `nginx-site2-d9.conf` file.

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

<mark>**Save `nginx-site2-d9.conf` changes and restart DDEV**</mark>. DDEV must be restarted to serve the new D9 docroot. Until it's restarted DDEV will continue to serve the D7 site at all configured project URLs.
```
ddev restart
```

Visit your newly created site AM:A site, and rejoice! 
[https://d9ama-www.ddev.site](https://d9ama-www.ddev.site) *(if you still see the old D7 site at this new D9 URL check your config and spelling to ensure the hostnames are correct)*.

## Acquia Migrate: Accelerate (AM:A) Configuration Page

Proceed with AM:A configuration, after *Step 2*  below you can refresh the browser page to see each item crossed off the list as the requirements are met.

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

4. **Configure your files directory**. Add this below your recently added database information in `d9/docroot/sites/default/settings.php` to match your use case.
```
// The directory specified here must contain the directory specified in the
// "file_public_path" Drupal 7 variable. Usually: "sites/default/files".
$settings['migrate_source_base_path'] = '/var/www/html/d7';

// The directory specified here must contain the directory specified in the
// "file_private_path" Drupal 7 variable. Usually outside the web root.
//$settings['migrate_source_private_file_path'] = '/somewhere/private';
```
*(Refresh your browser, and ~~Configure your files directory~~ should now be checked off with a strikethrough.)*

5. **Create matching files directory.** My specific instance required modifying the files path to a non-default directory, you may not have this requirement.
*(Refresh your browser, and ~~Create matching files directory~~ should now be checked off with a strikethrough.)*

6. **Choose which data to import from your source site.** Click the link to begin your migration journey following the specific AM:A recommendations for your site! 

![Acquia Migrate: Accelerate (AM:A) Choose which data to import from your source site! ](/img/blog/2023/11/ddev-ama-blog-5-ama-check-and-ready.png)

## Your AM:A Journey Begins Now!

Off you go! Best of luck on your migration! [Check out additional notes and tips below](#additional-notes-andtips) for more.

![Your AM:A Journey Begins Now! ](/img/blog/2023/11/ddev-ama-blog-6-ama-dashboard.png)

---

## My personal experience and observations.
AM:A provided an intuitive GUI and actionable guidance for migrating my site from D7 to D9. AM:A arranged the migration procedure by dependencies.

- A common content dependency is *Taxonomy* should be migrated before *any* content if your pages or articles use *Taxonomy Tags*. 

- *Public Files* should also be migrated before *any* content.

You get the idea - the traditional method of migration offered no such assistance, and will allow you to stumble indefinitely until you figure out which migrations are dependant on others. 

Knowledge of migration dependencies may not be a concern for seasoned Drupalers, but for the average [Ambitious Site Builder](https://dri.es/drupal-is-for-ambitious-site-builders) starting from square one, this was a **huge** hurdle which I never fully overcame. Below is a brief overview comparing my migration method results.

### Comparing Traditional migration in D10 to AM:A D9

| D7 Module/Feature | D9 (AM:A) | D10 (Traditional) | Notes |
|-------------------|-----------|-------------------|-------|
| Technical Debt    | yes       | **no**                | *D9 AM:A* offered intelligent actionable messages, and warnings about missing text formats, broken fields, missing files, etc. These messages allowed me to fix the issues on the D7 site before migrating to the new D9 site.<br><br>*D10 traditional* migrated broken fields, missing entity references, missing images, etc. Cryptic messages would still appear for all these issues in my new D10 site  `dblog`. |
| Users           | yes       | yes               | Both methods migrated all 7 users and roles successfully. |
| Basic Page<br><br>Article        | yes <br><br>yes       | yes <br><br>yes               | Both methods migrated all Basic Page and Article content and revisions with no issues. <br><br>*D9 AM:A* included revisions without the option to exclude.<br><br> The *D10 traditional* method allowed for easier revision exclusion.  |
| Blocks           | yes       | yes               | Both methods migrated all block content successfully. |
| Views             | **no**        | yes               | *D9 AM:A* did not migrate any Views.<br><br>*D10 traditional* successfully migrated all Views using the [views_migration](https://www.drupal.org/project/views_migration) module. |
| Webform           | yes       | **partial**           | *D9 AM:A* migrated all Webforms and previous submissions in full.<br><br>*D10 traditional* only migrated the Webforms themselves. I was unable to migrate the previous history of Webform submissions, likely due to my own lack of knowledge. |
| Page Manager /<br>Panels     | **no**        | yes               | *D9 AM:A* did not migrate Page Manager pages or Panels.<br><br>*D10 traditional* method, with a nascent [proof-of-concept module](https://www.drupal.org/project/page_manager_migration), was able to bring over the links and basic structure of all of CTools Page Manager Pages and Panels. Most of the *variant* and *access* logic was missing, but at least the shell of each Page/Panel was available as a basis to reconstruct. |
| Menu Items        | yes       | yes               | *D9 AM:A* included [Migrate Magician](https://www.drupal.org/docs/contributed-modules/migrate-magician).<br><br>*D10 traditional* migration worked equally as well after I discovered [Migrate Magician](https://www.drupal.org/docs/contributed-modules/migrate-magician). |
| Files<br><br>Images             | yes       | yes               | *D9 AM:A* migrated files and images to **Media**.<br><br>*D10 traditional* kept files and images as classic **files/images**. |
| Path Redirect     | yes       | **no**                | *D9 AM:A* migrated all Path Redirects.<br><br>*D10 traditional* handled this poorly, and created hundreds of other redirects I did not recognize or need. |
| URL aliases       | yes       | **no**                | *D9 AM:A* migrated all URL Aliases perfectly, *and* notified me of broken aliases, which I was able to fix in D7 before migrating.<br><br>*D10 traditional* migrated or created only 40 aliases that were not even part of my original D7 site, weird. |
| Text Formats      | yes       | yes               | *D9 AM:A* migrated all Text Formats. Advised me that [Token Filter](https://www.drupal.org/project/token_filter) should be installed, or its usage reevaluated, if it is still needed. It turns out I was no longer using it in any content types, so I removed it.<br><br>*D10 traditional* migrated all of my text formats, but I was unable to get CKEditor 5 working properly. <br><br>Both methods advised me on dangerous issues such as PHP Filter. |
---
### Conclusion - AM:A is worth it for my use case
AM:A is superior to the method I've been referring to as *traditional migration*. The clear drawback of AM:A, as of this writing, is that it only supports migration to D9, a product already at its End of Life. I have yet to attempt upgrading or migrating this AM:A instance from D9 to D10. I'm hopeful that the community will collaborate to [make AM:A compatible with D10](https://www.drupal.org/project/acquia_migrate/issues/3399733).

I’ll be proceeding with the AM:A-migrated version of this site to production as the benefits significantly outweigh the drawbacks. 

### Benefits of AM:A for my use case
- **Technical Debt:** I've cleaned up so much cruft from the decade old D7 database, and I'm happy to see my `dblog` nearly free of errors! 
- **Webform:** forms and previous submissions were flawlessly migrated, which is an important feature for this client on this site.
- **Media system:** I prefer to use the new *Media* system over the old basic *Files* system.
- **URL Aliases and Path Redirects:** What's the point of migrating a site if all of the search engine mojo you've built over the past 10 years is annihilated? This benefit alone encourages me to stick with the AM:A version.
- **Text Formats:** AM:A successfully migrated text formats and properly configured the WYSIWYG editor. In contrast, the traditional migration method resulted in complications that I couldn't fully resolve.

### Drawbacks of AM:A for my use case

The effort required to recreate the Views and Pages is justified despite the drawbacks. This presents a welcome opportunity to reassess and enhance these within the D9/D10 framework.

- **Views not migrated:** I'll have to recreate my Views. [views_migration](https://www.drupal.org/project/views_migration) is D9 compatible and should work, but was not included in the default AM:A installation.
- **Page Manager not migrated:** I'll need to reevaluate and recreate some landing pages with the help of [page_manager_migration](https://www.drupal.org/project/page_manager_migration), or change to more a modern [Layout Builder](https://www.drupal.org/docs/8/core/modules/layout-builder) solution.

### Next Steps: Theming, Views, Page Layout

![Acquia Migrate: Accelerate (AM:A) - 98% complete! ](/img/blog/2023/11/ddev-ama-blog-7-ama-finished.png)

I’m pleased with the 98.92% data migration and have the content necessary to move forward. However, I’m also feeling burned out on this site. As satisfying as the migration results are, the site ultimately requires Drupal 10 before going live. I’m taking a few weeks off to consider the next steps for theming, Views, and page layouts.

I’m torn between investing time in coaxing [AM:A to work with Drupal 10](https://www.drupal.org/project/acquia_migrate/issues/3399733), then making another attempt at the migration as AM:A to D10. Or continuing to migrate the current AM:A D9 site to D10. I plan to update this blog post as needed and encourage others to contribute, correct, and enhance this information - [Support DDEV](https://ddev.com/support-ddev/#file-an-issue-or-pr)!  

---

## Additional information about this site migration, and my personal Drupal experience

*(I first wrote the following essay, which inspired this full blog post. I hope it helps others like me who want to do [Drupal](https://www.drupal.org) again, but may be hesitant.)*

Since 2009, I've been independently developing websites using Drupal for a variety of clients, including non-profits, small businesses, and corporations. My transition to Drupal was prompted by a significant project's failure with another CMS, leading to a successful rebuild in Drupal that salvaged both the project and client relationship. Shortly therafter I experienced the Drupal community live in person at [DrupalCon Chicago](https://chicago2011.drupal.org/), I was hooked on Drupal!

Over the years, life changes have led me to reduce my workload, focusing on essential maintenance and steering clients towards simpler, user-friendly SaaS solutions. Despite this, I've remained connected to the Drupal community, maintaining my [Drupal Association](https://www.drupal.org/association/support) membership and staying updated, primarily through DriesNotes. A mention by   [Dries](https://dri.es/) in 2022 about [Ambitious Site Builders](https://dri.es/drupal-is-for-ambitious-site-builders) resonated with me, reigniting my enthusiasm for Drupal and leading me to delve deeper into the latest developments through articles and podcasts. This rekindled excitement brought back memories of my early days in Drupal development.

I started migrating this Drupal site in June 2023, drawing on my extensive experience with Drupal 6 and 7. Despite my initial reluctance to adapt to Drupal 8 and newer versions, my commitment as the sole web developer for a longstanding client encouraged me to stay open to the evolving landscape of Drupal. Now in my mid-40s, I faced the challenge of relearning and adapting to these updates, balancing my deep familiarity with earlier versions against the need to stay current in a rapidly changing field.

Alright, Drupal, my first CMS love, we've been through thick and thin. It's time to give you another shot. Can a solo developer like me still create impressive modern websites with Drupal? Maybe, starting with straightforward D10 install and a content copy-paste from the old site? Sounds workable, but…what about the complex entity references, taxonomies, and custom Webforms? I considered using Feeds for a csv export - it worked well in the past for D7. But when I tried Feeds export/import with D10, it was a bit of a hassle, hardly better than a simple copy-paste. So, I decided to dive into the world of migration.

I immersed myself in [every resource published](https://udrupal.com/talks) by [Mauricio Dinarte (dinarcon)](https://www.drupal.org/u/dinarcon). After an intense 100-hour learning spree, I managed to migrate about 65% of the Drupal 7 site to Drupal 10, using tools like [migmag](https://www.drupal.org/project/migmag), [migrate_plus](https://www.drupal.org/project/migrate_plus), and [webform_migrate](https://www.drupal.org/project/webform_migrate). It wasn't smooth sailing, though - with several parts not working right, I wondered if starting over on a clean Drupal 10 install would've actually been easier. But with a few months left until the promised delivery date, I decided to hold off and weigh my options, and possibly starting afresh with a different low-code/no-code solution?

Six weeks later, [Acquia Migrate: Accelerate](https://www.drupal.org/project/acquia_migrate) was released, and I thought to myself “*what is this new devilry?*”. Could AM:A be as good as it appeared, or would it be more hours wasted? I decided to give it a single afternoon to prove it’s worth, and it did. 

In a nutshell, AM:A, combined with DDEV, took my Drupal 7 site to an estimated 80% migration completion. Only a few bits and pieces left - Views, Page Manager, and the theme. (*I'm half-tempted to throw in [Drupal Retrofit](https://mglaman.dev/blog/retrofit-running-legacy-drupal-7-code-your-drupal-10-site) and wrap it up in one epic marathon weekend!*). Everything's there: blocks, content, entity references, data fields, even the file system is smoothly transitioned to the new Media system!

Now, I'm down to recreating less than 20 Views, tweaking some page layouts, and fixing a handful of menu links. Thanks to AM:A, I'm set to get this site live in about one-third of the time it would have taken me otherwise. 

Looking back, my Drupal 7 site went from zero to a shaky 65% after a grueling 100 hours of traditional manual migration. But a spur-of-the-moment afternoon with AM:A? That changed everything. The site will be ready well before the delivery deadline. AM:A not only guided me through migration; it provided pre-migration advice, post-migration troubleshooting tips, and organized the content in a way that saved me from a lot of guesswork. Turns out, a little procrastination and the right tool could pay off for anyone looking to upgrade their Drupal 7 site to D9/10. [Acquia Migrate: Accelerate](https://www.drupal.org/project/acquia_migrate) really smoothed out the bumps in the migration road for me.

---
## Additional Notes and Tips

- On Windows Terminal WSL2, the GUI is *much* faster than the CLI of `drush ama:`. The AM:A website GUI took 1 minute to import 1,500 files, the CLI in WSL2 took 9 minutes!
- `ddev snapshot` is your friend, use it as you progress and modify your D7 database. If something goes wrong you can `ddev snapshot restore` to the most recent good snapshot. I saved snapshots about every 20% as the migration progressed such as `ddev snapshot --name ama-project-20-percent`, etc.
- The the DDEV `nginx-site2-d9.conf` NGINX config had to be modified to serve generated images. [NGINX configuration options can interfere with generated thumbnails and image styles for uploaded images](https://www.drupal.org/project/drupal/issues/3120676#comment-15294229).
- `ddev config --php-version=8.1` will change the PHP version of the project at any time if you want to experiment with updating D9 or D10, be aware this change will introduce php errors on your D7 site. 
- Here's a [Gist of Drush scripts for cleaning up various Drupal 7 database issues](https://gist.github.com/RowboTony/acf9ee5afb78b6a29a7a763f56d1fb11) which may be helpful *(as-is, no guarantee or warranty)*.

