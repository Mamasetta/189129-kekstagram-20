'use strict';

(function () {
  var Filter = {
    DEFAULT: 'filter-default',
    RANDOM: 'filter-random',
    DISCUSSED: 'filter-discussed'
  };

  var sortRandom = function (data) {
    return data.sort(function () {
      return window.utils.getRandomInteger(-1, 1);
    }).slice(0, 10);
  };

  var sortByComments = function (data) {
    return data.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  var filterPhotos = function (photos, filter) {
    var copyPhotos = photos.slice();

    switch (filter.id) {
      case Filter.DEFAULT:
        return copyPhotos;

      case Filter.RANDOM:
        return sortRandom(copyPhotos);

      case Filter.DISCUSSED:
        return sortByComments(copyPhotos);
    }

    return copyPhotos;
  };

  window.sorting = {
    filterPhotos: filterPhotos
  };
})();
