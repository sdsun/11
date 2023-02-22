import {
  FormProps,
  FormItemProps,
  InputProps,
  InputNumberProps,
  CheckboxProps,
  RadioProps,
  ElSelect,
  switchProps,
  datePickTypes,
  TimePickerDefaultProps,
} from 'element-plus';
import { ComponentPublicInstance } from 'vue';
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
export interface FieldFormItemProps extends Partial<FormItemProps> {
  style?: any;
}
// export type AllInputItemProps<T> = Partial<Record<keyof T, any>>;
// type selectProps = typeof ElSelect['__defaults']
// export type InputItemProps = Partial<InputProps | InputNumberProps | switchProps | TimePickerDefaultProps>;
// export type InputItemProps = Partial<Record<keyof InputProps, any>>;
// export type InputItemProps = Partial<InputProps>;

export interface FieldItem {
  /** 渲染的标签类型 */
  type?: ItemType;
  /** 数据中的key键名 */
  name: string; // aaaa
  /** 数据的值 */
  value?: any;

  /** el-form-item 属性 */
  formItemProps: FieldFormItemProps;

  component?: any;
  customProps?: any;

  /** 渲染的标签属性 */
  inputItemProps?: any;
  // inputItemProps?: InputItemProps;
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
export type FieldList = FieldItem[];
// export interface IFieldOptions {
//   type?: IDatePickerType;
//   labelkey?: string;
//   valueKey?: string;
//   placeholder?: string;
//   editable?: boolean;
//   data: Record<string, any>[];
// }
