import { DATE_VALUE_FORMAT } from '../src/scalableFilterArea';

export type FilterType = 'text' | 'select' | 'virtual-select' | 'date' | 'cascader';
export type FilterDateType = keyof typeof DATE_VALUE_FORMAT;

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface CascaderOption extends Record<string, unknown> {
  label: string;
  value: string | number;
  children?: Array<CascaderOption>;
}

export interface FilterItemOptions {
  attributeName: string;
  placeholder?: string;
  dateType?: FilterDateType;
  remoteMethod?: () => Array<Object>;
  selectOptions?: Array<SelectOption>;
  cascaderOptions?: Array<CascaderOption>;
  multiple?: boolean;
}

export interface FilterItem {
  type: FilterType;
  label: string;
  options: FilterItemOptions;
}

export type ScalableFilters = Array<FilterItem>;
export interface FilterModelValue {
  [key: string]: any;
}
