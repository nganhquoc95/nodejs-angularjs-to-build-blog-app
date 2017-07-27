var AutoIncrement = require('mongoose-sequence');
var mongoose = require('mongoose');

var Page = new mongoose.Schema({
	_id: Number,
	describe: String,
	content: String,
	user_id: Number,
	page_type: String,
	created_on: { type: Date, default: Date.now },
	updated_on: { type: Date, default: Date.now }
}, { _id: false });

Page.plugin(AutoIncrement, {id: 'page_id_counter'});

module.exports = mongoose.model('Page', Page, 'pages');;