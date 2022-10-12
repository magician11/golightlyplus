---
slug: vendor-prefixes-css3-animations-scss
title: Vendor prefixes for CSS3 animations using SCSS
authors: andrew
---

As new CSS3 features get released, browsers can implement those features before they become completely stabilised.

The current list of browser prefixes are

```
    -moz- /* Firefox */
    -webkit- /* Safari, Chrome, Android, iOS */
    -o- /* Opera */
    -ms- /* Internet Explorer */
```

<!--truncate-->

So if I wanted to create a flyIn effect for an image, I’d need to add vendor prefixes for

- [the keyframes rule](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)
- [the transform property](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
- [the animation property](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)

For not that much code initially, the vendor prefixes required would blow out the size of the final CSS. Not to mention making errors far more likely.

Using [Sass](http://sass-lang.com/) (with the SCSS syntax), we can define [mixins](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#mixin-arguments) to generate all the vendor prefixes for our CSS code.

First up, define a general vendor prefixer

```scss title="vendor-prefixes.scss"
/* Usage:
@include vendor-prefixes(transform, 'scale(0, 0)');
*/

@mixin vendor-prefixes($property, $values) {
    -webkit-#{$property}: #{$values};
    -moz-#{$property}: #{$values};
    -ms-#{$property}: #{$values};
    -o-#{$property}: #{$values};
    #{$property}: #{$values};      
}
```

[View this gist on GitHub](https://gist.github.com/magician11/586dc9f94d131a067b81)

and then define a mixin for the keyframes

```scss title="keyframes.scss"
/* Usage
@include keyframes(my-transition) {
    from {opacity: 0;}
    to {opacity: 1;}
}
*/

@mixin keyframes($animation-name) {
    @-webkit-keyframes #{$animation-name} {
        @content;
    }
    @-moz-keyframes #{$animation-name} {
        @content;
    }  
    @-ms-keyframes #{$animation-name} {
        @content;
    }
    @-o-keyframes #{$animation-name} {
        @content;
    }  
    @keyframes #{$animation-name} {
        @content;
    }
}
```

[View this gist on GitHub](https://gist.github.com/magician11/135d4f2cfffea828c828)

Which then keeps my SCSS code really simple for my [AngularJS animations](https://docs.angularjs.org/guide/animations).

```scss title="flyin.scss"
.profile-pic-transition.ng-hide-remove.ng-hide-remove-active {
    @include vendor-prefixes(animation, 'flyIn 3s');
}

@include keyframes(flyIn) {

    0% {
        opacity: 0;
        @include vendor-prefixes(transform, 'scale(0, 0)');
    }

    80% {
        opacity: 0.8;
        @include vendor-prefixes(transform, 'scale(1.1, 1.1)');
    }

    100% {
        opacity: 1;
        @include vendor-prefixes(transform, 'scale(1, 1)');
    }
}
```

[View this gist on GitHub](https://gist.github.com/magician11/27602354395a2a2196df)

To see a working demo of this flyIn, I’m using it for my profile pic on [my landing page](http://andrewgolightly.com/).
