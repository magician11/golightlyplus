---
slug: deep-comparison-javascript-objects
title: Implementing a deep comparison between JavaScript objects
authors: andrew
---

The == operator compares objects by identity. But sometimes, you would prefer to compare the values of their actual properties.

— ([Taken from Eloquent JavaScript Ch4](http://eloquentjavascript.net/04_data.html#p_xTwbRlqHNJ))

I spent a bit of time figuring this one out, and finally have a working solution.

<!--truncate-->

```js title="deepEqual.js"
function deepEqual(val1, val2) {

    if(val1 === val2) {
        console.log(val1 + ' is the same as ' + val2);
        return true;
    } else if(typeof val1 === 'object' && typeof val2 === 'object'
            && val1 !== null && val2 !== null) {
        var val1Keys = Object.keys(val1);
        var val2Keys = Object.keys(val2);

        var arr1Length = val1Keys.length;
        if(arr1Length === val2Keys.length) {
            for(var i = 0; i < arr1Length; i++) {
                console.log('Looking at key ' + val1Keys[i]);
                if(val1Keys[i] === val2Keys[i]) {
                    console.log('Checking whether ' + val1[val1Keys[i]] +
                        ' is the same as ' + val2[val2Keys[i]]);
                    if(!deepEqual(val1[val1Keys[i]], val2[val2Keys[i]])) {
                        return false;
                    }
                } else {
                    // not the same value for the current key
                    return false;
                }
            }
        } else {
            // not the same length of keys
            return false;
        }

        return true;
    } else {
        // they're either not objects or null
        return false;
    }
}
```

[View this gist on GitHub](https://gist.github.com/magician11/d0c979037a69555b2aa4)