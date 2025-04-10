---
title: "Building an Off-Ramp from WordPress with DDEV"
pubDate: 2025-04-11
summary: DDEV used to develop WordPress content exporter pluginfor use in Grav CMS.
author: Jeremy Gonyea
featureImage:
  src: /img/blog/2025/04/wordpress-offramp.png
  alt: Road exit sign with "Grav CMS" text. Original image by Skyler Smith at Unsplash.com
categories:
  - Community
---

**TL;DR:** _DDEV was a huge force multiplier, enabling me to focus on writing a WordPress plugin to export WordPress content for use in Grav CMS. More information on the plugin can be found at the GitHub repository [wp2grav_exporter](https://github.com/jgonyea/wp2grav_exporter)._

---

Popular content managment systems like WordPress and Drupal store content in databases (MySQL/ PostgreSQL/ etc.). [Grav CMS](https://getgrav.org/) stores content and configuration in local files (Markdown and YAML respectively). Grav's simpler flat-file storage mechanism is one of the things that drew me to start dabbling with it.

## Why consider leaving WordPress?

While the recent shenanigans from Automattic's CEO accelerated my work, it wasn't the primary reason I developed this content exporter. I fell in love with Grav development back in 2018 when I first started writing a [Drupal 7 exporter](https://www.drupal.org/project/grav_export), and I wanted to port something similar over to WordPress. I value data portability, empowering the end user to control where their content is used! In the end, it's about giving options.

## Why DDEV?

[DDEV](https://github.com/ddev/ddev) is a fantastic tool, and it is perfect for my PHP development workflow. It made spinning up two local developlment sites a breeze. I normally relish building and configuring my own automated environments, _but DDEV makes it so simple to configure local environments_. Additionally, DDEV comes with many "quickstart" configurations, meaning that popular CMS's like Drupal and WordPress work out of the box with nearly all settings ready to go.

## Development setup

I made two different directories, one for WordPress and the other for Grav. After running `ddev config` on each respective directory, `ddev start` on each starts serving the content.

I installed [DemoPress](https://wordpress.org/plugins/demopress/) in the WordPress environment to help generate random test content and users to export.

### Xdebug

Step debugging is imperative while trying to inspect content in-flight. Xdebug needed to listen on two different ports to avoid collisions between the two sites, and the [DDEV docs](https://ddev.readthedocs.io/en/stable/users/debugging-profiling/step-debugging/#using-xdebug-on-a-port-other-than-the-default-9003) are informative on how to configure this. I personally use VSCode, but other IDE's should work just as well, too. Step debugging was crucial to finding appropriate data structures and information I needed my converter plugin to use in a Grav site.

## Wp2grav_exporter WordPress plugin

The [wp2grav_exporter](https://github.com/jgonyea/wp2grav_exporter) plugin is the resultant labor of love. It automatically exports:

- Users and assigned roles
- Post Types, including custom types
- Posts and associated custom fields, including ACF fields
- File attachments
- Site metadata

[![Sample render comparing WordPress to Grav](/img/blog/2025/04/sample-wordpress-grav-page-render.png "Sample render comparing WordPress to Grav")](/img/blog/2025/04/sample-wordpress-grav-page-render.png)

Additional screenshots of example content exports can be found at the plugin's GitHub page.

After running the export, content was drag-dropped between my two DDEV directories, and I could immediately test how content looked. The exported post configurations are encompassed in a Grav plugin, so the end user is free to use whatever theme they want!

## Final thoughts

DDEV has saved me countless hours with its easy setup and dependability. If you haven't yet taken it for a test spin, I can't recommend it enough!

---

_Find an issue with my exporter? Submissions are welcome at the project's [issue queue](https://github.com/jgonyea/wp2grav_exporter/issues)!_
