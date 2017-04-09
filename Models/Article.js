// var AutoIncrement = require('mongoose-sequence');
var mongoose = require('mongoose');

var Article = new mongoose.Schema({
	title: String,
	slug: String,
	describe: String,
	content: String,
	image: String,
	visibility: Boolean,
	category_id : Number,
	created_on: { type: Date, default: Date.now },
	updated_on: { type: Date, default: Date.now }
});
// }, { _id: false });

// Article.plugin(AutoIncrement);

module.exports = mongoose.model('Article', Article, 'articles');;