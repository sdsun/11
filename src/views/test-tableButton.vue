<template>
  <GTableButton
    @newChange="newChange"
    @downloadChange="downloadChange"
    @uploadChange="uploadChange"
    @commonChange="commonChange"
    :options="options"
  ></GTableButton>
</template>

<script setup lang="ts">
import { GTableButton } from 'packages/TableButton';
const newChange = (item: any) => {
  console.log(item, '父组件');
};
const downloadChange = (item: any) => {
  console.log(item, '父组件');
};
const uploadChange = (item: any) => {
  console.log(item, '父组件');
};
const commonChange = (item: any) => {
  // 普通按钮
  switch (item.type) {
    case '1':
      console.log(item);
      break;
    case '2':
      console.log(item);
      break;
    // default:
    //   console.log('1');
  }
};
const options = reactive([
  {
    type: 'new',
    label: 'low1',
    status: 1,
  },
  {
    type: 'upload',
    label: 'low2',
    status: 2,
  },
  {
    type: 'download',
    label: 'low3',
    status: 3,
  },
  {
    type: '1',
    label: 'low4',
    status: 4,
  },
  {
    type: '2',
    label: 'low5',
    status: 5,
  },
  {
    type: '',
    label: 'low6',
    status: 6,
  },
]);
</script>
