'use strict';

(function () {
  var picturesElement = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCansel = bigPicture.querySelector('.big-picture__cancel');
  var imageUploadForm = document.querySelector('.img-upload__form');
  var uploadFile = document.querySelector('#upload-file');
  var uploadCancel = document.querySelector('#upload-cancel');
  var uploadForm = document.querySelector('#upload-select-image');
  var imageFilter = document.querySelector('.img-filters');
  var imageFiltersButtons = imageFilter.querySelectorAll('.img-filters__button');

  window.backend.load(function (photos) {
    window.usersPhotos.renderPictures(photos);

    var selectedButton = function (targetButton) {
      imageFiltersButtons.forEach(function (button) {
        button.classList.remove('img-filters__button--active');
      });
      targetButton.classList.add('img-filters__button--active');
    };

    var sortingPhotos = function (evt) {
      evt.preventDefault();

      if (evt.target.classList.contains('img-filters__button')) {
        selectedButton(evt.target);
        window.usersPhotos.removePictures();
        window.usersPhotos.renderPictures(window.sorting.filterPhotos(photos, evt.target));
      }
    };

    picturesElement.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('picture__img')) {
        evt.preventDefault();
        window.bigPicture.openUsersPicture(photos[Number(evt.target.closest('.picture').dataset.id)]);
      }
    });

    picturesElement.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.Key.ENTER && evt.target.classList.contains('picture')) {
        evt.preventDefault();
        window.bigPicture.openUsersPicture(photos[Number(evt.target.dataset.id)]);
      }
    });

    bigPictureCansel.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.bigPicture.closeUsersPicture();
    });

    imageFilter.classList.remove('img-filters--inactive');

    imageFilter.addEventListener('click', window.utils.debounce(sortingPhotos));
  }, function () {});

  uploadFile.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.form.openUploadFile();
  });

  uploadCancel.addEventListener('click', function () {
    window.form.closeUploadFile();
    imageUploadForm.reset();
    window.form.returnDefaultUploadFile();
  });

  uploadCancel.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.Key.ENTER) {
      window.form.closeUploadFile();
      imageUploadForm.reset();
      window.form.returnDefaultUploadFile();
    }
  });

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.upload(new FormData(uploadForm), function () {
      window.form.closeUploadFile();
      window.form.returnDefaultUploadFile();
      imageUploadForm.reset();
      window.statusMessages.createSuccessMessage();
    }, function () {
      window.statusMessages.createErrorMessage();
    });
  });
})();
