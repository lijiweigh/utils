[![image](https://camo.githubusercontent.com/16af65d7892a4250761ed26bb5aedecce247e3e8/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f33302f313633623034313936326566663834323f773d39353926683d37333526663d706e6726733d3734393631)](https://camo.githubusercontent.com/16af65d7892a4250761ed26bb5aedecce247e3e8/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f33302f313633623034313936326566663834323f773d39353926683d37333526663d706e6726733d3734393631)

## 一、Git是什么，它与Github什么关系

Git是一款免费、开源的分布式源代码管理工具。

Github是用Git做版本控制的代码托管平台。

## 二、Git常用命令

[![image](https://camo.githubusercontent.com/67d5f587edcf4da90692689decded8d7b1a18f5b/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f33302f313633623034313936326439356633633f773d36313726683d31383126663d706e6726733d3730323839)](https://camo.githubusercontent.com/67d5f587edcf4da90692689decded8d7b1a18f5b/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f33302f313633623034313936326439356633633f773d36313726683d31383126663d706e6726733d3730323839)

一般来说，Git命令日常使用只要记住上图6个命令，就可以了。但是熟练使用，恐怕要记住60～100个命令。

接下来归纳了一些常用的命令：

把普通目录变为git工作区
`$ git init`

添加当前目录的所有文件到暂存区
`$ git add .`

提交暂存区到仓库区
`$ git commit -m “XXX” `

恢复暂存区的指定文件到工作区
`$ git checkout [file]`

checkout命令用于从历史提交（或者暂存区域）中拷贝文件到工作目录，也可用于切换分支。

上传本地指定分支到远程仓库（master分支）
`$ git push origin master`

取回远程仓库的变化，并与本地分支合并
`$ git pull [remote] [branch]`

列出所有本地分支
`$ git branch`

新建一个分支，但依然停留在当前分支
`$ git branch [branch-name]`//比如`git branch dev`创建“dev"分支

新建一个分支，并切换到该分支
`$ git checkout -b [branch]`  //比如`git checkout -b dev`切换到“dev"分支

合并指定分支到当前分支
`$ git merge [branch]`

## 三、如何进行多人协作（分支创建与合并）

#### 1.什么是分支？

分支是为了将修改记录的整体流程分叉保存。分叉后的分支不受其他分支的影响，所以在同一个数据库里可以同时进行多个修改。

#### 2.为什么要创建分支？

为了不受其他开发人员的影响，您可以在主分支上建立自己专用的分支。完成工作后，将自己分支上的修改合并到主分支。常常适用于当前开发的项目新增功能时，**代码还未写完或者出现bug未调试好**，这时创建分支将有效提高工作效率。因为每一次提交的历史记录都会在创建分支保存，所以当发生问题时，定位和修改造成问题的提交就容易多了。

#### 3.如何创建分支以及合并分支？

    git checkout -b dev//新建一个分支，并切换到该分支
    git branch//列出所有本地分支:*dev master,并显示当前停留在dev分支上 
    vi(m) a.js//在分支上修改文件，然后再上传远程仓库
    git add.
    git commit -m "update part2"
    git push origin dev//上传到dev分支远程，接下去要合并分支
    git checkout master//合并分支之前必须在master上
    git pull origin master//在当前master上同步到最新版本
    git merge dev//合并分支
    git push origin master//重新提交到远程仓库
    

[![image](https://camo.githubusercontent.com/de042a59005788ac852c4ad7c92a5ed1778daa22/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f33302f313633623034313936343937633863393f773d34393026683d32323526663d706e6726733d3634323633)](https://camo.githubusercontent.com/de042a59005788ac852c4ad7c92a5ed1778daa22/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f33302f313633623034313936343937633863393f773d34393026683d32323526663d706e6726733d3634323633)

## 四、如何用Github的gh-pages分支展示自己的项目

**master分支仅是浏览代码，而无法将页面直接在网页打开，而gh-pages分支则是用于直接浏览源码页面的分支**。当我们写项目的时候，需要部署一个预览页面，就可以采用github的gh-pages分支制作GitHub Pages。

接下来举个例子：如何将我的电脑上“在线教育页面作品”上传到GitHub，并实现在线预览

git安装完成后，首先配置信息

    配置用户名：  git config --global user.name "用户名"
    配置邮箱： git config--global user.email "邮箱地址"
    查看配置信息： git config --list
    

#### 1.先将作品上传到master分支上

    git init //把目标文件夹变为git工作区
    

[![image](https://camo.githubusercontent.com/9b95d648d87573b5d0172a68b560def15fc8da57/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f33302f313633623034313936346661636338373f773d37373126683d33343926663d706e6726733d3334303639)](https://camo.githubusercontent.com/9b95d648d87573b5d0172a68b560def15fc8da57/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f33302f313633623034313936346661636338373f773d37373126683d33343926663d706e6726733d3334303639)

    git add .
    git commit -m "education"
    

接下来创建education仓库，如下图

[![image](https://camo.githubusercontent.com/3ab2316aa9d7fdfe424a95959d640f6910c11913/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f33302f313633623034313936346435333333343f773d37373526683d35323026663d706e6726733d3531333335)](https://camo.githubusercontent.com/3ab2316aa9d7fdfe424a95959d640f6910c11913/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f33302f313633623034313936346435333333343f773d37373526683d35323026663d706e6726733d3531333335)

创建好仓库后，页面自动跳转到如下页面：

[![image](https://camo.githubusercontent.com/bf046e23700d3ec420ff009915bd84bd76355e05/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f33302f313633623034313936353531386137383f773d36333326683d35313426663d706e6726733d3539363032)](https://camo.githubusercontent.com/bf046e23700d3ec420ff009915bd84bd76355e05/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f33302f313633623034313936353531386137383f773d36333326683d35313426663d706e6726733d3539363032)

接下来输入以下两行命令行:

    git remote add origin https://github.com/ljianshu/education.git
    git push -u origin master
    

输入两行命令行后，按提示输入账户密码，如下图：

[![image](https://camo.githubusercontent.com/26353ceeec7517159d3b8230fead8ef4b3e6b1b2/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f33302f313633623034313939396563613430343f773d36383426683d33333826663d706e6726733d3233303737)](https://camo.githubusercontent.com/26353ceeec7517159d3b8230fead8ef4b3e6b1b2/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f33302f313633623034313939396563613430343f773d36383426683d33333826663d706e6726733d3233303737)

出现如下页面，意味着文件已经全部上传到master分支上，此时你也可以添加一个README.md文件，便于让他人看懂你上传文件。

[![image](https://camo.githubusercontent.com/edb83642bf0e1b2b56d1d02560db9ebc0d7dea14/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f33302f313633623034313939386162366537663f773d3131303626683d34323926663d706e6726733d3433383236)](https://camo.githubusercontent.com/edb83642bf0e1b2b56d1d02560db9ebc0d7dea14/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f33302f313633623034313939386162366537663f773d3131303626683d34323926663d706e6726733d3433383236)

#### 2.创建gh-pages分支,再将作品重新上传到该分支上

    git checkout -b gh-pages
    git push -u origin gh-pages
    

[![image](https://camo.githubusercontent.com/47ff315ff521eb961e66d92b100185054c6ebe9e/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f33302f313633623034313939626563623935323f773d3131303726683d35303026663d706e6726733d3530373433)](https://camo.githubusercontent.com/47ff315ff521eb961e66d92b100185054c6ebe9e/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f33302f313633623034313939626563623935323f773d3131303726683d35303026663d706e6726733d3530373433)

那这时候，我们看到已经多出了一个gh-pages分支，那么作品展示地址就是**Github用户名.github.io/创建的仓库名**。本例子线上预览`https://ljianshu.github.io/education`。当然你也可以购买一个特色域名，并且绑定在GitHub服务器上。

#### 3.master修改后如何自动同步到gh-pages分支

每次当作品发生更改变动后，要先提交到master分支然后切换到gh-pages分支又重新提交一次，显然这个过程非常繁琐。接下我们介绍一种方法，只需提交到master分支即可，gh-pages分支无需重新提交，就可实现在线预览：
**打开github项目文件的根目录，先找到.git 这个文件夹（文件夹默认是隐藏的），然后找到config这个文件，并打开该文件，在文件里加入以下两句代码即可：**

    push = +refs/heads/master:refs/heads/gh-pages
    push = +refs/heads/master:refs/heads/master
    

[![image](https://camo.githubusercontent.com/f14593d7aaa4ea1086cfffe85df828d8341e1fa5/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f33302f313633623034313961643566633737373f773d35303126683d34363626663d706e6726733d3532353536)](https://camo.githubusercontent.com/f14593d7aaa4ea1086cfffe85df828d8341e1fa5/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f352f33302f313633623034313961643566633737373f773d35303126683d34363626663d706e6726733d3532353536)

## 五、Hexo+Github搭建自己个人博客

Hexo 是一个基于 Node.js 的快速、简洁且高效的博客框架，可以方便的生成静态网页托管在github和Heroku上。Hexo 因其界面简洁、美观且对各类人群（不只是程序猿）友好而广受欢迎，声望不亚于大名鼎鼎的WordPress。

它有以下几个特点：

- 超快速度----Node.js 所带来的超快生成速度，让上百个页面在几秒内瞬间完成渲染。
- 一键部署----只需一条指令即可部署到 GitHub Pages, Heroku 或其他网站。
- 支持 Markdown----Hexo 支持 GitHub Flavored Markdown 的所有功能，甚至可以整合 Octopress 的大多数插件。
- 丰富的插件----Hexo 拥有强大的插件系统，安装插件可以让 Hexo 支持 Jade, CoffeeScript。

具体实践操作可以查看官网[Hexo](https://hexo.io/zh-cn/index.html)，以后关于这个主题会更新一篇，敬请关注！

感谢博主的无私分享，支持你！加油