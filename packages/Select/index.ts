import { App, Plugin } from 'vue';
import GSelect from './src/index';

const SelectPlugin: Plugin = {
  install(app: App) {
    app.component('GSelect', GSelect);
  },
};

export { GSelect, SelectPlugin };
