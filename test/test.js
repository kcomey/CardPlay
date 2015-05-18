'use strict';

var expect = require('chai').expect;

describe('Solitaire', function() {
  var game = require('../src/solitaire/game');
  var actions = require('../src/solitaire/actions');

  it('should create a valid game', function () {
    expect(game.validate(game.create())).to.be.true;
  });

  it('should create games with 24 cards in the deck', function () {
    expect(game.create().deck.length).to.equal(24);
  });
});
