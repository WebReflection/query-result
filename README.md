QueryResult, rethinking the `$()`
=================================

[![Build Status](https://travis-ci.org/WebReflection/query-result.svg?branch=master)](https://travis-ci.org/WebReflection/query-result) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/query-result/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/query-result?branch=master)

### In a nutshell

This model is a modern, minimal, 60LOC (esm) based version of a jQuery<sup><sub>(_ish_)</sub></sup> utility.

#### Features:

  * `$(readyFunction)` to run code when document is ready
  * `$(CSS, optionalParent)` to return a collection of elements
  * `$(document || window)` to use methods with these globals
  * `$(anyArrayLike)` to transform a collection into a `QueryResult` instance
  * `any instanceof $` to know if an object implements all `QueryResult` methods
  * `$.extend(name, function () { ... })` to pollute the `QueryResult` prototype
  * `$(...).on(type, handler, options)` to add listeners to all entries
  * `$(...).off(type, handler, options)` to remove listeners to all entries
  * `$(...).dispatch(type, initDictionary)` to dispatch a `CustomEvent` to all entries

Everything else can be added via `$.extend(methodName, function () {})`,
remembering that arrow functions aren't a good idea if you need a context too.

```js
// ready equivalent $(ready)
$(event => {
  $('input[required]')
    // regular Array methods available
    .filter(el => !el.value.trim())
    // add a specific class to the filtered list
    .map(el => {
      el.classList.add('please-fill-me');
      return el;
    })
    // still on an instance of QueryResult
    // so we could add a listener to each element
    .on('focus', el => el.classList.remove('please-fill-me'))
    // with chainability included
    .on('blur', el => {
      if (!el.value.trim())
        el.classList.add('please-fill-me');
    });
});
```

#### :first
If a string contains the pseudo selector `:first` at its end,
the result will stop at the very first encountered match.

This is the only non standard pseudo-selector implemented.
```js
// will return only first matched p
// and the first matched span
$('p:first, span:first')
```
This is especially handy in term of performance since 
the browser will actually stop searching instead of analyzing
the entire document through `querySelector` instead of `querySelectorAll`.

### Examples

```js
// add a listener
$('a:first').on('click', function(e) {
  e.preventDefault();
  alert(e.detail);
});

// dispatch an event
$('a:first').dispatch(
  'click',
  // optional CustomEvent dictionary
  {detail: 'Hello there!'}
);

// using Array methods
var newCollection = $('.new-nodes')
      .concat(previousCollection)
      .filter(because)
      .on('custom:event', react);


// extending via method
$.extend('html', function (html) {
  var el = (this[0] || {});
  if (html) el.innerHTML = html;
  else return el.innerHTML;
});


// extending via descriptor
$.extend('html', {
  get () {
    return this[0] && this[0].innerHTML;
  },
  set (html) {
    if (this.length) {
      this[0].innerHTML = html;
    }
  }
});

```

### Compatibility
You can verify by your own through [this page](http://webreflection.github.io/query-result/test/) but it should work down to very old browsers.

### How to include

  * `import $ from 'query-result'` for ESM (`query-result/esm/index.js` explicitly)
  * `cont $ = require('query-result/cjs')` for CJS
  * `<script src="min.js"></script>` for browsers as global `$`
