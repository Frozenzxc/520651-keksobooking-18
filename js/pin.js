'use strict';

(function () {
  var pins = document.querySelector('.map__pins');
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainPin = document.querySelector('.map__pin--main');

  function removePins() {
    pins.querySelectorAll('.map__pin').forEach(function (elm) {
      pins.removeChild(elm);
    });
    pins.appendChild(mainPin);
  }

  function activatePin(pin) {
    var activePin = pins.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
    pin.classList.add('map__pin--active');
  }

  function renderPin(obj) {
    var element = template.cloneNode(true);
    element.style.left = '' + (obj.location.x - window.util.PIN_WIDTH / 2) + 'px';
    element.style.top = '' + (obj.location.y - window.util.PIN_HEIGHT) + 'px';
    element.querySelector('img').src = obj.author.avatar;
    element.querySelector('img').alt = obj.offer.title;
    element.tabIndex = 0;

    element.addEventListener('click', function () {
      activatePin(element);
      window.card.close();
      pins.appendChild(window.card.render(obj));
    });

    element.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        activatePin(element);
        window.card.close();
        pins.appendChild(window.card.render(obj));
      }
    });
    return element;
  }

  function render(data) {
    data.forEach(function (it) {
      if ('offer' in it) {
        pins.appendChild(window.pin.renderPin(it));
      }
    });
  }

  window.pin = {
    removePins: removePins,
    renderPin: renderPin,
    render: render
  };
})();
