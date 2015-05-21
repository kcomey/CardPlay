var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/cardplay';
var db = mongoose.createConnection(url);

module.exports.Solitaire = db.model('solitaire', {
  options: {
    draw: Number,
    game: String,
    id: String,
  },
  deck: Array,
  stacks: {
    draw: Array,
    clubs: Array,
    diamonds: Array,
    spades: Array,
    hearts: Array,
    0: {
      visible: Array,
      hidden: Array,
    },
    1: {
      visible: Array,
      hidden: Array,
    },
    2: {
      visible: Array,
      hidden: Array,
    },
    3: {
      visible: Array,
      hidden: Array,
    },
    4: {
      visible: Array,
      hidden: Array,
    },
    5: {
      visible: Array,
      hidden: Array,
    },
    6: {
      visible: Array,
      hidden: Array,
    },
  },
});

module.exports.User = db.model('users', {
  username: String,
  password: String,
  session: String,
});
