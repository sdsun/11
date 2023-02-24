<template>
  <el-form v-bind="formPropsData" ref="formRef" scroll-to-error class="g-easy-form" label-suffix=":" :model="model" @submit.prevent>
    <template v-for="(item, index) in fieldList" :key="index">
      <el-form-item
        :style="{ width: formPropsData.formItemWidth }"
        :class="{ 'has-tooltip': !!item.tooltip }"
        v-bind="item.formItemProps"
      >
        <!-- 单选框组件 -->
        <el-radio-group v-if="item.type === 'radio'" v-model="model[item.name]" v-bind="item.groupProps">
          <template v-for="radioItem in item.groupDatas" :key="radioItem[item.groupItemProps?.valueKey || 'value']">
            <el-radio :label="radioItem[item.groupItemProps?.valueKey || 'value']">
              {{ radioItem[item.groupItemProps?.labelkey || 'label'] }}
              <template v-if="radioItem.tooltip">
                <el-tooltip class="box-item" effect="dark" :content="radioItem.tooltip" placement="bottom">
                  <span class="g-form-tooltip">i</span>
                </el-tooltip>
              </template>
            </el-radio>
          </template>
        </el-radio-group>

        <!-- 多选框组件 -->
        <el-checkbox-group v-else-if="item.type === 'checkbox'" v-model="model[item.name]" v-bind="item.groupProps">
          <template
            v-for="checkboxItem in item.groupDatas"
            :key="checkboxItem[item.groupItemProps?.valueKey || 'value']"
          >
            <el-checkbox :label="checkboxItem[item.groupItemProps?.valueKey || 'value']">
              {{ checkboxItem[item.groupItemProps?.labelkey || 'label'] }}
              <template v-if="checkboxItem.tooltip">
                <el-tooltip class="box-item" effect="dark" :content="checkboxItem.tooltip" placement="bottom">
                  <span class="g-form-tooltip">i</span>
                </el-tooltip>
              </template>
            </el-checkbox>
          </template>
        </el-checkbox-group>

        <!-- 下拉选择组件 -->
        <el-select v-else-if="item.type === 'select'" v-model="model[item.name]" v-bind="item.inputItemProps">
          <el-option
            v-for="selectItem in item.groupDatas"
            :key="selectItem[item.groupItemProps?.valueKey || 'value']"
            :label="selectItem[item.groupItemProps?.labelkey || 'label']"
            :value="selectItem[item.groupItemProps?.valueKey || 'value']"
          />
        </el-select>
        <!-- 开关 -->
        <el-switch v-else-if="item.type === 'switch'" v-model="model[item.name]" v-bind="item.inputItemProps" />
        <!-- 日期选择 -->
        <el-date-picker
          v-else-if="item.type === 'date-picker'"
          v-model="model[item.name]"
          value-format="YYYY-MM-DD"
          v-bind="item.inputItemProps"
        />
        <!-- 时间选择 -->
        <el-time-picker
          v-else-if="item.type === 'time-picker'"
          v-model="model[item.name]"
          value-format="HH:mm"
          v-bind="item.inputItemProps"
        />
        <!-- 數字输入框 -->
        <el-input-number
          v-else-if="item.type === 'input-number'"
          v-model="model[item.name]"
          controls-position="right"
          v-bind="item.inputItemProps"
          @keyup.enter="handleKeyUp(item.enterable)"
        />
        <!-- 传入的组件 -->
        <component
          :is="item.component"
          v-else-if="item.type === 'custom'"
          v-model="model[item.name]"
          v-bind="item.customProps"
          @keyup.enter="handleKeyUp(item.enterable)"
        />
        <!-- 默认输入框 -->
        <el-input
          v-else
          v-model="model[item.name]"
          v-bind="item.inputItemProps"
          @keyup.enter="handleKeyUp(item.enterable)"
        />

        <template v-if="item.tooltip">
          <el-tooltip class="box-item" effect="dark" :content="item.tooltip" placement="bottom" :hide-after="9999999">
            <span class="g-form-tooltip">i</span>
          </el-tooltip>
        </template>
      </el-form-item>
    </template>

    <el-form-item>
      <slot name="buttons" :model="model" :formRef="formRef">
        <el-button type="primary" @click="onSubmit">{{ formPropsData.submitButtonText }}</el-button>
        <el-button v-if="formPropsData.showResetButton" type="default" @click="resetForm">
          {{ formPropsData.resetButtonText }}
        </el-button>
        <el-button v-if="formPropsData.showCancelButton" @click="emit('cancel')">
          {{ formPropsData.cancelButtonText }}
        </el-button>
      </slot>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { cloneDeep } from 'lodash';
import { ComputedRef, ref, computed } from 'vue';
import * as EasyFormType from './type';
defineOptions({
  name: 'GEasyForm',
});
interface Props {
  fieldList: EasyFormType.FieldList;
  model?: Record<string, any>;
  options?: EasyFormType.FieldOptions;
  independent?: boolean;
}
const props = defineProps<Props>();

interface EmitEvent {
  (e: 'submit', params: any): void;
  (e: 'reset' | 'cancel'): void;
  //   (e: 'cancel'): void;
}
const emit = defineEmits<EmitEvent>();

// 表单的数据
const model = ref<Record<string, any>>({});
const formRef = ref<FormInstance>();
// 设置option默认值，如果传入自定义的配置则合并option配置项
const formPropsData: ComputedRef<EasyFormType.FieldOptions> = computed(() => {
  const option = {
    labelPosition: 'right',
    disabled: false,
    submitButtonText: '提交',
    resetButtonText: '重置',
    cancelButtonText: '取消',
  };
  return Object.assign(option, props?.options);
});

// 根据fieldList初始化model， 如果model有传值就用传递的model数据模型，否则就给上面声明的model设置相应的(key,value) [item.prop]， item.value是表单的默认值（选填）
props.fieldList.forEach((item: EasyFormType.FieldItem) => {
  // 如果类型为checkbox，默认值需要设置一个空数组
  const value = item.type === 'checkbox' ? [] : '';
  const dataName = item.name;
  const { independent } = props;
  props.model
    ? (model.value = independent ? cloneDeep(props.model) : props.model)
    : (model.value[dataName] = item.value || value);
});
// 提交按钮
function onSubmit() {
  if (!formRef.value) return;
  formRef.value.validate((valid) => {
    if (valid) {
      emit('submit', model.value);
    } else {
      return false;
    }
  });
}
// 输入框回车事件
function handleKeyUp(enterable: boolean | undefined) {
  if (!enterable) return;
  onSubmit();
}
// 重置
function resetForm() {
  if (!formRef.value) return;
  formRef.value.resetFields();
}

defineExpose({
  formRef,
  onSubmit,
  resetForm,
});
</script>
<style lang="scss">
@import 'index.scss';
</style>
