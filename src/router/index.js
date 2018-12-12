import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('views/Home.vue')
const About = () => import('views/About.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
