import Vue from 'vue';
import './plugins/vuetify';

import App from './App.vue';
import router from './router';

import VueApexCharts from 'vue-apexcharts';

Vue.config.productionTip = false
Vue.component('v-apex-chart', VueApexCharts);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
