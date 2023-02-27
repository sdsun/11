<template>
  <GTableButton
    :options="options"
    @new-change="newChange"
    @download-change="downloadChange"
    @formwork-change="formworkChange"
    @upload-change="uploadChange"
    @common-change="commonChange"
    @icon-change="iconChange"
  ></GTableButton>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { GTableButton } from 'packages/TableButton';
const newChange = (item: any) => {
  console.log(item.type, '新建');
};
const downloadChange = (item: any) => {
  console.log(item.type, '下载');
};
const formworkChange = (item: any) => {
  console.log(item.type, '模板下载');
};
const uploadChange = (item: any) => {
  console.log(item.type, '上传');
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
const iconChange = (item: any) => {
  // 带icon按钮点击事件
  switch (item.type) {
    case 'new':
      console.log(item);
      break;
    case 'upload':
      console.log(item);
      break;
    case 'download':
      console.log(item);
      break;
    case 'formwork':
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
    label: '新建',
    icon: '',
    iconOpen: false,
    iconName: '新建',
  },
  {
    type: 'upload',
    label: '上传',
    icon: 'icon-shangchuan',
    iconOpen: false,
    iconName: '上传',
  },
  {
    type: 'download',
    label: '下载',
    icon: 'icon-xiazai',
    iconOpen: false,
    iconName: '下载',
  },
  {
    type: 'formwork',
    label: '模板下载',
    icon: 'icon-xiazai',
    iconOpen: false,
    iconName: '模板下载',
  },
  {
    type: '2',
    label: '测试1',
    icon: '',
    iconOpen: false,
    iconName: '',
  },
]);
</script>
