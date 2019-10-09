'use strict';

(function () {
  var room = document.querySelector('#room_number');
  var guest = document.querySelector('#capacity');
  var guests = guest.getElementsByTagName('option');
  var hotelType = document.querySelector('#type');
  var hotelPrice = document.querySelector('#price');
  var checkinTime = document.querySelector('#timein');
  var checkoutTime = document.querySelector('#timeout');

  window.activateForm = function (form) {
    var selects = form.getElementsByTagName('select');
    var fieldsets = form.getElementsByTagName('fieldset');

    if (selects) {
      for (var j = 0; j < selects.length; j++) {
        selects[j].disabled = false;
      }
    }

    if (fieldsets) {
      for (var k = 0; k < fieldsets.length; k++) {
        fieldsets[k].disabled = false;
      }
    }
  };

  function disableOptions(arr, index, flag) {
    arr[3].disabled = !flag;
    for (var z = 0; z < arr.length; z++) {
      if (arr[z].value > index) {
        arr[z].disabled = true;
      }
    }
  }

  room.addEventListener('change', function () {
    for (var x = 0; x < guests.length; x++) {
      guests[x].disabled = false;
    }
    switch (+room.value) {
      case 1:
        disableOptions(guests, 1);
        break;
      case 2:
        disableOptions(guests, 2);
        break;
      case 3:
        disableOptions(guests, 3);
        break;
      default:
        disableOptions(guests, 0, true);
        break;
    }
  });

  hotelType.addEventListener('change', function () {
    switch (hotelType.value) {
      case 'bungalo':
        hotelPrice.min = 0;
        hotelPrice.placeholder = 0;
        break;
      case 'flat':
        hotelPrice.min = 1000;
        hotelPrice.placeholder = 1000;
        break;
      case 'house':
        hotelPrice.min = 5000;
        hotelPrice.placeholder = 5000;
        break;
      default:
        hotelPrice.min = 10000;
        hotelPrice.placeholder = 10000;
        break;
    }
  });

  checkinTime.addEventListener('change', function () {
    checkoutTime.value = checkinTime.value;
  });

  checkoutTime.addEventListener('change', function () {
    checkinTime.value = checkoutTime.value;
  });
})();
