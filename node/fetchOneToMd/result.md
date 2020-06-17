# H5 页面适配iPhone X，就是那么简单

## 前言

[iPhoneX](http://www.yyyweb.com/tag/iphonex) 取消了物理按键，改成底部小黑条，这一改动导致网页出现了比较尴尬的屏幕适配问题。对于网页而言，顶部（刘海部位）的适配问题浏览器已经做了处理，所以我们只需要关注底部与小黑条的适配问题即可（即常见的吸底导航、返回顶部等各种相对底部 fixed 定位的元素）。

  笔者通过查阅了一些官方文档，以及结合实际项目中的一些处理经验，整理了一套简单的适配方案分享给大家，希望对大家有所帮助，以下是处理前后效果图：
![image](https://user-gold-cdn.xitu.io/2019/9/2/16cf0da345561e8c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
  大家都知道，iphoneX，屏幕顶部都有一个齐刘海，iPhoneX 取消了物理按键，改成底部小黑条，如果不做适配，这些地方就会被遮挡，因此本文讲述下齐刘海与底部小黑条的适配方法。

## 几个新概念

### 安全区域

  安全区域指的是一个可视窗口范围，处于安全区域的内容不受圆角（corners）、齐刘海（sensor housing）、小黑条（Home Indicator）影响，如下图所示：
![image](https://user-gold-cdn.xitu.io/2019/9/2/16cf0b44836b8969?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
### viewport-fit

> iOS11 新增特性，苹果公司为了适配 iPhoneX 对现有 `viewport meta` 标签的一个扩展，用于设置网页在可视窗口的布局方式，可设置 **三个值**：

值描述auto默认值，跟 `contain` 表现一致。页面内容显示在safe area内。`viewprot-fit:auto`等同于`viewport-fit:contain`contain可视窗口完全包含网页内容（左图）。页面内容显示在`safe area`内。`viewport-fit:contain`cover网页内容完全覆盖可视窗口（右图）。页面内容充满屏幕。`viewport-fit:cover`
### constant 函数

iOS11 新增特性，Webkit 的一个 CSS 函数，用于设定安全区域与边界的距离，有四个预定义的变量（单位是px）：

- `safe-area-inset-left`：安全区域距离左边界距离
- `safe-area-inset-right`：安全区域距离右边界距离
- `safe-area-inset-top`：安全区域距离顶部边界距离
- `safe-area-inset-bottom`：安全区域距离底部边界距离

**注意**：网页默认不添加扩展的表现是 viewport-fit=contain，需要适配 iPhoneX 必须设置 viewport-fit=cover，不然 `constant` 函数是不起作用的，这是适配的必要条件。

- 官方文档中提到将来 `env()`要替换 `constant ()`，目前还不可用
- 这两个函数都是 webkit 中 css 函数，可以直接使用变量函数，只有在 webkit 内核下才支持
- `constant`：针对iOS < 11.2以下系统
- `env`：针对于iOS >= 11.2的系统

> 注意：网页默认不添加扩展的表现是 `viewport-fit=contain`，需要适配 `iPhone` 必须设置
> `viewport-fit=cover`，这是适配的关键步骤。

## 适配例子

```
padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
```

## 补充

### 注意项

- `env` 和 `constant` 只有在 `viewport-fit=cover` 时候才能生效, 上面使用的safari 的控制台可以检测模拟器中网页开启web inspector.