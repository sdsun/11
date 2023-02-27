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
      <div v-if="(!isLarge && index % 3 === 1) || (isLarge && index % 4 === 1)"></div>
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
        <el-radio-group v-else-if="item.type === 'radio'" v-model="model[item.options.attributeName]">
          <el-radio v-for="radio in item.options.radioOptions" :key="radio.value" :label="radio.value">{{
            radio.label
          }}</el-radio>
        </el-radio-group>
        <el-checkbox-group v-else-if="item.type === 'checkbox'" v-model="model[item.options.attributeName]">
          <el-checkbox
            v-for="checkbox in item.options.checkboxOptions"
            :key="checkbox.value"
            :label="checkbox.value"
            :name="checkbox.name"
            >{{ checkbox.label }}</el-checkbox
          >
        </el-checkbox-group>
        <el-input
          v-else
          v-model="model[item.options.attributeName]"
          :placeholder="item.options.placeholder ?? ''"
          clearable
        />
      </el-form-item>
      <div v-if="(!isLarge && index % 3 === 1) || (isLarge && index % 4 === 1) || (isLarge && index % 4 === 2)"></div>
    </template>
    <el-form-item class="last-item" label-width="0">
      <el-button type="primary" link @click="toggleExpand"
        >{{ toggleName }}<i class="iconfont" :class="toggleIcon"></i
      ></el-button>
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

const isLarge = ref(window.screen.width >= 1900);
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

const displayedFilterItems = computed<ScalableFilters>(() => {
  return isExpanded.value ? props.filterItems : props.filterItems.slice(0, isLarge.value ? 7 : 5);
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
  grid-template-columns: auto 260px 1fr auto 260px 1fr auto 260px;
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
    .iconfont {
      font-size: 12px;
    }
    .el-date-editor--datetimerange {
      padding: 0;
      .el-range__icon {
        display: none;
      }
      .el-range-input {
        flex: 1;
        // font-size: 13px;
      }
      .el-range-separator {
        flex: 0;
        padding: 0;
      }
      .el-range__close-icon {
        position: absolute;
        right: 2px;
        top: 1px;
        background: #ffffff;
        height: 30px;
      }
    }
  }
  :deep(.last-item) {
    grid-column-end: -1;
    // grid-column-start: 7;
    .el-form-item__content {
      justify-content: flex-end;
    }
  }
}
@media screen and (min-width: 1900px) {
  .scalable-filter-area {
    grid-template-columns: auto 270px 1fr auto 270px 1fr auto 270px 1fr auto 270px;
  }
}
</style>
