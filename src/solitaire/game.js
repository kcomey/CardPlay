'use strict';

exports.shuffleDeck = function() {
  var deck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
  14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
  27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
  40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];

  var m = 52, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m);
    m -= 1;

    // And swap it with the current element.
    t = deck[m];
    deck[m] = deck[i];
    deck[i] = t;
  }
  return deck;
};

exports.createDeck = function(kind) {
  if (kind === 'shuffled') {
    return this.shuffleDeck();
  } else if (kind === 'special') {
    return [8, 15, 3, 4, 5, 6, 7, 1, 9, 10, 11, 12, 13,
  14, 2, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
  27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
  40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];
  } else if (kind === 'chain') {
    return [44, 26, 3, 19, 5, 8, 7, 6, 9, 10, 11, 12, 13,
  18, 15, 23, 17, 28, 4, 30, 21, 22, 16, 24, 25, 2,
  27, 14, 29, 20, 31, 32, 33, 34, 35, 36, 37, 38, 39,
  40, 41, 42, 43, 1, 45, 46, 47, 48, 49, 50, 51, 52];
  } else {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
  14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
  27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
  40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];
  }
};

exports.create = function(options) {
  options = options || {};
  var drawSize = options.draw || 3;

  options.deck = options.deck || 'shuffled';
  var deck = this.createDeck(options.deck);

  var game = {
    "options": {
      "draw": drawSize,
      "game": "solitaire",
      "id": "ac4f58e6c8e986b6d2f0a2f2041fc58a",
     },
    "deck": deck,
    "stacks": {
      "draw": [],
      "clubs": [],
      "diamonds": [],
      "spades": [],
      "hearts": [],
      0: { "visible": [], "hidden": [] },
      1: { "visible": [], "hidden": [] },
      2: { "visible": [], "hidden": [] },
      3: { "visible": [], "hidden": [] },
      4: { "visible": [], "hidden": [] },
      5: { "visible": [], "hidden": [] },
      6: { "visible": [], "hidden": [] },
    },
  };

  if (options.deck === 'easy') {
    game.deck = [];
    game.stacks.clubs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].reverse();
    game.stacks.diamonds = [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26].reverse();
    game.stacks.spades = [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39].reverse();
    game.stacks.hearts = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51].reverse();
    game.stacks[0].visible = [52];
    return game;
  }

  for (var i = 0; i <= 6; i++) {
    for (var j = i; j <= 6; j++) {
      if (j === i) { // deal a visible card to stack i
        game.stacks[j].visible.unshift(deck.shift());
      } else { // deal a hidden card to stack i
        game.stacks[j].hidden.unshift(deck.shift());
      }
    }
  }

  return game;
};

exports.getRank = function(card) {
  var rank = card % 13;

  if (rank === 0) {
    return 13;
  } else {
    return rank;
  }
};

exports.getSuit = function(card) {
  if ( 1 <= card && card <= 13) { return "clubs"; }
  else if (14 <= card && card <= 26) { return "diamonds"; }
  else if (27 <= card && card <= 39) { return "spades"; }
  else if (40 <= card && card <= 52) { return "hearts"; }
  return null;
};

exports.getColor = function(card) {
  if ( 1 <= card && card <= 13) { return "black"; }
  else if (14 <= card && card <= 26) { return "red"; }
  else if (27 <= card && card <= 39) { return "black"; }
  else if (40 <= card && card <= 52) { return "red"; }
  return null;
};

exports.validMove = function(game, card, from, to) {
  if (to >= 0 && to <= 6) {
    if (game.stacks[to].visible.length === 0) {
      if (game.stacks[to].hidden.length === 0 &&
        this.getRank(card) === 13) {
        return true;
      }

      return false;
    }

    var aboveCard = game.stacks[to].visible[0];
    if (this.getRank(card) !== this.getRank(aboveCard) - 1) {
      return false;
    }

    if (this.getColor(card) === this.getColor(aboveCard)) {
      return false;
    }

    return true;


  } else { return false; }
};

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
};

exports.cloneGame = function(game) {
  return {
    options: game.options,
    deck: game.deck,
    stacks: this.cloneStacks(game.stacks)
  };
};

exports.validate = function(game) {
  return true;
};
