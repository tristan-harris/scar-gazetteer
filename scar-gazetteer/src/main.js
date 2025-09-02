import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueMeta from 'vue-meta'
import Vuelidate from 'vuelidate'
import '@/assets/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

import store from './store';
import App from './App.vue'
import router from './routes/main'

Vue.config.productionTip = false

Vue.use(VueMeta)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Vuelidate)

// Fix Leaflet icons
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
