'use strict';

(function () {
  window.util = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,
    getRandomInt: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },

    getRandomElm: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    getRandomArr: function (data) {
      var count = window.util.getRandomInt(1, data.length);
      var result = [];
      for (var i = 0; i < count; i++) {
        result[i] = data[i];
      }
      return result;
    }
  };
})();
