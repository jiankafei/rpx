/**
 * 设置根字体大小
 * 自己添加meta标签
 * <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
 * G	{Element}	window，不要修改
 * ds	{number}	设计稿大小，默认750
 * dpx	{number}	设计稿大小对应的根字体大小，默认75
 */
;(function(G, ds, dpx){
	'use strict';
	ds = ds || 750; // 设计稿大小
	dpx = dpx || 75; // 设计稿大小对应的根字体大小

	const doc = G.document,
		de = doc.documentElement,
		ua = G.navigator.appVersion,
		maxW = 540, // 最大字体宽度
		dt = deviceType(); // 设备类型

	let tid = null, // timerId
		pcStyleEle = null; //给pc添加的样式元素

	// 为html添加data-dpr属性
	de.dataset.dpr = Math.floor(window.devicePixelRatio);
	// 为html添加设备类名
	de.classList.add(dt);
	// pc上为html元素添加特定样式
	dt === 'pc' && addStylesheetRules('.pc ::-webkit-scrollbar {display: none!important;}.pc,.pc .fixed {margin-left: auto!important;margin-right: auto!important;width: 486px!important;}.pc .fixed{position: fixed!important;left: 0!important;right: 0!important;}');
	
	// 改变窗口
	G.addEventListener('resize', tiemoutFn, false);
	G.addEventListener('pageshow', function (ev) {
		ev.persisted && tiemoutFn();
	}, false);
	// 屏幕旋转
	G.orientation !== undefined && G.addEventListener('orientationchange', tiemoutFn, false);
	// 事件回调
	function tiemoutFn(){
		clearTimeout(tid);
		const dt = deviceType();
		de.classList.add(dt);
		de.dataset.dpr = Math.floor(window.devicePixelRatio);
		tid = G.setTimeout(setrpx, 300);
	}
	
	// 执行转换
	setrpx();
	// 设置根字体大小
	function setrpx(){
		let w, rpx;
		w = de.getBoundingClientRect().width;
		w > maxW && (w = maxW);
		rpx = G.parseFloat(w * dpx / ds);
		de.style.fontSize = rpx + 'px';
	};
	// 设备检测
	function deviceType(){
		let dt = 'pc';
		/(?:iPhone|iPod|iPad)/i.test(ua) ? dt = 'ios' : /(?:Android)/i.test(ua) ? dt = 'android' : /(?:Windows\sPhone)/i.test(ua) ? dt = 'wp' : dt = 'pc';
		return dt;
	};
	// 添加css规则
	function addStylesheetRules(css) {
		var head = de.firstElementChild,
			el = doc.createElement('style');
		el.type = 'text/css';
		el.styleSheet && el.styleSheet.cssText ? el.styleSheet.cssText = css : el.appendChild(doc.createTextNode(css));
		head.appendChild(el);
		return el;
	};
})(window);
