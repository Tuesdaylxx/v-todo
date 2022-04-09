import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/views/home/Home.vue')
  },
  {
    path: '/clock',
    component: () => import('@/views/clock/Clock.vue')
  },
  {
    path: '/statistics',
    component: () => import('@/views/statistics/Statistics.vue')
  },
  {
    path: '/profile',
    component: () => import('@/views/profile/Profile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
