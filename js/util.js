'use strict';

(function () {
  window.util = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    PIN_WIDTH: 66,
    PIN_HEIGHT: 72,
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
    },

    popupMsgCloseHandler: function (elm) {
      elm.addEventListener('click', function () {
        elm.parentNode.removeChild(elm);
      });
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.ESC_KEYCODE) {
          elm.parentNode.removeChild(elm);
        }
      });
    }
  };
})();
