var login = require('./Controllers/LoginController');
var users = require('./Controllers/UserController');
var categories = require('./Controllers/CategoryController');
var articles = require('./Controllers/ArticlesController');

// Routes
module.exports = function(app){
    // Main Routes
	app.use('/categories', categories);
	app.use('/articles', articles);
	app.use('/user', users);
	app.use('/login', login);
    app.use('/', function(req, res){
    	res.redirect('/articles');
    });
};
