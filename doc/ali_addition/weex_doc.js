function contentLoaded(win, fn) {

	var done = false, top = true,

	doc = win.document,
	root = doc.documentElement,
	modern = doc.addEventListener,

	add = modern ? 'addEventListener' : 'attachEvent',
	rem = modern ? 'removeEventListener' : 'detachEvent',
	pre = modern ? '' : 'on',

	init = function(e) {
		if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
		(e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
		if (!done && (done = true)) fn.call(win, e.type || e);
	},

	poll = function() {
		try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
		init('poll');
	};

	if (doc.readyState == 'complete') fn.call(win, 'lazy');
	else {
		if (!modern && root.doScroll) {
			try { top = !win.frameElement; } catch(e) { }
			if (top) poll();
		}
		doc[add](pre + 'DOMContentLoaded', init, false);
		doc[add](pre + 'readystatechange', init, false);
		win[add](pre + 'load', init, false);
	}

}


function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

contentLoaded(window, function(){
})


function rePostionVersion(vDis){
    vDis =   vDis ? vDis : -20;
    if ($(".weex-version").length < 1){return ;}
    var vOffset = $(".weex-version").offset();
    var titleJObj = $(".weex-version").parents(".markdown-section").find("h1,h2,h3");
    var titleOffset = titleJObj.offset();
    var titleWidth = getTextWidth(titleJObj.text() ,  titleJObj.css("font") );

    var vDistance = (vOffset.top - titleOffset.top + vDis  );
    var hDistance = (titleJObj.width());
    $(".weex-version").css("transform", "translate("+hDistance+"px,-"+vDistance+"px)"); 
}

window._rePostionVersion =   rePostionVersion
