import { App, Plugin } from 'vue';
import EasyForm from './EasyForm';

export const GEasyForm = Object.assign(EasyForm, {
  install(app: App) {
    app.component(EasyForm.name, EasyForm);
  },
});

export default GEasyForm;

export const GEasyFormPlugin = GEasyForm;
