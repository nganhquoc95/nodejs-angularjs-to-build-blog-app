var login = require('./Controllers/LoginController');

// Admin controller
var adminUsers = require('./Controllers/Admin/UserController');
var adminCategories = require('./Controllers/Admin/CategoryController');
var adminArticles = require('./Controllers/Admin/ArticlesController');

var users = require('./Controllers/UserController');
var categories = require('./Controllers/CategoryController');
var articles = require('./Controllers/ArticlesController');

// Routes
module.exports = function(app){
    // Main Routes
	app.use('/admin/categories', adminCategories);
	app.use('/admin/articles', adminArticles);
	app.use('/admin/user', adminUsers);

	app.use('/categories', categories);
	app.use('/articles', articles);
	app.use('/user', users);

	app.use('/login', login);
    app.use('/', function(req, res){
    	res.redirect('/articles');
    });
};
