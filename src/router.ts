import { createRouter, createWebHistory } from "vue-router";
import api, { checkLogin } from "./api";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("./components/Home.vue") },
    { path: "/login", component: () => import("./components/Login.vue") },
    {
      path: "/admin",
      component: () => import("./components/Admin.vue"),
      beforeEnter: async (to, from, next) => {
        const check = await checkLogin();

        if (check) {
          next();
        } else {
          next("/");
        }
      },
    },
  ],
});

export default router;
