<script setup lang="ts">
import { provide } from 'vue'

interface Props {
  /** 折叠全部文案 */
  closeAllText?: string;
  /** 展开全部文案 */
  openAllText?: string;
}
const props = withDefaults(defineProps<Props>(), {
  closeAllText: "Full Fold",
  openAllText: "Open All"
});
const handleToggleAll = (v:boolean) => {
  isOpen.value = v
}
const isOpen = ref(true)
provide("isOpenAll", isOpen)

</script>

<template>
  <div class="dk-drawer-container">
    <div class="dk-drawer-container__header" :style="{textAlign: 'right'}">
      <el-button size="small" @click="handleToggleAll(false)">{{ props.closeAllText }}</el-button>
      <el-button size="small" @click="handleToggleAll(true)">{{ props.openAllText }}</el-button>
    </div>
    <div class="dk-drawer-container__body">
      <slot />
    </div>
  </div>
</template>
