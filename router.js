var login = require('./Controllers/LoginController');

// Admin controller
var adminUsers = require('./Controllers/Admin/UserController');
var adminCategories = require('./Controllers/Admin/CategoryController');
var adminArticles = require('./Controllers/Admin/ArticlesController');

var users = require('./Controllers/UserController');
var categories = require('./Controllers/CategoryController');
var articles = require('./Controllers/ArticlesController');
var comments = require('./Controllers/CommentController');

// Routes
module.exports = function(app){
	// Prevent favicon.ico url parameter
    app.get('/favicon.ico', function(req, res) {
	    res.send(204);
	});

    // Main Routes
    app.use('/login', login);

	app.use('/admin/categories', adminCategories);
	app.use('/admin/articles', adminArticles);
	app.use('/admin/user', adminUsers);

    app.use('/user', users);
    app.use('/comment', comments);
	app.use('/:page/categories', categories);
	app.use('/:page/articles', articles);

    app.use('/', function(req, res){
    	// res.redirect('/');
    	res.json({
    		"status": "error",
    		"message": "Access Deny!"
    	});
    });
};
