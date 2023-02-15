type OptLabel = string | number;
type OptValue = string | number;
type OptionKeys = [OptLabel, OptValue];

export interface GSelectOpt {
  options: Array<any>;
  optionKeys: OptionKeys;
}
