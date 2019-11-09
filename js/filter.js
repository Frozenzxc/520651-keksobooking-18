'use strict';

(function () {
  var errTemplate = document.querySelector('#error').content.querySelector('div');
  var pinList = [];
  var housingType = document.querySelector('#housing-type');
  function updatePins() {
    var sameTypePins = pinList.filter(function (it) {
      return it.offer.type === housingType.value;
    });
    var filteredPins = sameTypePins.concat(pinList);
    var uniquePins =
      filteredPins.filter(function (it, i) {
        return filteredPins.indexOf(it) === i;
      })
      .concat(pinList);
    window.pin.render(uniquePins);
  }

  housingType.addEventListener('change', function () {
    updatePins();
  });

  function onLoad(data) {
    pinList = data;
  }

  function onError() {
    var element = errTemplate.cloneNode(true);
    element.style.zIndex = '1000';
    document.querySelector('main').append(element);
  }

  window.backend.load(onLoad, onError);

  window.filter = {
    updatePins: updatePins
  };
})();

