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
    {
        path: "/test3",
        name: "test3",
        component: () =>
          import("./views/test3/test3.vue")
    },
    {
        path: "/test4",
        name: "test4",
        component: () =>
          import("./views/test4/test4.vue")
    },
    {
        path: "/canvas",
        name: "canvas",
        component: () =>
          import("./views/canvas/canvas.vue")
    },
    {
        path: "/uploadImgHandle",
        name: "uploadImgHandle",
        component: () => import("./views/uploadImgHandle/uploadImgHandle.vue")
    }, 
    {
        path: "/copyText",
        name: "copyText",
        component: () => import("./views/copyText/copyText")
    },
    {
        path: "/online-offline",
        name: "online-offline",
        component: () => import("./views/online-offline/online-offline")
    },
    {
        path: "/fluid-drag",
        name: "fluid-drag",
        component: () => import("./views/fluid-drag/fluid-drag")
    },
    {
        path: "/test-pubuliu",
        name: "test-pubuliu",
        component: () => import("./views/test-pubuliu/test-pubuliu")
    }
  ]
});
