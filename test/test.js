'use strict';

var expect = require('chai').expect;

describe('Solitaire', function() {
  var game = require('../src/solitaire/game');
  var actions = require('../src/solitaire/actions');

  it('should create a valid game', function() {
    expect(game.validate(game.create())).to.be.true;
  });

  it('should create games with 24 cards in the deck', function() {
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
    var g = game.create({
      draw: 1,
    });
    var g2 = actions.draw(g);
    expect(g2.deck.length).to.equal(23);
    expect(g2.stacks.draw.length).to.equal(1);
  });

  it('can promote the Ace of Clubs (1) on a fresh game', function() {
    var g = game.create({
      deck: 'unshuffled',
    });
    var g2 = actions.promote(1, 0, g);
    expect(g2.stacks[0].visible.length).to.equal(0);
    expect(g2.stacks.clubs.length).to.equal(1);
  });

  it('can\'t unpromote the Ace of Clubs on a special game', function() {
    var g = game.create({
      deck: 'special',
    });
    var g2 = actions.promote(1, 1, g);
    var g3 = actions.reveal(1, g2);
    var g4 = actions.unpromote(1, 1, g3);
    expect(g4).to.not.be.null;
  });

  it('move card #31 from draw to stack 3', function() {
    var g = game.create({
      deck: 'unshuffled',
    });
    var g2 = actions.draw(g);
    var g3 = actions.move(31, 'draw', 3, g2);
    expect(g3).to.not.be.null;
    expect(g3.stacks.draw.length).to.equal(2);
    expect(g3.stacks[3].visible.length).to.equal(2);
  });

  it('move card #30 from draw to stack 2', function() {
    var g = game.create({
      deck: 'chain',
    });
    var g2 = actions.draw(g);
    var g3 = actions.move(30, 'draw', 2, g2);
    expect(g3).to.be.null;
  });

  it('should return a randomized deck of length 52', function() {
    var d = game.shuffleDeck();
    expect(d).to.not.be.null;
    expect(d.length).to.equal(52);
  });

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

  it('generates a "chain" diagonal with 5 6 5 4 3 2 A', function() {
    var g = game.create({
      deck: 'chain',
    });
    expect(g.stacks[0].visible[0]).to.equal(44);
    expect(g.stacks[1].visible[0]).to.equal(6);
    expect(g.stacks[2].visible[0]).to.equal(18);
    expect(g.stacks[3].visible[0]).to.equal(4);
    expect(g.stacks[4].visible[0]).to.equal(16);
    expect(g.stacks[5].visible[0]).to.equal(2);
    expect(g.stacks[6].visible[0]).to.equal(14);
  });

  it('moves a chain of cards up from the right', function() {
    var g = game.create({
      deck: 'chain',
    });
    var g2 = actions.move(14, 6, 5, g);
    expect(g2).to.not.be.null;
    var g3 = actions.move(2, 5, 4, g2);
    expect(g3).to.not.be.null;
    var g4 = actions.move(16, 4, 3, g3);
    expect(g4).to.not.be.null;
    var g5 = actions.move(4, 3, 2, g4);
    expect(g5).to.not.be.null;
    var g6 = actions.move(18, 2, 1, g5);
    expect(g6).to.not.be.null;
    var g7 = actions.move(4, 1, 0, g6);
    expect(g7).to.not.be.null;
  });

  it('generates valid games with valid stacks', function() {
    var g = game.create({
      deck: 'unshuffled',
    });

    for (var i = 0; i < 7; i++) {
      expect(g.stacks[i].visible.length).to.equal(1);
      expect(g.stacks[i].hidden.length).to.equal(i);
    }
    expect(g.deck.length).to.equal(24);
  });

  it('should move card 14(2) onto card 28(6)', function() {
    var g = game.create({
      deck: 'unshuffled',
    });
    var g2 = actions.move(14, 2, 6, g);
    expect(g2).to.not.be.null;
    expect(g2.stacks[2].visible.length).to.equal(1);
    expect(g2.stacks[6].visible.length).to.equal(2);
  });

  it('if options.deck is easy, should return game with one card left',
    function() {
    var g = game.create({
      deck: 'easy',
    });
    expect(g.stacks[0].visible[0]).to.equal(52);
    expect(g.stacks.hearts.length).to.equal(12);
  });

  it('if we promote last card, the game is done', function() {
    var g = game.create({
      deck: 'easy',
    });
    var g2 = actions.promote(52, 0, g);
    expect(g.done === undefined);
    expect(g2.done === true);
  });

});
