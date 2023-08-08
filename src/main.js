import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {app,firestore} from './plugins/firebase'
import VueRouter from 'vue-router'

import Home from '@/components/inicio.vue'
import Historial from '@/components/historial.vue' 
Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home }, 
  { path: '/historial', component: Historial },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

new Vue({
  app,
  firestore,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
