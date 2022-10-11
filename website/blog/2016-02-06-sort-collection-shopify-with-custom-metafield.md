---
slug: sort-collection-shopify-with-custom-metafield
title: How to sort a collection in Shopify using a custom metafield
authors: andrew
---

Shopify allows you to sort a collection of products using one of the following criteria:

- best-selling
- title-ascending
- title-descending
- price-ascending
- price-descending
- created-ascending
- created-descending

<!--truncate-->

— ([source](https://docs.shopify.com/themes/liquid-documentation/objects/collection#collection-default_sort_by))

A client of mine has a collection of products that are all events. So they have a date attached as to when the event will be happening. And he wanted the events to be sorted by this custom date metafield.

He used [metafields2](https://apps.shopify.com/metafields2) to add the extra fields.

Our solution was to add a data attribute to every product rendered by liquid. Then use jQuery to sort the DOM elements based on the value of that attribute’s value if the sort_by parameter in the URL was our custom metafield.

```html title="sort-by-custom-metafield.html"
<!--
This code displays the dropdown for the options to sort from.
Adapted from https://gist.github.com/carolineschnapp/11352987
It will be inserted on every collections page. Probably in a snippet called something like collection-sorting.liquid 
-->

<div class="form-horizontal">
  <label for="SortBy" class="uppercase">{{ 'collections.sorting.title' | t }}&nbsp;</label>
  <select name="SortBy" id="SortBy">
    <option value="upcoming-events">Upcoming events</option>
    <option value="best-selling">{{ 'collections.sorting.best_selling' | t }}</option>
    <option value="title-ascending">{{ 'collections.sorting.az' | t }}</option>
    <option value="title-descending">{{ 'collections.sorting.za' | t }}</option>
  </select>
</div>

<script>
  Shopify.queryParams = {};
  if (location.search.length) {
    for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
      aKeyValue = aCouples[i].split('=');
      if (aKeyValue.length > 1) {
        console.log(aKeyValue);
        Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
      }
    }
  }

  $(function() {
    $('#SortBy')
      .val('{{ collection.sort_by | default: 'upcoming-events' }}')
      .bind('change', function() {
        Shopify.queryParams.sort_by = jQuery(this).val();
      console.log(Shopify.queryParams);
        location.search = jQuery.param(Shopify.queryParams);
      }
    );
  });
</script>

<!--
This code is the modification needed for each product rendered by liquid.
We need to tag each product with the custom metafield here.
You'll probably be editing a snippet like product-grid-item.liquid
-->
<div data-date="{{ product.metafields.global.date }}">
  <!-- the rest of your product ... -->
</div>

<!--
Then in the collection.liquid template itself:
1.
First make sure that all products appear on the one page by increasing
the paginate by amount. I've set it to 100 in my case.
2.
Then we check what is being sorted on. If it's the custom metafield we
re-arrange the DOM elements using this code.
Adapted from http://trentrichardson.com/2013/12/16/sort-dom-elements-jquery/
-->

{% paginate collection.products by 100 %}

<script>
  
  var searchQuery = /sort_by=(.+)/g.exec(window.location.search);
  
  if(searchQuery === null || searchQuery[1] === 'upcoming-events') {
  	var eventListContainer = $('.event-container');
  	var eventList = eventListContainer.children('div');
  
  	eventList.sort(function(a,b) {
    
    	var event1date = new Date(a.getAttribute('data-date'));
    	var event2date = new Date(b.getAttribute('data-date'));

		if(event1date > event2date) {
			return 1;
		}
		if(event1date < event2date) {
			return -1;
		}

    	return 0;
  	});
  
  	eventList.detach().appendTo(eventListContainer);
  }  
</script>
```

[View this gist on GitHub](https://gist.github.com/magician11/86f2e28d58f4accbd70f)