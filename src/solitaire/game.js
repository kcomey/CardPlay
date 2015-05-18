'use strict';

exports.create = function(options) {
  options = options || {};
  var drawSize = options.draw || 3;

  return {
    "options": {
      "draw": drawSize,
      "game": "solitaire",
      "id": "ac4f58e6c8e986b6d2f0a2f2041fc58a",
     },
    "deck": [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52],
    "stacks": {
      "draw": [],
      "clubs": [],
      "diamonds": [],
      "spades": [],
      "hearts": [],
      0: { "visible": [1], "hidden": [] },
      1: { "visible": [8], "hidden": [2] },
      2: { "visible": [14], "hidden": [9, 3] },
      3: { "visible": [19], "hidden": [15, 10, 4] },
      4: { "visible": [23], "hidden": [20, 16, 11, 5] },
      5: { "visible": [26], "hidden": [24, 21, 17, 12, 6] },
      6: { "visible": [28], "hidden": [27, 25, 22, 18, 13, 7] },
    },
  };
}

exports.getRank = function(card) {

}

exports.getSuit = function(card) {
  if ( 1 <= card && card <= 13) { return "clubs"; }
  else if (14 <= card && card <= 26) { return "diamonds"; }
  else if (27 <= card && card <= 39) { return "spades"; }
  else if (40 <= card && card <= 52) { return "hearts"; }
  return null;
}

exports.getColor = function(card) {
  if ( 1 <= card && card <= 13) { return "black"; }
  else if (14 <= card && card <= 26) { return "red"; }
  else if (27 <= card && card <= 39) { return "black"; }
  else if (40 <= card && card <= 52) { return "red"; }
  return null;
}

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

exports.cloneStacks = function(stacks) {
  return {
    "draw": stacks.draw,
    "clubs": stacks.clubs,
    "diamonds": stacks.diamonds,
    "spades": stacks.spades,
    "hearts": stacks.hearts,
    0: stacks[0],
    1: stacks[1],
    2: stacks[2],
    3: stacks[3],
    4: stacks[4],
    5: stacks[5],
    6: stacks[6]
  };
}

exports.cloneGame = function(game) {
  return {
    options: game.options,
    deck: game.deck,
    stacks: this.cloneStacks(game.stacks)
  };
}

exports.validate = function(game) {
  return true;
}
