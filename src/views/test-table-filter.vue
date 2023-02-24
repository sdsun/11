<script setup lang="ts">
import { GTable } from 'packages';

const options = reactive([
  {
    label: 'test',
    result: 1,
  },
  {
    label: 'test2',
    result: 2,
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
    filterType: 'select',
    filterOpts: options,
    filterOptKeys: ['label', 'result'],
    onFilter(value: any) {
      if (value) {
        tableData.value = tableData.value.filter((item: any) => {
          return item.name.indexOf(value.label) > -1;
        });
      }
    },
  },
  {
    label: 'Address',
    prop: 'address',
    filterType: 'checkbox',
    filterOpts: options,
    filterOptKeys: ['label', 'result'],
    onFilter(value: any) {
      console.log(value);
    },
  },
];

const tableData = ref([
  {
    date: '2016-05-03',
    name: 'test',
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
]);

let loading = ref(true);
const pagination = reactive({
  pageSize: 5,
  currentPage: 1,
  background: true,
  total: tableData.value.length,
});

setTimeout(() => {
  loading.value = false;
}, 1500);

const handleSearch = ([name, address]: Array<any>) => {
  console.log(name, address);
};

let table = ref(null);
let value = ref('');
const resetTable = () => {
  const ele = table.value as any;
  ele.resetFilter();
};
</script>
<template>
  <div>
    <!-- <ElDatePicker v-model="value" type="daterange"> </ElDatePicker> -->
    <ElButton @click="resetTable">Reset Filter</ElButton>
    <GTable
      ref="table"
      fullscreen
      border
      countable
      copyable
      checkable
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
