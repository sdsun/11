export type FilterType = 'text' | 'select' | 'date' | 'time';
export type FilterDateType = 'week' | 'month' | 'year' | 'date';
// export type FilterDateTypeFormat = {
//   week: '';
// };

export interface FilterItemOptions {
  attributeName: string;
  placeholder?: string;
  dateType?: FilterDateType;
  remoteMethod?: () => Array<Object>;
}

// export interface FilterItemSelect extends FilterItemOptions {
//   remoteMethod: () => Array<Object>;
// }

// export interface FilterItemDate extends FilterItemOptions {
//   dateType: FilterDateType;
// }

export interface FilterItem {
  type: FilterType;
  label: string;
  options: FilterItemOptions;
}

export type ScalableFilters = Array<FilterItem>;

export interface FilterModelValue {
  [key: string]: string | number;
}
