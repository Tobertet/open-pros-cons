(this["webpackJsonpopen-pros-cons"]=this["webpackJsonpopen-pros-cons"]||[]).push([[52],{118:function(n,t,e){"use strict";e.r(t),e.d(t,"KEYBOARD_DID_CLOSE",(function(){return o})),e.d(t,"KEYBOARD_DID_OPEN",(function(){return i})),e.d(t,"copyVisualViewport",(function(){return D})),e.d(t,"keyboardDidClose",(function(){return g})),e.d(t,"keyboardDidOpen",(function(){return p})),e.d(t,"keyboardDidResize",(function(){return b})),e.d(t,"resetKeyboardAssist",(function(){return s})),e.d(t,"setKeyboardClose",(function(){return h})),e.d(t,"setKeyboardOpen",(function(){return f})),e.d(t,"startKeyboardAssist",(function(){return a})),e.d(t,"trackViewportChanges",(function(){return y}));var i="ionKeyboardDidShow",o="ionKeyboardDidHide",r={},u={},d=!1,s=function(){r={},u={},d=!1},a=function(n){c(n),n.visualViewport&&(u=D(n.visualViewport),n.visualViewport.onresize=function(){y(n),p()||b(n)?f(n):g(n)&&h(n)})},c=function(n){n.addEventListener("keyboardDidShow",(function(t){return f(n,t)})),n.addEventListener("keyboardDidHide",(function(){return h(n)}))},f=function(n,t){w(n,t),d=!0},h=function(n){v(n),d=!1},p=function(){var n=(r.height-u.height)*u.scale;return!d&&r.width===u.width&&n>150},b=function(n){return d&&!g(n)},g=function(n){return d&&u.height===n.innerHeight},w=function(n,t){var e=t?t.keyboardHeight:n.innerHeight-u.height,o=new CustomEvent(i,{detail:{keyboardHeight:e}});n.dispatchEvent(o)},v=function(n){var t=new CustomEvent(o);n.dispatchEvent(t)},y=function(n){r=Object.assign({},u),u=D(n.visualViewport)},D=function(n){return{width:Math.round(n.width),height:Math.round(n.height),offsetTop:n.offsetTop,offsetLeft:n.offsetLeft,pageTop:n.pageTop,pageLeft:n.pageLeft,scale:n.scale}}}}]);
//# sourceMappingURL=52.f8eeed6e.chunk.js.map