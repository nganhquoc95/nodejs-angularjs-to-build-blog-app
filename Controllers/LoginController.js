var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    sha1 = require('sha1');

var users = require('../Models/User');

function isEmptyObject(obj){
    if(obj === null || obj === undefined)
        return true;
    return !Object.keys(obj).length;
}

router.route('/')
    .post(function(req, res){
        users.find({ 'email': req.body.email, 'password': sha1(req.body.password) },function(err, user){
            if(err){
                res.json({
                    "status": "error",
                    "message": err
                });
            } else{
                if(isEmptyObject(user)){
                    res.json({
                        "status": "error",
                        "message": "Mật khẩu hoặc email không đúng"
                    });
                }
                else{
                    // req.session.user = user;
                    res.json({
                        "status": "success",
                        "message": "Đăng nhập thành công",
                        "user": user
                    });
                }
            }
        });
    });

router.route('/is-login')
    .post(function(req, res){
        users.find({ 'email': req.body.email, 'password': req.body.password },function(err, user){
            if(err){
                res.json({
                    "status": "error",
                    "message": err
                });
            } else{
                if(isEmptyObject(user)){
                    res.json({
                        "status": "error",
                        "message": "User not logged"
                    });
                }
                else{
                    res.json({
                        "status": "success",
                        "message": "Has been logged!",
                        "user": user
                    });
                }
            }
        });
    });
module.exports = router;