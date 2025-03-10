---
title: "DDEV and Xdebug: Debugging and sorting out problems"
pubDate: 2024-05-28
# modifiedDate: 2024-04-23
summary: How Xdebug works with DDEV, and how to debug problems
author: Randy Fay
featureImage:
  src: /img/blog/2024/05/xdebug_logo.png
  alt: Xdebug logo
  credit: "Xdebug logo from https://en.m.wikipedia.org/wiki/File:Xdebug_Logo.svg"
categories:
  - Training
  - Videos
  - Guides
---

PHP developers have long had a variety of complications using Xdebug. It's a network protocol, which means that firewalls and other network complications can confuse things. And often people just don't understand how it works. We'll try to sort out how Xdebug works in general, and explain what that means in DDEV, and how to debug problems.

Here's a recording of our **Xdebug contributor Training** walking through DDEV and Xdebug.

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/4MrwXTaHfnc?si=nwocfW8FjXitbtSa" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

First of all, congratulations for making step-debugging a priority. It's my opinion that step-debugging is one of the very first things to learn in any language or environment that we undertake.

Second, please [contribute to the Xdebug project](https://xdebug.org/support). Derick Rethans created this incredible resource and has been maintaining it for 22 years and counting. Making open-source projects sustainable is an obligation for all of us!

DDEV's Xdebug [documentation](https://ddev.readthedocs.io/en/stable/users/debugging-profiling/step-debugging/) and [Xdebug troubleshooting section](https://ddev.readthedocs.io/en/stable/users/debugging-profiling/step-debugging/#troubleshooting-xdebug) will normally get everyone going, but we'll approach those from a slightly different perspective.

## Basic Usage

The [simplest DDEV Xdebug usage](https://ddev.readthedocs.io/en/stable/users/debugging-profiling/step-debugging/) is just:

- `ddev xdebug on`
- Make your IDE listen for Xdebug
- Visit a page in your web browser

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

That's exactly what your IDE receives from PHP in the same situation.

## Troubleshooting

There is an extensive set of [troubleshooting instructions](https://ddev.readthedocs.io/en/stable/users/debugging-profiling/step-debugging/#troubleshooting-xdebug) in the DDEV docs, but remember that for most people there are most-common reasons for trouble:

1. Your website is not executing the code where you have the breakpoint set, so it doesn't stop at your breakpoint. (Avoid this one by telling your IDE to stop at the first line no matter what, or by settings a breakpoint at the first line of your `index.php`.)
2. You do not have your IDE set up to map your code to the code in the container successfully. Your `index.php` path on the workstation host should map to the path inside the container (often something like `/var/www/html/web/index.php`)
3. You forgot to `ddev xdebug enable` or forgot to have your IDE listen for Xdebug.

You may have problems beyond those in some environments, and they are often firewall-related. They can be sorted out by temporarily disabling your firewall and testing simple connectivity from the DDEV web container to the IDE. For example, make your IDE listen, then `ddev ssh` and `telnet host.docker.internal 9003`. If you get a connection there, and then _do not_ get a connection when you tell your IDE to stop listening, you likely have all the networking problems sorted out.

### WSL2 Complexities and Troubleshooting

WSL2 is a complex networking environment, and it's made more complex by the fact that most developers run their IDE on the Windows side, while running DDEV in WSL2. That means that DDEV has to figure out how to set `host.docker.internal` to the right IP address for your Windows IDE. DDEV tries hard and usually succeeds!

As a result of the complexity, there's an additional set of [WSL2 Xdebug debugging instructions](https://ddev.readthedocs.io/en/stable/users/debugging-profiling/step-debugging/#wsl2-xdebug-troubleshooting) in the docs.

Remember that if you're one of the very unusual people who runs the Linux version your IDE inside WSL2, you'll be using `ddev config global --xdebug-ide-location=wsl2`. This is quite unusual.

On any platform you can use `DDEV_DEBUG=true ddev start` and it will explain to you where `host.docker.internal` comes from with an explanation like this: `host.docker.internal='172.22.192.1' because IsWSL2 and !IsDockerDesktop; received from ip -4 route show default`. This can be especially helpful on WSL2.

## Contributions welcome!

We always love to hear your experiences with DDEV, so please do a PR to this blog adding your experience. Info and a training session on how to do a PR to anything in ddev.com is at [DDEV Website For Contributors](ddev-website-for-contributors.md). And if you can improve the DDEV docs, click the pencil at the top of any docs page to add your suggestion.

Past trainings are recorded at [contributor training](contributor-training.md).
