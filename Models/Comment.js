var AutoIncrement = require('mongoose-sequence');
var mongoose = require('mongoose');

var Comment = new mongoose.Schema({
	_id: Number,
	user_id: String,
	article_id: String,
	content: String,
	created_on: { type: Date, default: Date.now },
	updated_on: { type: Date, default: Date.now }
}, { _id: false });

Comment.plugin(AutoIncrement, {id: 'comment_id_counter'});

module.exports = mongoose.model('Comment', Comment, 'comments');;