'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var room = document.querySelector('#room_number');
  var guest = document.querySelector('#capacity');
  var guestElements = guest.querySelectorAll('option');
  var hotelType = document.querySelector('#type');
  var hotelPrice = document.querySelector('#price');
  var checkinTime = document.querySelector('#timein');
  var checkoutTime = document.querySelector('#timeout');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errTemplate = document.querySelector('#error').content.querySelector('.error');
  var roomsValue = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };
  var hotelValues = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  function activateForm(form) {
    var selects = form.querySelectorAll('select');
    var fieldsets = form.querySelectorAll('fieldset');

    if (selects) {
      selects.forEach(function (item) {
        item.disabled = false;
      });
    }

    if (fieldsets) {
      fieldsets.forEach(function (item) {
        item.disabled = false;
      });
    }
  }

  function deactivateForm(form) {
    var selects = form.querySelectorAll('select');
    var fieldsets = form.querySelectorAll('fieldset');

    if (selects) {
      selects.forEach(function (item) {
        item.disabled = true;
      });
    }

    if (fieldsets) {
      fieldsets.forEach(function (item) {
        item.disabled = true;
      });
    }
  }

  function disableOptions(evt) {
    var value = room.value;
    if (evt) {
      value = evt.target.value;
    }
    guestElements.forEach(function (item) {
      item.disabled = true;
    });
    roomsValue[value].forEach(function (item) {
      guestElements.forEach(function (itemValue) {
        if (+itemValue.value === item) {
          itemValue.disabled = false;
          itemValue.selected = true;
        }
      });
    });
  }

  disableOptions();

  room.addEventListener('change', disableOptions);

  function onChangeHotelType() {
    hotelPrice.min = hotelValues[hotelType.value];
    hotelPrice.placeholder = hotelValues[hotelType.value];
  }

  onChangeHotelType();

  hotelType.addEventListener('change', onChangeHotelType);

  checkinTime.addEventListener('change', function () {
    checkoutTime.value = checkinTime.value;
  });

  checkoutTime.addEventListener('change', function () {
    checkinTime.value = checkoutTime.value;
  });

  function popupMsgCloseHandler(elm) {
    elm.addEventListener('click', function () {
      elm.parentNode.removeChild(elm);
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        elm.parentNode.removeChild(elm);
      }
    });
  }

  function onSuccess() {
    var element = successTemplate.cloneNode(true);
    element.style.zIndex = '1000';
    document.querySelector('main').append(element);
    window.map.resetPage();
    popupMsgCloseHandler(element);
  }

  function onError() {
    var element = errTemplate.cloneNode(true);
    element.style.zIndex = '1000';
    document.querySelector('main').append(element);
    window.map.resetPage();
    popupMsgCloseHandler(element);
  }

  adForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(adForm), onSuccess, onError);
    evt.preventDefault();
  });

  window.form = {
    activateForm: activateForm,
    deactivateForm: deactivateForm
  };
})();
