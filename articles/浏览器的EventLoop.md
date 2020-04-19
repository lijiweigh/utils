## 
                    
                    
                    
浏览器的 Event Loop
                

[
                        前端技术优选                      ](javascript:void(0);)

**前端技术优选**![image](undefined)
微信号iwebfe

功能介绍为你精选前端领域优质技术博文，欢迎关注。

以下文章来源于掘金开发者社区，作者小蘑菇哥哥
[
![image](undefined)

**掘金开发者社区**
掘金，一个帮助开发者成长的技术社区

](#)

### ![image](https://mmbiz.qpic.cn/mmbiz_gif/KfGu3WwVIa34PY1H5NVPPAms6s3bIX97xmOkiaMNTBJLzwRyTZcTiaM5F8XgRy5kkYIUCoFEshZt5skUrUp5GJhw/640?wx_fmt=gif)   戳蓝字「前端技术优选」关注我们哦！

本文的内容是浏览器的事件循环，并不是 nodejs 的事件循环，不要将两者混淆。

文章原始内容来自 Google Developer Day China 2018 的一个讲座，作者 Jake Archibald，我只是记录并翻译一下而已。其实这不是他首次分享这个内容，因此在 youtube 上搜他的名字和 Event Loop 能搜到讲座录像，有条件的开发者可以听听原版

我们先从一段代码开始

    H2M_LI_HEADER 
    document.body.appendChild(el)
    
    H2M_LI_HEADER 
    el.style.display ='none'
    
    

这两句代码先把一个元素添加到 body，然后隐藏它。从直观上来理解，可能大部分人觉得如此操作会导致页面闪动，因此编码时经常会交换两句的顺序：先隐藏再添加。

但实际上两者写法都不会造成闪动，因为他们都是同步代码。浏览器会把同步代码捆绑在一起执行，然后以执行结果为当前状态进行渲染。因此无论两句是什么顺序，浏览器都会执行完成后再一起渲染，因此结果是相同的。（除非同步代码中有获取当前计算样式的代码，后面会提到）

从本质上看，JS 是单进程的，也就是一次只能执行一个任务（或者说方法）。与之相对人不是单进程的，我们可以一边动手一边动脚；一边跑步一边说话，因此我们很难体会“阻塞”的概念。在 JS 中，阻塞值得就是因为某个任务（方法）执行时间太长，导致其他任务难以被执行的情况。

![image](https://mmbiz.qpic.cn/mmbiz_png/5Xv0xlEBe98Nibce8sd0g9PVE72w24rxibGgjXOuNGCqvDNQ5mmVQtsZnZXe0htp435BLdvRgbFJxxDKNTJ8aZGw/640?wx_fmt=png)

## 异步队列

但事实上有些任务的确是需要等待一会儿再处理的，例如 `setTimeout`，或者异步请求等。因此把主进程卡住等待返回会严重影响效率和体验，所以 JS 还增加了异步队列 (task queue) 来解决这个问题。

每次碰到异步操作，就把操作添加到异步队列中。等待主进程为空（即没有同步代码需要执行了），就去执行异步队列。执行完成后再回到主进程。

以 `setTimeout(callback，ms)` 为例：

![image](https://mmbiz.qpic.cn/mmbiz_png/5Xv0xlEBe98Nibce8sd0g9PVE72w24rxib65XKSRtBYB21SgD6uF0vQlic9MibxoMIIByEpwmeTzIU2HTvBtdC0T4w/640?wx_fmt=png)

初始状态：异步开关关闭（因为异步队列为空）。然后 ms 毫秒后添加一个任务 T 到队列中

![image](https://mmbiz.qpic.cn/mmbiz_png/5Xv0xlEBe98Nibce8sd0g9PVE72w24rxibloGw8f2gNKZy55GX5ffNxyxO7M7pNFhtdxpmsCbKWbrPDZHSJfwTgQ/640?wx_fmt=png)

现在异步队列不为空了，异步开关打开，然后主进程（白色方块）进入到异步队列，准备去执行黄色的 timeout 任务。

## 渲染过程

页面并不是时时刻刻被渲染的，浏览器会有固定的节奏去渲染页面，称为 render steps。它内部分为 3 个小步骤，分别是

- Structure - 构建 DOM 树的结构

- Layout - 确认每个 DOM 的大致位置（排版）

- Paint - 绘制每个 DOM 具体的内容（绘制）

我们考虑如下的代码：

    H2M_LI_HEADER 
    button.addEventListener('click',()=>{
    
    H2M_LI_HEADER 
    while(true);
    
    H2M_LI_HEADER 
    })
    
    

点击后会导致异步队列永远执行，因此不单单主进程，渲染过程也同样被阻塞而无法执行，因此页面无法再选中（因为选中时页面表现有所变化，文字有背景色，鼠标也变成 text），也无法再更换内容。（但鼠标却可以动！）

![image](https://mmbiz.qpic.cn/mmbiz_png/5Xv0xlEBe98Nibce8sd0g9PVE72w24rxibaqic2LjyVBZCv6UK7c5Ixt2DAV8Zygia7qaoQG5YSyYbxcdt8Uzic3l9w/640?wx_fmt=png)

如果我们把代码改成这样

    H2M_LI_HEADER 
    function loop(){
    
    H2M_LI_HEADER 
      setTimeout(loop,0)
    
    H2M_LI_HEADER 
    }
    
    H2M_LI_HEADER 
    loop()
    
    

每个异步任务的执行效果都是加入一个新的异步任务，新的异步任务将在下一次被执行，因此就不会存在阻塞。主进程和渲染过程都能正常进行。

## requestAnimationFrame

是一个特别的异步任务，只是注册的方法不加入异步队列，而是加入渲染这一边的队列中，它在渲染的三个步骤之前被执行。通常用来处理渲染相关的工作。

![image](https://mmbiz.qpic.cn/mmbiz_png/5Xv0xlEBe98Nibce8sd0g9PVE72w24rxib2jDPZylWDYBx28jBJMictmuiaXyVW30KcuuUkhXUQRECuJyd89GdhkxQ/640?wx_fmt=png)

我们来看一下 `setTimeout` 和 `requestAnimationFrame` 的差别。假设我们有一个元素 box，并且有一个 `moveBoxForwardOnePixel` 方法，作用是让这个元素向右移动 1 像素。

    H2M_LI_HEADER 
    // 方法 1
    
    H2M_LI_HEADER 
    function callback(){
    
    H2M_LI_HEADER 
      moveBoxForwardOnePixel();
    
    H2M_LI_HEADER 
      requestAnimationFrame(callback)
    
    H2M_LI_HEADER 
    }
    
    H2M_LI_HEADER 
    callback()
    
    H2M_LI_HEADER 
    
    
    
    H2M_LI_HEADER 
    // 方法 2
    
    H2M_LI_HEADER 
    function callback(){
    
    H2M_LI_HEADER 
      moveBoxForwardOnePixel();
    
    H2M_LI_HEADER 
      setTimeout(callback,0)
    
    H2M_LI_HEADER 
    }
    
    H2M_LI_HEADER 
    callback()
    
    

有这样两种方法来让 box 移动起来。但实际测试发现，使用 `setTimeout` 移动的 box 要比 `requestAnimationFrame` 速度快得多。这表明单位时间内 `callback` 被调用的次数是不一样的。

这是因为 `setTimeout` 在每次运行结束时都把自己添加到异步队列。等渲染过程的时候（不是每次执行异步队列都会进到渲染循环）异步队列已经运行过很多次了，所以渲染部分会一下会更新很多像素，而不是 1 像素。 `requestAnimationFrame` 只在渲染过程之前运行，因此严格遵守“执行一次渲染一次”，所以一次只移动 1 像素，是我们预期的方式。

如果在低端环境兼容，常规也会写作 `setTimeout(callback,1000/60)` 来大致模拟 60 fps 的情况，但本质上 `setTimeout` 并不适合用来处理渲染相关的工作。因此和渲染动画相关的，多用 `requestAnimationFrame`，不会有掉帧的问题（即某一帧没有渲染，下一帧把两次的结果一起渲染了）

## 同步代码的合并

开头说过，一段同步代码修改同一个元素的属性，浏览器会直接优化到最后一个。例如

    H2M_LI_HEADER 
    box.style.display ='none'
    
    H2M_LI_HEADER 
    box.style.display ='block'
    
    H2M_LI_HEADER 
    box.style.display ='none'
    
    

浏览器会直接隐藏元素，相当于只运行了最后一句。这是一种优化策略。

但有时候也会给我们造成困扰。例如如下代码：

    H2M_LI_HEADER 
    box.style.transform ='translateX(1000px)'
    
    H2M_LI_HEADER 
    box.style.tranition ='transform 1s ease'
    
    H2M_LI_HEADER 
    box.style.transform ='translateX(500px)'
    
    

我们的本意是从让 box 元素的位置从 0 **一下子** 移动到 1000，然后 **动画移动** 到 500。

但实际情况是从 0 **动画移动** 到 500。这也是由于浏览器的合并优化造成的。第一句设置位置到 1000 的代码被忽略了。

解决方法有 2 个：
第一种：我们刚才提过的 `requestAnimationFrame`。思路是让设置 box 的初始位置（第一句代码）在同步代码执行；让设置 box 的动画效果（第二句代码）和设置 box 的重点位置（第三句代码）放到下一帧执行。
但要注意， `requestAnimationFrame` 是在渲染过程 **之前** 执行的，因此直接写成

    H2M_LI_HEADER 
    box.style.transform ='translateX(1000px)'
    
    H2M_LI_HEADER 
    requestAnimationFrame(()=>{
    
    H2M_LI_HEADER 
        box.style.tranition ='transform 1s ease'
    
    H2M_LI_HEADER 
        box.style.transform ='translateX(500px)'
    
    H2M_LI_HEADER 
    })
    
    

是无效的，因为这样这三句代码依然是在同一帧中出现。那如何让后两句代码放到下一帧呢？这时候我们想到一句话：没有什么问题是一个 `requestAnimationFrame` 解决不了的，如果有，那就用两个：

    H2M_LI_HEADER 
    box.style.transform ='translateX(1000px)'
    
    H2M_LI_HEADER 
    requestAnimationFrame(()=>{
    
    H2M_LI_HEADER 
        requestAnimationFrame(()=>{
    
    H2M_LI_HEADER 
            box.style.transition ='transform 1s ease'
    
    H2M_LI_HEADER 
            box.style.transform ='translateX(500px)'
    
    H2M_LI_HEADER 
    })
    
    H2M_LI_HEADER 
    })
    
    

在渲染过程之前，再一次注册 `requestAnimationFrame`，这就能够让后两句代码放到下一帧去执行了，问题解决。（当然代码看上去有点奇怪）

第二种：你之所以没有在平时的代码中看到这样奇葩的嵌套用法，是因为还有更简单的实现方式，并且同样能够解决问题。这个问题的根源在于浏览器的合并优化，那么打断它的优化，就能解决问题。

    H2M_LI_HEADER 
    box.style.transform ='translateX(1000px)'
    
    H2M_LI_HEADER 
    getComputedStyle(box)// 伪代码，只要获取一下当前的计算样式即可
    
    H2M_LI_HEADER 
    box.style.transition ='transform 1s ease'
    
    H2M_LI_HEADER 
    box.style.transform ='translateX(500px)'
    
    

## Microtasks

现在我们要引入“第三个”异步队列，叫做 Microtasks (规范中也称为 Jobs)。

> Microtasks are usually scheduled for things that should happen straight after the currently executing script, such as reacting to a batch of actions, or to make something async without taking the penalty of a whcodee new task.

简单来说, Microtasks 就是在 **当次** 事件循环的 **结尾 立刻执行** 的任务。 `Promise.then()` 内部的代码就属于 microtasks。相对而言，之前的异步队列 (Task queue) 也叫做 macrotasks，不过一般还是简称为 tasks。

    H2M_LI_HEADER 
    function callback(){
    
    H2M_LI_HEADER 
    Promise.rescodeve().then(callback)
    
    H2M_LI_HEADER 
    }
    
    H2M_LI_HEADER 
    callback()
    
    

这段代码是在执行 microtasks 的时候，又把自己添加到了 microtasks 中，看上去是和那个 `setTimeout` 内部继续 `setTimeout` 类似。但实际效果却和第一段 `addEventListener` 内部 `while(true)` 一样，是会阻塞主进程的。这和 microtasks 内部的执行机制有关。

我们现在已经有了 3 个异步队列了，它们是

- 
Tasks (in `setTimeout`)

- 
Animation callbacks (in `requestAnimationFrame`)

- 
Microtasks (in `Promise.then`)

他们的执行特点是：

- 
Tasks 只执行一个。执行完了就进入主进程，主进程可能决定进入其他两个异步队列，也可能自己执行到空了再回来。 补充：对于“只执行一个”的理解，可以考虑设置 2 个相同时间的 `timeout`，两个并不会一起执行，而依然是分批的。

- 
Animation callbacks 执行队列里的全部任务，但如果任务本身又新增 Animation callback 就不会当场执行了，因为那是下一个循环 补充：同 Tasks，可以考虑连续调用两句 `requestAnimationFrame`，它们会在同一次事件循环内执行，有别于 Tasks

- 
Microtasks 直接执行到空队列才继续。因此如果任务本身又新增 Microtasks，也会一直执行下去。所以上面的例子才会产生阻塞。 补充：因为是当次执行，因此如果既设置了 `setTimeout(0)` 又设置了 `Promise.then()`，优先执行 Microtasks。

## 一段神奇的代码

考虑如下的代码：

    H2M_LI_HEADER 
    button.addEventListener('click',()=>{
    
    H2M_LI_HEADER 
    Promise.rescodeve().then(()=> conscodee.log('microtask 1'))
    
    H2M_LI_HEADER 
      conscodee.log('listener 1')
    
    H2M_LI_HEADER 
    })
    
    H2M_LI_HEADER 
    
    
    
    H2M_LI_HEADER 
    button.addEventListener('click',()=>{
    
    H2M_LI_HEADER 
    Promise.rescodeve().then(()=> conscodee.log('microtask 2'))
    
    H2M_LI_HEADER 
      conscodee.log('listener 2')
    
    H2M_LI_HEADER 
    })
    
    

在浏览器上运行后点击按钮，会按顺序打印

    H2M_LI_HEADER 
    listener 1
    
    H2M_LI_HEADER 
    microtask 1
    
    H2M_LI_HEADER 
    listener 2
    
    H2M_LI_HEADER 
    microtask 2
    
    

但如果在上面代码的最后加上 `button.click()` 打印顺序会 **有所区别**：

    H2M_LI_HEADER 
    listener 1
    
    H2M_LI_HEADER 
    listener 2
    
    H2M_LI_HEADER 
    microtask 1
    
    H2M_LI_HEADER 
    microtask 2
    
    

主要是 `listener2` 和 `microtask1` 次序的问题，原因如下：

- 
用户直接点击的时候，浏览器先后触发 2 个 listener。第一个 listener 触发完成 ( `listener1`) 之后，队列空了，就先打印了 microtask 1。然后再执行下一个 listener。**重点在于浏览器并不实现知道有几个 listener，因此它发现一个执行一个，执行完了再看后面还有没有。**

- 
而使用 `button.click()` 时，浏览器的内部实现是把 2 个 listener 都同步执行。因此 `listener1` 之后，执行队列还没空，还要继续执行 `listener2` 之后才行。所以 `listener2` 会早于 `microtask1`。**重点在于浏览器的内部实现， `click` 方法会先采集有哪些 listener，再依次触发。**

这个差别最大的应用在于自动化测试脚本。在这里可以看出，使用自动化脚本测试和真正的用户操作还是有细微的差别。如果代码中有类似的情况，要格外注意了。

针对其他浏览器如何表现这个问题，在原作者的一篇 2015 年的博客中有所提及。其中设计的 case 更加完整，但当时各种浏览器给出了不一样的输出结果，因此他还在博客中分析了一波谁对谁错。直到今天虽然没有标准指明应该怎样，但所有浏览器都以如上分析的方式运行。

## 再来两个测试题

第一题：

    H2M_LI_HEADER 
    conscodee.log('Start')
    
    H2M_LI_HEADER 
    
    
    
    H2M_LI_HEADER 
    setTimeout(()=> conscodee.log('Timeout 1'),0)
    
    H2M_LI_HEADER 
    setTimeout(()=> conscodee.log('Timeout 2'),0)
    
    H2M_LI_HEADER 
    
    
    
    H2M_LI_HEADER 
    Promise.rescodeve().then(()=>{
    
    H2M_LI_HEADER 
    for(let i=0; i<100000; i++){}
    
    H2M_LI_HEADER 
      conscodee.log('Promise 1')
    
    H2M_LI_HEADER 
    })
    
    H2M_LI_HEADER 
    Promise.rescodeve().then(()=> conscodee.log('Promise 2'))
    
    H2M_LI_HEADER 
    
    
    
    H2M_LI_HEADER 
    conscodee.log('End');
    
    

第二题：(在浏览器上点击按钮)

    H2M_LI_HEADER 
    let button = document.querySelector('#button');
    
    H2M_LI_HEADER 
    
    
    
    H2M_LI_HEADER 
    button.addEventListener('click',function CB1(){
    
    H2M_LI_HEADER 
      conscodee.log('Listener 1');
    
    H2M_LI_HEADER 
    
    
    
    H2M_LI_HEADER 
      setTimeout(()=> conscodee.log('Timeout 1'))
    
    H2M_LI_HEADER 
    
    
    
    H2M_LI_HEADER 
    Promise.rescodeve().then(()=> conscodee.log('Promise 1'))
    
    H2M_LI_HEADER 
    });
    
    H2M_LI_HEADER 
    
    
    
    H2M_LI_HEADER 
    button.addEventListener('click',function CB1(){
    
    H2M_LI_HEADER 
      conscodee.log('Listener 2');
    
    H2M_LI_HEADER 
    
    
    
    H2M_LI_HEADER 
      setTimeout(()=> conscodee.log('Timeout 2'))
    
    H2M_LI_HEADER 
    
    
    
    H2M_LI_HEADER 
    Promise.rescodeve().then(()=> conscodee.log('Promise 2'))
    
    H2M_LI_HEADER 
    });
    
    

公布答案：

- 
**第一题：** Start, End, Promise 1, Promise 2, Timeout 1, Timeout 2

- 
**第二题：** Listener 1, Promise 1, Listener 2, Promise 2, Timeout 1, Timeout 2

这两个题目来自一篇相关文章（链接在最后），其中还有详细的分析，我这里就不重复了。

## 相关文章

JavaScript: How is callback execution strategy for promises different than DOM events callback?

![image](https://mmbiz.qpic.cn/mmbiz_jpg/C94aicOicyXpL2PeMYyVaBOOkUNR6OIYB8jcuOiaa1FffZMhwXKiadicMOA0ibd1S38SpVVqHhh5oL0SZSFmAZNBtoKg/640?wx_fmt=jpeg)

![image](https://mmbiz.qpic.cn/mmbiz_png/7QRTvkK2qC6BGNLOQxwBmMTOGmO0dSd31LlXL5HoZWBH6fKtSSeKQ2DOeTfVR7nHVXl0U7RSAchUVoia2bErYfg/640?wx_fmt=png)在看点这里![image](https://mmbiz.qpic.cn/mmbiz_gif/7QRTvkK2qC6BGNLOQxwBmMTOGmO0dSd3NmOWsZBMWg3BC1msdwtyvBkNLYh1xGLQibm4QsHibClwxWfzuibicbJcIA/640?wx_fmt=gif)

                    var first_sceen__time = (+new Date());

                    if ("" == 1 && document.getElementById('js_content')) {
                        document.getElementById('js_content').addEventListener("selectstart",function(e){ e.preventDefault(); });
                    }

                    
                    (function(){
                        if (navigator.userAgent.indexOf("WindowsWechat") != -1){
                            var link = document.createElement('link');
                            var head = document.getElementsByTagName('head')[0];
                            link.rel = 'stylesheet';
                            link.type = 'text/css';
                            link.href = "//res.wx.qq.com/mmbizwap/zh_CN/htmledition/style/page/appmsg_new/winwx4c4161.css";
                            head.appendChild(link);
                        }
                    })();
                

[阅读原文](##)
阅读

在看

已同步到看一看[写下你的想法](javascript:;)

前往“发现”-“看一看”浏览“朋友在看”

![image](undefined)
前往看一看

**看一看入口已关闭**

        在“设置”-“通用”-“发现页管理”打开“看一看”入口      

[我知道了](javascript:;)

已发送

            取消            

####  发送到看一看 

发送

                      浏览器的 Event Loop
                  

最多200字，当前共字

发送中