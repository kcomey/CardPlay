'use strict';

exports.draw = function(game) {
  if (game.deck.length === 0) {
    return null;
  }
  var newGame = {};
  newGame.id = game.id;
  newGame.game = game.game;
  newGame.options = game.options;
  newGame.deck = game.deck.slice(game.options.draw);
  newGame.draw = game.deck.slice(0, game.options.draw).concat(game.draw);
  newGame.stacks = game.stacks;
  newGame.promoted = game.promoted;
  return newGame;
}

exports.flip = function(game) {
  return game;
}

exports.move = function(card, toStack, game) {
  return game;
}

exports.promote = function(card, game) {
  return game;
}

exports.unpromote = function(card, toStack, game) {
  return game;
}

exports.reveal = function(stack, game) {
  return game;
}
