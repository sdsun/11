import { App, Plugin } from 'vue';
import TableSetting from './src/index.vue';

export const GTableSetting = Object.assign(TableSetting, {
  install(app: App) {
    app.component(TableSetting.name, TableSetting);
  },
});

export default GTableSetting;

export const GTableSettingPlugin = GTableSetting;
