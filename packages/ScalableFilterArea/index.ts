import { App, Plugin } from 'vue';
import GScalableFilterArea from './src/ScalableFilterArea.vue';

export const ScalableFilterAreaPlugin: Plugin = {
  install(app: App) {
    app.component('ScalableFilterArea', GScalableFilterArea);
  },
};

export { GScalableFilterArea };
