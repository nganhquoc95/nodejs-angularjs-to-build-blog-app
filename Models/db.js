var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('localhost','blogapps');
mongoose.connect('mongodb://jonathan:jonathan@ds131583.mlab.com:31583/blogapps');