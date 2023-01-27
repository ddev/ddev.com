---
title: "DDEV: An alternative to MAMP for a PHP dev environment"
pubDate: 2018-07-03
author: Elli Ludwigson
featuredImage: https://ddevdotcom.ddev.site/app/uploads/2018/07/Fils_électriques.jpg
categories:
  - DDEV
---

You need a local web server to build and maintain a website. Simple. The old standby is MAMP, so called because it gives you the full Apache MySQL PHP “AMP” stack you need to get to work … on “My” machine: My Apache, MySQL, PHP. It’s free and no-frills (the paid version gives you a couple of frills), but now you want something faster, simpler, better— we made that for you! It’s called [DDEV-Local](https://ddev.com/get-started/) and it’s a free, fully featured, robust, cross-platform, cutting edge yet no-hassle, open source MAMP alternative.

To help you evaluate what’s best for you, this second post in our [series on local development environments](https://ddev.com/ddev-local/docker-containers-vs-vms-for-quick-consistent-local-dev/) will walk through using MAMP or DDEV when:

* [Planning your project](#workflow)
* [Getting started with installation and configuration](#installation)
* [Development and daily work](#development)
* [Testing and troubleshooting](#testing)
* [Sharing and collaboration](#collaboration)
* [Deployment and project switching](#deployment)

## Comparing the tools

MAMP is a workstation based local server environment comprised of open source components and released mostly under a GNU license for both Mac and Windows operating systems. After installing the free version of the software, you will have one Apache or NGINX server, one MySQL server, phpMyAdmin, and two versions of PHP to choose from. MAMP Pro is the paid version of MAMP with more features to allow you to work on projects in parallel with different versions of PHP, a local mailserver to test PHP scripts, and a way to manage virtual hosts.

![MAMP preferences and web start page](https://ddev.com/app/uploads/2018/07/Screen-Shot-2018-06-19-at-11.17.49-PM-1024x532.png)

DDEV-Local is a Docker-based local development environment written in Go and licensed under the Apache 2.0 open source license, entirely free to use, modify, and pass on to others. DDEV is available for Mac, Windows, and Linux machines. A couple simple install steps get you [four Docker containers](https://ddev.readthedocs.io/en/latest/developers/building-contributing/#docker-container-development) which contain everything the basic MAMP install gives you for an open source PHP development environment, and then some. Like MAMP Pro, DDEV allows you to run multiple versions of PHP so you can work on widely disparate projects simultaneously, plus it includes a mailserver and administration and testing tools.

## Flowing with your work or getting caught in a logjam?

**Your goals:** Allot time accurately for your tasks from environment setup to troubleshooting to QA and deployment so you can hit all your goals and milestones on schedule.

### With MAMP

Unpredictable tooling will up end your day with unplanned work when you’re moving fast in a continuous integration/continuous deployment (CI/CD) workflow. In your first usages of MAMP, you start off with a consistent environment. Configurations become tangled as you add more projects and attempt to match the environments across multiple hosting providers. It can be very time consuming to sort out especially if you don’t know where to look and what to configure.

As [Brandon Williams, a Technical Project Architect, described it](https://ddev.com/ddev-local/how-ddev-ensured-success-for-this-senior-developer/), with MAMP he would be “manually going to the web server and extracting the database. Getting the database in. Trying to connect the settings.php file. And likely a lot of Googling to find out what I did wrong in setting it up.” That’s a lot of time lost to troubleshooting for each project.

### With DDEV

DDEV-Local offers ease of use and simplicity with a quick download and setup script to run your environment in isolated, repeatable containers that you can set up to match your production environment. Using DDEV-Local reduces time wasted on surprises and hiccups. The [initial installation](https://ddev.readthedocs.io/en/latest/), configuration, and start-up takes just minutes if you already meet the system requirements. More importantly, your daily tasks are predictable and projects [easily reconfigurable](https://ddev.readthedocs.io/en/latest/users/extend/customization-extendibility/#changing-php-version).

With DDEV, updates are as easy as a one-line Unix-y command or a package installer on Windows. You don’t need to worry about downloading and connecting each component manually or making sure the correct copy is being used (`which php`, amirite?).

## Getting started or getting delayed?

**Your goals:** Spin up a new or existing project in minutes so you can get to work.

### With MAMP

In the free version, MAMP offers you a simple server stack, with few frills. Download the package and run the installer. If all you need to do is spin up a quick sandbox site here and there for testing, MAMP can be a viable solution. But as [we heard from Joe Shindelar](https://ddev.com/ddev-local/rapid-local-development-ddev/), setting up MAMP (especially for existing projects) can be a process of 20 or more steps to install, import an existing database, and configure everything to suit. Any additional tools you need will have to be installed directly on your operating system.

Your mileage may vary on initial installation time for MAMP depending on the amount of troubleshooting you have to do. It’s worth it to test out your setup with a simple site in the MAMP htdocs directory to start with, just to see if the server is working. If not, you may need to adjust the ports used from MAMP’s defaults to port 80\. If you just updated MAMP, also update your mysql password in MAMP/bin/phpMyAdmin/config.inc.php. If things fail, you may wind up pushing off the start by hours or days, frustrating everyone from yourself to colleagues and clients.

### With DDEV

With DDEV-Local, you can start a basic Drupal, TYPO3 CMS, Backdrop or WordPress site in [four steps](https://ddev.com/get-started/) and a couple of minutes depending on whether you’re installing via Composer and your dependencies. There’s a lot less room for error and troubleshooting in four steps compared to 20\. There is a GUI (graphical user interface) in [the roadmap for DDEV-Local](https://github.com/drud/ddev/wiki/roadmap). In the meantime, we think we’ve already got your back when it comes to getting started quickly and easily.

To install DDEV-Local, [download the app](https://ddev.com/get-started/) and `cd` into the docroot for your project in the command line, ie `cd ~/sites/my-drupal8-site`. If you don’t have a project already, check out our [quickstart guides](https://ddev.readthedocs.io/en/latest/users/cli-usage/#quickstart-guides) to roll on something new. Then run `ddev config` and you’ll be prompted in plain English for a couple of inputs about your project. When you run `ddev start` DDEV will start up your environment and output the URL for your local project, like so: `<http://my-drupal8-site.ddev.local>`

![Command line installing DDEV](https://ddev.com/app/uploads/2018/07/Screen-Shot-2018-06-19-at-11.15.53-PM.png)

Knowing where the brakes are is important too: just run `ddev stop` to spin down your environment and come back to it later or `ddev remove` to remove the containers without losing your configuration or database.

## Workin’ hard or workin’ on config?

**Your goals:** Spend more time writing code, making fixes, adding new functionality and iterating on your product.

### With MAMP

A simple MAMP development environment can be sufficient for creating and reviewing patches for a single project. But it’s also in that you’re working at a basic level: the web server is just the web server, no virtual machine or container in between. This also means that fine-tuning your configuration can be more work, especially because you will have to repeat all the configuration steps each time you need to change the PHP version or take your project to another machine. For more robust local web development, it takes a bit more configuring to get the versions matching what is on your live server and to add all your desired tooling.

To get all the configuration info about your current MAMP project environment you will need to visit the start page in a browser via a link in the application. There you will find phpMyAdmin, SQLite Manager and phpLiteAdmin. Some of the extra tooling available in the basic MAMP package includes NGINX, a flock of Apache modules and common PHP extensions. While it’s possible to add and use other versions of PHP with the free version of MAMP, it is a headache to find the version you need, download it, drop the binary in the right directory, and point MAMP to it.

You might want to make your MAMP URLs more accessible by modifying the hosts file, after which you will also need to edit your httpd.conf file for MAMP to recognize the httpd-vhosts.conf file. Then open that file and update or add VirtualHost tags for each site you’d like MAMP to host locally. Then restart the MAMP servers to use your new configuration.

The paid version, MAMP Pro, on the other hand, gives you the ability to manage multiple hosts in a GUI with some configurable settings like PHP version, MySQL root password, PostFix to use the local mail server and send emails via PHP, and document root specification for each project.

### With DDEV

To get all the configuration information about your current DDEV project, just run `ddev describe` in the command line. The output describes your project URLs, database info, PHP version, plus URLs for MailHog and phpMyAdmin.

![Output on command line from running ddev describe](https://ddev.com/app/uploads/2018/07/Screen-Shot-2018-06-19-at-11.08.20-PM.png)

DDEV manages the hosts file for you, making your local project URLs easier to access than manually configuring virtual hosts in MAMP or paying for MAMP Pro.

If you need to [specify a PHP version in DDEV-Local](https://ddev.readthedocs.io/en/latest/users/extend/customization-extendibility/#changing-php-version), just visit the .ddev/config.yaml file in your project directory where php\_version can be set. You can also add configuration specifications for NGINIX, MySQL, services, environment variables and more by adding the appropriate files to the .ddev directory for your project.

[Mike Anello talked about switching to DDEV](https://ddev.com/ddev-local/choosing-an-ideal-web-development-environment/) from MAMP Pro in his guest post on our blog: “In the past, MAMP Pro has been my go-to environment. It provided me with a relatively easy way to get most of what I needed: the ability to create virtual hosts and the ability to change between several versions of PHP. ” DDEV-Local gave him comparable features, while being easier, faster, and more portable.

## Running tests, or running into trouble?

**Your goals:** Make sure your project is ready to ship and that everything will work when you deploy to your live environment.

### With MAMP

If you’re using MAMP, you will have to install and configure a tool like PHPMailer or MailHog to test PHP scripts. If you want to test PHP scripts easily with MAMP, you can upgrade to the Pro version which comes with Postfix to test sending emails.

If everything goes haywire and you need to start over, you can remove the entire MAMP application (worst case), but anytime you remove a project you’ll also need to manually remove your database and dig through files to remove or change configurations. If you do remove MAMP entirely you’ll also need to reset and remove any external tooling you might have added or pointed to in your PATH variable … and then set it all up again when you reinstall MAMP.

### With DDEV

If you need a local environment that just works, for free, DDEV-Local includes tools like [MailHog for email capture and review](https://ddev.readthedocs.io/en/latest/users/developer-tools/#email-capture-and-review), as well as Composer, Drush, WP-CLI, MySQL Client, and phpMyAdmin. You may also want to [enable xdebug](https://ddev.readthedocs.io/en/latest/users/step-debugging/), which is included in every DDEV project and works with your preferred IDE so you can step through your code to troubleshoot and test. Check out a [walkthrough of debugging with DDEV and PHPStorm here](https://vimeo.com/268685753).

With DDEV-Local it’s a simple `ddev remove --remove-data` command to remove the project environment, including containers and the associated database. `ddev remove` will non-destructively remove the containers, leaving the database. Both options will leave the configuration files for DDEV intact in your project directory. If you need extra help, you can reach the DRUD team and the very active DDEV community [on a variety of channels](https://ddev.readthedocs.io/en/latest/#support).

## Collaborating or creating problems?

**Your goals:** Easily work with your teammates and remote colleagues on projects, whether it’s a small code fix, long-term overhaul, or something brand new.

### With MAMP

Finally you’ve configured MAMP for your primary project, but now you have more projects, each of which lives on a very different hosting solution. How do you manage it all? With MAMP, you can [manually configure an entry](https://www.taniarascia.com/setting-up-virtual-hosts/) for every site you’d like to set up as a virtual host. This is a bit easier after initial configuration but requires a ServerName and DocumentRoot to be defined for each project in httpd-vhosts.conf. That gives you access to each project without needing to open MAMP preferences and change the document root every time, but still no control over specifics like the PHP version for each.

If you purchase MAMP Pro, you gain multiple host configurations, PHP, phpMyAdmin, cURL and OpenSSL updates and switching in the GUI. Regardless, MAMP is only available for macOS and Windows, so all your Linux-based developers will be on a completely different local development solution and unable to closely match your project environment. That’s a real problem for collaboration.

It can take hours to get two people set up with matching local environments, losing time to debugging and exploring a vast answer space. [We talked with Danita Bowman](https://ddev.com/ddev-local/saving-time-and-making-money-with-ddev/) who moved away from MAMP in favor of DDEV. “There were a couple of instances back in those days where I’d be working on the site, push it up to GitHub, my colleague would pull it back down, and it was totally different.”

### With DDEV

With DDEV-Local on the other hand, everyone on your team can install the same tools and share project files quickly and easily. The brilliant part is that you can ship the entire project with the DDEV-Local configuration to a colleague and they can spin up the exact same environment in seconds. DDEV significantly reduces the answer space when debugging because the environment is contained and controlled with straightforward configuration files. This also makes DDEV an ideal tool for open source contribution because contributors can get on board and start working immediately during sprints.

No need to think about configuration details in order to get your shared project up and running locally. When you run `ddev start` you’re already inside your project with local URLs provided to you in the command line. For more local environments, just run `ddev config` and `ddev start` in each project. To import existing files for a project that you’ve pulled from your live site, [follow a couple quick steps](https://ddev.readthedocs.io/en/latest/users/cli-usage/#importing-assets-for-an-existing-project) using `ddev import-db` and `ddev import-files`. If you’re looking for a mac OS alternative for MAMP, you should consider DDEV if you need a tool that works on other platforms too.

## Deployment or delays?

**Your goals:** Confidently deploy your project early and often.

### With MAMP

It’s all about parity with your production environment. If you can get your configurations set in the free version of MAMP and manually update everything when new component versions come out, or if you pay for MAMP Pro, you have a fair chance of making your local development environment very similar to the live environment. Barring that, be prepared to hear (or say) “but it works on my machine!”

If you’re just looking to import or export the most recent version of your database to your local environment, you will either need to open up phpMyAdmin or run mySQL commands manually.

### With DDEV

DDEV gives you the ability to rapidly switch between projects with no rejiggering of settings or crossing of your fingers. When you want to [import the most recent database](https://ddev.readthedocs.io/en/latest/users/cli-usage/#database-imports) from your live project into your local, just run `ddev import-db`. No need to open up phpMyAdmin or adjust configuration.

You might be wondering how all this containerization fits with your Git workflow. DDEV-Local works smoothly with Git because it only adds one directory and a config file, which you can add to your .gitignore and go about your business. When you’re ready to deploy, just follow your usual workflow to build, commit and push your code, config and database to live.

> “This is the container advantage. Spin up, test, explore, and BREAK. Because you’re using containers you’re not going to break whatever else you’re working on. It’s not like MAMP, where you tweak your PHP.ini and all of the sudden nothing else works.” – Rick Manelius, Chief Product Officer at DRUD

### In conclusion

Which tool is right for you? That depends on your budget and project scope.

* If you have a single project you maintain independently with little need for testing, either MAMP or DDEV would be right for you. DDEV gives you scope to grow.
* If you need more fine-tuned environment configurations for multiple projects, MAMP Pro or DDEV will fit your needs.
* If you need to be able to collaborate quickly and accurately with team members or contributors and speed your dev-to-deploy workflow on multiple hosts, DDEV is right for you.

Once you’re working on multiple projects and collaborating with multiple people your needs change, and the benefits of a Docker-based solution are more valuable.

MAMP has been around a while. It’s familiar, it’s comfortable, it’s your old pair of jeans you don’t want to give up even though there are more holes than denim. DDEV-Local is a free alternative to MAMP. It’s easy to set up, configure and use so you don’t need to worry about the details. If you’re ready to run a robust, containerized local development environment, DDEV is worth trying today.

[Try DDEV now!](https://ddev.com/get-started/)

---

Photo by WikiProfPC on [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Fils%5F%C3%A9lectriques.JPG)
