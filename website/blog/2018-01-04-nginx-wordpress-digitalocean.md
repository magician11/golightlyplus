---
slug: nginx-wordpress-digitalocean
title: How to setup Nginx for WordPress on DigitalOcean
authors: andrew
tags: [digitalocean]
---

I decided to switch from Apache to Nginx.

I have a couple of WordPress sites on a DigitalOcean droplet, so I needed to reconfigure them to be used with Nginx. I basically followed [this guide](https://www.digitalocean.com/community/tutorials/how-to-install-wordpress-with-lemp-on-ubuntu-16-04) which was great for most of it, but I was still not getting the sites loading properly (404 errors, forbidden).

I needed to tweak the server block files to get it working, and this is what I came up with...

<!--truncate-->

In `/etc/nginx/sites-available` create a separate file for each domain you’re hosting. For one of mine, I called it `goforself.me` to correspond with a previous website called Go For Self. This is the contents of that file…

```
server {
        server_name www.goforself.me goforself.me;
        listen 80;
        client_max_body_size 20M;
        port_in_redirect off;
        access_log   /var/log/nginx/goforself.me.access.log;
        error_log    /var/log/nginx/goforself.me.error.log error;

        root /var/www/goforself;
        index index.php;

        location / {
                try_files $uri $uri/ /index.php?$args;
        }

        # Cache static files for as long as possible
        location ~*.(ogg|ogv|svg|svgz|eot|otf|woff|mp4|ttf|css|rss|atom|js|jpg|jpeg|gif|png|ico|zip|tgz|gz|rar|bz2|doc|xls|exe|ppt|tar|mid|midi|wav|bmp|rtf|cur)$ {
        expires max;
        log_not_found off;
        access_log off;
        }

        # Deny public access to wp-config.php
        location ~* wp-config.php {
                deny all;
        }

        location ~ \.php$ {
                try_files $uri =404;
                include fastcgi_params;
                fastcgi_pass unix:/run/php/php7.0-fpm.sock;
                fastcgi_split_path_info ^(.+\.php)(.*)$;
                fastcgi_param  SCRIPT_FILENAME $document_root$fastcgi_script_name;
        }
}
```

> [View this gist on GitHub](https://gist.github.com/magician11/aa5f34fb12f267fe11672e6e32fba506)

Then in `/etc/nginx/sites-enabled/` create a symlink like so

`ln -s ../sites-available/goforself.me .`

I like to have my sites being only accessed over HTTPS, so there are a couple more steps to get this going. I basically followed [this guide](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04), and this is the essence of what needs to be done..

First install certbot

```
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
```

> [View this gist on GitHub](https://gist.github.com/magician11/4be656ba1c8c88708361a73a94c3497d)

For the previous Go For Self website setup above, I then type

`sudo certbot --nginx -d goforself.me -d www.goforself.me`

and I choose option 2 to always redirect to HTTPS.

And that is pretty much it. You’ll need to restart nginx to get it going.. so I go

`service nginx restart`

Any questions, let me know!
