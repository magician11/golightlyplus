---
slug: wordpress-feed-in-anjularjs
title: How to display a WordPress feed in an AngularJS app
authors: andrew
---

I have a [landing page](http://www.andrewgolightly.com/) where I wanted to show my latest articles from a [WordPress blog](http://goforself.me/writings/) I have.

It turns out it’s not that hard to do.

First I created a factory to get my WordPress feeds

<!--truncate-->

```js title="WordPressFeedFactory.js"
(function() {

    "use strict";

    var agApp = angular.module('agApp');

    agApp.factory('WordPressFeed', function($http) {

        function getLatestPosts(wpWebsite, numPosts, callback) {

            var feedUrl = wpWebsite + '/feed/';

            // docs for this API: https://developers.google.com/feed/v1/jsondevguide
            $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load', {
                params: {
                    v: '1.0', q: feedUrl, callback:'JSON_CALLBACK', num: numPosts
                }
            })
                .success(function(response) {
                callback(response.responseData.feed.entries);
            });
        }

        return {
            getLatestPosts: getLatestPosts
        };

    });

})();
```

[View this gist on GitHub](https://gist.github.com/magician11/829370d6c02662b159bf)

Then use this factory from some controller

```js title="someController.js"
(function() {

    "use strict";

    var agApp = angular.module('agApp');

    agApp.controller('MainCtrl', function(WordPressFeed) {

        var vm = this;

        /* Get the latest articles from Go For Self */
        /* ---------------------------------------- */
        WordPressFeed.getLatestPosts('http://www.goforself.me', 3, function(data) {
            vm.wpFeed = data;
        });
    });

}());
```

[View this gist on GitHub](https://gist.github.com/magician11/35569312c39181ebcea2)

Then use this data in a view like this

```html title="wpArticleView.html"
<!-- Recent articles (using Zurb's Foundation framework) -->
<section class="row">

    <h3 class="ag-section-heading"><i class="fa fa-pencil"></i> Recent articles</h3>

    <ul class="medium-block-grid-3">
        <li ng-repeat="wpArticle in ag.wpFeed">
            <h4>{{wpArticle.title}}</h4>
            <p>{{wpArticle.contentSnippet}} <a ng-href="{{wpArticle.link}}">read more</a></p>
        </li>
    </ul>

</section>
```

[View this gist on GitHub](https://gist.github.com/magician11/7cecd8bbf401a934bf35)

And that’s it! Pretty simple 🙂

Working demo at the bottom of [this page](http://www.andrewgolightly.com/).
