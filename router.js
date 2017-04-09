"use strick";
var categories = require('./Controllers/CategoryController');
var articles = require('./Controllers/ArticlesController');

// Routes
module.exports = function(app){
    // Main Routes
	app.use('/categories', categories);
	app.use('/articles', articles);
    app.use('/', function(req, res){
    	res.redirect('/articles');
    });
};
