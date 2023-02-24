import { App, Plugin } from 'vue';
import EasyRadiosOrCheckboxs from './EasyRadiosOrCheckboxs';

export const GEasyRadiosOrCheckboxs = Object.assign(EasyRadiosOrCheckboxs, {
  install(app: App) {
    app.component(EasyRadiosOrCheckboxs.name, EasyRadiosOrCheckboxs);
  },
});

export default GEasyRadiosOrCheckboxs;

export const GEasyRadiosOrCheckboxsPlugin = GEasyRadiosOrCheckboxs;
