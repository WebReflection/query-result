if (!console.assert)
  console.assert = console.log;
$(function (event) {
  console.assert(!!event, 'ready triggered');
  $(function () {
    var children = $('p');
    console.assert(children.length === 2, 'qSA works');
    console.assert($(children).length === 2, 'qr works');
    console.assert($('p:first,a:first').length === 1, 'qS works');
    console.assert(children instanceof $, 'instanceof works');
    console.assert(children.map(Object) instanceof $, 'map works');
    $('html')[0].style.background = '#55FF99';
    $('body')[0].textContent = 'OK';
  });
});