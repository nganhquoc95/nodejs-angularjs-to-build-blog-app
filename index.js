var http = require('http'),
	path = require('path'),
	express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	expressLayouts = require('express-ejs-layouts');

var app = express();

app.set('port',process.env.PORT || 8000);
app.set('views', __dirname);

app.use(session({secret: 'blogapps-nodejs', saveUninitialized: true, resave: true}));
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var corsOptions = {
	origin: 'http://localhost:4200',
	credentials: true
}
app.use(cors(corsOptions));

require('./db');

require('./router')(app);

app.listen(app.get('port'), function(){
	console.log("Server running on port "+ app.get('port'));
});