import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VConsole from "vconsole"
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);


import "./utils/import-element"

Vue.config.productionTip = false;

// window.onerror = err => {
//     console.log(err)
//     return true
// }

// window.addEventListener("error", err => {
//     err.preventDefault()
//     console.log(err)
//     return true
// }, true)

// let a = b

// window.addEventListener("unhandledrejection", err => {
//     err.preventDefault()
//     console.log(err)
// })

// try {
//     new Promise((resolve, reject) => {
//         let c = d
//     })
// } catch(e) {
//     console.log(e)
// }



// new VConsole()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
