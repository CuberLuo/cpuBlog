import { defineConfig } from 'vitepress'

const basePath = '/cpuBlog'
const currentYear = new Date().getFullYear()
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: basePath,
  lang: 'zh-cmn-Hans',
  title: "CPU Blog",
  description: "A VitePress Site",
  appearance: 'dark',
  
  head: [
    ['link',{rel:'icon',href:`${basePath}/logo.svg`}], 
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // logo: '/logo.svg',
    outline: 'deep',// 显示从 `<h2>` 到 `<h6>` 的所有标题
    // 顶部导航栏
    nav: [
      { text: 'Home', link: '/' },
      { text: 'My Blogs', link: '/正则表达式' }
    ],
    // 侧边导航栏
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ]
      },
      {
        text: 'My Blogs',
        items: [
          { text: '正则表达式', link: '/正则表达式' }
        ]
      }
    ],
    footer: {
      copyright: `Copyright © ${currentYear}-present CuberLuo`
    },
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/CuberLuo' }
    ]
  }
})
