---
slug: interview-with-toptal
title: My interview process with Toptal
authors: andrew
---

[Toptal](http://www.toptal.com/) connects top freelance developers with various companies.

So I was keen. More freelance work sounded good to me. The interview process was fairly intense.

**Stage 1** involved chatting with some guy who asked relatively general questions. Pretty sure the main objective was to assess my English level.

<!--truncate-->

**Stage 2** was an automated online test on [Codility](https://codility.com/). There were 3 questions. The first one was relatively straight forward, but the second one on negabinary stumped me. I went blank.. maybe due to the time pressure. I had 90mins to complete the test. Of course afterwards I worked out how to do it by implementing an AngularJS app that converted any decimal number to negabinary. You can see a working demo [here](http://dev.golightlyplus.com/playground/negabinary/). It’ll even display how the calculation was made. [Source code on GitHub](https://github.com/magician11/negabinary). Essentially implemented using an AngularJS filter.

```js title="negabinary.js"
var negabinaryApp = angular.module('negabinaryApp', []);

negabinaryApp.filter('negabinary', function() {

    return function (decimal) {

        if (isNaN(decimal)) return "not a number";
        
        var negabinary = [];
        var base = -2;
        var remainder;

        while(decimal != 0) {

            remainder = decimal % base;
            decimal = Math.ceil(decimal / base);
            negabinary.push(remainder >= 0 ? remainder : -remainder);
        }

        return negabinary.reverse().join('');
    }
});
```

[View this gist on GitHub](https://gist.github.com/magician11/92af987c9632f53ff658)

 

The **3rd stage** was to do live coding examples while being watched by another developer via Skype screenshare. Something about being watched unnerved me. I didn’t get through the first task which I had 20 mins to do. So my application was rejected. It was a fairly simple jQuery task on adding and removing elements. Again, I sat down and worked it out soon after my interviewer left. My final solution is on [JSFiddle here](https://jsfiddle.net/magician11/7tyuq1vf/1/).

Apparently I can re-apply in a month!

Hope that helps someone out there 🙂