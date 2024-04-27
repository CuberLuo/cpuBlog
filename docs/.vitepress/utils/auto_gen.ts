import path from 'path'
import fs from 'fs'
import { removePrefixNum } from '.'
import type { DefaultTheme } from 'vitepress/types/default-theme.d.ts'


// 文件根目录
const DIR_PATH = path.resolve()
// docs目录
const DOCS_PATH = path.join(DIR_PATH, 'docs')

// 判断是否是文件夹
const isDirectory = (path: fs.PathLike) => fs.lstatSync(path).isDirectory()

const DIR_WHITE_LIST = ['.vitepress', 'public']
const FILE_WHITE_LIST = ['index.md', 'index.data.mts']


export const get_sidebar_dir_list = () => {
  // 读取 pathname 下的所有文件或者文件夹
  const files = fs.readdirSync(DOCS_PATH)
  const dir_list: string[] = []
  files.forEach((val) => {
    // 文件夹不在白名单中
    if (!DIR_WHITE_LIST.includes(val) && isDirectory(path.join(DOCS_PATH,val))) {
      dir_list.push(val)
    }
  })
  return dir_list
}

export const get_sidebar_items = () => {
  const sidebar_items_list: DefaultTheme.SidebarItem[] = []
  get_sidebar_dir_list().forEach((dir_name) => {
    
    const files = fs.readdirSync(path.join(DOCS_PATH, dir_name))
    const items_list: DefaultTheme.SidebarItem[] = []
    files.forEach((val) => {
      if (!FILE_WHITE_LIST.includes(val)) {
        const fileName = val.split('.')[0]
        const item = {
          text: removePrefixNum(fileName),
          link: `/${dir_name}/${fileName}`
        }
        items_list.push(item)
      }
    })
    const item = {
      text: removePrefixNum(dir_name),
      collapsed: true,
      items: items_list
    }
    sidebar_items_list.push(item)
  })
  
  return sidebar_items_list
}

export const get_nav_items = () => {
  const items_list: DefaultTheme.NavItemWithLink[] = []
  get_sidebar_dir_list().forEach((val) => {
    const item: DefaultTheme.NavItemWithLink = {
      text: removePrefixNum(val),
      link: `/${val}/index`
    }
    items_list.push(item)
  })
  return items_list
}
