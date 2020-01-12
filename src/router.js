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
    },
    {
        path: "/postMessaage-index",
        name: "postMessaage-index",
        component: () =>
          import("./views/postMessage/index")
    },
    {
        path: "/postMessaage-child",
        name: "postMessaage-child",
        component: () =>
          import("./views/postMessage/child")
    },
    {
        path: "/webworkers",
        name: "webworkers",
        component: () =>
          import("./views/webworkers/index.vue")
    },
    {
        path: "/test",
        name: "test",
        component: () =>
          import("./views/test/test.vue")
    },
    {
        path: "/test2",
        name: "test2",
        component: () =>
          import("./views/test2/test2.vue")
    },
  ]
});
