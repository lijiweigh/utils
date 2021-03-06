<article id="post-111051" class="post-111051 post type-post status-publish format-standard hentry category-uncategorized tag-git">
					<header class="entry-header">
						<h1 class="entry-title">Git中的HEAD ^和HEAD?有什么区别？</h1>
													<div class="entry-content">
						<div class="single-content">			
							<h2>What's the difference between HEAD^ and HEAD~ in Git?</h2>
<div id="fc">
<p>
当我在Git中指定祖先提交对象时，我在<code>HEAD^</code>和<code>HEAD~</code>之间感到困惑。
</p>
<p>
两者都有"编号"版本，例如<code>HEAD^3</code>和<code>HEAD~2</code>。
</p>
<p>
在我看来，它们看起来非常相似或相同，但是波浪号和插入符号之间是否有任何区别？
</p>
<div class="suo-content"><div style="text-align: right;">
		<div class="xControl"><i class="fa fa-caret-right"></i>
			<span class="xTitle"></span> 
			<a href="javascript:void(0)" class="collapseButton xButton">相关讨论</a>
			<div style="clear: both;"></div>
		</div>
		<div class="xContent" style="display: none;"><p></p>
<ul>
<li>
粘贴链接很不好，我知道，但这是我发现的最好的解释，里面有图片。paulboxley.com/blog/2011/06/git-caret-and-tilde
</li>
<li>
链接断开时尤其糟糕。 这就是为什么更安全地回答该问题的原因，因为它能够复制粘贴一些说明，从而有助于防止这一问题：)</li>
</ul>
<p></p></div>
	</div><p></p></div>
<hr>
经验法则<p></p>
<ul>
<li>
大多数时候使用<code>~</code>-可以追溯到很多代，通常是您想要的
</li>
<li>
在合并提交上使用<code>^</code>-因为它们有两个或多个(直接)父级
</li>
</ul>
<p>
口诀：
</p>
<ul>
<li>
Tilde <code>~</code>的外观几乎是线性的，并且想要沿直线向后移动
</li>
<li>
插入符<code>^</code>提示道路上有趣的树或叉子部分
</li>
</ul>
<p>波浪号</p>
<p>
<code>git rev-parse</code>文档的"指定修订"部分将<code>~</code>定义为
</p>
<blockquote>
<p>
<code><rev>~<n></n></rev></code>, e.g. <code>master~3</code><br>
  A suffix <code>~<n></n></code> to a revision parameter means the commit object that is the nth generation ancestor of the named commit object, following only the first parents. [For example,] <code><rev>~3</rev></code> is equivalent to <code><rev>^^^</rev></code> which is equivalent to <code><rev>^1^1^1</rev></code> …
</p>
</blockquote>
<p>
您可以进行任何提交的父母，而不仅仅是<code>HEAD</code>。您还可以追溯几代人：例如，<code>master~2</code>表示master分支尖端的祖父母，在合并提交时偏爱第一个父级。
</p>
<p>插入符号</p>
<p>
Git历史是非线性的：有向无环图(DAG)或树。对于只有一个父对象的提交，<code>rev~</code>和<code>rev^</code>表示同一意思。插入符选择器对于合并提交很有用，因为每个提交都是两个或多个父母的孩子，并且会压缩从生物学借来的语言。
</p>
<p>
<code>HEAD^</code>表示当前分支的尖端的第一个直接父代。 <code>HEAD^</code>是<code>HEAD^1</code>的缩写，您也可以根据需要寻址<code>HEAD^2</code>等。 <code>git rev-parse</code>文档的同一部分将其定义为
</p>
<blockquote>
<p>
<code><rev>^</rev></code>, e.g. <code>HEAD^</code>, <code>v1.5.1^0</code><br>
  A suffix <code>^</code> to a revision parameter means the first parent of that commit object. <code>^<n></n></code> means the nth parent ([e.g.] <code><rev>^</rev></code> is equivalent to <code><rev>^1</rev></code>). As a special rule, <code><rev>^0</rev></code> means the commit itself and is used when <code><rev></rev></code> is the object name of a tag object that refers to a commit object.
</p>
</blockquote>
<p>例子</p>
<p>
这些说明符或选择器可以任意链接，例如，英语中的<code>topic~3^2</code>是合并提交的第二个父级，该合并提交是分支<code>topic</code>当前尖端的曾祖父母(返回三代)。
</p>
<p>
<code>git rev-parse</code>文档的上述部分通过概念性的git历史记录跟踪了许多路径。时间通常向下流动。提交D，F，B和A是合并提交。
</p>
<blockquote>
<p>
Here is an illustration, by Jon Loeliger. Both commit nodes B and C are parents of commit node A. Parent commits are ordered left-to-right.
</p>
<div class="codecolorer-container text dawn" style="overflow:auto;white-space:nowrap;width:100%;"><table cellspacing="0" cellpadding="0"><tbody><tr><td class="line-numbers"><div>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br></div></td><td><div class="text codecolorer">G &nbsp; H &nbsp; I &nbsp; J<br>
&nbsp;\ / &nbsp; &nbsp; \ /<br>
&nbsp; D &nbsp; E &nbsp; F<br>
&nbsp; &nbsp;\ &nbsp;| &nbsp;/ \<br>
&nbsp; &nbsp; \ | / &nbsp; |<br>
&nbsp; &nbsp; &nbsp;\|/ &nbsp; &nbsp;|<br>
&nbsp; &nbsp; &nbsp; B &nbsp; &nbsp; C<br>
&nbsp; &nbsp; &nbsp; &nbsp;\ &nbsp; /<br>
&nbsp; &nbsp; &nbsp; &nbsp; \ /<br>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;A<br>
<br>
A = &nbsp; &nbsp; &nbsp;= A^0<br>
B = A^ &nbsp; = A^1 &nbsp; &nbsp; = A~1<br>
C = A^2<br>
D = A^^ &nbsp;= A^1^1 &nbsp; = A~2<br>
E = B^2 &nbsp;= A^^2<br>
F = B^3 &nbsp;= A^^3<br>
G = A^^^ = A^1^1^1 = A~3<br>
H = D^2 &nbsp;= B^^2 &nbsp; &nbsp;= A^^^2 &nbsp;= A~2^2<br>
I = F^ &nbsp; = B^3^ &nbsp; &nbsp;= A^^3^<br>
J = F^2 &nbsp;= B^3^2 &nbsp; = A^^3^2</div></td></tr></tbody></table></div>
</blockquote>
<p>
运行以下代码以创建一个git存储库，其历史记录与引用的插图匹配。
</p>
<div class="codecolorer-container text dawn" style="overflow:auto;white-space:nowrap;width:100%;"><table cellspacing="0" cellpadding="0"><tbody><tr><td class="line-numbers"><div>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br>22<br>23<br>24<br>25<br>26<br>27<br>28<br>29<br>30<br>31<br>32<br>33<br>34<br>35<br>36<br>37<br>38<br>39<br>40<br></div></td><td><div class="text codecolorer">#! /usr/bin/env perl<br>
<br>
use strict;<br>
use warnings;<br>
use subs qw/ postorder /;<br>
use File::Temp qw/ mkdtemp /;<br>
<br>
my %sha1;<br>
my %parents = (<br>
&nbsp; A =&gt; [ qw/ B C / &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ],<br>
&nbsp; B =&gt; [ qw/ &nbsp; &nbsp; D E F / &nbsp; &nbsp; &nbsp; &nbsp; ],<br>
&nbsp; C =&gt; [ qw/ &nbsp; &nbsp; &nbsp; &nbsp; F / &nbsp; &nbsp; &nbsp; &nbsp; ],<br>
&nbsp; D =&gt; [ qw/ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; G H / &nbsp; &nbsp; ],<br>
&nbsp; F =&gt; [ qw/ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; I J / ],<br>
);<br>
<br>
sub postorder {<br>
&nbsp; my($root,$hash) = @_;<br>
&nbsp; my @parents = @{ $parents{$root} || [] };<br>
&nbsp; postorder($_, $hash) for @parents;<br>
&nbsp; return if $sha1{$root};<br>
&nbsp; @parents = map"-p $sha1{$_}", @parents;<br>
&nbsp; chomp($sha1{$root} = `git commit-tree @parents -m"$root" $hash`);<br>
&nbsp; die"$0: git commit-tree failed" if $?;<br>
&nbsp; system("git tag -a -m '$sha1{$root}' '$root' '$sha1{$root}'") == 0 or die"$0: git tag failed";<br>
}<br>
<br>
$0 =~ s!^.*/!!; &nbsp;# / fix Stack Overflow highlighting<br>
my $repo = mkdtemp"repoXXXXXXXX";<br>
chdir $repo or die"$0: chdir: $!";<br>
system("git init") == 0 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; or die"$0: git init failed";<br>
chomp(my $tree = `git write-tree`); &nbsp; &nbsp; &nbsp;die"$0: git write-tree failed" if $?;<br>
<br>
postorder 'A', $tree;<br>
system"git update-ref HEAD &nbsp; $sha1{A}"; die"$0: git update-ref failed" if $?;<br>
system"git update-ref master $sha1{A}"; die"$0: git update-ref failed" if $?;<br>
<br>
# for browsing history - http://blog.kfish.org/2010/04/git-lola.html<br>
system"git config alias.lol &nbsp;'log --graph --decorate --pretty=oneline --abbrev-commit'";<br>
system"git config alias.lola 'log --graph --decorate --pretty=oneline --abbrev-commit --all'";</div></td></tr></tbody></table></div>
<p>
它仅在<code>git lol</code>和<code>git lola</code>的新的一次性仓库中添加别名，因此您可以按以下方式查看历史记录：
</p>
<div class="codecolorer-container text dawn" style="overflow:auto;white-space:nowrap;width:100%;"><table cellspacing="0" cellpadding="0"><tbody><tr><td class="line-numbers"><div>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br></div></td><td><div class="text codecolorer">$ git lol<br>
* &nbsp; 29392c8 (HEAD -&gt; master, tag: A) A<br>
|\<br>
| * a1ef6fd (tag: C) C<br>
| |<br>
| &nbsp;\<br>
*-. \ &nbsp; 8ae20e9 (tag: B) B<br>
|\ \ \<br>
| | |/<br>
| | * &nbsp; 03160db (tag: F) F<br>
| | |\<br>
| | | * 9df28cb (tag: J) J<br>
| | * 2afd329 (tag: I) I<br>
| * a77cb1f (tag: E) E<br>
* &nbsp; cd75703 (tag: D) D<br>
|\<br>
| * 3043d25 (tag: H) H<br>
* 4ab0473 (tag: G) G</div></td></tr></tbody></table></div>
<p>
请注意，在您的计算机上，SHA-1对象名称与上面的名称不同，但是标签允许您按名称处理提交并检查您的理解。
</p>
<div class="codecolorer-container text dawn" style="overflow:auto;white-space:nowrap;width:100%;"><table cellspacing="0" cellpadding="0"><tbody><tr><td class="line-numbers"><div>1<br>2<br>3<br>4<br>5<br>6<br></div></td><td><div class="text codecolorer">$ git log -1 --format=%f $(git rev-parse A^)<br>
B<br>
$ git log -1 --format=%f $(git rev-parse A~^3~)<br>
I<br>
$ git log -1 --format=%f $(git rev-parse A^2~)<br>
F</div></td></tr></tbody></table></div>
<p>
<code>git rev-parse</code>文档中的"指定修订版本"包含了很多信息，值得深入阅读。另请参阅Pro Git书中的Git工具-版本选择。
</p>
<p>家长提交顺序</p>
<p>
git自己的历史记录中的提交89e4fcb0dd是合并提交，如<code>git show 89e4fcb0dd</code>所示，并带有显示直接祖先对象名称的Merge标头行。
</p>
<blockquote>
<div class="codecolorer-container text dawn" style="overflow:auto;white-space:nowrap;width:100%;"><table cellspacing="0" cellpadding="0"><tbody><tr><td class="line-numbers"><div>1<br>2<br>3<br>4<br>5<br>6<br></div></td><td><div class="text codecolorer">commit 89e4fcb0dd01b42e82b8f27f9a575111a26844df<br>
Merge: c670b1f876 649bf3a42f b67d40adbb<br>
Author: Junio C Hamano &lt;gitster@pobox.com&gt;<br>
Date: &nbsp; Mon Oct 29 10:15:31 2018 +0900<br>
<br>
&nbsp; &nbsp; Merge branches 'bp/reset-quiet' and 'js/mingw-http-ssl' into nd/config-split […]</div></td></tr></tbody></table></div>
</blockquote>
<p>
我们可以要求<code>git rev-parse</code>依次显示89e4fcb0dd的直系父母，以确认顺序。
</p>
<div class="codecolorer-container text dawn" style="overflow:auto;white-space:nowrap;width:100%;"><table cellspacing="0" cellpadding="0"><tbody><tr><td class="line-numbers"><div>1<br>2<br>3<br>4<br></div></td><td><div class="text codecolorer">$ git rev-parse 89e4fcb0dd^1 89e4fcb0dd^2 89e4fcb0dd^3<br>
c670b1f876521c9f7cd40184bf7ed05aad843433<br>
649bf3a42f344e71b1b5a7f562576f911a1f7423<br>
b67d40adbbaf4f5c4898001bf062a9fd67e43368</div></td></tr></tbody></table></div>
<p>
查询不存在的第四父级会导致错误。
</p>
<div class="codecolorer-container text dawn" style="overflow:auto;white-space:nowrap;width:100%;"><table cellspacing="0" cellpadding="0"><tbody><tr><td class="line-numbers"><div>1<br>2<br>3<br>4<br>5<br></div></td><td><div class="text codecolorer">$ git rev-parse 89e4fcb0dd^4<br>
89e4fcb0dd^4<br>
fatal: ambiguous argument '89e4fcb0dd^4': unknown revision or path not in the working tree.<br>
Use '--' to separate paths from revisions, like this:<br>
'git &lt;command&gt; [&lt;revision&gt;...] -- [&lt;file&gt;...]'</div></td></tr></tbody></table></div>
<p>
如果只想提取父母，请使用漂亮的格式<code>%P</code>表示完整的哈希
</p>
<div class="codecolorer-container text dawn" style="overflow:auto;white-space:nowrap;width:100%;"><table cellspacing="0" cellpadding="0"><tbody><tr><td class="line-numbers"><div>1<br>2<br></div></td><td><div class="text codecolorer">$ git log -1 --pretty=%P 89e4fcb0dd<br>
c670b1f876521c9f7cd40184bf7ed05aad843433 649bf3a42f344e71b1b5a7f562576f911a1f7423 b67d40adbbaf4f5c4898001bf062a9fd67e43368</div></td></tr></tbody></table></div>
<p>
或<code>%P</code>(对于缩写父母)。
</p>
<div class="codecolorer-container text dawn" style="overflow:auto;white-space:nowrap;width:100%;"><table cellspacing="0" cellpadding="0"><tbody><tr><td class="line-numbers"><div>1<br>2<br></div></td><td><div class="text codecolorer">$ git log -1 --pretty=%p 89e4fcb0dd<br>
c670b1f876 649bf3a42f b67d40adbb</div></td></tr></tbody></table></div>
<div class="suo-content"><div style="text-align: right;">
		<div class="xControl"><i class="fa fa-caret-right"></i>
			<span class="xTitle"></span> 
			<a href="javascript:void(0)" class="collapseButton xButton">相关讨论</a>
			<div style="clear: both;"></div>
		</div>
		<div class="xContent" style="display: none;"><p></p>
<ul>
<li>
似乎^可以处理所有情况，并且不知道为什么?会首先出现。为什么不只记得^的工作原理呢？
</li>
<li>
这仍然非常令人困惑...假设G是HEAD，那么如果我做HEAD ^，那将是D ...是吗？
</li>
<li>
@duckx图实际上是从上到下的，所以A是最新的提交，而G是最古老的提交。据我所知，从G到D的道路是向前而不是向后。
</li>
<li>
@SimonBudin我猜想，使用<code>^^^^^^^</code>代替<code>~7</code>不是很方便，是吗？这就是为什么<code>~</code>有用的原因
</li>
<li>
?的用例是什么？您如何在不知道要提交的提交的情况下使用它？
</li>
<li>
@sentece？它相对于HEAD或某些特定的提交SHA使用。 <code>HEAD~7</code>距第一个父代世系有七个世代。与<code>HEAD^1^1^1^1^1^1^1</code>相同。
</li>
<li>
TL; DR; <code><rev>~<n></n></rev></code>从<code>rev</code>上升到<code>n</code>个父级，每次选择第一个父级。使用<code><rev>^<n></n></rev></code>选择特定的父级。 git commit可以有多个父级(合并时)，如果您需要使用<code>^</code>选择一个特定的父级。
</li>
</ul>
<p></p></div>
	</div><p></p></div>
<hr>
<p>
http://www.kernel.org/pub/software/scm/git/docs/git-rev-parse.html上的插图(Jon Loeliger)很好地描述了<code>HEAD^</code>和<code>HEAD~</code>之间的差异。 。
</p>
<p>
本文档对于初学者可能有点晦涩，因此我复制了以下插图：
</p>
<div class="codecolorer-container text dawn" style="overflow:auto;white-space:nowrap;width:100%;"><table cellspacing="0" cellpadding="0"><tbody><tr><td class="line-numbers"><div>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br></div></td><td><div class="text codecolorer">G &nbsp; H &nbsp; I &nbsp; J<br>
&nbsp;\ / &nbsp; &nbsp; \ /<br>
&nbsp; D &nbsp; E &nbsp; F<br>
&nbsp; &nbsp;\ &nbsp;| &nbsp;/ \<br>
&nbsp; &nbsp; \ | / &nbsp; |<br>
&nbsp; &nbsp; &nbsp;\|/ &nbsp; &nbsp;|<br>
&nbsp; &nbsp; &nbsp; B &nbsp; &nbsp; C<br>
&nbsp; &nbsp; &nbsp; &nbsp;\ &nbsp; /<br>
&nbsp; &nbsp; &nbsp; &nbsp; \ /<br>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;A<br>
A = &nbsp; &nbsp; &nbsp;= A^0<br>
B = A^ &nbsp; = A^1 &nbsp; &nbsp; = A~1<br>
C = A^2<br>
D = A^^ &nbsp;= A^1^1 &nbsp; = A~2<br>
E = B^2 &nbsp;= A^^2<br>
F = B^3 &nbsp;= A^^3<br>
G = A^^^ = A^1^1^1 = A~3<br>
H = D^2 &nbsp;= B^^2 &nbsp; &nbsp;= A^^^2 &nbsp;= A~2^2<br>
I = F^ &nbsp; = B^3^ &nbsp; &nbsp;= A^^3^<br>
J = F^2 &nbsp;= B^3^2 &nbsp; = A^^3^2</div></td></tr></tbody></table></div>
<div class="suo-content"><div style="text-align: right;">
		<div class="xControl"><i class="fa fa-caret-right"></i>
			<span class="xTitle"></span> 
			<a href="javascript:void(0)" class="collapseButton xButton">相关讨论</a>
			<div style="clear: both;"></div>
		</div>
		<div class="xContent" style="display: none;"><p></p>
<ul>
<li>
眼见为谅！感谢您的明确图表。
</li>
<li>
只是一个问题。一个承诺有两个以上的父母怎么可能？ (请参阅B-它的父母是D，E和F)我想一个提交可以有两个父母的唯一方法是当它是一个合并提交时...但是如何同时合并三个提交？
</li>
<li>
如果我没记错的话，这可能很明显，但是我认为应该指定HEAD?跟随当前分支(如下面提到的Diego Dias)。
</li>
<li>
此外，<code>F = A^2^</code>。
</li>
<li>
因此，<code>^ == ^1 == LEFTMOST PARENT</code>，<code>^2 == SECOND LEFTMOST PARENT</code>等。还有<code>~ == ~1 == LEFTMOST PARENT</code>，<code>~2 == LEFTMOST PARENTS LEFTMOST PARENT == LEFTMOST GRANDPARENT</code>。通过扩展，<code>~2^2 == LEFTMOST GRANDPARENTS SECOND LEFTMOST PARENT</code>
</li>
<li>
@AlexanderTorstling这对我非常有帮助。但是，左右在这里是什么意思？
</li>
</ul>
<p></p></div>
	</div><p></p></div>
<p></p><center> <script src="/c1.js"></script><script async="" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- ifuun_auto -->
<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9972300587593929" data-ad-slot="8659184629" data-ad-format="auto" data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
</center><p></p>
<hr>
<p>
<code>~</code>和<code>^</code>本身都引用提交的父级(<code>~~</code>和<code>^^</code>都引用祖父母提交，等等。)但是当它们与数字一起使用时，它们的含义不同：
</p>
<ul>
<li>
<p>
<code>~2</code>表示层次结构中的两个级别，如果提交具有多个父级，则通过第一个父级
</p>
</li>
<li>
<p>
<code>^2</code>表示提交具有多个父项的第二个父项(即，因为它是合并项)
</p>
</li>
</ul>
<p>
这些可以组合，所以<code>HEAD~2^3</code>表示<code>HEAD</code>的祖父母提交的第三父提交。
</p>
<div class="suo-content"><div style="text-align: right;">
		<div class="xControl"><i class="fa fa-caret-right"></i>
			<span class="xTitle"></span> 
			<a href="javascript:void(0)" class="collapseButton xButton">相关讨论</a>
			<div style="clear: both;"></div>
		</div>
		<div class="xContent" style="display: none;"><p></p>
<ul>
<li>
读完这本书，然后再从stackoverflow.com/questions/2221658/中读取图片，这是很有意义的。
</li>
<li>
这应该是公认的答案，比其他答案更为简洁和有用。
</li>
<li>
这个答案使我区分了无数字和有数字的插入号/波浪号！我以为<code>^^</code>与<code>^2</code>是相同的，但不是。
</li>
</ul>
<p></p></div>
	</div><p></p></div>
<hr>
<p>
我的两分钱
</p>
<p>
<img src="//i1.wp.com/i.stack.imgur.com/pDAzG.png" alt="enter image description here" class="box-hide box-show">
</p>
<div class="suo-content"><div style="text-align: right;">
		<div class="xControl"><i class="fa fa-caret-right"></i>
			<span class="xTitle"></span> 
			<a href="javascript:void(0)" class="collapseButton xButton">相关讨论</a>
			<div style="clear: both;"></div>
		</div>
		<div class="xContent" style="display: none;"><p></p>
<ul>
<li>
而<code>H=A~2^2</code>不是<code>H=A~2^1</code>怎么办？
</li>
<li>
如果我正确找出来，则提交<code>A</code>，<code>B</code>，<code>D</code>，<code>G</code>在同一分支上，提交<code>D</code>是<code>G</code>和<code>H</code>的合并，因此两个父母。因此，来自其他分支的提交(<code>H</code>)被<code>^2</code>引用。
</li>
</ul>
<p></p></div>
	</div><p></p></div>
<hr>
<p>
这是从http://www.paulboxley.com/blog/2011/06/git-caret-and-tilde逐字记录的很好解释：
</p>
<blockquote>
<p>
<code>ref~</code> is shorthand for <code>ref~1</code> and means the commit's first parent. <code>ref~2</code> means the commit's first parent's first parent. <code>ref~3</code> means the commit's first parent's first parent's first parent. And so on.
</p>
<p>
<code>ref^</code> is shorthand for <code>ref^1</code> and means the commit's first parent. But where the two differ is that <code>ref^2</code> means the commit's second parent (remember, commits can have two parents when they are a merge).
</p>
<p>
The <code>^</code> and <code>~</code> operators can be combined.
</p>
</blockquote>
<p>
<img src="//i1.wp.com/i.stack.imgur.com/4Bdtm.png" alt="enter image description here" class="box-hide">
</p>
<div class="suo-content"><div style="text-align: right;">
		<div class="xControl"><i class="fa fa-caret-right"></i>
			<span class="xTitle"></span> 
			<a href="javascript:void(0)" class="collapseButton xButton">相关讨论</a>
			<div style="clear: both;"></div>
		</div>
		<div class="xContent" style="display: none;"><p></p>
<ul>
<li>
感谢您实际解释差异，而不是发布大量示例。</li>
</ul>
<p></p></div>
	</div><p></p></div>
<hr>
<p>
<code>^<n></n></code>格式允许您选择提交的第n个父级(与合并相关)。 <code>~<n></n></code>格式允许您选择始终在第一个父项之后的第n个祖先提交。有关一些示例，请参见git-rev-parse的文档。
</p>
<p></p><center> <script src="/c2.js"></script><script async="" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- ifuun_auto -->
<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9972300587593929" data-ad-slot="8659184629" data-ad-format="auto" data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
</center><p></p>
<hr>
<p>
值得注意的是，git还具有用于跟踪"从何处来" /"现在要回去"的语法-例如，<code>HEAD@{1}</code>将引用您跳转到新位置的位置提交位置。
</p>
<p>
基本上<code>HEAD@{}</code>变量捕获HEAD移动的历史记录，您可以使用命令<code>git reflog</code>通过查看git的引用日志来决定使用特定的head。
</p>
<p>
例：
</p>
<div class="codecolorer-container text dawn" style="overflow:auto;white-space:nowrap;width:100%;"><table cellspacing="0" cellpadding="0"><tbody><tr><td class="line-numbers"><div>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br>22<br>23<br>24<br>25<br>26<br>27<br>28<br>29<br></div></td><td><div class="text codecolorer">0aee51f HEAD@{0}: reset: moving to HEAD@{5}<br>
290e035 HEAD@{1}: reset: moving to HEAD@{7}<br>
0aee51f HEAD@{2}: reset: moving to HEAD@{3}<br>
290e035 HEAD@{3}: reset: moving to HEAD@{3}<br>
9e77426 HEAD@{4}: reset: moving to HEAD@{3}<br>
290e035 HEAD@{5}: reset: moving to HEAD@{3}<br>
0aee51f HEAD@{6}: reset: moving to HEAD@{3}<br>
290e035 HEAD@{7}: reset: moving to HEAD@{3}<br>
9e77426 HEAD@{8}: reset: moving to HEAD@{3}<br>
290e035 HEAD@{9}: reset: moving to HEAD@{1}<br>
0aee51f HEAD@{10}: reset: moving to HEAD@{4}<br>
290e035 HEAD@{11}: reset: moving to HEAD^<br>
9e77426 HEAD@{12}: reset: moving to HEAD^<br>
eb48179 HEAD@{13}: reset: moving to HEAD~<br>
f916d93 HEAD@{14}: reset: moving to HEAD~<br>
0aee51f HEAD@{15}: reset: moving to HEAD@{5}<br>
f19fd9b HEAD@{16}: reset: moving to HEAD~1<br>
290e035 HEAD@{17}: reset: moving to HEAD~2<br>
eb48179 HEAD@{18}: reset: moving to HEAD~2<br>
0aee51f HEAD@{19}: reset: moving to HEAD@{5}<br>
eb48179 HEAD@{20}: reset: moving to HEAD~2<br>
0aee51f HEAD@{21}: reset: moving to HEAD@{1}<br>
f916d93 HEAD@{22}: reset: moving to HEAD@{1}<br>
0aee51f HEAD@{23}: reset: moving to HEAD@{1}<br>
f916d93 HEAD@{24}: reset: moving to HEAD^<br>
0aee51f HEAD@{25}: commit (amend): 3rd commmit<br>
35a7332 HEAD@{26}: checkout: moving from temp2_new_br to temp2_new_br<br>
35a7332 HEAD@{27}: commit (amend): 3rd commmit<br>
72c0be8 HEAD@{28}: commit (amend): 3rd commmit</div></td></tr></tbody></table></div>
<p>
一个例子可能是我做了local-commits a-&gt; b-&gt; c-&gt; d，然后我放弃了2次提交以检查我的代码-<code>git reset HEAD~2</code>-然后在那之后我想将HEAD移回d -<code>git reset HEAD@{1}</code>。
</p>
<hr>
<p>
简单地：
</p>
<ul>
<li>
<code>~</code>指定祖先
</li>
<li>
<code>^</code>指定父母
</li>
</ul>
<p>
合并时可以指定一个或多个分支。然后一个提交有两个或两个以上的父母，然后<code>^</code>可用于指示父母。
</p>
<p>
假设您在分支A上，并且还有两个分支：B和C。
</p>
<p>
在每个分支上，最后三个提交是：
</p>
<ul>
<li>
答：A1，A2，A3
</li>
<li>
B：B1，B2，B3
</li>
<li>
C：C1，C3，C3
</li>
</ul>
<p>
如果现在在分支A上，则执行以下命令：
</p>
<div class="codecolorer-container text dawn" style="overflow:auto;white-space:nowrap;width:100%;"><table cellspacing="0" cellpadding="0"><tbody><tr><td class="line-numbers"><div>1<br></div></td><td><div class="text codecolorer">git merge B C</div></td></tr></tbody></table></div>
<p>
然后您将三个分支合并在一起(这里您的合并提交有三个父级)
</p>
<p>
和
</p>
<p>
<code>~</code>表示第一个分支中的第n个祖先，因此
</p>
<ul>
<li>
<code>HEAD~</code>表示A3
</li>
<li>
<code>HEAD~2</code>表示A2
</li>
<li>
<code>HEAD~3</code>表示A1
</li>
</ul>
<p>
<code>^</code>表示第n个父对象，因此
</p>
<ul>
<li>
<code>HEAD^</code>表示A3
</li>
<li>
<code>HEAD^2</code>表示B3
</li>
<li>
<code>HEAD^3</code>表示C3
</li>
</ul>
<p>
<code>~</code>或<code>^</code>彼此相邻的下一个用法是在先前字符指定的提交的上下文中。
</p>
<p>
注意1：
</p>
<ul>
<li>
<code>HEAD~3</code>始终等于：<code>HEAD~~~</code>和<code>HEAD^^^</code>(每个表示A1)，
</li>
</ul>
<p>
通常：
</p>
<ul>
<li>
<code>HEAD~n</code>始终等于：<code>HEAD~...~</code>(n倍<code>~</code>)和：<code>HEAD^...^</code>(n倍<code>^</code>)。
</li>
</ul>
<p>
注意2：
</p>
<ul>
<li>
<code>HEAD^3</code>与<code>HEAD^^^</code>不同(第一个表示C3，第二个表示A1)，
</li>
</ul>
<p>
通常：
</p>
<ul>
<li>
<code>HEAD^1</code>与<code>HEAD^</code>相同，
</li>
<li>
但对于n&gt; 1：<code>HEAD^n</code>始终与<code>HEAD^...^</code>不同(n倍<code>~</code>)。
</li>
</ul>
<hr>
<p>
TLDR
</p>
<p>
?是您大部分时间想要的，它引用过去对当前分支的提交
</p>
<p>
^引用父母(git-merge创建第二个父母或更多)
</p>
<p>
A?总是和A ^相同</p>
<p>A ~~始终与A ^^相同，依此类推</p>
<p>A?2与A ^ 2不同，</p>
<p>因为?2是~~的简写</p>
<p>^ 2并非简写形式，它表示第二个父级
</p>
<hr>
<p>
HEAD ^^^与HEAD?3相同，选择HEAD之前的第三次提交
</p>
<p>
HEAD ^ 2指定合并提交中的第二个头
</p>
<hr>
<ul>
<li>
<p>
HEAD?指定"分支"上的第一个父对象
</p>
</li>
<li>
<p>
HEAD ^允许您选择提交的特定父项
</p>
</li>
</ul>
<p>
一个例子：
</p>
<p>
如果要遵循侧分支，则必须指定类似
</p>
<div class="codecolorer-container text dawn" style="overflow:auto;white-space:nowrap;width:100%;"><table cellspacing="0" cellpadding="0"><tbody><tr><td class="line-numbers"><div>1<br></div></td><td><div class="text codecolorer">master~209^2~15</div></td></tr></tbody></table></div>
<p></p><center> <script src="/c3.js"></script><script async="" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- ifuun_auto -->
<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9972300587593929" data-ad-slot="8659184629" data-ad-format="auto" data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
</center><p></p>
<hr>
HEAD?和HEAD ^之间差异的实际示例<p></p>
<p>
<img src="//i1.wp.com/i.stack.imgur.com/1qqSY.jpg" alt="HEAD^ VS HEAD~" class="box-hide">
</p>
<hr>
<p>
<code>~</code>这表示父级的父级。
</p>
<p>
<code>^</code>如果它有两个或多个父级，例如合并提交，我们可以选择第二个或另一个父级。
</p>
<p>
因此，如果只有一个东西((HEAD?或HEAD ^))，则结果相同。
</p>
<hr>
<p>
简而言之，对于第一级亲子关系(祖先，继承，世系等)，HEAD ^和HEAD?都指向同一提交，即(位于)HEAD(提交)上方的一个父级。
</p>
<p>
此外，HEAD ^ = HEAD ^ 1 = HEAD?= HEAD?1。但是HEAD ^^！= HEAD ^ 2！= HEAD?2。 HEAD ^^ = HEAD?2。继续阅读。
</p>
<p>
除了第一级的育儿之外，事情变得更加棘手，特别是如果工作分支/主分支已经合并(来自其他分支)。插入符号还存在语法问题，HEAD ^^ = HEAD?2(它们等效)，但是HEAD ^^！= HEAD ^ 2(它们完全是两个不同的东西)。
</p>
<p>
每个/插入符号都指HEAD的第一父代，这就是为什么将在一起的插入号等同于代字号表达式的原因，因为它们严格地基于连接的插入号上的数字来引用第一父代(第一父代)的第一父代等。或波浪号后面的数字(无论哪种方式，它们都代表相同的意思)，即与第一个父母住在一起并世世代代。
</p>
<p>
HEAD?2(或HEAD ^^)指的是提交，它是层次结构中当前提交(HEAD)的上一级/上一级的提交，表示HEAD的祖父母提交。
</p>
<p>
另一方面，HEAD ^ 2并不是指第一个父母的第二个父母的提交，而只是指第二个父母的提交。这是因为插入符号表示提交的父级，并且后面的数字表示引用哪个/哪个父提交(在插入符后没有数字的情况下，第一个父级[因为它是该数字的简写形式为1，表示第一个父级])。与插入符号不同，此后的数字并不表示层次结构向上另一级，而是表示在层次结构中侧身有多少个层次，需要找到正确的父级(提交)。与代字号表达式中的数字不同，该字符在层次结构中仅是一个父级，而不管(立即)插入号中的数字如何。对于整个层次结构中的父母，插入号的尾数不是向上，而是侧向计数(在向上的父级水平上，等于连续的插入号的数量)。
</p>
<p>
所以HEAD ^ 3等于HEAD提交的第三个父对象(不是曾祖父母，这就是HEAD ^^^ AND HEAD?3会是...)。
</p>
<p></p><center> <script src="/c4.js"></script><script async="" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- ifuun_auto -->
<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9972300587593929" data-ad-slot="8659184629" data-ad-format="auto" data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
</center><p></p>
<hr></div>
																								
						</div>
						<div class="clear"></div>
						
						<div class="social-main">
					<div class="clear"></div>
</div>												<div class="clear"></div>
					</div><!-- .entry-content -->
				</article>