型转换
> 1.Number() 将任意类型的参数转换为数值类型

规则如下:

- 如果是布尔值，true和false分别被转换为1和0
- 如果是数字，返回自身
- 如果是 null，返回 0
- 如果是 undefined，返回 `NAN`
- 如果是字符串，遵循以下规则:

1. 如果字符串中只包含数字(或者是 `0X` / `0x` 开头的十六进制数字字符串，允许包含正负号)，则将其转换为十进制
2. 如果字符串中包含有效的浮点格式，将其转换为浮点数值
3. 如果是空字符串，将其转换为0
4. 如不是以上格式的字符串，均返回 `NaN`

- 如果是Symbol，抛出错误
- 如果是对象，则调用对象的 `valueOf()` 方法，然后依据前面的规则转换返回的值。如果转换的结果是 `NaN` ，则调用对象的 `toString()` 方法，再次依照前面的规则转换返回的字符串值。

部分内置对象调用默认的 `valueOf` 的行为:
对象返回值Array数组本身（对象类型）Boolean布尔值（原始类型）Date从 UTC 1970 年 1 月 1 日午夜开始计算，到所封装的日期所经过的毫秒数Function函数本身（对象类型）Number数字值（原始类型）Object对象本身（对象类型）String字符串值（原始类型）

    Number('0111');//111Number('0X11')//17Number(null);//0Number('');//0Number('1a');//NaNNumber(-0X11);//-17

> 2.parseInt(param, radix)

如果第一个参数传入的是字符串类型:

1. 忽略字符串前面的空格，直至找到第一个非空字符，如果是空字符串，返回NaN
2. 如果第一个字符不是数字符号或者正负号，返回NaN
3. 如果第一个字符是数字/正负号，则继续解析直至字符串解析完毕或者遇到一个非数字符号为止

如果第一个参数传入的Number类型:

1. 数字如果是0开头，则将其当作八进制来解析(如果是一个八进制数)；如果以0x开头，则将其当作十六进制来解析

如果第一个参数是 null 或者是 undefined，或者是一个对象类型：

1. 返回 NaN

如果第一个参数是数组：

1. 去数组的第一个元素，按照上面的规则进行解析

如果第一个参数是Symbol类型：

1. 抛出错误

如果指定radix参数，以radix为基数进行解析

    parseInt('0111');//111parseInt(0111);//八进制数 73parseInt('');//NaNparseInt('0X11');//17parseInt('1a')//1parseInt('a1');//NaNparseInt(['10aa','aaa']);//10parseInt([]);//NaN; parseInt(undefined);

> parseFloat

规则和`parseInt`基本相同，接受一个Number类型或字符串，如果是字符串中，那么只有第一个小数点是有效的。

> toString()

规则如下:

- 如果是Number类型，输出数字字符串
- 如果是 null 或者是 undefined，抛错
- 如果是数组，那么将数组展开输出。空数组，返回`''`
- 如果是对象，返回 `[object Object]`
- 如果是Date, 返回日期的文字表示法
- 如果是函数，输出对应的字符串(如下demo)
- 如果是Symbol，输出Symbol字符串

    letarry=[];letobj={a:1};letsym=Symbol(100);letdate=newDate();letfn=function(){console.log('稳住，我们能赢！')}letstr='hello world';console.log([].toString());// ''console.log([1,2,3,undefined,5,6].toString());//1,2,3,,5,6console.log(arry.toString());// 1,2,3console.log(obj.toString());// [object Object]console.log(date.toString());// Sun Apr 21 2019 16:11:39 GMT+0800 (CST)console.log(fn.toString());// function () {console.log('稳住，我们能赢！')}console.log(str.toString());// 'hello world'console.log(sym.toString());// Symbol(100)console.log(undefined.toString());// 抛错console.log(null.toString());// 抛错

> String()

`String()` 的转换规则与 `toString()` 基本一致，最大的一点不同在于 `null` 和 `undefined`，使用 String 进行转换，null 和 undefined对应的是字符串 `'null'` 和 `'undefined'`

> Boolean

除了 undefined、 null、 false、 ''、 0(包括 +0，-0)、 NaN 转换出来是false，其它都是true.

**隐式类型转换**

> && 、|| 、 ! 、 if/while 的条件判断

需要将数据转换成 Boolean 类型，转换规则同 Boolean 强制类型转换

> 运算符: + - * /

`+` 号操作符，不仅可以用作数字相加，还可以用作字符串拼接。

仅当 `+` 号两边都是数字时，进行的是加法运算。如果两边都是字符串，直接拼接，无需进行隐式类型转换。

除了上面的情况外，如果操作数是对象、数值或者布尔值，则调用toString()方法取得字符串值(toString转换规则)。对于 undefined 和 null，分别调用String()显式转换为字符串，然后再进行拼接。

    console.log({}+10);//[object Object]10console.log([1,2,3,undefined,5,6]+10);//1,2,3,,5,610

`-`、`*`、`/` 操作符针对的是运算，如果操作值之一不是数值，则被隐式调用Number()函数进行转换。如果其中有一个转换除了为NaN，结果为NaN.

> 关系操作符: ==、>、< 、<=、>=

`>` , `<` ，`<=` ，`>=`

1. 如果两个操作值都是数值，则进行数值比较
2. 如果两个操作值都是字符串，则比较字符串对应的字符编码值
3. 如果有一方是Symbol类型，抛出错误
4. 除了上述情况之外，都进行Number()进行类型转换，然后再进行比较。

**注：** NaN是非常特殊的值，它不和任何类型的值相等，包括它自己，同时它与任何类型的值比较大小时都返回false。

    console.log(10>{});//返回false./** *{}.valueOf ---> {} *{}.toString() ---> '[object Object]' ---> NaN *NaN 和 任何类型比大小，都返回 false */

> 相等操作符：`==`

1. 如果类型相同，无需进行类型转换。
2. 如果其中一个操作值是 null 或者是 undefined，那么另一个操作符必须为 null 或者 undefined 时，才返回 true，否则都返回 false.
3. 如果其中一个是 Symbol 类型，那么返回 false.
4. 两个操作值是否为 string 和 number，就会将字符串转换为 number
5. 如果一个操作值是 boolean，那么转换成 number
6. 如果一个操作值为 object 且另一方为 string、number 或者 symbol，是的话就会把 object 转为原始类型再进行判断(调用object的valueOf/toString方法进行转换)

> 对象如何转换成原始数据类型

如果部署了 [Symbol.toPrimitive] 接口，那么调用此接口，若返回的不是基础数据类型，跑出错误。

如果没有部署 [Symbol.toPrimitive] 接口，那么先返回 valueOf() 的值，若返回的不是基础类型的值，再返回 toString() 的值，若返回的不是基础类型的值， 则抛出异常。

    //先调用 valueOf, 后调用 toStringletobj={[Symbol.toPrimitive](){return200;},valueOf(){return300;},toString(){return'Hello';}}//如果 valueOf 返回的不是基本数据类型，则会调用 toString， //如果 toString 返回的也不是基本数据类型，会抛出错误console.log(obj+200);//400

[![image](https://camo.githubusercontent.com/738bdd3de5c5e57c92f8b4671784ce8a568325f9/68747470733a2f2f74696d6773612e62616964752e636f6d2f74696d673f696d616765267175616c6974793d38302673697a653d62393939395f3130303030267365633d313535353834393332383738302664693d646464316631363166303135393766316538366166363838376630383561346126696d67747970653d30267372633d687474702533412532462532466d6d62697a2e717069632e636e2532466d6d62697a5f6a7067253246706c4149696139376d7439625147784d57344e64696376345a744239786a69623967795768705a64476961307a664c574b384e78734630456c5a4b507a475569625a796b43696136306773724d5064385078534e477576553972527725324636343025334677785f666d742533446a706567)](https://camo.githubusercontent.com/738bdd3de5c5e57c92f8b4671784ce8a568325f9/68747470733a2f2f74696d6773612e62616964752e636f6d2f74696d673f696d616765267175616c6974793d38302673697a653d62393939395f3130303030267365633d313535353834393332383738302664693d646464316631363166303135393766316538366166363838376630383561346126696d67747970653d30267372633d687474702533412532462532466d6d62697a2e717069632e636e2532466d6d62697a5f6a7067253246706c4149696139376d7439625147784d57344e64696376345a744239786a69623967795768705a64476961307a664c574b384e78734630456c5a4b507a475569625a796b43696136306773724d5064385078534e477576553972527725324636343025334677785f666d742533446a706567)

如果你有更好的答案或想法，欢迎在这题目对应的github下留言：[JS 类型转换的规则是什么？](https://github.com/YvetteLau/Blog/issues/16)

---

### 8.简述下对 webWorker 的理解？

HTML5则提出了 Web Worker 标准，表示js允许多线程，但是子线程完全受主线程控制并且不能操作dom，只有主线程可以操作dom，所以js本质上依然是单线程语言。

web worker就是在js单线程执行的基础上开启一个子线程，进行程序处理，而不影响主线程的执行，当子线程执行完之后再回到主线程上，在这个过程中不影响主线程的执行。子线程与主线程之间提供了数据交互的接口postMessage和onmessage，来进行数据发送和接收。

    varworker=newWorker('./worker.js');//创建一个子线程worker.postMessage('Hello');worker.onmessage=function(e){console.log(e.data);//Hiworker.terminate();//结束线程};

    //worker.jsonmessage=function(e){console.log(e.data);//HellopostMessage("Hi");//向主进程发送消息};

仅是最简示例代码，项目中通常是将一些耗时较长的代码，放在子线程中运行。

如果你有更好的答案或想法，欢迎在这题目对应的github下留言：[简述下对 webWorker 的理解](https://github.com/YvetteLau/Blog/issues/17)

---

### 9.ES6模块和CommonJS模块的差异？

1. 
ES6模块在编译时，就能确定模块的依赖关系，以及输入和输出的变量。

CommonJS 模块，运行时加载。

2. 
ES6 模块自动采用严格模式，无论模块头部是否写了 `"use strict";` (严格模式有哪些限制？[//链接])

3. 
require 可以做动态加载，import 语句做不到，import 语句必须位于顶层作用域中。

4. 
ES6 模块中顶层的 this 指向 undefined，ommonJS 模块的顶层 this 指向当前模块。

5. 
CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。

CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。如：

    //name.jsvarname='William';setTimeout(()=>name='Yvette',200);module.exports={
        name
    };//index.jsconstname=require('./name');console.log(name);//WilliamsetTimeout(()=>console.log(name),300);//William

对比 ES6 模块看一下:

ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令 import ，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。

    //name.jsvarname='William';setTimeout(()=>name='Yvette',200);export{name};//index.jsimport{name}from'./name';console.log(name);//WilliamsetTimeout(()=>console.log(name),300);//Yvette

如果你有更好的答案或想法，欢迎在这题目对应的github下留言：[ES6模块和CommonJS模块的差异？](https://github.com/YvetteLau/Blog/issues/18)

---

### 10.浏览器事件代理机制的原理是什么？

在说浏览器事件代理机制原理之前，我们首先了解一下事件流的概念，早期浏览器，IE采用的是事件捕获事件流，而Netscape采用的则是事件捕获。"DOM2级事件"把事件流分为三个阶段，捕获阶段、目标阶段、冒泡阶段。现代浏览器也都遵循此规范。

[![image](https://camo.githubusercontent.com/a2473ce916b426657cf69829e09e1b1fcd75620b/68747470733a2f2f6e6f74652e796f7564616f2e636f6d2f7977732f7075626c69632f7265736f757263652f66343537303163633431303530346537316462626362643838363165386430632f786d6c6e6f74652f5745425245534f5552434539303731353332353935313534383966356338386539663038373438363533312f3239343838)](https://camo.githubusercontent.com/a2473ce916b426657cf69829e09e1b1fcd75620b/68747470733a2f2f6e6f74652e796f7564616f2e636f6d2f7977732f7075626c69632f7265736f757263652f66343537303163633431303530346537316462626362643838363165386430632f786d6c6e6f74652f5745425245534f5552434539303731353332353935313534383966356338386539663038373438363533312f3239343838)

> 那么事件代理是什么呢？

事件代理又称为事件委托，在祖先级DOM元素绑定一个事件，当触发子孙级DOM元素的事件时，利用事件冒泡的原理来触发绑定在祖先级DOM的事件。因为事件会从目标元素一层层冒泡至document对象。

> 为什么要事件代理？

1. 
添加到页面上的事件数量会影响页面的运行性能，如果添加的事件过多，会导致网页的性能下降。采用事件代理的方式，可以大大减少注册事件的个数。

2. 
事件代理的当时，某个子孙元素是动态增加的，不需要再次对其进行事件绑定。

3. 
不用担心某个注册了事件的DOM元素被移除后，可能无法回收其事件处理程序，我们只要把事件处理程序委托给更高层级的元素，就可以避免此问题。

> 如将页面中的所有click事件都代理到document上:

addEventListener 接受3个参数，分别是要处理的事件名、处理事件程序的函数和一个布尔值。布尔值默认为false。表示冒泡阶段调用事件处理程序，若设置为true，表示在捕获阶段调用事件处理程序。

    document.addEventListener('click',function(e){console.log(e.target);/**    * 捕获阶段调用调用事件处理程序，eventPhase是 1;     * 处于目标，eventPhase是2     * 冒泡阶段调用事件处理程序，eventPhase是 1；    */console.log(e.eventPhase);});

如果你有更好的答案或想法，欢迎在这题目对应的github下留言：[浏览器事件代理机制的原理是什么？](https://github.com/YvetteLau/Blog/issues/19)

---