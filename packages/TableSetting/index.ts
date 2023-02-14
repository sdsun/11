import { App, Plugin } from 'vue';
import GTableSetting from './src/index.vue';

// export const GTableSettingPlugin: Plugin = {
//   install(app: App) {
//     app.component(GTableSetting.name, GTableSetting);
//   },
// };
export default (app: App) => {
  app.component(GTableSetting.name, GTableSetting);
};

export { GTableSetting };
