---
slug: grab-page-source-and-process
title: How to grab the page source from any dynamically generated webpage and then process it
authors: andrew
---

<iframe width="100%" height="315" src="https://www.youtube.com/embed/y8UhYZrFE8U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I had an issue where I needed to scrape some data from a dynamically generated webpage. Open [this page](https://www.sfcinemacity.com/showtime/cinema/9936) in a browser and you’ll see what I mean.

<!--truncate-->

I tried a lot of options, and the solution that ended up working for me was to use [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome). This basically allows you to launch Chrome and use it as a tool from within your code. It’s recommended to install Chrome Canary and you can get it from [here](https://www.google.com/chrome/browser/canary.html).

Essentially the pseudo code for my script goes as follows..

1. launch Chrome in headless mode (no visible window)
2. load a page and wait until the page is loaded
3. then wait a little longer until all the JS on the page has completed
4. then click on something using a querySelector to change the language to English
5. then grab all the source code from the page
6. then load that source code into cheerio and perform queries as needed

The full source code for this is below. You’ll of course need to install the 3 packages too.

`> yarn add chrome-remote-interface chrome-launcher cheerio`

```js title="headless-chrome.js"
const CDP = require('chrome-remote-interface');
const chromeLauncher = require('chrome-launcher');
const cheerio = require('cheerio');

(async function() {
  const launchChrome = () =>
    chromeLauncher.launch({ chromeFlags: ['--disable-gpu', '--headless'] });

  const chrome = await launchChrome();
  const protocol = await CDP({ port: chrome.port });

  const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

  // See API docs: https://chromedevtools.github.io/devtools-protocol/
  const { Page, Runtime, DOM } = protocol;
  await Promise.all([Page.enable(), Runtime.enable(), DOM.enable()]);

  Page.navigate({ url: 'https://www.sfcinemacity.com/showtime/cinema/9936' });

  // wait until the page says it's loaded...
  Page.loadEventFired(async () => {
    try {
      console.log('Page loaded! Now waiting a few seconds for all the JS to load...');
      await timeout(3000); // give the JS some time to load
      console.log('Selecting English..');

      // first set the language to English
      const result = await Runtime.evaluate({
        expression:
          "document.querySelector('.lang-switcher li:nth-of-type(2) a').click()"
      });

      // get the page source
      const rootNode = await DOM.getDocument({ depth: -1 });
      const pageSource = await DOM.getOuterHTML({
        nodeId: rootNode.root.nodeId
      });
      protocol.close();
      chrome.kill();

      // load the page source into cheerio
      console.log('Processing page source...');
      const $ = cheerio.load(pageSource.outerHTML);

      // perform queries
      console.log('Getting movie times for', $('.showtime-cinema-name').text());
      $('.showtime-box').each((i, movieElement) => {
        console.log($(movieElement).find('.movie-detail .name').text());
      });
    } catch (err) {
      console.log(err);
    }
  });
})();
```

[View this gist on GitHub](https://gist.github.com/magician11/a979906401591440bd6140bd14260578)

I hope that helps some people! It took me ages to finally get to this place where I could scrape a dynamically generated webpage from Node.js.