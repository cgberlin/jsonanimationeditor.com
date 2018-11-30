import Vue from 'vue';
import Router from 'vue-router';
import Landing from '../components/Landing.vue';
import LottieEdit from '../components/LottieEdit.vue';

import { store } from '../store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'landing', component: Landing },
    { path: '/lottie-edit', name: 'lottie-edit', component: LottieEdit },
    {
      path: '*',
      component: Error
    }
  ]
});
