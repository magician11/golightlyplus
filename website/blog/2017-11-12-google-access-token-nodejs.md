---
slug: google-access-token-nodejs
title: How to get a new Google access token from a refresh token on Node.js
authors: andrew
---

If you’re creating an app where you need to access Google services from a server, you’ll need to store the refresh token from the Google Oauth process. The access tokens periodically expire, so you need the refresh token to manually get a new access token when you need it.

So if you’re using the P[assport auth middleware for Node.js](http://www.passportjs.org/) you would have something like this to make sure you get the refresh token. Store this refresh token in a database.

<!--truncate-->

```js title="passport.js"
passport.authenticate('google', {
  scope: ['profile', 'email', 'https://mail.google.com/'],
  accessType: 'offline',
  prompt: 'consent'
});
```

[View this gist on GitHub](https://gist.github.com/magician11/205764591ba3e7a8be6725d9ddc6f519#file-passport-js)

Then when you need an access token to access gmail in this case, you could get a new access token like this

```js title="google-oauth.js"
const axios = require('axios');
const querystring = require('querystring');
const keys = require('../config/keys');

const getAccessToken = async refreshToken => {
  try {
    const accessTokenObj = await axios.post(
      'https://www.googleapis.com/oauth2/v4/token',
      querystring.stringify({
        refresh_token: refreshToken,
        client_id: keys.googleClientID,
        client_secret: keys.googleClientSecret,
        grant_type: 'refresh_token'
      })
    );
    return accessTokenObj.data.access_token;
  } catch (err) {
    console.log(err);
  }
};
```

[View this gist on GitHub](https://gist.github.com/magician11/205764591ba3e7a8be6725d9ddc6f519#file-google-oauth-js)

— based on these [Google Identity Platform docs](https://developers.google.com/identity/protocols/OAuth2WebServer#offline)