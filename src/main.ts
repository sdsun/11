import './style.css';
// import './assets/iconfont/iconfont.css';
import { createApp } from 'vue';
import { default as App } from './App.vue';
import { default as ElementPlus } from 'element-plus';
import "element-plus/theme-chalk/el-message-box.css"
import { useVueRouter } from './router';

export type { User } from './user';
const app = createApp(App);
app.use(ElementPlus);
useVueRouter(app);
app.mount('#app');
