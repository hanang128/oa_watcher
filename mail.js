var nodemailer = require('nodemailer');
var config = require('./config')

function sendMail(sendto,subject,text){
	// create reusable transporter object using SMTP transport 
	var transporter = nodemailer.createTransport(config.mail);
	// NB! No need to recreate the transporter object. You can use 
	// the same transporter object for all e-mails 

	// setup e-mail data with unicode symbols 
	var mailOptions = {
		from: 'hanang128@163.com', // sender address 
		to: sendto, // list of receivers 
		subject: subject, // Subject line 
		text: text // plaintext body 
	};

	// send mail with defined transport object 
	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			return console.log(error);
		}
		console.log('Message sent: ' + info.response);

	});
}

exports.sendServerDoneMail = function(server){
	var subject =server.name +'服务器异常'
	var text = server.url +" 无法访问，请管理员及时处理。"
	sendMail(server.notice,subject,text);
}