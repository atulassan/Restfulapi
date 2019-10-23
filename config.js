var crypto = require('crypto');
var mysql = require('mysql');

var config = {
	db: {
		host: '192.168.1.99', 	// database host
		user: 'root', 		// your database username
		password: '', 		// your database password
		port: 3306, 		// default MySQL port
		db: 'at_nodrestapi', 		// your database name
		charset: 'utf8_general_ci' // charset
	},
	server: {
		host: '127.0.0.1',
		port: '3000'
	},
	numrows: '',
	verify: function (b1 = "") {
		return b1;
	},
	saltHashPassword: function (password, slt=TRUE) {
		var pswd = '';
		var slth = [];
		let Salt = crypto.randomBytes(16).toString('base64');
		let Hash = crypto.createHmac('sha512', Salt).update(password).digest("base64");
		if (slt) {
			slth.push(Salt);
			slth.push(Salt + "$" + Hash);
		} else {
			var splt = password.split('$');
			slth.push(splt[0]);
			slth.push(splt[1]);
		}
		return slth;
	},
	getToken: function() {
		return crypto.randomBytes(16).toString('base64');
	},
	getAvailUser: function(reqbody) {
		var numrows = '';
		var tst = 'testing';
		//console.log('testing');
		let sql = "Select * FROM customers WHERE Phone='" +reqbody.Phone+ "' AND Email='"+reqbody.Email+"'";
		console.log(sql);
		let query = conn.query(sql, (err, results) => {
			console.log('testing22');
			if (err) {
				throw err;
			}
			//console.log(results);
			numrows = results.length;
			console.log(numrows);
		});
		console.log('data: '+ numrows);
		return numrows;
	}
}

module.exports = config;