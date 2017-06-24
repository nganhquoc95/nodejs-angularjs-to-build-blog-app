var fs = require('fs'),
    express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'), //used to manipulate POST
    multer = require('multer');

var article = require('../Models/Article');
var category = require('../Models/Category');

router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

var storage = multer.diskStorage({ //multers disk storage settings
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

var upload = multer({ //multer settings
    storage: storage
}).single('uploadFile');

router.route('/uploads')
    .post(function(req, res){
        upload(req, res, function (err) {
            if(err){
                res.end(err);
            }

            res.end(req.file.filename);
        });
    });

router.route('/')
    .get(function(req, res, next){
    	article.find({},function(err, articles){
    		if(err){
    			res.send(err);
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
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var updated_on = new Date();
        var created_on = new Date();
        var image = "";
        if(req.body.image != undefined && req.body.image != null && req.body.image != ""){
            image = req.body.image;
        }
        //call the create function for our database
        article.create({
            title : req.body.title,
            image : image,
            describe : req.body.describe,
            content : req.body.content,
            visibility : req.body.visibility,
            category_id : req.body.category_id,
            updated_on : updated_on,
            created_on : created_on
        }, function (err, category) {
            if (err) {
                res.json(err);
            }
            res.json({
                "message": "Bài viết đã được thêm"
            });
        });
    });

function isEmptyObject(obj){
    if(obj === null || obj === undefined)
        return true;
    return !Object.keys(obj).length;
}

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    article.findById(id, function (err, article) {
        if(isEmptyObject(article)){
            res.json({
                "status": "error",
                "message": "404 Page not found"
            });
        }
        else{
            if (err) {
                res.json({
                    "message": "404 Page not found",
                    "err": err
                });
            } else {
                req.id = id;
                next(); 
            } 
        }
    });
});

router.route('/category/:cat_id').get(function(req, res){
    var cat_id = Number(req.params.cat_id);
    if(isNaN(cat_id)){
        res.json({"error": "404 Page not found"});
        return;
    }
    article.find({category_id : cat_id}).exec(function(err, articles){
        if (err){
            res.json(err);
        }
        res.json({
            "status": "success",
            "articles": articles
        }); 
    });
});

// Limit 5
router.route('/new-articles').get(function(req, res, next){
    article.find({}).sort({created_on: -1}).limit(5).exec(function(err, articles){
        if(err){
            res.send(err);
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
});

router.route('/:id')
    .get(function(req, res){
    	article.findById(req.id, function(err, article){
    		if (err){
    			res.json(err);
    		}
    		res.json({
    			"title": article.title,
    			"article": article
    		}); 
    	});
    })

    .put(function (req, res){

        var updated_on = new Date();

        //find article by ID
        article.findById(req.params.id, function (err, article) {
            if (err) {
                res.json(err);
            } else {
                article.title = req.body.title;
                if(req.body.image != undefined && req.body.image != null){
                    article.image = req.body.image;
                }
                article.describe = req.body.describe;
                article.content = req.body.content;
                article.visibility = req.body.visibility;;
                article.category_id = req.body.category_id;
                article.updated_on = updated_on;

                article.save(function(err){
                    if(err){
                        res.json({"error": err});
                    }
                    res.json(article);
                });
            }
        });
    })
    .delete(function (req, res){
        article.findById(req.id, function (err, article) {
            if (err) {
                res.json(err);
            } else {
                var img = null;
                if(article.image !== null && article.image !== undefined && article.image.length > 0 && article.image !== ""){
                    var img = __dirname + "/../uploads/" + article.image;
                }

                article.remove(function (err, article) {
                    if (err) {
                        res.json(err);
                    } else {
                        if(img !== null){
                            if(fs.existsSync(img))
                                fs.unlinkSync(img);
                        }

                        res.json({
                            'status': "success",
                            "message": '1 article has been deleted'
                        });
                    }
                });
            }
        });
    });
module.exports = router;