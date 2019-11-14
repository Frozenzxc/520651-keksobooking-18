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
  var photoPreviewReset = document.querySelector('.ad-form__reset');
  var photoPreview = document.querySelector('.ad-form__photo');
  var avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
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

    selects.forEach(function (item) {
      item.disabled = false;
    });

    fieldsets.forEach(function (item) {
      item.disabled = false;
    });

    disableOptions();
  }

  function deactivateForm(form) {
    var selects = form.querySelectorAll('select');
    var fieldsets = form.querySelectorAll('fieldset');

    avatarPreview.src = 'img/muffin-grey.svg';
    photoPreview.innerHTML = '';

    selects.forEach(function (item) {
      item.disabled = true;
    });

    fieldsets.forEach(function (item) {
      item.disabled = true;
    });
  }

  photoPreviewReset.addEventListener('click', function () {
    window.map.resetPage();
  });

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

  room.addEventListener('change', function () {
    disableOptions();
  });

  function changeHotelType() {
    hotelPrice.min = hotelValues[hotelType.value];
    hotelPrice.placeholder = hotelValues[hotelType.value];
  }

  changeHotelType();

  hotelType.addEventListener('change', changeHotelType);

  checkinTime.addEventListener('change', function () {
    checkoutTime.value = checkinTime.value;
  });

  checkoutTime.addEventListener('change', function () {
    checkinTime.value = checkoutTime.value;
  });

  function onSuccess() {
    var main = document.querySelector('main');
    var element = successTemplate.cloneNode(true);
    element.style.zIndex = '1000';
    main.append(element);

    element.addEventListener('click', function () {
      main.removeChild(element);
    });

    function onEscPressPopupClose(evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        main.removeChild(element);
      }
      document.removeEventListener('keydown', onEscPressPopupClose);
    }

    document.addEventListener('keydown', onEscPressPopupClose);

    window.map.resetPage();
  }

  adForm.addEventListener('submit', function (evt) {
    window.backend.upload(onSuccess, window.backend.onError, new FormData(adForm));
    evt.preventDefault();
  });

  window.form = {
    activate: activateForm,
    deactivate: deactivateForm
  };
})();
