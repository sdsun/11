<script setup lang="ts">
import { GTable } from 'packages';

const options = reactive([
  {
    label: 'test',
    result: 1,
  },
]);
const columns: any = [
  {
    label: 'Date',
    prop: 'date',
    headerRenderer(params: any) {
      return 'test';
    },
  },
  {
    label: 'Name',
    prop: 'name',
    searchType: 'select',
    searchOpts: options,
    searchOptKeys: ['label', 'result'],
  },
  {
    label: 'Address',
    prop: 'address',
    searchType: 'input',
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
    name: 'Tomasdklajskldjaklsjdklasjdklqwoieua alsd jalsjd lkjqweiouqwe asdiquwoeizx我是谁',
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

const handleSearch = ([name, address]: Array<any>) => {
  console.log(name, address);
};
</script>
<template>
  <div>
    <GTable
      fullscreen
      border
      countable
      showOverflowTooltip
      headerAlign="left"
      :loading="loading"
      :data="tableData"
      :columns="columns"
      :pagination="pagination"
      @search="handleSearch"
    />
  </div>
</template>

<!-- <style scoped></style> -->
