import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import firebase from './plugins/firebase'

Vue.config.productionTip = false

new Vue({
  firebase,
  vuetify,
  render: h => h(App)
}).$mount('#app')
