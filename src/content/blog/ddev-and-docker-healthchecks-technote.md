---
title: "DDEV and Docker Healthchecks (Tech Note)"
pubDate: 2024-07-22
# modifiedDate: 2024-07-23
summary: "DDEV and Docker Healthchecks (Tech Note)"
author: Randy Fay
#featureImage:
#  src: /img/blog/2024/07/traefik.logo.png
#  alt: Traefik Configuration for DDEV
categories:
  - TechNotes
---

## What are Docker Container Healthchecks?

Docker provides [Container Health Checks](https://docs.docker.com/reference/dockerfile/#healthcheck) as a means of verifying whether a container is behaving correctly, whether its services or configuration are working right. Normally a healthcheck is a script selected via the Dockerfile configuration or a [Docker Compose specification](https://github.com/compose-spec/compose-spec/blob/main/spec.md#healthcheck).

## How does DDEV use Healthchecks?

DDEV's primary use of healthchecks is to make sure that everything is working inside a container before declaring it ready for use (and continuing startup). For example, during `ddev start` DDEV starts `ddev-webserver` and `ddev-dbserver` by issuing a `docker-compose up`. It then waits for `healthy` status on each of these. For `ddev-webserver`, this will mean that the web server is properly able to serve files, that `php-fpm` or `gunicorn` is able to interpret scripts, and that `mailpit` is properly running. On `ddev-dbserver` it will mean that the database server in the `db` container is able to respond to queries and is fully functional.

Without healthchecks, containers will show up as ready when they're actually not. The `ddev-dbserver` is probably most vulnerable to this, because it can take a few seconds for the `mysqld` or `postgres` server to become ready. If we didn't wait for the `healthy` signal, traffic could try to flow before the various components were ready for it, causing ugly failures.

### Avoiding CPU and battery usage

There is one more key trick DDEV does with its healthchecks. During startup, we want to find out as quickly as possible when the container is healthy, so that the start can continue immediately. So we want to test quickly until it's ready. However, after that, not much goes wrong, so we have a tricky healthcheck script that, once the `web` or `db` container has become healthy, slows down the checks to about 60 seconds each. Essentially, if a healthy status has already been detected, the healthcheck script [sleeps 60 seconds](https://github.com/ddev/ddev/blob/master/containers/ddev-webserver/ddev-webserver-base-scripts/healthcheck.sh#L9-L21) to prevent another check from happening, slowing down the checking process and avoiding unnecessary use of CPU and battery.

## How can extra services like add-ons use Healthchecks?

Most extra services added by add-ons should have healthchecks, so that other services (like the web container) don't try to use them before they are ready. Almost all of the java-based services like `solr` and `elasticsearch` need this desperately, because it takes them quite a while to come up, and if PHP code tries to use them before they're ready, things go wrong.

The [ddev-solr](https://github.com/ddev/ddev-solr) add-on's [healthcheck](https://github.com/ddev/ddev-solr/blob/main/docker-compose.solr.yaml#L44-L45) waits until the Apache SOLR server on port 8983 responds successfully to a request by using

```yaml
    healthcheck:
      test: ["CMD-SHELL", "curl --fail -s localhost:8983/solr/"]
```

## Where does DDEV check for `healthy` status

* `ddev start` [checks the `web` and `db` containers for healthy status](https://github.com/ddev/ddev/blob/57465d13d8eab5fb8d6a8e48e5ef5b05f3fc9560/pkg/ddevapp/ddevapp.go#L1430-L1436) before starting any `web_extra_daemons`.
* Then, after everything else is done, `ddev start` waits for all containers including those from additional services like `solr` or `elasticsearch`, etc.

## What are the components of a Healthcheck?

The [Dockerfile](https://docs.docker.com/reference/dockerfile/#healthcheck) and [Compose Spec](https://github.com/compose-spec/compose-spec/blob/main/spec.md#healthcheck) documents explain the syntax of healthcheck.

We'll use the Compose syntax to take a look:

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost"]
  interval: 1m30s
  timeout: 10s
  retries: 3
  start_period: 40s
  start_interval: 5s
```

* `test` is either built into the Docker image or added in the `docker-compose` recipe. In most DDEV core images, it's specified in the Dockerfile, and it's usually in the form of a script, for example, `ddev-webserver`'s [healthcheck.sh](https://github.com/ddev/ddev/blob/master/containers/ddev-webserver/ddev-webserver-base-scripts/healthcheck.sh).
* `interval` and `start_interval` are how often the `test` script or command should be run while we're waiting. Most of our containers are set for 1 second, meaning, that if we keep trying every second on failure. `start_interval` is an override of `interval` for use in the `start_period`, but it can only be used where the Docker server is v25 or greater, so we can't use it consistently yet, as some Docker providers used with DDEV are not to v25 yet.
* `timeout` is how long the system should wait for the `test` before giving up and trying again. 
* `retries` is how many times it will try the `test` before declaring the container `unhealthy`.
* `start_period` is probably the most important for DDEV. If we set the `start_period` to a reasonable value, we can give up waiting for the container at that point:
    > start period provides initialization time for containers that need time to bootstrap. Probe failure during that period will not be counted towards the maximum number of retries. However, if a health check succeeds during the start period, the container is considered started and all consecutive failures will be counted towards the maximum number of retries.


## How long does DDEV wait for the services to become healthy?

During `ddev start` we wait for the maximum of all containers' `start_period` or the [`default_container_timeout`](https://ddev.readthedocs.io/en/stable/users/configuration/config/#default_container_timeout) value from `.ddev/config.yaml`

The default value for the wait time is 120s. In other words, DDEV will wait for 120s for all containers to become ready unless `default_container_timeout` is set to a different value. 

## What about `ddev snapshot restore` ?

`ddev snapshot restore` is a very special case, because we're starting the `ddev-dbserver` with a specific job to do, and it can't be declared healthy until after that job is done. And that job is a restore using `mariabackup`, `xtrabackup`, or `pg_dump`. 

Some people have huge databases to restore using `snapshot restore`, so 

* During restore, we [raise](https://github.com/ddev/ddev/blob/57465d13d8eab5fb8d6a8e48e5ef5b05f3fc9560/pkg/ddevapp/snapshot.go#L228) the `default_container_timeout` to 600s (10 minutes) to give some extra space.
* That still isn't enough for some huge databases, so it's possible to change the `.ddev/config.yaml` value of `default_container_timeout` to a larger value.

## Isn't this all a little confusing?

Yes, it's confusing. I wrote this tech note because I have already struggled with doing this wrong more than once, and am in the process of fixing the code yet another time in [default_container_timeout not working](https://github.com/ddev/ddev/issues/5133). The key confusion for me has been the idea of `timeout` in Docker, which is "when to give up on the healthcheck command", and the idea of `default_container_timeout` in DDEV, which is "how long should I wait for the container to become ready". For DDEV, the idea most closely related to "how long should I wait" is the `start_period` in Docker Compose.

## Contributions welcome!

Your suggestions to improve this tech note are welcome. You can do a PR to this blog adding your techniques. Info and a training session on how to do a PR to anything in ddev.com is at [DDEV Website For Contributors](/blog/ddev-website-for-contributors/).

Join us for the next [DDEV Live Contributor Training](/blog/contributor-training/). Sign up at [DDEV Live Events Meetup](https://www.meetup.com/ddev-events/events/).
