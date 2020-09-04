<div data-v-06722024="" class="article-content" itemprop="articleBody"><div><h2 id="user-content--" data-id="heading-0">写在前面</h2>
<p>因为对Vue.js很感兴趣，而且平时工作的技术栈也是Vue.js，这几个月花了些时间研究学习了一下Vue.js源码，并做了总结与输出。<br>文章的原地址：<a href="https://github.com/answershuto/learnVue" target="_blank" rel="nofollow noopener noreferrer">github.com/answershuto…</a>。<br>在学习过程中，为Vue加上了中文的注释<a href="https://github.com/answershuto/learnVue/tree/master/vue-src" target="_blank" rel="nofollow noopener noreferrer">github.com/answershuto…</a>，希望可以对其他想学习Vue源码的小伙伴有所帮助。<br>可能会有理解存在偏差的地方，欢迎提issue指出，共同学习，共同进步。</p>
<h2 id="user-content-vnode" data-id="heading-1">VNode</h2>
<p>在刀耕火种的年代，我们需要在各个事件方法中直接操作DOM来达到修改视图的目的。但是当应用一大就会变得难以维护。</p>
<p>那我们是不是可以把真实DOM树抽象成一棵以JavaScript对象构成的抽象树，在修改抽象树数据后将抽象树转化成真实DOM重绘到页面上呢？于是虚拟DOM出现了，它是真实DOM的一层抽象，用属性描述真实DOM的各个特性。当它发生变化的时候，就会去修改视图。</p>
<p>但是这样的JavaScript操作DOM进行重绘整个视图层是相当消耗性能的，我们是不是可以每次只更新它的修改呢？所以Vue.js将DOM抽象成一个以JavaScript对象为节点的虚拟DOM树，以VNode节点模拟真实DOM，可以对这颗抽象树进行创建节点、删除节点以及修改节点等操作，在这过程中都不需要操作真实DOM，只需要操作JavaScript对象，大大提升了性能。修改以后经过diff算法得出一些需要修改的最小单位，再将这些小单位的视图进行更新。这样做减少了很多不需要的DOM操作，大大提高了性能。</p>
<p>Vue就使用了这样的抽象节点VNode，它是对真实Dom的一层抽象，而不依赖某个平台，它可以是浏览器平台，也可以是weex，甚至是node平台也可以对这样一棵抽象Dom树进行创建删除修改等操作，这也为前后端同构提供了可能。</p>
<p>具体VNode的细节可以看<a href="https://github.com/answershuto/learnVue/blob/master/docs/VNode%E8%8A%82%E7%82%B9.MarkDown" target="_blank" rel="nofollow noopener noreferrer">VNode节点</a>。</p>
<h2 id="user-content--" data-id="heading-2">修改视图</h2>
<p>周所周知，Vue通过数据绑定来修改视图，当某个数据被修改的时候，set方法会让闭包中的Dep调用notify通知所有订阅者Watcher，Watcher通过get方法执行vm._update(vm._render(), hydrating)。</p>
<p>这里看一下_update方法</p>
<pre><code class="hljs JavaScript copyable">Vue.prototype._update = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">vnode: VNode, hydrating?: boolean</span>) </span>{
    <span class="hljs-keyword">const</span> vm: Component = <span class="hljs-keyword">this</span>
    <span class="hljs-comment">/*如果已经该组件已经挂载过了则代表进入这个步骤是个更新的过程，触发beforeUpdate钩子*/</span>
    <span class="hljs-keyword">if</span> (vm._isMounted) {
      callHook(vm, <span class="hljs-string">'beforeUpdate'</span>)
    }
    <span class="hljs-keyword">const</span> prevEl = vm.$el
    <span class="hljs-keyword">const</span> prevVnode = vm._vnode
    <span class="hljs-keyword">const</span> prevActiveInstance = activeInstance
    activeInstance = vm
    vm._vnode = vnode
    <span class="hljs-comment">// Vue.prototype.__patch__ is injected in entry points</span>
    <span class="hljs-comment">// based on the rendering backend used.</span>
    <span class="hljs-comment">/*基于后端渲染Vue.prototype.__patch__被用来作为一个入口*/</span>
    <span class="hljs-keyword">if</span> (!prevVnode) {
      <span class="hljs-comment">// initial render</span>
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, <span class="hljs-literal">false</span> <span class="hljs-comment">/* removeOnly */</span>,
        vm.$options._parentElm,
        vm.$options._refElm
      )
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// updates</span>
      vm.$el = vm.__patch__(prevVnode, vnode)
    }
    activeInstance = prevActiveInstance
    <span class="hljs-comment">// update __vue__ reference</span>
    <span class="hljs-comment">/*更新新的实例对象的__vue__*/</span>
    <span class="hljs-keyword">if</span> (prevEl) {
      prevEl.__vue__ = <span class="hljs-literal">null</span>
    }
    <span class="hljs-keyword">if</span> (vm.$el) {
      vm.$el.__vue__ = vm
    }
    <span class="hljs-comment">// if parent is an HOC, update its $el as well</span>
    <span class="hljs-keyword">if</span> (vm.$vnode &amp;&amp; vm.$parent &amp;&amp; vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el
    }
    <span class="hljs-comment">// updated hook is called by the scheduler to ensure that children are</span>
    <span class="hljs-comment">// updated in a parent's updated hook.</span>
  }</code></pre><p>_update方法的第一个参数是一个VNode对象，在内部会将该VNode对象与之前旧的VNode对象进行<strong>patch</strong>。</p>
<p>什么是<strong>patch</strong>呢？</p>
<h2 id="user-content-__patch__" data-id="heading-3"><strong>patch</strong></h2>
<p>patch将新老VNode节点进行比对，然后将根据两者的比较结果进行最小单位地修改视图，而不是将整个视图根据新的VNode重绘。patch的核心在于diff算法，这套算法可以高效地比较viturl dom的变更，得出变化以修改视图。</p>
<p>那么patch如何工作的呢？</p>
<p>首先说一下patch的核心diff算法，diff算法是通过同层的树节点进行比较而非对树进行逐层搜索遍历的方式，所以时间复杂度只有O(n)，是一种相当高效的算法。</p>
<p></p><figure><img alt="img" class="lazyload inited loaded" data-src="https://user-gold-cdn.xitu.io/2017/9/18/599392157760360fa2c45895fe3438e9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="800" data-height="600" src="https://user-gold-cdn.xitu.io/2017/9/18/599392157760360fa2c45895fe3438e9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"><figcaption>img</figcaption></figure><p></p>
<p></p><figure><img alt="img" class="lazyload inited" data-src="https://user-gold-cdn.xitu.io/2017/9/18/ebc9bc6e6792591c8a716c9ed876f87d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="800" data-height="600" src="https://user-gold-cdn.xitu.io/2017/9/18/ebc9bc6e6792591c8a716c9ed876f87d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"><figcaption>img</figcaption></figure><p></p>
<p>着两张图代表旧的VNode与新VNode进行patch的过程，他们只是在同层级的VNode之间进行比较得到变化（第二张图中相同颜色的方块代表互相进行比较的VNode节点），然后修改变化的视图，所以十分高效。</p>
<p>让我们看一下patch的代码。</p>
<pre><code class="hljs JavaScript copyable">  <span class="hljs-comment">/*createPatchFunction的返回值，一个patch函数*/</span>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">patch</span> (<span class="hljs-params">oldVnode, vnode, hydrating, removeOnly, parentElm, refElm</span>) </span>{
    <span class="hljs-comment">/*vnode不存在则直接调用销毁钩子*/</span>
    <span class="hljs-keyword">if</span> (isUndef(vnode)) {
      <span class="hljs-keyword">if</span> (isDef(oldVnode)) invokeDestroyHook(oldVnode)
      <span class="hljs-keyword">return</span>
    }

    <span class="hljs-keyword">let</span> isInitialPatch = <span class="hljs-literal">false</span>
    <span class="hljs-keyword">const</span> insertedVnodeQueue = []

    <span class="hljs-keyword">if</span> (isUndef(oldVnode)) {
      <span class="hljs-comment">// empty mount (likely as component), create new root element</span>
      <span class="hljs-comment">/*oldVnode未定义的时候，其实也就是root节点，创建一个新的节点*/</span>
      isInitialPatch = <span class="hljs-literal">true</span>
      createElm(vnode, insertedVnodeQueue, parentElm, refElm)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">/*标记旧的VNode是否有nodeType*/</span>
      <span class="hljs-comment">/*Github:https://github.com/answershuto*/</span>
      <span class="hljs-keyword">const</span> isRealElement = isDef(oldVnode.nodeType)
      <span class="hljs-keyword">if</span> (!isRealElement &amp;&amp; sameVnode(oldVnode, vnode)) {
        <span class="hljs-comment">// patch existing root node</span>
        <span class="hljs-comment">/*是同一个节点的时候直接修改现有的节点*/</span>
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly)
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">if</span> (isRealElement) {
          <span class="hljs-comment">// mounting to a real element</span>
          <span class="hljs-comment">// check if this is server-rendered content and if we can perform</span>
          <span class="hljs-comment">// a successful hydration.</span>
          <span class="hljs-keyword">if</span> (oldVnode.nodeType === <span class="hljs-number">1</span> &amp;&amp; oldVnode.hasAttribute(SSR_ATTR)) {
            <span class="hljs-comment">/*当旧的VNode是服务端渲染的元素，hydrating记为true*/</span>
            oldVnode.removeAttribute(SSR_ATTR)
            hydrating = <span class="hljs-literal">true</span>
          }
          <span class="hljs-keyword">if</span> (isTrue(hydrating)) {
            <span class="hljs-comment">/*需要合并到真实DOM上*/</span>
            <span class="hljs-keyword">if</span> (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              <span class="hljs-comment">/*调用insert钩子*/</span>
              invokeInsertHook(vnode, insertedVnodeQueue, <span class="hljs-literal">true</span>)
              <span class="hljs-keyword">return</span> oldVnode
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
              warn(
                <span class="hljs-string">'The client-side rendered virtual DOM tree is not matching '</span> +
                <span class="hljs-string">'server-rendered content. This is likely caused by incorrect '</span> +
                <span class="hljs-string">'HTML markup, for example nesting block-level elements inside '</span> +
                <span class="hljs-string">'&lt;p&gt;, or missing &lt;tbody&gt;. Bailing hydration and performing '</span> +
                <span class="hljs-string">'full client-side render.'</span>
              )
            }
          }
          <span class="hljs-comment">// either not server-rendered, or hydration failed.</span>
          <span class="hljs-comment">// create an empty node and replace it</span>
          <span class="hljs-comment">/*如果不是服务端渲染或者合并到真实DOM失败，则创建一个空的VNode节点替换它*/</span>
          oldVnode = emptyNodeAt(oldVnode)
        }
        <span class="hljs-comment">// replacing existing element</span>
        <span class="hljs-comment">/*取代现有元素*/</span>
        <span class="hljs-keyword">const</span> oldElm = oldVnode.elm
        <span class="hljs-keyword">const</span> parentElm = nodeOps.parentNode(oldElm)
        createElm(
          vnode,
          insertedVnodeQueue,
          <span class="hljs-comment">// extremely rare edge case: do not insert if old element is in a</span>
          <span class="hljs-comment">// leaving transition. Only happens when combining transition +</span>
          <span class="hljs-comment">// keep-alive + HOCs. (#4590)</span>
          oldElm._leaveCb ? <span class="hljs-literal">null</span> : parentElm,
          nodeOps.nextSibling(oldElm)
        )

        <span class="hljs-keyword">if</span> (isDef(vnode.parent)) {
          <span class="hljs-comment">// component root element replaced.</span>
          <span class="hljs-comment">// update parent placeholder node element, recursively</span>
          <span class="hljs-comment">/*组件根节点被替换，遍历更新父节点element*/</span>
          <span class="hljs-keyword">let</span> ancestor = vnode.parent
          <span class="hljs-keyword">while</span> (ancestor) {
            ancestor.elm = vnode.elm
            ancestor = ancestor.parent
          }
          <span class="hljs-keyword">if</span> (isPatchable(vnode)) {
            <span class="hljs-comment">/*调用create回调*/</span>
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent)
            }
          }
        }

        <span class="hljs-keyword">if</span> (isDef(parentElm)) {
          <span class="hljs-comment">/*移除老节点*/</span>
          removeVnodes(parentElm, [oldVnode], <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isDef(oldVnode.tag)) {
          <span class="hljs-comment">/*Github:https://github.com/answershuto*/</span>
          <span class="hljs-comment">/*调用destroy钩子*/</span>
          invokeDestroyHook(oldVnode)
        }
      }
    }

    <span class="hljs-comment">/*调用insert钩子*/</span>
    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
    <span class="hljs-keyword">return</span> vnode.elm
  }</code></pre><p>从代码中不难发现，当oldVnode与vnode在sameVnode的时候才会进行patchVnode，也就是新旧VNode节点判定为同一节点的时候才会进行patchVnode这个过程，否则就是创建新的DOM，移除旧的DOM。</p>
<p>怎么样的节点算sameVnode呢？</p>
<h2 id="user-content-samevnode" data-id="heading-4">sameVnode</h2>
<p>我们来看一下sameVnode的实现。</p>
<pre><code class="hljs JavaScript copyable"><span class="hljs-comment">/*
  判断两个VNode节点是否是同一个节点，需要满足以下条件
  key相同
  tag（当前节点的标签名）相同
  isComment（是否为注释节点）相同
  是否data（当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息）都有定义
  当标签是&lt;input&gt;的时候，type必须相同
*/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sameVnode</span> (<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-keyword">return</span> (
    a.key === b.key &amp;&amp;
    a.tag === b.tag &amp;&amp;
    a.isComment === b.isComment &amp;&amp;
    isDef(a.data) === isDef(b.data) &amp;&amp;
    sameInputType(a, b)
  )
}

<span class="hljs-comment">// Some browsers do not support dynamically changing type for &lt;input&gt;</span>
<span class="hljs-comment">// so they need to be treated as different nodes</span>
<span class="hljs-comment">/*
  判断当标签是&lt;input&gt;的时候，type是否相同
  某些浏览器不支持动态修改&lt;input&gt;类型，所以他们被视为不同类型
*/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sameInputType</span> (<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-keyword">if</span> (a.tag !== <span class="hljs-string">'input'</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
  <span class="hljs-keyword">let</span> i
  <span class="hljs-keyword">const</span> typeA = isDef(i = a.data) &amp;&amp; isDef(i = i.attrs) &amp;&amp; i.type
  <span class="hljs-keyword">const</span> typeB = isDef(i = b.data) &amp;&amp; isDef(i = i.attrs) &amp;&amp; i.type
  <span class="hljs-keyword">return</span> typeA === typeB
}</code></pre><p>当两个VNode的tag、key、isComment都相同，并且同时定义或未定义data的时候，且如果标签为input则type必须相同。这时候这两个VNode则算sameVnode，可以直接进行patchVnode操作。</p>
<h2 id="user-content-patchvnode" data-id="heading-5">patchVnode</h2>
<p>还是先来看一下patchVnode的代码。</p>
<pre><code class="hljs JavaScript copyable">  <span class="hljs-comment">/*patch VNode节点*/</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">patchVnode</span> (<span class="hljs-params">oldVnode, vnode, insertedVnodeQueue, removeOnly</span>) </span>{
    <span class="hljs-comment">/*两个VNode节点相同则直接返回*/</span>
    <span class="hljs-keyword">if</span> (oldVnode === vnode) {
      <span class="hljs-keyword">return</span>
    }
    <span class="hljs-comment">// reuse element for static trees.</span>
    <span class="hljs-comment">// note we only do this if the vnode is cloned -</span>
    <span class="hljs-comment">// if the new node is not cloned it means the render functions have been</span>
    <span class="hljs-comment">// reset by the hot-reload-api and we need to do a proper re-render.</span>
    <span class="hljs-comment">/*
      如果新旧VNode都是静态的，同时它们的key相同（代表同一节点），
      并且新的VNode是clone或者是标记了once（标记v-once属性，只渲染一次），
      那么只需要替换elm以及componentInstance即可。
    */</span>
    <span class="hljs-keyword">if</span> (isTrue(vnode.isStatic) &amp;&amp;
        isTrue(oldVnode.isStatic) &amp;&amp;
        vnode.key === oldVnode.key &amp;&amp;
        (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.elm = oldVnode.elm
      vnode.componentInstance = oldVnode.componentInstance
      <span class="hljs-keyword">return</span>
    }
    <span class="hljs-keyword">let</span> i
    <span class="hljs-keyword">const</span> data = vnode.data
    <span class="hljs-keyword">if</span> (isDef(data) &amp;&amp; isDef(i = data.hook) &amp;&amp; isDef(i = i.prepatch)) {
      <span class="hljs-comment">/*i = data.hook.prepatch，如果存在的话，见"./create-component componentVNodeHooks"。*/</span>
      i(oldVnode, vnode)
    }
    <span class="hljs-keyword">const</span> elm = vnode.elm = oldVnode.elm
    <span class="hljs-keyword">const</span> oldCh = oldVnode.children
    <span class="hljs-keyword">const</span> ch = vnode.children
    <span class="hljs-keyword">if</span> (isDef(data) &amp;&amp; isPatchable(vnode)) {
      <span class="hljs-comment">/*调用update回调以及update钩子*/</span>
      <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
      <span class="hljs-keyword">if</span> (isDef(i = data.hook) &amp;&amp; isDef(i = i.update)) i(oldVnode, vnode)
    }
    <span class="hljs-comment">/*如果这个VNode节点没有text文本时*/</span>
    <span class="hljs-keyword">if</span> (isUndef(vnode.text)) {
      <span class="hljs-keyword">if</span> (isDef(oldCh) &amp;&amp; isDef(ch)) {
        <span class="hljs-comment">/*新老节点均有children子节点，则对子节点进行diff操作，调用updateChildren*/</span>
        <span class="hljs-keyword">if</span> (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isDef(ch)) {
        <span class="hljs-comment">/*如果老节点没有子节点而新节点存在子节点，先清空elm的文本内容，然后为当前节点加入子节点*/</span>
        <span class="hljs-keyword">if</span> (isDef(oldVnode.text)) nodeOps.setTextContent(elm, <span class="hljs-string">''</span>)
        addVnodes(elm, <span class="hljs-literal">null</span>, ch, <span class="hljs-number">0</span>, ch.length - <span class="hljs-number">1</span>, insertedVnodeQueue)
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isDef(oldCh)) {
        <span class="hljs-comment">/*当新节点没有子节点而老节点有子节点的时候，则移除所有ele的子节点*/</span>
        removeVnodes(elm, oldCh, <span class="hljs-number">0</span>, oldCh.length - <span class="hljs-number">1</span>)
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isDef(oldVnode.text)) {
        <span class="hljs-comment">/*当新老节点都无子节点的时候，只是文本的替换，因为这个逻辑中新节点text不存在，所以直接去除ele的文本*/</span>
        nodeOps.setTextContent(elm, <span class="hljs-string">''</span>)
      }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (oldVnode.text !== vnode.text) {
      <span class="hljs-comment">/*当新老节点text不一样时，直接替换这段文本*/</span>
      nodeOps.setTextContent(elm, vnode.text)
    }
    <span class="hljs-comment">/*调用postpatch钩子*/</span>
    <span class="hljs-keyword">if</span> (isDef(data)) {
      <span class="hljs-keyword">if</span> (isDef(i = data.hook) &amp;&amp; isDef(i = i.postpatch)) i(oldVnode, vnode)
    }
  }</code></pre><p>patchVnode的规则是这样的：</p>
<p>1.如果新旧VNode都是静态的，同时它们的key相同（代表同一节点），并且新的VNode是clone或者是标记了once（标记v-once属性，只渲染一次），那么只需要替换elm以及componentInstance即可。</p>
<p>2.新老节点均有children子节点，则对子节点进行diff操作，调用updateChildren，这个updateChildren也是diff的核心。</p>
<p>3.如果老节点没有子节点而新节点存在子节点，先清空老节点DOM的文本内容，然后为当前DOM节点加入子节点。</p>
<p>4.当新节点没有子节点而老节点有子节点的时候，则移除该DOM节点的所有子节点。</p>
<p>5.当新老节点都无子节点的时候，只是文本的替换。</p>
<h2 id="user-content-updatechildren" data-id="heading-6">updateChildren</h2>
<pre><code class="hljs JavaScript copyable">  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateChildren</span> (<span class="hljs-params">parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly</span>) </span>{
    <span class="hljs-keyword">let</span> oldStartIdx = <span class="hljs-number">0</span>
    <span class="hljs-keyword">let</span> newStartIdx = <span class="hljs-number">0</span>
    <span class="hljs-keyword">let</span> oldEndIdx = oldCh.length - <span class="hljs-number">1</span>
    <span class="hljs-keyword">let</span> oldStartVnode = oldCh[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">let</span> oldEndVnode = oldCh[oldEndIdx]
    <span class="hljs-keyword">let</span> newEndIdx = newCh.length - <span class="hljs-number">1</span>
    <span class="hljs-keyword">let</span> newStartVnode = newCh[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">let</span> newEndVnode = newCh[newEndIdx]
    <span class="hljs-keyword">let</span> oldKeyToIdx, idxInOld, elmToMove, refElm

    <span class="hljs-comment">// removeOnly is a special flag used only by &lt;transition-group&gt;</span>
    <span class="hljs-comment">// to ensure removed elements stay in correct relative positions</span>
    <span class="hljs-comment">// during leaving transitions</span>
    <span class="hljs-keyword">const</span> canMove = !removeOnly

    <span class="hljs-keyword">while</span> (oldStartIdx &lt;= oldEndIdx &amp;&amp; newStartIdx &lt;= newEndIdx) {
      <span class="hljs-keyword">if</span> (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx] <span class="hljs-comment">// Vnode has been moved left</span>
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx]
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (sameVnode(oldStartVnode, newStartVnode)) {
        <span class="hljs-comment">/*前四种情况其实是指定key的时候，判定为同一个VNode，则直接patchVnode即可，分别比较oldCh以及newCh的两头节点2*2=4种情况*/</span>
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
        oldStartVnode = oldCh[++oldStartIdx]
        newStartVnode = newCh[++newStartIdx]
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
        oldEndVnode = oldCh[--oldEndIdx]
        newEndVnode = newCh[--newEndIdx]
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (sameVnode(oldStartVnode, newEndVnode)) { <span class="hljs-comment">// Vnode moved right</span>
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
        canMove &amp;&amp; nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
        oldStartVnode = oldCh[++oldStartIdx]
        newEndVnode = newCh[--newEndIdx]
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (sameVnode(oldEndVnode, newStartVnode)) { <span class="hljs-comment">// Vnode moved left</span>
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
        canMove &amp;&amp; nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">/*
          生成一个key与旧VNode的key对应的哈希表（只有第一次进来undefined的时候会生成，也为后面检测重复的key值做铺垫）
          比如childre是这样的 [{xx: xx, key: 'key0'}, {xx: xx, key: 'key1'}, {xx: xx, key: 'key2'}]  beginIdx = 0   endIdx = 2  
          结果生成{key0: 0, key1: 1, key2: 2}
        */</span>
        <span class="hljs-keyword">if</span> (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
        <span class="hljs-comment">/*如果newStartVnode新的VNode节点存在key并且这个key在oldVnode中能找到则返回这个节点的idxInOld（即第几个节点，下标）*/</span>
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : <span class="hljs-literal">null</span>
        <span class="hljs-keyword">if</span> (isUndef(idxInOld)) { <span class="hljs-comment">// New element</span>
          <span class="hljs-comment">/*newStartVnode没有key或者是该key没有在老节点中找到则创建一个新的节点*/</span>
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)
          newStartVnode = newCh[++newStartIdx]
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-comment">/*获取同key的老节点*/</span>
          elmToMove = oldCh[idxInOld]
          <span class="hljs-comment">/* istanbul ignore if */</span>
          <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; !elmToMove) {
            <span class="hljs-comment">/*如果elmToMove不存在说明之前已经有新节点放入过这个key的DOM中，提示可能存在重复的key，确保v-for的时候item有唯一的key值*/</span>
            warn(
              <span class="hljs-string">'It seems there are duplicate keys that is causing an update error. '</span> +
              <span class="hljs-string">'Make sure each v-for item has a unique key.'</span>
            )
          }
          <span class="hljs-keyword">if</span> (sameVnode(elmToMove, newStartVnode)) {
            <span class="hljs-comment">/*Github:https://github.com/answershuto*/</span>
            <span class="hljs-comment">/*如果新VNode与得到的有相同key的节点是同一个VNode则进行patchVnode*/</span>
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue)
            <span class="hljs-comment">/*因为已经patchVnode进去了，所以将这个老节点赋值undefined，之后如果还有新节点与该节点key相同可以检测出来提示已有重复的key*/</span>
            oldCh[idxInOld] = <span class="hljs-literal">undefined</span>
            <span class="hljs-comment">/*当有标识位canMove实可以直接插入oldStartVnode对应的真实DOM节点前面*/</span>
            canMove &amp;&amp; nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm)
            newStartVnode = newCh[++newStartIdx]
          } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// same key but different element. treat as new element</span>
            <span class="hljs-comment">/*当新的VNode与找到的同样key的VNode不是sameVNode的时候（比如说tag不一样或者是有不一样type的input标签），创建一个新的节点*/</span>
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)
            newStartVnode = newCh[++newStartIdx]
          }
        }
      }
    }
    <span class="hljs-keyword">if</span> (oldStartIdx &gt; oldEndIdx) {
      <span class="hljs-comment">/*全部比较完成以后，发现oldStartIdx &gt; oldEndIdx的话，说明老节点已经遍历完了，新节点比老节点多，所以这时候多出来的新节点需要一个一个创建出来加入到真实DOM中*/</span>
      refElm = isUndef(newCh[newEndIdx + <span class="hljs-number">1</span>]) ? <span class="hljs-literal">null</span> : newCh[newEndIdx + <span class="hljs-number">1</span>].elm
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (newStartIdx &gt; newEndIdx) {
      <span class="hljs-comment">/*如果全部比较完成以后发现newStartIdx &gt; newEndIdx，则说明新节点已经遍历完了，老节点多余新节点，这个时候需要将多余的老节点从真实DOM中移除*/</span>
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
  }</code></pre><p>直接看源码可能比较难以滤清其中的关系，我们通过图来看一下。</p>
<p></p><figure><img alt="img" class="lazyload inited loaded" data-src="https://user-gold-cdn.xitu.io/2017/9/18/ed3fe3ef6c580e16711c39159ce87cd4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="800" data-height="600" src="https://user-gold-cdn.xitu.io/2017/9/18/ed3fe3ef6c580e16711c39159ce87cd4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"><figcaption>img</figcaption></figure><p></p>
<p>首先，在新老两个VNode节点的左右头尾两侧都有一个变量标记，在遍历过程中这几个变量都会向中间靠拢。当oldStartIdx &lt;= oldEndIdx或者newStartIdx &lt;= newEndIdx时结束循环。</p>
<p>索引与VNode节点的对应关系：<br>oldStartIdx =&gt; oldStartVnode<br>oldEndIdx =&gt; oldEndVnode<br>newStartIdx =&gt; newStartVnode<br>newEndIdx =&gt; newEndVnode</p>
<p>在遍历中，如果存在key，并且满足sameVnode，会将该DOM节点进行复用，否则则会创建一个新的DOM节点。</p>
<p>首先，oldStartVnode、oldEndVnode与newStartVnode、newEndVnode两两比较一共有2*2=4种比较方法。</p>
<p>当新老VNode节点的start或者end满足sameVnode时，也就是sameVnode(oldStartVnode, newStartVnode)或者sameVnode(oldEndVnode, newEndVnode)，直接将该VNode节点进行patchVnode即可。</p>
<p></p><figure><img alt="img" class="lazyload inited loaded" data-src="https://user-gold-cdn.xitu.io/2017/9/18/dbf1c71d42eaddc6de60301aad17c860?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="800" data-height="600" src="https://user-gold-cdn.xitu.io/2017/9/18/dbf1c71d42eaddc6de60301aad17c860?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"><figcaption>img</figcaption></figure><p></p>
<p>如果oldStartVnode与newEndVnode满足sameVnode，即sameVnode(oldStartVnode, newEndVnode)。</p>
<p>这时候说明oldStartVnode已经跑到了oldEndVnode后面去了，进行patchVnode的同时还需要将真实DOM节点移动到oldEndVnode的后面。</p>
<p></p><figure><img alt="img" class="lazyload inited loaded" data-src="https://user-gold-cdn.xitu.io/2017/9/18/0b5beb1c771c3965a77c787fe55a3b57?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="800" data-height="600" src="https://user-gold-cdn.xitu.io/2017/9/18/0b5beb1c771c3965a77c787fe55a3b57?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"><figcaption>img</figcaption></figure><p></p>
<p>如果oldEndVnode与newStartVnode满足sameVnode，即sameVnode(oldEndVnode, newStartVnode)。</p>
<p>这说明oldEndVnode跑到了oldStartVnode的前面，进行patchVnode的同时真实的DOM节点移动到了oldStartVnode的前面。</p>
<p></p><figure><img alt="img" class="lazyload inited loaded" data-src="https://user-gold-cdn.xitu.io/2017/9/18/dc9a1e0b27411b2585960e971559382f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="800" data-height="600" src="https://user-gold-cdn.xitu.io/2017/9/18/dc9a1e0b27411b2585960e971559382f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"><figcaption>img</figcaption></figure><p></p>
<p>如果以上情况均不符合，则通过createKeyToOldIdx会得到一个oldKeyToIdx，里面存放了一个key为旧的VNode，value为对应index序列的哈希表。从这个哈希表中可以找到是否有与newStartVnode一致key的旧的VNode节点，如果同时满足sameVnode，patchVnode的同时会将这个真实DOM（elmToMove）移动到oldStartVnode对应的真实DOM的前面。</p>
<p></p><figure><img alt="img" class="lazyload inited loaded" data-src="https://user-gold-cdn.xitu.io/2017/9/18/ed03e90b708939205236225c582e26fb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="800" data-height="600" src="https://user-gold-cdn.xitu.io/2017/9/18/ed03e90b708939205236225c582e26fb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"><figcaption>img</figcaption></figure><p></p>
<p>当然也有可能newStartVnode在旧的VNode节点找不到一致的key，或者是即便key相同却不是sameVnode，这个时候会调用createElm创建一个新的DOM节点。</p>
<p></p><figure><img alt="img" class="lazyload inited loaded" data-src="https://user-gold-cdn.xitu.io/2017/9/18/73241a7ea0b6f52c0df4d835a827f3b4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="800" data-height="600" src="https://user-gold-cdn.xitu.io/2017/9/18/73241a7ea0b6f52c0df4d835a827f3b4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"><figcaption>img</figcaption></figure><p></p>
<p>到这里循环已经结束了，那么剩下我们还需要处理多余或者不够的真实DOM节点。</p>
<p>1.当结束时oldStartIdx &gt; oldEndIdx，这个时候老的VNode节点已经遍历完了，但是新的节点还没有。说明了新的VNode节点实际上比老的VNode节点多，也就是比真实DOM多，需要将剩下的（也就是新增的）VNode节点插入到真实DOM节点中去，此时调用addVnodes（批量调用createElm的接口将这些节点加入到真实DOM中去）。</p>
<p></p><figure><img alt="img" class="lazyload inited loaded" data-src="https://user-gold-cdn.xitu.io/2017/9/18/22369d39d970155963bd71a1370e9b07?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="800" data-height="600" src="https://user-gold-cdn.xitu.io/2017/9/18/22369d39d970155963bd71a1370e9b07?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"><figcaption>img</figcaption></figure><p></p>
<p>2。同理，当newStartIdx &gt; newEndIdx时，新的VNode节点已经遍历完了，但是老的节点还有剩余，说明真实DOM节点多余了，需要从文档中删除，这时候调用removeVnodes将这些多余的真实DOM删除。</p>
<p></p><figure><img alt="img" class="lazyload inited loaded" data-src="https://user-gold-cdn.xitu.io/2017/9/18/c067fa75aa884a2c231d940de35ef7a1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="800" data-height="600" src="https://user-gold-cdn.xitu.io/2017/9/18/c067fa75aa884a2c231d940de35ef7a1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"><figcaption>img</figcaption></figure><p></p>
<h2 id="user-content-dom-" data-id="heading-7">DOM操作</h2>
<p>由于Vue使用了虚拟DOM，所以虚拟DOM可以在任何支持JavaScript语言的平台上操作，譬如说目前Vue支持的浏览器平台或是weex，在虚拟DOM的实现上是一致的。那么最后虚拟DOM如何映射到真实的DOM节点上呢？</p>
<p>Vue为平台做了一层适配层，浏览器平台见<a href="https://github.com/answershuto/learnVue/blob/master/vue-src/platforms/web/runtime/node-ops.js" target="_blank" rel="nofollow noopener noreferrer">/platforms/web/runtime/node-ops.js</a>以及weex平台见<a href="https://github.com/answershuto/learnVue/blob/master/vue-src/platforms/weex/runtime/node-ops.js" target="_blank" rel="nofollow noopener noreferrer">/platforms/weex/runtime/node-ops.js</a>。不同平台之间通过适配层对外提供相同的接口，虚拟DOM进行操作真实DOM节点的时候，只需要调用这些适配层的接口即可，而内部实现则不需要关心，它会根据平台的改变而改变。</p>
<p>现在又出现了一个问题，我们只是将虚拟DOM映射成了真实的DOM。那如何给这些DOM加入attr、class、style等DOM属性呢？</p>
<p>这要依赖于虚拟DOM的生命钩子。虚拟DOM提供了如下的钩子函数，分别在不同的时期会进行调用。</p>
<pre><code class="hljs JavaScript copyable"><span class="hljs-keyword">const</span> hooks = [<span class="hljs-string">'create'</span>, <span class="hljs-string">'activate'</span>, <span class="hljs-string">'update'</span>, <span class="hljs-string">'remove'</span>, <span class="hljs-string">'destroy'</span>]

<span class="hljs-comment">/*构建cbs回调函数，web平台上见/platforms/web/runtime/modules*/</span>
  <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; hooks.length; ++i) {
    cbs[hooks[i]] = []
    <span class="hljs-keyword">for</span> (j = <span class="hljs-number">0</span>; j &lt; modules.length; ++j) {
      <span class="hljs-keyword">if</span> (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]])
      }
    }
  }</code></pre><p>同理，也会根据不同平台有自己不同的实现，我们这里以Web平台为例。Web平台的钩子函数见<a href="https://github.com/answershuto/learnVue/tree/master/vue-src/platforms/web/runtime/modules" target="_blank" rel="nofollow noopener noreferrer">/platforms/web/runtime/modules</a>。里面有对attr、class、props、events、style以及transition（过渡状态）的DOM属性进行操作。</p>
<p>以attr为例，代码很简单。</p>
<pre><code class="hljs JavaScript copyable"><span class="hljs-comment">/* @flow */</span>

<span class="hljs-keyword">import</span> { isIE9 } <span class="hljs-keyword">from</span> <span class="hljs-string">'core/util/env'</span>

<span class="hljs-keyword">import</span> {
  extend,
  isDef,
  isUndef
} <span class="hljs-keyword">from</span> <span class="hljs-string">'shared/util'</span>

<span class="hljs-keyword">import</span> {
  isXlink,
  xlinkNS,
  getXlinkProp,
  isBooleanAttr,
  isEnumeratedAttr,
  isFalsyAttrValue
} <span class="hljs-keyword">from</span> <span class="hljs-string">'web/util/index'</span>

<span class="hljs-comment">/*更新attr*/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateAttrs</span> (<span class="hljs-params">oldVnode: VNodeWithData, vnode: VNodeWithData</span>) </span>{
  <span class="hljs-comment">/*如果旧的以及新的VNode节点均没有attr属性，则直接返回*/</span>
  <span class="hljs-keyword">if</span> (isUndef(oldVnode.data.attrs) &amp;&amp; isUndef(vnode.data.attrs)) {
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-keyword">let</span> key, cur, old
  <span class="hljs-comment">/*VNode节点对应的Dom实例*/</span>
  <span class="hljs-keyword">const</span> elm = vnode.elm
  <span class="hljs-comment">/*旧VNode节点的attr*/</span>
  <span class="hljs-keyword">const</span> oldAttrs = oldVnode.data.attrs || {}
  <span class="hljs-comment">/*新VNode节点的attr*/</span>
  <span class="hljs-keyword">let</span> attrs: any = vnode.data.attrs || {}
  <span class="hljs-comment">// clone observed objects, as the user probably wants to mutate it</span>
  <span class="hljs-comment">/*如果新的VNode的attr已经有__ob__（代表已经被Observe处理过了）， 进行深拷贝*/</span>
  <span class="hljs-keyword">if</span> (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs)
  }

  <span class="hljs-comment">/*遍历attr，不一致则替换*/</span>
  <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> attrs) {
    cur = attrs[key]
    old = oldAttrs[key]
    <span class="hljs-keyword">if</span> (old !== cur) {
      setAttr(elm, key, cur)
    }
  }
  <span class="hljs-comment">// #4391: in IE9, setting type can reset value for input[type=radio]</span>
  <span class="hljs-comment">/* istanbul ignore if */</span>
  <span class="hljs-keyword">if</span> (isIE9 &amp;&amp; attrs.value !== oldAttrs.value) {
    setAttr(elm, <span class="hljs-string">'value'</span>, attrs.value)
  }
  <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> oldAttrs) {
    <span class="hljs-keyword">if</span> (isUndef(attrs[key])) {
      <span class="hljs-keyword">if</span> (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key))
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key)
      }
    }
  }
}

<span class="hljs-comment">/*设置attr*/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setAttr</span> (<span class="hljs-params">el: Element, key: string, value: any</span>) </span>{
  <span class="hljs-keyword">if</span> (isBooleanAttr(key)) {
    <span class="hljs-comment">// set attribute for blank value</span>
    <span class="hljs-comment">// e.g. &lt;option disabled&gt;Select one&lt;/option&gt;</span>
    <span class="hljs-keyword">if</span> (isFalsyAttrValue(value)) {
      el.removeAttribute(key)
    } <span class="hljs-keyword">else</span> {
      el.setAttribute(key, key)
    }
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === <span class="hljs-string">'false'</span> ? <span class="hljs-string">'false'</span> : <span class="hljs-string">'true'</span>)
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isXlink(key)) {
    <span class="hljs-keyword">if</span> (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key))
    } <span class="hljs-keyword">else</span> {
      el.setAttributeNS(xlinkNS, key, value)
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">if</span> (isFalsyAttrValue(value)) {
      el.removeAttribute(key)
    } <span class="hljs-keyword">else</span> {
      el.setAttribute(key, value)
    }
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">create</span>: updateAttrs,
  <span class="hljs-attr">update</span>: updateAttrs
}</code></pre><p>attr只需要在create以及update钩子被调用时更新DOM的attr属性即可。</p>
<h2 id="user-content--" data-id="heading-8">关于</h2>
<p>作者：染陌 </p>
<p>Email：answershuto@gmail.com  or  answershuto@126.com</p>
<p>Github:  <a href="https://github.com/answershuto" target="_blank" rel="nofollow noopener noreferrer">github.com/answershuto</a></p>
<p>Blog：<a href="http://answershuto.github.io/" target="_blank" rel="nofollow noopener noreferrer">answershuto.github.io/</a></p>
<p>知乎专栏：<a href="https://zhuanlan.zhihu.com/ranmo" target="_blank" rel="nofollow noopener noreferrer">zhuanlan.zhihu.com/ranmo</a></p>
<p>掘金： <a href="https://juejin.im/user/289926769027053" target="_blank">juejin.im/user/289926…</a></p>
<p>osChina：<a href="https://my.oschina.net/u/3161824/blog" target="_blank" rel="nofollow noopener noreferrer">my.oschina.net/u/3161824/b…</a></p>
<p>转载请注明出处，谢谢。</p>
<p>欢迎关注我的公众号</p>
<p></p><figure><img alt="" class="lazyload inited loaded" data-src="https://user-gold-cdn.xitu.io/2017/9/16/0778541fcb3b8dd773027a2ebed663d9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="800" data-height="600" src="https://user-gold-cdn.xitu.io/2017/9/16/0778541fcb3b8dd773027a2ebed663d9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"><figcaption></figcaption></figure><p></p>
</div> <div data-v-78c9b824="" class="image-viewer-box"><!----></div></div>
