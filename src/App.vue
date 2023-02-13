<script setup lang="ts">
import Refresh from './assets/refresh.svg?component';
import { ref, reactive } from 'vue';
interface TestObj<T, P> {
  a: T;
  b: P;
}
const obj: TestObj<string, number> = {
  a: '1',
  b: 2,
};
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
