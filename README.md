# flexible.js
 移动端高清屏显示方案

## 版本
 **V1.1**

该版本修复了某些机型宽度获取不准确的bug，具体如下：
 
 1. 在红米上，dpr不为1时，screen的宽度还是等于Rect的宽度，screen取值有问题，使用Rect取得准确值；
 2. 在安卓中，QQ浏览器、QQwebview、微信webview、支付宝webview、Nexus5x等部分机型里的Rect的宽度取值小于准确值，使用screen取得准确值；
 3. pc和其他机型使用Rect取值；
 
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

* 不需要在外部写 `<meta name=viewport>` 标签

* 在布局时，一定要使用响应式布局，因为最大字体宽度为 `540`。建议`flexbox`布局

* html的字体大小不能设置有`百分比`，会有bug，详情见 [rem](http://caniuse.com/#search=rem)

* 为了在pc上得到更好的体验，pc上的宽度定为 `414px`，不能缩放，开发者需为 `position:fixed` 元素手动添加 `.fixed` 类名

* 点击等事件推荐使用：
	[PEP](https://code.jquery.com/pep/0.4.2/pep.js),
	[allowTouch](http://alloyteam.github.io/),
	[v-tap](https://github.com/MeCKodo/vue-tap)

* 条件有限，测试的机器不多，如果某位仁兄在某些机器上发现问题，希望能告诉我或者fork

* 推荐使用 postcss 的 autoprefixer 插件来实现伸缩盒模型布局的css兼容书写。如果不使用插件，可以使用该项目的 flexbox.css 类库，该类库定义好了类名，只需在使用的元素上添加类名即可，具体查看源文件

* 项目中部分内容参考开源项目：
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

4. 在安卓机上也实现了高清显示，这一条感觉既是优势也是劣势，具体看劣势；

5. 对于pc上的显示，固定到414px，并且对定位fixed的元素也做了处理，会有更好的显示效果。当然，我没有做自动的处理，也不应该这么做，开发者需要自己在定位fixed的元素上添加fixed类名，这样就不会出现加载页面成功后的尺寸变化问题，也算是优化体验吧；

## 较lib-flexible的劣势

1. 不兼容以后的 vw 单位，说实话我觉的那种兼容还不如直接使用css预解析器，因此我不看好兼容vw单位；

2. 在高端安卓机上的高清显示都没有问题，目前测试的低端机也都没有问题，但是安卓机的阵营有点混乱，各种dpr，各种未知低端机bug（猜测）

3. 对于字体点阵的了解我知之甚少，所以我也把这个列为我的方案的劣势。lib-flexible考虑了这一点，它希望开发者使用px单位的字体。而我还是希望使用rem单位的，因为第一点，有最大字体宽度的限制，第二点，我做的几个项目，字体点阵的影响感觉并不大，显示都很不错（可能追求极致的开发者或许会说）

 ## 使用
1.最好 内联 放到 head 所有资源的前面

2.改变 ds 为设计稿大小，默认750px

3.单位换算 yrem = xpx / 100

4.如果要使用单位为px的字体，推荐使用css解析器(scss,stylus)的 mixin 功能完成

5.对于定位fixed的元素，建议加上fixed类名

5.如果手动配置 dpr，只需在 html 元素上添加 data-dpr 属性即可

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
