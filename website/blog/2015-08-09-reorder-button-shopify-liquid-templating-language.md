---
slug: reorder-button-shopify-liquid-templating-language
title: How to create a reorder button with Shopify’s Liquid templating language
authors: andrew
---

Let’s say on the the account page in Shopify, you want to add a reorder button that when clicked automatically adds all items for a previous order to the cart.

One strategy is to use [a cart permalink](https://docs.shopify.com/manual/configuration/store-customization/page-specific/cart-page/cart-permalinks), in the following format:

    http://yourstore.com/cart/#{variant_id}:#{quantity}(,…)

So  by adding an item’s variant_id and quantity to the end of the URL, you can create a button or link that will populate the cart with that item. And you can append as many items as you want separated by commas.

So the question is, how to automatically construct that URL for each previous order? It’s done like so…

<!--truncate-->

```html title="reorder-button.html"
{% for order in customer.orders %}

  {% assign reorder_url = "" %}
    {% for line_item in order.line_items %}
      {% capture reorder_url %}{{ reorder_url | append: line_item.variant_id | append: ':' | append: line_item.quantity | append: ',' }}{% endcapture %}
  {% endfor %}

  <a href="{{ '/cart/' | append: reorder_url }}" class="button tiny">reorder</a>
{% endfor %}
```

[View this gist on GitHub](https://gist.github.com/magician11/bb78111647af5e96c901)

There is a redundant comma added onto the end of the URL, but Shopify ignores it when processing the URL’s parameters. So to keep things simple, I didn’t write the rather lengthy Liquid code to remove that last character.

Hope that helps someone!