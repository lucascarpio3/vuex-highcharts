// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/store'
import {sync} from 'vuex-router-sync'
import router from './router'
import resource from 'vue-resource'
import VueHighcharts from 'vue-highcharts'

Vue.use(VueHighcharts)
Vue.use(resource)

sync(store, router)
/* eslint-disable no-new */

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
