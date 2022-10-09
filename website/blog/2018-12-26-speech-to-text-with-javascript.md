---
slug: speech-to-text-with-javascript
title: Speech Recognition For Speech to Text Using JavaScript
authors: andrew
---

I’ve been playing with Speech Recognition technologies for a long time now. But I never really liked it that people had to download and install an application on their computer to use my application.

And then Google Chrome created an implementation for the Web Speech API. And it works great.

<!--truncate-->

To see a working demo you can play with, [click here](https://apps.golightlyplus.com/speech-to-text-demo/).

I built an npm module to make it a little easier to integrate speech-to-text into your client-side app. You can download it [here](https://www.npmjs.com/package/speech-to-text). For your speech recognition app, there are some things you probably want the listener to tell you…

- Chrome uses the Google Cloud platform to send your audio to, which returns an accurate transcription of what was said. So you probably want to get notified when this happens and what was said from there.
- You probably want to get notified when the speech recognition engine disconnects and stops listening. So you can reconnect if need be.
- Chrome also converts speech to text in the browser almost instantly. This is useful to get notified of for your UX while the slightly slower Cloud conversion takes place.

So to instantiate a new object to listen to speech in your app, it will probably look like this

`const listener = new SpeechToText(onFinalised, onEndEvent, onAnythingSaid);`

where the arguments are callback functions corresponding to our points above.

A sample application apart from the demo above, is to search for images using the voice only. You can view a demo of that [here](https://syzygy.solutions/).