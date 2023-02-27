<template>
  <div>
    <!-- independent -->
    <GEasyForm :model="modelData" :fieldList="fieldList" :options="formOptions" @submit="submitHandler"></GEasyForm>
    <pre>{{ modelData }}</pre>
  </div>
</template>

<script setup lang="tsx">
import { FieldItem, FieldList, FieldOptions } from 'packages/EasyForm/type';
import { GEasyForm } from 'packages';
import { FormRules } from 'element-plus';

const CustomComponent = (props: any) => {
  return <props.tag>{props.msg}</props.tag>;
};
const formRules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  age: [
    { required: true, message: 'Please input Activity age', trigger: 'blur' },
    { type: 'number', min: 18, max: 55, message: 'age should be 18 to 55', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
});
const formOptions: Partial<FieldOptions> = {
  // inline: true,
  labelWidth: 130,
  statusIcon: true,
  showResetButton: true,
  showCancelButton: true,
  // formItemWidth: '400px',
  rules: formRules,
};
const fieldList = ref<FieldList>([
  {
    type: 'custom',
    name: 'custom',
    component: markRaw(CustomComponent),
    customProps: {
      tag: 'h1',
      msg: 'this is custom component msg',
      onClick: () => console.log('customProps :>> ', Math.random()),
    },
    formItemProps: {
      label: 'custom test while label is too longer',
      prop: 'custom',
    },
  },
  {
    type: 'custom',
    name: 'custom2',
    component: markRaw(CustomComponent),
    customProps: {
      tag: 'h1',
      msg: '----->自定义组件渲染区域<-----',
      onClick: () => console.log('customProps :>> ', Math.random()),
    },
    formItemProps: {
      label: '自定义组件自定义组件自定义',
      prop: 'custom2',
    },
  },
  {
    name: 'name',
    tooltip: 'this is name tooltip',
    formItemProps: {
      label: 'Activity name or Activity name',
      prop: 'name',
      style: { width: '600px' },
    },
  },
  {
    type: 'input-number',
    name: 'age',
    formItemProps: {
      label: 'age',
      prop: 'age',
      style: { width: '500px' },
    },
    inputItemProps: {
      // step: 1,
      // precision: 1
    },
  },
  {
    type: 'select',
    name: 'region',
    inputItemProps: {
      onChange(value: any) {
        console.log('select change :>> ', value);
      },
    },
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
    type: 'date-picker',
    name: 'date1',
    formItemProps: {
      label: 'Activity date',
      prop: 'date1',
      style: { width: '300px' },
    },
  },
  {
    type: 'time-picker',
    name: 'date2',
    formItemProps: {
      label: 'Activity time2',
      prop: 'date2',
      style: { width: '300px' },
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
  /** checkbox与radio 均使用的组件EasyRadiosOrCheckboxs */
  {
    type: 'checkbox',
    name: 'type',
    formItemProps: {
      label: 'Activity type',
      prop: 'type',
    },
    inputItemProps: {
      value: 'label',
      label: 'label',
      tooltip: 'tooltip',
    },
    groupDatas: [
      { value: 'Online activities', label: 'Online activities', name: 'type', tooltip: 'hahhahahhahahahahahah' },
      { value: 'Promotion activities', label: 'Promotion activities', name: 'type', tooltip: 'hahhahahhahahahahahah' },
      { value: 'Offline activities', label: 'Offline activities', name: 'type' },
      { value: 'Simple brand exposure', label: 'Simple brand exposure', name: 'type' },
    ],
  },
  /** checkbox与radio 均使用的组件EasyRadiosOrCheckboxs */
  {
    type: 'radio',
    name: 'resource',
    formItemProps: {
      label: 'Resources',
      prop: 'resource',
    },
    inputItemProps: {
      value: 'label',
      label: 'label',
      tooltip: 'label',
    },
    groupDatas: [
      { label: 'Sponsorship', name: 'resource' },
      { label: 'Venue', name: 'resource' },
    ],
  },
  {
    name: 'remark',
    tooltip: '在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。',
    formItemProps: {
      label: 'Remark',
    },
    inputItemProps: {
      type: 'textarea',
      autosize: { minRows: 2, maxRows: 4 },
    },
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
