import { App, Plugin } from 'vue';
import EasyRadiosOrCheckboxs from './EasyRadiosOrCheckboxs';

const GEasyRadiosOrCheckboxs = Object.assign(EasyRadiosOrCheckboxs, {
  install(app: App) {
    app.component(EasyRadiosOrCheckboxs.name, EasyRadiosOrCheckboxs);
  },
});

export default GEasyRadiosOrCheckboxs;

export const GEasyFormPlugin = GEasyRadiosOrCheckboxs;
