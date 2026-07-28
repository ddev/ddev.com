---
title: "DDEV and Xdebug: Debugging and sorting out problems"
pubDate: 2024-05-28
modifiedDate: 2026-07-28
modifiedComment: "Repositioned this post as the contributor-training-recording archive: trimmed the general Xdebug explanation and the Troubleshooting/WSL2 sections, which are now covered in more depth by the updated guide, and kept the unique training video and nc/netcat demo. See [Xdebug in DDEV: Understanding, Debugging, and Troubleshooting Step Debugging](/blog/xdebug-step-debugging-understanding-and-troubleshooting/) for the current primary reference."
summary: Recording of the DDEV Xdebug contributor training, plus a hands-on nc/netcat demo of how the Xdebug protocol connects
author: Randy Fay
featureImage:
  src: /img/blog/2024/05/xdebug_logo.png
  alt: Xdebug logo
  credit: "Xdebug logo from https://en.m.wikipedia.org/wiki/File:Xdebug_Logo.svg"
categories:
  - Training
  - Videos
---

**Update**: For current guidance, including DDEV v1.25's `ddev utility xdebug-diagnose` tool and full troubleshooting steps, see [Xdebug in DDEV: Understanding, Debugging, and Troubleshooting Step Debugging](xdebug-step-debugging-understanding-and-troubleshooting.md). This post remains as the recording of our original **Xdebug contributor training**, plus a hands-on demo of the Xdebug protocol using `nc`/netcat that isn't repeated elsewhere.

---

Here's a recording of our **Xdebug contributor Training** walking through DDEV and Xdebug.

<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/IiKB8-sCiJk?si=Hs8uyjhuy0qn7cz0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

First of all, congratulations for making step-debugging a priority. It's my opinion that step-debugging is one of the very first things to learn in any language or environment that we undertake.

Second, please [contribute to the Xdebug project](https://xdebug.org/support). Derick Rethans created this incredible resource and has been maintaining it for 22 years and counting. Making open-source projects sustainable is an obligation for all of us!

DDEV's Xdebug [documentation](https://docs.ddev.com/en/stable/users/debugging-profiling/step-debugging/) covers basic usage and setup for PhpStorm, VS Code, and other IDEs. In short: `ddev xdebug on`, make your IDE listen for Xdebug, then visit a page in your browser. If you have trouble, the [updated guide](xdebug-step-debugging-understanding-and-troubleshooting.md) and its `ddev utility xdebug-diagnose` tool cover troubleshooting in depth, including WSL2.

Here's a demo that isn't repeated elsewhere: watching the Xdebug protocol itself with `nc`/netcat, which makes it obvious that Xdebug is just a network connection from PHP to your IDE over `host.docker.internal:9003`.

## Demonstrating Xdebug's behavior

You can easily test this out using the handy network utility `nc` or `netcat`.

On your host workstation (the same place your IDE is running) you can

```bash
nc -l 0.0.0.0 9003
```

(note that different versions of `netcat/nc` may take slightly different arguments.)

If you then visit your project, for example with `ddev exec curl localhost` or `curl https://<project>.ddev.site` you'll see something like this pop up in the `nc` session:

```xml
<?xml version="1.0" encoding="iso-8859-1"?>
<init xmlns="urn:debugger_protocol_v1" xmlns:xdebug="https://xdebug.org/dbgp/xdebug" fileuri="file:///var/www/html/web/index.php" language="PHP" xdebug:language_version="8.2.19" protocol_version="1.0" appid="5089"><engine version="3.2.2"><![CDATA[Xdebug]]></engine><author><![CDATA[Derick Rethans]]></author><url><![CDATA[https://xdebug.org]]></url><copyright><![CDATA[Copyright (c) 2002-2023 by Derick Rethans]]></copyright></init>
```

That's exactly what your IDE receives from PHP in the same situation. If it doesn't show up, that's the same connectivity problem your IDE would have — see the [troubleshooting guide](xdebug-step-debugging-understanding-and-troubleshooting.md) for how to resolve it.

## Contributions welcome!

We always love to hear your experiences with DDEV, so please do a PR to this blog adding your experience. Info and a training session on how to do a PR to anything in ddev.com is at [DDEV Website For Contributors](ddev-website-for-contributors.md). And if you can improve the DDEV docs, click the pencil at the top of any docs page to add your suggestion.

Past trainings are recorded at [contributor training](/blog/category/training).
