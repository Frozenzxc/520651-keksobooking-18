'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');
  function updatePins() {
    var pinsData = window.data;
    if (housingType.value !== 'any') {
      pinsData = window.data.filter(function (it) {
        return it.offer.type === housingType.value;
      });
    }

    window.pin.render(pinsData);
  }

  housingType.addEventListener('change', function () {
    updatePins();
  });
})();

