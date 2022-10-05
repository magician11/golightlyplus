// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Golightly+',
  tagline: 'Professional Web & App Development',
  url: 'https://golightlyplus.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/magician-hat.png',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js')
        },
        blog: {
          showReadingTime: true
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Golightly+',
        logo: {
          alt: 'Golightly+ Logo',
          src: 'img/magician-hat.png'
        },
        items: [
          {
            type: 'doc',
            docId: 'portfolio',
            position: 'left',
            label: 'Portfolio'
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          { to: '/about', label: 'About', position: 'left' },
          {
            label: 'Contact',
            to: '/contact',
            position: 'right'
          }
        ]
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Legal',
            items: [
              {
                label: 'Privacy Policy',
                to: '/privacy-policy'
              },
              {
                label: 'Terms and Conditions',
                to: '/terms-conditions'
              }
            ]
          },
          {
            title: 'Community Presence',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/users/2813041/magician11'
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus'
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/andrewgolightly11/'
              }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} GolightlyPlus+, Ltd.`
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      }
    })
};

module.exports = config;
