'use strict';

(function () {
  var PINS_COUNT = 5;
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;
  var form = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('.map__checkbox');

  function getHousingType(obj) {
    return housingType.value === 'any' ? true : housingType.value === obj.offer.type;
  }

  function getHousingPrice(obj) {
    if (housingPrice.value === 'any') {
      return true;
    } else if (housingPrice.value === 'low') {
      return obj.offer.price < MIN_PRICE;
    } else if (housingPrice.value === 'high') {
      return obj.offer.price > MAX_PRICE;
    } else {
      return obj.offer.price >= MIN_PRICE && obj.offer.price <= MAX_PRICE;
    }
  }

  function getHousingRooms(obj) {
    return housingRooms.value === 'any' ? true : +housingRooms.value === obj.offer.rooms;
  }

  function getHousingGuests(obj) {
    return housingGuests.value === 'any' ? true : +housingGuests.value === obj.offer.guests;
  }

  function getHousingFeatures(obj) {
    return Array.from(housingFeatures).filter(function (it) {
      return it.checked;
    }).map(function (it) {
      return it.value;
    }).every(function (feature) {
      return obj.offer.features.includes(feature);
    });
  }

  function updatePins(data) {
    return data.filter(function (obj) {
      return getHousingType(obj) &&
        getHousingPrice(obj) &&
        getHousingRooms(obj) &&
        getHousingGuests(obj) &&
        getHousingFeatures(obj);
    }).slice(0, PINS_COUNT);
  }

  function filterChangeHandler() {
    window.pin.removePins();
    window.card.cardCloseHandler();
    window.pin.render(window.filter.updatePins(window.data));
  }

  form.addEventListener('change', window.debounce(filterChangeHandler));

  window.filter = {
    updatePins: updatePins
  };
})();

