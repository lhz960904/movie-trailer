import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

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
    path: "/error",
    name: "Error",
    component: () =>
      import(/* webpackChunkName: "error" */ "../views/Error.vue")
  },
  {
    path: "/movie/:id",
    name: "Movie",
    component: () =>
      import(/* webpackChunkName: "movie" */ "../views/Movie.vue")
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
    component: () => import(/* webpackChunkName: "user" */ "../views/User.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.state.user.username) {
        next("/login");
        return;
      }
      next();
    }
  },
  {
    path: "/list/:type",
    name: "List",
    component: () => import(/* webpackChunkName: "list" */ "../views/List.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
