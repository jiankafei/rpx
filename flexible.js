/**
 * author: WangLe
 * github: [https://github.com/jiankafei]
 * 博客: [https://jiankafei.github.io/] 博客小白，在搭建的时候不只什么原因，博客能打开，但文章点击会404
 * 不需要在外部写 meta>name=viewport
 * 如果需要强制设置 dpr，则在html上设置 data-dpr 属性即可
 * 在布局时，一定要使用响应式布局，因为最大字体宽度为540。使用flexbox最好。
 * html的字体大小不能设置为百分比方式，会有bug，详情见 caniuse search>rem
 * 为了在pc上得到更好的体验，pc上的宽度定为414px，不能缩放，并且开发者需为 position:fixed元素 手动添加 fixed类名
 * 点击等事件推荐使用 PEP.js [https://code.jquery.com/pep/0.4.2/pep.js] allowTouch [http://alloyteam.github.io/] v-tap [https://github.com/MeCKodo/vue-tap]
 * 作者自己实现该项目。不兼容 vw 单位；改变ds为设计稿大小；单位换算 yrem = xpx / 100；如果要使用单位为px的字体，推荐使用css解析器(scss,stylus)的mixin完成
 * 部分参考开源项目 lib-flexible.js [https://github.com/amfe/lib-flexible]
 * 参考lib-flexible部分: 添加 window.lib.flexible 对象；添加 pageshow 事件；为事件添加节流操作；最大字体宽度改为540；为body添加默认字体大小
 * 最好内联放到head所有资源的前面
 * 条件有限，测试的机器不多，如果某位仁兄在某些机器上发现问题，希望能告诉我或者fork
 */
;(function(G, lib){
	'use strict';
	var doc = G.document,
		de = doc.documentElement,
		vp = null, // meta元素
		ds = 750, // 设计稿大小
		maxW = 540, // 最大字体宽度
		dfDpr = de.getAttribute('data-dpr') || '',
		dpr = !!dfDpr ? dfDpr : G.devicePixelRatio || 1,
		scale = 1 / dpr,
		flexible = lib.flexible || (lib.flexible = {}),
		tid = null,
		dt = deviceType(),
		getW = dt === 'ios' ? function(){return G.screen.width} : function(){return de.offsetWidth / dpr};

	de.setAttribute('data-dpr', dpr);
	// pc上隐藏滚动条，宽度为414，并且为html和定位fixed元素添加宽度
	dt === 'pc' && addStylesheetRules('::-webkit-scrollbar{display: none !important}html, .fixed{margin-left: auto !important;margin-right: auto !important;width: '+ 414 * dpr +'px !important;');

	// 缩放
	vp = doc.createElement('meta');
	vp.setAttribute('name', 'viewport');
	vp.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
	var temp = null;
	de.firstElementChild ? de.firstElementChild.appendChild(vp) : (temp = doc.createElement('div'), temp.appendChild(vp), doc.write(temp.innerHTML));

	// 改变窗口
	G.addEventListener('resize', function () {
		clearTimeout(tid);
		tid = setTimeout(trans, 300);
	}, false);
	G.addEventListener('pageshow', function (e) {
		e.persisted && (clearTimeout(tid), tid = setTimeout(trans, 300));
	}, false);

	// 为body添加默认字体大小
	'complete' === doc.readyState ? doc.body.style.fontSize = 12 * dpr + 'px' : doc.addEventListener('DOMContentLoaded', function (e) {
		doc.body.style.fontSize = 12 * dpr + 'px';
	}, false);

	// 执行转换
	trans();

	// 添加属性
	flexible.dpr = G.dpr = dpr;
	flexible.trans = trans;
	flexible.rem2px = function(d){
		var val = parseFloat(d) * this.rem;
		'string' === typeof d && d.match(/rem$/) && (val += 'px');
		return val;
	};
	flexible.px2rem = function(d){
		var val = parseFloat(d) / this.rem;
		'string' === typeof d && d.match(/px$/) && (val += 'rem');
		return val;
	};
	// 设置根字体大小
	function trans(){
		var w = getW();
		w > maxW && (w = maxW);
		var rem = Math.floor(dpr * w * 100 / ds);
		de.style.fontSize = rem + 'px';
		flexible.rem = G.rem = rem;
	};
	// 设备检测
	function deviceType(){
		var ua = G.navigator.appVersion,
			dt = 'pc';
		/(iPhone|iPod)/i.test(ua) ? dt = 'ios' : /(Android)/i.test(ua) ? dt = 'android' : /(Windows Phone)/i.test(ua) ? dt = 'wp' : dt = 'pc';
		return dt;
	};
	// 添加css规则
	function addStylesheetRules(css) {
		var head = de.firstElementChild,
			style = doc.createElement('style');
		style.type = 'text/css';
		style.styleSheet && style.styleSheet.cssText ? style.styleSheet.cssText = css : style.appendChild(doc.createTextNode(css));
		head.appendChild(style);
	};
})(window, window.lib || (window.lib = {}));
