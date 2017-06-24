// Load module
var http = require('http'),
	path = require('path'),
	express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	expressLayouts = require('express-ejs-layouts');

var app = express();

app.use(session({secret: 'blogapps', saveUninitialized: true, resave: true}));

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set view Engine to EJS
app.set('port',process.env.PORT || 8000);
app.set('views', __dirname);

// Set Request Header
app.use(function(req, res, next) {
	res.header("Content-Type", "*/*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
    next();
});

require('./db');

require('./router')(app);

app.listen(app.get('port'), function(){
	console.log("Server running on port "+ app.get('port'));
});