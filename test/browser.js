if (!console.assert)
  console.assert = console.log;
$(function (event) {
  console.assert(!!event, 'ready triggered');
  $(function () {
    const children = $('p');
    console.assert(children.length === 2, 'qSA works');
    console.assert($(children).length === 2, 'qr works');
    console.assert($('p:first,a:first').length === 1, 'qS works');
    console.assert(children instanceof $, 'instanceof works');
    document.documentElement.style.background = '#55FF99';
    document.body.textContent = 'OK';
  });
});