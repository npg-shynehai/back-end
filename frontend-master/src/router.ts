import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'list-person',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/server-error',
      name: 'server-error',
      // serve error
      component: () => import(/* webpackChunkName: "500" */ './views/ErrorPage/500.vue'),
    },
    {
      path: '/server-not-found',
      name: 'server-not-found',
      // serve not found
      component: () => import(/* webpackChunkName: "404" */ './views/ErrorPage/404.vue'),
    }
  ],
});
