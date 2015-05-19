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
    expect(g.stacks.draw.length).to.equal(0);
    expect(g2.stacks.draw.length).to.equal(3);
  });

  it('should be able to draw 24 cards on a fresh game', function() {
    var g = game.create();
    var g2 = actions.draw(g);
    g2 = actions.draw(g2);
    g2 = actions.draw(g2);
    g2 = actions.draw(g2);
    g2 = actions.draw(g2);
    g2 = actions.draw(g2);
    g2 = actions.draw(g2);
    g2 = actions.draw(g2);
    expect(g.deck.length).to.equal(24);
    expect(g2.deck.length).to.equal(0);
    expect(g.stacks.draw.length).to.equal(0);
    expect(g2.stacks.draw.length).to.equal(24);
  });

  it('should draw 24 cards, flip the deck, and be fresh again', function() {
    var g = game.create();
    var g2 = actions.draw(g);
    g2 = actions.draw(g2);
    g2 = actions.draw(g2);
    g2 = actions.draw(g2);
    g2 = actions.draw(g2);
    g2 = actions.draw(g2);
    g2 = actions.draw(g2);
    g2 = actions.draw(g2);
    g2 = actions.flip(g2);
    expect(g).to.eql(g2);
  });

  it('should fail to flip the deck on a fresh game', function() {
    expect(actions.flip(game.create())).to.be.null;
  });

  it('should fail to draw after drawing 24 cards in a fresh game', function() {
    var g = game.create();
    var g2 = actions.draw(g);
    g2 = actions.draw(g2);
    g2 = actions.draw(g2);
    g2 = actions.draw(g2);
    g2 = actions.draw(g2);
    g2 = actions.draw(g2);
    g2 = actions.draw(g2);
    g2 = actions.draw(g2);
    expect(actions.draw(g2)).to.be.null;
  });

  it('should only draw 1 card when created with options {draw:1}', function() {
    var g = game.create({ draw: 1 });
    var g2 = actions.draw(g);
    expect(g2.deck.length).to.equal(23);
    expect(g2.stacks.draw.length).to.equal(1);
  });

  it('can promote the Ace of Clubs (1) on a fresh game', function() {
    var g = game.create({deck: 'unshuffled'});
    var g2 = actions.promote(1, 0, g);
    expect(g2.stacks[0].visible.length).to.equal(0);
    expect(g2.stacks.clubs.length).to.equal(1);
  });

  it('can\'t unpromote the Ace of Clubs on a special game', function() {
    var g = game.create({deck: 'special'});
    var g2 = actions.promote(1, 1, g);
    var g3 = actions.reveal(1, g2);
    var g4 = actions.unpromote(1, 1, g3);
    expect(g4).to.not.be.null;
  });

  it('move card #31 from draw to stack 3', function() {
    var g = game.create({deck: 'unshuffled'});
    var g2 = actions.draw(g);
    var g3 = actions.move(31, 'draw', 3, g2);
    expect(g3).to.not.be.null;
    expect(g3.stacks.draw.length).to.equal(2);
    expect(g3.stacks[3].visible.length).to.equal(2);
  });

  it('should return a randomized deck of length 52', function() {
    var d = game.shuffleDeck();
    expect(d).to.not.be.null;
    expect(d.length).to.equal(52);
  })

  it('will generate a shuffled deck if passed shuffled', function() {
    var d = game.createDeck('shuffled');
    var d2 = game.createDeck('shuffled');
    expect(d).to.not.eql(d2);
    expect(d).to.not.equal(d2);
  });

  it('pass unshuffled deck, then it should always be the same', function() {
    var d = game.createDeck('unshuffled');
    var d2 = game.createDeck('unshuffled');
    expect(d).to.eql(d2);
    expect(d).to.not.equal(d2);
  });

});
