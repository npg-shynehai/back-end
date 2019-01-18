import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VeeValidate from 'vee-validate';
import {ApiService} from './services/ApiService';
import i18n from './i18n';
import index from '@/store';
import FlagIcon from 'vue-flag-icon'

Vue.use(VeeValidate, {
  fieldsBagName: 'vvFields',
});
Vue.use(VeeValidate);
Vue.use(BootstrapVue);
Vue.use(FlagIcon);
Vue.config.productionTip = false;
ApiService.init('/api');
i18n.locale = index.getters.getlang

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
