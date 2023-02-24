<template>
  <template v-for="i in options" :key="i.status">
    <GTableStatus :status="i.status">{{ i.label }}</GTableStatus>
  </template>
</template>

<script setup lang="ts">
import { GTableStatus } from 'packages/TableStatus';
const options = reactive([
  {
    label: 'low1',
    status: 1,
  },
  {
    label: 'low2',
    status: 2,
  },
  {
    label: 'low3',
    status: 3,
  },
  {
    label: 'low4',
    status: 4,
  },
]);
</script>
