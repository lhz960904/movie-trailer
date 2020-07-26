<template>
  <header class="header">
    <div class="logo">
      <i class="back" />
    </div>
    <div class="tabs">
      <div class="tab-item" v-for="item in tabList" :key="item.name">
        <RouterLink :to="item.link">{{ item.name }}</RouterLink>
      </div>
    </div>
    <div class="user" @click="onClick">
      <i class="iconfont icon-user" />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheHeader",
  setup() {
    const tabList = [
      { name: "首页", link: "/recommend" },
      { name: "分类", link: "/category" },
      { name: "榜单", link: "/rank" },
      { name: "搜索", link: "/search" }
    ];

    function onClick() {
      console.log("用户");
    }

    return {
      onClick,
      tabList
    };
  }
});
</script>
