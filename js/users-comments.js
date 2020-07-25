'use strict';

(function () {
  var COMMENTS_SHOW_COUNT = 5;

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

  var renderComments = function (comments) {
    var commentsElement = document.querySelector('.social__comments');
    var fragment = document.createDocumentFragment();

    if (comments.length < COMMENTS_SHOW_COUNT) {
      comments.forEach(function (photoComment) {
        fragment.appendChild(createComment(photoComment));
      });
    } else {
      for (var i = 0; i < COMMENTS_SHOW_COUNT; i++) {
        var photoComment = comments[i];
        fragment.appendChild(createComment(photoComment));
      }
    }

    commentsElement.appendChild(fragment);
  };

  window.usersComments = {
    renderComments: renderComments
  };
})();
