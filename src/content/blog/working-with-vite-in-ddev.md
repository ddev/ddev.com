---
title: "Working with Vite in DDEV - an introduction"
pubDate: 2023-11-08
modifiedDate: 2025-10-27
modifiedComment: "Added a link to the official DDEV documentation for Vite."
summary: Working with Vite in DDEV
author: Matthias Andrasch
featureImage:
  src: /img/blog/2023/11/working-with-vite-in-ddev.png
  alt: Working with Vite in DDEV
categories:
  - Guides
---

## Using Vite with DDEV

Vite is a popular web development tool that serves your JavaScript and CSS code in a clever way: Instead of bundling everything like webpack, it uses a technique called "hot module reloading". This enables the ability to instantly update and show your changes in the browser while you're working on your project.

This tutorial walks you through creating a simple PHP project with Vite and DDEV from scratch. You'll learn the fundamentals by building a working example step-by-step.

For documentation covering Laravel, WordPress, Drupal, Craft CMS, and other frameworks, see the [official DDEV Vite Integration documentation](https://docs.ddev.com/en/stable/users/usage/vite/).

**What you'll learn:**

- How to set up Vite in a basic PHP project
- Exposing and configuring the Vite development server
- Testing hot module reloading with CSS and JavaScript
- Handling images and other assets
- Building for production

### A plain PHP example

Let's try it out with a simple example project. We will use Vite v4 for this.

First we create a new DDEV project called `test-vite`:

```bash
mkdir test-vite && cd test-vite
ddev config --project-type=php
ddev start
```

Now we can create a simple package.json file. A quick reminder: Every npm command needs to be executed within the DDEV web container, so we use `ddev npm` (or `ddev yarn`).

```bash
ddev npm init -y
```

Afterwards we install [Vite](https://www.npmjs.com/package/vite) as development dependency:

```bash
ddev npm i vite --save-dev
```

_For more advanced examples, check out Vite's guide [Scaffolding Your First Vite Project](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)._

We add these script commands to the `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

And we also need to add the type property:

```json
{
  "type": "module"
}
```

The final `package.json` is as follows:

```json
{
  "name": "vite-starter",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "vite": "^6.0.11"
  }
}
```

Now Vite is almost ready to go. But there are two important steps ahead of us.

### Expose the vite port

Vite is installed within DDEV, but we can't access it from outside the Docker container yet. We need to expose port `5173` of the DDEV project.

Why?

If you use Vite on your localhost (without DDEV), the Vite development server would be accessible at `http://localhost:5173/`.

Now we need it make it accessible via `https://test-vite.ddev.site:5173`.

Fortunately exposing the port is very simple with DDEV's config option [web_extra_exposed_ports](https://docs.ddev.com/en/stable/users/extend/customization-extendibility/#exposing-extra-ports-via-ddev-router). We add the following to `.ddev/config.yaml` file:

```yaml
web_extra_exposed_ports:
  - name: vite
    container_port: 5173
    http_port: 5172
    https_port: 5173
```

This is our resulting `.ddev/config.yaml` file:

```yaml
name: test-vite
type: php
docroot: ""
php_version: "8.3"
webserver_type: nginx-fpm
xdebug_enabled: false
additional_hostnames: []
additional_fqdns: []
database:
  type: mariadb
  version: "10.11"
use_dns_when_possible: true
composer_version: "2"
web_environment: []
corepack_enable: false
web_extra_exposed_ports:
  - name: vite
    container_port: 5173
    http_port: 5172
    https_port: 5173
```

A `ddev restart` is necessary after changing the `.ddev/config.yaml` file.

You can check the exposed ports with `ddev describe` after the restart.

_Note: In other tutorials or projects you may come across docker-compose-files in the .ddev/-folder which also take care of exposing the vite port. If you use `web_extra_exposed_ports`, you don't need these files._

### Adjust the Vite config

The last step is to adjust the Vite config to let it know that it will run on `https://test-vite.ddev.site:5173`.

This can be done easily by creating a `vite.config.js` file like this:

```js
import { defineConfig } from "vite"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  // Add entrypoint
  build: {
    // our entry
    rollupOptions: {
      input: path.resolve(__dirname, "src/main.js"),
    },

    // manifest
    manifest: true,
  },

  // Adjust Vites dev server for DDEV
  // https://vitejs.dev/config/server-options.html
  server: {
    // Respond to all network requests
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    // Defines the origin of the generated asset URLs during development,
    // this must be set to the Vite dev server URL and selected port.
    origin: `${process.env.DDEV_PRIMARY_URL_WITHOUT_PORT}:5173`,
    // Configure CORS securely for the Vite dev server to allow requests
    // from *.ddev.site domains, supports additional hostnames (via regex).
    // If you use another `project_tld`, adjust this value accordingly.
    cors: {
      origin: /https?:\/\/([A-Za-z0-9\-\.]+)?(\.ddev\.site)(?::\d+)?$/,
    },
  },
})
```

Technical explanation:

- We need to define an entry file to let vite know where to start, this is done in `rollupOptions`.
- Also, we need to tell Vite to respond to all network request, not only the ones addressed internally to http://localhost:5173. This is done via `host: '0.0.0.0'` and is important for making it work with DDEV / Docker.
- The strict port setting is also necessary, because we only exposed port 5173. Without `strictPort: true`, Vite will use other ports like 5174 or 5175 if port 5173 is already occupied.
- Another important part is to let Vite know from where to load Vite-controlled assets like images referenced in CSS. This is done via `server.origin`. <br> _(DDEV automatically provides environment variables via the regular `process.env` variable. The variable `process.env.DDEV_PRIMARY_URL_WITHOUT_PORT` will have the value `https://test-vite.ddev.site` in our demo project. We use it to set the correct `server.origin` dynamically.)_
- Last but not least, we need to configure secure CORS headers. In earlier versions of Vite, this was set to `cors: true` by default and allowed all origins to fetch scripts from the devserver. After [security advisory GHSA-vg6x-rcgg-rjx6](https://github.com/vitejs/vite/security/advisories/GHSA-vg6x-rcgg-rjx6), the default setting was changed and we need to add the allowance of DDEV local domains explicitly. The regular expression supports domains like `https://test-vite.ddev.site` (or something like `https://test-vite.ddev.site:1234` when you use another HTTPS port). See [server.cors](https://vite.dev/config/server-options#server-cors) in the Vite docs for more information.

If your site runs on another [top-level-domains (project_ltd)](https://docs.ddev.com/en/stable/users/configuration/config/#project_tld) rather than `.ddev.site`, you edit the regular expression yourself or use this automagic snippet:

```javascript
export default defineConfig({
  server: {
    cors: {
      origin: new RegExp(
        `https?:\/\/(${process.env.DDEV_HOSTNAME.split(",")
          .map((h) => h.replace("*", "[^.]+"))
          .join("|")})(?::\\d+)?$`
      ),
    },
  },
})
```

See Vite's [Server Options](https://vitejs.dev/config/server-options.html) for all settings.

### Test it

Now we need a little test web page.

Let's create the `src/main.js` as our entry file:

```js
import "./style.css"

console.log("hello vite!")
```

Alongside create the file `src/style.css`:

```css
body {
  font-family: sans-serif;
}

p {
  color: darkslateblue;
}
```

And we will need a simple PHP index file of course. We put it in the root folder as `index.php`:

```php
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Vite!</title>

    <!-- This is just an example for local development, no full integration: -->
    <script type="module" src="<?php echo preg_replace('/:\d+$/', '', $_SERVER['DDEV_PRIMARY_URL_WITHOUT_PORT']); ?>:5173/@vite/client"></script>
    <script type="module" src="<?php echo preg_replace('/:\d+$/', '', $_SERVER['DDEV_PRIMARY_URL_WITHOUT_PORT']); ?>:5173/src/main.js"></script>
    <!-- see https://vitejs.dev/guide/backend-integration.html -->

</head>

<body>
    <h1>Hello, Vite!</h1>
    <p>This is a simple test for hot module reloading.</p>
</body>

</html>
```

Run `ddev launch` to open https://test-vite.ddev.site/ in the browser.

Now we need to start Vite for local development:

```bash
ddev npm run dev
```

Reload the browser.

If you change something in `style.css` or `main.js` now, you should see the change immediately on the website as well - without a full page reload.

You can also open https://test-vite.ddev.site:5173/@vite/client and https://test-vite.ddev.site:5173/src/main.js to see if Vites dev server is accessible.

### Test with an image

Vite also optimizes images referenced in CSS. These are also loaded from Vite's dev server for local production.

Download the [DDEV Logo](https://github.com/ddev/ddev/blob/main/docs/content/developers/logos/2x/Logo_w_text%402x.png) to `src/images/ddev.png`.

Add this HTML container to your `index.php`:

```html
<div id="image-test"></div>
```

Add this to your `src/style.css`:

```css
#image-test {
  width: 300px;
  height: 150px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("/src/images/ddev.png");
}
```

Reload the browser (because Vite currently handles CSS and JS changes).

The image is loaded from Vite and is accessible via https://test-vite.ddev.site:5173/src/images/ddev.png for local development. This is ensured by the `server.origin` setting in `vite.config.js`.

_If you want to reload your site when a PHP file changes, you could use plugins like [antfu/vite-plugin-restart](https://nystudio107.com/docs/vite/#live-reload-of-twig-config). Some frameworks like Laravel have support for this in [their plugin](https://laravel-news.com/laravel-blade-hot-refresh-with-vite)._

### Demo repository

You can find the source code for this simple demo here: [mandrasch/ddev-vite-simple-demo](https://github.com/mandrasch/ddev-vite-simple-demo)

### Building for production

This demo only covered the case of using the local development server for hot module reloading.

For production, you would first run `ddev npm run build` to generate the optimized files. These will be generated in the `dist/` folder with a hash:

- `/dist/assets/main-8811a981.js`
- `/dist/assets/main-d6825f81.css`
- `...`

To include these in PHP, you will need to know the hash values. You could set `build.manifest` to true in Vite's config. With this option enabled a `/dist/manifest.json` file is generated on each build, which has reference to all JS and CSS files:

Example:

```json
{
  "src/images/ddev.png": {
    "file": "assets/ddev-f877fcaa.png",
    "src": "src/images/ddev.png"
  },
  "src/main.css": {
    "file": "assets/main-d6825f81.css",
    "src": "src/main.css"
  },
  "src/main.js": {
    "assets": ["assets/ddev-f877fcaa.png"],
    "css": ["assets/main-d6825f81.css"],
    "file": "assets/main-8811a981.js",
    "isEntry": true,
    "src": "src/main.js"
  }
}
```

You could now parse the `dist/manifest.json` file dynamically in PHP and get the hashed filename via `$manifest["src/main.js]` and include it on your production site.

This is the point where PHP libraries and CMS integrations come into play which handle this for us. In most cases, you won't need to write this integration yourself.

## Next Steps

Now that you understand the basics of Vite with DDEV, you're ready to use it with your preferred framework or CMS! See the **[official DDEV Vite Integration documentation](https://docs.ddev.com/en/stable/users/usage/vite/)**.

You wrote about DDEV and Vite or published a video? Please let us know!
