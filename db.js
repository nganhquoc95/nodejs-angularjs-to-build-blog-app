var mongoose = require('mongoose'),
config = require('./config');

mongoose.Promise = global.Promise;
mongoose.connect(config.db_host, config.db_name);