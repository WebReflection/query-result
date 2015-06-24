QueryResult, rethinking the `$()`
=================================

[![build status](https://secure.travis-ci.org/WebReflection/query-result.png)](http://travis-ci.org/WebReflection/query-result)

### What is QueryResult?
We all would like to simplify what is the most common operation when dealing with any document: elements selection through CSS queries.

We also would like to have the ability to attach or remove listeners without writing
verbose names such `addEventListener` when `on` would work just fine.

Finally, we'd like to be able to dispatch Events with the ability to pass arbitrary data,
like it's already possible via `CustomEvent` constructor.

Instead of using some limited, quite obtrusive, and not fully cross platform code like
[the following one](https://gist.github.com/paulirish/12fb951a8b893a454b32) proposed by Paul Irish, we can use a much better approach, we can subclass Array for real.

Not only this is a technique that will be incrementally available as soon
as browsers will bring ES6 features in their engines, it also gives us the ability
to extend such subclass the way we want without modifying global properties and objects,
keeping the environment clean and friendly.

With `QueryResult` we have backward compatibility down to older IE,
the core ability to add, remove, and dispatch events,
plus an easy way to extend the prototype, with the ability to work
with the resulting collection as a regular `Array` without losing the subclass.

```js
$('input[required]')
  // regular Array methods available
  .filter(function (el) {
    return !el.value.trim();
  })
  // add a specific class to the filtered list
  .map(function (el) {
    el.classList.add('please-fill-me');
  })
  // still on an instance of QueryResult
  // so we could add a listener to each element
  .on('focus', function (el) {
    el.classList.remove('please-fill-me');
  })
  // with chainability included
  .on('blur', function (el) {
    if (!el.value.trim()) {
      el.classList.add('please-fill-me');
    }
  })
;
```

### Features
The first basic improvements over most alternative, is the usage of [**query** and **queryAll**](http://www.w3.org/TR/2015/WD-dom-20150428/#elements) methods to query relatively from an element, whenever these are available.

This avoids surprises with selectors that could match elements outside the one we are searching in.

```js
// common alternatives
// will return every p
// even if not inside the node
$('body p', node)

// QuerySelector won't find anything
$('body p', node)
```
If you are not sure if your target browsers will support such functionality,
you can always include this little [dom4 polyfill]([dom4 polyfill](https://github.com/WebReflection/dom4#dom4)).



#### :first
If a string contains the pseudo selector `:first` at its end,
the result will stop at the very first encountered match.

This is the only non standard pseudo-selector implemented.
```js
// will return only first matched p
// and the first matched span
$('p:first, span:first')
```
This is specially handy in term of performance since 
the browser will actually stop searching instead of analyzing
the entire document as it would do via `queryAll` or `querySelectorAll`.

### API
Every available Array method is provided by `$.prototype`, and every method
that would usually return a new Array will return a new QueryResult instead.

Beside that, these are the only 4 core methods:

  . `.on(type, handler[, capture])` that will invoke `addEventListener` per each element

  . `.off(type, handler[, capture])` that will invoke `removeEventListener` per each element

  . `.dispatch(type[, initDictionary])` that will shortcut `CustomEvent` initialization and dispatch it per each node

  . public static `$.extend(name, methodOrDescriptor)` that will augment `$.prototype` using either a method or an ES5 like descriptor to provide the ability to set default properties, as well as getters and setters


Following some example on how to use such API
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
  get: function () {
    return this[0] && this[0].innerHTML;
  },
  set: function (html) {
    if (this.length) {
      this[0].innerHTML = html;
    }
  }
});

```



### Compatibility
You can verify by your own through [this page](http://webreflection.github.io/query-result/test/) or trust me it's going to work in these browsers:

#### Desktop

  . IE 6 or greater

  . Firefox 3 or greater

  . Chrome

  . Safari

  . Opera


#### Mobile

  . Android 2 or greater

  . iOS 5 or greater

  . UC Browser and UC Mini

  . IE9 Mobile or greater

  . Opera Mini and Mobile

  . Blackberry OS 7 and OS 10

  . Kindle Fire

  . Ubuntu Phone

  . Bada

  . Xpress

  . webOS

Please note that using polyfill like [dom4 polyfill](https://github.com/WebReflection/dom4#dom4) could increase compatibility and reliability of this library.



### How to include
This little script is available via [require](https://github.com/WebReflection/query-result/blob/master/build/query-result.node.js), [AMD](https://github.com/WebReflection/query-result/blob/master/build/query-result.amd.js), or just [plain JS](https://github.com/WebReflection/query-result/blob/master/build/query-result.js) on the global scope.

It is also [available via CDNJS](https://cdnjs.cloudflare.com/ajax/libs/query-result/0.1.3/query-result.js)

Alternatively, you can use as bootstrap template the [base.html](https://github.com/WebReflection/query-result/blob/master/base.html) page which would
upgrade both JS and DOM environment to the latest standards.