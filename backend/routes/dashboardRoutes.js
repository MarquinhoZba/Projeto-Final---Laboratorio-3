const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Rota que o api.get('/dashboard') vai chamar
router.get('/', dashboardController.getDashboardResumo);

module.exports = router;