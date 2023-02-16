type OptLabel = string | number;
type OptValue = string | number;
export type OptionKeys = [OptLabel, OptValue];

export interface GSelectOpt {
  options: Array<any>;
  optionKeys: OptionKeys;
}
