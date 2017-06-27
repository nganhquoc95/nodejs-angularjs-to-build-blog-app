var AutoIncrement = require('mongoose-sequence');
var mongoose = require('mongoose');

var Article = new mongoose.Schema({
	_id: Number,
	title: String,
	slug: String,
	describe: String,
	content: String,
	image: String,
	visibility: Boolean,
	category_id : Number,
	user_id: Number,
	created_on: { type: Date, default: Date.now },
	updated_on: { type: Date, default: Date.now }
}, { _id: false });

Article.plugin(AutoIncrement, {id: 'article_id_counter'});

module.exports = mongoose.model('Article', Article, 'articles');;