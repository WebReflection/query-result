//remove:
var $ = require('../build/query-result.node.js');
//:remove

wru.test([
  {
    name: "main",
    test: function () {
      wru.assert(typeof $ == "function");
    }
  }
]);
