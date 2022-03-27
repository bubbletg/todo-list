<template>
  <div class="layout_wraps">
    <router-view />
  </div>
  <Tabbar v-model="active">
    <TabbarItem
      v-for="item in tabList"
      :key="item.meta?.title"
      :to="item.path"
      :icon="`'' iconfont ${item.meta?.icon}`"
    >
      {{ item.meta?.title }}
    </TabbarItem>
  </Tabbar>
</template>
<script lang="ts" setup>
import { ref } from '@vue/runtime-core'
import { Tabbar, TabbarItem } from 'vant'
import { routes } from '@/router'
// 拿到菜单栏列表
const tabList = routes.filter(item => item.path === '/')[0].children
const active = ref(0)
</script>
<style lang="scss" scoped>
.layout_wraps{
  width: 100%;
  height: calc(100vh - 50px);
}
</style>
