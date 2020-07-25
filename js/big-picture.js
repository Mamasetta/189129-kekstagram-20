'use strict';

(function () {
  var COMMENTS_SHOW_COUNT_ON_START = 5;
  var COMMENTS_SHOW_COUNT_BY_BUTTON = 5;

  var bigPicture = document.querySelector('.big-picture');
  var commentsElement = bigPicture.querySelector('.social__comments');
  var socialCaption = bigPicture.querySelector('.social__caption');
  var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var socialCommentsCount = bigPicture.querySelector('.social__comment-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  var onUsersPicturePopupEscPress = function (evt) {
    if (evt.key === window.utils.Key.ESCAPE) {
      evt.preventDefault();
      closeUsersPicture();
    }
  };

  var openUsersPicture = function (photo) {
    socialCaption.textContent = photo.description;
    bigPictureImage.src = photo.url;
    likesCount.textContent = photo.likes;
    commentsCount.textContent = photo.comments.length;

    var showingCommentsCount = COMMENTS_SHOW_COUNT_ON_START;
console.log(showingCommentsCount);
    window.usersComments.renderComments(photo.comments);

    if (photo.comments.length < showingCommentsCount) {
      socialCommentsCount.textContent = photo.comments.length + ' из ' + photo.comments.length;
      commentsLoader.classList.add('hidden');
    }

    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onUsersPicturePopupEscPress);

    commentsLoader.addEventListener('click', function () {
      var prevCommentsCount = showingCommentsCount;
      showingCommentsCount = showingCommentsCount + COMMENTS_SHOW_COUNT_BY_BUTTON;

      window.usersComments.renderComments(photo.comments.slice(prevCommentsCount, showingCommentsCount));

      if (showingCommentsCount <= photo.comments.length) {
        socialCommentsCount.textContent = showingCommentsCount + ' из ' + photo.comments.length;
      } else {
        socialCommentsCount.textContent = photo.comments.length + ' из ' + photo.comments.length;
      }

      if (showingCommentsCount >= photo.comments.length) {
        commentsLoader.classList.add('hidden');
      }
    });
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
