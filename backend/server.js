const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const vehicleRoutes = require('./routes/vehicle.routes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
    res.json({ message: 'API Toyota funcionando correctamente' });
});

// Rutas de vehículos
app.use('/api/vehicles', vehicleRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Servidor corriendo en el puerto ${PORT}`);
}); 