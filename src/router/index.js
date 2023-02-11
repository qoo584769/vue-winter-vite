import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: HomeView,
      children: [
        { path: "", component: () => import("../views/ProductsView.vue") },
      ],
    },
    {
      path: "/cart",
      component: () => import("../views/CartView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
  // 這個會連同子路由的上層一起套用
  linkActiveClass: "link-active",
});

export default router;
