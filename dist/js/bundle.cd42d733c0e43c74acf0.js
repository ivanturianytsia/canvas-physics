!function(t){var o={};function i(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=o,i.d=function(t,o,e){i.o(t,o)||Object.defineProperty(t,o,{configurable:!1,enumerable:!0,get:e})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(o,"a",o),o},i.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)},i.p="",i(i.s=1)}([function(t,o,i){"use strict";function e(t,o){this.r=t||10,this.c=o||"red",this.position={x:0,y:0},this.m=0,this.velocity={x:0,y:0},this.context=null}i.r(o),e.prototype.draw=function(){this.context&&(this.context.beginPath(),this.context.fillStyle=this.c,this.context.arc(this.position.x,this.position.y,this.r,0,2*Math.PI),this.context.fill())};var n=e;function r(t,o){return t+Math.random()*(o-t)}window.onload=function(){const t=document.getElementById("canvas"),o=t.getContext("2d"),i=50,e=100,c=5,l=10;window.requestAnimationFrame(function i(){o.clearRect(0,0,t.width,t.height);!function(){for(let t=0;t<s.length;t++)m(s[t])}();!function(){for(let t=0;t<s.length;t++){let o=s[t];for(let i=t;i<s.length;i++){let t=s[i];if(u(o,t)){let i=(o.m-t.m)*o.velocity.x/(o.m+t.m);i+=2*t.m*t.velocity.x/(o.m+t.m);let e=(t.m-o.m)*t.velocity.x/(t.m+o.m);e+=2*o.m*o.velocity.x/(o.m+t.m),o.velocity.x=i,t.velocity.x=e;let n=(o.m-t.m)*o.velocity.y/(o.m+t.m);n+=2*t.m*t.velocity.y/(o.m+t.m);let r=(t.m-o.m)*t.velocity.y/(t.m+o.m);r+=2*o.m*o.velocity.y/(o.m+t.m),o.velocity.y=n,t.velocity.y=r}}}}();!function(){for(let t=0;t<s.length;t++)s[t].draw()}();window.requestAnimationFrame(i)});const s=function(){let s=[],m=0;for(let a=0;a<l;a++){let y=r(i,e),h=new n(y);h.position={x:r(y,t.width-y),y:r(y,t.height-y)};let f=!0;for(let t=0;t<s.length;t++)u(h,s[t])&&(f=!1);if(f)h.m=y,h.velocity={x:r(0,2*c)-c,y:r(0,2*c)-c},h.context=o,h.draw(),s.push(h);else if(a--,++m>2*l)break}return s}();function m(o){o.position={x:o.position.x+o.velocity.x,y:o.position.y+o.velocity.y},function(o){const i=o.position.x+o.r>t.width,e=o.position.x-o.r<0,n=o.position.y+o.r>t.height,r=o.position.y-o.r<0,c=o.velocity.x,l=o.velocity.y;o.velocity={x:i?-1*Math.abs(c):e?Math.abs(c):c,y:n?-1*Math.abs(l):r?Math.abs(l):l}}(o)}function u(t,o){return t!==o&&function(t,o){return Math.sqrt(Math.pow(t.position.x-o.position.x,2)+Math.pow(t.position.y-o.position.y,2))}(t,o)<t.r+o.r}window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}},function(t,o,i){t.exports=i(0)}]);