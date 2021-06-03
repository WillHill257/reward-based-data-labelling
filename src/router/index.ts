import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "../views/Login.vue";
import Sign_up from "../views/Sign_up.vue";
import HomePage from "../views/HomePage.vue";
import ViewJob from "../views/ViewJob.vue";
import Landing from "../views/Landing.vue";
import CreateJob from "../components/CreateJob/CreateJob.vue";
import ListJobs from "../views/ListJobs.vue";

import store from "@/store";
import { UserModule } from "@/store/modules/user";

//const userMod = getModule(UserModule);
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Sign_up,
  },
  {
    path: "/home",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/viewjob",
    name: "ViewJob",
    component: ViewJob,
    props: true,
  },
  {
    path: "/createjob",
    name: "CreateJob",
    component: CreateJob,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/listjobs",
    name: "ListJobs",
    component: ListJobs,
    props: true,
  },
  // otherwise redirect to home
  { path: "*", redirect: "/" },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log(UserModule.isLoggedIn);
    if (UserModule.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
