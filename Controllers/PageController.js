var express = require('express'),
    router = express.Router(),
    slug = require('slug'),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var pages = require('../Models/Page');
var users = require('../Models/User');

router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

function isEmptyObject(obj){
    if(obj === null || obj === undefined)
        return true;
    return !Object.keys(obj).length;
}

router.route('/:page/:page_type')
	.get(function(req, res) {
        users.findOne({ page: req.params.page }, function(err, user){
            if (err){
                res.json({
                    status: 'error',
                    message: err
                });
            }
            else{
                if(isEmptyObject(user)){
                    res.json({
                        status: 404,
                        message: "Page Not Found!"
                    });
                } else{
                    pages.findOne({ user_id: user._id, page_type: req.params.page_type }, function(err, page){
                        if(isEmptyObject(page)){
                            res.json({
                                status: 404,
                                message: "Page Not Found!"
                            })
                        } else{
                            res.json({
                                status: 200,
                                page: page
                            })
                        }
                    });
                }
            }
        });
    });

module.exports = router;