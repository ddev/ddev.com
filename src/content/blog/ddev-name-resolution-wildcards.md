---
title: "DDEV Name Resolution, Wildcards, Working Offline"
pubDate: 2024-03-27
#modifiedDate: 2024-03-03
summary: How hostname name resolution works in a DDEV environment, including how wildcards work
author: Randy Fay
featureImage:
  src: /img/blog/2024/03/2024-ddev.png
  alt: Hostname resolution with DDEV
  credit: 'Ideogram.ai: the words "2024" and "DDEV" next to each other'
categories:
  - Guides
---

A very cool thing about DDEV is that you don’t need to think about IP addresses or https or name resolution most of the time. Some of you will never need to. And you don't have to understand teh rest of this article to use DDEV.

This article attempts to unwind what DDEV does for you, and what to do when things require a bit more effort.

## Name resolution for browsers and URLs

The first thing to understand is the structure of a URL used by your browser. A URL like `https://www.google.com/`/search?q=nothing` is structured with 3 main parts, the protocol (usually `https`), the hostname (like `www.google.com`), and the URI, (like `/search?q=nothing`). Every URL that your browser can visit has at least the protocol and the hostname. Sometimes the protocol is hidden implying the default `https`. The URI may be the default "front page".

When your browser gets a URL, no matter how it gets it, and you want to display the page at that URL, the browser has to parse the URL, then turn the hostname into an IP address so it can find its way to it on the internet, then do the proper HTTP request to the internet site, including the URI. The key thing for us right now is that it has to look up that hostname.

Normally with a DDEV local development project, we'll see URLs like `https://something.ddev.site`. It's all done like that so that your local project will work with real URLs and real HTTPS, and essentially behave just like a real site. In the past, local development environments often used URLs like `http://127.0.0.1:2302/somesite, which isn't easy to look at and definitely doesn't behave the same in the browser as a "real" URL.

## How DDEV hostnames get resolved

But DDEV URLs have to have hostnames in them that a browser can resolve. How do we get that? How can we get a url like `https://something.ddev.site`?

When a browser tries to resolve `https://something.ddev.site` it looks up the hostname `something.ddev.site`. Normally that's just a lookup in the DNS (Domain Name System) world. You don't have to know about DNS to understand that. The browser asks the internet "What does `something.ddev.site` resolve to, and the internet DNS system says "Oh, anything with `ddev.site` has the IP address `127.0.0.1`". So the browser nows to connect to your local machine (which is what `127.0.0.1` or `localhost` always means). This process is invisible to you, and works because the DDEV project maintains the DNS records for `ddev.site` on the internet. You don't have to know it and you don't have to think about it.

## What is `ddev.site` and where does it come from?

`ddev.site` and everything under it, like `you.ddev.site` and `something.else.entirely.ddev.site` are all (when you have working internet) records in the Domain Name System, maintained by the DDEV project. You don't have to think about them. You can `ping -c 1 something.ddev.site` and it will just `ping 127.0.0.1`. 

## What happens when you don't have internet?

When you don't have internet capability, or DNS name resolution is broken, then DDEV's fallback during `ddev start` is to try to add the hostname to your `hosts` file. This is `/etc/hosts` on a Linux or macOS machine, or `C:\Windows\system32\drivers\etc\hosts` on a Windows machine. This is one of the very few times that DDEV will ever try to change the configuration of your local workstation. In general, the philosophy is never to do that. DDEV knows how to edit the hosts file properly and does it when you give it permission with your `sudo` password.

If you *lose* internet after `ddev start` then your browser is going to struggle because it doesn't have a way to resolve the hostname. This can happen when you are working on a project and get on a plane, for example. `ddev restart` will force updating the hosts file, or `ddev hostname` can do it directly, or you can edit the hosts file.

## Why does my project use `ddev.site` anyway?

You don't have to use `ddev.site` as your "top-level domain name" or `TLD`. You can use anything you want... but we can't manage your DNS for you. For example, you can globally change your TLD to `example.com` with `ddev config global --project-tld=example.com` and DDEV will immediately start trying to use URLs like `https://yourproject.example.com`. If you prefer to use a domain name that you manage in your own local network DNS or in a DNS zone that you manage, you can do that too.

## What happens with wildcard hostnames?

DDEV supports wildcards in `additional_hostnames` in your `.ddev/config.yaml`. For example, this works great when you have internet and DNS working, because DDEV's `.ddev.site` will return `127.0.0.1` for any domain name you give it, including `a.b.c.d.e.f.g.h.ddev.site`.  So if you use `additional_hostnames: *.anything` then `a.anything.ddev.site` will work fine, as will `a.b.anything.ddev.site`. 

However, wildcards don't work in `/etc/hosts` so DDEV has no way to provide a resolvable set of hostnames when you don't have internet work working DNS. As a result, you'll need to use explicit hostnames in this situation. For example, use `additional_hostnames: [a.anything,a.b.anything]`

## Can I just stop using the regular DNS setup with `ddev.site`?

Of course. There are two easy ways:
1. `use_dns_when_possible: false`: Just turn off the use of DNS in your `.ddev/config.yaml`.
2. Use a different `project_tld`. For example, if you use `project_tld: example.site` then DDEV will try to make your projects `<projectname>.example.site`. Since that is not resolvable, DDEV will resort to using hosts file manipulation.


## Can I use my own local-machine DNS?

Yes, you can set up a DNS provider on your own computer. [blocky](https://github.com/0xERR0R/blocky) and [dnsmasq](https://thekelleys.org.uk/dnsmasq/doc.html) are traditional choices. I don't recommend this for most people, because it means you need to understand much more about networking and extra software than you would normally need to know. But if you do this, you can provide wildcard services that you're in control of and that work even when your connection to the internet is broken.

## Can I set up a domain name on my local network or company network?

Yes, this is exactly the same. Normally you would have every DDEV-related domain name return `127.0.0.1` for the DNS name you're supporting. However, some people use this technique to [share DDEV sites inside a local network](https://ddev.readthedocs.io/en/stable/users/topics/sharing/#exposing-a-host-port-and-providing-a-direct-url). 

## Can I set up my own domain in DNS like `ddev.site`?

Yes, if you have the ability to configure an internet DNS zone, you can set it up just like `ddev.site` is set up, resolving to `127.0.0.1` and with a wildcard that resovles to `127.0.0.1`.

## What happens on WSL2 and why do I have to take action on the Windows side?

On WSL2, when you don't have internet, or your DNS is broken, or you're using a hostname that can't be looked up in DNS, DDEV has to punt the hosts file change over to the Windows side of things, because your *browser* is almost always running on Windows, so editing the hosts file on the Windows side is what has to happen. The way DDEV currently does this is requests a **Windows** version of `ddev.exe` to escalate and edit the hosts file. That's why WSL2 installations also ask you to install Windows DDEV using `choco install -y ddev`.

## No matter what, DDEV always wants to edit my hosts file (No DNS Rebinding)

There is one DNS server configuration that disallows looking up any hostname that resolves to `127.0.0.1`. It's called preventing [DNS Rebinding](https://en.wikipedia.org/wiki/DNS_rebinding), and it happens most often to European users who have Fritzbox routers. The fix for this is covered in the [DDEV Docs](https://ddev.readthedocs.io/en/stable/users/usage/troubleshooting/#dns-rebinding-prohibited-mostly-on-fritzbox-routers) and it's easy and will make your life much easier.

However, if you don't have control of your router, there's another easy fix, and that is to use a trusted DNS server outside your network. To do this, you would change your DNS server on your computer to `1.1.1.1` for Cloudflare's public DNS server, or `8.8.8.8` for Google's public DNS. Those will both do ordinary DNS resolution.


## What about using `additional_fqdns` in DDEV configuration?

DDEV provides `additional_hostnames`, which works nicely almost always, but also `additional_fqdns`.  With a setting like `additional_fqdns: [one.two.example.com]` a DDEV project will respond to `https://one.two.example.com`, but DDEV will need to add `one.two.example.com` to the hosts file for it to work.  The [docs](https://ddev.readthedocs.io/en/stable/users/configuration/config/#additional_hostnames) explain how to use it and what the consequences are.

Be exceptionally careful with "masking" real sites this way. It can really confuse you to add `additional_hostnames: [www.google.com]` to your configuration, because DDEV will then put `www.google.com` into your hosts file and you'll no longer be able to get to Google.