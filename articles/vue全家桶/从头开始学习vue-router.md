## 一、前言

要学习vue-router就要先知道这里的路由是什么？为什么我们不能像原来一样直接用标签编写链接哪？vue-router如何使用？常见路由操作有哪些？等等这些问题，就是本篇要探讨的主要问题。

## 二、vue-router是什么

这里的路由并不是指我们平时所说的硬件路由器，**这里的路由就是SPA（单页应用）的路径管理器**。再通俗的说，vue-router就是WebApp的链接路径管理系统。

vue-router是Vue.js官方的路由插件，它和vue.js是深度集成的，适合用于构建单页面应用。vue的单页面应用是基于路由和组件的，路由用于设定访问路径，并将路径和组件映射起来。传统的页面应用，是用一些超链接来实现页面切换和跳转的。在vue-router单页面应用中，则是路径之间的切换，也就是组件的切换。**路由模块的本质 就是建立起url和页面之间的映射关系**。

至于我们为啥不能用a标签，这是因为用Vue做的都是单页应用（**当你的项目准备打包时，运行`npm run build`时，就会生成dist文件夹，这里面只有静态资源和一个index.html页面**），所以你写的标签是不起作用的，你必须使用vue-router来进行管理。

## 三、vue-router实现原理

SPA(single page application):单一页面应用程序，只有一个完整的页面；它在加载页面时，不会加载整个页面，而是只更新某个指定的容器中内容。**单页面应用(SPA)的核心之一是: 更新视图而不重新请求页面**;vue-router在实现单页面前端路由时，提供了两种方式：Hash模式和History模式；根据mode参数来决定采用哪一种方式。

### 1、Hash模式：

**vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。** hash（#）是URL 的锚点，代表的是网页中的一个位置，单单改变#后的部分，浏览器只会滚动到相应位置，不会重新加载网页，也就是说**hash 出现在 URL 中，但不会被包含在 http 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面**；同时每一次改变#后的部分，都会在浏览器的访问历史中增加一个记录，使用”后退”按钮，就可以回到上一个位置；所以说**Hash模式通过锚点值的改变，根据不同的值，渲染指定DOM位置的不同数据。hash 模式的原理是 onhashchange 事件(监测hash值变化)，可以在 window 对象上监听这个事件**。

### 2、History模式：

由于hash模式会在url中自带#，如果不想要很丑的 hash，我们可以用路由的 history 模式，只需要在配置路由规则时，加入"mode: 'history'",**这种模式充分利用了html5 history interface 中新增的 pushState() 和 replaceState() 方法。这两个方法应用于浏览器记录栈，在当前已有的 back、forward、go 基础之上，它们提供了对历史记录修改的功能。只是当它们执行修改时，虽然改变了当前的 URL ，但浏览器不会立即向后端发送请求**。

    //main.js文件中
    const router = new VueRouter({
      mode: 'history',
      routes: [...]
    })
    

当你使用 history 模式时，URL 就像正常的 url，例如 [http://yoursite.com/user/id，比较好看！](http://yoursite.com/user/id%EF%BC%8C%E6%AF%94%E8%BE%83%E5%A5%BD%E7%9C%8B%EF%BC%81)

不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 [http://oursite.com/user/id](http://oursite.com/user/id) 就会返回 404，这就不好看了。

所以呢，**你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。**

     export const routes = [ 
      {path: "/", name: "homeLink", component:Home}
      {path: "/register", name: "registerLink", component: Register},
      {path: "/login", name: "loginLink", component: Login},
      {path: "*", redirect: "/"}]
    

此处就设置如果URL输入错误或者是URL 匹配不到任何静态资源，就自动跳到到Home页面

### 3、使用路由模块来实现页面跳转的方式

- 
方式1：直接修改地址栏

- 
方式2：this.$router.push(‘路由地址’)

- 
方式3：

## 四、vue-router使用方式

1:下载 `npm i vue-router -S`

2:在main.js中引入 `import VueRouter from 'vue-router'`;

3:安装插件`Vue.use(VueRouter)`;

4:创建路由对象并配置路由规则 `let router = new VueRouter({routes:[{path:'/home',component:Home}]})`;

5:将其路由对象传递给Vue的实例，options中加入 `router:router`

6:在app.vue中留坑 

具体实现请看如下代码：

    //main.js文件中引入
    import Vue from 'vue';
    import VueRouter from 'vue-router';
    //主体
    import App from './components/app.vue';
    import Home from './components/home.vue'
    //安装插件
    Vue.use(VueRouter); //挂载属性
    //创建路由对象并配置路由规则
    let router = new VueRouter({
        routes: [
            //一个个对象
            { path: '/home', component: Home }
        ]
    });
    //new Vue 启动
    new Vue({
        el: '#app',
        //让vue知道我们的路由规则
        router: router, //可以简写router
        render: c => c(App),
    })
    

最后记得在在app.vue中“留坑”

    //app.vue中
    
        export default {
            data(){
                return {}
            }
        }
    

## 五、 vue-router参数传递

声明式的导航和编程式的导航`router.push(...)`都可以传参，本文主要介绍前者的传参方法，同样的规则也适用于编程式的导航。

### 1.用name传递参数

在路由文件src/router/index.js里配置name属性

    routes: [
        {
          path: '/',
          name: 'Hello',
          component: Hello
        }
    ]
    

模板里(src/App.vue)用`$route.name`来接收 比如：`
{{ $route.name}}
`

### 2 通过 标签中的to传参

这种传参方法的基本语法：

    valueString

比如先在src/App.vue文件中

    Hi页面1

然后把src/router/index.js文件里给hi1配置的路由起个name,就叫hi1.

    {path:'/hi1',name:'hi1',component:Hi1}
    

最后在模板里(src/components/Hi1.vue)用`$route.params.username`进行接收.

    {{$route.params.username}}-{{$route.params.id}}
    

### 3 利用url传递参数----在配置文件里以冒号的形式设置参数。

我们在/src/router/index.js文件里配置路由

    {
        path:'/params/:newsId/:newsTitle',
        component:Params
    }
    

我们需要传递参数是新闻ID（newsId）和新闻标题（newsTitle）.所以我们在路由配置文件里制定了这两个值。

在src/components目录下建立我们params.vue组件，也可以说是页面。我们在页面里输出了url传递的的新闻ID和新闻标题。

    
    
    ## {{ msg }}
    
    新闻ID：{{ $route.params.newsId}}
    
    新闻标题：{{ $route.params.newsTitle}}
    
    
    export default {
      name: 'params',
      data () {
        return {
          msg: 'params page'
        }
      }
    }
    

在App.vue文件里加入我们的标签。这时候我们可以直接利用url传值了

`params`

### 4. 使用path来匹配路由，然后通过query来传递参数

    
         router-link跳转Query
    

对应路由配置：

       {
         path: '/query',
         name: 'Query',
         component: Query
       }
    

于是我们可以获取参数：

    this.$route.query.queryId
    

## 六、vue-router配置子路由(二级路由)

实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL中各段动态路径也按某种结构对应嵌套的各层组件，例如：

[![](https://camo.githubusercontent.com/c1c8ecb0437e00898076bfdcde8b5654628e807d/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f32312f313633383232616162646433336564323f773d36313926683d32373726663d706e6726733d3135333635)](https://camo.githubusercontent.com/c1c8ecb0437e00898076bfdcde8b5654628e807d/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f32312f313633383232616162646433336564323f773d36313926683d32373726663d706e6726733d3135333635)

**如何实现下图效果(H1页面和H2页面嵌套在主页中)**？
[![](https://camo.githubusercontent.com/81b76123a3410910e655f3853aaf666f7794c570/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f32312f313633383234393434643532306564613f773d36323126683d34373526663d67696626733d3430383739)](https://camo.githubusercontent.com/81b76123a3410910e655f3853aaf666f7794c570/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f32312f313633383234393434643532306564613f773d36323126683d34373526663d67696626733d3430383739)

1.首先用标签增加了两个新的导航链接

    主页H1页面H2页面

2.在HelloWorld.vue加入标签，给子模板提供插入位置

    
    
    # {{ msg }}
    
    

3.在components目录下新建两个组件模板 H1.vue 和 H2.vue

两者内容类似，以下是H1.vue页面内容：

    
    
    # {{ msg }}
    
    
      export default {
        data() {
          return {
            msg: 'I am H1 page,Welcome to H1'
          }
        }
      }
    

1. 修改router/index.js代码，子路由的写法是在原有的路由配置下加入children字段。

       routes: [
        {
          path: '/',
          name: 'HelloWorld',
          component: HelloWorld,
          children: [{path: '/h1', name: 'H1', component: H1},//子路由的必须在HelloWorld.vue中出现
            {path: '/h2', name: 'H2', component: H2}
          ]
        }
      ]
    

## 七、单页面多路由区域操作

在一个页面里我们有两个以上区域，我们通过配置路由的js文件，来操作这些区域的内容

1.App.vue文件，在下面新写了两行标签,并加入了些CSS样式

    
    ![](./assets/logo.png)
    # H1
    
    # H2
    
    

2.需要在路由里配置这三个区域，配置主要是在components字段里进行

    export default new Router({
        routes: [
          {
            path: '/',
            name: 'HelloWorld',
            components: {default: HelloWorld,
              left:H1,//显示H1组件内容'I am H1 page,Welcome to H1'
              right:H2//显示H2组件内容'I am H2 page,Welcome to H2'
            }
          },
          {
            path: '/h1',
            name: 'H1',
            components: {default: HelloWorld,
              left:H2,//显示H2组件内容
              right:H1//显示H1组件内容
            }
          }
        ]
      })
    

上边的代码我们编写了两个路径，一个是默认的‘/’，另一个是‘/Hi’.在两个路径下的components里面，我们对三个区域都定义了显示内容。最后页面展示如下图：

[![](https://camo.githubusercontent.com/9b2e793d5bc7b02bfcfdc75ded2a6d76bffee64c/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f32312f313633383165623532623062653936323f773d3135323326683d37353126663d67696626733d3534353436)](https://camo.githubusercontent.com/9b2e793d5bc7b02bfcfdc75ded2a6d76bffee64c/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f32312f313633383165623532623062653936323f773d3135323326683d37353126663d67696626733d3534353436)

## 八.`$route` 和 `$router` 的区别

我们先将这两者console.log打印出来：

[![](https://user-images.githubusercontent.com/36322912/48118182-7af31680-e2a6-11e8-9d75-90fae36b2c96.png)](https://user-images.githubusercontent.com/36322912/48118182-7af31680-e2a6-11e8-9d75-90fae36b2c96.png)

[![](https://user-images.githubusercontent.com/36322912/48118191-82b2bb00-e2a6-11e8-8a9a-3b71ad035458.png)](https://user-images.githubusercontent.com/36322912/48118191-82b2bb00-e2a6-11e8-8a9a-3b71ad035458.png)

**$route 是“路由信息对象”，包括 path，params，hash，query，fullPath，matched，name 等路由信息参数。**

**① `$route.path`**

字符串，对应当前路由的路径，总是解析为绝对路径，如 "/order"。

**② `$route.params`**

一个 key/value 对象，包含了 动态片段 和 全匹配片段，

如果没有路由参数，就是一个空对象。

**③ `$route.query`**

一个 key/value 对象，表示 URL 查询参数。

例如，对于路径 /foo?user=1，则有 $route.query.user为1，

如果没有查询参数，则是个空对象。

**④ `$route.hash`**

当前路由的 hash 值 (不带 #) ，如果没有 hash 值，则为空字符串。

**⑤ `$route.fullPath`**

完成解析后的 URL，包含查询参数和 hash 的完整路径。

**⑥ `$route.matched`**

数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象。

**⑦ `$route.name`   当前路径名字**

**$router 是“路由实例”对象，即使用 new VueRouter创建的实例，包括了路由的跳转方法，钩子函数等。**

**$router常见跳转方法:**

    Let's order！
    .....
    
      export default{
        methods:{
          goToMenu(){
            this.$router.go(-1)//跳转到上一次浏览的页面
            this.$router.replace('/menu')//指定跳转的地址
            this.$router.replace({name:'menuLink'})//指定跳转路由的名字下
            this.$router.push('/menu')//通过push进行跳转
            this.$router.push({name:'menuLink'})//通过push进行跳转路由的名字下
          }
        }
      }
    

**`$router.push`和`$router.replace`的区别**：

- 使用push方法的跳转会向 history 栈添加一个新的记录，当我们点击浏览器的返回按钮时可以看到之前的页面。
- 使用replace方法不会向 history 添加新记录，而是替换掉当前的 history 记录，即当replace跳转到的网页后，‘后退’按钮不能查看之前的页面。

## 九、 如何设置404页面

用户会经常输错页面，当用户输错页面时，我们希望给他一个友好的提示页面，这个页面就是我们常说的404页面。vue-router也为我们提供了这样的机制。

1. 设置我们的路由配置文件（/src/router/index.js）

    {
       path:'*',
       component:Error
    }
    

这里的path:'*'就是输入地址不匹配时，自动显示出Error.vue的文件内容

1. 在/src/components/文件夹下新建一个Error.vue的文件。简单输入一些有关错误页面的内容。

    
    
    ## {{ msg }}
    
    
    export default {
      data () {
        return {
          msg: 'Error:404'
        }
      }
    }
    

此时我们随意输入一个错误的地址时，便会自动跳转到404页面

## 参考文章

- [vue-router实现单页面路由原理](https://zhang122622623.github.io/2018/03/14/vue-router%E5%AE%9E%E7%8E%B0%E5%8D%95%E9%A1%B5%E9%9D%A2%E8%B7%AF%E7%94%B1%E5%8E%9F%E7%90%86/)
- [Vue.js——vue-router 60分钟快速入门](http://www.cnblogs.com/keepfool/p/5690366.html)
- [技术胖的Vue-router视频教程](http://jspang.com/2017/04/13/vue-router/)
- [vue中`$router`以及`$route`的使用](https://segmentfault.com/a/1190000016662929)
- [Vue2.0 探索之路——vue-router入门教程和总结](https://segmentfault.com/a/1190000009651628)
- [vue-router 2.0一些区别](https://segmentfault.com/a/1190000009392552)

thanks