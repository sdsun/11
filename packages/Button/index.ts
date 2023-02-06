import { App, Plugin } from 'vue';
import GButton from './src/index.vue';

const ButtonPlugin: Plugin = {
  install(app: App) {
    app.component('GButton', GButton);
  },
};

export { GButton, ButtonPlugin };
