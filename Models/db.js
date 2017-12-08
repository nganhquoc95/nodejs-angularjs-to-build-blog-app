var config = require('../config'),
  mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect(config.db_host, config.db_name);
mongoose.connect('mongodb://jonathan:jonathan@ds131583.mlab.com:31583/blogapps');
