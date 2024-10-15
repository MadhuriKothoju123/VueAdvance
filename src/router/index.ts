import Vue from 'vue';
import {  createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
// import { onBeforeRoute, onRouteError } from './helper';

// import { onBeforeRoute, onRouteError } from './helpers';

// Vue.use(VueRouter);

const router = createRouter({
    history: createWebHistory(), // History mode setup
    routes, // Array of routes typed as RouteRecordRaw
  });

// router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => onBeforeRoute(next));

// router.onError((error: { message: string; }) => onRouteError(error));

export default router;
