var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/cardplay';
var db = mongoose.createConnection(url);

module.exports.Solitaire = db.model('solitaire', {
    deck: Array,
    promoted: Array,
    draw: Array,
    stacks: Array,
    players: Array,
    options: Array,
});

module.exports.User = db.model('users', {
    username: String,
    password: String,
    session: String,
});

