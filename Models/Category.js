var AutoIncrement = require('mongoose-sequence');
var mongoose = require('mongoose');

var Category = new mongoose.Schema({
	_id: Number,
	title: String,
	describe: String,
	slug: String,
	visibility: Boolean,
	created_on: { type: Date, default: Date.now },
	updated_on: { type: Date, default: Date.now }
}, { _id: false });

Category.plugin(AutoIncrement);

module.exports = mongoose.model('Category', Category, 'Categories');