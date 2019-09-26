import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
        path: "/upload-file",
        name: "upload-file",
        component: () =>
          import("./views/upload-file/upload-file.vue")
    },
    {
        path: "/drag",
        name: "drag",
        component: () =>
          import("./views/drag")
    },
    {
        path: "/no-scrollbar",
        name: "no-scrollba",
        component: () =>
          import("./views/no-scrollbar")
    }
  ]
});
