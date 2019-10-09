'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var pins = document.querySelector('.map__pins');
  var filterForm = document.querySelector('.map__filters');
  var MAINPIN_DIAMETER = 100;
  var mainPin = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');

  window.activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.activateForm(filterForm);
    window.activateForm(adForm);
    window.hotelData.forEach(function (item) {
      pins.appendChild(window.renderPin(item));
    });
  };

  addressField.value = '' + (mainPin.offsetLeft + MAINPIN_DIAMETER / 2) + ', ' + (mainPin.offsetTop + MAINPIN_DIAMETER / 2);

  mainPin.addEventListener('mousedown', function () {
    window.activatePage();
    addressField.value = '' + (mainPin.offsetLeft + window.util.PIN_WIDTH / 2) + ', ' + (mainPin.offsetTop + window.util.PIN_HEIGHT);
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      window.activatePage();
    }
  });
})();
