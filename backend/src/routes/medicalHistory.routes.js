const express = require('express');
const router = express.Router();
const controller = require('../controllers/medicalHistory.controller');

router.post('/', controller.crearHistorial);
router.get('/', controller.obtenerHistoriales);

module.exports = router;
