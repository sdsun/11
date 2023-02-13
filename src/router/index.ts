import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
// import type { RouteRecordRaw } from "vue-router";
import AutoCreateRoutes from './auto-create-routes';
import layout from '../layout/layout.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/view',
      component: layout,
      children: [...AutoCreateRoutes],
    },
    {
      path: '',
      alias: '/',
      redirect: '/view',
    },
  ],
});

export default router;
export function useVueRouter(app: App): App {
  app.use(router);
  return app;
}
