var $ = (function () {
  'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

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
  var QueryResult =
  /*#__PURE__*/
  function (_Array) {
    _inherits(QueryResult, _Array);

    function QueryResult() {
      _classCallCheck(this, QueryResult);

      return _possibleConstructorReturn(this, _getPrototypeOf(QueryResult).apply(this, arguments));
    }

    return QueryResult;
  }(_wrapNativeSuper(Array));

  var create = Object.create,
      defineProperty = Object.defineProperty;
  var AP = Array.prototype;
  var DOM_CONTENT_LOADED = 'DOMContentLoaded';
  var LOAD = 'load';
  var NO_TRANSPILER_ISSUES = new QueryResult() instanceof QueryResult;
  var QRP = QueryResult.prototype; // fixes methods returning non QueryResult

  /* istanbul ignore if */

  if (!NO_TRANSPILER_ISSUES) Object.getOwnPropertyNames(AP).forEach(function (name) {
    var desc = Object.getOwnPropertyDescriptor(AP, name);

    if (typeof desc.value === 'function') {
      var fn = desc.value;

      desc.value = function () {
        var result = fn.apply(this, arguments);
        return result instanceof Array ? patch(result) : result;
      };
    }

    defineProperty(QRP, name, desc);
  }); // fixes badly transpiled classes

  var patch = NO_TRANSPILER_ISSUES ? function (qr) {
    return qr;
  } :
  /* istanbul ignore next */
  function (qr) {
    var nqr = create(QRP);
    push.apply(nqr, slice(qr));
    return nqr;
  };
  var push = AP.push;

  var search = function search(list, el) {
    var nodes = [];
    var length = list.length;

    for (var i = 0; i < length; i++) {
      var css = list[i].trim();

      if (css.slice(-6) === ':first') {
        var node = el.querySelector(css.slice(0, -6));
        if (node) push.call(nodes, node);
      } else push.apply(nodes, slice(el.querySelectorAll(css)));
    }

    return _construct(QueryResult, nodes);
  };

  var slice = NO_TRANSPILER_ISSUES ? patch :
  /* istanbul ignore next */
  function (all) {
    // do not use slice.call(...) due old IE gotcha
    var nodes = [];
    var length = all.length;

    for (var i = 0; i < length; i++) {
      nodes[i] = all[i];
    }

    return nodes;
  }; // use function to avoid usage of Symbol.hasInstance
  // (broken in older browsers anyway)

  var $ = function $(CSS) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    switch (_typeof(CSS)) {
      case 'string':
        return patch(search(CSS.split(','), parent));

      case 'object':
        // needed to avoid iterator dance (breaks in older IEs)
        var nodes = [];
        var all = 'nodeType' in CSS || 'postMessage' in CSS ? [CSS] : CSS;
        push.apply(nodes, slice(all));
        return patch(_construct(QueryResult, nodes));

      case 'function':
        var $parent = $(parent);
        var $window = $(parent.defaultView);
        var handler = {
          handleEvent: function handleEvent(event) {
            $parent.off(DOM_CONTENT_LOADED, handler);
            $window.off(LOAD, handler);
            CSS(event);
          }
        };
        $parent.on(DOM_CONTENT_LOADED, handler);
        $window.on(LOAD, handler);
        var rs = parent.readyState;
        if (rs == 'complete' || rs != 'loading' && !parent.documentElement.doScroll) setTimeout(function () {
          return $parent.dispatch(DOM_CONTENT_LOADED);
        });
        return $;
    }
  };

  $.prototype = QRP;

  $.extend = function (key, value) {
    return defineProperty(QRP, key, {
      configurable: true,
      value: value
    }), $;
  }; // dropped usage of for-of to avoid broken iteration dance in older IEs


  $.extend('dispatch', function dispatch(type) {
    var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var event = new CustomEvent(type, init);
    var length = this.length;

    for (var i = 0; i < length; i++) {
      this[i].dispatchEvent(event);
    }

    return this;
  }).extend('off', function off(type, handler) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var length = this.length;

    for (var i = 0; i < length; i++) {
      this[i].removeEventListener(type, handler, options);
    }

    return this;
  }).extend('on', function on(type, handler) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var length = this.length;

    for (var i = 0; i < length; i++) {
      this[i].addEventListener(type, handler, options);
    }

    return this;
  });

  return $;

}());
