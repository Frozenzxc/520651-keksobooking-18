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

  function dragPin(evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

    }

    function onMouseUp(dragEvt) {
      dragEvt.preventDefault();
      mainPin.removeEventListener('mousemove', onMouseMove);
      mainPin.removeEventListener('mouseup', onMouseUp);
      addressField.value = '' + (mainPin.offsetLeft + window.util.PIN_WIDTH / 2) + ', ' + (mainPin.offsetTop + window.util.PIN_HEIGHT);

      if (dragged) {
        function onClickPreventDefault() {
          mainPin.removeEventListener('click', onClickPreventDefault);
        }
        mainPin.addEventListener('click', onClickPreventDefault);
      }
    }

    mainPin.addEventListener('mousemove', onMouseMove);
    mainPin.addEventListener('mouseup', onMouseUp);
  }
})();
