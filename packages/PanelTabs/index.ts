import { App, Plugin } from 'vue';
import GPanelTabs from './src/PanelTabs.vue';

export const PanelTabsPlugin: Plugin = {
  install(app: App) {
    app.component('GPanelTabs', GPanelTabs);
  },
};

export { GPanelTabs };
