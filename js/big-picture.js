'use strict';

(function () {
  var CommentsShowCount = {
    ON_START: 5,
    BY_BUTTON: 5
  };

  var bigPicture = document.querySelector('.big-picture');
  var commentsElement = bigPicture.querySelector('.social__comments');
  var socialCaption = bigPicture.querySelector('.social__caption');
  var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var commentsCountCurrent = bigPicture.querySelector('.comments-count__current');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  var onUsersPicturePopupEscPress = function (evt) {
    if (evt.key === window.utils.Key.ESCAPE) {
      evt.preventDefault();
      closeUsersPicture();
    }
  };

  var onLoadMoreButtonClick = null;

  var openUsersPicture = function (photo) {
    socialCaption.textContent = photo.description;
    bigPictureImage.src = photo.url;
    likesCount.textContent = photo.likes;
    commentsCount.textContent = photo.comments.length;

    var showingCommentsCount = CommentsShowCount.ON_START;

    window.usersComments.renderComments(photo.comments);

    if (photo.comments.length < CommentsShowCount.ON_START) {
      commentsCountCurrent.textContent = photo.comments.length;
      commentsLoader.classList.add('hidden');
    } else {
      commentsCountCurrent.textContent = CommentsShowCount.ON_START;
      commentsLoader.classList.remove('hidden');
    }

    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onUsersPicturePopupEscPress);

    onLoadMoreButtonClick = function () {
      var prevCommentsCount = showingCommentsCount;
      showingCommentsCount = showingCommentsCount + CommentsShowCount.BY_BUTTON;

      window.usersComments.renderComments(photo.comments.slice(prevCommentsCount, showingCommentsCount));

      commentsCountCurrent.textContent = showingCommentsCount <= photo.comments.length
        ? showingCommentsCount
        : photo.comments.length;

      if (showingCommentsCount >= photo.comments.length) {
        commentsLoader.classList.add('hidden');
      }
    };

    commentsLoader.addEventListener('click', onLoadMoreButtonClick);
  };

  var closeUsersPicture = function () {
    bigPicture.classList.add('hidden');
    commentsElement.innerText = '';
    document.removeEventListener('keydown', onUsersPicturePopupEscPress);
    commentsLoader.removeEventListener('click', onLoadMoreButtonClick);
  };

  window.bigPicture = {
    openUsersPicture: openUsersPicture,
    closeUsersPicture: closeUsersPicture
  };
})();
