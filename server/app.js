const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

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

module.exports = app;
