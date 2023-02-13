import { createApp } from 'vue';
import './style.css';
import { default as App } from './App.vue';
import { default as ElementPlus } from 'element-plus';
import { useVueRouter } from "./router";

export type { User } from './user';
const app = createApp(App);
app.use(ElementPlus);
useVueRouter(app);
app.mount('#app');
