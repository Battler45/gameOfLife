!function(e){function t(t){for(var n,a,u=t[0],s=t[1],c=t[2],f=0,l=[];f<u.length;f++)a=u[f],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&l.push(o[a][0]),o[a]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n]);for(p&&p(t);l.length;)l.shift()();return i.push.apply(i,c||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],n=!0,a=1;a<r.length;a++){var u=r[a];0!==o[u]&&(n=!1)}n&&(i.splice(t--,1),e=s(s.s=r[0]))}return e}var n={},o={2:0},i=[];var a={};var u={17:function(){return{"./gameOfLife_bg.js":{__wbg_new_59cb74e423758ede:function(){return n[16].exports.d()},__wbg_stack_558ba5917b466edd:function(e,t){return n[16].exports.e(e,t)},__wbg_error_4bb6c2a97407129a:function(e,t){return n[16].exports.c(e,t)},__wbindgen_object_drop_ref:function(e){return n[16].exports.f(e)},__wbindgen_throw:function(e,t){return n[16].exports.g(e,t)}}}}};function s(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.e=function(e){var t=[],r=o[e];if(0!==r)if(r)t.push(r[2]);else{var n=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=n);var i,c=document.createElement("script");c.charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.src=function(e){return s.p+"static/js/"+({}[e]||e)+"."+{0:"17263783",4:"78284523"}[e]+".chunk.js"}(e);var f=new Error;i=function(t){c.onerror=c.onload=null,clearTimeout(l);var r=o[e];if(0!==r){if(r){var n=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+n+": "+i+")",f.name="ChunkLoadError",f.type=n,f.request=i,r[1](f)}o[e]=void 0}};var l=setTimeout((function(){i({type:"timeout",target:c})}),12e4);c.onerror=c.onload=i,document.head.appendChild(c)}return({0:[17]}[e]||[]).forEach((function(e){var r=a[e];if(r)t.push(r);else{var n,o=u[e](),i=fetch(s.p+""+{17:"af6df2eb4268e6981426"}[e]+".module.wasm");if(o instanceof Promise&&"function"===typeof WebAssembly.compileStreaming)n=Promise.all([WebAssembly.compileStreaming(i),o]).then((function(e){return WebAssembly.instantiate(e[0],e[1])}));else if("function"===typeof WebAssembly.instantiateStreaming)n=WebAssembly.instantiateStreaming(i,o);else{n=i.then((function(e){return e.arrayBuffer()})).then((function(e){return WebAssembly.instantiate(e,o)}))}t.push(a[e]=n.then((function(t){return s.w[e]=(t.instance||t).exports})))}})),Promise.all(t)},s.m=e,s.c=n,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(r,n,function(t){return e[t]}.bind(null,n));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e},s.w={};var c=this["webpackJsonpwasm-react-starter"]=this["webpackJsonpwasm-react-starter"]||[],f=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var p=f;r()}([]);
//# sourceMappingURL=runtime-main.e645e9a9.js.map