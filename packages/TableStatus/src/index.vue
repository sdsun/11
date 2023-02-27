<script lang="ts">
export default {
  name: 'GTableStatus',
  inheritAttrs: false,
};
</script>
<template>
  <div v-show="statusData.status === 1" class="status" :class="statusData.color ? statusData.color : 'status1'">
    <slot></slot>
  </div>
  <div v-show="statusData.status === 2" class="status" :class="statusData.color ? statusData.color : 'status1'">
    <slot></slot>
  </div>
  <div v-show="statusData.status === 3" class="status" :class="statusData.color ? statusData.color : 'status1'">
    <slot></slot>
  </div>
  <div v-show="statusData.status === 4" class="status" :class="statusData.color ? statusData.color : 'status1'">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, toRefs, defineEmits, watch, ref } from 'vue';
/*
1:黄
2:蓝
3:绿
4:红
可根据后端字段调整
*/
const props = defineProps({
  statusData: {
    type: Object,
    default: '',
  },
});
onBeforeMount(() => {
  console.log(props, 'props====');
});
</script>
<style lang="scss" scoped>
.status {
  font-size: 12px;
  // display: inline-block;
  width: 52px;
  // height: 22px;
  font-weight: 500;
  text-align: center;
  border-radius: 3px;
  cursor: pointer;
}
.status1 {
  color: #ff9500;
  background: #fff7e6;
  border: 1px solid #ffd591;
}
.status2 {
  color: #336ffd;
  background: #f0f9ff;
  border: 1px solid #a1d1ff;
}
.status3 {
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  color: #10a710;
}
.status4 {
  background: #fff1f0;
  border: 1px solid #ffa39e;
  color: #ff4d4f;
}
</style>
