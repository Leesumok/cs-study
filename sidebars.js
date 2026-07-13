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
    {
      type: 'category',
      label: 'AI',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: '01. 생성형 AI 핵심 개념',
          collapsed: true,
          items: [
            doc(
              'ai/generative-ai-basics/1-1-llm-overview',
              'ai/01-generative-ai-basics/1-1-llm-overview.md',
            ),
          ],
        },
        {
          type: 'category',
          label: '용어집',
          collapsed: true,
          items: [
            doc('ai/glossary/n-gram', 'ai/glossary/n-gram.mdx'),
            doc('ai/glossary/embedding', 'ai/glossary/embedding.mdx'),
            doc('ai/glossary/attention', 'ai/glossary/attention.mdx'),
            doc('ai/glossary/rnn', 'ai/glossary/rnn.mdx'),
            doc(
              'ai/glossary/zero-shot-few-shot',
              'ai/glossary/zero-shot-few-shot.mdx',
            ),
            doc('ai/glossary/rag', 'ai/glossary/rag.mdx'),
            doc('ai/glossary/multimodal', 'ai/glossary/multimodal.mdx'),
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
