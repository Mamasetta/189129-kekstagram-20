'use strict';

(function () {
  var MIN = 0;
  var DEBOUNCE_INTERVAL = 500;

  var Key = {
    ENTER: 'Enter',
    ESCAPE: 'Escape'
  };

  var getRandomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var getRandomElement = function (elements) {
    return elements[getRandomInteger(MIN, elements.length - 1)];
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    MIN: MIN,
    Key: Key,
    getRandomInteger: getRandomInteger,
    getRandomElement: getRandomElement,
    debounce: debounce
  };
})();
