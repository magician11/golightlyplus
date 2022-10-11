---
slug: alphabetize-articles-in-shopify
title: How to alphabetically sort articles in Shopify
authors: andrew
---

There doesn’t seem to be an easy way to sort articles in Shopify by title.

Inspired by [this article](https://ecommerce.shopify.com/c/ecommerce-design/t/sort-a-blog-alphabetically-i-was-so-close-46449), I developed a workaround for a single page of articles (i.e. with no pagination).

The procedure is as follows:

<!--truncate-->


1. Get Liquid to output all the HTML for the articles
    1. Give the root node of the list an id to reference later.
    2. For each article, set the class attribute to be what you want to sort on later.
2. Use jQuery to grab the articles and do a sort based on that class value.
3. Then append that sorted list back to the root node.

```html title="shopify-article-sort.html"
<ul id="artists" class="medium-block-grid-4">
    {% for artist in blog.articles %}
    {% capture artist-name %}{{ artist.title | downcase }}{% endcapture %}
    <li class="{{artist-name}}">
      <a href="{{ artist.url }}">
        <div class="artist-excerpt">{{ artist.excerpt }}</div>
        <div class="artist-name">{{ artist.title }}</div>
        <div class="country">{{ artist.metafields.global.country }}</div>
      </a>
    </li>
    {% endfor %}
</ul>

<script>

  function sortArtists(id) {

    function getLastName(artistElement) {
      return artistElement.className.split(' ').splice(-1,1);
    }

    var dataTree = $('#' + id);
    var artists = dataTree.children('li').get();

    artists.sort(function(a, b) {
      var lastNameA = getLastName(a);
      var lastNameB = getLastName(b);
      return (lastNameA < lastNameB) ? -1 : 1;
    });

    $(artists).appendTo(dataTree);
  }

  sortArtists("artists");

</script>
```

[View this gist on GitHub](https://gist.github.com/magician11/0f400da0d1efed676314)