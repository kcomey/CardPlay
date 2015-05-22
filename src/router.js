var authenticateUser = require('./authenticate.js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var authenticateUser = require('./authenticate.js');
require('./config_passport')(passport);
var game = require('./solitaire/game.js');
var actions = require('./solitaire/actions.js');
var session = require('express-session');
var mongo = require('./mongoose.js');

module.exports = function router(app) {

  app.use(session({
    resave: true,
    secret: 'codefellows',
    saveUninitialized: true,
  }));

  app.use(passport.initialize());
  // This is middleware
  app.use(bodyParser.urlencoded({
    extended: false,
  }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(authenticateUser.isAuthenticated);


  app.get('/login', function(req, res) {
    // Authenticate the user here
    console.log('This will be where the user can login');
    // Add response


    var form = '<form action="/login" method="post">';
    form += '<br>Username: <input type="text" name="username" ';
    form += 'value="Username">';
    form += '<br>Password: <input type="password" name="password">';
    form += '<br><input type="submit" name="login" value="Log In">';
    form += '</form>\n';
    res.status(200).send(form);


  });

  app.post('/login',
    passport.authenticate('local', {
      failureRedirect: '/login',
    }),
    function(req, res, next) {
      // User has successfully logged in here, send wherever you want them to go
      authenticateUser.setSession(req, res, function(err, sessionID) {
        if (err) {
          res.status(500).send('Could not establish session');
        } else {
          res.status(200).cookie('session', sessionID)
          .send('User is logged in');
          req.session.token = sessionID;
        }
      });
    });

  app.get('/solitaire/newgame', function(req, res) {
    var newGame;
    if (req.query.key === 'fix') {
      var fix = {
        deck: 'fix',
      };
      newGame = game.create(fix);
    } else if (req.query.key === 'un') {
      var unshuffled = {
        deck: 'unshuffled',
      };
      newGame = game.create(unshuffled);
    } else if (req.query.key === 'special') {
      var special = {
        deck: 'special',
      };
      newGame = game.create(special);
    } else if (req.query.key === 'chain') {
      var chain = {
        deck: 'chain',
      };
      newGame = game.create(chain);
    } else if (req.query.key === 'easy') {
      var easy = {
        deck: 'easy',
      };
      newGame = game.create(easy);
    } else {
      newGame = game.create();
    }
    authenticateUser.saveState(newGame, function(err, game) {
      if (err) {
        res.status(500).send('Could not create a new game');
      } else {
        res.redirect('/solitaire/game/' + game.options.id);
      }
    });
  });

  function cardToUnicode(card, hidden) {
  if (hidden) { return '&#x1f0a0;'; }
  switch (card) {
  case 1: { return '&#x1f0d1;';}
  case 2: { return '&#x1f0d2;'; }
  case 3: { return '&#x1f0d3;'; }
  case 4: { return '&#x1f0d4;'; }
  case 5: { return '&#x1f0d5;'; }
  case 6: { return '&#x1f0d6;'; }
  case 7: { return '&#x1f0d7;'; }
  case 8: { return '&#x1f0d8;'; }
  case 9: { return '&#x1f0d9;'; }
  case 10: { return '&#x1f0da;'; }
  case 11: { return '&#x1f0db;'; }
  case 12: { return '&#x1f0dd;'; }
  case 13: { return '&#x1f0de;'; }
  case 14: { return '<span class="red">&#x1f0c1;</span>'; }
  case 15: { return '<span class="red">&#x1f0c2;</span>'; }
  case 16: { return '<span class="red">&#x1f0c3;</span>'; }
  case 17: { return '<span class="red">&#x1f0c4;</span>'; }
  case 18: { return '<span class="red">&#x1f0c5;</span>'; }
  case 19: { return '<span class="red">&#x1f0c6;</span>'; }
  case 20: { return '<span class="red">&#x1f0c7;</span>'; }
  case 21: { return '<span class="red">&#x1f0c8;</span>'; }
  case 22: { return '<span class="red">&#x1f0c9;</span>'; }
  case 23: { return '<span class="red">&#x1f0ca;</span>'; }
  case 24: { return '<span class="red">&#x1f0cb;</span>'; }
  case 25: { return '<span class="red">&#x1f0cd;</span>'; }
  case 26: { return '<span class="red">&#x1f0ce;</span>'; }
  case 27: { return '&#x1f0a1;'; }
  case 28: { return '&#x1f0a2;'; }
  case 29: { return '&#x1f0a3;'; }
  case 30: { return '&#x1f0a4;'; }
  case 31: { return '&#x1f0a5;'; }
  case 32: { return '&#x1f0a6;'; }
  case 33: { return '&#x1f0a7;'; }
  case 34: { return '&#x1f0a8;'; }
  case 35: { return '&#x1f0a9;'; }
  case 36: { return '&#x1f0aa;'; }
  case 37: { return '&#x1f0ab;'; }
  case 38: { return '&#x1f0ad;'; }
  case 39: { return '&#x1f0ae;'; }
  case 40: { return '<span class="red">&#x1f0b1;</span>'; }
  case 41: { return '<span class="red">&#x1f0b2;</span>'; }
  case 42: { return '<span class="red">&#x1f0b3;</span>'; }
  case 43: { return '<span class="red">&#x1f0b4;</span>'; }
  case 44: { return '<span class="red">&#x1f0b5;</span>'; }
  case 45: { return '<span class="red">&#x1f0b6;</span>'; }
  case 46: { return '<span class="red">&#x1f0b7;</span>'; }
  case 47: { return '<span class="red">&#x1f0b8;</span>'; }
  case 48: { return '<span class="red">&#x1f0b9;</span>'; }
  case 49: { return '<span class="red">&#x1f0ba;</span>'; }
  case 50: { return '<span class="red">&#x1f0bb;</span>'; }
  case 51: { return '<span class="red">&#x1f0bd;</span>'; }
  case 52: { return '<span class="red">&#x1f0be;</span>'; }
  }
}

  app.get('/solitaire/game/:gameID', function(req, res) {
    authenticateUser.getState(req.params.gameID, function(err, game) {
      if (err) {
        res.status(404).send('Could not find game');
      } else {
        var htmlHeader = '<!DOCTYPE html><html>';
        htmlHeader += '<head><style type="text/css">';
        htmlHeader += 'td { font-size: 6em; }';
        htmlHeader += 'li { list-style-type: none; }';
        htmlHeader += '.red { color: #ff0000; }';
        htmlHeader += '</style></head><body>';

        var form = '<form action="/solitaire/game/' + req.params.gameID +
        '" method="post">';
        form += '<br><input type="text" name="cardID" value="">';
        form += '<p>move from: <select name="movefrom">';
        form += '<option value="draw">Draw Pile</option><option value="0">';
        form += '0</option>';
        form += '<option value="1">1</option><option value="2">2</option>';
        form += '<option value="3">3</option><option value="4">4</option>';
        form += '<option value="5">5</option><option value="6">6</option>';
        form += '</select>';
        form += '&nbsp;move to: <select name="moveto">';
        form += '<option value="0">0</option>';
        form += '<option value="1">1</option><option value="2">2</option>';
        form += '<option value="3">3</option><option value="4">4</option>';
        form += '<option value="5">5</option><option value="6">6</option>';
        form += '</select>';
        form += '<p>Select Action: <select name="action">';
        form += '<option value="draw">Draw</option><option value="flip">Flip';
        form += '</option>';
        form += '<option value="move">Move</option><option value="reveal">';
        form += 'Reveal</option>';
        form += '<option value="promote">Promote</option><option value=';
        form += '"unpromote">Unpromote</option></select>';
        form += '<p><input type="submit" name="login" value="Submit Action">';
        form += '</form>\n';

        var formatGame = '';

        // Deck, Drawpile & Promoted cards
        formatGame += '<table border="1"><tr>';
        formatGame += '<th>Deck</th>';
        formatGame += '<th>Draw</th>';
        formatGame += '<th></th>'; // Empty space
        formatGame += '<th>Clubs</th>';
        formatGame += '<th>Diamonds</th>';
        formatGame += '<th>Spades</th>';
        formatGame += '<th>Hearts</th>';
        formatGame += '</tr><tr>'; // Separate rows

        // Deck
        formatGame += '<td>';
        if (game.deck.length > 0) {
          formatGame += cardToUnicode(1, true);
        }
        formatGame += '</td>';

        // Draw
        formatGame += '<td>';
        if (game.stacks.draw.length > 0) {
          formatGame += cardToUnicode(game.stacks.draw[0]);
        }
        formatGame += '</td>';

        // Empty space
        formatGame += '<td></td>';

        // Promoted Clubs
        formatGame += '<td>';
        if (game.stacks.clubs.length > 0) {
          formatGame += cardToUnicode(game.stacks.clubs[0]);
        }
        formatGame += '</td>';
        // Promoted Diamonds
        formatGame += '<td>';
        if (game.stacks.diamonds.length > 0) {
          formatGame += cardToUnicode(game.stacks.diamonds[0]);
        }
        formatGame += '</td>';
        // Promoted Spades
        formatGame += '<td>';
        if (game.stacks.spades.length > 0) {
          formatGame += cardToUnicode(game.stacks.spades[0]);
        }
        formatGame += '</td>';
        // Promoted Hearts
        formatGame += '<td>';
        if (game.stacks.hearts.length > 0) {
          formatGame += cardToUnicode(game.stacks.hearts[0]);
        }
        formatGame += '</td>';

        // End of upper area: Deck, Draw & Promoted
        formatGame += '</tr></table>';



        // Stacks
        formatGame += '<table border="1"><tr>';
        for (var stack = 0; stack < 7; stack++) {
          formatGame += '<th>Stack #' + stack + '</th>';
        }
        formatGame += '</tr><tr>'; // Separate rows

        var i, j;

        // Visible cards
        for (i = 0; i < 7; i++) {
          formatGame += '<td valign="top"><ul>';
          for (j = 0; j < game.stacks['' + i].visible.length; j++) {
            formatGame += '<li>' +
            cardToUnicode(game.stacks['' + i].visible[j]) + '</li>';
          }
          formatGame += '</ul></td>';
        }
        formatGame += '</tr><tr>'; // Separate rows

        // Hidden cards
        for (i = 0; i < 7; i ++) {
          formatGame += '<td valign="top"><ul>';
          for (j = 0; j < game.stacks['' + i].hidden.length; j++) {
            formatGame += '<li>' +
            cardToUnicode(game.stacks['' + i].hidden[j], true) + '</li>';
          }
          formatGame += '</ul></td>';
        }
        formatGame += '</tr></table>';


        // Card # Table
        formatGame += '<table>';
        for (var cardNo = 1; cardNo <= 52; cardNo++) {
          formatGame += '<tr><th>Card #' + cardNo + '</th>';
          formatGame += '<td>' + cardToUnicode(cardNo) + '</td></tr>';
        }
        formatGame += '</table>';

        var htmlFooter = '</body></html>';

        res.status(200).send(htmlHeader + form + formatGame +
          JSON.stringify(game) + htmlFooter);
      }
    });
  });


  app.post('/solitaire/game/:gameID', function(req, res) {
    var newGame;
    authenticateUser.getState(req.params.gameID, function(err, returnGame) {
      if (err) {
        res.status(404).send('Game does not exist');
        return;
      }
      switch (req.body.action) {
        case 'draw': {
          newGame = actions.draw(returnGame);
          if (newGame) {
            authenticateUser.saveState(newGame, function(err, result) {
              if (err) {
                res.status(500).send('Could not save to database');
              } else {
                res.redirect('/solitaire/game/' + req.params.gameID);
              }
            });
          } else { // Invalid action, can't draw on an empty deck
            res.status(400)
            .send('<img src="http://httpcats.herokuapp.com/400">');
          }
          break;
        }
        case 'promote': {
          newGame = actions.promote(req.body.cardID, req.body.movefrom,
            returnGame);
          if (newGame) {
            authenticateUser.saveState(newGame, function(err, result) {
              if (err) {
                res.status(500).send('Could not save to database');
              } else if (newGame.options.won === true) {
                res.status(200)
                .send('<img src="https://www.theproducersperspective.com/' +
                         'wp-content/uploads/2012/06/YouWin2.png">\n');
              } else {
                res.redirect('/solitaire/game/' + req.params.gameID);
              }
            });
          } else {
            res.status(400)
            .send('<img src="http://httpcats.herokuapp.com/400">\n');
          }
          break;
        }
        case 'flip': {
          newGame = actions.flip(returnGame);
          if (newGame) {
            authenticateUser.saveState(newGame, function(err, result) {
              if (err) {
                res.status(500).send('Could not save to database');
              } else {
                res.redirect('/solitaire/game/' + req.params.gameID);
              }
            });
          } else {
            res.status(400)
            .send('<img src="http://httpcats.herokuapp.com/400">\n');
          }
          break;
        }
        case 'reveal': {
          newGame = actions.reveal(req.body.movefrom, returnGame);
          if (newGame) {
            authenticateUser.saveState(newGame, function(err, result) {
              if (err) {
                res.status(500).send('Could not save to database');
              } else {
                res.redirect('/solitaire/game/' + req.params.gameID);
              }
            });
          } else {
            res.status(400)
            .send('<img src="http://httpcats.herokuapp.com/400">\n');
          }
          break;
        }
        case 'unpromote': {
          newGame = actions.unpromote(req.body.cardID, req.body.movefrom,
            returnGame);
          if (newGame) {
            authenticateUser.saveState(newGame, function(err, result) {
              if (err) {
                res.status(500)
                .send('Could not savegame/210077ec679402c5game/' +
                  '210077ec679402c5 to database');
              } else {
                res.redirect('/solitaire/game/' + req.params.gameID);
              }
            });
          } else {
            res.status(400)
            .send('<img src="http://httpcats.herokuapp.com/400">\n');
          }
          break;
        }

        case 'move': {
          newGame = actions.move(req.body.cardID, req.body.movefrom,
            req.body.moveto, returnGame);
          if (newGame) {
            authenticateUser.saveState(newGame, function(err, result) {
              if (err) {
                res.status(500).send('Could not save to database');
              } else {
                res.redirect('/solitaire/game/' + req.params.gameID);
              }
            });
          } else {
            res.status(400)
            .send('<img src="http://httpcats.herokuapp.com/400">\n');
          }
          break;
        }
      }

    });
  });
  // Module close bracket
};
