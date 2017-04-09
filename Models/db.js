var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('localhost','blogapps');