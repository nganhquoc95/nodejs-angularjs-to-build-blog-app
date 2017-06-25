var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    sha1 = require('sha1');

var users = require('../Models/User');

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
		users.find({},function(err, users){
			if(err){
				res.json({
                    "status": "error",
                    "message": err
                });
			} else{
                res.json({
                    "status": "success",
                    "message": "Danh sách thành viên",
                    "users": users
                });
			}
		});
	});

router.route('/create')
    .post(function(req,res){

        if(req.body.password !== req.body.confirm_password){
            res.json({
                "status": "error",
                "message": "Mật khẩu không khớp, kiểm tra lại"
            });
        }

        // Check if has exists user
        users.find({"email": req.body.email}, function(err, user){
            if(err){
                res.json({
                    "status": "error",
                    "message": err
                });
            }
            else{
                if(user.length > 0){
                    res.json({
                        "status": "error",
                        "message": "Email này đã tồn tại"
                    });
                }
                else{
                    users.find({}, function(err, results){
                        if(err){
                            res.json({
                                "status": "error",
                                "message": err
                            })
                        }

                        role = "member";
                        if(results.length === 0){
                            role = "admin";
                        }

                        // res.json({
                        //     "status": "success",
                        //     "message": "Đăng ký thành công",
                        //     "user": {
                        //         'id': 1,
                        //         'name': "Nguyễn Anh Quốc",
                        //         "email": "nganhquoc95@gmail.com",
                        //         "role": "admin"
                        //     }
                        // });

                        users.create({
                            name: req.body.name,
                            email: req.body.email,
                            password: sha1(req.body.password),
                            phone: req.body.phone,
                            address: req.body.address,
                            gender: req.body.gender,
                            born: req.body.born,
                            image: req.body.image,
                            role: role
                        }, function(err, user){
                            if(err){
                                res.json({
                                    "status": "error",
                                    "message": err
                                });
                            }
                            else{
                                res.json({
                                    "status": "success",
                                    "message": "Đăng ký thành công",
                                    "user": user
                                });
                            }
                        });
                    });
                }
            }
        });
    });

function isEmptyObject(obj){
    if(obj === null || obj === undefined)
        return true;
    return !Object.keys(obj).length;
}

// middleware bắt lỗi :id
router.param('id', function(req, res, next, id) {
    //tìm id trong DB
    users.findById(id, function (err, user) {
        if(isEmptyObject(user)){
            res.json({
                "status": "error",
                "message": "404 page not found"
            });
        }
        else{
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
        }
    });
});

router.route('/:id/update')
    .put(function(req,res){
        users.findById(req.id, function(err, user){
            if(err){
                res.json({
                    "status": "error",
                    "message": err
                });
            }
            else{
                user.update(req.body, function(err, user){
                    if(err){
                        res.json({
                            "status": "error",
                            "message": err
                        });
                    }
                    else{
                        res.json({
                            "status": "success",
                            "message": "Cập nhật thông tin thành công",
                            "user": user
                        });
                    }
                });
            }
        });
    });

router.route('/:id/delete')
    .delete(function(req,res){
        users.findById(req.id, function(err, user){
            if(err){
                res.json({
                    "status": "error",
                    "message": err
                });
            }
            else{
                users.remove(function(err, user){
                    if(err){
                        res.json({
                            "status": "error",
                            "message": err
                        });
                    }
                    else{
                        res.json({
                            "status": "success",
                            "message": "Đối tượng đã được xóa"
                        });
                    }
                });
            }
        });
    });
module.exports = router;