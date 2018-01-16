const express = require('express');
const router = express.Router();

const ctrlDocumentation   = require('./documentation');
const ctrlAgromet         = require('./controllers/agromet');
const ctrlIndicators      = require('./controllers/indicators');

router.use('/', ctrlDocumentation);

router.get(
  '/agromet/history/:emaId',
  ctrlAgromet.getHistory
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

router.get(
  '/indicators',
  ctrlIndicators.getIndicators
)

router.get(
  '/indicators/daysTempGT25Deg/:stationId',
  ctrlIndicators.daysTempGT25Deg
)

router.get(
  '/indicators/daysTempGT30Deg/:stationId',
  ctrlIndicators.daysTempGT30Deg
)

router.get(
  '/indicators/daysTempGT34Deg/:stationId',
  ctrlIndicators.daysTempGT34Deg
)

router.get(
  '/indicators/degreeDays/:stationId',
  ctrlIndicators.degreeDays
)

router.get(
  '/indicators/coldHours/:stationId',
  ctrlIndicators.coldHours
)

module.exports = router;
