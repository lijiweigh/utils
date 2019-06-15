/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */

import axios from "axios"
import Vue from "vue"
import router from "@/router"
import store from "@/store"
import qs from "qs"

// 提示函数
const tips = (message) => {
    Vue.tips(message)
}

// 去登录页面
const toLogin = () => {
    router.replace({
        path: "/login",
        query: {
            redirect: router.currentRoute.fullpath
        }
    })
}

// 请求失败的统一处理

const failHandler = (status, other) => {
    switch(status) {
        // 未登录状态，去登陆页面
        case 401: 
            toLogin()
            break;
        // 登录过期，清除token并去登录页面
        case 403:
            localStorage.removeItem("token")
            store.commit("loginSucess", null)
            setTimeout(() => {
                toLogin()
            }, 1000)
            break;
        // 页面不存在
        case 404:
            tips("请求的资源不存在")
            break;
        // 其他
        default: 
            console.log(other)
    }
}

// 创建axios实例
let instance = axios.create({
    timeout: 1000 * 10,
    withCredentials: true
})

// 设置post 的请求头
instance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"

/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */ 

 instance.interceptors.request.use(req => {
    const token = store.state.token
    console.log("token", token)
    token && ( req.headers.Authorization = token )
    if (req.method === "post") {
        req.data = qs.stringify(req.data)
    }
    return req
 }, err => {
    return Promise.error(err)
 })

//  相应拦截器

instance.interceptors.response.use(res => {
    if ( res.status === 200 ) {
        return Promise.resolve(res)
    } else {
        return Promise.reject(res)
    }
}, err => {
    const { response } = err
    // 请求发出了，但状态不是 2xx
    if (response) {
        failHandler(response.status, response.data.message)
    } else {
        // 请求没发出
        tips("请求异常")
    }
})

// 路由拦截
// 不是所有版块都需要鉴权的
// 所以需要鉴权,我都会在路由meta添加添加一个字段requireLogin,设置为true的时候
// 这货就必须走鉴权,像登录页这些不要,是可以直接访问的!!!

// router.beforeEach ((to, from, next) => {
//     if ( to.matched.some(route => route.meta.requireLogin) ) {
//         // 判断是否已经登录
//         if (localStorage.getItem("loginUserBaseInfo")) {
//             let lifeTime = JSON.parse( localStorage.getItem("loginUserBaseInfo") ).lifeTime
//             let nowTime = new Date().getTime()
//             // 登录状态没过期
//             if (nowTime < lifeTime) {
//                 next()
//             } else {
//                 // 登录状态过期了
//                 tips("登录过期，请重新登陆")
//                 next("/login")
//             }
//         } else {
//             // 没有登录就去登陆
//             next({path: "/login"})
//         }
//     } else {
//         next()
//     }
// })

export default instance