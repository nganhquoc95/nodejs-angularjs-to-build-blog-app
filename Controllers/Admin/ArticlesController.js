var fs = require('fs'),
    express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    multer = require('multer');

var article = require('../../Models/Article');
var category = require('../../Models/Category');
var users = require('../../Models/User');

router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        var str_split = file.originalname.split('.'),
            originalname = "";
        for(var i = 0; i < str_split.length - 1; i++){
            originalname += str_split[i];
            if(i < str_split.length - 2){
                originalname += ".";
            }
        }
        originalname += "-" + Date.now() + ".";
        cb(null, originalname + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

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
                    req.user_role = user.role;
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

var upload = multer({
    storage: storage
}).single('uploadFile');

router.route('/uploads').post(function(req, res){
    upload(req, res, function (err) {
        if(err){
            res.end(err);
        }

        res.end(req.file.filename);
    });
});

router.route('/')
    .get(function(req, res, next){
        article.find({ user_id: req.user_id }, null, {sort: {created_on: -1}}, function(err, articles){
            if(err){
                res.send({
                    "status": "error",
                    "message": err
                });
            } else{
                category.find({},function(err, categories){
                    if (err){
                        res.json(err);
                    }
                    res.json({
                        "title": "Danh sách bài viết",
                        "articles": articles,
                        "categories": categories
                    }); 
                });
            }
        });
    })
    .post(function(req, res) {
        var updated_on = new Date();
        var created_on = new Date();
        var image = "";
        if(req.body.image != undefined && req.body.image != null && req.body.image != ""){
            image = req.body.image;
        }
        article.create({
            title : req.body.title,
            image : image,
            describe : req.body.describe,
            content : req.body.content,
            visibility : true,//req.body.visibility,
            category_id : req.body.category_id,
            user_id : req.user_id,
            updated_on : updated_on,
            created_on : created_on
        }, function (err, category) {
            if (err) {
                res.json({
                    "status": "error",
                    "message": err
                });
            }
            else{
                res.json({
                    "status": "success",
                    "message": "Bài viết đã được thêm"
                });
            }
        });
    });

function isEmptyObject(obj){
    if(obj === null || obj === undefined)
        return true;
    return !Object.keys(obj).length;
}

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    article.find({ _id: id, user_id: req.user_id }, function (err, article) {
        if(isEmptyObject(article)){
            res.json({
                "status": "error",
                "message": "404 Page not found"
            });
        } else{
            if (err) {
                res.json({
                    "error": err,
                    "message": "404 Page not found"
                });
            } else {
                req.id = id;
                next(); 
            } 
        }
    });
});

router.route('/:id')
    .get(function(req, res){
        article.findById(req.id, function(err, article){
            if (err){
                res.json({
                    "status": "error",
                    "message": err
                });
            }
            res.json({
                "title": article.title,
                "article": article
            }); 
        });
    })
    .put(function (req, res){
        article.findById(req.id, function (err, article) {
            if (err) {
                res.json({
                    "status": "error",
                    "message": err
                });
            } else {
                article.title = req.body.title;
                if(req.body.image != undefined && req.body.image != null){
                    article.image = req.body.image;
                }
                article.describe = req.body.describe;
                article.content = req.body.content;
                article.visibility = true;//req.body.visibility;
                article.category_id = req.body.category_id;
                article.updated_on = new Date();
                article.save(function(err){
                    if(err){
                        res.json({
                            "status": "error",
                            "message": err
                        });
                    }
                    res.json({
                        "status": "success",
                        "message": "Cập nhật thành công",
                        "article": article
                    });
                });
            }
        });
    })
    .delete(function (req, res){
        article.findById(req.id, function (err, article) {
            if (err) {
                res.json({
                    "status": "error",
                    "message": err
                });
            } else {
                var img = null;
                if(article.image !== null && article.image !== undefined && article.image.length > 0 && article.image !== ""){
                    var img = __dirname + "/../uploads/" + article.image;
                }

                article.remove(function (err, article) {
                    if (err) {
                        res.json({
                            "status": "error",
                            "message": err
                        });
                    } else {
                        if(img !== null){
                            if(fs.existsSync(img))
                                fs.unlinkSync(img);
                        }
                        res.json({
                            'status': "success",
                            "message": 'Bài viết đã được xóa'
                        });
                    }
                });
            }
        });
    });

module.exports = router;