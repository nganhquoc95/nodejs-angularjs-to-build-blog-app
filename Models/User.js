var AutoIncrement = require('mongoose-sequence');
var mongoose = require('mongoose');

var User = new mongoose.Schema({
	_id: Number,
	name: String,
	email: String,
	password: String,
	phone: String,
	address: String,
	gender: { type: String, default: 'other' },
	born: { type: Date, default: null }, 
	image: String,
	role: String,
	created_on: { type: Date, default: Date.now },
	updated_on: { type: Date, default: Date.now }
}, { _id: false });

User.plugin(AutoIncrement,{id: 'user_id_counter'});

module.exports = mongoose.model('User', User, 'users');