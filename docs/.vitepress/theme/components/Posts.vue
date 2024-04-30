<template>
  <ClientOnly>
    <div class="index-wrapper">
      <div v-for="(item, index) in curPosts" :key="index">
        <a :href="withBase(item.url)">{{ item.frontmatter.title }}</a>
        <hr />
      </div>
    </div>

    <el-pagination
      background
      layout="prev, pager, next"
      :default-page-size="pageSize"
      :total="filtered_posts.length"
      @change="paginationChange"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed, Ref } from "vue";
import { data as posts } from "../../posts.data";
import { withBase } from "vitepress";
const props = defineProps({
  dir: String,
});
const curPosts: any = ref([]);
const pageSize = 5;

console.log(posts);
const filtered_posts = computed(() => {
  return posts.filter((item: any) => {
    if (item.frontmatter.title && item.url.includes(props.dir)) return item;
  });
});
curPosts.value = filtered_posts.value.reverse().slice(0, pageSize);

const paginationChange = (currentPage: number) => {
  curPosts.value = filtered_posts.value.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
};
</script>

<style scpoed>
.el-pagination ul {
  padding-left: 0 !important;
  margin: 0 !important;
  list-style: none !important;
}
</style>
