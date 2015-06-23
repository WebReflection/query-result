(function (O, A) {'use strict';
  function $(CSS, parentNode) {
    return typeof CSS === 'string' ?
      search(CSS.split(splitter), parentNode || document) :
      (CSS instanceof QueryResult ?
        CSS : wrap.apply(null, A.concat(CSS)));
  }
  function QueryResult() {
    dP(this, 'length', lengthDescriptor);
  }
  function protoValue(value) {
    return {
      configurable: true,
      writable: true,
      value: value
    };
  }
  function search(list, el) {
    for (var
      j, l, tmp,
      current,
      nodes, one,
      result = new QueryResult(),
      t = 0, i = 0,
      length = list.length;
      i < length; i++
    ) {
      current = list[i];
      one = current.slice(-6) === ':first';
      if (one) {
        tmp = el.querySelector(current.slice(0, -6));
        if (tmp) result[t++] = tmp;
      } else {
        nodes = el.querySelectorAll(current);
        j = 0;
        l = nodes.length;
        while (j < l) result[t++] = nodes[j++];
      }
    }
    result.length = t;
    return result;
  }
  function wrap() {
    var result = new QueryResult();
    A.push.apply(result, arguments);
    return result;
  }
  var
    dP = O.defineProperty,
    lengthDescriptor = protoValue(0),
    splitter = /\s*,\s*/,
    QRProto = (O.setPrototypeOf || function (o, p) {
      return dP(
        // should pass broken partial polyfills too
        O.create(p),
        'constructor',
        protoValue(o.constructor)
      );
    })(QueryResult.prototype, A)
  ;
  [
    'concat',
    'copyWithin',
    'filter',
    'map',
    'reverse',
    'slice',
    'sort',
    'splice'
  ].forEach(function (name) {
    var method = A[name];
    if (method) {
      dP(QRProto, name, protoValue(function () {
        return wrap.apply(null, method.apply(this, arguments));
      }));
    }
  });
  QueryResult.prototype = ($.prototype = QRProto);
  return dP($, 'extend', protoValue(function extend(name, value) {
      dP(QRProto, name, typeof value === 'function' ?
          protoValue(value) : value);
      return $;
    }))
    .extend('dispatch', function dispatch(type, eventInitDict) {
      var
        e = arguments.length < 2 ?
          new CustomEvent(type) :
          new CustomEvent(type, eventInitDict),
        i = 0,
        l = this.length
      ;
      while (i < l) this[i++].dispatchEvent(e);
      return this;
    })
    .extend('off', function off(type, handler, capture) {
      for (var c = !!capture, i = 0, l = this.length; i < l; i++) {
        this[i].removeEventListener(type, handler, c);
      }
      return this;
    })
    .extend('on', function on(type, handler, capture) {
      for (var c = !!capture, i = 0, l = this.length; i < l; i++) {
        this[i].addEventListener(type, handler, c);
      }
      return this;
    })
  ;
}(Object, Array.prototype));