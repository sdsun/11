import { App, Plugin } from 'vue';
import EasyRadios from './EasyRadio';

export const GEasyRadios = Object.assign(EasyRadios, {
  install(app: App) {
    app.component(EasyRadios.name, EasyRadios);
  },
});

export default GEasyRadios;

export const GEasyRadiosPlugin = GEasyRadios;
