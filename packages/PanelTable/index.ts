import { App, Plugin } from 'vue';
import GPanelTable from './src/PanelTable.vue';

export const PanelTablePlugin: Plugin = {
  install(app: App) {
    app.component('GPanelTable', GPanelTable);
  },
};

export { GPanelTable };
