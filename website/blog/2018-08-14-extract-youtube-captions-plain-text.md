---
slug: extract-youtube-captions-plain-text
title: How to programatically extract YouTube captions as plain text
authors: andrew
---

YouTube automatically creates subtitles for a lot of videos that are uploaded to YouTube.

So instead of paying to have your videos transcribed, you can upload your video to YouTube, and programatically download the subtitles.

But it took me a while to figure out how to get those subtitles programatically.

<!--truncate-->

I started with [youtube-dl](https://github.com/rg3/youtube-dl), but I could only get the WebVTT format which is cumbersome to post-process. [I posted an issue in their GitHub repo](https://github.com/rg3/youtube-dl/issues/17178).

I finally found [a little npm library](https://www.npmjs.com/package/youtube-captions-scraper) someone had built that made this task fairly straight forward. Here is a code sample that will take a YouTube URL as a command line argument, and then log the subtitles as plain text.

```js title="get-youtube-subtitles.js"
const { getSubtitles } = require('youtube-captions-scraper');
const getYouTubeID = require('get-youtube-id');

const getYouTubeSubtitles = async youtubeUrl => {
  try {
    const videoID = getYouTubeID(youtubeUrl);
    const subtitles = await getSubtitles({ videoID });
    return subtitles.reduce(
      (accumulator, currentSubtitle) =>
        `${accumulator} ${currentSubtitle.text}`,
      ''
    );
  } catch (error) {
    console.log(`Error getting captions: ${error.message}`);
  }
};

(async () => {
  const consoleArguments = process.argv;
  if (consoleArguments.length !== 3) {
    console.log(
      'usage example: node get-youtube-subtitles.js https://www.youtube.com/watch?v=gypAjPp6eps'
    );
    return;
  }

  const subtitles = await getYouTubeSubtitles(consoleArguments[2]);
  console.log(subtitles);
})();
```

[View this gist on GitHub](https://gist.github.com/magician11/f669cee2974c89d42602cb039719f7e6)