import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { firestorePlugin } from 'vuefire'
import VueCompositionApi from '@vue/composition-api'

import '@/assets/css/tailwind.css'
import VModal from 'vue-js-modal'
 
Vue.use(VModal)
Vue.use(VueRouter)
Vue.use(firestorePlugin)
Vue.use(VueCompositionApi)

Vue.config.productionTip = false

import Home from './components/Home'
import Landing from './components/Landing'
import About from './components/About'

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path:'/', component: Home, name: 'Home' },
    { path:'/landing', component: Landing, name: 'Landing' },
    { path:'/about', component: About, name: 'About' }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
