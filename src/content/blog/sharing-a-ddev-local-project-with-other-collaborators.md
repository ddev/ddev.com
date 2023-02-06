---
title: "DDEV share: Sharing a DDEV-Local project with other collaborators in real time"
pubDate: 2020-03-17
summary: How to share a local DDEV project with others.
author: Randy Fay
featureImage:
  src: /img/blog/2020/03/ngrok-page.png
  alt: Cropped browser screenshot of a site, emphasizing the `.ngrok.io` domain name
  shadow: true
categories:
  - Guides
  - DevOps
---

Even though [DDEV-Local](https://ddev.com/ddev-local/) is intended for local development on a single machine, not as a public server, there are a number of reasons you might want to expose your work in progress more broadly:

- Testing with a mobile device
- Sharing on a local network so that everybody on the local network can see your project
- Some CI applications

There are at least three different ways to share a running DDEV-Local project outside the local developer machine:

1. `ddev share` (using ngrok to share over the internet)
2. Local name resolution and sharing the project on the local network
3. Sharing just the HTTP port of the local machine on the local network

## **1\. Using `ddev share` to share project (easiest)**

`ddev share` proxies the project via [ngrok](http://ngrok.com), and it’s by far the easiest way to solve the problem of sharing your project with others on your team or around the world. It’s built into ddev and “just works” for most people, even people who don’t sign up for a paid ngrok account. All you do is run `ddev share` and then give the resultant URL to your collaborator or use it on your mobile device. [Read the basic how-to from DrupalEasy](https://www.drupaleasy.com/blogs/ultimike/2019/06/sharing-your-ddev-local-site-public-url-using-ddev-share-and-ngrok) or run `ddev share -h` for more.

There are CMSs that make this a little harder, especially WordPress and Magento 2. Both of those only respond to a single base URL, and that URL is coded into the database, so it makes this a little harder. For both of these I recommend paying ngrok the $5/month for a[ basic plan](https://ngrok.com/pricing) so you can use a stable subdomain with ngrok.

#### **Setting up a stable subdomain with ngrok**

1. Get a paid token with at least the basic plan, and configure it. (It will be in `~/.ngrok2/ngrok.yml` as `authtoken`.
2. Configure `ngrok_args` to use a stable subdomain. In `.ddev/config.yaml`, `ngrok_args: –subdomain wp23` will result in ngrok always using `wp23.ngrok.io` as the URL, so it’s not changing on you all the time.

#### **WordPress: Change the URL with wp search-replace**

WordPress only has the one base URL, but the wp command is built into DDEV-Local’s web container.

This set of steps assumes an ngrok subdomain of “wp23” and a starting URL of `https://wordpress.ddev.site`.

1. Configure `.ddev/config.yaml` to use a custom subdomain: `ngrok_args: --subdomain wp23`
2. Make a backup of your database with `ddev export-db` or `ddev shapshot`
3. Edit `wp-config-ddev.php` (or whatever your config is) to change `WP_HOME`, for example, `define('WP_HOME', '[<https://wp23.ngrok.io>](<https://wp23.ngrok.io/>)');`
4. `ddev ssh`
5. `wp search-replace [<https://wordpress.ddev.site>](<https://wordpress.ddev.site/>) [<https://wp23.ngrok.io>](<https://wp23.ngrok.io/>)`  
   (assuming your project is configured for `https://wordpress.ddev.site` and your `ngrok_args` are configured for the wp23 subdomain)
6. Now `ddev share`

#### **Magento2: Change the URL with magento tool**

This set of steps assumes an ngrok subdomain “mg2”

1. Configure `.ddev/config.yaml` to use a custom subdomain: `ngrok_args: --subdomain mg2`
2. Make a backup of your database.
3. Edit your `.ddev/config.yaml`
4. `ddev ssh` and
5. `bin/magento setup:store-config:set --base-url="[<https://mg2.ngrok.io/>](<https://mg2.ngrok.io/>)"`
6. `ddev share` and you’ll see your project on `mg2.ngrok.io`

## **2\. Using xip.io and or your own name resolution and open up to the local network**

The second solution is to _not_ use \*.ddev.site as your project URLs, but to use DNS that you control (and that points to the host machine where your project lives). In general you’ll want to use HTTP URLs with this approach, because it requires manual configuration of the client machine to get it to trust the development certificate that ddev uses (and configures with mkcert on the local machine).

1. Use [xip.io](http://xip.io/) to point a domain name to your host. If your computer’s IP address is 192.168.5.101, you can use a domain name like mysite.192.168.5.101.xip.io and that domain name will point to your computer. Now add that as an additional_fqdn to your project, `ddev config --additional-fqdns=mysite.192.168.5.101.xip.io` and `ddev start`. Now people in your internal network should be able to `ping mysite.192.168.5.101.xip.io` if your firewall allows it. (Note that if you have other convenient ways to create a DNS entry for this, you can use those instead of using xip.io.)
2. Configure \~/.ddev/global_config.yaml to bind to all ports:` ddev config global --router-bind-all-interfaces && ddev poweroff && ddev start`
3. Now mobile apps or other computers which are on your _local_ network should be able to access your project. Use the http URL rather than the HTTPS URL because computers outside yours don’t know how to trust the developer TLS certificate you’re using. (You can use `ddev describe` to see the HTTP URL, but it’s typically the same as the HTTPS URL, but with `http://` instead of `https://`.)
4. Make sure your firewall allows access from your local network to the main interface you’re using. In the example here you should be able to ping 192.168.5.101 and `curl [<http://192.168.5.101>](<http://192.168.5.101>)` and get an answer in each case.
5. If you’re using WordPress or Magento 2 you’ll need to change the base URL as described in the `ddev share` instructions above.

## **3\. Exposing just a port from the host**

DDEV-Local’s web container also exposes an HTTP port directly (in addition to the normal routing by name and via ddev_router). You can expose this port and it may be a useful approach in some situations.

1. Add a `docker-compose.localnet.yaml` to your project’s `.ddev` directory. This example will expose HTTP on port 8080:
   ```yaml
   version: "3.6"
   services:
   web:
   ports:
     - "0.0.0.0:8080:80"
     - "0.0.0.0:8443:443"
   ```
2. `ddev start`
3. Make sure your firewall allows access to the port on your host machine.
4. If you’re using WordPress or Magento 2 you’ll need to change the base URL as described in the `ddev share` instructions above.
5. Each site on your computer must use different ports or you’ll have port conflicts, and you can’t typically use ports 80 or 443 because ddev-router is already using those for normal routing.

Computers and mobile devices on your local network should now be able to access port 8080, on the (example) host address 192.168.5.23, so `http://192.168.5.23:8080`. You’ll probably want to use the HTTP URL your coworker’s browser will not trust the developer TLS certificate you’re using.

## What next?

Find us and other DDEV community experts via one of our [support channels](https://ddev.readthedocs.io/en/stable/#support-and-user-contributed-documentation).

Take a look around the [project on GitHub](http://github.com/drud/ddev) and feel free to contribute!
