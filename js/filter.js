'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');
  function updatePins() {
    var sameTypePins = window.data.filter(function (it) {
      return it.offer.type === housingType.value;
    });

    window.pin.render(sameTypePins);
  }

  housingType.addEventListener('change', function () {
    updatePins();
  });
})();

