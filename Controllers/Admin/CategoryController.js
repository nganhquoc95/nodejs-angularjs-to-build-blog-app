var express = require('express'),
    router = express.Router(),
    slug = require('slug'),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var categories = require('../../Models/Category');
var users = require('../../Models/User');

router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
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

router.use(function(req, res, next){
    if(req.headers.authorization){
        var param_user = req.headers.authorization.split(':');
        users.find({_id: param_user[0], password: param_user[1]}, function(err, user){
            if(err){
                res.json({
                    "status": "error",
                    "message": err
                });
            } else{
                if(isEmptyObject(user)){
                    res.json({
                        "status": "error",
                        "message": "Authorization!"
                    });
                } else{
                    req.user_id = param_user[0];
                    next()
                }
            }
        });
    } else{
        res.json({
            "status": "error",
            "message": "Authorization!"
        });
    }
});

// middleware bắt lỗi :id
router.param('id', function(req, res, next, id) {
    categories.find({ _id: id, user_id: req.user_id }, function (err, category) {
        if (err) {
            res.json({
                "status": "error",
                "message": err
            });
        } else{
            if(isEmptyObject(category[0])){
                res.json({
                    "status": "error",
                    "message": "404 page not found"
                });
            } else {
                req.id = id;
                next(); 
            }
        } 
    });
});


router.route('/')
	.get(function(req, res, next){
		categories.find({user_id: req.user_id}, null, {sort: {created_on: -1}}, function(err, categories){
			if(err){
				res.json({
                    "status": "error",
                    "message": err
                });
			} else{
                res.json({
                    "title": "Danh mục",
                    "categories": categories
                });
			}
		});
	})
	.post(function(req, res) {
        var title = req.body.title;
        var describe = req.body.describe;
        var visibility = true;//req.body.visibility;
        var user_id = req.user_id;

        categories.create({
            title: title,
            // slug : slug,
            describe: describe,
            visibility: visibility,
            user_id: req.user_id
        }, function (err, category) {
            if (err) {
                res.json({
                    "status": "error",
                    "message": "Lỗi thêm dữ liệu từ database"
                });
            } else {
                res.json({
                    "status": "success",
                    "message": "Thêm danh mục thành công",
                    "category": category
                });
            }
        })
    });

router.route('/:id')
    .get(function(req, res){
    	categories.findById(req.id, function(err, category){
    		if(err){
    			res.json({
                    "status": "error",
                    "message": err
                });
    		} else{
    			res.json({
                    "status": "success",
                    "title": category.title,
                    "category": category
                });
    		}
    	});
    })
    .put(function (req, res){
        var title = req.body.title;
        var describe = req.body.describe;
        var visibility = req.body.visibility;
        var updated_on = new Date();

        //find category by ID
        categories.findById(req.id, function (err, category) {
            if (err) {
                res.json({
                    "status": "error",
                    "message": err
                });
            } else {
                category.update({
                    title : title,
                    describe : describe,
                    visibility : visibility,
                    updated_on : updated_on
                },function(){
                    res.json({
                        "status": "success",
                        "message": "Sửa danh mục thành công"
                    });
                });
            }
        });
    })
    .delete(function (req, res){
        categories.findById(req.id, function (err, category) {
            if (err) {
                res.json(err);
            } else {
                category.remove(function (err, category) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json({
                            "status": "success",
                            "message": "Xóa danh mục thành công"
                        });
                    }
                });
            }
        });
    });

module.exports = router;