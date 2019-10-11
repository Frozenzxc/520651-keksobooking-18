'use strict';

(function () {
  var room = document.querySelector('#room_number');
  var guest = document.querySelector('#capacity');
  var guestElements = guest.querySelectorAll('option');
  var hotelType = document.querySelector('#type');
  var hotelPrice = document.querySelector('#price');
  var checkinTime = document.querySelector('#timein');
  var checkoutTime = document.querySelector('#timeout');
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

  window.activateForm = function (form) {
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
  };

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
})();
