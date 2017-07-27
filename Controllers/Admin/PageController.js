var express = require('express'),
    router = express.Router(),
    slug = require('slug'),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var pages = require('../../Models/Page');
var users = require('../../Models/User');

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
    }
    else if(req.headers.get_page){
        next()
    }
    else{
        res.json({
            "status": "error",
            "message": "Authorization!"
        });
    }
});

// middleware bắt lỗi :id
router.param('id', function(req, res, next, id) {
    pages.find({ _id: id, user_id: req.user_id }, function (err, page) {
        if (err) {
            res.json({
                "status": "error",
                "message": err
            });
        } else{
            if(isEmptyObject(page[0])){
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
    // .get(function(req, res, next){
    // 	pages.find({user_id: req.user_id}, null, {sort: {created_on: -1}}, function(err, pages){
    // 		if(err){
    // 			res.json({
    //                 "status": "error",
    //                 "message": err
    //             });
    // 		} else{
    //             res.json({
    //                 "title": "Danh mục",
    //                 "pages": pages
    //             });
    // 		}
    // 	});
    // })
	.post(function(req, res) {
        pages.create({
            describe: req.body.describe,
            content: req.body.content,
            page_type: req.body.page_type,
            user_id: req.user_id
        }, function (err, page) {
            if (err) {
                res.json({
                    "status": "error",
                    "message": "Lỗi thêm dữ liệu từ database"
                });
            } else {
                res.json({
                    "status": "success",
                    "message": "Dữ liệu đã được lưu",
                    "page": page
                });
            }
        })
    });

router.route('/:page_type')
    .get(function(req, res){
    	pages.findOne({ page_type: req.params.page_type, user_id: req.user_id }, function(err, page){
    		if(err){
    			res.json({
                    "status": "error",
                    "message": err
                });
    		} else{
    			res.json({
                    "status": "success",
                    "page": page
                });
    		}
    	});
    });

router.route('/:id')
    .put(function (req, res){
        pages.findById(req.id, function (err, category) {
            if (err) {
                res.json({
                    "status": "error",
                    "message": err
                });
            } else {
                category.update({
                    describe : req.body.describe,
                    content : req.body.content,
                    updated_on : new Date()
                },function(){
                    res.json({
                        "status": "success",
                        "message": "Dữ liệu đã được lưu"
                    });
                });
            }
        });
    });
    // .delete(function (req, res){
    //     pages.findById(req.id, function (err, category) {
    //         if (err) {
    //             res.json(err);
    //         } else {
    //             category.remove(function (err, category) {
    //                 if (err) {
    //                     res.json(err);
    //                 } else {
    //                     res.json({
    //                         "status": "success",
    //                         "message": "Xóa danh mục thành công"
    //                     });
    //                 }
    //             });
    //         }
    //     });
    // });

module.exports = router;