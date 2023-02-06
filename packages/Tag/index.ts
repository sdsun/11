import { App, Plugin } from 'vue';
import GTag from './src/index.vue';

export const TagPlugin: Plugin = {
  install(app: App) {
    app.component('GTag', GTag);
  },
};

export { GTag };
