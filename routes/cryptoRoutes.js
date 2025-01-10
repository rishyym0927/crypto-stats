// routes/cryptoRoutes.js
const express = require('express');
const { getCryptoStats, getCryptoDeviation } = require('../controllers/crytpoController')

const router = express.Router();

router.get('/stats', getCryptoStats);
router.get('/deviation', getCryptoDeviation);

module.exports = router;