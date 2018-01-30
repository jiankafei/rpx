# rpx.js
 移动端动态修改根字体方案，配合[dealpx](https://github.com/jiankafei/dealpx)使用

## Demo

[demo](https://jiankafei.github.io/rpx/) 基于1.5版本

## 版本

**V2.0**

rpx 不再使用缩放

```html
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
```

**V1.5版本**

1. rpx-common 使用viewport缩放，自行添加meta标签
2. rpx-strict 使用viewport缩放，自行添加meta标签，但只在ios和chrome有效
3. 开发者需要引入一段meta标签

```html
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
```

4. 当设备的dpr为小数时，则设置为1，否则为设备真实dpr
5. 在横屏下根字体的不再改变，任然使用在竖屏下的根字体大小
6. 开发者可以在html元素上设置 data-dpr 来自定义dpr，这只是一个补救措施，用来在特殊性况下使用，因此不推荐开发者使用；

## rem单位的换算

750 / 75 = w / p = k

rem单位的数值就是k

w: 实际宽度

p: 计算得出的实际root字体大小

750: 设计稿宽度大小

75: 宽度为750时root字体大小为75

## 概念

[rem](https://github.com/hbxeagle/rem)

[viewport & dpr](http://www.cnblogs.com/2050/p/3877280.html)

## 使用

1. 首先手动添加 meta 标签

```html
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
```

2. 放到 head 所有资源的前面；

3. 为fixed元素手动添加fixed类名；

4. 参数：

```txt
G: window // 不要修改
ds: 750 // 设计稿大小，默认750
dpx: 75 // 设计稿大小对应的根字体大小，默认75
```