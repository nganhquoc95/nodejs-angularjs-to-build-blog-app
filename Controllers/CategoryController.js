var express = require('express'),
    router = express.Router(),
    slug = require('slug'),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var categories = require('../Models/Category');
var articles = require('../Models/Article');

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
		categories.find({},function(err, categories){
			if(err){
				res.json(err);
			} else{
                res.json({
                    "title": "Danh mục",
                    "categories": categories
                });
			}
		});
	})

	.post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var title = req.body.title;
        // var slug = slug(title);
        var describe = req.body.describe;
        var visibility = req.body.visibility;
        //call the create function for our database

        categories.create({
            title : title,
            // slug : slug,
            describe : describe,
            visibility : visibility
        }, function (err, category) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
                res.json({
                    "status": "Thêm danh mục thành công"
                });
            }
        })
    });

// middleware bắt lỗi :id
router.param('id', function(req, res, next, id) {
    //tìm id trong DB
    categories.findById(id, function (err, category) {
        //nếu khong tìm thấy quăng ra lỗi 404
        if (err) {
            res.json({
                "status": "error",
                "message": "404 page not found"
            });

        //nếu tìm thấy thì tiếp tục
        } else {
            // Kiểm tra xác nhận get / put / delete sau đó lưu lại mục id trong yêu cầu
            req.id = id;
            // tới bước tiếp theo
            next(); 
        } 
    });
});

router.route('/:id')
    .get(function(req, res){
    	categories.findById(req.id, function(err, category){
    		if(err){
    			res.json(err);
    		} else{
    			res.json({
                    "title": category.title,
                    "category": category
                });
    		}
    	});
    })
    .put(function (req, res){
        var title = req.body.title;
        // var slug = slug(title);
        var describe = req.body.describe;
        var visibility = req.body.visibility;
        var updated_on = new Date();

        //find category by ID
        categories.findById(req.id, function (err, category) {
            if (err) {
                res.json(err);
            } else {
                category.update({
                    title : title,
                    // slug : slug,
                    describe : describe,
                    visibility : visibility,
                    updated_on : updated_on
                },function(){
                    res.json({
                        "status": "success",
                        "message": "Cập nhật thông tin danh mục thành công"
                    });
                });
            }
        });
    })

    .delete(function (req, res){
        //find category by ID
        categories.findById(req.id, function (err, category) {
            if (err) {
                res.json(err);
            } else {
            	articles.find({category_id:category._id},function(err, articles){
            		articles.forEach(function(item, index){
            			item.remove();
            		});
            	});

                //remove it from Mongo
                category.remove(function (err, category) {
                    if (err) {
                        res.json(err);
                    } else {
                        //Returning success messages saying it was deleted
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