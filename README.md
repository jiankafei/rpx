# flexible.js
 移动端高清屏显示方案

## Demo

[demo](https://jiankafei.github.io/flexible/)

## 从1.0到1.5版本变化的说明

 1.0版本
 `<meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">`
 `<script src="./flexible.js"></script>`
 宽度获取使用 window.screen.width，但后来发现在低端 Android 上该值会等于 980，于是在1.0版本之后抛弃；
 对dpr没有做任何处理；

 1.1-1.4版本
 `<script src="./flexible.js"></script>`
 去掉了 meta>name=viewport ，在内部动态添加，并且做了兼容外部有meta>name=viewport标签的处理。那么获取宽度只能使用 document.documentElement.clientWidth / window.devicePixelRatio ，但其实这个值是不等于真实的 window.screen.width 的。但大部分浏览器似乎在内部做了这方面的容差，除了QQ浏览器；
 对dpr做了处理，小数的dpr设置为1；

 1.5版本
 `<meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">`
 `<script src="./flexible.js"></script>`
 那怎样才能准确的拿到宽度呢？我这里是直接使用 document.documentElement.clientWidth 获取的，是不是很奇怪呢，秘诀就在于meta>name=viewport。如果页面首先应用了这个meta标签，那么 document.documentElement.clientWidth === window.screen.width 就是true了。然后再动态修改这个 meta 标签的缩放值就行了。最后差不多回到了1.0版本。
 对dpr做了处理，小数的dpr设置为1；

 注：dpr为小数为什么要强行设置为1？因为在一些低端 Android 和谷歌手机上会出现尺寸计算错误的问题，就是明明 dpr=2.5 但在 rem 的计算上却当作 2.0来处理，导致尺寸出错，所以只能设置为1。

## 版本
 **V1.5**
 1. 开发者需要引入一段meta标签，还有该js文件；
 `<meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">`
 2. 当设备的dpr为小数时，则设置为1，否则为设备真实dpr；

 注：开发者可以在html元素上设置 data-dpr 来自定义dpr，这只是一个补救措施，用来在特殊性况下使用，因此不推荐开发者使用；

## 依赖
 无

## 原理

### 缩放

使用`viewport`进行缩放。

 对rem单位布局不熟悉的可移步这里[rem](https://github.com/hbxeagle/rem)

 对viewport和设备像素比不了解的移步[这里](http://www.cnblogs.com/2050/p/3877280.html)。

### 单位换算
 单位换算的关系：当尺寸为设计稿尺寸时（比如750px），根字体大小为100px。这是个很简单的小学的比例换算数学题。ok，大家应该都会吧。

## 说明
* 方案不兼容 vw 单位

* 尺寸单位使用 `rem`

* 在布局时，一定要使用响应式布局，因为最大字体宽度为 `540`。建议`flexbox`布局

* html的字体大小不能设置有`百分比`，会有bug，详情见 [rem](http://caniuse.com/#search=rem)

* 为了在pc上得到更好的体验，pc上的宽度定为 `414px`，不能缩放，开发者需为 `position:fixed` 元素手动添加 `.fixed` 类名

* 点击等事件推荐使用：
	[PEP](https://code.jquery.com/pep/0.4.2/pep.js),
	[allowTouch](http://alloyteam.github.io/),
	[v-tap](https://github.com/MeCKodo/vue-tap)

* 条件有限，测试的机器不多，如果某位仁兄在某些机器上发现问题，提Issue

* 推荐使用 postcss 的 autoprefixer 插件来实现伸缩盒模型布局的css兼容书写。如果不使用插件，可以使用该项目的 flexbox.css 类库，该类库定义好了类名，只需在使用的元素上添加类名即可，具体查看源文件

* 项目中部分内容参考淘宝的开源项目：
 	[lib-flexible.js](https://github.com/amfe/lib-flexible)

## 参考lib-flexible的部分有
	1.添加 window.lib.flexible 对象

	2.添加 pageshow 事件，为事件添加防抖操作

	3.最大字体宽度改为 540px

	4.为 body 添加默认字体大小

## 较lib-flexible的优势

1. 不需要安装编辑器插件；

2. 不需要使用css预解析器；

3. 单位换算使用最大宽度对应最大字体100px的比例关系，因此，只需要把px单位的尺寸除以100，也就是左移两个小数点，就可以得到rem单位的尺寸了。

4. 在大部分安卓机上也实现了高清显示；

5. 对于pc上的显示，固定到414px，并且对定位fixed的元素也做了处理，会有更好的显示效果。当然，我没有做自动的处理，也不应该这么做，开发者需要自己在定位fixed的元素上添加fixed类名，这样就不会出现加载页面成功后的尺寸变化问题，也算是优化体验吧；

## 较lib-flexible的劣势

1. 不兼容以后的 vw 单位，说实话我觉的那种兼容还不如直接使用css预解析器，因此我不看好兼容vw单位；

2. 对于字体点阵的了解我知之甚少，所以我也把这个列为我的方案的劣势。lib-flexible考虑了这一点，它希望开发者使用px单位的字体。而我还是希望使用rem单位的，因为第一点，有最大字体宽度的限制，第二点，我做的几个项目，字体点阵的影响感觉并不大，显示都很不错（追求极致和有原则的开发者或许会说）

 ## 使用
1.首先手动添加 meta>name=viewport 标签
	`<meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">`

2.放到 head 所有资源的前面；

3.改变 ds 为设计稿大小，默认750px；

4.单位换算 yrem = xpx / 100；

5.使用单位为px的字体时，推荐使用stylus等css预处理器的@mixin功能完成；

6.对于定位fixed的元素，建议加上fixed类名；

7.如果手动配置 dpr，只需在 html 元素上添加 data-dpr 属性即可。

## 接口

  * dpr值

	**[Number] lib.flexible.dpr**

	**[Number] window.dpr**

 * 根字体大小

	**[Number] lib.flexible.rem**

	**[Number] window.rem**

 * rem转px

	**[Number|String] lib.flexible.rem2px([Number|String digital])**

 * px转rem

	**[Number|String] lib.flexible.px2rem([Number|String digital])**

 * 刷新rem

	**lib.flexible.trans()**
