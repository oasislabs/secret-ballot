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
      component: () => import(/* webpackChunkName: "welcome" */ './views/Welcome.vue'),
      props: true,
    },
    {
      path: '/vote',
      name: 'vote',
      component: () => import(/* webpackChunkName: "vote" */ './views/Vote.vue'),
      props: true,
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: () => import(/* webpackChunkName: "confirm" */ './views/Confirmation.vue'),
      props: true,
    },
    {
      path: '/results',
      name: 'results',
      component: () => import(/* webpackChunkName: "results" */ './views/Results.vue'),
      props: true,
    },
  ],
});

export default router;
