---
title: "DDEV-Local v1.8.0: Trusted SSL, `stop` commands, plus a hosting team hackathon"
pubDate: 2019-05-16
author: Randy Fay
featuredImage: https://ddev.com/app/uploads/2019/05/EKL_20190418_0240.jpg
categories:
  - Announcements
---

We’ve just released [DDEV-Local v1.8.0](https://github.com/drud/ddev/releases/tag/v1.8.0)! This release includes trusted SSL, refreshed `ddev stop` behavior, and updated `ddev exec` functionality. [Install or upgrade now](https://github.com/drud/ddev/releases). Below are a couple of highlights, or you can read the [full release notes here](https://github.com/drud/ddev/releases/tag/v1.8.0).

- **Browsers and host OSs now trust ddev sites over https**: After a one-time action to run `mkcert -install`, you can visit the https link to your project without needing to click past the security warning. [Extra details for Linux users here](https://ddev.readthedocs.io/en/latest/#linux-mkcert-install-additional-instructions). [More info in the install instructions here](https://ddev.readthedocs.io/en/latest/#installation).
- **Dynamic container updates**: If you need extra Debian packages in your web or db container (or need to make more sophisticated adjustments) you no longer have to wait for them, or install them every time you start a project. You can add [webimage_extra_packages](https://ddev.readthedocs.io/en/latest/users/extend/customizing-images/#adding-extra-debian-packages-with-webimage%5Fextra%5Fpackages-and-dbimage%5Fextra%5Fpackages) to your config.yaml or [build a free-form Dockerfile](https://ddev.readthedocs.io/en/latest/users/extend/customizing-images/#adding-extra-dockerfiles-for-webimage-and-dbimage) (Dockerfile.example is provided in your .ddev folder).
- **Updates to `ddev stop`**: `ddev stop` now does what `ddev remove` used to do. It removes the containers and saves resources on your host. `ddev remove` is still available as an alias of `ddev stop`. New! `ddev pause` takes the place of the former `ddev stop` using “docker stop” on the project containers. Because of the way ddev works (storing everything outside the container) it’s cleaner to get rid of a container and recreate it when starting a project.
- **ddev exec and exec hooks now interpret commands using bash**: This means you can have a hook like `sudo apt-get update && sudo apt-get install -y [some-package]` without putting `bash -c` in front of it. And you can `ddev exec sudo apt-get update && sudo apt-get upgrade -y [some-package]` as well, no `bash -c` required.
- **ddev exec can now work with interactive situations**: So for example, you can run `ddev exec mysql` and interact with the mysql program directly.

## Important notes:

- The base nginx configuration has changed. If you are overriding configuration with an nginx-site.conf file, you’ll want to re-do it (much easier now!). In addition, small pieces of nginx configuration can now be added in the .ddev/nginx directory. See the [docs](https://ddev.readthedocs.io/en/latest/users/extend/customization-extendibility/#providing-custom-nginx-configuration) for more information.
- config.yaml exec hooks are now executed with bash context by default. If you have exec hooks that have `bash -c` in them, please remove that, as they can’t be interpreted correctly by the new execution mechanism. If using custom nginx configuration update your nginx config as well.
- If you or your team used to use `ddev stop` instead of `ddev remove`, the new behavior of “stop” may seem different, but it hopefully won’t affect most people. However, if you have an add-on docker-compose.\*.yaml service that has volatile storage, you may want to change it to save its database on a volume, as `ddev stop` now completely brings down the containers, and if they had volatile content, it will be gone.
- If you use drush in exec hooks, and the action you take requires confirmation, please change the exec hook to use `drush --yes`. Formerly, –yes was implied by exec hooks and `ddev exec`, but it isn’t any more.

[Read the full release notes & installation info](https://github.com/drud/ddev/releases/tag/v1.8.0)

## Contributing to DDEV-Local

Thank you very much to all the DDEV community members who helped out with this release!

- [@damienmckenna](https://github.com/damienmckenna), [@wizonesolutions](https://github.com/wizonesolutions), and [@mglaman](https://github.com/mglaman) among others worked to significantly improve the [Apache Solr docs](https://ddev.readthedocs.io/en/latest/users/extend/additional-services/#apache-solr) and example docker-compose.solr.yaml, and added a docker volume so the solr database would be nonvolatile after ddev stop.
- [@AronNovak](https://github.com/AronNovak) created the PR to have the ddev-webserver nginx configuration not intercept 40x errors.
- [@yanniboi](https://github.com/yanniboi) and [@isholgueras](https://github.com/isholgueras) were kind enough to catch and PR docs errors.
- [@dacostafilipe](https://github.com/dacostafilipe) introduced a PR adding pgsql libraries
- @jonaseverle and [@hebbet](https://github.com/hebbet) helped test the release
- And the amazing [mkcert](https://github.com/FiloSottile/mkcert) from [@FiloSottile](https://github.com/FiloSottile) made the seemingly impossible task of trusted local development certificates possible.

[DDEV is an open source project](https://github.com/drud/ddev/blob/master/CONTRIBUTING.md) and we very much appreciate the time our contributors give creating issues, surfacing bugs, requesting features, supporting other users in [Slack](https://ddev.readthedocs.io/en/stable/#support) and [Twitter](https://twitter.com/hashtag/ddev) and for your support of DDEV!

## DDEV-Live Hosting Updates

We recently gathered our hosting team for a week of time together pushing ahead on development. Not only did we progress on existing tasks and clarify the roadmap for everyone, but we had time to really connect and make decisions in face-to-face conversations. Being able to have those discussions in person meant that we could review options, considerations, and come to an agreement three to five times faster than when working remotely.

Some technical highlights we had a lot of movement on were global user management, the details of how the UI, CLI and platform interact, building Kubernetes controllers for various functions, and planning ahead so that we can stay in sync and balanced while continuing to work remotely.

We’ve also been doing more work as pairs to encourage frequent conversation, questioning, and combining our individual knowledge and ideas earlier in the process. It’s the varied backgrounds and perspectives of everyone on the DDEV team that really create strength when combined, so we’re eager to give everyone’s ideas a chance to surface naturally and frequently. We’re very grateful that it was possible for us to bring everyone together and look forward to the next group gathering!

![Boulder Startup Week DevTools panel](https://ddev.com/app/uploads/2019/05/IMG_0160-300x245.jpg)

## DDEV Events

This week we visited [Boulder Startup Week and talked about DevTools](https://boulderstartupweek2019.sched.com/event/NNY7/so-you-want-to-launch-a-devtool)! Our CTO Kevin Bridges (center in the above photo) spoke on a sold-out panel with other builders and leaders about the ins and outs of building, managing, and implementing a dev tool. Thank you very much to the other panelists and organizers, it was a great conversation!

Our friend Mike Anello’s DDEV book was recently featured on a “[Top 11 PHP books of 2019](https://bookauthority.org/books/new-php-books)” list! The next session of Mike’s online DrupalEasy course, [Professional Local Development with DDEV](https://www.drupaleasy.com/ddev), is Wednesday, June 12th.

Photo courtesy [Elli Ludwigson](https://ddev.com/author/elli/)
