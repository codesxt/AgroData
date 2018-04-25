const express = require('express');
const router = express.Router();

const API = {
  '/'                       : 'This documentation.',
  '/agromet/variables'      : 'Get array of available variables from Agromet.cl.   Returns array of {variable: String, name: String}',
  '/agromet/regions'        : 'Get array of available regions from Agromet.cl.     Returns array of {id: Number, name: String}',
  '/agromet/cities'         : 'Get array of cities from a specified region.        Requires query parameter {region: Number}, Returns array of {id: Number, name: String}',
  '/agromet/emas'           : 'Get array of EMAs from specified region.,           Returns array of {id: Number, name: String}',
  '/agromet/history/:emaID' : 'Get array of data from station.                     Returns {idEMA: Number, data: Array, units: Array, labels: Array, from: Date, to: Date}',
  '/indicators'             : 'Get a list of available indicators.                 Returns array of {name: String, description: String}.'
}

router.get('/', function(req, res) {
  res.json(API);
});

module.exports = router;
