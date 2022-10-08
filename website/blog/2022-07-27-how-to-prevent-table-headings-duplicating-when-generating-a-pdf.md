---
slug: how-to-prevent-table-headings-duplicating-when-generating-a-pdf
title: How to prevent table headings duplicating when generating a PDF
authors: andrew
---

I needed to generate some reports from data we have.

So the first step was to create an HTML page from the data, and then generate a PDF from that HTML that we could send.

<!--truncate-->

So firstly to generate the PDF from the HTML, I used the code in `htmlToPdf.js` below.

But I was noticing that the table headings would often duplicate themselves. In CSS you can use the [@media rule](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) to apply CSS based on the results of a media query. So essentially using

```
@media print
```

you can code up CSS that will be only be applied when printing documents. Example in print-media.html below.

The key line of code to prevent table headings duplicating is

```
thead {display: table-row-group;}
```

— [source on Stack Overflow](https://stackoverflow.com/a/27185685/2813041)

```js title="htmlToPdf.js"
const puppeteer = require('puppeteer');

const htmlToPdf = async html => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // https://pptr.dev/#?product=Puppeteer&version=v13.6.0&show=api-pagesetcontenthtml-options
  await page.setContent(html);
  // https://pptr.dev/#?product=Puppeteer&version=v13.6.0&show=api-pagepdfoptions
  const buffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true
  });

  await browser.close();

  return buffer;
};
```

```js title="print-media.html"
 <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous"
      />
  
      <title>${name} statement report</title>
      <style>
        .sunbowl-blue {
          color: #87ceeb !important;
        }
        #scallops {
          background-image: url('https://user-images.githubusercontent.com/3735849/164582296-6e19273d-2d1a-4482-a25c-4edc9c6416ec.png');
          background-repeat: repeat-x;
          height: 11px;
        }

        @media print {
          table {
            font-size: 0.85em;
          }

          p {
            line-height: 1
          }
  
          small {
            font-size: 0.65em;
          }

          thead {
            display: table-row-group;
          }
        }
      </style>
    </head>
```

> [View this gist on GitHub](https://gist.github.com/magician11/6f71e65df9dcf45cc1f8ce2f24216c6d)