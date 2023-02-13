import { App, Plugin } from 'vue';
import GTable from './src/index';

const TablePlugin: Plugin = {
  install(app: App) {
    app.component('GTable', GTable);
  },
};

export { GTable, TablePlugin };
