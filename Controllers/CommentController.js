var express = require('express'),
    router = express.Router(),
    slug = require('slug'),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var comments = require('../Models/Comment');
var users = require('../Models/User');
var articles = require('../Models/Article');

router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

router.use(function(req, res, next){
    var page = req.baseUrl.split('/');
    req.page = page[1];
    next();
});

router.route('/:id')
    .get(function(req, res){
    	comments.find({article_id: req.params.id}, function(err, comments){
    		if(err){
    			res.json({
    				"status": "error",
    				"message": err
    			});
    		} else{
    			var arrUserId = comments.map(function(comment){ return comment.user_id });

    			users.find({_id: { $in: arrUserId }}, function(err, users){
					res.json({
	                    "status": "success",
	                    "message": "Đã lấy comments của bài viết",
	                    "comments": comments,
	                    "users": users
	                });
				});
    		}
    	});
    })
    .post(function(req, res) {
        comments.create(req.body, function (err, comment) {
            if (err) {
                res.send({
                	"status": "error",
                	"message": err
                });
            } else {
                res.json({
                    "status": "success",
                    "message": "Bạn đã đăng bình luận bài viết",
                    "comment": comment
                });
            }
        });
    })
    .delete(function (req, res){
        comments.findById(req.params.id, function (err, comment) {
            if (err) {
                res.json({
                	"status": "error",
                	"message": err
                });
            } else {
                comment.remove(function (err) {
                    if (err) {
                        res.json({
                        	"status": "error",
                			"message": err
                        });
                    } else {
                        res.json({
                            "status": "success",
                            "message": "Comment đã được xóa"
                        });
                    }
                });
            }
        });
    });

module.exports = router;