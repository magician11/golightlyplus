---
slug: json-api-wrapper-soap
title: How To A Create A JSON API Wrapper For SOAP
authors: andrew
---

I had a project where I needed to setup a server that communicated over the [SOAP protocol](https://en.wikipedia.org/wiki/SOAP). I use [Node.js](https://nodejs.org/en/) for my backend server, so I began looking for libraries to use to work with.

I settled on [strong-soap](https://github.com/strongloop/strong-soap), but began to have issues with doing simple changes to the XML like editing the prefix for the namespace. I [opened an issue for this](https://github.com/strongloop/strong-soap/issues/90), and there didn’t seem to be an easy way to remedy it.

<!--truncate-->

It turned out the easiest and most robust solution was to explicitly write out my own XML and use [request-promise-native](https://github.com/request/request-promise-native) to do a POST request with that custom crafted XML as the body to the server I was trying to communicate with.

Using ES6 I could use string interpolation to insert the values into the XML from the express server I set up to wrap around the SOAP request.

So essentially I could make POST requests to my server using JSON, and get a JSON response. And voilà, a JSON wrapped interface for a SOAP protocol.

A somewhat cut-down version of my actual code (that includes setting up https as it seems ever more important) is this…

```js title="json-over-soap-wrapper.js"
const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const rpn = require('request-promise-native');
const bodyParser = require('body-parser');

/* eslint-disable comma-dangle,arrow-parens,max-len,no-console */

const app = express();
app.use(cors());
app.set('port', 2323);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/check-age', (req, res) => {
  const {
    firstName,
    lastName,
    year,
    month,
    day,
    minAge,
    stateCode,
    zip
  } = req.body;

  const xmlReqBody = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.identityproofing.idm.risk.someurl.com/" xmlns:ns="http://ns.someurl.com/identity-proofing/1.0" xmlns:ns1="http://ns.someurl.com/survey/1.0">
  <soapenv:Header>
    <wsse:Security soapenv:mustUnderstand="1" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
    <wsse:UsernameToken wsu:Id="UsernameToken-49" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
    <wsse:Username>someUserName</wsse:Username>
    <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">somePassword</wsse:Password>
  </wsse:UsernameToken>
</wsse:Security>
</soapenv:Header>
<soapenv:Body>
  <ws:invokeIdentityService>
    <identityProofingRequest ns:customerReference="TESTING" ns:locale="en_US" ns:transactionID="${new Date().toString()}" ns:version="2" xmlns="http://ns.someurl.com/identity-proofing/1.0" xmlns:ns2="http://ns.someurl.com/identity-proofing/1.0">
    <ns:workFlow>WorkFlow</ns:workFlow>
    <ns:inputSubject>
      <ns:person>
        <ns:name>
          <ns:first>${firstName}</ns:first>
          <ns:last>${lastName}</ns:last>
        </ns:name>
        <ns:dateOfBirth>
          <ns:Year>${year}</ns:Year>
          <ns:Month>${month}</ns:Month>
          <ns:Day>${day}</ns:Day>
        </ns:dateOfBirth>
        <ns:address ns:addressPurpose="PRIMARY_RESIDENCE">
          <ns:stateCode>${stateCode}</ns:stateCode>
          <ns:zip5>${zip}</ns:zip5>
        </ns:address>
      </ns:person>
    </ns:inputSubject>
  </identityProofingRequest>
</ws:invokeIdentityService>
</soapenv:Body>
</soapenv:Envelope>`;

  const options = {
    method: 'POST',
    uri: 'https://identitymanagement.someurl.com/identity-proofing/services/identityProofingServiceWS/v2',
    body: xmlReqBody
  };

  rpn(options)
    .then(response => {
    // do something with the response, then return it
    res.json(response);
    })
    .catch(err => {
      console.log(err);
    });
});

// Make sure the connection to the node server is encrypted
const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/nodesrvr.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/nodesrvr.com/fullchain.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/nodesrvr.com/chain.pem')
};

// startup the https server
https.createServer(sslOptions, app).listen(app.get('port'), () => {
  console.log(`Age checker listening on port ${app.get('port')}.`);
});
```
[View this gist on GitHub](https://gist.github.com/magician11/0b07075eafcf49e1677f354ed3492571)

The main advantages to this approach are:

- No extra libraries needed
- I can be 100% confident in what XML I am actually sending to the server. I had the SOAP 3rd party asking for the exact XML fragment in order to help troubleshoot issues with me. Using strong-soap I wasn’t sure as it was generated.

Any questions or thoughts [let me know](/contact)! Thanks.