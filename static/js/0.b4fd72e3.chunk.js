(this["webpackJsonpopen-pros-cons"]=this["webpackJsonpopen-pros-cons"]||[]).push([[0],{128:function(t,e,n){"use strict";n.r(e),n.d(e,"createSwipeBackGesture",(function(){return a}));var r=n(12),o=n(38),a=(n(30),function(t,e,n,a,i){var c=t.ownerDocument.defaultView;return Object(o.createGesture)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:function(t){return t.startX<=50&&e()},onStart:n,onMove:function(t){var e=t.deltaX/c.innerWidth;a(e)},onEnd:function(t){var e=t.deltaX,n=c.innerWidth,o=e/n,a=t.velocityX,s=n/2,u=a>=0&&(a>.2||t.deltaX>s),p=(u?1-o:o)*n,d=0;if(p>5){var h=p/Math.abs(a);d=Math.min(h,540)}i(u,o<=0?.01:Object(r.j)(0,o,.9999),d)}})})}}]);
//# sourceMappingURL=0.b4fd72e3.chunk.js.map