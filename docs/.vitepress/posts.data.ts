import { createContentLoader } from 'vitepress'

const dir1 = '01前端开发'
const dir2 = '02医药基础'
const dir3 = '03人工智能'

export default createContentLoader(`/(${dir1}|${dir2}|${dir3})/*.md`)

