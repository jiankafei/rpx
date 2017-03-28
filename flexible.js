/**
 * author: 碱咖啡
 * github: [https://github.com/jiankafei]
 * 博客: [https://jiankafei.github.io/] 博客小白，在搭建的时候不只什么原因，博客能打开，但文章点击会404
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
		getW = function(){return de.getBoundingClientRect().width / dpr}; // 宽度

	/* 在红米上，screen的宽等于Rect的宽度，screen取值有问题，使用Rect取值；在安卓中，QQ浏览器、QQwebview、微信webview、支付宝webview、Nexus5x等部分机型里的Rect的宽度取值小于准确值，使用screen取值 */
	dt !== 'pc' && de.getBoundingClientRect().width / dpr < G.screen.width && (getW = function(){return G.screen.width});
	// 为html元素添加data-dpr属性
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
		tid = G.setTimeout(trans, 300);
	}, false);
	G.addEventListener('pageshow', function (e) {
		e.persisted && (clearTimeout(tid), tid = G.setTimeout(trans, 300));
	}, false);

	// 为body添加默认字体大小
	'complete' === doc.readyState ? doc.body.style.fontSize = 12 * dpr + 'px' : doc.addEventListener('DOMContentLoaded', function (e) {
		doc.body.style.fontSize = 12 * dpr + 'px';
	}, false);

	// 执行转换
	trans();

	// 为flexible对象添加属性
	flexible.dpr = G.dpr = dpr;
	flexible.trans = trans;
	flexible.rem2px = function(d){
		var val = G.parseFloat(d) * this.rem;
		'string' === typeof d && d.match(/rem$/) && (val += 'px');
		return val;
	};
	flexible.px2rem = function(d){
		var val = G.parseFloat(d) / this.rem;
		'string' === typeof d && d.match(/px$/) && (val += 'rem');
		return val;
	};
	// 设置根字体大小
	function trans(){
		var w = getW();
		w > maxW && (w = maxW);
		var rem = G.parseFloat(dpr * w * 100 / ds);
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
