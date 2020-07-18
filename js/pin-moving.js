'use strict';

(function () {
  var imageUploadOverlay = document.querySelector('.img-upload__overlay');
  var effectLevelPin = imageUploadOverlay.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  var onPinMoveChangeEffect = function (evt) {
    evt.preventDefault();
    var lineWidth = effectLevelLine.offsetWidth;
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      if (effectLevelPin.offsetLeft < 0) {
        effectLevelPin.style.left = 0 + 'px';
        effectLevelDepth.style.width = 0 + 'px';
      } else if (effectLevelPin.offsetLeft > lineWidth) {
        effectLevelPin.style.left = lineWidth + 'px';
        effectLevelDepth.style.width = lineWidth + 'px';
      } else {
        effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
        effectLevelDepth.style.width = (effectLevelPin.offsetLeft - shift.x) + 'px';
      }
      window.pictureEffects.onSaturationChange();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.pinMoving = {
    onPinMoveChangeEffect: onPinMoveChangeEffect
  };
})();
