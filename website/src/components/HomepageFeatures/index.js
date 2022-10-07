import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Apps',
    Svg: require('@site/static/img/apps.svg').default,
    description: (
      <>
        We build native apps for the Apple App Store for iOS devices, and the
        Google Play Store for Android devices. And we build web apps that are
        accessible from any web browser.
      </>
    )
  },
  {
    title: 'Websites',
    Svg: require('@site/static/img/websites.svg').default,
    description: (
      <>We build websites that look great on laptops, tablets and phones.</>
    )
  },
  {
    title: 'Articles',
    Svg: require('@site/static/img/articles.svg').default,
    description: <>Howtos, learnings and insights into tech life.</>
  }
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
