/**
 * 1.自己添加meta标签如下
 * <meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
 * 2. 使用 postcss-write-svg 实现1px线条
 * 好处：不再使用缩放
 */
;(function(G){
	'use strict';
	var doc = G.document,
		de = doc.documentElement,
		ua = G.navigator.appVersion,
		ds = 750, // 设计稿大小
		maxW = 540, // 最大字体宽度
		tid = null, // timerId
		dt = deviceType(), // 设备类型
		pcStyleEle = null; //给pc添加的样式元素

	// pc上隐藏滚动条，宽度为414，并且为html和定位fixed元素添加宽度
	dt === 'pc' && (pcStyleEle = addStylesheetRules('::-webkit-scrollbar{display: none !important}.fixed{position: fixed !important;left: 0 !important;right: 0 !important;}html, .fixed{margin-left: auto !important;margin-right: auto !important;width: '+ 414 * dpr +'px !important;}'));

	// 改变窗口
	G.addEventListener('resize', function () {
		tid = G.setTimeout(trans, 300);
	}, false);
	G.addEventListener('pageshow', function (ev) {
		ev.persisted && (clearTimeout(tid), tid = G.setTimeout(trans, 300));
	}, false);
	G.orientation !== undefined && G.addEventListener('orientationchange', function(){
		tid = G.setTimeout(trans, 300);
	}, false);
	// 为body添加默认字体大小
	'complete' === doc.readyState ? doc.body.style.fontSize = 12 * dpr + 'px' : doc.addEventListener('DOMContentLoaded', function (e) {
		doc.body.style.fontSize = 12 * dpr + 'px';
	}, false);

	// 执行转换
	trans();
	// 设置根字体大小
	function trans(){
		var w, rem;
		w = de.getBoundingClientRect().width;
		w > maxW && (w = maxW);
		rem = G.parseFloat(w * 100 / ds);
		de.style.fontSize = rem + 'px';
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
})(window);
