import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Index from '../views/index.vue'
// import Pandect_total from '../components/Pandect_total.vue'
import Base from '../components/Base.vue'
import Label from '../components/label.vue'
import Search from '../components/Search.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: '/base',
    children: [
      // { path: '/pandect_total', component: Pandect_total },
      { path: '/base', component: Base },
      { path: '/label', component: Label },
      { path: '/search', component: Search },
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
