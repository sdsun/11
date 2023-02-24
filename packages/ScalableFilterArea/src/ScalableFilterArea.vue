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
      :class="{
        'is-date':
          item.type === 'date' && (item.options.dateType === 'daterange' || item.options.dateType === 'datetimerange'),
      }"
    >
      <el-select
        v-if="item.type === 'select'"
        v-model="model[item.options.attributeName]"
        :placeholder="item.options.placeholder ?? ' '"
        :multiple="item.options.multiple"
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
    <el-form-item class="last-item" label-width="0">
      <el-button type="primary" link @click="toggleExpand"
        >{{ toggleName }} <i class="iconfont" :class="toggleIcon"></i
      ></el-button>
      <el-button type="default" @click="handleReset">Reset</el-button>
      <el-button type="primary" @click="handleSearch">Search</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { ref, computed, reactive } from 'vue';
import { FilterModelValue, ScalableFilters, FilterDateType, FilterItem } from '../types/index';
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
  labelWidth: 'auto',
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
const toggleIcon = computed(() => {
  return isExpanded.value ? 'icon-up' : 'icon-down';
});
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

const isLarge = ref(window.screen.width >= 1900);
const isRange = (item: FilterItem) => {
  return item.type === 'date' && (item.options.dateType === 'daterange' || item.options.dateType === 'datetimerange');
};
const displayedFilterItems = computed<ScalableFilters>(() => {
  if (isExpanded.value) {
    return props.filterItems;
  } else if (isLarge.value) {
    if (props.filterItems.length <= 3) {
      return props.filterItems;
    } else {
      let count = 0;
      const maxSpan = 7;
      let spanCount = 0;
      for (let item of props.filterItems) {
        if (isRange(item)) {
          spanCount += 2;
        } else {
          spanCount += 1;
        }
        if (spanCount > maxSpan) {
          break;
        }
        count += 1;
      }
      if (props.filterItems.slice(0, 3).filter((item) => isRange(item)).length === 2) {
        count -= 1;
      }
      return props.filterItems.slice(0, count);
    }
  } else {
    if (props.filterItems.length <= 2) {
      return props.filterItems;
    } else {
      let count = 0;
      const maxSpan = 5;
      let spanCount = 0;
      for (let item of props.filterItems) {
        if (isRange(item)) {
          spanCount += 2;
        } else {
          spanCount += 1;
        }
        if (spanCount > maxSpan) {
          break;
        }
        count += 1;
      }
      if (isRange(props.filterItems[0]) && isRange(props.filterItems[1])) {
        count -= 1;
      }
      return props.filterItems.slice(0, count);
    }
  }
});

const dateValueFormat = (type: FilterDateType) => {
  return DATE_VALUE_FORMAT[type];
};

const handleReset = () => {
  if (!formRef.value) return;
  formRef.value.resetFields();
  emit('reset');
};
const handleSearch = () => {
  emit('submit', model);
};
</script>

<style lang="scss" scoped>
.scalable-filter-area {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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
    align-items: center;
    .el-form-item__label {
      max-width: 200px;
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
    .iconfont {
      font-size: 12px;
    }
  }
  :deep(.last-item) {
    grid-column-end: -1;
    .el-form-item__content {
      justify-content: flex-end;
    }
  }
  .is-date {
    grid-column-start: span 2;
  }
}

@media screen and (min-width: 1900px) {
  .scalable-filter-area {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>
