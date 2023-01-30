---
title: "DDEV-Local, D6LTS, PHP 7.2, and Drupal 6 projects"
pubDate: 2019-03-28
author: Randy Fay
featuredImage: https://ddev.com/app/uploads/2019/03/Status_report___Hobobiker_com__Randy_and_Nancy_s_Big_Bike_Trip.png
categories:
  - Guides
---

Much of what we do here on the DDEV team is in support of the modern projects users want to create, whether that means building out our highly flexible, customizable, Kubernetes-based hosting platform or our robust local development environment. Our goal is to support our users in as much of your work as we can, and that also means supporting many older projects.

Although the [Drupal](http://drupal.org) project officially discontinued all forms of support for Drupal 6 (D6) in February 2016 (six months after the release of Drupal 8), a couple of vendors signed up to continue support for D6 and they’ve done an absolutely stupendous job, exceeding everyone’s expectations. The original idea was that they’d deal with security fixes only, mostly backporting issues found in current Drupal versions. But they also supported and made public quite a number of key modules.

And then the big deal: PHP 5.6 went End-Of-Life at the end of December, 2018, meaning no more support for \*it\*. _And_ PHP 5.6 was the highest version of PHP that D6 could run on. Amazingly though, one of the D6LTS maintainers, [myDropWizard](https://www.mydropwizard.com/drupal-6-lts), came out with versions of D6 and many modules that are compatible with PHP 7.2\. It’s a game-changer that nobody expected, and was \*not\* a part of the original plan.

Here’s what I’ve done to upgrade the Drupal 6 projects that I still maintain:

1. Check out the project.
2. Download the latest d6lts/drupal \[release\] (<https://github.com/d6lts/drupal/releases>) or add it to your project with Git.
3. Overwrite your D6 core with the downloaded version.
4. `ddev config --php-version=7.2`
5. `mkdir .ddev/php and add file there called mbstring.ini` (it can be called anything ending in `.ini`) with these contents:  
    ```
    mbstring.func_overload=0
    mbstring.encoding_translation=0
    mbstring.http_input=pass
    mbstring.http_output=pass
    ```
6. `ddev start`
7. Load your database and begin testing.
8. You’ll likely want to download key modules from <https://github.com/d6lts> (use the “Find a repository” search box. But cck, panels, views are all there. I was able to find everything I needed for my smallish sites.

If you’re successful with your site (likely!) then you will have a D6 site that’s supported at least until February 2020 by myDropWizard and the D6lts project, and PHP 7.2 is supported through November, 2020.

[DDEV](https://github.com/drud/ddev) makes maintaining sites easy, just as in this case. You can have multiple CMSs, multiple PHP versions, and even both Apache and Nginx, all running at the same time on different sites, with basically no configuration. I found updating and testing these D6 sites to be a breeze.

And of course, if I had known that D6 support would last this long and be of such high quality, it would have made a very significant difference in some decisions I made in 2015 and some things would have been much easier. Thanks to those D6LTS vendors for taking on the challenge and sticking with it, and especially to MyDropWizard for taking the challenge to an even higher level.

[Download DDEV-Local](https://ddev.readthedocs.io/en/stable/)
