'use strict';

(function () {
  var PINS_COUNT = 5;
  var pins = document.querySelector('.map__pins');
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainPin = document.querySelector('.map__pin--main');

  function removePins() {
    pins.querySelectorAll('.map__pin').forEach(function (elm) {
      pins.removeChild(elm);
    });
    pins.appendChild(mainPin);
  }

  function renderPin(obj) {
    var element = template.cloneNode(true);
    element.style.left = '' + (obj.location.x - window.util.PIN_WIDTH / 2) + 'px';
    element.style.top = '' + (obj.location.y - window.util.PIN_HEIGHT) + 'px';
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

  function render(data) {
    var takeNumber = data.length > PINS_COUNT ? PINS_COUNT : data.length;
    window.pin.removePins();
    for (var i = 0; i < takeNumber; i++) {
      pins.appendChild(window.pin.renderPin(data[i]));
    }
  }

  window.pin = {
    removePins: removePins,
    renderPin: renderPin,
    render: render
  };
})();
