var request = require('request');
var config = require('./config');
var mail = require('./mail');
var later = require('later');
var async = require('async');

function checkServerStatus() {
	async.each(config.servers, function(server) {
		//console.log(server);
		request(server.url, function(error, response, body) {
			if (error || response.statusCode !== 200) {
				mail.sendServerDoneMail(server);
			}
		})
	}, function(err) {
		if (err) {
			console.log(err);
		}
	})
}

// will fire every 5 minutes
  var textSched = later.parse.text('every 5 min');

  // execute logTime one time on the next occurrence of the text schedule
  //var timer = later.setTimeout(logTime, textSched);

  // execute logTime for each successive occurrence of the text schedule
  var timer2 = later.setInterval(checkServerStatus, textSched);

  

  // clear the interval timer when you are done
  //timer2.clear();