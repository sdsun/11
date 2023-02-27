import { App, Plugin } from 'vue';
import GScalableFilterArea from './src/ScalableFilterAreaV2.vue';

export const ScalableFilterAreaPlugin: Plugin = {
  install(app: App) {
    app.component('GScalableFilterArea', GScalableFilterArea);
  },
};

export { GScalableFilterArea };
