const express = require('express');
const {
  createSleepQuality,
  getAllSleepQualities
} = require('../controllers/sleepQuality');

const router = express.Router();

router.route('/')
  .post(createSleepQuality)
router.route('/')
  .get(getAllSleepQualities)

module.exports = router;
