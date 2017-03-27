# flexible.js
 移动端高清屏显示方案

## 版本
 **1.0**

## 依赖
 无

## 原理
 原理很简单，使用`viewport`进行缩放。

 单位换算的关系：当尺寸为设计稿尺寸时（比如750px），根字体大小为100px。ok，比例换算大家应该都会吧。

 对viewport和设备像素比不了解的移步[这里](http://www.cnblogs.com/2050/p/3877280.html)。

## 说明
* 方案不兼容 vw 单位

* 尺寸单位使用 `rem`

* 不需要在外部写 `<meta name=viewport>` 标签

* 在布局时，一定要使用响应式布局，因为最大字体宽度为 `540`。建议`flexbox`布局

* html的字体大小不能设置有`百分比`，会有bug，详情见 [rem](http://caniuse.com/#search=rem)

* 为了在pc上得到更好的体验，pc上的宽度定为 `414px`，不能缩放，开发者需为 `position:fixed` 元素手动添加 `.fixed` 类名

* 点击等事件推荐使用：
	[PEP](https://code.jquery.com/pep/0.4.2/pep.js),
	[allowTouch](http://alloyteam.github.io/),
	[v-tap](https://github.com/MeCKodo/vue-tap)

* 条件有限，测试的机器不多，如果某位仁兄在某些机器上发现问题，希望能告诉我或者fork

* 项目中部分内容参考开源项目：
 	[lib-flexible.js](https://github.com/amfe/lib-flexible)

## 参考lib-flexible的部分有
	1.添加 window.lib.flexible 对象

	2.添加 pageshow 事件，为事件添加节流操作

	3.最大字体宽度改为 540px

	4.为 body 添加默认字体大小

 ## 使用
	1.最好 内联 放到 head 所有资源的前面

	2.改变 ds 为设计稿大小，默认750px

	3.单位换算 yrem = xpx / 100

	4.如果要使用单位为px的字体，推荐使用css解析器(scss,stylus)的 mixin 功能完成

	5.手动配置 dpr，只需在 html 元素上添加 data-dpr 属性即可

## 接口

  * dpr值

	**[Number]lib.flexible.dpr**
	**[Number]window.dpr**

 * 根字体大小

	**[Number] lib.flexible.rem**

 * rem转px

	**[Number|String] lib.flexible.rem2px([Number|String digital])**

 * px转rem

	**[Number|String] lib.flexible.px2rem([Number|String digital])**

 * 刷新rem

	**lib.flexible.trans()**
