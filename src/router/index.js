import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/recommend"
  },
  {
    path: "/recommend",
    name: "Recommend",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Recommend.vue")
  },
  {
    path: "/category",
    name: "Category",
    component: () =>
      import(/* webpackChunkName: "category" */ "../views/Category.vue")
  },
  {
    path: "/rank",
    name: "Rank",
    component: () => import(/* webpackChunkName: "rank" */ "../views/Rank.vue")
  },
  {
    path: "/search",
    name: "Search",
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/Search.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/user",
    name: "User",
    component: () => import(/* webpackChunkName: "user" */ "../views/User.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
