const express = require('express');
const router = express.Router();

const ctrlDocumentation   = require('./documentation');
const ctrlAgromet         = require('./controllers/agromet');

router.use('/', ctrlDocumentation);

router.get(
  '/agromet/history/:emaId',
  ctrlAgromet.getEmaHistory
);
router.get(
  '/agromet/variables',
  ctrlAgromet.getVariables
);
router.get(
  '/agromet/regions',
  ctrlAgromet.getRegions
);
router.get(
  '/agromet/cities',
  ctrlAgromet.getCities
);
router.get(
  '/agromet/emas',
  ctrlAgromet.getFilteredEMAs
);

module.exports = router;
