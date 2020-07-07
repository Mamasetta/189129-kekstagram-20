'use strict';

(function () {
  var imageUploadOverlay = document.querySelector('.img-upload__overlay');
  var hashtag = imageUploadOverlay.querySelector('.text__hashtags');
  var HASHTAGS_MAX = 5;
  var HASHTAG_MAX_LENGTH = 20;
  var hashtagReg = /^#[a-zа-яёA-ZА-ЯЁ0-9]*$/;

  var validateHashtag = function (value) {
    var hashtags = value.toLowerCase().trim().split(/\s+/);

    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i][0] !== '#') {
        return '# всему голова! Начни хэш-тег с неё!';
      }

      if (hashtags[i] === '#') {
        return 'Только # еще не хэш-тег! Напиши еще что-нибудь.';
      }

      if (hashtags[i].lastIndexOf('#') !== 0) {
        return 'Не торопись! Разделяй пробелом хэш-теги!';
      }

      if (!hashtagReg.test(hashtags[i])) {
        return 'Ой-ой-ой! Можно использовать только буквы и цифры!';
      }

      if (hashtags[i].length > HASHTAG_MAX_LENGTH) {
        return 'Слишком длинное слово получилось! Максимум 20 букв, больше не надо!';
      }

      var findDuplicateHashtags = hashtags.filter(function (item) {
        return item === hashtags[i];
      });

      if (findDuplicateHashtags.length > 1) {
        return 'Не повторяйся! Не надо так...';
      }
    }

    if (hashtags.length > HASHTAGS_MAX) {
      return 'Не пиши поэму! Можно только 5 хэш-тегов!';
    }

    return '';
  };

  var onHashtagValidationInput = function (evt) {
    hashtag.setCustomValidity(validateHashtag(evt.target.value));
    hashtag.reportValidity();
  };

  window.validationHashtag = {
    onHashtagValidationInput: onHashtagValidationInput
  };
})();
