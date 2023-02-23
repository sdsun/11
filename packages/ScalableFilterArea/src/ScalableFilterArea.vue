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
    <template v-for="(item, index) in displayedFilterItems" :key="index">
      <div v-if="index % 3 === 1"></div>
      <div class="item-label">{{ item.label }}</div>
      <el-form-item :prop="item.options.attributeName">
        <el-select
          v-if="item.type === 'select'"
          v-model="model[item.options.attributeName]"
          :placeholder="item.options.placeholder ?? ' '"
          multiple
          collapse-tags
          collapse-tags-tooltip
          filterable
          clearable
        >
          <el-option
            v-for="option in item.options.selectOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
        <el-select-v2
          v-else-if="item.type === 'virtual-select'"
          v-model="model[item.options.attributeName]"
          :options="item.options.selectOptions"
          :placeholder="item.options.placeholder ?? ' '"
          multiple
          collapse-tags
          collapse-tags-tooltip
          filterable
          clearable
        />
        <el-cascader
          v-else-if="item.type === 'cascader'"
          v-model="model[item.options.attributeName]"
          :options="item.options.cascaderOptions ?? []"
          :props="{ multiple: true }"
          :placeholder="item.options.placeholder ?? ' '"
          collapse-tags
          collapse-tags-tooltip
          filterable
          clearable
        />
        <el-date-picker
          v-else-if="item.type === 'date'"
          v-model="model[item.options.attributeName]"
          :type="item.options.dateType"
          :value-format="dateValueFormat(item.options?.dateType ?? 'date')"
          :placeholder="item.options.placeholder ?? ''"
          clearable
        />
        <el-input
          v-else
          v-model="model[item.options.attributeName]"
          :placeholder="item.options.placeholder ?? ''"
          clearable
        />
      </el-form-item>
      <div v-if="index % 3 === 1"></div>
    </template>
    <el-form-item class="last-item" label-width="0">
      <el-button type="primary" link @click="toggleExpand">{{ toggleName }}</el-button>
      <el-button type="default" @click="handleReset">Reset</el-button>
      <el-button type="primary" @click="handleSearch">Search</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { ref, computed, reactive } from 'vue';
import { FilterModelValue, ScalableFilters, FilterDateType } from '../types/index';
import { DATE_VALUE_FORMAT } from './scalableFilterArea';

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
  rowNum: 5,
  labelWidth: 0,
});
const emit = defineEmits<FilterAreaEmits>();

const formRef = ref<FormInstance>();

const model = reactive<FilterModelValue>(props.modelValue);
watch(model, (newVal) => {
  emit('update:modelvalue', newVal);
});

const isExpanded = ref<boolean>(false);
const toggleName = computed(() => {
  return isExpanded.value ? 'Collapse' : 'Expand';
});
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

const displayedFilterItems = computed<ScalableFilters>(() => {
  return isExpanded.value ? props.filterItems : props.filterItems.slice(0, props.rowNum);
});

const dateValueFormat = (type: FilterDateType) => {
  return DATE_VALUE_FORMAT[type];
};

const handleReset = () => {
  if (!formRef.value) return;
  formRef.value.resetFields();
};
const handleSearch = () => {
  emit('submit', model);
};
</script>

<style lang="scss" scoped>
.scalable-filter-area {
  display: grid;
  // grid-template-columns: repeat(3, calc(calc(100% - 20px) / 3));
  // grid-template-columns: auto 1fr auto 1fr auto 1fr;
  grid-template-columns: auto 180px 1fr auto 180px 1fr auto 180px;
  grid-gap: 10px;
  .item-label {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    max-width: 200px;
    font-size: 14px;
    text-align: right;
    line-height: 1.2;
    word-break: break-all;
  }
  :deep(.el-form-item) {
    margin-bottom: 0;
    .el-form-item__label {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      line-height: 1.2;
      text-align: right;
    }
    .el-select,
    .el-select-v2,
    .el-cascader,
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
    grid-column-start: 7;
    .el-form-item__content {
      justify-content: flex-end;
    }
  }
}
</style>
