'use strict';

var solitaire = require('./game');

exports.draw = function(game) {
  if (game.deck.length === 0) {
    return null;
  }
  var newGame = solitaire.cloneGame(game);
  newGame.deck = game.deck.slice(game.options.draw);
  newGame.stacks.draw = game.deck.slice(0, game.options.draw).reverse()
    .concat(game.stacks.draw);

  return newGame;
}

exports.flip = function(game) {
  if (game.deck.length !== 0) {
    return null;
  }
  var newGame = solitaire.cloneGame(game);
  newGame.deck = game.stacks.draw.slice(0).reverse();
  newGame.stacks.draw = [];

  return newGame;
}

exports.move = function(card, fromStack, toStack, game) {

  return newGame;
}

exports.promote = function(card, fromStack, game) {
  return newGame;
}

exports.unpromote = function(card, toStack, game) {
  return game;
}

exports.reveal = function(stack, game) {
  return game;
}
