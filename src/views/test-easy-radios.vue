<template>
  <div>
    <h1>g-easy-radios</h1>
    <g-easy-radios v-model="radioValue1" :lists="radiosLists"></g-easy-radios>
    <h1>radioValue1 == {{ radioValue1 }}</h1>
    <g-easy-radios
      v-model="radioValue2"
      :lists="radiosLists"
      tooltip="value"
      :label="(item: any) => item.label + ' - ' + item.value"
    ></g-easy-radios>
    <h1>radioValue2 == {{ radioValue2 }}</h1>
    <hr />
    <h1>g-easy-checkboxs</h1>
    <g-easy-checkboxs v-model="radioValue4" disabled :lists="radiosLists"></g-easy-checkboxs>
    <g-easy-checkboxs v-model="radioValue5" :lists="radiosLists" tooltip="value"></g-easy-checkboxs>
    <hr />
    <GEasyRadiosOrCheckboxs v-model="radioValue3" :lists="radiosLists"></GEasyRadiosOrCheckboxs>
    <GEasyRadiosOrCheckboxs
      v-model="radioValue3"
      :lists="radiosLists"
      tooltip="value"
      :label="(item: any) => item.label + ' - ' + item.value"
    ></GEasyRadiosOrCheckboxs>
  </div>
</template>

<script setup lang="tsx">
import { GEasyRadios, GEasyCheckboxs, GEasyRadiosOrCheckboxs } from 'packages';
const radiosLists = ref<any[]>([
  {
    label: 'Option A',
    value: 'A',
  },
  {
    label: 'Option B',
    value: 'B',
  },
  {
    label: 'Option B',
    value: 'C',
  },
]);

setTimeout(() => {
  radiosLists.value[0].disabled = true;
}, 2000);

const radioValue1 = ref('A');
const radioValue2 = ref('B');
const radioValue3 = ref([]);
const radioValue4 = ref([]);
const radioValue5 = ref([]);
</script>
