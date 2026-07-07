// @ts-check

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function doc(id, sourcePath) {
  const absolutePath = path.join(__dirname, 'docs', sourcePath);
  const {data} = matter(fs.readFileSync(absolutePath, 'utf8'));
  const createdAt = data.created_at
    ? new Date(data.created_at).toISOString().slice(0, 10)
    : undefined;

  return {
    type: 'doc',
    id,
    ...(createdAt && {
      customProps: {
        createdAt,
      },
    }),
  };
}

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  studySidebar: [
    'intro',
    'workflow',
    {
      type: 'category',
      label: 'CS',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: '01. CDN 개념 및 심화',
          collapsed: true,
          items: [
            doc('cs/cdn/1-1-intro-and-flow', 'cs/01-cdn/1-1-intro-and-flow.md'),
            doc('cs/cdn/1-2-dynamic-api', 'cs/01-cdn/1-2-dynamic-api.md'),
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
