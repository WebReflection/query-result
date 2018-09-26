'use strict';
/**
 * ISC License
 *
 * Copyright (c) 2018, Andrea Giammarchi, @WebReflection
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
 * OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */
const LOAD = 'load';
const DOM_CONTENT_LOADED = 'DOMContentLoaded';
class QueryResult extends Array {}
const search = (list, el) => {
  const nodes = [];
  for (const CSS of list) {
    const css = CSS.trim();
    if (css.slice(-6) === ':first') {
      const node = el.querySelector(css.slice(0, -6));
      if (node) nodes.push(node);
    } else
      for (const node of el.querySelectorAll(css))
        nodes.push(node);
  }
  return new QueryResult(...nodes);
};
const {defineProperty} = Object;
const $ = defineProperty(
  (CSS, parent = document) => {
    switch (typeof CSS) {
      case 'string': return search(CSS.split(','), parent);
      case 'object': return new QueryResult(
        ...(('nodeType' in CSS || 'postMessage' in CSS) ? [CSS] : CSS)
      );
      case 'function':
        const $parent = $(parent);
        const $window = $(parent.defaultView);
        const handler = {handleEvent(event) {
          $parent.off(DOM_CONTENT_LOADED, handler);
          $window.off(LOAD, handler);
          CSS(event);
        }};
        $parent.on(DOM_CONTENT_LOADED, handler);
        $window.on(LOAD, handler);
        const rs = parent.readyState;
        if (rs == 'complete' || (rs != 'loading' && !parent.documentElement.doScroll))
          setTimeout(() => $parent.dispatch(DOM_CONTENT_LOADED));
        return $;
    }
  },
  Symbol.hasInstance,
  {value: instance => instance instanceof QueryResult}
);
$.extend = (key, value) => (defineProperty(
  QueryResult.prototype,
  key, {configurable: true, value}
), $);
$.extend('dispatch', function dispatch(type, init = {}) {
  const event = new CustomEvent(type, init);
  for (const node of this) node.dispatchEvent(event);
  return this;
})
.extend('off', function off(type, handler, options = false) {
  for (const node of this) node.removeEventListener(type, handler, options);
  return this;
})
.extend('on', function on(type, handler, options = false) {
  for (const node of this) node.addEventListener(type, handler, options);
  return this;
});

Object.defineProperty(exports, '__esModule', {value: true}).default = $;
