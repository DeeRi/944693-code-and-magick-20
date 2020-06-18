'use strict';
(function () {
  var fireball = document.querySelector('.setup-fireball-wrap');
  var eyeColor = document.querySelector('.setup-wizard .wizard-eyes');
  var coatColor = document.querySelector('.setup-wizard .wizard-coat');

  var changeWizardColor = function (array, element, isBackground, id) {
    var newColor = array[window.util.getRandomArrayIndex(array)];
    if (isBackground === true) {
      element.style.backgroundColor = newColor;
    } else {
      element.style.fill = newColor;
    }
    document.getElementById(id).value = newColor;
  };

  eyeColor.addEventListener('click', function () {
    changeWizardColor(window.util.eyeColors, eyeColor, false, 'eyes-color');
  });

  coatColor.addEventListener('click', function () {
    changeWizardColor(window.util.coatColors, coatColor, false, 'coat-color');
  });

  fireball.addEventListener('click', function () {
    changeWizardColor(window.util.fireBallColors, fireball, true, 'fireball-color');
  });
})();
