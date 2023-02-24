import type { RouteRecordRaw } from 'vue-router';

const modules = import.meta.glob('../views/**/*.vue', { eager: true });

const AutoCreateRoutes: RouteRecordRaw[] = [];
export const AutoCreateRoutesWithoutComponent: Omit<RouteRecordRaw, 'component'>[] = [];

Object.keys(modules).forEach((modulePath) => {
  let routePath = modulePath.replace(/^\.\.\/(.*)\.vue$/, '$1');
  AutoCreateRoutesWithoutComponent.push({
    path: routePath,
    name: routePath,
    meta: {
      pageTitle: routePath.split('/').pop(),
    },
  });
  let currentModule = modules[modulePath] as any;
  AutoCreateRoutes.push({
    path: routePath,
    name: routePath,
    component: currentModule.default || currentModule,
  });
});

export default AutoCreateRoutes;
