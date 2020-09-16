<div class="Post-RichTextContainer"><div class="RichText ztext Post-RichText"><p>在我们项目开发中，经常需要import或者export各种模块，那么有没有什么办法可以简化这种引入或者导出操作呢？答案是肯定的，下面就为大家介绍一下require.context</p><p>我们会这样引入组件：</p><div class="highlight"><pre><code class="language-js"><span class="kr">import</span> <span class="nx">A</span> <span class="nx">from</span> <span class="s1">'components/A'</span>
<span class="kr">import</span> <span class="nx">B</span> <span class="nx">from</span> <span class="s1">'components/B'</span>
<span class="kr">import</span> <span class="nx">C</span> <span class="nx">from</span> <span class="s1">'components/C'</span>
<span class="kr">import</span> <span class="nx">D</span> <span class="nx">from</span> <span class="s1">'components/D'</span>
<span class="c1">// ...
</span></code></pre></div><p>这样很蛋疼，因为每加一个组件，可能都要写这么一句，这样有规律的事，是否可以通过自动化完成?</p><p>看下Webpack [<a href="https://link.zhihu.com/?target=https%3A//webpack.js.org/guides/dependency-management/%23require-context" class=" wrap external" target="_blank" rel="nofollow noreferrer" data-za-detail-view-id="1043">Dependency Management | webpack</a>]</p><p><b>require.context</b></p><div class="highlight"><pre><code class="language-js"><span class="nx">require</span><span class="p">.</span><span class="nx">context</span><span class="p">(</span><span class="nx">directory</span><span class="p">,</span> <span class="nx">useSubdirectories</span><span class="p">,</span> <span class="nx">regExp</span><span class="p">)</span>
</code></pre></div><ol><li>directory: 要查找的文件路径</li><li>useSubdirectories: 是否查找子目录</li><li>regExp: 要匹配文件的正则</li></ol><p><b>用法</b></p><div class="highlight"><pre><code class="language-js"><span class="nx">require</span><span class="p">.</span><span class="nx">context</span><span class="p">(</span><span class="s1">'./components/'</span><span class="p">,</span> <span class="kc">true</span><span class="p">,</span> <span class="sr">/\.js$/</span><span class="p">)</span>
</code></pre></div><figure data-size="normal"><noscript><img src="https://pic2.zhimg.com/v2-8119608356b81fceb42b7e8317c84eaa_b.jpg" data-size="normal" data-rawwidth="568" data-rawheight="302" class="origin_image zh-lightbox-thumb" width="568" data-original="https://pic2.zhimg.com/v2-8119608356b81fceb42b7e8317c84eaa_r.jpg"/></noscript><img src="https://pic2.zhimg.com/80/v2-8119608356b81fceb42b7e8317c84eaa_720w.jpg" data-size="normal" data-rawwidth="568" data-rawheight="302" class="origin_image zh-lightbox-thumb lazy" width="568" data-original="https://pic2.zhimg.com/v2-8119608356b81fceb42b7e8317c84eaa_r.jpg" data-actualsrc="https://pic2.zhimg.com/v2-8119608356b81fceb42b7e8317c84eaa_b.jpg" data-lazy-status="ok"><figcaption>目录结构</figcaption></figure><p>上面调用方法，到底返回的是什么？</p><div class="highlight"><pre><code class="language-js"><span class="kd">var</span> <span class="nx">map</span> <span class="o">=</span> <span class="p">{</span>
	<span class="s2">"./A.js"</span><span class="o">:</span> <span class="s2">"./src/components/test/components/A.js"</span><span class="p">,</span>
	<span class="s2">"./B.js"</span><span class="o">:</span> <span class="s2">"./src/components/test/components/B.js"</span><span class="p">,</span>
	<span class="s2">"./C.js"</span><span class="o">:</span> <span class="s2">"./src/components/test/components/C.js"</span><span class="p">,</span>
	<span class="s2">"./D.js"</span><span class="o">:</span> <span class="s2">"./src/components/test/components/D.js"</span>
<span class="p">};</span>


<span class="kd">function</span> <span class="nx">webpackContext</span><span class="p">(</span><span class="nx">req</span><span class="p">)</span> <span class="p">{</span>
	<span class="kd">var</span> <span class="nx">id</span> <span class="o">=</span> <span class="nx">webpackContextResolve</span><span class="p">(</span><span class="nx">req</span><span class="p">);</span>
	<span class="k">return</span> <span class="nx">__webpack_require__</span><span class="p">(</span><span class="nx">id</span><span class="p">);</span>
<span class="p">}</span>
<span class="kd">function</span> <span class="nx">webpackContextResolve</span><span class="p">(</span><span class="nx">req</span><span class="p">)</span> <span class="p">{</span>
	<span class="kd">var</span> <span class="nx">id</span> <span class="o">=</span> <span class="nx">map</span><span class="p">[</span><span class="nx">req</span><span class="p">];</span>
	<span class="k">if</span><span class="p">(</span><span class="o">!</span><span class="p">(</span><span class="nx">id</span> <span class="o">+</span> <span class="mi">1</span><span class="p">))</span> <span class="p">{</span> <span class="c1">// check for number or string
</span><span class="c1"></span>		<span class="kd">var</span> <span class="nx">e</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Error</span><span class="p">(</span><span class="s2">"Cannot find module '"</span> <span class="o">+</span> <span class="nx">req</span> <span class="o">+</span> <span class="s2">"'"</span><span class="p">);</span>
		<span class="nx">e</span><span class="p">.</span><span class="nx">code</span> <span class="o">=</span> <span class="s1">'MODULE_NOT_FOUND'</span><span class="p">;</span>
		<span class="k">throw</span> <span class="nx">e</span><span class="p">;</span>
	<span class="p">}</span>
	<span class="k">return</span> <span class="nx">id</span><span class="p">;</span>
<span class="p">}</span>
<span class="nx">webpackContext</span><span class="p">.</span><span class="nx">keys</span> <span class="o">=</span> <span class="kd">function</span> <span class="nx">webpackContextKeys</span><span class="p">()</span> <span class="p">{</span>
	<span class="k">return</span> <span class="nb">Object</span><span class="p">.</span><span class="nx">keys</span><span class="p">(</span><span class="nx">map</span><span class="p">);</span>
<span class="p">};</span>
<span class="nx">webpackContext</span><span class="p">.</span><span class="nx">resolve</span> <span class="o">=</span> <span class="nx">webpackContextResolve</span><span class="p">;</span>
<span class="nx">module</span><span class="p">.</span><span class="nx">exports</span> <span class="o">=</span> <span class="nx">webpackContext</span><span class="p">;</span>
<span class="nx">webpackContext</span><span class="p">.</span><span class="nx">id</span> <span class="o">=</span> <span class="s2">"./src/components/test/components sync recursive \\.js$"</span><span class="p">;</span>
</code></pre></div><p>代码很简单，require.context执行后，返回一个方法webpackContext，这个方法又返回一个__webpack_require__，这个__webpack_require__就相当于require或者import。同时webpackContext还有二个静态方法keys与resolve，一个id属性。</p><ol><li>keys: 返回匹配成功模块的名字组成的数组</li><li>resolve: 接受一个参数request，request为test文件夹下面匹配文件的相对路径，返回这个匹配文件相对于整个工程的相对路径</li><li>id: 执行环境的id，返回的是一个字符串，主要用在module.hot.accept，应该是热加载</li></ol><p>看下keys是作用</p><div class="highlight"><pre><code class="language-js"><span class="kr">const</span> <span class="nx">ctx</span> <span class="o">=</span> <span class="nx">require</span><span class="p">.</span><span class="nx">context</span><span class="p">(</span><span class="s1">'./components/'</span><span class="p">,</span> <span class="kc">true</span><span class="p">,</span> <span class="sr">/\.js$/</span><span class="p">)</span>
<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">ctx</span><span class="p">.</span><span class="nx">keys</span><span class="p">())</span>
<span class="c1">// ["./A.js", "./B.js", "./C.js", "./D.js"]
</span></code></pre></div><p>其实就是</p><div class="highlight"><pre><code class="language-js"><span class="kd">var</span> <span class="nx">map</span> <span class="o">=</span> <span class="p">{</span>
	<span class="s2">"./A.js"</span><span class="o">:</span> <span class="s2">"./src/components/test/components/A.js"</span><span class="p">,</span>
	<span class="s2">"./B.js"</span><span class="o">:</span> <span class="s2">"./src/components/test/components/B.js"</span><span class="p">,</span>
	<span class="s2">"./C.js"</span><span class="o">:</span> <span class="s2">"./src/components/test/components/C.js"</span><span class="p">,</span>
	<span class="s2">"./D.js"</span><span class="o">:</span> <span class="s2">"./src/components/test/components/D.js"</span>
<span class="p">};</span>

<span class="nb">Object</span><span class="p">.</span><span class="nx">keys</span><span class="p">(</span><span class="nx">map</span><span class="p">)</span>
</code></pre></div><p>只不过map是模块内部变量，无法直接访问，所以通过其实提供的keys方法访问</p><p>那么如何引入ABCD组件呢？</p><div class="highlight"><pre><code class="language-js"><span class="kr">const</span> <span class="nx">ctx</span> <span class="o">=</span> <span class="nx">require</span><span class="p">.</span><span class="nx">context</span><span class="p">(</span><span class="s1">'./components/'</span><span class="p">,</span> <span class="kc">true</span><span class="p">,</span> <span class="sr">/\.js$/</span><span class="p">)</span>
<span class="kr">const</span> <span class="nx">map</span> <span class="o">=</span> <span class="p">{}</span>
<span class="k">for</span> <span class="p">(</span><span class="kr">const</span> <span class="nx">key</span> <span class="k">of</span> <span class="nx">ctx</span><span class="p">.</span><span class="nx">keys</span><span class="p">())</span> <span class="p">{</span>
  <span class="nx">map</span><span class="p">[</span><span class="nx">key</span><span class="p">]</span> <span class="o">=</span> <span class="nx">ctx</span><span class="p">(</span><span class="nx">key</span><span class="p">)</span>
<span class="p">}</span>
<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">map</span><span class="p">)</span>
</code></pre></div><figure data-size="normal"><noscript><img src="https://picb.zhimg.com/v2-8c03e6ec4cea39da353e63134937ca64_b.png" data-caption="" data-size="normal" data-rawwidth="1624" data-rawheight="214" class="origin_image zh-lightbox-thumb" width="1624" data-original="https://picb.zhimg.com/v2-8c03e6ec4cea39da353e63134937ca64_r.jpg"/></noscript><img src="https://picb.zhimg.com/80/v2-8c03e6ec4cea39da353e63134937ca64_720w.png" data-caption="" data-size="normal" data-rawwidth="1624" data-rawheight="214" class="origin_image zh-lightbox-thumb lazy" width="1624" data-original="https://picb.zhimg.com/v2-8c03e6ec4cea39da353e63134937ca64_r.jpg" data-actualsrc="https://picb.zhimg.com/v2-8c03e6ec4cea39da353e63134937ca64_b.png" data-lazy-status="ok"></figure><p>看到了吧！成功import进来了，但'./A.js'这样的key有点不太好，自己可以处理字符串生成自己想要的key</p><p class="ztext-empty-paragraph"><br></p><p>可以优化一下，生成一个公共的方法</p><div class="highlight"><pre><code class="language-js"><span class="kr">const</span> <span class="nx">importAll</span> <span class="o">=</span> <span class="nx">context</span> <span class="p">=&gt;</span> <span class="p">{</span>
  <span class="kr">const</span> <span class="nx">map</span> <span class="o">=</span> <span class="p">{}</span>

  <span class="k">for</span> <span class="p">(</span><span class="kr">const</span> <span class="nx">key</span> <span class="k">of</span> <span class="nx">context</span><span class="p">.</span><span class="nx">keys</span><span class="p">())</span> <span class="p">{</span>
    <span class="kr">const</span> <span class="nx">keyArr</span> <span class="o">=</span> <span class="nx">key</span><span class="p">.</span><span class="nx">split</span><span class="p">(</span><span class="s1">'/'</span><span class="p">)</span>
    <span class="nx">keyArr</span><span class="p">.</span><span class="nx">shift</span><span class="p">()</span> <span class="c1">// 移除.
</span><span class="c1"></span>    <span class="nx">map</span><span class="p">[</span><span class="nx">keyArr</span><span class="p">.</span><span class="nx">join</span><span class="p">(</span><span class="s1">'.'</span><span class="p">).</span><span class="nx">replace</span><span class="p">(</span><span class="sr">/\.js$/g</span><span class="p">,</span> <span class="s1">''</span><span class="p">)]</span> <span class="o">=</span> <span class="nx">context</span><span class="p">(</span><span class="nx">key</span><span class="p">)</span>
  <span class="p">}</span>

  <span class="k">return</span> <span class="nx">map</span>
<span class="p">}</span>

<span class="kr">export</span> <span class="k">default</span> <span class="nx">importAll</span>
</code></pre></div><p>使用</p><div class="highlight"><pre><code class="language-js"><span class="kr">import</span> <span class="nx">importAll</span> <span class="nx">from</span> <span class="s1">'$common/importAll'</span>
<span class="kr">export</span> <span class="k">default</span> <span class="nx">importAll</span><span class="p">(</span><span class="nx">require</span><span class="p">.</span><span class="nx">context</span><span class="p">(</span><span class="s1">'./'</span><span class="p">,</span> <span class="kc">true</span><span class="p">,</span> <span class="sr">/\.js$/</span><span class="p">))</span>
</code></pre></div><p></p></div></div>