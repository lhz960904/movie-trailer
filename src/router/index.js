import Vue from 'vue'
import Router from 'vue-router'
import Movie from '@/views/movie/movie'
import Detail from '@/views/detail/detail'
import Category from '@/views/category/category'
import Rank from '@/views/rank/rank'
import Search from '@/views/search/search'
import List from '@/views/list/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/movie'
    },
    {
      path: '/movie',
      component: Movie,
      children: [
        {
          path: 'all/:type',
          name: 'list',
          component: List
        }
      ]
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
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
    }
  ]
})
