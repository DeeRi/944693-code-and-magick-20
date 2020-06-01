'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var BAR_GAP = 50;
var GAP = 15;
var MAIN_FONT = 'PT Mono 16px';
var MAIN_TEXT_COLOR = '#000';
var BAR_WIDTH = 40;
var TEXT_HEIGHT = 30;
var BAR_MAX_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderBar = function (ctx, x, y, width, height) {
  ctx.fillRect(x, y, width, height);
};

var makeCapture = function (ctx, text, font, x, y, color) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min + '%';
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  makeCapture(ctx, 'Ура вы победили!', MAIN_FONT, CLOUD_X + GAP, CLOUD_Y + GAP * 2, MAIN_TEXT_COLOR);
  makeCapture(ctx, 'Список результатов:', MAIN_FONT, CLOUD_X + GAP, CLOUD_Y + GAP * 3, MAIN_TEXT_COLOR);

  var maxTime = getMaxElement(times);
  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    var barHeight = (BAR_MAX_HEIGHT * times[i]) / maxTime;
    makeCapture(ctx, players[i], MAIN_FONT, CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_Y + GAP * 5 + BAR_MAX_HEIGHT + TEXT_HEIGHT, MAIN_TEXT_COLOR);
    makeCapture(
        ctx,
        Math.round(times[i]),
        MAIN_FONT,
        CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_Y + (BAR_MAX_HEIGHT - barHeight) + GAP * 3 + TEXT_HEIGHT,
        MAIN_TEXT_COLOR
    );

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240,' + getRandomNumber(1, 100) + ', 50%)';
    }

    renderBar(
        ctx,
        CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_Y + GAP * 4 + (BAR_MAX_HEIGHT - barHeight) + TEXT_HEIGHT,
        BAR_WIDTH,
        barHeight
    );
  }
};
