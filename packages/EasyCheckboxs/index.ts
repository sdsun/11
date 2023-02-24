import { App, Plugin } from 'vue';
import EasyCheckboxs from './EasyCheckboxs';

const GEasyCheckboxs = Object.assign(EasyCheckboxs, {
  install(app: App) {
    app.component(EasyCheckboxs.name, EasyCheckboxs);
  },
});

export default EasyCheckboxs;

export const GEasyFormPlugin = EasyCheckboxs;
