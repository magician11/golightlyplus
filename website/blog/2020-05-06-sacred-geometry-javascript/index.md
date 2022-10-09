---
slug: sacred-geometry-javascript
title: How To Create Sacred Geometry With JavaScript
authors: andrew
---

![Sacred Geometry](sacred-geometry.jpg)

Sacred geometry requires perfectly formed shapes that are perfectly positioned in relation to each other. This is very difficult to do by hand, so I thought I’d give it a go using code.

<!--truncate-->

I’m going to use [React](https://reactjs.org/), together with [Konva.js](https://konvajs.org/) to be able to draw on the HTML5 canvas element.

If you’re interested in looking at the code, [click here](https://github.com/magician11/sacred-geometry).

### The Seed of Life

To create the seed of life, draw a circle, then draw another six circles at degree 0, 60, 120, 180, 240, 300.

To calculate the coordinate of where to draw the new circle, where you can use some trigonometry to calculate the coordinate for the center of the next circle. To use JavaScript’s Math.cos and Math.sin functions though, you need to first convert degrees to radians. The following two functions do both these tasks for you.

```js title="circle-geometry.js"
const degreesToRadians = degrees => (degrees * Math.PI) / 180;

const pointOnCircle = (radius, radians, origin) => {
  const x = origin.x + Math.cos(radians) * radius;
  const y = origin.y + Math.sin(radians) * radius;
  return { x, y };
};
```
[View this gist on GitHub](https://gist.github.com/magician11/5d88247394e98e06fc256de6526cfa1f)

[View the Seed of Life →](https://sacredgeometry.golightlyplus.com/seed-of-life)

### The Flower of Life

The flower of life certainly looks a lot more complicated, but it is in fact created in the exact same way as the seed of life above. The only difference, is that instead of seven circles in the seed of life, the flower of life has seven seeds of life!

[View the Flower of Life →](https://sacredgeometry.golightlyplus.com/flower-of-life)

For the flower of life I also added two circles around the outside of the full design to more closely match the design seen widely.