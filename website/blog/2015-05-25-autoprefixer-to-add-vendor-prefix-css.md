---
slug: autoprefixer-to-add-vendor-prefix-css
title: Use Autoprefixer to add vendor prefixes to your CSS
authors: andrew
---

The latest CSS properties are getting implemented in browsers before they become standardised. Which is great for us developers in that we can start using the latest [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3) features quicker than not. But to use these latest implementations, we need to add vendor prefixes to our CSS rules, specific to those browser vendors (e.g. for Chrome and Firefox).

For example, to make sure the animation property works across all browsers, we would need to write out something like…

<!--truncate-->

```css 
{
    -webkit-animation: example 5s linear 2s infinite alternate;
    animation: example 5s linear 2s infinite alternate;
}
```

This can be tedious to work out which CSS properties need to be vendor prefixed, and then to actually duplicate each of those properties with a vendor prefix.

My first stab at solving this was to [write my own Sass mixins](/blog/vendor-prefixes-css3-animations-scss) that I could use to preprocess my CSS.

Then I discovered Bourbon which is a library of mixins that includes mixins to add vendor prefixes for specific CSS properties. I prefer to go with well maintained and well supported libraries than essentially re-writing that code, [so I opted to use them](/blog/burbon-mixin-library-for-sass).

And then I read Bourbon is deprecating their support in generating the vendor prefixes. And that’s when I discovered [Autoprefixer](https://twitter.com/autoprefixer).

Autoprefixer is a postprocessor.

For the above two previous methods (using [Sass](http://sass-lang.com/) or [Bourbon](http://bourbon.io/)) we need to know which CSS properties need to have vendor prefixes added to them. In the case of Autoprefixer, all I now need to do now, is just write my CSS, then pipe that CSS through Autoprefixer using a build tool like [Gulp](http://gulpjs.com/). Autoprefixer will then automagically add the vendor prefixes onto the CSS properties that need them.

A snippet of one of my gulpfile.json files using autoprefixer looks like this

```js title="gulpfile"
var autoprefix = require('gulp-autoprefixer');

gulp.task('scss', function() {
    
    return gulp.src(appFiles.scss)
        .pipe(scss({
        errLogToConsole: true
    }))
        .pipe(autoprefix())
        .pipe(minifyCSS())
        .pipe(concat('ag.min.css'))
        .pipe(gulp.dest(appDirectory.dist + '/css'));
});
```

[View this gist on GitHub](https://gist.github.com/magician11/41994fdac333d02131a9)

So much simpler! And we’re done.