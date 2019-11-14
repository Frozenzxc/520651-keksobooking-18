'use strict';

(function () {
  var errTemplate = document.querySelector('#error').content.querySelector('.error');

  function connect(onSuccess, onFail, data) {
    var xhr = new XMLHttpRequest();
    var requestType = 'GET';
    var url = window.util.LOAD_URL;
    xhr.responseType = 'json';

    if (data) {
      requestType = 'POST';
      url = window.util.UPLOAD_URL;
    }

    xhr.addEventListener('load', function () {
      if (xhr.status === window.util.SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onFail('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onFail('Произошла ошибка соединения');
    });

    xhr.open(requestType, url);
    xhr.send(data);
  }

  function load(onSuccess, onFail) {
    connect(onSuccess, onFail);
  }

  function upload(onSuccess, onFail, data) {
    connect(onSuccess, onFail, data);
  }

  function onError() {
    var main = document.querySelector('main');
    var element = errTemplate.cloneNode(true);
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

  window.backend = {
    load: load,
    upload: upload,
    onError: onError
  };
})();
