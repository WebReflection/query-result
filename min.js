var $=function(){"use strict";function t(n){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(n)}function n(t){return(n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function e(t,n){return(e=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function r(t,n,o){return(r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}()?Reflect.construct:function(t,n,r){var o=[null];o.push.apply(o,n);var i=new(Function.bind.apply(t,o));return r&&e(i,r.prototype),i}).apply(null,arguments)}function o(t){var i="function"==typeof Map?new Map:void 0;return(o=function(t){if(null===t||(o=t,-1===Function.toString.call(o).indexOf("[native code]")))return t;var o;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==i){if(i.has(t))return i.get(t);i.set(t,u)}function u(){return r(t,arguments,n(this).constructor)}return u.prototype=Object.create(t.prototype,{constructor:{value:u,enumerable:!1,writable:!0,configurable:!0}}),e(u,t)})(t)}function i(t,n){return!n||"object"!=typeof n&&"function"!=typeof n?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):n}function u(t){return function(t){if(Array.isArray(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var c=function(t){function r(){return function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,r),i(this,n(r).apply(this,arguments))}return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&e(t,n)}(r,o(Array)),r}(),a=Object.defineProperty,f=a(function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document;switch(t(n)){case"string":return function(t,n){var e=[],o=!0,i=!1,u=void 0;try{for(var a,f=t[Symbol.iterator]();!(o=(a=f.next()).done);o=!0){var l=a.value.trim();if(":first"===l.slice(-6)){var y=n.querySelector(l.slice(0,-6));y&&e.push(y)}else{var s=!0,p=!1,d=void 0;try{for(var v,h=n.querySelectorAll(l)[Symbol.iterator]();!(s=(v=h.next()).done);s=!0){var b=v.value;e.push(b)}}catch(t){p=!0,d=t}finally{try{s||null==h.return||h.return()}finally{if(p)throw d}}}}}catch(t){i=!0,u=t}finally{try{o||null==f.return||f.return()}finally{if(i)throw u}}return r(c,e)}(n.split(","),e);case"object":return r(c,u("nodeType"in n||"postMessage"in n?[n]:n));case"function":var o=f(e),i=f(e.defaultView),a={handleEvent:function(t){o.off("DOMContentLoaded",a),i.off("load",a),n(t)}};o.on("DOMContentLoaded",a),i.on("load",a);var l=e.readyState;return("complete"==l||"loading"!=l&&!e.documentElement.doScroll)&&setTimeout(function(){return o.dispatch("DOMContentLoaded")}),f}},Symbol.hasInstance,{value:function(t){return t instanceof c}});return f.extend=function(t,n){return a(c.prototype,t,{configurable:!0,value:n}),f},f.extend("dispatch",function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=new CustomEvent(t,n),r=!0,o=!1,i=void 0;try{for(var u,c=this[Symbol.iterator]();!(r=(u=c.next()).done);r=!0){u.value.dispatchEvent(e)}}catch(t){o=!0,i=t}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return this}).extend("off",function(t,n){var e=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=!0,o=!1,i=void 0;try{for(var u,c=this[Symbol.iterator]();!(r=(u=c.next()).done);r=!0){u.value.removeEventListener(t,n,e)}}catch(t){o=!0,i=t}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return this}).extend("on",function(t,n){var e=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=!0,o=!1,i=void 0;try{for(var u,c=this[Symbol.iterator]();!(r=(u=c.next()).done);r=!0){u.value.addEventListener(t,n,e)}}catch(t){o=!0,i=t}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return this}),f}();