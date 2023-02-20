<template>
  <div>
    <!-- independent -->
    <GEasyForm :model="modelData" :fieldList="fieldList" :options="formOptions" @submit="submitHandler"></GEasyForm>
    <pre>{{ modelData }}</pre>
  </div>
</template>

<script setup lang="tsx">
import { FieldItem, FieldOptions } from 'packages/EasyForm/type';
import GEasyForm from 'packages/EasyForm/index.vue';
import { defineProps } from 'vue';

const CustomComponent = (props: any) => {
  return <props.tag>{props.msg}</props.tag>;
};

const formOptions: Partial<FieldOptions> = {
  labelWidth: 120,
  statusIcon: true,
  showResetButton: true,
  showCancelButton: true,
  rules: {
    name: [{ required: true, message: '情输入' }],
  },
};

const fieldList = ref<FieldItem[]>([
  {
    type: 'custom',
    name: 'custom',
    component: markRaw(CustomComponent),
    customProps: {
      tag: 'h1',
      msg: 'this is custom component msg',
    },
    formItemProps: {
      label: 'custom',
      prop: 'custom',
    },
  },
  {
    name: 'name',
    formItemProps: {
      label: 'Activity name',
      prop: 'name',
    },
  },
  {
    type: 'number',
    name: 'age',
    formItemProps: {
      label: 'age',
      prop: 'age',
    },
  },
  {
    type: 'select',
    name: 'region',
    formItemProps: {
      label: 'Activity zone',
      prop: 'region',
    },
    groupDatas: [
      { label: 'Zone one', value: 'shanghai' },
      { label: 'Zone two', value: 'beijing' },
    ],
  },
  {
    type: 'date',
    name: 'date1',
    formItemProps: {
      label: 'Activity date',
      prop: 'date1',
    },
  },
  {
    type: 'time',
    name: 'date2',
    formItemProps: {
      label: 'Activity time2',
      prop: 'date2',
    },
  },
  {
    type: 'switch',
    name: 'delivery',
    formItemProps: {
      label: 'Instant delivery',
      prop: 'delivery',
    },
  },
  {
    type: 'checkbox',
    name: 'type',
    formItemProps: {
      label: 'Activity type',
      prop: 'type',
    },
    groupItemProps: {
      labelKey: 'label',
      valueKey: 'label',
    },
    groupDatas: [
      { label: 'Online activities', name: 'type' },
      { label: 'Promotion activities', name: 'type' },
      { label: 'Offline activities', name: 'type' },
      { label: 'Simple brand exposure', name: 'type' },
    ],
  },
  {
    type: 'radio',
    name: 'resource',
    formItemProps: {
      label: 'Resources',
      prop: 'resource',
    },
    groupItemProps: {
      labelKey: 'label',
      valueKey: 'label',
    },
    groupDatas: [
      { label: 'Sponsorship', name: 'resource' },
      { label: 'Venue', name: 'resource' },
    ],
  },
]);

const modelData = ref({
  name: '12313',
  region: 'shanghai',
  date1: '',
  date2: '2023-02-17T08:34:18.000Z',
  delivery: '',
  type: ['Online activities'],
  resource: 'Sponsorship',
});

function submitHandler(data: any) {
  if (!data) {
    // 校验不合格
    return;
  }
  console.log('submitHandler :>> ', data);
}
</script>
