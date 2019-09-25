[![image](https://camo.githubusercontent.com/3d4020d2489f89da3a86ac0a965c796c850ebbdd/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f362f31302f313633653866326439383235343637653f773d3132343026683d33343726663d706e6726733d313237363134)](https://camo.githubusercontent.com/3d4020d2489f89da3a86ac0a965c796c850ebbdd/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f362f31302f313633653866326439383235343637653f773d3132343026683d33343726663d706e6726733d313237363134)

## 一、前期准备

安装好XAMPP软件，并运行起来。本文代码是基于XAMPP开发环境，XAMPP是完全免费且易于安装的Apache发行版，其中包含MariaDB、PHP和Perl。XAMPP开放源码包的设置让安装和使用出奇容易。

## 二、前后台数据交互

前台部分

其中“process.php?name=Herry”，向后台传递name数据

     document.getElementById("button").addEventListener("click",function () {
            var xhr = new XMLHttpRequest();
            xhr.open("GET","process.php?name=Herry",true);
            xhr.onreadystatechange=function () {
                if(xhr.readyState==4&&xhr.status==200) {
                    var data = xhr.responseText;
                    console.log(data)
                }
            };
            xhr.send();
        })
    

后台PHP部分

后台接收了name数值，并向前台返回了"GET: 你的名字是". $_GET['name']

于是最后前台console里面得到：GET: 你的名字是Herry

## 三、正常表单提交到PHP与Ajax方式提交

#### 正常表单GET提交数据到PHP

前台部分

后台PHP部分

表单输入名字Bucky，然后点击提交后，浏览器将数据打包后，传递给后台,最后后台返回我们想要的数据----GET: 你的名字是Bucky。整个过程中页面有刷新，数据点击提交后，页面跳转到这个网址[http://localhost/ajax/process.php?name=Bucky](http://localhost/ajax/process.php?name=Bucky)

#### Ajax请求后台数据GET

**Ajax异步请求数据，无需刷新页面。可以提高用户体验，较少网络数据的传输量**。click事件改成submit事件（表单应该用submit事件），然后取消默认事件。

前台部分

    //Html部分
    
    //Javascript部分
     document.getElementById("getForm").addEventListener("submit",function(e){
            e.preventDefault();//阻止默认跳转事件
            var name=document.getElementById("name1").value;//获取输入的值
            var xhr = new XMLHttpRequest();
            xhr.open("GET","process.php?name="+name,true);
            xhr.onreadystatechange=function () {
                if (  xhr.status == 200&&xhr.readyState == 4) {
                    var data = xhr.responseText;
                    console.log(data);
                }
            }
                xhr.send();
        })
    

后台PHP部分

在表单输入Bucky，点击提交，最后在console显示：GET: 你的名字是Bucky。整个过程页面无刷新，有效提高页面性能。

#### 正常表单POST提交数据到PHP

与GET提交数据差不多

前台部分

后台PHP部分

表单输入名字Bucky，然后点击提交后，浏览器将数据打包后，传递给后台,最后后台返回我们想要的数据----POST: 你的名字是Bucky。整个过程中页面有刷新，数据点击提交后，页面跳转到这个网址[http://localhost/ajax/process.php。与GET方式提交不同的是，POST方法数据并没有内嵌在url中，这样安全性比较高。](http://localhost/ajax/process.php%E3%80%82%E4%B8%8EGET%E6%96%B9%E5%BC%8F%E6%8F%90%E4%BA%A4%E4%B8%8D%E5%90%8C%E7%9A%84%E6%98%AF%EF%BC%8CPOST%E6%96%B9%E6%B3%95%E6%95%B0%E6%8D%AE%E5%B9%B6%E6%B2%A1%E6%9C%89%E5%86%85%E5%B5%8C%E5%9C%A8url%E4%B8%AD%EF%BC%8C%E8%BF%99%E6%A0%B7%E5%AE%89%E5%85%A8%E6%80%A7%E6%AF%94%E8%BE%83%E9%AB%98%E3%80%82)

#### Ajax请求后台数据POST

POST请求与GET主要有两点不同：

**①post请求一定要设置请求头的格式内容：**

    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
    

**②post请求参数放在send里面，即请求体**

    xhr.send("name="+name" );  
    

前台部分

    //HTML部分
    
    //Javascript部分
      document.getElementById("postForm").addEventListener("submit", function (e) {
            e.preventDefault();
            var name=document.getElementById("name2").value;
            var params = "name="+name;
            var xhr = new XMLHttpRequest();
            xhr.open("POST","process.php",true);
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xhr.onreadystatechange=function () {
                if(xhr.readyState==4&&xhr.status==200) {
                    var data = xhr.responseText;
                    console.log(data);
                }
            };
            xhr.send(params);
        })
    

后台PHP部分

表单输入名字Bucky，然后点击提交后，最后在console显示：POST: 你的名字是Bucky。整个过程页面无刷新。

## 四、总结

**1.在不需要重新刷新页面的情况下，Ajax 通过异步请求加载后台数据，提高用户体验和页面性能。**
**2.GET参数通过URL传递，POST放在Request body中，后者安全性比较高。**