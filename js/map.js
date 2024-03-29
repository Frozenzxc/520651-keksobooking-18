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
  var Limits = {
    top: 130,
    right: mapWidth - window.util.PIN_WIDTH,
    bottom: 600,
    left: 0
  };
  var Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
  };
  var mainPinStartCoords = new Coordinate(mainPin.style.left, mainPin.style.top);

  window.activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.activate(adForm);
    window.backend.load(onLoad, window.backend.onError);
  };

  function resetPage() {
    var card = pins.querySelector('.map__card');

    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.form.deactivate(filterForm);
    window.form.deactivate(adForm);
    filterForm.reset();
    adForm.reset();
    window.pin.removePins();
    if (card) {
      pins.removeChild(card);
    }
    mainPin.style.left = mainPinStartCoords.x;
    mainPin.style.top = mainPinStartCoords.y;
    setAddressField();
  }

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
    var startCoords = new Coordinate(evt.clientX, evt.clientY);

    function onMouseMove(moveEvt) {
      var shift = new Coordinate(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);

      startCoords = new Coordinate(moveEvt.clientX, moveEvt.clientY);

      var newCoords = new Coordinate(mainPin.offsetLeft - shift.x, mainPin.offsetTop - shift.y);

      if (newCoords.x > Limits.right) {
        newCoords.x = Limits.right;
      } else if (newCoords.x < Limits.left) {
        newCoords.x = Limits.left;
      }
      if (newCoords.y < Limits.top) {
        newCoords.y = Limits.top;
      } else if (newCoords.y > Limits.bottom) {
        newCoords.y = Limits.bottom;
      }

      mainPin.style.top = newCoords.y + 'px';
      mainPin.style.left = newCoords.x + 'px';
      setAddressField();
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      setAddressField();
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function onLoad(data) {
    window.data = data;
    window.pin.render(window.filter.updatePins(window.data));
    window.form.activate(filterForm);
  }

  window.map = {
    resetPage: resetPage
  };
})();
