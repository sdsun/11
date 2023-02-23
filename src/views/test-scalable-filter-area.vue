<template>
  <div>
    <GScalableFilterArea v-model="model" :filter-items="filterItems" />
  </div>
</template>

<script lang="ts" setup>
import { GScalableFilterArea } from 'packages';
import { ScalableFilters, FilterModelValue } from 'packages/ScalableFilterArea/types';

const filterItems = ref<ScalableFilters>([
  {
    type: 'select',
    label: 'test1',
    options: {
      attributeName: 'test1',
    },
  },
  {
    type: 'text',
    label: 'test2',
    options: {
      attributeName: 'test2',
    },
  },
  {
    type: 'date',
    label: 'test3333345555555555',
    options: {
      attributeName: 'test3',
      dateType: 'week',
    },
  },
  {
    type: 'text',
    label: 'test4',
    options: {
      attributeName: 'test4',
    },
  },
  {
    type: 'text',
    label: 'test5',
    options: {
      attributeName: 'test5',
    },
  },
  {
    type: 'text',
    label: 'test6',
    options: {
      attributeName: 'test6',
    },
  },
  {
    type: 'text',
    label: 'test7',
    options: {
      attributeName: 'test7',
    },
  },
]);
const model = ref<FilterModelValue>({
  test2: '11',
});
</script>
