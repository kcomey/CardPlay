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

exports.validMove = function(game, card, from, to) {
  if (to >= 0 && to <= 6) {
    if (game.stacks[to].visible.length === 0) {
      if (game.stacks[to].hidden.length === 0 &&
        solitaire.getRank(card) === 13) { 
        return true;
      }

      return false;
    }

    var aboveCard = game.stacks[to].visible[0]
    if (solitaire.getRank(card) !== solitaire.getRank(aboveCard) - 1) {
      return false;
    }

    if (solitaire.getColor(card) === solitaire.getColor(aboveCard)) {
      return false;
    }

    return true;


  } else { return false; }
}

exports.unpromote = function(card, toStack, game) {
  return game;
};

exports.reveal = function(stack, game) {
  return game;
};
