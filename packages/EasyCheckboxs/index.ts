import { App, Plugin } from 'vue';
import EasyCheckboxs from './EasyCheckboxs';

export const GEasyCheckboxs = Object.assign(EasyCheckboxs, {
  install(app: App) {
    app.component(EasyCheckboxs.name, EasyCheckboxs);
  },
});

export default GEasyCheckboxs;

export const GEasyCheckboxsPlugin = GEasyCheckboxs;
