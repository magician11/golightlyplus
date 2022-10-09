---
slug: currency-conversion-app
title: How To Create Your Own Currency Conversion App
authors: andrew
---

For a recent Shopify job, I had to update a variety of prices by converting them to a different currency.

I found this great API from [Fixr.io](http://fixer.io/). It’s super fast to use (response times in less than 7ms), and responses themselves are simple JSON objects. The exchange rates are updated almost every day from the [European Central Bank](http://www.ecb.europa.eu/stats/exchange/eurofxref/html/index.en.html).

<!--truncate-->

To demo it to you, I decided to build a currency conversion app that converted USD to NZD. You can view and play with this app online [here](https://apps.golightlyplus.com/currency-conversion/).

The source code for it is all on GitHub as a gist:

https://gist.github.com/magician11/3e26a4f6c4bcb5621538169c1a2c4df0

What I realised that’s kinda amazing after I built this, is that a currency conversion app can be built in less than 75 lines of code. And that includes all the comments and styling. I also used the [numeral.js](http://numeraljs.com/) library to format the numbers and [jQuery](https://jquery.com/) for the DOM updates and Ajax request.

And, here is a video overview of the whole process you can watch:

<iframe width="100%" height="315" src="https://www.youtube.com/embed/wfrztPhxsTc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Any questions or comments [let me know](/contact)! Thanks!
