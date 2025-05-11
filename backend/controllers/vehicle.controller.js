const Vehicle = require('../models/vehicle.model');

const vehicleController = {
    // Obtener todos los vehículos
    getAllVehicles: async (req, res) => {
        try {
            const vehicles = await Vehicle.getAll();
            res.json(vehicles);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Obtener un vehículo por ID
    getVehicleById: async (req, res) => {
        try {
            const vehicle = await Vehicle.getById(req.params.id);
            if (!vehicle) {
                return res.status(404).json({ message: 'Vehículo no encontrado' });
            }
            res.json(vehicle);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Crear un nuevo vehículo
    createVehicle: async (req, res) => {
        try {
            const newVehicle = await Vehicle.create(req.body);
            res.status(201).json(newVehicle);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Actualizar un vehículo
    updateVehicle: async (req, res) => {
        try {
            const updatedVehicle = await Vehicle.update(req.params.id, req.body);
            if (!updatedVehicle) {
                return res.status(404).json({ message: 'Vehículo no encontrado' });
            }
            res.json(updatedVehicle);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Eliminar un vehículo
    deleteVehicle: async (req, res) => {
        try {
            const deleted = await Vehicle.delete(req.params.id);
            if (!deleted) {
                return res.status(404).json({ message: 'Vehículo no encontrado' });
            }
            res.json({ message: 'Vehículo eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = vehicleController; 