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

exports.getSuit = function(card) {
  if ( 1 <= card && card <= 13) { return "clubs"; }
  else if (14 <= card && card <= 26) { return "diamonds"; }
  else if (27 <= card && card <= 39) { return "spades"; }
  else if (40 <= card && card <= 52) { return "hearts"; }
  return null;
}

exports.validate = function(game) {
  return true;
}
