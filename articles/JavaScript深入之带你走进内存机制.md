本期的主题是**调用堆栈**，本计划一共28期，**每期重点攻克一个面试重难点**，如果你还不了解本进阶计划，文末点击查看全部文章。

如果觉得本系列不错，欢迎点赞、评论、转发，您的支持就是我坚持的最大动力。

---

JS内存空间分为**栈(stack)**、**堆(heap)**、**池(一般也会归类为栈中)**。 其中**栈**存放变量，**堆**存放复杂对象，**池**存放常量，所以也叫常量池。

昨天文章介绍了堆和栈，小结一下：

- 基本类型：--> `栈`内存（不包含闭包中的变量）
- 引用类型：--> `堆`内存

**今日补充**一个知识点，就是闭包中的变量并不保存中栈内存中，而是保存在`堆内存`中，这也就解释了函数之后之后为什么闭包还能引用到函数内的变量。

    functionA(){leta=1functionB(){console.log(a)}returnB}

`闭包`的简单定义是：函数 A 返回了一个函数 B，并且函数 B 中使用了函数 A 的变量，函数 B 就被称为闭包。

函数 A 弹出调用栈后，函数 A 中的变量这时候是存储在堆上的，所以函数B依旧能引用到函数A中的变量。现在的 JS 引擎可以通过逃逸分析辨别出哪些变量需要存储在堆上，哪些需要存储在栈上。

闭包的介绍点到为止，[【进阶2期】 作用域闭包](#)会详细介绍，敬请期待。

今天文章的重点是**内存回收**和**内存泄漏**。

#### 内存回收

JavaScript有自动垃圾收集机制，垃圾收集器会每隔一段时间就执行一次释放操作，找出那些不再继续使用的值，然后释放其占用的内存。

- 局部变量和全局变量的销毁

- **局部变量**：局部作用域中，当函数执行完毕，局部变量也就没有存在的必要了，因此垃圾收集器很容易做出判断并回收。
- **全局变量**：全局变量什么时候需要自动释放内存空间则很难判断，所以在开发中尽量**避免**使用全局变量。

- 以Google的V8引擎为例，V8引擎中所有的JS对象都是通过**堆**来进行内存分配的

- **初始分配**：当声明变量并赋值时，V8引擎就会在堆内存中分配给这个变量。
- **继续申请**：当已申请的内存不足以存储这个变量时，V8引擎就会继续申请内存，直到堆的大小达到了V8引擎的内存上限为止。

- V8引擎对堆内存中的JS对象进行**分代管理**
- **新生代**：存活周期较短的JS对象，如临时变量、字符串等。
- **老生代**：经过多次垃圾回收仍然存活，存活周期较长的对象，如主控制器、服务器对象等。

#### 垃圾回收算法

对垃圾回收算法来说，核心思想就是如何判断内存已经不再使用，常用垃圾回收算法有下面两种。

- 引用计数（现代浏览器不再使用）
- 标记清除（常用）

##### 引用计数

引用计数算法定义“内存不再使用”的标准很简单，就是看一个对象是否有指向它的**引用**。如果没有其他对象指向它了，说明该对象已经不再需要了。

    // 创建一个对象person，他有两个指向属性age和name的引用varperson={age: 12,name: 'aaaa'};person.name= null;// 虽然name设置为null，但因为person对象还有指向name的引用，因此name不会回收varp=person;person=1;//原来的person对象被赋值为1，但因为有新引用p指向原person对象，因此它不会被回收p= null;//原person对象已经没有引用，很快会被回收

引用计数有一个致命的问题，那就是**循环引用**

如果两个对象相互引用，尽管他们已不再使用，但是垃圾回收器不会进行回收，最终可能会导致内存泄露。

    functioncycle(){varo1={};varo2={};o1.a=o2;o2.a=o1;return"cycle reference!"}cycle();

`cycle`函数执行完成之后，对象`o1`和`o2`实际上已经不再需要了，但根据引用计数的原则，他们之间的相互引用依然存在，因此这部分内存不会被回收。所以现代浏览器**不再使用**这个算法。

但是IE依旧使用。

    vardiv=document.createElement("div");div.onclick=function(){console.log("click");};

上面的写法很常见，但是上面的例子就是一个循环引用。

变量div有事件处理函数的引用，同时事件处理函数也有div的引用，因为div变量可在函数内被访问，所以循环引用就出现了。

##### 标记清除（常用）

标记清除算法将“不再使用的对象”定义为“**无法到达的对象**”。即从根部（在JS中就是全局对象）出发定时扫描内存中的对象，凡是能从根部到达的对象，**保留**。那些从根部出发无法触及到的对象被标记为**不再使用**，稍后进行回收。

无法触及的对象包含了没有引用的对象这个概念，但反之未必成立。

所以上面的例子就可以正确被垃圾回收处理了。

所以现在对于主流浏览器来说，只需要切断需要回收的对象与根部的联系。最常见的内存泄露一般都与DOM元素绑定有关：

    email.message=document.createElement(“div”);displayList.appendChild(email.message);// 稍后从displayList中清除DOM元素displayList.removeAllChildren();

上面代码中，`div`元素已经从DOM树中清除，但是该`div`元素还绑定在email对象中，所以如果email对象存在，那么该`div`元素就会一直保存在内存中。

#### 内存泄漏

对于持续运行的服务进程（daemon），必须及时释放不再用到的内存。否则，内存占用越来越高，轻则影响系统性能，重则导致进程崩溃。 对于不再用到的内存，没有及时释放，就叫做内存泄漏（memory leak）

#### 内存泄漏识别方法

##### 1、浏览器方法

1. 打开开发者工具，选择 Memory
2. 在右侧的Select profiling type字段里面勾选 timeline
3. 点击左上角的录制按钮。
4. 在页面上进行各种操作，模拟用户的使用情况。
5. 一段时间后，点击左上角的 stop 按钮，面板上就会显示这段时间的内存占用情况。

##### 2、命令行方法

使用 `Node` 提供的 `process.memoryUsage` 方法。

    console.log(process.memoryUsage());// 输出{rss: 27709440,// resident set size，所有内存占用，包括指令区和堆栈heapTotal: 5685248,// "堆"占用的内存，包括用到的和没用到的heapUsed: 3449392,// 用到的堆的部分external: 8772// V8 引擎内部的 C++ 对象占用的内存}

判断内存泄漏，以`heapUsed`字段为准。

详细的JS内存分析将在[【进阶20期】性能优化](#)详细介绍，敬请期待。

#### WeakMap

ES6 新出的两种数据结构：`WeakSet` 和 `WeakMap`，表示这是弱引用，它们对于值的引用都是不计入垃圾回收机制的。

    constwm=newWeakMap();constelement=document.getElementById('example');wm.set(element,'some information');wm.get(element)// "some information"

先新建一个 `Weakmap` 实例，然后将一个 DOM 节点作为键名存入该实例，并将一些附加信息作为键值，一起存放在 `WeakMap` 里面。这时，`WeakMap` 里面对element的引用就是弱引用，不会被计入垃圾回收机制。

#### 昨日思考题解答

昨天文章留了一道思考题，群里讨论很热烈，大家应该都知道原理了，现在来简单解答下。

    var a = {n: 1};
    var b = a;
    a.x = a = {n: 2};
    
    a.x 	// --> undefined
    b.x 	// --> {n: 2}
    

答案已经写上面了，这道题的关键在于

- 1、优先级。`.`的优先级高于`=`，所以先执行`a.x`，堆内存中的`{n: 1}`就会变成`{n: 1, x: undefined}`，改变之后相应的`b.x`也变化了，因为指向的是同一个对象。
- 2、赋值操作是`从右到左`，所以先执行`a = {n: 2}`，`a`的引用就被改变了，然后这个返回值又赋值给了`a.x`，**需要注意**的是这时候`a.x`是第一步中的`{n: 1, x: undefined}`那个对象，其实就是`b.x`，相当于`b.x = {n: 2}`

[![image](https://segmentfault.com/img/bVrVSs)](https://camo.githubusercontent.com/9bcfc7692e8178fdead75f619b8d42a6f1f6e26a/68747470733a2f2f7365676d656e746661756c742e636f6d2f696d672f625672565373)

#### 今日份思考题

**问题一**：

从内存来看 null 和 undefined 本质的区别是什么？

**问题二**：

ES6语法中的 const 声明一个只读的常量，那为什么下面可以修改const的值？

    constfoo={};foo={};// TypeError: "foo" is read-onlyfoo.prop=123;foo.prop// 123

**问题三**：

哪些情况下容易产生内存泄漏？

#### 参考

> [JavaScript 内存机制](https://juejin.im/post/5b10ba336fb9a01e66164346)
> 
> [MDN之运算符优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
> 
> [由ES规范学JavaScript(二)：深入理解“连等赋值”问题](https://segmentfault.com/a/1190000004224719)
> 
> [InterviewMap](https://github.com/InterviewMap/CS-Interview-Knowledge-Map/blob/master/JS/JS-ch.md#%E9%97%AD%E5%8C%85)

#### 进阶系列目录

- 【进阶1期】 调用堆栈
- 【进阶2期】 作用域闭包
- 【进阶3期】 this全面解析
- 【进阶4期】 深浅拷贝原理
- 【进阶5期】 原型Prototype
- 【进阶6期】 高阶函数
- 【进阶7期】 事件机制
- 【进阶8期】 Event Loop原理
- 【进阶9期】 Promise原理
- 【进阶10期】Async/Await原理
- 【进阶11期】防抖/节流原理
- 【进阶12期】模块化详解
- 【进阶13期】ES6重难点
- 【进阶14期】计算机网络概述
- 【进阶15期】浏览器渲染原理
- 【进阶16期】webpack配置
- 【进阶17期】webpack原理
- 【进阶18期】前端监控
- 【进阶19期】跨域和安全
- 【进阶20期】性能优化
- 【进阶21期】VirtualDom原理
- 【进阶22期】Diff算法
- 【进阶23期】MVVM双向绑定
- 【进阶24期】Vuex原理
- 【进阶25期】Redux原理
- 【进阶26期】路由原理
- 【进阶27期】VueRouter源码解析
- 【进阶28期】ReactRouter源码解析

#### 交流

进阶系列文章汇总：[https://github.com/yygmind/blog](https://github.com/yygmind/blog)，内有优质前端资料，欢迎领取，觉得不错点个star。

我是木易杨，网易高级前端工程师，跟着我**每周重点攻克一个前端面试重难点**。接下来让我带你走进高级前端的世界，在进阶的路上，共勉！

[![image](undefined)](https://github.com/yygmind/blog/raw/master/images/weixin_re.png)

escape analyse是从java抄过来的，原意是在可能的情况下把对象分配在栈上。。[[这篇日志]](https://v8.dev/blog/disabling-escape-analysis)的意思也是如此

我网上查说是WeakMap 相对于普通的 Map，也是键值对集合，只不过 WeakMap 的 key 只能是非空对象（non-null object）。WeakMap 对它的 key 仅保持弱引用，也就是说它不阻止垃圾回收器回收它所引用的 key。WeakMap 最大的好处是可以避免内存泄漏。一个仅被 WeakMap 作为 key 而引用的对象，会被垃圾回收器回收掉。
[![image](undefined)](https://user-images.githubusercontent.com/13551340/51016304-cc6f9880-15aa-11e9-88f9-981214780f28.png)

你这里说是弱引用的weakMap不会被计入垃圾回收机制

看到第一个思考题，搜了下，[null和undefined的区别](http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)。之前用的时候都是判断是不是null或者是不是undefined

第二个问题：const 应该判断的是对象的引用，给一个对象添加属性并不会改变此对象的引用。

请问能根据内存回收的原理编写出, 延迟回收的方法呢? 调试过渡动画的时候经常发现因为GC导致的掉帧, 如果能把GC延迟到动画结束再开始就好了

[@deepkolos](https://github.com/deepkolos)

动画开始前把所有要用到的东西引用到根节点下的某个对象里去

动画结束后把这个对象置空？

第三个问题：缓存、作用域未释放（闭包） 、全局变量过多、定时器未清除、事件监听未清空、DOM的引用

> 我网上查说是WeakMap 相对于普通的 Map，也是键值对集合，只不过 WeakMap 的 key 只能是非空对象（non-null object）。WeakMap 对它的 key 仅保持弱引用，也就是说它不阻止垃圾回收器回收它所引用的 key。WeakMap 最大的好处是可以避免内存泄漏。一个仅被 WeakMap 作为 key 而引用的对象，会被垃圾回收器回收掉。
> [![image](undefined)](https://user-images.githubusercontent.com/13551340/51016304-cc6f9880-15aa-11e9-88f9-981214780f28.png)
> 
> 你这里说是弱引用的weakMap不会被计入垃圾回收机制

这里说的的确有些歧义，WeakMap 的 key 会在没有引用时被 gc 回收，因此不能保证迭代的一致性。