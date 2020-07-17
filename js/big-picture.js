'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var commentsElement = document.querySelector('.social__comments');
  var socialCaption = document.querySelector('.social__caption');
  var socialCommentsCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');

  var onUsersPicturePopupEscPress = function (evt) {
    if (evt.key === window.utils.Key.ESCAPE) {
      evt.preventDefault();
      closeUsersPicture();
    }
  };

  var openUsersPicture = function (photo) {
    socialCaption.textContent = photo.description;
    socialCommentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    bigPictureImage.src = photo.url;
    likesCount.textContent = photo.likes;
    commentsCount.textContent = photo.comments.length;

    window.usersComments.renderComments(photo.comments);

    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onUsersPicturePopupEscPress);
  };

  var closeUsersPicture = function () {
    bigPicture.classList.add('hidden');
    commentsElement.innerText = '';
    document.removeEventListener('keydown', onUsersPicturePopupEscPress);
  };

  window.bigPicture = {
    openUsersPicture: openUsersPicture,
    closeUsersPicture: closeUsersPicture
  };
})();
