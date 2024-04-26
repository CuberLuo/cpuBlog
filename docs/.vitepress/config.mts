import { defineConfig } from 'vitepress'

const basePath = '/cpuBlog'
const currentYear = new Date().getFullYear()
const routeName1 = '前端开发'
const routeName2 = '医药基础'
const routeName3 = '人工智能'
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
        items: [
          { text: routeName1, link: '/route1' },
          { text: routeName2, link: '/route2' },
          { text: routeName3, link: '/route3' }
        ]
      }
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
          {
            text: routeName1,
            collapsed: true,
            items:[
              { text: '正则表达式', link: `/${routeName1}/正则表达式` },
              { text: '代码规范', link: `/${routeName1}/代码规范` },
            ]
          },
          {
            text: routeName2,
            collapsed: true,
            items:[]
          },
          {
            text: routeName3,
            collapsed: true,
            items:[]
          },
        ]
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
