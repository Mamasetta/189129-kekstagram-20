'use strict';

(function () {
  var imageUploadOverlay = document.querySelector('.img-upload__overlay');
  var imageUploadScale = imageUploadOverlay.querySelector('.img-upload__scale');
  var scaleControlValue = imageUploadScale.querySelector('.scale__control--value');
  var imageUploadPreview = imageUploadOverlay.querySelector('.img-upload__preview img');
  var imageUploadEffectLevel = imageUploadOverlay.querySelector('.img-upload__effect-level');
  var effectLevelLine = imageUploadOverlay.querySelector('.effect-level__line');

  var Scale = {
    STEP: 25,
    MIN: 25,
    MAX: 100,
    INITIAL: 100
  };
  var currentScaleValue = Scale.INITIAL;

  var Filter = {
    CHROME: 'chrome',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    HEAT: 'heat',
    ORIGIN: 'none'
  };

  var EffectsMaxValue = {
    PHOBOS: 3,
    MARVIN: 100,
    HEAT: 3
  };

  var currentEffect = Filter.ORIGIN;

  var resizePhoto = function () {
    scaleControlValue.value = currentScaleValue + '%';
    imageUploadPreview.style.transform = 'scale(' + currentScaleValue * 0.01 + ')';
  };

  var onScaleSmallerPress = function () {
    if (currentScaleValue <= Scale.INITIAL && currentScaleValue > Scale.MIN) {
      currentScaleValue -= Scale.STEP;
      resizePhoto();
    }
  };

  var onScaleBiggerPress = function () {
    if (currentScaleValue >= Scale.MIN && currentScaleValue < Scale.INITIAL) {
      currentScaleValue += Scale.STEP;
      resizePhoto();
    }
  };

  var selectEffect = function (value) {
    switch (currentEffect) {
      case Filter.CHROME :
        return 'grayscale(' + value + ')';
      case Filter.SEPIA:
        return 'sepia(' + value + ')';
      case Filter.MARVIN:
        return 'invert(' + value * EffectsMaxValue.MARVIN + '%)';
      case Filter.PHOBOS:
        return 'blur(' + EffectsMaxValue.PHOBOS * value + 'px)';
      case Filter.HEAT:
        return 'brightness(' + EffectsMaxValue.HEAT * value + ')';
      default:
        return 'none';
    }
  };

  var onEffectChange = function (evt) {
    currentEffect = evt.target.value;
    imageUploadPreview.className = '';
    imageUploadPreview.style.filter = Filter.ORIGIN;
    imageUploadPreview.classList.add('effects__preview--' + evt.target.value);
    if (evt.target.value !== 'none') {
      imageUploadEffectLevel.classList.remove('hidden');
    } else {
      imageUploadEffectLevel.classList.add('hidden');
    }
    imageUploadPreview.style.filter = selectEffect(1);
  };

  var getSaturationValue = function (evt) {
    return (evt.target.offsetLeft / effectLevelLine.offsetWidth).toFixed(2);
  };

  var onSaturationChange = function (evt) {
    var value = getSaturationValue(evt);
    imageUploadPreview.style.filter = selectEffect(value);
  };

  window.pictureEffects = {
    resizePhoto: resizePhoto,
    onScaleSmallerPress: onScaleSmallerPress,
    onScaleBiggerPress: onScaleBiggerPress,
    onEffectChange: onEffectChange,
    onSaturationChange: onSaturationChange
  };
})();
