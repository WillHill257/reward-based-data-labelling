import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "../views/Login.vue";
import Sign_up from "../views/Sign_up.vue";
import HomePage from "../views/HomePage.vue";
import ViewJob from "../views/ViewJob.vue";
import Landing from "../views/Landing.vue";
import CreateJob from "../components/CreateJob/CreateJob.vue";
import ViewJobs from "../views/ViewJobs.vue";

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
  },
  {
    path: "/viewjobs",
    name: "ViewJobs",
    component: ViewJobs,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
