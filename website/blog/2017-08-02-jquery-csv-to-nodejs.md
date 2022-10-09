---
slug: jquery-csv-to-nodejs
title: How To Use jQuery To Post A CSV File To A Node.js Server
authors: andrew
---

If you have a front-end that needs to accept a CSV file, upload it to a server using jQuery, and then have that Node.js server process that CSV file, then this a way to do it.

<!--truncate-->

First up, the HTML

```html title="index.html"
<form id="2020data">
  <input type="file" name="csvFile">
  <button type="submit" class="btn btn-default">Upload CSV File</button>
</form>
```

[View this gist on GitHub](https://gist.github.com/magician11/94e7e900b9b390fb4a53b1d32cc38476#file-index-html)

and then the jQuery that takes the selected CSV file, and uploads it to a server

```js title="front-end.js"
// using jQuery
$("#2020data").submit(function(e) {

  $.ajax({
    url: "https://e0d92634.ngrok.io/test",
    type: "POST",
    data: new FormData(this),
    processData: false,
    contentType: false
  });

  return false;
});
```

[View this gist on GitHub](https://gist.github.com/magician11/94e7e900b9b390fb4a53b1d32cc38476#file-front-end-js)

and finally the Node.js file that will accept and process it using [Express](https://expressjs.com/) (with the [multer](https://github.com/expressjs/multer) middleware), and then iterate through the CSV file.

As it turns out, the Node.js CSV libraries I found on npm were either not working or hadn’t been updated in a long time. To process a CSV file with standard JS using functions like split and replace made this relatively easy to do on my own.

```js title="server-side.js"
const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer();

app.post('/test', upload.single('csvFile'), async (req, res) => {
  try {
    const csvFile = req.file.buffer.toString();
    const rows = csvFile.split('\n');

    for (let row of rows) {
      const columns = row.replace(/"/g, '').split(',');
      console.log(columns);
    }

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

app.listen(3000, function() {
  console.log(`Server started at ${new Date().toString()}`);
});
```

[View this gist on GitHub](https://gist.github.com/magician11/94e7e900b9b390fb4a53b1d32cc38476#file-server-side-js)

Any questions [let me know](/contact)!