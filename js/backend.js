'use strict';

(function () {
  function load(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
  }

  function upload(data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка отправки формы');
    });

    xhr.open('POST', 'https://js.dump.academy/keksobooking');
    xhr.send(data);
  }


  window.backend = {
    load: load,
    upload: upload
  };
})();
