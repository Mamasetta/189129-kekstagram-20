'use strict';

(function () {
  var TIMEOUT = 10000;

  var Url = {
    LOAD: 'https://javascript.pages.academy/kekstagram/data',
    UPLOAD: 'https://javascript.pages.academy/kekstagram'
  };

  var StatusCode = {
    OK: 200
  };


  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.open('GET', Url.LOAD);
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

      xhr.open('POST', Url.UPLOAD);
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
