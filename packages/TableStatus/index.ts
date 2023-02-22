import { App, Plugin } from 'vue';
import GTableStatus from './src/index.vue';

export default (app: App) => {
  app.component(GTableStatus.name, GTableStatus);
};

export { GTableStatus };
