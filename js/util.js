'use strict';
(function () {
  window.util = {
    fireBallColors: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    eyeColors: ['black', 'red', 'blue', 'yellow', 'green'],
    coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],

    getRandomArrayIndex: function (array) {
      var arrayLength = array.length;
      return Math.floor(Math.random() * Math.floor(arrayLength));
    }
  };
})();
