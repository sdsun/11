<script setup lang="ts">
import { GButton, GTable } from 'packages';

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
    <GTable border :loading="loading" :data="tableData" :columns="columns" :pagination="pagination" />
  </div>
</template>

<style scoped></style>
