<script setup lang="ts">
import Refresh from './assets/refresh.svg?component';
</script>

<template>
  <!-- 
  <el-button type="primary">点击</el-button>
  <Refresh /> -->
  <router-view></router-view>
</template>

<style lang="scss" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
}
</style>
