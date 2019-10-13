'use strict';

(function () {
  var pins = document.querySelector('.map__pins');
  var template = document.querySelector('#pin').content.querySelector('button');

  function renderPin(obj) {
    var element = template.cloneNode(true);
    element.style.left = '' + (obj.location.x + window.util.PIN_WIDTH / 2) + 'px';
    element.style.top = '' + (obj.location.y + window.util.PIN_HEIGHT) + 'px';
    element.querySelector('img').src = obj.author.avatar;
    element.querySelector('img').alt = obj.offer.title;
    element.tabIndex = 0;

    element.addEventListener('click', function () {
      window.card.cardCloseHandler();
      pins.appendChild(window.card.renderCard(obj));
    });

    element.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        window.card.cardCloseHandler();
        pins.appendChild(window.card.renderCard(obj));
      }
    });
    return element;
  }

  window.pin = {
    renderPin: renderPin
  };
})();
