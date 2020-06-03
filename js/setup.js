'use strict';
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list'); /* элемент, в котором будут находиться новые элементы на странице*/
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item'); /* шаблон для создания элемента*/

var fragment = document.createDocumentFragment(); /* элемент, куда сперва добавляются новые элементы (перед добавлением их всех на страницу), чтобы избежать повторного рендеринга страницы */


var generateRandomNumber = function (array) {
  var arrayLength = array.length;
  return Math.floor(Math.random() * Math.floor(arrayLength));
}; /* создаем функцию для случайного выбора индекса элемента в массиве*/

var wizards = [
  {
    name: WIZARD_NAMES[generateRandomNumber(WIZARD_NAMES)],
    surname: WIZARD_SURNAMES[generateRandomNumber(WIZARD_SURNAMES)],
    coatColor: coatColor[generateRandomNumber(coatColor)],
    eyesColor: eyesColor[generateRandomNumber(eyesColor)]
  },

  {
    name: WIZARD_NAMES[generateRandomNumber(WIZARD_NAMES)],
    surname: WIZARD_SURNAMES[generateRandomNumber(WIZARD_SURNAMES)],
    coatColor: coatColor[generateRandomNumber(coatColor)],
    eyesColor: eyesColor[generateRandomNumber(eyesColor)]
  },

  {
    name: WIZARD_NAMES[generateRandomNumber(WIZARD_NAMES)],
    surname: WIZARD_SURNAMES[generateRandomNumber(WIZARD_SURNAMES)],
    coatColor: coatColor[generateRandomNumber(coatColor)],
    eyesColor: eyesColor[generateRandomNumber(eyesColor)]
  },

  {
    name: WIZARD_NAMES[generateRandomNumber(WIZARD_NAMES)],
    surname: WIZARD_SURNAMES[generateRandomNumber(WIZARD_SURNAMES)],
    coatColor: coatColor[generateRandomNumber(coatColor)],
    eyesColor: eyesColor[generateRandomNumber(eyesColor)]
  }
];

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true); /* клонируем структуру элемента, далее наполняем его новыми данными*/
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.coatColor;

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
