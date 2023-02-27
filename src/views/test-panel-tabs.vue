<template>
  <GPanelTabs v-model="active" :tab-list="tabList">
    <template #first><TestPanelTable /></template>
    <template #second><TestDrawPanel /></template>
    <template #third><TestEasyForm /></template>
  </GPanelTabs>
</template>

<script setup lang="ts">
import { GPanelTabs } from 'packages';
import TestDrawPanel from './test-drawerPanel.vue';
import TestPanelTable from './test-panel-table.vue';
import TestEasyForm from './test-easyform.vue';

const active = ref('first');

const tabList = ref([
  {
    label: 'My New Draft',
    name: 'first',
  },
  {
    label: 'My New Submitted',
    name: 'second',
  },
  {
    label: 'My Responsible Shops',
    name: 'third',
  },
]);
</script>
