import React from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import '@lottiefiles/lottie-player';
import { PageMetadata } from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
export default function NotFound() {
  return (
    <>
      <PageMetadata
        title={translate({
          id: 'theme.NotFound.title',
          message: 'Page Not Found'
        })}
      />
      <Layout>
        <main className="container margin-vert--xl">
          <div className="row">
            <div className="col col--6 col--offset-3">
              <h1 className="hero__title">
                <Translate
                  id="theme.NotFound.title"
                  description="The title of the 404 page"
                >
                  Whoops.
                </Translate>
              </h1>
              <p>
                <Translate
                  id="theme.NotFound.p1"
                  description="The 1st paragraph of the 404 page"
                >
                  This page has been abducted.
                </Translate>
              </p>
              <lottie-player
                autoplay
                loop
                style={{ width: '555px' }}
                src="https://assets6.lottiefiles.com/packages/lf20_NNGsAO1Ve7.json"
              ></lottie-player>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
