---
slug: encryption-to-javascript-app
title: How to add encryption (https) to your JavaScript application
authors: andrew
---

I hadn’t given too much thought to encrypting the traffic to my applications, until developing for 3rd party services like [Facebook Messenger](https://developers.facebook.com/docs/graph-api/webhooks#setup) or using [service workers](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers#you_need_https) require your server to use https.

For a full stack JavaScript application we need to setup encrypt on both the front-end and the back-end.

<!--truncate-->

### Front-End Encryption

I’m serving my files (fonts, HTML, JS) over Apache on Ubuntu 16.04 on [DigitalOcean](https://m.do.co/c/d9c86410119c).

Today I setup encryption for [chiangmaimovies.com](https://www.chiangmaimovies.com/) I already had setup [the Virtual Host](https://www.digitalocean.com/community/tutorials/how-to-set-up-apache-virtual-hosts-on-ubuntu-16-04) for this domain. To add encryption I followed [this guide to Secure Apache with Let’s Encrypt](https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-ubuntu-16-04).

It was as simple as..

`apt-get update`

`apt-get install python-letsencrypt-apache`

`letsencrypt --apache -d chiangmaimovies.com`

I then answered a prompt on choosing to get all traffic redirected to https. And that’s it!