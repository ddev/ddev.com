---
title: "Working with Vite in DDEV - an introduction"
pubDate: 2023-11-08
modifiedDate: 2024-05-30
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

This articles sums up my current personal experience. I hope it will be a helpful introduction to get started with Vite. Happy to hear your feedback!

Vite is written in NodeJS. DDEV already has built-in support for [NodeJS](https://ddev.readthedocs.io/en/stable/users/usage/cli/#nodejs-npm-nvm-and-yarn).

In order to use Vite in our DDEV projects, we need to do two things:

1.) Expose Vite's development server port (default: `5173`):

```yaml
# .ddev/config.yaml
web_extra_exposed_ports:
  - name: vite
    container_port: 5173
    http_port: 5172
    https_port: 5173
```

This needs a `ddev restart` afterwards to apply changes.

2.) Adjust the Vite config to use DDEVs project URL, e.g. `https://test-vite.ddev.site:5173`:

```js
import { defineConfig } from 'vite'
const port = 5173;
const origin = `${process.env.DDEV_PRIMARY_URL}:${port}`;

export default defineConfig({
  
  // Your settings
  // ...

  // Adjust Vites dev server to work with DDEV
  // https://vitejs.dev/config/server-options.html
  server: {
    // respond to all network requests:
    host: '0.0.0.0',
    port: port,
    strictPort: true,
    // Defines the origin of the generated asset URLs during development
    origin: origin
  },
})
```

Some more customizations might be needed depending on your CMS / framework, see [List of PHP CMS integrations](#list-of-php-cmsintegrations) below.

### A plain PHP example

Let's try it out with a simple example project. We will use Vite v4 for this.

First we create a new DDEV project called `test-vite`:

```
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

We add these script commands to the package.json:

```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
```

An we also need to add the type property:

```json
"type": "module"
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
    "vite": "^4.5.0"
  }
}
```

Now Vite is almost ready to go. But there are two important steps ahead of us.

### Expose the vite port

Vite is installed within DDEV, but we can't access it from outside of the Docker container yet. We need to expose port `5173` of the DDEV project.

Why?

If you use Vite on your localhost (without DDEV), the Vite development server would be accessible at `http://localhost:5173/`.

Now we need it make it accessible via `https://test-vite.ddev.site:5173`.

Fortunately exposing the port is very simple with DDEV's config option [web_extra_exposed_ports](https://ddev.readthedocs.io/en/stable/users/extend/customization-extendibility/#exposing-extra-ports-via-ddev-router). We add the following to `.ddev/config.yaml` file:

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
php_version: "8.1"
webserver_type: nginx-fpm
xdebug_enabled: false
additional_hostnames: []
additional_fqdns: []
database:
    type: mariadb
    version: "10.4"
use_dns_when_possible: true
composer_version: "2"
web_environment: []
nodejs_version: "18"
web_extra_exposed_ports:
  - name: vite
    container_port: 5173
    http_port: 5172
    https_port: 5173
```

A `ddev restart` is necessary after changing the config.yaml file.

You can check the exposed ports with `ddev describe` after the restart.

_Note: In other tutorials or projects you may come across docker-compose-files in the .ddev/-folder which also take care of exposing the vite port. If you use `web_extra_exposed_ports`, you don't need these files._

### Adjust the Vite config

The last step is to adjust the Vite config to let it know that it will run on `https://test-vite.ddev.site:5173`.

This can be done easily by creating a `vite.config.js` file like this:

```js
import { defineConfig } from 'vite'
import path from 'path'

const port = 5173;
const origin = `${process.env.DDEV_PRIMARY_URL}:${port}`;

// https://vitejs.dev/config/
export default defineConfig({
    // Add entrypoint
    build: {
        // our entry
        rollupOptions: {
          input: path.resolve(__dirname, 'src/main.js'),
        },

        // manifest
        manifest: true
      },

    // Adjust Vites dev server for DDEV
    // https://vitejs.dev/config/server-options.html
    server: {
        // respond to all network requests:
        host: '0.0.0.0',
        port: port,
        strictPort: true,
        // Defines the origin of the generated asset URLs during development
        origin: origin
    },

})
```

Technical explanation:

- We need to define an entry file to let vite know where to start, this is done in `rollupOptions`.
- Also we need to tell vite to respond to all network request, not only the ones addressed to http://localhost:5173. This is done via `host: '0.0.0.0'`.
- The strict port setting is also necessary, because we only exposed port 5173. Without `strictPort: true`, Vite will use other ports like 5174 or 5175 if 5173 is already occupied.
- Another important part is to let Vite know from where to load Vite-controlled assets like images referenced in CSS. This is done via `server.origin`. <br> _(DDEV automatically provides environment variables via the regular `process.env` variable. The variable `process.env.DDEV_PRIMARY_URL` will have the value `https://test-vite.ddev.site` in our demo project. We use it to set the correct `server.origin` dynamically.)_

See Vite's [Server Options](https://vitejs.dev/config/server-options.html) for all settings.

### Test it

Now we need a little test web page.

Let's create the `src/main.js` as our entry file:

```js
import './style.css'

console.log('hello vite!');
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
    <script type="module" src="<?php echo $_SERVER['DDEV_PRIMARY_URL']; ?>:5173/@vite/client"></script>
    <script type="module" src="<?php echo $_SERVER['DDEV_PRIMARY_URL']; ?>:5173/src/main.js"></script>
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

Download the [DDEV Logo](https://github.com/ddev/ddev/blob/master/docs/content/developers/logos/2x/Logo_w_text%402x.png) to `src/images/ddev.png`.

Add this HTML container to your `index.php`:

```
<div id="image-test"></div>
```

Add this to your `src/style.css`:

```
#image-test {
    width: 300px;
    height: 150px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('/src/images/ddev.png');
}
```

Reload the browser (because Vite currently handles CSS and JS changes).

The image is loaded from Vite and is accessible via https://test-vite.ddev.site:5173/src/images/ddev.png for local development. This is ensured by the `server.origin` setting in `vite.config.js`.

_If you want to reload your site when a PHP file changes, you could use plugins like [antfu/vite-plugin-restart](https://nystudio107.com/docs/vite/#live-reload-of-twig-config). Some frameworks like Laravel have support for this in [their plugin](https://laravel-news.com/laravel-blade-hot-refresh-with-vite)._

### Demo repository

You can find the source code for this simple demo here: [mandrasch/ddev-vite-simple-demo](https://github.com/mandrasch/ddev-vite-simple-demo)

### Building for production

This demo only covered the case of using the local development server for hot module reloading.

For production you would first run `ddev npm run build` to generate the optimized files. These will be generated in the `dist/` folder with a hash:

- /dist/assets/main-8811a981.js
- /dist/assets/main-d6825f81.css
- ...

To include these in PHP, you will need to know the hash values. You could set  `build.manifest` to true in Vites config. With this option enabled a `/dist/manifest.json` file is generated on each build, which has reference to all JS and CSS files:

Example:

```
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
    "assets": [
      "assets/ddev-f877fcaa.png"
    ],
    "css": [
      "assets/main-d6825f81.css"
    ],
    "file": "assets/main-8811a981.js",
    "isEntry": true,
    "src": "src/main.js"
  }
}
```

You could now parse the `dist/manifest.json` file dynamically in PHP and get the hashed filename via `$manifest["src/main.js]` and include it on your production site.

This is the point where PHP libraries and CMS integrations come into play which handle this for us. In most cases, you won't need to write this integration yourself (see below).

### Integrate Vite into a framework / CMS

You can read Vite's official guide for backend integration here:

- https://vitejs.dev/guide/backend-integration.html

Vite also has a list of integrations here:

- https://github.com/vitejs/awesome-vite#integrations-with-backends

But how do we use these integrations with DDEV?

The main goal for us is the same as above - we need to use Vite from https://your-project.ddev.site:5173/, not from http://localhost:5173. So adding the `server` settings to `vite.config.js` is necessary in all cases.

```
# .ddev/config.yaml
web_extra_exposed_ports:
  - name: node-vite
    container_port: 5173
    http_port: 5172
    https_port: 5173
```

A `ddev restart` is necessary afterwards.

The tricky part:

CMS integrations for Vite can use different approaches.

Some have official support for Docker and DDEV, others may need a little bit of tweaking.

### List of PHP CMS integrations

Here is a list of example integrations I know so far.

_**Did I miss an integration? Please let me know!**_

#### General PHP example

André Felipe has published https://github.com/andrefelipe/vite-php-setup as general example for Vite in PHP projects.

For DDEV you need to change the `const VITE_HOST` to `"".$_SERVER['DDEV_PRIMARY_URL'].":5173"` in `public/helpers.php`.

Also you might need to change the `isDev()` function.

#### CraftCMS

The [Vite plugin by nystudio107](https://nystudio107.com/docs/vite/) has official DDEV support. Here is a guide to change `vite.config.js` and `config/vite.php` accordingly: [Using DDEV](https://nystudio107.com/docs/vite/#using-ddev).

_Note: You don't need to use the docker-compose-file for exposing the ports if you already used `web_extra_exposed_ports`._

Example repositories:

- [mandrasch/ddev-craftcms-vite](https://github.com/mandrasch/ddev-craftcms-vite)

#### Drupal

I found this module:

- https://www.drupal.org/project/vite

But I could not find more info regarding DDEV usage. Happy to update this section with a better link / suggestion!

#### Laravel

Since June 2022 [Vite is the default bundler for Laravel](https://laravel-news.com/vite-is-the-default-frontend-asset-bundler-for-laravel-applications), replacing Laravel Mix (Webpack).

First, expose the port via `.ddev/config.yaml` and run `ddev restart`:

```
# .ddev/config.yaml
web_extra_exposed_ports:
  - name: node-vite
    container_port: 5173
    http_port: 5172
    https_port: 5173
```

Afterwards, you just need to change the `vite.config.js` like this:

```
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

const port = 5173;
const origin = `${process.env.DDEV_PRIMARY_URL}:${port}`;

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
    ],
    server: {
        // respond to all network requests
        host: '0.0.0.0',
        port: port,
        strictPort: true,
        // Defines the origin of the generated asset URLs during development,
        // this will also be used for the public/hot file (Vite devserver URL)
        origin: origin
    }
});
```

The devserver can be started via `ddev npm run dev`.

Example repository:

- [mandrasch/ddev-laravel-vite](https://github.com/mandrasch/ddev-laravel-vite)

Note: Laravel's Vite integration is a bit special, because it has its own npm integration with a so called `public/hot` file.

#### TYPO3

Florian Geierstanger made a first demo publicly available:

- https://github.com/fgeierst/typo3-vite-demo

This lead to the development of vite-asset-collector by Simon Praetorius:

- https://github.com/s2b/vite-asset-collector

The usage with DDEV is documented [here](https://github.com/s2b/vite-asset-collector/blob/main/Documentation/DdevSetup.md).

#### WordPress

For WordPress I found these libraries:

- https://github.com/idleberg/php-wordpress-vite-assets
- https://github.com/kucrut/vite-for-wp

Example repository for idleberg/php-wordpress-vite-assets, quick & dirty:

- [mandrasch/ddev-wp-vite-demo](https://github.com/mandrasch/ddev-wp-vite-demo)

#### GitHub Codespaces

Another special case is GitHub Codespaces. This is a bit tricky because DDEVs router will not be used in Codespace environments.

Therefore some adjustments are needed.

I created a first quick & dirty demo with CraftCMS, in which I use another port (5174) for Vite when Codespaces is detected:

- [Setup in Codespaces](https://github.com/mandrasch/ddev-craftcms-vite/tree/main#1-setup-in-codespaces)
- [config/vite.php](https://github.com/mandrasch/ddev-craftcms-vite/blob/main/config/vite.php)
- [vite.config.js](https://github.com/mandrasch/ddev-craftcms-vite/blob/main/vite.config.js)

I guess this could be improved a lot ;-) See [DDEV Installation: Codespaces](https://ddev.readthedocs.io/en/stable/users/install/ddev-installation/#github-codespaces) for more information.

#### Gitpod

I couldn't find a resource where Vite was used with DDEV in Gitpod. Happy to update this section as well with more resources!

### NodeJS

Andy Blum wrote the awesome article [Node.js Development with DDEV](https://www.lullabot.com/articles/nodejs-development-ddev) which explains proxying requests to the correct ports of NodeJS projects running in the web container. This enables use cases like running a classic PHP backend with a NodeJS hosted frontend (on another subdomain of the DDEV project), it's especially great for headless CMS projects.
