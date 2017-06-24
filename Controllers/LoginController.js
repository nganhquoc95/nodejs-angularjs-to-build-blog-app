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

router.route('/').post(function(req, res){
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
                    res.json({
                        "status": "success",
                        "message": "Đăng nhập thành công",
                        "user": user
                    });
                }
            }
        });
    });
module.exports = router;