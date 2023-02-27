import { App, Plugin } from "vue";
import GSectionContainer from "./src/SectionContainer.vue";

const GDrawerContainerPlugin: Plugin = {
  install(app: App) {
    app.component('GSectionContainer', GSectionContainer);
  },
};

export { GSectionContainer, GDrawerContainerPlugin };
