import { FormProps, FormItemProps, InputProps, InputNumberProps, CheckboxProps, RadioProps, ElSelect } from 'element-plus';
import { DateTableProps } from 'element-plus/es/components/calendar/src/date-table';
import { IDatePickerType } from 'element-plus/es/components/date-picker/src/date-picker.type';
export declare type ItemType = 'password' | 'text' | 'textarea' | 'radio' | 'checkbox' | 'select' | 'date' | 'time' | 'switch' | 'number';
// 当FiledItem的type === 'radio' | 'checkbox'时，options的参数类型

export interface FieldOptions extends Partial<FormProps> {
  showResetButton?: boolean; // 是否展示重置按钮
  showCancelButton?: boolean; // 是否展示取消按钮
  submitButtonText?: string;
  resetButtonText?: string;
  cancelButtonText?: string;
}

export interface FieldItem  {
  type?: ItemType;
  name: string;
  formItemProps: Partial<FormItemProps>;
  inputItemProps?: any;
  groupProps?: any;
  groupItemProps?: any;
  groupDatas?: any[],
  // inputItem: Partial<InputProps | InputNumberProps | CheckboxProps | RadioProps | DateTableProps | select>
  value?: any;
  showPassword?: boolean; // 是否显示切换密码图标
  enterable?: boolean; // 当为输入框时，是否启用回车触发提交功能
  options?: IFieldOptions;
}
export interface IFieldOptions {
  type?: IDatePickerType;
  labelkey?: string;
  valueKey?: string;
  placeholder?: string;
  editable?: boolean;
  data: Record<string, any>[];
}
