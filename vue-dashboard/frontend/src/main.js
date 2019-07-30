import Vue from 'vue';
import VueChartkick from 'vue-chartkick';
import Chart from 'chart.js';
import App from './App.vue';
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css'; //Vuesax styles
import VueApexCharts from 'vue-apexcharts'

Vue.component('apexchart', VueApexCharts)


Vue.use(Vuesax)
Vue.config.productionTip = false;
Vue.use(VueChartkick, { adapter: Chart });

new Vue({
  render: h => h(App),
}).$mount('#app');
