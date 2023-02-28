<template>
  <el-tabs v-model="activeTab" class="g-tabs">
    <el-tab-pane v-for="item in tabList" :key="item.name" :label="item.label" :name="item.name">
      <slot :name="item.name"></slot>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { TabItems } from '../types/index';

export interface TabProps {
  tabList: TabItems;
  modelValue: string;
}

export type TabEmits = (e: 'update:modelvalue' | 'tab-click', params: string) => void;

const props = withDefaults(defineProps<TabProps>(), {
  tabList: () => [],
});

const emit = defineEmits<TabEmits>();

const activeTab = ref(props.modelValue);
</script>

<style lang="scss" scoped>
.el-tabs {
  --el-color-primary: #336ffd;
  height: 100%;
  :deep(.el-tabs__header) {
    margin: 0;
    background: rgba(255, 255, 255, 0.94);
    .el-tabs__item {
      padding: 0 20px;
      color: #262626;
    }
    .el-tabs__item.is-active {
      color: #262626;
    }
    .el-tabs__active-bar {
      height: 1px;
    }
  }
  :deep(.el-tabs__content) {
    height: calc(100% - 40px);
    .el-tab-pane {
      height: 100%;
      overflow: auto;
    }
  }
}
</style>
