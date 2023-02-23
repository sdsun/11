<script lang="ts">
export default {
  name: 'GTableButton',
  inheritAttrs: false,
};
</script>
<template>
  <div v-for="(item, index) in buttonData" :key="index">
    <span v-if="item.type === 'new'" @click="newEvent(item)" class="status">{{ item.label }}</span>
    <span v-else-if="item.type === 'download'" @click="downloadEvent(item)" class="status">{{ item.label }}</span>
    <span v-else-if="item.type === 'upload'" @click="uploadEvent(item)" class="status">{{ item.label }}</span>
    <span v-else @click="commonEvent(item)" class="status">{{ item.label }}</span>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, toRefs, defineEmits, watch, ref } from 'vue';
import { ScalableFilters } from '../types/index';
const emits = defineEmits(['newChange', 'downloadChange', 'uploadChange', 'commonChange']);
const props = defineProps({
  options: {
    type: Array,
    default: [],
  },
});
const newEvent = (item: any) => {
  // 新建
  emits('newChange', item);
};
const downloadEvent = (item: any) => {
  // 下载
  emits('downloadChange', item);
};
const uploadEvent = (item: any) => {
  // 上传
  emits('uploadChange', item);
};
const commonEvent = (item: any) => {
  // 普通
  emits('commonChange', item);
};
const buttonData = computed<ScalableFilters>(() => {
  return props.options ? props.options : [];
});
</script>
<style lang="scss" scoped>
.status {
  font-size: 12px;
  display: inline-block;
  width: 52px;
  height: 22px;
  font-weight: 500;
  text-align: center;
  border-radius: 3px;
  margin-bottom: 5px;
  color: #336ffd;
  background: #f0f9ff;
  border: 1px solid #a1d1ff;
  cursor: pointer;
}
</style>
