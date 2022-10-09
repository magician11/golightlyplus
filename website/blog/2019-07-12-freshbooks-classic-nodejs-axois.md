---
slug: freshbooks-classic-nodejs-axois
title: How to call Freshbooks Classic directly in Node.js using axios
authors: andrew
---

I was using the [freshbooks npm module](https://www.npmjs.com/package/freshbooks), but started having issues with its dependencies as it was last updated 3 years ago.

It turns out even though the payloads are in XML, it’s not too bad calling their classic API directly once you know how. Of course, then you need to process an XML response. But instead of having to use an XML library, since I know what specific fragment of data I want, I can use regular expressions to extract it.

<!--truncate-->

So here is a code sample on how to call their API directly

```js title="freshbooks-classic.js"
const axios = require("axios");
const config = require("../security/auth.js");

const callFreshbooks = async (
  xml,
  apiUrl = config.freshbooks.url,
  authToken = config.freshbooks.token
) => {
  try {
    const response = await axios({
      url: apiUrl,
      data: xml,
      auth: {
        username: authToken,
        password: "X"
      },
      method: "POST"
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* 
  e.g. get the project budget
  docs: https://www.freshbooks.com/classic-api/docs/projects#project.get
*/
const getProjectBudget = async projectId => {
  try {
    const data = await callFreshbooks(`
	<?xml version="1.0" encoding="utf-8"?>
	<request method="project.get">
		<project_id>${projectId}</project_id>
	</request>`);

    return parseFloat(data.match(/<hours>([\d|\.]+)/)[1]);
  } catch (error) {
    throw error;
  }
};
```

[View this gist on GitHub](https://gist.github.com/magician11/bb701fe4284880436605a1a6995d0643)