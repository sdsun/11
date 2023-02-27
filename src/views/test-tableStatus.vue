<template>
  <template v-for="i in options" :key="i.status">
    <GTableStatus :statusData="i">{{ i.label }}</GTableStatus>
  </template>
</template>

<script setup lang="ts">
import { GTableStatus } from 'packages/TableStatus';
/*
status1:黄
status2:蓝
status3:绿
status4:红
可根据后端字段调整
*/
import { reactive } from 'vue';
const options = reactive([
  {
    label: 'low1',
    color: 'status1',
    status: 1,
  },
  {
    label: 'low2',
    color: 'status2',
    status: 2,
  },
  {
    label: 'low3',
    color: 'status3',
    status: 3,
  },
  {
    label: 'low4',
    color: 'status2',
    status: 4,
  },
]);
</script>
