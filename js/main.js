'use strict';

(function () {
  var picturesElement = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCansel = bigPicture.querySelector('.big-picture__cancel');
  var uploadFile = document.querySelector('#upload-file');
  var uploadCancel = document.querySelector('#upload-cancel');

  window.usersPhotos.renderPictures();
  window.usersComments.renderComments();

  picturesElement.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      evt.preventDefault();
      window.bigPicture.openUsersPicture(Number(evt.target.closest('.picture').dataset.id));
    }
  });

  picturesElement.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.Key.ENTER && evt.target.classList.contains('picture')) {
      evt.preventDefault();
      window.bigPicture.openUsersPicture(Number(evt.target.dataset.id));
    }
  });

  bigPictureCansel.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.bigPicture.closeUsersPicture();
  });

  uploadFile.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.form.openUploadFile();
  });

  uploadCancel.addEventListener('click', function () {
    window.form.closeUploadFile();
  });

  uploadCancel.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.Key.ENTER) {
      window.form.closeUploadFile();
    }
  });
})();
