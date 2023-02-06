import { createApp } from 'vue';
import './style.css';
import { default as App } from './App.vue';
import { default as ElementPlus } from 'element-plus';
export type { User } from './user';
const app = createApp(App);
app.use(ElementPlus);
app.mount('#app');
