(this["webpackJsonpwasm-react-starter"]=this["webpackJsonpwasm-react-starter"]||[]).push([[1],[,,,,,,function(t,e,n){t.exports=n(15)},,,,,function(t,e,n){},,function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),c=n(4),o=n.n(c),i=(n(11),n(2)),u=n.n(i),l=n(5),f=n(1),s=(n(13),function(t){var e=Object(a.useState)([]),n=Object(f.a)(e,1)[0],c=Object(a.useRef)(null),o=function(t,e,n,a){var r=1/(n-a)*1e3;e.push(r),e.length>100&&e.shift();var c=function(t){for(var e=1/0,n=-1/0,a=0,r=0;r<t.length;r++)a+=t[r],e=Math.min(t[r],e),n=Math.max(t[r],n);return{min:e,max:n,sum:a}}(e),o=c.min,i=c.max,u=c.sum;!function(t,e,n,a,r,c){if(t){var o=a/e;t.textContent="\n      Frames per Second:\n               latest = ".concat(Math.round(n),"\n      avg of last 100 = ").concat(Math.round(o),"\n      min of last 100 = ").concat(Math.round(r),"\n      max of last 100 = ").concat(Math.round(c),"\n      ").trim()}}(t,e.length,r,u,o,i)};return Object(a.useEffect)((function(){0!==n.length&&n[n.length-1]===t.lastFrameTimeStamp||o(c.current,n,performance.now(),t.lastFrameTimeStamp)})),r.a.createElement("div",{className:"fps",ref:c})}),h=function(t){return r.a.createElement("button",{onClick:function(e){t.onClick(e),e.currentTarget.textContent="\u25b6"===e.currentTarget.textContent?"\u23f8":"\u25b6"}},"\u23f8")},m=function(){var t=50,e=50,c=Object(a.useRef)(null),o=Object(a.useState)(),i=Object(f.a)(o,2),m=i[0],v=i[1],d=Object(a.useState)(),g=Object(f.a)(d,2),b=g[0],w=g[1],p=Object(a.useState)(),O=Object(f.a)(p,2),j=O[0],x=O[1],C=Object(a.useState)(performance.now()),k=Object(f.a)(C,2),E=k[0],M=k[1],y=Object(a.useState)(performance.now()),F=Object(f.a)(y,2),S=F[0],T=F[1],A=function(){var a=Object(l.a)(u.a.mark((function a(){var r,c;return u.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,Promise.all([n.e(0),n.e(4)]).then(n.bind(null,21));case 3:return r=a.sent,v(r),w(r.Universe.new(t,e)),a.next=8,n.e(0).then(n.bind(null,17));case 8:c=a.sent,x(c.memory),a.next=15;break;case 12:a.prev=12,a.t0=a.catch(0),console.error("Unexpected error in loadWasm. [Message: ".concat(a.t0.message,"]"));case 15:case"end":return a.stop()}}),a,null,[[0,12]])})));return function(){return a.apply(this,arguments)}}(),R=function(t,e,n,a){var r=t.getContext("2d");if(r&&e&&a){var c=e.cells(),o=[e.width(),e.height()],i=o[0],u=o[1],l=new Uint8Array(a.buffer,c,i*u);r.beginPath();var s=function(t,e,n,a,r){var c=[r.width(),r.height()],o=c[0],i=c[1];t.fillStyle=a,Array.from(Array(i*o).keys()).forEach((function(a){if(e[a]===n){var r=(s=a,h={x:o,y:i},[Math.trunc(s%h.x),Math.trunc(s/h.y)]),c=Object(f.a)(r,2),u=c[0],l=c[1];!function(t,e,n){t.fillRect(11*n+1,11*e+1,10,10)}(t,l,u)}var s,h}))};s(r,l,n.Cell.Alive,"#000000",e),s(r,l,n.Cell.Dead,"#FFFFFF",e),r.stroke()}},B=function(t,e,n,a){!function(t,e,n,a){if(e){!function(t){var e=t.getContext("2d");if(e){e.beginPath(),e.strokeStyle="#CCCCCC";for(var n=function(t,e,n,a,r){t.moveTo(e,n),t.lineTo(a,r)},a=function(t,e,a,r){return n(t,e,a,e,r)},r=0;r<=t.width;r++){a(e,11*r+1,0,11*t.height+1)}for(var c=function(t,e,a,r){return n(t,a,e,r,e)},o=0;o<=t.height;o++){c(e,11*o+1,0,11*t.width+1)}e.stroke()}}(t);!function r(){M(performance.now()),R(t,e,n,a),e.tick(),T(requestAnimationFrame(r))}()}}(t,e,n,a)},P=function(t){var e=c.current,n=e.getBoundingClientRect(),a=e.width/n.width,r=e.height/n.height,o=(t.clientX-n.left)*a,i=(t.clientY-n.top)*r,u=Math.min(Math.floor(i/11),e.height-1),l=Math.min(Math.floor(o/11),e.width-1);b&&(b.toggle_cell(u,l),R(e,b,m,j))};return Object(a.useEffect)((function(){A()}),[]),Object(a.useEffect)((function(){if(b&&j&&m){var t=c.current;t&&(!function(t,e){t.height=11*e.height()+1,t.width=11*e.width()+1}(t,b),B(t,b,m,j),t.addEventListener("click",P))}}),[b,j,m]),r.a.createElement("div",{className:"GameOfLife"},r.a.createElement(h,{onClick:function(){if(S)S&&(cancelAnimationFrame(S),T(void 0));else{var t=c.current;B(t,b,m,j)}}}),r.a.createElement(s,{lastFrameTimeStamp:E}),r.a.createElement("canvas",{ref:c}))},v=(n(14),function(){return r.a.createElement(m,null)});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}],[[6,2,3]]]);
//# sourceMappingURL=main.e77acc36.chunk.js.map