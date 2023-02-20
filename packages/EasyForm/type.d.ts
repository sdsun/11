import {
  FormProps,
  FormItemProps,
  InputProps,
  InputNumberProps,
  CheckboxProps,
  RadioProps,
  ElSelect,
} from 'element-plus';
import { DateTableProps } from 'element-plus/es/components/calendar/src/date-table';
import { IDatePickerType } from 'element-plus/es/components/date-picker/src/date-picker.type';
export declare type ItemType =
  | 'password'
  | 'custom'
  | 'text'
  | 'textarea'
  | 'radio'
  | 'checkbox'
  | 'select'
  | 'date'
  | 'time'
  | 'switch'
  | 'number';
// 当FiledItem的type === 'radio' | 'checkbox'时，options的参数类型

export interface FieldOptions extends Partial<FormProps> {
  showResetButton?: boolean; // 是否展示重置按钮
  showCancelButton?: boolean; // 是否展示取消按钮
  submitButtonText?: string;
  resetButtonText?: string;
  cancelButtonText?: string;
}

export interface FieldItem {
  /** 渲染的标签类型 */
  type?: ItemType;
  /** 数据中的key键名 */
  name: string; // aaaa
  /** 数据的值 */
  value?: any;

  /** el-form-item 属性 */
  formItemProps: Partial<FormItemProps>;

  component?: any;
  customProps?: any;
  
  /** 渲染的标签属性 */
  inputItemProps?: any;
  /** el-checkbox-group与el-radio-group属性和el-select */
  groupProps?: any;
  /** el-checkbox el-radio el-option 属性 */
  groupItemProps?: any;
  /** 渲染group中的子数据 */
  groupDatas?: any[];
  /* 当为输入框时，是否启用回车触发提交功能 */
  enterable?: boolean;
  // showPassword?: boolean; // 是否显示切换密码图标
  // options?: IFieldOptions;
}
// export interface IFieldOptions {
//   type?: IDatePickerType;
//   labelkey?: string;
//   valueKey?: string;
//   placeholder?: string;
//   editable?: boolean;
//   data: Record<string, any>[];
// }
