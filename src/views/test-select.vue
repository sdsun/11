<template>
  <GSelect v-model="test" clearable :options="options" :option-keys="['label', 'result']"></GSelect>
</template>

<script setup lang="ts">
import { GSelect } from 'packages';
const options = reactive([
  {
    label: 'test',
    result: 1,
  },
]);
setTimeout(() => {
  options.push({ label: '測試', result: 2 });
}, 2000);
const test = ref('');
watch(test, (newVal) => {
  console.log(newVal);
});
</script>
