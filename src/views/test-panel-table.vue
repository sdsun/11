<template>
  <GPanelTable>
    <template #form> <GScalableFilterArea v-model="model" :filter-items="filterItems" /> </template>
    <template #operation>
      <el-button type="primary">New</el-button>
      <el-button type="primary">Template</el-button>
    </template>
    <template #control>
      <el-icon><FullScreen /></el-icon>
      <el-icon><Setting /></el-icon>
    </template>
    <template #table>
      <TestTable />
    </template>
  </GPanelTable>
</template>

<script setup lang="ts">
import { GPanelTable, GScalableFilterArea } from 'packages';

import { ScalableFilters, FilterModelValue } from 'packages/ScalableFilterArea/types';
import TestTable from './test-table.vue';

const filterItems = ref<ScalableFilters>([
  {
    type: 'select',
    label: 'mutil-select',
    options: {
      attributeName: 'test1',
      selectOptions: [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ],
      multiple: true,
      placeholder: 'Please input maintain batch id',
    },
  },
  {
    type: 'date',
    label: 'datetime-range',
    options: {
      attributeName: 'test3',
      dateType: 'datetimerange',
    },
  },
  {
    type: 'date',
    label: 'date-range',
    options: {
      attributeName: 'test4',
      dateType: 'daterange',
    },
  },
  {
    type: 'virtual-select',
    label: 'virtual-select',
    options: {
      attributeName: 'test2',
      selectOptions: [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
        {
          value: 'Option6',
          label: 'Option6',
        },
        {
          value: 'Option7',
          label: 'Option7',
        },
        {
          value: 'Option8',
          label: 'Option8',
        },
        {
          value: 'Option9',
          label: 'Option9',
        },
        {
          value: 'Option10',
          label: 'Option10',
        },
      ],
    },
  },
  {
    type: 'date',
    label: 'date-month',
    options: {
      attributeName: 'test5',
      dateType: 'month',
    },
  },
  {
    type: 'text',
    label: 'text',
    options: {
      attributeName: 'test6',
    },
  },
  {
    type: 'cascader',
    label: 'cascader',
    options: {
      attributeName: 'test7',
      cascaderOptions: [
        {
          value: 1,
          label: 'Asia',
          children: [
            {
              value: 2,
              label: 'China',
              children: [
                { value: 3, label: 'Beijing' },
                { value: 4, label: 'Shanghai' },
                { value: 5, label: 'Hangzhou' },
              ],
            },
            {
              value: 6,
              label: 'Japan',
              children: [
                { value: 7, label: 'Tokyo' },
                { value: 8, label: 'Osaka' },
                { value: 9, label: 'Kyoto' },
              ],
            },
            {
              value: 10,
              label: 'Korea',
              children: [
                { value: 11, label: 'Seoul' },
                { value: 12, label: 'Busan' },
                { value: 13, label: 'Taegu' },
              ],
            },
          ],
        },
        {
          value: 14,
          label: 'Europe',
          children: [
            {
              value: 15,
              label: 'France',
              children: [
                { value: 16, label: 'Paris' },
                { value: 17, label: 'Marseille' },
                { value: 18, label: 'Lyon' },
              ],
            },
            {
              value: 19,
              label: 'UK',
              children: [
                { value: 20, label: 'London' },
                { value: 21, label: 'Birmingham' },
                { value: 22, label: 'Manchester' },
              ],
            },
          ],
        },
        {
          value: 23,
          label: 'North America',
          children: [
            {
              value: 24,
              label: 'US',
              children: [
                { value: 25, label: 'New York' },
                { value: 26, label: 'Los Angeles' },
                { value: 27, label: 'Washington' },
              ],
            },
            {
              value: 28,
              label: 'Canada',
              children: [
                { value: 29, label: 'Toronto' },
                { value: 30, label: 'Montreal' },
                { value: 31, label: 'Ottawa' },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    type: 'text',
    label: 'long-long-long-long-long-long-long-long',
    options: {
      attributeName: 'test6',
    },
  },
]);
const model = reactive<FilterModelValue>({
  test2: [],
});
</script>
