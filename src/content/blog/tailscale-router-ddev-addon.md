---
title: "A Simple and Secure Way to Share Your DDEV Projects with Tailscale"
pubDate: 2025-08-26
summary: "Tired of temporary sharing links? Learn how to use the ddev-tailscale-router add-on to get a stable, secure, and private URL for your DDEV projects."
author: Ajith Thampi Joseph
categories:
  - Guides
  - TechNotes
---

DDEV's `ddev share` command is a great way to quickly share your local development environment. However, it uses ngrok, which generates a new, random URL every time you use it. For a more permanent and secure solution, you can use the `ddev-tailscale-router` add-on.

This add-on uses Tailscale, a service that creates a private and secure network between your devices. As a result, you get a stable, human-readable URL for each of your DDEV projects, which you can access from any device on your Tailscale network.

This approach is particularly useful for:

*   **Cross-device testing:** Easily test your site on your phone or tablet without being on the same Wi-Fi network.
*   **Stable webhook URLs:** Use the permanent Tailscale URL as a reliable endpoint for webhooks, such as those from payment gateways.
*   **Team collaboration:** Share your development environment with team members so they can see your work in progress.

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

*   **Private (default):** In this mode, your project is only accessible to devices on your Tailscale network.
*   **Public:** Alternatively, you can make your project accessible to anyone on the internet.

To switch between modes, you can set the `ts-privacy` variable in your `.ddev/.env.tailscale-router` file:

```bash
# Switch to private mode
ddev dotenv set .ddev/.env.tailscale-router --ts-privacy=private
ddev restart

# Switch to public mode
ddev dotenv set .ddev/.env.tailscale-router --ts-privacy=public
ddev restart
```

### Support

If you have any questions or problems, please file an issue in the [GitHub repository](https://github.com/atj4me/ddev-tailscale-router/issues).
