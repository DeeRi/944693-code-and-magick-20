'use strict';
(function () {
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;
  var sendFormButton = document.querySelector('.setup-submit');
  var form = document.querySelector('.setup-wizard-form');
  var userNameInput = document.querySelector('.setup-user-name');

  // пример кода для замены дефолтного сообщения о невалидном input, такая же задача решается через html
  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });


  userNameInput.addEventListener('input', function () {
    var valueLength = userNameInput.value.length;
    if (valueLength < MIN_NAME_LENGTH) {
      userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_NAME_LENGTH) {
      userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MIN_NAME_LENGTH) + ' симв.');
    } else {
      userNameInput.setCustomValidity('');
    }
  });


  sendFormButton.addEventListener('click', function () {
    if (userNameInput.validity.valid) {
      form.submit();
    } else {
      return;
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (userNameInput.validity.valid && evt.key === 'Enter' && document.activeElement === sendFormButton) {
      form.submit();
    } else {
      return;
    }
  });
})();
