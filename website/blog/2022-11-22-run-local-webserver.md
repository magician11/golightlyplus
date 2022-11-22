---
slug: run-local-webserver
title: How to run a local webserver to serve static files
authors: andrew
---

To run a simple static HTTP server, use [http-server](https://www.npmjs.com/package/http-server).

<!--truncate-->

To install, run..

`npm install --global http-server`

For development, I don't want caching on by default, so I run http-server with the following flag..

`http-server -c-1`

For details of usage, [read this](https://github.com/http-party/http-server#usage).
