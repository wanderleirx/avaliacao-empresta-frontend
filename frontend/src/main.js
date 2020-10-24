import Vue from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'

import './plugins/vCurrencyField'
import './plugins/sweetalert'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
