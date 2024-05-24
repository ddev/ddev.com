---
title: "DDEV and Xdebug: Debugging and sorting out problems"
pubDate: 2024-05-28
# modifiedDate: 2024-04-23
summary: How Xdebug works with DDEV, and how to debug problems
author: Randy Fay
featureImage:
  src: /img/blog/2024/05/xdebug_logo.png
  alt: Xdebug logo
  credit: 'Xdebug logo from https://en.m.wikipedia.org/wiki/File:Xdebug_Logo.svg'
categories:
  - Guides
---

PHP developers have long had a variety of complications using Xdebug. It's a network protocol, which means that firewalls and other network complications can confuse things. And often people just don't understand how it works. We'll try to sort out how Xdebug works in general, and explain what that means in DDEV, and how to debug problems.

Here's a recording of our [Xdebug contributor Training](https://www.meetup.com/ddev-events/events/301101460/) walking through DDEV and Xdebug. Please sign up on the [meetup](https://www.meetup.com/ddev-events/) so you'll get notified of future trainings.

<iframe width="560" height="315" src="https://www.youtube.com/embed/4MrwXTaHfnc?si=nwocfW8FjXitbtSa" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

First of all, congratulations for making step-debugging a priority. It's my opinion that step-debugging is one of the very first things to learn in any language or environment that we undertake. 

Second, please [contribute to the Xdebug project](https://xdebug.org/support). Derick Rethans created this incredible resource and has been maintaining it for 22 years and counting. Making open-source projects sustainable is an obligation for all of us!

DDEV's Xdebug [documentation](https://ddev.readthedocs.io/en/stable/users/debugging-profiling/step-debugging/) and [Xdebug troubleshooting section](https://ddev.readthedocs.io/en/stable/users/debugging-profiling/step-debugging/#troubleshooting-xdebug) will normally get everyone going, but we'll approach those from a slightly different perspective.

## Basic Usage

The [simplest DDEV Xdebug usage](https://ddev.readthedocs.io/en/stable/users/debugging-profiling/step-debugging/) is just:

* `ddev xdebug on`
* Make your IDE listen for Xdebug
* Visit a page in your web browser

In general, that's all you have to know. The exact details for PhpStorm and Visual Studio Code are provided in the docs, but this will work with any IDE that can do PHP step debugging, including NetBeans or even Eclipse.

## How Xdebug works

Xdebug is a network protocol. When `php` or `php-fpm` is executed and Xdebug is enabled in it, it will try to contact the IDE specified in the PHP setting `xdebug.client_host`. On DDEV this value is automatically set to `host.docker.internal`, and DDEV tries to make sure that `host.docker.internal` is set appropriately inside the `ddev-webserver` container on all platforms and Docker providers.

If you have `ddev xdebug on` and you execute PHP code, normally by visiting a URL in your project, the `php` process will attempt to contact the IDE using `host.docker.internal` and port 9003. If there are appropriate path mappings in the IDE, and the IDE is listening, everything "just works" from there.

## Demonstrating Xdebug's behavior

You can easily test this out using the handy network utility `nc` or `netcat`. 

On your host workstation (the same place your IDE is running) you can 
```
nc -l 0.0.0.0 9003
```

(note that different versions of `netcat/nc` may take slightly different arguments.)

If you then visit your project, for example with `ddev exec curl localhost` or `curl https://<project>.ddev.site` you'll see something like this pop up in the `nc` session:

```xml
476<?xml version="1.0" encoding="iso-8859-1"?>
<init xmlns="urn:debugger_protocol_v1" xmlns:xdebug="https://xdebug.org/dbgp/xdebug" fileuri="file:///var/www/html/web/index.php" language="PHP" xdebug:language_version="8.2.19" protocol_version="1.0" appid="5089"><engine version="3.2.2"><![CDATA[Xdebug]]></engine><author><![CDATA[Derick Rethans]]></author><url><![CDATA[https://xdebug.org]]></url><copyright><![CDATA[Copyright (c) 2002-2023 by Derick Rethans]]></copyright></init>
```

That's exactly what your IDE seems in the same situation.

## Troubleshooting


### WSL2 Complexities and Troubleshooting


## Contributions welcome!

When you try this out in your own environment, you'll certainly have suggestions to improve it. Please do a PR to this blog adding your techniques. Info and a training session on how to do a PR to anything in ddev.com is at [DDEV Website For Contributors](ddev-website-for-contributors.md).

And join us most Wednesdays for [DDEV Live Contributor Training](contributor-training.md).