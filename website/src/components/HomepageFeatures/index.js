import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
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
    ),
    url: '/docs/category/apps'
  },
  {
    title: 'Websites',
    Svg: require('@site/static/img/websites.svg').default,
    description: (
      <>
        We build websites that look great on laptops, tablets and phones. From
        Squarespace builds you can manage, to custom builds that can look and do
        anything you like, we can do it all!
      </>
    ),
    url: '/docs/category/websites'
  },
  {
    title: 'Articles',
    Svg: require('@site/static/img/articles.svg').default,
    description: (
      <>
        As I learn how to do complicated things, I'll write up a howto on it. It
        helps me reference it later, and helps out the tech community looking
        for the same answers!
      </>
    ),
    url: '/blog'
  }
];

function Feature({ Svg, title, description, url }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="text--center">
        <Link to={url}>
          <button class="button button--info">View more</button>
        </Link>
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
