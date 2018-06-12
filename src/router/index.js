import Vue from 'vue'
import Router from 'vue-router'
const Movie = () => import('views/movie/movie')
const Detail = () => import('views/detail/detail')
const Category = () => import('views/category/category')
const Rank = () => import('views/rank/rank')
const Search = () => import('views/search/search')
const List = () => import('views/list/list')
const User = () => import('views/user/user')
const Login = () => import('views/login/login')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/movie'
    },
    {
      path: '/movie',
      name: 'movie',
      component: Movie,
      children: [
        {
          path: 'all/:type',
          name: 'list',
          component: List
        },
        {
          path: 'detail/:id',
          name: 'detail',
          component: Detail
        }
      ]
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
    },
    {
      path: '/login/:type',
      name: 'login',
      component: Login
    }
  ]
})
