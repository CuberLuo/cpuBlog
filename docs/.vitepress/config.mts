import { defineConfig } from 'vitepress'
import { get_sidebar_items, get_nav_items } from './utils/auto_gen.ts'

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
    outline: {
      level: 'deep', // 显示从 `<h2>` 到 `<h6>` 的所有标题
      label: 'Title navigation'
    },
    // 顶部导航栏
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'My Blogs',
        items: get_nav_items()
      }
    ],
    // 侧边导航栏
    sidebar: [
      {
        text: 'My Blogs',
        items: get_sidebar_items()
      }
    ],
    footer: {
      message: '技术天生自由',
      copyright: `Copyright © ${currentYear} CuberLuo`
    },
    search: {
      provider: 'local'
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/CuberLuo' }
    ]
  }
})
