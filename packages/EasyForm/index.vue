<template>
  <el-form v-bind="formPropsData" ref="formRef" :model="model" @submit.prevent>
    <template v-for="(item, index) in fieldList" :key="index">
      <!-- 单选框 -->
      <el-form-item v-if="item.type === 'radio'" v-bind="item.formItemProps">
        <el-radio-group v-model="model[item.name]" v-bind="item.groupProps">
          <el-radio
            v-for="radioItem in item.groupDatas"
            :key="radioItem[item.groupItemProps?.valueKey || 'value']"
            :label="radioItem[item.groupItemProps?.valueKey || 'value']"
          >
            {{ radioItem[item.groupItemProps?.labelkey || 'label'] }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 复选框 -->
      <el-form-item v-else-if="item.type === 'checkbox'" v-bind="item.formItemProps">
        <el-checkbox-group v-model="model[item.name]" v-bind="item.groupProps">
          <el-checkbox
            v-for="checkboxItem in item.groupDatas"
            :key="checkboxItem[item.groupItemProps?.valueKey || 'value']"
            :label="checkboxItem[item.groupItemProps?.valueKey || 'value']"
            >{{ checkboxItem[item.groupItemProps?.labelkey || 'label'] }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <!-- 下拉框 -->
      <el-form-item v-else-if="item.type === 'select'" v-bind="item.formItemProps">
        <el-select v-model="model[item.name]" v-bind="item.inputItemProps">
          <el-option
            v-for="selectItem in item.groupDatas"
            :key="selectItem[item.groupItemProps?.valueKey || 'value']"
            :label="selectItem[item.groupItemProps?.labelkey || 'label']"
            :value="selectItem[item.groupItemProps?.valueKey || 'value']"
          />
        </el-select>
      </el-form-item>
      <!-- 开关 -->
      <el-form-item v-else-if="item.type === 'switch'" v-bind="item.formItemProps">
        <el-switch v-model="model[item.name]" v-bind="item.inputItemProps" />
      </el-form-item>
      <!-- 日期选择 -->
      <el-form-item v-else-if="item.type === 'date'" v-bind="item.formItemProps">
        <el-date-picker v-model="model[item.name]" value-format="YYYY-MM-DD" v-bind="item.inputItemProps" />
      </el-form-item>
      <!-- 时间选择 -->
      <el-form-item v-else-if="item.type === 'time'" v-bind="item.formItemProps">
        <el-time-picker v-model="model[item.name]" value-format="HH:mm" v-bind="item.inputItemProps" />
      </el-form-item>
      <!-- 數字输入框 -->
      <el-form-item v-else-if="item.type === 'number'" v-bind="item.formItemProps">
        <el-input-number
          v-model="model[item.name]"
          :controls="false"
          v-bind="item.inputItemProps"
          @keyup.enter="handleKeyUp(item.enterable)"
        />
      </el-form-item>
      <!-- 传入的组件 -->
      <el-form-item v-else-if="item.type === 'custom'" v-bind="item.formItemProps">
        <component
          :is="item.component"
          v-model="model[item.name]"
          v-bind="item.customProps"
          @keyup.enter="handleKeyUp(item.enterable)"
        />
      </el-form-item>
      <!-- 默认输入框 -->
      <el-form-item v-else v-bind="item.formItemProps">
        <el-input v-model="model[item.name]" v-bind="item.inputItemProps" @keyup.enter="handleKeyUp(item.enterable)" />
      </el-form-item>
    </template>

    <el-form-item>
      <slot name="buttons" :model="model" :formRef="formRef">
        <el-button type="primary" @click="onSubmit(formRef)">{{ formPropsData.submitButtonText }}</el-button>
        <el-button v-if="formPropsData.showResetButton" type="default" @click="resetForm(formRef)">
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

defineExpose({
  formRef,
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
const onSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      emit('submit', model.value);
    } else {
      return false;
    }
  });
};
// 输入框回车事件
const handleKeyUp = (enterable: boolean | undefined) => {
  if (!enterable) return;
  onSubmit(formRef.value);
};
// 重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
<style scoped lang="scss">
.el-select {
  width: 100%;
}
:deep() {
  .el-date-editor {
    flex: 1;
    display: inline-flex;
  }
  .el-input-number {
    width: 100%;
    .el-input__wrapper {
      padding-left: 11px;
      padding-right: 11px;
    }
    .el-input__inner {
      text-align: left;
    }
  }
}
</style>
