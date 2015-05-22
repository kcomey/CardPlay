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
  if (typeof card !== 'number') {
    card = Number(card);
  }
  var suit = solitaire.getSuit(card);
  if (solitaire.validMove(game, card, suit, toStack)) {
    var newGame = solitaire.cloneGame(game);

    if (fromStack === 'draw') {
      if (card !== newGame.stacks.draw[0]) {
        return null;
      }
      newGame.stacks[toStack].visible = [card].concat(newGame.stacks[toStack]
        .visible);
      newGame.stacks.draw = newGame.stacks.draw.slice(1);

      return newGame;
    } else {
      var fromLength = newGame.stacks[fromStack].visible.length;
      var index = newGame.stacks[fromStack].visible.indexOf(card) + 1;
      if (fromLength === 1) {
        newGame.stacks[toStack].visible = [card].concat(newGame.stacks[toStack]
          .visible);
        newGame.stacks[fromStack].visible = newGame.stacks[fromStack].visible
          .slice(1);
      }
      if (fromLength > 1) {
        newGame.stacks[toStack].visible = newGame.stacks[fromStack].visible
          .slice(0, index).concat(newGame.stacks[toStack].visible);
        newGame.stacks[fromStack].visible = newGame.stacks[fromStack]
          .visible.slice(index);
      }
      if (newGame.stacks[fromStack].visible.length === 0 &&
        newGame.stacks[fromStack].hidden.length > 0) {
        return this.reveal(fromStack, newGame);
      } else {
        return newGame;
      }
    }
  }
  return null;
};

exports.promote = function(card, fromStack, game) {
  if (typeof card !== 'number') {
    card = Number(card);
  }
  if (fromStack === 'clubs' || fromStack === 'diamonds' ||
    fromStack === 'spades' || fromStack === 'hearts') {
    return null;
  }

  var newGame = solitaire.cloneGame(game);
  var suit = solitaire.getSuit(card);


  if (fromStack === 'draw') {
    if (newGame.stacks.draw.length === 0 ||
      card !== newGame.stacks.draw[0]) {
      return null;
    } // Can't promote if not top of draw pile
    if (game.stacks[suit].length === 0) {
      if (solitaire.getRank(card) !== 1) {
        return null;
      } // Can't promote to empty pile unless Ace
    } else if (solitaire.getRank(game.stacks[suit][0]) + 1 !== solitaire.getRank(card)) {
      return null;
    } // Can't promote card unless is next-to-be-promoted

    newGame.stacks[suit] = [card].concat(game.stacks[suit]);
    newGame.stacks.draw = newGame.stacks.draw.slice(1);
  } else {
    if (game.stacks[fromStack].visible.length === 0) {
      return null;
    } // Can't promote from a stack w/o cards
    if (game.stacks[fromStack].visible[0] !== card) {
      return null;
    } // Can't promote a card not on top
    if (game.stacks[suit].length === 0) {
      if (solitaire.getRank(card) !== 1) {
        return null;
      } // Can't promote to empty pile unless Ace
    } else if (solitaire.getRank(game.stacks[suit][0]) + 1 !== solitaire.getRank(card)) {
      return null;
    } // Can't promote card unless is next-to-be-promoted

    newGame.stacks[suit] = [card].concat(game.stacks[suit]);
    newGame.stacks[fromStack].visible = game.stacks[fromStack].visible.slice(1);
    if (newGame.stacks[fromStack].visible.length === 0 &&
        newGame.stacks[fromStack].hidden.length > 0) {
          newGame = this.reveal(fromStack, newGame);
        }
  }
  if (solitaire.cardsLeft(game) === 1) {
    newGame.options.won = true;
  }
  return newGame;
};

exports.unpromote = function(card, toStack, game) {
  if (typeof card !== 'number') {
    card = Number(card);
  }
  var suit = solitaire.getSuit(card);
  if (solitaire.validMove(game, card, suit, toStack)) {
    var newGame = solitaire.cloneGame(game);

    newGame.stacks[toStack].visible = [card].concat(newGame.stacks[toStack]
      .visible);
    newGame.stacks[suit] = newGame.stacks[suit].slice(1);

    return newGame;
  }

  return null;
};

exports.reveal = function(stack, game) {
  var newGame = solitaire.cloneGame(game);
  if (newGame.stacks[stack].visible.length === 0 &&
    newGame.stacks[stack].hidden.length > 0) {
    newGame.stacks[stack].visible = newGame.stacks[stack].hidden.slice(0, 1);
    newGame.stacks[stack].hidden = newGame.stacks[stack].hidden.slice(1);
  } else {
    return null;
  }
  return newGame;
};
