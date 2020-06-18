'use strict';
(function () {
  var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var setup = document.querySelector('.setup');
  var similarListElement = document.querySelector('.setup-similar-list'); /* элемент, в котором будут находиться новые элементы на странице*/
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item'); /* шаблон для создания элемента*/

  var fragment = document.createDocumentFragment(); /* элемент, куда сперва добавляются новые элементы (перед добавлением их всех на страницу), чтобы избежать повторного рендеринга страницы */

  var getWizardArray = function () {
    var wizardNumber = 4;
    var wizards = [];
    for (var i = 0; i < wizardNumber; ++i) {
      var wizard = {
        name: names[window.util.getRandomArrayIndex(names)],
        surname: surnames[window.util.getRandomArrayIndex(surnames)],
        coatColors: window.util.coatColors[window.util.getRandomArrayIndex(window.util.coatColors)],
        eyeColors: window.util.eyeColors[window.util.getRandomArrayIndex(window.util.eyeColors)]
      };
      wizards.push(wizard);
    }
    return wizards;
  }; /* создаем массив из волшебников*/

  var wizards = getWizardArray();

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true); /* клонируем структуру элемента, далее наполняем его новыми данными*/
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColors;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColors;

    return wizardElement;
  };

  var addWizard = function () {
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  addWizard(wizards);

  setup.querySelector('.setup-similar').classList.remove('hidden');
})();
