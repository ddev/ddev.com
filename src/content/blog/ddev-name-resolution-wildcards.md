---
title: "DDEV Name Resolution, Wildcards, Working Offline"
pubDate: 2024-03-27
#modifiedDate: 2024-03-03
summary: How hostname name resolution works in a DDEV environment, including how wildcards work
author: Randy Fay
featureImage:
#  src: /img/blog/2024/03/2024-ddev.png
#  alt: 2024 DDEV Plans
#  credit: 'Ideogram.ai: the words "2024" and "DDEV" next to each other'
categories:
  - Guides
---

A very cool thing about DDEV is that you don’t need to think about IP addresses or https or name resolution or /etc/hosts… until you do.

This article attempts to unwind what DDEV does for you, and what to do when things require a bit more effort.

## Name resolution for browsers and URLs

The first thing to understand is the structure of a URL used by your browser. A URL like `https://www.google.com/`/search?q=nothing` is structured with 3 main parts, the protocol (usually `https`), the hostname (like `www.google.com`), and the URI, (like `/search?q=nothing`). Every URL that your browser can visit has at least the protocol and the hostname. Sometimes the protocol is hidden implying the default `https`. The URI may be the default "front page".

When your browser gets a URL, no matter how it gets it, and you want to display the page at that URL, the browser has to parse the URL, then turn the hostname into an IP address so it can find its way to it on the internet, then do the proper HTTP request to the internet site, including the URI. The key thing for us right now is that it has to look up that hostname.

Normally with a DDEV local development project, we'll see URLs like `https://something.ddev.site`. It's all done like that so that your local project will work with real URLs and real HTTPS, and essentially behave just like a real site. In the past, local development environments often used URLs like `http://127.0.0.1:2302/somesite, which isn't easy to look at and definitely doesn't behave the same in the browser as a "real" URL.

## How DDEV hostnames get resolved

But DDEV URLs have to have hostnames in them that a browser can resolve. How do we get that? How can we get a url like `https://something.ddev.site`?

When a browser tries to resolve `https://something.ddev.site` it looks up the hostname `something.ddev.site`. Normally that's just a lookup in the DNS (Domain Name System) world. You don't have to know about DNS to understand that. The browser asks the internet "What does `something.ddev.site` resolve to, and the internet DNS system says "Oh, anything with `ddev.site` has the IP address `127.0.0.1`". So the browser nows to connect to your local machine (which is what `127.0.0.1` or `localhost` always means). This process is invisible to you, and works because the DDEV project maintains the DNS records for `ddev.site` on the internet. You don't have to know it and you don't have to think about it.

- [ ] 
- [ ]  DNS and etc/hosts stuff
  - [ ]  Normally you don’t need to know any of this
  - [ ]  Explain URLs and hostnames, how it works
  - [ ]  What is name resolution and why
  - [ ]  What is [ddev.site](http://ddev.site) domain name
  - [ ]  What is project_tld and where can you set it?
  - [ ]  Working offline
  - [ ]  Explicitly not using DNS (use-dns-when-possible) is like turning off internet
  - [ ]  For *.whatever, you’ll have to explicitly put hostnames in /etc/hosts, or use your own DNS solution.
  - [ ]  Using local machine DNS
  - [ ]  Using local network DNS
  - [ ]  DNS rebinding
  - [ ]  working offline