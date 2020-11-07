import Vue from "vue";
import VueRouter from "vue-router";
import KeCheng from "../views/KeCheng.vue";
import Me from "../views/Me.vue";
import SheQu from "../views/SheQu.vue";
import Shop from "../views/Shop.vue";
import XunLian from "../views/XunLian.vue";
import Login from "../views/XunLian.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: KeCheng,
  },
  {
    path: "/me",
    component: Me,
  },
  {
    path: "/shequ",
    component: SheQu,
  },
  {
    path: "/Shop",
    component: Shop,
  },
  {
    path: "/xunlian",
    component: XunLian,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
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
];

const router = new VueRouter({
  routes,
});

export default router;
