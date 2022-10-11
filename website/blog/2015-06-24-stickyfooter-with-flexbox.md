---
slug: stickyfooter-with-flexbox
title: Creating a stickyfooter with flexbox (and Foundation)
authors: andrew
---

The other day I realised I needed to create a stickyfooter for my app. i.e. getting something to always stay at the bottom of the page. This is needed when there is not much content on the page itself.

Probably the most popular method today is using [Ryan Fait’s method](http://ryanfait.com/resources/footer-stick-to-bottom-of-page/).

However, this method still requires a fair bit of code, and assumes you know the height of your footer.

<!--truncate-->

I didn’t know the height of my footer as I am dynamically inserting a new quote everytime.

And then I discovered [flexbox](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes). It makes solving a lot of traditionally tricky CSS issues rather trivial. Check out [Solved by Flexbox](http://philipwalton.github.io/solved-by-flexbox/) to see examples of this.

I really like using [Zurb’s Foundation CSS framework](http://foundation.zurb.com/), but they don’t offer a standard solution for stickyfooters. I didn’t want to stop using Foundation, and wasn’t sure if flexbox was going to conflict with Foundation’s Grid layout. So I coded something up to test. And it works great..

See the Pen Creating a [stickyfooter with flex](http://codepen.io/magician11/pen/jPaKKm/). by magician11 ([@magician11](http://codepen.io/magician11)) on [CodePen](http://codepen.io/)