## 1 nextTick的使用

vue中dom的更像并不是实时的，当数据改变后，vue会把渲染**watcher**添加到异步队列，异步执行，同步代码执行完成后再统一修改dom，我们看下面的代码。

    <template><divclass="box">{{msg}}</div></template>
    
    export default {
      name: 'index',
      data () {
        return {
          msg: 'hello'
        }
      },
      mounted () {
        this.msg = 'world'
        let box = document.getElementsByClassName('box')[0]
        console.log(box.innerHTML) // hello
      }
    }

可以看到，**修改数据**后并不会**立即更新dom** ，dom的更新是**异步**的，无法通过同步代码获取，需要使用**nextTick**，在下一次事件循环中获取。

    this.msg = 'world'let box = document.getElementsByClassName('box')[0]
    this.$nextTick(() => {
      console.log(box.innerHTML) // world
    })

如果我们需要获取数据更新后的dom信息，比如动态获取宽高、位置信息等，需要使用nextTick。

## 2 数据变化dom更新与nextTick的原理分析

### 2.1 数据变化

vue双向数据绑定依赖于ES5的**Object.defineProperty**，在数据初始化的时候，通过Object.defineProperty为每一个属性创建**getter**与**setter**，把数据变成响应式数据。对属性值进行修改操作时，如this.msg = world，实际上会触发**setter**。下面看源码，为方便越读，源码有删减。

![image](http://api.fly63.com/vue_blog/public/Uploads/20190812/5d516dd5df278.jpg)

数据改变触发**set**函数

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      // 数据修改后触发set函数 经过一系列操作 完成dom更新
      set: functionreactiveSetter (newVal) {
        const value = getter ? getter.call(obj) : val
        if (getter && !setter) returnif (setter) {
          setter.call(obj, newVal)
        } else {
          val = newVal
        }
        childOb = !shallow && observe(newVal)
        dep.notify() // 执行dep notify方法
      }
    })

执行**dep.notify**方法

    exportdefaultclassDep{
      constructor () {
        this.id = uid++
        this.subs = []
      }
      notify () {
        const subs = this.subs.slice()
        for (let i = 0, l = subs.length; i < l; i++) {
          // 实际上遍历执行了subs数组中元素的update方法
          subs[i].update()
        }
      }
    }

当数据被引用时，如<div>{{msg}}</div> ，会执行get方法，并向**subs**数组中添加渲染**Watcher**，当数据被改变时执行Watcher的**update**方法执行数据更新。

    update () {
      /* istanbul ignore else */if (this.lazy) {
        this.dirty = true
      } elseif (this.sync) {
        this.run()
      } else {
        queueWatcher(this) //执行queueWatcher
      }
    }

update 方法最终执行**queueWatcher**

    functionqueueWatcher (watcher: Watcher) {
      const id = watcher.id
      if (has[id] == null) {
        has[id] = trueif (!flushing) {
          queue.push(watcher)
        } else {
          // if already flushing, splice the watcher based on its id// if already past its id, it will be run next immediately.let i = queue.length - 1while (i > index && queue[i].id > watcher.id) {
            i--
          }
          queue.splice(i + 1, 0, watcher)
        }
        // queue the flushif (!waiting) {
          // 通过waiting 保证nextTick只执行一次
          waiting = true// 最终queueWatcher 方法会把flushSchedulerQueue 传入到nextTick中执行
          nextTick(flushSchedulerQueue)
        }
      }
    }

执行**flushSchedulerQueue**方法

    functionflushSchedulerQueue(){
      currentFlushTimestamp = getNow()
      flushing = true
      let watcher, id
      ...
      for (index = 0; index < queue.length; index++) {
        watcher = queue[index]
        if (watcher.before) {
          watcher.before()
        }
        id = watcher.id
        has[id] = null// 遍历执行渲染watcher的run方法 完成视图更新
        watcher.run()
      }
      // 重置waiting变量 
      resetSchedulerState()
      ...
    }

也就是说当数据变化最终会把**flushSchedulerQueue**传入到**nextTick**中执行flushSchedulerQueue函数会遍历执行**watcher.run()**方法，watcher.run()方法最终会完成视图更新，接下来我们看关键的**nextTick**方法到底是啥

### 2.2 nextTick

nextTick方法会被传进来的回调push进**callbacks**数组，然后执行**timerFunc**方法

    exportfunctionnextTick (cb?: Function, ctx?: Object) {
      let _resolve
      // push进callbacks数组
      callbacks.push(() => {
         cb.call(ctx)
      })
      if (!pending) {
        pending = true// 执行timerFunc方法
        timerFunc()
      }
    }

**timerFunc**

    let timerFunc
    // 判断是否原生支持Promiseif (typeofPromise !== 'undefined' && isNative(Promise)) {
      const p = Promise.resolve()
      timerFunc = () => {
        // 如果原生支持Promise 用Promise执行flushCallbacks
        p.then(flushCallbacks)
        if (isIOS) setTimeout(noop)
      }
      isUsingMicroTask = true// 判断是否原生支持MutationObserver
    } elseif (!isIE && typeof MutationObserver !== 'undefined' && (
      isNative(MutationObserver) ||
      // PhantomJS and iOS 7.x
      MutationObserver.toString() === '[object MutationObserverConstructor]'
    )) {
      let counter = 1// 如果原生支持MutationObserver 用MutationObserver执行flushCallbacksconst observer = new MutationObserver(flushCallbacks)
      const textNode = document.createTextNode(String(counter))
      observer.observe(textNode, {
        characterData: true
      })
      timerFunc = () => {
        counter = (counter + 1) % 2
        textNode.data = String(counter)
      }
      isUsingMicroTask = true// 判断是否原生支持setImmediate 
    } elseif (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
      timerFunc = () => {
      // 如果原生支持setImmediate  用setImmediate执行flushCallbacks
        setImmediate(flushCallbacks)
      }
    // 都不支持的情况下使用setTimeout 0
    } else {
      timerFunc = () => {
        // 使用setTimeout执行flushCallbacks
        setTimeout(flushCallbacks, 0)
      }
    }
    
    // flushCallbacks 最终执行nextTick 方法传进来的回调函数functionflushCallbacks () {
      pending = falseconst copies = callbacks.slice(0)
      callbacks.length = 0for (let i = 0; i < copies.length; i++) {
        copies[i]()
      }
    }

nextTick会优先使用**microTask**, 其次是**macroTask** 。

也就是说nextTick中的任务，实际上会异步执行，**nextTick(callback)**类似于
**Promise.resolve().then(callback)**，或者**setTimeout(callback, 0)**。

也就是说vue的视图更新 **nextTick(flushSchedulerQueue)**等同于**setTimeout(flushSchedulerQueue, 0)**，会异步执行flushSchedulerQueue函数，所以我们在this.msg = hello 并不会立即更新dom。

要想在dom更新后读取dom信息，我们需要在**本次异步任务创建之后创建一个异步任务**。

![image](http://api.fly63.com/vue_blog/public/Uploads/20190812/5d516de2d8656.jpg)

为了验证这个想法我们不用nextTick，直接用**setTimeout**实验一下。如下面代码，验证了我们的想法。

    <template><divclass="box">{{msg}}</div></template><script>exportdefault {
      name: 'index',
      data () {
        return {
          msg: 'hello'
        }
      },
      mounted () {
        this.msg = 'world'let box = document.getElementsByClassName('box')[0]
        setTimeout(() => {
          console.log(box.innerHTML) // world
        })
      }
    }

如果我们在数据修改前nextTick ，那么我们添加的异步任务会在渲染的异步任务**之前**执行，拿不到更新后的dom。

    <template><divclass="box">{{msg}}</div></template><script>exportdefault {
      name: 'index',
      data () {
        return {
          msg: 'hello'
        }
      },
      mounted () {
        this.$nextTick(() => {
          console.log(box.innerHTML) // hello
        })
        this.msg = 'world'let box = document.getElementsByClassName('box')[0]
      }
    }

## 3 总结

vue为了保证性能，会把dom修改添加到异步任务，所有同步代码执行完成后再统一修改dom，**一次事件循环中**的多次数据修改只会触发一次watcher.run()。也就是通过nextTick，nextTick会优先使用microTask创建异步任务。vue项目中如果需要获取修改后的dom信息，需要通过nextTick在dom更新任务之后创建一个异步任务。如官网所说，nextTick会在下次 DOM 更新循环结束之后执行延迟回调。

.tj_box{box-sizing: border-box;margin: 5px auto;width: 100%;border: 1px solid #ddd;border-radius: 5px;padding-bottom: 10px;}.tj_box .tj_tit{background: #FF5E52;display: inline-block;padding: 5px 15px;color:#fff;margin: 10px;margin-top: 0;}.tj_box .tj_li{margin:0 10px;padding: 8px 0; overflow: hidden;border-bottom: 1px dotted #ddd;}.tj_box .tj_li p{font-size: 14px;color:#666;margin: 0;line-height: 20px;}.tj_box .tj_li a{display: inline-block;color:#FF5E52;cursor: pointer;margin-left: 5px;font-weight: bold;}
站长推荐

1.阿里云: 本站目前使用的是阿里云主机，安全/可靠/稳定。点击领取2000元代金券、了解最新阿里云产品的各种优惠活动[点击进入](http://www.fly63.com/nav/2907)

2.腾讯云: 提供云服务器、云数据库、云存储、视频与CDN、域名等服务。腾讯云各类产品的最新活动，优惠券领取[点击进入](http://www.fly63.com/nav/2908)

3.广告联盟: 整理了目前主流的广告联盟平台，如果你有流量，可以作为参考选择适合你的平台[点击进入](http://www.fly63.com/article/detial/1460)

链接: [http://www.fly63.com/article/detial/4657](http://www.fly63.com/article/detial/4657)