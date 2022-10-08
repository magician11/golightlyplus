---
slug: google-analytics-reactjs
title: How to setup Google Analytics with React.js apps
authors: andrew
tags: [reactjs]
---

If you have a single page app that has no routes, getting visitors tracked with Google Analytics is pretty straight forward using the [React Google Analytics Module](https://github.com/react-ga/react-ga).

First create your tracking ID from Google Analytics by going to https://analytics.google.com/ A howto guide is available [here](https://support.google.com/analytics/answer/1008080?hl=en).

<!-- truncate -->

Then in the parent component of your React.js app

- Install the react-ga module: `yarn add react-ga`
- Import this module at the top of the app: `import ReactGA from 'react-ga';`
- And add the 2 lines of code into your constructor as shown below using either a class or the hooks approach.

```jsx title="Using a constructor"
import ReactGA from 'react-ga'; // https://github.com/react-ga/react-ga
import { React, Component } from 'react';

class MyApp extends Component {
  constructor() {
    super();
    this.state = {
      someData: null
    };

    // Add your tracking ID created from https://analytics.google.com/analytics/web/#home/
    ReactGA.initialize('UA-000000-01');
    // This just needs to be called once since we have no routes in this case.
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    return <h1>MyApp is being tracked by Google Analytics</h1>;
  }
}

export default MyApp;
```

```jsx title="Using hooks"
import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

export default function App() {
  useEffect(() => {
    ReactGA.initialize('UA-000000-01');
    ReactGA.pageview(window.location.pathname);
  }, []);

  return <h1>hello world</h1>;
}
```

I had data being tracked within 24 hours from adding this module.

Any questions, let me know!
