---
slug: burbon-mixin-library-for-sass
title: Using Bourbon as a mixin library for Sass
authors: andrew
---

### UPDATE 

Update can be read [here](https://twitter.com/Autoprefixer/status/580276135294078976?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E580276135294078976%7Ctwgr%5E7bb989afca13cca2ce00534eafb5b8a5619f26b4%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fgolightlyplus.com%2Fusing-bourbon-as-a-mixin-library-for-sass%2F)

… so use [Autoprefixer](/blog/autoprefixer-to-add-vendor-prefix-css) instead!

<!--truncate-->

In [my last article](/blog/vendor-prefixes-css3-animations-scss), I showed you how you can create your own mixins to generate the various vendor prefixes needed for the latest unstabilised CSS3 features to work across all [the latest browsers](http://browsehappy.com/).

Recently, I discovered the mixin library [Bourbon](http://bourbon.io/) which has better versions of the custom mixins I previously wrote. So in this article I’ll be showing you how to use it.

I really like to use [Gulp](http://gulpjs.com/) to build my apps. So I’ll be setting up Bourbon to work with that.

### Setting up Gulp and supporting plugins

First things first, install the packages you’ll need using the node package manager ([npm](https://www.npmjs.com/)). The easiest would be for you to take a copy of my `package.json` file below and edit the obvious parts. The important parts (to leave as is) are the **“devDependencies”** and **“engines”** object definitions.

```json title="package.json"
{
    "name": "andrew-golightly",
    "version": "0.1.3",
    "author": "Andrew Golightly <support@andrewgolightly.com>",
    "description": "Andrew Golightly's landingpage",
    "homepage": "http://www.andrewgolightly.com",
    "repository": {
        "type": "git",
        "url": "git://github.com/magician11/ag-landingpage.git"
    },
    "engines": {
        "node": "^0.12"
    },
    "devDependencies": {
        "gulp": "^3.8.11",
        "gulp-sass": "^1.3.3",
        "node-bourbon": "^4.2.2",
        "gulp-jshint": "^1.10.0",
        "gulp-webserver": "^0.9.1"
    },
    "private": true
}
```

[View this gist on GitHub](https://gist.github.com/magician11/b93baeca48bd1ea31c85)

Then simply run..

`npm install`

Then configure your `gulpfile.js` file. The version I currently work with looks like this..

```js title="gulpfile.js"
// get gulp and the plugins we need for it
var gulp = require('gulp');
var scss = require('gulp-sass');
var bourbon = require('node-bourbon').includePaths;
var webserver = require('gulp-webserver');
var jshint = require('gulp-jshint');

// setup our Sass compilation task
gulp.task('scss', function() {
    return gulp.src('styles/ag.scss')
        .pipe(scss({
        errLogToConsole: true,
        includePaths: ['styles'].concat(bourbon)
    }))
        .pipe(gulp.dest('dist/css'));
});

// setup our webserver
gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(webserver({
        livereload: true,
        open: true
    }));
});

// quality check our JS
gulp.task('lint', function() {
    return gulp.src('scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// watch our scss files for changes
gulp.task('watch', function() {
    gulp.watch('styles/**/*.scss', ['scss']);
    gulp.watch('scripts/*.js', ['lint']);
});

// run our tasks on running 'gulp' from the command line
gulp.task('default', ['webserver', 'watch']);
```

[View this gist on GitHub](https://gist.github.com/magician11/9a1d308fceb92e55c0ce)

### Using Bourbon in your SCSS

Then import Bourbon in your main SCSS file and begin using [the mixins](http://bourbon.io/docs/#mixins)!

```scss title="bourbon-flyin.scss"
@import "bourbon";

.profile-pic-transition.ng-hide-remove.ng-hide-remove-active {
    @include animation(flyIn 3s);
}

@include keyframes(flyIn) {

    0% {
        opacity: 0;
        @include transform(scale(0, 0));
    }

    80% {
        opacity: 0.8;
        @include transform(scale(1.1, 1.1));
    }

    100% {
        opacity: 1;
        @include transform(scale(1, 1));
    }
}
```

[View this gist on GitHub](https://gist.github.com/magician11/a6b2676ae664fd49adfb)

To see this flyIn in action, you can check out [my landing page](http://www.andrewgolightly.com/).

Bourbon is [well maintained and very popular](https://github.com/thoughtbot/bourbon). I’ll be using it from now on 🙂