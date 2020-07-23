'use strict';

(function () {
  var randomSorting = function (data) {
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
      case 'filter-default':
        return copyPhotos;

      case 'filter-random':
        return randomSorting(copyPhotos);

      case 'filter-discussed':
        return sortByComments(copyPhotos);
    }

    return copyPhotos;
  };

  window.sorting = {
    filterPhotos: filterPhotos
  };
})();
