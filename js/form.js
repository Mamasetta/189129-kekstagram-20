'use strict';

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var body = document.querySelector('body');
  var imageUploadOverlay = document.querySelector('.img-upload__overlay');
  var imageUploadScale = imageUploadOverlay.querySelector('.img-upload__scale');
  var scaleControlSmaller = imageUploadScale.querySelector('.scale__control--smaller');
  var scaleControlBigger = imageUploadScale.querySelector('.scale__control--bigger');
  var imageUploadEffectsContainer = imageUploadOverlay.querySelector('.img-upload__effects');
  var imageUploadEffectLevel = imageUploadOverlay.querySelector('.img-upload__effect-level');
  var effectLevelPin = imageUploadOverlay.querySelector('.effect-level__pin');
  var hashtag = imageUploadOverlay.querySelector('.text__hashtags');

  var onUploadFilePopupEscPress = function (evt) {
    if (evt.key === window.utils.Key.ESCAPE) {
      evt.preventDefault();
      closeUploadFile();
    }
  };

  var description = imageUploadOverlay.querySelector('.text__description');

  var onUploadFileElementFocus = function () {
    document.removeEventListener('keydown', onUploadFilePopupEscPress);
  };

  var onUploadFileElementBlur = function () {
    document.addEventListener('keydown', onUploadFilePopupEscPress);
  };

  var openUploadFile = function () {
    imageUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onUploadFilePopupEscPress);
    hashtag.addEventListener('focus', onUploadFileElementFocus);
    hashtag.addEventListener('blur', onUploadFileElementBlur);
    description.addEventListener('focus', onUploadFileElementFocus);
    description.addEventListener('blur', onUploadFileElementBlur);
    window.pictureEffects.resizePhoto();
    scaleControlSmaller.addEventListener('click', window.pictureEffects.onScaleSmallerPress);
    scaleControlBigger.addEventListener('click', window.pictureEffects.onScaleBiggerPress);
    imageUploadEffectLevel.classList.add('hidden');
    imageUploadEffectsContainer.addEventListener('change', window.pictureEffects.onEffectChange);
    effectLevelPin.addEventListener('mousedown', window.pinMoving.onPinMoveChangeEffect);
    hashtag.addEventListener('input', window.validationHashtag.onHashtagValidationInput);
  };

  var closeUploadFile = function () {
    imageUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onUploadFilePopupEscPress);
    hashtag.removeEventListener('focus', onUploadFileElementFocus);
    hashtag.removeEventListener('blur', onUploadFileElementBlur);
    description.removeEventListener('focus', onUploadFileElementFocus);
    description.removeEventListener('blur', onUploadFileElementBlur);
    scaleControlSmaller.removeEventListener('click', window.pictureEffects.onScaleSmallerPress);
    scaleControlBigger.removeEventListener('click', window.pictureEffects.onScaleBiggerPress);
    imageUploadEffectLevel.classList.remove('hidden');
    imageUploadEffectsContainer.removeEventListener('change', window.pictureEffects.onEffectChange);
    effectLevelPin.removeEventListener('mousedown', window.pinMoving.onPinMoveChangeEffect);
    hashtag.removeEventListener('input', window.validationHashtag.onHashtagValidationInput);
    uploadFile.value = '';
  };

  window.form = {
    openUploadFile: openUploadFile,
    closeUploadFile: closeUploadFile
  };
})();
