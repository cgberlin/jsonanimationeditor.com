// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import { store, loadCache } from './store/index';
import router from './router';
import VeeValidate from 'vee-validate';
import VTooltip from 'v-tooltip'

import Colors from '../mixins/Colors.vue'

import Vuetify from 'vuetify'
 
Vue.use(Vuetify)

Vue.mixin(Colors)

Vue.use(VTooltip)
Vue.use(VeeValidate);
Vue.use(require('vue-script2'));
import VModal from 'vue-js-modal';

Vue.use(VModal);

// hls plugin
//require('videojs-contrib-hls/dist/videojs-contrib-hls');
Vue.config.productionTip = false;

//event bus
export const eventBus = new Vue();

//load the cache
loadCache();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
