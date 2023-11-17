import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/signin",
      name: "SignIn",
      component: () => import("../views/authentication/Signin.vue"),
    },
    {
      path: "/signup",
      name: "SignUp",
      component: () => import("../views/authentication/Signup.vue"),
    },
    {
      path: "/artists",
      name: "Artists",
      component: () => import("../views/Artists.vue"),
    },
    {
      path: "/albums",
      name: "Albums",
      component: () => import("../views/Albums.vue"),
    },
    {
      path: "/musics",
      name: "Musics",
      component: () => import("../views/Musics.vue"),
    },
    {
      path: "/genres",
      name: "Gêneros",
      component: () => import("../views/Genre.vue"),
    },
    {
      path: "/users",
      name: "Users",
      component: () => import("../views/Users.vue"),
    },
  ],
});

export default router;
