'use strict';

exports.create = function() {
  return {
    "id": "ac4f58e6c8e986b6d2f0a2f2041fc58a",
    "game": "solitaire",
    "options": { "draw": 3 },
    "deck": [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52],
    "draw": [],
    "stacks": [
      { "visible": [1], "hidden": [] },
      { "visible": [8], "hidden": [2] },
      { "visible": [14], "hidden": [3, 9] },
      { "visible": [19], "hidden": [4, 10, 15] },
      { "visible": [23], "hidden": [5, 11, 16, 20] },
      { "visible": [26], "hidden": [6, 12, 17, 21, 24] },
      { "visible": [28], "hidden": [7, 13, 18, 22, 25, 27] },
    ],
    "promoted": [
      [],
      [],
      [],
      [],
    ],
  };
}

exports.validate = function() {
  return true;
}
