<td class="d-block comment-body markdown-body  js-comment-body">
          <p>互联网寒冬之际，各大公司都缩减了HC，甚至是采取了“裁员”措施，在这样的大环境之下，想要获得一份更好的工作，必然需要付出更多的努力。</p>
<p>一年前，也许你搞清楚闭包，this，原型链，就能获得认可。但是现在，很显然是不行了。本文梳理出了一些面试中有一定难度的高频原生JS问题，部分知识点可能你之前从未关注过，或者看到了，却没有仔细研究，但是它们却非常重要。本文将以真实的面试题的形式来呈现知识点，大家在阅读时，建议不要先看我的答案，而是自己先思考一番。尽管，本文所有的答案，都是我在翻阅各种资料，思考并验证之后，才给出的(<strong>绝非复制粘贴而来</strong>)。但因水平有限，本人的答案未必是最优的，如果您有更好的答案，欢迎给我留言。</p>
<p>本文篇幅较长，但是满满的都是干货！并且还埋伏了可爱的表情包，希望小伙伴们能够坚持读完。</p>
<p>写文超级真诚的小姐姐祝愿大家都能找到心仪的工作。</p>
<p>如果你还没读过上篇【上篇和中篇并无依赖关系，您可以读过本文之后再阅读上篇】，可戳<a href="https://juejin.im/post/5cab0c45f265da2513734390" rel="nofollow">【面试篇】寒冬求职季之你必须要懂的原生JS(上)</a></p>
<p><strong>小姐姐花了近百个小时才完成这篇文章，篇幅较长，希望大家阅读时多花点耐心，力求真正的掌握相关知识点。</strong></p>
<h3>1.说一说JS异步发展史</h3>
<p>异步最早的解决方案是回调函数，如事件的回调，setInterval/setTimeout中的回调。但是回调函数有一个很常见的问题，就是回调地狱的问题(稍后会举例说明);</p>
<p>为了解决回调地狱的问题，社区提出了Promise解决方案，ES6将其写进了语言标准。Promise解决了回调地狱的问题，但是Promise也存在一些问题，如错误不能被try catch，而且使用Promise的链式调用，其实并没有从根本上解决回调地狱的问题，只是换了一种写法。</p>
<p>ES6中引入 Generator 函数，Generator是一种异步编程解决方案，Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权，Generator 函数可以看出是异步任务的容器，需要暂停的地方，都用yield语句注明。但是 Generator 使用起来较为复杂。</p>
<p>ES7又提出了新的异步解决方案:async/await，async是 Generator 函数的语法糖，async/await 使得异步代码看起来像同步代码，异步编程发展的目标就是让异步逻辑的代码看起来像同步一样。</p>
<blockquote>
<p>1.回调函数: callback</p>
</blockquote>
<div class="highlight highlight-source-js"><pre><span class="pl-c">//node读取文件</span>
<span class="pl-s1">fs</span><span class="pl-kos">.</span><span class="pl-en">readFile</span><span class="pl-kos">(</span><span class="pl-s1">xxx</span><span class="pl-kos">,</span> <span class="pl-s">'utf-8'</span><span class="pl-kos">,</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">err</span><span class="pl-kos">,</span> <span class="pl-s1">data</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-c">//code</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<p>回调函数的使用场景(包括但不限于):</p>
<ol>
<li>事件回调</li>
<li>Node API</li>
<li>setTimeout/setInterval中的回调函数</li>
</ol>
<p>异步回调嵌套会导致代码难以维护，并且不方便统一处理错误，不能try catch 和 回调地狱(如先读取A文本内容，再根据A文本内容读取B再根据B的内容读取C...)。</p>
<div class="highlight highlight-source-js"><pre><span class="pl-s1">fs</span><span class="pl-kos">.</span><span class="pl-en">readFile</span><span class="pl-kos">(</span><span class="pl-v">A</span><span class="pl-kos">,</span> <span class="pl-s">'utf-8'</span><span class="pl-kos">,</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">err</span><span class="pl-kos">,</span> <span class="pl-s1">data</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-s1">fs</span><span class="pl-kos">.</span><span class="pl-en">readFile</span><span class="pl-kos">(</span><span class="pl-v">B</span><span class="pl-kos">,</span> <span class="pl-s">'utf-8'</span><span class="pl-kos">,</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">err</span><span class="pl-kos">,</span> <span class="pl-s1">data</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-s1">fs</span><span class="pl-kos">.</span><span class="pl-en">readFile</span><span class="pl-kos">(</span><span class="pl-v">C</span><span class="pl-kos">,</span> <span class="pl-s">'utf-8'</span><span class="pl-kos">,</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">err</span><span class="pl-kos">,</span> <span class="pl-s1">data</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-s1">fs</span><span class="pl-kos">.</span><span class="pl-en">readFile</span><span class="pl-kos">(</span><span class="pl-v">D</span><span class="pl-kos">,</span> <span class="pl-s">'utf-8'</span><span class="pl-kos">,</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">err</span><span class="pl-kos">,</span> <span class="pl-s1">data</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
                <span class="pl-c">//....</span>
            <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<blockquote>
<p>2.Promise</p>
</blockquote>
<p>Promise 主要解决了回调地狱的问题，Promise 最早由社区提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。</p>
<p>那么我们看看Promise是如何解决回调地狱问题的，仍然以上文的readFile为例。</p>
<div class="highlight highlight-source-js"><pre><span class="pl-k">function</span> <span class="pl-en">read</span><span class="pl-kos">(</span><span class="pl-s1">url</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">return</span> <span class="pl-k">new</span> <span class="pl-v">Promise</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">resolve</span><span class="pl-kos">,</span> <span class="pl-s1">reject</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
        <span class="pl-s1">fs</span><span class="pl-kos">.</span><span class="pl-en">readFile</span><span class="pl-kos">(</span><span class="pl-s1">url</span><span class="pl-kos">,</span> <span class="pl-s">'utf8'</span><span class="pl-kos">,</span> <span class="pl-kos">(</span><span class="pl-s1">err</span><span class="pl-kos">,</span> <span class="pl-s1">data</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
            <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">err</span><span class="pl-kos">)</span> <span class="pl-s1">reject</span><span class="pl-kos">(</span><span class="pl-s1">err</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
            <span class="pl-s1">resolve</span><span class="pl-kos">(</span><span class="pl-s1">data</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span>
<span class="pl-en">read</span><span class="pl-kos">(</span><span class="pl-v">A</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">then</span><span class="pl-kos">(</span><span class="pl-s1">data</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-k">return</span> <span class="pl-en">read</span><span class="pl-kos">(</span><span class="pl-v">B</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">then</span><span class="pl-kos">(</span><span class="pl-s1">data</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-k">return</span> <span class="pl-en">read</span><span class="pl-kos">(</span><span class="pl-v">C</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">then</span><span class="pl-kos">(</span><span class="pl-s1">data</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-k">return</span> <span class="pl-en">read</span><span class="pl-kos">(</span><span class="pl-v">D</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">catch</span><span class="pl-kos">(</span><span class="pl-s1">reason</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">reason</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<p>想要运行代码看效果，请戳(小姐姐使用的是VS的 Code Runner 执行代码): <a href="https://github.com/YvetteLau/Blog/blob/master/JS/Async/promise.js">https://github.com/YvetteLau/Blog/blob/master/JS/Async/promise.js</a></p>
<p>思考一下在Promise之前，你是如何处理异步并发问题的，假设有这样一个需求：读取三个文件内容，都读取成功后，输出最终的结果。有了Promise之后，又如何处理呢？代码可戳: <a href="https://github.com/YvetteLau/Blog/blob/master/JS/Async/index.js">https://github.com/YvetteLau/Blog/blob/master/JS/Async/index.js</a></p>
<p>注: 可以使用 bluebird 将接口 promise化;</p>
<p><strong>引申:</strong> Promise有哪些优点和问题呢？</p>

<blockquote>
<p>3.Generator</p>
</blockquote>
<p>Generator 函数是 ES6 提供的一种异步编程解决方案，整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用 yield 语句注明。</p>
<p>Generator 函数一般配合 yield 或 Promise 使用。Generator函数返回的是迭代器。对生成器和迭代器不了解的同学，请自行补习下基础。下面我们看一下 Generator 的简单使用:</p>
<div class="highlight highlight-source-js"><pre><span class="pl-k">function</span>* <span class="pl-s1">gen</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">let</span> <span class="pl-s1">a</span> <span class="pl-c1">=</span> <span class="pl-k">yield</span> <span class="pl-c1">111</span><span class="pl-kos">;</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">a</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-k">let</span> <span class="pl-s1">b</span> <span class="pl-c1">=</span> <span class="pl-k">yield</span> <span class="pl-c1">222</span><span class="pl-kos">;</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">b</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-k">let</span> <span class="pl-s1">c</span> <span class="pl-c1">=</span> <span class="pl-k">yield</span> <span class="pl-c1">333</span><span class="pl-kos">;</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">c</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-k">let</span> <span class="pl-s1">d</span> <span class="pl-c1">=</span> <span class="pl-k">yield</span> <span class="pl-c1">444</span><span class="pl-kos">;</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">d</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span>
<span class="pl-k">let</span> <span class="pl-s1">t</span> <span class="pl-c1">=</span> <span class="pl-en">gen</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-c">//next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值</span>
<span class="pl-s1">t</span><span class="pl-kos">.</span><span class="pl-en">next</span><span class="pl-kos">(</span><span class="pl-c1">1</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//第一次调用next函数时，传递的参数无效</span>
<span class="pl-s1">t</span><span class="pl-kos">.</span><span class="pl-en">next</span><span class="pl-kos">(</span><span class="pl-c1">2</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//a输出2;</span>
<span class="pl-s1">t</span><span class="pl-kos">.</span><span class="pl-en">next</span><span class="pl-kos">(</span><span class="pl-c1">3</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//b输出2; </span>
<span class="pl-s1">t</span><span class="pl-kos">.</span><span class="pl-en">next</span><span class="pl-kos">(</span><span class="pl-c1">4</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//c输出3;</span>
<span class="pl-s1">t</span><span class="pl-kos">.</span><span class="pl-en">next</span><span class="pl-kos">(</span><span class="pl-c1">5</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//d输出3;</span></pre></div>
<p>为了让大家更好的理解上面代码是如何执行的，我画了一张图，分别对应每一次的next方法调用:</p>
<p><a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/2ca8d09a5bc1add25a11cab2362d73d3c1fcc634/68747470733a2f2f6e6f74652e796f7564616f2e636f6d2f7977732f7075626c69632f7265736f757263652f66343537303163633431303530346537316462626362643838363165386430632f786d6c6e6f74652f5745425245534f5552434536633839663561376332343263343264303066663265316566666137383364332f3239343930"><img src="https://camo.githubusercontent.com/2ca8d09a5bc1add25a11cab2362d73d3c1fcc634/68747470733a2f2f6e6f74652e796f7564616f2e636f6d2f7977732f7075626c69632f7265736f757263652f66343537303163633431303530346537316462626362643838363165386430632f786d6c6e6f74652f5745425245534f5552434536633839663561376332343263343264303066663265316566666137383364332f3239343930" alt="" data-canonical-src="https://note.youdao.com/yws/public/resource/f45701cc410504e71dbbcbd8861e8d0c/xmlnote/WEBRESOURCE6c89f5a7c242c42d00ff2e1effa783d3/29490" style="max-width:100%;"></a></p>
<p>仍然以上文的readFile为例，使用 Generator + co库来实现:</p>
<div class="highlight highlight-source-js"><pre><span class="pl-k">const</span> <span class="pl-s1">fs</span> <span class="pl-c1">=</span> <span class="pl-en">require</span><span class="pl-kos">(</span><span class="pl-s">'fs'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-k">const</span> <span class="pl-s1">co</span> <span class="pl-c1">=</span> <span class="pl-en">require</span><span class="pl-kos">(</span><span class="pl-s">'co'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-k">const</span> <span class="pl-s1">bluebird</span> <span class="pl-c1">=</span> <span class="pl-en">require</span><span class="pl-kos">(</span><span class="pl-s">'bluebird'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-k">const</span> <span class="pl-s1">readFile</span> <span class="pl-c1">=</span> <span class="pl-s1">bluebird</span><span class="pl-kos">.</span><span class="pl-en">promisify</span><span class="pl-kos">(</span><span class="pl-s1">fs</span><span class="pl-kos">.</span><span class="pl-c1">readFile</span><span class="pl-kos">)</span><span class="pl-kos">;</span>

<span class="pl-k">function</span>* <span class="pl-s1">read</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">yield</span> <span class="pl-s1">readFile</span><span class="pl-kos">(</span><span class="pl-v">A</span><span class="pl-kos">,</span> <span class="pl-s">'utf-8'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-k">yield</span> <span class="pl-s1">readFile</span><span class="pl-kos">(</span><span class="pl-v">B</span><span class="pl-kos">,</span> <span class="pl-s">'utf-8'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-k">yield</span> <span class="pl-s1">readFile</span><span class="pl-kos">(</span><span class="pl-v">C</span><span class="pl-kos">,</span> <span class="pl-s">'utf-8'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-c">//....</span>
<span class="pl-kos">}</span>
<span class="pl-s1">co</span><span class="pl-kos">(</span><span class="pl-en">read</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">then</span><span class="pl-kos">(</span><span class="pl-s1">data</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-c">//code</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">catch</span><span class="pl-kos">(</span><span class="pl-s1">err</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-c">//code</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<p>不使用co库，如何实现？能否自己写一个最简的my_co？请戳: <a href="https://github.com/YvetteLau/Blog/blob/master/JS/Async/generator.js">https://github.com/YvetteLau/Blog/blob/master/JS/Async/generator.js</a></p>
<p>PS: 如果你还不太了解 Generator/yield，建议阅读ES6相关文档。</p>
<blockquote>
<p>4.async/await</p>
</blockquote>
<p>ES7中引入了 async/await 概念。async其实是一个语法糖，它的实现就是将Generator函数和自动执行器（co），包装在一个函数中。</p>
<p>async/await 的优点是代码清晰，不用像 Promise 写很多 then 链，就可以处理回调地狱的问题。错误可以被try catch。</p>
<p>仍然以上文的readFile为例，使用 Generator + co库来实现:</p>
<div class="highlight highlight-source-js"><pre><span class="pl-k">const</span> <span class="pl-s1">fs</span> <span class="pl-c1">=</span> <span class="pl-en">require</span><span class="pl-kos">(</span><span class="pl-s">'fs'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-k">const</span> <span class="pl-s1">bluebird</span> <span class="pl-c1">=</span> <span class="pl-en">require</span><span class="pl-kos">(</span><span class="pl-s">'bluebird'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-k">const</span> <span class="pl-s1">readFile</span> <span class="pl-c1">=</span> <span class="pl-s1">bluebird</span><span class="pl-kos">.</span><span class="pl-en">promisify</span><span class="pl-kos">(</span><span class="pl-s1">fs</span><span class="pl-kos">.</span><span class="pl-c1">readFile</span><span class="pl-kos">)</span><span class="pl-kos">;</span>


<span class="pl-k">async</span> <span class="pl-k">function</span> <span class="pl-en">read</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">await</span> <span class="pl-s1">readFile</span><span class="pl-kos">(</span><span class="pl-v">A</span><span class="pl-kos">,</span> <span class="pl-s">'utf-8'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-k">await</span> <span class="pl-s1">readFile</span><span class="pl-kos">(</span><span class="pl-v">B</span><span class="pl-kos">,</span> <span class="pl-s">'utf-8'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-k">await</span> <span class="pl-s1">readFile</span><span class="pl-kos">(</span><span class="pl-v">C</span><span class="pl-kos">,</span> <span class="pl-s">'utf-8'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-c">//code</span>
<span class="pl-kos">}</span>

<span class="pl-en">read</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">then</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">data</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-c">//code</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">catch</span><span class="pl-kos">(</span><span class="pl-s1">err</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-c">//code</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<p>可执行代码，请戳：<a href="https://github.com/YvetteLau/Blog/blob/master/JS/Async/async.js">https://github.com/YvetteLau/Blog/blob/master/JS/Async/async.js</a></p>
<p>思考一下 async/await 如何处理异步并发问题的？ <a href="https://github.com/YvetteLau/Blog/blob/master/JS/Async/index.js">https://github.com/YvetteLau/Blog/blob/master/JS/Async/index.js</a></p>
<p>如果你有更好的答案或想法，欢迎在这题目对应的github下留言：<a href="https://github.com/YvetteLau/Blog/issues/10" data-hovercard-type="issue" data-hovercard-url="/YvetteLau/Blog/issues/10/hovercard">说一说JS异步发展史</a></p>
<hr>
<h3>2.谈谈对 async/await 的理解，async/await 的实现原理是什么?</h3>
<p>async/await 就是 Generator 的语法糖，使得异步操作变得更加方便。来张图对比一下:</p>
<p><a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/bfc3602899e269cd425732846fb928b62b5aa5cf/68747470733a2f2f6e6f74652e796f7564616f2e636f6d2f7977732f7075626c69632f7265736f757263652f66343537303163633431303530346537316462626362643838363165386430632f786d6c6e6f74652f5745425245534f5552434564316332353132343739373437633530643035616432613930666434333536372f3239343932"><img src="https://camo.githubusercontent.com/bfc3602899e269cd425732846fb928b62b5aa5cf/68747470733a2f2f6e6f74652e796f7564616f2e636f6d2f7977732f7075626c69632f7265736f757263652f66343537303163633431303530346537316462626362643838363165386430632f786d6c6e6f74652f5745425245534f5552434564316332353132343739373437633530643035616432613930666434333536372f3239343932" alt="" data-canonical-src="https://note.youdao.com/yws/public/resource/f45701cc410504e71dbbcbd8861e8d0c/xmlnote/WEBRESOURCEd1c2512479747c50d05ad2a90fd43567/29492" style="max-width:100%;"></a></p>
<p>async 函数就是将 Generator 函数的星号（*）替换成 async，将 yield 替换成await。</p>
<blockquote>
<p>我们说 async 是 Generator 的语法糖，那么这个糖究竟甜在哪呢？</p>
</blockquote>
<p>1）async函数内置执行器，函数调用之后，会自动执行，输出最后结果。而Generator需要调用next或者配合co模块使用。</p>
<p>2）更好的语义，async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。</p>
<p>3）更广的适用性。co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async 函数的 await 命令后面，可以是 Promise 对象和原始类型的值。</p>
<p>4）返回值是Promise，async函数的返回值是 Promise 对象，Generator的返回值是 Iterator，Promise 对象使用起来更加方便。</p>
<blockquote>
<p>async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。</p>
</blockquote>
<p>具体代码试下如下(和spawn的实现略有差异，个人觉得这样写更容易理解)，如果你想知道如何一步步写出 my_co ，可戳: <a href="https://github.com/YvetteLau/Blog/blob/master/JS/Async/my_async.js">https://github.com/YvetteLau/Blog/blob/master/JS/Async/my_async.js</a></p>
<div class="highlight highlight-source-js"><pre><span class="pl-k">function</span> <span class="pl-en">my_co</span><span class="pl-kos">(</span><span class="pl-s1">it</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">return</span> <span class="pl-k">new</span> <span class="pl-v">Promise</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">resolve</span><span class="pl-kos">,</span> <span class="pl-s1">reject</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
        <span class="pl-k">function</span> <span class="pl-en">next</span><span class="pl-kos">(</span><span class="pl-s1">data</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-k">try</span> <span class="pl-kos">{</span>
                <span class="pl-k">var</span> <span class="pl-kos">{</span> value<span class="pl-kos">,</span> done <span class="pl-kos">}</span> <span class="pl-c1">=</span> <span class="pl-s1">it</span><span class="pl-kos">.</span><span class="pl-en">next</span><span class="pl-kos">(</span><span class="pl-s1">data</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
            <span class="pl-kos">}</span><span class="pl-k">catch</span><span class="pl-kos">(</span><span class="pl-s1">e</span><span class="pl-kos">)</span><span class="pl-kos">{</span>
                <span class="pl-k">return</span> <span class="pl-s1">reject</span><span class="pl-kos">(</span><span class="pl-s1">e</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
            <span class="pl-kos">}</span>
            <span class="pl-k">if</span> <span class="pl-kos">(</span>!<span class="pl-s1">done</span><span class="pl-kos">)</span> <span class="pl-kos">{</span> 
                <span class="pl-c">//done为true,表示迭代完成</span>
                <span class="pl-c">//value 不一定是 Promise，可能是一个普通值。使用 Promise.resolve 进行包装。</span>
                <span class="pl-v">Promise</span><span class="pl-kos">.</span><span class="pl-en">resolve</span><span class="pl-kos">(</span><span class="pl-s1">value</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">then</span><span class="pl-kos">(</span><span class="pl-s1">val</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
                    <span class="pl-en">next</span><span class="pl-kos">(</span><span class="pl-s1">val</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
                <span class="pl-kos">}</span><span class="pl-kos">,</span> <span class="pl-s1">reject</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
            <span class="pl-kos">}</span> <span class="pl-k">else</span> <span class="pl-kos">{</span>
                <span class="pl-s1">resolve</span><span class="pl-kos">(</span><span class="pl-s1">value</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
            <span class="pl-kos">}</span>
        <span class="pl-kos">}</span>
        <span class="pl-en">next</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//执行一次next</span>
    <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span>
<span class="pl-k">function</span>* <span class="pl-s1">test</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">yield</span> <span class="pl-k">new</span> <span class="pl-v">Promise</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">resolve</span><span class="pl-kos">,</span> <span class="pl-s1">reject</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
        <span class="pl-en">setTimeout</span><span class="pl-kos">(</span><span class="pl-s1">resolve</span><span class="pl-kos">,</span> <span class="pl-c1">100</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-k">yield</span> <span class="pl-k">new</span> <span class="pl-v">Promise</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">resolve</span><span class="pl-kos">,</span> <span class="pl-s1">reject</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
        <span class="pl-c">// throw Error(1);</span>
        <span class="pl-s1">resolve</span><span class="pl-kos">(</span><span class="pl-c1">10</span><span class="pl-kos">)</span>
    <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-k">yield</span> <span class="pl-c1">10</span><span class="pl-kos">;</span>
    <span class="pl-k">return</span> <span class="pl-c1">1000</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span>

<span class="pl-en">my_co</span><span class="pl-kos">(</span><span class="pl-en">test</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">then</span><span class="pl-kos">(</span><span class="pl-s1">data</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">data</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//输出1000</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">catch</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">err</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s">'err: '</span><span class="pl-kos">,</span> <span class="pl-s1">err</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<p>如果你有更好的答案或想法，欢迎在这题目对应的github下留言：<a href="https://github.com/YvetteLau/Blog/issues/11" data-hovercard-type="issue" data-hovercard-url="/YvetteLau/Blog/issues/11/hovercard">谈谈对 async/await 的理解，async/await 的实现原理是什么?</a></p>
<hr>
<h3>3.使用 async/await 需要注意什么？</h3>
<ol>
<li>await 命令后面的Promise对象，运行结果可能是 rejected，此时等同于 async 函数返回的 Promise 对象被reject。因此需要加上错误处理，可以给每个 await 后的 Promise 增加 catch 方法；也可以将 await 的代码放在 <code>try...catch</code> 中。</li>
<li>多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。</li>
</ol>
<div class="highlight highlight-source-js"><pre><span class="pl-c">//下面两种写法都可以同时触发</span>
<span class="pl-c">//法一</span>
<span class="pl-k">async</span> <span class="pl-k">function</span> <span class="pl-en">f1</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">await</span> <span class="pl-v">Promise</span><span class="pl-kos">.</span><span class="pl-en">all</span><span class="pl-kos">(</span><span class="pl-kos">[</span>
        <span class="pl-k">new</span> <span class="pl-v">Promise</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">resolve</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
            <span class="pl-en">setTimeout</span><span class="pl-kos">(</span><span class="pl-s1">resolve</span><span class="pl-kos">,</span> <span class="pl-c1">600</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">,</span>
        <span class="pl-k">new</span> <span class="pl-v">Promise</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">resolve</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
            <span class="pl-en">setTimeout</span><span class="pl-kos">(</span><span class="pl-s1">resolve</span><span class="pl-kos">,</span> <span class="pl-c1">600</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-kos">}</span><span class="pl-kos">)</span>
    <span class="pl-kos">]</span><span class="pl-kos">)</span>
<span class="pl-kos">}</span>
<span class="pl-c">//法二</span>
<span class="pl-k">async</span> <span class="pl-k">function</span> <span class="pl-en">f2</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">let</span> <span class="pl-s1">fn1</span> <span class="pl-c1">=</span> <span class="pl-k">new</span> <span class="pl-v">Promise</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">resolve</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
            <span class="pl-en">setTimeout</span><span class="pl-kos">(</span><span class="pl-s1">resolve</span><span class="pl-kos">,</span> <span class="pl-c1">800</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    
    <span class="pl-k">let</span> <span class="pl-s1">fn2</span> <span class="pl-c1">=</span> <span class="pl-k">new</span> <span class="pl-v">Promise</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">resolve</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
            <span class="pl-en">setTimeout</span><span class="pl-kos">(</span><span class="pl-s1">resolve</span><span class="pl-kos">,</span> <span class="pl-c1">800</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-kos">}</span><span class="pl-kos">)</span>
    <span class="pl-k">await</span> <span class="pl-s1">fn1</span><span class="pl-kos">;</span>
    <span class="pl-k">await</span> <span class="pl-s1">fn2</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span></pre></div>
<ol start="3">
<li>await命令只能用在async函数之中，如果用在普通函数，会报错。</li>
<li>async 函数可以保留运行堆栈。</li>
</ol>
<div class="highlight highlight-source-js"><pre><span class="pl-c">/**</span>
<span class="pl-c">* 函数a内部运行了一个异步任务b()。当b()运行的时候，函数a()不会中断，而是继续执行。</span>
<span class="pl-c">* 等到b()运行结束，可能a()早就* 运行结束了，b()所在的上下文环境已经消失了。</span>
<span class="pl-c">* 如果b()或c()报错，错误堆栈将不包括a()。</span>
<span class="pl-c">*/</span>
<span class="pl-k">function</span> <span class="pl-en">b</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">return</span> <span class="pl-k">new</span> <span class="pl-v">Promise</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">resolve</span><span class="pl-kos">,</span> <span class="pl-s1">reject</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
        <span class="pl-en">setTimeout</span><span class="pl-kos">(</span><span class="pl-s1">resolve</span><span class="pl-kos">,</span> <span class="pl-c1">200</span><span class="pl-kos">)</span>
    <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span>
<span class="pl-k">function</span> <span class="pl-en">c</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">throw</span> <span class="pl-v">Error</span><span class="pl-kos">(</span><span class="pl-c1">10</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span>
<span class="pl-k">const</span> <span class="pl-en">a</span> <span class="pl-c1">=</span> <span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-en">b</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">then</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-en">c</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span><span class="pl-kos">;</span>
<span class="pl-en">a</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-c">/**</span>
<span class="pl-c">* 改成async函数</span>
<span class="pl-c">*/</span>
<span class="pl-k">const</span> <span class="pl-en">m</span> <span class="pl-c1">=</span> <span class="pl-k">async</span> <span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-k">await</span> <span class="pl-en">b</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-en">c</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span><span class="pl-kos">;</span>
<span class="pl-en">m</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<p>报错信息如下，可以看出 async 函数可以保留运行堆栈。</p>
<p><a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/1e7b66f33a49a42372dc145e48ab72409da1db98/68747470733a2f2f6e6f74652e796f7564616f2e636f6d2f7977732f7075626c69632f7265736f757263652f66343537303163633431303530346537316462626362643838363165386430632f786d6c6e6f74652f5745425245534f5552434566376663356434393334336538346164356434323933613362643766616134342f3239343934"><img src="https://camo.githubusercontent.com/1e7b66f33a49a42372dc145e48ab72409da1db98/68747470733a2f2f6e6f74652e796f7564616f2e636f6d2f7977732f7075626c69632f7265736f757263652f66343537303163633431303530346537316462626362643838363165386430632f786d6c6e6f74652f5745425245534f5552434566376663356434393334336538346164356434323933613362643766616134342f3239343934" alt="" data-canonical-src="https://note.youdao.com/yws/public/resource/f45701cc410504e71dbbcbd8861e8d0c/xmlnote/WEBRESOURCEf7fc5d49343e84ad5d4293a3bd7faa44/29494" style="max-width:100%;"></a></p>
<p>如果你有更好的答案或想法，欢迎在这题目对应的github下留言：<a href="https://github.com/YvetteLau/Blog/issues/12" data-hovercard-type="issue" data-hovercard-url="/YvetteLau/Blog/issues/12/hovercard">使用 async/await 需要注意什么？</a></p>
<hr>
<h3>4.如何实现 Promise.race？</h3>
<p>在代码实现前，我们需要先了解 Promise.race 的特点：</p>
<ol>
<li>
<p>Promise.race返回的仍然是一个Promise.<br>
它的状态与第一个完成的Promise的状态相同。它可以是完成（ resolves），也可以是失败（rejects），这要取决于第一个Promise是哪一种状态。</p>
</li>
<li>
<p>如果传入的参数是不可迭代的，那么将会抛出错误。</p>
</li>
<li>
<p>如果传的参数数组是空，那么返回的 promise 将永远等待。</p>
</li>
<li>
<p>如果迭代包含一个或多个非承诺值和/或已解决/拒绝的承诺，则 Promise.race 将解析为迭代中找到的第一个值。</p>
</li>
</ol>
<div class="highlight highlight-source-js"><pre><span class="pl-v">Promise</span><span class="pl-kos">.</span><span class="pl-en">race</span> <span class="pl-c1">=</span> <span class="pl-k">function</span> <span class="pl-kos">(</span><span class="pl-s1">promises</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-c">//promises 必须是一个可遍历的数据结构，否则抛错</span>
    <span class="pl-k">return</span> <span class="pl-k">new</span> <span class="pl-v">Promise</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">resolve</span><span class="pl-kos">,</span> <span class="pl-s1">reject</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
        <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-k">typeof</span> <span class="pl-s1">promises</span><span class="pl-kos">[</span><span class="pl-v">Symbol</span><span class="pl-kos">.</span><span class="pl-c1">iterator</span><span class="pl-kos">]</span> !== <span class="pl-s">'function'</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-c">//真实不是这个错误</span>
            <span class="pl-v">Promise</span><span class="pl-kos">.</span><span class="pl-en">reject</span><span class="pl-kos">(</span><span class="pl-s">'args is not iteratable!'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-kos">}</span>
        <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-s1">promises</span><span class="pl-kos">.</span><span class="pl-c1">length</span> <span class="pl-c1">===</span> <span class="pl-c1">0</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-k">return</span><span class="pl-kos">;</span>
        <span class="pl-kos">}</span> <span class="pl-k">else</span> <span class="pl-kos">{</span>
            <span class="pl-k">for</span> <span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">i</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span><span class="pl-kos">;</span> <span class="pl-s1">i</span> <span class="pl-c1">&lt;</span> <span class="pl-s1">promises</span><span class="pl-kos">.</span><span class="pl-c1">length</span><span class="pl-kos">;</span> <span class="pl-s1">i</span><span class="pl-c1">++</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
                <span class="pl-v">Promise</span><span class="pl-kos">.</span><span class="pl-en">resolve</span><span class="pl-kos">(</span><span class="pl-s1">promises</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">then</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">data</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
                    <span class="pl-s1">resolve</span><span class="pl-kos">(</span><span class="pl-s1">data</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
                    <span class="pl-k">return</span><span class="pl-kos">;</span>
                <span class="pl-kos">}</span><span class="pl-kos">,</span> <span class="pl-kos">(</span><span class="pl-s1">err</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
                    <span class="pl-s1">reject</span><span class="pl-kos">(</span><span class="pl-s1">err</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
                    <span class="pl-k">return</span><span class="pl-kos">;</span>
                <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
            <span class="pl-kos">}</span>
        <span class="pl-kos">}</span>
    <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span></pre></div>
<p>测试代码:</p>
<div class="highlight highlight-source-js"><pre><span class="pl-c">//一直在等待态</span>
<span class="pl-v">Promise</span><span class="pl-kos">.</span><span class="pl-en">race</span><span class="pl-kos">(</span><span class="pl-kos">[</span><span class="pl-kos">]</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">then</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">data</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s">'success '</span><span class="pl-kos">,</span> <span class="pl-s1">data</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span><span class="pl-kos">,</span> <span class="pl-kos">(</span><span class="pl-s1">err</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s">'err '</span><span class="pl-kos">,</span> <span class="pl-s1">err</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-c">//抛错</span>
<span class="pl-v">Promise</span><span class="pl-kos">.</span><span class="pl-en">race</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">then</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">data</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s">'success '</span><span class="pl-kos">,</span> <span class="pl-s1">data</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span><span class="pl-kos">,</span> <span class="pl-kos">(</span><span class="pl-s1">err</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s">'err '</span><span class="pl-kos">,</span> <span class="pl-s1">err</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-v">Promise</span><span class="pl-kos">.</span><span class="pl-en">race</span><span class="pl-kos">(</span><span class="pl-kos">[</span>
    <span class="pl-k">new</span> <span class="pl-v">Promise</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">resolve</span><span class="pl-kos">,</span> <span class="pl-s1">reject</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span> <span class="pl-en">setTimeout</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span> <span class="pl-s1">resolve</span><span class="pl-kos">(</span><span class="pl-c1">100</span><span class="pl-kos">)</span> <span class="pl-kos">}</span><span class="pl-kos">,</span> <span class="pl-c1">1000</span><span class="pl-kos">)</span> <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">,</span>
    <span class="pl-k">new</span> <span class="pl-v">Promise</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">resolve</span><span class="pl-kos">,</span> <span class="pl-s1">reject</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span> <span class="pl-en">setTimeout</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span> <span class="pl-s1">resolve</span><span class="pl-kos">(</span><span class="pl-c1">200</span><span class="pl-kos">)</span> <span class="pl-kos">}</span><span class="pl-kos">,</span> <span class="pl-c1">200</span><span class="pl-kos">)</span> <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">,</span>
    <span class="pl-k">new</span> <span class="pl-v">Promise</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">resolve</span><span class="pl-kos">,</span> <span class="pl-s1">reject</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span> <span class="pl-en">setTimeout</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span> <span class="pl-s1">reject</span><span class="pl-kos">(</span><span class="pl-c1">100</span><span class="pl-kos">)</span> <span class="pl-kos">}</span><span class="pl-kos">,</span> <span class="pl-c1">100</span><span class="pl-kos">)</span> <span class="pl-kos">}</span><span class="pl-kos">)</span>
<span class="pl-kos">]</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">then</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">data</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">data</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span><span class="pl-kos">,</span> <span class="pl-kos">(</span><span class="pl-s1">err</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">err</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<p><strong>引申:</strong> Promise.all/Promise.reject/Promise.resolve/Promise.prototype.finally/Promise.prototype.catch 的实现原理，如果还不太会，戳:<a href="https://github.com/YvetteLau/Blog/issues/2" data-hovercard-type="issue" data-hovercard-url="/YvetteLau/Blog/issues/2/hovercard">Promise源码实现</a></p>
<p>如果你有更好的答案或想法，欢迎在这题目对应的github下留言：<a href="https://github.com/YvetteLau/Blog/issues/13" data-hovercard-type="issue" data-hovercard-url="/YvetteLau/Blog/issues/13/hovercard">如何实现 Promise.race？</a></p>
<hr>
<h3>5.可遍历数据结构的有什么特点？</h3>
<p>一个对象如果要具备可被 for...of 循环调用的 Iterator 接口，就必须在其 Symbol.iterator 的属性上部署遍历器生成方法(或者原型链上的对象具有该方法)</p>
<p><strong>PS:</strong> 遍历器对象根本特征就是具有next方法。每次调用next方法，都会返回一个代表当前成员的信息对象，具有value和done两个属性。</p>
<div class="highlight highlight-source-js"><pre><span class="pl-c">//如为对象添加Iterator 接口;</span>
<span class="pl-k">let</span> <span class="pl-s1">obj</span> <span class="pl-c1">=</span> <span class="pl-kos">{</span>
    <span class="pl-c1">name</span>: <span class="pl-s">"Yvette"</span><span class="pl-kos">,</span>
    <span class="pl-c1">age</span>: <span class="pl-c1">18</span><span class="pl-kos">,</span>
    <span class="pl-c1">job</span>: <span class="pl-s">'engineer'</span><span class="pl-kos">,</span>
    <span class="pl-kos">[</span><span class="pl-v">Symbol</span><span class="pl-kos">.</span><span class="pl-c1">iterator</span><span class="pl-kos">]</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-k">const</span> <span class="pl-s1">self</span> <span class="pl-c1">=</span> <span class="pl-smi">this</span><span class="pl-kos">;</span>
        <span class="pl-k">const</span> <span class="pl-s1">keys</span> <span class="pl-c1">=</span> <span class="pl-v">Object</span><span class="pl-kos">.</span><span class="pl-en">keys</span><span class="pl-kos">(</span><span class="pl-s1">self</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-k">let</span> <span class="pl-s1">index</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span><span class="pl-kos">;</span>
        <span class="pl-k">return</span> <span class="pl-kos">{</span>
            <span class="pl-en">next</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
                <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-s1">index</span> <span class="pl-c1">&lt;</span> <span class="pl-s1">keys</span><span class="pl-kos">.</span><span class="pl-c1">length</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
                    <span class="pl-k">return</span> <span class="pl-kos">{</span>
                        <span class="pl-c1">value</span>: <span class="pl-s1">self</span><span class="pl-kos">[</span><span class="pl-s1">keys</span><span class="pl-kos">[</span><span class="pl-s1">index</span><span class="pl-c1">++</span><span class="pl-kos">]</span><span class="pl-kos">]</span><span class="pl-kos">,</span>
                        <span class="pl-c1">done</span>: <span class="pl-c1">false</span>
                    <span class="pl-kos">}</span><span class="pl-kos">;</span>
                <span class="pl-kos">}</span> <span class="pl-k">else</span> <span class="pl-kos">{</span>
                    <span class="pl-k">return</span> <span class="pl-kos">{</span> <span class="pl-c1">value</span>: <span class="pl-c1">undefined</span><span class="pl-kos">,</span> <span class="pl-c1">done</span>: <span class="pl-c1">true</span> <span class="pl-kos">}</span><span class="pl-kos">;</span>
                <span class="pl-kos">}</span>
            <span class="pl-kos">}</span>
        <span class="pl-kos">}</span><span class="pl-kos">;</span>
    <span class="pl-kos">}</span>
<span class="pl-kos">}</span><span class="pl-kos">;</span>

<span class="pl-k">for</span><span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">item</span> <span class="pl-k">of</span> <span class="pl-s1">obj</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">item</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//Yvette  18  engineer</span>
<span class="pl-kos">}</span></pre></div>
<p>使用 Generator 函数(遍历器对象生成函数)简写 Symbol.iterator 方法，可以简写如下:</p>
<div class="highlight highlight-source-js"><pre><span class="pl-k">let</span> <span class="pl-s1">obj</span> <span class="pl-c1">=</span> <span class="pl-kos">{</span>
    <span class="pl-c1">name</span>: <span class="pl-s">"Yvette"</span><span class="pl-kos">,</span>
    <span class="pl-c1">age</span>: <span class="pl-c1">18</span><span class="pl-kos">,</span>
    <span class="pl-c1">job</span>: <span class="pl-s">'engineer'</span><span class="pl-kos">,</span>
    * <span class="pl-kos">[</span><span class="pl-v">Symbol</span><span class="pl-kos">.</span><span class="pl-c1">iterator</span><span class="pl-kos">]</span> <span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-k">const</span> <span class="pl-s1">self</span> <span class="pl-c1">=</span> <span class="pl-smi">this</span><span class="pl-kos">;</span>
        <span class="pl-k">const</span> <span class="pl-s1">keys</span> <span class="pl-c1">=</span> <span class="pl-v">Object</span><span class="pl-kos">.</span><span class="pl-en">keys</span><span class="pl-kos">(</span><span class="pl-s1">self</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-k">for</span> <span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">index</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span><span class="pl-kos">;</span><span class="pl-s1">index</span> <span class="pl-c1">&lt;</span> <span class="pl-s1">keys</span><span class="pl-kos">.</span><span class="pl-c1">length</span><span class="pl-kos">;</span> <span class="pl-s1">index</span><span class="pl-c1">++</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-k">yield</span> <span class="pl-s1">self</span><span class="pl-kos">[</span><span class="pl-s1">keys</span><span class="pl-kos">[</span><span class="pl-s1">index</span><span class="pl-kos">]</span><span class="pl-kos">]</span><span class="pl-kos">;</span><span class="pl-c">//yield表达式仅能使用在 Generator 函数中</span>
        <span class="pl-kos">}</span> 
    <span class="pl-kos">}</span>
<span class="pl-kos">}</span><span class="pl-kos">;</span></pre></div>
<blockquote>
<p>原生具备 Iterator 接口的数据结构如下。</p>
</blockquote>
<ul>
<li>Array</li>
<li>Map</li>
<li>Set</li>
<li>String</li>
<li>TypedArray</li>
<li>函数的 arguments 对象</li>
<li>NodeList 对象</li>
<li>ES6 的数组、Set、Map 都部署了以下三个方法: entries() / keys() / values()，调用后都返回遍历器对象。</li>
</ul>
<p>如果你有更好的答案或想法，欢迎在这题目对应的github下留言：<a href="https://github.com/YvetteLau/Blog/issues/14" data-hovercard-type="issue" data-hovercard-url="/YvetteLau/Blog/issues/14/hovercard">可遍历数据结构的有什么特点？</a></p>
<hr>
<h3>6.requestAnimationFrame 和 setTimeout/setInterval 有什么区别？使用 requestAnimationFrame 有哪些好处？</h3>
<p>在 requestAnimationFrame 之前，我们主要使用 setTimeout/setInterval 来编写JS动画。</p>
<p>编写动画的关键是循环间隔的设置，一方面，循环间隔足够短，动画效果才能显得平滑流畅；另一方面，循环间隔还要足够长，才能确保浏览器有能力渲染产生的变化。</p>
<p>大部分的电脑显示器的刷新频率是60HZ，也就是每秒钟重绘60次。大多数浏览器都会对重绘操作加以限制，不超过显示器的重绘频率，因为即使超过那个频率用户体验也不会提升。因此，最平滑动画的最佳循环间隔是 1000ms / 60 ，约为16.7ms。</p>
<p>setTimeout/setInterval 有一个显著的缺陷在于时间是不精确的，setTimeout/setInterval 只能保证延时或间隔不小于设定的时间。因为它们实际上只是把任务添加到了任务队列中，但是如果前面的任务还没有执行完成，它们必须要等待。</p>
<p>requestAnimationFrame 才有的是系统时间间隔，保持最佳绘制效率，不会因为间隔时间过短，造成过度绘制，增加开销；也不会因为间隔时间太长，使用动画卡顿不流畅，让各种网页动画效果能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果。</p>
<p>综上所述，requestAnimationFrame 和 setTimeout/setInterval 在编写动画时相比，优点如下:</p>
<p>1.requestAnimationFrame 不需要设置时间，采用系统时间间隔，能达到最佳的动画效果。</p>
<p>2.requestAnimationFrame 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成。</p>
<p>3.当 requestAnimationFrame() 运行在后台标签页或者隐藏的 <code>&lt;iframe&gt;</code> 里时，requestAnimationFrame() 会被暂停调用以提升性能和电池寿命（大多数浏览器中）。</p>
<p>requestAnimationFrame 使用(试试使用requestAnimationFrame写一个移动的小球，从A移动到B初):</p>
<div class="highlight highlight-source-js"><pre><span class="pl-k">function</span> <span class="pl-en">step</span><span class="pl-kos">(</span><span class="pl-s1">timestamp</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-c">//code...</span>
    <span class="pl-smi">window</span><span class="pl-kos">.</span><span class="pl-en">requestAnimationFrame</span><span class="pl-kos">(</span><span class="pl-s1">step</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span>
<span class="pl-smi">window</span><span class="pl-kos">.</span><span class="pl-en">requestAnimationFrame</span><span class="pl-kos">(</span><span class="pl-s1">step</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<p>如果你有更好的答案或想法，欢迎在这题目对应的github下留言：<a href="https://github.com/YvetteLau/Blog/issues/15" data-hovercard-type="issue" data-hovercard-url="/YvetteLau/Blog/issues/15/hovercard">requestAnimationFrame 和 setTimeout/setInterval 有什么区别？使用 requestAnimationFrame 有哪些好处？</a></p>
<hr>
<h3>7.JS 类型转换的规则是什么？</h3>
<p>类型转换的规则三言两语说不清，真想哇得一声哭出来~<br>
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/a81da42a57352299f279307e21a5a93d11bf26fa/68747470733a2f2f74696d6773612e62616964752e636f6d2f74696d673f696d616765267175616c6974793d38302673697a653d62393939395f3130303030267365633d313535353735373135363134362664693d353431643036376439636363663432383164333332396566636635393538313226696d67747970653d30267372633d68747470253341253246253246696d672e676966686f6d652e636f6d25324667696625324673253246323031383130303125324633396639656330616635633033646364616633313531613934363434353762632e6a7067"><img src="https://camo.githubusercontent.com/a81da42a57352299f279307e21a5a93d11bf26fa/68747470733a2f2f74696d6773612e62616964752e636f6d2f74696d673f696d616765267175616c6974793d38302673697a653d62393939395f3130303030267365633d313535353735373135363134362664693d353431643036376439636363663432383164333332396566636635393538313226696d67747970653d30267372633d68747470253341253246253246696d672e676966686f6d652e636f6d25324667696625324673253246323031383130303125324633396639656330616635633033646364616633313531613934363434353762632e6a7067" alt="" data-canonical-src="https://timgsa.baidu.com/timg?image&amp;quality=80&amp;size=b9999_10000&amp;sec=1555757156146&amp;di=541d067d9cccf4281d3329efcf595812&amp;imgtype=0&amp;src=http%3A%2F%2Fimg.gifhome.com%2Fgif%2Fs%2F20181001%2F39f9ec0af5c03dcdaf3151a9464457bc.jpg" style="max-width:100%;"></a></p>
<p>JS中类型转换分为 强制类型转换 和 隐式类型转换 。</p>
<ul>
<li>
<p>通过 Number()、parseInt()、parseFloat()、toString()、String()、Boolean(),进行强制类型转换。</p>
</li>
<li>
<p>逻辑运算符(&amp;&amp;、 ||、 !)、运算符(+、-、*、/)、关系操作符(&gt;、 &lt;、 &lt;= 、&gt;=)、相等运算符(==)或者 if/while 的条件，可能会进行隐式类型转换。</p>
</li>
</ul>
<p><strong>强制类型转换</strong></p>
<blockquote>
<p>1.Number() 将任意类型的参数转换为数值类型</p>
</blockquote>
<p>规则如下:</p>
<ul>
<li>如果是布尔值，true和false分别被转换为1和0</li>
<li>如果是数字，返回自身</li>
<li>如果是 null，返回 0</li>
<li>如果是 undefined，返回 <code>NAN</code></li>
<li>如果是字符串，遵循以下规则:
<ol>
<li>如果字符串中只包含数字(或者是 <code>0X</code> / <code>0x</code> 开头的十六进制数字字符串，允许包含正负号)，则将其转换为十进制</li>
<li>如果字符串中包含有效的浮点格式，将其转换为浮点数值</li>
<li>如果是空字符串，将其转换为0</li>
<li>如不是以上格式的字符串，均返回 <code>NaN</code></li>
</ol>
</li>
<li>如果是Symbol，抛出错误</li>
<li>如果是对象，则调用对象的 <code>valueOf()</code> 方法，然后依据前面的规则转换返回的值。如果转换的结果是 <code>NaN</code> ，则调用对象的 <code>toString()</code> 方法，再次依照前面的规则转换返回的字符串值。</li>
</ul>
<p>部分内置对象调用默认的 <code>valueOf</code> 的行为:</p>
<table role="table">
<thead>
<tr>
<th>对象</th>
<th>返回值</th>
</tr>
</thead>
<tbody>
<tr>
<td>Array</td>
<td>数组本身（对象类型）</td>
</tr>
<tr>
<td>Boolean</td>
<td>布尔值（原始类型）</td>
</tr>
<tr>
<td>Date</td>
<td>从 UTC 1970 年 1 月 1 日午夜开始计算，到所封装的日期所经过的毫秒数</td>
</tr>
<tr>
<td>Function</td>
<td>函数本身（对象类型）</td>
</tr>
<tr>
<td>Number</td>
<td>数字值（原始类型）</td>
</tr>
<tr>
<td>Object</td>
<td>对象本身（对象类型）</td>
</tr>
<tr>
<td>String</td>
<td>字符串值（原始类型）</td>
</tr>
</tbody>
</table>
<div class="highlight highlight-source-js"><pre><span class="pl-v">Number</span><span class="pl-kos">(</span><span class="pl-s">'0111'</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//111</span>
<span class="pl-v">Number</span><span class="pl-kos">(</span><span class="pl-s">'0X11'</span><span class="pl-kos">)</span> <span class="pl-c">//17</span>
<span class="pl-v">Number</span><span class="pl-kos">(</span><span class="pl-c1">null</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//0</span>
<span class="pl-v">Number</span><span class="pl-kos">(</span><span class="pl-s">''</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//0</span>
<span class="pl-v">Number</span><span class="pl-kos">(</span><span class="pl-s">'1a'</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//NaN</span>
<span class="pl-v">Number</span><span class="pl-kos">(</span><span class="pl-c1">-</span><span class="pl-c1">0X11</span><span class="pl-kos">)</span><span class="pl-kos">;</span><span class="pl-c">//-17</span></pre></div>
<blockquote>
<p>2.parseInt(param, radix)</p>
</blockquote>
<p>如果第一个参数传入的是字符串类型:</p>
<ol>
<li>忽略字符串前面的空格，直至找到第一个非空字符，如果是空字符串，返回NaN</li>
<li>如果第一个字符不是数字符号或者正负号，返回NaN</li>
<li>如果第一个字符是数字/正负号，则继续解析直至字符串解析完毕或者遇到一个非数字符号为止</li>
</ol>
<p>如果第一个参数传入的Number类型:</p>
<ol>
<li>数字如果是0开头，则将其当作八进制来解析(如果是一个八进制数)；如果以0x开头，则将其当作十六进制来解析</li>
</ol>
<p>如果第一个参数是 null 或者是 undefined，或者是一个对象类型：</p>
<ol>
<li>返回 NaN</li>
</ol>
<p>如果第一个参数是数组：<br>
1. 去数组的第一个元素，按照上面的规则进行解析</p>
<p>如果第一个参数是Symbol类型：<br>
1. 抛出错误</p>
<p>如果指定radix参数，以radix为基数进行解析</p>
<div class="highlight highlight-source-js"><pre><span class="pl-en">parseInt</span><span class="pl-kos">(</span><span class="pl-s">'0111'</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//111</span>
<span class="pl-en">parseInt</span><span class="pl-kos">(</span><span class="pl-c1">0111</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//八进制数 73</span>
<span class="pl-en">parseInt</span><span class="pl-kos">(</span><span class="pl-s">''</span><span class="pl-kos">)</span><span class="pl-kos">;</span><span class="pl-c">//NaN</span>
<span class="pl-en">parseInt</span><span class="pl-kos">(</span><span class="pl-s">'0X11'</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//17</span>
<span class="pl-en">parseInt</span><span class="pl-kos">(</span><span class="pl-s">'1a'</span><span class="pl-kos">)</span> <span class="pl-c">//1</span>
<span class="pl-en">parseInt</span><span class="pl-kos">(</span><span class="pl-s">'a1'</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//NaN</span>
<span class="pl-en">parseInt</span><span class="pl-kos">(</span><span class="pl-kos">[</span><span class="pl-s">'10aa'</span><span class="pl-kos">,</span><span class="pl-s">'aaa'</span><span class="pl-kos">]</span><span class="pl-kos">)</span><span class="pl-kos">;</span><span class="pl-c">//10</span>

<span class="pl-en">parseInt</span><span class="pl-kos">(</span><span class="pl-kos">[</span><span class="pl-kos">]</span><span class="pl-kos">)</span><span class="pl-kos">;</span><span class="pl-c">//NaN; parseInt(undefined);</span></pre></div>
<blockquote>
<p>parseFloat</p>
</blockquote>
<p>规则和<code>parseInt</code>基本相同，接受一个Number类型或字符串，如果是字符串中，那么只有第一个小数点是有效的。</p>
<blockquote>
<p>toString()</p>
</blockquote>
<p>规则如下:</p>
<ul>
<li>如果是Number类型，输出数字字符串</li>
<li>如果是 null 或者是 undefined，抛错</li>
<li>如果是数组，那么将数组展开输出。空数组，返回<code>''</code></li>
<li>如果是对象，返回 <code>[object Object]</code></li>
<li>如果是Date, 返回日期的文字表示法</li>
<li>如果是函数，输出对应的字符串(如下demo)</li>
<li>如果是Symbol，输出Symbol字符串</li>
</ul>
<div class="highlight highlight-source-js"><pre><span class="pl-k">let</span> <span class="pl-s1">arry</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-kos">]</span><span class="pl-kos">;</span>
<span class="pl-k">let</span> <span class="pl-s1">obj</span> <span class="pl-c1">=</span> <span class="pl-kos">{</span><span class="pl-c1">a</span>:<span class="pl-c1">1</span><span class="pl-kos">}</span><span class="pl-kos">;</span>
<span class="pl-k">let</span> <span class="pl-s1">sym</span> <span class="pl-c1">=</span> <span class="pl-v">Symbol</span><span class="pl-kos">(</span><span class="pl-c1">100</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-k">let</span> <span class="pl-s1">date</span> <span class="pl-c1">=</span> <span class="pl-k">new</span> <span class="pl-v">Date</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-k">let</span> <span class="pl-en">fn</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span><span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s">'稳住，我们能赢！'</span><span class="pl-kos">)</span><span class="pl-kos">}</span>
<span class="pl-k">let</span> <span class="pl-s1">str</span> <span class="pl-c1">=</span> <span class="pl-s">'hello world'</span><span class="pl-kos">;</span>
<span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-kos">[</span><span class="pl-kos">]</span><span class="pl-kos">.</span><span class="pl-en">toString</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">// ''</span>
<span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-kos">[</span><span class="pl-c1">1</span><span class="pl-kos">,</span> <span class="pl-c1">2</span><span class="pl-kos">,</span> <span class="pl-c1">3</span><span class="pl-kos">,</span> <span class="pl-c1">undefined</span><span class="pl-kos">,</span> <span class="pl-c1">5</span><span class="pl-kos">,</span> <span class="pl-c1">6</span><span class="pl-kos">]</span><span class="pl-kos">.</span><span class="pl-en">toString</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">)</span><span class="pl-kos">;</span><span class="pl-c">//1,2,3,,5,6</span>
<span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">arry</span><span class="pl-kos">.</span><span class="pl-en">toString</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">// 1,2,3</span>
<span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">obj</span><span class="pl-kos">.</span><span class="pl-en">toString</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">// [object Object]</span>
<span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">date</span><span class="pl-kos">.</span><span class="pl-en">toString</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">// Sun Apr 21 2019 16:11:39 GMT+0800 (CST)</span>
<span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-en">fn</span><span class="pl-kos">.</span><span class="pl-en">toString</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">)</span><span class="pl-kos">;</span><span class="pl-c">// function () {console.log('稳住，我们能赢！')}</span>
<span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">str</span><span class="pl-kos">.</span><span class="pl-en">toString</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">)</span><span class="pl-kos">;</span><span class="pl-c">// 'hello world'</span>
<span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">sym</span><span class="pl-kos">.</span><span class="pl-en">toString</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">)</span><span class="pl-kos">;</span><span class="pl-c">// Symbol(100)</span>
<span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-c1">undefined</span><span class="pl-kos">.</span><span class="pl-en">toString</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">)</span><span class="pl-kos">;</span><span class="pl-c">// 抛错</span>
<span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-c1">null</span><span class="pl-kos">.</span><span class="pl-en">toString</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">)</span><span class="pl-kos">;</span><span class="pl-c">// 抛错</span></pre></div>
<blockquote>
<p>String()</p>
</blockquote>
<p><code>String()</code> 的转换规则与 <code>toString()</code> 基本一致，最大的一点不同在于 <code>null</code> 和 <code>undefined</code>，使用 String 进行转换，null 和 undefined对应的是字符串 <code>'null'</code> 和 <code>'undefined'</code></p>
<blockquote>
<p>Boolean</p>
</blockquote>
<p>除了 undefined、 null、 false、 ''、 0(包括 +0，-0)、 NaN 转换出来是false，其它都是true.</p>
<p><strong>隐式类型转换</strong></p>
<blockquote>
<p>&amp;&amp; 、|| 、 ! 、 if/while 的条件判断</p>
</blockquote>
<p>需要将数据转换成 Boolean 类型，转换规则同 Boolean 强制类型转换</p>
<blockquote>
<p>运算符: + - * /</p>
</blockquote>
<p><code>+</code> 号操作符，不仅可以用作数字相加，还可以用作字符串拼接。</p>
<p>仅当 <code>+</code> 号两边都是数字时，进行的是加法运算。如果两边都是字符串，直接拼接，无需进行隐式类型转换。</p>
<p>除了上面的情况外，如果操作数是对象、数值或者布尔值，则调用toString()方法取得字符串值(toString转换规则)。对于 undefined 和 null，分别调用String()显式转换为字符串，然后再进行拼接。</p>
<div class="highlight highlight-source-js"><pre><span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-kos">{</span><span class="pl-kos">}</span><span class="pl-c1">+</span><span class="pl-c1">10</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//[object Object]10</span>
<span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-kos">[</span><span class="pl-c1">1</span><span class="pl-kos">,</span> <span class="pl-c1">2</span><span class="pl-kos">,</span> <span class="pl-c1">3</span><span class="pl-kos">,</span> <span class="pl-c1">undefined</span><span class="pl-kos">,</span> <span class="pl-c1">5</span><span class="pl-kos">,</span> <span class="pl-c1">6</span><span class="pl-kos">]</span> <span class="pl-c1">+</span> <span class="pl-c1">10</span><span class="pl-kos">)</span><span class="pl-kos">;</span><span class="pl-c">//1,2,3,,5,610</span></pre></div>
<p><code>-</code>、<code>*</code>、<code>/</code> 操作符针对的是运算，如果操作值之一不是数值，则被隐式调用Number()函数进行转换。如果其中有一个转换除了为NaN，结果为NaN.</p>
<blockquote>
<p>关系操作符: ==、&gt;、&lt; 、&lt;=、&gt;=</p>
</blockquote>
<p><code>&gt;</code> , <code>&lt;</code> ，<code>&lt;=</code> ，<code>&gt;=</code></p>
<ol>
<li>如果两个操作值都是数值，则进行数值比较</li>
<li>如果两个操作值都是字符串，则比较字符串对应的字符编码值</li>
<li>如果有一方是Symbol类型，抛出错误</li>
<li>除了上述情况之外，都进行Number()进行类型转换，然后再进行比较。</li>
</ol>
<p><strong>注：</strong> NaN是非常特殊的值，它不和任何类型的值相等，包括它自己，同时它与任何类型的值比较大小时都返回false。</p>
<div class="highlight highlight-source-js"><pre><span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-c1">10</span> <span class="pl-c1">&gt;</span> <span class="pl-kos">{</span><span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span><span class="pl-c">//返回false.</span>
<span class="pl-c">/**</span>
<span class="pl-c"> *{}.valueOf ---&gt; {}</span>
<span class="pl-c"> *{}.toString() ---&gt; '[object Object]' ---&gt; NaN</span>
<span class="pl-c"> *NaN 和 任何类型比大小，都返回 false</span>
<span class="pl-c"> */</span></pre></div>
<blockquote>
<p>相等操作符：<code>==</code></p>
</blockquote>
<ol>
<li>如果类型相同，无需进行类型转换。</li>
<li>如果其中一个操作值是 null 或者是 undefined，那么另一个操作符必须为 null 或者 undefined 时，才返回 true，否则都返回 false.</li>
<li>如果其中一个是 Symbol 类型，那么返回 false.</li>
<li>两个操作值是否为 string 和 number，就会将字符串转换为 number</li>
<li>如果一个操作值是 boolean，那么转换成 number</li>
<li>如果一个操作值为 object 且另一方为 string、number 或者 symbol，是的话就会把 object 转为原始类型再进行判断(调用object的valueOf/toString方法进行转换)</li>
</ol>
<blockquote>
<p>对象如何转换成原始数据类型</p>
</blockquote>
<p>如果部署了 [Symbol.toPrimitive] 接口，那么调用此接口，若返回的不是基础数据类型，跑出错误。</p>
<p>如果没有部署 [Symbol.toPrimitive] 接口，那么先返回 valueOf() 的值，若返回的不是基础类型的值，再返回 toString() 的值，若返回的不是基础类型的值， 则抛出异常。</p>
<div class="highlight highlight-source-js"><pre><span class="pl-c">//先调用 valueOf, 后调用 toString</span>
<span class="pl-k">let</span> <span class="pl-s1">obj</span> <span class="pl-c1">=</span> <span class="pl-kos">{</span>
    <span class="pl-kos">[</span><span class="pl-v">Symbol</span><span class="pl-kos">.</span><span class="pl-c1">toPrimitive</span><span class="pl-kos">]</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-k">return</span> <span class="pl-c1">200</span><span class="pl-kos">;</span>
    <span class="pl-kos">}</span><span class="pl-kos">,</span>
    <span class="pl-en">valueOf</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-k">return</span> <span class="pl-c1">300</span><span class="pl-kos">;</span>
    <span class="pl-kos">}</span><span class="pl-kos">,</span>
    <span class="pl-en">toString</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-k">return</span> <span class="pl-s">'Hello'</span><span class="pl-kos">;</span>
    <span class="pl-kos">}</span>
<span class="pl-kos">}</span>
<span class="pl-c">//如果 valueOf 返回的不是基本数据类型，则会调用 toString， </span>
<span class="pl-c">//如果 toString 返回的也不是基本数据类型，会抛出错误</span>
<span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">obj</span> <span class="pl-c1">+</span> <span class="pl-c1">200</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//400</span></pre></div>
<p><a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/738bdd3de5c5e57c92f8b4671784ce8a568325f9/68747470733a2f2f74696d6773612e62616964752e636f6d2f74696d673f696d616765267175616c6974793d38302673697a653d62393939395f3130303030267365633d313535353834393332383738302664693d646464316631363166303135393766316538366166363838376630383561346126696d67747970653d30267372633d687474702533412532462532466d6d62697a2e717069632e636e2532466d6d62697a5f6a7067253246706c4149696139376d7439625147784d57344e64696376345a744239786a69623967795768705a64476961307a664c574b384e78734630456c5a4b507a475569625a796b43696136306773724d5064385078534e477576553972527725324636343025334677785f666d742533446a706567"><img src="https://camo.githubusercontent.com/738bdd3de5c5e57c92f8b4671784ce8a568325f9/68747470733a2f2f74696d6773612e62616964752e636f6d2f74696d673f696d616765267175616c6974793d38302673697a653d62393939395f3130303030267365633d313535353834393332383738302664693d646464316631363166303135393766316538366166363838376630383561346126696d67747970653d30267372633d687474702533412532462532466d6d62697a2e717069632e636e2532466d6d62697a5f6a7067253246706c4149696139376d7439625147784d57344e64696376345a744239786a69623967795768705a64476961307a664c574b384e78734630456c5a4b507a475569625a796b43696136306773724d5064385078534e477576553972527725324636343025334677785f666d742533446a706567" alt="" data-canonical-src="https://timgsa.baidu.com/timg?image&amp;quality=80&amp;size=b9999_10000&amp;sec=1555849328780&amp;di=ddd1f161f01597f1e86af6887f085a4a&amp;imgtype=0&amp;src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_jpg%2FplAIia97mt9bQGxMW4Ndicv4ZtB9xjib9gyWhpZdGia0zfLWK8NxsF0ElZKPzGUibZykCia60gsrMPd8PxSNGuvU9rRw%2F640%3Fwx_fmt%3Djpeg" style="max-width:100%;"></a></p>
<p>如果你有更好的答案或想法，欢迎在这题目对应的github下留言：<a href="https://github.com/YvetteLau/Blog/issues/16" data-hovercard-type="issue" data-hovercard-url="/YvetteLau/Blog/issues/16/hovercard">JS 类型转换的规则是什么？</a></p>
<hr>
<h3>8.简述下对 webWorker 的理解？</h3>
<p>HTML5则提出了 Web Worker 标准，表示js允许多线程，但是子线程完全受主线程控制并且不能操作dom，只有主线程可以操作dom，所以js本质上依然是单线程语言。</p>
<p>web worker就是在js单线程执行的基础上开启一个子线程，进行程序处理，而不影响主线程的执行，当子线程执行完之后再回到主线程上，在这个过程中不影响主线程的执行。子线程与主线程之间提供了数据交互的接口postMessage和onmessage，来进行数据发送和接收。</p>
<div class="highlight highlight-source-js"><pre><span class="pl-k">var</span> <span class="pl-s1">worker</span> <span class="pl-c1">=</span> <span class="pl-k">new</span> <span class="pl-v">Worker</span><span class="pl-kos">(</span><span class="pl-s">'./worker.js'</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//创建一个子线程</span>
<span class="pl-s1">worker</span><span class="pl-kos">.</span><span class="pl-en">postMessage</span><span class="pl-kos">(</span><span class="pl-s">'Hello'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-s1">worker</span><span class="pl-kos">.</span><span class="pl-en">onmessage</span> <span class="pl-c1">=</span> <span class="pl-k">function</span> <span class="pl-kos">(</span><span class="pl-s1">e</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">e</span><span class="pl-kos">.</span><span class="pl-c1">data</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//Hi</span>
    <span class="pl-s1">worker</span><span class="pl-kos">.</span><span class="pl-en">terminate</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//结束线程</span>
<span class="pl-kos">}</span><span class="pl-kos">;</span></pre></div>
<div class="highlight highlight-source-js"><pre><span class="pl-c">//worker.js</span>
<span class="pl-en">onmessage</span> <span class="pl-c1">=</span> <span class="pl-k">function</span> <span class="pl-kos">(</span><span class="pl-s1">e</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">e</span><span class="pl-kos">.</span><span class="pl-c1">data</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//Hello</span>
    <span class="pl-en">postMessage</span><span class="pl-kos">(</span><span class="pl-s">"Hi"</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//向主进程发送消息</span>
<span class="pl-kos">}</span><span class="pl-kos">;</span></pre></div>
<p>仅是最简示例代码，项目中通常是将一些耗时较长的代码，放在子线程中运行。</p>
<p>如果你有更好的答案或想法，欢迎在这题目对应的github下留言：<a href="https://github.com/YvetteLau/Blog/issues/17" data-hovercard-type="issue" data-hovercard-url="/YvetteLau/Blog/issues/17/hovercard">简述下对 webWorker 的理解</a></p>
<hr>
<h3>9.ES6模块和CommonJS模块的差异？</h3>
<ol>
<li>
<p>ES6模块在编译时，就能确定模块的依赖关系，以及输入和输出的变量。</p>
<p>CommonJS 模块，运行时加载。</p>
</li>
<li>
<p>ES6 模块自动采用严格模式，无论模块头部是否写了 <code>"use strict";</code> (严格模式有哪些限制？[//链接])</p>
</li>
<li>
<p>require 可以做动态加载，import 语句做不到，import 语句必须位于顶层作用域中。</p>
</li>
<li>
<p>ES6 模块中顶层的 this 指向 undefined，ommonJS 模块的顶层 this 指向当前模块。</p>
</li>
<li>
<p>CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。</p>
</li>
</ol>
<p>CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。如：</p>
<div class="highlight highlight-source-js"><pre><span class="pl-c">//name.js</span>
<span class="pl-k">var</span> <span class="pl-s1">name</span> <span class="pl-c1">=</span> <span class="pl-s">'William'</span><span class="pl-kos">;</span>
<span class="pl-en">setTimeout</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-s1">name</span> <span class="pl-c1">=</span> <span class="pl-s">'Yvette'</span><span class="pl-kos">,</span> <span class="pl-c1">200</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-smi">module</span><span class="pl-kos">.</span><span class="pl-c1">exports</span> <span class="pl-c1">=</span> <span class="pl-kos">{</span>
    name
<span class="pl-kos">}</span><span class="pl-kos">;</span>
<span class="pl-c">//index.js</span>
<span class="pl-k">const</span> <span class="pl-s1">name</span> <span class="pl-c1">=</span> <span class="pl-en">require</span><span class="pl-kos">(</span><span class="pl-s">'./name'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">name</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//William</span>
<span class="pl-en">setTimeout</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">name</span><span class="pl-kos">)</span><span class="pl-kos">,</span> <span class="pl-c1">300</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//William</span></pre></div>
<p>对比 ES6 模块看一下:</p>
<p>ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令 import ，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。</p>
<div class="highlight highlight-source-js"><pre><span class="pl-c">//name.js</span>
<span class="pl-k">var</span> <span class="pl-s1">name</span> <span class="pl-c1">=</span> <span class="pl-s">'William'</span><span class="pl-kos">;</span>
<span class="pl-en">setTimeout</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-s1">name</span> <span class="pl-c1">=</span> <span class="pl-s">'Yvette'</span><span class="pl-kos">,</span> <span class="pl-c1">200</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-k">export</span> <span class="pl-kos">{</span> <span class="pl-s1">name</span> <span class="pl-kos">}</span><span class="pl-kos">;</span>
<span class="pl-c">//index.js</span>
<span class="pl-k">import</span> <span class="pl-kos">{</span> <span class="pl-s1">name</span> <span class="pl-kos">}</span> <span class="pl-k">from</span> <span class="pl-s">'./name'</span><span class="pl-kos">;</span>
<span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">name</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//William</span>
<span class="pl-en">setTimeout</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">name</span><span class="pl-kos">)</span><span class="pl-kos">,</span> <span class="pl-c1">300</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//Yvette</span></pre></div>
<p>如果你有更好的答案或想法，欢迎在这题目对应的github下留言：<a href="https://github.com/YvetteLau/Blog/issues/18" data-hovercard-type="issue" data-hovercard-url="/YvetteLau/Blog/issues/18/hovercard">ES6模块和CommonJS模块的差异？</a></p>
<hr>
<h3>10.浏览器事件代理机制的原理是什么？</h3>
<p>在说浏览器事件代理机制原理之前，我们首先了解一下事件流的概念，早期浏览器，IE采用的是事件捕获事件流，而Netscape采用的则是事件捕获。"DOM2级事件"把事件流分为三个阶段，捕获阶段、目标阶段、冒泡阶段。现代浏览器也都遵循此规范。</p>
<p><a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/a2473ce916b426657cf69829e09e1b1fcd75620b/68747470733a2f2f6e6f74652e796f7564616f2e636f6d2f7977732f7075626c69632f7265736f757263652f66343537303163633431303530346537316462626362643838363165386430632f786d6c6e6f74652f5745425245534f5552434539303731353332353935313534383966356338386539663038373438363533312f3239343838"><img src="https://camo.githubusercontent.com/a2473ce916b426657cf69829e09e1b1fcd75620b/68747470733a2f2f6e6f74652e796f7564616f2e636f6d2f7977732f7075626c69632f7265736f757263652f66343537303163633431303530346537316462626362643838363165386430632f786d6c6e6f74652f5745425245534f5552434539303731353332353935313534383966356338386539663038373438363533312f3239343838" alt="" data-canonical-src="https://note.youdao.com/yws/public/resource/f45701cc410504e71dbbcbd8861e8d0c/xmlnote/WEBRESOURCE907153259515489f5c88e9f087486531/29488" style="max-width:100%;"></a></p>
<blockquote>
<p>那么事件代理是什么呢？</p>
</blockquote>
<p>事件代理又称为事件委托，在祖先级DOM元素绑定一个事件，当触发子孙级DOM元素的事件时，利用事件冒泡的原理来触发绑定在祖先级DOM的事件。因为事件会从目标元素一层层冒泡至document对象。</p>
<blockquote>
<p>为什么要事件代理？</p>
</blockquote>
<ol>
<li>
<p>添加到页面上的事件数量会影响页面的运行性能，如果添加的事件过多，会导致网页的性能下降。采用事件代理的方式，可以大大减少注册事件的个数。</p>
</li>
<li>
<p>事件代理的当时，某个子孙元素是动态增加的，不需要再次对其进行事件绑定。</p>
</li>
<li>
<p>不用担心某个注册了事件的DOM元素被移除后，可能无法回收其事件处理程序，我们只要把事件处理程序委托给更高层级的元素，就可以避免此问题。</p>
</li>
</ol>
<blockquote>
<p>如将页面中的所有click事件都代理到document上:</p>
</blockquote>
<p>addEventListener 接受3个参数，分别是要处理的事件名、处理事件程序的函数和一个布尔值。布尔值默认为false。表示冒泡阶段调用事件处理程序，若设置为true，表示在捕获阶段调用事件处理程序。</p>
<div class="highlight highlight-source-js"><pre><span class="pl-smi">document</span><span class="pl-kos">.</span><span class="pl-en">addEventListener</span><span class="pl-kos">(</span><span class="pl-s">'click'</span><span class="pl-kos">,</span> <span class="pl-k">function</span> <span class="pl-kos">(</span><span class="pl-s1">e</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">e</span><span class="pl-kos">.</span><span class="pl-c1">target</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-c">/**</span>
<span class="pl-c">    * 捕获阶段调用调用事件处理程序，eventPhase是 1; </span>
<span class="pl-c">    * 处于目标，eventPhase是2 </span>
<span class="pl-c">    * 冒泡阶段调用事件处理程序，eventPhase是 1；</span>
<span class="pl-c">    */</span> 
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">e</span><span class="pl-kos">.</span><span class="pl-c1">eventPhase</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<p>如果你有更好的答案或想法，欢迎在这题目对应的github下留言：<a href="https://github.com/YvetteLau/Blog/issues/19" data-hovercard-type="issue" data-hovercard-url="/YvetteLau/Blog/issues/19/hovercard">浏览器事件代理机制的原理是什么？</a></p>
<hr>
<h3>11.js如何自定义事件？</h3>
<blockquote>
<p>自定义 DOM 事件(不考虑IE9之前版本)</p>
</blockquote>
<p>自定义事件有三种方法,一种是使用 <code>new Event()</code>, 另一种是 <code>createEvent('CustomEvent')</code> , 另一种是 <code>new customEvent()</code></p>
<ol>
<li>使用 <code>new Event()</code></li>
</ol>
<p>获取不到 <code>event.detail</code></p>
<div class="highlight highlight-source-js"><pre><span class="pl-k">let</span> <span class="pl-s1">btn</span> <span class="pl-c1">=</span> <span class="pl-smi">document</span><span class="pl-kos">.</span><span class="pl-en">querySelector</span><span class="pl-kos">(</span><span class="pl-s">'#btn'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-k">let</span> <span class="pl-s1">ev</span> <span class="pl-c1">=</span> <span class="pl-k">new</span> <span class="pl-v">Event</span><span class="pl-kos">(</span><span class="pl-s">'alert'</span><span class="pl-kos">,</span> <span class="pl-kos">{</span>
    <span class="pl-c1">bubbles</span>: <span class="pl-c1">true</span><span class="pl-kos">,</span>    <span class="pl-c">//事件是否冒泡;默认值false</span>
    <span class="pl-c1">cancelable</span>: <span class="pl-c1">true</span><span class="pl-kos">,</span> <span class="pl-c">//事件能否被取消;默认值false</span>
    <span class="pl-c1">composed</span>: <span class="pl-c1">false</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-s1">btn</span><span class="pl-kos">.</span><span class="pl-en">addEventListener</span><span class="pl-kos">(</span><span class="pl-s">'alert'</span><span class="pl-kos">,</span> <span class="pl-k">function</span> <span class="pl-kos">(</span><span class="pl-s1">event</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">event</span><span class="pl-kos">.</span><span class="pl-c1">bubbles</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//true</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">event</span><span class="pl-kos">.</span><span class="pl-c1">cancelable</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//true</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">event</span><span class="pl-kos">.</span><span class="pl-c1">detail</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//undefined</span>
<span class="pl-kos">}</span><span class="pl-kos">,</span> <span class="pl-c1">false</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-s1">btn</span><span class="pl-kos">.</span><span class="pl-en">dispatchEvent</span><span class="pl-kos">(</span><span class="pl-s1">ev</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<ol>
<li>使用 <code>createEvent('CustomEvent')</code> (DOM3)</li>
</ol>
<p>要创建自定义事件，可以调用 <code>createEvent('CustomEvent')</code>，返回的对象有 initCustomEvent 方法，接受以下四个参数:</p>
<ul>
<li>type: 字符串，表示触发的事件类型，如此处的'alert'</li>
<li>bubbles: 布尔值： 表示事件是否冒泡</li>
<li>cancelable: 布尔值，表示事件是否可以取消</li>
<li>detail: 任意值，保存在 event 对象的 detail 属性中</li>
</ul>
<div class="highlight highlight-source-js"><pre><span class="pl-k">let</span> <span class="pl-s1">btn</span> <span class="pl-c1">=</span> <span class="pl-smi">document</span><span class="pl-kos">.</span><span class="pl-en">querySelector</span><span class="pl-kos">(</span><span class="pl-s">'#btn'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-k">let</span> <span class="pl-s1">ev</span> <span class="pl-c1">=</span> <span class="pl-s1">btn</span><span class="pl-kos">.</span><span class="pl-en">createEvent</span><span class="pl-kos">(</span><span class="pl-s">'CustomEvent'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-s1">ev</span><span class="pl-kos">.</span><span class="pl-en">initCustomEvent</span><span class="pl-kos">(</span><span class="pl-s">'alert'</span><span class="pl-kos">,</span> <span class="pl-c1">true</span><span class="pl-kos">,</span> <span class="pl-c1">true</span><span class="pl-kos">,</span> <span class="pl-s">'button'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-s1">btn</span><span class="pl-kos">.</span><span class="pl-en">addEventListener</span><span class="pl-kos">(</span><span class="pl-s">'alert'</span><span class="pl-kos">,</span> <span class="pl-k">function</span> <span class="pl-kos">(</span><span class="pl-s1">event</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">event</span><span class="pl-kos">.</span><span class="pl-c1">bubbles</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//true</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">event</span><span class="pl-kos">.</span><span class="pl-c1">cancelable</span><span class="pl-kos">)</span><span class="pl-kos">;</span><span class="pl-c">//true</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">event</span><span class="pl-kos">.</span><span class="pl-c1">detail</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//button</span>
<span class="pl-kos">}</span><span class="pl-kos">,</span> <span class="pl-c1">false</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-s1">btn</span><span class="pl-kos">.</span><span class="pl-en">dispatchEvent</span><span class="pl-kos">(</span><span class="pl-s1">ev</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<ol start="3">
<li>使用 <code>new customEvent()</code> (DOM4)</li>
</ol>
<p>使用起来比 <code>createEvent('CustomEvent')</code>  更加方便</p>
<div class="highlight highlight-source-js"><pre><span class="pl-k">var</span> <span class="pl-s1">btn</span> <span class="pl-c1">=</span> <span class="pl-smi">document</span><span class="pl-kos">.</span><span class="pl-en">querySelector</span><span class="pl-kos">(</span><span class="pl-s">'#btn'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-c">/*</span>
<span class="pl-c"> * 第一个参数是事件类型</span>
<span class="pl-c"> * 第二个参数是一个对象</span>
<span class="pl-c"> */</span>
<span class="pl-k">var</span> <span class="pl-s1">ev</span> <span class="pl-c1">=</span> <span class="pl-k">new</span> <span class="pl-v">CustomEvent</span><span class="pl-kos">(</span><span class="pl-s">'alert'</span><span class="pl-kos">,</span> <span class="pl-kos">{</span>
    <span class="pl-c1">bubbles</span>: <span class="pl-s">'true'</span><span class="pl-kos">,</span>
    <span class="pl-c1">cancelable</span>: <span class="pl-s">'true'</span><span class="pl-kos">,</span>
    <span class="pl-c1">detail</span>: <span class="pl-s">'button'</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-s1">btn</span><span class="pl-kos">.</span><span class="pl-en">addEventListener</span><span class="pl-kos">(</span><span class="pl-s">'alert'</span><span class="pl-kos">,</span> <span class="pl-k">function</span> <span class="pl-kos">(</span><span class="pl-s1">event</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">event</span><span class="pl-kos">.</span><span class="pl-c1">bubbles</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//true</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">event</span><span class="pl-kos">.</span><span class="pl-c1">cancelable</span><span class="pl-kos">)</span><span class="pl-kos">;</span><span class="pl-c">//true</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">event</span><span class="pl-kos">.</span><span class="pl-c1">detail</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//button</span>
<span class="pl-kos">}</span><span class="pl-kos">,</span> <span class="pl-c1">false</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-s1">btn</span><span class="pl-kos">.</span><span class="pl-en">dispatchEvent</span><span class="pl-kos">(</span><span class="pl-s1">ev</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<blockquote>
<p>自定义非 DOM 事件(观察者模式)</p>
</blockquote>
<p>EventTarget类型有一个单独的属性handlers，用于存储事件处理程序（观察者）。</p>
<p>addHandler() 用于注册给定类型事件的事件处理程序；</p>
<p>fire() 用于触发一个事件；</p>
<p>removeHandler() 用于注销某个事件类型的事件处理程序。</p>
<div class="highlight highlight-source-js"><pre><span class="pl-k">function</span> <span class="pl-v">EventTarget</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">{</span>
    <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-c1">handlers</span> <span class="pl-c1">=</span> <span class="pl-kos">{</span><span class="pl-kos">}</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span>

<span class="pl-v">EventTarget</span><span class="pl-kos">.</span><span class="pl-c1">prototype</span> <span class="pl-c1">=</span> <span class="pl-kos">{</span>
    <span class="pl-c1">constructor</span>:<span class="pl-v">EventTarget</span><span class="pl-kos">,</span>
    <span class="pl-en">addHandler</span>:<span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">type</span><span class="pl-kos">,</span><span class="pl-s1">handler</span><span class="pl-kos">)</span><span class="pl-kos">{</span>
        <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-k">typeof</span> <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-c1">handlers</span><span class="pl-kos">[</span><span class="pl-s1">type</span><span class="pl-kos">]</span> <span class="pl-c1">===</span> <span class="pl-s">"undefined"</span><span class="pl-kos">)</span><span class="pl-kos">{</span>
            <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-c1">handlers</span><span class="pl-kos">[</span><span class="pl-s1">type</span><span class="pl-kos">]</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-kos">]</span><span class="pl-kos">;</span>
        <span class="pl-kos">}</span>
        <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-c1">handlers</span><span class="pl-kos">[</span><span class="pl-s1">type</span><span class="pl-kos">]</span><span class="pl-kos">.</span><span class="pl-en">push</span><span class="pl-kos">(</span><span class="pl-s1">handler</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-kos">}</span><span class="pl-kos">,</span>
    <span class="pl-en">fire</span>:<span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">event</span><span class="pl-kos">)</span><span class="pl-kos">{</span>
        <span class="pl-k">if</span><span class="pl-kos">(</span>!<span class="pl-s1">event</span><span class="pl-kos">.</span><span class="pl-c1">target</span><span class="pl-kos">)</span><span class="pl-kos">{</span>
            <span class="pl-s1">event</span><span class="pl-kos">.</span><span class="pl-c1">target</span> <span class="pl-c1">=</span> <span class="pl-smi">this</span><span class="pl-kos">;</span>
        <span class="pl-kos">}</span>
        <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-c1">handlers</span><span class="pl-kos">[</span><span class="pl-s1">event</span><span class="pl-kos">.</span><span class="pl-c1">type</span><span class="pl-kos">]</span> <span class="pl-k">instanceof</span> <span class="pl-v">Array</span><span class="pl-kos">)</span><span class="pl-kos">{</span>
            <span class="pl-k">const</span> <span class="pl-s1">handlers</span> <span class="pl-c1">=</span> <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-c1">handlers</span><span class="pl-kos">[</span><span class="pl-s1">event</span><span class="pl-kos">.</span><span class="pl-c1">type</span><span class="pl-kos">]</span><span class="pl-kos">;</span>
            <span class="pl-s1">handlers</span><span class="pl-kos">.</span><span class="pl-en">forEach</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">handler</span><span class="pl-kos">)</span><span class="pl-c1">=&gt;</span><span class="pl-kos">{</span>
                <span class="pl-s1">handler</span><span class="pl-kos">(</span><span class="pl-s1">event</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
            <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-kos">}</span>
    <span class="pl-kos">}</span><span class="pl-kos">,</span>
    <span class="pl-en">removeHandler</span>:<span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">type</span><span class="pl-kos">,</span><span class="pl-s1">handler</span><span class="pl-kos">)</span><span class="pl-kos">{</span>
        <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-c1">handlers</span><span class="pl-kos">[</span><span class="pl-s1">type</span><span class="pl-kos">]</span> <span class="pl-k">instanceof</span> <span class="pl-v">Array</span><span class="pl-kos">)</span><span class="pl-kos">{</span>
            <span class="pl-k">const</span> <span class="pl-s1">handlers</span> <span class="pl-c1">=</span> <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-c1">handlers</span><span class="pl-kos">[</span><span class="pl-s1">type</span><span class="pl-kos">]</span><span class="pl-kos">;</span>
            <span class="pl-k">for</span><span class="pl-kos">(</span><span class="pl-k">var</span> <span class="pl-s1">i</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span><span class="pl-kos">,</span><span class="pl-s1">len</span> <span class="pl-c1">=</span> <span class="pl-s1">handlers</span><span class="pl-kos">.</span><span class="pl-c1">length</span><span class="pl-kos">;</span> <span class="pl-s1">i</span> <span class="pl-c1">&lt;</span> <span class="pl-s1">len</span><span class="pl-kos">;</span> <span class="pl-s1">i</span><span class="pl-c1">++</span><span class="pl-kos">)</span><span class="pl-kos">{</span>
                <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">handlers</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span> <span class="pl-c1">===</span> <span class="pl-s1">handler</span><span class="pl-kos">)</span><span class="pl-kos">{</span>
                    <span class="pl-k">break</span><span class="pl-kos">;</span>
                <span class="pl-kos">}</span>
            <span class="pl-kos">}</span>
            <span class="pl-s1">handlers</span><span class="pl-kos">.</span><span class="pl-en">splice</span><span class="pl-kos">(</span><span class="pl-s1">i</span><span class="pl-kos">,</span><span class="pl-c1">1</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-kos">}</span>
    <span class="pl-kos">}</span>
<span class="pl-kos">}</span>
<span class="pl-c">//使用</span>
<span class="pl-k">function</span> <span class="pl-en">handleMessage</span><span class="pl-kos">(</span><span class="pl-s1">event</span><span class="pl-kos">)</span><span class="pl-kos">{</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">event</span><span class="pl-kos">.</span><span class="pl-c1">message</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span>
<span class="pl-c">//创建一个新对象</span>
<span class="pl-k">var</span> <span class="pl-s1">target</span> <span class="pl-c1">=</span> <span class="pl-k">new</span> <span class="pl-v">EventTarget</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-c">//添加一个事件处理程序</span>
<span class="pl-s1">target</span><span class="pl-kos">.</span><span class="pl-en">addHandler</span><span class="pl-kos">(</span><span class="pl-s">"message"</span><span class="pl-kos">,</span> <span class="pl-s1">handleMessage</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-c">//触发事件</span>
<span class="pl-s1">target</span><span class="pl-kos">.</span><span class="pl-en">fire</span><span class="pl-kos">(</span><span class="pl-kos">{</span><span class="pl-c1">type</span>:<span class="pl-s">"message"</span><span class="pl-kos">,</span> <span class="pl-c1">message</span>:<span class="pl-s">"Hi"</span><span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//Hi</span>
<span class="pl-c">//删除事件处理程序</span>
<span class="pl-s1">target</span><span class="pl-kos">.</span><span class="pl-en">removeHandler</span><span class="pl-kos">(</span><span class="pl-s">"message"</span><span class="pl-kos">,</span><span class="pl-s1">handleMessage</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-c">//再次触发事件，没有事件处理程序</span>
<span class="pl-s1">target</span><span class="pl-kos">.</span><span class="pl-en">fire</span><span class="pl-kos">(</span><span class="pl-kos">{</span><span class="pl-c1">type</span>:<span class="pl-s">"message"</span><span class="pl-kos">,</span><span class="pl-c1">message</span>: <span class="pl-s">"Hi"</span><span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<p>如果你有更好的答案或想法，欢迎在这题目对应的github下留言：<a href="https://github.com/YvetteLau/Blog/issues/20" data-hovercard-type="issue" data-hovercard-url="/YvetteLau/Blog/issues/20/hovercard">js如何自定义事件？</a></p>
<hr>
<h3>12.跨域的方法有哪些？原理是什么？</h3>
<p>知其然知其所以然，在说跨域方法之前，我们先了解下什么叫跨域，浏览器有同源策略，只有当“协议”、“域名”、“端口号”都相同时，才能称之为是同源，其中有一个不同，即是跨域。</p>
<p>那么同源策略的作用是什么呢？同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。</p>
<p>那么我们又为什么需要跨域呢？一是前端和服务器分开部署，接口请求需要跨域，二是我们可能会加载其它网站的页面作为iframe内嵌。</p>
<blockquote>
<p><strong>跨域的方法有哪些？</strong></p>
</blockquote>
<blockquote>
<p>常用的跨域方法</p>
</blockquote>
<ol>
<li>jsonp</li>
</ol>
<p>尽管浏览器有同源策略，但是 <code>&lt;script&gt;</code> 标签的 src 属性不会被同源策略所约束，可以获取任意服务器上的脚本并执行。jsonp 通过插入script标签的方式来实现跨域，参数只能通过url传入，仅能支持get请求。</p>
<p>实现原理:</p>
<p>Step1: 创建 callback 方法</p>
<p>Step2: 插入 script 标签</p>
<p>Step3: 后台接受到请求，解析前端传过去的 callback 方法，返回该方法的调用，并且数据作为参数传入该方法</p>
<p>Step4: 前端执行服务端返回的方法调用</p>
<p>下面代码仅为说明 jsonp 原理，项目中请使用成熟的库。分别看一下前端和服务端的简单实现：</p>
<div class="highlight highlight-source-js"><pre><span class="pl-c">//前端代码</span>
<span class="pl-k">function</span> <span class="pl-en">jsonp</span><span class="pl-kos">(</span><span class="pl-kos">{</span><span class="pl-s1">url</span><span class="pl-kos">,</span> <span class="pl-s1">params</span><span class="pl-kos">,</span> <span class="pl-s1">cb</span><span class="pl-kos">}</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">return</span> <span class="pl-k">new</span> <span class="pl-v">Promise</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">resolve</span><span class="pl-kos">,</span> <span class="pl-s1">reject</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
        <span class="pl-c">//创建script标签</span>
        <span class="pl-k">let</span> <span class="pl-s1">script</span> <span class="pl-c1">=</span> <span class="pl-smi">document</span><span class="pl-kos">.</span><span class="pl-en">createElement</span><span class="pl-kos">(</span><span class="pl-s">'script'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-c">//将回调函数挂在 window 上</span>
        <span class="pl-smi">window</span><span class="pl-kos">[</span><span class="pl-s1">cb</span><span class="pl-kos">]</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">data</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-s1">resolve</span><span class="pl-kos">(</span><span class="pl-s1">data</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
            <span class="pl-c">//代码执行后，删除插入的script标签</span>
            <span class="pl-smi">document</span><span class="pl-kos">.</span><span class="pl-c1">body</span><span class="pl-kos">.</span><span class="pl-en">removeChild</span><span class="pl-kos">(</span><span class="pl-s1">script</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-kos">}</span>
        <span class="pl-c">//回调函数加在请求地址上</span>
        <span class="pl-s1">params</span> <span class="pl-c1">=</span> <span class="pl-kos">{</span>...<span class="pl-s1">params</span><span class="pl-kos">,</span> cb<span class="pl-kos">}</span> <span class="pl-c">//wb=b&amp;cb=show</span>
        <span class="pl-k">let</span> <span class="pl-s1">arrs</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-kos">]</span><span class="pl-kos">;</span>
        <span class="pl-k">for</span><span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">key</span> <span class="pl-k">in</span> <span class="pl-s1">params</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-s1">arrs</span><span class="pl-kos">.</span><span class="pl-en">push</span><span class="pl-kos">(</span><span class="pl-s">`<span class="pl-s1"><span class="pl-kos">${</span><span class="pl-s1">key</span><span class="pl-kos">}</span></span>=<span class="pl-s1"><span class="pl-kos">${</span><span class="pl-s1">params</span><span class="pl-kos">[</span><span class="pl-s1">key</span><span class="pl-kos">]</span><span class="pl-kos">}</span></span>`</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-kos">}</span>
        <span class="pl-s1">script</span><span class="pl-kos">.</span><span class="pl-c1">src</span> <span class="pl-c1">=</span> <span class="pl-s">`<span class="pl-s1"><span class="pl-kos">${</span><span class="pl-s1">url</span><span class="pl-kos">}</span></span>?<span class="pl-s1"><span class="pl-kos">${</span><span class="pl-s1">arrs</span><span class="pl-kos">.</span><span class="pl-en">join</span><span class="pl-kos">(</span><span class="pl-s">'&amp;'</span><span class="pl-kos">)</span><span class="pl-kos">}</span></span>`</span><span class="pl-kos">;</span>
        <span class="pl-smi">document</span><span class="pl-kos">.</span><span class="pl-c1">body</span><span class="pl-kos">.</span><span class="pl-en">appendChild</span><span class="pl-kos">(</span><span class="pl-s1">script</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span>
<span class="pl-c">//使用</span>
<span class="pl-k">function</span> <span class="pl-en">sayHi</span><span class="pl-kos">(</span><span class="pl-s1">data</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">data</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span>
<span class="pl-en">jsonp</span><span class="pl-kos">(</span><span class="pl-kos">{</span>
    <span class="pl-c1">url</span>: <span class="pl-s">'http://localhost:3000/say'</span><span class="pl-kos">,</span>
    <span class="pl-c1">params</span>: <span class="pl-kos">{</span>
        <span class="pl-c">//code</span>
    <span class="pl-kos">}</span><span class="pl-kos">,</span>
    <span class="pl-c1">cb</span>: <span class="pl-s">'sayHi'</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">then</span><span class="pl-kos">(</span><span class="pl-s1">data</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">data</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<div class="highlight highlight-source-js"><pre><span class="pl-c">//express启动一个后台服务</span>
<span class="pl-k">let</span> <span class="pl-s1">express</span> <span class="pl-c1">=</span> <span class="pl-en">require</span><span class="pl-kos">(</span><span class="pl-s">'express'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-k">let</span> <span class="pl-s1">app</span> <span class="pl-c1">=</span> <span class="pl-s1">express</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span>

<span class="pl-s1">app</span><span class="pl-kos">.</span><span class="pl-en">get</span><span class="pl-kos">(</span><span class="pl-s">'/say'</span><span class="pl-kos">,</span> <span class="pl-kos">(</span><span class="pl-s1">req</span><span class="pl-kos">,</span> <span class="pl-s1">res</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-k">let</span> <span class="pl-kos">{</span>cb<span class="pl-kos">}</span> <span class="pl-c1">=</span> <span class="pl-s1">req</span><span class="pl-kos">.</span><span class="pl-c1">query</span><span class="pl-kos">;</span> <span class="pl-c">//获取传来的callback函数名，cb是key</span>
    <span class="pl-s1">res</span><span class="pl-kos">.</span><span class="pl-en">send</span><span class="pl-kos">(</span><span class="pl-s">`<span class="pl-s1"><span class="pl-kos">${</span><span class="pl-s1">cb</span><span class="pl-kos">}</span></span>('Hello!')`</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-s1">app</span><span class="pl-kos">.</span><span class="pl-en">listen</span><span class="pl-kos">(</span><span class="pl-c1">3000</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<p>从今天起，jsonp的原理就要了然于心啦~</p>
<p><a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/da697b5a89d21a4544f5e0cf8de43c929168f013/68747470733a2f2f74696d6773612e62616964752e636f6d2f74696d673f696d616765267175616c6974793d38302673697a653d62393939395f3130303030267365633d313535353735373433333833392664693d363736623835333332326663393662656330336563643534383664363965313526696d67747970653d30267372633d687474702533412532462532467777772e313771712e636f6d253246696d675f6269616f71696e6725324636393837313631332e6a706567"><img src="https://camo.githubusercontent.com/da697b5a89d21a4544f5e0cf8de43c929168f013/68747470733a2f2f74696d6773612e62616964752e636f6d2f74696d673f696d616765267175616c6974793d38302673697a653d62393939395f3130303030267365633d313535353735373433333833392664693d363736623835333332326663393662656330336563643534383664363965313526696d67747970653d30267372633d687474702533412532462532467777772e313771712e636f6d253246696d675f6269616f71696e6725324636393837313631332e6a706567" alt="" data-canonical-src="https://timgsa.baidu.com/timg?image&amp;quality=80&amp;size=b9999_10000&amp;sec=1555757433839&amp;di=676b853322fc96bec03ecd5486d69e15&amp;imgtype=0&amp;src=http%3A%2F%2Fwww.17qq.com%2Fimg_biaoqing%2F69871613.jpeg" style="max-width:100%;"></a></p>
<ol start="2">
<li>cors</li>
</ol>
<p>jsonp 只能支持 get 请求，cors 可以支持多种请求。cors 并不需要前端做什么工作。</p>
<blockquote>
<p>简单跨域请求:</p>
</blockquote>
<p>只要服务器设置的Access-Control-Allow-Origin Header和请求来源匹配，浏览器就允许跨域</p>
<ol>
<li>请求的方法是get，head或者post。</li>
<li>Content-Type是application/x-www-form-urlencoded, multipart/form-data 或 text/plain中的一个值，或者不设置也可以，一般默认就是application/x-www-form-urlencoded。</li>
<li>请求中没有自定义的HTTP头部，如x-token。(应该是这几种头部 Accept，Accept-Language，Content-Language，Last-Event-ID，Content-Type）</li>
</ol>
<div class="highlight highlight-source-js"><pre><span class="pl-c">//简单跨域请求</span>
<span class="pl-s1">app</span><span class="pl-kos">.</span><span class="pl-en">use</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">req</span><span class="pl-kos">,</span> <span class="pl-s1">res</span><span class="pl-kos">,</span> <span class="pl-s1">next</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-s1">res</span><span class="pl-kos">.</span><span class="pl-en">setHeader</span><span class="pl-kos">(</span><span class="pl-s">'Access-Control-Allow-Origin'</span><span class="pl-kos">,</span> <span class="pl-s">'XXXX'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<blockquote>
<p>带预检(Preflighted)的跨域请求</p>
</blockquote>
<p>不满于简单跨域请求的，即是带预检的跨域请求。服务端需要设置 Access-Control-Allow-Origin (允许跨域资源请求的域) 、 Access-Control-Allow-Methods (允许的请求方法) 和 Access-Control-Allow-Headers (允许的请求头)</p>
<div class="highlight highlight-source-js"><pre><span class="pl-s1">app</span><span class="pl-kos">.</span><span class="pl-en">use</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">req</span><span class="pl-kos">,</span> <span class="pl-s1">res</span><span class="pl-kos">,</span> <span class="pl-s1">next</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-s1">res</span><span class="pl-kos">.</span><span class="pl-en">setHeader</span><span class="pl-kos">(</span><span class="pl-s">'Access-Control-Allow-Origin'</span><span class="pl-kos">,</span> <span class="pl-s">'XXX'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-s1">res</span><span class="pl-kos">.</span><span class="pl-en">setHeader</span><span class="pl-kos">(</span><span class="pl-s">'Access-Control-Allow-Headers'</span><span class="pl-kos">,</span> <span class="pl-s">'XXX'</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//允许返回的头</span>
    <span class="pl-s1">res</span><span class="pl-kos">.</span><span class="pl-en">setHeader</span><span class="pl-kos">(</span><span class="pl-s">'Access-Control-Allow-Methods'</span><span class="pl-kos">,</span> <span class="pl-s">'XXX'</span><span class="pl-kos">)</span><span class="pl-kos">;</span><span class="pl-c">//允许使用put方法请求接口</span>
    <span class="pl-s1">res</span><span class="pl-kos">.</span><span class="pl-en">setHeader</span><span class="pl-kos">(</span><span class="pl-s">'Access-Control-Max-Age'</span><span class="pl-kos">,</span> <span class="pl-c1">6</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//预检的存活时间</span>
    <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">req</span><span class="pl-kos">.</span><span class="pl-c1">method</span> <span class="pl-c1">===</span> <span class="pl-s">"OPTIONS"</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-s1">res</span><span class="pl-kos">.</span><span class="pl-en">end</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//如果method是OPTIONS，不做处理</span>
    <span class="pl-kos">}</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<p>更多CORS的知识可以访问: <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS" rel="nofollow">HTTP访问控制（CORS）<br>
</a></p>
<ol start="3">
<li>nginx 反向代理</li>
</ol>
<p>使用nginx反向代理实现跨域，只需要修改nginx的配置即可解决跨域问题。</p>
<p>A网站向B网站请求某个接口时，向B网站发送一个请求，nginx根据配置文件接收这个请求，代替A网站向B网站来请求。<br>
nginx拿到这个资源后再返回给A网站，以此来解决了跨域问题。</p>
<p>例如nginx的端口号为 8090，需要请求的服务器端口号为 3000。（localhost:8090 请求 localhost:3000/say）</p>
<p>nginx配置如下:</p>
<pre><code>server {
    listen       8090;

    server_name  localhost;

    location / {
        root   /Users/liuyan35/Test/Study/CORS/1-jsonp;
        index  index.html index.htm;
    }
    location /say {
        rewrite  ^/say/(.*)$ /$1 break;
        proxy_pass   http://localhost:3000;
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Credentials' 'true';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    }
    # others
}
</code></pre>
<ol start="4">
<li>websocket</li>
</ol>
<p>Websocket 是 HTML5 的一个持久化的协议，它实现了浏览器与服务器的全双工通信，同时也是跨域的一种解决方案。</p>
<p>Websocket 不受同源策略影响，只要服务器端支持，无需任何配置就支持跨域。</p>
<p>前端页面在 8080 的端口。</p>
<div class="highlight highlight-source-js"><pre><span class="pl-k">let</span> <span class="pl-s1">socket</span> <span class="pl-c1">=</span> <span class="pl-k">new</span> <span class="pl-v">WebSocket</span><span class="pl-kos">(</span><span class="pl-s">'ws://localhost:3000'</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//协议是ws</span>
<span class="pl-s1">socket</span><span class="pl-kos">.</span><span class="pl-en">onopen</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-s1">socket</span><span class="pl-kos">.</span><span class="pl-en">send</span><span class="pl-kos">(</span><span class="pl-s">'Hi,你好'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span>
<span class="pl-s1">socket</span><span class="pl-kos">.</span><span class="pl-en">onmessage</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">e</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">e</span><span class="pl-kos">.</span><span class="pl-c1">data</span><span class="pl-kos">)</span>
<span class="pl-kos">}</span></pre></div>
<p>服务端 3000端口。可以看出websocket无需做跨域配置。</p>
<div class="highlight highlight-source-js"><pre><span class="pl-k">let</span> <span class="pl-v">WebSocket</span> <span class="pl-c1">=</span> <span class="pl-en">require</span><span class="pl-kos">(</span><span class="pl-s">'ws'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-k">let</span> <span class="pl-s1">wss</span> <span class="pl-c1">=</span> <span class="pl-k">new</span> <span class="pl-v">WebSocket</span><span class="pl-kos">.</span><span class="pl-c1">Server</span><span class="pl-kos">(</span><span class="pl-kos">{</span><span class="pl-c1">port</span>: <span class="pl-c1">3000</span><span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-s1">wss</span><span class="pl-kos">.</span><span class="pl-en">on</span><span class="pl-kos">(</span><span class="pl-s">'connection'</span><span class="pl-kos">,</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">ws</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-s1">ws</span><span class="pl-kos">.</span><span class="pl-en">on</span><span class="pl-kos">(</span><span class="pl-s">'message'</span><span class="pl-kos">,</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">data</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">data</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//接受到页面发来的消息'Hi,你好'</span>
        <span class="pl-s1">ws</span><span class="pl-kos">.</span><span class="pl-en">send</span><span class="pl-kos">(</span><span class="pl-s">'Hi'</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//向页面发送消息</span>
    <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<ol start="5">
<li>postMessage</li>
</ol>
<p>postMessage 通过用作前端页面之前的跨域，如父页面与iframe页面的跨域。window.postMessage方法，允许跨窗口通信，不论这两个窗口是否同源。</p>
<p>话说工作中两个页面之前需要通信的情况并不多，我本人工作中，仅使用过两次，一次是H5页面中发送postMessage信息，ReactNative的webview中接收此此消息，并作出相应处理。另一次是可轮播的页面，某个轮播页使用的是iframe页面，为了解决滑动的事件冲突，iframe页面中去监听手势，发送消息告诉父页面是否左滑和右滑。</p>
<blockquote>
<p>子页面向父页面发消息</p>
</blockquote>
<p>父页面</p>
<div class="highlight highlight-source-js"><pre><span class="pl-smi">window</span><span class="pl-kos">.</span><span class="pl-en">addEventListener</span><span class="pl-kos">(</span><span class="pl-s">'message'</span><span class="pl-kos">,</span> <span class="pl-kos">(</span><span class="pl-s1">e</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
    <span class="pl-smi">this</span><span class="pl-kos">.</span><span class="pl-c1">props</span><span class="pl-kos">.</span><span class="pl-en">movePage</span><span class="pl-kos">(</span><span class="pl-s1">e</span><span class="pl-kos">.</span><span class="pl-c1">data</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span><span class="pl-kos">,</span> <span class="pl-c1">false</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<p>子页面(iframe):</p>
<div class="highlight highlight-source-js"><pre><span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-c">/*左滑*/</span><span class="pl-s1"></span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-smi">window</span><span class="pl-kos">.</span><span class="pl-c1">parent</span> <span class="pl-c1">&amp;&amp;</span> <span class="pl-smi">window</span><span class="pl-kos">.</span><span class="pl-c1">parent</span><span class="pl-kos">.</span><span class="pl-en">postMessage</span><span class="pl-kos">(</span><span class="pl-c1">-</span><span class="pl-c1">1</span><span class="pl-kos">,</span> <span class="pl-s">'*'</span><span class="pl-kos">)</span>
<span class="pl-kos">}</span><span class="pl-k">else</span> <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-c">/*右滑*/</span><span class="pl-s1"></span><span class="pl-kos">)</span><span class="pl-kos">{</span>
    <span class="pl-smi">window</span><span class="pl-kos">.</span><span class="pl-c1">parent</span> <span class="pl-c1">&amp;&amp;</span> <span class="pl-smi">window</span><span class="pl-kos">.</span><span class="pl-c1">parent</span><span class="pl-kos">.</span><span class="pl-en">postMessage</span><span class="pl-kos">(</span><span class="pl-c1">1</span><span class="pl-kos">,</span> <span class="pl-s">'*'</span><span class="pl-kos">)</span>
<span class="pl-kos">}</span></pre></div>
<blockquote>
<p>父页面向子页面发消息</p>
</blockquote>
<p>父页面:</p>
<div class="highlight highlight-source-js"><pre><span class="pl-k">let</span> <span class="pl-s1">iframe</span> <span class="pl-c1">=</span> <span class="pl-smi">document</span><span class="pl-kos">.</span><span class="pl-en">querySelector</span><span class="pl-kos">(</span><span class="pl-s">'#iframe'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-s1">iframe</span><span class="pl-kos">.</span><span class="pl-en">onload</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-s1">iframe</span><span class="pl-kos">.</span><span class="pl-c1">contentWindow</span><span class="pl-kos">.</span><span class="pl-en">postMessage</span><span class="pl-kos">(</span><span class="pl-s">'hello'</span><span class="pl-kos">,</span> <span class="pl-s">'http://localhost:3002'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span></pre></div>
<p>子页面:</p>
<div class="highlight highlight-source-js"><pre><span class="pl-smi">window</span><span class="pl-kos">.</span><span class="pl-en">addEventListener</span><span class="pl-kos">(</span><span class="pl-s">'message'</span><span class="pl-kos">,</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">e</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">e</span><span class="pl-kos">.</span><span class="pl-c1">data</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-s1">e</span><span class="pl-kos">.</span><span class="pl-c1">source</span><span class="pl-kos">.</span><span class="pl-en">postMessage</span><span class="pl-kos">(</span><span class="pl-s">'Hi'</span><span class="pl-kos">,</span> <span class="pl-s1">e</span><span class="pl-kos">.</span><span class="pl-c1">origin</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//回消息</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<ol start="6">
<li>node 中间件</li>
</ol>
<p>node 中间件的跨域原理和nginx代理跨域，同源策略是浏览器的限制，服务端没有同源策略。</p>
<p>node中间件实现跨域的原理如下:</p>
<p>1.接受客户端请求</p>
<p>2.将请求 转发给服务器。</p>
<p>3.拿到服务器 响应 数据。</p>
<p>4.将 响应 转发给客户端。</p>
<blockquote>
<p>不常用跨域方法</p>
</blockquote>
<p>以下三种跨域方式很少用，如有兴趣，可自行查阅相关资料。</p>
<ol>
<li>
<p>window.name + iframe</p>
</li>
<li>
<p>location.hash + iframe</p>
</li>
<li>
<p>document.domain (主域需相同)</p>
</li>
</ol>
<p>如果你有更好的答案或想法，欢迎在这题目对应的github下留言：<a href="https://github.com/YvetteLau/Blog/issues/21" data-hovercard-type="issue" data-hovercard-url="/YvetteLau/Blog/issues/21/hovercard">跨域的方法有哪些？原理是什么？</a></p>
<hr>
<h3>13.js异步加载的方式有哪些？</h3>
<ol>
<li>
<p><code>&lt;script&gt;</code> 的 defer 属性，HTML4 中新增</p>
</li>
<li>
<p><code>&lt;script&gt;</code> 的 async 属性，HTML5 中新增</p>
</li>
</ol>
<p><code>&lt;script&gt;</code>标签打开defer属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。</p>
<p>defer 和 async 的区别在于: defer要等到整个页面在内存中正常渲染结束，才会执行；</p>
<p>async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。defer是“渲染完再执行”，async是“下载完就执行”。</p>
<p>如果有多个 defer 脚本，会按照它们在页面出现的顺序加载。</p>
<p>多个async脚本是不能保证加载顺序的。</p>
<ol start="3">
<li>动态插入 script 脚本</li>
</ol>
<div class="highlight highlight-source-js"><pre><span class="pl-k">function</span> <span class="pl-en">downloadJS</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span> 
    <span class="pl-s1">varelement</span> <span class="pl-c1">=</span> <span class="pl-smi">document</span><span class="pl-kos">.</span><span class="pl-en">createElement</span><span class="pl-kos">(</span><span class="pl-s">"script"</span><span class="pl-kos">)</span><span class="pl-kos">;</span> 
    <span class="pl-s1">element</span><span class="pl-kos">.</span><span class="pl-c1">src</span> <span class="pl-c1">=</span> <span class="pl-s">"XXX.js"</span><span class="pl-kos">;</span> 
    <span class="pl-smi">document</span><span class="pl-kos">.</span><span class="pl-c1">body</span><span class="pl-kos">.</span><span class="pl-en">appendChild</span><span class="pl-kos">(</span><span class="pl-s1">element</span><span class="pl-kos">)</span><span class="pl-kos">;</span> 
<span class="pl-kos">}</span>
<span class="pl-c">//何时的时候，调用上述方法 </span></pre></div>
<ol start="4">
<li>有条件的动态创建脚本</li>
</ol>
<p>如页面 onload 之后，</p>
<p>如果你有更好的答案或想法，欢迎在这题目对应的github下留言：<a href="https://github.com/YvetteLau/Blog/issues/22" data-hovercard-type="issue" data-hovercard-url="/YvetteLau/Blog/issues/22/hovercard">js异步加载的方式有哪些？</a></p>
<hr>
<h3>14.下面代码a在什么情况中打印出1？</h3>
<div class="highlight highlight-source-js"><pre><span class="pl-c">//?</span>
<span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">a</span> <span class="pl-c1">==</span> <span class="pl-c1">1</span> <span class="pl-c1">&amp;&amp;</span> <span class="pl-s1">a</span> <span class="pl-c1">==</span> <span class="pl-c1">2</span> <span class="pl-c1">&amp;&amp;</span> <span class="pl-s1">a</span> <span class="pl-c1">==</span> <span class="pl-c1">3</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-c1">1</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span></pre></div>
<p>1.在类型转换的时候，我们知道了对象如何转换成原始数据类型。如果部署了 [Symbol.toPrimitive]，那么返回的就是<a href="">Symbol.toPrimitive</a>的返回值。当然，我们也可以把此函数部署在valueOf或者是toString接口上，效果相同。</p>
<div class="highlight highlight-source-js"><pre><span class="pl-c">//利用闭包延长作用域的特性</span>
<span class="pl-k">let</span> <span class="pl-s1">a</span> <span class="pl-c1">=</span> <span class="pl-kos">{</span>
    <span class="pl-kos">[</span><span class="pl-v">Symbol</span><span class="pl-kos">.</span><span class="pl-c1">toPrimitive</span><span class="pl-kos">]</span>: <span class="pl-kos">(</span><span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-k">let</span> <span class="pl-s1">i</span> <span class="pl-c1">=</span> <span class="pl-c1">1</span><span class="pl-kos">;</span>
            <span class="pl-k">return</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
                <span class="pl-k">return</span> <span class="pl-s1">i</span><span class="pl-c1">++</span><span class="pl-kos">;</span>
            <span class="pl-kos">}</span>
    <span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">(</span><span class="pl-kos">)</span>
<span class="pl-kos">}</span></pre></div>
<p>（1）. 比较 a == 1 时，会调用 [Symbol.toPrimitive]，此时 i 是 1，相等。<br>
（2）. 继续比较 a == 2,调用 [Symbol.toPrimitive]，此时 i 是 2，相等。<br>
（3）. 继续比较 a == 3,调用 [Symbol.toPrimitive]，此时 i 是 3，相等。</p>
<p>2.利用Object.definePropert在window/global上定义a属性，获取a属性时，会调用get.</p>
<div class="highlight highlight-source-js"><pre><span class="pl-k">let</span> <span class="pl-s1">val</span> <span class="pl-c1">=</span> <span class="pl-c1">1</span><span class="pl-kos">;</span>
<span class="pl-v">Object</span><span class="pl-kos">.</span><span class="pl-en">defineProperty</span><span class="pl-kos">(</span><span class="pl-smi">window</span><span class="pl-kos">,</span> <span class="pl-s">'a'</span><span class="pl-kos">,</span> <span class="pl-kos">{</span>
  <span class="pl-en">get</span>: <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">return</span> <span class="pl-s1">val</span><span class="pl-c1">++</span><span class="pl-kos">;</span>
  <span class="pl-kos">}</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<p>3.利用数组的特性。</p>
<div class="highlight highlight-source-js"><pre><span class="pl-k">var</span> <span class="pl-s1">a</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-c1">1</span><span class="pl-kos">,</span><span class="pl-c1">2</span><span class="pl-kos">,</span><span class="pl-c1">3</span><span class="pl-kos">]</span><span class="pl-kos">;</span>
<span class="pl-s1">a</span><span class="pl-kos">.</span><span class="pl-c1">join</span> <span class="pl-c1">=</span> <span class="pl-s1">a</span><span class="pl-kos">.</span><span class="pl-c1">shift</span><span class="pl-kos">;</span></pre></div>
<p>数组的 <code>toString</code> 方法返回一个字符串，该字符串由数组中的每个元素的 toString() 返回值经调用 join() 方法连接（由逗号隔开）组成。</p>
<p>因此，我们可以重新 join 方法。返回第一个元素，并将其删除。</p>
<p>如果你有更好的答案或想法，欢迎在这题目对应的github下留言：<a href="https://github.com/YvetteLau/Blog/issues/23" data-hovercard-type="issue" data-hovercard-url="/YvetteLau/Blog/issues/23/hovercard">下面代码a在什么情况中打印出1？ </a></p>
<hr>
<h3>15.下面这段代码的输出是什么？</h3>
<div class="highlight highlight-source-js"><pre><span class="pl-k">function</span> <span class="pl-v">Foo</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-en">getName</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span><span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-c1">1</span><span class="pl-kos">)</span><span class="pl-kos">}</span><span class="pl-kos">;</span>
    <span class="pl-k">return</span> <span class="pl-smi">this</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span>
<span class="pl-v">Foo</span><span class="pl-kos">.</span><span class="pl-en">getName</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span><span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-c1">2</span><span class="pl-kos">)</span><span class="pl-kos">}</span><span class="pl-kos">;</span>
<span class="pl-v">Foo</span><span class="pl-kos">.</span><span class="pl-c1">prototype</span><span class="pl-kos">.</span><span class="pl-en">getName</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span><span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-c1">3</span><span class="pl-kos">)</span><span class="pl-kos">}</span><span class="pl-kos">;</span>
<span class="pl-k">var</span> <span class="pl-en">getName</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span><span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-c1">4</span><span class="pl-kos">)</span><span class="pl-kos">}</span><span class="pl-kos">;</span>
<span class="pl-k">function</span> <span class="pl-en">getName</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span><span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-c1">5</span><span class="pl-kos">)</span><span class="pl-kos">}</span><span class="pl-kos">;</span>

<span class="pl-v">Foo</span><span class="pl-kos">.</span><span class="pl-en">getName</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-en">getName</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-v">Foo</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">getName</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-en">getName</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-k">new</span> <span class="pl-v">Foo</span><span class="pl-kos">.</span><span class="pl-c1">getName</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-k">new</span> <span class="pl-v">Foo</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">getName</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-k">new</span> <span class="pl-k">new</span> <span class="pl-v">Foo</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">getName</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<p>**说明：**一道经典的面试题，仅是为了帮助大家回顾一下知识点，加深理解，真实工作中，是不可能这样写代码的，否则，肯定会被打死的。</p>
<p>1.首先预编译阶段，变量声明与函数声明提升至其对应作用域的最顶端。</p>
<p>因此上面的代码编译后如下(函数声明的优先级先于变量声明):</p>
<div class="highlight highlight-source-js"><pre><span class="pl-k">function</span> <span class="pl-v">Foo</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-en">getName</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span><span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-c1">1</span><span class="pl-kos">)</span><span class="pl-kos">}</span><span class="pl-kos">;</span>
    <span class="pl-k">return</span> <span class="pl-smi">this</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span>
<span class="pl-k">var</span> <span class="pl-s1">getName</span><span class="pl-kos">;</span>
<span class="pl-k">function</span> <span class="pl-s1">getName</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span><span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-c1">5</span><span class="pl-kos">)</span><span class="pl-kos">}</span><span class="pl-kos">;</span>
<span class="pl-v">Foo</span><span class="pl-kos">.</span><span class="pl-en">getName</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span><span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-c1">2</span><span class="pl-kos">)</span><span class="pl-kos">}</span><span class="pl-kos">;</span>
<span class="pl-v">Foo</span><span class="pl-kos">.</span><span class="pl-c1">prototype</span><span class="pl-kos">.</span><span class="pl-en">getName</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span><span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-c1">3</span><span class="pl-kos">)</span><span class="pl-kos">}</span><span class="pl-kos">;</span>
<span class="pl-s1">getName</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span><span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-c1">4</span><span class="pl-kos">)</span><span class="pl-kos">}</span><span class="pl-kos">;</span></pre></div>
<p>2.<code>Foo.getName()</code>;直接调用Foo上getName方法，输出2</p>
<p>3.<code>getName()</code>;输出4，getName被重新赋值了</p>
<p>4.<code>Foo().getName()</code>;执行Foo()，window的getName被重新赋值，返回this;浏览器环境中，非严格模式，this 指向 window，this.getName();输出为1.</p>
<p>如果是严格模式，this 指向 undefined，此处会抛出错误。</p>
<p>如果是node环境中，this 指向 global，node的全局变量并不挂在global上，因为global.getName对应的是undefined，不是一个function，会抛出错误。</p>
<p>5.<code>getName()</code>;已经抛错的自然走不动这一步了；继续浏览器非严格模式；window.getName被重新赋过值，此时再调用，输出的是1</p>
<p>6.<code>new Foo.getName()</code>;考察<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence" rel="nofollow">运算符优先级</a>的知识，new 无参数列表，对应的优先级是18；成员访问操作符 <code>.</code> , 对应的优先级是 19。因此相当于是 <code>new (Foo.getName)()</code>;new操作符会执行构造函数中的方法，因此此处输出为 2.</p>
<p>7.<code>new Foo().getName()</code>；new 带参数列表，对应的优先级是19，和成员访问操作符<code>.</code>优先级相同。同级运算符，按照从左到右的顺序依次计算。<code>new Foo()</code>先初始化 Foo 的实例化对象，实例上没有getName方法，因此需要原型上去找，即找到了 <code>Foo.prototype.getName</code>，输出3</p>
<p>8.<code>new new Foo().getName()</code>; new 带参数列表，优先级19，因此相当于是 <code>new (new Foo()).getName()</code>；先初始化 Foo 的实例化对象，然后将其原型上的 getName 函数作为构造函数再次 new ，输出3</p>
<p>因此最终结果如下:</p>
<div class="highlight highlight-source-js"><pre><span class="pl-v">Foo</span><span class="pl-kos">.</span><span class="pl-en">getName</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//2</span>
<span class="pl-en">getName</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span><span class="pl-c">//4</span>
<span class="pl-v">Foo</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">getName</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span><span class="pl-c">//1</span>
<span class="pl-en">getName</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span><span class="pl-c">//1</span>
<span class="pl-k">new</span> <span class="pl-v">Foo</span><span class="pl-kos">.</span><span class="pl-c1">getName</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span><span class="pl-c">//2</span>
<span class="pl-k">new</span> <span class="pl-v">Foo</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">getName</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span><span class="pl-c">//3</span>
<span class="pl-k">new</span> <span class="pl-k">new</span> <span class="pl-v">Foo</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">getName</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span><span class="pl-c">//3</span></pre></div>
<p>如果你有更好的答案或想法，欢迎在这题目对应的github下留言：<a href="https://github.com/YvetteLau/Blog/issues/24" data-hovercard-type="issue" data-hovercard-url="/YvetteLau/Blog/issues/24/hovercard">下面这段代码的输出是什么？</a></p>
<hr>
<h3>16.实现双向绑定 Proxy 与 Object.defineProperty 相比优劣如何?</h3>
<ol>
<li>
<p>Object.definedProperty 的作用是劫持一个对象的属性，劫持属性的getter和setter方法，在对象的属性发生变化时进行特定的操作。而 Proxy 劫持的是整个对象。</p>
</li>
<li>
<p>Proxy 会返回一个代理对象，我们只需要操作新对象即可，而 <code>Object.defineProperty</code>  只能遍历对象属性直接修改。</p>
</li>
<li>
<p>Object.definedProperty 不支持数组，更准确的说是不支持数组的各种API，因为如果仅仅考虑arry[i] = value 这种情况，是可以劫持的，但是这种劫持意义不大。而 Proxy 可以支持数组的各种API。</p>
</li>
<li>
<p>尽管 Object.defineProperty 有诸多缺陷，但是其兼容性要好于 Proxy.</p>
</li>
</ol>
<p>PS: Vue2.x 使用 Object.defineProperty 实现数据双向绑定，V3.0 则使用了 Proxy.</p>
<div class="highlight highlight-source-js"><pre><span class="pl-c">//拦截器</span>
<span class="pl-k">let</span> <span class="pl-s1">obj</span> <span class="pl-c1">=</span> <span class="pl-kos">{</span><span class="pl-kos">}</span><span class="pl-kos">;</span>
<span class="pl-k">let</span> <span class="pl-s1">temp</span> <span class="pl-c1">=</span> <span class="pl-s">'Yvette'</span><span class="pl-kos">;</span>
<span class="pl-v">Object</span><span class="pl-kos">.</span><span class="pl-en">defineProperty</span><span class="pl-kos">(</span><span class="pl-s1">obj</span><span class="pl-kos">,</span> <span class="pl-s">'name'</span><span class="pl-kos">,</span> <span class="pl-kos">{</span>
    <span class="pl-en">get</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s">"读取成功"</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-k">return</span> <span class="pl-s1">temp</span>
    <span class="pl-kos">}</span><span class="pl-kos">,</span>
    <span class="pl-en">set</span><span class="pl-kos">(</span><span class="pl-s1">value</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s">"设置成功"</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-s1">temp</span> <span class="pl-c1">=</span> <span class="pl-s1">value</span><span class="pl-kos">;</span>
    <span class="pl-kos">}</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>

<span class="pl-s1">obj</span><span class="pl-kos">.</span><span class="pl-c1">name</span> <span class="pl-c1">=</span> <span class="pl-s">'Chris'</span><span class="pl-kos">;</span>
<span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s1">obj</span><span class="pl-kos">.</span><span class="pl-c1">name</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<p><strong>PS:</strong> Object.defineProperty 定义出来的属性，默认是不可枚举，不可更改，不可配置【无法delete】</p>
<p>我们可以看到 Proxy 会劫持整个对象，读取对象中的属性或者是修改属性值，那么就会被劫持。但是有点需要注意，复杂数据类型，监控的是引用地址，而不是值，如果引用地址没有改变，那么不会触发set。</p>
<div class="highlight highlight-source-js"><pre><span class="pl-k">let</span> <span class="pl-s1">obj</span> <span class="pl-c1">=</span> <span class="pl-kos">{</span><span class="pl-c1">name</span>: <span class="pl-s">'Yvette'</span><span class="pl-kos">,</span> <span class="pl-c1">hobbits</span>: <span class="pl-kos">[</span><span class="pl-s">'travel'</span><span class="pl-kos">,</span> <span class="pl-s">'reading'</span><span class="pl-kos">]</span><span class="pl-kos">,</span> <span class="pl-c1">info</span>: <span class="pl-kos">{</span>
    <span class="pl-c1">age</span>: <span class="pl-c1">20</span><span class="pl-kos">,</span>
    <span class="pl-c1">job</span>: <span class="pl-s">'engineer'</span>
<span class="pl-kos">}</span><span class="pl-kos">}</span><span class="pl-kos">;</span>
<span class="pl-k">let</span> <span class="pl-s1">p</span> <span class="pl-c1">=</span> <span class="pl-k">new</span> <span class="pl-v">Proxy</span><span class="pl-kos">(</span><span class="pl-s1">obj</span><span class="pl-kos">,</span> <span class="pl-kos">{</span>
    <span class="pl-en">get</span><span class="pl-kos">(</span><span class="pl-s1">target</span><span class="pl-kos">,</span> <span class="pl-s1">key</span><span class="pl-kos">)</span> <span class="pl-kos">{</span> <span class="pl-c">//第三个参数是 proxy， 一般不使用</span>
        <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s">'读取成功'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-k">return</span> <span class="pl-v">Reflect</span><span class="pl-kos">.</span><span class="pl-en">get</span><span class="pl-kos">(</span><span class="pl-s1">target</span><span class="pl-kos">,</span> <span class="pl-s1">key</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-kos">}</span><span class="pl-kos">,</span>
    <span class="pl-en">set</span><span class="pl-kos">(</span><span class="pl-s1">target</span><span class="pl-kos">,</span> <span class="pl-s1">key</span><span class="pl-kos">,</span> <span class="pl-s1">value</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">key</span> <span class="pl-c1">===</span> <span class="pl-s">'length'</span><span class="pl-kos">)</span> <span class="pl-k">return</span> <span class="pl-c1">true</span><span class="pl-kos">;</span> <span class="pl-c">//如果是数组长度的变化，返回。</span>
        <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s">'设置成功'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-k">return</span> <span class="pl-v">Reflect</span><span class="pl-kos">.</span><span class="pl-en">set</span><span class="pl-kos">(</span><span class="pl-kos">[</span><span class="pl-s1">target</span><span class="pl-kos">,</span> <span class="pl-s1">key</span><span class="pl-kos">,</span> <span class="pl-s1">value</span><span class="pl-kos">]</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-kos">}</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-s1">p</span><span class="pl-kos">.</span><span class="pl-c1">name</span> <span class="pl-c1">=</span> <span class="pl-c1">20</span><span class="pl-kos">;</span> <span class="pl-c">//设置成功</span>
<span class="pl-s1">p</span><span class="pl-kos">.</span><span class="pl-c1">age</span> <span class="pl-c1">=</span> <span class="pl-c1">20</span><span class="pl-kos">;</span> <span class="pl-c">//设置成功; 不需要事先定义此属性</span>
<span class="pl-s1">p</span><span class="pl-kos">.</span><span class="pl-c1">hobbits</span><span class="pl-kos">.</span><span class="pl-en">push</span><span class="pl-kos">(</span><span class="pl-s">'photography'</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//读取成功;注意不会触发设置成功</span>
<span class="pl-s1">p</span><span class="pl-kos">.</span><span class="pl-c1">info</span><span class="pl-kos">.</span><span class="pl-c1">age</span> <span class="pl-c1">=</span> <span class="pl-c1">18</span><span class="pl-kos">;</span> <span class="pl-c">//读取成功;不会触发设置成功</span></pre></div>
<p>最后，我们再看下对于数组的劫持，Object.definedProperty 和 Proxy 的差别</p>
<p>Object.definedProperty 可以将数组的索引作为属性进行劫持，但是仅支持直接对 arry[i] 进行操作，不支持数组的API，非常鸡肋。</p>
<div class="highlight highlight-source-js"><pre><span class="pl-k">let</span> <span class="pl-s1">arry</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-kos">]</span>
<span class="pl-v">Object</span><span class="pl-kos">.</span><span class="pl-en">defineProperty</span><span class="pl-kos">(</span><span class="pl-s1">arry</span><span class="pl-kos">,</span> <span class="pl-s">'0'</span><span class="pl-kos">,</span> <span class="pl-kos">{</span>
    <span class="pl-en">get</span><span class="pl-kos">(</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s">"读取成功"</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-k">return</span> <span class="pl-s1">temp</span>
    <span class="pl-kos">}</span><span class="pl-kos">,</span>
    <span class="pl-en">set</span><span class="pl-kos">(</span><span class="pl-s1">value</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s">"设置成功"</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-s1">temp</span> <span class="pl-c1">=</span> <span class="pl-s1">value</span><span class="pl-kos">;</span>
    <span class="pl-kos">}</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>

<span class="pl-s1">arry</span><span class="pl-kos">[</span><span class="pl-c1">0</span><span class="pl-kos">]</span> <span class="pl-c1">=</span> <span class="pl-c1">10</span><span class="pl-kos">;</span> <span class="pl-c">//触发设置成功</span>
<span class="pl-s1">arry</span><span class="pl-kos">.</span><span class="pl-en">push</span><span class="pl-kos">(</span><span class="pl-c1">10</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//不能被劫持</span></pre></div>
<p>Proxy 可以监听到数组的变化，支持各种API。注意数组的变化触发get和set可能不止一次，如有需要，自行根据key值决定是否要进行处理。</p>
<div class="highlight highlight-source-js"><pre><span class="pl-k">let</span> <span class="pl-s1">hobbits</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-s">'travel'</span><span class="pl-kos">,</span> <span class="pl-s">'reading'</span><span class="pl-kos">]</span><span class="pl-kos">;</span>
<span class="pl-k">let</span> <span class="pl-s1">p</span> <span class="pl-c1">=</span> <span class="pl-k">new</span> <span class="pl-v">Proxy</span><span class="pl-kos">(</span><span class="pl-s1">hobbits</span><span class="pl-kos">,</span> <span class="pl-kos">{</span>
    <span class="pl-en">get</span><span class="pl-kos">(</span><span class="pl-s1">target</span><span class="pl-kos">,</span> <span class="pl-s1">key</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-c">// if(key === 'length') return true; //如果是数组长度的变化，返回。</span>
        <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s">'读取成功'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-k">return</span> <span class="pl-v">Reflect</span><span class="pl-kos">.</span><span class="pl-en">get</span><span class="pl-kos">(</span><span class="pl-s1">target</span><span class="pl-kos">,</span> <span class="pl-s1">key</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-kos">}</span><span class="pl-kos">,</span>
    <span class="pl-en">set</span><span class="pl-kos">(</span><span class="pl-s1">target</span><span class="pl-kos">,</span> <span class="pl-s1">key</span><span class="pl-kos">,</span> <span class="pl-s1">value</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-c">// if(key === 'length') return true; //如果是数组长度的变化，返回。</span>
        <span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-s">'设置成功'</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
        <span class="pl-k">return</span> <span class="pl-v">Reflect</span><span class="pl-kos">.</span><span class="pl-en">set</span><span class="pl-kos">(</span><span class="pl-kos">[</span><span class="pl-s1">target</span><span class="pl-kos">,</span> <span class="pl-s1">key</span><span class="pl-kos">,</span> <span class="pl-s1">value</span><span class="pl-kos">]</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-kos">}</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
<span class="pl-s1">p</span><span class="pl-kos">.</span><span class="pl-en">splice</span><span class="pl-kos">(</span><span class="pl-c1">0</span><span class="pl-kos">,</span><span class="pl-c1">1</span><span class="pl-kos">)</span> <span class="pl-c">//触发get和set，可以被劫持</span>
<span class="pl-s1">p</span><span class="pl-kos">.</span><span class="pl-en">push</span><span class="pl-kos">(</span><span class="pl-s">'photography'</span><span class="pl-kos">)</span><span class="pl-kos">;</span><span class="pl-c">//触发get和set</span>
<span class="pl-s1">p</span><span class="pl-kos">.</span><span class="pl-en">slice</span><span class="pl-kos">(</span><span class="pl-c1">1</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//触发get；因为 slice 是不会修改原数组的</span></pre></div>
<p>如果你有更好的答案或想法，欢迎在这题目对应的github下留言：<a href="https://github.com/YvetteLau/Blog/issues/25" data-hovercard-type="issue" data-hovercard-url="/YvetteLau/Blog/issues/25/hovercard">实现双向绑定 Proxy 与 Object.defineProperty 相比优劣如何?</a></p>
<hr>
<h3>17.<code>Object.is()</code> 与比较操作符 <code>===</code>、<code>==</code> 有什么区别？</h3>
<p>以下情况，Object.is认为是相等</p>
<pre><code>两个值都是 undefined
两个值都是 null
两个值都是 true 或者都是 false
两个值是由相同个数的字符按照相同的顺序组成的字符串
两个值指向同一个对象
两个值都是数字并且
都是正零 +0
都是负零 -0
都是 NaN
都是除零和 NaN 外的其它同一个数字
</code></pre>
<p>Object.is() 类似于 ===，但是有一些细微差别，如下：</p>
<ol>
<li>NaN 和 NaN 相等</li>
<li>-0 和 +0 不相等</li>
</ol>
<div class="highlight highlight-source-js"><pre><span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-v">Object</span><span class="pl-kos">.</span><span class="pl-en">is</span><span class="pl-kos">(</span><span class="pl-v">NaN</span><span class="pl-kos">,</span> <span class="pl-v">NaN</span><span class="pl-kos">)</span><span class="pl-kos">)</span><span class="pl-kos">;</span><span class="pl-c">//true</span>
<span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-v">NaN</span> <span class="pl-c1">===</span> <span class="pl-v">NaN</span><span class="pl-kos">)</span><span class="pl-kos">;</span><span class="pl-c">//false</span>
<span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-v">Object</span><span class="pl-kos">.</span><span class="pl-en">is</span><span class="pl-kos">(</span><span class="pl-c1">-</span><span class="pl-c1">0</span><span class="pl-kos">,</span> <span class="pl-c1">+</span><span class="pl-c1">0</span><span class="pl-kos">)</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//false</span>
<span class="pl-smi">console</span><span class="pl-kos">.</span><span class="pl-en">log</span><span class="pl-kos">(</span><span class="pl-c1">-</span><span class="pl-c1">0</span> <span class="pl-c1">===</span> <span class="pl-c1">+</span><span class="pl-c1">0</span><span class="pl-kos">)</span><span class="pl-kos">;</span> <span class="pl-c">//true</span></pre></div>
<p>Object.is 和 <code>==</code>差得远了， <code>==</code> 在类型不同时，需要进行类型转换，前文已经详细说明。</p>
<p>如果你有更好的答案或想法，欢迎在这题目对应的github下留言：<a href="https://github.com/YvetteLau/Blog/issues/26" data-hovercard-type="issue" data-hovercard-url="/YvetteLau/Blog/issues/26/hovercard">Object.is() 与比较操作符 <code>===</code>、<code>==</code> 有什么区别?</a></p>
<hr>
<h3>18.什么是事件循环？Node事件循环和JS事件循环的差异是什么？</h3>
<p>最后一道题留给大家回答，再写下去，篇幅实在太长。</p>
<p>针对这道题，后面会专门写一篇文章~</p>
<p><strong>留下你的答案:</strong>  <a href="https://github.com/YvetteLau/Blog/issues/27" data-hovercard-type="issue" data-hovercard-url="/YvetteLau/Blog/issues/27/hovercard">什么是事件循环？Node事件循环和JS事件循环的差异是什么？</a></p>
<p>关于浏览器的event-loop可以看我之前的文章：<a href="https://juejin.im/post/5c947bca5188257de704121d" rel="nofollow">搞懂浏览器的EventLoop</a></p>
<hr>
<h4>参考文章:</h4>
<ol>
<li><a href="https://www.imooc.com/article/38600" rel="nofollow">https://www.imooc.com/article/38600</a></li>
<li><a href="http://es6.ruanyifeng.com/" rel="nofollow">http://es6.ruanyifeng.com/</a></li>
<li><a href="https://www.imooc.com/article/72500" rel="nofollow">https://www.imooc.com/article/72500</a></li>
<li><a href="https://www.cnblogs.com/LuckyWinty/p/5796190.html" rel="nofollow">https://www.cnblogs.com/LuckyWinty/p/5796190.html</a></li>
<li><a href="https://www.jianshu.com/p/a76dc7e0c5a1" rel="nofollow">https://www.jianshu.com/p/a76dc7e0c5a1</a></li>
<li><a href="https://www.v2ex.com/t/351261" rel="nofollow">https://www.v2ex.com/t/351261</a></li>
</ol>
<blockquote>
<p>关注小姐姐的公众号，加入技术交流群。</p>
</blockquote>
<p><a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/8bbf36b450f959682e01ef17e439d34cc1455dbe/68747470733a2f2f6e6f74652e796f7564616f2e636f6d2f7977732f7075626c69632f7265736f757263652f66343537303163633431303530346537316462626362643838363165386430632f786d6c6e6f74652f5745425245534f5552434561316462366364356331313562356663633930393362313661316337376139332f3239343437"><img src="https://camo.githubusercontent.com/8bbf36b450f959682e01ef17e439d34cc1455dbe/68747470733a2f2f6e6f74652e796f7564616f2e636f6d2f7977732f7075626c69632f7265736f757263652f66343537303163633431303530346537316462626362643838363165386430632f786d6c6e6f74652f5745425245534f5552434561316462366364356331313562356663633930393362313661316337376139332f3239343437" alt="1" data-canonical-src="https://note.youdao.com/yws/public/resource/f45701cc410504e71dbbcbd8861e8d0c/xmlnote/WEBRESOURCEa1db6cd5c115b5fcc9093b16a1c77a93/29447" style="max-width:100%;"></a></p>
<blockquote>
<h3>后续写作计划(写作顺序不定)</h3>
</blockquote>
<p>1.《寒冬求职季之你必须要懂的原生JS》(下)</p>
<p>2.《寒冬求职季之你必须要知道的CSS》</p>
<p>3.《寒冬求职季之你必须要懂的前端安全》</p>
<p>4.《寒冬求职季之你必须要懂的一些浏览器知识》</p>
<p>5.《寒冬求职季之你必须要知道的性能优化》</p>
<p>6.《寒冬求职季之你必须要懂的webpack原理》</p>
<p><strong>针对React技术栈:</strong></p>
<p>1.《寒冬求职季之你必须要懂的React》系列</p>
<p>2.《寒冬求职季之你必须要懂的ReactNative》系列</p>
<p><a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/97caf4bcf03761926ba45cf5660af9b9e48fa4c1/68747470733a2f2f74696d6773612e62616964752e636f6d2f74696d673f696d616765267175616c6974793d38302673697a653d62393939395f3130303030267365633d313535353836393832393734352664693d393664353038333338343739653236366638316434636230616161313533316526696d67747970653d30267372633d68747470253341253246253246696d672e74756b6578772e636f6d253246696d67253246373233666634623731306439646436312e6a7067"><img src="https://camo.githubusercontent.com/97caf4bcf03761926ba45cf5660af9b9e48fa4c1/68747470733a2f2f74696d6773612e62616964752e636f6d2f74696d673f696d616765267175616c6974793d38302673697a653d62393939395f3130303030267365633d313535353836393832393734352664693d393664353038333338343739653236366638316434636230616161313533316526696d67747970653d30267372633d68747470253341253246253246696d672e74756b6578772e636f6d253246696d67253246373233666634623731306439646436312e6a7067" alt="" data-canonical-src="https://timgsa.baidu.com/timg?image&amp;quality=80&amp;size=b9999_10000&amp;sec=1555869829745&amp;di=96d508338479e266f81d4cb0aaa1531e&amp;imgtype=0&amp;src=http%3A%2F%2Fimg.tukexw.com%2Fimg%2F723ff4b710d9dd61.jpg" style="max-width:100%;"></a></p>
<p>本文的写成耗费了非常多的时间，在这个过程中，我也学习到了很多知识，谢谢各位小伙伴愿意花费宝贵的时间阅读本文，如果本文给了您一点帮助或者是启发，请不要吝啬你的赞和Star，您的肯定是我前进的最大动力。</p>
      </td>