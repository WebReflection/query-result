const tressa = require('tressa');
const {CustomEvent, Document} = require('basicHTML');

global.CustomEvent = CustomEvent;
global.document = new Document;

global.postMessage = function () {};
global.addEventListener = global.postMessage;
global.removeEventListener = global.postMessage;

const $ = require('../cjs/index.js').default;

document.body.innerHTML = '<p>1</p><p>2</p>';
document.readyState = 'loading';

tressa.title('query-result');

$(event => {
  tressa.assert(!!event, 'ready triggered');
  document.readyState = 'whatever';
  document.documentElement.doScroll = false;
  $(() => {
    const children = $('p');
    tressa.assert(children.length === 2, 'qSA works');
    tressa.assert($(children).length === 2, 'qr works');
    tressa.assert($('p:first,a:first').length === 1, 'qS works');
    tressa.assert(children instanceof $, 'instanceof works');
    tressa.assert(children.map(Object) instanceof $, 'map works');
  });
});

$(document).dispatch('DOMContentLoaded');
