import { defineConfig } from 'dumi';

export default defineConfig({
  logo: '/yaml/images/logo.png',
  title: 'YAML',
  // description: '工欲善其事',
  base: '/yaml/',
  publicPath: '/yaml/',
  // mode: 'site',
  locales: [
    ['zh-CN', '中文']
  ],
  themeConfig: {},
  favicon: '/yaml/images/favicon.ico',
  metas: [
    {
      name: 'keywords',
      content: 'yaml',
    },
    {
      name: 'description',
      content: '工欲善其事',
    },
  ],
  theme: {
    '@c-primary': '#C641EB',
  },
  styles: [
    `.markdown h3 a { color: #454d64; }
     .markdown blockquote p { margin: 5px  0; }`,
  ],
  404: true,
  // more config: https://d.umijs.org/config
});
