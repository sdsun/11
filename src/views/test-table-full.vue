<template>
  <div>
    <GTableSetting v-model="columns" />
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

<script setup lang="ts">
import { GTable } from 'packages';
import { GTableSetting } from 'packages/TableSetting';

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
const sourceData = ref<Array<any>>([]); // 源数据缓存
const tableData = ref<Array<any>>([]);
const countryData = ref<Array<any>>([
  {
    label: 'HPK',
    value: 0,
  },
  {
    label: 'HAK',
    value: 1,
  },
  {
    label: 'HBK',
    value: 2,
  },
  {
    label: 'HCK',
    value: 3,
  },
]);
const sideData = ref<Array<any>>([
  {
    label: 'Southside',
    value: 0,
  },
  {
    label: 'Northside',
    value: 1,
  },
  {
    label: 'Westside',
    value: 2,
  },
  {
    label: 'Eastside',
    value: 3,
  },
]);
for (let i = 0; i < 100; i++) {
  sourceData.value.push({
    code: `HPKTEM20220000${i}`,
    name: `HPK SHOP ${i}`,
    dimension: '500',
    country: countryData.value[i % countryData.value.length].label,
    address: sideData.value[i % sideData.value.length].label,
  });
}

const columns: any = ref([
  {
    label: 'Shop Code',
    prop: 'code',
    width: 400,
    sortable: true,
  },
  {
    label: 'Shop Name',
    prop: 'name',
    width: 400,
  },
  {
    label: 'Shop Dimension',
    prop: 'dimension',
    width: 400,
  },
  {
    label: 'Country',
    prop: 'country',
    width: 400,
    filterType: 'select',
    filterOpts: countryData,
    filterOptKeys: ['label', 'value'],
    onFilter(value: any) {
      if (value) {
        loading.value = true;
        setTimeout(() => {
          tableData.value = sourceData.value
            .filter((item: any) => {
              return item.country.indexOf(value.label) > -1;
            })
            .slice(0, pagination.pageSize);
          loading.value = false;
        }, 500);
      } else {
        // reset
        resetTableData();
      }
    },
  },
  {
    label: 'Address',
    prop: 'address',
    width: 400,
    filterType: 'checkbox',
    filterOpts: sideData,
    filterOptKeys: ['label', 'value'],
    onFilter(value: any) {
      if (value) {
        console.log(value);
      } else {
        // reset
        resetTableData();
      }
    },
  },
]);
const resetTableData = () => {
  tableData.value = sourceData.value.slice(0, pagination.pageSize);
};

const loading = ref(true);
const pagination = reactive({
  pageSize: 5,
  currentPage: 1,
  background: true,
  total: sourceData.value.length,
});

setTimeout(() => {
  loading.value = false;
  tableData.value = sourceData.value.slice(0, pagination.pageSize);
}, 1500);

const handleSearch = ([name, address]: Array<any>) => {
  console.log(name, address);
};
</script>
