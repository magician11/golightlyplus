---
slug: use-fallback-image-for-slider
title: How to use a fallback image for a slider
authors: andrew
---

I created a slideshow that grabbed images from an external server. But doing work on my localhost, if the Internet went down, the slideshow broke. So I wanted to figure out how to use a local fallback image so I could keep developing even if the Internet failed.

Turns out it’s quite simple. (my solution inspired by [this answer](http://stackoverflow.com/a/1588899/2813041) on stackoverflow)

<!--truncate-->

The `<img>` tag has an onerror attribute that you can use to set a fallback image in.

Here is a cutdown version of my code…

```html title="fallback-image.html"
<section class="slider">
  <img src="andrew-and-artist.jpg" onerror='this.src="./andrew-and-artist.jpg"' />
  <nav class="slider-nav">
    <ul>
      <li class="arrow">
        <a href="#"><i class="fa fa-long-arrow-left"></i></a>
      </li>
      <li class="arrow">
        <a href="#"><i class="fa fa-long-arrow-right"></i></a>
      </li>
    </ul>
  </nav>
</section>

<script type="text/javascript">

  $('.arrow').on('click', function(e) {

    e.preventDefault(); //  stop the page reloading

    $('.slider img').prop('src', 'http://lorempixel.com/1000/600/abstract?' + Math.random());
  });

</script>
```

[View this gist on GitHub](https://gist.github.com/magician11/4991096810c8e441b2d2)

Hope that helps someone!