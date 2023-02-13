<script setup lang="ts">
import Refresh from './assets/refresh.svg?component';
import { GButton, GTable } from 'packages';
import { ref, reactive } from 'vue';
interface TestObj<T, P> {
  a: T;
  b: P;
}
const obj: TestObj<string, number> = {
  a: '1',
  b: 2,
};

const columns: any = [
  {
    label: 'Date',
    prop: 'date',
    headerRenderer(params: any) {
      console.log(params);
      return 'test';
    },
  },
  {
    label: 'Name',
    prop: 'name',
  },
  {
    label: 'Address',
    prop: 'address',
  },
];

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'Test 111',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'Test 111',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'Test 111',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'Test 111',
  },
];

let loading = ref(true);
const pagination = reactive({
  pageSize: 5,
  currentPage: 1,
  background: true,
  total: tableData.length,
});

setTimeout(() => {
  loading.value = false;
}, 1500);
</script>

<template>
  <div>
    <!-- <GButton type="测试" /> -->
    <!-- <GTag /> -->
    <GTable border :loading="loading" :data="tableData" :columns="columns" :pagination="pagination" />
  </div>
  <el-button type="primary">点击</el-button>
  <Refresh />
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
