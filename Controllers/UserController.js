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

router.route("/:id")
    .get(function(req, res){
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

router.route('/:id/change-password')
    .put(function(req,res){
        users.findById(req.user_id, function(err, user){
            if(err){
                res.json({
                    "status": "error",
                    "message": err
                });
            }
            else{
                if(req.user_id != req.id){
                    res.json({
                        "status": "error",
                        "message": "Authorization!"
                    });
                }

                if(req.body.password.trim().length===0){
                    res.json({
                        "status": "error",
                        "message": "Mật khẩu chưa được nhập"
                    });
                }
                else{
                    req.body.password = sha1(req.body.password);
                    req.body.new_password = sha1(req.body.new_password);
                    req.body.confirm_password = sha1(req.body.confirm_password);
                    // req.user_id
                    if(req.body.password != user.password){
                        res.json({
                            "status": "error",
                            "message": "Mật khẩu không đúng"
                        });
                    }
                    else if(req.body.new_password != req.body.confirm_password){
                        res.json({
                            "status": "error",
                            "message": "Nhập lại mật khẩu không đúng"
                        });
                    }
                    else{
                        user.password = req.body.new_password;
                        user.save(function(err){
                            if(err){
                                res.json({
                                    "status": "error",
                                    "message": err
                                });
                            }
                            else{
                                res.json({
                                    "status": "success",
                                    "message": "Cập nhật thành công",
                                    "user": user
                                });
                            }
                        });
                    }
                }
            }
        });
    });

router.route('/:id/profiles')
    .put(function(req,res){
        users.findById(req.id, function(err, user){
            if(err){
                res.json({
                    "status": "error",
                    "message": err
                });
            }
            else{
                req.body.password = sha1(req.body.password);
                if(req.body.password!=user.password){
                    res.json({
                        "status": "error",
                        "message": "Sai mật khẩu, nhập lại"
                    });
                    return false;
                }
                else{
                    delete req.body.password;
                    delete req.body.confirm_password;
                    delete req.body.new_password;
                    user.update(req.body, function(err){
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
            }
        });
    });

router.route('/:id/url-page')
    .put(function(req, res){
        users.find({ page: req.body.page }, function(err, resutlUser){
            if(resutlUser.length > 0){
                var idUserFirst = resutlUser[0].id || null;
                if(req.user_id == idUserFirst){
                    res.json({
                        "status": "complated",
                        "message": "Url đã được thay đổi"
                    });
                }
                else{
                    res.json({
                        "status": "error",
                        "message": "Url đã được sử dụng bởi người dùng khác"
                    });
                }
            }
            else{
                users.findById(req.user_id, function(err, user){
                    if(err){
                        res.json({
                            "status": "error",
                            "message": err
                        });
                    }
                    else{
                        user.page = req.body.page;
                        user.save(function(err){
                            if(err){
                                res.json({
                                    "status": "error",
                                    "message": err
                                });
                            }
                            else{
                                res.json({
                                    "status": "success",
                                    "message": "Url đã được thay đổi",
                                    "user": user
                                })
                            }
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