---
slug: nodejs-digitalocean
title: How to setup a Node.js server on DigitalOcean
authors: andrew
---

[Once your droplet is created](https://www.digitalocean.com/community/tutorials/how-to-create-your-first-digitalocean-droplet) and you’ve ssh’d in, it’s time to set some things up..

I start off by installing nvm. You can find the command for the install script [here](https://github.com/creationix/nvm#install-script). At the time of writing, I used

<!--truncate-->

`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash`

I needed to exit my terminal, and then ssh back in.

Then, for me, I want the latest LTS from [Node.js](https://nodejs.org/en/) installed.

So I run `nvm install --lts`

Also  I want the lts versions to be my default node with nvm.

So type `nvm alias default lts/*`

As a personal preference I then clone out my repo to `/var/server`

Once in there, of course run `npm install`

Then I like to setup [forever](https://github.com/foreverjs/forever), so I can make sure the server runs indefinitely.

`npm install -g forever`

Then it’s just a matter of starting up your server. So something like

`forever start my-server.js`




