## 前言

一些初学者可能对计算属性和侦听属性的使用场景感到困惑不解，本文主要介绍两者的用法、使用场景及其两者的区别。

本文的代码请猛戳[github博客](https://github.com/ljianshu/Blog/tree/master/vue2.0%E5%AD%A6%E4%B9%A0)，纸上得来终觉浅，大家动手多敲敲代码！

## 计算属性

### 1.介绍

计算属性是自动监听依赖值的变化，从而动态返回内容，监听是一个过程，在监听的值变化时，可以触发一个回调，并做一些事情。它有以下几个特点：

- 数据可以进行逻辑处理，减少模板中计算逻辑。
- 对计算属性中的数据进行监视
- 依赖固定的数据类型（响应式数据）

计算属性由两部分组成：get和set，分别用来获取计算属性和设置计算属性。默认只有get，如果需要set，要自己添加。另外set设置属性，并不是直接修改计算属性，而是修改它的依赖。

    computed: {
      fullName: {
        // getter
        get: function () {
          return this.firstName + ' ' + this.lastName
        },
        // setter
        set: function (newValue) {
          //this.fullName = newValue 这种写法会报错
          var names = newValue.split(' ')
          this.firstName = names[0]//对它的依赖进行赋值
          this.lastName = names[names.length - 1]
        }
      }
    }
    

现在再运行 vm.fullName = 'John Doe' 时，setter 会被调用，vm.firstName 和 vm.lastName 也会相应地被更新。

### 2.计算属性 vs 普通属性

可以像绑定普通属性一样在模板中绑定计算属性，在定义上有区别：计算属性的属性值必须是一个函数。

    data:{ //普通属性
      msg:'浪里行舟',
    },
    computed:{ //计算属性
      msg2:function(){ //该函数必须有返回值，用来获取属性，称为get函数
        return '浪里行舟';
      },
      reverseMsg:function(){
      //可以包含逻辑处理操作，同时reverseMsg依赖于msg,一旦msg发生变化，reverseMsg也会跟着变化
        return this.msg.split(' ').reverse().join(' ');
     }
    }  
    

### 3.计算属性 vs 方法

两者最主要的区别：computed 是可以缓存的，methods 不能缓存；**只要相关依赖没有改变，多次访问计算属性得到的值是之前缓存的计算结果，不会多次执行。**网上有种说法就是方法可以传参，而计算属性不能，其实并不准确，计算属性可以通过闭包来实现传参：

    :data="closure(item, itemName, blablaParams)"
    computed: {
     closure () {
       return function (a, b, c) {
            /** do something */
            return data
        }
     }
    }
    

## 侦听属性

Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：侦听属性watch。**watch中可以执行任何逻辑，如函数节流，Ajax异步获取数据，甚至操作 DOM（不建议）。**

### 1.常规用法

    
    
    # watch属性
    
    ## {{ $data }}
    修改a的值
    
    export default {
      data() {
        return {
          a: 1,
          b: { c: 2, d: 3 },
          e: {
            f: {
              g: 4
            }
          },
          h: []
        };
      },
      watch: {
        a: function(val, oldVal) {
          this.b.c += 1;
        },
        "b.c": function(val, oldVal) {
          this.b.d += 1;
        },
        "b.d": function(val, oldVal) {
          this.e.f.g += 1;
        },
        e: {
          handler: function(val, oldVal) {
            this.h.push("浪里行舟");
          },
          deep: true //用于监听e对象内部值的变化
        }
      }
    };
    

[![watch.gif](https://camo.githubusercontent.com/33a765327076400a383499b689f24eb89e469526/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f333137343730312d643930653161626635656239396239642e6769663f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970)](https://camo.githubusercontent.com/33a765327076400a383499b689f24eb89e469526/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f333137343730312d643930653161626635656239396239642e6769663f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970)

### 2.使用 watch 的深度遍历和立即调用功能

使用 watch 来监听数据变化的时候除了常用到 handler 回调，其实其还有两个参数，便是：

- deep 设置为 true 用于监听对象内部值的变化
- immediate 设置为 true 将立即以表达式的当前值触发回调

    修改
    export default {
        data() {
            return {
                obj: {
                    a: 1,
                }
            }
        },
        watch: {
            obj: {
                handler: function(newVal, oldVal) {
                    console.log(newVal); 
                },
                deep: true,
                immediate: true 
            }
        }
    }
    

以上代码我们修改了 obj 对象中 a 属性的值，我们可以触发其 watch 中的 handler 回调输出新的对象，而如果不加 deep: true，我们只能监听 obj 的改变，并不会触发回调。同时我们也添加了 immediate: true 配置，其会立即以 obj 的当前值触发回调。

我们再看一个实际工作中常遇到的场景：组件创建的时候我们获取一次列表的数据，同时监听input框，每当发生变化的时候重新获取一次筛选后的列表。

    created(){
        this.fetchPostList()
    },
    watch: {
        searchInputValue(){
            this.fetchPostList()
        }
    }
    

有没有办法优化一下呢？

    watch: {
        searchInputValue:{
            handler: 'fetchPostList',
            immediate: true
        }
    }
    

首先，在watchers中，可以直接使用函数的字面量名称；其次，声明immediate:true表示创建组件时立马执行一次。

## 两者之间对比

[![image.png](https://camo.githubusercontent.com/473de2ac8b14386327b5f68037ba226df832ea0d/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f333137343730312d303730376261653338333230333062622e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)](https://camo.githubusercontent.com/473de2ac8b14386327b5f68037ba226df832ea0d/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f333137343730312d303730376261653338333230333062622e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)

从上面流程图中，我们可以看出它们之间的区别：

- watch：监测的是属性值， 只要属性值发生变化，其都会触发执行回调函数来执行一系列操作。
- computed：监测的是依赖值，依赖值不变的情况下其会直接读取缓存进行复用，变化的情况下才会重新计算。

除此之外，有点很重要的区别是：**计算属性不能执行异步任务，计算属性必须同步执行**。也就是说计算属性不能向服务器请求或者执行异步任务。如果遇到异步任务，就交给侦听属性。watch也可以检测computed属性。

接下去我们看个用watch来实现防抖的例子：直到用户停止输入超过1秒后，才更新视图。

    
    
        {{ fullName }}
        
    firstName: 
    
    lastName: 
    
    
    export default {
      data: function() {
        return {
          firstName: "浪里行舟",
          lastName: "前端工匠",
          fullName: "浪里行舟 前端工匠"
        };
      },
      watch: {
        firstName: function(val) {
          clearTimeout(this.firstTimeout);
          this.firstTimeOut = setTimeout(() => {
            this.fullName = val + " " + this.lastName;
          }, 1000);
        },
        lastName: function(val) {
          clearTimeout(this.lastTimeout);
          this.lastTimeOut = setTimeout(() => {
            this.fullName = this.firstName + " " + val;
          }, 1000);
        }
      }
    };
    </code></pre>
    <p><a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/ad586849679c0d28dc11ee4460826b7e79b2bf04/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f333137343730312d396138623433376361343262316239332e6769663f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970"><img src="https://camo.githubusercontent.com/ad586849679c0d28dc11ee4460826b7e79b2bf04/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f333137343730312d396138623433376361343262316239332e6769663f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970" alt="watch1.gif" data-canonical-src="https://upload-images.jianshu.io/upload_images/3174701-9a8b437ca42b1b93.gif?imageMogr2/auto-orient/strip" style="max-width:100%;"></a></p>
    <h2>总结</h2>
    <p>计算属性适合用在模板渲染中，某个值是依赖了其它的响应式对象甚至是计算属性计算而来；而侦听属性适用于观测某个值的变化去完成一段复杂的业务逻辑。</p>
    <ul>
    <li>computed能做的，watch都能做，反之则不行</li>
    <li>能用computed的尽量用computed</li>
    </ul>
    <h2>参考资料</h2>
    <ul>
    <li><a href="http://www.zhufengpeixun.cn/main/course/index.html" rel="nofollow">珠峰架构课(强烈推荐)</a></li>
    <li><a href="https://juejin.im/book/5b23a5aef265da59716fda09" rel="nofollow">Vue 项目构建与开发入门</a></li>
    <li><a href="https://juejin.im/book/5bc844166fb9a05cd676ebca" rel="nofollow">Vue.js 组件精讲</a></li>
    <li><a href="https://juejin.im/book/5bdc715fe51d454e755f75ef" rel="nofollow">前端面试之道</a></li>
    <li><a href="https://segmentfault.com/a/1190000014085613" rel="nofollow">Vue.js最佳实践（五招让你成为Vue.js大师）</a></li>
    </ul>
          </td>