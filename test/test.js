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

  it('should draw 3 cards from the deck', function() {
    var g = game.create();
    var g2 = actions.draw(g);
    expect(g.deck.length).to.equal(24);
    expect(g2.deck.length).to.equal(21);
    expect(g.draw.length).to.equal(0);
    expect(g2.draw.length).to.equal(3);
  })
});
