import { App, Plugin } from "vue";
import GSectionGroup from "./src/SectionGroup.vue";

const GSectionGroupPlugin: Plugin = {
  install(app: App) {
    app.component('GSectionGroup', GSectionGroup);
  },
};

export { GSectionGroup, GSectionGroupPlugin };
