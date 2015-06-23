//remove:
var $ = require('../build/query-result.node.js');
//:remove

wru.test([
  {
    name: 'base',
    test: function () {
      wru.assert(typeof $ == 'function');
    }
  }, {
    name: 'instanceof Array',
    test: function () {
      wru.assert($(window) instanceof Array);
    }
  }, {
    name: 'preserves subclass',
    test: function () {
      wru.assert($('*').slice(0) instanceof $);
    }
  }, {
    name: 'listeners and dispatcher',
    test: function () {
      var
        obj = {},
        aCalls = [],
        bCalls = []
      ;
      function a(e) {
        aCalls.push(e);
      }
      function b(e) {
        bCalls.push(e);
      }
      $(window)
        .on('dummy-test', a)
        .on('dummy-test', b)
        .dispatch('dummy-test')
        .off('dummy-test', b)
        .dispatch('dummy-test', {detail: obj})
        .off('dummy-test', a)
        .dispatch('dummy-test', {detail: obj})
      ;
      wru.assert('a has been called twice', aCalls.length === 2);
      wru.assert('b has been called once', bCalls.length === 1);
      wru.assert('a received no details at first call', aCalls[0].detail == null);
      wru.assert('b received no details at first call', bCalls[0].detail == null);
      wru.assert('a received details at second call', aCalls[1].detail === obj);
    }
  }
]);
