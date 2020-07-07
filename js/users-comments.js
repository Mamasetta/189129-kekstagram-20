'use strict';

(function () {
  var commentTemplate = document
      .querySelector('#comment')
      .content
      .querySelector('.social__comment');

  var createComment = function (commentData) {
    var commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = commentData.avatar;
    commentElement.querySelector('.social__picture').alt = commentData.name;
    commentElement.querySelector('.social__text').textContent = commentData.message;

    return commentElement;
  };

  var renderComments = function () {
    var commentsElement = document.querySelector('.social__comments');
    var fragment = document.createDocumentFragment();

    window.usersPhotos.photos[0].comments.forEach(function (photoComment) {
      fragment.appendChild(createComment(photoComment));
    });

    commentsElement.appendChild(fragment);
  };

  window.usersComments = {
    renderComments: renderComments
  };
})();
