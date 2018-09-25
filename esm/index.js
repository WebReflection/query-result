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

const $ = (CSS, parent = document) => search(CSS.split(','), parent);

$.extend = (key, value) => {
  Object.defineProperty(
    QueryResult.prototype,
    key, {configurable: true, value}
  );
  return $;
};

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

export default $;
