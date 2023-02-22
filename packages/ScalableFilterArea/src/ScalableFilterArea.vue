<template>
  <el-form
    ref="formRef"
    :model="model"
    :label-width="props.labelWidth"
    label-suffix=":"
    :show-message="false"
    class="scalable-filter-area"
    @submit.prevent
  >
    <el-form-item
      v-for="(item, index) in displayedFilterItems"
      :key="index"
      :label="item.label"
      :prop="item.options.attributeName"
    >
      <el-select
        v-if="item.type === 'select'"
        v-model="model[item.options.attributeName]"
        :placeholder="item.options.placeholder ?? ''"
      >
      </el-select>
      <el-date-picker
        v-else-if="item.type === 'date'"
        v-model="model[item.options.attributeName]"
        :type="item.options.dateType"
        :placeholder="item.options.placeholder ?? ''"
      />
      <el-input v-else v-model="model[item.options.attributeName]" :placeholder="item.options.placeholder ?? ''" />
    </el-form-item>
    <el-form-item class="last-item" label-width="0">
      <el-button type="primary" link @click="toggleExpand">{{ toggleName }}</el-button>
      <el-button type="default" @click="handleReset">Reset</el-button>
      <el-button type="primary" @click="handleSearch">Search</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { ref, computed } from 'vue';
import { FilterModelValue, ScalableFilters } from '../types/index';

export interface FilterAreaProps {
  modelValue: FilterModelValue;
  filterItems: ScalableFilters;
  rowNum?: number;
  labelWidth?: number | 'auto';
}

export interface FilterAreaEmits {
  (e: 'submit' | 'update:modelvalue', params: FilterModelValue): void;
  (e: 'reset'): void;
}

const props = withDefaults(defineProps<FilterAreaProps>(), {
  modelValue: () => ({}),
  filterItems: () => [],
  rowNum: 3,
  labelWidth: 'auto',
});
const emit = defineEmits<FilterAreaEmits>();

const formRef = ref<FormInstance>();

const model = ref<FilterModelValue>({});

const isExpanded = ref<boolean>(false);
const toggleName = computed(() => {
  return isExpanded.value ? 'Collapse' : 'Expand';
});
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

const displayedFilterItems = computed<ScalableFilters>(() => {
  return isExpanded.value ? props.filterItems : props.filterItems.slice(0, props.rowNum - 1);
});

const handleReset = () => {
  if (!formRef.value) return;
  formRef.value.resetFields();
};
const handleSearch = () => {
  emit('submit', model.value);
};
</script>

<style lang="scss" scoped>
.scalable-filter-area {
  display: grid;
  grid-template-columns: repeat(3, calc(calc(100% - 20px) / 3));
  grid-gap: 10px;
  :deep(.el-form-item) {
    margin-bottom: 0;
    .el-select,
    .el-date-editor {
      width: 100%;
      .el-input__wrapper {
        width: 100%;
        box-sizing: border-box;
      }
    }
  }
  :deep(.last-item) {
    grid-column-end: -1;
    .el-form-item__content {
      justify-content: flex-end;
    }
  }
}
</style>
