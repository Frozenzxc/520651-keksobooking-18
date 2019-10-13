'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var pins = document.querySelector('.map__pins');
  var filterForm = document.querySelector('.map__filters');
  var MAINPIN_DIAMETER = 100;
  var mainPin = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');
  var mapWidth = map.offsetWidth;
  var limits = {
    top: 130,
    right: mapWidth,
    bottom: 600,
    left: 0
  };

  window.activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.activateForm(filterForm);
    window.form.activateForm(adForm);
    window.hotelData.forEach(function (item) {
      pins.appendChild(window.pin.renderPin(item));
    });
  };

  addressField.value = '' + (mainPin.offsetLeft + MAINPIN_DIAMETER / 2) + ', ' + (mainPin.offsetTop + MAINPIN_DIAMETER / 2);

  mainPin.addEventListener('mousedown', function (evt) {
    window.activatePage();
    dragPin(evt);
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      window.activatePage();
    }
  });

  function setAddressField() {
    addressField.value = '' + (mainPin.offsetLeft + window.util.PIN_WIDTH / 2) + ', ' + (mainPin.offsetTop + window.util.PIN_HEIGHT);
  }

  function dragPin(evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    function onMouseMove(moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };
      if (newCoords.x > limits.right) {
        newCoords.x = limits.right;
      } else if (newCoords < limits.left) {
        newCoords.x = limits.left;
      }
      if (newCoords.y < limits.top) {
        newCoords.y = limits.top;
      } else if (newCoords.y > limits.bottom) {
        newCoords.y = limits.bottom;
      }

      mainPin.style.top = newCoords.y + 'px';
      mainPin.style.left = newCoords.x + 'px';
      setAddressField();
    }

    function onMouseUp() {
      mainPin.removeEventListener('mousemove', onMouseMove);
      mainPin.removeEventListener('mouseup', onMouseUp);
      setAddressField();
    }

    mainPin.addEventListener('mousemove', onMouseMove);
    mainPin.addEventListener('mouseup', onMouseUp);
  }
})();
