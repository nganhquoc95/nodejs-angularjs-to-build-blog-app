// Load module
var http = require('http'),
	path = require('path'),
	express = require('express'),
	bodyParser = require('body-parser'),
	expressLayouts = require('express-ejs-layouts');

var app = express();

app.use(expressLayouts);
// app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(__dirname));
// app.use(express.bodyParser({uploadDir:'./blogs/src/uploads'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(__dirname + './uploads'));

// Set view Engine to EJS
app.set('port',8000);
app.set('views', __dirname);
// app.set('views', path.join(__dirname ,'public'));
// app.set('view engine','ejs');
// app.set('layout','views/layouts/main');

app.use(function(req, res, next) {
	res.header("Content-Type", "*/*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
    next();
});


require('./Models/db');

require('./router')(app);

http.createServer(app).listen(app.get('port'), function(){
	console.log("Server running on port "+ app.get('port'));
});