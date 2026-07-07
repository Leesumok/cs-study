// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '수목원',
  tagline: '이수목의 공부 위키',
  favicon: 'img/favicon.svg',

  url: 'https://leesumok.github.io',
  baseUrl: '/cs-study/',
  organizationName: 'Leesumok',
  projectName: 'cs-study',

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs',
          editUrl: 'https://github.com/Leesumok/cs-study/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.svg',
      navbar: {
        title: '수목원',
        logo: {
          alt: '수목원 로고',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'studySidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/Leesumok/cs-study',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Study',
            items: [
              {
                label: 'Overview',
                to: '/docs/intro',
              },
              {
                label: 'Workflow',
                to: '/docs/workflow',
              },
            ],
          },
          {
            title: 'CS',
            items: [
              {
                label: '1-1. CDN이란? CDN 작동',
                to: '/docs/cs/cdn/1-1-intro-and-flow',
              },
              {
                label: '1-2. 동적 API와 CDN',
                to: '/docs/cs/cdn/1-2-dynamic-api',
              },
            ],
          },
          {
            title: 'Repository',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/Leesumok/cs-study',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 이수목.`,
      },
      prism: {
        theme: require('prism-react-renderer').themes.github,
        darkTheme: require('prism-react-renderer').themes.dracula,
        additionalLanguages: ['kotlin', 'bash'],
      },
    }),
};

module.exports = config;
