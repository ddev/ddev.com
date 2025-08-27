---
title: "Tailscale for DDEV: Simple and Secure Project Sharing"
pubDate: 2025-08-26
summary: "Tired of temporary sharing links? Learn how to use the ddev-tailscale-router add-on to get a stable, secure, and private URL for your DDEV projects."
author: Ajith Thampi Joseph
featureImage:
  src: /img/blog/2025/08/ddev_tailscale_flowchart.svg
  alt: "DDEV Tailscale Router Cover Image"
  caption: "The ddev-tailscale-router add-on enables cross-device testing, stable webhook URLs, and team collaboration."
  credit: "Image by Claude AI :)"
categories:
  - Guides
  - TechNotes
---

I've found that DDEV's [`ddev share`](https://docs.ddev.com/en/stable/users/topics/sharing/) command is a great way to quickly share my local development environment. However, since it uses ngrok, it generates a new, random URL every time, which can be a hassle. For a more permanent and secure solution, I've created the [`ddev-tailscale-router`](https://github.com/atj4me/ddev-tailscale-router) add-on.

This add-on uses [Tailscale](https://tailscale.com/), a service that creates a private and secure network between your devices. It is free for personal use!

As a result, you get a stable, human-readable URL for each of your DDEV projects, which you can access from any device on your Tailscale network.

I've found this approach to be particularly useful for:

- **Cross-device testing:** I can easily test my sites on my phone or tablet without being on the same Wi-Fi network.
- **Stable webhook URLs:** I can use the permanent Tailscale URL as a reliable endpoint for webhooks, such as those from payment gateways.
- **Team collaboration:** I can share my development environment with team members so they can see my work in progress.

### How it Works

The `ddev-tailscale-router` add-on works by running a Tailscale container alongside your DDEV project. This container automatically connects to your Tailscale network and securely proxies requests to your project's web container.

### Installation

To get started, follow these steps:

1.  First, install the add-on:
    ```bash
    ddev add-on get atj4me/ddev-tailscale-router
    ```
2.  Next, get a Tailscale auth key from the [Tailscale admin console](https://login.tailscale.com/admin/settings/keys).
3.  Then, configure the auth key in your DDEV project:
    ```bash
    ddev dotenv set .ddev/.env.tailscale-router --ts-authkey=tskey-auth-your-key-here
    ```
4.  Finally, restart your DDEV project:
    ```bash
    ddev restart
    ```

After restarting, you can find your project's permanent Tailscale URL in the [Tailscale admin console](https://login.tailscale.com/admin/machines). It will look something like this: `http://<project-name>.<your-tailnet>.ts.net`.

### Public vs. Private Mode

The add-on offers two modes for sharing your project:

- **Private (default):** In this mode, your project is only accessible to devices on your Tailscale network.
- **Public:** Alternatively, you can make your project accessible to anyone on the internet.

To switch between modes, you can set the `ts-privacy` variable in your `.ddev/.env.tailscale-router` file:

```bash
# Switch to private mode
ddev dotenv set .ddev/.env.tailscale-router --ts-privacy=private
ddev restart

# Switch to public mode
ddev dotenv set .ddev/.env.tailscale-router --ts-privacy=public
ddev restart
```

If you have any questions or problems, please file an issue in the [GitHub repository](https://github.com/atj4me/ddev-tailscale-router/issues).

---

_This blog post was written with the assistance of Amazon Q and Google Gemini. I used them to help simplify the language, improve the flow, and proofread the text._
