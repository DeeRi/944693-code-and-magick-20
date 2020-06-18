'use strict';
(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userIcon = document.querySelector('.setup-open-icon');
  var userNameInput = document.querySelector('.setup-user-name');

  setupOpen.addEventListener('click', function () {
    setup.classList.remove('hidden');
  });

  setupClose.addEventListener('click', function () {
    setup.classList.add('hidden');
  });

  userIcon.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      setup.classList.remove('hidden');
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape' && document.activeElement !== userNameInput) {
      evt.preventDefault();
      setup.classList.add('hidden');
    }
  });


  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter' && document.activeElement === setupClose) {
      setup.classList.add('hidden');
    }
  });
})();
