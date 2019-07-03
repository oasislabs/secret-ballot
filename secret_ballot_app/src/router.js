import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import(/* webpackChunkName: "project" */ './views/Welcome.vue'),
      props: true,
    },
  ],
});

export default router;
