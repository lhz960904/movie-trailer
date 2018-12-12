import Vue from 'vue'
import Router from 'vue-router'
const Recommend = () => import('views/Recommend')
const Category = () => import('views/Category')
const Rank = () => import('views/Rank')
const Search = () => import('views/Search')
const User = () => import('views/User')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/category',
      name: 'category',
      component: Category
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/user',
      name: 'user',
      component: User
    }
  ]
})
