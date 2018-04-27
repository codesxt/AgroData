const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

//MongoDB
const mongoose = require('mongoose');
const url = 'mongodb://localhost/AgroDataDB';
const User = require('./database/models/user');

const app = express();

// Enable CORS
app.use(cors());
// Enable GZipping
app.use(compression());
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Get our API routes
const api = require('./api/index');
// Set our api routes
app.use('/api/v1', api);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.post('/api/user/login', (req, res) => {
	mongoose.connect(url, function(err) {
		if (err) throw err;
		console.log(req.body);
		User.find({
			email	: req.body.email,
			password	: req.body.password
		}, function(err, user) {
			console.log(user);
			if (err) throw err;
			if (user.length === 1) {
				return res.status(200).json({
					status	: 'success',
					data 	: user
				})
			} else {
				return res.status(200).json({
					status	: 'fail',
					message	: 'Datos incorrectos'
				})
			}
		})
	});
})

app.post('/api/user/create', (req, res) => {
	mongoose.connect(url, function(err) {
		if (err) throw err;
		const user = new User({
			name		: req.body.name,
			email		: req.body.email,
			company		: req.body.company,
			phone		: req.body.phone,
			password	: req.body.password
		})
		user.save((err, result) => {
			console.log(result);
			if (err) throw err;
			console.log(res);
			return res.status(200).json({
				status: 'success',
				data: result
			})
		})
	});
})

module.exports = app;
