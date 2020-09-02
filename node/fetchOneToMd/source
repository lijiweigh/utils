<table class="d-block" data-paste-markdown-skip="">
  <tbody class="d-block">
    <tr class="d-block">
      <td class="d-block comment-body markdown-body  js-comment-body">
          <h2>引言（文末有福利）<g-emoji class="g-emoji" alias="snowboarder" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f3c2.png">🏂</g-emoji></h2>
<p>算法一直是大厂前端面试常问的一块，而大家往往准备这方面的面试都是通过<code>leetcode</code>刷题。</p>
<p>我特地整理了几道<code>leetcode</code>中「<code>很有意思</code>」而且非常「<code>高频</code>」的算法题目，分别给出了思路分析（带图解）和代码实现。</p>
<p>认真仔细的阅读完本文，相信对于你在算法方面的面试一定会有不小的帮助！<g-emoji class="g-emoji" alias="cowboy_hat_face" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f920.png">🤠</g-emoji></p>
<h2>两数之和 <g-emoji class="g-emoji" alias="fox_face" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f98a.png">🦊</g-emoji></h2>
<blockquote>
<p>题目难度<code>easy</code>，涉及到的算法知识有数组、哈希表</p>
</blockquote>
<h3>题目描述</h3>
<p>给定一个整数数组 <code>nums</code>&nbsp; 和一个目标值 <code>target</code>，请你在该数组中找出和为目标值的那<code>两个</code>整数，并返回他们的数组下标。</p>
<p>你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。</p>
<p>示例：</p>
<div class="highlight highlight-source-js"><pre><span class="pl-s1">给定</span> <span class="pl-s1">nums</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-c1">2</span><span class="pl-kos">,</span> <span class="pl-c1">7</span><span class="pl-kos">,</span> <span class="pl-c1">11</span><span class="pl-kos">,</span> <span class="pl-c1">15</span><span class="pl-kos">]</span><span class="pl-kos">,</span> <span class="pl-s1">target</span> <span class="pl-c1">=</span> <span class="pl-c1">9</span>

<span class="pl-s1">因为</span> <span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-c1">0</span><span class="pl-kos">]</span> <span class="pl-c1">+</span> <span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-c1">1</span><span class="pl-kos">]</span> <span class="pl-c1">=</span> <span class="pl-c1">2</span> <span class="pl-c1">+</span> <span class="pl-c1">7</span> <span class="pl-c1">=</span> <span class="pl-c1">9</span>
<span class="pl-s1">所以返回</span> <span class="pl-kos">[</span><span class="pl-c1">0</span><span class="pl-kos">,</span> <span class="pl-c1">1</span><span class="pl-kos">]</span></pre></div>
<h3>思路分析</h3>
<p>大多数同学看到这道题目，心中肯定会想：这道题目太简单了，不就两层遍历嘛：两层循环来遍历同一个数组；第一层循环遍历的值记为<code>a</code>，第二层循环时遍历的值记为<code>b</code>；若<code>a+b = 目标值</code>，那么<code>a</code>和<code>b</code>对应的数组下标就是我们想要的答案。</p>
<p>这种解法没毛病，但有没有优化的方案呢？<g-emoji class="g-emoji" alias="thinking" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f914.png">🤔</g-emoji></p>
<p>要知道两层循环很多情况下都意味着<code>O(n^2)</code> 的复杂度，这个复杂度非常容易导致你的算法超时。即便没有超时，在明明有一层遍历解法的情况下，你写了两层遍历，面试官也会对你的印象分大打折扣。<g-emoji class="g-emoji" alias="face_with_thermometer" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f912.png">🤒</g-emoji></p>
<p>其实我们可以在遍历数组的过程中，增加一个<code>Map</code>结构来存储已经遍历过的数字及其对应的索引值。然后每遍历到一个新数字的时候，都回到<code>Map</code>里去查询<code>targetNum</code>与该数的差值是否已经在前面的数字中出现过了。若出现过，那么答案已然显现，我们就不必再往下走了。</p>
<p>我们就以本题中的例子结合图片来说明一下上面提到的这种思路：</p>
<ul>
<li>这里用对象<code>diffs</code>来模拟<code>map</code>结构：<br>
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/50790c5423dcdbf36b021b7ec6e98933d1863390/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f65363939376239352d316234372d343338342d626332372d3032363133366233356331652e706e67"><img src="https://camo.githubusercontent.com/50790c5423dcdbf36b021b7ec6e98933d1863390/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f65363939376239352d316234372d343338342d626332372d3032363133366233356331652e706e67" alt="" data-canonical-src="https://imgkr.cn-bj.ufileos.com/e6997b95-1b47-4384-bc27-026136b35c1e.png" style="max-width:100%;"></a><br>
首先遍历数组第一个元素，此时<code>key</code>为 2，<code>value</code>为索引 0</li>
</ul>
<ul>
<li>往下遍历，遇到了 7:<br>
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/f9de3dd50b5c2a37a330e04ff5a69da1c7d739c7/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f34346164623764652d656663312d346330302d616332612d3636663465623932316662612e706e67"><img src="https://camo.githubusercontent.com/f9de3dd50b5c2a37a330e04ff5a69da1c7d739c7/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f34346164623764652d656663312d346330302d616332612d3636663465623932316662612e706e67" alt="" data-canonical-src="https://imgkr.cn-bj.ufileos.com/44adb7de-efc1-4c00-ac2a-66f4eb921fba.png" style="max-width:100%;"></a><br>
计算<code>targetNum</code>和 7 的差值为 2，去<code>diffs</code>中检索 2 这个<code>key</code>，发现是之前出现过的值。那么本题的答案就出来了！</li>
</ul>
<h3>代码实现</h3>
<div class="highlight highlight-source-js"><pre><span class="pl-c">/**</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">number[]</span>} nums</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">number</span>} target</span>
<span class="pl-c"> * <span class="pl-k">@return</span> {<span class="pl-smi">number[]</span>}</span>
<span class="pl-c"> */</span>
<span class="pl-k">const</span> <span class="pl-en">twoSum</span> <span class="pl-c1">=</span> <span class="pl-k">function</span> <span class="pl-kos">(</span><span class="pl-s1">nums</span><span class="pl-kos">,</span> <span class="pl-s1">target</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
  <span class="pl-k">const</span> <span class="pl-s1">diffs</span> <span class="pl-c1">=</span> <span class="pl-kos">{</span><span class="pl-kos">}</span><span class="pl-kos">;</span>
  <span class="pl-c">// 缓存数组长度</span>
  <span class="pl-k">const</span> <span class="pl-s1">len</span> <span class="pl-c1">=</span> <span class="pl-s1">nums</span><span class="pl-kos">.</span><span class="pl-c1">length</span><span class="pl-kos">;</span>
  <span class="pl-c">// 遍历数组</span>
  <span class="pl-k">for</span> <span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">i</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span><span class="pl-kos">;</span> <span class="pl-s1">i</span> <span class="pl-c1">&lt;</span> <span class="pl-s1">len</span><span class="pl-kos">;</span> <span class="pl-s1">i</span><span class="pl-c1">++</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-c">// 判断当前值对应的 target 差值是否存在</span>
    <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-s1">diffs</span><span class="pl-kos">[</span><span class="pl-s1">target</span> <span class="pl-c1">-</span> <span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-kos">]</span> !== <span class="pl-c1">undefined</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
      <span class="pl-c">// 若有对应差值，那么得到答案</span>
      <span class="pl-k">return</span> <span class="pl-kos">[</span><span class="pl-s1">diffs</span><span class="pl-kos">[</span><span class="pl-s1">target</span> <span class="pl-c1">-</span> <span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-kos">]</span><span class="pl-kos">,</span> <span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-kos">;</span>
    <span class="pl-kos">}</span>
    <span class="pl-c">// 若没有对应差值，则记录当前值</span>
    <span class="pl-s1">diffs</span><span class="pl-kos">[</span><span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-kos">]</span> <span class="pl-c1">=</span> <span class="pl-s1">i</span><span class="pl-kos">;</span>
  <span class="pl-kos">}</span>
<span class="pl-kos">}</span><span class="pl-kos">;</span></pre></div>
<h2>三数之和 <g-emoji class="g-emoji" alias="lion" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f981.png">🦁</g-emoji></h2>
<blockquote>
<p>题目难度<code>medium</code>，涉及到的算法知识有数组、双指针</p>
</blockquote>
<h3>题目描述</h3>
<p>给你一个包含<code>n</code>个整数的数组<code>nums</code>，判断<code>nums</code>中是否存在三个元素<code>a</code>，<code>b</code>，<code>c</code> ，使得<code>a + b + c = 0</code>。请你找出所有满足条件且不重复的三元组。</p>
<p>注意：答案中不可以包含重复的三元组。</p>
<p>示例：</p>
<div class="highlight highlight-source-js"><pre><span class="pl-s1">给定数组</span> <span class="pl-s1">nums</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-c1">-</span><span class="pl-c1">1</span><span class="pl-kos">,</span> <span class="pl-c1">0</span><span class="pl-kos">,</span> <span class="pl-c1">1</span><span class="pl-kos">,</span> <span class="pl-c1">2</span><span class="pl-kos">,</span> <span class="pl-c1">-</span><span class="pl-c1">1</span><span class="pl-kos">,</span> <span class="pl-c1">-</span><span class="pl-c1">4</span><span class="pl-kos">]</span><span class="pl-kos"></span><span class="pl-s1">，</span>

<span class="pl-s1">满足要求的三元组集合为：</span>
<span class="pl-kos">[</span>
  <span class="pl-kos">[</span><span class="pl-c1">-</span><span class="pl-c1">1</span><span class="pl-kos">,</span> <span class="pl-c1">0</span><span class="pl-kos">,</span> <span class="pl-c1">1</span><span class="pl-kos">]</span><span class="pl-kos">,</span>
  <span class="pl-kos">[</span><span class="pl-c1">-</span><span class="pl-c1">1</span><span class="pl-kos">,</span> <span class="pl-c1">-</span><span class="pl-c1">1</span><span class="pl-kos">,</span> <span class="pl-c1">2</span><span class="pl-kos">]</span>
<span class="pl-kos">]</span></pre></div>
<h3>思路分析</h3>
<p>和上面的<code>两数之和</code>一样，如果不认真思考，最快的方式可能就是多层遍历了。但有了前车之鉴，我们同样可以把求和问题变为求差问题：固定其中一个数，在剩下的数中寻找是否有两个数的和这个固定数相加是等于 0 的。</p>
<p>这里我们采用<code>双指针法</code>来解决问题，相比三层循环，效率会大大提升。</p>
<blockquote>
<p>双指针法的适用范围比较广，一般像求和、比大小的都可以用它来解决。但是有一个前提：数组必须有序</p>
</blockquote>
<p>因此我们的第一步就是先将数组进行排序：</p>
<div class="highlight highlight-source-js"><pre><span class="pl-c">// 给 nums 排序</span>
<span class="pl-s1">nums</span> <span class="pl-c1">=</span> <span class="pl-s1">nums</span><span class="pl-kos">.</span><span class="pl-en">sort</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">a</span><span class="pl-kos">,</span><span class="pl-s1">b</span><span class="pl-kos">)</span><span class="pl-c1">=&gt;</span><span class="pl-kos">{</span>
    <span class="pl-k">return</span> <span class="pl-s1">a</span><span class="pl-c1">-</span><span class="pl-s1">b</span>
<span class="pl-kos">}</span><span class="pl-kos">)</span></pre></div>
<p>然后对数组进行遍历，每遍历到哪个数字，就固定当前的数字。同时左指针指向该数字后面的紧邻的那个数字，右指针指向数组末尾。然后左右指针分别向中间靠拢：<br>
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/5af7cc6e6db85b9bd5d9bbef70d8c8d07b12a1d0/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f37663938613533322d323032302d346661332d383131322d3433653731336136373866662e706e67"><img src="https://camo.githubusercontent.com/5af7cc6e6db85b9bd5d9bbef70d8c8d07b12a1d0/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f37663938613533322d323032302d346661332d383131322d3433653731336136373866662e706e67" alt="" data-canonical-src="https://imgkr.cn-bj.ufileos.com/7f98a532-2020-4fa3-8112-43e713a678ff.png" style="max-width:100%;"></a><br>
每次指针移动一次位置，就计算一下两个指针指向数字之和加上固定的那个数之后，是否等于 0。如果是，那么我们就得到了一个目标组合；否则，分两种情况来看：</p>
<ul>
<li>相加之和大于 0，说明右侧的数偏大了，右指针左移</li>
<li>相加之和小于 0，说明左侧的数偏小了，左指针右移</li>
</ul>
<h3>代码实现</h3>
<div class="highlight highlight-source-js"><pre><span class="pl-c">/**</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">number[]</span>} nums</span>
<span class="pl-c"> * <span class="pl-k">@return</span> {<span class="pl-smi">number[][]</span>}</span>
<span class="pl-c"> */</span>
<span class="pl-k">const</span> <span class="pl-en">threeSum</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">nums</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-c">// 用于存放结果数组</span>
    <span class="pl-k">let</span> <span class="pl-s1">res</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-kos">]</span>
    <span class="pl-c">// 目标值为0</span>
    <span class="pl-k">let</span> <span class="pl-s1">sum</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span>
    <span class="pl-c">// 给 nums 排序</span>
    <span class="pl-s1">nums</span> <span class="pl-c1">=</span> <span class="pl-s1">nums</span><span class="pl-kos">.</span><span class="pl-en">sort</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">a</span><span class="pl-kos">,</span><span class="pl-s1">b</span><span class="pl-kos">)</span><span class="pl-c1">=&gt;</span><span class="pl-kos">{</span>
        <span class="pl-k">return</span> <span class="pl-s1">a</span><span class="pl-c1">-</span><span class="pl-s1">b</span>
    <span class="pl-kos">}</span><span class="pl-kos">)</span>
    <span class="pl-c">// 缓存数组长度</span>
    <span class="pl-k">const</span> <span class="pl-s1">len</span> <span class="pl-c1">=</span> <span class="pl-s1">nums</span><span class="pl-kos">.</span><span class="pl-c1">length</span>
    <span class="pl-k">for</span><span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">i</span><span class="pl-c1">=</span><span class="pl-c1">0</span><span class="pl-kos">;</span><span class="pl-s1">i</span><span class="pl-c1">&lt;</span><span class="pl-s1">len</span><span class="pl-c1">-</span><span class="pl-c1">2</span><span class="pl-kos">;</span><span class="pl-s1">i</span><span class="pl-c1">++</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-c">// 左指针 j</span>
        <span class="pl-k">let</span> <span class="pl-s1">j</span><span class="pl-c1">=</span><span class="pl-s1">i</span><span class="pl-c1">+</span><span class="pl-c1">1</span>
        <span class="pl-c">// 右指针k</span>
        <span class="pl-k">let</span> <span class="pl-s1">k</span><span class="pl-c1">=</span><span class="pl-s1">len</span><span class="pl-c1">-</span><span class="pl-c1">1</span>
        <span class="pl-c">// 如果遇到重复的数字，则跳过</span>
        <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">i</span><span class="pl-c1">&gt;</span><span class="pl-c1">0</span><span class="pl-c1">&amp;&amp;</span><span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-c1">===</span><span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-c1">-</span><span class="pl-c1">1</span><span class="pl-kos">]</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-k">continue</span>
        <span class="pl-kos">}</span>
        <span class="pl-k">while</span><span class="pl-kos">(</span><span class="pl-s1">j</span><span class="pl-c1">&lt;</span><span class="pl-s1">k</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-c">// 三数之和小于0，左指针前进</span>
            <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-c1">+</span><span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">j</span><span class="pl-kos">]</span><span class="pl-c1">+</span><span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">k</span><span class="pl-kos">]</span><span class="pl-c1">&lt;</span><span class="pl-c1">0</span><span class="pl-kos">)</span><span class="pl-kos">{</span>
                <span class="pl-s1">j</span><span class="pl-c1">++</span>
               <span class="pl-c">// 处理左指针元素重复的情况</span>
               <span class="pl-k">while</span><span class="pl-kos">(</span><span class="pl-s1">j</span><span class="pl-c1">&lt;</span><span class="pl-s1">k</span><span class="pl-c1">&amp;&amp;</span><span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">j</span><span class="pl-kos">]</span><span class="pl-c1">===</span><span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">j</span><span class="pl-c1">-</span><span class="pl-c1">1</span><span class="pl-kos">]</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
                    <span class="pl-s1">j</span><span class="pl-c1">++</span>
                <span class="pl-kos">}</span>
            <span class="pl-kos">}</span> <span class="pl-k">else</span> <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-c1">+</span><span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">j</span><span class="pl-kos">]</span><span class="pl-c1">+</span><span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">k</span><span class="pl-kos">]</span><span class="pl-c1">&gt;</span><span class="pl-c1">0</span><span class="pl-kos">)</span><span class="pl-kos">{</span>
                <span class="pl-c">// 三数之和大于0，右指针后退</span>
                <span class="pl-s1">k</span><span class="pl-c1">--</span>

               <span class="pl-c">// 处理右指针元素重复的情况</span>
               <span class="pl-k">while</span><span class="pl-kos">(</span><span class="pl-s1">j</span><span class="pl-c1">&lt;</span><span class="pl-s1">k</span><span class="pl-c1">&amp;&amp;</span><span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">k</span><span class="pl-kos">]</span><span class="pl-c1">===</span><span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">k</span><span class="pl-c1">+</span><span class="pl-c1">1</span><span class="pl-kos">]</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
                    <span class="pl-s1">k</span><span class="pl-c1">--</span>
                <span class="pl-kos">}</span>
            <span class="pl-kos">}</span> <span class="pl-k">else</span> <span class="pl-kos">{</span>
                <span class="pl-c">// 得到目标数字组合，推入结果数组</span>
                <span class="pl-s1">res</span><span class="pl-kos">.</span><span class="pl-en">push</span><span class="pl-kos">(</span><span class="pl-kos">[</span><span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-kos">,</span><span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">j</span><span class="pl-kos">]</span><span class="pl-kos">,</span><span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">k</span><span class="pl-kos">]</span><span class="pl-kos">]</span><span class="pl-kos">)</span>

                <span class="pl-c">// 左右指针一起前进</span>
                <span class="pl-s1">j</span><span class="pl-c1">++</span>
                <span class="pl-s1">k</span><span class="pl-c1">--</span>

                <span class="pl-c">// 若左指针元素重复，跳过</span>
                <span class="pl-k">while</span><span class="pl-kos">(</span><span class="pl-s1">j</span><span class="pl-c1">&lt;</span><span class="pl-s1">k</span><span class="pl-c1">&amp;&amp;</span><span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">j</span><span class="pl-kos">]</span><span class="pl-c1">===</span><span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">j</span><span class="pl-c1">-</span><span class="pl-c1">1</span><span class="pl-kos">]</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
                    <span class="pl-s1">j</span><span class="pl-c1">++</span>
                <span class="pl-kos">}</span>

               <span class="pl-c">// 若右指针元素重复，跳过</span>
               <span class="pl-k">while</span><span class="pl-kos">(</span><span class="pl-s1">j</span><span class="pl-c1">&lt;</span><span class="pl-s1">k</span><span class="pl-c1">&amp;&amp;</span><span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">k</span><span class="pl-kos">]</span><span class="pl-c1">===</span><span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">k</span><span class="pl-c1">+</span><span class="pl-c1">1</span><span class="pl-kos">]</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
                    <span class="pl-s1">k</span><span class="pl-c1">--</span>
                <span class="pl-kos">}</span>
            <span class="pl-kos">}</span>
        <span class="pl-kos">}</span>
    <span class="pl-kos">}</span>

    <span class="pl-c">// 返回结果数组</span>
    <span class="pl-k">return</span> <span class="pl-s1">res</span>
<span class="pl-kos">}</span><span class="pl-kos">;</span></pre></div>
<h2>盛最多水的容器 <g-emoji class="g-emoji" alias="tumbler_glass" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f943.png">🥃</g-emoji></h2>
<blockquote>
<p>题目难度<code>medium</code>，涉及到的算法知识有数组、双指针</p>
</blockquote>
<h3>题目描述</h3>
<p>给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 &nbsp;(i,&nbsp;ai) 。在坐标内画 n 条垂直线，垂直线 i&nbsp; 的两个端点分别为 &nbsp;(i,&nbsp;ai) 和 (i, 0)。找出其中的两条线，使得它们与 &nbsp;x&nbsp; 轴共同构成的容器可以容纳最多的水。</p>
<p>说明：你不能倾斜容器，且 &nbsp;n&nbsp; 的值至少为 2。<br>
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/74706caca8e040b5ac2a4d675522049ece6d11be/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f31653337623936642d633365312d343165612d616636332d3332396262343931303630342e6a7067"><img src="https://camo.githubusercontent.com/74706caca8e040b5ac2a4d675522049ece6d11be/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f31653337623936642d633365312d343165612d616636332d3332396262343931303630342e6a7067" alt="" data-canonical-src="https://imgkr.cn-bj.ufileos.com/1e37b96d-c3e1-41ea-af63-329bb4910604.jpg" style="max-width:100%;"></a><br>
图中垂直线代表输入数组[1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。</p>
<p>示例：</p>
<div class="highlight highlight-source-js"><pre><span class="pl-s1">输入：</span><span class="pl-kos">[</span><span class="pl-c1">1</span><span class="pl-kos">,</span><span class="pl-c1">8</span><span class="pl-kos">,</span><span class="pl-c1">6</span><span class="pl-kos">,</span><span class="pl-c1">2</span><span class="pl-kos">,</span><span class="pl-c1">5</span><span class="pl-kos">,</span><span class="pl-c1">4</span><span class="pl-kos">,</span><span class="pl-c1">8</span><span class="pl-kos">,</span><span class="pl-c1">3</span><span class="pl-kos">,</span><span class="pl-c1">7</span><span class="pl-kos">]</span>
<span class="pl-s1">输出：49</span></pre></div>
<h3>思路分析</h3>
<p>首先，我们能快速想到的一种方法：两两进行求解，计算可以承载的水量。 然后不断更新最大值，最后返回最大值即可。</p>
<p>这种解法，需要两层循环，时间复杂度是<code>O(n^2)</code>。这种相对来说比较暴力，对应就是<code>暴力法</code>。</p>
<h4>暴力法</h4>
<div class="highlight highlight-source-js"><pre><span class="pl-c">/**</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">number[]</span>} height</span>
<span class="pl-c"> * <span class="pl-k">@return</span> {<span class="pl-smi">number</span>}</span>
<span class="pl-c"> */</span>
<span class="pl-k">var</span> <span class="pl-en">maxArea</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">height</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">let</span> <span class="pl-s1">max</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span><span class="pl-kos">;</span>
    <span class="pl-k">for</span><span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">i</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span><span class="pl-kos">;</span> <span class="pl-s1">i</span><span class="pl-c1">&lt;</span> <span class="pl-s1">height</span><span class="pl-kos">.</span><span class="pl-c1">length</span><span class="pl-c1">-</span><span class="pl-c1">1</span><span class="pl-kos">;</span> <span class="pl-s1">i</span><span class="pl-c1">++</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-k">for</span><span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">j</span> <span class="pl-c1">=</span> <span class="pl-s1">i</span> <span class="pl-c1">+</span> <span class="pl-c1">1</span><span class="pl-kos">;</span> <span class="pl-s1">j</span> <span class="pl-c1">&lt;</span> <span class="pl-s1">height</span><span class="pl-kos">.</span><span class="pl-c1">length</span><span class="pl-kos">;</span><span class="pl-s1">j</span><span class="pl-c1">++</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-k">let</span> <span class="pl-s1">area</span> <span class="pl-c1">=</span> <span class="pl-kos">(</span><span class="pl-s1">j</span> <span class="pl-c1">-</span> <span class="pl-s1">i</span><span class="pl-kos">)</span> * <span class="pl-v">Math</span><span class="pl-kos">.</span><span class="pl-en">min</span><span class="pl-kos">(</span><span class="pl-s1">height</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-kos">,</span> <span class="pl-s1">height</span><span class="pl-kos">[</span><span class="pl-s1">j</span><span class="pl-kos">]</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
            <span class="pl-s1">max</span> <span class="pl-c1">=</span> <span class="pl-v">Math</span><span class="pl-kos">.</span><span class="pl-en">max</span><span class="pl-kos">(</span><span class="pl-s1">max</span><span class="pl-kos">,</span> <span class="pl-s1">area</span><span class="pl-kos">)</span>
        <span class="pl-kos">}</span>
    <span class="pl-kos">}</span>

    <span class="pl-k">return</span> <span class="pl-s1">max</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span></pre></div>
<p>那么有没有更好的办法呢？答案是肯定有。</p>
<p>其实有点类似<code>双指针</code>的概念，左指针指向下标 0，右指针指向<code>length-1</code>。然后分别从左右两侧向中间移动，每次取小的那个值（因为水的高度肯定是以小的那个为准）。<br>
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/635d61e01ac818d9e14f6b313023b95b488a0bc4/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f36636636336665322d626639332d346438612d616265352d6662653339323132343139342e706e67"><img src="https://camo.githubusercontent.com/635d61e01ac818d9e14f6b313023b95b488a0bc4/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f36636636336665322d626639332d346438612d616265352d6662653339323132343139342e706e67" alt="" data-canonical-src="https://imgkr.cn-bj.ufileos.com/6cf63fe2-bf93-4d8a-abe5-fbe392124194.png" style="max-width:100%;"></a></p>
<p>如果左侧小于右侧，则<code>i++</code>，否则<code>j--</code>（这一步其实就是取所有高度中比较高的，我们知道面积等于<code>长*宽</code>）。对应就是<code>双指针 动态滑窗</code></p>
<h4>双指针 动态滑窗</h4>
<div class="highlight highlight-source-js"><pre><span class="pl-c">/**</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">number[]</span>} height</span>
<span class="pl-c"> * <span class="pl-k">@return</span> {<span class="pl-smi">number</span>}</span>
<span class="pl-c"> */</span>
<span class="pl-k">var</span> <span class="pl-en">maxArea</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">height</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">let</span> <span class="pl-s1">max</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span><span class="pl-kos">;</span>
    <span class="pl-k">let</span> <span class="pl-s1">i</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span><span class="pl-kos">;</span>
    <span class="pl-k">let</span> <span class="pl-s1">j</span> <span class="pl-c1">=</span> <span class="pl-s1">height</span><span class="pl-kos">.</span><span class="pl-c1">length</span> <span class="pl-c1">-</span> <span class="pl-c1">1</span><span class="pl-kos">;</span>
    <span class="pl-k">while</span><span class="pl-kos">(</span><span class="pl-s1">i</span> <span class="pl-c1">&lt;</span> <span class="pl-s1">j</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-k">let</span> <span class="pl-s1">minHeight</span> <span class="pl-c1">=</span> <span class="pl-v">Math</span><span class="pl-kos">.</span><span class="pl-en">min</span><span class="pl-kos">(</span><span class="pl-s1">height</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-kos">,</span> <span class="pl-s1">height</span><span class="pl-kos">[</span><span class="pl-s1">j</span><span class="pl-kos">]</span><span class="pl-kos">)</span>
        <span class="pl-k">let</span> <span class="pl-s1">area</span> <span class="pl-c1">=</span> <span class="pl-kos">(</span><span class="pl-s1">j</span> <span class="pl-c1">-</span> <span class="pl-s1">i</span><span class="pl-kos">)</span>*<span class="pl-s1">minHeight</span><span class="pl-kos">;</span>
        <span class="pl-s1">max</span> <span class="pl-c1">=</span> <span class="pl-v">Math</span><span class="pl-kos">.</span><span class="pl-en">max</span><span class="pl-kos">(</span><span class="pl-s1">max</span><span class="pl-kos">,</span> <span class="pl-s1">area</span><span class="pl-kos">)</span>
        <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">height</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span> <span class="pl-c1">&lt;</span> <span class="pl-s1">height</span><span class="pl-kos">[</span><span class="pl-s1">j</span><span class="pl-kos">]</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-s1">i</span><span class="pl-c1">++</span>
        <span class="pl-kos">}</span> <span class="pl-k">else</span> <span class="pl-kos">{</span>
            <span class="pl-s1">j</span><span class="pl-c1">--</span>
        <span class="pl-kos">}</span>
    <span class="pl-kos">}</span>
    <span class="pl-k">return</span> <span class="pl-s1">max</span>
<span class="pl-kos">}</span><span class="pl-kos">;</span></pre></div>
<h2>爬楼梯 <g-emoji class="g-emoji" alias="roller_coaster" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f3a2.png">🎢</g-emoji></h2>
<blockquote>
<p>题目难度<code>easy</code>，涉及到的算法知识有斐波那契数列、动态规划。</p>
</blockquote>
<h3>题目描述</h3>
<p>假设你正在爬楼梯。需要 n&nbsp; 阶你才能到达楼顶。</p>
<p>每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？</p>
<p>注意：给定 n 是一个正整数。</p>
<p>示例 1：</p>
<div class="highlight highlight-source-js"><pre><span class="pl-s1">输入：</span> <span class="pl-c1">2</span>
<span class="pl-s1">输出：</span> <span class="pl-c1">2</span>
<span class="pl-s1">解释：</span> <span class="pl-s1">有两种方法可以爬到楼顶。</span>
<span class="pl-c1">1.</span>  <span class="pl-c1">1</span> <span class="pl-s1">阶</span> <span class="pl-c1">+</span> <span class="pl-c1">1</span> <span class="pl-s1">阶</span>
<span class="pl-c1">2.</span>  <span class="pl-c1">2</span> <span class="pl-s1">阶</span></pre></div>
<p>示例 2：</p>
<div class="highlight highlight-source-js"><pre><span class="pl-s1">输入：</span> <span class="pl-c1">3</span>
<span class="pl-s1">输出：</span> <span class="pl-c1">3</span>
<span class="pl-s1">解释：</span> <span class="pl-s1">有三种方法可以爬到楼顶。</span>
<span class="pl-c1">1.</span>  <span class="pl-c1">1</span> <span class="pl-s1">阶</span> <span class="pl-c1">+</span> <span class="pl-c1">1</span> <span class="pl-s1">阶</span> <span class="pl-c1">+</span> <span class="pl-c1">1</span> <span class="pl-s1">阶</span>
<span class="pl-c1">2.</span>  <span class="pl-c1">1</span> <span class="pl-s1">阶</span> <span class="pl-c1">+</span> <span class="pl-c1">2</span> <span class="pl-s1">阶</span>
<span class="pl-c1">3.</span>  <span class="pl-c1">2</span> <span class="pl-s1">阶</span> <span class="pl-c1">+</span> <span class="pl-c1">1</span> <span class="pl-s1">阶</span></pre></div>
<h3>思路分析</h3>
<p>这道题目是一道非常高频的面试题目，也是一道非常经典的<code>斐波那契数列</code>类型的题目。</p>
<p>解决本道题目我们会用到动态规划的算法思想-可以分成多个子问题，爬第 n 阶楼梯的方法数量，等于 2 部分之和：</p>
<ul>
<li>爬上<code>n−1</code>阶楼梯的方法数量。因为再爬 1 阶就能到第 n 阶</li>
<li>爬上<code>n−2</code>阶楼梯的方法数量，因为再爬 2 阶就能到第 n 阶<br>
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/016d233622d7970aee9587625bcfb605b76748e1/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f37313431343063622d356630332d346433662d616432662d6231326365386530323438622e706e67"><img src="https://camo.githubusercontent.com/016d233622d7970aee9587625bcfb605b76748e1/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f37313431343063622d356630332d346433662d616432662d6231326365386530323438622e706e67" alt="" data-canonical-src="https://imgkr.cn-bj.ufileos.com/714140cb-5f03-4d3f-ad2f-b12ce8e0248b.png" style="max-width:100%;"></a></li>
</ul>
<p>可以得到公式：</p>
<div class="highlight highlight-source-js"><pre><span class="pl-s1">climbs</span><span class="pl-kos">[</span><span class="pl-s1">n</span><span class="pl-kos">]</span> <span class="pl-c1">=</span> <span class="pl-s1">climbs</span><span class="pl-kos">[</span><span class="pl-s1">n</span><span class="pl-c1">-</span><span class="pl-c1">1</span><span class="pl-kos">]</span> <span class="pl-c1">+</span> <span class="pl-s1">climbs</span><span class="pl-kos">[</span><span class="pl-s1">n</span><span class="pl-c1">-</span><span class="pl-c1">2</span><span class="pl-kos">]</span></pre></div>
<p>同时需要做如下初始化：</p>
<div class="highlight highlight-source-js"><pre><span class="pl-s1">climbs</span><span class="pl-kos">[</span><span class="pl-c1">0</span><span class="pl-kos">]</span> <span class="pl-c1">=</span> <span class="pl-c1">1</span><span class="pl-kos">;</span>
<span class="pl-s1">climbs</span><span class="pl-kos">[</span><span class="pl-c1">1</span><span class="pl-kos">]</span> <span class="pl-c1">=</span> <span class="pl-c1">1</span></pre></div>
<h3>代码实现</h3>
<div class="highlight highlight-source-js"><pre><span class="pl-c">/**</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">number</span>} n</span>
<span class="pl-c"> * <span class="pl-k">@return</span> {<span class="pl-smi">number</span>}</span>
<span class="pl-c"> */</span>
<span class="pl-k">var</span> <span class="pl-en">climbStairs</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">n</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">let</span> <span class="pl-s1">climbs</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-kos">]</span><span class="pl-kos">;</span>
    <span class="pl-s1">climbs</span><span class="pl-kos">[</span><span class="pl-c1">0</span><span class="pl-kos">]</span> <span class="pl-c1">=</span> <span class="pl-c1">1</span><span class="pl-kos">;</span>
    <span class="pl-s1">climbs</span><span class="pl-kos">[</span><span class="pl-c1">1</span><span class="pl-kos">]</span> <span class="pl-c1">=</span> <span class="pl-c1">1</span><span class="pl-kos">;</span>
    <span class="pl-k">for</span><span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">i</span> <span class="pl-c1">=</span> <span class="pl-c1">2</span><span class="pl-kos">;</span> <span class="pl-s1">i</span>&lt;= <span class="pl-s1">n</span><span class="pl-kos">;</span> <span class="pl-s1">i</span><span class="pl-c1">++</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-s1">climbs</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span> <span class="pl-c1">=</span> <span class="pl-s1">climbs</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-c1">-</span><span class="pl-c1">1</span><span class="pl-kos">]</span> <span class="pl-c1">+</span> <span class="pl-s1">climbs</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-c1">-</span><span class="pl-c1">2</span><span class="pl-kos">]</span>
    <span class="pl-kos">}</span>
    <span class="pl-k">return</span> <span class="pl-s1">climbs</span><span class="pl-kos">[</span><span class="pl-s1">n</span><span class="pl-kos">]</span>

<span class="pl-kos">}</span><span class="pl-kos">;</span></pre></div>
<h2>环形链表 <g-emoji class="g-emoji" alias="doughnut" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f369.png">🍩</g-emoji></h2>
<blockquote>
<p>题目难度<code>easy</code>，涉及到的算法知识有链表、快慢指针。</p>
</blockquote>
<h3>题目描述</h3>
<p>给定一个链表，判断链表中是否有环。</p>
<p>为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。</p>
<p>示例 1：</p>
<div class="highlight highlight-source-js"><pre><span class="pl-s1">输入：head</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-c1">3</span><span class="pl-kos">,</span><span class="pl-c1">2</span><span class="pl-kos">,</span><span class="pl-c1">0</span><span class="pl-kos">,</span><span class="pl-c1">-</span><span class="pl-c1">4</span><span class="pl-kos">]</span><span class="pl-kos">,</span> <span class="pl-s1">pos</span> <span class="pl-c1">=</span> <span class="pl-c1">1</span>
<span class="pl-s1">输出：true</span>
<span class="pl-s1">解释：链表中有一个环，其尾部连接到第二个节点。</span></pre></div>
<p><a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/09fc74865a283af72c9b45d3133a6e63bded646e/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f31333936363062632d653738312d343962382d386637302d3038363333343134306132622e706e67"><img src="https://camo.githubusercontent.com/09fc74865a283af72c9b45d3133a6e63bded646e/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f31333936363062632d653738312d343962382d386637302d3038363333343134306132622e706e67" alt="" data-canonical-src="https://imgkr.cn-bj.ufileos.com/139660bc-e781-49b8-8f70-086334140a2b.png" style="max-width:100%;"></a></p>
<p>示例 2：</p>
<div class="highlight highlight-source-js"><pre><span class="pl-s1">输入：head</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-c1">1</span><span class="pl-kos">,</span><span class="pl-c1">2</span><span class="pl-kos">]</span><span class="pl-kos">,</span> <span class="pl-s1">pos</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span>
<span class="pl-s1">输出：true</span>
<span class="pl-s1">解释：链表中有一个环，其尾部连接到第一个节点。</span></pre></div>
<p><a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/59457f3f2cca2eadf8a65afb27d8f83daa328209/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f36386633396363302d383437622d343064632d383936302d6138666361656437626636642e706e67"><img src="https://camo.githubusercontent.com/59457f3f2cca2eadf8a65afb27d8f83daa328209/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f36386633396363302d383437622d343064632d383936302d6138666361656437626636642e706e67" alt="" data-canonical-src="https://imgkr.cn-bj.ufileos.com/68f39cc0-847b-40dc-8960-a8fcaed7bf6d.png" style="max-width:100%;"></a></p>
<p>示例 3：</p>
<div class="highlight highlight-source-js"><pre><span class="pl-s1">输入：head</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-c1">1</span><span class="pl-kos">]</span><span class="pl-kos">,</span> <span class="pl-s1">pos</span> <span class="pl-c1">=</span> <span class="pl-c1">-</span><span class="pl-c1">1</span>
<span class="pl-s1">输出：false</span>
<span class="pl-s1">解释：链表中没有环。</span></pre></div>
<p><a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/72eab35bfc070e1d34bf516b8d52e76443340f03/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f61663161336661632d613637322d346130382d626536362d3333306532383837616537322e706e67"><img src="https://camo.githubusercontent.com/72eab35bfc070e1d34bf516b8d52e76443340f03/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f61663161336661632d613637322d346130382d626536362d3333306532383837616537322e706e67" alt="" data-canonical-src="https://imgkr.cn-bj.ufileos.com/af1a3fac-a672-4a08-be66-330e2887ae72.png" style="max-width:100%;"></a></p>
<h3>思路分析</h3>
<p><code>链表成环</code>问题也是非常经典的算法问题，在面试中也经常会遇到。<br>
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/7bb47d1fea7372b8bea04d7276171595664d588e/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f61633036373265662d383338642d343739632d626666622d6561663136323064616135372e706e67"><img src="https://camo.githubusercontent.com/7bb47d1fea7372b8bea04d7276171595664d588e/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f61633036373265662d383338642d343739632d626666622d6561663136323064616135372e706e67" alt="" data-canonical-src="https://imgkr.cn-bj.ufileos.com/ac0672ef-838d-479c-bffb-eaf1620daa57.png" style="max-width:100%;"></a></p>
<p>解决这种问题一般有常见的两种方法：<code>标志法</code>和<code>快慢指针法</code>。</p>
<h4>标志法</h4>
<p>给每个已遍历过的节点加标志位，遍历链表，当出现下一个节点已被标志时，则证明单链表有环。</p>
<div class="highlight highlight-source-js"><pre><span class="pl-c">/**</span>
<span class="pl-c"> * Definition for singly-linked list.</span>
<span class="pl-c"> * function ListNode(val) {</span>
<span class="pl-c"> *     this.val = val;</span>
<span class="pl-c"> *     this.next = null;</span>
<span class="pl-c"> * }</span>
<span class="pl-c"> */</span>

<span class="pl-c">/**</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">ListNode</span>} head</span>
<span class="pl-c"> * <span class="pl-k">@return</span> {<span class="pl-smi">boolean</span>}</span>
<span class="pl-c"> */</span>
<span class="pl-k">var</span> <span class="pl-en">hasCycle</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">head</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">while</span><span class="pl-kos">(</span><span class="pl-s1">head</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">head</span><span class="pl-kos">.</span><span class="pl-c1">flag</span><span class="pl-kos">)</span> <span class="pl-k">return</span> <span class="pl-c1">true</span>
        <span class="pl-s1">head</span><span class="pl-kos">.</span><span class="pl-c1">flag</span> <span class="pl-c1">=</span> <span class="pl-c1">true</span><span class="pl-kos">;</span>
        <span class="pl-s1">head</span> <span class="pl-c1">=</span> <span class="pl-s1">head</span><span class="pl-kos">.</span><span class="pl-c1">next</span><span class="pl-kos">;</span>
    <span class="pl-kos">}</span>
    <span class="pl-k">return</span> <span class="pl-c1">false</span>
<span class="pl-kos">}</span><span class="pl-kos">;</span></pre></div>
<h4>快慢指针（双指针法）</h4>
<p>设置快慢两个指针，遍历单链表，快指针一次走两步，慢指针一次走一步，如果单链表中存在环，则快慢指针终会指向同一个节点，否则直到快指针指向<code>null</code>时，快慢指针都不可能相遇。</p>
<div class="highlight highlight-source-js"><pre><span class="pl-c">/**</span>
<span class="pl-c"> * Definition for singly-linked list.</span>
<span class="pl-c"> * function ListNode(val) {</span>
<span class="pl-c"> *     this.val = val;</span>
<span class="pl-c"> *     this.next = null;</span>
<span class="pl-c"> * }</span>
<span class="pl-c"> */</span>

<span class="pl-c">/**</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">ListNode</span>} head</span>
<span class="pl-c"> * <span class="pl-k">@return</span> {<span class="pl-smi">boolean</span>}</span>
<span class="pl-c"> */</span>
<span class="pl-k">var</span> <span class="pl-en">hasCycle</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">head</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">if</span><span class="pl-kos">(</span>!<span class="pl-s1">head</span> <span class="pl-c1">||</span> !<span class="pl-s1">head</span><span class="pl-kos">.</span><span class="pl-c1">next</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-k">return</span> <span class="pl-c1">false</span>
    <span class="pl-kos">}</span>
    <span class="pl-k">let</span> <span class="pl-s1">slow</span> <span class="pl-c1">=</span> <span class="pl-s1">head</span><span class="pl-kos">,</span> <span class="pl-s1">fast</span> <span class="pl-c1">=</span> <span class="pl-s1">head</span><span class="pl-kos">.</span><span class="pl-c1">next</span><span class="pl-kos">;</span>
    <span class="pl-k">while</span><span class="pl-kos">(</span><span class="pl-s1">slow</span> !== <span class="pl-s1">fast</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-k">if</span><span class="pl-kos">(</span>!<span class="pl-s1">fast</span> <span class="pl-c1">||</span> !<span class="pl-s1">fast</span><span class="pl-kos">.</span><span class="pl-c1">next</span><span class="pl-kos">)</span> <span class="pl-k">return</span> <span class="pl-c1">false</span>
        <span class="pl-s1">fast</span> <span class="pl-c1">=</span> <span class="pl-s1">fast</span><span class="pl-kos">.</span><span class="pl-c1">next</span><span class="pl-kos">.</span><span class="pl-c1">next</span><span class="pl-kos">;</span>
        <span class="pl-s1">slow</span> <span class="pl-c1">=</span> <span class="pl-s1">slow</span><span class="pl-kos">.</span><span class="pl-c1">next</span>
    <span class="pl-kos">}</span>
    <span class="pl-k">return</span> <span class="pl-c1">true</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span><span class="pl-kos">;</span></pre></div>
<h2>有效的括号 <g-emoji class="g-emoji" alias="watermelon" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f349.png">🍉</g-emoji></h2>
<blockquote>
<p>题目难度<code>easy</code>，涉及到的算法知识有栈、哈希表。</p>
</blockquote>
<h3>题目描述</h3>
<p>给定一个只包括<code>'('</code>，<code>')'</code>，<code>'{'</code>，<code>'}'</code>，<code>'['</code>，<code>']'</code>&nbsp; 的字符串，判断字符串是否有效。</p>
<p>有效字符串需满足：</p>
<p>1、左括号必须用相同类型的右括号闭合。<br>
2、左括号必须以正确的顺序闭合。</p>
<p>注意空字符串可被认为是有效字符串。</p>
<p>示例 1:</p>
<div class="highlight highlight-source-js"><pre>输入: <span class="pl-s">"()"</span>
输出: <span class="pl-c1">true</span></pre></div>
<p>示例 &nbsp;2:</p>
<div class="highlight highlight-source-js"><pre>输入: <span class="pl-s">"()[]{}"</span>
输出: <span class="pl-c1">true</span></pre></div>
<p>示例 &nbsp;3:</p>
<div class="highlight highlight-source-js"><pre>输入: <span class="pl-s">"(]"</span>
输出: <span class="pl-c1">false</span></pre></div>
<p>示例 &nbsp;4:</p>
<div class="highlight highlight-source-js"><pre>输入: <span class="pl-s">"([)]"</span>
输出: <span class="pl-c1">false</span></pre></div>
<p>示例 &nbsp;5:</p>
<div class="highlight highlight-source-js"><pre>输入: <span class="pl-s">"{[]}"</span>
输出: <span class="pl-c1">true</span></pre></div>
<h3>思路分析</h3>
<p>这道题可以利用<code>栈</code>结构。</p>
<p>思路大概是：遇到左括号，一律推入栈中，遇到右括号，将栈顶部元素拿出，如果不匹配则返回 <code>false</code>，如果匹配则继续循环。<br>
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/557992d9da15e98a6468f0a2abccc6f3af05b39e/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f65343132663964352d343635362d343132372d383664652d3166633034663464663162372e706e67"><img src="https://camo.githubusercontent.com/557992d9da15e98a6468f0a2abccc6f3af05b39e/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f65343132663964352d343635362d343132372d383664652d3166633034663464663162372e706e67" alt="" data-canonical-src="https://imgkr.cn-bj.ufileos.com/e412f9d5-4656-4127-86de-1fc04f4df1b7.png" style="max-width:100%;"></a><br>
第一种解法是利用<code>switch case</code>。</p>
<h4><code>switch case</code></h4>
<div class="highlight highlight-source-js"><pre><span class="pl-c">/**</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">string</span>} s</span>
<span class="pl-c"> * <span class="pl-k">@return</span> {<span class="pl-smi">boolean</span>}</span>
<span class="pl-c"> */</span>
<span class="pl-k">var</span> <span class="pl-en">isValid</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">s</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">let</span> <span class="pl-s1">arr</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-kos">]</span><span class="pl-kos">;</span>
    <span class="pl-k">let</span> <span class="pl-s1">len</span> <span class="pl-c1">=</span> <span class="pl-s1">s</span><span class="pl-kos">.</span><span class="pl-c1">length</span><span class="pl-kos">;</span>
    <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">len</span>%<span class="pl-c1">2</span> !== <span class="pl-c1">0</span><span class="pl-kos">)</span> <span class="pl-k">return</span> <span class="pl-c1">false</span>
    <span class="pl-k">for</span><span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">i</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span><span class="pl-kos">;</span> <span class="pl-s1">i</span><span class="pl-c1">&lt;</span><span class="pl-s1">len</span><span class="pl-kos">;</span><span class="pl-s1">i</span><span class="pl-c1">++</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-k">let</span> <span class="pl-s1">letter</span> <span class="pl-c1">=</span> <span class="pl-s1">s</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-kos">;</span>
        <span class="pl-k">switch</span><span class="pl-kos">(</span><span class="pl-s1">letter</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-k">case</span> <span class="pl-s">'('</span>: <span class="pl-kos">{</span>
                <span class="pl-s1">arr</span><span class="pl-kos">.</span><span class="pl-en">push</span><span class="pl-kos">(</span><span class="pl-s1">letter</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
                <span class="pl-k">break</span><span class="pl-kos">;</span>
            <span class="pl-kos">}</span>
            <span class="pl-k">case</span> <span class="pl-s">'{'</span>: <span class="pl-kos">{</span>
                <span class="pl-s1">arr</span><span class="pl-kos">.</span><span class="pl-en">push</span><span class="pl-kos">(</span><span class="pl-s1">letter</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
                <span class="pl-k">break</span><span class="pl-kos">;</span>
            <span class="pl-kos">}</span>
            <span class="pl-k">case</span> <span class="pl-s">'['</span>: <span class="pl-kos">{</span>
                <span class="pl-s1">arr</span><span class="pl-kos">.</span><span class="pl-en">push</span><span class="pl-kos">(</span><span class="pl-s1">letter</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
                <span class="pl-k">break</span><span class="pl-kos">;</span>
            <span class="pl-kos">}</span>
            <span class="pl-k">case</span> <span class="pl-s">')'</span>: <span class="pl-kos">{</span>
                <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">arr</span><span class="pl-kos">.</span><span class="pl-en">pop</span><span class="pl-kos">(</span><span class="pl-kos">)</span> !== <span class="pl-s">'('</span><span class="pl-kos">)</span> <span class="pl-k">return</span> <span class="pl-c1">false</span>
                <span class="pl-k">break</span><span class="pl-kos">;</span>
            <span class="pl-kos">}</span>
            <span class="pl-k">case</span> <span class="pl-s">'}'</span>: <span class="pl-kos">{</span>
                <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">arr</span><span class="pl-kos">.</span><span class="pl-en">pop</span><span class="pl-kos">(</span><span class="pl-kos">)</span> !== <span class="pl-s">'{'</span><span class="pl-kos">)</span> <span class="pl-k">return</span> <span class="pl-c1">false</span>
                <span class="pl-k">break</span><span class="pl-kos">;</span>
            <span class="pl-kos">}</span>
            <span class="pl-k">case</span> <span class="pl-s">']'</span>: <span class="pl-kos">{</span>
                <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">arr</span><span class="pl-kos">.</span><span class="pl-en">pop</span><span class="pl-kos">(</span><span class="pl-kos">)</span> !== <span class="pl-s">'['</span><span class="pl-kos">)</span> <span class="pl-k">return</span> <span class="pl-c1">false</span>
                <span class="pl-k">break</span><span class="pl-kos">;</span>
            <span class="pl-kos">}</span>
        <span class="pl-kos">}</span>
    <span class="pl-kos">}</span>
    <span class="pl-k">return</span> !<span class="pl-s1">arr</span><span class="pl-kos">.</span><span class="pl-c1">length</span>
<span class="pl-kos">}</span><span class="pl-kos">;</span></pre></div>
<p>第二种是维护一个<code>map</code>对象：</p>
<h4>哈希表<code>map</code></h4>
<div class="highlight highlight-source-js"><pre><span class="pl-c">/**</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">string</span>} s</span>
<span class="pl-c"> * <span class="pl-k">@return</span> {<span class="pl-smi">boolean</span>}</span>
<span class="pl-c"> */</span>
<span class="pl-k">var</span> <span class="pl-en">isValid</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">s</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">let</span> <span class="pl-s1">map</span> <span class="pl-c1">=</span> <span class="pl-kos">{</span>
        <span class="pl-s">'('</span>: <span class="pl-s">')'</span><span class="pl-kos">,</span>
        <span class="pl-s">'{'</span>: <span class="pl-s">'}'</span><span class="pl-kos">,</span>
        <span class="pl-s">'['</span>: <span class="pl-s">']'</span>
    <span class="pl-kos">}</span>
    <span class="pl-k">let</span> <span class="pl-s1">stack</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-kos">]</span><span class="pl-kos">;</span>
    <span class="pl-k">let</span> <span class="pl-s1">len</span> <span class="pl-c1">=</span> <span class="pl-s1">s</span><span class="pl-kos">.</span><span class="pl-c1">length</span><span class="pl-kos">;</span>
    <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">len</span>%<span class="pl-c1">2</span> !== <span class="pl-c1">0</span><span class="pl-kos">)</span> <span class="pl-k">return</span> <span class="pl-c1">false</span>
    <span class="pl-k">for</span><span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">i</span> <span class="pl-k">of</span> <span class="pl-s1">s</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">i</span> <span class="pl-k">in</span> <span class="pl-s1">map</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-s1">stack</span><span class="pl-kos">.</span><span class="pl-en">push</span><span class="pl-kos">(</span><span class="pl-s1">i</span><span class="pl-kos">)</span>
        <span class="pl-kos">}</span>  <span class="pl-k">else</span> <span class="pl-kos">{</span>
            <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">i</span> !== <span class="pl-s1">map</span><span class="pl-kos">[</span><span class="pl-s1">stack</span><span class="pl-kos">.</span><span class="pl-en">pop</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">]</span><span class="pl-kos">)</span> <span class="pl-k">return</span> <span class="pl-c1">false</span>
        <span class="pl-kos">}</span>
    <span class="pl-kos">}</span>
    <span class="pl-k">return</span> !<span class="pl-s1">stack</span><span class="pl-kos">.</span><span class="pl-c1">length</span>
<span class="pl-kos">}</span><span class="pl-kos">;</span></pre></div>
<h2>滑动窗口最大值 <g-emoji class="g-emoji" alias="boat" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/26f5.png">⛵</g-emoji></h2>
<blockquote>
<p>题目难度<code>hard</code>，涉及到的算法知识有双端队列。</p>
</blockquote>
<h3>题目描述</h3>
<p>给定一个数组 nums，有一个大小为 &nbsp;k&nbsp; 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k&nbsp; 个数字。滑动窗口每次只向右移动一位。</p>
<p>返回滑动窗口中的最大值。</p>
<p>进阶：你能在线性时间复杂度内解决此题吗？</p>
<p>示例:</p>
<div class="highlight highlight-source-js"><pre>输入: <span class="pl-s1">nums</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-c1">1</span><span class="pl-kos">,</span><span class="pl-c1">3</span><span class="pl-kos">,</span><span class="pl-c1">-</span><span class="pl-c1">1</span><span class="pl-kos">,</span><span class="pl-c1">-</span><span class="pl-c1">3</span><span class="pl-kos">,</span><span class="pl-c1">5</span><span class="pl-kos">,</span><span class="pl-c1">3</span><span class="pl-kos">,</span><span class="pl-c1">6</span><span class="pl-kos">,</span><span class="pl-c1">7</span><span class="pl-kos">]</span><span class="pl-kos">,</span> <span class="pl-s1">和</span> <span class="pl-s1">k</span> <span class="pl-c1">=</span> <span class="pl-c1">3</span>
输出: <span class="pl-kos">[</span><span class="pl-c1">3</span><span class="pl-kos">,</span><span class="pl-c1">3</span><span class="pl-kos">,</span><span class="pl-c1">5</span><span class="pl-kos">,</span><span class="pl-c1">5</span><span class="pl-kos">,</span><span class="pl-c1">6</span><span class="pl-kos">,</span><span class="pl-c1">7</span><span class="pl-kos">]</span>
解释:

  <span class="pl-s1">滑动窗口的位置</span>                <span class="pl-s1">最大值</span>
<span class="pl-c1">--</span><span class="pl-c1">--</span><span class="pl-c1">--</span><span class="pl-c1">--</span><span class="pl-c1">--</span><span class="pl-c1">--</span><span class="pl-c1">--</span><span class="pl-c1">-</span>               <span class="pl-c1">--</span><span class="pl-c1">--</span><span class="pl-c1">-</span>
<span class="pl-kos">[</span><span class="pl-c1">1</span>  <span class="pl-c1">3</span>  <span class="pl-c1">-</span><span class="pl-c1">1</span><span class="pl-kos">]</span> <span class="pl-c1">-</span><span class="pl-c1">3</span>  <span class="pl-c1">5</span>  <span class="pl-c1">3</span>  <span class="pl-c1">6</span>  <span class="pl-c1">7</span>       <span class="pl-c1">3</span>
 <span class="pl-c1">1</span> <span class="pl-kos">[</span><span class="pl-c1">3</span>  <span class="pl-c1">-</span><span class="pl-c1">1</span>  <span class="pl-c1">-</span><span class="pl-c1">3</span><span class="pl-kos">]</span> <span class="pl-c1">5</span>  <span class="pl-c1">3</span>  <span class="pl-c1">6</span>  <span class="pl-c1">7</span>       <span class="pl-c1">3</span>
 <span class="pl-c1">1</span>  <span class="pl-c1">3</span> <span class="pl-kos">[</span><span class="pl-c1">-</span><span class="pl-c1">1</span>  <span class="pl-c1">-</span><span class="pl-c1">3</span>  <span class="pl-c1">5</span><span class="pl-kos">]</span> <span class="pl-c1">3</span>  <span class="pl-c1">6</span>  <span class="pl-c1">7</span>       <span class="pl-c1">5</span>
 <span class="pl-c1">1</span>  <span class="pl-c1">3</span>  <span class="pl-c1">-</span><span class="pl-c1">1</span> <span class="pl-kos">[</span><span class="pl-c1">-</span><span class="pl-c1">3</span>  <span class="pl-c1">5</span>  <span class="pl-c1">3</span><span class="pl-kos">]</span> <span class="pl-c1">6</span>  <span class="pl-c1">7</span>       <span class="pl-c1">5</span>
 <span class="pl-c1">1</span>  <span class="pl-c1">3</span>  <span class="pl-c1">-</span><span class="pl-c1">1</span>  <span class="pl-c1">-</span><span class="pl-c1">3</span> <span class="pl-kos">[</span><span class="pl-c1">5</span>  <span class="pl-c1">3</span>  <span class="pl-c1">6</span><span class="pl-kos">]</span> <span class="pl-c1">7</span>       <span class="pl-c1">6</span>
 <span class="pl-c1">1</span>  <span class="pl-c1">3</span>  <span class="pl-c1">-</span><span class="pl-c1">1</span>  <span class="pl-c1">-</span><span class="pl-c1">3</span>  <span class="pl-c1">5</span> <span class="pl-kos">[</span><span class="pl-c1">3</span>  <span class="pl-c1">6</span>  <span class="pl-c1">7</span><span class="pl-kos">]</span>      <span class="pl-c1">7</span></pre></div>
<p>提示：</p>
<ul>
<li>1 &lt;= nums.length &lt;= 10^5</li>
<li>-10^4 &lt;= nums[i] &lt;= 10^4</li>
<li>1 &lt;= k &lt;= nums.length</li>
</ul>
<h3>思路分析</h3>
<h4>暴力求解</h4>
<p>第一种方法，比较简单。也是大多数同学很快就能想到的方法。</p>
<ul>
<li>遍历数组</li>
<li>依次遍历每个区间内的最大值，放入数组中</li>
</ul>
<div class="highlight highlight-source-js"><pre><span class="pl-c">/**</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">number[]</span>} nums</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">number</span>} k</span>
<span class="pl-c"> * <span class="pl-k">@return</span> {<span class="pl-smi">number[]</span>}</span>
<span class="pl-c"> */</span>
<span class="pl-k">var</span> <span class="pl-en">maxSlidingWindow</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">nums</span><span class="pl-kos">,</span> <span class="pl-s1">k</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">let</span> <span class="pl-s1">len</span> <span class="pl-c1">=</span> <span class="pl-s1">nums</span><span class="pl-kos">.</span><span class="pl-c1">length</span><span class="pl-kos">;</span>
    <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">len</span> <span class="pl-c1">===</span> <span class="pl-c1">0</span><span class="pl-kos">)</span> <span class="pl-k">return</span> <span class="pl-kos">[</span><span class="pl-kos">]</span>
    <span class="pl-k">if</span><span class="pl-kos">(</span><span class="pl-s1">k</span> <span class="pl-c1">===</span> <span class="pl-c1">1</span><span class="pl-kos">)</span> <span class="pl-k">return</span> <span class="pl-s1">nums</span>
    <span class="pl-k">let</span> <span class="pl-s1">resArr</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-kos">]</span>
    <span class="pl-k">for</span><span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">i</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span><span class="pl-kos">;</span> <span class="pl-s1">i</span> &lt;= <span class="pl-s1">len</span> <span class="pl-c1">-</span> <span class="pl-s1">k</span><span class="pl-kos">;</span><span class="pl-s1">i</span><span class="pl-c1">++</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-k">let</span> <span class="pl-s1">max</span> <span class="pl-c1">=</span> <span class="pl-v">Number</span><span class="pl-kos">.</span><span class="pl-c1">MIN_SAFE_INTEGER</span><span class="pl-kos">;</span>
        <span class="pl-k">for</span><span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">j</span> <span class="pl-c1">=</span> <span class="pl-s1">i</span><span class="pl-kos">;</span> <span class="pl-s1">j</span> <span class="pl-c1">&lt;</span> <span class="pl-s1">i</span> <span class="pl-c1">+</span> <span class="pl-s1">k</span><span class="pl-kos">;</span> <span class="pl-s1">j</span><span class="pl-c1">++</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-s1">max</span> <span class="pl-c1">=</span> <span class="pl-v">Math</span><span class="pl-kos">.</span><span class="pl-en">max</span><span class="pl-kos">(</span><span class="pl-s1">max</span><span class="pl-kos">,</span> <span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">j</span><span class="pl-kos">]</span><span class="pl-kos">)</span>
        <span class="pl-kos">}</span>
        <span class="pl-s1">resArr</span><span class="pl-kos">.</span><span class="pl-en">push</span><span class="pl-kos">(</span><span class="pl-s1">max</span><span class="pl-kos">)</span>
    <span class="pl-kos">}</span>
    <span class="pl-k">return</span> <span class="pl-s1">resArr</span><span class="pl-kos">;</span>
<span class="pl-kos">}</span><span class="pl-kos">;</span></pre></div>
<h4>双端队列</h4>
<p>这道题还可以用双端队列去解决，核心在于在窗口发生移动时，只根据发生变化的元素对最大值进行更新。</p>
<p><a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/6c4ff5c63db8d0685e3fac151178c9ad73ef7228/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f61623566303039612d613666382d343038662d616138312d6138356239306539326235382e676966"><img src="https://camo.githubusercontent.com/6c4ff5c63db8d0685e3fac151178c9ad73ef7228/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f61623566303039612d613666382d343038662d616138312d6138356239306539326235382e676966" alt="" data-canonical-src="https://imgkr.cn-bj.ufileos.com/ab5f009a-a6f8-408f-aa81-a85b90e92b58.gif" style="max-width:100%;"></a></p>
<p>结合上面动图(<a href="https://juejin.im/post/5cbd13d7f265da03612ee746#heading-5" rel="nofollow">图片来源</a>)我们梳理下思路：</p>
<ul>
<li>检查队尾元素，看是不是都满足大于等于当前元素的条件。如果是的话，直接将当前元素入队。否则，将队尾元素逐个出队、直到队尾元素大于等于当前元素为止。（这一步是为了维持队列的递减性：确保队头元素是当前滑动窗口的最大值。这样我们每次取最大值时，直接取队头元素即可。）</li>
<li>将当前元素入队</li>
<li>检查队头元素，看队头元素是否已经被排除在滑动窗口的范围之外了。如果是，则将队头元素出队。（这一步是维持队列的有效性：确保队列里所有的元素都在滑动窗口圈定的范围以内。）</li>
<li>排除掉滑动窗口还没有初始化完成、第一个最大值还没有出现的特殊情况。</li>
</ul>
<div class="highlight highlight-source-js"><pre><span class="pl-c">/**</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">number[]</span>} nums</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">number</span>} k</span>
<span class="pl-c"> * <span class="pl-k">@return</span> {<span class="pl-smi">number[]</span>}</span>
<span class="pl-c"> */</span>
<span class="pl-k">var</span> <span class="pl-en">maxSlidingWindow</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">nums</span><span class="pl-kos">,</span> <span class="pl-s1">k</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-c">// 缓存数组的长度</span>
    <span class="pl-k">const</span> <span class="pl-s1">len</span> <span class="pl-c1">=</span> <span class="pl-s1">nums</span><span class="pl-kos">.</span><span class="pl-c1">length</span><span class="pl-kos">;</span>
    <span class="pl-k">const</span> <span class="pl-s1">res</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-kos">]</span><span class="pl-kos">;</span>
    <span class="pl-k">const</span> <span class="pl-s1">deque</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-kos">]</span><span class="pl-kos">;</span>
    <span class="pl-k">for</span> <span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">i</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span><span class="pl-kos">;</span> <span class="pl-s1">i</span> <span class="pl-c1">&lt;</span> <span class="pl-s1">len</span><span class="pl-kos">;</span> <span class="pl-s1">i</span><span class="pl-c1">++</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-c">// 队尾元素小于当前元素</span>
        <span class="pl-k">while</span> <span class="pl-kos">(</span><span class="pl-s1">deque</span><span class="pl-kos">.</span><span class="pl-c1">length</span> <span class="pl-c1">&amp;&amp;</span> <span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">deque</span><span class="pl-kos">[</span><span class="pl-s1">deque</span><span class="pl-kos">.</span><span class="pl-c1">length</span> <span class="pl-c1">-</span> <span class="pl-c1">1</span><span class="pl-kos">]</span><span class="pl-kos">]</span> <span class="pl-c1">&lt;</span> <span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-s1">deque</span><span class="pl-kos">.</span><span class="pl-en">pop</span><span class="pl-kos">(</span><span class="pl-kos">)</span>
        <span class="pl-kos">}</span>
        <span class="pl-s1">deque</span><span class="pl-kos">.</span><span class="pl-en">push</span><span class="pl-kos">(</span><span class="pl-s1">i</span><span class="pl-kos">)</span>

        <span class="pl-c">// 当队头元素的索引已经被排除在滑动窗口之外时</span>
        <span class="pl-k">while</span> <span class="pl-kos">(</span><span class="pl-s1">deque</span><span class="pl-kos">.</span><span class="pl-c1">length</span> <span class="pl-c1">&amp;&amp;</span> <span class="pl-s1">deque</span><span class="pl-kos">[</span><span class="pl-c1">0</span><span class="pl-kos">]</span> &lt;= <span class="pl-s1">i</span> <span class="pl-c1">-</span> <span class="pl-s1">k</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-c">// 队头元素出对</span>
            <span class="pl-s1">deque</span><span class="pl-kos">.</span><span class="pl-en">shift</span><span class="pl-kos">(</span><span class="pl-kos">)</span>
        <span class="pl-kos">}</span>
        <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-s1">i</span> &gt;= <span class="pl-s1">k</span> <span class="pl-c1">-</span> <span class="pl-c1">1</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-s1">res</span><span class="pl-kos">.</span><span class="pl-en">push</span><span class="pl-kos">(</span><span class="pl-s1">nums</span><span class="pl-kos">[</span><span class="pl-s1">deque</span><span class="pl-kos">[</span><span class="pl-c1">0</span><span class="pl-kos">]</span><span class="pl-kos">]</span><span class="pl-kos">)</span>
        <span class="pl-kos">}</span>
    <span class="pl-kos">}</span>
    <span class="pl-k">return</span> <span class="pl-s1">res</span>
<span class="pl-kos">}</span><span class="pl-kos">;</span></pre></div>
<h2>每日温度 <g-emoji class="g-emoji" alias="thermometer" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f321.png">🌡</g-emoji></h2>
<blockquote>
<p>题目难度<code>medium</code>，涉及到的算法知识有栈。</p>
</blockquote>
<h3>题目描述</h3>
<p>根据每日气温列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 &nbsp;0 来代替。</p>
<p>例如，给定一个列表 &nbsp;temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 &nbsp;[1, 1, 4, 2, 1, 1, 0, 0]。</p>
<p>提示：气温列表长度的范围是 &nbsp;[1, 30000]。每个气温的值的均为华氏度，都是在 &nbsp;[30, 100]&nbsp; 范围内的整数。</p>
<h3>思路分析</h3>
<p>看到这道题，大家很容易就会想到暴力遍历法：直接两层遍历，第一层定位一个温度，第二层定位离这个温度最近的一次升温是哪天，然后求出两个温度对应索引的差值即可。</p>
<p>然而这种解法需要两层遍历，时间复杂度是<code>O(n^2)</code>，显然不是最优解法。</p>
<p>本道题目可以采用栈去做一个优化。<br>
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/b7c8608217de5cbb6f7360f27110d4c2934de72c/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f63643565353537312d646337322d346634622d386339392d6436386539326664346137382e706e67"><img src="https://camo.githubusercontent.com/b7c8608217de5cbb6f7360f27110d4c2934de72c/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f63643565353537312d646337322d346634622d386339392d6436386539326664346137382e706e67" alt="" data-canonical-src="https://imgkr.cn-bj.ufileos.com/cd5e5571-dc72-4f4b-8c99-d68e92fd4a78.png" style="max-width:100%;"></a></p>
<p>大概思路就是：维护一个递减栈。当遍历过的温度，维持的是一个单调递减的态势时，我们就对这些温度的索引下标执行入栈操作；只要出现了一个数字，它打破了这种单调递减的趋势，也就是说它比前一个温度值高，这时我们就对前后两个温度的索引下标求差，得出前一个温度距离第一次升温的目标差值。</p>
<h3>代码实现</h3>
<div class="highlight highlight-source-js"><pre><span class="pl-c">/**</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">number[]</span>} T</span>
<span class="pl-c"> * <span class="pl-k">@return</span> {<span class="pl-smi">number[]</span>}</span>
<span class="pl-c"> */</span>
<span class="pl-k">var</span> <span class="pl-en">dailyTemperatures</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-v">T</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">const</span> <span class="pl-s1">len</span> <span class="pl-c1">=</span> <span class="pl-v">T</span><span class="pl-kos">.</span><span class="pl-c1">length</span><span class="pl-kos">;</span>
    <span class="pl-k">const</span> <span class="pl-s1">stack</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-kos">]</span><span class="pl-kos">;</span>
    <span class="pl-k">const</span> <span class="pl-s1">res</span> <span class="pl-c1">=</span> <span class="pl-kos">(</span><span class="pl-k">new</span> <span class="pl-v">Array</span><span class="pl-kos">(</span><span class="pl-s1">len</span><span class="pl-kos">)</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">fill</span><span class="pl-kos">(</span><span class="pl-c1">0</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-k">for</span> <span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">i</span><span class="pl-c1">=</span><span class="pl-c1">0</span><span class="pl-kos">;</span> <span class="pl-s1">i</span> <span class="pl-c1">&lt;</span> <span class="pl-s1">len</span><span class="pl-kos">;</span><span class="pl-s1">i</span><span class="pl-c1">++</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-k">while</span><span class="pl-kos">(</span><span class="pl-s1">stack</span><span class="pl-kos">.</span><span class="pl-c1">length</span> <span class="pl-c1">&amp;&amp;</span> <span class="pl-v">T</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span> <span class="pl-c1">&gt;</span> <span class="pl-v">T</span><span class="pl-kos">[</span><span class="pl-s1">stack</span><span class="pl-kos">[</span><span class="pl-s1">stack</span><span class="pl-kos">.</span><span class="pl-c1">length</span> <span class="pl-c1">-</span> <span class="pl-c1">1</span><span class="pl-kos">]</span><span class="pl-kos">]</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-k">const</span> <span class="pl-s1">top</span> <span class="pl-c1">=</span> <span class="pl-s1">stack</span><span class="pl-kos">.</span><span class="pl-en">pop</span><span class="pl-kos">(</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
            <span class="pl-s1">res</span><span class="pl-kos">[</span><span class="pl-s1">top</span><span class="pl-kos">]</span> <span class="pl-c1">=</span> <span class="pl-s1">i</span> <span class="pl-c1">-</span> <span class="pl-s1">top</span><span class="pl-kos">;</span>
        <span class="pl-kos">}</span>
        <span class="pl-s1">stack</span><span class="pl-kos">.</span><span class="pl-en">push</span><span class="pl-kos">(</span><span class="pl-s1">i</span><span class="pl-kos">)</span>
    <span class="pl-kos">}</span>
    <span class="pl-k">return</span> <span class="pl-s1">res</span>
<span class="pl-kos">}</span><span class="pl-kos">;</span></pre></div>
<h2>括号生成 <g-emoji class="g-emoji" alias="dart" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f3af.png">🎯</g-emoji></h2>
<blockquote>
<p>题目难度<code>medium</code>，涉及到的算法知识有递归、回溯。</p>
</blockquote>
<h3>题目描述</h3>
<p>数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。</p>
<p>示例：</p>
<div class="highlight highlight-source-js"><pre><span class="pl-s1">输入：n</span> <span class="pl-c1">=</span> <span class="pl-c1">3</span>
<span class="pl-s1">输出：</span><span class="pl-kos">[</span>
       <span class="pl-s">"((()))"</span><span class="pl-kos">,</span>
       <span class="pl-s">"(()())"</span><span class="pl-kos">,</span>
       <span class="pl-s">"(())()"</span><span class="pl-kos">,</span>
       <span class="pl-s">"()(())"</span><span class="pl-kos">,</span>
       <span class="pl-s">"()()()"</span>
     <span class="pl-kos">]</span></pre></div>
<h3>思路分析</h3>
<p>这道题目通过递归去实现。</p>
<p>因为左右括号需要匹配、闭合。所以对应“(”和“)”的数量都是<code>n</code>，当满足这个条件时，一次递归就结束，将对应值放入结果数组中。</p>
<p>这里有一个潜在的限制条件：<code>有效的</code>括号组合。对应逻辑就是在往每个位置去放入“(”或“)”前：</p>
<ul>
<li>需要判断“(”的数量是否小于 n</li>
<li>“)”的数量是否小于“(”<br>
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/c87ab7eb1b5db6be8dde98e768b43b8a5e10bb03/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f30613537363934302d633564612d343764322d386232662d6563373131343830376138302e706e67"><img src="https://camo.githubusercontent.com/c87ab7eb1b5db6be8dde98e768b43b8a5e10bb03/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f30613537363934302d633564612d343764322d386232662d6563373131343830376138302e706e67" alt="" data-canonical-src="https://imgkr.cn-bj.ufileos.com/0a576940-c5da-47d2-8b2f-ec7114807a80.png" style="max-width:100%;"></a></li>
</ul>
<h3>代码实现</h3>
<div class="highlight highlight-source-js"><pre><span class="pl-c">/**</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">number</span>} n</span>
<span class="pl-c"> * <span class="pl-k">@return</span> {<span class="pl-smi">string[]</span>}</span>
<span class="pl-c"> */</span>
<span class="pl-k">var</span> <span class="pl-en">generateParenthesis</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">n</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">let</span> <span class="pl-s1">res</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-kos">]</span>
    <span class="pl-k">const</span> <span class="pl-en">generate</span> <span class="pl-c1">=</span> <span class="pl-kos">(</span><span class="pl-s1">cur</span><span class="pl-kos">,</span> <span class="pl-s1">left</span><span class="pl-kos">,</span> <span class="pl-s1">right</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-kos">{</span>
        <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-s1">left</span> <span class="pl-c1">===</span><span class="pl-s1">n</span> <span class="pl-c1">&amp;&amp;</span> <span class="pl-s1">right</span> <span class="pl-c1">===</span> <span class="pl-s1">n</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-s1">res</span><span class="pl-kos">.</span><span class="pl-en">push</span><span class="pl-kos">(</span><span class="pl-s1">cur</span><span class="pl-kos">)</span>
            <span class="pl-k">return</span>
        <span class="pl-kos">}</span>
        <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-s1">left</span> <span class="pl-c1">&lt;</span> <span class="pl-s1">n</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-en">generate</span><span class="pl-kos">(</span><span class="pl-s1">cur</span> <span class="pl-c1">+</span> <span class="pl-s">'('</span><span class="pl-kos">,</span> <span class="pl-s1">left</span> <span class="pl-c1">+</span> <span class="pl-c1">1</span><span class="pl-kos">,</span> <span class="pl-s1">right</span><span class="pl-kos">)</span>
        <span class="pl-kos">}</span>
        <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-s1">right</span> <span class="pl-c1">&lt;</span> <span class="pl-s1">left</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-en">generate</span><span class="pl-kos">(</span><span class="pl-s1">cur</span> <span class="pl-c1">+</span> <span class="pl-s">')'</span><span class="pl-kos">,</span> <span class="pl-s1">left</span><span class="pl-kos">,</span> <span class="pl-s1">right</span> <span class="pl-c1">+</span> <span class="pl-c1">1</span><span class="pl-kos">)</span>
        <span class="pl-kos">}</span>
    <span class="pl-kos">}</span>
    <span class="pl-en">generate</span><span class="pl-kos">(</span><span class="pl-s">''</span><span class="pl-kos">,</span> <span class="pl-c1">0</span><span class="pl-kos">,</span> <span class="pl-c1">0</span><span class="pl-kos">)</span>
    <span class="pl-k">return</span> <span class="pl-s1">res</span>
<span class="pl-kos">}</span><span class="pl-kos">;</span></pre></div>
<h2>电话号码的字母组合 <g-emoji class="g-emoji" alias="art" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f3a8.png">🎨</g-emoji></h2>
<blockquote>
<p>题目难度<code>medium</code>，涉及到的算法知识有递归、回溯。</p>
</blockquote>
<h3>题目描述</h3>
<p>给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。</p>
<p>给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。<br>
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/a2c1c2dd9a429ba23085cfb81b1c8a131ef4b46d/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f32623637343137312d616463352d343432622d383563632d3831366161396630313631342e706e67"><img src="https://camo.githubusercontent.com/a2c1c2dd9a429ba23085cfb81b1c8a131ef4b46d/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f32623637343137312d616463352d343432622d383563632d3831366161396630313631342e706e67" alt="" data-canonical-src="https://imgkr.cn-bj.ufileos.com/2b674171-adc5-442b-85cc-816aa9f01614.png" style="max-width:100%;"></a><br>
示例:</p>
<div class="highlight highlight-source-js"><pre><span class="pl-s1">输入：</span><span class="pl-s">"23"</span>
<span class="pl-s1">输出：</span><span class="pl-kos">[</span><span class="pl-s">"ad"</span><span class="pl-kos">,</span> <span class="pl-s">"ae"</span><span class="pl-kos">,</span> <span class="pl-s">"af"</span><span class="pl-kos">,</span> <span class="pl-s">"bd"</span><span class="pl-kos">,</span> <span class="pl-s">"be"</span><span class="pl-kos">,</span> <span class="pl-s">"bf"</span><span class="pl-kos">,</span> <span class="pl-s">"cd"</span><span class="pl-kos">,</span> <span class="pl-s">"ce"</span><span class="pl-kos">,</span> <span class="pl-s">"cf"</span><span class="pl-kos">]</span><span class="pl-kos">.</span></pre></div>
<h3>思路分析</h3>
<p>首先用一个对象<code>map</code>存储数字与字母的映射关系，接下来遍历对应的字符串，第一次将字符串存在结果数组<code>result</code>中，第二次及以后的就双层遍历生成新的字符串数组。<br>
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/a2e71aae1cda95782fc0fbf9e8e761431e24605f/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f31363431323339622d383264642d346265642d396531362d6634306561663665343038332e706e67"><img src="https://camo.githubusercontent.com/a2e71aae1cda95782fc0fbf9e8e761431e24605f/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f31363431323339622d383264642d346265642d396531362d6634306561663665343038332e706e67" alt="" data-canonical-src="https://imgkr.cn-bj.ufileos.com/1641239b-82dd-4bed-9e16-f40eaf6e4083.png" style="max-width:100%;"></a></p>
<h3>代码实现</h3>
<h4>哈希映射 逐层遍历</h4>
<div class="highlight highlight-source-js"><pre><span class="pl-c">/**</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">string</span>} digits</span>
<span class="pl-c"> * <span class="pl-k">@return</span> {<span class="pl-smi">string[]</span>}</span>
<span class="pl-c"> */</span>
<span class="pl-k">var</span> <span class="pl-en">letterCombinations</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">digits</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">let</span> <span class="pl-s1">res</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-kos">]</span><span class="pl-kos">;</span>
    <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-s1">digits</span><span class="pl-kos">.</span><span class="pl-c1">length</span> <span class="pl-c1">===</span> <span class="pl-c1">0</span><span class="pl-kos">)</span> <span class="pl-k">return</span> <span class="pl-kos">[</span><span class="pl-kos">]</span>
    <span class="pl-k">let</span> <span class="pl-s1">map</span> <span class="pl-c1">=</span> <span class="pl-kos">{</span>
        <span class="pl-c1">2</span>: <span class="pl-s">'abc'</span><span class="pl-kos">,</span>
        <span class="pl-c1">3</span>: <span class="pl-s">'def'</span><span class="pl-kos">,</span>
        <span class="pl-c1">4</span>: <span class="pl-s">'ghi'</span><span class="pl-kos">,</span>
        <span class="pl-c1">5</span>: <span class="pl-s">'jkl'</span><span class="pl-kos">,</span>
        <span class="pl-c1">6</span>: <span class="pl-s">'mno'</span><span class="pl-kos">,</span>
        <span class="pl-c1">7</span>: <span class="pl-s">'pqrs'</span><span class="pl-kos">,</span>
        <span class="pl-c1">8</span>: <span class="pl-s">'tuv'</span><span class="pl-kos">,</span>
        <span class="pl-c1">9</span>: <span class="pl-s">'wxyz'</span>
    <span class="pl-kos">}</span>
    <span class="pl-k">for</span> <span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">num</span> <span class="pl-k">of</span> <span class="pl-s1">digits</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-k">let</span> <span class="pl-s1">chars</span> <span class="pl-c1">=</span> <span class="pl-s1">map</span><span class="pl-kos">[</span><span class="pl-s1">num</span><span class="pl-kos">]</span>
        <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-s1">res</span><span class="pl-kos">.</span><span class="pl-c1">length</span> <span class="pl-c1">&gt;</span> <span class="pl-c1">0</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-k">let</span> <span class="pl-s1">temp</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-kos">]</span>
            <span class="pl-k">for</span> <span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">char</span> <span class="pl-k">of</span> <span class="pl-s1">chars</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
                <span class="pl-k">for</span> <span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">oldStr</span> <span class="pl-k">of</span> <span class="pl-s1">res</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
                    <span class="pl-s1">temp</span><span class="pl-kos">.</span><span class="pl-en">push</span><span class="pl-kos">(</span><span class="pl-s1">oldStr</span> <span class="pl-c1">+</span> <span class="pl-s1">char</span><span class="pl-kos">)</span>
                <span class="pl-kos">}</span>
            <span class="pl-kos">}</span>
            <span class="pl-s1">res</span> <span class="pl-c1">=</span> <span class="pl-s1">temp</span>
        <span class="pl-kos">}</span> <span class="pl-k">else</span> <span class="pl-kos">{</span>
            <span class="pl-s1">res</span><span class="pl-kos">.</span><span class="pl-en">push</span><span class="pl-kos">(</span>...<span class="pl-s1">chars</span><span class="pl-kos">)</span>
        <span class="pl-kos">}</span>

    <span class="pl-kos">}</span>
    <span class="pl-k">return</span> <span class="pl-s1">res</span>
<span class="pl-kos">}</span><span class="pl-kos">;</span></pre></div>
<h4>递归</h4>
<div class="highlight highlight-source-js"><pre><span class="pl-c">/**</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">string</span>} digits</span>
<span class="pl-c"> * <span class="pl-k">@return</span> {<span class="pl-smi">string[]</span>}</span>
<span class="pl-c"> */</span>
<span class="pl-k">var</span> <span class="pl-en">letterCombinations</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">digits</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">let</span> <span class="pl-s1">res</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-kos">]</span><span class="pl-kos">;</span>
    <span class="pl-k">if</span> <span class="pl-kos">(</span>!<span class="pl-s1">digits</span><span class="pl-kos">)</span> <span class="pl-k">return</span> <span class="pl-kos">[</span><span class="pl-kos">]</span>
    <span class="pl-k">let</span> <span class="pl-s1">map</span> <span class="pl-c1">=</span> <span class="pl-kos">{</span>
        <span class="pl-c1">2</span>: <span class="pl-s">'abc'</span><span class="pl-kos">,</span>
        <span class="pl-c1">3</span>: <span class="pl-s">'def'</span><span class="pl-kos">,</span>
        <span class="pl-c1">4</span>: <span class="pl-s">'ghi'</span><span class="pl-kos">,</span>
        <span class="pl-c1">5</span>: <span class="pl-s">'jkl'</span><span class="pl-kos">,</span>
        <span class="pl-c1">6</span>: <span class="pl-s">'mno'</span><span class="pl-kos">,</span>
        <span class="pl-c1">7</span>: <span class="pl-s">'pqrs'</span><span class="pl-kos">,</span>
        <span class="pl-c1">8</span>: <span class="pl-s">'tuv'</span><span class="pl-kos">,</span>
        <span class="pl-c1">9</span>: <span class="pl-s">'wxyz'</span>
    <span class="pl-kos">}</span>
    <span class="pl-k">function</span> <span class="pl-en">generate</span><span class="pl-kos">(</span><span class="pl-s1">i</span><span class="pl-kos">,</span> <span class="pl-s1">str</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-k">let</span> <span class="pl-s1">len</span> <span class="pl-c1">=</span> <span class="pl-s1">digits</span><span class="pl-kos">.</span><span class="pl-c1">length</span><span class="pl-kos">;</span>
        <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-s1">i</span> <span class="pl-c1">===</span> <span class="pl-s1">len</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-s1">res</span><span class="pl-kos">.</span><span class="pl-en">push</span><span class="pl-kos">(</span><span class="pl-s1">str</span><span class="pl-kos">)</span>
            <span class="pl-k">return</span>
        <span class="pl-kos">}</span>
        <span class="pl-k">let</span> <span class="pl-s1">chars</span> <span class="pl-c1">=</span> <span class="pl-s1">map</span><span class="pl-kos">[</span><span class="pl-s1">digits</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-kos">]</span>
        <span class="pl-k">for</span> <span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">j</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span><span class="pl-kos">;</span> <span class="pl-s1">j</span> <span class="pl-c1">&lt;</span> <span class="pl-s1">chars</span><span class="pl-kos">.</span><span class="pl-c1">length</span><span class="pl-kos">;</span> <span class="pl-s1">j</span><span class="pl-c1">++</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-en">generate</span><span class="pl-kos">(</span><span class="pl-s1">i</span><span class="pl-c1">+</span><span class="pl-c1">1</span><span class="pl-kos">,</span> <span class="pl-s1">str</span> <span class="pl-c1">+</span> <span class="pl-s1">chars</span><span class="pl-kos">[</span><span class="pl-s1">j</span><span class="pl-kos">]</span><span class="pl-kos">)</span>
        <span class="pl-kos">}</span>
    <span class="pl-kos">}</span>
    <span class="pl-en">generate</span><span class="pl-kos">(</span><span class="pl-c1">0</span><span class="pl-kos">,</span> <span class="pl-s">''</span><span class="pl-kos">)</span>
    <span class="pl-k">return</span> <span class="pl-s1">res</span>
<span class="pl-kos">}</span><span class="pl-kos">;</span></pre></div>
<h2>岛屿数量 <g-emoji class="g-emoji" alias="desert_island" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f3dd.png">🏝</g-emoji></h2>
<blockquote>
<p>题目难度<code>medium</code>，涉及到的算法知识有 DFS（深度优先搜索）。</p>
</blockquote>
<h3>题目描述</h3>
<p>给你一个由 &nbsp;'1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。</p>
<p>岛屿总是被水包围，并且每座岛屿只能由水平方向或竖直方向上相邻的陆地连接形成。</p>
<p>此外，你可以假设该网格的四条边均被水包围。</p>
<p>示例 1:</p>
<div class="highlight highlight-source-js"><pre>输入:
<span class="pl-c1">11110</span>
<span class="pl-c1">11010</span>
<span class="pl-c1">11000</span>
<span class="pl-c1">00000</span>
输出:&nbsp;<span class="pl-c1">1</span></pre></div>
<p>示例 &nbsp;2:</p>
<div class="highlight highlight-source-js"><pre>输入:
<span class="pl-c1">11000</span>
<span class="pl-c1">11000</span>
<span class="pl-c1">00100</span>
<span class="pl-c1">00011</span>
输出: <span class="pl-c1">3</span>
解释: <span class="pl-s1">每座岛屿只能由水平和</span>/<span class="pl-s1">或竖直方向上相邻的陆地连接而成。</span></pre></div>
<h3>思路分析</h3>
<p><a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/fbc05f9006bb981868f796d700b3e2cf4d59f736/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f30383262663230362d343532322d343430612d393961392d3862336634636338306631622e706e67"><img src="https://camo.githubusercontent.com/fbc05f9006bb981868f796d700b3e2cf4d59f736/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f30383262663230362d343532322d343430612d393961392d3862336634636338306631622e706e67" alt="" data-canonical-src="https://imgkr.cn-bj.ufileos.com/082bf206-4522-440a-99a9-8b3f4cc80f1b.png" style="max-width:100%;"></a><br>
如上图，我们需要计算的就是图中相连（只能是水平和/或竖直方向上相邻）的绿色岛屿的数量。</p>
<p>这道题目一个经典的做法是<code>沉岛</code>，大致思路是：采用<code>DFS</code>（深度优先搜索），遇到 1 的就将当前的 1 变为 0，并将当前坐标的上下左右都执行 dfs，并计数。</p>
<p>终止条件是：超出二维数组的边界或者是遇到 0 ，直接返回。</p>
<h3>代码实现</h3>
<div class="highlight highlight-source-js"><pre><span class="pl-c">/**</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">character[][]</span>} grid</span>
<span class="pl-c"> * <span class="pl-k">@return</span> {<span class="pl-smi">number</span>}</span>
<span class="pl-c"> */</span>
<span class="pl-k">var</span> <span class="pl-en">numIslands</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">grid</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">const</span> <span class="pl-s1">rows</span> <span class="pl-c1">=</span> <span class="pl-s1">grid</span><span class="pl-kos">.</span><span class="pl-c1">length</span><span class="pl-kos">;</span>
    <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-s1">rows</span> <span class="pl-c1">===</span> <span class="pl-c1">0</span><span class="pl-kos">)</span> <span class="pl-k">return</span> <span class="pl-c1">0</span>
    <span class="pl-k">const</span> <span class="pl-s1">cols</span> <span class="pl-c1">=</span> <span class="pl-s1">grid</span><span class="pl-kos">[</span><span class="pl-c1">0</span><span class="pl-kos">]</span><span class="pl-kos">.</span><span class="pl-c1">length</span><span class="pl-kos">;</span>
    <span class="pl-k">let</span> <span class="pl-s1">res</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span><span class="pl-kos">;</span>
    <span class="pl-k">for</span> <span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">i</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span><span class="pl-kos">;</span> <span class="pl-s1">i</span> <span class="pl-c1">&lt;</span> <span class="pl-s1">rows</span><span class="pl-kos">;</span> <span class="pl-s1">i</span><span class="pl-c1">++</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-k">for</span> <span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">j</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span><span class="pl-kos">;</span> <span class="pl-s1">j</span> <span class="pl-c1">&lt;</span> <span class="pl-s1">cols</span><span class="pl-kos">;</span> <span class="pl-s1">j</span><span class="pl-c1">++</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-s1">grid</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-kos">[</span><span class="pl-s1">j</span><span class="pl-kos">]</span> <span class="pl-c1">===</span> <span class="pl-s">'1'</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
                <span class="pl-en">helper</span><span class="pl-kos">(</span><span class="pl-s1">grid</span><span class="pl-kos">,</span> <span class="pl-s1">i</span><span class="pl-kos">,</span> <span class="pl-s1">j</span><span class="pl-kos">,</span> <span class="pl-s1">rows</span><span class="pl-kos">,</span> <span class="pl-s1">cols</span><span class="pl-kos">)</span>
                <span class="pl-s1">res</span><span class="pl-c1">++</span>
            <span class="pl-kos">}</span>
        <span class="pl-kos">}</span>
    <span class="pl-kos">}</span>
    <span class="pl-k">return</span> <span class="pl-s1">res</span>
<span class="pl-kos">}</span>
 <span class="pl-k">function</span> <span class="pl-en">helper</span><span class="pl-kos">(</span><span class="pl-s1">grid</span><span class="pl-kos">,</span> <span class="pl-s1">i</span><span class="pl-kos">,</span> <span class="pl-s1">j</span><span class="pl-kos">,</span> <span class="pl-s1">rows</span><span class="pl-kos">,</span> <span class="pl-s1">cols</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-s1">i</span> <span class="pl-c1">&lt;</span> <span class="pl-c1">0</span> <span class="pl-c1">||</span> <span class="pl-s1">j</span> <span class="pl-c1">&lt;</span> <span class="pl-c1">0</span> <span class="pl-c1">||</span> <span class="pl-s1">i</span> <span class="pl-c1">&gt;</span> <span class="pl-s1">rows</span> <span class="pl-c1">-</span> <span class="pl-c1">1</span> <span class="pl-c1">||</span> <span class="pl-s1">j</span> <span class="pl-c1">&gt;</span> <span class="pl-s1">cols</span> <span class="pl-c1">-</span> <span class="pl-c1">1</span> <span class="pl-c1">||</span> <span class="pl-s1">grid</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-kos">[</span><span class="pl-s1">j</span><span class="pl-kos">]</span> <span class="pl-c1">===</span> <span class="pl-s">"0"</span><span class="pl-kos">)</span>
        <span class="pl-k">return</span><span class="pl-kos">;</span>

    <span class="pl-s1">grid</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-kos">[</span><span class="pl-s1">j</span><span class="pl-kos">]</span> <span class="pl-c1">=</span> <span class="pl-s">"0"</span>

    <span class="pl-en">helper</span><span class="pl-kos">(</span><span class="pl-s1">grid</span><span class="pl-kos">,</span> <span class="pl-s1">i</span> <span class="pl-c1">+</span> <span class="pl-c1">1</span><span class="pl-kos">,</span> <span class="pl-s1">j</span><span class="pl-kos">,</span> <span class="pl-s1">rows</span><span class="pl-kos">,</span> <span class="pl-s1">cols</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-en">helper</span><span class="pl-kos">(</span><span class="pl-s1">grid</span><span class="pl-kos">,</span> <span class="pl-s1">i</span><span class="pl-kos">,</span> <span class="pl-s1">j</span> <span class="pl-c1">+</span> <span class="pl-c1">1</span><span class="pl-kos">,</span> <span class="pl-s1">rows</span><span class="pl-kos">,</span> <span class="pl-s1">cols</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-en">helper</span><span class="pl-kos">(</span><span class="pl-s1">grid</span><span class="pl-kos">,</span> <span class="pl-s1">i</span> <span class="pl-c1">-</span> <span class="pl-c1">1</span><span class="pl-kos">,</span> <span class="pl-s1">j</span><span class="pl-kos">,</span> <span class="pl-s1">rows</span><span class="pl-kos">,</span> <span class="pl-s1">cols</span><span class="pl-kos">)</span><span class="pl-kos">;</span>
    <span class="pl-en">helper</span><span class="pl-kos">(</span><span class="pl-s1">grid</span><span class="pl-kos">,</span> <span class="pl-s1">i</span><span class="pl-kos">,</span> <span class="pl-s1">j</span> <span class="pl-c1">-</span> <span class="pl-c1">1</span><span class="pl-kos">,</span> <span class="pl-s1">rows</span><span class="pl-kos">,</span> <span class="pl-s1">cols</span><span class="pl-kos">)</span><span class="pl-kos">;</span>

<span class="pl-kos">}</span></pre></div>
<h2>分发饼干 <g-emoji class="g-emoji" alias="cookie" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f36a.png">🍪</g-emoji></h2>
<blockquote>
<p>题目难度<code>easy</code>，涉及到的算法知识有贪心算法。</p>
</blockquote>
<h3>题目描述</h3>
<p>假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。对每个孩子 i ，都有一个胃口值 &nbsp;gi ，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j ，都有一个尺寸 sj&nbsp;。如果 sj &gt;= gi&nbsp;，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。</p>
<p><b>注意：</b></p>
<p>你可以假设胃口值为正。<br>
一个小朋友最多只能拥有一块饼干。</p>
<p>示例 &nbsp;1:</p>
<div class="highlight highlight-source-js"><pre>输入: <span class="pl-kos">[</span><span class="pl-c1">1</span><span class="pl-kos">,</span><span class="pl-c1">2</span><span class="pl-kos">,</span><span class="pl-c1">3</span><span class="pl-kos">]</span><span class="pl-kos">,</span> <span class="pl-kos">[</span><span class="pl-c1">1</span><span class="pl-kos">,</span><span class="pl-c1">1</span><span class="pl-kos">]</span>

输出: <span class="pl-c1">1</span>

解释:
<span class="pl-s1">你有三个孩子和两块小饼干，3个孩子的胃口值分别是：1</span><span class="pl-kos">,</span><span class="pl-c1">2</span><span class="pl-kos">,</span><span class="pl-c1">3</span><span class="pl-s1">。</span>
<span class="pl-s1">虽然你有两块小饼干，由于他们的尺寸都是1，你只能让胃口值是1的孩子满足。</span>
<span class="pl-s1">所以你应该输出1。</span></pre></div>
<p>示例 &nbsp;2:</p>
<div class="highlight highlight-source-js"><pre>输入: <span class="pl-kos">[</span><span class="pl-c1">1</span><span class="pl-kos">,</span><span class="pl-c1">2</span><span class="pl-kos">]</span><span class="pl-kos">,</span> <span class="pl-kos">[</span><span class="pl-c1">1</span><span class="pl-kos">,</span><span class="pl-c1">2</span><span class="pl-kos">,</span><span class="pl-c1">3</span><span class="pl-kos">]</span>

输出: <span class="pl-c1">2</span>

解释:
<span class="pl-s1">你有两个孩子和三块小饼干，2个孩子的胃口值分别是1</span><span class="pl-kos">,</span><span class="pl-c1">2</span><span class="pl-s1">。</span>
<span class="pl-s1">你拥有的饼干数量和尺寸都足以让所有孩子满足。</span>
<span class="pl-s1">所以你应该输出2</span><span class="pl-kos">.</span></pre></div>
<h3>思路分析</h3>
<p>这道题目是一道典型的<code>贪心算法</code>类。解题思路大概如下：</p>
<ul>
<li>优先满足胃口小的小朋友的需求</li>
<li>设最大可满足的孩子数量为<code>maxNum = 0</code></li>
<li>胃口小的拿小的，胃口大的拿大的</li>
<li>两边升序，然后一一对比
<ul>
<li>当<code>饼干j</code> &gt;= <code>胃口i</code> 时，<code>i++</code>、<code>j++</code>、<code>maxNum++</code></li>
<li>当<code>饼干j</code> &lt; <code>胃口i</code>时，说明饼干不够吃，换更大的，<code>j++</code></li>
</ul>
</li>
<li>到边界后停止</li>
</ul>
<h3>代码实现</h3>
<div class="highlight highlight-source-js"><pre><span class="pl-c">/**</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">number[]</span>} g</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">number[]</span>} s</span>
<span class="pl-c"> * <span class="pl-k">@return</span> {<span class="pl-smi">number</span>}</span>
<span class="pl-c"> */</span>
<span class="pl-k">var</span> <span class="pl-en">findContentChildren</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">g</span><span class="pl-kos">,</span> <span class="pl-s1">s</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-s1">g</span> <span class="pl-c1">=</span> <span class="pl-s1">g</span><span class="pl-kos">.</span><span class="pl-en">sort</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">a</span><span class="pl-kos">,</span> <span class="pl-s1">b</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-s1">a</span> <span class="pl-c1">-</span> <span class="pl-s1">b</span><span class="pl-kos">)</span>
    <span class="pl-s1">s</span> <span class="pl-c1">=</span> <span class="pl-s1">s</span><span class="pl-kos">.</span><span class="pl-en">sort</span><span class="pl-kos">(</span><span class="pl-kos">(</span><span class="pl-s1">a</span><span class="pl-kos">,</span> <span class="pl-s1">b</span><span class="pl-kos">)</span> <span class="pl-c1">=&gt;</span> <span class="pl-s1">a</span> <span class="pl-c1">-</span> <span class="pl-s1">b</span><span class="pl-kos">)</span>
    <span class="pl-k">let</span> <span class="pl-s1">gLen</span> <span class="pl-c1">=</span> <span class="pl-s1">g</span><span class="pl-kos">.</span><span class="pl-c1">length</span><span class="pl-kos">,</span>
        <span class="pl-s1">sLen</span> <span class="pl-c1">=</span> <span class="pl-s1">s</span><span class="pl-kos">.</span><span class="pl-c1">length</span><span class="pl-kos">,</span>
        <span class="pl-s1">i</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span><span class="pl-kos">,</span>
        <span class="pl-s1">j</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span><span class="pl-kos">,</span>
        <span class="pl-s1">maxNum</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span><span class="pl-kos">;</span>
    <span class="pl-k">while</span> <span class="pl-kos">(</span><span class="pl-s1">i</span> <span class="pl-c1">&lt;</span> <span class="pl-s1">gLen</span> <span class="pl-c1">&amp;&amp;</span> <span class="pl-s1">j</span> <span class="pl-c1">&lt;</span> <span class="pl-s1">sLen</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-s1">s</span><span class="pl-kos">[</span><span class="pl-s1">j</span><span class="pl-kos">]</span> &gt;= <span class="pl-s1">g</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-s1">i</span><span class="pl-c1">++</span><span class="pl-kos">;</span>
            <span class="pl-s1">maxNum</span><span class="pl-c1">++</span>
        <span class="pl-kos">}</span>
        <span class="pl-s1">j</span><span class="pl-c1">++</span>
    <span class="pl-kos">}</span>
    <span class="pl-k">return</span> <span class="pl-s1">maxNum</span>
<span class="pl-kos">}</span><span class="pl-kos">;</span></pre></div>
<h2>买卖股票的最佳时机 II <g-emoji class="g-emoji" alias="helicopter" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f681.png">🚁</g-emoji></h2>
<blockquote>
<p>题目难度<code>easy</code>，涉及到的算法知识有动态规划、贪心算法。</p>
</blockquote>
<h3>题目描述</h3>
<p>给定一个数组，它的第 &nbsp;i 个元素是一支给定股票第 i 天的价格。</p>
<p>设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。</p>
<p><b>注意：</b>你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。</p>
<p>示例 1:</p>
<div class="highlight highlight-source-js"><pre>输入: <span class="pl-kos">[</span><span class="pl-c1">7</span><span class="pl-kos">,</span><span class="pl-c1">1</span><span class="pl-kos">,</span><span class="pl-c1">5</span><span class="pl-kos">,</span><span class="pl-c1">3</span><span class="pl-kos">,</span><span class="pl-c1">6</span><span class="pl-kos">,</span><span class="pl-c1">4</span><span class="pl-kos">]</span>
输出: <span class="pl-c1">7</span>
解释: <span class="pl-s1">在第</span> <span class="pl-c1">2</span> <span class="pl-s1">天（股票价格</span> <span class="pl-c1">=</span> <span class="pl-c1">1</span><span class="pl-s1">）的时候买入，在第</span> <span class="pl-c1">3</span> <span class="pl-s1">天（股票价格</span> <span class="pl-c1">=</span> <span class="pl-c1">5</span><span class="pl-s1">）的时候卖出</span><span class="pl-kos">,</span> <span class="pl-s1">这笔交易所能获得利润</span> <span class="pl-c1">=</span> <span class="pl-c1">5</span><span class="pl-c1">-</span><span class="pl-c1">1</span> <span class="pl-c1">=</span> <span class="pl-c1">4</span> <span class="pl-s1">。</span>
&nbsp;    <span class="pl-s1">随后，在第</span> <span class="pl-c1">4</span> <span class="pl-s1">天（股票价格</span> <span class="pl-c1">=</span> <span class="pl-c1">3</span><span class="pl-s1">）的时候买入，在第</span> <span class="pl-c1">5</span> <span class="pl-s1">天（股票价格</span> <span class="pl-c1">=</span> <span class="pl-c1">6</span><span class="pl-s1">）的时候卖出</span><span class="pl-kos">,</span> <span class="pl-s1">这笔交易所能获得利润</span> <span class="pl-c1">=</span> <span class="pl-c1">6</span><span class="pl-c1">-</span><span class="pl-c1">3</span> <span class="pl-c1">=</span> <span class="pl-c1">3</span> <span class="pl-s1">。</span></pre></div>
<p>示例 2:</p>
<div class="highlight highlight-source-js"><pre>输入: <span class="pl-kos">[</span><span class="pl-c1">1</span><span class="pl-kos">,</span><span class="pl-c1">2</span><span class="pl-kos">,</span><span class="pl-c1">3</span><span class="pl-kos">,</span><span class="pl-c1">4</span><span class="pl-kos">,</span><span class="pl-c1">5</span><span class="pl-kos">]</span>
输出: <span class="pl-c1">4</span>
解释: <span class="pl-s1">在第</span> <span class="pl-c1">1</span> <span class="pl-s1">天（股票价格</span> <span class="pl-c1">=</span> <span class="pl-c1">1</span><span class="pl-s1">）的时候买入，在第</span> <span class="pl-c1">5</span> <span class="pl-s1">天</span> <span class="pl-s1">（股票价格</span> <span class="pl-c1">=</span> <span class="pl-c1">5</span><span class="pl-s1">）的时候卖出</span><span class="pl-kos">,</span> <span class="pl-s1">这笔交易所能获得利润</span> <span class="pl-c1">=</span> <span class="pl-c1">5</span><span class="pl-c1">-</span><span class="pl-c1">1</span> <span class="pl-c1">=</span> <span class="pl-c1">4</span> <span class="pl-s1">。</span>
&nbsp;    <span class="pl-s1">注意你不能在第</span> <span class="pl-c1">1</span> <span class="pl-s1">天和第</span> <span class="pl-c1">2</span> <span class="pl-s1">天接连购买股票，之后再将它们卖出。</span>
&nbsp;    <span class="pl-s1">因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。</span></pre></div>
<p>示例 &nbsp;3:</p>
<div class="highlight highlight-source-js"><pre>输入: <span class="pl-kos">[</span><span class="pl-c1">7</span><span class="pl-kos">,</span><span class="pl-c1">6</span><span class="pl-kos">,</span><span class="pl-c1">4</span><span class="pl-kos">,</span><span class="pl-c1">3</span><span class="pl-kos">,</span><span class="pl-c1">1</span><span class="pl-kos">]</span>
输出: <span class="pl-c1">0</span>
解释: <span class="pl-s1">在这种情况下</span><span class="pl-kos">,</span> <span class="pl-s1">没有交易完成</span><span class="pl-kos">,</span> <span class="pl-s1">所以最大利润为</span> <span class="pl-c1">0</span><span class="pl-s1">。</span></pre></div>
<p><b>提示：</b></p>
<ul>
<li>1 &lt;= prices.length &lt;= 3 * 10 ^ 4</li>
<li>0 &lt;= prices[i]&nbsp;&lt;= 10 ^ 4</li>
</ul>
<h3>思路分析</h3>
<p>其实这道题目思路也比较简单：</p>
<ul>
<li>维护一个变量<code>profit</code>用来存储利润</li>
<li>因为可以多次买卖，那么就要后面的价格比前面的大，那么就可以进行买卖</li>
<li>因此，只要<code>prices[i+1] &gt; prices[i]</code>，那么就去叠加<code>profit</code></li>
<li>遍历完成得到的<code>profit</code>就是获取的最大利润<br>
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/00b000ee17475e8203ed156a164fdfe31198edb4/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f65663532383766392d326664362d346631652d626637302d3639633663656230663465332e706e67"><img src="https://camo.githubusercontent.com/00b000ee17475e8203ed156a164fdfe31198edb4/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f65663532383766392d326664362d346631652d626637302d3639633663656230663465332e706e67" alt="" data-canonical-src="https://imgkr.cn-bj.ufileos.com/ef5287f9-2fd6-4f1e-bf70-69c6ceb0f4e3.png" style="max-width:100%;"></a></li>
</ul>
<h3>代码实现</h3>
<div class="highlight highlight-source-js"><pre><span class="pl-c">/**</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">number[]</span>} prices</span>
<span class="pl-c"> * <span class="pl-k">@return</span> {<span class="pl-smi">number</span>}</span>
<span class="pl-c"> */</span>
<span class="pl-k">var</span> <span class="pl-en">maxProfit</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">prices</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">let</span> <span class="pl-s1">profit</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span><span class="pl-kos">;</span>
    <span class="pl-k">for</span> <span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">i</span><span class="pl-c1">=</span><span class="pl-c1">0</span><span class="pl-kos">;</span> <span class="pl-s1">i</span> <span class="pl-c1">&lt;</span> <span class="pl-s1">prices</span><span class="pl-kos">.</span><span class="pl-c1">length</span> <span class="pl-c1">-</span> <span class="pl-c1">1</span><span class="pl-kos">;</span> <span class="pl-s1">i</span><span class="pl-c1">++</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-s1">prices</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-c1">+</span><span class="pl-c1">1</span><span class="pl-kos">]</span> <span class="pl-c1">&gt;</span> <span class="pl-s1">prices</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-kos">)</span> <span class="pl-s1">profit</span> <span class="pl-c1">+=</span> <span class="pl-s1">prices</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-c1">+</span><span class="pl-c1">1</span><span class="pl-kos">]</span> <span class="pl-c1">-</span> <span class="pl-s1">prices</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span>
    <span class="pl-kos">}</span>
    <span class="pl-k">return</span> <span class="pl-s1">profit</span>
<span class="pl-kos">}</span><span class="pl-kos">;</span></pre></div>
<h2>不同路径 <g-emoji class="g-emoji" alias="motorway" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f6e3.png">🛣</g-emoji></h2>
<blockquote>
<p>题目难度<code>medium</code>，涉及到的算法知识有动态规划。</p>
</blockquote>
<h3>题目描述</h3>
<p>一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。</p>
<p>机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。</p>
<p>问总共有多少条不同的路径？<br>
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/64963c8d9f1fd5fdf58daad1b42e6152ac5a7a21/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f31643130333161312d303931302d343637392d613662652d3962366439363536306563642e706e67"><img src="https://camo.githubusercontent.com/64963c8d9f1fd5fdf58daad1b42e6152ac5a7a21/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f31643130333161312d303931302d343637392d613662652d3962366439363536306563642e706e67" alt="" data-canonical-src="https://imgkr.cn-bj.ufileos.com/1d1031a1-0910-4679-a6be-9b6d96560ecd.png" style="max-width:100%;"></a><br>
例如，上图是一个 7 x 3 的网格。有多少可能的路径？</p>
<p>示例 &nbsp;1:</p>
<div class="highlight highlight-source-js"><pre>输入: <span class="pl-s1">m</span> <span class="pl-c1">=</span> <span class="pl-c1">3</span><span class="pl-kos">,</span> <span class="pl-s1">n</span> <span class="pl-c1">=</span> <span class="pl-c1">2</span>
输出: <span class="pl-c1">3</span>
解释:
<span class="pl-s1">从左上角开始，总共有</span> <span class="pl-c1">3</span> <span class="pl-s1">条路径可以到达右下角。</span>
<span class="pl-c1">1.</span> <span class="pl-s1">向右</span> <span class="pl-c1">-</span><span class="pl-c1">&gt;</span> <span class="pl-s1">向右</span> <span class="pl-c1">-</span><span class="pl-c1">&gt;</span> <span class="pl-s1">向下</span>
<span class="pl-c1">2.</span> <span class="pl-s1">向右</span> <span class="pl-c1">-</span><span class="pl-c1">&gt;</span> <span class="pl-s1">向下</span> <span class="pl-c1">-</span><span class="pl-c1">&gt;</span> <span class="pl-s1">向右</span>
<span class="pl-c1">3.</span> <span class="pl-s1">向下</span> <span class="pl-c1">-</span><span class="pl-c1">&gt;</span> <span class="pl-s1">向右</span> <span class="pl-c1">-</span><span class="pl-c1">&gt;</span> <span class="pl-s1">向右</span></pre></div>
<p>示例 &nbsp;2:</p>
<div class="highlight highlight-source-js"><pre>输入: <span class="pl-s1">m</span> <span class="pl-c1">=</span> <span class="pl-c1">7</span><span class="pl-kos">,</span> <span class="pl-s1">n</span> <span class="pl-c1">=</span> <span class="pl-c1">3</span>
输出: <span class="pl-c1">28</span></pre></div>
<h3>思路分析</h3>
<p>由题可知：机器人只能向右或向下移动一步，那么从左上角到右下角的走法 = 从右边开始走的路径总数+从下边开始走的路径总数。<br>
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/a27e1593c1167bee5711ab90e546ffaf05b9f8bf/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f35343432303932662d623639662d346236382d383038312d6537343037356161346265622e706e67"><img src="https://camo.githubusercontent.com/a27e1593c1167bee5711ab90e546ffaf05b9f8bf/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f35343432303932662d623639662d346236382d383038312d6537343037356161346265622e706e67" alt="" data-canonical-src="https://imgkr.cn-bj.ufileos.com/5442092f-b69f-4b68-8081-e74075aa4beb.png" style="max-width:100%;"></a></p>
<p>所以可推出动态方程为：<code>dp[i][j] = dp[i-1][j]+dp[i][j-1]</code>。</p>
<h3>代码实现</h3>
<blockquote>
<p>这里采用<code>Array(m).fill(Array(n).fill(1))</code>进行了初始化，因为每一格至少有一种走法。</p>
</blockquote>
<div class="highlight highlight-source-js"><pre><span class="pl-c">/**</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">number</span>} m</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">number</span>} n</span>
<span class="pl-c"> * <span class="pl-k">@return</span> {<span class="pl-smi">number</span>}</span>
<span class="pl-c"> */</span>
<span class="pl-k">var</span> <span class="pl-en">uniquePaths</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">m</span><span class="pl-kos">,</span> <span class="pl-s1">n</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">let</span> <span class="pl-s1">dp</span> <span class="pl-c1">=</span> <span class="pl-v">Array</span><span class="pl-kos">(</span><span class="pl-s1">m</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">fill</span><span class="pl-kos">(</span><span class="pl-v">Array</span><span class="pl-kos">(</span><span class="pl-s1">n</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">fill</span><span class="pl-kos">(</span><span class="pl-c1">1</span><span class="pl-kos">)</span><span class="pl-kos">)</span>
    <span class="pl-k">for</span> <span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">i</span> <span class="pl-c1">=</span> <span class="pl-c1">1</span><span class="pl-kos">;</span> <span class="pl-s1">i</span> <span class="pl-c1">&lt;</span> <span class="pl-s1">m</span><span class="pl-kos">;</span><span class="pl-s1">i</span><span class="pl-c1">++</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-k">for</span> <span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">j</span> <span class="pl-c1">=</span> <span class="pl-c1">1</span><span class="pl-kos">;</span> <span class="pl-s1">j</span><span class="pl-c1">&lt;</span> <span class="pl-s1">n</span><span class="pl-kos">;</span> <span class="pl-s1">j</span><span class="pl-c1">++</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-s1">dp</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-kos">[</span><span class="pl-s1">j</span><span class="pl-kos">]</span> <span class="pl-c1">=</span> <span class="pl-s1">dp</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-c1">-</span><span class="pl-c1">1</span><span class="pl-kos">]</span><span class="pl-kos">[</span><span class="pl-s1">j</span><span class="pl-kos">]</span> <span class="pl-c1">+</span> <span class="pl-s1">dp</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-kos">[</span><span class="pl-s1">j</span><span class="pl-c1">-</span><span class="pl-c1">1</span><span class="pl-kos">]</span>
        <span class="pl-kos">}</span>
    <span class="pl-kos">}</span>
    <span class="pl-k">return</span> <span class="pl-s1">dp</span><span class="pl-kos">[</span><span class="pl-s1">m</span><span class="pl-c1">-</span><span class="pl-c1">1</span><span class="pl-kos">]</span><span class="pl-kos">[</span><span class="pl-s1">n</span><span class="pl-c1">-</span><span class="pl-c1">1</span><span class="pl-kos">]</span>

<span class="pl-kos">}</span><span class="pl-kos">;</span></pre></div>
<h2>零钱兑换 <g-emoji class="g-emoji" alias="moneybag" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f4b0.png">💰</g-emoji></h2>
<blockquote>
<p>题目难度<code>medium</code>，涉及到的算法知识有动态规划。</p>
</blockquote>
<h3>题目描述</h3>
<p>给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 &nbsp;-1。</p>
<p>示例 &nbsp;1:</p>
<div class="highlight highlight-source-js"><pre>输入: <span class="pl-s1">coins</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-c1">1</span><span class="pl-kos">,</span> <span class="pl-c1">2</span><span class="pl-kos">,</span> <span class="pl-c1">5</span><span class="pl-kos">]</span><span class="pl-kos">,</span> <span class="pl-s1">amount</span> <span class="pl-c1">=</span> <span class="pl-c1">11</span>
输出: <span class="pl-c1">3</span>
解释: <span class="pl-c1">11</span> <span class="pl-c1">=</span> <span class="pl-c1">5</span> <span class="pl-c1">+</span> <span class="pl-c1">5</span> <span class="pl-c1">+</span> <span class="pl-c1">1</span></pre></div>
<p>示例 2:</p>
<div class="highlight highlight-source-js"><pre>输入: <span class="pl-s1">coins</span> <span class="pl-c1">=</span> <span class="pl-kos">[</span><span class="pl-c1">2</span><span class="pl-kos">]</span><span class="pl-kos">,</span> <span class="pl-s1">amount</span> <span class="pl-c1">=</span> <span class="pl-c1">3</span>
输出: <span class="pl-c1">-</span><span class="pl-c1">1</span></pre></div>
<p><b>说明:</b><br>
你可以认为每种硬币的数量是无限的。</p>
<h3>思路分析</h3>
<p>这道题目我们同样采用<code>动态规划</code>来解决。<br>
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/3904be1973cc1849188de7115365a1d9df8d6a85/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f63656363383030392d366563352d343763312d616161372d3439633636336531343835382e706e67"><img src="https://camo.githubusercontent.com/3904be1973cc1849188de7115365a1d9df8d6a85/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f63656363383030392d366563352d343763312d616161372d3439633636336531343835382e706e67" alt="" data-canonical-src="https://imgkr.cn-bj.ufileos.com/cecc8009-6ec5-47c1-aaa7-49c663e14858.png" style="max-width:100%;"></a></p>
<p>假设给出的不同面额的硬币是[1, 2, 5]，目标是 60，问最少需要的硬币个数？</p>
<p>我们需要先分解子问题，分层级找最优子结构。</p>
<blockquote>
<p><code>dp[i]</code>: 表示总金额为 <code>i</code> 的时候最优解法的硬币数</p>
</blockquote>
<p>我们想一下：求总金额 60 有几种方法？一共有 3 种方式，因为我们有 3 种不同面值的硬币。</p>
<ul>
<li>拿一枚面值为 1 的硬币 + 总金额为 59 的最优解法的硬币数量。即：dp[59] + 1</li>
<li>拿一枚面值为 2 的硬币 + 总金额为 58 的最优解法的硬币数。即：dp[58] + 1</li>
<li>拿一枚面值为 5 的硬币 + 总金额为 55 的最优解法的硬币数。即：dp[55] + 1</li>
</ul>
<p>所以，总金额为 60 的最优解法就是上面这三种解法中最优的一种，也就是硬币数最少的一种，我们下面用代码来表示一下：</p>
<div class="highlight highlight-source-js"><pre><span class="pl-s1">dp</span><span class="pl-kos">[</span><span class="pl-c1">60</span><span class="pl-kos">]</span> <span class="pl-c1">=</span> <span class="pl-v">Math</span><span class="pl-kos">.</span><span class="pl-en">min</span><span class="pl-kos">(</span><span class="pl-s1">dp</span><span class="pl-kos">[</span><span class="pl-c1">59</span><span class="pl-kos">]</span> <span class="pl-c1">+</span> <span class="pl-c1">1</span><span class="pl-kos">,</span> <span class="pl-s1">dp</span><span class="pl-kos">[</span><span class="pl-c1">58</span><span class="pl-kos">]</span> <span class="pl-c1">+</span> <span class="pl-c1">1</span><span class="pl-kos">,</span> <span class="pl-s1">dp</span><span class="pl-kos">[</span><span class="pl-c1">55</span><span class="pl-kos">]</span> <span class="pl-c1">+</span> <span class="pl-c1">1</span><span class="pl-kos">)</span><span class="pl-kos">;</span></pre></div>
<p>推导出<code>状态转移方程</code>：</p>
<div class="highlight highlight-source-js"><pre><span class="pl-s1">dp</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span> <span class="pl-c1">=</span> <span class="pl-v">Math</span><span class="pl-kos">.</span><span class="pl-en">min</span><span class="pl-kos">(</span><span class="pl-s1">dp</span><span class="pl-kos">[</span><span class="pl-s1">i</span> <span class="pl-c1">-</span> <span class="pl-s1">coin</span><span class="pl-kos">]</span> <span class="pl-c1">+</span> <span class="pl-c1">1</span><span class="pl-kos">,</span> <span class="pl-s1">dp</span><span class="pl-kos">[</span><span class="pl-s1">i</span> <span class="pl-c1">-</span> <span class="pl-s1">coin</span><span class="pl-kos">]</span> <span class="pl-c1">+</span> <span class="pl-c1">1</span><span class="pl-kos">,</span> ...<span class="pl-kos">)</span></pre></div>
<blockquote>
<p>其中 <code>coin</code> 有多少种可能，我们就需要比较多少次，遍历 <code>coins</code> 数组，分别去对比即可</p>
</blockquote>
<h3>代码实现</h3>
<div class="highlight highlight-source-js"><pre><span class="pl-c">/**</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">number[]</span>} coins</span>
<span class="pl-c"> * <span class="pl-k">@param</span> {<span class="pl-smi">number</span>} amount</span>
<span class="pl-c"> * <span class="pl-k">@return</span> {<span class="pl-smi">number</span>}</span>
<span class="pl-c"> */</span>
<span class="pl-k">var</span> <span class="pl-en">coinChange</span> <span class="pl-c1">=</span> <span class="pl-k">function</span><span class="pl-kos">(</span><span class="pl-s1">coins</span><span class="pl-kos">,</span> <span class="pl-s1">amount</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
    <span class="pl-k">let</span> <span class="pl-s1">dp</span> <span class="pl-c1">=</span> <span class="pl-k">new</span> <span class="pl-v">Array</span><span class="pl-kos">(</span><span class="pl-s1">amount</span><span class="pl-c1">+</span><span class="pl-c1">1</span><span class="pl-kos">)</span><span class="pl-kos">.</span><span class="pl-en">fill</span><span class="pl-kos">(</span><span class="pl-v">Infinity</span><span class="pl-kos">)</span>
    <span class="pl-s1">dp</span><span class="pl-kos">[</span><span class="pl-c1">0</span><span class="pl-kos">]</span> <span class="pl-c1">=</span> <span class="pl-c1">0</span><span class="pl-kos">;</span>
    <span class="pl-k">for</span> <span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">i</span><span class="pl-c1">=</span><span class="pl-c1">0</span><span class="pl-kos">;</span><span class="pl-s1">i</span>&lt;= <span class="pl-s1">amount</span><span class="pl-kos">;</span><span class="pl-s1">i</span><span class="pl-c1">++</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
        <span class="pl-k">for</span> <span class="pl-kos">(</span><span class="pl-k">let</span> <span class="pl-s1">coin</span> <span class="pl-k">of</span> <span class="pl-s1">coins</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
            <span class="pl-k">if</span> <span class="pl-kos">(</span><span class="pl-s1">i</span> <span class="pl-c1">-</span> <span class="pl-s1">coin</span> &gt;= <span class="pl-c1">0</span><span class="pl-kos">)</span> <span class="pl-kos">{</span>
                <span class="pl-s1">dp</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span> <span class="pl-c1">=</span> <span class="pl-v">Math</span><span class="pl-kos">.</span><span class="pl-en">min</span><span class="pl-kos">(</span><span class="pl-s1">dp</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-kos">]</span><span class="pl-kos">,</span> <span class="pl-s1">dp</span><span class="pl-kos">[</span><span class="pl-s1">i</span><span class="pl-c1">-</span><span class="pl-s1">coin</span><span class="pl-kos">]</span><span class="pl-c1">+</span><span class="pl-c1">1</span><span class="pl-kos">)</span>
            <span class="pl-kos">}</span>
        <span class="pl-kos">}</span>
    <span class="pl-kos">}</span>
    <span class="pl-k">return</span> <span class="pl-s1">dp</span><span class="pl-kos">[</span><span class="pl-s1">amount</span><span class="pl-kos">]</span> <span class="pl-c1">===</span> <span class="pl-v">Infinity</span> ? <span class="pl-c1">-</span><span class="pl-c1">1</span> : <span class="pl-s1">dp</span><span class="pl-kos">[</span><span class="pl-s1">amount</span><span class="pl-kos">]</span>
<span class="pl-kos">}</span><span class="pl-kos">;</span></pre></div>
<h2>福利</h2>
<p>大多数前端同学对于算法的系统学习，其实是比较茫然的，这里我整理了一张思维导图，算是比较全面的概括了前端算法体系。<br>
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/97bc7b749ad8f3f7dcf5cd27b3d67ecb4d80ead6/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f63386162663536332d306333652d343130372d623033332d6165346466346538623562352e706e67"><img src="https://camo.githubusercontent.com/97bc7b749ad8f3f7dcf5cd27b3d67ecb4d80ead6/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f63386162663536332d306333652d343130372d623033332d6165346466346538623562352e706e67" alt="" data-canonical-src="https://imgkr.cn-bj.ufileos.com/c8abf563-0c3e-4107-b033-ae4df4e8b5b5.png" style="max-width:100%;"></a></p>
<p>另外我还维护了一个<code>github</code>仓库：<code>https://github.com/Jack-cool/js_algorithm</code>，里面包含了大量的<code>leetcode</code>题解，并且还在不断更新中，感觉不错的给个<code>star</code>哈！<g-emoji class="g-emoji" alias="hugs" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f917.png">🤗</g-emoji><br>
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/74e3a363ab6b7aeca7e8897d79acb12acd3fead7/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f32386630346231302d323336312d343030322d393264622d3063373732336531616331662e706e67"><img src="https://camo.githubusercontent.com/74e3a363ab6b7aeca7e8897d79acb12acd3fead7/68747470733a2f2f696d676b722e636e2d626a2e7566696c656f732e636f6d2f32386630346231302d323336312d343030322d393264622d3063373732336531616331662e706e67" alt="" data-canonical-src="https://imgkr.cn-bj.ufileos.com/28f04b10-2361-4002-92db-0c7723e1ac1f.png" style="max-width:100%;"></a></p>
      </td>
    </tr>
  </tbody>
</table>