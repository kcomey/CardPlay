'use strict';

exports.draw = function(game) {
  if (game.deck.length === 0) {
    return null;
  }
  var newGame = {};
  newGame.options = game.options;
  newGame.stacks = game.stacks;
  newGame.deck = game.deck.slice(game.options.draw);
  newGame.stacks.draw = game.deck.slice(0, game.options.draw).reverse()
    .concat(game.stacks.draw);

  return newGame;
}

exports.flip = function(game) {
  if (game.deck.length !== 0) {
    return null;
  }
  var newGame = {};
  newGame.options = game.options;
  newGame.deck = game.draw.slice(0).reverse();
  newGame.draw = [];
  newGame.stacks = game.stacks;
  newGame.promoted = game.promoted;
  return newGame;
}

exports.move = function(card, fromStack, toStack, game) {
  var newGame = {};
  var cardTo = game.stacks[fromStack].visible[0];
  newGame.options = game.options;
  newGame.deck = game.deck;
  newGame.draw = game.draw;
  newGame.stacks = game.stacks;
  newGame.promoted = game.promoted;
  return newGame;
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
