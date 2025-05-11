const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle.controller');

// Rutas para vehículos
router.get('/', vehicleController.getAllVehicles);
router.get('/:id', vehicleController.getVehicleById);
router.post('/', vehicleController.createVehicle);
router.put('/:id', vehicleController.updateVehicle);
router.delete('/:id', vehicleController.deleteVehicle);

module.exports = router; 