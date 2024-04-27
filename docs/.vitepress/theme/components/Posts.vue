<template>
  <ClientOnly>
    <div v-for="(item, index) in filtered_posts" :key="index">
      <a :href="withBase(item.url)">{{ item.frontmatter.title }}</a>
      <hr>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../../posts.data'
import { withBase } from 'vitepress'

const props = defineProps({
  dir: String
})

console.log(posts)
const filtered_posts = computed(() => {
  return posts.filter((item: any) => {
    if (item.frontmatter.title && item.url.includes(props.dir)) return item
  })
})
</script>

<style scoped>
</style>
