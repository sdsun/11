import { App, Plugin } from 'vue';
import GTableButton from './src/index.vue';

export default (app: App) => {
  app.component(GTableButton.name, GTableButton);
};

export { GTableButton };
