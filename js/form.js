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
  var photoPreviewReset = document.querySelector('.ad-form__reset');
  var previewPhoto = document.querySelector('.ad-form__photo');
  var previewAvatar = document.querySelector('.ad-form-header__preview').querySelector('img');
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

    disableOptions();
  }

  function deactivateForm(form) {
    var selects = form.querySelectorAll('select');
    var fieldsets = form.querySelectorAll('fieldset');

    previewAvatar.src = 'img/muffin-grey.svg';
    previewPhoto.innerHTML = '';

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

  function onSuccess() {
    var element = successTemplate.cloneNode(true);
    element.style.zIndex = '1000';
    document.querySelector('main').append(element);

    element.addEventListener('click', function () {
      document.querySelector('main').removeChild(element);
    });

    function onEscPressPopupClose(evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        document.querySelector('main').removeChild(element);
      }
      document.removeEventListener('keydown', onEscPressPopupClose);
    }

    document.addEventListener('keydown', onEscPressPopupClose);

    window.map.resetPage();
  }

  function onError() {
    var element = errTemplate.cloneNode(true);
    element.style.zIndex = '1000';
    document.querySelector('main').append(element);

    element.addEventListener('click', function () {
      document.querySelector('main').removeChild(element);
    });

    function onEscPressPopupClose(evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        document.querySelector('main').removeChild(element);
      }
      document.removeEventListener('keydown', onEscPressPopupClose);
    }

    document.addEventListener('keydown', onEscPressPopupClose);

    window.map.resetPage();
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
