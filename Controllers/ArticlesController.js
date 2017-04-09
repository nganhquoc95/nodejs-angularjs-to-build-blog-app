var express = require('express'),
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

router.route('/')
    .get(function(req, res, next){
    	article.find({visibility: true},function(err, articles){
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
        var title = req.body.title;
        var describe = req.body.describe;
        var content = req.body.content;
        var visibility = req.body.visibility;
        var category_id = req.body.category_id;
        var updated_on = new Date();
        var created_on = new Date();

        //call the create function for our database
        article.create({
            title : title,
            describe : describe,
            content : content,
            visibility : visibility,
            category_id : category_id,
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

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    article.findById(id, function (err, article) {
        if (err) {
            res.json({
                "message": "404 Page not found",
                "err": err
            });
        } else {
            req.id = id;
            next(); 
        } 
    });
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/blogs/src/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ 
        storage:storage,
        onFileUploadStart: function (file) {
          console.log(file.originalname + ' is starting ...')
        }
    }).single('image');

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
    // upload.single('image')
    .put(function (req, res){

        // upload(req, res, function(err){
        //     console.log(req.files + " - " + req.file);
        // });

        // return res.json({"error": "Lỗi"});

        var title = req.body.title;
        var describe = req.body.describe;
        var content = req.body.content;
        var visibility = req.body.visibility;
        var category_id = req.body.category_id;
        var updated_on = new Date();

        //find article by ID
        article.findById(req.params.id, function (err, article) {
            if (err) {
                res.json(err);
            } else {
                article.title= title;
                article.describe = describe;
                article.content = content;
                article.visibility = visibility;
                article.category_id = category_id;
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
        //find article by ID
        article.findById(req.id, function (err, article) {
            if (err) {
                res.json(err);
            } else {
                //remove it from Mongo
                article.remove(function (err, article) {
                    if (err) {
                        res.json(err);
                    } else {
                        //Returning success messages saying it was deleted
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