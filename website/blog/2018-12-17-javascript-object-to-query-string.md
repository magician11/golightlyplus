---
slug: javascript-object-to-query-string
title: How To Convert a JavaScript Object To A Query String
authors: andrew
---

Let’s say you have a lot of query parameters you need to add to an Ajax request. For code maintainability, it’s much cleaner to create a large JavaScript object, use string interpolation for the URL, and then adding a function that converts the JavaScript object to a query string.

This is what it might look like…

https://gist.github.com/magician11/c16ae65cacd5cdb793f5f8215c1ef811
