import { App, Plugin } from "vue";
import GDrawerPanel from "./src/DrawerPanel.vue";

const GDrawerPanelPlugin: Plugin = {
  install(app: App) {
    app.component('GDrawerPanel', GDrawerPanel);
  },
};

export { GDrawerPanel, GDrawerPanelPlugin };
