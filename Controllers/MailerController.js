var config = require('../config'),
	mailer = require('express-mailer'),
    sha1 = require('sha1');

var User = require('../Models/User');

function make_password() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

function isEmptyObject(obj){
    if(obj === null || obj === undefined)
        return true;
    return !Object.keys(obj).length;
}

module.exports = function(app){
	mailer.extend(app, {
		from: 'jonathannguyengoldenowl@gmail.com',
		host: 'smtp.gmail.com', // hostname 
		secureConnection: true, // use SSL 
		port: 465, // port for secure SMTP 
		transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
		auth: {
			user: 'jonathannguyengoldenowl@gmail.com',
			pass: '211762406'
		}
	});

	app.use('/mailer', function (req, res, next) {
		var password = make_password();
		User.findOne( { email: req.query.email }, function(err, user){
			if(err){
				res.json({
                    "status": "error",
                    "message": err
                });
			} else if(isEmptyObject(user)){
				res.json({
                    "status": "error",
                    "message": "Email không tồn tại trong hệ thống"
                });
			} else {
				user.password = sha1(password);
				user.save();
				console.log(req.query.email);
				app.mailer.send('email', {
					to: req.query.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.  
					subject: 'Quên Mật Khẩu', // REQUIRED.
					name: (user.name || user.email),
					pass: password,
					host_cors: config.host_cors
				}, function (err) {
				    if (err) {
						// handle error 
						console.log(err);
						res.json({
							"status": "error",
							"message": "Đã xảy ra một lỗi khi gửi email"
						});
						return;
				    } else {
					    res.json({
					    	"status": "success",
					    	"message": "Yêu cầu đã được gửi, vui lòng kiểm tra email!"
					   	});
					}
				});
			}
		} );
	});
}
