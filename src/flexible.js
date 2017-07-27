/**
 * author: WangLe
 * github: [https://github.com/jiankafei]
 * 博客: [https://jiankafei.github.io/]
 */
;(function(G, lib){
	'use strict';
	var doc = G.document,
		de = doc.documentElement,
		vp = doc.querySelector('meta[name=viewport]'),
		ua = G.navigator.appVersion,
		ds = 750, // 设计稿大小
		maxW = 540, // 最大字体宽度
		realDPR = G.devicePixelRatio,
		dfDpr = de.getAttribute('data-dpr') || '',
		dpr = !!dfDpr ? dfDpr : realDPR ? realDPR === Math.floor(realDPR) ? realDPR : 1 : 1,
		scale = 1 / dpr,
		flexible = lib.flexible || (lib.flexible = {}),
		tid = null,
		dt = deviceType(),
		pcStyleEle = null, //给pc添加的样式元素
		w = de.getBoundingClientRect().width; // 宽度

	console.log(de.getBoundingClientRect().width);
	// 为html元素添加data-dpr属性
	de.setAttribute('data-dpr', dpr);

	// pc上隐藏滚动条，宽度为414，并且为html和定位fixed元素添加宽度
	dt === 'pc' && (pcStyleEle = addStylesheetRules('::-webkit-scrollbar{display: none !important}.fixed{position: fixed !important;left: 0 !important;right: 0 !important;}html, .fixed{margin-left: auto !important;margin-right: auto !important;width: '+ 414 * dpr +'px !important;}'));

	// 缩放
	vp.setAttribute('name', 'viewport');
	vp.setAttribute('content', 'target-densitydpi=device-dpi, width=device-width, initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=no');

	// 改变窗口
	G.addEventListener('resize', function () {
		clearTimeout(tid);
		tid = G.setTimeout(trans, 300);
	}, false);
	G.addEventListener('pageshow', function (ev) {
		ev.persisted && (clearTimeout(tid), tid = G.setTimeout(trans, 300));
	}, false);
	G.orientation !== undefined && G.addEventListener('orientationchange', function(){
		clearTimeout(tid);
		/*switch (G.orientation) {
			case 0:
			case 180:
				console.log('portrait');
				break;
			case 90:
			case -90:
				console.log('landscape');
				break;
		}*/
		tid = G.setTimeout(trans, 300);
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
		var val = G.parseFloat(d) / 100;
		'string' === typeof d && d.match(/px$/) && (val += 'rem');
		return val;
	};
	// 设置根字体大小
	function trans(){
		var realDPR = G.devicePixelRatio,
			tempDpr = realDPR ? realDPR === Math.floor(realDPR) ? realDPR : 1 : 1;
		tempDpr !== dpr && G.location.reload();
		w > maxW && (w = maxW);
		console.log('w: '+w);
		var rem = G.parseFloat(dpr * w * 100 / ds);
		de.style.fontSize = rem + 'px';
		flexible.rem = G.rem = rem;
	};
	// 设备检测
	function deviceType(){
		var dt = 'pc';
		/(iPhone|iPod|iPad)/i.test(ua) ? dt = 'ios' : /(Android)/i.test(ua) ? dt = 'android' : /(Windows Phone)/i.test(ua) ? dt = 'wp' : dt = 'pc';
		return dt;
	};
	// 添加css规则
	function addStylesheetRules(css) {
		var head = de.firstElementChild,
			style = doc.createElement('style');
		style.type = 'text/css';
		style.styleSheet && style.styleSheet.cssText ? style.styleSheet.cssText = css : style.appendChild(doc.createTextNode(css));
		head.appendChild(style);
		return style;
	};
})(window, window.lib || (window.lib = {}));
