'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');

  var socialCaption = document.querySelector('.social__caption');
  socialCaption.textContent = window.usersPhotos.photos[0].description;

  var socialCommentsCount = document.querySelector('.social__comment-count');
  socialCommentsCount.classList.add('hidden');

  var commentsLoader = document.querySelector('.comments-loader');
  commentsLoader.classList.add('hidden');

  var onUsersPicturePopupEscPress = function (evt) {
    if (evt.key === window.utils.Key.ESCAPE) {
      evt.preventDefault();
      closeUsersPicture();
    }
  };

  var openUsersPicture = function (index) {
    var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
    bigPictureImage.src = window.usersPhotos.photos[index].url;

    var likesCount = bigPicture.querySelector('.likes-count');
    likesCount.textContent = window.usersPhotos.photos[index].likes;

    var commentsCount = bigPicture.querySelector('.comments-count');
    commentsCount.textContent = window.usersPhotos.photos[index].comments.length;

    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onUsersPicturePopupEscPress);
  };

  var closeUsersPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onUsersPicturePopupEscPress);
  };

  window.bigPicture = {
    openUsersPicture: openUsersPicture,
    closeUsersPicture: closeUsersPicture
  };
})();
