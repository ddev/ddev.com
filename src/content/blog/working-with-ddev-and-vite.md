---
title: "Working with DDEV and vite"
pubDate: 2023-10-28
modifiedDate: 2023-10-28
summary: How to work with vite in DDEV?
author: Randy Fay
featureImage:
  src: /img/blog/2023/08/contributors-working.png
  alt: Contributors working together on DDEV
categories:
  - Community
---

## Working with DDEV and vite

Vite is a popular and fast web development tool that serves your JavaScript and CSS code in a clever way: Instead of bundling everything like Webpack, it uses a technique called "hot module reloading" to instantly update and show your changes in the browser while you're working on your website. Vite is written in NodeJS.

How can we use it within DDEV?

DDEV has support for [NodeJS](https://ddev.readthedocs.io/en/latest/users/usage/cli/#nodejs-npm-nvm-and-yarn). All we need to do is expose the vite development server ports and adjust the vite config for usage in DDEV. 

Let us start with a simple example project, we will use vite version 4 for this. 

First we create a new DDEV project called `test-vite`: 

```
mkdir test-vite
cd test-vite
ddev config --project-type=php
ddev start
```

We create a new package.json file:

```
ddev npm init -y
```

Now we can install the [vite npm package](https://www.npmjs.com/package/vite) as development dependency:

```
ddev npm i vite --save-dev
```

Afterwards we need to add these script commands to the package.json:

```
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
```

Also we need to add this:

```
type: "module"
```

The final `package.json` is as follows :

```
{
  "name": "vite-starter",
  "version": "1.0.0",
  "description": "",
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
    "vite": "^4.4.11"
  }
}
```

Now vite is ready to go, but there is one important step ahead of us: Exposing the vite port.

### Expose the vite port

Vite is installed within DDEV, but we can't access it from outside of the docker container yet. We need to expose port `5173`. 

Why? If you use vite on your localhost without DDEV, the vite development server would start up at `http://localhost:5173/`. 

Now we need it to run at `https://test-vite.ddev.site:5173`.

Fortunately this is very simple with DDEV's config option [web_extra_exposed_ports](https://ddev.readthedocs.io/en/latest/users/extend/customization-extendibility/#exposing-extra-ports-via-ddev-router). We just add the following to `.ddev/config.yaml` file: 

```
web_extra_exposed_ports:
  - name: vite
    container_port: 5173
    http_port: 5172
    https_port: 5173
```

This is our resulting `.ddev/config.yaml` file:

```
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

A `ddev restart` is necessary now, so that these changes take effect. ⚠️ 

You can check the port configs with `ddev describe` after restart.

_Note: In other projects you might come across docker-compose-files in the .ddev/-folder which also take care of exposing the vite port._

### Adjust the vite config

The last step is to adjust the vite config by creating a `vite.config.js`: 

```
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

    // Adjust vites dev server for DDEV
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

Explaination:

We need to define an entry file to let vite know where to start, this is done in `rollupOptions`. 

Also we need to tell vite to respond to all network request, not just the ones addressed to http://localhost. This is done via `host: '0.0.0.0',`.

Strict port is also necessary, because we only exposed port 5173. Without `strictPort: true`, vite will just use port 5174, 5175, ... if 5173 is already occupied.

Another important part is to let vite know from where to load vite-controlled assets like images referenced in CSS. This is done via `server.origin`. DDEV automatically provides environment variables inside `process.env`. The variable `process.env.DDEV_PRIMARY_URL` will have the value `https://test-vite.ddev.site` in our case. We use it to set the correct `server.origin`. 

See https://vitejs.dev/config/server-options.html for all infos.

### Test it with hello world

Now we just need a little test website.

Let's create the `src/main.js` as our entry file:

```
import './style.css'

console.log('hello vite!');
```

Alongside create the file `src/style.css`:

```
body{
    font-family: sans-serif;
}

p{
    color: darkslateblue;
}

```

And we will need a simple PHP index file of course, put it in the root folder as `index.php`:

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello vite!</title>

    <!-- This is just an example for local development, no full integration: -->
    <script type="module" src="<?php echo $_SERVER['DDEV_PRIMARY_URL']; ?>:5173/@vite/client"></script>
    <script type="module" src="<?php echo $_SERVER['DDEV_PRIMARY_URL']; ?>:5173/src/main.js"></script>
    <!-- see https://vitejs.dev/guide/backend-integration.html -->

</head>

<body>
    <h1>Hello, vite!</h1>
    <p>This is a simple test for hot module reloading.</p>
</body>

</html>
```

Run `ddev launch` to open https://test-vite.ddev.site/ in the browser.

Now we need to start vite for local development:

```
ddev npm run dev
```

Reload the browser. 

If you change something in `style.css` or `main.js`, you should see it immediately change on the website (without a full page relod).

You can also open https://test-vite.ddev.site:5173/@vite/client and https://test-vite.ddev.site:5173/src/main.js to see if vites dev server is accessible.

### Test with an image

Vite also optimizes images referenced in CSS. These are also loaded from vites dev server for local production.

Download the [DDEV Logo](https://github.com/ddev/ddev/blob/master/docs/content/developers/logos/2x/Logo_w_text%402x.png) to `src/images/ddev.png`.

Add this HTML container to your `index.php`:

```
<div id="image-test"></div>
```

Add this to your `src/style.css`:

```
#image-test{
    width: 300px;
    height: 150px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('/src/images/ddev.png');
}
```

The image is loaded from vite and is accessible via https://test-vite.ddev.site:5173/src/images/ddev.png for local development. This is ensured by the `server.origin` setting in `vite.config.js`. 

### Building for production

This demo only covered the case of using the local development server for hot module reloading.

For production you would first run `ddev npm run build` to generate the optimized files. These will be generated in the `dist/` folder with a hash:

Example output:
- /dist/assets/main-8811a981.js
- /dist/assets/main-d6825f81.css

To include these in PHP, you will need to know the hash values. You can set  `build.manifest` to true in vites config. With this enabled a `/dist/manifest.json` file is generated on each build, which has reference to all js and css files:

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

You could now read the `dist/manifest.json` file dynamically in PHP and get the hashed filename via `$manifest["src/main.js]` to include it on production.

That is the point where PHP libraries and CMS integrations come into play which handle this for us. In most cases, you won't No need to write this yourself.

### CMS integrations

You can read vites official guide for backend integration here: 

https://vitejs.dev/guide/backend-integration.html

The main goal forus is the same as above - we need to use vite from https://your-project.ddev.site:5173/, not from http://localhost:5173. So adding the `server`-settings to `vite.config.js` is necessary.

The tricky part: CMS integrations for vite can use different approaches. Some have official support for Docker and DDEV, others may need a little bit of tweaking. 

You will always need to expose the port via `.ddev/config.yaml`. 

```
# .ddev/config.yaml
web_extra_exposed_ports:
  - name: node-vite
    container_port: 5173
    http_port: 5172
    https_port: 5173
```

A `ddev restart` is necessary afterwards.

Here is a list of example integrations I know so far:

### General PHP example

André Felipe has published https://github.com/andrefelipe/vite-php-setup as general example. 

For DDEV you need to change the `const VITE_HOST` to `"".$_SERVER['DDEV_PRIMARY_URL'].":5173"` in `public/helpers.php`. Also you mightneed to change the `isDev()` function. 

#### CraftCMS 

The plugin has official DDEV support, here is a guide to change `vite.config.js` and `config/vite.php` accordingly: https://nystudio107.com/docs/vite/#using-ddev

_Note: You don't need to use the docker-compose-file for exposing the ports if you already used `web_extra_exposed_ports`._

Example repository: [mandrasch/ddev-craftcms-vite](https://github.com/mandrasch/ddev-craftcms-vite)

### Drupal?

I found this https://www.drupal.org/project/vite plugin, 

#### Laravel

Since [June 2022 vite is the default bundler for Laravel](https://laravel-news.com/vite-is-the-default-frontend-asset-bundler-for-laravel-applications). Laravel is a bit special, it has its own special npm integration with a so called `hot` file. 

You need to change the `vite.config.js` like this:

```
 server: {
    // respond to all hosts
    host: '0.0.0.0',
    strictPort: true,
    port: 5173,
    hmr: {
        // Force the Vite client to connect via SSL
        // This will also force a "https://" URL in the public/hot file
        protocol: 'wss',
        // The host where the Vite dev server can be accessed
        // This will also force this host to be written to the public/hot file
        host: `${process.env.DDEV_HOSTNAME}`
    }
},
```

Example repository: [mandrasch/ddev-laravel-vite](https://github.com/mandrasch/ddev-laravel-vite)


#### TYPO3

Florian Geierstanger first made a demo publicly available:

- https://github.com/fgeierst/typo3-vite-demo


This lead to the development of vite-asset-collector by Simon Praetorius:

https://github.com/s2b/vite-asset-collector

#### WordPress

I found these libraries:

- https://github.com/idleberg/php-wordpress-vite-assets
- https://github.com/kucrut/vite-for-wp

Example repository for idleberg/php-wordpress-vite-assets, quick & dirty: [mandrasch/ddev-wp-vite-demo](https://github.com/mandrasch/ddev-wp-vite-demo)

**Did I miss an integration? Please let me know!**

Vite also has a list of integrations here: https://github.com/vitejs/awesome-vite#integrations-with-backends

### Special case: GitHub Codespaces

- other port, DDEV ROUTER ... --> example repository ... 

TODO: GITPOD?

