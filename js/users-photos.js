'use strict';

(function () {
  var photos = window.data.generatePhotos();

  var pictureTemplate = document
    .querySelector('#picture')
    .content
    .querySelector('.picture');

  var createPicture = function (pictureData, pictureIndex) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = pictureData.url;
    pictureElement.querySelector('.picture__likes').innerText = pictureData.likes;
    pictureElement.querySelector('.picture__comments').innerText = pictureData.comments.length;
    pictureElement.dataset.id = pictureIndex;

    return pictureElement;
  };

  var picturesElement = document.querySelector('.pictures');

  var renderPictures = function () {
    var fragment = document.createDocumentFragment();

    photos.forEach(function (photo, index) {
      fragment.appendChild(createPicture(photo, index));
    });

    picturesElement.appendChild(fragment);
  };

  window.usersPhotos = {
    photos: photos,
    renderPictures: renderPictures
  };
})();
