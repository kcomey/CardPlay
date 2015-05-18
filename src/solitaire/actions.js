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
};

exports.flip = function(game) {
  if (game.deck.length !== 0) {
    return null;
  }
  var newGame = solitaire.cloneGame(game);
  newGame.deck = game.stacks.draw.slice(0).reverse();
  newGame.stacks.draw = [];

  return newGame;
};

exports.move = function(card, fromStack, toStack, game) {
  var newGame = solitaire.cloneGame(game);

  return newGame;
};

exports.promote = function(card, fromStack, game) {
  if (fromStack === 'clubs' || fromStack === 'diamonds' ||
    fromStack === 'spades' || fromStack === 'hearts') {
    return null;
  }

  var newGame = solitaire.cloneGame(game);
  var suit = solitaire.getSuit(card);

  if (fromStack === 'draw') {
    newGame.stacks[suit] = [card].concat(game.stacks[suit]);
    newGame.stacks.draw = newGame.stacks.draw.slice(1);
  } else {
    if (game.stacks[fromStack].visible.length === 0) { return null; }
    if (game.stacks[fromStack].visible[0] !== card) { return null; }

    newGame.stacks[suit] = [card].concat(game.stacks[suit]);
    newGame.stacks[fromStack].visible = game.stacks[fromStack].visible.slice(1);
  }

  return newGame;
};

exports.unpromote = function(card, toStack, game) {
  return game;
};

exports.reveal = function(stack, game) {
  return game;
};
