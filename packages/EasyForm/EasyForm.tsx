import 'element-plus/es/components/form/style/css';
import 'element-plus/es/components/tooltip/style/css';
import 'element-plus/es/components/input/style/css';
import 'element-plus/es/components/input-number/style/css';
import 'element-plus/es/components/date-picker/style/css';
import 'element-plus/es/components/time-picker/style/css';
import 'element-plus/es/components/time-select/style/css';
import 'element-plus/es/components/select/style/css';
import 'element-plus/es/components/checkbox-group/style/css';
import 'element-plus/es/components/checkbox/style/css';
import 'element-plus/es/components/radio-group/style/css';
import 'element-plus/es/components/radio/style/css';
import 'element-plus/es/components/switch/style/css';
import './index.scss';

import { cloneDeep } from 'lodash';
import type { FormInstance } from 'element-plus';
import * as EasyFormType from './type';
import { PropType, h } from 'vue';

const easyForm = defineComponent({
  name: 'GEasyForm',
  props: {
    /** 用于渲染页面数据 */
    fieldList: {
      type: Array as PropType<EasyFormType.FieldList>,
      default: () => [],
    },
    /** 表单绑定的数据 */
    model: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
    /** 表单配置 参照el-form */
    options: {
      type: Object as PropType<EasyFormType.FieldOptions>,
      default: () => ({}),
    },
    /** model仅用于初始化数据，不联动 */
    independent: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['submit', 'reset', 'cancel'],
  setup(props, { emit, expose, slots }) {
    const formRef = ref<FormInstance>();
    const model = ref<Record<string, any>>({});

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
    // 重置
    function resetForm() {
      if (!formRef.value) return;
      formRef.value.resetFields();
    }

    expose({
      formRef,
      onSubmit,
      resetForm,
    });

    function renderFormItem(lists: EasyFormType.FieldList, formPropsData: EasyFormType.FieldOptions) {
      return lists.map((item) => {
        return (
          <el-form-item
            style={{ width: formPropsData.formItemWidth }}
            class={{ 'has-tooltip': !!item.tooltip }}
            {...item.formItemProps}
          >
            {renderInputItem(item)}
          </el-form-item>
        );
      });
    }
    function renderInputItem(inputItem: EasyFormType.FieldItem) {
      const {
        type = 'input',
        name,
        groupDatas,
        groupItemProps,
        inputItemProps,
        customProps,
        component,
        tooltip,
      } = inputItem;
      let defaultElComponent: any = null;
      const inputItemTooltip = (tooltip: string) =>
        !!tooltip && (
          <el-tooltip effect="dark" placement="bottom" content={tooltip}>
            <span class="g-form-tooltip">i</span>
          </el-tooltip>
        );
      switch (type) {
        case 'checkbox':
        case 'radio': {
          const currentElGroups = resolveComponent(`el-${type}-group`);
          const currentEl = resolveComponent(`el-${type}`);
          return (
            <currentElGroups v-model={model.value[inputItem.name]} {...inputItem.groupProps}>
              {groupDatas?.map((groupItem) => {
                return (
                  <currentEl label={groupItem[inputItem.groupItemProps?.valueKey || 'value']}>
                    {groupItem[inputItem.groupItemProps?.labelkey || 'label']}
                    {inputItemTooltip(groupItem.tooltip)}
                  </currentEl>
                );
              })}
            </currentElGroups>
          );
        }
        case 'select':
          {
            const currentEl = resolveComponent(`el-${type}`);
            const currentElItem = resolveComponent(`el-option`);
            defaultElComponent = (
              <currentEl v-model={model.value[name]} {...inputItemProps}>
                {groupDatas?.map((selectItem) => {
                  return (
                    <currentElItem
                      label={selectItem[groupItemProps?.labelkey || 'label']}
                      value={selectItem[groupItemProps?.valueKey || 'value']}
                    ></currentElItem>
                  );
                })}
              </currentEl>
            );
          }
          break;
        case 'custom':
          defaultElComponent = h(component, { ...customProps });
          break;
        default: {
          if (!defaultElComponent) {
            defaultElComponent = resolveComponent(`el-${type}`);
          }
        }
      }
      return (
        <>
          {
            <defaultElComponent
              v-model={model.value[name]}
              value-format={type === 'time-picker' ? 'HH:mm' : 'YYYY-MM-DD'}
              controls-position="right"
              {...inputItemProps}
            ></defaultElComponent>
          }
          {inputItemTooltip(tooltip)}
        </>
      );
    }
    function renderFormButtons() {
      const defaultButtons = (
        <>
          <el-button type="primary" onClick={onSubmit}>
            {formPropsData.value.submitButtonText}
          </el-button>
          {formPropsData.value.showResetButton && (
            <el-button type="default" onClick={resetForm}>
              {formPropsData.value.resetButtonText}
            </el-button>
          )}
          {formPropsData.value.showCancelButton && (
            <el-button type="default" onClick={emit('cancel')}>
              {formPropsData.value.cancelButtonText}
            </el-button>
          )}
        </>
      );
      return <el-form-item>{slots.buttons?.({ model, formRef }) || defaultButtons}</el-form-item>;
    }
    return () => (
      <el-form ref={formRef} label-suffix=":" model={model.value} scroll-to-error class="g-easy-form" {...formPropsData.value}>
        {renderFormItem(props.fieldList, formPropsData.value)}
        {renderFormButtons()}
      </el-form>
    );
  },
});

export default easyForm;
