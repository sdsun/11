<template>
  <el-button type="primary" @click="onclick">这是封装后的组件{{ type }}{{ text }}</el-button>
</template>

<script setup lang="ts">
defineProps<{
  type: string;
  text?: number | 1;
}>();
defineOptions({
  name: 'GButton',
});
const onclick = (): void => {
  console.log(Math.random());
};
</script>
