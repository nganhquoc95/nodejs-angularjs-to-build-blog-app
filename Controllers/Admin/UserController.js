var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    sha1 = require('sha1');

var users = require('../../Models/User');

router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

// Function check object empty
function isEmptyObject(obj){
    if(obj === null || obj === undefined)
        return true;
    return !Object.keys(obj).length;
}

// middleware check logined
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

router.route('/create').post(function(req,res){
    if(req.body.password !== req.body.confirm_password){
        res.json({
            "status": "error",
            "message": "Mật khẩu không khớp, kiểm tra lại"
        });
    }

    users.find({"email": req.body.email}, function(err, user){
        if(err){
            res.json({
                "status": "error",
                "message": err
            });
        } else{
            if(user.length > 0){
                res.json({
                    "status": "error",
                    "message": "Email này đã tồn tại"
                });
            } else{
                users.find({}, function(err, results){
                    if(err){
                        res.json({
                            "status": "error",
                            "message": err 
                        });
                    }

                    role = "member";
                    if(results.length === 0){
                        role = "admin";
                    }
                    var objectId = mongoose.Types.ObjectId();

                    users.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: sha1(req.body.password),
                        phone: req.body.phone,
                        address: req.body.address,
                        gender: req.body.gender,
                        born: req.body.born,
                        image: req.body.image,
                        role: role,
                        page: objectId
                    }, function(err, user){
                        if(err){
                            res.json({
                                "status": "error",
                                "message": err
                            });
                        } else{
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

router.param('id', function(req, res, next, id) {
    users.findById(id, function (err, user) {
        if(isEmptyObject(user)){
            res.json({
                "status": "error",
                "message": "404 page not found"
            });
        }
        else{
            if (err) {
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

router.route("/:id").get(function(req, res){
    users.findById(req.id, function(err, user){
        if(err){
            res.json(err);
        } else{
            res.json({
                "status": "success",
                "user": user
            });
        }
    });
});

router.route('/:id/update').put(function(req,res){
    users.findById(req.id, function(err, user){
        if(err){
            res.json({
                "status": "error",
                "message": err
            });
        }
        else{
            if(req.body.password.trim().length===0){
                delete req.body.password;
                delete req.body.confirm_password;
            }
            else{
                delete req.body.confirm_password;
                req.body.password = sha1(req.body.password);
            }

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

router.route('/:id/delete').delete(function(req,res){
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