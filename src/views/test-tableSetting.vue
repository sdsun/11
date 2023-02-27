<template>
  <div>
    <GTableSetting v-model="tableColumns" :with-header="false"></GTableSetting>
    <el-button @click="sort">乱序</el-button>
    <div style="display: flex">
      <pre>{{ tableColumns }}</pre>
      <pre>{{ tableColumnsShows }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GTableSetting } from 'packages';
interface TableColumnsItemType {
  label?: string;
  prop?: string;
  width?: number;
  show?: boolean | 'left' | 'right';
  fixed?: boolean | 'left' | 'right';
  // [key: string]: any;
}
const tableColumnDatas = [
  {
    label: '第一列',
    prop: 'first',
    width: 200,
    fixed: false,
    show: true,
  },
  {
    label: '第二列',
    prop: 'second',
    width: 200,
    fixed: false,
    show: true,
  },
  {
    label: '第三列',
    prop: 'third',
    width: 200,
    fixed: false,
    show: true,
  },
];
const tableColumns = ref<TableColumnsItemType[]>([]);
const tableColumnsShows = computed(() => tableColumns.value.filter((item) => item.show));

setTimeout(() => {
  tableColumns.value = [...tableColumnDatas];
}, 2000);

function sort() {
  tableColumns.value.sort(() => Math.random() - Math.random());
  tableColumns.value = [...tableColumns.value];
}
</script>
