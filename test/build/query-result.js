/*! (C) WebReflection Mit Style License */
var $=function(e,t){"use strict";function n(e,n){return typeof e=="string"?s(e.split(f),n||document):e instanceof r?e:o.apply(null,t.concat(e))}function r(){u(this,"length",a)}function i(e){return{configurable:!0,writable:!0,value:e}}function s(e,t){for(var n,i,s,o=t.query||t.querySelector,u=t.queryAll||t.querySelectorAll,a,f,l,c=new r,h=0,p=0,d=e.length;p<d;p++){a=e[p],l=a.slice(-6)===":first";if(l)s=o.call(t,a.slice(0,-6)),s&&(c[h++]=s);else{f=u.call(t,a),n=0,i=f.length;while(n<i)c[h++]=f[n++]}}return c.length=h,c}function o(){var e=new r;return t.push.apply(e,arguments),e}var u=e.defineProperty,a=i(0),f=/\s*,\s*/,l=(e.setPrototypeOf||function(t,n){return u(e.create(n),"constructor",i(t.constructor))})(r.prototype,t);return["concat","copyWithin","filter","map","reverse","slice","sort","splice"].forEach(function(e){var n=t[e];n&&u(l,e,i(function(){return o.apply(null,n.apply(this,arguments))}))}),r.prototype=n.prototype=l,u(n,"extend",i(function(t,r){return u(l,t,typeof r=="function"?i(r):r),n})).extend("dispatch",function(t,n){var r=arguments.length<2?new CustomEvent(t):new CustomEvent(t,n),i=0,s=this.length;while(i<s)this[i++].dispatchEvent(r);return this}).extend("off",function(t,n,r){for(var i=!!r,s=0,o=this.length;s<o;s++)this[s].removeEventListener(t,n,i);return this}).extend("on",function(t,n,r){for(var i=!!r,s=0,o=this.length;s<o;s++)this[s].addEventListener(t,n,i);return this})}(Object,Array.prototype);