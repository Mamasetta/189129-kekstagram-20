'use strict';

(function () {
  var URL_LOAD = 'https://javascript.pages.academy/kekstagram/data';
  var URL_UPLOAD = 'https://javascript.pages.academy/kekstagram';
  var TIMEOUT = 10000;
  var StatusCode = {
    OK: 200
  };


  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.open('GET', URL_LOAD);
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + (xhr.timeout / 1000) + 'с');
      });

      xhr.timeout = TIMEOUT;

      xhr.send();
    },

    upload: function (data, onSend, onError) {
      var xhr = new XMLHttpRequest();

      xhr.open('POST', URL_UPLOAD);
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onSend(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + (xhr.timeout / 1000) + 'с');
      });

      xhr.timeout = TIMEOUT;

      xhr.send(data);
    }
  };
})();
