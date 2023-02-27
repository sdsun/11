export const DEFAULT_FORMATS_TIME = 'HH:mm:ss';
export const DEFAULT_FORMATS_DATE = 'YYYY-MM-DD';

export const DATE_VALUE_FORMAT = {
  week: undefined,
  month: 'YYYY-MM',
  year: 'YYYY',
  daterange: DEFAULT_FORMATS_DATE,
  datetimerange: `${DEFAULT_FORMATS_DATE} ${DEFAULT_FORMATS_TIME}`,
  monthrange: 'YYYY-MM',
  date: DEFAULT_FORMATS_DATE,
  dates: DEFAULT_FORMATS_DATE,
  datetime: `${DEFAULT_FORMATS_DATE} ${DEFAULT_FORMATS_TIME}`,
} as const;
