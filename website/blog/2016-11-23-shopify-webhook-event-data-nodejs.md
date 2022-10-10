---
slug: shopify-webhook-event-data-nodejs
title: How to listen to Shopify webhook event data with Node.js
authors: andrew
---

Shopify provides webhooks for stores. What is a webhook?

Webhooks are a useful tool for apps that want to execute code after a specific [event](https://help.shopify.com/api/reference/webhook#events) happens on a shop, for example, after a customer creates a cart on the storefront, or a merchant creates a new product in their admin.

 — https://help.shopify.com/api/tutorials/webhooks#about-webhooks


<!--truncate-->

So let’s say we want to notify a fulfilment house (to process and ship our product) as soon as a new order is created on our Shopify store. The fulfilment house may have a very specific format in which they accept an order. So we could write a script that takes the data that Shopify sends us after an order is made, re-format it for the 3rd party, and then do a POST request to them.

There are a few steps to get this done.

### Setup the webhook on Shopify

First.. we need to setup a webhook on our Shopify store that calls our script everytime an order is made.

[fusion_imageframe image_id=”992″ style_type=”none” stylecolor=”” hover_type=”none” bordersize=”” bordercolor=”” borderradius=”” align=”none” lightbox=”yes” gallery_id=”” lightbox_image=”” alt=”” link=”” linktarget=”_self” hide_on_mobile=”small-visibility,medium-visibility,large-visibility” class=”” id=”” animation_type=”” animation_direction=”left” animation_speed=”0.3″ animation_offset=””]http://golightlyplus.com/wp-content/uploads/2016/11/create-webhook-button.png[/fusion_imageframe]

 

Then we need to select which event we want to trigger for our server to be called. In this example it’ll be “Order creation”.

 

[fusion_imageframe image_id=”995″ style_type=”none” stylecolor=”” hover_type=”none” bordersize=”” bordercolor=”” borderradius=”” align=”none” lightbox=”yes” gallery_id=”” lightbox_image=”” alt=”” link=”” linktarget=”_self” hide_on_mobile=”small-visibility,medium-visibility,large-visibility” class=”” id=”” animation_type=”” animation_direction=”left” animation_speed=”0.3″ animation_offset=””]http://golightlyplus.com/wp-content/uploads/2016/11/Screen-Shot-2016-11-23-at-12.33.24-PM.png[/fusion_imageframe]

 

For the URL, we need:

1. the domain name or IP address of the server. In this case the fictitious IP address is `111.222.33.44`
2. our Node.js server might be running on a specific port, in this case 5555
3. and then for what path we want in our script to start processing the incoming webhook. In this case it will be /new-online-order

### Setting up our script

Secondly, we’ll setup a Node.js server to process the incoming new order data sent from Shopify.

You’ll need Node.js setup on your server. I use [DigitalOcean](https://m.do.co/c/d9c86410119c). To manually setup Node.js on Ubuntu 16.04 [see this guide](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04). Alternatively, DigitalOcean has a [one-click install option for Node.js](https://www.digitalocean.com/products/one-click-apps/node-js/) when creating a droplet with them.

For the script, I’ll be setting up a Node.js server that will use the [Express module](http://expressjs.com/). Shopify sends [a HTTP POST request](https://help.shopify.com/api/tutorials/webhooks#receive-webhook), so we’ll also need the [body-parser module](https://github.com/expressjs/body-parser).

The core code looks like this:

```js title="listen-for-shopify-webhooks.js"
/* eslint-disable no-console */

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/*
Shopify issues a HTTP POST request.
- https://help.shopify.com/api/tutorials/webhooks#receive-webhook
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));


/*
In your Shopify store under..
Settings->Notifications
Click "Create a webhook"
- Choose your event
- Leave the format as JSON
- set the URL with your IP address to your server so it's something like http://123.345.11.22:3800/your-path
Then update the path "your-path" below to match, as well as the port number below.
*/
app.post('/your-path', (req, res) => {
  // let Shopify know we received the order details ok
  res.send('OK');

  // the body of the data received
  const theData = req.body;
  console.log(theData);
});

const portToListenOn = 3800;

/*
On your server run
node listen-for-shopify-webhooks.js
*/
app.listen(portToListenOn, () => {
  console.log(`Listening for Shopify webhook event data on port ${portToListenOn}. Started ${new Date().toString()}`);
});
```

[View this gist on GitHub](https://gist.github.com/magician11/08a226555161d633e21fc2bcf374e708)

The only thing you need to change to get started is on line 31 change the path to /new-online-order and the port on line 40 to 5555.

You can then run this on your server by typing

`node listen-for-shopify-webhooks.js`

### Testing time

Create a new order, and you should see this node server `console.log` a bunch of Shopify data. In this case, it’ll be the new order object where the properties are defined in the [Order API](https://help.shopify.com/api/reference/order).

### Where to from here?

Basically just start writing out your script from line 37 in the gist. You can process the data anyway you like, and email it, post it or do anything else you like from there.

Any questions at all, just ask them below.

Have fun with it!
