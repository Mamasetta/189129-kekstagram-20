'use strict';

(function () {
  var DEFAULT_FILTER = 'none';
  var DEFAULT_FILTER_POSITION_VALUE = 100;

  var imageUploadOverlay = document.querySelector('.img-upload__overlay');

  var imageUploadScale = imageUploadOverlay.querySelector('.img-upload__scale');
  var scaleControlValue = imageUploadScale.querySelector('.scale__control--value');
  var scaleControlSmaller = imageUploadScale.querySelector('.scale__control--smaller');
  var scaleControlBigger = imageUploadScale.querySelector('.scale__control--bigger');

  var imageUploadPreview = imageUploadOverlay.querySelector('.img-upload__preview img');
  var imageUploadEffectsContainer = imageUploadOverlay.querySelector('.img-upload__effects');
  var imageUploadEffectLevel = imageUploadOverlay.querySelector('.img-upload__effect-level');

  var effectLevelPin = imageUploadOverlay.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  var hashtag = imageUploadOverlay.querySelector('.text__hashtags');
  var description = imageUploadOverlay.querySelector('.text__description');

  var onUploadFilePopupEscPress = function (evt) {
    if (evt.key === window.utils.Key.ESCAPE) {
      evt.preventDefault();
      closeUploadFile();
    }
  };

  var onUploadFileElementFocus = function () {
    document.removeEventListener('keydown', onUploadFilePopupEscPress);
  };

  var onUploadFileElementBlur = function () {
    document.addEventListener('keydown', onUploadFilePopupEscPress);
  };

  var returnDefaultUploadFile = function () {
    imageUploadPreview.classList.add('effects__preview--none');
    imageUploadPreview.style.transform = 'scale(' + window.pictureEffects.Scale.INITIAL * 0.01 + ')';
    imageUploadPreview.style.filter = DEFAULT_FILTER;
    effectLevelPin.style.left = DEFAULT_FILTER_POSITION_VALUE + '%';
    effectLevelDepth.style.width = DEFAULT_FILTER_POSITION_VALUE + '%';
    hashtag.classList.remove('hashtags-error');
  };

  var openUploadFile = function () {
    imageUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
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
    imageUploadPreview.style.transform = 'scale(' + window.pictureEffects.Scale.INITIAL * 0.01 + ')';
    scaleControlValue.value = window.pictureEffects.Scale.INITIAL + '%';
  };

  var closeUploadFile = function () {
    imageUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
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
  };

  window.form = {
    returnDefaultUploadFile: returnDefaultUploadFile,
    openUploadFile: openUploadFile,
    closeUploadFile: closeUploadFile
  };
})();
