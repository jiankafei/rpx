# flexible.js
移动端高清屏显示方案

##版本
**1.0**

##依赖
无

##原理
原理很简单，使用viewport进行缩放。单位换算的关系：当尺寸为设计稿尺寸时（比如750px），根字体大小为100px。ok，比例换算大家应该都会吧。对viewport和设备像素比不理解的移步[这里](http://www.cnblogs.com/2050/p/3877280.html)

##说明
 最好`内联`放到head所有资源的前面
 不需要在外部写 meta>name=viewport 标签
 如果需要强制设置 dpr，则在html上设置 data-dpr 属性即可
 尺寸单位使用rem
 在布局时，一定要使用响应式布局，因为最大字体宽度为540。建议flexbox布局
 html的字体大小不能设置有百分比，会有bug，详情见 [rem](http://caniuse.com/#search=rem)
 为了在pc上得到更好的体验，pc上的宽度定为414px，不能缩放，并且开发者需为 position:fixed元素 手动添加 fixed类名
 点击等事件推荐使用:
     [PEP](https://code.jquery.com/pep/0.4.2/pep.js)
     [allowTouch](http://alloyteam.github.io/)
     [v-tap](https://github.com/MeCKodo/vue-tap)
 项目中部分内容参考开源项目 [lib-flexible.js](https://github.com/amfe/lib-flexible)
 参考lib-flexible的部分有:
     1.添加 window.lib.flexible 对象
     2.添加 pageshow 事件，为事件添加节流操作
     3.最大字体宽度改为540
     4.为body添加默认字体大小
 条件有限，测试的机器不多，如果某位仁兄在某些机器上发现问题，希望能告诉我或者fork
 
 ##使用
     1.不兼容 vw 单位
     2.改变ds为设计稿大小，默认750px
     3.单位换算 yrem = xpx / 100
     4.如果要使用单位为px的字体，推荐使用css解析器(scss,stylus)的mixin功能完成
     5.手动配置dpr，只需在html元素上添加 `data-dpr` 属性即可
##接口
dpr值
**[Number]lib.flexible.dpr**
根字体大小
**[Number] lib.flexible.rem**
rem转px
**[Number|String] lib.flexible.rem2px([Number|String digital])**
px转rem
**[Number|String] lib.flexible.px2rem([Number|String digital])**
刷新rem
**lib.flexible.trans()** 
