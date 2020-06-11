'use strict';
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyeColors = ['black', 'red', 'blue', 'yellow', 'green'];

var setup = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list'); /* элемент, в котором будут находиться новые элементы на странице*/
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item'); /* шаблон для создания элемента*/

var fragment = document.createDocumentFragment(); /* элемент, куда сперва добавляются новые элементы (перед добавлением их всех на страницу), чтобы избежать повторного рендеринга страницы */


var getRandomArrayIndex = function (array) {
  var arrayLength = array.length;
  return Math.floor(Math.random() * Math.floor(arrayLength));
}; /* создаем функцию для случайного выбора индекса элемента в массиве*/

var getWizardArray = function () {
  var wizardNumber = 4;
  var wizards = [];
  for (var i = 0; i < wizardNumber; ++i) {
    var wizard = {
      name: names[getRandomArrayIndex(names)],
      surname: surnames[getRandomArrayIndex(surnames)],
      coatColors: coatColors[getRandomArrayIndex(coatColors)],
      eyeColors: eyeColors[getRandomArrayIndex(eyeColors)]
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

// открытие/закрытие окна настройки персонажа
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userIcon = document.querySelector('.setup-open-icon');
var nameInput = setup.querySelector('.setup-user-name');
var sendFormButton = setup.querySelector('.setup-submit');
var form = document.querySelector('.setup-wizard-form');

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
  if (evt.key === 'Escape' && document.activeElement !== nameInput) {
    evt.preventDefault();
    setup.classList.add('hidden');
  }
});


document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter' && document.activeElement === setupClose) {
    setup.classList.add('hidden');
  }
});

sendFormButton.addEventListener('click', function () {
  form.submit();
});

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter' && document.activeElement === sendFormButton) {
    form.submit();
  }
});
