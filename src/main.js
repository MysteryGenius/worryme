import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { firestorePlugin } from 'vuefire'
import VueCompositionApi from '@vue/composition-api'

import '@/assets/css/tailwind.css'

Vue.use(VueRouter)
Vue.use(firestorePlugin)
Vue.use(VueCompositionApi)

Vue.config.productionTip = false

import Home from './components/Home'
import Issues from './components/Issues'

const router = new VueRouter({
  routes: [
    { path:'/', component: Home },
    { path:'/add', component: Issues}
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
