'use strict';

(function () {
  var ERROR_MESSAGE_Z_INDEX = 100;
  var main = document.querySelector('main');

  var successMessageTemplate = document
    .querySelector('#success')
    .content
    .querySelector('.success');

  var createSuccessMessage = function () {
    var successMessage = successMessageTemplate.cloneNode(true);
    var successMessageButton = successMessage.querySelector('.success__button');

    var onCloseSuccessMessageEsc = function (evt) {
      if (evt.key === window.utils.Key.ESCAPE) {
        onCloseSuccessMessage();
      }
    };

    var onCloseSuccessMessage = function () {
      successMessage.remove();
      document.removeEventListener('keydown', onCloseSuccessMessageEsc);
      successMessage.removeEventListener('click', onCloseSuccessMessage);
      successMessageButton.removeEventListener('click', onCloseSuccessMessage);
    };

    document.addEventListener('keydown', onCloseSuccessMessageEsc);

    successMessage.addEventListener('click', function (evt) {
      if (!evt.target.classList.contains('success__inner')) {
        onCloseSuccessMessage();
      }
    });

    successMessageButton.addEventListener('click', onCloseSuccessMessage);
    main.appendChild(successMessage);
  };

  var errorMessageTemplate = document
    .querySelector('#error')
    .content
    .querySelector('.error');

  var createErrorMessage = function () {
    var errorMessage = errorMessageTemplate.cloneNode(true);
    var errorMessageButton = errorMessage.querySelector('.error__button');

    var onCloseErrorMessageEsc = function (evt) {
      if (evt.key === window.utils.Key.ESCAPE) {
        onCloseErrorMessage();
      }
    };
    var onCloseErrorMessage = function () {
      errorMessage.remove();
      document.removeEventListener('keydown', onCloseErrorMessageEsc);
      errorMessage.removeEventListener('click', onCloseErrorMessage);
      errorMessageButton.removeEventListener('click', onCloseErrorMessage);
    };

    errorMessage.style.zIndex = ERROR_MESSAGE_Z_INDEX;
    document.addEventListener('keydown', onCloseErrorMessageEsc);

    errorMessage.addEventListener('click', function (evt) {
      if (!evt.target.classList.contains('error__inner')) {
        onCloseErrorMessage();
      }
    });

    errorMessageButton.addEventListener('click', onCloseErrorMessage);
    main.appendChild(errorMessage);
  };

  window.statusMessages = {
    createSuccessMessage: createSuccessMessage,
    createErrorMessage: createErrorMessage
  };
})();
