'use strict';

(function () {
  var MIN = 0;

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

  window.utils = {
    MIN: MIN,
    Key: Key,
    getRandomInteger: getRandomInteger,
    getRandomElement: getRandomElement
  };
})();
