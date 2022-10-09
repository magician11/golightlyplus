---
slug: auto-restart-forever-system-reboot
title: How to automatically restart forever (for Node.js scripts and servers) on a system reboot
authors: andrew
---

I use [forever](https://github.com/foreverjs/forever) to start my Node.js scripts, to ensure that if it crashed, it would just auto-restart.

An issue arises though if the server itself reboots. Which for some reason happened on a DigitalOcean droplet I was using. So I needed to figure out a way to restart the forever process on system reboot. I couldn’t find any clear documentation, but this is the solution I finally figured out after piecing together various bits of information online together. The most helpful source of this answer came from [an answer on stack overflow](https://stackoverflow.com/a/13388741/2813041).

<!--truncate-->

First, run

`crontab -u root -e`

then after all the comments add this content:

```txt title="crontab"
NODE_ENV=production
PATH=/root/.nvm/versions/node/v8.11.1/bin:$PATH
@reboot cd /var/server/script-directory && /root/.nvm/versions/node/v8.11.1/bin/forever start myscript.js
```
[View this gist on GitHub](https://gist.github.com/magician11/942c2a941b4a394d35d186d1009a703b)

Some key points here:

- you can explicitly set any environment variables you need in here for the script to work
- you must include your path to your Node.js executable. This PATH seems to normally load only after the crontab is run.

This certainly helps make your Node.js servers and scripts much more robust.

