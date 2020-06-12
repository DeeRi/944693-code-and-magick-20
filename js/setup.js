'use strict';
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyeColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireBallColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

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
var userNameInput = setup.querySelector('.setup-user-name');

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

// изменение цвета фаербола, глаз и мантии
var fireball = document.querySelector('.setup-fireball-wrap');
var eyeColor = document.querySelector('.setup-wizard .wizard-eyes');
var coatColor = document.querySelector('.setup-wizard .wizard-coat');

var changeWizardColor = function (array, element, isBackground, id) {
  var newColor = array[getRandomArrayIndex(array)];
  if (isBackground === true) {
    element.style.backgroundColor = newColor;
  } else {
    element.style.fill = newColor;
  }
  document.getElementById(id).value = newColor;
};

eyeColor.addEventListener('click', function () {
  changeWizardColor(eyeColors, eyeColor, false, 'eyes-color');
});

coatColor.addEventListener('click', function () {
  changeWizardColor(coatColors, coatColor, false, 'coat-color');
});

fireball.addEventListener('click', function () {
  changeWizardColor(fireBallColors, fireball, true, 'fireball-color');
});

// валидация и отправка формы
var sendFormButton = setup.querySelector('.setup-submit');
var form = document.querySelector('.setup-wizard-form');


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

